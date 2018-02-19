import { TempNode } from '../TempNode.js'



var OperatorNode = function ( a, b, op ) {

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
OperatorNode.prototype.nodeType = "Operator";

OperatorNode.prototype.getType = function ( builder ) {

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

OperatorNode.prototype.generate = function ( builder, output ) {

	var material = builder.material,
		data = material.getDataNode( this.uuid );

	var type = this.getType( builder );

	var a = this.a.build( builder, type );
	var b = this.b.build( builder, type );

	return builder.format( '(' + a + this.op + b + ')', type, output );

};

OperatorNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.a = this.a.toJSON( meta ).uuid;
		data.b = this.b.toJSON( meta ).uuid;
		data.op = this.op;

	}

	return data;

};

export { OperatorNode }
