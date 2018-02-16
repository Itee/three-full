import { InputNode } from '../InputNode.js'



var IntNode = function ( value ) {

	InputNode.call( this, 'iv1' );

	this.value = [ Math.floor( value || 0 ) ];

};

IntNode.prototype = Object.create( InputNode.prototype );
IntNode.prototype.constructor = IntNode;
IntNode.prototype.nodeType = "Int";

Object.defineProperties( IntNode.prototype, {
	number: {
		get: function () {

			return this.value[ 0 ];

		},
		set: function ( val ) {

			this.value[ 0 ] = Math.floor( val );

		}
	}
} );

IntNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	return builder.format( this.number, type, output );

};

IntNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.number = this.number;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { IntNode }
