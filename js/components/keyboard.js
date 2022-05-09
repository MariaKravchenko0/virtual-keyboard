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
    this.generatedKeysArray = [];
    this.isShifted = false;
    this.isCaps = false;
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
    this.comment.innerHTML = 'Keyboard created in Windows OS <br> Use <b>ctrl</b> + <b>alt</b> to change language';
    document.body.append(this.comment);

    return this;
  }

  generateLayout() {
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

    window.addEventListener('keydown', this.handleEvent);
    window.addEventListener('keyup', this.handleEvent);
    this.keyboard.addEventListener('mousedown', this.handleEvent);
    this.keyboard.addEventListener('mouseup', this.handleEvent);
  }

  handleEvent = (event) => {
    event.stopPropagation();

    let keyObject;

    if (event.type === 'mousedown' || event.type === 'mouseup') {
      event.preventDefault();

      const keyBtn = event.target.closest('.keyboard__key');
      if (!keyBtn) return;

      const { code } = keyBtn.dataset;
      keyObject = this.generatedKeysArray.find((key) => key.code === code);

      window.addEventListener('mousemove', () => {
        if (keyObject.key.dataset.code !== 'CapsLock') {
          keyObject.key.classList.remove('active');
        }
      });
    } else {
      keyObject = this.generatedKeysArray.find(
        (key) => key.code === event.code,
      );
      if (!keyObject) return;
    }
    this.textarea.focus();

    if (event.type === 'keydown' || event.type === 'mousedown') {
      const listOfCodes = rows.join(',').split(',');
      listOfCodes.forEach((code) => {
        if (code === event.code) event.preventDefault();
      });

      keyObject.key.classList.add('active');

      if (
        keyObject.key.dataset.code === 'ShiftLeft'
        || keyObject.key.dataset.code === 'ShiftRight'
      ) {
        if (!this.shiftKey || this.shiftKey === false) {
          this.shiftKey = true;
          this.switchCase(keyObject.key.dataset.code);
        }
      }

      if (keyObject.key.dataset.code === 'CapsLock') {
        this.switchCase(keyObject.key.dataset.code);
      }

      this.printToTextarea(keyObject);

      if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        this.ctrlKey = true;
      }
      if (event.code === 'AltLeft' || event.code === 'AltRight') {
        this.altKey = true;
      }

      if (
        (event.code === 'ControlLeft' || event.code === 'ControlRight')
        && this.altKey === true
      ) {
        this.switchLanguage();
      }
      if (
        (event.code === 'AltLeft' || event.code === 'AltRight')
        && this.ctrlKey === true
      ) {
        this.switchLanguage();
      }
    } else if (event.type === 'keyup' || event.type === 'mouseup') {
      if (keyObject.key.dataset.code !== 'CapsLock') {
        keyObject.key.classList.remove('active');
      }

      if (
        keyObject.key.dataset.code === 'ShiftLeft'
        || keyObject.key.dataset.code === 'ShiftRight'
      ) {
        this.shiftKey = false;
        this.switchCase(keyObject.key.dataset.code);

        const shiftLeft = this.generatedKeysArray.find(
          (key) => key.key.dataset.code === 'ShiftLeft',
        );
        const shiftRight = this.generatedKeysArray.find(
          (key) => key.key.dataset.code === 'ShiftRight',
        );
        shiftLeft.key.classList.remove('active');
        shiftRight.key.classList.remove('active');
      }

      if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        this.ctrlKey = false;
      }
      if (event.code === 'AltLeft' || event.code === 'AltRight') {
        this.altKey = false;
      }
    }
  };

  switchCase = (keyCode) => {
    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      this.generatedKeysArray.forEach((key) => {
        key.smallKey.classList.toggle('hidden');
        key.capitalKey.classList.toggle('hidden');
      });

      if (this.isShifted === false) {
        this.isShifted = true;
      } else {
        this.isShifted = false;
      }
    } else if (keyCode === 'CapsLock') {
      if (this.isCaps === false) {
        this.generatedKeysArray.forEach((key) => {
          if (key.key.dataset.letter === 'true') {
            key.smallKey.classList.toggle('hidden');
            key.capitalKey.classList.toggle('hidden');
          }

          if (key.key.dataset.code === 'CapsLock') {
            key.key.classList.add('active');
          }
        });

        this.isCaps = true;
      } else {
        this.generatedKeysArray.forEach((key) => {
          if (key.key.dataset.letter === 'true') {
            key.smallKey.classList.toggle('hidden');
            key.capitalKey.classList.toggle('hidden');
          }

          if (key.key.dataset.code === 'CapsLock') {
            key.key.classList.remove('active');
          }
        });

        this.isCaps = false;
      }
    }
  };

  printToTextarea = (keyObj) => {
    let cursorPosition = this.textarea.selectionStart;
    const leftText = this.textarea.value.slice(0, cursorPosition);
    const rightText = this.textarea.value.slice(cursorPosition);

    if (keyObj.key.dataset.functional !== 'true') {
      if (this.isShifted === false && this.isCaps === false) {
        this.textarea.value = `${leftText}${keyObj.smallKey.textContent}${rightText}`;
        cursorPosition += 1;
      } else if (this.isShifted === true && this.isCaps === false) {
        this.textarea.value = `${leftText}${keyObj.capitalKey.textContent}${rightText}`;
        cursorPosition += 1;
      } else if (this.isShifted === false && this.isCaps === true) {
        if (keyObj.key.dataset.letter === 'true') {
          this.textarea.value = `${leftText}${keyObj.capitalKey.textContent}${rightText}`;
        } else {
          this.textarea.value = `${leftText}${keyObj.smallKey.textContent}${rightText}`;
        }
        cursorPosition += 1;
      } else if (this.isShifted === true && this.isCaps === true) {
        if (keyObj.key.dataset.letter === 'true') {
          this.textarea.value = `${leftText}${keyObj.smallKey.textContent}${rightText}`;
        } else {
          this.textarea.value = `${leftText}${keyObj.capitalKey.textContent}${rightText}`;
        }
        cursorPosition += 1;
      }
    }

    if (keyObj.key.dataset.code === 'Enter') {
      this.textarea.value = `${leftText}\n${rightText}`;
      cursorPosition += 1;
    }

    if (keyObj.key.dataset.code === 'Tab') {
      this.textarea.value = `${leftText}\t${rightText}`;
      cursorPosition += 1;
    }

    if (keyObj.key.dataset.code === 'Backspace') {
      this.textarea.value = `${leftText.slice(0, -1)}${rightText}`;
      cursorPosition -= 1;
    }

    if (keyObj.key.dataset.code === 'Delete') {
      this.textarea.value = `${leftText}${rightText.slice(1)}`;
    }

    if (keyObj.key.dataset.code === 'ArrowLeft') {
      cursorPosition -= 1;
    }
    if (keyObj.key.dataset.code === 'ArrowRight') {
      cursorPosition += 1;
    }
    if (keyObj.key.dataset.code === 'ArrowUp') {
      cursorPosition = 0;
    }
    if (keyObj.key.dataset.code === 'ArrowDown') {
      cursorPosition = this.textarea.value.length;
    }

    this.textarea.setSelectionRange(cursorPosition, cursorPosition);
  };

  switchLanguage = () => {
    const languages = Object.keys(language);
    let currentLanguage = this.keyboard.dataset.language;

    const currentLanguageIndex = languages.indexOf(currentLanguage);
    const nextLanguageIndex = currentLanguageIndex + 1 < languages.length
      ? currentLanguageIndex + 1
      : 0;

    currentLanguage = languages[nextLanguageIndex];
    this.layout = language[currentLanguage];
    this.keyboard.dataset.language = currentLanguage;

    this.generatedKeysArray.forEach((element) => {
      const newKeyObject = this.layout.find((key) => key.code === element.code);
      const currentKeyObject = element;
      currentKeyObject.small = newKeyObject.small;
      currentKeyObject.capital = newKeyObject.capital;
      currentKeyObject.smallKey.textContent = newKeyObject.small;
      currentKeyObject.capitalKey.textContent = newKeyObject.capital;
    });

    storage.setStorage('language', currentLanguage);
  };
}
