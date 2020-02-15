//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Node } from '../../core/Node.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function RawNode( value ) {

	Node.call( this, 'v4' );

	this.value = value;

}

RawNode.prototype = Object.create( Node.prototype );
RawNode.prototype.constructor = RawNode;
RawNode.prototype.nodeType = "Raw";

RawNode.prototype.generate = function ( builder ) {

	var data = this.value.analyzeAndFlow( builder, this.type ),
		code = data.code + '\n';

	if ( builder.isShader( 'vertex' ) ) {

		code += 'gl_Position = ' + data.result + ';';

	} else {

		code += 'gl_FragColor = ' + data.result + ';';

	}

	return code;

};

RawNode.prototype.copy = function ( source ) {

	Node.prototype.copy.call( this, source );

	this.value = source.value;

	return this;

};

RawNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.value = this.value.toJSON( meta ).uuid;

	}

	return data;

};

export { RawNode }
