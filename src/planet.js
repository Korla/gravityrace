var THREE = require('three');
var {createPlanetMesh} = require('./objects');

var create = planet => {
  planet.isPulling = Math.random() > 0.5;
  var color = planet.isPulling ? '#3333ff' : '#33ff33';
  planet.radius = 25 + 40 * Math.random();
  planet.speed = 1 + 2 * Math.random();
  var x = planet.left + Math.floor(planet.width * Math.random());
  planet.mesh = createPlanetMesh(planet.radius, color, x, planet.top + 1000);
  planet.tinyMesh = createPlanetMesh(5, color, x, planet.top - 10);
  return planet;
}

var next = planet => {
  planet.mesh.position.setY(planet.mesh.position.y - planet.speed);
  if(planet.mesh.position.y < planet.bottom) {
    planet.tinyMesh.position.setY(planet.bottom + 10);
    planet.tinyMesh.visible = true;
  } else if(planet.mesh.position.y < planet.top) {
    planet.tinyMesh.visible = false;
  }
  return planet;
}

var dispose = planet => {
  planet.mesh.geometry.dispose();
  planet.mesh.material.dispose();
}

var getMeshes = ({mesh, tinyMesh}) => [mesh, tinyMesh];

export {create, next, dispose, getMeshes};
