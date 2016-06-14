var THREE = require('three');

var createPlanetMesh = bump => spec => cloud => y => radius => (color, x) => {
  color = darken(color);
  var material = new THREE.MeshPhongMaterial({color, transparent: true, opacity: 1});
  material.emissive.setHex(darken(color));
  material.specular.setHex(darken('#333322'));
  material.shininess = Math.random() * 10;
  material.bumpMap = bump;
  material.bumpScale = random(2, 0.5);
  material.specularMap = spec;
  material.specular = new THREE.Color(0x333333);
  var mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), material);
  mesh.position.setX(x);
  mesh.position.setY(y);

  var cloudMesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius * random(1.05, 0.96), 32, 32),
    new THREE.MeshPhongMaterial({
      map: cloud,
      side: THREE.DoubleSide,
      opacity: 0.4,
      transparent: true,
      depthWrite: false,
      color: lighten(color)
    }));
  mesh.add(cloudMesh);

  return mesh;
};

function createPlayerMesh() {
  var coords = [[0,30,0],[-10,0,0],[10,0,0],[0,15,10]];
  var faces = [[0,1,2],[0,1,3],[0,2,3],[1,2,3]];
  var geometry = new THREE.Geometry();
  geometry.vertices.push(...coords.map(c => new THREE.Vector3(...c)));
  geometry.faces.push(...faces.map(f => new THREE.Face3(...f)));
  geometry.computeFaceNormals();
  var material = new THREE.MeshPhongMaterial({color: '#FFFF9C', transparent:true, opacity:1});
  return new THREE.Mesh(geometry, material);
}

var shadeColor = percent => color => {
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
var darken = color => shadeColor(random(-0.5, 0.2))(color);
var lighten = color => shadeColor(random(0.5, 0.2))(color);

function random(value, diff) {
  var delta = diff + 2 * Math.random() * (1 - diff);
  return value * delta;
}

export {createPlanetMesh, createPlayerMesh};
