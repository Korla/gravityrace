var THREE = require('three');

var colors = {
  push: 0x0000ff,
  pull: 0x00ff00
};

export function createGame(scene, top, bottom, left, width) {
  var planets = [];
  planets.push(createPlanet());
  planets.push(createPlanet());
  planets.push(createPlanet());
  scene.add(...planets.map(p => p.mesh));
  var player = createPlayer();
  scene.add(player.mesh);

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
    return scene;
  }

  function createPlanet(color) {
    var size = 5 + Math.floor(20*Math.random());
    var x = left + Math.floor(width*Math.random());
    var speed = 2 + Math.floor(5*Math.random());
    var isPulling = Math.random() > 0.5;
    var color = isPulling ? colors.pull : colors.push;
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
    var playerWidth = 20;
    var playerHeight = 20;
    var playerBottom = bottom + 100;
    var coords = [
      [0, playerBottom + playerHeight, 0],
      [playerWidth/2, playerBottom, 0],
      [-playerWidth/2, playerBottom, 0]
    ]
    console.log(top, bottom, left, width);
    console.log(coords);
    var geometry = new THREE.Geometry();
    geometry.vertices.push(...coords.map(c => new THREE.Vector3(...c)));

    geometry.faces.push(new THREE.Face3( 0, 1, 2 ));
    geometry.computeFaceNormals();

    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    return {mesh};
  }

  return {next}
}
