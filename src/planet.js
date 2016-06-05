var THREE = require('three');

export class Planet {
  constructor(left, width, top, bottom) {
    this.left = left;
    this.width = width;
    this.top = top;
    this.bottom = bottom;
    this.init();
  }

  next() {
    this.mesh.position.setY(this.mesh.position.y - this.speed);
  }

  init() {
    this.isPulling = Math.random() > 0.5;
    var color = this.isPulling ? 0x0000ff : 0x00ff00;
    this.radius = 20 + Math.floor(40 * Math.random());
    this.speed = 1 + Math.floor(3 * Math.random());
    this.mesh = createMesh(this.radius, color);
    this.mesh.position.setX(this.left + Math.floor(this.width * Math.random()));
    this.mesh.position.setY(this.top + 1000);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

function createMesh(radius, color) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 10, 10),
    new THREE.MeshBasicMaterial({color, wireframe: true})
  );
}
