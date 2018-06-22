import { Color } from '../math/Color.js'





function FogExp2( color, density ) {

	this.name = '';

	this.color = new Color( color );
	this.density = ( density !== undefined ) ? density : 0.00025;

}

FogExp2.prototype.isFogExp2 = true;

FogExp2.prototype.clone = function () {

	return new FogExp2( this.color, this.density );

};

FogExp2.prototype.toJSON = function (  ) {

	return {
		type: 'FogExp2',
		color: this.color.getHex(),
		density: this.density
	};

};

;

export { FogExp2 }
