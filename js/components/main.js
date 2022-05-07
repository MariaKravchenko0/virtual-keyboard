export function createTitle() {
  const title = document.createElement('h1');
  title.textContent = 'Virtual Keyboard';
  return title;
}

export function createTextarea() {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.setAttribute('autofocus', '');
  textarea.setAttribute('name', 'textarea');
  textarea.setAttribute('id', 'textarea');
  textarea.setAttribute('cols', '30');
  textarea.setAttribute('rows', '10');
  return textarea;
}

export function createComment() {
  const comment = document.createElement('p');
  comment.innerHTML = 'Keyboard created in Windows OS <br> Use <b>ctrl</b> + <b>alt</b> to change language';

  return comment;
}
