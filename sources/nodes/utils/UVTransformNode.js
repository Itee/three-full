import { FunctionNode } from '../../nodes/FunctionNode.js'
import { UVNode } from '../../nodes/accessors/UVNode.js'
import { Matrix4Node } from '../../nodes/inputs/Matrix4Node.js'
import { Vector2 } from '../../math/Vector2.js'
import { Vector3 } from '../../math/Vector3.js'
import { Matrix4 } from '../../math/Matrix4.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var UVTransformNode = function () {

	FunctionNode.call( this, "( uvTransform * vec4( uvNode, 0, 1 ) ).xy", "vec2" );

	this.uv = new UVNode();
	this.transform = new Matrix4Node();

};

UVTransformNode.prototype = Object.create( FunctionNode.prototype );
UVTransformNode.prototype.constructor = UVTransformNode;

UVTransformNode.prototype.generate = function ( builder, output ) {

	this.keywords[ "uvNode" ] = this.uv;
	this.keywords[ "uvTransform" ] = this.transform;

	return FunctionNode.prototype.generate.call( this, builder, output );

};

UVTransformNode.prototype.compose = function () {

	var defaultPivot = new Vector2( .5, .5 ),
		tempVector = new Vector3(),
		tempMatrix = new Matrix4();

	return function compose( translate, rotate, scale, optionalCenter ) {

		optionalCenter = optionalCenter !== undefined ? optionalCenter : defaultPivot;

		var matrix = this.transform.value;

		matrix.identity()
			.setPosition( tempVector.set( - optionalCenter.x, - optionalCenter.y, 0 ) )
			.premultiply( tempMatrix.makeRotationZ( rotate ) )
			.multiply( tempMatrix.makeScale( scale.x, scale.y, 0 ) )
			.multiply( tempMatrix.makeTranslation( translate.x, translate.y, 0 ) );

		return this;

	};

}();

export { UVTransformNode }
