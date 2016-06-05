var THREE = require('three');
var {createGame} = require('./game');
var {createKeyboard} = require('./keyboard');

var scene = new THREE.Scene();

var halfWidth = window.innerWidth/2;
var halfHeight = window.innerHeight/2;
var camera = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, - 500, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var gui = document.querySelector('#gui');

var game = createGame(scene, camera.top, camera.bottom, camera.left, camera.right - camera.left);
createKeyboard(input => {
  var text = game.input(input);
  gui.innerText = text;
});
(function render() {
	var state = game.next();
	if(!state.crashed) requestAnimationFrame(render);
	renderer.render(state.scene, camera);
})();
