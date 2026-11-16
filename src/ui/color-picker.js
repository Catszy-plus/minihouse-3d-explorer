// Pemilih warna (F5): pilih bagian rumah, lalu pilih warna dari daftar.
// Semua teks memakai textContent; setiap warna punya label teks, tidak hanya warna.
export function initColorPicker({ groupListElement, swatchListElement, groups, palette, onChange }) {
  let selectedGroup = groups[0].kelompok;
  const chosen = {}; // kelompok -> id warna yang terakhir dipilih
  const groupButtons = new Map();
  const swatchButtons = new Map();

  function refresh() {
    for (const [kelompok, button] of groupButtons) {
      button.setAttribute("aria-pressed", String(kelompok === selectedGroup));
    }
    for (const [colorId, button] of swatchButtons) {
      button.setAttribute("aria-pressed", String(chosen[selectedGroup] === colorId));
    }
  }

  for (const group of groups) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "toggle-button";
    button.textContent = group.nama;
    button.addEventListener("click", () => {
      selectedGroup = group.kelompok;
      refresh();
    });
    groupListElement.append(button);
    groupButtons.set(group.kelompok, button);
  }

  for (const color of palette) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "swatch";

    const chip = document.createElement("span");
    chip.className = "swatch-chip";
    chip.style.backgroundColor = color.hex;
    const label = document.createElement("span");
    label.textContent = color.nama;

    button.append(chip, label);
    button.addEventListener("click", () => {
      chosen[selectedGroup] = color.id;
      refresh();
      onChange(selectedGroup, color.id);
    });
    item.append(button);
    swatchListElement.append(item);
    swatchButtons.set(color.id, button);
  }

  refresh();
}
