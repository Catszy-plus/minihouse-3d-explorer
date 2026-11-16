// Membuat model rumah dari geometri dasar Three.js (tanpa model impor dari Blender).
import * as THREE from "three";
import { partLayout } from "./house-layout.js";

// Dipanggil sekali saat memulai; objek tidak dibuat ulang di setiap frame.
export function createHouse(parts) {
  const house = new THREE.Group();
  house.name = "rumah";

  for (const part of parts) {
    const layout = partLayout[part.id];
    if (!layout) {
      console.warn(`Tata letak untuk bagian "${part.id}" belum ada.`);
      continue;
    }

    const [width, height, depth] = layout.size;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
      color: part.warnaBawaan,
      roughness: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...layout.position);
    mesh.name = part.id;
    mesh.userData.kelompok = part.kelompok;

    // Garis tepi tipis agar bentuk terlihat jelas pada warna putih dan abu-abu.
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0x555555 }),
    );
    mesh.add(edges);

    house.add(mesh);
  }

  return house;
}
