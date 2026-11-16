// Tes data pintu, jendela, perabot, dan vas bunga (rumah lengkap).
import { describe, expect, it } from "vitest";
import { parts } from "../src/data/parts.js";
import { rooms } from "../src/data/rooms.js";
import { flowerVase, furniture, openings } from "../src/scene/house-details.js";
import { roomLayout } from "../src/scene/room-layout.js";

const SHAPES = ["box", "cylinder", "sphere"];

function isValidItem(item) {
  if (!SHAPES.includes(item.shape)) return false;
  if (!/^#[0-9a-f]{6}$/i.test(item.color)) return false;
  if (item.position.length !== 3 || !item.position.every(Number.isFinite)) return false;
  if (item.shape === "box") return item.size.length === 3 && item.size.every((n) => n > 0);
  if (item.shape === "cylinder") {
    return item.radiusTop > 0 && item.radiusBottom > 0 && item.height > 0;
  }
  return item.radius > 0;
}

// Setengah lebar dan setengah kedalaman jejak item pada lantai.
function halfFootprint(item) {
  if (item.shape === "box") return [item.size[0] / 2, item.size[2] / 2];
  if (item.shape === "cylinder") {
    const radius = Math.max(item.radiusTop, item.radiusBottom);
    return [radius, radius];
  }
  return [item.radius, item.radius];
}

describe("pintu dan jendela", () => {
  it("setiap item menempel pada bagian rumah yang ada", () => {
    const ids = new Set(parts.map((part) => part.id));
    for (const item of openings) {
      expect(ids.has(item.part), `bagian ${item.part}`).toBe(true);
      expect(isValidItem(item)).toBe(true);
    }
  });

  it("dinding depan punya pintu dan setiap dinding luar punya jendela", () => {
    const perDinding = (id) => openings.filter((item) => item.part === id).length;
    expect(perDinding("dinding-depan")).toBeGreaterThanOrEqual(3);
    expect(perDinding("dinding-belakang")).toBeGreaterThan(0);
    expect(perDinding("dinding-kiri")).toBeGreaterThan(0);
    expect(perDinding("dinding-kanan")).toBeGreaterThan(0);
  });
});

describe("perabot per ruangan", () => {
  it("setiap ruangan di data punya perabot", () => {
    for (const room of rooms) {
      expect(furniture[room.id], `perabot untuk ${room.id}`).toBeDefined();
      expect(furniture[room.id].length).toBeGreaterThanOrEqual(5);
    }
  });

  it("tidak ada perabot untuk ruangan yang tidak ada di data", () => {
    const ids = new Set(rooms.map((room) => room.id));
    for (const id of Object.keys(furniture)) {
      expect(ids.has(id), `ruangan ${id}`).toBe(true);
    }
  });

  it("setiap item valid", () => {
    for (const items of Object.values(furniture)) {
      for (const item of items) expect(isValidItem(item)).toBe(true);
    }
  });

  it("semua perabot berada di dalam ruangannya dan tidak menembus sekat", () => {
    for (const [roomId, items] of Object.entries(furniture)) {
      const layout = roomLayout[roomId];
      const minX = layout.position[0] - layout.size[0] / 2;
      const maxX = layout.position[0] + layout.size[0] / 2;
      const minZ = layout.position[2] - layout.size[2] / 2;
      const maxZ = layout.position[2] + layout.size[2] / 2;
      // Sisi di x = 0 dan z = 0 adalah sekat setebal 0,1, jadi diberi jarak 0,05.
      const gap = (edge) => (Math.abs(edge) < 1e-9 ? 0.05 : 0);
      const tolerance = 1e-6;

      for (const item of items) {
        const [halfX, halfZ] = halfFootprint(item);
        const [x, , z] = item.position;
        expect(x - halfX, `${roomId}: sisi kiri`).toBeGreaterThanOrEqual(minX + gap(minX) - tolerance);
        expect(x + halfX, `${roomId}: sisi kanan`).toBeLessThanOrEqual(maxX - gap(maxX) + tolerance);
        expect(z - halfZ, `${roomId}: sisi belakang`).toBeGreaterThanOrEqual(minZ + gap(minZ) - tolerance);
        expect(z + halfZ, `${roomId}: sisi depan`).toBeLessThanOrEqual(maxZ - gap(maxZ) + tolerance);
      }
    }
  });
});

describe("flowerVase", () => {
  it("membuat satu vas, tiga tangkai, dan tiga bunga", () => {
    const items = flowerVase(0, 0, 0);
    expect(items.filter((item) => item.shape === "sphere")).toHaveLength(3);
    expect(items.filter((item) => item.shape === "cylinder")).toHaveLength(4);
    for (const item of items) expect(isValidItem(item)).toBe(true);
  });

  it("memindahkan seluruh vas sesuai titik alas", () => {
    const a = flowerVase(0, 0, 0);
    const b = flowerVase(1, 2, 3);
    a.forEach((item, i) => {
      expect(b[i].position[0]).toBeCloseTo(item.position[0] + 1);
      expect(b[i].position[1]).toBeCloseTo(item.position[1] + 2);
      expect(b[i].position[2]).toBeCloseTo(item.position[2] + 3);
    });
  });
});
