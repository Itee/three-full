//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { InputNode } from '../core/InputNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function IntNode( value ) {

	InputNode.call( this, 'i' );

	this.value = Math.floor( value || 0 );

}

IntNode.prototype = Object.create( InputNode.prototype );
IntNode.prototype.constructor = IntNode;
IntNode.prototype.nodeType = "Int";

IntNode.prototype.generateReadonly = function ( builder, output, uuid, type/*, ns, needsUpdate */ ) {

	return builder.format( this.value, type, output );

};

IntNode.prototype.copy = function ( source ) {

	InputNode.prototype.copy.call( this, source );

	this.value = source.value;

	return this;

};

IntNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.value = this.value;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { IntNode }
