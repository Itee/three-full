//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { InputNode } from '../core/InputNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function FloatNode( value ) {

	InputNode.call( this, 'f' );

	this.value = value || 0;

}

FloatNode.prototype = Object.create( InputNode.prototype );
FloatNode.prototype.constructor = FloatNode;
FloatNode.prototype.nodeType = "Float";

FloatNode.prototype.generateReadonly = function ( builder, output, uuid, type/*, ns, needsUpdate */ ) {

	return builder.format( this.value + ( this.value % 1 ? '' : '.0' ), type, output );

};

FloatNode.prototype.copy = function ( source ) {

	InputNode.prototype.copy.call( this, source );

	this.value = source.value;

	return this;

};

FloatNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.value = this.value;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { FloatNode }
