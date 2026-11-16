# Decisions: MiniHouse 3D Explorer

Catatan keputusan arsitektur (Architecture Decision Records). Keputusan **tidak dibatalkan diam-diam**: untuk mengubahnya, tambahkan ADR baru yang berstatus `Supersedes ADR-nnn` dan jelaskan alasannya.

## How to Use

- Buat ADR saat ada pilihan teknologi, perubahan skema data, kompromi keamanan, atau penambahan dependensi besar.
- Format ADR: Status, Tanggal, Konteks, Keputusan, Konsekuensi, Alternatif yang dipertimbangkan.
- Agen wajib membaca ADR sebelum mengusulkan perubahan arsitektur.

## Decision Records

Semua ADR di bawah memakai tanggal 2026-11-15 kecuali dibuat kemudian.

### ADR-001: Platform web

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Proyek UTS berupa website interaktif 3D untuk belajar desain rumah; mahasiswa memilih platform Web (C-02) dan proyek dimulai dari nol (C-18).
- **Keputusan:** Platform utama adalah web; tidak ada platform pendukung.
- **Konsekuensi:** Dapat dibuka lewat browser tanpa instalasi dan mudah dikumpulkan lewat URL; bergantung pada dukungan WebGL di browser pengguna.
- **Alternatif yang dipertimbangkan:** Mobile, desktop, dan IoT tidak dipilih karena tidak sesuai tujuan.

### ADR-002: Frontend dan UI

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Stack dipilih mahasiswa (C-16 opsi B). Alasannya: "Ketentuan tugas dan sekalian ingin belajar Three.js." Objek rumah dibuat langsung dengan kode Three.js, tanpa impor model dari Blender.
- **Keputusan:** JavaScript dengan Vite sebagai alat build, Three.js untuk adegan 3D, dan HTML/CSS tanpa pustaka UI untuk antarmuka 2D.
- **Konsekuensi:** Komponen UI dibuat sendiri (lihat `docs/DESIGN_SYSTEM.md`); proyek perlu disetel sendiri (ESLint dan skrip) pada T-001. Tidak ada risiko yang disampaikan saat wawancara.
- **Alternatif yang dipertimbangkan:** Rekomendasi kit untuk web (Next.js dengan Tailwind CSS dan shadcn/ui) dicatat sebagai pembanding saja; tidak ada saran perpindahan.

### ADR-003: Backend dan data

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa memilih frontend saja tanpa backend dan tanpa database (W-01, W-03); seluruh data simulasi disimpan di file JavaScript atau JSON di dalam proyek.
- **Keputusan:** Tidak ada backend dan database. Data pokok: **Ruangan** (id, nama, fungsi) dan **BagianRumah** (id, nama, kelompok, warnaBawaan) di `src/data/`. Entitas ini adalah usulan asisten yang disetujui mahasiswa.
- **Konsekuensi:** Sederhana dan murah; data tidak dapat diubah pengguna dan tidak tersimpan setelah halaman dimuat ulang.
- **Alternatif yang dipertimbangkan:** PostgreSQL terkelola atau SQLite tidak dipilih karena tidak ada kebutuhan penyimpanan data pengguna.

### ADR-004: Autentikasi dan keamanan

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Tidak ada data pribadi (C-06 A), satu jenis pengguna (C-07 A), dan tanpa AI di dalam aplikasi (C-08 A).
- **Keputusan:** Tanpa autentikasi; satu peran Pengunjung; `personal_data` = none. Keamanan fokus pada rantai dependensi, kebersihan repositori, dan pengamanan akun GitHub dan Vercel (lihat `docs/SECURITY.md`).
- **Konsekuensi:** Tidak ada otorisasi di server dan tidak ada data pengguna untuk dilindungi; bila nanti ada fitur yang mengumpulkan data, ADR dan dokumen keamanan perlu ditinjau ulang.
- **Alternatif yang dipertimbangkan:** Layanan auth terkelola tidak dipilih karena tidak ada akun.

### ADR-005: Hosting dan deployment

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa memilih Vercel sebagai hosting; URL publik dibutuhkan untuk pengumpulan tugas, dan risiko terbesar menurut mahasiswa mencakup kegagalan deployment.
- **Keputusan:** Hosting di Vercel dengan `npm run build`; deploy dilakukan awal dan berulang (R2).
- **Konsekuensi:** Hasil dapat dibuka siapa saja lewat URL; pengaturan proyek di Vercel perlu dijaga agar URL tetap bisa diakses.
- **Alternatif yang dipertimbangkan:** Opsi lain (Cloudflare, hosting kampus) tidak dipilih mahasiswa.

### ADR-006: Strategi pengujian dan level proses

