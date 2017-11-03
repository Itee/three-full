import { TempNode } from '../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var FunctionCallNode = function( func, inputs ) {

	TempNode.call( this );

	this.setFunction( func, inputs );

};

FunctionCallNode.prototype = Object.create( TempNode.prototype );
FunctionCallNode.prototype.constructor = FunctionCallNode;

FunctionCallNode.prototype.setFunction = function( func, inputs ) {

	this.value = func;
	this.inputs = inputs || [];

};

FunctionCallNode.prototype.getFunction = function() {

	return this.value;

};

FunctionCallNode.prototype.getType = function( builder ) {

	return this.value.getType( builder );

};

FunctionCallNode.prototype.generate = function( builder, output ) {

	var material = builder.material;

	var type = this.getType( builder );
	var func = this.value;

	var code = func.build( builder, output ) + '(';
	var params = [];

	for ( var i = 0; i < func.inputs.length; i ++ ) {

		var inpt = func.inputs[ i ];
		var param = this.inputs[ i ] || this.inputs[ inpt.name ];

		params.push( param.build( builder, builder.getTypeByFormat( inpt.type ) ) );

	}

	code += params.join( ',' ) + ')';

	return builder.format( code, type, output );

};

export { FunctionCallNode }
