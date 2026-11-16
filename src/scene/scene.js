// Menyiapkan adegan 3D: renderer, kamera, cahaya, kontrol putar dan zoom (F1).
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { parts } from "../data/parts.js";
import { rooms } from "../data/rooms.js";
import { createHouse } from "./house.js";
import { createRoomHighlights } from "./room-highlight.js";
import {
  CAMERA_TARGET,
  INITIAL_CAMERA_POSITION,
  MAX_DISTANCE,
  MIN_DISTANCE,
} from "./camera-limits.js";

export function createScene(container) {
  // Bila browser tidak mendukung WebGL, baris ini melempar galat yang ditangani di main.js.
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#e6e6e6");

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(...INITIAL_CAMERA_POSITION);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9e9e9e, 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(6, 10, 8);
  scene.add(sun);

  scene.add(createHouse(parts));

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
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });

  // F6: menyorot satu ruangan (atau menghapus sorotan bila id kosong).
  function highlightRoom(id) {
    highlights.show(id);
  }

  return { scene, camera, renderer, controls, highlightRoom };
}
