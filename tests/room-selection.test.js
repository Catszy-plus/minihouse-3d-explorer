// Tes aturan pilihan ruangan: menekan ruangan yang sama membatalkan pilihan (F6).
import { describe, expect, it } from "vitest";
import { rooms } from "../src/data/rooms.js";
import { nextSelectedRoom } from "../src/ui/room-selection.js";

describe("nextSelectedRoom", () => {
  it("memilih ruangan bila belum ada yang dipilih", () => {
    expect(nextSelectedRoom(null, "dapur")).toBe("dapur");
  });

  it("membatalkan pilihan bila ruangan yang sama ditekan lagi", () => {
    expect(nextSelectedRoom("dapur", "dapur")).toBeNull();
  });

  it("berpindah ke ruangan lain bila ruangan berbeda ditekan", () => {
    expect(nextSelectedRoom("dapur", "kamar-tidur")).toBe("kamar-tidur");
  });
});

describe("ikon ruangan", () => {
  it("setiap ruangan punya ikon hiasan yang tidak kosong", () => {
    for (const room of rooms) {
      expect(room.ikon.trim(), `ikon untuk ${room.id}`).not.toBe("");
    }
  });
});
