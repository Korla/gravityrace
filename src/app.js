var THREE = require('three');
var {createGame} = require('./game');
var {createKeyboard} = require('./keyboard');
var {createLight} = require('./light');
var {createPlanetMesh} = require('./objects');
var {createGraph} = require('./graph');

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

var space;
new THREE.TextureLoader().load('img/space.png',
	map => {
		space = new THREE.Mesh(
			new THREE.SphereGeometry(1000, 32, 32),
			new THREE.MeshBasicMaterial({map, side: THREE.BackSide})
		);
		scene.add(space);
	}
);

var thrustElem = document.querySelector('#thrust');
var timeElem = document.querySelector('#time');

var svg = document.querySelector('svg');
var game = createGame(scene, camera.top, camera.bottom, camera.left, camera.right - camera.left);
createKeyboard(input => thrustElem.innerText = game.input(input));
var data = [];
var time = 0;
var clock = new THREE.Clock();
(function render() {
	var state = game.next();
	if(!state.crashed) {
		requestAnimationFrame(render);
	} else {
		createGraph(svg, data);
	}
	if(space) space.rotateY(0.0001);
  var currentTime = Math.floor(clock.getElapsedTime());
  if(time !== currentTime) {
		timeElem.innerText = time = currentTime;
		data.push(state.player.getData());
	}
	renderer.render(state.scene, camera);
})();

// var l = 500;
// var d = 150;
// var planets = [];
// for(var y = -l; y < l; y += d) {
// 	for(var x = -l - 300; x < l + 300; x += d) {
// 		planets.push(createPlanetMesh(30, '#ffffff', x, y));
// 	}
// }
// planets.forEach(p => scene.add(p));

// (function render() {
// 	requestAnimationFrame(render);
// 	renderer.render(scene, camera);
// })();
