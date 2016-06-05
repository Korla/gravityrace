var THREE = require('three');

export class Planet {
  constructor(left, width, top) {
    this.radius = 20 + Math.floor(40 * Math.random());
    this.speed = 1 + Math.floor(3 * Math.random());
    this.mesh = createMesh(this.radius);
    this.mesh.position.setX(left + Math.floor(width * Math.random()));
    this.mesh.position.setY(top + this.radius);
    this.isPulling = true;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

function createMesh(radius) {
  var color = 0x0000ff;
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 32),
    new THREE.MeshBasicMaterial({color})
  );
}
