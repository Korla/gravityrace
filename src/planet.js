var THREE = require('three');
var {createPlanetMesh} = require('./objects');

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
    var color = this.isPulling ? '#0000ff' : '#00ff00';
    this.radius = 25 + 40 * Math.random();
    this.speed = 1 + 2 * Math.random();
    var x = this.left + Math.floor(this.width * Math.random());
    this.mesh = createPlanetMesh(
      this.radius,
      color,
      x,
      this.top + 1000
    );
    this.tinyMesh = createPlanetMesh(5, color, x, this.top - 10);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
