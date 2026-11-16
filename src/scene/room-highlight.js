// Penyorot ruangan (F6): kotak berwarna transparan yang tampak menembus dinding.
// Objek dibuat sekali; show() dan hide() hanya mengubah visibilitas.
import * as THREE from "three";
import { roomLayout } from "./room-layout.js";

const HIGHLIGHT_COLOR = 0x1d4ed8;

export function createRoomHighlights(rooms) {
  const group = new THREE.Group();
  group.name = "sorotan-ruangan";
  const byId = new Map();

  for (const room of rooms) {
    const layout = roomLayout[room.id];
    if (!layout) {
      console.warn(`Letak ruangan "${room.id}" belum ada.`);
      continue;
    }

    const [width, height, depth] = layout.size;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: HIGHLIGHT_COLOR,
        transparent: true,
        opacity: 0.3,
        depthTest: false,
      }),
    );
    mesh.position.set(...layout.position);
    mesh.renderOrder = 10;

    const outline = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: HIGHLIGHT_COLOR, depthTest: false }),
    );
    outline.renderOrder = 11;
    mesh.add(outline);

    mesh.visible = false;
    byId.set(room.id, mesh);
    group.add(mesh);
  }

  function show(id) {
    for (const [roomId, mesh] of byId) {
      mesh.visible = roomId === id;
    }
  }

  function hide() {
    show(null);
  }

  return { group, show, hide };
}
