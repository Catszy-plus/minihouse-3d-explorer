// Tes keadaan warna (T-009, F5).
import { describe, expect, it } from "vitest";
import { palette } from "../src/data/colors.js";
import { parts } from "../src/data/parts.js";
import { initialColorState, setGroupColor } from "../src/scene/color-state.js";

describe("initialColorState", () => {
  it("memuat warna bawaan tiap kelompok dari data bagian rumah", () => {
    const state = initialColorState(parts);
    expect(state.dinding).toBe("#f2f2f2");
    expect(state.atap).toBe("#4a4a4a");
    expect(state.lantai).toBe("#bdbdbd");
  });
});

describe("setGroupColor (F5)", () => {
  it("mengubah warna satu kelompok tanpa mengubah kelompok lain", () => {
    const awal = initialColorState(parts);
    const hasil = setGroupColor(awal, "atap", "terakota", palette);
    expect(hasil.atap).toBe("#c8795a");
    expect(hasil.dinding).toBe(awal.dinding);
    expect(hasil.lantai).toBe(awal.lantai);
  });

  it("menolak warna yang tidak ada di daftar", () => {
    const awal = initialColorState(parts);
    expect(setGroupColor(awal, "atap", "warna-ajaib", palette)).toBe(awal);
  });

  it("menolak kelompok yang tidak dikenal", () => {
    const awal = initialColorState(parts);
    expect(setGroupColor(awal, "pintu", "putih", palette)).toBe(awal);
  });

  it("tidak mengubah objek keadaan yang diberikan", () => {
    const awal = initialColorState(parts);
    const salinan = { ...awal };
    setGroupColor(awal, "dinding", "krem", palette);
    expect(awal).toEqual(salinan);
  });
});
