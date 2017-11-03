import { InputNode } from '../../nodes/InputNode.js'
import { Matrix4 } from '../../math/Matrix4.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var Matrix4Node = function( matrix ) {

	InputNode.call( this, 'm4' );

	this.value = matrix || new Matrix4();

};

Matrix4Node.prototype = Object.create( InputNode.prototype );
Matrix4Node.prototype.constructor = Matrix4Node;

export { Matrix4Node }
