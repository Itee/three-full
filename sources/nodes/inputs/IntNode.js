import { InputNode } from '../../nodes/InputNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var IntNode = function( value ) {

	InputNode.call( this, 'iv1' );

	this.value = [ Math.floor( value || 0 ) ];

};

IntNode.prototype = Object.create( InputNode.prototype );
IntNode.prototype.constructor = IntNode;

Object.defineProperties( IntNode.prototype, {
	number: {
		get: function() {

			return this.value[ 0 ];

		},
		set: function( val ) {

			this.value[ 0 ] = Math.floor( val );

		}
	}
} );

export { IntNode }
