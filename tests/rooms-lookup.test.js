// Tes pencarian ruangan (T-005, F6).
import { describe, expect, it } from "vitest";
import { getRoomById, rooms } from "../src/data/rooms.js";

describe("getRoomById (F6)", () => {
  it("mengembalikan nama dan fungsi ruangan yang benar", () => {
    const room = getRoomById("dapur");
    expect(room.nama).toBe("Dapur");
    expect(room.fungsi.length).toBeGreaterThan(0);
  });

  it("bisa menemukan setiap ruangan di data", () => {
    for (const room of rooms) {
      expect(getRoomById(room.id)).toBe(room);
    }
  });

  it("mengembalikan undefined untuk id yang tidak dikenal", () => {
    expect(getRoomById("tidak-ada")).toBeUndefined();
    expect(getRoomById("")).toBeUndefined();
  });
});
