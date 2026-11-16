# MiniHouse 3D Explorer

> Website 3D interaktif untuk belajar bagian dan fungsi ruangan rumah modern minimalis, dibuat dengan Three.js.

## About

Siswa/mahasiswa yang ingin belajar desain rumah sering hanya menonton video, sehingga pemahamannya sebatas teori tanpa praktik. MiniHouse 3D Explorer menyediakan model rumah 3D sederhana yang bisa diputar, dibuka, dan dipisahkan bagian-bagiannya. Dengan begitu pengguna dapat mengenali bagian rumah dan fungsi ruangan lewat percobaan langsung. Model rumah dibuat dengan kode Three.js, tanpa impor dari Blender.

## Features

| ID | Fitur | Prioritas | Status |
|---|---|---|---|
| F1 | Rotate and Zoom | must | direncanakan |
| F2 | Interior View | should | direncanakan |
| F3 | Exploded View | must | direncanakan |
| F4 | Day/Night Mode | could | direncanakan |
| F5 | Change Color | should | direncanakan |
| F6 | Room Information | must | direncanakan |

## Tech Stack

- JavaScript
- Vite (alat build dan server pengembangan)
- Three.js (objek 3D)
- HTML/CSS (antarmuka 2D tanpa pustaka UI)
- Vitest (unit test)
- Vercel (hosting)
- Tanpa backend, database, dan login

## Getting Started

1. Pasang prasyarat: Node.js LTS aktif (verifikasi dengan `node --version`) dan npm.
2. Clone repositori ini dan masuk ke foldernya.
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Tidak ada variabel lingkungan yang wajib. Bila nanti dibutuhkan, salin `.env.example` menjadi `.env` dan isi nilainya (jangan di-commit).
5. Jalankan mode pengembangan (tersedia setelah T-001):
   ```bash
   npm run dev
   ```
6. Buka alamat lokal yang ditampilkan di terminal di browser.

## Scripts and Commands

| Perintah | Fungsi |
|---|---|
| `npm install` | Memasang dependensi |
| `npm run dev` | Menjalankan server pengembangan Vite |
| `npm run lint` | Menjalankan ESLint (tersedia setelah T-001) |
| `npm test` | Menjalankan Vitest (tersedia setelah T-001) |
| `npm run build` | Membangun hasil akhir untuk Vercel |

## Project Structure

```text
minihouse-3d-explorer/
├── AGENTS.md      # panduan utama untuk AI
├── SPEC.json      # sumber kebenaran proyek
├── index.html     # halaman tunggal
├── docs/          # dokumen proyek
├── public/        # aset statis
├── src/           # kode: main.js, scene/, data/, ui/, styles/
├── tests/         # tes Vitest
└── .github/       # CI dan template PR
```

## Documentation

| Dokumen | Fungsi |
|---|---|
| [AGENTS.md](AGENTS.md) | Panduan utama untuk agen AI |
| [docs/PRD.md](docs/PRD.md) | Kebutuhan produk dan fitur |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arsitektur dan model data |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Warna, tipografi, komponen |
| [docs/SECURITY.md](docs/SECURITY.md) | Keamanan dan kebersihan repositori |
| [docs/CODE_STYLE.md](docs/CODE_STYLE.md) | Gaya kode dan commit |
| [docs/TESTING.md](docs/TESTING.md) | Strategi dan checklist uji |
| [docs/EVALS.md](docs/EVALS.md) | Gerbang kualitas |
| [docs/WORKFLOW.md](docs/WORKFLOW.md) | Siklus kerja |
| [docs/GUARDRAILS.md](docs/GUARDRAILS.md) | Batas yang tidak boleh dilanggar |
| [docs/TASKS.md](docs/TASKS.md) | Daftar task |
| [docs/PROGRESS.md](docs/PROGRESS.md) | Kemajuan proyek |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Keputusan dan usulan asisten |
| [docs/REVIEW.md](docs/REVIEW.md) | Panduan review |
| [docs/LESSONS.md](docs/LESSONS.md) | Pelajaran dan refleksi |

## Contributing

Ikuti `docs/WORKFLOW.md`: satu branch per task, PR kecil, CI hijau, dan review sebelum merge. Pesan commit mengikuti `docs/CODE_STYLE.md`. Agen AI mengikuti `AGENTS.md`.

## AI Usage Disclosure

Proyek ini disusun dengan bantuan alat AI berupa chat di browser (salin-tempel manual). Semua perubahan ditinjau dan dipahami oleh penulis, dan dokumen awal dihasilkan dari `SPEC.json`.

## Status

Tahap perencanaan; dokumen proyek siap, implementasi belum dimulai. Lihat `docs/PROGRESS.md`.
