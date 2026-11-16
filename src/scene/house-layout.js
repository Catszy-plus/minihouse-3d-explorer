// Ukuran dan posisi tiap bagian rumah (satuan bebas, rumah berukuran 6 x 4).
// Kunci harus sama dengan id di src/data/parts.js. size = [lebar, tinggi, kedalaman].
// Posisi adalah titik tengah kotak. Lantai setebal 0,2; dinding luar setebal 0,15 dan setinggi 2,5.
// Atap berbentuk pelana (shape "gable"): alasnya berada di y = position[1] dan punggung atap
// sejajar sumbu z. Sekat (tembok pemisah) setebal 0,1; celah pintu (selebar 0,9) ada di sekat kiri, depan, dan belakang.
export const partLayout = {
  lantai: { size: [6, 0.2, 4], position: [0, 0.1, 0] },
  "dinding-belakang": { size: [6, 2.5, 0.15], position: [0, 1.45, -1.925] },
  "dinding-depan": { size: [6, 2.5, 0.15], position: [0, 1.45, 1.925] },
  "dinding-kiri": { size: [0.15, 2.5, 3.7], position: [-2.925, 1.45, 0] },
  "dinding-kanan": { size: [0.15, 2.5, 3.7], position: [2.925, 1.45, 0] },
  atap: { size: [6.6, 1.3, 4.6], position: [0, 2.7, 0], shape: "gable" },
  "sekat-kiri-1": { size: [0.975, 2.5, 0.1], position: [-2.3625, 1.45, 0] },
  "sekat-kiri-2": { size: [1.025, 2.5, 0.1], position: [-0.4625, 1.45, 0] },
  "sekat-kanan": { size: [2.8, 2.5, 0.1], position: [1.45, 1.45, 0] },
  "sekat-belakang-1": { size: [0.1, 2.5, 0.475], position: [0, 1.45, -1.6125] },
  "sekat-belakang-2": { size: [0.1, 2.5, 0.425], position: [0, 1.45, -0.2625] },
  "sekat-depan-1": { size: [0.1, 2.5, 0.425], position: [0, 1.45, 0.2625] },
  "sekat-depan-2": { size: [0.1, 2.5, 0.475], position: [0, 1.45, 1.6125] },
};
