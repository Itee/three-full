import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var NoiseNode = function( coord ) {

	TempNode.call( this, 'fv1' );

	this.coord = coord;

};

NoiseNode.prototype = Object.create( TempNode.prototype );
NoiseNode.prototype.constructor = NoiseNode;

NoiseNode.prototype.generate = function( builder, output ) {

	builder.include( 'snoise' );

	return builder.format( 'snoise(' + this.coord.build( builder, 'v2' ) + ')', this.getType( builder ), output );

};

export { NoiseNode }
