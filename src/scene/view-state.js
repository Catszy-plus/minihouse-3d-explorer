// Keadaan tampilan rumah dan aturannya, sebagai fungsi murni (mudah diuji).
// Aturan konflik yang disetujui: Exploded View dan Interior View saling meniadakan.

// Bagian yang disembunyikan saat Interior View aktif (F2): atap dan satu sisi dinding.
export const INTERIOR_HIDDEN_PARTS = ["atap", "dinding-depan"];

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

// Menekan tombol Interior View: bila sedang aktif, atap dan dinding muncul kembali;
// bila belum, interior terlihat dan Exploded View otomatis nonaktif.
export function toggleInterior(state) {
  if (state.interior) {
    return { ...state, interior: false };
  }
  return { ...state, interior: true, exploded: false };
}
