import { NodeMaterial } from '../NodeMaterial.js'
import { SpriteNode } from './SpriteNode.js'



var SpriteNodeMaterial = function () {

	this.node = new SpriteNode();

	NodeMaterial.call( this, this.node, this.node );

	this.type = "SpriteNodeMaterial";

};

SpriteNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
SpriteNodeMaterial.prototype.constructor = SpriteNodeMaterial;

NodeMaterial.addShortcuts( SpriteNodeMaterial.prototype, 'node',
	[ 'color', 'alpha', 'transform', 'spherical' ] );

export { SpriteNodeMaterial }
