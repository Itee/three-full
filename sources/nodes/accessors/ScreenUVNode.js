//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode.js'
import { ResolutionNode } from './ResolutionNode.js'
function ScreenUVNode( resolution ) {

	TempNode.call( this, 'v2' );

	this.resolution = resolution || new ResolutionNode();

}

ScreenUVNode.prototype = Object.create( TempNode.prototype );
ScreenUVNode.prototype.constructor = ScreenUVNode;
ScreenUVNode.prototype.nodeType = "ScreenUV";

ScreenUVNode.prototype.generate = function ( builder, output ) {

	var result;

	if ( builder.isShader( 'fragment' ) ) {

		result = '( gl_FragCoord.xy / ' + this.resolution.build( builder, 'v2' ) + ')';

	} else {

		console.warn( "ScreenUVNode is not compatible with " + builder.shader + " shader." );

		result = 'vec2( 0.0 )';

	}

	return builder.format( result, this.getType( builder ), output );

};

ScreenUVNode.prototype.copy = function ( source ) {

	TempNode.prototype.copy.call( this, source );

	this.resolution = source.resolution;

};

ScreenUVNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.resolution = this.resolution.toJSON( meta ).uuid;

	}

	return data;

};
export { ScreenUVNode }
