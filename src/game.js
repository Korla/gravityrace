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
    return scene;
  }

  function createPlanet(color) {
    var size = 5 + Math.floor(20*Math.random());
    var x = left + Math.floor(width*Math.random());
    var speed = 2 + Math.floor(5*Math.random());
    var isPulling = Math.random() > 0.5;
    var color = 0x0000ff;
    var geometry = new THREE.SphereGeometry(size, 32, 32);
    var material = new THREE.MeshBasicMaterial({color});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.setX(x);
    mesh.position.setY(top + size);
    var dispose = () => {
      geometry.dispose();
      material.dispose();
    }
    return {mesh, speed, dispose};
  }

  function createPlayer() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(...[
      [0, bottom + 130],
      [-10, bottom + 100],
      [10, bottom + 100]
    ].map(c => new THREE.Vector3(...c, 0)));

    geometry.faces.push(new THREE.Face3( 0, 1, 2 ));
    geometry.computeFaceNormals();

    var color = 0xff0000;
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color}));
    var acceleration = 0;
    var velocity = 0;
    var nextVelocity = () => {
      velocity += acceleration *= 0.8;
      if(Math.abs(velocity) < 0.01) velocity = 0;
      return velocity;
    }
    var input = delta => acceleration += delta;
    return {mesh, input, nextVelocity};
  }

  return {next}
}
