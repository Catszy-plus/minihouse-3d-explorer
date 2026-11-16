# Tasks: MiniHouse 3D Explorer

## Conventions

- **ID**: `T-001`, `T-002`, ... berurutan, unik.
- **Status**: `todo`, `doing`, `review`, `done`, `blocked`.
- **Ukuran**: `S` (< 1 jam), `M` (1 sampai 3 jam), `L` (setengah hari). Task lebih besar dari `L` harus dipecah.
- Satu task = satu branch = satu PR. Hanya satu task berstatus `doing` per orang.
- Setiap task merujuk fitur (F1, F2, ...) atau "setup"/"dokumen", dan memiliki kriteria selesai yang dapat dicek.

Agen hanya mengambil task berstatus `todo` yang semua dependensinya sudah `done`, mengubah status ke `doing` saat mulai dan ke `review` saat PR dibuka. Mahasiswa mengubah ke `done` setelah merge.

## Milestones

Waktu nyata sampai tenggat sekitar 1 hari (Senin, 16 November 2026 pukul 23.59 WIB); nilai `duration_weeks` dicatat 1 sebagai batas minimum skema.

| Milestone | Tujuan | Fitur | Perkiraan minggu |
|---|---|---|---|
| M1 Fondasi dan setup | Setup proyek, data, model rumah, dan tiga fitur Must (F1, F3, F6) berjalan serta terdeploy ke Vercel | setup, F1, F3, F6, R1, R2 | Paruh pertama waktu yang tersedia |
| M2 Penyempurnaan dan rilis | Fitur Should dan Could (F2, F5, F4), responsif dan aksesibilitas, uji coba teman, pemeriksaan akhir, dan rilis | F2, F5, F4, R2, R3 | Paruh kedua waktu yang tersedia |

## Task List

| ID | Judul | Fitur | Ukuran | Status | Branch | Bergantung pada | Kriteria selesai |
|---|---|---|---|---|---|---|---|
| T-001 | Setup Vite (template vanilla), ESLint, Vitest, skrip npm, `.gitignore`, `.env.example`, CI, dan satu tes contoh | setup | M | done | chore/T-001-setup | - | Langkah: jalankan `npm create vite@latest` (template vanilla JavaScript) lalu `npm install`; pasang Vitest dan ESLint; tambahkan skrip `lint` dan `test` di `package.json`; buat satu tes contoh di `tests/`. `npm run lint`, `npm test`, `npm run build` lulus dan CI hijau di PR |
| T-002 | Data ruangan dan bagian rumah di `src/data/` beserta tes | F6 | M | done | feat/T-002-data | T-001 | `rooms.js` (id, nama, fungsi) dan `parts.js` (id, nama, kelompok, warnaBawaan) terisi; daftar ruangan ditetapkan; tes memastikan setiap ruangan punya nama dan fungsi dan `id` unik |
| T-003 | Model rumah dari geometri Three.js dan F1 Rotate and Zoom | F1, R1 | L | todo | feat/T-003-rotate-zoom | T-001, T-002 | Rumah tampil di kanvas; seret memutar dan roda atau cubit memperbesar dan memperkecil; jarak kamera berhenti di batas minimum dan maksimum; tes fungsi pembatas jarak lulus |
| T-004 | Hubungkan repositori ke Vercel dan deploy pertama | F1, R2 | S | todo | chore/T-004-deploy | T-003 | URL Vercel terbuka dari browser atau HP lain dan menampilkan rumah 3D yang bisa diputar |
| T-005 | Panel Daftar Ruangan dan panel informasi (F6 versi sederhana) | F6, R1 | M | todo | feat/T-005-info-ruangan | T-002, T-003 | Memilih nama di Daftar Ruangan menampilkan nama dan fungsi ruangan dan ruangan tersorot di model; id tak dikenal menampilkan pesan data belum tersedia; tes pencarian ruangan lulus |
| T-006 | Exploded View dan fungsi keadaan tampilan | F3, R1 | M | todo | feat/T-006-exploded | T-003 | Tombol Exploded View menggeser atap, dinding, dan lantai terpisah dengan animasi dan menyatukannya saat ditekan lagi; tes fungsi keadaan lulus |
| T-007 | Deploy ulang setelah F3 dan F6 dan cek URL | F3, F6, R2 | S | todo | chore/T-007-deploy-ulang | T-004, T-005, T-006 | URL Vercel menampilkan F1, F3, dan F6 yang berfungsi saat dibuka dari browser atau HP lain |
| T-008 | Interior View, klik ruangan di model, dan aturan konflik dengan Exploded View | F2, F3, F6 | M | todo | feat/T-008-interior | T-005, T-006 | Tombol Interior View menyembunyikan atap dan satu sisi dinding lalu memunculkannya lagi; klik ruangan di model menampilkan info yang sama dengan Daftar Ruangan; mengaktifkan salah satu dari Interior dan Exploded menonaktifkan yang lain; tes aturan konflik lulus |
| T-009 | Change Color untuk bagian rumah | F5 | M | todo | feat/T-009-warna | T-003 | Memilih warna untuk satu bagian mengubahnya seketika dan bagian lain tidak berubah; nilai di luar daftar ditolak; tes lulus |
| T-010 | Day/Night Mode | F4 | S | todo | feat/T-010-siang-malam | T-003 | Tombol mengubah langit dan cahaya ke malam lalu kembali ke siang; warna pilihan tetap sama saat malam |
| T-011 | Responsif dan aksesibilitas sesuai Design System | F1, F3, F6 | M | todo | fix/T-011-responsif | T-007 | Tombol dan panel terbaca di layar kecil; Tab menjangkau semua tombol dengan fokus terlihat; kontras sesuai token; gerak berkurang dihormati |
| T-012 | Uji coba dengan beberapa teman (metrik pemahaman) | F6 | S | todo | docs/T-012-uji-teman | T-007 | Beberapa teman mencoba URL Vercel dan menjawab pertanyaan sederhana tentang fungsi ruangan; hasil dicatat di `docs/PROGRESS.md` tanpa nama |
| T-013 | Pemeriksaan akhir R3, deploy produksi, README final, dan isi LESSONS | R3, setup | M | todo | docs/T-013-rilis | T-008, T-009, T-010, T-011, T-012 | `npm test`, `npm run lint`, `npm run build` selesai tanpa error; URL Vercel terbuka dengan fitur Must berfungsi; README akurat dan LESSONS terisi |

## Backlog

Kosong; semua fitur (F1 sampai F6) sudah terjadwal dalam task di atas.
