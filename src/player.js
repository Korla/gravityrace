var THREE = require('three');

export class Player {
  constructor(y, coords) {
    this.mesh = createMesh(coords);
    this.mesh.position.setY(y);
    this.thrust = 0;
    this.acceleration = 0;
    this.velocity = 0;
  }

  nextVelocity(force) {
    this.acceleration = this.thrust * 0.001 + force;
    this.velocity += this.acceleration;
    return this.velocity;
  }

  input(delta) {
    return this.thrust += delta * 10;
  }
}

function createMesh(coords) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(...coords.map(c => new THREE.Vector3(...c, 0)));
  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.computeFaceNormals();
  var color = 0xff0000;
  return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color}));
}
