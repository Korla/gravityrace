var THREE = require('three');
var {createGame} = require('./game');
var {arrows, touch} = require('./input');
var {createLight} = require('./light');
var {createSpace} = require('./space');
var {createPlanetMesh} = require('./objects');
var {createGraph} = require('./graph');

var scene = new THREE.Scene();
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, - 500, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var {ambientLight, light} = createLight(width, height, 700);

var thrustElem = document.querySelector('#thrust');
var timeElem = document.querySelector('#time');
var svg = document.querySelector('svg');

var inputDevice = matchMedia("(max-device-width: 1025px)").matches ? touch(renderer.domElement) : arrows(document);
console.log(matchMedia("(max-device-width: 1025px)").matches, inputDevice);

Promise.all([
	createSpace('img/space.png')
]).then(([space]) => {
	scene.add(space);
	scene.add(ambientLight);
	scene.add(light);

	var game = createGame(scene, camera.top, camera.bottom, camera.left, camera.right - camera.left);
	inputDevice(input => thrustElem.innerText = game.input(input));
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
});
