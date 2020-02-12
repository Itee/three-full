//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { SpriteNode } from './nodes/SpriteNode.js'
import { NodeMaterial } from './NodeMaterial.js'
import { NodeUtils } from '../core/NodeUtils.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function SpriteNodeMaterial() {

	var node = new SpriteNode();

	NodeMaterial.call( this, node, node );

	this.type = "SpriteNodeMaterial";

}

SpriteNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
SpriteNodeMaterial.prototype.constructor = SpriteNodeMaterial;

NodeUtils.addShortcuts( SpriteNodeMaterial.prototype, 'fragment', [
	'color',
	'alpha',
	'mask',
	'position',
	'spherical'
] );

export { SpriteNodeMaterial }
