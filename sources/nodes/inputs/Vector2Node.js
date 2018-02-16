import { InputNode } from '../InputNode.js'
import { Vector2 } from '../../math/Vector2.js'
import { NodeMaterial } from '../NodeMaterial.js'



var Vector2Node = function ( x, y ) {

	InputNode.call( this, 'v2' );

	this.value = new Vector2( x, y );

};

Vector2Node.prototype = Object.create( InputNode.prototype );
Vector2Node.prototype.constructor = Vector2Node;
Vector2Node.prototype.nodeType = "Vector2";

NodeMaterial.addShortcuts( Vector2Node.prototype, 'value', [ 'x', 'y' ] );

Vector2Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	return builder.format( "vec2( " + this.x + ", " + this.y + " )", type, output );

};

Vector2Node.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.x = this.x;
		data.y = this.y;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { Vector2Node }
