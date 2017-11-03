import { InputNode } from '../../nodes/InputNode.js'
import { Color } from '../../math/Color.js'
import { NodeMaterial } from '../../nodes/NodeMaterial.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var ColorNode = function( color ) {

	InputNode.call( this, 'c' );

	this.value = new Color( color || 0 );

};

ColorNode.prototype = Object.create( InputNode.prototype );
ColorNode.prototype.constructor = ColorNode;

NodeMaterial.addShortcuts( ColorNode.prototype, 'value', [ 'r', 'g', 'b' ] );

export { ColorNode }
