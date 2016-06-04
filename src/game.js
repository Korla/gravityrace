var THREE = require('three');

var registeredKeys = {
  37: -1,
  39: 1
}

export function createGame(scene, top, bottom, left, width) {
  var planets = [];
  planets.push(createPlanet());
  planets.push(createPlanet());
  planets.push(createPlanet());
  planets.push(createPlanet());
  planets.push(createPlanet());
  planets.push(createPlanet());
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
        planets[i] = createPlanet();
        scene.add(planets[i].mesh);
      }
    });
    player.mesh.position.setX(player.mesh.position.x + player.nextVelocity());
    var collided = collide(player, planets);
    return {scene, collided};
  }

  function createPlanet(color) {
    var radius = 5 + Math.floor(20 * Math.random());
    var x = left + Math.floor(width * Math.random());
    var speed = 2 + Math.floor(5 * Math.random());
    var isPulling = Math.random() > 0.5;
    var color = 0x0000ff;
    var geometry = new THREE.SphereGeometry(radius, 32, 32);
    var material = new THREE.MeshBasicMaterial({color});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.setX(x);
    mesh.position.setY(top + radius);
    var dispose = () => {
      geometry.dispose();
      material.dispose();
    }
    return {mesh, speed, dispose, radius};
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
