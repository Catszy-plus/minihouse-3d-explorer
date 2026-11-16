// Menyiapkan adegan 3D: renderer, kamera, cahaya, kontrol putar dan zoom (F1).
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { parts } from "../data/parts.js";
import { rooms } from "../data/rooms.js";
import { createEnvironment } from "./environment.js";
import { createHouse } from "./house.js";
import { createRoomHighlights } from "./room-highlight.js";
import { roomLayout } from "./room-layout.js";
import { pickRoom } from "./room-picking.js";
import { INTERIOR_HIDDEN_PARTS } from "./view-state.js";
import { lightingPreset } from "./day-night.js";
import {
  EXPLODE_DURATION_SECONDS,
  ease,
  explodedOffsets,
  stepProgress,
} from "./exploded-view.js";
import {
  CAMERA_TARGET,
  INITIAL_CAMERA_POSITION,
  MAX_DISTANCE,
  MIN_DISTANCE,
} from "./camera-limits.js";

// options.onRoomPick(id) dipanggil saat pengguna mengklik ruangan di model (hanya saat Interior View aktif).
export function createScene(container, options = {}) {
  // Bila browser tidak mendukung WebGL, baris ini melempar galat yang ditangani di main.js.
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  // Batasi pixel ratio agar tampilan tetap tajam tanpa membebani GPU berlebihan.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#e6e6e6");

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(...INITIAL_CAMERA_POSITION);

  const hemisphere = new THREE.HemisphereLight(0xffffff, 0x9e9e9e, 1.5);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(6, 10, 8);
  scene.add(sun);

  const house = createHouse(parts);
  scene.add(house);
  scene.add(createEnvironment());

  const highlights = createRoomHighlights(rooms);
  scene.add(highlights.group);

  // F1: seret untuk memutar, roda atau cubit untuk zoom, dengan batas jarak.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...CAMERA_TARGET);
  controls.minDistance = MIN_DISTANCE;
  controls.maxDistance = MAX_DISTANCE;
  controls.maxPolarAngle = Math.PI / 2 - 0.05; // kamera tidak masuk ke bawah lantai
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.update();

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
    // Ukuran CSS canvas diatur oleh #scene; renderer hanya mengatur buffer gambar.
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  // F3: Exploded View. Progres 0 = menyatu, 1 = terpisah; bagian bergeser perlahan.
  const clock = new THREE.Clock();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let explodedTarget = 0;
  let explodedProgress = 0;

  function applyExploded() {
    const amount = ease(explodedProgress);
    for (const mesh of house.children) {
      const offset = explodedOffsets[mesh.name] ?? [0, 0, 0];
      const base = mesh.userData.basePosition;
      mesh.position.set(
        base[0] + offset[0] * amount,
        base[1] + offset[1] * amount,
        base[2] + offset[2] * amount,
      );
    }
  }

  function setExploded(isExploded) {
    explodedTarget = isExploded ? 1 : 0;
  }

  // F5: mengubah warna semua bagian dalam satu kelompok (mis. dinding). Bagian lain tidak berubah.
  function setGroupColor(kelompok, hex) {
    for (const mesh of house.children) {
      if (mesh.userData.kelompok === kelompok) mesh.material.color.set(hex);
    }
  }

  // F4: mode siang atau malam mengubah langit dan cahaya; warna bagian rumah tetap.
  function setNight(isNight) {
    const preset = lightingPreset(isNight);
    scene.background.set(preset.background);
    hemisphere.color.set(preset.hemisphere.sky);
    hemisphere.groundColor.set(preset.hemisphere.ground);
    hemisphere.intensity = preset.hemisphere.intensity;
    sun.color.set(preset.sun.color);
    sun.intensity = preset.sun.intensity;
  }

  // F2: Interior View menyembunyikan atap dan satu sisi dinding.
  let interiorActive = false;

  function setInterior(isInterior) {
    interiorActive = isInterior;
    for (const mesh of house.children) {
      mesh.visible = !(isInterior && INTERIOR_HIDDEN_PARTS.includes(mesh.name));
    }
  }

  // F6: mengklik ruangan langsung di model, hanya saat Interior View aktif.
  // Seretan (memutar kamera) tidak dihitung sebagai klik.
  const raycaster = new THREE.Raycaster();
  let pointerStart = null;

  renderer.domElement.addEventListener("pointerdown", (event) => {
    pointerStart = { x: event.clientX, y: event.clientY };
  });

  renderer.domElement.addEventListener("pointerup", (event) => {
    const start = pointerStart;
    pointerStart = null;
    if (!start || !interiorActive || !options.onRoomPick) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;

    const rect = renderer.domElement.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const { origin, direction } = raycaster.ray;
    const id = pickRoom(
      [origin.x, origin.y, origin.z],
      [direction.x, direction.y, direction.z],
      roomLayout,
    );
    if (id) options.onRoomPick(id);
  });

  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    if (explodedProgress !== explodedTarget) {
      explodedProgress = stepProgress(
        explodedProgress,
        explodedTarget,
        delta,
        reduceMotion ? 0 : EXPLODE_DURATION_SECONDS,
      );
      applyExploded();
    }
    controls.update();
    renderer.render(scene, camera);
  });

  // F6: menyorot satu ruangan (atau menghapus sorotan bila id kosong).
  function highlightRoom(id) {
    highlights.show(id);
  }

  return { scene, camera, renderer, controls, highlightRoom, setExploded, setInterior, setGroupColor, setNight };
}
