export function setStorage(name, value) {
    window.localStorage.setItem(name, value)
}

export function getStorage(name) {
  return window.localStorage.getItem(name);
}