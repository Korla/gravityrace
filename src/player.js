var THREE = require('three');
var {createPlayerMesh} = require('./objects');

var create = y => () => {
  var mesh = createPlayerMesh([
    [0, 30, 0], [-10, 0, 0], [10, 0, 0], [0, 15, -10]
  ]);
  mesh.position.setY(y);
  return {
    mesh,
    thrust: 0,
    acceleration: 0,
    velocity: 0
  }
}

var nextVelocity = force => player => {
  player.acceleration = player.thrust * 0.001 + force;
  player.velocity += player.acceleration;
  return player;
}

var move = player => {
  player.mesh.position.setX(player.mesh.position.x + player.velocity);
  return player;
}

var input = delta => player => {
  player.thrust += delta * 10;
  player.mesh.rotation.z = Math.max(-1.6, Math.min(-player.thrust/100, 1.6));
  return player;
}

var getData = ({thrust, acceleration, velocity}) => ({thrust, acceleration, velocity});

export {create, nextVelocity, move, input, getData}
