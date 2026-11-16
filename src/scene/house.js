// Membuat model rumah dari geometri dasar Three.js (tanpa model impor dari Blender).
// Bagian rumah, pintu dan jendela, serta perabot semuanya dibuat sekali saat memulai.
import * as THREE from "three";
import { partLayout } from "./house-layout.js";
import { furniture, openings } from "./house-details.js";
import { createDetailMesh } from "./detail-mesh.js";

// Atap pelana: penampang segitiga yang diekstrusi sepanjang sumbu z, lalu dipusatkan.
function createGableGeometry([width, height, depth]) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(width / 2, 0);
  shape.lineTo(0, height);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

export function createHouse(parts) {
  const house = new THREE.Group();
  house.name = "rumah";
  const meshesById = new Map();

  for (const part of parts) {
    const layout = partLayout[part.id];
    if (!layout) {
      console.warn(`Tata letak untuk bagian "${part.id}" belum ada.`);
      continue;
    }

    const geometry =
      layout.shape === "gable"
        ? createGableGeometry(layout.size)
        : new THREE.BoxGeometry(...layout.size);
    const material = new THREE.MeshStandardMaterial({
      color: part.warnaBawaan,
      roughness: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...layout.position);
    mesh.name = part.id;
    mesh.userData.kelompok = part.kelompok;
    mesh.userData.basePosition = [...layout.position]; // posisi saat menyatu (dipakai F3)

    // Garis tepi tipis agar bentuk terlihat jelas pada warna putih dan abu-abu.
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0x555555 }),
    );
    mesh.add(edges);

    house.add(mesh);
    meshesById.set(part.id, mesh);
  }

  // Pintu dan jendela menempel pada dinding induknya, jadi ikut bergeser (F3) dan tersembunyi (F2).
  for (const item of openings) {
    const wall = meshesById.get(item.part);
    if (wall) wall.add(createDetailMesh(item));
  }

  // Perabot menempel pada lantai, jadi ikut turun bersama lantai saat Exploded View.
  const floor = meshesById.get("lantai");
  if (floor) {
    for (const items of Object.values(furniture)) {
      for (const item of items) floor.add(createDetailMesh(item));
    }
  }

  return house;
}
