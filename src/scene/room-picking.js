// Memilih ruangan dari sinar klik (F6, saat Interior View aktif).
// Logika murni tanpa Three.js agar bisa diuji. Titik dan arah ditulis sebagai [x, y, z].

// Jarak sinar sampai kotak (metode slab), atau null bila sinar tidak mengenai kotak.
export function rayBoxDistance(origin, direction, center, size) {
  let tMin = -Infinity;
  let tMax = Infinity;

  for (let i = 0; i < 3; i += 1) {
    const min = center[i] - size[i] / 2;
    const max = center[i] + size[i] / 2;

    if (direction[i] === 0) {
      if (origin[i] < min || origin[i] > max) return null;
    } else {
      let t1 = (min - origin[i]) / direction[i];
      let t2 = (max - origin[i]) / direction[i];
      if (t1 > t2) [t1, t2] = [t2, t1];
      tMin = Math.max(tMin, t1);
      tMax = Math.min(tMax, t2);
      if (tMin > tMax) return null;
    }
  }

  if (tMax < 0) return null;
  return Math.max(tMin, 0);
}

// Mengembalikan id ruangan terdekat yang terkena sinar, atau null bila tidak ada.
export function pickRoom(origin, direction, layouts) {
  let bestId = null;
  let bestDistance = Infinity;

  for (const [id, layout] of Object.entries(layouts)) {
    const distance = rayBoxDistance(origin, direction, layout.position, layout.size);
    if (distance !== null && distance < bestDistance) {
      bestDistance = distance;
      bestId = id;
    }
  }

  return bestId;
}
