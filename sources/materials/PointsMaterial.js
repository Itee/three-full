//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Material } from './Material.js'
import { Color } from '../math/Color.js'
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new Texture( <Image> ),
 *  alphaMap: new Texture( <Image> ),
 *
 *  size: <float>,
 *  sizeAttenuation: <bool>
 *
 *  morphTargets: <bool>
 * }
 */

function PointsMaterial( parameters ) {

	Material.call( this );

	this.type = 'PointsMaterial';

	this.color = new Color( 0xffffff );

	this.map = null;

	this.alphaMap = null;

	this.size = 1;
	this.sizeAttenuation = true;

	this.morphTargets = false;

	this.setValues( parameters );

}

PointsMaterial.prototype = Object.create( Material.prototype );
PointsMaterial.prototype.constructor = PointsMaterial;

PointsMaterial.prototype.isPointsMaterial = true;

PointsMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.color.copy( source.color );

	this.map = source.map;

	this.alphaMap = source.alphaMap;

	this.size = source.size;
	this.sizeAttenuation = source.sizeAttenuation;

	this.morphTargets = source.morphTargets;

	return this;

};

export { PointsMaterial }
