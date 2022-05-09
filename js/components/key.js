export default class Key {
  constructor({ small, capital, code }) {
    this.small = small;
    this.capital = capital;
    this.code = code;
    this.isFunctional = Boolean(
      code.match(
        /ControlLeft|ControlRight|AltLeft|AltRight|MetaLeft|Enter|Backspace|Delete|Tab|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|CapsLock|Shift/
      )
    );
    this.isLetter = Boolean(small.match(/[a-zа-яёЁ]/));

    this.smallKey = document.createElement('div');
    this.smallKey.classList.add('smallKey');
    this.smallKey.textContent = this.small;

    this.capitalKey = document.createElement('div');
    this.capitalKey.classList.add('capitalKey');
    this.capitalKey.classList.add('hidden');
    this.capitalKey.textContent = this.capital;

    this.key = document.createElement('div');
    this.key.classList.add('keyboard__key');
    if (this.isFunctional) this.key.classList.add('keyboard__key_functional');
    if (this.isFunctional) {
      this.key.dataset.functional = 'true';
    } else {
      this.key.dataset.functional = 'false';
      this.isLetter
        ? (this.key.dataset.letter = 'true')
        : (this.key.dataset.letter = 'false');
    }

    this.key.dataset.code = this.code;

    this.key.append(this.smallKey);
    this.key.append(this.capitalKey);
  }
}
