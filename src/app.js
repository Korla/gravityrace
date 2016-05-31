var THREE = require('three');

var scene = new THREE.Scene();

var halfWidth = window.innerWidth/2;
var halfHeight = window.innerHeight/2;
var camera = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, - 500, 1000 );
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

var game = createGame(scene, camera);
(function render (){
	requestAnimationFrame(render);
	renderer.render(game.getNextScene(), camera);
})();

function createGame(scene, camera) {
  var planets = [];
  planets.push(createPlanet(20, 0, 0x0000ff));
  planets.push(createPlanet(10, 20, 0x00ff00));
  scene.add(...planets);

  var getNextScene  = () => {
    planets.forEach(p => p.position.setY(p.position.y - 1));
    return scene;
  }
  return {getNextScene}
}

function createPlanet(size, x, color) {
  var geometry = new THREE.SphereGeometry(size, 32, 32);
  var material = new THREE.MeshBasicMaterial({color});
  var planet = new THREE.Mesh( geometry, material );
  planet.position.setX(x);
  return planet;
}
