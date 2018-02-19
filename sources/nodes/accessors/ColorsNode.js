import { TempNode } from '../TempNode.js'



var ColorsNode = function ( index ) {

	TempNode.call( this, 'v4', { shared: false } );

	this.index = index || 0;

};

ColorsNode.vertexDict = [ 'color', 'color2' ];
ColorsNode.fragmentDict = [ 'vColor', 'vColor2' ];

ColorsNode.prototype = Object.create( TempNode.prototype );
ColorsNode.prototype.constructor = ColorsNode;

ColorsNode.prototype.generate = function ( builder, output ) {

	var material = builder.material;
	var result;

	material.requires.color[ this.index ] = true;

	if ( builder.isShader( 'vertex' ) ) result = ColorsNode.vertexDict[ this.index ];
	else result = ColorsNode.fragmentDict[ this.index ];

	return builder.format( result, this.getType( builder ), output );

};

ColorsNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.index = this.index;

	}

	return data;

};

export { ColorsNode }
