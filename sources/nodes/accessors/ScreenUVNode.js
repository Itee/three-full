import { TempNode } from '../TempNode.js'



var ScreenUVNode = function ( resolution ) {

	TempNode.call( this, 'v2' );

	this.resolution = resolution;

};

ScreenUVNode.prototype = Object.create( TempNode.prototype );
ScreenUVNode.prototype.constructor = ScreenUVNode;
ScreenUVNode.prototype.nodeType = "ScreenUV";

ScreenUVNode.prototype.generate = function ( builder, output ) {

	var material = builder.material;
	var result;

	if ( builder.isShader( 'fragment' ) ) {

		result = '(gl_FragCoord.xy/' + this.resolution.build( builder, 'v2' ) + ')';

	} else {

		console.warn( "ScreenUVNode is not compatible with " + builder.shader + " shader." );

		result = 'vec2( 0.0 )';

	}

	return builder.format( result, this.getType( builder ), output );

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
