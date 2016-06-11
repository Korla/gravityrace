var THREE = require('three');
var {createPlanetMesh, createTinyMesh} = require('./objects');

var generate = left => width => () => {
  var isPulling = Math.random() > 0.5;
  return {
    isPulling,
    color: isPulling ? '#3333ff' : '#33ff33',
    radius: 25 + 40 * Math.random(),
    speed: 1 + 2 * Math.random(),
    x: left + Math.floor(width * Math.random())
  }
}

var create = planetMax => tinyYTop => generate => () => {
  var planet = generate();
  planet.mesh = createPlanetMesh(planet.radius)(planetMax)(planet.color, planet.x);
  planet.tinyMesh = createTinyMesh(tinyYTop)(planet.color, planet.x);
  return planet;
}

var next = top => bottom => tinyYBottom => planet => {
  planet.mesh.position.setY(planet.mesh.position.y - planet.speed);
  if(planet.mesh.position.y < bottom) {
    planet.tinyMesh.position.setY(tinyYBottom);
    planet.tinyMesh.visible = true;
  } else if(planet.mesh.position.y < top) {
    planet.tinyMesh.visible = false;
  }
  return planet;
}

var reset = planetMax => tinyYTop => generate => planet => {
  var newPlanet = generate();
  newPlanet.mesh = planet.mesh;
  newPlanet.mesh.position.setY(planetMax);
  newPlanet.mesh.position.setX(newPlanet.x);
  newPlanet.tinyMesh = planet.tinyMesh;
  newPlanet.tinyMesh.position.setY(tinyYTop);
  newPlanet.tinyMesh.position.setX(newPlanet.x);
  newPlanet.tinyMesh.visible = true;
  return newPlanet;
}

var getMeshes = ({mesh, tinyMesh}) => [mesh, tinyMesh];

export {create, next, generate, reset, getMeshes};
