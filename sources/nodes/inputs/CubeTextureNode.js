import { InputNode } from '../../nodes/InputNode.js'
import { ReflectNode } from '../../nodes/accessors/ReflectNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var CubeTextureNode = function( value, coord, bias ) {

	InputNode.call( this, 'v4', { shared : true } );

	this.value = value;
	this.coord = coord || new ReflectNode();
	this.bias = bias;

};

CubeTextureNode.prototype = Object.create( InputNode.prototype );
CubeTextureNode.prototype.constructor = CubeTextureNode;

CubeTextureNode.prototype.getTexture = function( builder, output ) {

	return InputNode.prototype.generate.call( this, builder, output, this.value.uuid, 't' );

};

CubeTextureNode.prototype.generate = function( builder, output ) {

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

export { CubeTextureNode }
