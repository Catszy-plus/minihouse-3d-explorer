// Tes pemilihan ruangan dari sinar klik (T-008, F6 saat Interior View aktif).
import { describe, expect, it } from "vitest";
import { roomLayout } from "../src/scene/room-layout.js";
import { pickRoom, rayBoxDistance } from "../src/scene/room-picking.js";

describe("rayBoxDistance", () => {
  const center = [0, 0, 0];
  const size = [2, 2, 2];

  it("mengembalikan jarak ke sisi kotak yang terkena", () => {
    expect(rayBoxDistance([0, 5, 0], [0, -1, 0], center, size)).toBeCloseTo(4);
  });

  it("mengembalikan null bila sinar meleset", () => {
    expect(rayBoxDistance([5, 5, 0], [0, -1, 0], center, size)).toBeNull();
  });

  it("mengembalikan null bila kotak berada di belakang sinar", () => {
    expect(rayBoxDistance([0, 5, 0], [0, 1, 0], center, size)).toBeNull();
  });

  it("mengembalikan 0 bila titik awal sudah di dalam kotak", () => {
    expect(rayBoxDistance([0, 0, 0], [0, 1, 0], center, size)).toBe(0);
  });
});

describe("pickRoom (F6)", () => {
  it("memilih ruangan tepat di bawah sinar yang turun dari atas", () => {
    expect(pickRoom([-1.425, 10, 0.925], [0, -1, 0], roomLayout)).toBe("ruang-tamu");
    expect(pickRoom([-1.425, 10, -0.925], [0, -1, 0], roomLayout)).toBe("kamar-tidur");
    expect(pickRoom([1.425, 10, -0.925], [0, -1, 0], roomLayout)).toBe("dapur");
    expect(pickRoom([1.425, 10, 0.925], [0, -1, 0], roomLayout)).toBe("kamar-mandi");
  });

  it("memilih ruangan terdekat bila sinar menembus beberapa ruangan", () => {
    expect(pickRoom([-10, 1.45, -0.925], [1, 0, 0], roomLayout)).toBe("kamar-tidur");
  });

  it("mengembalikan null bila sinar tidak mengenai ruangan mana pun", () => {
    expect(pickRoom([20, 10, 20], [0, -1, 0], roomLayout)).toBeNull();
  });
});
