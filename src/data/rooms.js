// Data ruangan (entitas "Ruangan" di docs/ARCHITECTURE.md).
// Dipakai F6 (Room Information). "ikon" hanya hiasan di antarmuka. Teks ditampilkan sebagai teks biasa (textContent), bukan HTML.
// Daftar ruangan ini usulan awal (T-002) dan boleh diubah mahasiswa.
export const rooms = [
  {
    id: "ruang-tamu",
    ikon: "🛋️",
    nama: "Ruang Tamu",
    fungsi: "Tempat menerima tamu dan berkumpul bersama keluarga. Biasanya berada dekat pintu masuk.",
  },
  {
    id: "kamar-tidur",
    ikon: "🛏️",
    nama: "Kamar Tidur",
    fungsi: "Tempat beristirahat dan tidur. Dibuat tenang dan cukup sirkulasi udara serta cahaya.",
  },
  {
    id: "dapur",
    ikon: "🍳",
    nama: "Dapur",
    fungsi: "Tempat menyiapkan dan memasak makanan. Perlu ventilasi yang baik agar asap dan bau keluar.",
  },
  {
    id: "kamar-mandi",
    ikon: "🚿",
    nama: "Kamar Mandi",
    fungsi: "Tempat mandi dan buang air. Lantainya perlu tidak licin dan mudah mengalirkan air.",
  },
];

// Mencari ruangan berdasarkan id. Mengembalikan undefined bila id tidak dikenal.
export function getRoomById(id) {
  return rooms.find((room) => room.id === id);
}
