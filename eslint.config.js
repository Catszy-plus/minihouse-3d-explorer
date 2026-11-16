// Konfigurasi ESLint (format "flat config").
// ESLint memeriksa kode JavaScript dan memberi tahu kesalahan umum sebelum kode dijalankan.
import js from "@eslint/js";
import globals from "globals";

export default [
  // Folder hasil build tidak perlu diperiksa.
  { ignores: ["dist/", "node_modules/"] },

  // Aturan dasar yang direkomendasikan ESLint.
  js.configs.recommended,

  // Kode di proyek ini berjalan di browser dan memakai modul ES.
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
    },
  },
];
