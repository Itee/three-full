import { TempNode } from '../TempNode.js'



var LightNode = function ( scope ) {

	TempNode.call( this, 'v3', { shared: false } );

	this.scope = scope || LightNode.TOTAL;

};

LightNode.TOTAL = 'total';

LightNode.prototype = Object.create( TempNode.prototype );
LightNode.prototype.constructor = LightNode;
LightNode.prototype.nodeType = "Light";

LightNode.prototype.generate = function ( builder, output ) {

	if ( builder.isCache( 'light' ) ) {

		return builder.format( 'reflectedLight.directDiffuse', this.getType( builder ), output );

	} else {

		console.warn( "LightNode is only compatible in \"light\" channel." );

		return builder.format( 'vec3( 0.0 )', this.getType( builder ), output );

	}

};

LightNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.scope = this.scope;

	}

	return data;

};

export { LightNode }
