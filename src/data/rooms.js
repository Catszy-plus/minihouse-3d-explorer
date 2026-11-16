// Data ruangan (entitas "Ruangan" di docs/ARCHITECTURE.md).
// Dipakai F6 (Room Information). Teks ditampilkan sebagai teks biasa (textContent), bukan HTML.
// Daftar ruangan ini usulan awal (T-002) dan boleh diubah mahasiswa.
export const rooms = [
  {
    id: "ruang-tamu",
    nama: "Ruang Tamu",
    fungsi: "Tempat menerima tamu dan berkumpul bersama keluarga. Biasanya berada dekat pintu masuk.",
  },
  {
    id: "kamar-tidur",
    nama: "Kamar Tidur",
    fungsi: "Tempat beristirahat dan tidur. Dibuat tenang dan cukup sirkulasi udara serta cahaya.",
  },
  {
    id: "dapur",
    nama: "Dapur",
    fungsi: "Tempat menyiapkan dan memasak makanan. Perlu ventilasi yang baik agar asap dan bau keluar.",
  },
  {
    id: "kamar-mandi",
    nama: "Kamar Mandi",
    fungsi: "Tempat mandi dan buang air. Lantainya perlu tidak licin dan mudah mengalirkan air.",
  },
];

// Mencari ruangan berdasarkan id. Mengembalikan undefined bila id tidak dikenal.
export function getRoomById(id) {
  return rooms.find((room) => room.id === id);
}
