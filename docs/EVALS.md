# Evals: MiniHouse 3D Explorer

Evals adalah kriteria lulus yang **dapat dicek mesin**. Agen dan manusia memakai dokumen ini untuk memutuskan apakah suatu pekerjaan selesai.

## Purpose

Evals dipakai agar kemajuan proyek ini dinilai dengan perintah dan skenario yang jelas, bukan perasaan, terutama karena waktunya sekitar 1 hari. Pada level Dasar, gerbang dijalankan secara lokal dan di CI sederhana; tidak ada agen yang berputar otomatis, jadi mahasiswa sendiri yang menjalankan perintah dan memutuskan lulus atau tidak.

## Quality Gates

Semua gerbang di tabel harus lulus sebelum merge ke `main`.

| Gerbang | Perintah | Kriteria lulus | Dijalankan di |
|---|---|---|---|
| Lint | `npm run lint` | Tanpa galat | Lokal dan CI |
| Tes | `npm test` | Semua tes lulus | Lokal dan CI |
| Build | `npm run build` | Build berhasil | Lokal dan CI |

Gerbang tambahan:

| Gerbang | Perintah | Kriteria lulus | Dijalankan di |
|---|---|---|---|
| Audit dependensi | `npm audit` | Tidak ada kerentanan tingkat tinggi atau kritis yang belum ditangani | Lokal, sebelum pengumpulan |
| Secret scanning | Fitur GitHub | Tidak ada peringatan rahasia | GitHub |

Pemeriksaan tipe tidak ada (typecheck kosong) dan tidak ada tes E2E.

## Feature Acceptance Evals

| ID | Eval | Cara dijalankan | Kriteria lulus |
|---|---|---|---|
| F1 | Pembatas jarak kamera dan interaksi memutar dan zoom | Otomatis: `npm test` untuk fungsi pembatas; manual: seret dan zoom di browser | Jarak kamera selalu di antara batas minimum dan maksimum; seret memutar rumah; roda atau cubit memperbesar dan memperkecil |
| F2 | Interior View menyembunyikan dan memunculkan atap dan satu dinding | Manual: tekan tombol Interior View dua kali | Pertama atap dan satu sisi dinding tersembunyi; kedua kembali seperti semula |
| F3 | Exploded View dan aturan konflik dengan Interior View | Otomatis: `npm test` untuk fungsi keadaan; manual: tekan tombol | Atap, dinding, lantai bergeser terpisah lalu kembali saat ditekan lagi; mengaktifkan Exploded menonaktifkan Interior dan sebaliknya |
| F4 | Day/Night Mode | Manual: tekan tombol dua kali dan ubah warna saat malam | Langit dan cahaya berubah ke malam lalu kembali ke siang; warna pilihan tetap sama saat malam |
| F5 | Change Color | Manual: pilih warna untuk satu bagian | Warna bagian itu berubah seketika dan bagian lain tidak berubah |
| F6 | Room Information lewat Daftar Ruangan dan klik di model | Otomatis: `npm test` untuk pencarian ruangan berdasarkan `id`; manual: pilih nama dan klik ruangan saat Interior View aktif | Panel menampilkan nama dan fungsi ruangan yang benar dan ruangan tersorot; klik di model saat Interior View aktif menampilkan info yang sama |
| R1 | Urutan kerja fitur Must lebih dulu dan versi sederhana | Manual: periksa `docs/PROGRESS.md` dan riwayat commit | F2, F4, F5 tidak dimulai sebelum F1, F3, F6 berjalan; di browser rumah bisa diputar dan di-zoom, Exploded memisahkan bagian, dan klik ruangan menampilkan nama dan fungsi |
| R2 | Deploy ke Vercel awal dan berulang | Manual: buka URL Vercel dari browser atau HP lain setelah F1 dan tiap fitur Must | URL bisa dibuka dan menampilkan rumah 3D sebelum fitur berikutnya dimulai |
| R3 | Pemeriksaan sebelum tenggat | Otomatis: `npm test`, `npm run lint`, `npm run build`; manual: buka URL Vercel | Ketiga perintah selesai tanpa error dan URL terbuka dengan fitur Must berfungsi |

## CI Configuration

Alur `.github/workflows/ci.yml`: berjalan pada pull request dan push ke `main`; langkahnya mengambil kode, menyiapkan Node.js LTS aktif (verifikasi versinya dengan `node --version` atau nodejs.org), memasang dependensi dengan cache npm, lalu menjalankan lint, tes, dan build berurutan. Branch `main` dilindungi sehingga PR hanya bisa digabung bila CI hijau. Versi GitHub Actions harus dicek ulang dan untuk produksi dipin ke SHA.

## Regression Policy

Setiap bug yang diperbaiki mendapat tes yang gagal sebelum perbaikan dan lulus sesudahnya. Tes yang gagal tidak boleh dinonaktifkan. Jika tes harus berubah, jelaskan alasannya di PR dan di `docs/DECISIONS.md`.

## Failure Handling

Saat gerbang gagal: baca log, perbaiki penyebabnya, lalu jalankan ulang. Batas percobaan perbaikan oleh AI adalah maksimal 3 kali per masalah; setelah itu berhenti dan minta mahasiswa menilai. Catat penyebab dan pelajaran di `docs/LESSONS.md`.
