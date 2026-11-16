// Logika murni untuk F3 (Exploded View): seberapa jauh tiap bagian bergeser dan cara animasinya.
// Dipisahkan dari Three.js agar bisa diuji dengan Vitest.

// Pergeseran tiap bagian saat terpisah penuh: [x, y, z]. Kunci sama dengan id di src/data/parts.js.
export const explodedOffsets = {
  atap: [0, 2.5, 0],
  lantai: [0, -0.8, 0],
  "dinding-belakang": [0, 0, -2],
  "dinding-depan": [0, 0, 2],
  "dinding-kiri": [-2, 0, 0],
  "dinding-kanan": [2, 0, 0],
  // Sekat naik sedikit agar terpisah dari lantai dan dinding luar.
  "sekat-kiri-1": [0, 1.2, 0],
  "sekat-kiri-2": [0, 1.2, 0],
  "sekat-kanan": [0, 1.2, 0],
  "sekat-belakang": [0, 1.2, 0],
  "sekat-depan-1": [0, 1.2, 0],
  "sekat-depan-2": [0, 1.2, 0],
};

export const EXPLODE_DURATION_SECONDS = 0.5;

// Mengubah progres linear 0..1 menjadi gerak yang halus di awal dan akhir.
export function ease(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

// Menggeser progres menuju target (0 atau 1) tanpa melewatinya.
// duration <= 0 berarti langsung ke target (dipakai untuk preferensi gerak berkurang).
export function stepProgress(current, target, deltaSeconds, durationSeconds) {
  if (durationSeconds <= 0) return target;
  const step = deltaSeconds / durationSeconds;
  if (current < target) return Math.min(target, current + step);
  return Math.max(target, current - step);
}
