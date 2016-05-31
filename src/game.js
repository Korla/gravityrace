var THREE = require('three');

export function createGame(scene, camera) {
  var planets = [];
  planets.push(createPlanet(20, 0, 0x0000ff));
  planets.push(createPlanet(10, 20, 0x00ff00));
  scene.add(...planets);

  var next  = () => {
    planets.forEach(p => p.position.setY(p.position.y - 1));
    return scene;
  }
  return {next}
}

function createPlanet(size, x, color) {
  var geometry = new THREE.SphereGeometry(size, 32, 32);
  var material = new THREE.MeshBasicMaterial({color});
  var planet = new THREE.Mesh( geometry, material );
  planet.position.setX(x);
  return planet;
}
