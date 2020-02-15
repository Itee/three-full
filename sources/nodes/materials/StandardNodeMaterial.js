//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { StandardNode } from './nodes/StandardNode.js'
import { NodeMaterial } from './NodeMaterial.js'
import { NodeUtils } from '../core/NodeUtils.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function StandardNodeMaterial() {

	var node = new StandardNode();

	NodeMaterial.call( this, node, node );

	this.type = "StandardNodeMaterial";

}

StandardNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
StandardNodeMaterial.prototype.constructor = StandardNodeMaterial;

NodeUtils.addShortcuts( StandardNodeMaterial.prototype, 'fragment', [
	'color',
	'alpha',
	'roughness',
	'metalness',
	'reflectivity',
	'clearcoat',
	'clearcoatRoughness',
	'clearcoatNormal',
	'normal',
	'emissive',
	'ambient',
	'light',
	'shadow',
	'ao',
	'environment',
	'mask',
	'position',
	'sheen'
] );

export { StandardNodeMaterial }
