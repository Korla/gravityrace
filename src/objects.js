var THREE = require('three');

var createPlanetMesh = radius => y => (color, x) => {
  color = shadeColor20(color);
  var material = new THREE.MeshPhongMaterial({color, transparent: true, opacity: 1});
  material.emissive.setHex(shadeColor20('#000022'));
  material.specular.setHex(shadeColor20('#333322'));
  material.shininess = Math.random() * 10;
  var mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), material);
  mesh.position.setX(x);
  mesh.position.setY(y);
  return mesh;
};

var createTinyMesh = createPlanetMesh(5);

function createPlayerMesh(coords) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(...coords.map(c => new THREE.Vector3(...c)));
  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.computeFaceNormals();
  var material = new THREE.MeshPhongMaterial({color: 0xff0000, transparent:true, opacity:1});
  return new THREE.Mesh(geometry, material);
}

function shadeColor20(color) {
  return shadeColor(color, -0.5 + Math.random() * 0.5);
}

function shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

export {createPlanetMesh, createPlayerMesh, createTinyMesh};
