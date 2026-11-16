# Design System: MiniHouse 3D Explorer

## Principles

1. **Minimalis dan tenang.** Antarmuka hanya memakai putih, hitam, dan abu-abu supaya perhatian tertuju pada model rumah. Contoh: tombol fitur berupa satu baris tombol polos di tepi layar, tanpa ikon berwarna.
2. **Model rumah adalah pusat.** Kanvas 3D mengisi area terbesar, dan panel hanya muncul bila dibutuhkan. Contoh: panel informasi ruangan (F6) muncul di samping atau bawah kanvas dan dapat ditutup.
3. **Belajar lewat mencoba.** Setiap tombol menjelaskan hasilnya lewat label yang jelas dan keadaan aktif yang terlihat. Contoh: tombol Exploded View berubah gaya saat aktif dan kembali normal saat ditekan lagi (F3).
4. **Satu layar untuk semua perangkat.** Tata letak responsif untuk desktop, tablet, dan smartphone. Contoh: di smartphone, tombol pindah ke baris bawah dan panel informasi tampil sebagai lembar di bagian bawah.
5. **Bahasa Indonesia yang sederhana.** Kalimat pendek dan istilah rumah yang umum, karena pengguna adalah siswa/mahasiswa yang baru belajar. Contoh: "Fungsi ruangan" bukan istilah teknis arsitektur.

## Color Tokens

