import { InputNode } from '../InputNode.js'



var FloatNode = function ( value ) {

	InputNode.call( this, 'fv1' );

	this.value = [ value || 0 ];

};

FloatNode.prototype = Object.create( InputNode.prototype );
FloatNode.prototype.constructor = FloatNode;
FloatNode.prototype.nodeType = "Float";

Object.defineProperties( FloatNode.prototype, {
	number: {
		get: function () {

			return this.value[ 0 ];

		},
		set: function ( val ) {

			this.value[ 0 ] = val;

		}
	}
} );

FloatNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	var value = this.number;

	return builder.format( Math.floor( value ) !== value ? value : value + ".0", type, output );

};

FloatNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.number = this.number;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { FloatNode }
