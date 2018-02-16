import { TempNode } from '../TempNode.js'



var NoiseNode = function ( coord ) {

	TempNode.call( this, 'fv1' );

	this.coord = coord;

};

NoiseNode.prototype = Object.create( TempNode.prototype );
NoiseNode.prototype.constructor = NoiseNode;
NoiseNode.prototype.nodeType = "Noise";

NoiseNode.prototype.generate = function ( builder, output ) {

	builder.include( 'snoise' );

	return builder.format( 'snoise(' + this.coord.build( builder, 'v2' ) + ')', this.getType( builder ), output );

};

NoiseNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.coord = this.coord.toJSON( meta ).uuid;

	}

	return data;

};

export { NoiseNode }
