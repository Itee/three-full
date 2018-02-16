import { TempNode } from '../TempNode.js'



var LuminanceNode = function ( rgb ) {

	TempNode.call( this, 'fv1' );

	this.rgb = rgb;

};

LuminanceNode.prototype = Object.create( TempNode.prototype );
LuminanceNode.prototype.constructor = LuminanceNode;
LuminanceNode.prototype.nodeType = "Luminance";

LuminanceNode.prototype.generate = function ( builder, output ) {

	builder.include( 'luminance_rgb' );

	return builder.format( 'luminance_rgb(' + this.rgb.build( builder, 'v3' ) + ')', this.getType( builder ), output );

};

LuminanceNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.rgb = this.rgb.toJSON( meta ).uuid;

	}

	return data;

};

export { LuminanceNode }
