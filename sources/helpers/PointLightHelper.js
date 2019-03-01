//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Mesh } from '../objects/Mesh.js'
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js'
import { SphereBufferGeometry } from '../geometries/SphereGeometry.js'
function PointLightHelper( light, sphereSize, color ) {

	this.light = light;
	this.light.updateMatrixWorld();

	this.color = color;

	var geometry = new SphereBufferGeometry( sphereSize, 4, 2 );
	var material = new MeshBasicMaterial( { wireframe: true, fog: false } );

	Mesh.call( this, geometry, material );

	this.matrix = this.light.matrixWorld;
	this.matrixAutoUpdate = false;

	this.update();
}

PointLightHelper.prototype = Object.create( Mesh.prototype );
PointLightHelper.prototype.constructor = PointLightHelper;

PointLightHelper.prototype.dispose = function () {

	this.geometry.dispose();
	this.material.dispose();

};

PointLightHelper.prototype.update = function () {

	if ( this.color !== undefined ) {

		this.material.color.set( this.color );

	} else {

		this.material.color.copy( this.light.color );

	}
};

export { PointLightHelper }
