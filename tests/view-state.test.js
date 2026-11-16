// Tes keadaan tampilan dan aturan konflik Exploded/Interior (T-006 dan T-008, F2 dan F3).
import { describe, expect, it } from "vitest";
import { parts } from "../src/data/parts.js";
import {
  INTERIOR_HIDDEN_PARTS,
  initialViewState,
  toggleExploded,
  toggleInterior,
} from "../src/scene/view-state.js";

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

describe("toggleInterior (F2)", () => {
  it("menekan sekali mengaktifkan Interior View", () => {
    expect(toggleInterior(initialViewState()).interior).toBe(true);
  });

  it("menekan dua kali mengembalikan atap dan dinding", () => {
    const sekali = toggleInterior(initialViewState());
    expect(toggleInterior(sekali).interior).toBe(false);
  });

  it("mengaktifkan Interior View menonaktifkan Exploded View", () => {
    const hasil = toggleInterior({ exploded: true, interior: false });
    expect(hasil).toEqual({ exploded: false, interior: true });
  });

  it("tidak mengubah objek keadaan yang diberikan", () => {
    const awal = { exploded: true, interior: false };
    toggleInterior(awal);
    expect(awal).toEqual({ exploded: true, interior: false });
  });
});

describe("bagian yang disembunyikan di Interior View", () => {
  it("mencakup atap dan satu dinding, dan semuanya ada di data bagian rumah", () => {
    const ids = new Set(parts.map((part) => part.id));
    expect(INTERIOR_HIDDEN_PARTS).toContain("atap");
    expect(INTERIOR_HIDDEN_PARTS.some((id) => id.startsWith("dinding"))).toBe(true);
    for (const id of INTERIOR_HIDDEN_PARTS) {
      expect(ids.has(id), `bagian ${id} ada di data`).toBe(true);
    }
  });

  it("tidak menyembunyikan semua dinding", () => {
    const dinding = parts.filter((part) => part.kelompok === "dinding").map((part) => part.id);
    const tersembunyi = dinding.filter((id) => INTERIOR_HIDDEN_PARTS.includes(id));
    expect(tersembunyi.length).toBeLessThan(dinding.length);
  });
});
