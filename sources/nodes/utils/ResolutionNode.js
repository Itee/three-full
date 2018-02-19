import { Vector2Node } from '../inputs/Vector2Node.js'



var ResolutionNode = function ( renderer ) {

	Vector2Node.call( this );

	this.renderer = renderer;

};

ResolutionNode.prototype = Object.create( Vector2Node.prototype );
ResolutionNode.prototype.constructor = ResolutionNode;
ResolutionNode.prototype.nodeType = "Resolution";

ResolutionNode.prototype.updateFrame = function ( frame ) {

	var size = this.renderer.getSize(),
		pixelRatio = this.renderer.getPixelRatio();

	this.x = size.width * pixelRatio;
	this.y = size.height * pixelRatio;

};

ResolutionNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.renderer = this.renderer.uuid;

	}

	return data;

};

export { ResolutionNode }
