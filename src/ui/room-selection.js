// Aturan pilihan ruangan (F6): menekan ruangan yang sudah dipilih akan membatalkannya,
// sama seperti tombol di bagian Tampilan yang bisa dinonaktifkan.
export function nextSelectedRoom(current, clicked) {
  return current === clicked ? null : clicked;
}
