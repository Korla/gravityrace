var keyBoardInput = keyCodes => document => callback => document.onkeydown = e =>
  e && keyCodes[e.keyCode] ? callback(keyCodes[e.keyCode]) : undefined;

var arrows = keyBoardInput({37: -1, 39: 1});
var wasd = keyBoardInput({65: -1, 68: 1});

var touch = element => callback => element.onclick = e =>
  callback(e.screenX < element.clientWidth/2 ? -1 : 1);

export {arrows, wasd, touch}
