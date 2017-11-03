import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var OperatorNode = function( a, b, op ) {

	TempNode.call( this );

	this.a = a;
	this.b = b;
	this.op = op || OperatorNode.ADD;

};

OperatorNode.ADD = '+';
OperatorNode.SUB = '-';
OperatorNode.MUL = '*';
OperatorNode.DIV = '/';

OperatorNode.prototype = Object.create( TempNode.prototype );
OperatorNode.prototype.constructor = OperatorNode;

OperatorNode.prototype.getType = function( builder ) {

	var a = this.a.getType( builder );
	var b = this.b.getType( builder );

	if ( builder.isFormatMatrix( a ) ) {

		return 'v4';

	} else if ( builder.getFormatLength( b ) > builder.getFormatLength( a ) ) {

		// use the greater length vector

		return b;

	}

	return a;

};

OperatorNode.prototype.generate = function( builder, output ) {

	var material = builder.material,
		data = material.getDataNode( this.uuid );

	var type = this.getType( builder );

	var a = this.a.build( builder, type );
	var b = this.b.build( builder, type );

	return builder.format( '(' + a + this.op + b + ')', type, output );

};

export { OperatorNode }
