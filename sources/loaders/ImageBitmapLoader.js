//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Cache } from './Cache.js'
import { DefaultLoadingManager } from './LoadingManager.js'
function ImageBitmapLoader( manager ) {

	if ( typeof createImageBitmap === 'undefined' ) {

		console.warn( 'ImageBitmapLoader: createImageBitmap() not supported.' );

	}

	if ( typeof fetch === 'undefined' ) {

		console.warn( 'ImageBitmapLoader: fetch() not supported.' );

	}

	this.manager = manager !== undefined ? manager : DefaultLoadingManager;
	this.options = undefined;

}

ImageBitmapLoader.prototype = {

	constructor: ImageBitmapLoader,

	setOptions: function setOptions( options ) {

		this.options = options;

		return this;

	},

	load: function ( url, onLoad, onProgress, onError ) {

		if ( url === undefined ) url = '';

		if ( this.path !== undefined ) url = this.path + url;

		url = this.manager.resolveURL( url );

		var scope = this;

		var cached = Cache.get( url );

		if ( cached !== undefined ) {

			scope.manager.itemStart( url );

			setTimeout( function () {

				if ( onLoad ) onLoad( cached );

				scope.manager.itemEnd( url );

			}, 0 );

			return cached;

		}

		fetch( url ).then( function ( res ) {

			return res.blob();

		} ).then( function ( blob ) {

			return createImageBitmap( blob, scope.options );

		} ).then( function ( imageBitmap ) {

			Cache.add( url, imageBitmap );

			if ( onLoad ) onLoad( imageBitmap );

			scope.manager.itemEnd( url );

		} ).catch( function ( e ) {

			if ( onError ) onError( e );

			scope.manager.itemError( url );
			scope.manager.itemEnd( url );

		} );

		scope.manager.itemStart( url );

	},

	setCrossOrigin: function (  ) {

		return this;

	},

	setPath: function ( value ) {

		this.path = value;
		return this;

	}

};

export { ImageBitmapLoader }
