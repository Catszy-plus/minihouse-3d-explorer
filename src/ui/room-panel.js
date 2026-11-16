// Panel Daftar Ruangan dan panel informasi (F6).
// Teks ditampilkan dengan textContent (bukan innerHTML) agar aman.
import { getRoomById } from "../data/rooms.js";

export function initRoomPanel({ listElement, infoElement, rooms, onSelect }) {
  const buttons = new Map();

  function showEmpty() {
    infoElement.replaceChildren();
    const message = document.createElement("p");
    message.textContent = "Pilih ruangan untuk melihat fungsinya.";
    infoElement.append(message);
  }

  function showRoom(id) {
    const room = getRoomById(id);
    infoElement.replaceChildren();

    if (!room) {
      const message = document.createElement("p");
      message.textContent = "Data ruangan belum tersedia.";
      infoElement.append(message);
      return;
    }

    const title = document.createElement("h2");
    title.textContent = room.nama;
    const description = document.createElement("p");
    description.textContent = room.fungsi;
    infoElement.append(title, description);
  }

  function select(id) {
    for (const [roomId, button] of buttons) {
      button.setAttribute("aria-pressed", String(roomId === id));
    }
    showRoom(id);
    if (onSelect) onSelect(id);
  }

  for (const room of rooms) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = room.nama;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => select(room.id));
    item.append(button);
    listElement.append(item);
    buttons.set(room.id, button);
  }

  showEmpty();
}
