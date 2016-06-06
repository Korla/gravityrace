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
    if(this.mesh.position.y < this.bottom) {
      this.tinyMesh.position.setY(this.bottom + 10);
      this.tinyMesh.visible = true;
    } else if(this.mesh.position.y < this.top) {
      this.tinyMesh.visible = false;
    }
  }

  init() {
    this.isPulling = Math.random() > 0.5;
    var color = this.isPulling ? 0x0000ff : 0x00ff00;
    this.radius = 25 + Math.floor(40 * Math.random());
    this.speed = 1 + Math.floor(2 * Math.random());
    var x = this.left + Math.floor(this.width * Math.random());
    this.mesh = createMesh(
      this.radius,
      color,
      x,
      this.top + 1000
    );
    this.tinyMesh = createMesh(5, color, x, this.top - 10);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

function createMesh(radius, color, x, y) {
  var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 10, 10),
    new THREE.MeshBasicMaterial({color, wireframe: true})
  );
  mesh.position.setX(x);
  mesh.position.setY(y);
  return mesh;
}
