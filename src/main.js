import "./style.css";
import { rooms } from "./data/rooms.js";
import { createScene } from "./scene/scene.js";
import { initRoomPanel } from "./ui/room-panel.js";

const container = document.getElementById("scene");
const status = document.getElementById("status");

let sceneApi = null;
try {
  sceneApi = createScene(container);
} catch (error) {
  console.error(error);
  status.textContent =
    "Tampilan 3D tidak dapat dimuat di browser ini. Coba buka dengan Chrome, Edge, atau Firefox versi terbaru.";
}

// Panel ruangan tetap berfungsi walau tampilan 3D gagal dimuat.
initRoomPanel({
  listElement: document.getElementById("room-list"),
  infoElement: document.getElementById("room-info"),
  rooms,
  onSelect: (id) => {
    if (sceneApi) sceneApi.highlightRoom(id);
  },
});
