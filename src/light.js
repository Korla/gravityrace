var THREE = require('three');

export function createLight(...pos) {
	var light = new THREE.PointLight(0xffffff, 0.8);
	light.position.set(...pos);
	var ambientLight = new THREE.AmbientLight(0x333333, 0.5);
	ambientLight.position.set(...pos);
  return {ambientLight, light};
}
