// Batas dan posisi awal kamera untuk F1 (Rotate and Zoom).
// Dipisahkan dari kode Three.js agar bisa diuji dengan Vitest.
export const MIN_DISTANCE = 6;
export const MAX_DISTANCE = 20;
export const CAMERA_TARGET = [0, 1.5, 0];
export const INITIAL_CAMERA_POSITION = [8, 6, 9];

// Menjaga jarak kamera tetap di antara batas minimum dan maksimum.
export function clampDistance(distance) {
  return Math.min(MAX_DISTANCE, Math.max(MIN_DISTANCE, distance));
}

// Jarak antara dua titik 3D yang ditulis sebagai [x, y, z].
export function distanceBetween(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}
