var THREE = require('three');

export function createLight() {
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(2000, 2000, 2000);

	// need to add an ambient light
	//  for ambient colors to be visible
	// make the ambient light darker so that
	//  it doesn't overwhelm (like emmisive light)
	var ambientLight = new THREE.AmbientLight(0x333333);
	ambientLight.position.set(light.position);

	var lightbulbGeometry = new THREE.SphereGeometry( 10, 16, 8 );
	var lightbulbMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true,  opacity: 0.8, blending: THREE.AdditiveBlending } );
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
	var materialArray = [lightbulbMaterial, wireMaterial];
	var lightbulb = THREE.SceneUtils.createMultiMaterialObject( lightbulbGeometry, materialArray );
	lightbulb.position.set(light.position);

  return {ambientLight, lightbulb, light};
}
