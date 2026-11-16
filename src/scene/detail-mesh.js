// Membuat satu mesh Three.js dari deskripsi item di src/scene/house-details.js.
import * as THREE from "three";

export function createDetailMesh(item) {
  let geometry;
  if (item.shape === "box") {
    geometry = new THREE.BoxGeometry(...item.size);
  } else if (item.shape === "cylinder") {
    geometry = new THREE.CylinderGeometry(item.radiusTop, item.radiusBottom, item.height, 16);
  } else if (item.shape === "sphere") {
    geometry = new THREE.SphereGeometry(item.radius, 12, 8);
  } else {
    throw new Error(`Bentuk "${item.shape}" tidak dikenal.`);
  }

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.8 }),
  );
  mesh.position.set(...item.position);
  return mesh;
}
