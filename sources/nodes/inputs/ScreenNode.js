import { TextureNode } from '../../nodes/inputs/TextureNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var ScreenNode = function( coord ) {

	TextureNode.call( this, undefined, coord );

};

ScreenNode.prototype = Object.create( TextureNode.prototype );
ScreenNode.prototype.constructor = ScreenNode;

ScreenNode.prototype.isUnique = function() {

	return true;

};

ScreenNode.prototype.getTexture = function( builder, output ) {

	return InputNode.prototype.generate.call( this, builder, output, this.getUuid(), 't', 'renderTexture' );

};

export { ScreenNode }
