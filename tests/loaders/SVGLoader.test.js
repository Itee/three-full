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

				data = decodeURIComponent( data );

				if ( isBase64 ) data = atob( data );

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
					setTimeout( function () {

						if ( onLoad ) onLoad( response );

						scope.manager.itemEnd( url );

					}, 0 );

				} catch ( error ) {

					// Wait for next browser tick like standard XMLHttpRequest event dispatching does
					setTimeout( function () {

						if ( onError ) onError( error );

						scope.manager.itemError( url );
						scope.manager.itemEnd( url );

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

						scope.manager.itemError( url );
						scope.manager.itemEnd( url );

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

					scope.manager.itemError( url );
					scope.manager.itemEnd( url );

				}, false );

				request.addEventListener( 'abort', function ( event ) {

					var callbacks = loading[ url ];

					delete loading[ url ];

					for ( var i = 0, il = callbacks.length; i < il; i ++ ) {

						var callback = callbacks[ i ];
						if ( callback.onError ) callback.onError( event );

					}

					scope.manager.itemError( url );
					scope.manager.itemEnd( url );

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
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var _Math = {

		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,

		generateUUID: ( function () {

			// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

			var lut = [];

			for ( var i = 0; i < 256; i ++ ) {

				lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

			}

			return function generateUUID() {

				var d0 = Math.random() * 0xffffffff | 0;
				var d1 = Math.random() * 0xffffffff | 0;
				var d2 = Math.random() * 0xffffffff | 0;
				var d3 = Math.random() * 0xffffffff | 0;
				var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
					lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
					lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
					lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];

				// .toUpperCase() here flattens concatenated strings to save heap memory space.
				return uuid.toUpperCase();

			};

		} )(),

		clamp: function ( value, min, max ) {

			return Math.max( min, Math.min( max, value ) );

		},

		// compute euclidian modulo of m % n
		// https://en.wikipedia.org/wiki/Modulo_operation

		euclideanModulo: function ( n, m ) {

			return ( ( n % m ) + m ) % m;

		},

		// Linear mapping from range <a1, a2> to range <b1, b2>

		mapLinear: function ( x, a1, a2, b1, b2 ) {

			return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

		},

		// https://en.wikipedia.org/wiki/Linear_interpolation

		lerp: function ( x, y, t ) {

			return ( 1 - t ) * x + t * y;

		},

		// http://en.wikipedia.org/wiki/Smoothstep

		smoothstep: function ( x, min, max ) {

			if ( x <= min ) return 0;
			if ( x >= max ) return 1;

			x = ( x - min ) / ( max - min );

			return x * x * ( 3 - 2 * x );

		},

		smootherstep: function ( x, min, max ) {

			if ( x <= min ) return 0;
			if ( x >= max ) return 1;

			x = ( x - min ) / ( max - min );

			return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

		},

		// Random integer from <low, high> interval

		randInt: function ( low, high ) {

			return low + Math.floor( Math.random() * ( high - low + 1 ) );

		},

		// Random float from <low, high> interval

		randFloat: function ( low, high ) {

			return low + Math.random() * ( high - low );

		},

		// Random float from <-range/2, range/2> interval

		randFloatSpread: function ( range ) {

			return range * ( 0.5 - Math.random() );

		},

		degToRad: function ( degrees ) {

			return degrees * _Math.DEG2RAD;

		},

		radToDeg: function ( radians ) {

			return radians * _Math.RAD2DEG;

		},

		isPowerOfTwo: function ( value ) {

			return ( value & ( value - 1 ) ) === 0 && value !== 0;

		},

		ceilPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

		},

		floorPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
		'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
		'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
		'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
		'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
		'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
		'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
		'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
		'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
		'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
		'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
		'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
		'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
		'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
		'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
		'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
		'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
		'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
		'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
		'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
		'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
		'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
		'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
		'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

	function Color( r, g, b ) {

		if ( g === undefined && b === undefined ) {

			// r is Color, hex or string
			return this.set( r );

		}

		return this.setRGB( r, g, b );

	}

	Object.assign( Color.prototype, {

		isColor: true,

		r: 1, g: 1, b: 1,

		set: function ( value ) {

			if ( value && value.isColor ) {

				this.copy( value );

			} else if ( typeof value === 'number' ) {

				this.setHex( value );

			} else if ( typeof value === 'string' ) {

				this.setStyle( value );

			}

			return this;

		},

		setScalar: function ( scalar ) {

			this.r = scalar;
			this.g = scalar;
			this.b = scalar;

			return this;

		},

		setHex: function ( hex ) {

			hex = Math.floor( hex );

			this.r = ( hex >> 16 & 255 ) / 255;
			this.g = ( hex >> 8 & 255 ) / 255;
			this.b = ( hex & 255 ) / 255;

			return this;

		},

		setRGB: function ( r, g, b ) {

			this.r = r;
			this.g = g;
			this.b = b;

			return this;

		},

		setHSL: function () {

			function hue2rgb( p, q, t ) {

				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
				return p;

			}

			return function setHSL( h, s, l ) {

				// h,s,l ranges are in 0.0 - 1.0
				h = _Math.euclideanModulo( h, 1 );
				s = _Math.clamp( s, 0, 1 );
				l = _Math.clamp( l, 0, 1 );

				if ( s === 0 ) {

					this.r = this.g = this.b = l;

				} else {

					var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
					var q = ( 2 * l ) - p;

					this.r = hue2rgb( q, p, h + 1 / 3 );
					this.g = hue2rgb( q, p, h );
					this.b = hue2rgb( q, p, h - 1 / 3 );

				}

				return this;

			};

		}(),

		setStyle: function ( style ) {

			function handleAlpha( string ) {

				if ( string === undefined ) return;

				if ( parseFloat( string ) < 1 ) {

					console.warn( 'Color: Alpha component of ' + style + ' will be ignored.' );

				}

			}
			var m;

			if ( m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec( style ) ) {

				// rgb / hsl

				var color;
				var name = m[ 1 ];
				var components = m[ 2 ];

				switch ( name ) {

					case 'rgb':
					case 'rgba':

						if ( color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// rgb(255,0,0) rgba(255,0,0,0.5)
							this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
							this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
							this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

							handleAlpha( color[ 5 ] );

							return this;

						}

						if ( color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
							this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
							this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
							this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

							handleAlpha( color[ 5 ] );

							return this;

						}

						break;

					case 'hsl':
					case 'hsla':

						if ( color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
							var h = parseFloat( color[ 1 ] ) / 360;
							var s = parseInt( color[ 2 ], 10 ) / 100;
							var l = parseInt( color[ 3 ], 10 ) / 100;

							handleAlpha( color[ 5 ] );

							return this.setHSL( h, s, l );

						}

						break;

				}

			} else if ( m = /^\#([A-Fa-f0-9]+)$/.exec( style ) ) {

				// hex color

				var hex = m[ 1 ];
				var size = hex.length;

				if ( size === 3 ) {

					// #ff0
					this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255;
					this.g = parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255;
					this.b = parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255;

					return this;

				} else if ( size === 6 ) {

					// #ff0000
					this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255;
					this.g = parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255;
					this.b = parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255;

					return this;

				}

			}

			if ( style && style.length > 0 ) {

				// color keywords
				var hex = ColorKeywords[ style ];

				if ( hex !== undefined ) {

					// red
					this.setHex( hex );

				} else {

					// unknown color
					console.warn( 'Color: Unknown color ' + style );

				}

			}

			return this;

		},

		clone: function () {

			return new this.constructor( this.r, this.g, this.b );

		},

		copy: function ( color ) {

			this.r = color.r;
			this.g = color.g;
			this.b = color.b;

			return this;

		},

		copyGammaToLinear: function ( color, gammaFactor ) {

			if ( gammaFactor === undefined ) gammaFactor = 2.0;

			this.r = Math.pow( color.r, gammaFactor );
			this.g = Math.pow( color.g, gammaFactor );
			this.b = Math.pow( color.b, gammaFactor );

			return this;

		},

		copyLinearToGamma: function ( color, gammaFactor ) {

			if ( gammaFactor === undefined ) gammaFactor = 2.0;

			var safeInverse = ( gammaFactor > 0 ) ? ( 1.0 / gammaFactor ) : 1.0;

			this.r = Math.pow( color.r, safeInverse );
			this.g = Math.pow( color.g, safeInverse );
			this.b = Math.pow( color.b, safeInverse );

			return this;

		},

		convertGammaToLinear: function ( gammaFactor ) {

			this.copyGammaToLinear( this, gammaFactor );

			return this;

		},

		convertLinearToGamma: function ( gammaFactor ) {

			this.copyLinearToGamma( this, gammaFactor );

			return this;

		},

		copySRGBToLinear: function () {

			function SRGBToLinear( c ) {

				return ( c < 0.04045 ) ? c * 0.0773993808 : Math.pow( c * 0.9478672986 + 0.0521327014, 2.4 );

			}

			return function copySRGBToLinear( color ) {

				this.r = SRGBToLinear( color.r );
				this.g = SRGBToLinear( color.g );
				this.b = SRGBToLinear( color.b );

				return this;

			};

		}(),

		copyLinearToSRGB: function () {

			function LinearToSRGB( c ) {

				return ( c < 0.0031308 ) ? c * 12.92 : 1.055 * ( Math.pow( c, 0.41666 ) ) - 0.055;

			}

			return function copyLinearToSRGB( color ) {

				this.r = LinearToSRGB( color.r );
				this.g = LinearToSRGB( color.g );
				this.b = LinearToSRGB( color.b );

				return this;

			};

		}(),

		convertSRGBToLinear: function () {

			this.copySRGBToLinear( this );

			return this;

		},

		convertLinearToSRGB: function () {

			this.copyLinearToSRGB( this );

			return this;

		},

		getHex: function () {

			return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

		},

		getHexString: function () {

			return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

		},

		getHSL: function ( target ) {

			// h,s,l ranges are in 0.0 - 1.0

			if ( target === undefined ) {

				console.warn( 'Color: .getHSL() target is now required' );
				target = { h: 0, s: 0, l: 0 };

			}

			var r = this.r, g = this.g, b = this.b;

			var max = Math.max( r, g, b );
			var min = Math.min( r, g, b );

			var hue, saturation;
			var lightness = ( min + max ) / 2.0;

			if ( min === max ) {

				hue = 0;
				saturation = 0;

			} else {

				var delta = max - min;

				saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

				switch ( max ) {

					case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
					case g: hue = ( b - r ) / delta + 2; break;
					case b: hue = ( r - g ) / delta + 4; break;

				}

				hue /= 6;

			}

			target.h = hue;
			target.s = saturation;
			target.l = lightness;

			return target;

		},

		getStyle: function () {

			return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

		},

		offsetHSL: function () {

			var hsl = {};

			return function ( h, s, l ) {

				this.getHSL( hsl );

				hsl.h += h; hsl.s += s; hsl.l += l;

				this.setHSL( hsl.h, hsl.s, hsl.l );

				return this;

			};

		}(),

		add: function ( color ) {

			this.r += color.r;
			this.g += color.g;
			this.b += color.b;

			return this;

		},

		addColors: function ( color1, color2 ) {

			this.r = color1.r + color2.r;
			this.g = color1.g + color2.g;
			this.b = color1.b + color2.b;

			return this;

		},

		addScalar: function ( s ) {

			this.r += s;
			this.g += s;
			this.b += s;

			return this;

		},

		sub: function ( color ) {

			this.r = Math.max( 0, this.r - color.r );
			this.g = Math.max( 0, this.g - color.g );
			this.b = Math.max( 0, this.b - color.b );

			return this;

		},

		multiply: function ( color ) {

			this.r *= color.r;
			this.g *= color.g;
			this.b *= color.b;

			return this;

		},

		multiplyScalar: function ( s ) {

			this.r *= s;
			this.g *= s;
			this.b *= s;

			return this;

		},

		lerp: function ( color, alpha ) {

			this.r += ( color.r - this.r ) * alpha;
			this.g += ( color.g - this.g ) * alpha;
			this.b += ( color.b - this.b ) * alpha;

			return this;

		},

		lerpHSL: function () {

			var hslA = { h: 0, s: 0, l: 0 };
			var hslB = { h: 0, s: 0, l: 0 };

			return function lerpHSL( color, alpha ) {

				this.getHSL( hslA );
				color.getHSL( hslB );

				var h = _Math.lerp( hslA.h, hslB.h, alpha );
				var s = _Math.lerp( hslA.s, hslB.s, alpha );
				var l = _Math.lerp( hslA.l, hslB.l, alpha );

				this.setHSL( h, s, l );

				return this;

			};

		}(),

		equals: function ( c ) {

			return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.r = array[ offset ];
			this.g = array[ offset + 1 ];
			this.b = array[ offset + 2 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.r;
			array[ offset + 1 ] = this.g;
			array[ offset + 2 ] = this.b;

			return array;

		},

		toJSON: function () {

			return this.getHex();

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Vector2( x, y ) {

		this.x = x || 0;
		this.y = y || 0;

	}

	Object.defineProperties( Vector2.prototype, {

		"width": {

			get: function () {

				return this.x;

			},

			set: function ( value ) {

				this.x = value;

			}

		},

		"height": {

			get: function () {

				return this.y;

			},

			set: function ( value ) {

				this.y = value;

			}

		}

	} );

	Object.assign( Vector2.prototype, {

		isVector2: true,

		set: function ( x, y ) {

			this.x = x;
			this.y = y;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;

			return this;

		},

		setX: function ( x ) {

			this.x = x;

			return this;

		},

		setY: function ( y ) {

			this.y = y;

			return this;

		},

		setComponent: function ( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		},

		getComponent: function ( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				default: throw new Error( 'index is out of range: ' + index );

			}

		},

		clone: function () {

			return new this.constructor( this.x, this.y );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;

		},

		multiply: function ( v ) {

			this.x *= v.x;
			this.y *= v.y;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;

			return this;

		},

		divide: function ( v ) {

			this.x /= v.x;
			this.y /= v.y;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		applyMatrix3: function ( m ) {

			var x = this.x, y = this.y;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

			return this;

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );

			return this;

		},

		clampScalar: function () {

			var min = new Vector2();
			var max = new Vector2();

			return function clampScalar( minVal, maxVal ) {

				min.set( minVal, minVal );
				max.set( maxVal, maxVal );

				return this.clamp( min, max );

			};

		}(),

		clampLength: function ( min, max ) {

			var length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		},

		floor: function () {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y;

		},

		cross: function ( v ) {

			return this.x * v.y - this.y * v.x;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y );

		},

		normalize: function () {

			return this.divideScalar( this.length() || 1 );

		},

		angle: function () {

			// computes the angle in radians with respect to the positive x-axis

			var angle = Math.atan2( this.y, this.x );

			if ( angle < 0 ) angle += 2 * Math.PI;

			return angle;

		},

		distanceTo: function ( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		},

		distanceToSquared: function ( v ) {

			var dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;

		},

		manhattanDistanceTo: function ( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

		},

		setLength: function ( length ) {

			return this.normalize().multiplyScalar( length );

		},

		lerp: function ( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;

			return array;

		},

		fromBufferAttribute: function ( attribute, index, offset ) {

			if ( offset !== undefined ) {

				console.warn( 'Vector2: offset has been removed from .fromBufferAttribute().' );

			}

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );

			return this;

		},

		rotateAround: function ( center, angle ) {

			var c = Math.cos( angle ), s = Math.sin( angle );

			var x = this.x - center.x;
			var y = this.y - center.y;

			this.x = x * c - y * s + center.x;
			this.y = x * s + y * c + center.y;

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Matrix4() {

		this.elements = [

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'Matrix4: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	Object.assign( Matrix4.prototype, {

		isMatrix4: true,

		set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

			var te = this.elements;

			te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
			te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
			te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
			te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

			return this;

		},

		identity: function () {

			this.set(

				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1

			);

			return this;

		},

		clone: function () {

			return new Matrix4().fromArray( this.elements );

		},

		copy: function ( m ) {

			var te = this.elements;
			var me = m.elements;

			te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
			te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
			te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
			te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

			return this;

		},

		copyPosition: function ( m ) {

			var te = this.elements, me = m.elements;

			te[ 12 ] = me[ 12 ];
			te[ 13 ] = me[ 13 ];
			te[ 14 ] = me[ 14 ];

			return this;

		},

		extractBasis: function ( xAxis, yAxis, zAxis ) {

			xAxis.setFromMatrixColumn( this, 0 );
			yAxis.setFromMatrixColumn( this, 1 );
			zAxis.setFromMatrixColumn( this, 2 );

			return this;

		},

		makeBasis: function ( xAxis, yAxis, zAxis ) {

			this.set(
				xAxis.x, yAxis.x, zAxis.x, 0,
				xAxis.y, yAxis.y, zAxis.y, 0,
				xAxis.z, yAxis.z, zAxis.z, 0,
				0, 0, 0, 1
			);

			return this;

		},

		extractRotation: function () {

			var v1 = new Vector3();

			return function extractRotation( m ) {

				// this method does not support reflection matrices

				var te = this.elements;
				var me = m.elements;

				var scaleX = 1 / v1.setFromMatrixColumn( m, 0 ).length();
				var scaleY = 1 / v1.setFromMatrixColumn( m, 1 ).length();
				var scaleZ = 1 / v1.setFromMatrixColumn( m, 2 ).length();

				te[ 0 ] = me[ 0 ] * scaleX;
				te[ 1 ] = me[ 1 ] * scaleX;
				te[ 2 ] = me[ 2 ] * scaleX;
				te[ 3 ] = 0;

				te[ 4 ] = me[ 4 ] * scaleY;
				te[ 5 ] = me[ 5 ] * scaleY;
				te[ 6 ] = me[ 6 ] * scaleY;
				te[ 7 ] = 0;

				te[ 8 ] = me[ 8 ] * scaleZ;
				te[ 9 ] = me[ 9 ] * scaleZ;
				te[ 10 ] = me[ 10 ] * scaleZ;
				te[ 11 ] = 0;

				te[ 12 ] = 0;
				te[ 13 ] = 0;
				te[ 14 ] = 0;
				te[ 15 ] = 1;

				return this;

			};

		}(),

		makeRotationFromEuler: function ( euler ) {

			if ( ! ( euler && euler.isEuler ) ) {

				console.error( 'Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

			}

			var te = this.elements;

			var x = euler.x, y = euler.y, z = euler.z;
			var a = Math.cos( x ), b = Math.sin( x );
			var c = Math.cos( y ), d = Math.sin( y );
			var e = Math.cos( z ), f = Math.sin( z );

			if ( euler.order === 'XYZ' ) {

				var ae = a * e, af = a * f, be = b * e, bf = b * f;

				te[ 0 ] = c * e;
				te[ 4 ] = - c * f;
				te[ 8 ] = d;

				te[ 1 ] = af + be * d;
				te[ 5 ] = ae - bf * d;
				te[ 9 ] = - b * c;

				te[ 2 ] = bf - ae * d;
				te[ 6 ] = be + af * d;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'YXZ' ) {

				var ce = c * e, cf = c * f, de = d * e, df = d * f;

				te[ 0 ] = ce + df * b;
				te[ 4 ] = de * b - cf;
				te[ 8 ] = a * d;

				te[ 1 ] = a * f;
				te[ 5 ] = a * e;
				te[ 9 ] = - b;

				te[ 2 ] = cf * b - de;
				te[ 6 ] = df + ce * b;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'ZXY' ) {

				var ce = c * e, cf = c * f, de = d * e, df = d * f;

				te[ 0 ] = ce - df * b;
				te[ 4 ] = - a * f;
				te[ 8 ] = de + cf * b;

				te[ 1 ] = cf + de * b;
				te[ 5 ] = a * e;
				te[ 9 ] = df - ce * b;

				te[ 2 ] = - a * d;
				te[ 6 ] = b;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'ZYX' ) {

				var ae = a * e, af = a * f, be = b * e, bf = b * f;

				te[ 0 ] = c * e;
				te[ 4 ] = be * d - af;
				te[ 8 ] = ae * d + bf;

				te[ 1 ] = c * f;
				te[ 5 ] = bf * d + ae;
				te[ 9 ] = af * d - be;

				te[ 2 ] = - d;
				te[ 6 ] = b * c;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'YZX' ) {

				var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

				te[ 0 ] = c * e;
				te[ 4 ] = bd - ac * f;
				te[ 8 ] = bc * f + ad;

				te[ 1 ] = f;
				te[ 5 ] = a * e;
				te[ 9 ] = - b * e;

				te[ 2 ] = - d * e;
				te[ 6 ] = ad * f + bc;
				te[ 10 ] = ac - bd * f;

			} else if ( euler.order === 'XZY' ) {

				var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

				te[ 0 ] = c * e;
				te[ 4 ] = - f;
				te[ 8 ] = d * e;

				te[ 1 ] = ac * f + bd;
				te[ 5 ] = a * e;
				te[ 9 ] = ad * f - bc;

				te[ 2 ] = bc * f - ad;
				te[ 6 ] = b * e;
				te[ 10 ] = bd * f + ac;

			}

			// bottom row
			te[ 3 ] = 0;
			te[ 7 ] = 0;
			te[ 11 ] = 0;

			// last column
			te[ 12 ] = 0;
			te[ 13 ] = 0;
			te[ 14 ] = 0;
			te[ 15 ] = 1;

			return this;

		},

		makeRotationFromQuaternion: function () {

			var zero = new Vector3( 0, 0, 0 );
			var one = new Vector3( 1, 1, 1 );

			return function makeRotationFromQuaternion( q ) {

				return this.compose( zero, q, one );

			};

		}(),

		lookAt: function () {

			var x = new Vector3();
			var y = new Vector3();
			var z = new Vector3();

			return function lookAt( eye, target, up ) {

				var te = this.elements;

				z.subVectors( eye, target );

				if ( z.lengthSq() === 0 ) {

					// eye and target are in the same position

					z.z = 1;

				}

				z.normalize();
				x.crossVectors( up, z );

				if ( x.lengthSq() === 0 ) {

					// up and z are parallel

					if ( Math.abs( up.z ) === 1 ) {

						z.x += 0.0001;

					} else {

						z.z += 0.0001;

					}

					z.normalize();
					x.crossVectors( up, z );

				}

				x.normalize();
				y.crossVectors( z, x );

				te[ 0 ] = x.x; te[ 4 ] = y.x; te[ 8 ] = z.x;
				te[ 1 ] = x.y; te[ 5 ] = y.y; te[ 9 ] = z.y;
				te[ 2 ] = x.z; te[ 6 ] = y.z; te[ 10 ] = z.z;

				return this;

			};

		}(),

		multiply: function ( m, n ) {

			if ( n !== undefined ) {

				console.warn( 'Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
				return this.multiplyMatrices( m, n );

			}

			return this.multiplyMatrices( this, m );

		},

		premultiply: function ( m ) {

			return this.multiplyMatrices( m, this );

		},

		multiplyMatrices: function ( a, b ) {

			var ae = a.elements;
			var be = b.elements;
			var te = this.elements;

			var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
			var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
			var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
			var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

			var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
			var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
			var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
			var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

			te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
			te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
			te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
			te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

			te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
			te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
			te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
			te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

			te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
			te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
			te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
			te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

			te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
			te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
			te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
			te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

			return this;

		},

		multiplyScalar: function ( s ) {

			var te = this.elements;

			te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
			te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
			te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
			te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

			return this;

		},

		applyToBufferAttribute: function () {

			var v1 = new Vector3();

			return function applyToBufferAttribute( attribute ) {

				for ( var i = 0, l = attribute.count; i < l; i ++ ) {

					v1.x = attribute.getX( i );
					v1.y = attribute.getY( i );
					v1.z = attribute.getZ( i );

					v1.applyMatrix4( this );

					attribute.setXYZ( i, v1.x, v1.y, v1.z );

				}

				return attribute;

			};

		}(),

		determinant: function () {

			var te = this.elements;

			var n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
			var n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
			var n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
			var n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

			//TODO: make this more efficient
			//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

			return (
				n41 * (
					+ n14 * n23 * n32
					 - n13 * n24 * n32
					 - n14 * n22 * n33
					 + n12 * n24 * n33
					 + n13 * n22 * n34
					 - n12 * n23 * n34
				) +
				n42 * (
					+ n11 * n23 * n34
					 - n11 * n24 * n33
					 + n14 * n21 * n33
					 - n13 * n21 * n34
					 + n13 * n24 * n31
					 - n14 * n23 * n31
				) +
				n43 * (
					+ n11 * n24 * n32
					 - n11 * n22 * n34
					 - n14 * n21 * n32
					 + n12 * n21 * n34
					 + n14 * n22 * n31
					 - n12 * n24 * n31
				) +
				n44 * (
					- n13 * n22 * n31
					 - n11 * n23 * n32
					 + n11 * n22 * n33
					 + n13 * n21 * n32
					 - n12 * n21 * n33
					 + n12 * n23 * n31
				)

			);

		},

		transpose: function () {

			var te = this.elements;
			var tmp;

			tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
			tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
			tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

			tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
			tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
			tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

			return this;

		},

		setPosition: function ( v ) {

			var te = this.elements;

			te[ 12 ] = v.x;
			te[ 13 ] = v.y;
			te[ 14 ] = v.z;

			return this;

		},

		getInverse: function ( m, throwOnDegenerate ) {

			// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
			var te = this.elements,
				me = m.elements,

				n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
				n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
				n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
				n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

				t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
				t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
				t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
				t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

			var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

			if ( det === 0 ) {

				var msg = "Matrix4: .getInverse() can't invert matrix, determinant is 0";

				if ( throwOnDegenerate === true ) {

					throw new Error( msg );

				} else {

					console.warn( msg );

				}

				return this.identity();

			}

			var detInv = 1 / det;

			te[ 0 ] = t11 * detInv;
			te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
			te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
			te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

			te[ 4 ] = t12 * detInv;
			te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
			te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
			te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

			te[ 8 ] = t13 * detInv;
			te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
			te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
			te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

			te[ 12 ] = t14 * detInv;
			te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
			te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
			te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

			return this;

		},

		scale: function ( v ) {

			var te = this.elements;
			var x = v.x, y = v.y, z = v.z;

			te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
			te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
			te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
			te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

			return this;

		},

		getMaxScaleOnAxis: function () {

			var te = this.elements;

			var scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
			var scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
			var scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

			return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq ) );

		},

		makeTranslation: function ( x, y, z ) {

			this.set(

				1, 0, 0, x,
				0, 1, 0, y,
				0, 0, 1, z,
				0, 0, 0, 1

			);

			return this;

		},

		makeRotationX: function ( theta ) {

			var c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				1, 0, 0, 0,
				0, c, - s, 0,
				0, s, c, 0,
				0, 0, 0, 1

			);

			return this;

		},

		makeRotationY: function ( theta ) {

			var c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				 c, 0, s, 0,
				 0, 1, 0, 0,
				- s, 0, c, 0,
				 0, 0, 0, 1

			);

			return this;

		},

		makeRotationZ: function ( theta ) {

			var c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				c, - s, 0, 0,
				s, c, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1

			);

			return this;

		},

		makeRotationAxis: function ( axis, angle ) {

			// Based on http://www.gamedev.net/reference/articles/article1199.asp

			var c = Math.cos( angle );
			var s = Math.sin( angle );
			var t = 1 - c;
			var x = axis.x, y = axis.y, z = axis.z;
			var tx = t * x, ty = t * y;

			this.set(

				tx * x + c, tx * y - s * z, tx * z + s * y, 0,
				tx * y + s * z, ty * y + c, ty * z - s * x, 0,
				tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
				0, 0, 0, 1

			);

			 return this;

		},

		makeScale: function ( x, y, z ) {

			this.set(

				x, 0, 0, 0,
				0, y, 0, 0,
				0, 0, z, 0,
				0, 0, 0, 1

			);

			return this;

		},

		makeShear: function ( x, y, z ) {

			this.set(

				1, y, z, 0,
				x, 1, z, 0,
				x, y, 1, 0,
				0, 0, 0, 1

			);

			return this;

		},

		compose: function ( position, quaternion, scale ) {

			var te = this.elements;

			var x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
			var x2 = x + x,	y2 = y + y, z2 = z + z;
			var xx = x * x2, xy = x * y2, xz = x * z2;
			var yy = y * y2, yz = y * z2, zz = z * z2;
			var wx = w * x2, wy = w * y2, wz = w * z2;

			var sx = scale.x, sy = scale.y, sz = scale.z;

		        te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		        te[ 1 ] = ( xy + wz ) * sx;
		        te[ 2 ] = ( xz - wy ) * sx;
		        te[ 3 ] = 0;

		        te[ 4 ] = ( xy - wz ) * sy;
		        te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
		        te[ 6 ] = ( yz + wx ) * sy;
		        te[ 7 ] = 0;

		        te[ 8 ] = ( xz + wy ) * sz;
		        te[ 9 ] = ( yz - wx ) * sz;
		        te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
		        te[ 11 ] = 0;

		        te[ 12 ] = position.x;
		        te[ 13 ] = position.y;
		        te[ 14 ] = position.z;
		        te[ 15 ] = 1;

		        return this;

		},

		decompose: function () {

			var vector = new Vector3();
			var matrix = new Matrix4();

			return function decompose( position, quaternion, scale ) {

				var te = this.elements;

				var sx = vector.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
				var sy = vector.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
				var sz = vector.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

				// if determine is negative, we need to invert one scale
				var det = this.determinant();
				if ( det < 0 ) sx = - sx;

				position.x = te[ 12 ];
				position.y = te[ 13 ];
				position.z = te[ 14 ];

				// scale the rotation part
				matrix.copy( this );

				var invSX = 1 / sx;
				var invSY = 1 / sy;
				var invSZ = 1 / sz;

				matrix.elements[ 0 ] *= invSX;
				matrix.elements[ 1 ] *= invSX;
				matrix.elements[ 2 ] *= invSX;

				matrix.elements[ 4 ] *= invSY;
				matrix.elements[ 5 ] *= invSY;
				matrix.elements[ 6 ] *= invSY;

				matrix.elements[ 8 ] *= invSZ;
				matrix.elements[ 9 ] *= invSZ;
				matrix.elements[ 10 ] *= invSZ;

				quaternion.setFromRotationMatrix( matrix );

				scale.x = sx;
				scale.y = sy;
				scale.z = sz;

				return this;

			};

		}(),

		makePerspective: function ( left, right, top, bottom, near, far ) {

			if ( far === undefined ) {

				console.warn( 'Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.' );

			}

			var te = this.elements;
			var x = 2 * near / ( right - left );
			var y = 2 * near / ( top - bottom );

			var a = ( right + left ) / ( right - left );
			var b = ( top + bottom ) / ( top - bottom );
			var c = - ( far + near ) / ( far - near );
			var d = - 2 * far * near / ( far - near );

			te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a;	te[ 12 ] = 0;
			te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b;	te[ 13 ] = 0;
			te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c;	te[ 14 ] = d;
			te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

			return this;

		},

		makeOrthographic: function ( left, right, top, bottom, near, far ) {

			var te = this.elements;
			var w = 1.0 / ( right - left );
			var h = 1.0 / ( top - bottom );
			var p = 1.0 / ( far - near );

			var x = ( right + left ) * w;
			var y = ( top + bottom ) * h;
			var z = ( far + near ) * p;

			te[ 0 ] = 2 * w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
			te[ 1 ] = 0;	te[ 5 ] = 2 * h;	te[ 9 ] = 0;	te[ 13 ] = - y;
			te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 * p;	te[ 14 ] = - z;
			te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

			return this;

		},

		equals: function ( matrix ) {

			var te = this.elements;
			var me = matrix.elements;

			for ( var i = 0; i < 16; i ++ ) {

				if ( te[ i ] !== me[ i ] ) return false;

			}

			return true;

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			for ( var i = 0; i < 16; i ++ ) {

				this.elements[ i ] = array[ i + offset ];

			}

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			var te = this.elements;

			array[ offset ] = te[ 0 ];
			array[ offset + 1 ] = te[ 1 ];
			array[ offset + 2 ] = te[ 2 ];
			array[ offset + 3 ] = te[ 3 ];

			array[ offset + 4 ] = te[ 4 ];
			array[ offset + 5 ] = te[ 5 ];
			array[ offset + 6 ] = te[ 6 ];
			array[ offset + 7 ] = te[ 7 ];

			array[ offset + 8 ] = te[ 8 ];
			array[ offset + 9 ] = te[ 9 ];
			array[ offset + 10 ] = te[ 10 ];
			array[ offset + 11 ] = te[ 11 ];

			array[ offset + 12 ] = te[ 12 ];
			array[ offset + 13 ] = te[ 13 ];
			array[ offset + 14 ] = te[ 14 ];
			array[ offset + 15 ] = te[ 15 ];

			return array;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Quaternion( x, y, z, w ) {

		this._x = x || 0;
		this._y = y || 0;
		this._z = z || 0;
		this._w = ( w !== undefined ) ? w : 1;

	}

	Object.assign( Quaternion, {

		slerp: function ( qa, qb, qm, t ) {

			return qm.copy( qa ).slerp( qb, t );

		},

		slerpFlat: function ( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

			// fuzz-free, array-based Quaternion SLERP operation

			var x0 = src0[ srcOffset0 + 0 ],
				y0 = src0[ srcOffset0 + 1 ],
				z0 = src0[ srcOffset0 + 2 ],
				w0 = src0[ srcOffset0 + 3 ],

				x1 = src1[ srcOffset1 + 0 ],
				y1 = src1[ srcOffset1 + 1 ],
				z1 = src1[ srcOffset1 + 2 ],
				w1 = src1[ srcOffset1 + 3 ];

			if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

				var s = 1 - t,

					cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,

					dir = ( cos >= 0 ? 1 : - 1 ),
					sqrSin = 1 - cos * cos;

				// Skip the Slerp for tiny steps to avoid numeric problems:
				if ( sqrSin > Number.EPSILON ) {

					var sin = Math.sqrt( sqrSin ),
						len = Math.atan2( sin, cos * dir );

					s = Math.sin( s * len ) / sin;
					t = Math.sin( t * len ) / sin;

				}

				var tDir = t * dir;

				x0 = x0 * s + x1 * tDir;
				y0 = y0 * s + y1 * tDir;
				z0 = z0 * s + z1 * tDir;
				w0 = w0 * s + w1 * tDir;

				// Normalize in case we just did a lerp:
				if ( s === 1 - t ) {

					var f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

					x0 *= f;
					y0 *= f;
					z0 *= f;
					w0 *= f;

				}

			}

			dst[ dstOffset ] = x0;
			dst[ dstOffset + 1 ] = y0;
			dst[ dstOffset + 2 ] = z0;
			dst[ dstOffset + 3 ] = w0;

		}

	} );

	Object.defineProperties( Quaternion.prototype, {

		x: {

			get: function () {

				return this._x;

			},

			set: function ( value ) {

				this._x = value;
				this.onChangeCallback();

			}

		},

		y: {

			get: function () {

				return this._y;

			},

			set: function ( value ) {

				this._y = value;
				this.onChangeCallback();

			}

		},

		z: {

			get: function () {

				return this._z;

			},

			set: function ( value ) {

				this._z = value;
				this.onChangeCallback();

			}

		},

		w: {

			get: function () {

				return this._w;

			},

			set: function ( value ) {

				this._w = value;
				this.onChangeCallback();

			}

		}

	} );

	Object.assign( Quaternion.prototype, {

		isQuaternion: true,

		set: function ( x, y, z, w ) {

			this._x = x;
			this._y = y;
			this._z = z;
			this._w = w;

			this.onChangeCallback();

			return this;

		},

		clone: function () {

			return new this.constructor( this._x, this._y, this._z, this._w );

		},

		copy: function ( quaternion ) {

			this._x = quaternion.x;
			this._y = quaternion.y;
			this._z = quaternion.z;
			this._w = quaternion.w;

			this.onChangeCallback();

			return this;

		},

		setFromEuler: function ( euler, update ) {

			if ( ! ( euler && euler.isEuler ) ) {

				throw new Error( 'Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );

			}

			var x = euler._x, y = euler._y, z = euler._z, order = euler.order;

			// http://www.mathworks.com/matlabcentral/fileexchange/
			// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
			//	content/SpinCalc.m

			var cos = Math.cos;
			var sin = Math.sin;

			var c1 = cos( x / 2 );
			var c2 = cos( y / 2 );
			var c3 = cos( z / 2 );

			var s1 = sin( x / 2 );
			var s2 = sin( y / 2 );
			var s3 = sin( z / 2 );

			if ( order === 'XYZ' ) {

				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;

			} else if ( order === 'YXZ' ) {

				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;

			} else if ( order === 'ZXY' ) {

				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;

			} else if ( order === 'ZYX' ) {

				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;

			} else if ( order === 'YZX' ) {

				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;

			} else if ( order === 'XZY' ) {

				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;

			}

			if ( update !== false ) this.onChangeCallback();

			return this;

		},

		setFromAxisAngle: function ( axis, angle ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

			// assumes axis is normalized

			var halfAngle = angle / 2, s = Math.sin( halfAngle );

			this._x = axis.x * s;
			this._y = axis.y * s;
			this._z = axis.z * s;
			this._w = Math.cos( halfAngle );

			this.onChangeCallback();

			return this;

		},

		setFromRotationMatrix: function ( m ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			var te = m.elements,

				m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
				m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
				m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

				trace = m11 + m22 + m33,
				s;

			if ( trace > 0 ) {

				s = 0.5 / Math.sqrt( trace + 1.0 );

				this._w = 0.25 / s;
				this._x = ( m32 - m23 ) * s;
				this._y = ( m13 - m31 ) * s;
				this._z = ( m21 - m12 ) * s;

			} else if ( m11 > m22 && m11 > m33 ) {

				s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

				this._w = ( m32 - m23 ) / s;
				this._x = 0.25 * s;
				this._y = ( m12 + m21 ) / s;
				this._z = ( m13 + m31 ) / s;

			} else if ( m22 > m33 ) {

				s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

				this._w = ( m13 - m31 ) / s;
				this._x = ( m12 + m21 ) / s;
				this._y = 0.25 * s;
				this._z = ( m23 + m32 ) / s;

			} else {

				s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

				this._w = ( m21 - m12 ) / s;
				this._x = ( m13 + m31 ) / s;
				this._y = ( m23 + m32 ) / s;
				this._z = 0.25 * s;

			}

			this.onChangeCallback();

			return this;

		},

		setFromUnitVectors: function () {

			// assumes direction vectors vFrom and vTo are normalized

			var v1 = new Vector3();
			var r;

			var EPS = 0.000001;

			return function setFromUnitVectors( vFrom, vTo ) {

				if ( v1 === undefined ) v1 = new Vector3();

				r = vFrom.dot( vTo ) + 1;

				if ( r < EPS ) {

					r = 0;

					if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

						v1.set( - vFrom.y, vFrom.x, 0 );

					} else {

						v1.set( 0, - vFrom.z, vFrom.y );

					}

				} else {

					v1.crossVectors( vFrom, vTo );

				}

				this._x = v1.x;
				this._y = v1.y;
				this._z = v1.z;
				this._w = r;

				return this.normalize();

			};

		}(),

		angleTo: function ( q ) {

			return 2 * Math.acos( Math.abs( _Math.clamp( this.dot( q ), - 1, 1 ) ) );

		},

		rotateTowards: function ( q, step ) {

			var angle = this.angleTo( q );

			if ( angle === 0 ) return this;

			var t = Math.min( 1, step / angle );

			this.slerp( q, t );

			return this;

		},

		inverse: function () {

			// quaternion is assumed to have unit length

			return this.conjugate();

		},

		conjugate: function () {

			this._x *= - 1;
			this._y *= - 1;
			this._z *= - 1;

			this.onChangeCallback();

			return this;

		},

		dot: function ( v ) {

			return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

		},

		lengthSq: function () {

			return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

		},

		length: function () {

			return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

		},

		normalize: function () {

			var l = this.length();

			if ( l === 0 ) {

				this._x = 0;
				this._y = 0;
				this._z = 0;
				this._w = 1;

			} else {

				l = 1 / l;

				this._x = this._x * l;
				this._y = this._y * l;
				this._z = this._z * l;
				this._w = this._w * l;

			}

			this.onChangeCallback();

			return this;

		},

		multiply: function ( q, p ) {

			if ( p !== undefined ) {

				console.warn( 'Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
				return this.multiplyQuaternions( q, p );

			}

			return this.multiplyQuaternions( this, q );

		},

		premultiply: function ( q ) {

			return this.multiplyQuaternions( q, this );

		},

		multiplyQuaternions: function ( a, b ) {

			// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

			var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
			var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

			this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
			this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
			this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
			this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

			this.onChangeCallback();

			return this;

		},

		slerp: function ( qb, t ) {

			if ( t === 0 ) return this;
			if ( t === 1 ) return this.copy( qb );

			var x = this._x, y = this._y, z = this._z, w = this._w;

			// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

			var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

			if ( cosHalfTheta < 0 ) {

				this._w = - qb._w;
				this._x = - qb._x;
				this._y = - qb._y;
				this._z = - qb._z;

				cosHalfTheta = - cosHalfTheta;

			} else {

				this.copy( qb );

			}

			if ( cosHalfTheta >= 1.0 ) {

				this._w = w;
				this._x = x;
				this._y = y;
				this._z = z;

				return this;

			}

			var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

			if ( sqrSinHalfTheta <= Number.EPSILON ) {

				var s = 1 - t;
				this._w = s * w + t * this._w;
				this._x = s * x + t * this._x;
				this._y = s * y + t * this._y;
				this._z = s * z + t * this._z;

				return this.normalize();

			}

			var sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
			var halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
			var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
				ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

			this._w = ( w * ratioA + this._w * ratioB );
			this._x = ( x * ratioA + this._x * ratioB );
			this._y = ( y * ratioA + this._y * ratioB );
			this._z = ( z * ratioA + this._z * ratioB );

			this.onChangeCallback();

			return this;

		},

		equals: function ( quaternion ) {

			return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this._x = array[ offset ];
			this._y = array[ offset + 1 ];
			this._z = array[ offset + 2 ];
			this._w = array[ offset + 3 ];

			this.onChangeCallback();

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this._x;
			array[ offset + 1 ] = this._y;
			array[ offset + 2 ] = this._z;
			array[ offset + 3 ] = this._w;

			return array;

		},

		onChange: function ( callback ) {

			this.onChangeCallback = callback;

			return this;

		},

		onChangeCallback: function () {}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Vector3( x, y, z ) {

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;

	}

	Object.assign( Vector3.prototype, {

		isVector3: true,

		set: function ( x, y, z ) {

			this.x = x;
			this.y = y;
			this.z = z;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;
			this.z = scalar;

			return this;

		},

		setX: function ( x ) {

			this.x = x;

			return this;

		},

		setY: function ( y ) {

			this.y = y;

			return this;

		},

		setZ: function ( z ) {

			this.z = z;

			return this;

		},

		setComponent: function ( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				case 2: this.z = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		},

		getComponent: function ( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				case 2: return this.z;
				default: throw new Error( 'index is out of range: ' + index );

			}

		},

		clone: function () {

			return new this.constructor( this.x, this.y, this.z );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;
			this.z = v.z;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;
			this.z += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;
			this.z += v.z * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;
			this.z -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;

			return this;

		},

		multiply: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
				return this.multiplyVectors( v, w );

			}

			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;

			return this;

		},

		multiplyVectors: function ( a, b ) {

			this.x = a.x * b.x;
			this.y = a.y * b.y;
			this.z = a.z * b.z;

			return this;

		},

		applyEuler: function () {

			var quaternion = new Quaternion();

			return function applyEuler( euler ) {

				if ( ! ( euler && euler.isEuler ) ) {

					console.error( 'Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.' );

				}

				return this.applyQuaternion( quaternion.setFromEuler( euler ) );

			};

		}(),

		applyAxisAngle: function () {

			var quaternion = new Quaternion();

			return function applyAxisAngle( axis, angle ) {

				return this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );

			};

		}(),

		applyMatrix3: function ( m ) {

			var x = this.x, y = this.y, z = this.z;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
			this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

			return this;

		},

		applyMatrix4: function ( m ) {

			var x = this.x, y = this.y, z = this.z;
			var e = m.elements;

			var w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

			this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
			this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
			this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

			return this;

		},

		applyQuaternion: function ( q ) {

			var x = this.x, y = this.y, z = this.z;
			var qx = q.x, qy = q.y, qz = q.z, qw = q.w;

			// calculate quat * vector

			var ix = qw * x + qy * z - qz * y;
			var iy = qw * y + qz * x - qx * z;
			var iz = qw * z + qx * y - qy * x;
			var iw = - qx * x - qy * y - qz * z;

			// calculate result * inverse quat

			this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
			this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
			this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

			return this;

		},

		project: function ( camera ) {

			return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

		},

		unproject: function () {

			var matrix = new Matrix4();

			return function unproject( camera ) {

				return this.applyMatrix4( matrix.getInverse( camera.projectionMatrix ) ).applyMatrix4( camera.matrixWorld );

			};

		}(),

		transformDirection: function ( m ) {

			// input: Matrix4 affine matrix
			// vector interpreted as a direction

			var x = this.x, y = this.y, z = this.z;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
			this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
			this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

			return this.normalize();

		},

		divide: function ( v ) {

			this.x /= v.x;
			this.y /= v.y;
			this.z /= v.z;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );
			this.z = Math.min( this.z, v.z );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );
			this.z = Math.max( this.z, v.z );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );
			this.z = Math.max( min.z, Math.min( max.z, this.z ) );

			return this;

		},

		clampScalar: function () {

			var min = new Vector3();
			var max = new Vector3();

			return function clampScalar( minVal, maxVal ) {

				min.set( minVal, minVal, minVal );
				max.set( maxVal, maxVal, maxVal );

				return this.clamp( min, max );

			};

		}(),

		clampLength: function ( min, max ) {

			var length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		},

		floor: function () {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );
			this.z = Math.floor( this.z );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );
			this.z = Math.ceil( this.z );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );
			this.z = Math.round( this.z );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
			this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;
			this.z = - this.z;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y + this.z * v.z;

		},

		// TODO lengthSquared?

		lengthSq: function () {

			return this.x * this.x + this.y * this.y + this.z * this.z;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

		},

		normalize: function () {

			return this.divideScalar( this.length() || 1 );

		},

		setLength: function ( length ) {

			return this.normalize().multiplyScalar( length );

		},

		lerp: function ( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;
			this.z += ( v.z - this.z ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		cross: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
				return this.crossVectors( v, w );

			}

			return this.crossVectors( this, v );

		},

		crossVectors: function ( a, b ) {

			var ax = a.x, ay = a.y, az = a.z;
			var bx = b.x, by = b.y, bz = b.z;

			this.x = ay * bz - az * by;
			this.y = az * bx - ax * bz;
			this.z = ax * by - ay * bx;

			return this;

		},

		projectOnVector: function ( vector ) {

			var scalar = vector.dot( this ) / vector.lengthSq();

			return this.copy( vector ).multiplyScalar( scalar );

		},

		projectOnPlane: function () {

			var v1 = new Vector3();

			return function projectOnPlane( planeNormal ) {

				v1.copy( this ).projectOnVector( planeNormal );

				return this.sub( v1 );

			};

		}(),

		reflect: function () {

			// reflect incident vector off plane orthogonal to normal
			// normal is assumed to have unit length

			var v1 = new Vector3();

			return function reflect( normal ) {

				return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

			};

		}(),

		angleTo: function ( v ) {

			var theta = this.dot( v ) / ( Math.sqrt( this.lengthSq() * v.lengthSq() ) );

			// clamp, to handle numerical problems

			return Math.acos( _Math.clamp( theta, - 1, 1 ) );

		},

		distanceTo: function ( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		},

		distanceToSquared: function ( v ) {

			var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

			return dx * dx + dy * dy + dz * dz;

		},

		manhattanDistanceTo: function ( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

		},

		setFromSpherical: function ( s ) {

			return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

		},

		setFromSphericalCoords: function ( radius, phi, theta ) {

			var sinPhiRadius = Math.sin( phi ) * radius;

			this.x = sinPhiRadius * Math.sin( theta );
			this.y = Math.cos( phi ) * radius;
			this.z = sinPhiRadius * Math.cos( theta );

			return this;

		},

		setFromCylindrical: function ( c ) {

			return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

		},

		setFromCylindricalCoords: function ( radius, theta, y ) {

			this.x = radius * Math.sin( theta );
			this.y = y;
			this.z = radius * Math.cos( theta );

			return this;

		},

		setFromMatrixPosition: function ( m ) {

			var e = m.elements;

			this.x = e[ 12 ];
			this.y = e[ 13 ];
			this.z = e[ 14 ];

			return this;

		},

		setFromMatrixScale: function ( m ) {

			var sx = this.setFromMatrixColumn( m, 0 ).length();
			var sy = this.setFromMatrixColumn( m, 1 ).length();
			var sz = this.setFromMatrixColumn( m, 2 ).length();

			this.x = sx;
			this.y = sy;
			this.z = sz;

			return this;

		},

		setFromMatrixColumn: function ( m, index ) {

			return this.fromArray( m.elements, index * 4 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];
			this.z = array[ offset + 2 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;
			array[ offset + 2 ] = this.z;

			return array;

		},

		fromBufferAttribute: function ( attribute, index, offset ) {

			if ( offset !== undefined ) {

				console.warn( 'Vector3: offset has been removed from .fromBufferAttribute().' );

			}

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );
			this.z = attribute.getZ( index );

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Curve() {

		this.type = 'Curve';

		this.arcLengthDivisions = 200;

	}

	Object.assign( Curve.prototype, {

		// Virtual base class method to overwrite and implement in subclasses
		//	- t [0 .. 1]

		getPoint: function (  ) {

			console.warn( 'Curve: .getPoint() not implemented.' );
			return null;

		},

		// Get point at relative position in curve according to arc length
		// - u [0 .. 1]

		getPointAt: function ( u, optionalTarget ) {

			var t = this.getUtoTmapping( u );
			return this.getPoint( t, optionalTarget );

		},

		// Get sequence of points using getPoint( t )

		getPoints: function ( divisions ) {

			if ( divisions === undefined ) divisions = 5;

			var points = [];

			for ( var d = 0; d <= divisions; d ++ ) {

				points.push( this.getPoint( d / divisions ) );

			}

			return points;

		},

		// Get sequence of points using getPointAt( u )

		getSpacedPoints: function ( divisions ) {

			if ( divisions === undefined ) divisions = 5;

			var points = [];

			for ( var d = 0; d <= divisions; d ++ ) {

				points.push( this.getPointAt( d / divisions ) );

			}

			return points;

		},

		// Get total curve arc length

		getLength: function () {

			var lengths = this.getLengths();
			return lengths[ lengths.length - 1 ];

		},

		// Get list of cumulative segment lengths

		getLengths: function ( divisions ) {

			if ( divisions === undefined ) divisions = this.arcLengthDivisions;

			if ( this.cacheArcLengths &&
				( this.cacheArcLengths.length === divisions + 1 ) &&
				! this.needsUpdate ) {

				return this.cacheArcLengths;

			}

			this.needsUpdate = false;

			var cache = [];
			var current, last = this.getPoint( 0 );
			var p, sum = 0;

			cache.push( 0 );

			for ( p = 1; p <= divisions; p ++ ) {

				current = this.getPoint( p / divisions );
				sum += current.distanceTo( last );
				cache.push( sum );
				last = current;

			}

			this.cacheArcLengths = cache;

			return cache; // { sums: cache, sum: sum }; Sum is in the last element.

		},

		updateArcLengths: function () {

			this.needsUpdate = true;
			this.getLengths();

		},

		// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant

		getUtoTmapping: function ( u, distance ) {

			var arcLengths = this.getLengths();

			var i = 0, il = arcLengths.length;

			var targetArcLength; // The targeted u distance value to get

			if ( distance ) {

				targetArcLength = distance;

			} else {

				targetArcLength = u * arcLengths[ il - 1 ];

			}

			// binary search for the index with largest value smaller than target u distance

			var low = 0, high = il - 1, comparison;

			while ( low <= high ) {

				i = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

				comparison = arcLengths[ i ] - targetArcLength;

				if ( comparison < 0 ) {

					low = i + 1;

				} else if ( comparison > 0 ) {

					high = i - 1;

				} else {

					high = i;
					break;

					// DONE

				}

			}

			i = high;

			if ( arcLengths[ i ] === targetArcLength ) {

				return i / ( il - 1 );

			}

			// we could get finer grain at lengths, or use simple interpolation between two points

			var lengthBefore = arcLengths[ i ];
			var lengthAfter = arcLengths[ i + 1 ];

			var segmentLength = lengthAfter - lengthBefore;

			// determine where we are between the 'before' and 'after' points

			var segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;

			// add that fractional amount to t

			var t = ( i + segmentFraction ) / ( il - 1 );

			return t;

		},

		// Returns a unit vector tangent at t
		// In case any sub curve does not implement its tangent derivation,
		// 2 points a small delta apart will be used to find its gradient
		// which seems to give a reasonable approximation

		getTangent: function ( t ) {

			var delta = 0.0001;
			var t1 = t - delta;
			var t2 = t + delta;

			// Capping in case of danger

			if ( t1 < 0 ) t1 = 0;
			if ( t2 > 1 ) t2 = 1;

			var pt1 = this.getPoint( t1 );
			var pt2 = this.getPoint( t2 );

			var vec = pt2.clone().sub( pt1 );
			return vec.normalize();

		},

		getTangentAt: function ( u ) {

			var t = this.getUtoTmapping( u );
			return this.getTangent( t );

		},

		computeFrenetFrames: function ( segments, closed ) {

			// see http://www.cs.indiana.edu/pub/techreports/TR425.pdf

			var normal = new Vector3();

			var tangents = [];
			var normals = [];
			var binormals = [];

			var vec = new Vector3();
			var mat = new Matrix4();

			var i, u, theta;

			// compute the tangent vectors for each segment on the curve

			for ( i = 0; i <= segments; i ++ ) {

				u = i / segments;

				tangents[ i ] = this.getTangentAt( u );
				tangents[ i ].normalize();

			}

			// select an initial normal vector perpendicular to the first tangent vector,
			// and in the direction of the minimum tangent xyz component

			normals[ 0 ] = new Vector3();
			binormals[ 0 ] = new Vector3();
			var min = Number.MAX_VALUE;
			var tx = Math.abs( tangents[ 0 ].x );
			var ty = Math.abs( tangents[ 0 ].y );
			var tz = Math.abs( tangents[ 0 ].z );

			if ( tx <= min ) {

				min = tx;
				normal.set( 1, 0, 0 );

			}

			if ( ty <= min ) {

				min = ty;
				normal.set( 0, 1, 0 );

			}

			if ( tz <= min ) {

				normal.set( 0, 0, 1 );

			}

			vec.crossVectors( tangents[ 0 ], normal ).normalize();

			normals[ 0 ].crossVectors( tangents[ 0 ], vec );
			binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] );
			// compute the slowly-varying normal and binormal vectors for each segment on the curve

			for ( i = 1; i <= segments; i ++ ) {

				normals[ i ] = normals[ i - 1 ].clone();

				binormals[ i ] = binormals[ i - 1 ].clone();

				vec.crossVectors( tangents[ i - 1 ], tangents[ i ] );

				if ( vec.length() > Number.EPSILON ) {

					vec.normalize();

					theta = Math.acos( _Math.clamp( tangents[ i - 1 ].dot( tangents[ i ] ), - 1, 1 ) ); // clamp for floating pt errors

					normals[ i ].applyMatrix4( mat.makeRotationAxis( vec, theta ) );

				}

				binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );

			}

			// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same

			if ( closed === true ) {

				theta = Math.acos( _Math.clamp( normals[ 0 ].dot( normals[ segments ] ), - 1, 1 ) );
				theta /= segments;

				if ( tangents[ 0 ].dot( vec.crossVectors( normals[ 0 ], normals[ segments ] ) ) > 0 ) {

					theta = - theta;

				}

				for ( i = 1; i <= segments; i ++ ) {

					// twist a little...
					normals[ i ].applyMatrix4( mat.makeRotationAxis( tangents[ i ], theta * i ) );
					binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );

				}

			}

			return {
				tangents: tangents,
				normals: normals,
				binormals: binormals
			};

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.arcLengthDivisions = source.arcLengthDivisions;

			return this;

		},

		toJSON: function () {

			var data = {
				metadata: {
					version: 4.5,
					type: 'Curve',
					generator: 'Curve.toJSON'
				}
			};

			data.arcLengthDivisions = this.arcLengthDivisions;
			data.type = this.type;

			return data;

		},

		fromJSON: function ( json ) {

			this.arcLengthDivisions = json.arcLengthDivisions;

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function EllipseCurve( aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation ) {

		Curve.call( this );

		this.type = 'EllipseCurve';

		this.aX = aX || 0;
		this.aY = aY || 0;

		this.xRadius = xRadius || 1;
		this.yRadius = yRadius || 1;

		this.aStartAngle = aStartAngle || 0;
		this.aEndAngle = aEndAngle || 2 * Math.PI;

		this.aClockwise = aClockwise || false;

		this.aRotation = aRotation || 0;

	}

	EllipseCurve.prototype = Object.create( Curve.prototype );
	EllipseCurve.prototype.constructor = EllipseCurve;

	EllipseCurve.prototype.isEllipseCurve = true;

	EllipseCurve.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector2();

		var twoPi = Math.PI * 2;
		var deltaAngle = this.aEndAngle - this.aStartAngle;
		var samePoints = Math.abs( deltaAngle ) < Number.EPSILON;

		// ensures that deltaAngle is 0 .. 2 PI
		while ( deltaAngle < 0 ) deltaAngle += twoPi;
		while ( deltaAngle > twoPi ) deltaAngle -= twoPi;

		if ( deltaAngle < Number.EPSILON ) {

			if ( samePoints ) {

				deltaAngle = 0;

			} else {

				deltaAngle = twoPi;

			}

		}

		if ( this.aClockwise === true && ! samePoints ) {

			if ( deltaAngle === twoPi ) {

				deltaAngle = - twoPi;

			} else {

				deltaAngle = deltaAngle - twoPi;

			}

		}

		var angle = this.aStartAngle + t * deltaAngle;
		var x = this.aX + this.xRadius * Math.cos( angle );
		var y = this.aY + this.yRadius * Math.sin( angle );

		if ( this.aRotation !== 0 ) {

			var cos = Math.cos( this.aRotation );
			var sin = Math.sin( this.aRotation );

			var tx = x - this.aX;
			var ty = y - this.aY;

			// Rotate the point about the center of the ellipse.
			x = tx * cos - ty * sin + this.aX;
			y = tx * sin + ty * cos + this.aY;

		}

		return point.set( x, y );

	};

	EllipseCurve.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.aX = source.aX;
		this.aY = source.aY;

		this.xRadius = source.xRadius;
		this.yRadius = source.yRadius;

		this.aStartAngle = source.aStartAngle;
		this.aEndAngle = source.aEndAngle;

		this.aClockwise = source.aClockwise;

		this.aRotation = source.aRotation;

		return this;

	};
	EllipseCurve.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.aX = this.aX;
		data.aY = this.aY;

		data.xRadius = this.xRadius;
		data.yRadius = this.yRadius;

		data.aStartAngle = this.aStartAngle;
		data.aEndAngle = this.aEndAngle;

		data.aClockwise = this.aClockwise;

		data.aRotation = this.aRotation;

		return data;

	};

	EllipseCurve.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.aX = json.aX;
		this.aY = json.aY;

		this.xRadius = json.xRadius;
		this.yRadius = json.yRadius;

		this.aStartAngle = json.aStartAngle;
		this.aEndAngle = json.aEndAngle;

		this.aClockwise = json.aClockwise;

		this.aRotation = json.aRotation;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function ArcCurve( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise ) {

		EllipseCurve.call( this, aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise );

		this.type = 'ArcCurve';

	}

	ArcCurve.prototype = Object.create( EllipseCurve.prototype );
	ArcCurve.prototype.constructor = ArcCurve;

	ArcCurve.prototype.isArcCurve = true;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CubicPoly() {

		var c0 = 0, c1 = 0, c2 = 0, c3 = 0;
		function init( x0, x1, t0, t1 ) {

			c0 = x0;
			c1 = t0;
			c2 = - 3 * x0 + 3 * x1 - 2 * t0 - t1;
			c3 = 2 * x0 - 2 * x1 + t0 + t1;

		}

		return {

			initCatmullRom: function ( x0, x1, x2, x3, tension ) {

				init( x1, x2, tension * ( x2 - x0 ), tension * ( x3 - x1 ) );

			},

			initNonuniformCatmullRom: function ( x0, x1, x2, x3, dt0, dt1, dt2 ) {

				// compute tangents when parameterized in [t1,t2]
				var t1 = ( x1 - x0 ) / dt0 - ( x2 - x0 ) / ( dt0 + dt1 ) + ( x2 - x1 ) / dt1;
				var t2 = ( x2 - x1 ) / dt1 - ( x3 - x1 ) / ( dt1 + dt2 ) + ( x3 - x2 ) / dt2;

				// rescale tangents for parametrization in [0,1]
				t1 *= dt1;
				t2 *= dt1;

				init( x1, x2, t1, t2 );

			},

			calc: function ( t ) {

				var t2 = t * t;
				var t3 = t2 * t;
				return c0 + c1 * t + c2 * t2 + c3 * t3;

			}

		};

	}

	//

	var tmp = new Vector3();
	var px = new CubicPoly(), py = new CubicPoly(), pz = new CubicPoly();

	function CatmullRomCurve3( points, closed, curveType, tension ) {

		Curve.call( this );

		this.type = 'CatmullRomCurve3';

		this.points = points || [];
		this.closed = closed || false;
		this.curveType = curveType || 'centripetal';
		this.tension = tension || 0.5;

	}

	CatmullRomCurve3.prototype = Object.create( Curve.prototype );
	CatmullRomCurve3.prototype.constructor = CatmullRomCurve3;

	CatmullRomCurve3.prototype.isCatmullRomCurve3 = true;

	CatmullRomCurve3.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector3();

		var points = this.points;
		var l = points.length;

		var p = ( l - ( this.closed ? 0 : 1 ) ) * t;
		var intPoint = Math.floor( p );
		var weight = p - intPoint;

		if ( this.closed ) {

			intPoint += intPoint > 0 ? 0 : ( Math.floor( Math.abs( intPoint ) / l ) + 1 ) * l;

		} else if ( weight === 0 && intPoint === l - 1 ) {

			intPoint = l - 2;
			weight = 1;

		}

		var p0, p1, p2, p3; // 4 points

		if ( this.closed || intPoint > 0 ) {

			p0 = points[ ( intPoint - 1 ) % l ];

		} else {

			// extrapolate first point
			tmp.subVectors( points[ 0 ], points[ 1 ] ).add( points[ 0 ] );
			p0 = tmp;

		}

		p1 = points[ intPoint % l ];
		p2 = points[ ( intPoint + 1 ) % l ];

		if ( this.closed || intPoint + 2 < l ) {

			p3 = points[ ( intPoint + 2 ) % l ];

		} else {

			// extrapolate last point
			tmp.subVectors( points[ l - 1 ], points[ l - 2 ] ).add( points[ l - 1 ] );
			p3 = tmp;

		}

		if ( this.curveType === 'centripetal' || this.curveType === 'chordal' ) {

			// init Centripetal / Chordal Catmull-Rom
			var pow = this.curveType === 'chordal' ? 0.5 : 0.25;
			var dt0 = Math.pow( p0.distanceToSquared( p1 ), pow );
			var dt1 = Math.pow( p1.distanceToSquared( p2 ), pow );
			var dt2 = Math.pow( p2.distanceToSquared( p3 ), pow );

			// safety check for repeated points
			if ( dt1 < 1e-4 ) dt1 = 1.0;
			if ( dt0 < 1e-4 ) dt0 = dt1;
			if ( dt2 < 1e-4 ) dt2 = dt1;

			px.initNonuniformCatmullRom( p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2 );
			py.initNonuniformCatmullRom( p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2 );
			pz.initNonuniformCatmullRom( p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2 );

		} else if ( this.curveType === 'catmullrom' ) {

			px.initCatmullRom( p0.x, p1.x, p2.x, p3.x, this.tension );
			py.initCatmullRom( p0.y, p1.y, p2.y, p3.y, this.tension );
			pz.initCatmullRom( p0.z, p1.z, p2.z, p3.z, this.tension );

		}

		point.set(
			px.calc( weight ),
			py.calc( weight ),
			pz.calc( weight )
		);

		return point;

	};

	CatmullRomCurve3.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.points = [];

		for ( var i = 0, l = source.points.length; i < l; i ++ ) {

			var point = source.points[ i ];

			this.points.push( point.clone() );

		}

		this.closed = source.closed;
		this.curveType = source.curveType;
		this.tension = source.tension;

		return this;

	};

	CatmullRomCurve3.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.points = [];

		for ( var i = 0, l = this.points.length; i < l; i ++ ) {

			var point = this.points[ i ];
			data.points.push( point.toArray() );

		}

		data.closed = this.closed;
		data.curveType = this.curveType;
		data.tension = this.tension;

		return data;

	};

	CatmullRomCurve3.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.points = [];

		for ( var i = 0, l = json.points.length; i < l; i ++ ) {

			var point = json.points[ i ];
			this.points.push( new Vector3().fromArray( point ) );

		}

		this.closed = json.closed;
		this.curveType = json.curveType;
		this.tension = json.tension;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CatmullRom( t, p0, p1, p2, p3 ) {

		var v0 = ( p2 - p0 ) * 0.5;
		var v1 = ( p3 - p1 ) * 0.5;
		var t2 = t * t;
		var t3 = t * t2;
		return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	}

	//

	function QuadraticBezierP0( t, p ) {

		var k = 1 - t;
		return k * k * p;

	}

	function QuadraticBezierP1( t, p ) {

		return 2 * ( 1 - t ) * t * p;

	}

	function QuadraticBezierP2( t, p ) {

		return t * t * p;

	}

	function QuadraticBezier( t, p0, p1, p2 ) {

		return QuadraticBezierP0( t, p0 ) + QuadraticBezierP1( t, p1 ) +
			QuadraticBezierP2( t, p2 );

	}

	//

	function CubicBezierP0( t, p ) {

		var k = 1 - t;
		return k * k * k * p;

	}

	function CubicBezierP1( t, p ) {

		var k = 1 - t;
		return 3 * k * k * t * p;

	}

	function CubicBezierP2( t, p ) {

		return 3 * ( 1 - t ) * t * t * p;

	}

	function CubicBezierP3( t, p ) {

		return t * t * t * p;

	}

	function CubicBezier( t, p0, p1, p2, p3 ) {

		return CubicBezierP0( t, p0 ) + CubicBezierP1( t, p1 ) + CubicBezierP2( t, p2 ) +
			CubicBezierP3( t, p3 );

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CubicBezierCurve( v0, v1, v2, v3 ) {

		Curve.call( this );

		this.type = 'CubicBezierCurve';

		this.v0 = v0 || new Vector2();
		this.v1 = v1 || new Vector2();
		this.v2 = v2 || new Vector2();
		this.v3 = v3 || new Vector2();

	}

	CubicBezierCurve.prototype = Object.create( Curve.prototype );
	CubicBezierCurve.prototype.constructor = CubicBezierCurve;

	CubicBezierCurve.prototype.isCubicBezierCurve = true;

	CubicBezierCurve.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector2();

		var v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;

		point.set(
			CubicBezier( t, v0.x, v1.x, v2.x, v3.x ),
			CubicBezier( t, v0.y, v1.y, v2.y, v3.y )
		);

		return point;

	};

	CubicBezierCurve.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.v0.copy( source.v0 );
		this.v1.copy( source.v1 );
		this.v2.copy( source.v2 );
		this.v3.copy( source.v3 );

		return this;

	};

	CubicBezierCurve.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.v0 = this.v0.toArray();
		data.v1 = this.v1.toArray();
		data.v2 = this.v2.toArray();
		data.v3 = this.v3.toArray();

		return data;

	};

	CubicBezierCurve.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.v0.fromArray( json.v0 );
		this.v1.fromArray( json.v1 );
		this.v2.fromArray( json.v2 );
		this.v3.fromArray( json.v3 );

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CubicBezierCurve3( v0, v1, v2, v3 ) {

		Curve.call( this );

		this.type = 'CubicBezierCurve3';

		this.v0 = v0 || new Vector3();
		this.v1 = v1 || new Vector3();
		this.v2 = v2 || new Vector3();
		this.v3 = v3 || new Vector3();

	}

	CubicBezierCurve3.prototype = Object.create( Curve.prototype );
	CubicBezierCurve3.prototype.constructor = CubicBezierCurve3;

	CubicBezierCurve3.prototype.isCubicBezierCurve3 = true;

	CubicBezierCurve3.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector3();

		var v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;

		point.set(
			CubicBezier( t, v0.x, v1.x, v2.x, v3.x ),
			CubicBezier( t, v0.y, v1.y, v2.y, v3.y ),
			CubicBezier( t, v0.z, v1.z, v2.z, v3.z )
		);

		return point;

	};

	CubicBezierCurve3.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.v0.copy( source.v0 );
		this.v1.copy( source.v1 );
		this.v2.copy( source.v2 );
		this.v3.copy( source.v3 );

		return this;

	};

	CubicBezierCurve3.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.v0 = this.v0.toArray();
		data.v1 = this.v1.toArray();
		data.v2 = this.v2.toArray();
		data.v3 = this.v3.toArray();

		return data;

	};

	CubicBezierCurve3.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.v0.fromArray( json.v0 );
		this.v1.fromArray( json.v1 );
		this.v2.fromArray( json.v2 );
		this.v3.fromArray( json.v3 );

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LineCurve( v1, v2 ) {

		Curve.call( this );

		this.type = 'LineCurve';

		this.v1 = v1 || new Vector2();
		this.v2 = v2 || new Vector2();

	}

	LineCurve.prototype = Object.create( Curve.prototype );
	LineCurve.prototype.constructor = LineCurve;

	LineCurve.prototype.isLineCurve = true;

	LineCurve.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector2();

		if ( t === 1 ) {

			point.copy( this.v2 );

		} else {

			point.copy( this.v2 ).sub( this.v1 );
			point.multiplyScalar( t ).add( this.v1 );

		}

		return point;

	};

	// Line curve is linear, so we can overwrite default getPointAt

	LineCurve.prototype.getPointAt = function ( u, optionalTarget ) {

		return this.getPoint( u, optionalTarget );

	};

	LineCurve.prototype.getTangent = function (  ) {

		var tangent = this.v2.clone().sub( this.v1 );

		return tangent.normalize();

	};

	LineCurve.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.v1.copy( source.v1 );
		this.v2.copy( source.v2 );

		return this;

	};

	LineCurve.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.v1 = this.v1.toArray();
		data.v2 = this.v2.toArray();

		return data;

	};

	LineCurve.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.v1.fromArray( json.v1 );
		this.v2.fromArray( json.v2 );

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LineCurve3( v1, v2 ) {

		Curve.call( this );

		this.type = 'LineCurve3';

		this.v1 = v1 || new Vector3();
		this.v2 = v2 || new Vector3();

	}

	LineCurve3.prototype = Object.create( Curve.prototype );
	LineCurve3.prototype.constructor = LineCurve3;

	LineCurve3.prototype.isLineCurve3 = true;

	LineCurve3.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector3();

		if ( t === 1 ) {

			point.copy( this.v2 );

		} else {

			point.copy( this.v2 ).sub( this.v1 );
			point.multiplyScalar( t ).add( this.v1 );

		}

		return point;

	};

	// Line curve is linear, so we can overwrite default getPointAt

	LineCurve3.prototype.getPointAt = function ( u, optionalTarget ) {

		return this.getPoint( u, optionalTarget );

	};

	LineCurve3.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.v1.copy( source.v1 );
		this.v2.copy( source.v2 );

		return this;

	};

	LineCurve3.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.v1 = this.v1.toArray();
		data.v2 = this.v2.toArray();

		return data;

	};

	LineCurve3.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.v1.fromArray( json.v1 );
		this.v2.fromArray( json.v2 );

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function QuadraticBezierCurve( v0, v1, v2 ) {

		Curve.call( this );

		this.type = 'QuadraticBezierCurve';

		this.v0 = v0 || new Vector2();
		this.v1 = v1 || new Vector2();
		this.v2 = v2 || new Vector2();

	}

	QuadraticBezierCurve.prototype = Object.create( Curve.prototype );
	QuadraticBezierCurve.prototype.constructor = QuadraticBezierCurve;

	QuadraticBezierCurve.prototype.isQuadraticBezierCurve = true;

	QuadraticBezierCurve.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector2();

		var v0 = this.v0, v1 = this.v1, v2 = this.v2;

		point.set(
			QuadraticBezier( t, v0.x, v1.x, v2.x ),
			QuadraticBezier( t, v0.y, v1.y, v2.y )
		);

		return point;

	};

	QuadraticBezierCurve.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.v0.copy( source.v0 );
		this.v1.copy( source.v1 );
		this.v2.copy( source.v2 );

		return this;

	};

	QuadraticBezierCurve.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.v0 = this.v0.toArray();
		data.v1 = this.v1.toArray();
		data.v2 = this.v2.toArray();

		return data;

	};

	QuadraticBezierCurve.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.v0.fromArray( json.v0 );
		this.v1.fromArray( json.v1 );
		this.v2.fromArray( json.v2 );

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function QuadraticBezierCurve3( v0, v1, v2 ) {

		Curve.call( this );

		this.type = 'QuadraticBezierCurve3';

		this.v0 = v0 || new Vector3();
		this.v1 = v1 || new Vector3();
		this.v2 = v2 || new Vector3();

	}

	QuadraticBezierCurve3.prototype = Object.create( Curve.prototype );
	QuadraticBezierCurve3.prototype.constructor = QuadraticBezierCurve3;

	QuadraticBezierCurve3.prototype.isQuadraticBezierCurve3 = true;

	QuadraticBezierCurve3.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector3();

		var v0 = this.v0, v1 = this.v1, v2 = this.v2;

		point.set(
			QuadraticBezier( t, v0.x, v1.x, v2.x ),
			QuadraticBezier( t, v0.y, v1.y, v2.y ),
			QuadraticBezier( t, v0.z, v1.z, v2.z )
		);

		return point;

	};

	QuadraticBezierCurve3.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.v0.copy( source.v0 );
		this.v1.copy( source.v1 );
		this.v2.copy( source.v2 );

		return this;

	};

	QuadraticBezierCurve3.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.v0 = this.v0.toArray();
		data.v1 = this.v1.toArray();
		data.v2 = this.v2.toArray();

		return data;

	};

	QuadraticBezierCurve3.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.v0.fromArray( json.v0 );
		this.v1.fromArray( json.v1 );
		this.v2.fromArray( json.v2 );

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function SplineCurve( points  ) {

		Curve.call( this );

		this.type = 'SplineCurve';

		this.points = points || [];

	}

	SplineCurve.prototype = Object.create( Curve.prototype );
	SplineCurve.prototype.constructor = SplineCurve;

	SplineCurve.prototype.isSplineCurve = true;

	SplineCurve.prototype.getPoint = function ( t, optionalTarget ) {

		var point = optionalTarget || new Vector2();

		var points = this.points;
		var p = ( points.length - 1 ) * t;

		var intPoint = Math.floor( p );
		var weight = p - intPoint;

		var p0 = points[ intPoint === 0 ? intPoint : intPoint - 1 ];
		var p1 = points[ intPoint ];
		var p2 = points[ intPoint > points.length - 2 ? points.length - 1 : intPoint + 1 ];
		var p3 = points[ intPoint > points.length - 3 ? points.length - 1 : intPoint + 2 ];

		point.set(
			CatmullRom( weight, p0.x, p1.x, p2.x, p3.x ),
			CatmullRom( weight, p0.y, p1.y, p2.y, p3.y )
		);

		return point;

	};

	SplineCurve.prototype.copy = function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.points = [];

		for ( var i = 0, l = source.points.length; i < l; i ++ ) {

			var point = source.points[ i ];

			this.points.push( point.clone() );

		}

		return this;

	};

	SplineCurve.prototype.toJSON = function () {

		var data = Curve.prototype.toJSON.call( this );

		data.points = [];

		for ( var i = 0, l = this.points.length; i < l; i ++ ) {

			var point = this.points[ i ];
			data.points.push( point.toArray() );

		}

		return data;

	};

	SplineCurve.prototype.fromJSON = function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.points = [];

		for ( var i = 0, l = json.points.length; i < l; i ++ ) {

			var point = json.points[ i ];
			this.points.push( new Vector2().fromArray( point ) );

		}

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var Curves = {
	    ArcCurve: ArcCurve,
	    CatmullRomCurve3: CatmullRomCurve3,
	    CubicBezierCurve: CubicBezierCurve,
	    CubicBezierCurve3: CubicBezierCurve3,
	    EllipseCurve: EllipseCurve,
	    LineCurve: LineCurve,
	    LineCurve3: LineCurve3,
	    QuadraticBezierCurve: QuadraticBezierCurve,
	    QuadraticBezierCurve3: QuadraticBezierCurve3,
	    SplineCurve: SplineCurve
	};
	function CurvePath() {

		Curve.call( this );

		this.type = 'CurvePath';

		this.curves = [];
		this.autoClose = false; // Automatically closes the path

	}

	CurvePath.prototype = Object.assign( Object.create( Curve.prototype ), {

		constructor: CurvePath,

		add: function ( curve ) {

			this.curves.push( curve );

		},

		closePath: function () {

			// Add a line curve if start and end of lines are not connected
			var startPoint = this.curves[ 0 ].getPoint( 0 );
			var endPoint = this.curves[ this.curves.length - 1 ].getPoint( 1 );

			if ( ! startPoint.equals( endPoint ) ) {

				this.curves.push( new Curves[ 'LineCurve' ]( endPoint, startPoint ) );

			}

		},

		// To get accurate point with reference to
		// entire path distance at time t,
		// following has to be done:

		// 1. Length of each sub path have to be known
		// 2. Locate and identify type of curve
		// 3. Get t for the curve
		// 4. Return curve.getPointAt(t')

		getPoint: function ( t ) {

			var d = t * this.getLength();
			var curveLengths = this.getCurveLengths();
			var i = 0;

			// To think about boundaries points.

			while ( i < curveLengths.length ) {

				if ( curveLengths[ i ] >= d ) {

					var diff = curveLengths[ i ] - d;
					var curve = this.curves[ i ];

					var segmentLength = curve.getLength();
					var u = segmentLength === 0 ? 0 : 1 - diff / segmentLength;

					return curve.getPointAt( u );

				}

				i ++;

			}

			return null;

			// loop where sum != 0, sum > d , sum+1 <d

		},

		// We cannot use the default Curve getPoint() with getLength() because in
		// Curve, getLength() depends on getPoint() but in CurvePath
		// getPoint() depends on getLength

		getLength: function () {

			var lens = this.getCurveLengths();
			return lens[ lens.length - 1 ];

		},

		// cacheLengths must be recalculated.
		updateArcLengths: function () {

			this.needsUpdate = true;
			this.cacheLengths = null;
			this.getCurveLengths();

		},

		// Compute lengths and cache them
		// We cannot overwrite getLengths() because UtoT mapping uses it.

		getCurveLengths: function () {

			// We use cache values if curves and cache array are same length

			if ( this.cacheLengths && this.cacheLengths.length === this.curves.length ) {

				return this.cacheLengths;

			}

			// Get length of sub-curve
			// Push sums into cached array

			var lengths = [], sums = 0;

			for ( var i = 0, l = this.curves.length; i < l; i ++ ) {

				sums += this.curves[ i ].getLength();
				lengths.push( sums );

			}

			this.cacheLengths = lengths;

			return lengths;

		},

		getSpacedPoints: function ( divisions ) {

			if ( divisions === undefined ) divisions = 40;

			var points = [];

			for ( var i = 0; i <= divisions; i ++ ) {

				points.push( this.getPoint( i / divisions ) );

			}

			if ( this.autoClose ) {

				points.push( points[ 0 ] );

			}

			return points;

		},

		getPoints: function ( divisions ) {

			divisions = divisions || 12;

			var points = [], last;

			for ( var i = 0, curves = this.curves; i < curves.length; i ++ ) {

				var curve = curves[ i ];
				var resolution = ( curve && curve.isEllipseCurve ) ? divisions * 2
					: ( curve && ( curve.isLineCurve || curve.isLineCurve3 ) ) ? 1
						: ( curve && curve.isSplineCurve ) ? divisions * curve.points.length
							: divisions;

				var pts = curve.getPoints( resolution );

				for ( var j = 0; j < pts.length; j ++ ) {

					var point = pts[ j ];

					if ( last && last.equals( point ) ) continue; // ensures no consecutive points are duplicates

					points.push( point );
					last = point;

				}

			}

			if ( this.autoClose && points.length > 1 && ! points[ points.length - 1 ].equals( points[ 0 ] ) ) {

				points.push( points[ 0 ] );

			}

			return points;

		},

		copy: function ( source ) {

			Curve.prototype.copy.call( this, source );

			this.curves = [];

			for ( var i = 0, l = source.curves.length; i < l; i ++ ) {

				var curve = source.curves[ i ];

				this.curves.push( curve.clone() );

			}

			this.autoClose = source.autoClose;

			return this;

		},

		toJSON: function () {

			var data = Curve.prototype.toJSON.call( this );

			data.autoClose = this.autoClose;
			data.curves = [];

			for ( var i = 0, l = this.curves.length; i < l; i ++ ) {

				var curve = this.curves[ i ];
				data.curves.push( curve.toJSON() );

			}

			return data;

		},

		fromJSON: function ( json ) {

			Curve.prototype.fromJSON.call( this, json );

			this.autoClose = json.autoClose;
			this.curves = [];

			for ( var i = 0, l = json.curves.length; i < l; i ++ ) {

				var curve = json.curves[ i ];
				this.curves.push( new Curves[ curve.type ]().fromJSON( curve ) );

			}

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Path( points ) {

		CurvePath.call( this );

		this.type = 'Path';

		this.currentPoint = new Vector2();

		if ( points ) {

			this.setFromPoints( points );

		}

	}

	Path.prototype = Object.assign( Object.create( CurvePath.prototype ), {

		constructor: Path,

		setFromPoints: function ( points ) {

			this.moveTo( points[ 0 ].x, points[ 0 ].y );

			for ( var i = 1, l = points.length; i < l; i ++ ) {

				this.lineTo( points[ i ].x, points[ i ].y );

			}

		},

		moveTo: function ( x, y ) {

			this.currentPoint.set( x, y ); // TODO consider referencing vectors instead of copying?

		},

		lineTo: function ( x, y ) {

			var curve = new LineCurve( this.currentPoint.clone(), new Vector2( x, y ) );
			this.curves.push( curve );

			this.currentPoint.set( x, y );

		},

		quadraticCurveTo: function ( aCPx, aCPy, aX, aY ) {

			var curve = new QuadraticBezierCurve(
				this.currentPoint.clone(),
				new Vector2( aCPx, aCPy ),
				new Vector2( aX, aY )
			);

			this.curves.push( curve );

			this.currentPoint.set( aX, aY );

		},

		bezierCurveTo: function ( aCP1x, aCP1y, aCP2x, aCP2y, aX, aY ) {

			var curve = new CubicBezierCurve(
				this.currentPoint.clone(),
				new Vector2( aCP1x, aCP1y ),
				new Vector2( aCP2x, aCP2y ),
				new Vector2( aX, aY )
			);

			this.curves.push( curve );

			this.currentPoint.set( aX, aY );

		},

		splineThru: function ( pts  ) {

			var npts = [ this.currentPoint.clone() ].concat( pts );

			var curve = new SplineCurve( npts );
			this.curves.push( curve );

			this.currentPoint.copy( pts[ pts.length - 1 ] );

		},

		arc: function ( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise ) {

			var x0 = this.currentPoint.x;
			var y0 = this.currentPoint.y;

			this.absarc( aX + x0, aY + y0, aRadius,
				aStartAngle, aEndAngle, aClockwise );

		},

		absarc: function ( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise ) {

			this.absellipse( aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise );

		},

		ellipse: function ( aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation ) {

			var x0 = this.currentPoint.x;
			var y0 = this.currentPoint.y;

			this.absellipse( aX + x0, aY + y0, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation );

		},

		absellipse: function ( aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation ) {

			var curve = new EllipseCurve( aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation );

			if ( this.curves.length > 0 ) {

				// if a previous curve is present, attempt to join
				var firstPoint = curve.getPoint( 0 );

				if ( ! firstPoint.equals( this.currentPoint ) ) {

					this.lineTo( firstPoint.x, firstPoint.y );

				}

			}

			this.curves.push( curve );

			var lastPoint = curve.getPoint( 1 );
			this.currentPoint.copy( lastPoint );

		},

		copy: function ( source ) {

			CurvePath.prototype.copy.call( this, source );

			this.currentPoint.copy( source.currentPoint );

			return this;

		},

		toJSON: function () {

			var data = CurvePath.prototype.toJSON.call( this );

			data.currentPoint = this.currentPoint.toArray();

			return data;

		},

		fromJSON: function ( json ) {

			CurvePath.prototype.fromJSON.call( this, json );

			this.currentPoint.fromArray( json.currentPoint );

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 1 Create a path.
	// STEP 2 Turn path into shape.
	// STEP 3 ExtrudeGeometry takes in Shape/Shapes
	// STEP 3a - Extract points from each shape, turn to vertices
	// STEP 3b - Triangulate each shape, add faces.

	function Shape( points ) {

		Path.call( this, points );

		this.uuid = _Math.generateUUID();

		this.type = 'Shape';

		this.holes = [];

	}

	Shape.prototype = Object.assign( Object.create( Path.prototype ), {

		constructor: Shape,

		getPointsHoles: function ( divisions ) {

			var holesPts = [];

			for ( var i = 0, l = this.holes.length; i < l; i ++ ) {

				holesPts[ i ] = this.holes[ i ].getPoints( divisions );

			}

			return holesPts;

		},

		// get points of shape and holes (keypoints based on segments parameter)

		extractPoints: function ( divisions ) {

			return {

				shape: this.getPoints( divisions ),
				holes: this.getPointsHoles( divisions )

			};

		},

		copy: function ( source ) {

			Path.prototype.copy.call( this, source );

			this.holes = [];

			for ( var i = 0, l = source.holes.length; i < l; i ++ ) {

				var hole = source.holes[ i ];

				this.holes.push( hole.clone() );

			}

			return this;

		},

		toJSON: function () {

			var data = Path.prototype.toJSON.call( this );

			data.uuid = this.uuid;
			data.holes = [];

			for ( var i = 0, l = this.holes.length; i < l; i ++ ) {

				var hole = this.holes[ i ];
				data.holes.push( hole.toJSON() );

			}

			return data;

		},

		fromJSON: function ( json ) {

			Path.prototype.fromJSON.call( this, json );

			this.uuid = json.uuid;
			this.holes = [];

			for ( var i = 0, l = json.holes.length; i < l; i ++ ) {

				var hole = json.holes[ i ];
				this.holes.push( new Path().fromJSON( hole ) );

			}

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var Earcut = {

		triangulate: function ( data, holeIndices, dim ) {

			dim = dim || 2;

			var hasHoles = holeIndices && holeIndices.length,
				outerLen = hasHoles ? holeIndices[ 0 ] * dim : data.length,
				outerNode = linkedList( data, 0, outerLen, dim, true ),
				triangles = [];

			if ( ! outerNode ) return triangles;

			var minX, minY, maxX, maxY, x, y, invSize;

			if ( hasHoles ) outerNode = eliminateHoles( data, holeIndices, outerNode, dim );

			// if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox

			if ( data.length > 80 * dim ) {

				minX = maxX = data[ 0 ];
				minY = maxY = data[ 1 ];

				for ( var i = dim; i < outerLen; i += dim ) {

					x = data[ i ];
					y = data[ i + 1 ];
					if ( x < minX ) minX = x;
					if ( y < minY ) minY = y;
					if ( x > maxX ) maxX = x;
					if ( y > maxY ) maxY = y;

				}

				// minX, minY and invSize are later used to transform coords into integers for z-order calculation

				invSize = Math.max( maxX - minX, maxY - minY );
				invSize = invSize !== 0 ? 1 / invSize : 0;

			}

			earcutLinked( outerNode, triangles, dim, minX, minY, invSize );

			return triangles;

		}

	};

	// create a circular doubly linked list from polygon points in the specified winding order

	function linkedList( data, start, end, dim, clockwise ) {

		var i, last;

		if ( clockwise === ( signedArea( data, start, end, dim ) > 0 ) ) {

			for ( i = start; i < end; i += dim ) last = insertNode( i, data[ i ], data[ i + 1 ], last );

		} else {

			for ( i = end - dim; i >= start; i -= dim ) last = insertNode( i, data[ i ], data[ i + 1 ], last );

		}

		if ( last && equals( last, last.next ) ) {

			removeNode( last );
			last = last.next;

		}

		return last;

	}

	// eliminate colinear or duplicate points

	function filterPoints( start, end ) {

		if ( ! start ) return start;
		if ( ! end ) end = start;

		var p = start, again;

		do {

			again = false;

			if ( ! p.steiner && ( equals( p, p.next ) || area( p.prev, p, p.next ) === 0 ) ) {

				removeNode( p );
				p = end = p.prev;
				if ( p === p.next ) break;
				again = true;

			} else {

				p = p.next;

			}

		} while ( again || p !== end );

		return end;

	}

	// main ear slicing loop which triangulates a polygon (given as a linked list)

	function earcutLinked( ear, triangles, dim, minX, minY, invSize, pass ) {

		if ( ! ear ) return;

		// interlink polygon nodes in z-order

		if ( ! pass && invSize ) indexCurve( ear, minX, minY, invSize );

		var stop = ear, prev, next;

		// iterate through ears, slicing them one by one

		while ( ear.prev !== ear.next ) {

			prev = ear.prev;
			next = ear.next;

			if ( invSize ? isEarHashed( ear, minX, minY, invSize ) : isEar( ear ) ) {

				// cut off the triangle
				triangles.push( prev.i / dim );
				triangles.push( ear.i / dim );
				triangles.push( next.i / dim );

				removeNode( ear );

				// skipping the next vertice leads to less sliver triangles
				ear = next.next;
				stop = next.next;

				continue;

			}

			ear = next;

			// if we looped through the whole remaining polygon and can't find any more ears

			if ( ear === stop ) {

				// try filtering points and slicing again

				if ( ! pass ) {

					earcutLinked( filterPoints( ear ), triangles, dim, minX, minY, invSize, 1 );

					// if this didn't work, try curing all small self-intersections locally

				} else if ( pass === 1 ) {

					ear = cureLocalIntersections( ear, triangles, dim );
					earcutLinked( ear, triangles, dim, minX, minY, invSize, 2 );

					// as a last resort, try splitting the remaining polygon into two

				} else if ( pass === 2 ) {

					splitEarcut( ear, triangles, dim, minX, minY, invSize );

				}

				break;

			}

		}

	}

	// check whether a polygon node forms a valid ear with adjacent nodes

	function isEar( ear ) {

		var a = ear.prev,
			b = ear,
			c = ear.next;

		if ( area( a, b, c ) >= 0 ) return false; // reflex, can't be an ear

		// now make sure we don't have other points inside the potential ear
		var p = ear.next.next;

		while ( p !== ear.prev ) {

			if ( pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) && area( p.prev, p, p.next ) >= 0 ) {

				return false;

			}

			p = p.next;

		}

		return true;

	}

	function isEarHashed( ear, minX, minY, invSize ) {

		var a = ear.prev,
			b = ear,
			c = ear.next;

		if ( area( a, b, c ) >= 0 ) return false; // reflex, can't be an ear

		// triangle bbox; min & max are calculated like this for speed

		var minTX = a.x < b.x ? ( a.x < c.x ? a.x : c.x ) : ( b.x < c.x ? b.x : c.x ),
			minTY = a.y < b.y ? ( a.y < c.y ? a.y : c.y ) : ( b.y < c.y ? b.y : c.y ),
			maxTX = a.x > b.x ? ( a.x > c.x ? a.x : c.x ) : ( b.x > c.x ? b.x : c.x ),
			maxTY = a.y > b.y ? ( a.y > c.y ? a.y : c.y ) : ( b.y > c.y ? b.y : c.y );

		// z-order range for the current triangle bbox;

		var minZ = zOrder( minTX, minTY, minX, minY, invSize ),
			maxZ = zOrder( maxTX, maxTY, minX, minY, invSize );

		// first look for points inside the triangle in increasing z-order

		var p = ear.nextZ;

		while ( p && p.z <= maxZ ) {

			if ( p !== ear.prev && p !== ear.next &&
					pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) &&
					area( p.prev, p, p.next ) >= 0 ) return false;
			p = p.nextZ;

		}

		// then look for points in decreasing z-order

		p = ear.prevZ;

		while ( p && p.z >= minZ ) {

			if ( p !== ear.prev && p !== ear.next &&
					pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) &&
					area( p.prev, p, p.next ) >= 0 ) return false;

			p = p.prevZ;

		}

		return true;

	}

	// go through all polygon nodes and cure small local self-intersections

	function cureLocalIntersections( start, triangles, dim ) {

		var p = start;

		do {

			var a = p.prev, b = p.next.next;

			if ( ! equals( a, b ) && intersects( a, p, p.next, b ) && locallyInside( a, b ) && locallyInside( b, a ) ) {

				triangles.push( a.i / dim );
				triangles.push( p.i / dim );
				triangles.push( b.i / dim );

				// remove two nodes involved

				removeNode( p );
				removeNode( p.next );

				p = start = b;

			}

			p = p.next;

		} while ( p !== start );

		return p;

	}

	// try splitting polygon into two and triangulate them independently

	function splitEarcut( start, triangles, dim, minX, minY, invSize ) {

		// look for a valid diagonal that divides the polygon into two

		var a = start;

		do {

			var b = a.next.next;

			while ( b !== a.prev ) {

				if ( a.i !== b.i && isValidDiagonal( a, b ) ) {

					// split the polygon in two by the diagonal

					var c = splitPolygon( a, b );

					// filter colinear points around the cuts

					a = filterPoints( a, a.next );
					c = filterPoints( c, c.next );

					// run earcut on each half

					earcutLinked( a, triangles, dim, minX, minY, invSize );
					earcutLinked( c, triangles, dim, minX, minY, invSize );
					return;

				}

				b = b.next;

			}

			a = a.next;

		} while ( a !== start );

	}

	// link every hole into the outer loop, producing a single-ring polygon without holes

	function eliminateHoles( data, holeIndices, outerNode, dim ) {

		var queue = [], i, len, start, end, list;

		for ( i = 0, len = holeIndices.length; i < len; i ++ ) {

			start = holeIndices[ i ] * dim;
			end = i < len - 1 ? holeIndices[ i + 1 ] * dim : data.length;
			list = linkedList( data, start, end, dim, false );
			if ( list === list.next ) list.steiner = true;
			queue.push( getLeftmost( list ) );

		}

		queue.sort( compareX );

		// process holes from left to right

		for ( i = 0; i < queue.length; i ++ ) {

			eliminateHole( queue[ i ], outerNode );
			outerNode = filterPoints( outerNode, outerNode.next );

		}

		return outerNode;

	}

	function compareX( a, b ) {

		return a.x - b.x;

	}

	// find a bridge between vertices that connects hole with an outer ring and and link it

	function eliminateHole( hole, outerNode ) {

		outerNode = findHoleBridge( hole, outerNode );

		if ( outerNode ) {

			var b = splitPolygon( outerNode, hole );

			filterPoints( b, b.next );

		}

	}

	// David Eberly's algorithm for finding a bridge between hole and outer polygon

	function findHoleBridge( hole, outerNode ) {

		var p = outerNode,
			hx = hole.x,
			hy = hole.y,
			qx = - Infinity,
			m;

		// find a segment intersected by a ray from the hole's leftmost point to the left;
		// segment's endpoint with lesser x will be potential connection point

		do {

			if ( hy <= p.y && hy >= p.next.y && p.next.y !== p.y ) {

				var x = p.x + ( hy - p.y ) * ( p.next.x - p.x ) / ( p.next.y - p.y );

				if ( x <= hx && x > qx ) {

					qx = x;

					if ( x === hx ) {

						if ( hy === p.y ) return p;
						if ( hy === p.next.y ) return p.next;

					}

					m = p.x < p.next.x ? p : p.next;

				}

			}

			p = p.next;

		} while ( p !== outerNode );

		if ( ! m ) return null;

		if ( hx === qx ) return m.prev; // hole touches outer segment; pick lower endpoint

		// look for points inside the triangle of hole point, segment intersection and endpoint;
		// if there are no points found, we have a valid connection;
		// otherwise choose the point of the minimum angle with the ray as connection point

		var stop = m,
			mx = m.x,
			my = m.y,
			tanMin = Infinity,
			tan;

		p = m.next;

		while ( p !== stop ) {

			if ( hx >= p.x && p.x >= mx && hx !== p.x &&
							pointInTriangle( hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y ) ) {

				tan = Math.abs( hy - p.y ) / ( hx - p.x ); // tangential

				if ( ( tan < tanMin || ( tan === tanMin && p.x > m.x ) ) && locallyInside( p, hole ) ) {

					m = p;
					tanMin = tan;

				}

			}

			p = p.next;

		}

		return m;

	}

	// interlink polygon nodes in z-order

	function indexCurve( start, minX, minY, invSize ) {

		var p = start;

		do {

			if ( p.z === null ) p.z = zOrder( p.x, p.y, minX, minY, invSize );
			p.prevZ = p.prev;
			p.nextZ = p.next;
			p = p.next;

		} while ( p !== start );

		p.prevZ.nextZ = null;
		p.prevZ = null;

		sortLinked( p );

	}

	// Simon Tatham's linked list merge sort algorithm
	// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html

	function sortLinked( list ) {

		var i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;

		do {

			p = list;
			list = null;
			tail = null;
			numMerges = 0;

			while ( p ) {

				numMerges ++;
				q = p;
				pSize = 0;

				for ( i = 0; i < inSize; i ++ ) {

					pSize ++;
					q = q.nextZ;
					if ( ! q ) break;

				}

				qSize = inSize;

				while ( pSize > 0 || ( qSize > 0 && q ) ) {

					if ( pSize !== 0 && ( qSize === 0 || ! q || p.z <= q.z ) ) {

						e = p;
						p = p.nextZ;
						pSize --;

					} else {

						e = q;
						q = q.nextZ;
						qSize --;

					}

					if ( tail ) tail.nextZ = e;
					else list = e;

					e.prevZ = tail;
					tail = e;

				}

				p = q;

			}

			tail.nextZ = null;
			inSize *= 2;

		} while ( numMerges > 1 );

		return list;

	}

	// z-order of a point given coords and inverse of the longer side of data bbox

	function zOrder( x, y, minX, minY, invSize ) {

		// coords are transformed into non-negative 15-bit integer range

		x = 32767 * ( x - minX ) * invSize;
		y = 32767 * ( y - minY ) * invSize;

		x = ( x | ( x << 8 ) ) & 0x00FF00FF;
		x = ( x | ( x << 4 ) ) & 0x0F0F0F0F;
		x = ( x | ( x << 2 ) ) & 0x33333333;
		x = ( x | ( x << 1 ) ) & 0x55555555;

		y = ( y | ( y << 8 ) ) & 0x00FF00FF;
		y = ( y | ( y << 4 ) ) & 0x0F0F0F0F;
		y = ( y | ( y << 2 ) ) & 0x33333333;
		y = ( y | ( y << 1 ) ) & 0x55555555;

		return x | ( y << 1 );

	}

	// find the leftmost node of a polygon ring

	function getLeftmost( start ) {

		var p = start, leftmost = start;

		do {

			if ( p.x < leftmost.x ) leftmost = p;
			p = p.next;

		} while ( p !== start );

		return leftmost;

	}

	// check if a point lies within a convex triangle

	function pointInTriangle( ax, ay, bx, by, cx, cy, px, py ) {

		return ( cx - px ) * ( ay - py ) - ( ax - px ) * ( cy - py ) >= 0 &&
		 ( ax - px ) * ( by - py ) - ( bx - px ) * ( ay - py ) >= 0 &&
		 ( bx - px ) * ( cy - py ) - ( cx - px ) * ( by - py ) >= 0;

	}

	// check if a diagonal between two polygon nodes is valid (lies in polygon interior)

	function isValidDiagonal( a, b ) {

		return a.next.i !== b.i && a.prev.i !== b.i && ! intersectsPolygon( a, b ) &&
			locallyInside( a, b ) && locallyInside( b, a ) && middleInside( a, b );

	}

	// signed area of a triangle

	function area( p, q, r ) {

		return ( q.y - p.y ) * ( r.x - q.x ) - ( q.x - p.x ) * ( r.y - q.y );

	}

	// check if two points are equal

	function equals( p1, p2 ) {

		return p1.x === p2.x && p1.y === p2.y;

	}

	// check if two segments intersect

	function intersects( p1, q1, p2, q2 ) {

		if ( ( equals( p1, q1 ) && equals( p2, q2 ) ) ||
				( equals( p1, q2 ) && equals( p2, q1 ) ) ) return true;

		return area( p1, q1, p2 ) > 0 !== area( p1, q1, q2 ) > 0 &&
					 area( p2, q2, p1 ) > 0 !== area( p2, q2, q1 ) > 0;

	}

	// check if a polygon diagonal intersects any polygon segments

	function intersectsPolygon( a, b ) {

		var p = a;

		do {

			if ( p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
							intersects( p, p.next, a, b ) ) {

				return true;

			}

			p = p.next;

		} while ( p !== a );

		return false;

	}

	// check if a polygon diagonal is locally inside the polygon

	function locallyInside( a, b ) {

		return area( a.prev, a, a.next ) < 0 ?
			area( a, b, a.next ) >= 0 && area( a, a.prev, b ) >= 0 :
			area( a, b, a.prev ) < 0 || area( a, a.next, b ) < 0;

	}

	// check if the middle point of a polygon diagonal is inside the polygon

	function middleInside( a, b ) {

		var p = a,
			inside = false,
			px = ( a.x + b.x ) / 2,
			py = ( a.y + b.y ) / 2;

		do {

			if ( ( ( p.y > py ) !== ( p.next.y > py ) ) && p.next.y !== p.y &&
							( px < ( p.next.x - p.x ) * ( py - p.y ) / ( p.next.y - p.y ) + p.x ) ) {

				inside = ! inside;

			}

			p = p.next;

		} while ( p !== a );

		return inside;

	}

	// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
	// if one belongs to the outer ring and another to a hole, it merges it into a single ring

	function splitPolygon( a, b ) {

		var a2 = new Node( a.i, a.x, a.y ),
			b2 = new Node( b.i, b.x, b.y ),
			an = a.next,
			bp = b.prev;

		a.next = b;
		b.prev = a;

		a2.next = an;
		an.prev = a2;

		b2.next = a2;
		a2.prev = b2;

		bp.next = b2;
		b2.prev = bp;

		return b2;

	}

	// create a node and optionally link it with previous one (in a circular doubly linked list)

	function insertNode( i, x, y, last ) {

		var p = new Node( i, x, y );

		if ( ! last ) {

			p.prev = p;
			p.next = p;

		} else {

			p.next = last.next;
			p.prev = last;
			last.next.prev = p;
			last.next = p;

		}

		return p;

	}

	function removeNode( p ) {

		p.next.prev = p.prev;
		p.prev.next = p.next;

		if ( p.prevZ ) p.prevZ.nextZ = p.nextZ;
		if ( p.nextZ ) p.nextZ.prevZ = p.prevZ;

	}

	function Node( i, x, y ) {

		// vertice index in coordinates array
		this.i = i;

		// vertex coordinates
		this.x = x;
		this.y = y;

		// previous and next vertice nodes in a polygon ring
		this.prev = null;
		this.next = null;

		// z-order curve value
		this.z = null;

		// previous and next nodes in z-order
		this.prevZ = null;
		this.nextZ = null;

		// indicates whether this is a steiner point
		this.steiner = false;

	}

	function signedArea( data, start, end, dim ) {

		var sum = 0;

		for ( var i = start, j = end - dim; i < end; i += dim ) {

			sum += ( data[ j ] - data[ i ] ) * ( data[ i + 1 ] + data[ j + 1 ] );
			j = i;

		}

		return sum;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ShapeUtils = {

		// calculate area of the contour polygon

		area: function ( contour ) {

			var n = contour.length;
			var a = 0.0;

			for ( var p = n - 1, q = 0; q < n; p = q ++ ) {

				a += contour[ p ].x * contour[ q ].y - contour[ q ].x * contour[ p ].y;

			}

			return a * 0.5;

		},

		isClockWise: function ( pts ) {

			return ShapeUtils.area( pts ) < 0;

		},

		triangulateShape: function ( contour, holes ) {

			var vertices = []; // flat array of vertices like [ x0,y0, x1,y1, x2,y2, ... ]
			var holeIndices = []; // array of hole indices
			var faces = []; // final array of vertex indices like [ [ a,b,d ], [ b,c,d ] ]

			removeDupEndPts( contour );
			addContour( vertices, contour );

			//

			var holeIndex = contour.length;

			holes.forEach( removeDupEndPts );

			for ( var i = 0; i < holes.length; i ++ ) {

				holeIndices.push( holeIndex );
				holeIndex += holes[ i ].length;
				addContour( vertices, holes[ i ] );

			}

			//

			var triangles = Earcut.triangulate( vertices, holeIndices );

			//

			for ( var i = 0; i < triangles.length; i += 3 ) {

				faces.push( triangles.slice( i, i + 3 ) );

			}

			return faces;

		}

	};

	function removeDupEndPts( points ) {

		var l = points.length;

		if ( l > 2 && points[ l - 1 ].equals( points[ 0 ] ) ) {

			points.pop();

		}

	}

	function addContour( vertices, contour ) {

		for ( var i = 0; i < contour.length; i ++ ) {

			vertices.push( contour[ i ].x );
			vertices.push( contour[ i ].y );

		}

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function ShapePath() {

		this.type = 'ShapePath';

		this.color = new Color();

		this.subPaths = [];
		this.currentPath = null;

	}

	Object.assign( ShapePath.prototype, {

		moveTo: function ( x, y ) {

			this.currentPath = new Path();
			this.subPaths.push( this.currentPath );
			this.currentPath.moveTo( x, y );

		},

		lineTo: function ( x, y ) {

			this.currentPath.lineTo( x, y );

		},

		quadraticCurveTo: function ( aCPx, aCPy, aX, aY ) {

			this.currentPath.quadraticCurveTo( aCPx, aCPy, aX, aY );

		},

		bezierCurveTo: function ( aCP1x, aCP1y, aCP2x, aCP2y, aX, aY ) {

			this.currentPath.bezierCurveTo( aCP1x, aCP1y, aCP2x, aCP2y, aX, aY );

		},

		splineThru: function ( pts ) {

			this.currentPath.splineThru( pts );

		},

		toShapes: function ( isCCW, noHoles ) {

			function toShapesNoHoles( inSubpaths ) {

				var shapes = [];

				for ( var i = 0, l = inSubpaths.length; i < l; i ++ ) {

					var tmpPath = inSubpaths[ i ];

					var tmpShape = new Shape();
					tmpShape.curves = tmpPath.curves;

					shapes.push( tmpShape );

				}

				return shapes;

			}

			function isPointInsidePolygon( inPt, inPolygon ) {

				var polyLen = inPolygon.length;

				// inPt on polygon contour => immediate success    or
				// toggling of inside/outside at every single! intersection point of an edge
				//  with the horizontal line through inPt, left of inPt
				//  not counting lowerY endpoints of edges and whole edges on that line
				var inside = false;
				for ( var p = polyLen - 1, q = 0; q < polyLen; p = q ++ ) {

					var edgeLowPt = inPolygon[ p ];
					var edgeHighPt = inPolygon[ q ];

					var edgeDx = edgeHighPt.x - edgeLowPt.x;
					var edgeDy = edgeHighPt.y - edgeLowPt.y;

					if ( Math.abs( edgeDy ) > Number.EPSILON ) {

						// not parallel
						if ( edgeDy < 0 ) {

							edgeLowPt = inPolygon[ q ]; edgeDx = - edgeDx;
							edgeHighPt = inPolygon[ p ]; edgeDy = - edgeDy;

						}
						if ( ( inPt.y < edgeLowPt.y ) || ( inPt.y > edgeHighPt.y ) ) 		continue;

						if ( inPt.y === edgeLowPt.y ) {

							if ( inPt.x === edgeLowPt.x )		return	true;		// inPt is on contour ?
							// continue;				// no intersection or edgeLowPt => doesn't count !!!

						} else {

							var perpEdge = edgeDy * ( inPt.x - edgeLowPt.x ) - edgeDx * ( inPt.y - edgeLowPt.y );
							if ( perpEdge === 0 )				return	true;		// inPt is on contour ?
							if ( perpEdge < 0 ) 				continue;
							inside = ! inside;		// true intersection left of inPt

						}

					} else {

						// parallel or collinear
						if ( inPt.y !== edgeLowPt.y ) 		continue;			// parallel
						// edge lies on the same horizontal line as inPt
						if ( ( ( edgeHighPt.x <= inPt.x ) && ( inPt.x <= edgeLowPt.x ) ) ||
							 ( ( edgeLowPt.x <= inPt.x ) && ( inPt.x <= edgeHighPt.x ) ) )		return	true;	// inPt: Point on contour !
						// continue;

					}

				}

				return	inside;

			}

			var isClockWise = ShapeUtils.isClockWise;

			var subPaths = this.subPaths;
			if ( subPaths.length === 0 ) return [];

			if ( noHoles === true )	return	toShapesNoHoles( subPaths );
			var solid, tmpPath, tmpShape, shapes = [];

			if ( subPaths.length === 1 ) {

				tmpPath = subPaths[ 0 ];
				tmpShape = new Shape();
				tmpShape.curves = tmpPath.curves;
				shapes.push( tmpShape );
				return shapes;

			}

			var holesFirst = ! isClockWise( subPaths[ 0 ].getPoints() );
			holesFirst = isCCW ? ! holesFirst : holesFirst;

			// console.log("Holes first", holesFirst);

			var betterShapeHoles = [];
			var newShapes = [];
			var newShapeHoles = [];
			var mainIdx = 0;
			var tmpPoints;

			newShapes[ mainIdx ] = undefined;
			newShapeHoles[ mainIdx ] = [];

			for ( var i = 0, l = subPaths.length; i < l; i ++ ) {

				tmpPath = subPaths[ i ];
				tmpPoints = tmpPath.getPoints();
				solid = isClockWise( tmpPoints );
				solid = isCCW ? ! solid : solid;

				if ( solid ) {

					if ( ( ! holesFirst ) && ( newShapes[ mainIdx ] ) )	mainIdx ++;

					newShapes[ mainIdx ] = { s: new Shape(), p: tmpPoints };
					newShapes[ mainIdx ].s.curves = tmpPath.curves;

					if ( holesFirst )	mainIdx ++;
					newShapeHoles[ mainIdx ] = [];

					//console.log('cw', i);

				} else {

					newShapeHoles[ mainIdx ].push( { h: tmpPath, p: tmpPoints[ 0 ] } );

					//console.log('ccw', i);

				}

			}

			// only Holes? -> probably all Shapes with wrong orientation
			if ( ! newShapes[ 0 ] )	return	toShapesNoHoles( subPaths );
			if ( newShapes.length > 1 ) {

				var ambiguous = false;
				var toChange = [];

				for ( var sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx ++ ) {

					betterShapeHoles[ sIdx ] = [];

				}

				for ( var sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx ++ ) {

					var sho = newShapeHoles[ sIdx ];

					for ( var hIdx = 0; hIdx < sho.length; hIdx ++ ) {

						var ho = sho[ hIdx ];
						var hole_unassigned = true;

						for ( var s2Idx = 0; s2Idx < newShapes.length; s2Idx ++ ) {

							if ( isPointInsidePolygon( ho.p, newShapes[ s2Idx ].p ) ) {

								if ( sIdx !== s2Idx )	toChange.push( { froms: sIdx, tos: s2Idx, hole: hIdx } );
								if ( hole_unassigned ) {

									hole_unassigned = false;
									betterShapeHoles[ s2Idx ].push( ho );

								} else {

									ambiguous = true;

								}

							}

						}
						if ( hole_unassigned ) {

							betterShapeHoles[ sIdx ].push( ho );

						}

					}

				}
				// console.log("ambiguous: ", ambiguous);
				if ( toChange.length > 0 ) {

					// console.log("to change: ", toChange);
					if ( ! ambiguous )	newShapeHoles = betterShapeHoles;

				}

			}

			var tmpHoles;

			for ( var i = 0, il = newShapes.length; i < il; i ++ ) {

				tmpShape = newShapes[ i ].s;
				shapes.push( tmpShape );
				tmpHoles = newShapeHoles[ i ];

				for ( var j = 0, jl = tmpHoles.length; j < jl; j ++ ) {

					tmpShape.holes.push( tmpHoles[ j ].h );

				}

			}

			//console.log("shape", shapes);

			return shapes;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Matrix3() {

		this.elements = [

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'Matrix3: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	Object.assign( Matrix3.prototype, {

		isMatrix3: true,

		set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

			var te = this.elements;

			te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
			te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
			te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

			return this;

		},

		identity: function () {

			this.set(

				1, 0, 0,
				0, 1, 0,
				0, 0, 1

			);

			return this;

		},

		clone: function () {

			return new this.constructor().fromArray( this.elements );

		},

		copy: function ( m ) {

			var te = this.elements;
			var me = m.elements;

			te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
			te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
			te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

			return this;

		},

		setFromMatrix4: function ( m ) {

			var me = m.elements;

			this.set(

				me[ 0 ], me[ 4 ], me[ 8 ],
				me[ 1 ], me[ 5 ], me[ 9 ],
				me[ 2 ], me[ 6 ], me[ 10 ]

			);

			return this;

		},

		applyToBufferAttribute: function () {

			var v1 = new Vector3();

			return function applyToBufferAttribute( attribute ) {

				for ( var i = 0, l = attribute.count; i < l; i ++ ) {

					v1.x = attribute.getX( i );
					v1.y = attribute.getY( i );
					v1.z = attribute.getZ( i );

					v1.applyMatrix3( this );

					attribute.setXYZ( i, v1.x, v1.y, v1.z );

				}

				return attribute;

			};

		}(),

		multiply: function ( m ) {

			return this.multiplyMatrices( this, m );

		},

		premultiply: function ( m ) {

			return this.multiplyMatrices( m, this );

		},

		multiplyMatrices: function ( a, b ) {

			var ae = a.elements;
			var be = b.elements;
			var te = this.elements;

			var a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
			var a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
			var a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

			var b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
			var b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
			var b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

			te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
			te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
			te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

			te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
			te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
			te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

			te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
			te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
			te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

			return this;

		},

		multiplyScalar: function ( s ) {

			var te = this.elements;

			te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
			te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
			te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

			return this;

		},

		determinant: function () {

			var te = this.elements;

			var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
				d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
				g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

			return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

		},

		getInverse: function ( matrix, throwOnDegenerate ) {

			if ( matrix && matrix.isMatrix4 ) {

				console.error( "Matrix3: .getInverse() no longer takes a Matrix4 argument." );

			}

			var me = matrix.elements,
				te = this.elements,

				n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ],
				n12 = me[ 3 ], n22 = me[ 4 ], n32 = me[ 5 ],
				n13 = me[ 6 ], n23 = me[ 7 ], n33 = me[ 8 ],

				t11 = n33 * n22 - n32 * n23,
				t12 = n32 * n13 - n33 * n12,
				t13 = n23 * n12 - n22 * n13,

				det = n11 * t11 + n21 * t12 + n31 * t13;

			if ( det === 0 ) {

				var msg = "Matrix3: .getInverse() can't invert matrix, determinant is 0";

				if ( throwOnDegenerate === true ) {

					throw new Error( msg );

				} else {

					console.warn( msg );

				}

				return this.identity();

			}

			var detInv = 1 / det;

			te[ 0 ] = t11 * detInv;
			te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
			te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

			te[ 3 ] = t12 * detInv;
			te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
			te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

			te[ 6 ] = t13 * detInv;
			te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
			te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

			return this;

		},

		transpose: function () {

			var tmp, m = this.elements;

			tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
			tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
			tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

			return this;

		},

		getNormalMatrix: function ( matrix4 ) {

			return this.setFromMatrix4( matrix4 ).getInverse( this ).transpose();

		},

		transposeIntoArray: function ( r ) {

			var m = this.elements;

			r[ 0 ] = m[ 0 ];
			r[ 1 ] = m[ 3 ];
			r[ 2 ] = m[ 6 ];
			r[ 3 ] = m[ 1 ];
			r[ 4 ] = m[ 4 ];
			r[ 5 ] = m[ 7 ];
			r[ 6 ] = m[ 2 ];
			r[ 7 ] = m[ 5 ];
			r[ 8 ] = m[ 8 ];

			return this;

		},

		setUvTransform: function ( tx, ty, sx, sy, rotation, cx, cy ) {

			var c = Math.cos( rotation );
			var s = Math.sin( rotation );

			this.set(
				sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,
				- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,
				0, 0, 1
			);

		},

		scale: function ( sx, sy ) {

			var te = this.elements;

			te[ 0 ] *= sx; te[ 3 ] *= sx; te[ 6 ] *= sx;
			te[ 1 ] *= sy; te[ 4 ] *= sy; te[ 7 ] *= sy;

			return this;

		},

		rotate: function ( theta ) {

			var c = Math.cos( theta );
			var s = Math.sin( theta );

			var te = this.elements;

			var a11 = te[ 0 ], a12 = te[ 3 ], a13 = te[ 6 ];
			var a21 = te[ 1 ], a22 = te[ 4 ], a23 = te[ 7 ];

			te[ 0 ] = c * a11 + s * a21;
			te[ 3 ] = c * a12 + s * a22;
			te[ 6 ] = c * a13 + s * a23;

			te[ 1 ] = - s * a11 + c * a21;
			te[ 4 ] = - s * a12 + c * a22;
			te[ 7 ] = - s * a13 + c * a23;

			return this;

		},

		translate: function ( tx, ty ) {

			var te = this.elements;

			te[ 0 ] += tx * te[ 2 ]; te[ 3 ] += tx * te[ 5 ]; te[ 6 ] += tx * te[ 8 ];
			te[ 1 ] += ty * te[ 2 ]; te[ 4 ] += ty * te[ 5 ]; te[ 7 ] += ty * te[ 8 ];

			return this;

		},

		equals: function ( matrix ) {

			var te = this.elements;
			var me = matrix.elements;

			for ( var i = 0; i < 9; i ++ ) {

				if ( te[ i ] !== me[ i ] ) return false;

			}

			return true;

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			for ( var i = 0; i < 9; i ++ ) {

				this.elements[ i ] = array[ i + offset ];

			}

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			var te = this.elements;

			array[ offset ] = te[ 0 ];
			array[ offset + 1 ] = te[ 1 ];
			array[ offset + 2 ] = te[ 2 ];

			array[ offset + 3 ] = te[ 3 ];
			array[ offset + 4 ] = te[ 4 ];
			array[ offset + 5 ] = te[ 5 ];

			array[ offset + 6 ] = te[ 6 ];
			array[ offset + 7 ] = te[ 7 ];
			array[ offset + 8 ] = te[ 8 ];

			return array;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var SVGLoader = function ( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	};

	SVGLoader.prototype = {

		constructor: SVGLoader,

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var loader = new FileLoader( scope.manager );
			loader.setPath( scope.path );
			loader.load( url, function ( text ) {

				onLoad( scope.parse( text ) );

			}, onProgress, onError );

		},

		setPath: function ( value ) {

			this.path = value;
			return this;

		},

		parse: function ( text ) {

			function parseNode( node, style ) {

				if ( node.nodeType !== 1 ) return;

				var transform = getNodeTransform( node );

				var path = null;

				switch ( node.nodeName ) {

					case 'svg':
						break;

					case 'g':
						style = parseStyle( node, style );
						break;

					case 'path':
						style = parseStyle( node, style );
						if ( node.hasAttribute( 'd' ) && isVisible( style ) ) path = parsePathNode( node, style );
						break;

					case 'rect':
						style = parseStyle( node, style );
						if ( isVisible( style ) ) path = parseRectNode( node, style );
						break;

					case 'polygon':
						style = parseStyle( node, style );
						if ( isVisible( style ) ) path = parsePolygonNode( node, style );
						break;

					case 'polyline':
						style = parseStyle( node, style );
						if ( isVisible( style ) ) path = parsePolylineNode( node, style );
						break;

					case 'circle':
						style = parseStyle( node, style );
						if ( isVisible( style ) ) path = parseCircleNode( node, style );
						break;

					case 'ellipse':
						style = parseStyle( node, style );
						if ( isVisible( style ) ) path = parseEllipseNode( node, style );
						break;

					case 'line':
						style = parseStyle( node, style );
						if ( isVisible( style ) ) path = parseLineNode( node, style );
						break;

					default:
						console.log( node );

				}

				if ( path ) {

					transformPath( path, currentTransform );

					paths.push( path );

				}

				var nodes = node.childNodes;

				for ( var i = 0; i < nodes.length; i ++ ) {

					parseNode( nodes[ i ], style );

				}

				if ( transform ) {

					currentTransform.copy( transformStack.pop() );

				}

			}

			function parsePathNode( node, style ) {

				var path = new ShapePath();
				path.color.setStyle( style.fill );

				var point = new Vector2();
				var control = new Vector2();

				var firstPoint = new Vector2();
				var isFirstPoint = true;
				var doSetFirstPoint = false;

				var d = node.getAttribute( 'd' );

				// console.log( d );

				var commands = d.match( /[a-df-z][^a-df-z]*/ig );

				for ( var i = 0, l = commands.length; i < l; i ++ ) {

					var command = commands[ i ];

					var type = command.charAt( 0 );
					var data = command.substr( 1 ).trim();

					if ( isFirstPoint === true ) {
						doSetFirstPoint = true;
						isFirstPoint = false;
					}

					switch ( type ) {

						case 'M':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
								point.x = numbers[ j + 0 ];
								point.y = numbers[ j + 1 ];
								control.x = point.x;
								control.y = point.y;
								if ( j === 0 ) {
									path.moveTo( point.x, point.y );
								} else {
									path.lineTo( point.x, point.y );
								}
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'H':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j ++ ) {
								point.x = numbers[ j ];
								control.x = point.x;
								control.y = point.y;
								path.lineTo( point.x, point.y );
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'V':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j ++ ) {
								point.y = numbers[ j ];
								control.x = point.x;
								control.y = point.y;
								path.lineTo( point.x, point.y );
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'L':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
								point.x = numbers[ j + 0 ];
								point.y = numbers[ j + 1 ];
								control.x = point.x;
								control.y = point.y;
								path.lineTo( point.x, point.y );
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'C':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 6 ) {
								path.bezierCurveTo(
									numbers[ j + 0 ],
									numbers[ j + 1 ],
									numbers[ j + 2 ],
									numbers[ j + 3 ],
									numbers[ j + 4 ],
									numbers[ j + 5 ]
								);
								control.x = numbers[ j + 2 ];
								control.y = numbers[ j + 3 ];
								point.x = numbers[ j + 4 ];
								point.y = numbers[ j + 5 ];
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'S':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 4 ) {
								path.bezierCurveTo(
									getReflection( point.x, control.x ),
									getReflection( point.y, control.y ),
									numbers[ j + 0 ],
									numbers[ j + 1 ],
									numbers[ j + 2 ],
									numbers[ j + 3 ]
								);
								control.x = numbers[ j + 0 ];
								control.y = numbers[ j + 1 ];
								point.x = numbers[ j + 2 ];
								point.y = numbers[ j + 3 ];
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'Q':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 4 ) {
								path.quadraticCurveTo(
									numbers[ j + 0 ],
									numbers[ j + 1 ],
									numbers[ j + 2 ],
									numbers[ j + 3 ]
								);
								control.x = numbers[ j + 0 ];
								control.y = numbers[ j + 1 ];
								point.x = numbers[ j + 2 ];
								point.y = numbers[ j + 3 ];
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'T':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
								var rx = getReflection( point.x, control.x );
								var ry = getReflection( point.y, control.y );
								path.quadraticCurveTo(
									rx,
									ry,
									numbers[ j + 0 ],
									numbers[ j + 1 ]
								);
								control.x = rx;
								control.y = ry;
								point.x = numbers[ j + 0 ];
								point.y = numbers[ j + 1 ];
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'A':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 7 ) {
								var start = point.clone();
								point.x = numbers[ j + 5 ];
								point.y = numbers[ j + 6 ];
								control.x = point.x;
								control.y = point.y;
								parseArcCommand(
									path, numbers[ j ], numbers[ j + 1 ], numbers[ j + 2 ], numbers[ j + 3 ], numbers[ j + 4 ], start, point
								);
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						//

						case 'm':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
								point.x += numbers[ j + 0 ];
								point.y += numbers[ j + 1 ];
								control.x = point.x;
								control.y = point.y;
								if ( j === 0 ) {
									path.moveTo( point.x, point.y );
								} else {
									path.lineTo( point.x, point.y );
								}
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'h':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j ++ ) {
								point.x += numbers[ j ];
								control.x = point.x;
								control.y = point.y;
								path.lineTo( point.x, point.y );
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'v':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j ++ ) {
								point.y += numbers[ j ];
								control.x = point.x;
								control.y = point.y;
								path.lineTo( point.x, point.y );
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'l':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
								point.x += numbers[ j + 0 ];
								point.y += numbers[ j + 1 ];
								control.x = point.x;
								control.y = point.y;
								path.lineTo( point.x, point.y );
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'c':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 6 ) {
								path.bezierCurveTo(
									point.x + numbers[ j + 0 ],
									point.y + numbers[ j + 1 ],
									point.x + numbers[ j + 2 ],
									point.y + numbers[ j + 3 ],
									point.x + numbers[ j + 4 ],
									point.y + numbers[ j + 5 ]
								);
								control.x = point.x + numbers[ j + 2 ];
								control.y = point.y + numbers[ j + 3 ];
								point.x += numbers[ j + 4 ];
								point.y += numbers[ j + 5 ];
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 's':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 4 ) {
								path.bezierCurveTo(
									getReflection( point.x, control.x ),
									getReflection( point.y, control.y ),
									point.x + numbers[ j + 0 ],
									point.y + numbers[ j + 1 ],
									point.x + numbers[ j + 2 ],
									point.y + numbers[ j + 3 ]
								);
								control.x = point.x + numbers[ j + 0 ];
								control.y = point.y + numbers[ j + 1 ];
								point.x += numbers[ j + 2 ];
								point.y += numbers[ j + 3 ];
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'q':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 4 ) {
								path.quadraticCurveTo(
									point.x + numbers[ j + 0 ],
									point.y + numbers[ j + 1 ],
									point.x + numbers[ j + 2 ],
									point.y + numbers[ j + 3 ]
								);
								control.x = point.x + numbers[ j + 0 ];
								control.y = point.y + numbers[ j + 1 ];
								point.x += numbers[ j + 2 ];
								point.y += numbers[ j + 3 ];
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 't':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
								var rx = getReflection( point.x, control.x );
								var ry = getReflection( point.y, control.y );
								path.quadraticCurveTo(
									rx,
									ry,
									point.x + numbers[ j + 0 ],
									point.y + numbers[ j + 1 ]
								);
								control.x = rx;
								control.y = ry;
								point.x = point.x + numbers[ j + 0 ];
								point.y = point.y + numbers[ j + 1 ];
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						case 'a':
							var numbers = parseFloats( data );
							for ( var j = 0, jl = numbers.length; j < jl; j += 7 ) {
								var start = point.clone();
								point.x += numbers[ j + 5 ];
								point.y += numbers[ j + 6 ];
								control.x = point.x;
								control.y = point.y;
								parseArcCommand(
									path, numbers[ j ], numbers[ j + 1 ], numbers[ j + 2 ], numbers[ j + 3 ], numbers[ j + 4 ], start, point
								);
								if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
							}
							break;

						//

						case 'Z':
						case 'z':
							path.currentPath.autoClose = true;
							if ( path.currentPath.curves.length > 0 ) {
								// Reset point to beginning of Path
								point.copy( firstPoint );
								path.currentPath.currentPoint.copy( point );
								isFirstPoint = true;
							}
							break;

						default:
							console.warn( command );

					}

					// console.log( type, parseFloats( data ), parseFloats( data ).length  )

					doSetFirstPoint = false;

				}

				return path;

			}
			function parseArcCommand( path, rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, start, end ) {

				x_axis_rotation = x_axis_rotation * Math.PI / 180;

				// Ensure radii are positive
				rx = Math.abs( rx );
				ry = Math.abs( ry );

				// Compute (x1′, y1′)
				var dx2 = ( start.x - end.x ) / 2.0;
				var dy2 = ( start.y - end.y ) / 2.0;
				var x1p = Math.cos( x_axis_rotation ) * dx2 + Math.sin( x_axis_rotation ) * dy2;
				var y1p = - Math.sin( x_axis_rotation ) * dx2 + Math.cos( x_axis_rotation ) * dy2;

				// Compute (cx′, cy′)
				var rxs = rx * rx;
				var rys = ry * ry;
				var x1ps = x1p * x1p;
				var y1ps = y1p * y1p;

				// Ensure radii are large enough
				var cr = x1ps / rxs + y1ps / rys;

				if ( cr > 1 ) {

					// scale up rx,ry equally so cr == 1
					var s = Math.sqrt( cr );
					rx = s * rx;
					ry = s * ry;
					rxs = rx * rx;
					rys = ry * ry;

				}

				var dq = ( rxs * y1ps + rys * x1ps );
				var pq = ( rxs * rys - dq ) / dq;
				var q = Math.sqrt( Math.max( 0, pq ) );
				if ( large_arc_flag === sweep_flag ) q = - q;
				var cxp = q * rx * y1p / ry;
				var cyp = - q * ry * x1p / rx;

				// Step 3: Compute (cx, cy) from (cx′, cy′)
				var cx = Math.cos( x_axis_rotation ) * cxp - Math.sin( x_axis_rotation ) * cyp + ( start.x + end.x ) / 2;
				var cy = Math.sin( x_axis_rotation ) * cxp + Math.cos( x_axis_rotation ) * cyp + ( start.y + end.y ) / 2;

				// Step 4: Compute θ1 and Δθ
				var theta = svgAngle( 1, 0, ( x1p - cxp ) / rx, ( y1p - cyp ) / ry );
				var delta = svgAngle( ( x1p - cxp ) / rx, ( y1p - cyp ) / ry, ( - x1p - cxp ) / rx, ( - y1p - cyp ) / ry ) % ( Math.PI * 2 );

				path.currentPath.absellipse( cx, cy, rx, ry, theta, theta + delta, sweep_flag === 0, x_axis_rotation );

			}

			function svgAngle( ux, uy, vx, vy ) {

				var dot = ux * vx + uy * vy;
				var len = Math.sqrt( ux * ux + uy * uy ) *  Math.sqrt( vx * vx + vy * vy );
				var ang = Math.acos( Math.max( -1, Math.min( 1, dot / len ) ) ); // floating point precision, slightly over values appear
				if ( ( ux * vy - uy * vx ) < 0 ) ang = - ang;
				return ang;

			}
			function parseRectNode( node, style ) {

				var x = parseFloat( node.getAttribute( 'x' ) || 0 );
				var y = parseFloat( node.getAttribute( 'y' ) || 0 );
				var rx = parseFloat( node.getAttribute( 'rx' ) || 0 );
				var ry = parseFloat( node.getAttribute( 'ry' ) || 0 );
				var w = parseFloat( node.getAttribute( 'width' ) );
				var h = parseFloat( node.getAttribute( 'height' ) );

				var path = new ShapePath();
				path.color.setStyle( style.fill );
				path.moveTo( x + 2 * rx, y );
				path.lineTo( x + w - 2 * rx, y );
				if ( rx !== 0 || ry !== 0 ) path.bezierCurveTo( x + w, y, x + w, y, x + w, y + 2 * ry );
				path.lineTo( x + w, y + h - 2 * ry );
				if ( rx !== 0 || ry !== 0 ) path.bezierCurveTo( x + w, y + h, x + w, y + h, x + w - 2 * rx, y + h );
				path.lineTo( x + 2 * rx, y + h );

				if ( rx !== 0 || ry !== 0 ) {

					path.bezierCurveTo( x, y + h, x, y + h, x, y + h - 2 * ry );

				}

				path.lineTo( x, y + 2 * ry );

				if ( rx !== 0 || ry !== 0 ) {

					path.bezierCurveTo( x, y, x, y, x + 2 * rx, y );

				}

				return path;

			}

			function parsePolygonNode( node, style ) {

				function iterator( match, a, b ) {

					var x = parseFloat( a );
					var y = parseFloat( b );

					if ( index === 0 ) {
						path.moveTo( x, y );
					} else {
						path.lineTo( x, y );
					}

					index ++;

				}

				var regex = /(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g;

				var path = new ShapePath();
				path.color.setStyle( style.fill );

				var index = 0;

				node.getAttribute( 'points' ).replace(regex, iterator);

				path.currentPath.autoClose = true;

				return path;

			}

			function parsePolylineNode( node, style ) {

				function iterator( match, a, b ) {

					var x = parseFloat( a );
					var y = parseFloat( b );

					if ( index === 0 ) {
						path.moveTo( x, y );
					} else {
						path.lineTo( x, y );
					}

					index ++;

				}

				var regex = /(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g;

				var path = new ShapePath();
				path.color.setStyle( style.fill );

				var index = 0;

				node.getAttribute( 'points' ).replace(regex, iterator);

				path.currentPath.autoClose = false;

				return path;

			}

			function parseCircleNode( node, style ) {

				var x = parseFloat( node.getAttribute( 'cx' ) );
				var y = parseFloat( node.getAttribute( 'cy' ) );
				var r = parseFloat( node.getAttribute( 'r' ) );

				var subpath = new Path();
				subpath.absarc( x, y, r, 0, Math.PI * 2 );

				var path = new ShapePath();
				path.color.setStyle( style.fill );
				path.subPaths.push( subpath );

				return path;

			}

			function parseEllipseNode( node, style ) {

				var x = parseFloat( node.getAttribute( 'cx' ) );
				var y = parseFloat( node.getAttribute( 'cy' ) );
				var rx = parseFloat( node.getAttribute( 'rx' ) );
				var ry = parseFloat( node.getAttribute( 'ry' ) );

				var subpath = new Path();
				subpath.absellipse( x, y, rx, ry, 0, Math.PI * 2 );

				var path = new ShapePath();
				path.color.setStyle( style.fill );
				path.subPaths.push( subpath );

				return path;

			}

			function parseLineNode( node, style ) {

				var x1 = parseFloat( node.getAttribute( 'x1' ) );
				var y1 = parseFloat( node.getAttribute( 'y1' ) );
				var x2 = parseFloat( node.getAttribute( 'x2' ) );
				var y2 = parseFloat( node.getAttribute( 'y2' ) );

				var path = new ShapePath();
				path.moveTo( x1, y1 );
				path.lineTo( x2, y2 );
				path.currentPath.autoClose = false;

				return path;

			}

			//

			function parseStyle( node, style ) {

				style = Object.assign( {}, style ); // clone style

				if ( node.hasAttribute( 'fill' ) ) style.fill = node.getAttribute( 'fill' );
				if ( node.style.fill !== '' ) style.fill = node.style.fill;

				return style;

			}

			function isVisible( style ) {

				return style.fill !== 'none' && style.fill !== 'transparent';

			}

			// http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes

			function getReflection( a, b ) {

				return a - ( b - a );

			}

			function parseFloats( string ) {

				var array = string.split( /[\s,]+|(?=\s?[+\-])/ );

				for ( var i = 0; i < array.length; i ++ ) {

					var number = array[ i ];

					// Handle values like 48.6037.7.8
					// TODO Find a regex for this

					if ( number.indexOf( '.' ) !== number.lastIndexOf( '.' ) ) {

						var split = number.split( '.' );

						for ( var s = 2; s < split.length; s ++ ) {

							array.splice( i + s - 1, 0, '0.' + split[ s ] );

						}

					}

					array[ i ] = parseFloat( number );

				}

				return array;
			}

			function getNodeTransform( node ) {

				if ( ! node.hasAttribute( 'transform' ) ) {
					return null;
				}

				var transform = parseTransformNode( node );

				if ( transform ) {

					if ( transformStack.length > 0 ) {
						transform.premultiply( transformStack[ transformStack.length - 1 ] );
					}

					currentTransform.copy( transform );
					transformStack.push( transform );

				}

				return transform;

			}

			function parseTransformNode( node ) {

				var transform = new Matrix3();
				var currentTransform = tempTransform0;
				var transformsTexts = node.getAttribute( 'transform' ).split( ' ' );

				for ( var tIndex = transformsTexts.length - 1; tIndex >= 0; tIndex-- ) {

					var transformText = transformsTexts[ tIndex ];
					var openParPos = transformText.indexOf( "(" );
					var closeParPos = transformText.indexOf( ")" );

					if ( openParPos > 0 && openParPos < closeParPos ) {

						var transformType = transformText.substr( 0, openParPos );

						var array = parseFloats( transformText.substr( openParPos + 1, closeParPos - openParPos - 1 ) );

						currentTransform.identity();

						switch ( transformType ) {

							case "translate":

								if ( array.length >= 1 ) {

									var tx = array[ 0 ];
									var ty = tx;

									if ( array.length >= 2 ) {

										ty = array[ 1 ];

									}

									currentTransform.translate( tx, ty );

								}

								break;

							case "rotate":

								if ( array.length >= 1 ) {

									var angle = 0;
									var cx = 0;
									var cy = 0;

									// Angle
									angle = - array[ 0 ] * Math.PI / 180;

									if ( array.length >= 3 ) {

										// Center x, y
										cx = array[ 1 ];
										cy = array[ 2 ];

									}

									// Rotate around center (cx, cy)
									tempTransform1.identity().translate( -cx, -cy );
									tempTransform2.identity().rotate( angle );
									tempTransform3.multiplyMatrices( tempTransform2, tempTransform1 );
									tempTransform1.identity().translate( cx, cy );
									currentTransform.multiplyMatrices( tempTransform1, tempTransform3 );

								}

								break;

							case "scale":

								if ( array.length >= 1 ) {

									var scaleX = array[ 0 ];
									var scaleY = scaleX;

									if ( array.length >= 2 ) {
										scaleY = array[ 1 ];
									}

									currentTransform.scale( scaleX, scaleY );

								}

								break;

							case "skewX":

								if ( array.length === 1 ) {

									currentTransform.set(
										1, Math.tan( array[ 0 ] * Math.PI / 180 ), 0,
										0, 1, 0,
										0, 0, 1
									);

								}

								break;

							case "skewY":

								if ( array.length === 1 ) {

									currentTransform.set(
										1, 0, 0,
										Math.tan( array[ 0 ] * Math.PI / 180 ), 1, 0,
										0, 0, 1
									);

								}

								break;

							case "matrix":

								if ( array.length === 6 ) {

									currentTransform.set(
										array[ 0 ], array[ 2 ], array[ 4 ],
										array[ 1 ], array[ 3 ], array[ 5 ],
										0, 0, 1
									);

								}

								break;
						}

					}

					transform.premultiply( currentTransform );

				}

				return transform;

			}

			function transformPath( path, m ) {

				function transfVec2( v2 ) {

					tempV3.set( v2.x, v2.y, 1 ).applyMatrix3( m );

					v2.set( tempV3.x, tempV3.y );

				}

				var isRotated = isTransformRotated( m );

				var tempV2 = new Vector2();
				var tempV3 = new Vector3();

				var subPaths = path.subPaths;

				for ( var i = 0, n = subPaths.length; i < n; i++ ) {

					var subPath = subPaths[ i ];
					var curves = subPath.curves;

					for ( var j = 0; j < curves.length; j++ ) {

						var curve = curves[ j ];

						if ( curve.isLineCurve ) {

							transfVec2( curve.v1 );
							transfVec2( curve.v2 );

						} else if ( curve.isCubicBezierCurve ) {

							transfVec2( curve.v0 );
							transfVec2( curve.v1 );
							transfVec2( curve.v2 );
							transfVec2( curve.v3 );

						} else if ( curve.isQuadraticBezierCurve ) {

							transfVec2( curve.v0 );
							transfVec2( curve.v1 );
							transfVec2( curve.v2 );

						} else if ( curve.isEllipseCurve ) {

							if ( isRotated ) {
								console.warn( "SVGLoader: Elliptic arc or ellipse rotation or skewing is not implemented." );
							}

							tempV2.set( curve.aX, curve.aY );
							transfVec2( tempV2 );
							curve.aX = tempV2.x;
							curve.aY = tempV2.y;

							curve.xRadius *= getTransformScaleX( m );
							curve.yRadius *= getTransformScaleY( m );

						}

					}

				}

			}

			function isTransformRotated( m ) {
				return m.elements[ 1 ] !== 0 || m.elements[ 3 ] !== 0;
			}

			function getTransformScaleX( m ) {
				var te = m.elements;
				return Math.sqrt( te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] )
			}

			function getTransformScaleY( m ) {
				var te = m.elements;
				return Math.sqrt( te[ 3 ] * te[ 3 ] + te[ 4 ] * te[ 4 ] )
			}

			//

			console.log( 'SVGLoader' );

			var paths = [];

			var transformStack = [];

			var tempTransform0 = new Matrix3();
			var tempTransform1 = new Matrix3();
			var tempTransform2 = new Matrix3();
			var tempTransform3 = new Matrix3();

			var currentTransform = new Matrix3();

			console.time( 'SVGLoader: DOMParser' );

			var xml = new DOMParser().parseFromString( text, 'image/svg+xml' ); // application/xml

			console.timeEnd( 'SVGLoader: DOMParser' );

			console.time( 'SVGLoader: Parse' );

			parseNode( xml.documentElement, { fill: '#000' } );

			// console.log( paths );
			console.timeEnd( 'SVGLoader: Parse' );

			return paths;

		}

	};

	exports.SVGLoader = SVGLoader;

}((this.Three = this.Three || {})));
