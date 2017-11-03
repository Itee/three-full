import { NodeMaterial } from '../../nodes/NodeMaterial.js'
import { SpriteNode } from '../../nodes/materials/SpriteNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var SpriteNodeMaterial = function () {

	this.node = new SpriteNode();

	NodeMaterial.call( this, this.node, this.node );

};

SpriteNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
SpriteNodeMaterial.prototype.constructor = SpriteNodeMaterial;

NodeMaterial.addShortcuts( SpriteNodeMaterial.prototype, 'node',
[ 'color', 'alpha', 'transform', 'spherical' ] );

export { SpriteNodeMaterial }
