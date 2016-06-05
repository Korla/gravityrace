var THREE = require('three');
var {createGame} = require('./game');

var scene = new THREE.Scene();

var halfWidth = window.innerWidth/2;
var halfHeight = window.innerHeight/2;
var camera = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, - 500, 1000 );
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var gui = document.querySelector('#gui');

var registeredKeys = {
  37: -1,
  39: 1
}

document.onkeydown = e => {
	if(e && registeredKeys[e.keyCode]) {
		var current = game.input(registeredKeys[e.keyCode]);
		gui.innerText = current;
	}
};

var game = createGame(scene, camera.top, camera.bottom, camera.left, camera.right - camera.left);
(function render() {
	var state = game.next();
	if(!state.collided) requestAnimationFrame(render);
	renderer.render(state.scene, camera);
})();
