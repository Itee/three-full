//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LineBasicMaterial } from './LineBasicMaterial.js'
function LineDashedMaterial( parameters ) {

	LineBasicMaterial.call( this );

	this.type = 'LineDashedMaterial';

	this.scale = 1;
	this.dashSize = 3;
	this.gapSize = 1;

	this.setValues( parameters );

}

LineDashedMaterial.prototype = Object.create( LineBasicMaterial.prototype );
LineDashedMaterial.prototype.constructor = LineDashedMaterial;

LineDashedMaterial.prototype.isLineDashedMaterial = true;

LineDashedMaterial.prototype.copy = function ( source ) {

	LineBasicMaterial.prototype.copy.call( this, source );

	this.scale = source.scale;
	this.dashSize = source.dashSize;
	this.gapSize = source.gapSize;

	return this;

};

export { LineDashedMaterial }
