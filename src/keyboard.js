var registeredKeys = {
  37: -1,
  39: 1
}

export function createKeyboard(cb) {
  document.onkeydown = e => {
    if(e && registeredKeys[e.keyCode]) {
      cb(registeredKeys[e.keyCode]);
    }
  };
}
