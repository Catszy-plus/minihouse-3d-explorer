// Tes konsistensi tata letak rumah dengan data bagian rumah (T-003).
import { describe, expect, it } from "vitest";
import { parts } from "../src/data/parts.js";
import { partLayout } from "../src/scene/house-layout.js";

describe("tata letak rumah", () => {
  it("setiap bagian rumah di data punya tata letak", () => {
    for (const part of parts) {
      expect(partLayout[part.id], `tata letak untuk ${part.id}`).toBeDefined();
    }
  });

  it("tidak ada tata letak untuk bagian yang tidak ada di data", () => {
    const ids = new Set(parts.map((part) => part.id));
    for (const id of Object.keys(partLayout)) {
      expect(ids.has(id), `bagian ${id} ada di data`).toBe(true);
    }
  });

  it("ukuran tiap bagian bernilai positif dan posisinya berisi tiga angka", () => {
    for (const layout of Object.values(partLayout)) {
      expect(layout.size).toHaveLength(3);
      expect(layout.position).toHaveLength(3);
      for (const nilai of layout.size) expect(nilai).toBeGreaterThan(0);
      for (const nilai of layout.position) expect(Number.isFinite(nilai)).toBe(true);
    }
  });
});
