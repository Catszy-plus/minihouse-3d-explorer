// Tes logika Exploded View (T-006, F3).
import { describe, expect, it } from "vitest";
import { parts } from "../src/data/parts.js";
import {
  EXPLODE_DURATION_SECONDS,
  ease,
  explodedOffsets,
  stepProgress,
} from "../src/scene/exploded-view.js";

describe("pergeseran bagian saat Exploded View", () => {
  it("setiap bagian rumah punya pergeseran tiga angka yang tidak nol", () => {
    for (const part of parts) {
      const offset = explodedOffsets[part.id];
      expect(offset, `pergeseran untuk ${part.id}`).toBeDefined();
      expect(offset).toHaveLength(3);
      expect(offset.some((nilai) => nilai !== 0)).toBe(true);
    }
  });

  it("atap bergeser ke atas dan lantai ke bawah", () => {
    expect(explodedOffsets.atap[1]).toBeGreaterThan(0);
    expect(explodedOffsets.lantai[1]).toBeLessThan(0);
  });
});

describe("ease", () => {
  it("bernilai 0 di awal, 1 di akhir, dan 0,5 di tengah", () => {
    expect(ease(0)).toBe(0);
    expect(ease(1)).toBe(1);
    expect(ease(0.5)).toBeCloseTo(0.5);
  });

  it("membatasi nilai di luar 0 sampai 1", () => {
    expect(ease(-1)).toBe(0);
    expect(ease(2)).toBe(1);
  });
});

describe("stepProgress", () => {
  it("bergerak maju menuju target sesuai waktu yang berlalu", () => {
    const hasil = stepProgress(0, 1, EXPLODE_DURATION_SECONDS / 2, EXPLODE_DURATION_SECONDS);
    expect(hasil).toBeCloseTo(0.5);
  });

  it("bergerak mundur menuju nol dan tidak melewati target", () => {
    expect(stepProgress(1, 0, EXPLODE_DURATION_SECONDS / 2, EXPLODE_DURATION_SECONDS)).toBeCloseTo(0.5);
    expect(stepProgress(0.1, 0, 10, EXPLODE_DURATION_SECONDS)).toBe(0);
    expect(stepProgress(0.9, 1, 10, EXPLODE_DURATION_SECONDS)).toBe(1);
  });

  it("langsung ke target bila durasi nol (gerak berkurang)", () => {
    expect(stepProgress(0, 1, 0.016, 0)).toBe(1);
    expect(stepProgress(1, 0, 0.016, 0)).toBe(0);
  });
});
