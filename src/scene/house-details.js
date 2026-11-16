// Data murni untuk pintu, jendela, perabot, dan vas bunga (tanpa Three.js agar mudah diuji).
// Setiap item: shape "box" (size), "cylinder" (radiusTop, radiusBottom, height), atau "sphere" (radius),
// ditambah position [x, y, z] dan color.
//
// - openings: pintu dan jendela; position relatif terhadap titik tengah dinding induknya (part).
// - furniture: perabot per ruangan; position relatif terhadap titik tengah lantai (y = 0 setinggi
//   tengah lantai, permukaan lantai di y = 0,1). Perabot ikut bergerak bersama lantai.
const FLOOR_TOP = 0.1;
const onFloor = (height) => FLOOR_TOP + height / 2;

const WOOD = "#8b6b4a";
const WHITE = "#fafafa";
const FRAME = "#ffffff";
const GLASS = "#9ec9e8";
const METAL = "#9e9e9e";
const GREEN = "#4f8a3c";

// Vas dengan tiga bunga. (x, y, z) adalah titik alas vas.
export function flowerVase(x, y, z) {
  const stems = [
    [-0.03, 0],
    [0.03, 0.01],
    [0, -0.03],
  ];
  const flowers = ["#f48fb1", "#ffd54f", "#ef5350"];
  const items = [
    { shape: "cylinder", radiusTop: 0.07, radiusBottom: 0.05, height: 0.2, position: [x, y + 0.1, z], color: "#c8795a" },
  ];
  stems.forEach(([dx, dz], i) => {
    items.push({
      shape: "cylinder", radiusTop: 0.01, radiusBottom: 0.01, height: 0.25,
      position: [x + dx, y + 0.2 + 0.125, z + dz], color: GREEN,
    });
    items.push({
      shape: "sphere", radius: 0.05,
      position: [x + dx, y + 0.2 + 0.27, z + dz], color: flowers[i],
    });
  });
  return items;
}

// Jendela: bingkai putih dan kaca biru muda yang sedikit menonjol dari dinding.
function windowOnFrontBack(part, side, x, y, width, height) {
  const z = side * 0.1;
  return [
    { part, shape: "box", size: [width, height, 0.05], position: [x, y, z], color: FRAME },
    { part, shape: "box", size: [width - 0.14, height - 0.14, 0.06], position: [x, y, side * 0.105], color: GLASS },
  ];
}

function windowOnSide(part, side, z, y, width, height) {
  const x = side * 0.1;
  return [
    { part, shape: "box", size: [0.05, height, width], position: [x, y, z], color: FRAME },
    { part, shape: "box", size: [0.06, height - 0.14, width - 0.14], position: [side * 0.105, y, z], color: GLASS },
  ];
}

export const openings = [
  // Pintu depan (di ruang tamu) dan gagangnya.
  { part: "dinding-depan", shape: "box", size: [1.0, 2.0, 0.08], position: [-1.425, -0.25, 0.115], color: "#6b4a2f" },
  { part: "dinding-depan", shape: "sphere", radius: 0.05, position: [-1.075, -0.25, 0.19], color: "#d4af37" },
  // Jendela dapur di dinding depan.
  ...windowOnFrontBack("dinding-depan", 1, 1.425, 0.2, 1.0, 1.0),
  // Jendela kamar tidur dan jendela kecil kamar mandi di dinding belakang.
  ...windowOnFrontBack("dinding-belakang", -1, -1.425, 0.2, 1.0, 1.0),
  ...windowOnFrontBack("dinding-belakang", -1, 1.425, 0.45, 0.8, 0.5),
  // Jendela ruang tamu dan kamar tidur di dinding kiri.
  ...windowOnSide("dinding-kiri", -1, 0.925, 0.2, 1.0, 1.0),
  ...windowOnSide("dinding-kiri", -1, -0.925, 0.2, 1.0, 1.0),
  // Jendela dapur di dinding kanan.
  ...windowOnSide("dinding-kanan", 1, 0.925, 0.2, 1.0, 1.0),
];

