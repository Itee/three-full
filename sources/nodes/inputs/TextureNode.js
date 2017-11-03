import { InputNode } from '../../nodes/InputNode.js'
import { UVNode } from '../../nodes/accessors/UVNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var TextureNode = function( value, coord, bias, project ) {

	InputNode.call( this, 'v4', { shared : true } );

	this.value = value;
	this.coord = coord || new UVNode();
	this.bias = bias;
	this.project = project !== undefined ? project : false;

};

TextureNode.prototype = Object.create( InputNode.prototype );
TextureNode.prototype.constructor = TextureNode;

TextureNode.prototype.getTexture = function( builder, output ) {

	return InputNode.prototype.generate.call( this, builder, output, this.value.uuid, 't' );

};

TextureNode.prototype.generate = function( builder, output ) {

	if ( output === 'sampler2D' ) {

		return this.getTexture( builder, output );

	}

	var tex = this.getTexture( builder, output );
	var coord = this.coord.build( builder, this.project ? 'v4' : 'v2' );
	var bias = this.bias ? this.bias.build( builder, 'fv1' ) : undefined;

	if ( bias == undefined && builder.requires.bias ) {

		bias = builder.requires.bias.build( builder, 'fv1' );

	}

	var method, code;

	if ( this.project ) method = 'texture2DProj';
	else method = bias ? 'tex2DBias' : 'tex2D';

	if ( bias ) code = method + '(' + tex + ',' + coord + ',' + bias + ')';
	else code = method + '(' + tex + ',' + coord + ')';

	if ( builder.isSlot( 'color' ) ) {

		code = 'mapTexelToLinear(' + code + ')';

	} else if ( builder.isSlot( 'emissive' ) ) {

		code = 'emissiveMapTexelToLinear(' + code + ')';

	} else if ( builder.isSlot( 'environment' ) ) {

		code = 'envMapTexelToLinear(' + code + ')';

	}

	return builder.format( code, this.type, output );

};

export { TextureNode }
