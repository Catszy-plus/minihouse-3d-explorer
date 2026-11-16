// Lingkungan di sekitar rumah: tanah berumput, rumput, jalan setapak, semak, dan vas bunga di depan pintu.
// Semua objek dibuat sekali. Rumput memakai satu InstancedMesh agar ringan di smartphone.
import * as THREE from "three";
import { createDetailMesh } from "./detail-mesh.js";
import { flowerVase } from "./house-details.js";
import { grassPositions } from "./grass.js";

function createGround() {
  // Tanah berbentuk lingkaran dengan lubang seukuran lantai rumah (6 x 4),
  // sehingga lantai tetap terlihat saat Exploded View menurunkannya.
  const shape = new THREE.Shape();
  shape.absarc(0, 0, 16, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.moveTo(-3, -2);
  hole.lineTo(-3, 2);
  hole.lineTo(3, 2);
  hole.lineTo(3, -2);
  hole.closePath();
  shape.holes.push(hole);

  const ground = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshStandardMaterial({ color: "#7fae6a", roughness: 1, side: THREE.DoubleSide }),
  );
  ground.rotation.x = -Math.PI / 2;
  return ground;
}

function createGrass() {
  const positions = grassPositions();
  const grass = new THREE.InstancedMesh(
    new THREE.ConeGeometry(0.04, 0.3, 5),
    new THREE.MeshStandardMaterial({ color: "#4f8a3c", roughness: 1 }),
    positions.length,
  );
  const dummy = new THREE.Object3D();
  positions.forEach((item, index) => {
    dummy.position.set(item.x, 0.15 * item.scale, item.z);
    dummy.rotation.set(0, item.rotation, 0);
    dummy.scale.set(1, item.scale, 1);
    dummy.updateMatrix();
    grass.setMatrixAt(index, dummy.matrix);
  });
  grass.instanceMatrix.needsUpdate = true;
  grass.frustumCulled = false;
  return grass;
}

export function createEnvironment() {
  const environment = new THREE.Group();
  environment.name = "lingkungan";

  environment.add(createGround());
  environment.add(createGrass());

  // Jalan setapak dari pintu depan.
  environment.add(
    createDetailMesh({ shape: "box", size: [1.0, 0.04, 3.2], position: [-1.425, 0.02, 3.6], color: "#bdbdbd" }),
  );

  // Semak di sekitar rumah.
  for (const [x, z] of [[-3.9, 2.6], [3.9, 2.6], [4.3, -1.6]]) {
    environment.add(
      createDetailMesh({ shape: "sphere", radius: 0.5, position: [x, 0.35, z], color: "#5f9a4a" }),
    );
  }

  // Dua vas bunga di kiri dan kanan pintu depan.
  for (const x of [-2.4, -0.45]) {
    for (const item of flowerVase(x, 0, 2.45)) {
      environment.add(createDetailMesh(item));
    }
  }

  return environment;
}
