var THREE = require('three');
var {Planet} = require('./planet.js');

var registeredKeys = {
  37: -1,
  39: 1
}

export function createGame(scene, top, bottom, left, width) {
  var planets = [];
  planets.push(new Planet(left, width, top));
  scene.add(...planets.map(p => p.mesh));
  var player = createPlayer();
  scene.add(player.mesh);

  document.onkeydown = e => {
    if(e && registeredKeys[e.keyCode]) player.input(registeredKeys[e.keyCode]);
  };

  var next = () => {
    planets.forEach((p, i) => {
      p.mesh.position.setY(p.mesh.position.y - p.speed);
      if(p.mesh.position.y < bottom) {
        scene.remove(p.mesh);
        p.dispose();
        planets[i] = new Planet(left, width, top);
        scene.add(planets[i].mesh);
      }
    });
    player.mesh.position.setX(player.mesh.position.x + player.nextVelocity());
    var collided = collide(player, planets);
    return {scene, collided};
  }

  function createPlayer() {
    var geometry = new THREE.Geometry();
    var coords = [[0, 30], [-10, 0], [10, 0]];
    geometry.vertices.push(...coords.map(c => new THREE.Vector3(...c, 0)));
    geometry.faces.push(new THREE.Face3( 0, 1, 2 ));
    geometry.computeFaceNormals();

    var color = 0xff0000;
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color}));
    mesh.position.setY(bottom + 100);

    var velocity = 0;
    var acceleration = 0;
    var nextVelocity = () => {
      acceleration *= 0.8;
      velocity += acceleration;
      if(Math.abs(velocity) < 0.01) velocity = 0;
      return velocity;
    }
    var input = delta => acceleration += delta/3;
    return {mesh, input, nextVelocity};
  }

  return {next}
}

function collide(player, planets) {
  return planets.some(p => getXYDistance(p.mesh.position, player.mesh.position) < p.radius + 5);
}

function getXYDistance({x: x1, y: y1}, {x: x2, y: y2}) {
  return Math.sqrt(squareDiff(x1, x2) + squareDiff(y1, y2));
}

function squareDiff(a, b) {
  return Math.pow(a - b, 2)
}
