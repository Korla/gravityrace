var THREE = require('three');

export class Player {
  constructor(y, coords) {
    this.mesh = createMesh(coords);
    this.mesh.position.setY(y);
    this.acceleration = 0;
    this.velocity = 0;
  }

  nextVelocity() {
    this.acceleration *= 0.8;
    this.velocity += this.acceleration;
    if(Math.abs(this.velocity) < 0.01) this.velocity = 0;
    return this.velocity;
  }

  input(delta) {
    this.acceleration += delta/3;
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
