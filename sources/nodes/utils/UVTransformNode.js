import { FunctionNode } from '../FunctionNode.js'
import { UVNode } from '../accessors/UVNode.js'
import { Matrix3Node } from '../inputs/Matrix3Node.js'



var UVTransformNode = function () {

	FunctionNode.call( this, "( uvTransform * vec3( uvNode, 1 ) ).xy", "vec2" );

	this.uv = new UVNode();
	this.transform = new Matrix3Node();

};

UVTransformNode.prototype = Object.create( FunctionNode.prototype );
UVTransformNode.prototype.constructor = UVTransformNode;
UVTransformNode.prototype.nodeType = "UVTransform";

UVTransformNode.prototype.generate = function ( builder, output ) {

	this.keywords[ "uvNode" ] = this.uv;
	this.keywords[ "uvTransform" ] = this.transform;

	return FunctionNode.prototype.generate.call( this, builder, output );

};

UVTransformNode.prototype.setUvTransform = function ( tx, ty, sx, sy, rotation, cx, cy ) {

	cx = cx !== undefined ? cx : .5;
	cy = cy !== undefined ? cy : .5;

	this.transform.value.setUvTransform( tx, ty, sx, sy, rotation, cx, cy );

};

UVTransformNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.uv = this.uv.toJSON( meta ).uuid;
		data.transform = this.transform.toJSON( meta ).uuid;

	}

	return data;

};

export { UVTransformNode }
