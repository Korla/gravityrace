var THREE = require('three');

export function createPlanetMesh(radius, color, x, y) {
  var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 32),
    new THREE.MeshPhongMaterial({color, transparent:true, opacity:1})
  );
  mesh.position.setX(x);
  mesh.position.setY(y);
  return mesh;
}

export function createPlayerMesh(coords) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(...coords.map(c => new THREE.Vector3(...c)));
  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.computeFaceNormals();
  var color = 0xff0000;
  return new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color, transparent:true, opacity:1}));
}
