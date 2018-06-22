import { InputNode } from '../InputNode.js'



var FloatNode = function ( value ) {

	InputNode.call( this, 'fv1' );

	this.value = value || 0;

};

FloatNode.prototype = Object.create( InputNode.prototype );
FloatNode.prototype.constructor = FloatNode;
FloatNode.prototype.nodeType = "Float";

FloatNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	var val = this.value;

	return builder.format( Math.floor( val ) !== val ? val : val + ".0", type, output );

};

FloatNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.value = this.value;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { FloatNode }
