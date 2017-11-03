import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var UVNode = function( index ) {

	TempNode.call( this, 'v2', { shared: false } );

	this.index = index || 0;

};

UVNode.vertexDict = [ 'uv', 'uv2' ];
UVNode.fragmentDict = [ 'vUv', 'vUv2' ];

UVNode.prototype = Object.create( TempNode.prototype );
UVNode.prototype.constructor = UVNode;

UVNode.prototype.generate = function( builder, output ) {

	var material = builder.material;
	var result;

	material.requestAttribs.uv[ this.index ] = true;

	if ( builder.isShader( 'vertex' ) ) result = UVNode.vertexDict[ this.index ];
	else result = UVNode.fragmentDict[ this.index ];

	return builder.format( result, this.getType( builder ), output );

};

export { UVNode }
