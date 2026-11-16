# Product Requirements Document: MiniHouse 3D Explorer

> Website 3D interaktif untuk belajar bagian dan fungsi ruangan rumah modern minimalis, dibuat dengan Three.js.

## Overview

| Field | Isi |
|---|---|
| Nama produk | MiniHouse 3D Explorer |
| Platform | web |
| Level proses | dasar |
| Tagline | Jelajahi rumah 3D, pahami bagian dan fungsinya. |
| Tim dan waktu | 1 orang; nilai `duration_weeks` dicatat 1 (batas minimum skema), sedangkan waktu nyata sekitar 1 hari sampai tenggat Senin, 16 November 2026 pukul 23.59 WIB |

## Problem

Siswa/mahasiswa yang ingin mempelajari desain rumah saat ini belajar hanya dengan menonton video YouTube. Cara itu membuat mereka melihat rumah dari sudut pandang yang sudah ditentukan pembuat video, tanpa bisa mencoba sendiri. Jika dibiarkan, pemahaman mereka hanya sebatas teori tanpa praktik yang jelas. MiniHouse 3D Explorer menjadi tempat mereka memutar, membuka, dan memisahkan model rumah sederhana agar bentuk, bagian, dan fungsi ruangan dapat dipahami lewat praktik langsung.

## Goals and Non-Goals

### Goals

1. Siswa/mahasiswa dapat memahami desain rumah dengan baik lewat eksplorasi model rumah 3D; diamati lewat dua metrik di bagian *Success Metrics* (fungsi berjalan tanpa error, dan pengguna dapat menjawab pertanyaan sederhana tentang fungsi ruangan).
2. Siswa/mahasiswa mungkin dapat menerapkan apa yang sudah dipelajari; tujuan ini bersifat pendukung dan tidak diukur langsung pada versi pertama.

### Non-Goals

1. Membangun rumah yang spesifik atau berada di ranah profesional. Proyek ini media belajar dasar dengan satu model rumah sederhana, bukan alat perancang profesional.

## Target Users

| Persona | Kebutuhan | Kutipan |
|---|---|---|
| Siswa/mahasiswa yang ingin mempelajari desain rumah | Memahami bentuk rumah, bagian-bagiannya, dan fungsi ruangan lewat praktik langsung, bukan hanya teori dari video. | "Saya ingin belajar desain rumah, tetapi dari video saya hanya dapat teori dan belum bisa mencoba melihat bagian-bagiannya." (ilustrasi, dirumuskan asisten) |
| Kondisi pengguna | Antarmuka berbahasa Indonesia; responsif di desktop, tablet, dan smartphone. | - |

## Core Features

### F1 - Rotate and Zoom (must)

Pengguna dapat memutar dan memperbesar atau memperkecil tampilan rumah 3D.

Acceptance Criteria:
- Saat pengguna menyeret mouse atau jari pada kanvas 3D, rumah berputar mengikuti arah seret.
- Saat pengguna menggulir roda mouse atau mencubit layar, tampilan memperbesar atau memperkecil, dan berhenti pada batas jarak minimum dan maksimum kamera.

### F2 - Interior View (should)

Pengguna dapat melihat bagian dalam rumah dengan menyembunyikan atap dan satu sisi dinding.

Acceptance Criteria:
- Saat tombol Interior View ditekan, atap dan satu sisi dinding tersembunyi sehingga isi ruangan terlihat.
- Saat tombol Interior View ditekan lagi, atap dan dinding muncul kembali seperti semula.

### F3 - Exploded View (must)

Bagian rumah seperti atap, dinding, dan lantai dapat dipisahkan untuk memperlihatkan susunannya.

Acceptance Criteria:
- Saat tombol Exploded View ditekan, atap, dinding, dan lantai bergeser terpisah dengan animasi.
- Saat tombol Exploded View ditekan lagi, semua bagian kembali ke posisi semula.
- Saat Interior View aktif lalu Exploded View ditekan, Interior View otomatis nonaktif; berlaku juga sebaliknya.

### F4 - Day/Night Mode (could)

Pengguna dapat mengubah suasana pencahayaan rumah antara siang dan malam.

Acceptance Criteria:
- Saat tombol Day/Night ditekan, warna langit dan intensitas cahaya berubah ke suasana malam; saat ditekan lagi, kembali ke suasana siang.
- Saat mode malam aktif, warna bagian rumah yang dipilih lewat Change Color tetap sama.

### F5 - Change Color (should)

Pengguna dapat mengubah warna bagian-bagian rumah.

Acceptance Criteria:
- Saat pengguna memilih warna untuk satu bagian rumah (mis. dinding atau atap), warna bagian itu berubah di model 3D seketika.
- Saat satu bagian berubah warna, bagian rumah lain tidak ikut berubah.

### F6 - Room Information (must)

Pengguna dapat melihat nama dan fungsi ruangan.

Acceptance Criteria:
- Saat pengguna memilih nama ruangan di panel Daftar Ruangan, panel informasi menampilkan nama dan fungsi ruangan itu, dan ruangan tersebut disorot di model 3D.
- Saat Interior View aktif dan pengguna mengklik sebuah ruangan di model 3D, panel informasi yang sama menampilkan nama dan fungsi ruangan tersebut.

## User Flows

