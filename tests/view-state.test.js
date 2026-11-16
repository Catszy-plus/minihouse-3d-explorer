// Tes keadaan tampilan dan aturan konflik Exploded/Interior (T-006, F3).
import { describe, expect, it } from "vitest";
import { initialViewState, toggleExploded } from "../src/scene/view-state.js";

describe("keadaan tampilan awal", () => {
  it("Exploded dan Interior sama-sama mati", () => {
    expect(initialViewState()).toEqual({ exploded: false, interior: false });
  });
});

describe("toggleExploded (F3)", () => {
  it("menekan sekali mengaktifkan Exploded View", () => {
    expect(toggleExploded(initialViewState()).exploded).toBe(true);
  });

  it("menekan dua kali mengembalikan ke keadaan menyatu", () => {
    const sekali = toggleExploded(initialViewState());
    expect(toggleExploded(sekali).exploded).toBe(false);
  });

  it("mengaktifkan Exploded View menonaktifkan Interior View", () => {
    const hasil = toggleExploded({ exploded: false, interior: true });
    expect(hasil).toEqual({ exploded: true, interior: false });
  });

  it("tidak mengubah objek keadaan yang diberikan", () => {
    const awal = initialViewState();
    toggleExploded(awal);
    expect(awal).toEqual({ exploded: false, interior: false });
  });
});
