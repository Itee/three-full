//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode.js'
import { TextureCubeUVNode } from './TextureCubeUVNode.js'
function TextureCubeNode( value, uv ) {

	TempNode.call( this, 'v4' );

	this.value = value;
	this.uv = uv || new TextureCubeUVNode();

}

TextureCubeNode.prototype = Object.create( TempNode.prototype );
TextureCubeNode.prototype.constructor = TextureCubeNode;
TextureCubeNode.prototype.nodeType = "TextureCube";

TextureCubeNode.prototype.generate = function ( builder, output ) {

	if ( builder.isShader( 'fragment' ) ) {

		var uv_10 = this.uv.build( builder ) + '.uv_10',
			uv_20 = this.uv.build( builder ) + '.uv_20',
			t = this.uv.build( builder ) + '.t';

		var color10 = builder.getTexelDecodingFunctionFromTexture( 'texture2D( ' + this.value.build( builder, 'sampler2D' ) + ', ' + uv_10 + ' )', this.value.value ),
			color20 = builder.getTexelDecodingFunctionFromTexture( 'texture2D( ' + this.value.build( builder, 'sampler2D' ) + ', ' + uv_20 + ' )', this.value.value );

		return builder.format( 'vec4( mix( ' + color10 + ', ' + color20 + ', ' + t + ' ).rgb, 1.0 )', this.getType( builder ), output );

	} else {

		console.warn( "TextureCubeNode is not compatible with " + builder.shader + " shader." );

		return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

	}

};

TextureCubeNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.uv = this.uv.toJSON( meta ).uuid;
		data.textureSize = this.textureSize.toJSON( meta ).uuid;
		data.blinnExponentToRoughness = this.blinnExponentToRoughness.toJSON( meta ).uuid;

		if ( this.roughness ) data.roughness = this.roughness.toJSON( meta ).uuid;

	}

	return data;

};

export { TextureCubeNode }
