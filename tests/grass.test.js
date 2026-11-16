// Tes posisi rumput di sekitar rumah.
import { describe, expect, it } from "vitest";
import { GRASS_COUNT, grassPositions, isInsideKeepOut } from "../src/scene/grass.js";

describe("grassPositions", () => {
  it("menghasilkan jumlah rumput yang diminta", () => {
    expect(grassPositions()).toHaveLength(GRASS_COUNT);
    expect(grassPositions(10)).toHaveLength(10);
  });

  it("hasilnya selalu sama untuk seed yang sama", () => {
    expect(grassPositions(30, 7)).toEqual(grassPositions(30, 7));
  });

  it("berbeda bila seed berbeda", () => {
    expect(grassPositions(30, 1)).not.toEqual(grassPositions(30, 2));
  });

  it("tidak ada rumput di tapak rumah atau di jalan setapak", () => {
    for (const { x, z } of grassPositions()) {
      expect(isInsideKeepOut(x, z)).toBe(false);
    }
  });

  it("semua posisi dan skala berupa angka yang wajar", () => {
    for (const item of grassPositions()) {
      expect(Number.isFinite(item.x)).toBe(true);
      expect(Number.isFinite(item.z)).toBe(true);
      expect(item.scale).toBeGreaterThan(0);
      expect(Math.hypot(item.x, item.z)).toBeLessThanOrEqual(12.001);
    }
  });
});

describe("isInsideKeepOut", () => {
  it("mengenali tapak rumah dan jalan setapak", () => {
    expect(isInsideKeepOut(0, 0)).toBe(true);
    expect(isInsideKeepOut(-1.425, 4)).toBe(true);
  });

  it("area di luar tapak dan jalan boleh berumput", () => {
    expect(isInsideKeepOut(8, 8)).toBe(false);
  });
});