**Alur 1: Mengenal bentuk dan susunan rumah (F1, F3).**
1. Pengguna membuka URL website; model rumah 3D tampil di tengah layar.
2. Pengguna menyeret layar untuk memutar rumah dan menggulir atau mencubit untuk zoom (F1).
3. Pengguna menekan tombol Exploded View; atap, dinding, dan lantai terpisah (F3).
4. Pengguna menekan tombol lagi; bagian rumah kembali menyatu.
- Keadaan galat: bila browser tidak mendukung WebGL, halaman menampilkan pesan bahwa tampilan 3D tidak dapat dimuat dan menyarankan browser lain.

**Alur 2: Mempelajari fungsi ruangan (F6, F2).**
1. Pengguna membuka panel Daftar Ruangan dan memilih satu nama ruangan (F6).
2. Panel informasi menampilkan nama dan fungsi ruangan, dan ruangan disorot di model.
3. Pengguna menekan Interior View, lalu mengklik ruangan lain langsung di model 3D (F2, F6).
- Keadaan galat: bila data ruangan gagal dimuat dari berkas data, panel menampilkan pesan "Data ruangan belum tersedia" dan fitur lain tetap berjalan.

**Alur 3: Mencoba warna dan suasana (F5, F4).**
1. Pengguna memilih satu bagian rumah dan satu warna (F5).
2. Warna bagian itu berubah, bagian lain tidak.
3. Pengguna menekan Day/Night; suasana berganti malam dan warna pilihan tetap (F4).

## AI Features

Tidak ada fitur AI di dalam aplikasi.

## Non-Functional Requirements

| Kategori | Persyaratan |
|---|---|
| Performa | Model 3D harus tampil dan dapat diputar tanpa tersendat pada desktop dan smartphone; angka target frame rate belum ditetapkan dan diusulkan untuk disepakati saat pengujian. |
| Aksesibilitas | Mengikuti WCAG 2.2 AA untuk bagian antarmuka 2D: kontras, fokus keyboard terlihat, label tombol jelas, dan tidak bergantung pada warna saja. |
| Kondisi pengguna | Antarmuka berbahasa Indonesia; responsif di desktop, tablet, dan smartphone. |
| Bahasa antarmuka | Bahasa Indonesia saja (`i18n` = false). |
| Privasi data | Tidak ada data pribadi (`personal_data` = none); tanpa login dan tanpa penyimpanan data pengguna. |
| Ketersediaan | Website statis di Vercel; tidak ada server sendiri yang harus dijaga. |

## Success Metrics

| Metrik | Target | Cara Ukur |
|---|---|---|
| Fungsionalitas aplikasi | Pengguna dapat memutar objek rumah 3D, melakukan zoom in dan zoom out, serta melihat rumah dari berbagai sudut. | Pengujian langsung di browser untuk memastikan seluruh fitur berjalan tanpa error. |
| Pemahaman pengguna | Pengguna dapat memahami fungsi dasar ruangan dan mengenali bagian-bagian rumah setelah mencoba aplikasi. | Beberapa teman mencoba aplikasi, lalu diberi pertanyaan sederhana tentang fungsi ruangan yang mereka lihat. |

## Risks and Open Questions

### Risiko menurut mahasiswa

"Risiko terbesar proyek ini adalah keterbatasan waktu pengerjaan karena tenggat pengumpulan sangat dekat. Saya khawatir website belum selesai, fitur simulasi 3D belum berjalan dengan baik, atau deployment ke Vercel mengalami kendala sehingga URL tidak bisa diakses saat dikumpulkan."

### Kendali risiko yang disetujui mahasiswa

- **R1**: "Fitur Should dan Could tidak dikerjakan sebelum F1, F3, dan F6 berjalan, dan tiap fitur Must dibuat dulu dalam versi paling sederhana; hasilnya di browser rumah bisa diputar dan di-zoom (F1), tombol Exploded memisahkan bagian rumah (F3), dan mengklik ruangan menampilkan nama dan fungsinya (F6)." Fitur terdampak: F1, F3, F6 (dan penundaan F2, F4, F5).
- **R2**: "Sesudah F1 berjalan, website langsung di-deploy ke Vercel, dan deploy diulang setiap fitur Must selesai; hasilnya URL Vercel bisa dibuka dari browser lain (mis. HP) dan menampilkan rumah 3D sebelum fitur berikutnya dimulai." Fitur terdampak: F1, F3, F6.
- **R3**: "Sebelum tenggat, jalankan npm test, npm run lint, dan npm run build, lalu buka URL Vercel di browser; hasilnya ketiga perintah selesai tanpa error dan URL terbuka dengan fitur Must berfungsi." Fitur terdampak: F1, F3, F6.

### Risiko teknis (usulan asisten)

- Klik ruangan langsung di model 3D (F6) memerlukan deteksi objek di adegan 3D dan bisa memakan waktu lebih lama dari perkiraan. Mitigasi: F6 lebih dulu dibuat lewat panel Daftar Ruangan (lihat R1), dan klik langsung di model menyusul setelah F2 berjalan.
- Performa render 3D bisa menurun di smartphone sehingga animasi tidak mulus. Mitigasi: gunakan geometri sederhana dan uji di satu HP sebelum pengumpulan (R2, R3).

### Pertanyaan terbuka

- Berapa jumlah dan nama ruangan pada model rumah (mis. kamar tidur, dapur)? Daftar ini perlu ditetapkan mahasiswa saat mengerjakan T-002 di `docs/TASKS.md`.
- Pilihan warna apa saja yang disediakan untuk F5? Perlu diputuskan saat fitur dikerjakan.
- Apakah perangkat uji untuk smartphone sudah tersedia? Perlu dipastikan sebelum R3 dijalankan.