- **Status:** Accepted
- **Tanggal:** 2026-11-15
- **Konteks:** Mahasiswa memilih level Dasar karena proyek dikerjakan secara individual dengan alur kerja sederhana dan terarah (C-10); tim 1 orang dengan waktu sekitar 1 hari (C-13). Pengujian memakai Vitest (unit test saja, W-09 B) ditambah uji manual.
- **Keputusan:** Level Dasar tanpa CI sebagai syarat proses, tanpa review rutin, dan tanpa agent loop; pengujian otomatis dengan Vitest dan uji manual dengan checklist di `docs/TESTING.md`. Alat AI: hanya chat di browser (C-11 G) dengan `AGENTS.md` sebagai panduan utama, tanpa `CLAUDE.md` atau integrasi Claude Code.
- **Konsekuensi:** Tidak ada uji E2E otomatis; alur penuh diuji manual. Lint dan tes tetap dijalankan sebagai gerbang (lihat `docs/EVALS.md`).
- **Alternatif yang dipertimbangkan:** Unit test ditambah satu alur E2E Playwright dan level Menengah tidak dipilih mahasiswa.

## Delegated Choices

| ID pertanyaan | Pilihan yang diambil asisten | Alasan | Disetujui mahasiswa |
|---|---|---|---|
| C-04 | Keenam fitur F1 sampai F6 dipertahankan | Semua fitur dapat dibuat dengan geometri Three.js sederhana | ya |
| C-05 | F1, F3, F6 = must; F2, F5 = should; F4 = could | Fitur inti untuk eksplorasi dan belajar dikerjakan dulu karena tenggat sekitar 1 hari | ya |

## Assistant Proposals

| Bidang SPEC | Nilai yang diusulkan asisten | Alasan singkat | Disetujui mahasiswa |
|---|---|---|---|
| meta.one_liner | "Website 3D interaktif untuk belajar bagian dan fungsi ruangan rumah modern minimalis, dibuat dengan Three.js." | Ringkasan satu kalimat dari ide proyek | ya |
| meta.duration_weeks | 1 | Batas minimum skema; waktu nyata sekitar 1 hari | ya |
| users[0].quote | "(ilustrasi) Saya ingin belajar desain rumah, tetapi dari video saya hanya dapat teori dan belum bisa mencoba melihat bagian-bagiannya." | Kutipan persona dirumuskan asisten dan diberi label ilustrasi | ya |
| features[0].acceptance | Kriteria F1: seret memutar; zoom berhenti di batas jarak | Dibuat dapat diuji | ya |
| features[1].acceptance | Kriteria F2: Interior View menyembunyikan atap dan satu sisi dinding | Dibuat dapat diuji | ya |
| features[2].acceptance | Kriteria F3: Exploded View memisahkan bagian; saling meniadakan dengan Interior View | Dibuat dapat diuji; memuat aturan konflik | ya |
| features[3].acceptance | Kriteria F4: Day/Night mengubah langit dan cahaya; warna pilihan tetap | Dibuat dapat diuji | ya |
| features[4].acceptance | Kriteria F5: warna satu bagian berubah tanpa memengaruhi bagian lain | Dibuat dapat diuji | ya |
| features[5].acceptance | Kriteria F6: info lewat Daftar Ruangan; klik di model saat Interior View aktif | Dibuat dapat diuji; memuat aturan konflik | ya |
| data.entities | Ruangan (id, nama, fungsi) dan BagianRumah (id, nama, kelompok, warnaBawaan) | Data minimal agar F2, F3, F5, F6 berjalan | ya |
| design.primary_color | #111111 | Mewakili pilihan mahasiswa "putih dan hitam" dalam kode warna | ya |
| design.font | Font sans-serif bawaan sistem | Tanpa berkas font tambahan agar ringan | ya |
| platform_specific.web.rendering | static | Padanan dari pilihan "frontend saja" | ya |
| risks | Klik ruangan di model 3D memakan waktu; performa 3D di smartphone | Risiko teknis yang realistis | ya |

**Konflik antar kriteria yang diselesaikan saat penyusunan SPEC:**

1. **F6 dan F2.** F6 (must) membutuhkan ruangan yang bisa dipilih, sedangkan ruangan baru terlihat lewat F2 (should). Keputusan (disetujui mahasiswa): F6 bisa dipakai lewat panel Daftar Ruangan; klik langsung di model 3D hanya saat Interior View aktif.
2. **F2 dan F3.** Keduanya mengubah posisi atap dan dinding. Keputusan (disetujui mahasiswa): keduanya saling meniadakan; mengaktifkan salah satu otomatis mematikan yang lain.

## Open Questions

| Pertanyaan | Pemilik | Kapan diputuskan |
|---|---|---|
| Versi Vite, Three.js, Vitest, ESLint, dan Node.js LTS (verifikasi dengan `npm view <paket> version` dan `node --version`; baris terkait di `tech-baseline.md` bertanda belum dicek) | Mahasiswa | Saat T-001 |
| Daftar dan jumlah ruangan pada model rumah | Mahasiswa | Saat T-002 |
| Daftar pilihan warna untuk F5 | Mahasiswa | Saat T-009 |
| Struktur folder hasil scaffold resmi Vite (template vanilla) sesuai `docs/ARCHITECTURE.md` | Mahasiswa | Saat T-001 |
| Batas paket gratis Vercel untuk kebutuhan proyek ini (cek paket terbaru) | Mahasiswa | Sebelum T-004 |
| Apakah smartphone tersedia untuk uji manual | Mahasiswa | Sebelum T-007 |
| Target frame rate di smartphone (belum ditetapkan; usulan perlu disepakati) | Mahasiswa | Saat T-011 |
