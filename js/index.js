/* eslint-disable import/extensions */

import * as storage from './components/storage.js';
import Keyboard, { rows } from './components/keyboard.js';

let layout = storage.getStorage('language') || 'en';

new Keyboard(rows).init(layout).generateLayout();

// import * as main from "./components/main.js";
// import { createKeyboard } from "./components/keyboard.js";

// let title = main.createTitle();
// let textarea = main.createTextarea();
// let keyboard = createKeyboard();
// let comment = main.createComment();

// document.body.append(title);
// document.body.append(textarea);
// document.body.append(keyboard);
// document.body.append(comment);
