var THREE = require('three');
var {createGame} = require('./game');
var {createKeyboard} = require('./keyboard');
var {createLight} = require('./light');
var {createPlanetMesh} = require('./objects');

var scene = new THREE.Scene();

var halfWidth = window.innerWidth/2;
var halfHeight = window.innerHeight/2;
var camera = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, - 500, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var {ambientLight, light} = createLight(window.innerWidth, window.innerHeight, 700);
scene.add(ambientLight);
scene.add(light);

var thrustElem = document.querySelector('#thrust');
var timeElem = document.querySelector('#time');

var game = createGame(scene, camera.top, camera.bottom, camera.left, camera.right - camera.left);
createKeyboard(input => thrustElem.innerText = game.input(input));
var time = 0;
var clock = new THREE.Clock();
(function render() {
	var state = game.next();
	if(!state.crashed) {
		requestAnimationFrame(render);
	} else {
		console.log(state.player);
	}
  var currentTime = Math.floor(clock.getElapsedTime());
  if(time !== currentTime) timeElem.innerText = time = currentTime;
	renderer.render(state.scene, camera);
})();

// var l = 500;
// var d = 150;
// for(var y = -l; y < l; y += d) {
// 	for(var x = -l - 300; x < l + 300; x += d) {
// 		scene.add(createPlanetMesh(30, '#ffffff', x, y));
// 	}
// }
//
// (function render() {
// 	requestAnimationFrame(render);
// 	renderer.render(scene, camera);
// })();