Mode tampilan hanya terang; `dark_mode` = false sehingga tidak ada nilai gelap. Rasio kontras berikut sudah dihitung dengan rumus WCAG terhadap latar putih (#FFFFFF).

| Token | Nilai | Penggunaan |
|---|---|---|
| `--color-primary` | #111111 | Warna utama: tombol terisi, judul, teks utama (kontras 18,88:1 terhadap putih) |
| `--color-secondary` | #555555 | Teks sekunder dan ikon redup (kontras 7,46:1) |
| `--color-bg` | #FFFFFF | Latar halaman |
| `--color-surface` | #F5F5F5 | Latar panel dan kartu (teks #111111 di atasnya 17,32:1) |
| `--color-text` | #111111 | Teks isi |
| `--color-text-muted` | #555555 | Teks redup dan keterangan (7,46:1) |
| `--color-border` | #8A8A8A | Garis tepi kontrol dan input (3,45:1, memenuhi minimal 3:1 untuk elemen UI) |
| `--color-success` | #1A7F37 | Pesan berhasil (5,08:1) |
| `--color-warning` | #9A6700 | Pesan peringatan (4,87:1) |
| `--color-danger` | #C62828 | Pesan galat (5,62:1) |
| `--color-focus` | #1D4ED8 | Cincin fokus keyboard (6,70:1) |

Teks putih di atas tombol hitam (#FFFFFF pada #111111) memiliki kontras 18,88:1. Warna pilihan pengguna pada model 3D (F5) bukan token antarmuka, melainkan data di `src/data/parts.js`.

## Typography

Font: font sans-serif bawaan sistem (`system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`), sehingga tidak ada berkas font yang dimuat.

| Gaya | Ukuran | Bobot | Tinggi baris | Penggunaan |
|---|---|---|---|---|
| Judul | 28 px | 700 | 1,25 | Nama aplikasi di bagian atas |
| Subjudul | 20 px | 600 | 1,3 | Judul panel (mis. nama ruangan) |
| Isi | 16 px | 400 | 1,5 | Teks panel informasi dan label |
| Keterangan | 14 px | 400 | 1,4 | Petunjuk singkat di bawah tombol |
| Kode | 14 px | 400 | 1,4 | Tidak dipakai di antarmuka pengguna |

Ukuran isi minimal 16 px sesuai aturan kit untuk web.

## Spacing and Layout

Skala jarak berbasis 4 px: `--space-1` 4 px, `--space-2` 8 px, `--space-3` 12 px, `--space-4` 16 px, `--space-6` 24 px, `--space-8` 32 px.

Kerangka layout: kanvas 3D memenuhi lebar dan tinggi area utama; bilah tombol di bagian atas atau bawah kanvas; panel Daftar Ruangan dan panel informasi berdampingan di layar lebar dan bertumpuk di layar sempit.

| Breakpoint | Lebar | Tata letak |
|---|---|---|
| Smartphone | di bawah 640 px | Satu kolom; kanvas di atas, tombol di bawahnya, panel sebagai lembar bawah |
| Tablet | 640 px sampai 1023 px | Kanvas penuh, panel di sisi kanan sempit atau bawah |
| Desktop | 1024 px ke atas | Kanvas di kiri, panel di kanan; lebar konten maksimum 1440 px |

Padding panel 16 px (smartphone) dan 24 px (desktop). Nilai breakpoint di atas adalah usulan awal dan boleh disesuaikan saat pengerjaan.

## Components

Tidak memakai pustaka UI; komponen dibuat dengan HTML dan CSS sendiri.

| Komponen | Varian | Status | Aturan pemakaian |
|---|---|---|---|
| Tombol fitur (Interior View, Exploded View, Day/Night) | Tombol alih (toggle) | default, fokus, aktif, nonaktif | Label berupa teks; keadaan aktif ditandai gaya terisi hitam dengan teks putih dan atribut `aria-pressed`. |
| Panel Daftar Ruangan | Daftar tombol | default, fokus, terpilih | Satu tombol per ruangan; item terpilih ditandai garis tebal dan latar `--color-surface` (F6). |
| Panel informasi ruangan | Kartu | default, kosong, galat | Menampilkan nama (subjudul) dan fungsi (isi); keadaan kosong menampilkan "Pilih ruangan untuk melihat fungsinya." |
| Pemilih warna | Kumpulan tombol warna | default, fokus, terpilih | Menampilkan daftar warna terbatas dan pilihan bagian rumah; setiap tombol punya label teks, bukan hanya warna (F5). |
| Kanvas 3D | Satu elemen kanvas | memuat, galat | Memenuhi area utama; bila WebGL tidak tersedia, tampilkan pesan pengganti. |
| Pesan status | Teks dengan peran `status` | sukses, peringatan, galat | Dipakai untuk pesan seperti data ruangan gagal dimuat. |

## Accessibility

- Kontras teks minimal 4,5:1 dan elemen UI minimal 3:1; nilainya tercantum di Color Tokens.
- Fokus keyboard terlihat dengan cincin `--color-focus` setebal 2 px.
- Urutan tab mengikuti urutan visual: tombol fitur, panel Daftar Ruangan, pemilih warna.
- Setiap tombol dan input punya label teks; tombol alih memakai `aria-pressed`.
- Tombol dan target sentuh minimal 24 x 24 CSS px; pada smartphone gunakan 44 sampai 48 px.
- Informasi tidak hanya lewat warna: keadaan aktif juga ditandai gaya dan teks.
- Hormati preferensi gerak berkurang (`prefers-reduced-motion`): animasi Exploded View dan transisi kamera dipersingkat atau dihilangkan.
- Kanvas 3D diberi teks alternatif singkat, dan informasi ruangan tersedia juga sebagai teks di panel agar terbaca pembaca layar.
- Antarmuka berbahasa Indonesia dan berfungsi di desktop, tablet, dan smartphone (kebutuhan pengguna dari SPEC).

## Motion and Feedback

Aturan animasi: durasi 200 sampai 400 ms dengan easing lembut (ease-in-out) untuk Exploded View dan perpindahan kamera; matikan atau pendekkan saat pengguna memilih gerak berkurang.

Keadaan antarmuka:
- Memuat: tampilkan teks "Memuat model rumah..." di atas kanvas.
- Kosong: panel informasi menampilkan "Pilih ruangan untuk melihat fungsinya."
- Galat dan sukses: pesan singkat dengan langkah berikutnya.

Contoh pesan galat:
1. "Tampilan 3D tidak dapat dimuat di browser ini. Coba buka dengan Chrome, Edge, atau Firefox versi terbaru."
2. "Data ruangan belum tersedia. Muat ulang halaman, atau lanjutkan menjelajah tanpa informasi ruangan."
3. "Warna ini tidak tersedia untuk bagian yang dipilih. Pilih salah satu warna dari daftar."

## Content and Voice

Gaya bahasa antarmuka: bahasa Indonesia yang ramah, jelas, dan singkat; satu kalimat satu gagasan; tidak memakai istilah arsitektur yang rumit tanpa penjelasan.

Glosarium istilah yang dipakai konsisten:

| Istilah | Arti dalam aplikasi |
|---|---|
| Model rumah | Objek rumah 3D yang bisa dijelajahi |
| Ruangan | Satu bagian dalam rumah dengan nama dan fungsi (F6) |
| Bagian rumah | Atap, dinding, atau lantai (F2, F3, F5) |
| Exploded View | Tampilan bagian rumah yang dipisah (F3) |
| Interior View | Tampilan bagian dalam rumah (F2) |
| Mode Siang/Malam | Perubahan suasana cahaya (F4) |
| Daftar Ruangan | Panel berisi nama-nama ruangan (F6) |

Format angka dan tanggal mengikuti kebiasaan Indonesia bila ditampilkan; saat ini aplikasi tidak menampilkan tanggal maupun mata uang.
