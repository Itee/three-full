//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode.js'
import { FloatNode } from '../inputs/FloatNode.js'
import { TextureCubeUVNode } from './TextureCubeUVNode.js'
import { ReflectNode } from '../accessors/ReflectNode.js'
import { NormalNode } from '../accessors/NormalNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function TextureCubeNode( value, uv, bias ) {

	TempNode.call( this, 'v4' );

	this.value = value;

	this.radianceNode = new TextureCubeUVNode(
		this.value,
		uv || new ReflectNode( ReflectNode.VECTOR ),
		// bias should be replaced in builder.context in build process
		bias
	);

	this.irradianceNode = new TextureCubeUVNode(
		this.value,
		new NormalNode( NormalNode.WORLD ),
		new FloatNode( 1 ).setReadonly( true )
	);

}

TextureCubeNode.prototype = Object.create( TempNode.prototype );
TextureCubeNode.prototype.constructor = TextureCubeNode;
TextureCubeNode.prototype.nodeType = "TextureCube";

TextureCubeNode.prototype.generate = function ( builder, output ) {

	if ( builder.isShader( 'fragment' ) ) {

		builder.require( 'irradiance' );

		if ( builder.context.bias ) {

			builder.context.bias.setTexture( this.value );

		}

		var scopeNode = builder.slot === 'irradiance' ? this.irradianceNode : this.radianceNode;

		return scopeNode.build( builder, output );

	} else {

		console.warn( "TextureCubeNode is not compatible with " + builder.shader + " shader." );

		return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

	}

};

TextureCubeNode.prototype.copy = function ( source ) {

	TempNode.prototype.copy.call( this, source );

	this.value = source.value;

	return this;

};

TextureCubeNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.value = this.value.toJSON( meta ).uuid;

	}

	return data;

};

export { TextureCubeNode }
