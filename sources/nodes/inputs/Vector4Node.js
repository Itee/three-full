import { InputNode } from '../../nodes/InputNode.js'
import { Vector4 } from '../../math/Vector4.js'
import { NodeMaterial } from '../../nodes/NodeMaterial.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var Vector4Node = function( x, y, z, w ) {

	InputNode.call( this, 'v4' );

	this.value = new Vector4( x, y, z, w );

};

Vector4Node.prototype = Object.create( InputNode.prototype );
Vector4Node.prototype.constructor = Vector4Node;

NodeMaterial.addShortcuts( Vector4Node.prototype, 'value', [ 'x', 'y', 'z', 'w' ] );

export { Vector4Node }
