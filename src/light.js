var THREE = require('three');

export function createLight(...pos) {
	console.log(pos)
	// LIGHT
	var light = new THREE.PointLight(0xffffff, 0.8);
	light.position.set(...pos);

	// need to add an ambient light
	//  for ambient colors to be visible
	// make the ambient light darker so that
	//  it doesn't overwhelm (like emmisive light)
	var ambientLight = new THREE.AmbientLight(0x333333, 0.5);
	ambientLight.position.set(...pos);

  return {ambientLight, light};
}
