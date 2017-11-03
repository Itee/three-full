import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var LuminanceNode = function( rgb ) {

	TempNode.call( this, 'fv1' );

	this.rgb = rgb;

};

LuminanceNode.prototype = Object.create( TempNode.prototype );
LuminanceNode.prototype.constructor = LuminanceNode;

LuminanceNode.prototype.generate = function( builder, output ) {

	builder.include( 'luminance_rgb' );

	return builder.format( 'luminance_rgb(' + this.rgb.build( builder, 'v3' ) + ')', this.getType( builder ), output );

};

export { LuminanceNode }
