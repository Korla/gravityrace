var THREE = require('three');

var resolveMesh = res => map => res(new THREE.Mesh(
  new THREE.SphereGeometry(1000, 32, 32),
  new THREE.MeshBasicMaterial({map, side: THREE.BackSide})
));

var createSpace = url => new Promise((res, rej) =>
  new THREE.TextureLoader().load(url, resolveMesh(res), rej));

export {createSpace};
