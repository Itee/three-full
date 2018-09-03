var Three = (function (exports) {
	'use strict';

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

	function ImageLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	}

	Object.assign( ImageLoader.prototype, {

		crossOrigin: 'anonymous',

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

			var image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );

			function onImageLoad() {

				image.removeEventListener( 'load', onImageLoad, false );
				image.removeEventListener( 'error', onImageError, false );

				Cache.add( url, this );

				if ( onLoad ) onLoad( this );

				scope.manager.itemEnd( url );

			}

			function onImageError( event ) {

				image.removeEventListener( 'load', onImageLoad, false );
				image.removeEventListener( 'error', onImageError, false );

				if ( onError ) onError( event );

				scope.manager.itemEnd( url );
				scope.manager.itemError( url );

			}

			image.addEventListener( 'load', onImageLoad, false );
			image.addEventListener( 'error', onImageError, false );

			if ( url.substr( 0, 5 ) !== 'data:' ) {

				if ( this.crossOrigin !== undefined ) image.crossOrigin = this.crossOrigin;

			}

			scope.manager.itemStart( url );

			image.src = url;

			return image;

		},

		setCrossOrigin: function ( value ) {

			this.crossOrigin = value;
			return this;

		},

		setPath: function ( value ) {

			this.path = value;
			return this;

		}

	} );

	exports.ImageLoader = ImageLoader;

	return exports;

}({}));
