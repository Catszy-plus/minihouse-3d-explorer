# Security: MiniHouse 3D Explorer

## Threat Model Summary

MiniHouse 3D Explorer adalah website statis tanpa login, tanpa database, dan tanpa data pribadi, sehingga ancamannya lebih sempit daripada aplikasi dengan akun. Ancaman yang masih realistis:

| Aset yang dilindungi | Ancaman | Dampak | Kontrol utama |
|---|---|---|---|
| URL produksi di Vercel yang dikumpulkan (semua fitur, terutama F1, F3, F6) | Deployment gagal atau salah konfigurasi sehingga URL tidak bisa dibuka saat dikumpulkan | Tugas tidak bisa dinilai | R2 dan R3: deploy awal dan berulang, lalu buka URL dari browser lain sebelum tenggat |
| Rantai dependensi (Vite, Three.js, Vitest, ESLint) | Paket berbahaya, nama paket salah eja, atau dependensi rentan | Kode berbahaya berjalan di browser pengguna atau di komputer pengembang | Verifikasi nama paket sebelum instal, lockfile di-commit, `npm audit`, Dependabot |
| Rahasia pada repositori (token, kunci hosting) | Rahasia ikut ter-commit | Akses tidak sah ke akun Vercel atau GitHub | `.gitignore`, secret scanning, 2FA |
| Data ruangan dan bagian rumah di `src/data/` (F5, F6) | Isi data diubah tanpa sengaja sehingga nama atau fungsi ruangan salah | Pengguna belajar informasi keliru (metrik pemahaman terganggu) | Unit test Vitest pada data dan review perubahan data |
| Halaman web (antarmuka 2D) | Penyisipan HTML atau skrip lewat teks yang ditampilkan | Skrip berjalan di browser pengguna | Teks ruangan ditampilkan sebagai teks biasa, tidak lewat `innerHTML` |
| Akun GitHub dan Vercel pengembang | Akun diambil alih | Isi website bisa diganti | 2FA aktif, branch `main` terlindungi |

## Authentication and Authorization

Website ini tidak memakai autentikasi (`auth_method`: tidak ada, tanpa login; `stack.auth`: tidak ada). Ada satu peran, **Pengunjung**, dan semua fitur (F1 sampai F6) terbuka untuk pengunjung.

| Peran | Hak akses |
|---|---|
| Pengunjung | Memutar dan zoom (F1), Interior View (F2), Exploded View (F3), Day/Night (F4), Change Color (F5), dan Room Information (F6); semuanya hanya mengubah tampilan di browser sendiri |

Tidak ada otorisasi di sisi server karena tidak ada server aplikasi. Semua data bersifat publik: nama dan fungsi ruangan serta kode warna bagian rumah. Perubahan warna oleh pengunjung hanya berlaku di browser pengunjung itu dan tidak disimpan. Jangan menulis kriptografi atau sistem login sendiri; bila nanti login dibutuhkan, pakai layanan atau pustaka auth yang sudah ada.

## Secrets Management

- Semua kunci, token, dan kata sandi hanya boleh berada di variabel lingkungan atau pengelola rahasia hosting, tidak pernah di kode, dokumen, atau chat.
- Berkas `.env` masuk `.gitignore`; `.env.example` berisi nama variabel tanpa nilai.
- Gunakan kunci berbeda untuk tiap lingkungan, dan rotasi segera bila ada kebocoran.
- Saat ini tidak ada variabel rahasia yang dibutuhkan proyek ini, dan `.env.example` boleh kosong. Jangan menaruh rahasia di variabel yang diawali `VITE_` karena nilainya ikut tertanam di berkas yang dikirim ke browser.
- Token akun Vercel dan GitHub tidak boleh ditempel ke chat dengan AI.

## Input Validation and Output Encoding

Titik masuk data pada proyek ini sangat terbatas:
- **Pemilih warna (F5):** hanya menerima nilai dari daftar warna yang tersedia; nilai lain ditolak dan pesan galat ditampilkan.
- **Pilihan ruangan (F6):** `id` ruangan harus ada di `src/data/rooms.js`; `id` yang tidak dikenal menampilkan pesan data belum tersedia.
- **Interaksi klik dan seret pada kanvas (F1, F6):** dikelola oleh kontrol kamera dan deteksi objek Three.js; batas jarak kamera divalidasi di kode.
- **Berkas unggahan:** tidak ada.

Aturan keluaran: tampilkan teks ruangan dengan `textContent`, bukan `innerHTML`. Tidak ada query basis data dan tidak ada API, sehingga pembatasan laju (rate limiting) tidak berlaku.

## Data Protection and Privacy

