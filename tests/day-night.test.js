// Tes pengaturan pencahayaan siang dan malam (T-010, F4).
import { describe, expect, it } from "vitest";
import { lightingPreset } from "../src/scene/day-night.js";

const hex = /^#[0-9a-f]{6}$/i;

describe("lightingPreset (F4)", () => {
  it("langit malam berbeda dari langit siang", () => {
    expect(lightingPreset(true).background).not.toBe(lightingPreset(false).background);
  });

  it("cahaya malam lebih redup daripada siang", () => {
    const siang = lightingPreset(false);
    const malam = lightingPreset(true);
    expect(malam.hemisphere.intensity).toBeLessThan(siang.hemisphere.intensity);
    expect(malam.sun.intensity).toBeLessThan(siang.sun.intensity);
  });

  it("semua warna berformat #rrggbb dan intensitas positif", () => {
    for (const isNight of [false, true]) {
      const preset = lightingPreset(isNight);
      expect(preset.background).toMatch(hex);
      expect(preset.hemisphere.sky).toMatch(hex);
      expect(preset.hemisphere.ground).toMatch(hex);
      expect(preset.sun.color).toMatch(hex);
      expect(preset.hemisphere.intensity).toBeGreaterThan(0);
      expect(preset.sun.intensity).toBeGreaterThan(0);
    }
  });

  it("kembali ke pengaturan siang yang sama saat dipanggil lagi", () => {
    expect(lightingPreset(false)).toEqual(lightingPreset(false));
  });
});
