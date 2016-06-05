var THREE = require('three');

export class Planet {
  constructor(left, width, top) {
    var radius = 5 + Math.floor(20 * Math.random());
    var x = left + Math.floor(width * Math.random());
    this.speed = 2 + Math.floor(5 * Math.random());
    var color = 0x0000ff;
    this.geometry = new THREE.SphereGeometry(radius, 32, 32);
    this.material = new THREE.MeshBasicMaterial({color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.setX(x);
    this.mesh.position.setY(top + radius);
    tis.isPulling = true;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
