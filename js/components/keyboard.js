import language from "../layouts/lang.js";

const rows = [
  [
    "Backquote",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
    "Backspace",
  ],
  [
    "Tab",
    "KeyQ",
    "KeyW",
    "KeyE",
    "KeyR",
    "KeyT",
    "KeyY",
    "KeyU",
    "KeyI",
    "KeyO",
    "KeyP",
    "BracketLeft",
    "BracketRight",
    "Backslash",
  ],
  [
    "CapsLock",
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
    "Enter",
  ],
  [
    "ShiftLeft",
    "KeyZ",
    "KeyX",
    "KeyC",
    "KeyV",
    "KeyB",
    "KeyN",
    "KeyM",
    "Comma",
    "Period",
    "Slash",
    "ArrowUp",
    "ShiftRight",
  ],
  [
    "ControlLeft",
    "MetaLeft",
    "AltLeft",
    "Space",
    "AltRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowRight",
    "ControlRight",
  ],
];

export function createKeyboard() {
  let keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");

  rows.forEach((row) => {
    let newRow = createRow(row);
    keyboard.append(newRow);
  });

  return keyboard;
}

function createRow(row) {
  let newRow = document.createElement("div");
  newRow.classList.add("keyboard__row");

  row.forEach((code) => {
    let keyObj = language.en.find((key) => key.code === code);
    let keyEl = createKey(keyObj);
    newRow.append(keyEl);
  });

  return newRow;
}

function createKey(keyObj) {
  let key = document.createElement("div");
  key.classList.add("keyboard__key");
  key.textContent = keyObj.small;

  return key;
}
