//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Material } from './Material.js'
import { Color } from '../math/Color.js'

/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  color: <Color>
 * }
 */
function ShadowMaterial( parameters ) {

	Material.call( this );

	this.type = 'ShadowMaterial';

	this.color = new Color( 0x000000 );
	this.transparent = true;

	this.setValues( parameters );

}

ShadowMaterial.prototype = Object.create( Material.prototype );
ShadowMaterial.prototype.constructor = ShadowMaterial;

ShadowMaterial.prototype.isShadowMaterial = true;

ShadowMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.color.copy( source.color );

	return this;

};

export { ShadowMaterial }
