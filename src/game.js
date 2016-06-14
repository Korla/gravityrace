var THREE = require('three');
var {nextVelocity: nextPlayerVelocity, move: movePlayer} = require('./player');
var planet = require('./planet');

var create = addToScene => createPlayer => createPlanet => () => {
  var planets = [createPlanet({}), createPlanet({}), createPlanet({})];
  var player = createPlayer();
  var state = {planets, player};
	getMeshes(state).forEach(m => addToScene(m));
  return state;
}

var evaluateCrash = left => right => ({player, planets}) => {
  var planetsAndDistance = planets.map(p => ({p, distance: getXYDistance(p.mesh.position, player.mesh.position)}));
  var crashed =
    planetsAndDistance.some(pd => pd.distance < pd.p.radius + 5) ||
    player.mesh.position.x < left ||
    player.mesh.position.x > right;
  return {planetsAndDistance, crashed}
}

var getForce = (player, planetsAndDistance) => {
  var planetsAndDistanceAndDx = planetsAndDistance.map(({p, distance}) => ({p, distance, dx: getDx(player.mesh.position, p.mesh.position)}))
  return planetsAndDistanceAndDx.reduce((force, pdd) => force += getForceFromPlanet(pdd), 0);
}

var next = planetMin => nextPlanet => evaluateCrash => resetPlanet => level => ({player, planets}) => {
  var {planetsAndDistance, crashed} = evaluateCrash({player, planets});
  if(!crashed) {
    var force = getForce(player, planetsAndDistance)
    player = movePlayer(nextPlayerVelocity(force)(player));
    planets = planets.map(p => nextPlanet(p));
    planets.filter(p => p.mesh.position.y < planetMin).forEach(p => resetPlanet(p, level));
  }
  return {planets, player, crashed}
}

var addPlanet = addToScene => createPlanet => state => {
  var newPlanet = createPlanet();
  state.planets.push(newPlanet);
  planet.getMeshes(newPlanet).forEach(m => addToScene(m));
  return state;
}

var getMeshes = state => [state.player.mesh].concat(state.planets.reduce((meshes, p) => meshes.concat(planet.getMeshes(p)), []));

export {create, evaluateCrash, getForce, next, getMeshes, addPlanet};

function getForceFromPlanet({p: {radius, isPulling}, distance, dx}) {
  return (isPulling ? 0.5 : -0.5) * radius * dx / (distance * distance);
}

function getXYDistance({x: x1, y: y1}, {x: x2, y: y2}) {
  return Math.sqrt(squareDiff(x1, x2) + squareDiff(y1, y2));
}

function getDx({x: x1, y: y1}, {x: x2, y: y2}) {
  return x2 - x1;
}

function squareDiff(a, b) {
  return Math.pow(a - b, 2)
}
