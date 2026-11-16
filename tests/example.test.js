// Tes contoh (T-001). Tujuannya hanya memastikan Vitest terpasang dan bisa berjalan.
// Tes sungguhan untuk data ruangan, aturan Exploded/Interior, dan batas kamera
// ditulis di task berikutnya (T-002, T-003, T-006, T-008).
import { describe, expect, it } from "vitest";

describe("setup proyek", () => {
  it("Vitest berjalan", () => {
    expect(1 + 1).toBe(2);
  });
});
