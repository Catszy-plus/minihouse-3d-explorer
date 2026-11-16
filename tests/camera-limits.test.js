// Tes pembatas jarak kamera (T-003, F1).
import { describe, expect, it } from "vitest";
import {
  CAMERA_TARGET,
  INITIAL_CAMERA_POSITION,
  MAX_DISTANCE,
  MIN_DISTANCE,
  clampDistance,
  distanceBetween,
} from "../src/scene/camera-limits.js";

describe("batas jarak kamera (F1)", () => {
  it("batas minimum lebih kecil dari batas maksimum", () => {
    expect(MIN_DISTANCE).toBeLessThan(MAX_DISTANCE);
  });

  it("jarak terlalu dekat dikembalikan ke batas minimum", () => {
    expect(clampDistance(0)).toBe(MIN_DISTANCE);
    expect(clampDistance(MIN_DISTANCE - 1)).toBe(MIN_DISTANCE);
  });

  it("jarak terlalu jauh dikembalikan ke batas maksimum", () => {
    expect(clampDistance(MAX_DISTANCE + 100)).toBe(MAX_DISTANCE);
  });

  it("jarak di dalam batas tidak berubah", () => {
    const tengah = (MIN_DISTANCE + MAX_DISTANCE) / 2;
    expect(clampDistance(tengah)).toBe(tengah);
  });

  it("posisi awal kamera berada di dalam batas jarak", () => {
    const jarak = distanceBetween(INITIAL_CAMERA_POSITION, CAMERA_TARGET);
    expect(jarak).toBeGreaterThanOrEqual(MIN_DISTANCE);
    expect(jarak).toBeLessThanOrEqual(MAX_DISTANCE);
  });
});
