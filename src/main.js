import "./style.css";
import { rooms } from "./data/rooms.js";
import { createScene } from "./scene/scene.js";
import { initRoomPanel } from "./ui/room-panel.js";
import { initialViewState, toggleExploded, toggleInterior } from "./scene/view-state.js";

const container = document.getElementById("scene");
const status = document.getElementById("status");

let roomPanel = null;
let sceneApi = null;
try {
  // F6: klik ruangan di model (saat Interior View aktif) memilih ruangan yang sama dengan Daftar Ruangan.
  sceneApi = createScene(container, {
    onRoomPick: (id) => {
      if (roomPanel) roomPanel.select(id);
    },
  });
} catch (error) {
  console.error(error);
  status.textContent =
    "Tampilan 3D tidak dapat dimuat di browser ini. Coba buka dengan Chrome, Edge, atau Firefox versi terbaru.";
}

// Panel ruangan tetap berfungsi walau tampilan 3D gagal dimuat.
roomPanel = initRoomPanel({
  listElement: document.getElementById("room-list"),
  infoElement: document.getElementById("room-info"),
  rooms,
  onSelect: (id) => {
    if (sceneApi) sceneApi.highlightRoom(id);
  },
});

// F3 dan F2: tombol Exploded View dan Interior View (saling meniadakan).
let viewState = initialViewState();
const explodedButton = document.getElementById("btn-exploded");
const interiorButton = document.getElementById("btn-interior");

function renderView() {
  explodedButton.setAttribute("aria-pressed", String(viewState.exploded));
  interiorButton.setAttribute("aria-pressed", String(viewState.interior));
  sceneApi.setExploded(viewState.exploded);
  sceneApi.setInterior(viewState.interior);
}

if (sceneApi) {
  explodedButton.addEventListener("click", () => {
    viewState = toggleExploded(viewState);
    renderView();
  });
  interiorButton.addEventListener("click", () => {
    viewState = toggleInterior(viewState);
    renderView();
  });
} else {
  explodedButton.disabled = true;
  interiorButton.disabled = true;
}
