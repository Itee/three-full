import { ShaderPass } from '../../postprocessing/ShaderPass.js'
import { RawNode } from '../../nodes/RawNode.js'
import { ScreenNode } from '../../nodes/inputs/ScreenNode.js'
import { NodeMaterial } from '../../nodes/NodeMaterial.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var NodePass = function() {

	ShaderPass.call( this );

	this.textureID = 'renderTexture';

	this.fragment = new RawNode( new ScreenNode() );

	this.node = new NodeMaterial();
	this.node.fragment = this.fragment;

	this.build();

};

NodePass.prototype = Object.create( ShaderPass.prototype );
NodePass.prototype.constructor = NodePass;

NodeMaterial.addShortcuts( NodePass.prototype, 'fragment', [ 'value' ] );

NodePass.prototype.build = function() {

	this.node.build();

	this.uniforms = this.node.uniforms;
	this.material = this.node;

};

export { NodePass }
