import { InputNode } from '../../nodes/InputNode.js'
import { Vector2 } from '../../math/Vector2.js'
import { NodeMaterial } from '../../nodes/NodeMaterial.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var Vector2Node = function( x, y ) {

	InputNode.call( this, 'v2' );

	this.value = new Vector2( x, y );

};

Vector2Node.prototype = Object.create( InputNode.prototype );
Vector2Node.prototype.constructor = Vector2Node;

NodeMaterial.addShortcuts( Vector2Node.prototype, 'value', [ 'x', 'y' ] );

export { Vector2Node }
