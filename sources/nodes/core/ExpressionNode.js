//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { FunctionNode } from './FunctionNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function ExpressionNode( src, type, keywords, extensions, includes ) {

	FunctionNode.call( this, src, includes, extensions, keywords, type );

}

ExpressionNode.prototype = Object.create( FunctionNode.prototype );
ExpressionNode.prototype.constructor = ExpressionNode;
ExpressionNode.prototype.nodeType = "Expression";

export { ExpressionNode }
