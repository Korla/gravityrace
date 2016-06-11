var THREE = require('three');
var {arrows, touch} = require('./input');
var {createLight} = require('./light');
var {createSpace} = require('./space');
var game = require('./game');
var planet = require('./planet.js');
var player = require('./player.js');

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

var {top, left, bottom, right} = camera;
var width = right - left;
var planetMax = top + 1000;
var planetMin = bottom - 1000;
var tinyYTop = top - 10;
var tinyYBottom = bottom + 10;
var playerY = bottom + 100;

var createPlayer = player.create(playerY);
var generatePlanet = planet.generate(left)(width);
var createPlanet = planet.create(planetMax)(tinyYTop)(generatePlanet);
var resetPlanet = planet.reset(planetMax)(tinyYTop)(generatePlanet);
var nextPlanet = planet.next(top)(bottom)(tinyYBottom);
var evaluateCrash = game.evaluateCrash(left)(right);
var nextState = game.next(planetMin)(nextPlanet)(resetPlanet)(evaluateCrash);
var createGame = game.create(createPlayer)(createPlanet);

Promise.all([
	createSpace('img/space.png')
]).then(([space]) => {
	scene.add(space);
	scene.add(ambientLight);
	scene.add(light);

	var state = createGame();
	game.getMeshes(state).forEach(m => scene.add(m));
	inputDevice(input => {
		state.player = player.input(input)(state.player);
		thrustElem.innerText = state.player.thrust;
	});
	var data = [];
	var time = 0;
	var clock = new THREE.Clock();
	(function tick(prev) {
		state = nextState(prev);
		if(!state.crashed) {
		  var currentTime = Math.floor(clock.getElapsedTime());
		  if(time !== currentTime) {
				timeElem.innerText = time = currentTime;
				data.push(player.getData(state.player));
			}
			renderer.render(scene, camera);
			requestAnimationFrame(() => tick(state));
		} else {
			//createGraph(svg, data);
		}
		space.rotateY(0.0001);
	})(state);

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
