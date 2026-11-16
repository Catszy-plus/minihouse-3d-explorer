// Letak tiap ruangan di dalam rumah (denah sederhana 2 x 2).
// Jalur masuk: ruang tamu -> kamar tidur, ruang tamu -> dapur, kamar tidur -> kamar mandi. Dipakai untuk menyorot ruangan (F6).
// Kunci harus sama dengan id di src/data/rooms.js. size = [lebar, tinggi, kedalaman].
// Area dalam rumah: x dari -2,85 sampai 2,85 dan z dari -1,85 sampai 1,85; lantai berpermukaan y = 0,2.
export const roomLayout = {
  "ruang-tamu": { size: [2.85, 2.5, 1.85], position: [-1.425, 1.45, 0.925] },
  "kamar-tidur": { size: [2.85, 2.5, 1.85], position: [-1.425, 1.45, -0.925] },
  dapur: { size: [2.85, 2.5, 1.85], position: [1.425, 1.45, 0.925] },
  "kamar-mandi": { size: [2.85, 2.5, 1.85], position: [1.425, 1.45, -0.925] },
};
