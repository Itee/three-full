//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { PhongNode } from './nodes/PhongNode.js'
import { NodeMaterial } from './NodeMaterial.js'
import { NodeUtils } from '../core/NodeUtils.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function PhongNodeMaterial() {

	var node = new PhongNode();

	NodeMaterial.call( this, node, node );

	this.type = "PhongNodeMaterial";

}

PhongNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
PhongNodeMaterial.prototype.constructor = PhongNodeMaterial;

NodeUtils.addShortcuts( PhongNodeMaterial.prototype, 'fragment', [
	'color',
	'alpha',
	'specular',
	'shininess',
	'normal',
	'emissive',
	'ambient',
	'light',
	'shadow',
	'ao',
	'environment',
	'environmentAlpha',
	'mask',
	'position'
] );

export { PhongNodeMaterial }
