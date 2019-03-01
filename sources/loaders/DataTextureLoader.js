//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	LinearFilter,
	LinearMipMapLinearFilter,
	ClampToEdgeWrapping
} from '../constants.js'
import { FileLoader } from './FileLoader.js'
import { DataTexture } from '../textures/DataTexture.js'
import { DefaultLoadingManager } from './LoadingManager.js'
function DataTextureLoader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	// override in sub classes
	this._parser = null;

}

Object.assign( DataTextureLoader.prototype, {

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var texture = new DataTexture();

		var loader = new FileLoader( this.manager );
		loader.setResponseType( 'arraybuffer' );

		loader.load( url, function ( buffer ) {

			var texData = scope._parser( buffer );

			if ( ! texData ) return;

			if ( undefined !== texData.image ) {

				texture.image = texData.image;

			} else if ( undefined !== texData.data ) {

				texture.image.width = texData.width;
				texture.image.height = texData.height;
				texture.image.data = texData.data;

			}

			texture.wrapS = undefined !== texData.wrapS ? texData.wrapS : ClampToEdgeWrapping;
			texture.wrapT = undefined !== texData.wrapT ? texData.wrapT : ClampToEdgeWrapping;

			texture.magFilter = undefined !== texData.magFilter ? texData.magFilter : LinearFilter;
			texture.minFilter = undefined !== texData.minFilter ? texData.minFilter : LinearMipMapLinearFilter;

			texture.anisotropy = undefined !== texData.anisotropy ? texData.anisotropy : 1;

			if ( undefined !== texData.format ) {

				texture.format = texData.format;

			}
			if ( undefined !== texData.type ) {

				texture.type = texData.type;

			}

			if ( undefined !== texData.mipmaps ) {

				texture.mipmaps = texData.mipmaps;

			}

			if ( 1 === texData.mipmapCount ) {

				texture.minFilter = LinearFilter;

			}

			texture.needsUpdate = true;

			if ( onLoad ) onLoad( texture, texData );

		}, onProgress, onError );
		return texture;

	}

} );

export { DataTextureLoader }
