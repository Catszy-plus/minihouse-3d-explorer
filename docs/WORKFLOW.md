# Workflow: MiniHouse 3D Explorer

## Cycle

Setiap task mengikuti siklus yang sama:

`Plan -> Branch -> Implement -> Test -> Review -> Commit -> Pull Request -> Merge -> Update Docs`

1. **Plan:** pilih satu task `todo` dari `docs/TASKS.md` dan baca kriteria acceptance fitur terkait di `docs/PRD.md`. Contoh: T-003 (F1 Rotate and Zoom).
2. **Branch:** buat branch dari `main` dengan nama berisi ID task, contoh `feat/T-003-rotate-zoom`.
3. **Implement:** kerjakan perubahan kecil yang hanya untuk task itu, mengikuti `docs/CODE_STYLE.md` dan `docs/DESIGN_SYSTEM.md`.
4. **Test:** jalankan `npm run lint`, `npm test`, dan `npm run build` (gerbang di `docs/EVALS.md`), lalu uji manual fitur di browser.
5. **Review:** mahasiswa membaca seluruh perubahan dan harus bisa menjelaskannya; isi `docs/REVIEW.md` sesuai kebutuhan. **Manusia wajib memeriksa di langkah ini dan sebelum merge.**
6. **Commit:** commit kecil memakai Conventional Commits, mis. `feat(scene): tambah rotate dan zoom pada model rumah`.
7. **Pull Request:** buka PR memakai `.github/pull_request_template.md`.
8. **Merge:** gabungkan ke `main` setelah CI hijau dan review manusia selesai.
9. **Update Docs:** perbarui `docs/PROGRESS.md`, `docs/TASKS.md`, dan `docs/DECISIONS.md` bila ada keputusan baru.

## Session Start Ritual

1. Baca `AGENTS.md`.
2. Baca `docs/PROGRESS.md` untuk keadaan terakhir.
3. Baca `docs/LESSONS.md`.
4. Pilih tepat satu task dengan status `todo` dari `docs/TASKS.md` dan ubah statusnya menjadi `doing`.
5. Pastikan berada di branch task (bukan `main`) dan working tree bersih.

## Session End Ritual

1. Jalankan gerbang di `docs/EVALS.md` (`npm run lint`, `npm test`, `npm run build`).
2. Commit kecil dengan pesan sesuai `docs/CODE_STYLE.md`.
3. Perbarui status task di `docs/TASKS.md`.
4. Tulis ringkasan di `docs/PROGRESS.md` (selesai, berikutnya, hambatan).
5. Catat keputusan baru di `docs/DECISIONS.md` dan kesalahan agen di `docs/LESSONS.md`.
6. Push branch dan buka PR.
7. Berhenti dan minta review manusia.

## Branching Strategy

- `main` selalu stabil dan dilindungi; tidak ada commit langsung ke `main`.
- Fitur di `feat/T-nnn-nama`, perbaikan di `fix/T-nnn-nama`, dokumen di `docs/nama`.
- Satu branch untuk satu task; hapus branch setelah merge.
- Tim hanya 1 orang, sehingga PR direview oleh mahasiswa sendiri dengan membaca ulang diff secara teliti.
- Sebelum membuka PR, gabungkan `main` ke branch (merge `main` ke branch) agar konflik terlihat lebih awal.

## Commit and Pull Request Rules

Aturan commit mengikuti `docs/CODE_STYLE.md`. Isi PR wajib memuat ringkasan, ID task, ID fitur, cara menguji, hasil gerbang EVALS, dan tangkapan layar tampilan 3D bila relevan. PR sebaiknya kecil dan satu tujuan. Syarat merge: CI hijau dan satu review manusia. Gunakan `.github/pull_request_template.md`.

## Human-in-the-Loop Checkpoints

Level Dasar: pemeriksaan manusia dilakukan di setiap task.

| Titik kontrol | Siapa | Yang diperiksa |
|---|---|---|
| Sebelum merge | Mahasiswa | Diff dipahami, gerbang EVALS lulus, acceptance fitur terpenuhi |
| Sebelum menambah dependensi besar | Mahasiswa | Nama paket benar, dibutuhkan, tercatat di `docs/DECISIONS.md` |
| Sebelum mengubah struktur data atau arsitektur | Mahasiswa | Sesuai `docs/ARCHITECTURE.md` dan ADR |
| Sebelum perintah destruktif | Mahasiswa | Perintah dan dampaknya dibaca; jawab ya eksplisit |
| Sebelum memakai layanan berbayar | Mahasiswa | Tidak ada layanan berbayar tanpa persetujuan |
| Sebelum data nyata dipakai | Mahasiswa | Tidak berlaku saat ini karena tidak ada data pribadi |
| Sebelum dikumpulkan | Mahasiswa | R3: lint, tes, build, dan URL Vercel diperiksa |

## Handling Blockers

Bila macet, coba maksimal tiga pendekatan berbeda, catat yang sudah dicoba di `docs/PROGRESS.md`, tandai task `blocked`, lalu minta bantuan (dosen, teman, dokumentasi resmi Three.js atau Vite). Dilarang melewati blocker dengan mematikan tes, menurunkan keamanan, atau mengarang API Three.js.

## Level Notes

- **Dasar (AKTIF):** satu pengembang, alur sederhana, pengujian minimum, tanpa CI wajib sebagai syarat proses dan tanpa review rutin ala tim.
- **Menengah:** tugas terstruktur, CI wajib, review rutin.
- **Loop:** agen berputar dengan batas ketat; merujuk `docs/LOOP.md`.
