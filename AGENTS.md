# AGENTS.md — MiniHouse 3D Explorer

> Website 3D interaktif untuk belajar bagian dan fungsi ruangan rumah modern minimalis, dibuat dengan Three.js.

File ini dibaca agen AI di setiap sesi. Jaga tetap singkat (maksimal 150 baris); detail ada di `docs/`.

## Project

MiniHouse 3D Explorer adalah website statis (platform web) berisi model rumah 3D yang dibuat langsung dengan kode Three.js. Pengguna: siswa/mahasiswa yang ingin mempelajari desain rumah. Level proses: dasar, satu pengembang, dikerjakan lewat chat di browser dengan salin-tempel manual (tanpa Claude Code). Tenggat: Senin, 16 November 2026 pukul 23.59 WIB.

## Read First

Muat dokumen saat dibutuhkan; jangan membaca semuanya jika tidak perlu, kecuali `PROGRESS.md`, `TASKS.md`, dan `GUARDRAILS.md` di awal sesi.

- `docs/PRD.md`: kebutuhan produk, fitur F1 sampai F6, kendali risiko R1 sampai R3.
- `docs/ARCHITECTURE.md`: arsitektur, struktur folder, model data.
- `docs/TASKS.md`: daftar task yang dikerjakan satu per satu.
- `docs/PROGRESS.md`: keadaan terakhir proyek.
- `docs/WORKFLOW.md`: siklus kerja, ritual awal dan akhir sesi.
- `docs/GUARDRAILS.md`: batas yang tidak boleh dilanggar.
- `docs/EVALS.md`: gerbang kualitas yang dapat dicek mesin.
- `docs/CODE_STYLE.md`: gaya kode, penamaan, commit.
- `docs/SECURITY.md`: keamanan dan kebersihan repositori.
- `docs/TESTING.md`: strategi tes dan checklist manual.
- `docs/DESIGN_SYSTEM.md`: warna, tipografi, komponen UI.
- `docs/DECISIONS.md`: keputusan arsitektur, usulan asisten, pertanyaan terbuka.
- `docs/REVIEW.md`: panduan review perubahan.
- `docs/LESSONS.md`: pelajaran dan kesalahan agen.

## Tech Stack

- Frontend/UI: JavaScript, Vite (alat build), Three.js (objek 3D), HTML/CSS tanpa pustaka UI.
- Backend: tidak ada.
- Database: tidak ada; data ruangan dan bagian rumah di berkas JavaScript atau JSON di `src/data/`.
- Auth: tidak ada (tanpa login).
- Hosting: Vercel.
- Testing: Vitest (unit test).
- Extra: tidak ada.
- Versi: latest stable (verifikasi dengan `npm view <paket> version`).
- Stack dipilih mahasiswa: jangan mengusulkan penggantian stack; ikuti konvensi resmi teknologi ini.

## Commands

Perintah ini berasal dari `SPEC.json` (`stack.commands`) dan identik dengan `docs/TESTING.md`, `docs/EVALS.md`, dan CI.

```bash
npm install
npm run lint
npm test
npm run build
```

- `npm install`: memasang dependensi.
- `npm run lint`: menjalankan ESLint (tersedia setelah T-001).
- `npm test`: menjalankan Vitest (tersedia setelah T-001).
- `npm run build`: membangun hasil akhir dengan Vite.
- `npm run dev`: menjalankan server pengembangan Vite.
- Typecheck dan `ci_setup` kosong, jadi tidak ada perintah tambahan.

## Conventions

- Objek rumah dibuat langsung dari geometri Three.js; jangan impor model dari Blender.
- Logika murni dipisah dari kode Three.js agar bisa diuji Vitest.
- Penamaan: berkas kebab-case, variabel dan fungsi camelCase, konstanta UPPER_SNAKE_CASE.
- Teks ruangan ditampilkan dengan `textContent`, bukan `innerHTML`.
- Antarmuka berbahasa Indonesia dan responsif (desktop, tablet, smartphone).
- Tampilan modern minimalis: putih dan hitam, tanpa mode gelap.
- Kontras teks minimal 4,5:1, fokus keyboard terlihat, hormati gerak berkurang.
- ID fitur F1 sampai F6 dan nama aplikasi identik dengan `SPEC.json`.

## Workflow Rules

- Kerjakan satu task per sesi dari `docs/TASKS.md` dan mulai dari branch baru.
- Jalankan gerbang `docs/EVALS.md` sebelum menyatakan selesai.
- Perbarui `docs/PROGRESS.md` di akhir sesi.
- Catat keputusan di `docs/DECISIONS.md` dan pelajaran di `docs/LESSONS.md`.
- Berhenti dan minta review manusia sebelum merge.

## Boundaries

### Always
- Baca `docs/PROGRESS.md` dan `docs/TASKS.md` lebih dulu.
- Kerjakan fitur Must (F1, F3, F6) dalam versi sederhana sebelum Should dan Could (R1).
- Jalankan `npm test` dan `npm run lint` dan commit kecil.
- Deploy ke Vercel lebih awal dan berulang, lalu buka URL-nya (R2).
- Ikuti ID fitur dari `docs/PRD.md`.

### Ask First
- Menambah dependensi baru.
- Mengubah struktur data `Ruangan` atau `BagianRumah`.
- Mengubah arsitektur atau keputusan di `docs/DECISIONS.md`.
- Mengubah CI atau pengaturan proyek di Vercel.
- Lihat `docs/GUARDRAILS.md`.

### Never
- Commit atau push langsung ke `main`; force push.
- Menaruh rahasia di kode atau di variabel `VITE_`.
- Melemahkan atau mematikan tes dan lint agar lulus.
- Mengarang API Three.js, versi, atau hasil tes.
- Menjalankan perintah destruktif tanpa konfirmasi.
- Mengumpulkan data pribadi.
- Mengimpor model rumah dari Blender.

## Definition of Done

- Kriteria acceptance fitur terpenuhi.
- Tes baru ditulis dan lulus; lint dan build bersih.
- Tidak ada rahasia di diff.
- `docs/PROGRESS.md` dan `docs/DECISIONS.md` diperbarui bila perlu.
- Perubahan sudah dibaca dan dipahami oleh mahasiswa (review).
