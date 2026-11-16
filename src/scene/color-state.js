// Keadaan warna tiap kelompok bagian rumah (F5), sebagai fungsi murni agar mudah diuji.

// Warna awal tiap kelompok diambil dari warnaBawaan bagian pertama di kelompok itu.
export function initialColorState(parts) {
  const state = {};
  for (const part of parts) {
    if (!(part.kelompok in state)) {
      state[part.kelompok] = part.warnaBawaan;
    }
  }
  return state;
}

// Mengubah warna satu kelompok. Pilihan di luar daftar (kelompok atau warna) ditolak:
// fungsi mengembalikan objek keadaan yang sama persis, tanpa perubahan.
export function setGroupColor(state, kelompok, colorId, palette) {
  const color = palette.find((item) => item.id === colorId);
  if (!color || !(kelompok in state)) return state;
  return { ...state, [kelompok]: color.hex };
}
