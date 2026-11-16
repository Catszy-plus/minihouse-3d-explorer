// Posisi rumput di sekitar rumah. Deterministik (hasil selalu sama) dan murni agar bisa diuji.
export const GRASS_COUNT = 220;
const MIN_RADIUS = 3.6;
const MAX_RADIUS = 12;

// Area yang dijaga bebas rumput: tapak rumah beserta atapnya, dan jalan setapak ke pintu depan.
export function isInsideKeepOut(x, z) {
  const inHouse = Math.abs(x) < 3.6 && Math.abs(z) < 2.8;
  const onPath = Math.abs(x + 1.425) < 0.8 && z > 1.8 && z < 5.3;
  return inHouse || onPath;
}

export function grassPositions(count = GRASS_COUNT, seed = 12345) {
  let state = seed >>> 0;
  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };

  const result = [];
  while (result.length < count) {
    const angle = next() * Math.PI * 2;
    const radius = MIN_RADIUS + next() * (MAX_RADIUS - MIN_RADIUS);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const scale = 0.7 + next() * 0.8;
    const rotation = next() * Math.PI;
    if (isInsideKeepOut(x, z)) continue;
    result.push({ x, z, scale, rotation });
  }
  return result;
}
