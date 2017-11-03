import { Vector2Node } from '../../nodes/inputs/Vector2Node.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var ResolutionNode = function( renderer ) {

	Vector2Node.call( this );

	this.requestUpdate = true;

	this.renderer = renderer;

};

ResolutionNode.prototype = Object.create( Vector2Node.prototype );
ResolutionNode.prototype.constructor = ResolutionNode;

ResolutionNode.prototype.updateFrame = function( delta ) {

	var size = this.renderer.getSize(),
		pixelRatio = this.renderer.getPixelRatio();

	this.x = size.width * pixelRatio;
	this.y = size.height * pixelRatio;

};

export { ResolutionNode }
