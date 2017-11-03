import { GLNode } from '../nodes/GLNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var RawNode = function( value ) {

	GLNode.call( this, 'v4' );

	this.value = value;

};

RawNode.prototype = Object.create( GLNode.prototype );
RawNode.prototype.constructor = RawNode;

GLNode.prototype.generate = function( builder ) {

	var material = builder.material;

	var data = this.value.parseAndBuildCode( builder, this.type );

	var code = data.code + '\n';

	if ( builder.shader == 'vertex' ) {

		code += 'gl_Position = ' + data.result + ';';

	} else {

		code += 'gl_FragColor = ' + data.result + ';';

	}

	return code;

};

export { RawNode }
