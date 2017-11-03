import { InputNode } from '../../nodes/InputNode.js'
import { Vector3 } from '../../math/Vector3.js'
import { NodeMaterial } from '../../nodes/NodeMaterial.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var Vector3Node = function( x, y, z ) {

	InputNode.call( this, 'v3' );

	this.type = 'v3';
	this.value = new Vector3( x, y, z );

};

Vector3Node.prototype = Object.create( InputNode.prototype );
Vector3Node.prototype.constructor = Vector3Node;

NodeMaterial.addShortcuts( Vector3Node.prototype, 'value', [ 'x', 'y', 'z' ] );

export { Vector3Node }
