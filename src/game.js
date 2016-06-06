var THREE = require('three');
var {Planet} = require('./planet.js');
var {Player} = require('./player.js');

export function createGame(scene, top, bottom, left, width) {
  var createPlanet = () => new Planet(left, width, top, bottom);
  var planets = [];
  for(var i = 0; i < 5; i++) planets.push(createPlanet());
  scene.add(...planets.map(p => p.mesh));
  scene.add(...planets.map(p => p.tinyMesh));
  var player = new Player(bottom + 100, [[0, 30], [-10, 0], [10, 0]]);
  scene.add(player.mesh);

  var next = () => {
    var planetsAndDistance = planets.map(p => ({p, distance: getXYDistance(p.mesh.position, player.mesh.position)}));
    var crashed =
      planetsAndDistance.some(pd => pd.distance < pd.p.radius + 5) ||
      player.mesh.position.x < left ||
      player.mesh.position.x > left + width;
    if(!crashed) {
      var planetsAndDistanceAndDx = planetsAndDistance.map(({p, distance}) => ({p, distance, dx: getDx(player.mesh.position, p.mesh.position)}))
      var force = planetsAndDistanceAndDx.reduce((force, pdd) => force += getForce(pdd), 0);
      player.mesh.position.setX(player.mesh.position.x + player.nextVelocity(force));
      planets.forEach(p => {
        p.next();
        if(p.mesh.position.y < bottom - 1000) {
          p.dispose();
          p.init();
          scene.add(p.mesh);
          scene.add(p.tinyMesh);
        }
      });
    }
    return {scene, crashed};
  }

  var input = delta => player.input(delta);

  return {next, input}
}

function getForce({p: {radius, isPulling}, distance, dx}) {
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
