// Tes data (T-002): memastikan data ruangan dan bagian rumah lengkap dan konsisten.
import { describe, expect, it } from "vitest";
import { rooms } from "../src/data/rooms.js";
import { parts } from "../src/data/parts.js";

describe("data ruangan (F6)", () => {
  it("memiliki minimal satu ruangan", () => {
    expect(rooms.length).toBeGreaterThan(0);
  });

  it("setiap ruangan punya id, nama, dan fungsi yang tidak kosong", () => {
    for (const room of rooms) {
      expect(room.id.trim()).not.toBe("");
      expect(room.nama.trim()).not.toBe("");
      expect(room.fungsi.trim()).not.toBe("");
    }
  });

  it("id ruangan unik", () => {
    const ids = rooms.map((room) => room.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("data bagian rumah (F2, F3, F5)", () => {
  it("setiap bagian punya id, nama, kelompok, dan warna bawaan berformat #rrggbb", () => {
    for (const part of parts) {
      expect(part.id.trim()).not.toBe("");
      expect(part.nama.trim()).not.toBe("");
      expect(part.kelompok.trim()).not.toBe("");
      expect(part.warnaBawaan).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("id bagian unik", () => {
    const ids = parts.map((part) => part.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mencakup kelompok atap, dinding, dan lantai", () => {
    const groups = new Set(parts.map((part) => part.kelompok));
    expect(groups.has("atap")).toBe(true);
    expect(groups.has("dinding")).toBe(true);
    expect(groups.has("lantai")).toBe(true);
  });
});