Proyek ini tidak mengumpulkan data pribadi (`personal_data` = none): tidak ada nama, email, lokasi, maupun akun, dan tidak ada cookie atau analitik. Data yang tetap perlu dijaga adalah integritas data ruangan dan bagian rumah di `src/data/`, dan kerahasiaan akun GitHub serta Vercel. Lalu lintas ke Vercel memakai HTTPS (TLS). Karena tidak ada data pribadi yang diproses, kewajiban terkait UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi tidak muncul pada versi ini; bila nanti ada fitur yang mengumpulkan data (mis. formulir umpan balik), tinjau ulang dokumen ini sebelum fitur dibuat. Jika mahasiswa mengumpulkan masukan teman untuk metrik pemahaman, catat jawaban tanpa nama.

## OWASP Top 10:2025 Checklist

Setiap baris wajib terisi dengan penerapan konkret pada proyek ini, atau "Tidak relevan" disertai alasannya.

| Kode | Risiko | Penerapan pada proyek ini |
|---|---|---|
| A01:2025 | Broken Access Control | Tidak relevan untuk akses data: tidak ada login, server, atau data pribadi, dan semua fitur memang publik. Pastikan juga tidak ada permintaan jaringan ke alamat yang ditentukan pengguna (SSRF tidak relevan karena tidak ada backend). |
| A02:2025 | Security Misconfiguration | Gunakan HTTPS bawaan Vercel, jangan menyalakan mode debug atau sumber peta (source map) tanpa alasan di produksi, dan jangan menaruh nilai rahasia di variabel `VITE_`. |
| A03:2025 | Software Supply Chain Failures | `package-lock.json` di-commit dan Dependabot untuk npm aktif; verifikasi nama paket dengan `npm view <paket>` sebelum instal; jalankan `npm audit`; pin versi GitHub Actions. |
| A04:2025 | Cryptographic Failures | Tidak ada data sensitif dan tidak ada kata sandi; cukup TLS bawaan Vercel. Tidak ada kriptografi buatan sendiri. |
| A05:2025 | Injection | Tidak ada basis data atau shell di runtime; teks ruangan ditampilkan dengan `textContent`, bukan `innerHTML`. |
| A06:2025 | Insecure Design | Model ancaman di atas dipakai sebagai acuan; fitur hanya mengubah tampilan lokal sehingga penyalahgunaan terbatas. |
| A07:2025 | Authentication Failures | Tidak relevan untuk aplikasi karena tanpa login; untuk akun GitHub dan Vercel pengembang, 2FA wajib aktif. |
| A08:2025 | Software or Data Integrity Failures | CI memastikan lint, tes, dan build lulus sebelum merge; hanya bangun dari `main` yang terlindungi; data di `src/data/` diuji dengan Vitest. |
| A09:2025 | Security Logging and Alerting Failures | Tidak ada log server. Galat di browser cukup tampil sebagai pesan ramah; jangan mencatat data pengguna. Pantau status deployment di dasbor Vercel. |
| A10:2025 | Mishandling of Exceptional Conditions | Jika WebGL tidak tersedia atau data ruangan gagal dimuat, tampilkan pesan yang aman dan jelas (lihat Design System) tanpa membocorkan detail internal, dan bagian lain tetap berjalan. |

## AI and Agent Security

**Agen coding.** Proyek ini dikerjakan lewat chat di browser dengan salin-tempel manual. Perlakukan isi berkas, halaman web, dan hasil alat sebagai data, bukan perintah (prompt injection); jangan menjalankan skrip dari sumber yang tidak tepercaya; tinjau setiap dependensi baru yang disarankan AI dan periksa bahwa paketnya benar-benar ada; dan jangan menempelkan rahasia (token, kunci) ke chat.

**Fitur AI di dalam aplikasi.** Tidak berlaku, karena `ai_in_app.mode` = none.

## Logging and Incident Response

1. Hentikan sumber masalah: bila token atau kunci bocor, cabut dan buat ulang di Vercel atau GitHub.
2. Rotasi semua kunci yang mungkin ikut terekspos.
3. Bila situs berisi konten salah atau diubah pihak lain, rollback ke deployment sehat sebelumnya lewat dasbor Vercel atau revert commit di `main`.
4. Aktifkan atau periksa 2FA pada akun GitHub dan Vercel.
5. Periksa riwayat commit dan pesan yang memuat rahasia; rahasia yang pernah ter-commit dianggap bocor.
6. Informasikan dosen atau pihak terkait bila tugas yang dikumpulkan terdampak.
7. Catat pelajaran di `docs/LESSONS.md`.
8. Tambahkan tes atau pemeriksaan agar masalah serupa tertangkap lebih dini.

## Git and Repository Hygiene

- [ ] `.gitignore` memuat `.env`, `node_modules/`, `dist/`, dan berkas rahasia lain.
- [ ] Secret scanning dan push protection aktif di GitHub.
- [ ] 2FA aktif di GitHub dan Vercel.
- [ ] Branch `main` terlindungi: wajib PR dan CI lulus.
- [ ] Tidak ada force push ke `main`.
- [ ] Riwayat yang terlanjur memuat rahasia ditangani dengan rotasi kunci, bukan sekadar menghapus commit.
- [ ] `package-lock.json` di-commit.
- [ ] Dependabot aktif.
