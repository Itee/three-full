import { TempNode } from '../TempNode.js'



var UVNode = function ( index ) {

	TempNode.call( this, 'v2', { shared: false } );

	this.index = index || 0;

};

UVNode.vertexDict = [ 'uv', 'uv2' ];
UVNode.fragmentDict = [ 'vUv', 'vUv2' ];

UVNode.prototype = Object.create( TempNode.prototype );
UVNode.prototype.constructor = UVNode;
UVNode.prototype.nodeType = "UV";

UVNode.prototype.generate = function ( builder, output ) {

	var material = builder.material;
	var result;

	material.requires.uv[ this.index ] = true;

	if ( builder.isShader( 'vertex' ) ) result = UVNode.vertexDict[ this.index ];
	else result = UVNode.fragmentDict[ this.index ];

	return builder.format( result, this.getType( builder ), output );

};

UVNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.index = this.index;

	}

	return data;

};

export { UVNode }
