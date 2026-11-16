// Tes konsistensi letak ruangan dengan data ruangan (T-005).
import { describe, expect, it } from "vitest";
import { rooms } from "../src/data/rooms.js";
import { roomLayout } from "../src/scene/room-layout.js";

describe("letak ruangan", () => {
  it("setiap ruangan di data punya letak", () => {
    for (const room of rooms) {
      expect(roomLayout[room.id], `letak untuk ${room.id}`).toBeDefined();
    }
  });

  it("tidak ada letak untuk ruangan yang tidak ada di data", () => {
    const ids = new Set(rooms.map((room) => room.id));
    for (const id of Object.keys(roomLayout)) {
      expect(ids.has(id), `ruangan ${id} ada di data`).toBe(true);
    }
  });

  it("ukuran bernilai positif dan posisi berisi tiga angka", () => {
    for (const layout of Object.values(roomLayout)) {
      expect(layout.size).toHaveLength(3);
      expect(layout.position).toHaveLength(3);
      for (const nilai of layout.size) expect(nilai).toBeGreaterThan(0);
      for (const nilai of layout.position) expect(Number.isFinite(nilai)).toBe(true);
    }
  });
});
