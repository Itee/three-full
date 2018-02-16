import { GLNode } from './GLNode.js'



var VarNode = function ( type ) {

	GLNode.call( this, type );

};

VarNode.prototype = Object.create( GLNode.prototype );
VarNode.prototype.constructor = VarNode;
VarNode.prototype.nodeType = "Var";

VarNode.prototype.getType = function ( builder ) {

	return builder.getTypeByFormat( this.type );

};

VarNode.prototype.generate = function ( builder, output ) {

	var varying = builder.material.getVar( this.uuid, this.type );

	return builder.format( varying.name, this.getType( builder ), output );

};

VarNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.out = this.type;

	}

	return data;

};

export { VarNode }
