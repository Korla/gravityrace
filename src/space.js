var THREE = require('three');

var create = map => new THREE.Mesh(
  new THREE.SphereGeometry(1000, 32, 32),
  new THREE.MeshBasicMaterial({map, side: THREE.BackSide, color: '#7777bb'})
)

export {create};
