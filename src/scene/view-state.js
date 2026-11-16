// Keadaan tampilan rumah dan aturannya, sebagai fungsi murni (mudah diuji).
// Aturan konflik yang disetujui: Exploded View dan Interior View saling meniadakan.
export function initialViewState() {
  return { exploded: false, interior: false };
}

// Menekan tombol Exploded View: bila sedang terpisah, menyatu kembali;
// bila belum, terpisah dan Interior View otomatis nonaktif.
export function toggleExploded(state) {
  if (state.exploded) {
    return { ...state, exploded: false };
  }
  return { ...state, exploded: true, interior: false };
}
