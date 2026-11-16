// Ukuran dan posisi tiap bagian rumah (satuan bebas, rumah berukuran 6 x 4).
// Kunci harus sama dengan id di src/data/parts.js. size = [lebar, tinggi, kedalaman].
// Posisi adalah titik tengah kotak. Lantai setebal 0,2; dinding setebal 0,15 dan setinggi 2,5.
export const partLayout = {
  lantai: { size: [6, 0.2, 4], position: [0, 0.1, 0] },
  "dinding-belakang": { size: [6, 2.5, 0.15], position: [0, 1.45, -1.925] },
  "dinding-depan": { size: [6, 2.5, 0.15], position: [0, 1.45, 1.925] },
  "dinding-kiri": { size: [0.15, 2.5, 3.7], position: [-2.925, 1.45, 0] },
  "dinding-kanan": { size: [0.15, 2.5, 3.7], position: [2.925, 1.45, 0] },
  atap: { size: [6.6, 0.2, 4.6], position: [0, 2.8, 0] },
};
