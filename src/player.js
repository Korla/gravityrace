var THREE = require('three');
var {createPlayerMesh} = require('./objects');

export class Player {
  constructor(y) {
    this.mesh = createPlayerMesh([
      [0, 30, 0], [-10, 0, 0], [10, 0, 0], [0, 15, -10]
    ]);
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
    this.thrust += delta * 10;
    this.mesh.rotation.z = Math.max(-1.6, Math.min(-this.thrust/100, 1.6));
    return this.thrust;
  }

  getData() {
    return {
      thrust: this.thrust,
      acceleration: this.acceleration,
      velocity: this.velocity
    }
  }
}
