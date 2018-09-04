//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from '../math/Color.js'

function Fog( color, near, far ) {

	this.name = '';

	this.color = new Color( color );

	this.near = ( near !== undefined ) ? near : 1;
	this.far = ( far !== undefined ) ? far : 1000;

}

Fog.prototype.isFog = true;

Fog.prototype.clone = function () {

	return new Fog( this.color, this.near, this.far );

};

Fog.prototype.toJSON = function (  ) {

	return {
		type: 'Fog',
		color: this.color.getHex(),
		near: this.near,
		far: this.far
	};

};

;

export { Fog }
