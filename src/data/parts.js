// Data bagian rumah (entitas "BagianRumah" di docs/ARCHITECTURE.md).
// "kelompok" dipakai F3 (Exploded View) dan F2 (Interior View); "warnaBawaan" dipakai F5 (Change Color).
export const parts = [
  { id: "lantai", nama: "Lantai", kelompok: "lantai", warnaBawaan: "#bdbdbd" },
  { id: "dinding-belakang", nama: "Dinding Belakang", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "dinding-kiri", nama: "Dinding Kiri", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "dinding-kanan", nama: "Dinding Kanan", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "dinding-depan", nama: "Dinding Depan", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "atap", nama: "Atap", kelompok: "atap", warnaBawaan: "#4a4a4a" },
  // Tembok pemisah antarruangan (sekat). Sekat kiri dan depan punya celah untuk pintu antarruangan.
  { id: "sekat-kiri-1", nama: "Sekat Kiri 1", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "sekat-kiri-2", nama: "Sekat Kiri 2", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "sekat-kanan", nama: "Sekat Kanan", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "sekat-belakang", nama: "Sekat Belakang", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "sekat-depan-1", nama: "Sekat Depan 1", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
  { id: "sekat-depan-2", nama: "Sekat Depan 2", kelompok: "dinding", warnaBawaan: "#f2f2f2" },
];
