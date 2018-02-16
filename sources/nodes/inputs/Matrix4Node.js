import { InputNode } from '../InputNode.js'
import { Matrix4 } from '../../math/Matrix4.js'



var Matrix4Node = function ( matrix ) {

	InputNode.call( this, 'm4' );

	this.value = matrix || new Matrix4();

};

Matrix4Node.prototype = Object.create( InputNode.prototype );
Matrix4Node.prototype.constructor = Matrix4Node;
Matrix4Node.prototype.nodeType = "Matrix4";

Matrix4Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	return builder.format( "mat4( " + this.value.elements.join( ", " ) + " )", type, output );

};

Matrix4Node.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.elements = this.value.elements.concat();

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { Matrix4Node }
