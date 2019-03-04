(function (exports) {
	'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var Cache = {

		enabled: false,

		files: {},

		add: function ( key, file ) {

			if ( this.enabled === false ) return;

			// console.log( 'Cache', 'Adding key:', key );

			this.files[ key ] = file;

		},

		get: function ( key ) {

			if ( this.enabled === false ) return;

			// console.log( 'Cache', 'Checking key:', key );

			return this.files[ key ];

		},

		remove: function ( key ) {

			delete this.files[ key ];

		},

		clear: function () {

			this.files = {};

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LoadingManager( onLoad, onProgress, onError ) {

		var scope = this;

		var isLoading = false;
		var itemsLoaded = 0;
		var itemsTotal = 0;
		var urlModifier = undefined;

		// Refer to #5689 for the reason why we don't set .onStart
		// in the constructor

		this.onStart = undefined;
		this.onLoad = onLoad;
		this.onProgress = onProgress;
		this.onError = onError;

		this.itemStart = function ( url ) {

			itemsTotal ++;

			if ( isLoading === false ) {

				if ( scope.onStart !== undefined ) {

					scope.onStart( url, itemsLoaded, itemsTotal );

				}

			}

			isLoading = true;

		};

		this.itemEnd = function ( url ) {

			itemsLoaded ++;

			if ( scope.onProgress !== undefined ) {

				scope.onProgress( url, itemsLoaded, itemsTotal );

			}

			if ( itemsLoaded === itemsTotal ) {

				isLoading = false;

				if ( scope.onLoad !== undefined ) {

					scope.onLoad();

				}

			}

		};

		this.itemError = function ( url ) {

			if ( scope.onError !== undefined ) {

				scope.onError( url );

			}

		};

		this.resolveURL = function ( url ) {

			if ( urlModifier ) {

				return urlModifier( url );

			}

			return url;

		};

		this.setURLModifier = function ( transform ) {

			urlModifier = transform;
			return this;

		};

	}

	var DefaultLoadingManager = new LoadingManager();

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	exports.ImageBitmapLoader = ImageBitmapLoader;

}((this.Three = this.Three || {})));
