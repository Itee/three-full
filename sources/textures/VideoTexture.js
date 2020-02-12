//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	RGBFormat,
	LinearFilter
} from '../constants.js'
import { Texture } from './Texture.js'

/**
 * @author mrdoob / http://mrdoob.com/
 */
function VideoTexture( video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	Texture.call( this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.format = format !== undefined ? format : RGBFormat;

	this.minFilter = minFilter !== undefined ? minFilter : LinearFilter;
	this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;

	this.generateMipmaps = false;

}

VideoTexture.prototype = Object.assign( Object.create( Texture.prototype ), {

	constructor: VideoTexture,

	isVideoTexture: true,

	update: function () {

		var video = this.image;

		if ( video.readyState >= video.HAVE_CURRENT_DATA ) {

			this.needsUpdate = true;

		}

	}

} );

export { VideoTexture }
