// Pengaturan pencahayaan untuk F4 (Day/Night Mode), sebagai data murni agar mudah diuji.
// Mode siang sama dengan tampilan awal; warna bagian rumah tidak ikut berubah.
const DAY = {
  background: "#e6e6e6",
  hemisphere: { sky: "#ffffff", ground: "#9e9e9e", intensity: 1.5 },
  sun: { color: "#ffffff", intensity: 2 },
};

const NIGHT = {
  background: "#0b1020",
  hemisphere: { sky: "#5b6b9a", ground: "#1a1a2e", intensity: 0.9 },
  sun: { color: "#8fa8ff", intensity: 1 },
};

export function lightingPreset(isNight) {
  return isNight ? NIGHT : DAY;
}
