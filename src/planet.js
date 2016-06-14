var THREE = require('three');

var generate = left => width => level => {
  var levelFactor = 1 + level/5;
  var baseSize = levelFactor * 25;
  var sizeVariation = levelFactor * 40;
  var baseSpeed = levelFactor;
  var speedVariation = levelFactor * 2;
  var isPulling = Math.random() > 0.5;
  return {
    isPulling,
    color: isPulling ? '#73B8E6' : '#7FE673',
    radius: baseSize + sizeVariation * Math.random(),
    speed: baseSpeed + speedVariation * Math.random(),
    x: left + Math.floor(width * Math.random())
  }
}

var create = generate => createPlanetMesh => createTinyMesh => () => {
  var planet = generate(1);
  planet.mesh = createPlanetMesh(planet.radius)(planet.color, planet.x);
  planet.tinyMesh = createTinyMesh(planet.color, planet.x);
  return planet;
}

var next = top => bottom => tinyYBottom => planet => {
  planet.mesh.position.setY(planet.mesh.position.y - planet.speed);
  planet.mesh.rotateY(0.01);
  planet.tinyMesh.rotateY(0.01);
  if(planet.mesh.position.y < bottom) {
    planet.tinyMesh.position.setY(tinyYBottom);
    planet.tinyMesh.visible = true;
  } else if(planet.mesh.position.y < top) {
    planet.tinyMesh.visible = false;
  }
  return planet;
}

var reset = planetMax => tinyYTop => generate => (planet, level) => {
  var newPlanet = generate(level);
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
