# Code Style: MiniHouse 3D Explorer

## Language and Tooling

Bahasa: JavaScript modern (modul ES) yang dijalankan di browser. Versi alat: latest stable (verifikasi dengan `npm view vite version`, `npm view three version`, `npm view eslint version`, dan `node --version` untuk Node.js LTS aktif). Pemformat dan linter standar ekosistem node adalah ESLint (Prettier atau Biome boleh ditambahkan bila perlu). Mode ketat tersedia lewat modul ES (`"type": "module"`) dan aturan ESLint yang melarang variabel tak terpakai. Perintah lint persis: `npm run lint`.

## Naming

| Objek | Konvensi | Contoh |
|---|---|---|
| Berkas dan folder | kebab-case huruf kecil | `rooms.js`, `exploded-view.js`, `scene/` |
| Variabel dan fungsi | camelCase | `selectedRoom`, `toggleExplodedView()` |
| Kelas | PascalCase | `HouseModel` |
| Konstanta | UPPER_SNAKE_CASE | `MAX_ZOOM_DISTANCE` |
| Entitas data | PascalCase pada deskripsi, camelCase pada objek | `Ruangan` ditulis sebagai `rooms[]` dengan field `id`, `nama`, `fungsi`; `BagianRumah` sebagai `parts[]` dengan field `id`, `nama`, `kelompok`, `warnaBawaan` |
| Fitur | Awalan ID fitur di komentar tes dan commit | `F3 exploded view` |
| Variabel lingkungan | UPPER_SNAKE_CASE dengan awalan `VITE_` bila dipakai di klien | belum ada yang dipakai |
| ID elemen HTML | kebab-case | `room-list`, `info-panel` |

## Structure and Patterns

Pisahkan tanggung jawab: kode Three.js di `src/scene/`, data di `src/data/`, antarmuka HTML/CSS di `src/ui/`, dan penyambung di `src/main.js`. Logika murni (mis. menghitung posisi bagian saat Exploded View, aturan Interior dan Exploded saling meniadakan, memilih ruangan berdasarkan `id`) dibuat sebagai fungsi biasa di berkas terpisah agar bisa diuji Vitest tanpa menjalankan Three.js. Fungsi disarankan tidak lebih dari sekitar 40 baris dan berkas tidak lebih dari sekitar 300 baris. Hindari pola: logika aturan fitur yang ditulis langsung di dalam penangan klik tombol.

Contoh untuk F3 dan F2 (benar):

```js
// src/scene/view-state.js
export function enableExploded(state) {
  return { ...state, exploded: true, interior: false };
}
```

Contoh salah: tombol Exploded langsung mengubah posisi objek lalu lupa mematikan Interior View, sehingga aturan konflik F2 dan F3 tidak terjamin dan tidak bisa diuji.

## Error Handling

- Jangan menelan galat diam-diam; setiap `catch` harus menampilkan pesan atau mencatat penyebabnya.
- Bedakan galat yang bisa dipulihkan (data ruangan tidak ditemukan: tampilkan pesan, fitur lain tetap jalan) dan fatal (WebGL tidak tersedia: tampilkan pesan pengganti).
- Pesan untuk pengguna ditulis ramah dalam bahasa Indonesia; detail teknis hanya untuk konsol pengembang dan tidak berisi data sensitif.
- Karena semua berkas dimuat dari paket build, tidak ada panggilan jaringan saat runtime; bila nanti ditambahkan, tangani kegagalan jaringan secara eksplisit.

## Comments and Documentation

Komentar menjelaskan "mengapa", bukan "apa". Fungsi publik di `src/scene/` dan `src/data/` diberi komentar singkat tentang masukan dan keluaran. Jangan meninggalkan kode yang dikomentari. Perbarui `docs/PROGRESS.md` dan `docs/DECISIONS.md` bersamaan dengan kode saat ada keputusan baru.

## Commit Messages

Format Conventional Commits: `tipe(ruang-lingkup): ringkasan imperatif`.

| Tipe | Contoh |
|---|---|
| feat | `feat(scene): tambah rotate dan zoom pada model rumah` |
| fix | `fix(ui): cegah Interior View aktif bersama Exploded View` |
| docs | `docs: perbarui PROGRESS setelah deploy pertama` |
| test | `test(data): uji kelengkapan nama dan fungsi ruangan` |
| refactor | `refactor(scene): pisahkan fungsi posisi exploded` |
| chore | `chore: tambah skrip lint dan test di package.json` |
| ci | `ci: jalankan lint, test, dan build di pull request` |

Satu commit satu perubahan logis, ringkasan maksimal 72 karakter, dan rujuk ID task (mis. `T-003`) di badan commit atau PR.

## Dependencies

Tambahkan dependensi hanya bila benar-benar dibutuhkan, dipelihara aktif, dan berlisensi kompatibel. Sebelum instal, verifikasi nama paket ada dan milik penerbit yang dimaksud (`npm view <paket>`), karena nama karangan atau salah eja berbahaya. `package-lock.json` di-commit, versi dipin untuk produksi, dan dependensi besar dicatat di `docs/DECISIONS.md`. Jangan menambah pustaka UI atau pustaka kontrol 3D tambahan tanpa alasan, karena stack sudah ditetapkan (JavaScript, Vite, Three.js, HTML/CSS).

## Forbidden Patterns

1. Rahasia (token, kunci) di kode, `.env` yang ter-commit, atau variabel `VITE_` berisi rahasia.
2. Memakai `innerHTML` untuk teks dari data ruangan; gunakan `textContent`.
3. Menonaktifkan aturan lint atau tes agar lulus.
4. Mengubah tes agar lulus tanpa memperbaiki penyebab.
5. Kode tak terpakai atau kode yang dikomentari.
6. Dua dependensi untuk fungsi yang sama.
7. Pesan galat yang membocorkan detail internal.
8. Menaruh aturan fitur (mis. konflik Interior dan Exploded) langsung di penangan klik.
9. Membuat ulang objek 3D di setiap frame animasi (membebani smartphone); buat sekali, lalu perbarui.
10. Mengimpor model rumah dari Blender atau berkas model lain; objek rumah dibuat langsung dari geometri Three.js.

## AI-Generated Code Rules

Penulis (mahasiswa) wajib bisa menjelaskan setiap perubahan yang diterima. Minta perubahan kecil dan fokus pada satu task. Jalankan `npm test` dan `npm run lint` sebelum menerima kode. Periksa bahwa API Three.js, fungsi, atau paket yang disarankan benar-benar ada di dokumentasi resmi. Jangan menerima kode yang tidak dipahami. Catat kesalahan berulang agen di `docs/LESSONS.md`.
