import { InputNode } from '../InputNode.js'
import { Vector4 } from '../../math/Vector4.js'
import { NodeMaterial } from '../NodeMaterial.js'



var Vector4Node = function ( x, y, z, w ) {

	InputNode.call( this, 'v4' );

	this.value = new Vector4( x, y, z, w );

};

Vector4Node.prototype = Object.create( InputNode.prototype );
Vector4Node.prototype.constructor = Vector4Node;
Vector4Node.prototype.nodeType = "Vector4";

NodeMaterial.addShortcuts( Vector4Node.prototype, 'value', [ 'x', 'y', 'z', 'w' ] );

Vector4Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	return builder.format( "vec4( " + this.x + ", " + this.y + ", " + this.z + ", " + this.w + " )", type, output );

};

Vector4Node.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.x = this.x;
		data.y = this.y;
		data.z = this.z;
		data.w = this.w;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { Vector4Node }
