//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { MeshPhongMaterial } from './MeshPhongMaterial.js'
function MeshToonMaterial( parameters ) {

	MeshPhongMaterial.call( this );

	this.defines = { 'TOON': '' };

	this.type = 'MeshToonMaterial';

	this.gradientMap = null;

	this.setValues( parameters );

}

MeshToonMaterial.prototype = Object.create( MeshPhongMaterial.prototype );
MeshToonMaterial.prototype.constructor = MeshToonMaterial;

MeshToonMaterial.prototype.isMeshToonMaterial = true;

MeshToonMaterial.prototype.copy = function ( source ) {

	MeshPhongMaterial.prototype.copy.call( this, source );

	this.gradientMap = source.gradientMap;

	return this;

};

export { MeshToonMaterial }
