# Lessons: MiniHouse 3D Explorer

Kesalahan berulang dan pelajaran dari proyek ini. **Dibaca agen di awal setiap sesi.** Entri baru ditambahkan oleh mahasiswa atau agen setelah kesalahan ditemukan.

## How to Use

- Tambahkan entri bila ada galat yang memakan waktu lebih dari 30 menit, perilaku agen yang salah dan berulang, atau temuan saat review.
- Format entri: satu baris tabel dengan tanggal, gejala, akar masalah, aturan baru, dan tempat aturan diterapkan.
- Ubah pelajaran menjadi aturan dengan menambahkannya ke `docs/CODE_STYLE.md`, `docs/GUARDRAILS.md`, atau `docs/EVALS.md`.
- Tulis singkat dan tanpa menyalahkan.

## Lessons Log

| Tanggal | Kesalahan atau gejala | Akar masalah | Aturan baru | Diterapkan di |
|---|---|---|---|---|
| Awal (belum terjadi di proyek ini) | AI menyarankan fungsi atau kelas Three.js yang tidak ada, atau memakai cara lama yang sudah berubah | Pengetahuan model tentang versi Three.js bisa usang | Cek setiap API Three.js di dokumentasi resmi sebelum dipakai | `docs/CODE_STYLE.md` (AI-Generated Code Rules) |
| Awal (belum terjadi di proyek ini) | Tes diubah atau dimatikan agar lulus | Agen mengejar status lulus, bukan perilaku benar | Tes tidak boleh dilemahkan; perbaiki penyebabnya | `docs/GUARDRAILS.md` (Hard Limits) |
| Awal (belum terjadi di proyek ini) | Fitur Should (F2, F5, F4) dikerjakan sebelum F1, F3, F6 selesai | Godaan menambah fitur yang menarik | Fitur Must dulu dalam versi sederhana (R1) | `docs/GUARDRAILS.md` dan `docs/TASKS.md` |
| Awal (belum terjadi di proyek ini) | Deploy ke Vercel baru dicoba di akhir dan ternyata gagal | Konfigurasi hosting tidak diuji lebih awal | Deploy awal dan berulang, lalu buka URL (R2) | `docs/EVALS.md` dan `docs/TASKS.md` |
| Awal (belum terjadi di proyek ini) | Paket dengan nama salah eja atau karangan dipasang | AI menyebut nama paket yang tidak ada | Verifikasi dengan `npm view <paket>` sebelum instal | `docs/CODE_STYLE.md` (Dependencies) |

## Patterns to Watch

1. **API Three.js usang atau salah impor.** Impor dari paket `three` berubah antar versi. Deteksi: galat di konsol browser atau lint, dan cocokkan dengan dokumentasi resmi.
2. **Objek 3D dibuat ulang di setiap frame.** Animasi patah-patah terutama di smartphone. Deteksi: periksa kode di fungsi animasi dan uji di satu HP.
3. **Kanvas tidak mengikuti ukuran jendela.** Model terpotong atau buram di layar kecil. Deteksi: ubah ukuran jendela dan buka di smartphone.
4. **Rahasia atau nilai pada variabel `VITE_`.** Nilainya ikut tertanam di berkas yang dikirim ke browser. Deteksi: cari `VITE_` di kode dan `.env.example`.
5. **Skrip `lint` atau `test` tidak ada di `package.json`.** Perintah gagal atau CI tidak berjalan. Deteksi: jalankan `npm run lint` dan `npm test` setelah T-001.

## Reflection Prompts

1. Keputusan apa yang kamu ubah selama pengerjaan, dan mengapa? 
2. Bagian mana yang dikerjakan AI dengan baik, dan mana yang salah atau perlu kamu perbaiki?
3. Apakah urutan fitur Must dulu (R1) membantu menyelesaikan tugas tepat waktu? Jelaskan.
4. Apa yang akan kamu lakukan berbeda jika mengerjakan proyek ini lagi?
5. Apa yang kamu pelajari tentang Three.js dan desain rumah lewat proyek ini?
