import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var JoinNode = function( x, y, z, w ) {

	TempNode.call( this, 'fv1' );

	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;

};

JoinNode.inputs = [ 'x', 'y', 'z', 'w' ];

JoinNode.prototype = Object.create( TempNode.prototype );
JoinNode.prototype.constructor = JoinNode;

JoinNode.prototype.getNumElements = function() {

	var inputs = JoinNode.inputs;
	var i = inputs.length;

	while ( i -- ) {

		if ( this[ inputs[ i ] ] !== undefined ) {

			++ i;
			break;

		}

	}

	return Math.max( i, 2 );

};

JoinNode.prototype.getType = function( builder ) {

	return builder.getFormatFromLength( this.getNumElements() );

};

JoinNode.prototype.generate = function( builder, output ) {

	var material = builder.material;

	var type = this.getType( builder );
	var length = this.getNumElements();

	var inputs = JoinNode.inputs;
	var outputs = [];

	for ( var i = 0; i < length; i ++ ) {

		var elm = this[ inputs[ i ] ];

		outputs.push( elm ? elm.build( builder, 'fv1' ) : '0.' );

	}

	var code = ( length > 1 ? builder.getConstructorFromLength( length ) : '' ) + '(' + outputs.join( ',' ) + ')';

	return builder.format( code, type, output );

};

export { JoinNode }
