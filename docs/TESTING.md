# Testing: MiniHouse 3D Explorer

## Strategy

Pengujian memakai Vitest untuk unit test (`stack.testing`), karena proyek berlevel Dasar dengan satu pengembang dan hanya sekitar 1 hari sampai tenggat (`duration_weeks` dicatat 1 sebagai batas minimum skema). Logika murni dipisahkan dari kode Three.js sehingga bisa diuji cepat di Node: data ruangan, aturan keadaan tampilan (Interior dan Exploded saling meniadakan), perhitungan posisi bagian saat Exploded View, dan pembatasan jarak kamera. Bagian yang bergantung pada tampilan nyata (apakah rumah terlihat benar, animasi, klik di model) diuji manual dengan checklist di bawah. Piramida pengujian: banyak unit test kecil, tanpa uji E2E (Playwright tidak dipakai), dan satu putaran uji manual sebelum pengumpulan (R3). Ini cukup untuk proyek sependek ini karena risiko terbesarnya adalah waktu, bukan kompleksitas logika.

## Test Types

| Jenis | Alat | Lokasi berkas | Kapan dijalankan | Perintah |
|---|---|---|---|---|
| Unit test | Vitest | `tests/*.test.js` | Setiap perubahan kode dan sebelum merge | `npm test` |
| Lint | ESLint | seluruh `src/` dan `tests/` | Sebelum commit dan di CI | `npm run lint` |
| Build | Vite | seluruh proyek | Sebelum merge dan di CI | `npm run build` |
| Uji manual di browser | Browser (desktop dan smartphone) | checklist di bawah | Setelah tiap fitur Must selesai dan sebelum pengumpulan | buka URL lokal atau Vercel |

## What Must Be Tested

Fitur dengan prioritas must:

- **F1 Rotate and Zoom:** fungsi pembatas jarak kamera mengembalikan nilai di dalam batas minimum dan maksimum (unit test); memutar dan zoom benar-benar bekerja di mouse dan layar sentuh (manual).
- **F3 Exploded View:** fungsi keadaan tampilan mengaktifkan Exploded dan mematikan Interior, dan menekan lagi mengembalikan posisi awal (unit test); animasi tampil dan bagian rumah terpisah lalu menyatu (manual).
- **F6 Room Information:** pencarian ruangan berdasarkan `id` mengembalikan nama dan fungsi yang benar, dan `id` tak dikenal menghasilkan hasil kosong yang ditangani (unit test); memilih nama di panel Daftar Ruangan menampilkan info dan menyorot ruangan (manual).

Tambahan wajib uji keamanan dan galat: pemilih warna menolak nilai di luar daftar (unit test), teks ruangan tampil sebagai teks biasa (tinjauan kode), dan pesan pengganti tampil bila WebGL tidak tersedia atau data ruangan gagal dimuat (manual). Otorisasi per peran tidak berlaku karena hanya ada satu peran dan tidak ada login.

## Commands

Perintah utama (dari `stack.commands`, identik dengan AGENTS.md, EVALS.md, dan CI):

| Tujuan | Perintah |
|---|---|
| Instal | `npm install` |
| Lint | `npm run lint` |
| Semua tes | `npm test` |
| Build | `npm run build` |

Perintah tambahan: menjalankan satu berkas tes dengan `npx vitest run tests/rooms.test.js`; mode watch dengan `npx vitest`; server pengembangan dengan `npm run dev`; pratinjau hasil build dengan `npx vite preview`. Tidak ada pemeriksaan tipe (typecheck kosong karena JavaScript) dan tidak ada tes E2E. Skrip `lint` dan `test` perlu dibuat saat task setup T-001 (ESLint dan Vitest dipasang dan didaftarkan di `package.json`).

## Coverage and Quality Bar

Target realistis: logika murni (data, aturan keadaan, perhitungan posisi, pembatas kamera) dicakup tinggi, sedangkan kode Three.js dan UI cukup diuji manual. Tidak memaksa 100 persen. Tes tidak boleh dihapus atau dilemahkan agar lulus. Setiap bug yang diperbaiki mendapat tes baru yang gagal sebelum perbaikan dan lulus sesudahnya.

## Test Data

Data uji berupa data fiktif kecil di dalam berkas tes (mis. dua atau tiga ruangan contoh) atau data asli di `src/data/` yang memang tidak berisi data pribadi (`personal_data` = none). Tidak ada basis data yang perlu direset dan tidak ada layanan eksternal yang butuh sandbox. Bila nama ruangan berubah, perbarui tes yang bergantung padanya.

## Manual Test Checklist

- [ ] Halaman terbuka di Chrome (atau Edge) desktop dan model rumah 3D tampil.
- [ ] Halaman terbuka di Firefox dan model tampil.
- [ ] Halaman terbuka di smartphone melalui URL Vercel dan model tampil.
- [ ] Seret mouse atau jari memutar rumah (F1).
- [ ] Roda mouse atau cubit jari memperbesar dan memperkecil, berhenti di batas (F1).
- [ ] Tombol Exploded View memisahkan atap, dinding, dan lantai, lalu menyatukan kembali saat ditekan lagi (F3).
- [ ] Memilih nama di Daftar Ruangan menampilkan nama dan fungsi, dan ruangan tersorot (F6).
- [ ] Interior View menyembunyikan atap dan satu sisi dinding dan klik ruangan di model menampilkan info (F2, F6).
- [ ] Mengaktifkan Exploded View menonaktifkan Interior View, dan sebaliknya (aturan konflik).
- [ ] Mengubah warna satu bagian tidak mengubah bagian lain (F5).
- [ ] Mode Siang/Malam mengubah suasana dan warna pilihan tetap sama (F4).
- [ ] Layar kecil: tombol dan panel tidak terpotong dan tetap terbaca.
- [ ] Hanya keyboard: semua tombol dapat dijangkau dengan Tab dan fokusnya terlihat.
- [ ] Mode gerak berkurang aktif: animasi dipersingkat atau dimatikan.
- [ ] Pesan pengganti tampil bila WebGL tidak tersedia (bila bisa disimulasikan).
- [ ] URL Vercel dibuka dari browser atau perangkat lain dan fitur Must berfungsi (R2, R3).

## Definition of Done

Satu task selesai bila:
- Kriteria acceptance fitur terpenuhi.
- Tes baru ditulis dan lulus.
- `npm run lint` bersih.
- `npm test` lulus.
- `npm run build` berhasil.
- Tidak ada rahasia di diff.
- `docs/PROGRESS.md` dan `docs/DECISIONS.md` diperbarui bila perlu.
- Pull request sudah di-review oleh mahasiswa (memahami semua perubahan).
