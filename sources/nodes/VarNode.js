import { GLNode } from '../nodes/GLNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var VarNode = function( type ) {

	GLNode.call( this, type );

};

VarNode.prototype = Object.create( GLNode.prototype );
VarNode.prototype.constructor = VarNode;

VarNode.prototype.getType = function( builder ) {

	return builder.getTypeByFormat( this.type );

};

VarNode.prototype.generate = function( builder, output ) {

	var varying = builder.material.getVar( this.uuid, this.type );

	return builder.format( varying.name, this.getType( builder ), output );

};

export { VarNode }
