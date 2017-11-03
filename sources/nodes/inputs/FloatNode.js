import { InputNode } from '../../nodes/InputNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var FloatNode = function( value ) {

	InputNode.call( this, 'fv1' );

	this.value = [ value || 0 ];

};

FloatNode.prototype = Object.create( InputNode.prototype );
FloatNode.prototype.constructor = FloatNode;

Object.defineProperties( FloatNode.prototype, {
	number: {
		get: function() {

			return this.value[ 0 ];

		},
		set: function( val ) {

			this.value[ 0 ] = val;

		}
	}
} );

export { FloatNode }
