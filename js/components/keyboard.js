/* eslint-disable import/extensions */

import language from '../layouts/lang.js';
import * as storage from './storage.js';
import Key from './key.js';

export const rows = [
  [
    'Backquote',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Digit0',
    'Minus',
    'Equal',
    'Backspace',
  ],
  [
    'Tab',
    'KeyQ',
    'KeyW',
    'KeyE',
    'KeyR',
    'KeyT',
    'KeyY',
    'KeyU',
    'KeyI',
    'KeyO',
    'KeyP',
    'BracketLeft',
    'BracketRight',
    'Backslash',
    'Delete',
  ],
  [
    'CapsLock',
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyF',
    'KeyG',
    'KeyH',
    'KeyJ',
    'KeyK',
    'KeyL',
    'Semicolon',
    'Quote',
    'Enter',
  ],
  [
    'ShiftLeft',
    'KeyZ',
    'KeyX',
    'KeyC',
    'KeyV',
    'KeyB',
    'KeyN',
    'KeyM',
    'Comma',
    'Period',
    'Slash',
    'ArrowUp',
    'ShiftRight',
  ],
  [
    'ControlLeft',
    'MetaLeft',
    'AltLeft',
    'Space',
    'AltRight',
    'ArrowLeft',
    'ArrowDown',
    'ArrowRight',
    'ControlRight',
  ],
];

export default class Keyboard {
  constructor(keyRows) {
    this.rows = keyRows;
  }

  init(lang) {
    this.layout = language[lang];

    this.title = document.createElement('h1');
    this.title.textContent = 'Virtual Keyboard';
    document.body.append(this.title);

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.setAttribute('autofocus', '');
    this.textarea.setAttribute('name', 'textarea');
    this.textarea.setAttribute('id', 'textarea');
    this.textarea.setAttribute('cols', '30');
    this.textarea.setAttribute('rows', '10');
    document.body.append(this.textarea);

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.keyboard.dataset.language = lang;
    document.body.append(this.keyboard);

    this.comment = document.createElement('p');
    this.comment.innerHTML =
      'Keyboard created in Windows OS <br> Use <b>ctrl</b> + <b>alt</b> to change language';
    document.body.append(this.comment);

    return this;
  }

  generateLayout() {
    this.generatedKeysArray = [];
    this.rows.forEach((row, index) => {
      const newRow = document.createElement('div');
      newRow.classList.add('keyboard__row');
      newRow.classList.add(`keyboard__row_${index + 1}`);
      this.keyboard.append(newRow);

      row.forEach((code) => {
        const keyObject = this.layout.find((key) => key.code === code);
        const key = new Key(keyObject);
        this.generatedKeysArray.push(key);
        newRow.append(key.key);
      });
    });

    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    this.keyboard.addEventListener('mousedown', this.handleEvent);
  }

  handleEvent = (event) => {
    event.stopPropagation();
    event.preventDefault();

    let keyObject;

    if (event.type === 'mousedown') {
      let keyBtn = event.target.closest('.keyboard__key');
      if (!keyBtn) return;

      const code = keyBtn.dataset.code;
      keyObject = this.generatedKeysArray.find((key) => key.code === code);
      window.addEventListener('mouseup', () => {
        keyObject.key.classList.remove('active');
      });
    } else {
      keyObject = this.generatedKeysArray.find(
        (key) => key.code === event.code
      );
      if (!keyObject) return;
    }
    this.textarea.focus();

    if (event.type === 'keydown' || event.type === 'mousedown') {
      keyObject.key.classList.add('active');

      this.printToTextarea(keyObject);

      if (
        keyObject.key.dataset.code === 'ControlLeft' ||
        keyObject.key.dataset.code === 'ControlRight'
      )
        this.ctrlKey = true;
      if (
        keyObject.key.dataset.code === 'AltLeft' ||
        keyObject.key.dataset.code === 'AltRight'
      )
        this.altKey = true;

      if (
        (keyObject.key.dataset.code === 'ControlLeft' ||
          keyObject.key.dataset.code === 'ControlRight') &&
        this.altKey === true
      )
        this.switchLanguage();
      if (
        (keyObject.key.dataset.code === 'AltLeft' ||
          keyObject.key.dataset.code === 'AltRight') &&
        this.ctrlKey === true
      )
        this.switchLanguage();
    } else if (event.type === 'keyup' || event.type === 'mouseup') {
      keyObject.key.classList.remove('active');

      if (
        keyObject.key.dataset.code === 'ControlLeft' ||
        keyObject.key.dataset.code === 'ControlRight'
      )
        this.ctrlKey = false;
      if (
        keyObject.key.dataset.code === 'AltLeft' ||
        keyObject.key.dataset.code === 'AltRight'
      )
        this.altKey = false;
    }
  };

  printToTextarea = (keyObj) => {
    if (keyObj.key.dataset.functional !== 'true') {
      this.textarea.value += keyObj.smallKey.textContent;
    } else if (keyObj.key.dataset.code === 'Enter') {
      this.textarea.value += '\n';
    } else if (keyObj.key.dataset.code === 'Tab') {
      this.textarea.value += '\t';
    }
  };

  switchLanguage = () => {
    let languages = Object.keys(language);
    let currentLanguage = this.keyboard.dataset.language;

    let currentLanguageIndex = languages.indexOf(currentLanguage);
    let nextLanguageIndex =
      currentLanguageIndex + 1 < languages.length
        ? currentLanguageIndex + 1
        : 0;

    currentLanguage = languages[nextLanguageIndex];
    this.layout = language[currentLanguage];
    this.keyboard.dataset.language = currentLanguage;

    this.generatedKeysArray.forEach((element) => {
      const keyObject = this.layout.find((key) => key.code === element.code);

      element.small = keyObject.small;
      element.capital = keyObject.capital;
      element.smallKey.textContent = keyObject.small;
      element.capitalKey.textContent = keyObject.capital;
    });

    storage.setStorage('language', currentLanguage);
  };
}

// export function createKeyboard() {
//   let keyboard = document.createElement("div");
//   keyboard.classList.add("keyboard");

//   rows.forEach((row, index) => {
//     let newRow = createRow(row);
//     newRow.classList.add(`keyboard__row_${index + 1}`);
//     keyboard.append(newRow);
//   });

//   return keyboard;
// }

// function createRow(row) {
//   let newRow = document.createElement("div");
//   newRow.classList.add("keyboard__row");

//   row.forEach((code) => {
//     let keyObj = language.en.find((key) => key.code === code);
//     let keyEl = createKey(keyObj);
//     newRow.append(keyEl);
//   });

//   return newRow;
// }

// function createKey(keyObj) {
//   let key = document.createElement("div");
//   key.classList.add("keyboard__key");
//   key.textContent = keyObj.small;

//   return key;
// }
