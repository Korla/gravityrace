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

light(scene);

var thrustElem = document.querySelector('#thrust');
var timeElem = document.querySelector('#time');

var game = createGame(scene, camera.top, camera.bottom, camera.left, camera.right - camera.left);
createKeyboard(input => thrustElem.innerText = game.input(input));
var time = 0;
var clock = new THREE.Clock();
(function render() {
	var state = game.next();
	if(!state.crashed) requestAnimationFrame(render);
  var currentTime = Math.floor(clock.getElapsedTime());
  if(time !== currentTime) timeElem.innerText = time = currentTime;
	renderer.render(state.scene, camera);
})();

function light(scene) {
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(1000,1000,1000);

	// need to add an ambient light
	//  for ambient colors to be visible
	// make the ambient light darker so that
	//  it doesn't overwhelm (like emmisive light)
	var light2 = new THREE.AmbientLight(0x333333);
	light2.position.set( light.position );
	scene.add(light2);

	var lightbulbGeometry = new THREE.SphereGeometry( 10, 16, 8 );
	var lightbulbMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true,  opacity: 0.8, blending: THREE.AdditiveBlending } );
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
	var materialArray = [lightbulbMaterial, wireMaterial];
	var lightbulb = THREE.SceneUtils.createMultiMaterialObject( lightbulbGeometry, materialArray );
	lightbulb.position.set(light.position);
	scene.add(lightbulb);
	scene.add(light);

	scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);
}
