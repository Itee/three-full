//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @author mrdoob / http://mrdoob.com/
 */

function Uniform( value ) {

	if ( typeof value === 'string' ) {

		console.warn( 'Uniform: Type parameter is no longer needed.' );
		value = arguments[ 1 ];

	}

	this.value = value;

}

Uniform.prototype.clone = function () {

	return new Uniform( this.value.clone === undefined ? this.value : this.value.clone() );

};

export { Uniform }
