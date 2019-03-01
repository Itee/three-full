//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector2Node } from '../inputs/Vector2Node.js'
function ResolutionNode() {

	Vector2Node.call( this );

}

ResolutionNode.prototype = Object.create( Vector2Node.prototype );
ResolutionNode.prototype.constructor = ResolutionNode;
ResolutionNode.prototype.nodeType = "Resolution";

ResolutionNode.prototype.updateFrame = function ( frame ) {

	if ( frame.renderer ) {

		var size = frame.renderer.getSize(),
			pixelRatio = frame.renderer.getPixelRatio();

		this.x = size.width * pixelRatio;
		this.y = size.height * pixelRatio;

	} else {

		console.warn( "ResolutionNode need a renderer in NodeFrame" );

	}

};

ResolutionNode.prototype.copy = function ( source ) {

	Vector2Node.prototype.copy.call( this, source );

	this.renderer = source.renderer;

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
