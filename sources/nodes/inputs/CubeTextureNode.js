import { InputNode } from '../InputNode.js'
import { ReflectNode } from '../accessors/ReflectNode.js'



var CubeTextureNode = function ( value, coord, bias ) {

	InputNode.call( this, 'v4', { shared: true } );

	this.value = value;
	this.coord = coord || new ReflectNode();
	this.bias = bias;

};

CubeTextureNode.prototype = Object.create( InputNode.prototype );
CubeTextureNode.prototype.constructor = CubeTextureNode;
CubeTextureNode.prototype.nodeType = "CubeTexture";

CubeTextureNode.prototype.getTexture = function ( builder, output ) {

	return InputNode.prototype.generate.call( this, builder, output, this.value.uuid, 't' );

};

CubeTextureNode.prototype.generate = function ( builder, output ) {

	if ( output === 'samplerCube' ) {

		return this.getTexture( builder, output );

	}

	var cubetex = this.getTexture( builder, output );
	var coord = this.coord.build( builder, 'v3' );
	var bias = this.bias ? this.bias.build( builder, 'fv1' ) : undefined;

	if ( bias == undefined && builder.requires.bias ) {

		bias = builder.requires.bias.build( builder, 'fv1' );

	}

	var code;

	if ( bias ) code = 'texCubeBias(' + cubetex + ',' + coord + ',' + bias + ')';
	else code = 'texCube(' + cubetex + ',' + coord + ')';

	if ( builder.isSlot( 'color' ) ) {

		code = 'mapTexelToLinear(' + code + ')';

	} else if ( builder.isSlot( 'emissive' ) ) {

		code = 'emissiveMapTexelToLinear(' + code + ')';

	} else if ( builder.isSlot( 'environment' ) ) {

		code = 'envMapTexelToLinear(' + code + ')';

	}

	return builder.format( code, this.type, output );

};

CubeTextureNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.value = this.value.uuid;
		data.coord = this.coord.toJSON( meta ).uuid;

		if ( this.bias ) data.bias = this.bias.toJSON( meta ).uuid;

	}

	return data;

};

export { CubeTextureNode }
