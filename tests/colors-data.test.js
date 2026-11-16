// Tes data pilihan warna dan bagian yang bisa diubah (T-009, F5).
import { describe, expect, it } from "vitest";
import { colorGroups, palette } from "../src/data/colors.js";
import { parts } from "../src/data/parts.js";

describe("palet warna", () => {
  it("setiap warna punya id, nama, dan kode warna #rrggbb", () => {
    for (const color of palette) {
      expect(color.id.trim()).not.toBe("");
      expect(color.nama.trim()).not.toBe("");
      expect(color.hex).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("id warna unik", () => {
    const ids = palette.map((color) => color.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("kelompok yang bisa diubah warnanya", () => {
  it("setiap kelompok ada di data bagian rumah", () => {
    const kelompokDiData = new Set(parts.map((part) => part.kelompok));
    for (const group of colorGroups) {
      expect(kelompokDiData.has(group.kelompok), `kelompok ${group.kelompok}`).toBe(true);
      expect(group.nama.trim()).not.toBe("");
    }
  });
});