export const furniture = {
  "ruang-tamu": [
    { shape: "box", size: [1.6, 0.02, 1.2], position: [-1.45, FLOOR_TOP + 0.01, 0.95], color: "#d9c7b0" }, // karpet
    { shape: "box", size: [0.7, 0.4, 1.4], position: [-2.4, onFloor(0.4), 0.95], color: "#6d7b8c" }, // sofa
    { shape: "box", size: [0.18, 0.8, 1.4], position: [-2.66, onFloor(0.8), 0.95], color: "#5b6877" }, // sandaran sofa
    { shape: "box", size: [0.8, 0.35, 0.5], position: [-1.4, onFloor(0.35), 0.95], color: WOOD }, // meja
    { shape: "cylinder", radiusTop: 0.03, radiusBottom: 0.03, height: 1.4, position: [-2.6, onFloor(1.4), 1.65], color: METAL }, // tiang lampu
    { shape: "cylinder", radiusTop: 0.15, radiusBottom: 0.2, height: 0.25, position: [-2.6, FLOOR_TOP + 1.4, 1.65], color: "#f3e5ab" }, // kap lampu
    ...flowerVase(-1.3, FLOOR_TOP + 0.35, 0.95), // vas bunga di meja
  ],
  "kamar-tidur": [
    { shape: "box", size: [1.7, 0.2, 1.2], position: [-1.9, onFloor(0.2), -0.95], color: WOOD }, // rangka kasur
    { shape: "box", size: [1.6, 0.3, 1.1], position: [-1.9, FLOOR_TOP + 0.2 + 0.15, -0.95], color: "#f5f5f5" }, // kasur
    { shape: "box", size: [0.1, 0.8, 1.2], position: [-2.75, onFloor(0.8), -0.95], color: "#6b4a2f" }, // kepala tempat tidur
    { shape: "box", size: [0.3, 0.1, 0.8], position: [-2.45, FLOOR_TOP + 0.5 + 0.05, -0.95], color: WHITE }, // bantal
    { shape: "box", size: [0.9, 0.04, 1.05], position: [-1.55, FLOOR_TOP + 0.5 + 0.02, -0.95], color: "#8da9c4" }, // selimut
    { shape: "box", size: [0.8, 1.6, 0.4], position: [-0.55, onFloor(1.6), -1.6], color: "#c9b79c" }, // lemari
    { shape: "box", size: [0.35, 0.4, 0.28], position: [-2.55, onFloor(0.4), -1.7], color: WOOD }, // meja samping
  ],
  // Dapur di depan-kanan, tepat di sebelah ruang tamu (pintu di sekat depan, z antara 0,475 dan 1,375).
  dapur: [
    { shape: "box", size: [2.1, 0.9, 0.6], position: [1.65, onFloor(0.9), 1.55], color: "#e5e5e5" }, // lemari dapur
    { shape: "box", size: [2.1, 0.05, 0.64], position: [1.65, FLOOR_TOP + 0.9 + 0.025, 1.53], color: "#333333" }, // meja dapur (menonjol 0,04 ke belakang)
    { shape: "box", size: [0.5, 0.04, 0.35], position: [0.95, FLOOR_TOP + 0.95 + 0.02, 1.55], color: "#b0bec5" }, // bak cuci
    { shape: "cylinder", radiusTop: 0.02, radiusBottom: 0.02, height: 0.2, position: [0.95, FLOOR_TOP + 0.95 + 0.1, 1.75], color: METAL }, // keran
    { shape: "box", size: [0.6, 0.03, 0.5], position: [1.95, FLOOR_TOP + 0.95 + 0.015, 1.55], color: "#222222" }, // kompor
    { shape: "cylinder", radiusTop: 0.09, radiusBottom: 0.09, height: 0.02, position: [1.8, FLOOR_TOP + 0.98 + 0.01, 1.55], color: "#555555" }, // tungku
    { shape: "cylinder", radiusTop: 0.09, radiusBottom: 0.09, height: 0.02, position: [2.1, FLOOR_TOP + 0.98 + 0.01, 1.55], color: "#555555" }, // tungku
    { shape: "box", size: [0.6, 1.5, 0.6], position: [2.5, onFloor(1.5), 0.5], color: "#f0f0f0" }, // kulkas
    { shape: "box", size: [0.04, 0.4, 0.04], position: [2.17, FLOOR_TOP + 1.0, 0.5], color: METAL }, // gagang kulkas
    { shape: "box", size: [0.9, 0.05, 0.9], position: [1.0, FLOOR_TOP + 0.7 - 0.025, 0.6], color: WOOD }, // meja makan
    { shape: "cylinder", radiusTop: 0.03, radiusBottom: 0.03, height: 0.675, position: [0.65, onFloor(0.675), 0.95], color: WOOD }, // kaki meja
    { shape: "cylinder", radiusTop: 0.03, radiusBottom: 0.03, height: 0.675, position: [1.35, onFloor(0.675), 0.95], color: WOOD }, // kaki meja
    { shape: "cylinder", radiusTop: 0.03, radiusBottom: 0.03, height: 0.675, position: [0.65, onFloor(0.675), 0.25], color: WOOD }, // kaki meja
    { shape: "cylinder", radiusTop: 0.03, radiusBottom: 0.03, height: 0.675, position: [1.35, onFloor(0.675), 0.25], color: WOOD }, // kaki meja
  ],
  // Kamar mandi di belakang-kanan, bersebelahan dengan kamar tidur (pintu di sekat belakang, z antara -1,375 dan -0,475).
  "kamar-mandi": [
    { shape: "cylinder", radiusTop: 0.2, radiusBottom: 0.16, height: 0.35, position: [2.45, onFloor(0.35), -1.3], color: WHITE }, // kloset
    { shape: "box", size: [0.42, 0.45, 0.18], position: [2.45, onFloor(0.45), -1.62], color: WHITE }, // tangki kloset
    { shape: "cylinder", radiusTop: 0.06, radiusBottom: 0.06, height: 0.7, position: [1.0, onFloor(0.7), -1.65], color: WHITE }, // kaki wastafel
    { shape: "box", size: [0.6, 0.12, 0.4], position: [1.0, FLOOR_TOP + 0.7 + 0.06, -1.65], color: WHITE }, // wastafel
    { shape: "cylinder", radiusTop: 0.015, radiusBottom: 0.015, height: 0.15, position: [1.0, FLOOR_TOP + 0.82 + 0.075, -1.78], color: METAL }, // keran
    { shape: "box", size: [0.9, 0.06, 0.8], position: [1.25, FLOOR_TOP + 0.03, -0.5], color: "#b3d9e8" }, // alas shower
    { shape: "cylinder", radiusTop: 0.02, radiusBottom: 0.02, height: 1.9, position: [1.65, onFloor(1.9), -0.15], color: METAL }, // tiang shower
    { shape: "cylinder", radiusTop: 0.1, radiusBottom: 0.1, height: 0.03, position: [1.65, FLOOR_TOP + 1.9, -0.15], color: METAL }, // kepala shower
  ],
};
