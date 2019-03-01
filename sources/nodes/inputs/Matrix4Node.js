//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { InputNode } from '../core/InputNode.js'
import { Matrix4 } from '../../math/Matrix4.js'
function Matrix4Node( matrix ) {

	InputNode.call( this, 'm4' );

	this.value = matrix || new Matrix4();

}

Matrix4Node.prototype = Object.create( InputNode.prototype );
Matrix4Node.prototype.constructor = Matrix4Node;
Matrix4Node.prototype.nodeType = "Matrix4";

Object.defineProperties( Matrix4Node.prototype, {

	elements: {

		set: function ( val ) {

			this.value.elements = val;

		},

		get: function () {

			return this.value.elements;

		}

	}

} );

Matrix4Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	return builder.format( "mat4( " + this.value.elements.join( ", " ) + " )", type, output );

};

Matrix4Node.prototype.copy = function ( source ) {

	InputNode.prototype.copy.call( this, source );

	this.scope.value.fromArray( source.elements );

};

Matrix4Node.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.elements = this.value.elements.concat();

	}

	return data;

};

export { Matrix4Node }
