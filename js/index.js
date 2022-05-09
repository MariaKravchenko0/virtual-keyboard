/* eslint-disable import/extensions */

import * as storage from './components/storage.js';
import Keyboard, { rows } from './components/keyboard.js';

const layout = storage.getStorage('language') || 'en';

new Keyboard(rows).init(layout).generateLayout();
