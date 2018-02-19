import { ShaderPass } from '../../postprocessing/ShaderPass.js'
import { RawNode } from '../RawNode.js'
import { ScreenNode } from '../inputs/ScreenNode.js'
import { NodeMaterial } from '../NodeMaterial.js'
import { _Math } from '../../math/Math.js'



var NodePass = function () {

	ShaderPass.call( this );

	this.name = "";
	this.uuid = _Math.generateUUID();

	this.userData = {};

	this.textureID = 'renderTexture';

	this.fragment = new RawNode( new ScreenNode() );

	this.node = new NodeMaterial();
	this.node.fragment = this.fragment;

	this.build();

};

NodePass.prototype = Object.create( ShaderPass.prototype );
NodePass.prototype.constructor = NodePass;

NodeMaterial.addShortcuts( NodePass.prototype, 'fragment', [ 'value' ] );

NodePass.prototype.build = function () {

	this.node.build();

	this.uniforms = this.node.uniforms;
	this.material = this.node;

};

NodePass.prototype.toJSON = function ( meta ) {

	var isRootObject = ( meta === undefined || typeof meta === 'string' );

	if ( isRootObject ) {

		meta = {
			nodes: {}
		};

	}

	if ( meta && ! meta.passes ) meta.passes = {};

	if ( ! meta.passes[ this.uuid ] ) {

		var data = {};

		data.uuid = this.uuid;
		data.type = "NodePass";

		meta.passes[ this.uuid ] = data;

		if ( this.name !== "" ) data.name = this.name;

		if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

		data.value = this.value.toJSON( meta ).uuid;

	}

	meta.pass = this.uuid;

	return meta;

};

export { NodePass }
