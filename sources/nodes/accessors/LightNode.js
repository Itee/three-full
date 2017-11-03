import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var LightNode = function() {

	TempNode.call( this, 'v3', { shared: false } );

};

LightNode.prototype = Object.create( TempNode.prototype );
LightNode.prototype.constructor = LightNode;

LightNode.prototype.generate = function( builder, output ) {

	if ( builder.isCache( 'light' ) ) {

		return builder.format( 'reflectedLight.directDiffuse', this.getType( builder ), output )

	} else {

		console.warn( "LightNode is only compatible in \"light\" channel." );

		return builder.format( 'vec3( 0.0 )', this.getType( builder ), output );

	}

};

export { LightNode }
