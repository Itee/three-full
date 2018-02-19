import { InputNode } from '../InputNode.js'
import { Matrix3 } from '../../math/Matrix3.js'



var Matrix3Node = function ( matrix ) {

	InputNode.call( this, 'm3' );

	this.value = matrix || new Matrix3();

};

Matrix3Node.prototype = Object.create( InputNode.prototype );
Matrix3Node.prototype.constructor = Matrix3Node;
Matrix3Node.prototype.nodeType = "Matrix3";

Matrix3Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	return builder.format( "mat3( " + this.value.elements.join( ", " ) + " )", type, output );

};

Matrix3Node.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.elements = this.value.elements.concat();

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { Matrix3Node }
