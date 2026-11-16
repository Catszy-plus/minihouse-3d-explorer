import "./style.css";
import { createScene } from "./scene/scene.js";

const container = document.getElementById("scene");
const status = document.getElementById("status");

try {
  createScene(container);
} catch (error) {
  console.error(error);
  status.textContent =
    "Tampilan 3D tidak dapat dimuat di browser ini. Coba buka dengan Chrome, Edge, atau Firefox versi terbaru.";
}
