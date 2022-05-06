export function createTitle(parent) {
  let title = document.createElement("h1");
  title.textContent = "Virtual Keyboard";
  parent.append(title);
}

export function createTextarea(parent) {
  let textarea = document.createElement("textarea");
  textarea.classList.add("textarea");
  textarea.setAttribute("autofocus", "");
  textarea.setAttribute("name", "textarea");
  textarea.setAttribute("id", "textarea");
  textarea.setAttribute("cols", "30");
  textarea.setAttribute("rows", "10");
  parent.append(textarea);
}

export function createComment(parent) {
  let comment1 = document.createElement("p");
  comment1.innerHTML = "Keyboard created in Windows OS";
  let comment2 = document.createElement("p");
  comment2.innerHTML = "Use <b>ctrl</b> + <b>alt</b> to change language";
  parent.append(comment1);
  parent.append(comment2);
}
