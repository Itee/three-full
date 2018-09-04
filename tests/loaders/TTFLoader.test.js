var Three = (function (exports) {
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

	var loading = {};

	function FileLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	}

	Object.assign( FileLoader.prototype, {

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

			// Check if request is duplicate

			if ( loading[ url ] !== undefined ) {

				loading[ url ].push( {

					onLoad: onLoad,
					onProgress: onProgress,
					onError: onError

				} );

				return;

			}

			// Check for data: URI
			var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
			var dataUriRegexResult = url.match( dataUriRegex );

			// Safari can not handle Data URIs through XMLHttpRequest so process manually
			if ( dataUriRegexResult ) {

				var mimeType = dataUriRegexResult[ 1 ];
				var isBase64 = !! dataUriRegexResult[ 2 ];
				var data = dataUriRegexResult[ 3 ];

				data = window.decodeURIComponent( data );

				if ( isBase64 ) data = window.atob( data );

				try {

					var response;
					var responseType = ( this.responseType || '' ).toLowerCase();

					switch ( responseType ) {

						case 'arraybuffer':
						case 'blob':

							var view = new Uint8Array( data.length );

							for ( var i = 0; i < data.length; i ++ ) {

								view[ i ] = data.charCodeAt( i );

							}

							if ( responseType === 'blob' ) {

								response = new Blob( [ view.buffer ], { type: mimeType } );

							} else {

								response = view.buffer;

							}

							break;

						case 'document':

							var parser = new DOMParser();
							response = parser.parseFromString( data, mimeType );

							break;

						case 'json':

							response = JSON.parse( data );

							break;

						default: // 'text' or other

							response = data;

							break;

					}

					// Wait for next browser tick like standard XMLHttpRequest event dispatching does
					window.setTimeout( function () {

						if ( onLoad ) onLoad( response );

						scope.manager.itemEnd( url );

					}, 0 );

				} catch ( error ) {

					// Wait for next browser tick like standard XMLHttpRequest event dispatching does
					window.setTimeout( function () {

						if ( onError ) onError( error );

						scope.manager.itemEnd( url );
						scope.manager.itemError( url );

					}, 0 );

				}

			} else {

				// Initialise array for duplicate requests

				loading[ url ] = [];

				loading[ url ].push( {

					onLoad: onLoad,
					onProgress: onProgress,
					onError: onError

				} );

				var request = new XMLHttpRequest();

				request.open( 'GET', url, true );

				request.addEventListener( 'load', function ( event ) {

					var response = this.response;

					Cache.add( url, response );

					var callbacks = loading[ url ];

					delete loading[ url ];

					if ( this.status === 200 || this.status === 0 ) {

						// Some browsers return HTTP Status 0 when using non-http protocol
						// e.g. 'file://' or 'data://'. Handle as success.

						if ( this.status === 0 ) console.warn( 'FileLoader: HTTP Status 0 received.' );

						for ( var i = 0, il = callbacks.length; i < il; i ++ ) {

							var callback = callbacks[ i ];
							if ( callback.onLoad ) callback.onLoad( response );

						}

						scope.manager.itemEnd( url );

					} else {

						for ( var i = 0, il = callbacks.length; i < il; i ++ ) {

							var callback = callbacks[ i ];
							if ( callback.onError ) callback.onError( event );

						}

						scope.manager.itemEnd( url );
						scope.manager.itemError( url );

					}

				}, false );

				request.addEventListener( 'progress', function ( event ) {

					var callbacks = loading[ url ];

					for ( var i = 0, il = callbacks.length; i < il; i ++ ) {

						var callback = callbacks[ i ];
						if ( callback.onProgress ) callback.onProgress( event );

					}

				}, false );

				request.addEventListener( 'error', function ( event ) {

					var callbacks = loading[ url ];

					delete loading[ url ];

					for ( var i = 0, il = callbacks.length; i < il; i ++ ) {

						var callback = callbacks[ i ];
						if ( callback.onError ) callback.onError( event );

					}

					scope.manager.itemEnd( url );
					scope.manager.itemError( url );

				}, false );

				request.addEventListener( 'abort', function ( event ) {

					var callbacks = loading[ url ];

					delete loading[ url ];

					for ( var i = 0, il = callbacks.length; i < il; i ++ ) {

						var callback = callbacks[ i ];
						if ( callback.onError ) callback.onError( event );

					}

					scope.manager.itemEnd( url );
					scope.manager.itemError( url );

				}, false );

				if ( this.responseType !== undefined ) request.responseType = this.responseType;
				if ( this.withCredentials !== undefined ) request.withCredentials = this.withCredentials;

				if ( request.overrideMimeType ) request.overrideMimeType( this.mimeType !== undefined ? this.mimeType : 'text/plain' );

				for ( var header in this.requestHeader ) {

					request.setRequestHeader( header, this.requestHeader[ header ] );

				}

				request.send( null );

			}

			scope.manager.itemStart( url );

			return request;

		},

		setPath: function ( value ) {

			this.path = value;
			return this;

		},

		setResponseType: function ( value ) {

			this.responseType = value;
			return this;

		},

		setWithCredentials: function ( value ) {

			this.withCredentials = value;
			return this;

		},

		setMimeType: function ( value ) {

			this.mimeType = value;
			return this;

		},

		setRequestHeader: function ( value ) {

			this.requestHeader = value;
			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var TTFLoader = function ( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
		this.reversed = false;

	};

	TTFLoader.prototype = {

		constructor: TTFLoader,

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var loader = new FileLoader( this.manager );
			loader.setResponseType( 'arraybuffer' );
			loader.load( url, function ( buffer ) {

				onLoad( scope.parse( buffer ) );

			}, onProgress, onError );

		},

		parse: function ( arraybuffer ) {

			function convert( font, reversed ) {

				var round = Math.round;

				var glyphs = {};
				var scale = ( 100000 ) / ( ( font.unitsPerEm || 2048 ) * 72 );

				for ( var i = 0; i < font.glyphs.length; i ++ ) {

					var glyph = font.glyphs.glyphs[ i ];

					if ( glyph.unicode !== undefined ) {

						var token = {
							ha: round( glyph.advanceWidth * scale ),
							x_min: round( glyph.xMin * scale ),
							x_max: round( glyph.xMax * scale ),
							o: ''
						};

						if ( reversed ) {

							glyph.path.commands = reverseCommands( glyph.path.commands );

						}

						glyph.path.commands.forEach( function ( command, i ) {

							if ( command.type.toLowerCase() === 'c' ) {

								command.type = 'b';

							}

							token.o += command.type.toLowerCase() + ' ';

							if ( command.x !== undefined && command.y !== undefined ) {

								token.o += round( command.x * scale ) + ' ' + round( command.y * scale ) + ' ';

							}

							if ( command.x1 !== undefined && command.y1 !== undefined ) {

								token.o += round( command.x1 * scale ) + ' ' + round( command.y1 * scale ) + ' ';

							}

							if ( command.x2 !== undefined && command.y2 !== undefined ) {

								token.o += round( command.x2 * scale ) + ' ' + round( command.y2 * scale ) + ' ';

							}

						} );

						glyphs[ String.fromCharCode( glyph.unicode ) ] = token;

					}

				}

				return {
					glyphs: glyphs,
					familyName: font.familyName,
					ascender: round( font.ascender * scale ),
					descender: round( font.descender * scale ),
					underlinePosition: font.tables.post.underlinePosition,
					underlineThickness: font.tables.post.underlineThickness,
					boundingBox: {
						xMin: font.tables.head.xMin,
						xMax: font.tables.head.xMax,
						yMin: font.tables.head.yMin,
						yMax: font.tables.head.yMax
					},
					resolution: 1000,
					original_font_information: font.tables.name
				};

			}

			function reverseCommands( commands ) {

				var paths = [];
				var path;

				commands.forEach( function ( c ) {

					if ( c.type.toLowerCase() === 'm' ) {

						path = [ c ];
						paths.push( path );

					} else if ( c.type.toLowerCase() !== 'z' ) {

						path.push( c );

					}

				} );

				var reversed = [];

				paths.forEach( function ( p ) {

					var result = {
						type: 'm',
						x: p[ p.length - 1 ].x,
						y: p[ p.length - 1 ].y
					};

					reversed.push( result );

					for ( var i = p.length - 1; i > 0; i -- ) {

						var command = p[ i ];
						var result = { type: command.type };

						if ( command.x2 !== undefined && command.y2 !== undefined ) {

							result.x1 = command.x2;
							result.y1 = command.y2;
							result.x2 = command.x1;
							result.y2 = command.y1;

						} else if ( command.x1 !== undefined && command.y1 !== undefined ) {

							result.x1 = command.x1;
							result.y1 = command.y1;

						}

						result.x = p[ i - 1 ].x;
						result.y = p[ i - 1 ].y;
						reversed.push( result );

					}

				} );

				return reversed;

			}

			if ( typeof opentype === 'undefined' ) {

				console.warn( 'TTFLoader: The loader requires opentype.js. Make sure it\'s included before using the loader.' );
				return null;

			}

			return convert( opentype.parse( arraybuffer ), this.reversed );

		}

	};

	exports.TTFLoader = TTFLoader;

	return exports;

}({}));
