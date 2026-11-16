// Panel Daftar Ruangan dan panel informasi (F6).
// Teks ditampilkan dengan textContent (bukan innerHTML) agar aman.
// Tombol ruangan berperilaku seperti tombol Tampilan: menekan lagi akan menonaktifkannya.
import { getRoomById } from "../data/rooms.js";
import { nextSelectedRoom } from "./room-selection.js";

export function initRoomPanel({ listElement, infoElement, rooms, onSelect }) {
  const buttons = new Map();
  let selectedId = null;

  function showMessage(text) {
    infoElement.replaceChildren();
    const message = document.createElement("p");
    message.textContent = text;
    infoElement.append(message);
  }

  function showRoom(id) {
    const room = getRoomById(id);
    if (!room) {
      showMessage("Data ruangan belum tersedia.");
      return;
    }

    infoElement.replaceChildren();
    const title = document.createElement("h3");
    if (room.ikon) {
      const icon = document.createElement("span");
      icon.className = "btn-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = room.ikon;
      title.append(icon);
    }
    title.append(document.createTextNode(room.nama));
    const description = document.createElement("p");
    description.textContent = room.fungsi;
    infoElement.append(title, description);
  }

  function select(id) {
    selectedId = nextSelectedRoom(selectedId, id);
    for (const [roomId, button] of buttons) {
      button.setAttribute("aria-pressed", String(roomId === selectedId));
    }
    if (selectedId === null) {
      showMessage("Pilih ruangan untuk melihat fungsinya.");
    } else {
      showRoom(selectedId);
    }
    if (onSelect) onSelect(selectedId);
  }

  for (const room of rooms) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "toggle-button";
    button.setAttribute("aria-pressed", "false");

    if (room.ikon) {
      const icon = document.createElement("span");
      icon.className = "btn-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = room.ikon;
      button.append(icon);
    }
    const label = document.createElement("span");
    label.textContent = room.nama;
    button.append(label);

    button.addEventListener("click", () => select(room.id));
    item.append(button);
    listElement.append(item);
    buttons.set(room.id, button);
  }

  showMessage("Pilih ruangan untuk melihat fungsinya.");

  // select dikembalikan agar ruangan bisa dipilih juga dari klik di model 3D.
  return { select };
}
