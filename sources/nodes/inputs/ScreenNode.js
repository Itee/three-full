//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { InputNode } from '../core/InputNode.js'
import { TextureNode } from './TextureNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
function ScreenNode( uv ) {

	TextureNode.call( this, undefined, uv );

}

ScreenNode.prototype = Object.create( TextureNode.prototype );
ScreenNode.prototype.constructor = ScreenNode;
ScreenNode.prototype.nodeType = "Screen";

ScreenNode.prototype.getUnique = function () {

	return true;

};

ScreenNode.prototype.getTexture = function ( builder, output ) {

	return InputNode.prototype.generate.call( this, builder, output, this.getUuid(), 't', 'renderTexture' );

};

export { ScreenNode }
