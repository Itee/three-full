var Three = (function (exports) {
	'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Interpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		this.parameterPositions = parameterPositions;
		this._cachedIndex = 0;

		this.resultBuffer = resultBuffer !== undefined ?
			resultBuffer : new sampleValues.constructor( sampleSize );
		this.sampleValues = sampleValues;
		this.valueSize = sampleSize;

	}

	Object.assign( Interpolant.prototype, {

		evaluate: function ( t ) {

			var pp = this.parameterPositions,
				i1 = this._cachedIndex,

				t1 = pp[ i1 ],
				t0 = pp[ i1 - 1 ];

			validate_interval: {

				seek: {

					var right;

					linear_scan: {

						//- See http://jsperf.com/comparison-to-undefined/3
						//- slower code:
						//-
						//- 				if ( t >= t1 || t1 === undefined ) {
						forward_scan: if ( ! ( t < t1 ) ) {

							for ( var giveUpAt = i1 + 2; ; ) {

								if ( t1 === undefined ) {

									if ( t < t0 ) break forward_scan;

									// after end

									i1 = pp.length;
									this._cachedIndex = i1;
									return this.afterEnd_( i1 - 1, t, t0 );

								}

								if ( i1 === giveUpAt ) break; // this loop

								t0 = t1;
								t1 = pp[ ++ i1 ];

								if ( t < t1 ) {

									// we have arrived at the sought interval
									break seek;

								}

							}

							// prepare binary search on the right side of the index
							right = pp.length;
							break linear_scan;

						}

						//- slower code:
						//-					if ( t < t0 || t0 === undefined ) {
						if ( ! ( t >= t0 ) ) {

							// looping?

							var t1global = pp[ 1 ];

							if ( t < t1global ) {

								i1 = 2; // + 1, using the scan for the details
								t0 = t1global;

							}

							// linear reverse scan

							for ( var giveUpAt = i1 - 2; ; ) {

								if ( t0 === undefined ) {

									// before start

									this._cachedIndex = 0;
									return this.beforeStart_( 0, t, t1 );

								}

								if ( i1 === giveUpAt ) break; // this loop

								t1 = t0;
								t0 = pp[ -- i1 - 1 ];

								if ( t >= t0 ) {

									// we have arrived at the sought interval
									break seek;

								}

							}

							// prepare binary search on the left side of the index
							right = i1;
							i1 = 0;
							break linear_scan;

						}

						// the interval is valid

						break validate_interval;

					} // linear scan

					// binary search

					while ( i1 < right ) {

						var mid = ( i1 + right ) >>> 1;

						if ( t < pp[ mid ] ) {

							right = mid;

						} else {

							i1 = mid + 1;

						}

					}

					t1 = pp[ i1 ];
					t0 = pp[ i1 - 1 ];

					// check boundary cases, again

					if ( t0 === undefined ) {

						this._cachedIndex = 0;
						return this.beforeStart_( 0, t, t1 );

					}

					if ( t1 === undefined ) {

						i1 = pp.length;
						this._cachedIndex = i1;
						return this.afterEnd_( i1 - 1, t0, t );

					}

				} // seek

				this._cachedIndex = i1;

				this.intervalChanged_( i1, t0, t1 );

			} // validate_interval

			return this.interpolate_( i1, t0, t, t1 );

		},

		settings: null, // optional, subclass-specific settings structure
		// Note: The indirection allows central control of many interpolants.

		// --- Protected interface

		DefaultSettings_: {},

		getSettings_: function () {

			return this.settings || this.DefaultSettings_;

		},

		copySampleValue_: function ( index ) {

			// copies a sample value to the result buffer

			var result = this.resultBuffer,
				values = this.sampleValues,
				stride = this.valueSize,
				offset = index * stride;

			for ( var i = 0; i !== stride; ++ i ) {

				result[ i ] = values[ offset + i ];

			}

			return result;

		},

		// Template methods for derived classes:

		interpolate_: function (  ) {

			throw new Error( 'call to abstract method' );
			// implementations shall return this.resultBuffer

		},

		intervalChanged_: function (  ) {

			// empty

		}

	} );

	//!\ DECLARE ALIAS AFTER assign prototype !
	Object.assign( Interpolant.prototype, {

		//( 0, t, t0 ), returns this.resultBuffer
		beforeStart_: Interpolant.prototype.copySampleValue_,

		//( N-1, tN-1, t ), returns this.resultBuffer
		afterEnd_: Interpolant.prototype.copySampleValue_,

	} );

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
	var FrontSide = 0;
	var BackSide = 1;
	var DoubleSide = 2;
	var FlatShading = 1;
	var NoColors = 0;
	var FaceColors = 1;
	var VertexColors = 2;
	var NoBlending = 0;
	var NormalBlending = 1;
	var AdditiveBlending = 2;
	var SubtractiveBlending = 3;
	var MultiplyBlending = 4;
	var CustomBlending = 5;
	var AddEquation = 100;
	var SrcAlphaFactor = 204;
	var OneMinusSrcAlphaFactor = 205;
	var LessEqualDepth = 3;
	var MultiplyOperation = 0;
	var UVMapping = 300;
	var RepeatWrapping = 1000;
	var ClampToEdgeWrapping = 1001;
	var MirroredRepeatWrapping = 1002;
	var NearestFilter = 1003;
	var NearestMipMapNearestFilter = 1004;
	var NearestMipMapLinearFilter = 1005;
	var LinearFilter = 1006;
	var LinearMipMapNearestFilter = 1007;
	var LinearMipMapLinearFilter = 1008;
	var UnsignedByteType = 1009;
	var RGBFormat = 1022;
	var RGBAFormat = 1023;
	var RGB_S3TC_DXT1_Format = 33776;
	var RGBA_S3TC_DXT3_Format = 33778;
	var RGBA_S3TC_DXT5_Format = 33779;
	var RGB_ETC1_Format = 36196;
	var InterpolateDiscrete = 2300;
	var InterpolateLinear = 2301;
	var InterpolateSmooth = 2302;
	var ZeroCurvatureEnding = 2400;
	var ZeroSlopeEnding = 2401;
	var WrapAroundEnding = 2402;
	var TrianglesDrawMode = 0;
	var TriangleStripDrawMode = 1;
	var TriangleFanDrawMode = 2;
	var LinearEncoding = 3000;
	var sRGBEncoding = 3001;
	var BasicDepthPacking = 3200;
	var TangentSpaceNormalMap = 0;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function EventDispatcher() {}

	Object.assign( EventDispatcher.prototype, {

		addEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) this._listeners = {};

			var listeners = this._listeners;

			if ( listeners[ type ] === undefined ) {

				listeners[ type ] = [];

			}

			if ( listeners[ type ].indexOf( listener ) === - 1 ) {

				listeners[ type ].push( listener );

			}

		},

		hasEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) return false;

			var listeners = this._listeners;

			return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

		},

		removeEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) return;

			var listeners = this._listeners;
			var listenerArray = listeners[ type ];

			if ( listenerArray !== undefined ) {

				var index = listenerArray.indexOf( listener );

				if ( index !== - 1 ) {

					listenerArray.splice( index, 1 );

				}

			}

		},

		dispatchEvent: function ( event ) {

			if ( this._listeners === undefined ) return;

			var listeners = this._listeners;
			var listenerArray = listeners[ event.type ];

			if ( listenerArray !== undefined ) {

				event.target = this;

				var array = listenerArray.slice( 0 );

				for ( var i = 0, l = array.length; i < l; i ++ ) {

					array[ i ].call( this, event );

				}

			}

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
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ImageUtils = {

		getDataURL: function ( image ) {

			var canvas;

			if ( image instanceof HTMLCanvasElement ) {

				canvas = image;

			} else {

				canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
				canvas.width = image.width;
				canvas.height = image.height;

				var context = canvas.getContext( '2d' );

				if ( image instanceof ImageData ) {

					context.putImageData( image, 0, 0 );

				} else {

					context.drawImage( image, 0, 0, image.width, image.height );

				}

			}

			if ( canvas.width > 2048 || canvas.height > 2048 ) {

				return canvas.toDataURL( 'image/jpeg', 0.6 );

			} else {

				return canvas.toDataURL( 'image/png' );

			}

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var textureId = 0;

	function Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

		Object.defineProperty( this, 'id', { value: textureId ++ } );

		this.uuid = _Math.generateUUID();

		this.name = '';

		this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
		this.mipmaps = [];

		this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;

		this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
		this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;

		this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
		this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;

		this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

		this.format = format !== undefined ? format : RGBAFormat;
		this.type = type !== undefined ? type : UnsignedByteType;

		this.offset = new Vector2( 0, 0 );
		this.repeat = new Vector2( 1, 1 );
		this.center = new Vector2( 0, 0 );
		this.rotation = 0;

		this.matrixAutoUpdate = true;
		this.matrix = new Matrix3();

		this.generateMipmaps = true;
		this.premultiplyAlpha = false;
		this.flipY = true;
		this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

		// Values of encoding !== LinearEncoding only supported on map, envMap and emissiveMap.
		//
		// Also changing the encoding after already used by a Material will not automatically make the Material
		// update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
		this.encoding = encoding !== undefined ? encoding : LinearEncoding;

		this.version = 0;
		this.onUpdate = null;

	}

	Texture.DEFAULT_IMAGE = undefined;
	Texture.DEFAULT_MAPPING = UVMapping;

	Texture.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Texture,

		isTexture: true,

		updateMatrix: function () {

			this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.name = source.name;

			this.image = source.image;
			this.mipmaps = source.mipmaps.slice( 0 );

			this.mapping = source.mapping;

			this.wrapS = source.wrapS;
			this.wrapT = source.wrapT;

			this.magFilter = source.magFilter;
			this.minFilter = source.minFilter;

			this.anisotropy = source.anisotropy;

			this.format = source.format;
			this.type = source.type;

			this.offset.copy( source.offset );
			this.repeat.copy( source.repeat );
			this.center.copy( source.center );
			this.rotation = source.rotation;

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrix.copy( source.matrix );

			this.generateMipmaps = source.generateMipmaps;
			this.premultiplyAlpha = source.premultiplyAlpha;
			this.flipY = source.flipY;
			this.unpackAlignment = source.unpackAlignment;
			this.encoding = source.encoding;

			return this;

		},

		toJSON: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

				return meta.textures[ this.uuid ];

			}

			var output = {

				metadata: {
					version: 4.5,
					type: 'Texture',
					generator: 'Texture.toJSON'
				},

				uuid: this.uuid,
				name: this.name,

				mapping: this.mapping,

				repeat: [ this.repeat.x, this.repeat.y ],
				offset: [ this.offset.x, this.offset.y ],
				center: [ this.center.x, this.center.y ],
				rotation: this.rotation,

				wrap: [ this.wrapS, this.wrapT ],

				format: this.format,
				minFilter: this.minFilter,
				magFilter: this.magFilter,
				anisotropy: this.anisotropy,

				flipY: this.flipY

			};

			if ( this.image !== undefined ) {

				// TODO: Move to Image

				var image = this.image;

				if ( image.uuid === undefined ) {

					image.uuid = _Math.generateUUID(); // UGH

				}

				if ( ! isRootObject && meta.images[ image.uuid ] === undefined ) {

					var url;

					if ( Array.isArray( image ) ) {

						// process array of images e.g. CubeTexture

						url = [];

						for ( var i = 0, l = image.length; i < l; i ++ ) {

							url.push( ImageUtils.getDataURL( image[ i ] ) );

						}

					} else {

						// process single image

						url = ImageUtils.getDataURL( image );

					}

					meta.images[ image.uuid ] = {
						uuid: image.uuid,
						url: url
					};

				}

				output.image = image.uuid;

			}

			if ( ! isRootObject ) {

				meta.textures[ this.uuid ] = output;

			}

			return output;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		},

		transformUv: function ( uv ) {

			if ( this.mapping !== UVMapping ) return uv;

			uv.applyMatrix3( this.matrix );

			if ( uv.x < 0 || uv.x > 1 ) {

				switch ( this.wrapS ) {

					case RepeatWrapping:

						uv.x = uv.x - Math.floor( uv.x );
						break;

					case ClampToEdgeWrapping:

						uv.x = uv.x < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

							uv.x = Math.ceil( uv.x ) - uv.x;

						} else {

							uv.x = uv.x - Math.floor( uv.x );

						}
						break;

				}

			}

			if ( uv.y < 0 || uv.y > 1 ) {

				switch ( this.wrapT ) {

					case RepeatWrapping:

						uv.y = uv.y - Math.floor( uv.y );
						break;

					case ClampToEdgeWrapping:

						uv.y = uv.y < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

							uv.y = Math.ceil( uv.y ) - uv.y;

						} else {

							uv.y = uv.y - Math.floor( uv.y );

						}
						break;

				}

			}

			if ( this.flipY ) {

				uv.y = 1 - uv.y;

			}

			return uv;

		}

	} );

	Object.defineProperty( Texture.prototype, "needsUpdate", {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CompressedTexture( mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

		Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.image = { width: width, height: height };
		this.mipmaps = mipmaps;

		// no flipping for cube textures
		// (also flipping doesn't work for compressed textures )

		this.flipY = false;

		// can't generate mipmaps for compressed textures
		// mips must be embedded in DDS files

		this.generateMipmaps = false;

	}

	CompressedTexture.prototype = Object.create( Texture.prototype );
	CompressedTexture.prototype.constructor = CompressedTexture;

	CompressedTexture.prototype.isCompressedTexture = true;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CompressedTextureLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

		// override in sub classes
		this._parser = null;

	}

	Object.assign( CompressedTextureLoader.prototype, {

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var images = [];

			var texture = new CompressedTexture();
			texture.image = images;

			var loader = new FileLoader( this.manager );
			loader.setPath( this.path );
			loader.setResponseType( 'arraybuffer' );

			function loadTexture( i ) {

				loader.load( url[ i ], function ( buffer ) {

					var texDatas = scope._parser( buffer, true );

					images[ i ] = {
						width: texDatas.width,
						height: texDatas.height,
						format: texDatas.format,
						mipmaps: texDatas.mipmaps
					};

					loaded += 1;

					if ( loaded === 6 ) {

						if ( texDatas.mipmapCount === 1 )
							texture.minFilter = LinearFilter;

						texture.format = texDatas.format;
						texture.needsUpdate = true;

						if ( onLoad ) onLoad( texture );

					}

				}, onProgress, onError );

			}

			if ( Array.isArray( url ) ) {

				var loaded = 0;

				for ( var i = 0, il = url.length; i < il; ++ i ) {

					loadTexture( i );

				}

			} else {

				// compressed cubemap texture stored in a single DDS file

				loader.load( url, function ( buffer ) {

					var texDatas = scope._parser( buffer, true );

					if ( texDatas.isCubemap ) {

						var faces = texDatas.mipmaps.length / texDatas.mipmapCount;

						for ( var f = 0; f < faces; f ++ ) {

							images[ f ] = { mipmaps: [] };

							for ( var i = 0; i < texDatas.mipmapCount; i ++ ) {

								images[ f ].mipmaps.push( texDatas.mipmaps[ f * texDatas.mipmapCount + i ] );
								images[ f ].format = texDatas.format;
								images[ f ].width = texDatas.width;
								images[ f ].height = texDatas.height;

							}

						}

					} else {

						texture.image.width = texDatas.width;
						texture.image.height = texDatas.height;
						texture.mipmaps = texDatas.mipmaps;

					}

					if ( texDatas.mipmapCount === 1 ) {

						texture.minFilter = LinearFilter;

					}

					texture.format = texDatas.format;
					texture.needsUpdate = true;

					if ( onLoad ) onLoad( texture );

				}, onProgress, onError );

			}

			return texture;

		},

		setPath: function ( value ) {

			this.path = value;
			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var DDSLoader = function ( manager ) {

		CompressedTextureLoader.call( this, manager );

		this._parser = DDSLoader.parse;

	};

	DDSLoader.prototype = Object.create( CompressedTextureLoader.prototype );
	DDSLoader.prototype.constructor = DDSLoader;

	DDSLoader.parse = function ( buffer, loadMipmaps ) {

		var dds = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 };

		// Adapted from @toji's DDS utils
		// https://github.com/toji/webgl-texture-utils/blob/master/texture-util/dds.js

		// All values and structures referenced from:
		// http://msdn.microsoft.com/en-us/library/bb943991.aspx/

		var DDS_MAGIC = 0x20534444;

		var DDSD_MIPMAPCOUNT = 0x20000;

		var DDSCAPS2_CUBEMAP = 0x200,
			DDSCAPS2_CUBEMAP_POSITIVEX = 0x400,
			DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,
			DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,
			DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,
			DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,
			DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000;

		var DDPF_FOURCC = 0x4;

		function fourCCToInt32( value ) {

			return value.charCodeAt( 0 ) +
				( value.charCodeAt( 1 ) << 8 ) +
				( value.charCodeAt( 2 ) << 16 ) +
				( value.charCodeAt( 3 ) << 24 );

		}

		function int32ToFourCC( value ) {

			return String.fromCharCode(
				value & 0xff,
				( value >> 8 ) & 0xff,
				( value >> 16 ) & 0xff,
				( value >> 24 ) & 0xff
			);

		}

		function loadARGBMip( buffer, dataOffset, width, height ) {

			var dataLength = width * height * 4;
			var srcBuffer = new Uint8Array( buffer, dataOffset, dataLength );
			var byteArray = new Uint8Array( dataLength );
			var dst = 0;
			var src = 0;
			for ( var y = 0; y < height; y ++ ) {

				for ( var x = 0; x < width; x ++ ) {

					var b = srcBuffer[ src ]; src ++;
					var g = srcBuffer[ src ]; src ++;
					var r = srcBuffer[ src ]; src ++;
					var a = srcBuffer[ src ]; src ++;
					byteArray[ dst ] = r; dst ++;	//r
					byteArray[ dst ] = g; dst ++;	//g
					byteArray[ dst ] = b; dst ++;	//b
					byteArray[ dst ] = a; dst ++;	//a

				}

			}
			return byteArray;

		}

		var FOURCC_DXT1 = fourCCToInt32( "DXT1" );
		var FOURCC_DXT3 = fourCCToInt32( "DXT3" );
		var FOURCC_DXT5 = fourCCToInt32( "DXT5" );
		var FOURCC_ETC1 = fourCCToInt32( "ETC1" );

		var headerLengthInt = 31; // The header length in 32 bit ints

		// Offsets into the header array

		var off_magic = 0;

		var off_size = 1;
		var off_flags = 2;
		var off_height = 3;
		var off_width = 4;

		var off_mipmapCount = 7;

		var off_pfFlags = 20;
		var off_pfFourCC = 21;
		var off_RGBBitCount = 22;
		var off_RBitMask = 23;
		var off_GBitMask = 24;
		var off_BBitMask = 25;
		var off_ABitMask = 26;
		var off_caps2 = 28;

		// Parse header

		var header = new Int32Array( buffer, 0, headerLengthInt );

		if ( header[ off_magic ] !== DDS_MAGIC ) {

			console.error( 'DDSLoader.parse: Invalid magic number in DDS header.' );
			return dds;

		}

		if ( ! header[ off_pfFlags ] & DDPF_FOURCC ) {

			console.error( 'DDSLoader.parse: Unsupported format, must contain a FourCC code.' );
			return dds;

		}

		var blockBytes;

		var fourCC = header[ off_pfFourCC ];

		var isRGBAUncompressed = false;

		switch ( fourCC ) {

			case FOURCC_DXT1:

				blockBytes = 8;
				dds.format = RGB_S3TC_DXT1_Format;
				break;

			case FOURCC_DXT3:

				blockBytes = 16;
				dds.format = RGBA_S3TC_DXT3_Format;
				break;

			case FOURCC_DXT5:

				blockBytes = 16;
				dds.format = RGBA_S3TC_DXT5_Format;
				break;

			case FOURCC_ETC1:

				blockBytes = 8;
				dds.format = RGB_ETC1_Format;
				break;

			default:

				if ( header[ off_RGBBitCount ] === 32
					&& header[ off_RBitMask ] & 0xff0000
					&& header[ off_GBitMask ] & 0xff00
					&& header[ off_BBitMask ] & 0xff
					&& header[ off_ABitMask ] & 0xff000000 ) {

					isRGBAUncompressed = true;
					blockBytes = 64;
					dds.format = RGBAFormat;

				} else {

					console.error( 'DDSLoader.parse: Unsupported FourCC code ', int32ToFourCC( fourCC ) );
					return dds;

				}

		}

		dds.mipmapCount = 1;

		if ( header[ off_flags ] & DDSD_MIPMAPCOUNT && loadMipmaps !== false ) {

			dds.mipmapCount = Math.max( 1, header[ off_mipmapCount ] );

		}

		var caps2 = header[ off_caps2 ];
		dds.isCubemap = caps2 & DDSCAPS2_CUBEMAP ? true : false;
		if ( dds.isCubemap && (
			! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEX ) ||
			! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEX ) ||
			! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEY ) ||
			! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEY ) ||
			! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEZ ) ||
			! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEZ )
		) ) {

			console.error( 'DDSLoader.parse: Incomplete cubemap faces' );
			return dds;

		}

		dds.width = header[ off_width ];
		dds.height = header[ off_height ];

		var dataOffset = header[ off_size ] + 4;

		// Extract mipmaps buffers

		var faces = dds.isCubemap ? 6 : 1;

		for ( var face = 0; face < faces; face ++ ) {

			var width = dds.width;
			var height = dds.height;

			for ( var i = 0; i < dds.mipmapCount; i ++ ) {

				if ( isRGBAUncompressed ) {

					var byteArray = loadARGBMip( buffer, dataOffset, width, height );
					var dataLength = byteArray.length;

				} else {

					var dataLength = Math.max( 4, width ) / 4 * Math.max( 4, height ) / 4 * blockBytes;
					var byteArray = new Uint8Array( buffer, dataOffset, dataLength );

				}

				var mipmap = { "data": byteArray, "width": width, "height": height };
				dds.mipmaps.push( mipmap );

				dataOffset += dataLength;

				width = Math.max( width >> 1, 1 );
				height = Math.max( height >> 1, 1 );

			}

		}

		return dds;

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
	function Euler( x, y, z, order ) {

		this._x = x || 0;
		this._y = y || 0;
		this._z = z || 0;
		this._order = order || Euler.DefaultOrder;

	}

	Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

	Euler.DefaultOrder = 'XYZ';

	Object.defineProperties( Euler.prototype, {

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

		order: {

			get: function () {

				return this._order;

			},

			set: function ( value ) {

				this._order = value;
				this.onChangeCallback();

			}

		}

	} );

	Object.assign( Euler.prototype, {

		isEuler: true,

		set: function ( x, y, z, order ) {

			this._x = x;
			this._y = y;
			this._z = z;
			this._order = order || this._order;

			this.onChangeCallback();

			return this;

		},

		clone: function () {

			return new this.constructor( this._x, this._y, this._z, this._order );

		},

		copy: function ( euler ) {

			this._x = euler._x;
			this._y = euler._y;
			this._z = euler._z;
			this._order = euler._order;

			this.onChangeCallback();

			return this;

		},

		setFromRotationMatrix: function ( m, order, update ) {

			var clamp = _Math.clamp;

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			var te = m.elements;
			var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
			var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
			var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

			order = order || this._order;

			if ( order === 'XYZ' ) {

				this._y = Math.asin( clamp( m13, - 1, 1 ) );

				if ( Math.abs( m13 ) < 0.99999 ) {

					this._x = Math.atan2( - m23, m33 );
					this._z = Math.atan2( - m12, m11 );

				} else {

					this._x = Math.atan2( m32, m22 );
					this._z = 0;

				}

			} else if ( order === 'YXZ' ) {

				this._x = Math.asin( - clamp( m23, - 1, 1 ) );

				if ( Math.abs( m23 ) < 0.99999 ) {

					this._y = Math.atan2( m13, m33 );
					this._z = Math.atan2( m21, m22 );

				} else {

					this._y = Math.atan2( - m31, m11 );
					this._z = 0;

				}

			} else if ( order === 'ZXY' ) {

				this._x = Math.asin( clamp( m32, - 1, 1 ) );

				if ( Math.abs( m32 ) < 0.99999 ) {

					this._y = Math.atan2( - m31, m33 );
					this._z = Math.atan2( - m12, m22 );

				} else {

					this._y = 0;
					this._z = Math.atan2( m21, m11 );

				}

			} else if ( order === 'ZYX' ) {

				this._y = Math.asin( - clamp( m31, - 1, 1 ) );

				if ( Math.abs( m31 ) < 0.99999 ) {

					this._x = Math.atan2( m32, m33 );
					this._z = Math.atan2( m21, m11 );

				} else {

					this._x = 0;
					this._z = Math.atan2( - m12, m22 );

				}

			} else if ( order === 'YZX' ) {

				this._z = Math.asin( clamp( m21, - 1, 1 ) );

				if ( Math.abs( m21 ) < 0.99999 ) {

					this._x = Math.atan2( - m23, m22 );
					this._y = Math.atan2( - m31, m11 );

				} else {

					this._x = 0;
					this._y = Math.atan2( m13, m33 );

				}

			} else if ( order === 'XZY' ) {

				this._z = Math.asin( - clamp( m12, - 1, 1 ) );

				if ( Math.abs( m12 ) < 0.99999 ) {

					this._x = Math.atan2( m32, m22 );
					this._y = Math.atan2( m13, m11 );

				} else {

					this._x = Math.atan2( - m23, m33 );
					this._y = 0;

				}

			} else {

				console.warn( 'Euler: .setFromRotationMatrix() given unsupported order: ' + order );

			}

			this._order = order;

			if ( update !== false ) this.onChangeCallback();

			return this;

		},

		setFromQuaternion: function () {

			var matrix = new Matrix4();

			return function setFromQuaternion( q, order, update ) {

				matrix.makeRotationFromQuaternion( q );

				return this.setFromRotationMatrix( matrix, order, update );

			};

		}(),

		setFromVector3: function ( v, order ) {

			return this.set( v.x, v.y, v.z, order || this._order );

		},

		reorder: function () {

			// WARNING: this discards revolution information -bhouston

			var q = new Quaternion();

			return function reorder( newOrder ) {

				q.setFromEuler( this );

				return this.setFromQuaternion( q, newOrder );

			};

		}(),

		equals: function ( euler ) {

			return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

		},

		fromArray: function ( array ) {

			this._x = array[ 0 ];
			this._y = array[ 1 ];
			this._z = array[ 2 ];
			if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

			this.onChangeCallback();

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this._x;
			array[ offset + 1 ] = this._y;
			array[ offset + 2 ] = this._z;
			array[ offset + 3 ] = this._order;

			return array;

		},

		toVector3: function ( optionalResult ) {

			if ( optionalResult ) {

				return optionalResult.set( this._x, this._y, this._z );

			} else {

				return new Vector3( this._x, this._y, this._z );

			}

		},

		onChange: function ( callback ) {

			this.onChangeCallback = callback;

			return this;

		},

		onChangeCallback: function () {}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Layers() {

		this.mask = 1 | 0;

	}

	Object.assign( Layers.prototype, {

		set: function ( channel ) {

			this.mask = 1 << channel | 0;

		},

		enable: function ( channel ) {

			this.mask |= 1 << channel | 0;

		},

		toggle: function ( channel ) {

			this.mask ^= 1 << channel | 0;

		},

		disable: function ( channel ) {

			this.mask &= ~ ( 1 << channel | 0 );

		},

		test: function ( layers ) {

			return ( this.mask & layers.mask ) !== 0;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var object3DId = 0;

	function Object3D() {

		Object.defineProperty( this, 'id', { value: object3DId ++ } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'Object3D';

		this.parent = null;
		this.children = [];

		this.up = Object3D.DefaultUp.clone();

		var position = new Vector3();
		var rotation = new Euler();
		var quaternion = new Quaternion();
		var scale = new Vector3( 1, 1, 1 );

		function onRotationChange() {

			quaternion.setFromEuler( rotation, false );

		}

		function onQuaternionChange() {

			rotation.setFromQuaternion( quaternion, undefined, false );

		}

		rotation.onChange( onRotationChange );
		quaternion.onChange( onQuaternionChange );

		Object.defineProperties( this, {
			position: {
				enumerable: true,
				value: position
			},
			rotation: {
				enumerable: true,
				value: rotation
			},
			quaternion: {
				enumerable: true,
				value: quaternion
			},
			scale: {
				enumerable: true,
				value: scale
			},
			modelViewMatrix: {
				value: new Matrix4()
			},
			normalMatrix: {
				value: new Matrix3()
			}
		} );

		this.matrix = new Matrix4();
		this.matrixWorld = new Matrix4();

		this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
		this.matrixWorldNeedsUpdate = false;

		this.layers = new Layers();
		this.visible = true;

		this.castShadow = false;
		this.receiveShadow = false;

		this.frustumCulled = true;
		this.renderOrder = 0;

		this.userData = {};

	}

	Object3D.DefaultUp = new Vector3( 0, 1, 0 );
	Object3D.DefaultMatrixAutoUpdate = true;

	Object3D.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Object3D,

		isObject3D: true,

		onBeforeRender: function () {},
		onAfterRender: function () {},

		applyMatrix: function ( matrix ) {

			this.matrix.multiplyMatrices( matrix, this.matrix );

			this.matrix.decompose( this.position, this.quaternion, this.scale );

		},

		applyQuaternion: function ( q ) {

			this.quaternion.premultiply( q );

			return this;

		},

		setRotationFromAxisAngle: function ( axis, angle ) {

			// assumes axis is normalized

			this.quaternion.setFromAxisAngle( axis, angle );

		},

		setRotationFromEuler: function ( euler ) {

			this.quaternion.setFromEuler( euler, true );

		},

		setRotationFromMatrix: function ( m ) {

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			this.quaternion.setFromRotationMatrix( m );

		},

		setRotationFromQuaternion: function ( q ) {

			// assumes q is normalized

			this.quaternion.copy( q );

		},

		rotateOnAxis: function () {

			// rotate object on axis in object space
			// axis is assumed to be normalized

			var q1 = new Quaternion();

			return function rotateOnAxis( axis, angle ) {

				q1.setFromAxisAngle( axis, angle );

				this.quaternion.multiply( q1 );

				return this;

			};

		}(),

		rotateOnWorldAxis: function () {

			// rotate object on axis in world space
			// axis is assumed to be normalized
			// method assumes no rotated parent

			var q1 = new Quaternion();

			return function rotateOnWorldAxis( axis, angle ) {

				q1.setFromAxisAngle( axis, angle );

				this.quaternion.premultiply( q1 );

				return this;

			};

		}(),

		rotateX: function () {

			var v1 = new Vector3( 1, 0, 0 );

			return function rotateX( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		rotateY: function () {

			var v1 = new Vector3( 0, 1, 0 );

			return function rotateY( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		rotateZ: function () {

			var v1 = new Vector3( 0, 0, 1 );

			return function rotateZ( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		translateOnAxis: function () {

			// translate object by distance along axis in object space
			// axis is assumed to be normalized

			var v1 = new Vector3();

			return function translateOnAxis( axis, distance ) {

				v1.copy( axis ).applyQuaternion( this.quaternion );

				this.position.add( v1.multiplyScalar( distance ) );

				return this;

			};

		}(),

		translateX: function () {

			var v1 = new Vector3( 1, 0, 0 );

			return function translateX( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		translateY: function () {

			var v1 = new Vector3( 0, 1, 0 );

			return function translateY( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		translateZ: function () {

			var v1 = new Vector3( 0, 0, 1 );

			return function translateZ( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		localToWorld: function ( vector ) {

			return vector.applyMatrix4( this.matrixWorld );

		},

		worldToLocal: function () {

			var m1 = new Matrix4();

			return function worldToLocal( vector ) {

				return vector.applyMatrix4( m1.getInverse( this.matrixWorld ) );

			};

		}(),

		lookAt: function () {

			// This method does not support objects having non-uniformly-scaled parent(s)

			var q1 = new Quaternion();
			var m1 = new Matrix4();
			var target = new Vector3();
			var position = new Vector3();

			return function lookAt( x, y, z ) {

				if ( x.isVector3 ) {

					target.copy( x );

				} else {

					target.set( x, y, z );

				}

				var parent = this.parent;

				this.updateWorldMatrix( true, false );

				position.setFromMatrixPosition( this.matrixWorld );

				if ( this.isCamera ) {

					m1.lookAt( position, target, this.up );

				} else {

					m1.lookAt( target, position, this.up );

				}

				this.quaternion.setFromRotationMatrix( m1 );

				if ( parent ) {

					m1.extractRotation( parent.matrixWorld );
					q1.setFromRotationMatrix( m1 );
					this.quaternion.premultiply( q1.inverse() );

				}

			};

		}(),

		add: function ( object ) {

			if ( arguments.length > 1 ) {

				for ( var i = 0; i < arguments.length; i ++ ) {

					this.add( arguments[ i ] );

				}

				return this;

			}

			if ( object === this ) {

				console.error( "Object3D.add: object can't be added as a child of itself.", object );
				return this;

			}

			if ( ( object && object.isObject3D ) ) {

				if ( object.parent !== null ) {

					object.parent.remove( object );

				}

				object.parent = this;
				object.dispatchEvent( { type: 'added' } );

				this.children.push( object );

			} else {

				console.error( "Object3D.add: object not an instance of Object3D.", object );

			}

			return this;

		},

		remove: function ( object ) {

			if ( arguments.length > 1 ) {

				for ( var i = 0; i < arguments.length; i ++ ) {

					this.remove( arguments[ i ] );

				}

				return this;

			}

			var index = this.children.indexOf( object );

			if ( index !== - 1 ) {

				object.parent = null;

				object.dispatchEvent( { type: 'removed' } );

				this.children.splice( index, 1 );

			}

			return this;

		},

		getObjectById: function ( id ) {

			return this.getObjectByProperty( 'id', id );

		},

		getObjectByName: function ( name ) {

			return this.getObjectByProperty( 'name', name );

		},

		getObjectByProperty: function ( name, value ) {

			if ( this[ name ] === value ) return this;

			for ( var i = 0, l = this.children.length; i < l; i ++ ) {

				var child = this.children[ i ];
				var object = child.getObjectByProperty( name, value );

				if ( object !== undefined ) {

					return object;

				}

			}

			return undefined;

		},

		getWorldPosition: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Object3D: .getWorldPosition() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			return target.setFromMatrixPosition( this.matrixWorld );

		},

		getWorldQuaternion: function () {

			var position = new Vector3();
			var scale = new Vector3();

			return function getWorldQuaternion( target ) {

				if ( target === undefined ) {

					console.warn( 'Object3D: .getWorldQuaternion() target is now required' );
					target = new Quaternion();

				}

				this.updateMatrixWorld( true );

				this.matrixWorld.decompose( position, target, scale );

				return target;

			};

		}(),

		getWorldScale: function () {

			var position = new Vector3();
			var quaternion = new Quaternion();

			return function getWorldScale( target ) {

				if ( target === undefined ) {

					console.warn( 'Object3D: .getWorldScale() target is now required' );
					target = new Vector3();

				}

				this.updateMatrixWorld( true );

				this.matrixWorld.decompose( position, quaternion, target );

				return target;

			};

		}(),

		getWorldDirection: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Object3D: .getWorldDirection() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			var e = this.matrixWorld.elements;

			return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

		},

		raycast: function () {},

		traverse: function ( callback ) {

			callback( this );

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverse( callback );

			}

		},

		traverseVisible: function ( callback ) {

			if ( this.visible === false ) return;

			callback( this );

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverseVisible( callback );

			}

		},

		traverseAncestors: function ( callback ) {

			var parent = this.parent;

			if ( parent !== null ) {

				callback( parent );

				parent.traverseAncestors( callback );

			}

		},

		updateMatrix: function () {

			this.matrix.compose( this.position, this.quaternion, this.scale );

			this.matrixWorldNeedsUpdate = true;

		},

		updateMatrixWorld: function ( force ) {

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			if ( this.matrixWorldNeedsUpdate || force ) {

				if ( this.parent === null ) {

					this.matrixWorld.copy( this.matrix );

				} else {

					this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

				}

				this.matrixWorldNeedsUpdate = false;

				force = true;

			}

			// update children

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].updateMatrixWorld( force );

			}

		},

		updateWorldMatrix: function ( updateParents, updateChildren ) {

			var parent = this.parent;

			if ( updateParents === true && parent !== null ) {

				parent.updateWorldMatrix( true, false );

			}

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			// update children

			if ( updateChildren === true ) {

				var children = this.children;

				for ( var i = 0, l = children.length; i < l; i ++ ) {

					children[ i ].updateWorldMatrix( false, true );

				}

			}

		},

		toJSON: function ( meta ) {

			// meta is a string when called from JSON.stringify
			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			var output = {};

			// meta is a hash used to collect geometries, materials.
			// not providing it implies that this is the root object
			// being serialized.
			if ( isRootObject ) {

				// initialize meta obj
				meta = {
					geometries: {},
					materials: {},
					textures: {},
					images: {},
					shapes: {}
				};

				output.metadata = {
					version: 4.5,
					type: 'Object',
					generator: 'Object3D.toJSON'
				};

			}

			// standard Object3D serialization

			var object = {};

			object.uuid = this.uuid;
			object.type = this.type;

			if ( this.name !== '' ) object.name = this.name;
			if ( this.castShadow === true ) object.castShadow = true;
			if ( this.receiveShadow === true ) object.receiveShadow = true;
			if ( this.visible === false ) object.visible = false;
			if ( this.frustumCulled === false ) object.frustumCulled = false;
			if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
			if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;

			object.layers = this.layers.mask;
			object.matrix = this.matrix.toArray();

			if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

			//

			function serialize( library, element ) {

				if ( library[ element.uuid ] === undefined ) {

					library[ element.uuid ] = element.toJSON( meta );

				}

				return element.uuid;

			}

			if ( this.isMesh || this.isLine || this.isPoints ) {

				object.geometry = serialize( meta.geometries, this.geometry );

				var parameters = this.geometry.parameters;

				if ( parameters !== undefined && parameters.shapes !== undefined ) {

					var shapes = parameters.shapes;

					if ( Array.isArray( shapes ) ) {

						for ( var i = 0, l = shapes.length; i < l; i ++ ) {

							var shape = shapes[ i ];

							serialize( meta.shapes, shape );

						}

					} else {

						serialize( meta.shapes, shapes );

					}

				}

			}

			if ( this.material !== undefined ) {

				if ( Array.isArray( this.material ) ) {

					var uuids = [];

					for ( var i = 0, l = this.material.length; i < l; i ++ ) {

						uuids.push( serialize( meta.materials, this.material[ i ] ) );

					}

					object.material = uuids;

				} else {

					object.material = serialize( meta.materials, this.material );

				}

			}

			//

			if ( this.children.length > 0 ) {

				object.children = [];

				for ( var i = 0; i < this.children.length; i ++ ) {

					object.children.push( this.children[ i ].toJSON( meta ).object );

				}

			}

			if ( isRootObject ) {

				var geometries = extractFromCache( meta.geometries );
				var materials = extractFromCache( meta.materials );
				var textures = extractFromCache( meta.textures );
				var images = extractFromCache( meta.images );
				var shapes = extractFromCache( meta.shapes );

				if ( geometries.length > 0 ) output.geometries = geometries;
				if ( materials.length > 0 ) output.materials = materials;
				if ( textures.length > 0 ) output.textures = textures;
				if ( images.length > 0 ) output.images = images;
				if ( shapes.length > 0 ) output.shapes = shapes;

			}

			output.object = object;

			return output;

			// extract data from the cache hash
			// remove metadata on each item
			// and return as array
			function extractFromCache( cache ) {

				var values = [];
				for ( var key in cache ) {

					var data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}
				return values;

			}

		},

		clone: function ( recursive ) {

			return new this.constructor().copy( this, recursive );

		},

		copy: function ( source, recursive ) {

			if ( recursive === undefined ) recursive = true;

			this.name = source.name;

			this.up.copy( source.up );

			this.position.copy( source.position );
			this.quaternion.copy( source.quaternion );
			this.scale.copy( source.scale );

			this.matrix.copy( source.matrix );
			this.matrixWorld.copy( source.matrixWorld );

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

			this.layers.mask = source.layers.mask;
			this.visible = source.visible;

			this.castShadow = source.castShadow;
			this.receiveShadow = source.receiveShadow;

			this.frustumCulled = source.frustumCulled;
			this.renderOrder = source.renderOrder;

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			if ( recursive === true ) {

				for ( var i = 0; i < source.children.length; i ++ ) {

					var child = source.children[ i ];
					this.add( child.clone() );

				}

			}

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Light( color, intensity ) {

		Object3D.call( this );

		this.type = 'Light';

		this.color = new Color( color );
		this.intensity = intensity !== undefined ? intensity : 1;

		this.receiveShadow = undefined;

	}

	Light.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Light,

		isLight: true,

		copy: function ( source ) {

			Object3D.prototype.copy.call( this, source );

			this.color.copy( source.color );
			this.intensity = source.intensity;

			return this;

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			data.object.color = this.color.getHex();
			data.object.intensity = this.intensity;

			if ( this.groundColor !== undefined ) data.object.groundColor = this.groundColor.getHex();

			if ( this.distance !== undefined ) data.object.distance = this.distance;
			if ( this.angle !== undefined ) data.object.angle = this.angle;
			if ( this.decay !== undefined ) data.object.decay = this.decay;
			if ( this.penumbra !== undefined ) data.object.penumbra = this.penumbra;

			if ( this.shadow !== undefined ) data.object.shadow = this.shadow.toJSON();

			return data;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LightShadow( camera ) {

		this.camera = camera;

		this.bias = 0;
		this.radius = 1;

		this.mapSize = new Vector2( 512, 512 );

		this.map = null;
		this.matrix = new Matrix4();

	}

	Object.assign( LightShadow.prototype, {

		copy: function ( source ) {

			this.camera = source.camera.clone();

			this.bias = source.bias;
			this.radius = source.radius;

			this.mapSize.copy( source.mapSize );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		toJSON: function () {

			var object = {};

			if ( this.bias !== 0 ) object.bias = this.bias;
			if ( this.radius !== 1 ) object.radius = this.radius;
			if ( this.mapSize.x !== 512 || this.mapSize.y !== 512 ) object.mapSize = this.mapSize.toArray();

			object.camera = this.camera.toJSON( false ).object;
			delete object.camera.matrix;

			return object;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Camera() {

		Object3D.call( this );

		this.type = 'Camera';

		this.matrixWorldInverse = new Matrix4();

		this.projectionMatrix = new Matrix4();
		this.projectionMatrixInverse = new Matrix4();

	}

	Camera.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Camera,

		isCamera: true,

		copy: function ( source, recursive ) {

			Object3D.prototype.copy.call( this, source, recursive );

			this.matrixWorldInverse.copy( source.matrixWorldInverse );

			this.projectionMatrix.copy( source.projectionMatrix );
			this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

			return this;

		},

		getWorldDirection: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Camera: .getWorldDirection() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			var e = this.matrixWorld.elements;

			return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

		},

		updateMatrixWorld: function ( force ) {

			Object3D.prototype.updateMatrixWorld.call( this, force );

			this.matrixWorldInverse.getInverse( this.matrixWorld );

		},

		clone: function () {

			return new this.constructor().copy( this );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function OrthographicCamera( left, right, top, bottom, near, far ) {

		Camera.call( this );

		this.type = 'OrthographicCamera';

		this.zoom = 1;
		this.view = null;

		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;

		this.near = ( near !== undefined ) ? near : 0.1;
		this.far = ( far !== undefined ) ? far : 2000;

		this.updateProjectionMatrix();

	}

	OrthographicCamera.prototype = Object.assign( Object.create( Camera.prototype ), {

		constructor: OrthographicCamera,

		isOrthographicCamera: true,

		copy: function ( source, recursive ) {

			Camera.prototype.copy.call( this, source, recursive );

			this.left = source.left;
			this.right = source.right;
			this.top = source.top;
			this.bottom = source.bottom;
			this.near = source.near;
			this.far = source.far;

			this.zoom = source.zoom;
			this.view = source.view === null ? null : Object.assign( {}, source.view );

			return this;

		},

		setViewOffset: function ( fullWidth, fullHeight, x, y, width, height ) {

			if ( this.view === null ) {

				this.view = {
					enabled: true,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				};

			}

			this.view.enabled = true;
			this.view.fullWidth = fullWidth;
			this.view.fullHeight = fullHeight;
			this.view.offsetX = x;
			this.view.offsetY = y;
			this.view.width = width;
			this.view.height = height;

			this.updateProjectionMatrix();

		},

		clearViewOffset: function () {

			if ( this.view !== null ) {

				this.view.enabled = false;

			}

			this.updateProjectionMatrix();

		},

		updateProjectionMatrix: function () {

			var dx = ( this.right - this.left ) / ( 2 * this.zoom );
			var dy = ( this.top - this.bottom ) / ( 2 * this.zoom );
			var cx = ( this.right + this.left ) / 2;
			var cy = ( this.top + this.bottom ) / 2;

			var left = cx - dx;
			var right = cx + dx;
			var top = cy + dy;
			var bottom = cy - dy;

			if ( this.view !== null && this.view.enabled ) {

				var zoomW = this.zoom / ( this.view.width / this.view.fullWidth );
				var zoomH = this.zoom / ( this.view.height / this.view.fullHeight );
				var scaleW = ( this.right - this.left ) / this.view.width;
				var scaleH = ( this.top - this.bottom ) / this.view.height;

				left += scaleW * ( this.view.offsetX / zoomW );
				right = left + scaleW * ( this.view.width / zoomW );
				top -= scaleH * ( this.view.offsetY / zoomH );
				bottom = top - scaleH * ( this.view.height / zoomH );

			}

			this.projectionMatrix.makeOrthographic( left, right, top, bottom, this.near, this.far );

			this.projectionMatrixInverse.getInverse( this.projectionMatrix );

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			data.object.zoom = this.zoom;
			data.object.left = this.left;
			data.object.right = this.right;
			data.object.top = this.top;
			data.object.bottom = this.bottom;
			data.object.near = this.near;
			data.object.far = this.far;

			if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

			return data;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function DirectionalLightShadow( ) {

		LightShadow.call( this, new OrthographicCamera( - 5, 5, 5, - 5, 0.5, 500 ) );

	}

	DirectionalLightShadow.prototype = Object.assign( Object.create( LightShadow.prototype ), {

		constructor: DirectionalLightShadow

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function DirectionalLight( color, intensity ) {

		Light.call( this, color, intensity );

		this.type = 'DirectionalLight';

		this.position.copy( Object3D.DefaultUp );
		this.updateMatrix();

		this.target = new Object3D();

		this.shadow = new DirectionalLightShadow();

	}

	DirectionalLight.prototype = Object.assign( Object.create( Light.prototype ), {

		constructor: DirectionalLight,

		isDirectionalLight: true,

		copy: function ( source ) {

			Light.prototype.copy.call( this, source );

			this.target = source.target.clone();

			this.shadow = source.shadow.clone();

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function PerspectiveCamera( fov, aspect, near, far ) {

		Camera.call( this );

		this.type = 'PerspectiveCamera';

		this.fov = fov !== undefined ? fov : 50;
		this.zoom = 1;

		this.near = near !== undefined ? near : 0.1;
		this.far = far !== undefined ? far : 2000;
		this.focus = 10;

		this.aspect = aspect !== undefined ? aspect : 1;
		this.view = null;

		this.filmGauge = 35;	// width of the film (default in millimeters)
		this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

		this.updateProjectionMatrix();

	}

	PerspectiveCamera.prototype = Object.assign( Object.create( Camera.prototype ), {

		constructor: PerspectiveCamera,

		isPerspectiveCamera: true,

		copy: function ( source, recursive ) {

			Camera.prototype.copy.call( this, source, recursive );

			this.fov = source.fov;
			this.zoom = source.zoom;

			this.near = source.near;
			this.far = source.far;
			this.focus = source.focus;

			this.aspect = source.aspect;
			this.view = source.view === null ? null : Object.assign( {}, source.view );

			this.filmGauge = source.filmGauge;
			this.filmOffset = source.filmOffset;

			return this;

		},
		setFocalLength: function ( focalLength ) {

			// see http://www.bobatkins.com/photography/technical/field_of_view.html
			var vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

			this.fov = _Math.RAD2DEG * 2 * Math.atan( vExtentSlope );
			this.updateProjectionMatrix();

		},
		getFocalLength: function () {

			var vExtentSlope = Math.tan( _Math.DEG2RAD * 0.5 * this.fov );

			return 0.5 * this.getFilmHeight() / vExtentSlope;

		},

		getEffectiveFOV: function () {

			return _Math.RAD2DEG * 2 * Math.atan(
				Math.tan( _Math.DEG2RAD * 0.5 * this.fov ) / this.zoom );

		},

		getFilmWidth: function () {

			// film not completely covered in portrait format (aspect < 1)
			return this.filmGauge * Math.min( this.aspect, 1 );

		},

		getFilmHeight: function () {

			// film not completely covered in landscape format (aspect > 1)
			return this.filmGauge / Math.max( this.aspect, 1 );

		},
		setViewOffset: function ( fullWidth, fullHeight, x, y, width, height ) {

			this.aspect = fullWidth / fullHeight;

			if ( this.view === null ) {

				this.view = {
					enabled: true,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				};

			}

			this.view.enabled = true;
			this.view.fullWidth = fullWidth;
			this.view.fullHeight = fullHeight;
			this.view.offsetX = x;
			this.view.offsetY = y;
			this.view.width = width;
			this.view.height = height;

			this.updateProjectionMatrix();

		},

		clearViewOffset: function () {

			if ( this.view !== null ) {

				this.view.enabled = false;

			}

			this.updateProjectionMatrix();

		},

		updateProjectionMatrix: function () {

			var near = this.near,
				top = near * Math.tan( _Math.DEG2RAD * 0.5 * this.fov ) / this.zoom,
				height = 2 * top,
				width = this.aspect * height,
				left = - 0.5 * width,
				view = this.view;

			if ( this.view !== null && this.view.enabled ) {

				var fullWidth = view.fullWidth,
					fullHeight = view.fullHeight;

				left += view.offsetX * width / fullWidth;
				top -= view.offsetY * height / fullHeight;
				width *= view.width / fullWidth;
				height *= view.height / fullHeight;

			}

			var skew = this.filmOffset;
			if ( skew !== 0 ) left += near * skew / this.getFilmWidth();

			this.projectionMatrix.makePerspective( left, left + width, top, top - height, near, this.far );

			this.projectionMatrixInverse.getInverse( this.projectionMatrix );

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			data.object.fov = this.fov;
			data.object.zoom = this.zoom;

			data.object.near = this.near;
			data.object.far = this.far;
			data.object.focus = this.focus;

			data.object.aspect = this.aspect;

			if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

			data.object.filmGauge = this.filmGauge;
			data.object.filmOffset = this.filmOffset;

			return data;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function PointLight( color, intensity, distance, decay ) {

		Light.call( this, color, intensity );

		this.type = 'PointLight';

		Object.defineProperty( this, 'power', {
			get: function () {

				// intensity = power per solid angle.
				// ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
				return this.intensity * 4 * Math.PI;

			},
			set: function ( power ) {

				// intensity = power per solid angle.
				// ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
				this.intensity = power / ( 4 * Math.PI );

			}
		} );

		this.distance = ( distance !== undefined ) ? distance : 0;
		this.decay = ( decay !== undefined ) ? decay : 1;	// for physically correct lights, should be 2.

		this.shadow = new LightShadow( new PerspectiveCamera( 90, 1, 0.5, 500 ) );

	}

	PointLight.prototype = Object.assign( Object.create( Light.prototype ), {

		constructor: PointLight,

		isPointLight: true,

		copy: function ( source ) {

			Light.prototype.copy.call( this, source );

			this.distance = source.distance;
			this.decay = source.decay;

			this.shadow = source.shadow.clone();

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function SpotLightShadow() {

		LightShadow.call( this, new PerspectiveCamera( 50, 1, 0.5, 500 ) );

	}

	SpotLightShadow.prototype = Object.assign( Object.create( LightShadow.prototype ), {

		constructor: SpotLightShadow,

		isSpotLightShadow: true,

		update: function ( light ) {

			var camera = this.camera;

			var fov = _Math.RAD2DEG * 2 * light.angle;
			var aspect = this.mapSize.width / this.mapSize.height;
			var far = light.distance || camera.far;

			if ( fov !== camera.fov || aspect !== camera.aspect || far !== camera.far ) {

				camera.fov = fov;
				camera.aspect = aspect;
				camera.far = far;
				camera.updateProjectionMatrix();

			}

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function SpotLight( color, intensity, distance, angle, penumbra, decay ) {

		Light.call( this, color, intensity );

		this.type = 'SpotLight';

		this.position.copy( Object3D.DefaultUp );
		this.updateMatrix();

		this.target = new Object3D();

		Object.defineProperty( this, 'power', {
			get: function () {

				// intensity = power per solid angle.
				// ref: equation (17) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
				return this.intensity * Math.PI;

			},
			set: function ( power ) {

				// intensity = power per solid angle.
				// ref: equation (17) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
				this.intensity = power / Math.PI;

			}
		} );

		this.distance = ( distance !== undefined ) ? distance : 0;
		this.angle = ( angle !== undefined ) ? angle : Math.PI / 3;
		this.penumbra = ( penumbra !== undefined ) ? penumbra : 0;
		this.decay = ( decay !== undefined ) ? decay : 1;	// for physically correct lights, should be 2.

		this.shadow = new SpotLightShadow();

	}

	SpotLight.prototype = Object.assign( Object.create( Light.prototype ), {

		constructor: SpotLight,

		isSpotLight: true,

		copy: function ( source ) {

			Light.prototype.copy.call( this, source );

			this.distance = source.distance;
			this.angle = source.angle;
			this.penumbra = source.penumbra;
			this.decay = source.decay;

			this.target = source.target.clone();

			this.shadow = source.shadow.clone();

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var materialId = 0;

	function Material() {

		Object.defineProperty( this, 'id', { value: materialId ++ } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'Material';

		this.fog = true;
		this.lights = true;

		this.blending = NormalBlending;
		this.side = FrontSide;
		this.flatShading = false;
		this.vertexColors = NoColors; // NoColors, VertexColors, FaceColors

		this.opacity = 1;
		this.transparent = false;

		this.blendSrc = SrcAlphaFactor;
		this.blendDst = OneMinusSrcAlphaFactor;
		this.blendEquation = AddEquation;
		this.blendSrcAlpha = null;
		this.blendDstAlpha = null;
		this.blendEquationAlpha = null;

		this.depthFunc = LessEqualDepth;
		this.depthTest = true;
		this.depthWrite = true;

		this.clippingPlanes = null;
		this.clipIntersection = false;
		this.clipShadows = false;

		this.shadowSide = null;

		this.colorWrite = true;

		this.precision = null; // override the renderer's default precision for this material

		this.polygonOffset = false;
		this.polygonOffsetFactor = 0;
		this.polygonOffsetUnits = 0;

		this.dithering = false;

		this.alphaTest = 0;
		this.premultipliedAlpha = false;

		this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer

		this.visible = true;

		this.userData = {};

		this.needsUpdate = true;

	}

	Material.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Material,

		isMaterial: true,

		onBeforeCompile: function () {},

		setValues: function ( values ) {

			if ( values === undefined ) return;

			for ( var key in values ) {

				var newValue = values[ key ];

				if ( newValue === undefined ) {

					console.warn( "Material: '" + key + "' parameter is undefined." );
					continue;

				}

				// for backward compatability if shading is set in the constructor
				if ( key === 'shading' ) {

					console.warn( '' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.' );
					this.flatShading = ( newValue === FlatShading ) ? true : false;
					continue;

				}

				var currentValue = this[ key ];

				if ( currentValue === undefined ) {

					console.warn( "" + this.type + ": '" + key + "' is not a property of this material." );
					continue;

				}

				if ( currentValue && currentValue.isColor ) {

					currentValue.set( newValue );

				} else if ( ( currentValue && currentValue.isVector3 ) && ( newValue && newValue.isVector3 ) ) {

					currentValue.copy( newValue );

				} else if ( key === 'overdraw' ) {

					// ensure overdraw is backwards-compatible with legacy boolean type
					this[ key ] = Number( newValue );

				} else {

					this[ key ] = newValue;

				}

			}

		},

		toJSON: function ( meta ) {

			var isRoot = ( meta === undefined || typeof meta === 'string' );

			if ( isRoot ) {

				meta = {
					textures: {},
					images: {}
				};

			}

			var data = {
				metadata: {
					version: 4.5,
					type: 'Material',
					generator: 'Material.toJSON'
				}
			};

			// standard Material serialization
			data.uuid = this.uuid;
			data.type = this.type;

			if ( this.name !== '' ) data.name = this.name;

			if ( this.color && this.color.isColor ) data.color = this.color.getHex();

			if ( this.roughness !== undefined ) data.roughness = this.roughness;
			if ( this.metalness !== undefined ) data.metalness = this.metalness;

			if ( this.emissive && this.emissive.isColor ) data.emissive = this.emissive.getHex();
			if ( this.emissiveIntensity !== 1 ) data.emissiveIntensity = this.emissiveIntensity;

			if ( this.specular && this.specular.isColor ) data.specular = this.specular.getHex();
			if ( this.shininess !== undefined ) data.shininess = this.shininess;
			if ( this.clearCoat !== undefined ) data.clearCoat = this.clearCoat;
			if ( this.clearCoatRoughness !== undefined ) data.clearCoatRoughness = this.clearCoatRoughness;

			if ( this.map && this.map.isTexture ) data.map = this.map.toJSON( meta ).uuid;
			if ( this.alphaMap && this.alphaMap.isTexture ) data.alphaMap = this.alphaMap.toJSON( meta ).uuid;
			if ( this.lightMap && this.lightMap.isTexture ) data.lightMap = this.lightMap.toJSON( meta ).uuid;

			if ( this.aoMap && this.aoMap.isTexture ) {

				data.aoMap = this.aoMap.toJSON( meta ).uuid;
				data.aoMapIntensity = this.aoMapIntensity;

			}

			if ( this.bumpMap && this.bumpMap.isTexture ) {

				data.bumpMap = this.bumpMap.toJSON( meta ).uuid;
				data.bumpScale = this.bumpScale;

			}

			if ( this.normalMap && this.normalMap.isTexture ) {

				data.normalMap = this.normalMap.toJSON( meta ).uuid;
				data.normalMapType = this.normalMapType;
				data.normalScale = this.normalScale.toArray();

			}

			if ( this.displacementMap && this.displacementMap.isTexture ) {

				data.displacementMap = this.displacementMap.toJSON( meta ).uuid;
				data.displacementScale = this.displacementScale;
				data.displacementBias = this.displacementBias;

			}

			if ( this.roughnessMap && this.roughnessMap.isTexture ) data.roughnessMap = this.roughnessMap.toJSON( meta ).uuid;
			if ( this.metalnessMap && this.metalnessMap.isTexture ) data.metalnessMap = this.metalnessMap.toJSON( meta ).uuid;

			if ( this.emissiveMap && this.emissiveMap.isTexture ) data.emissiveMap = this.emissiveMap.toJSON( meta ).uuid;
			if ( this.specularMap && this.specularMap.isTexture ) data.specularMap = this.specularMap.toJSON( meta ).uuid;

			if ( this.envMap && this.envMap.isTexture ) {

				data.envMap = this.envMap.toJSON( meta ).uuid;
				data.reflectivity = this.reflectivity; // Scale behind envMap

				if ( this.combine !== undefined ) data.combine = this.combine;
				if ( this.envMapIntensity !== undefined ) data.envMapIntensity = this.envMapIntensity;

			}

			if ( this.gradientMap && this.gradientMap.isTexture ) {

				data.gradientMap = this.gradientMap.toJSON( meta ).uuid;

			}

			if ( this.size !== undefined ) data.size = this.size;
			if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

			if ( this.blending !== NormalBlending ) data.blending = this.blending;
			if ( this.flatShading === true ) data.flatShading = this.flatShading;
			if ( this.side !== FrontSide ) data.side = this.side;
			if ( this.vertexColors !== NoColors ) data.vertexColors = this.vertexColors;

			if ( this.opacity < 1 ) data.opacity = this.opacity;
			if ( this.transparent === true ) data.transparent = this.transparent;

			data.depthFunc = this.depthFunc;
			data.depthTest = this.depthTest;
			data.depthWrite = this.depthWrite;

			// rotation (SpriteMaterial)
			if ( this.rotation !== 0 ) data.rotation = this.rotation;

			if ( this.polygonOffset === true ) data.polygonOffset = true;
			if ( this.polygonOffsetFactor !== 0 ) data.polygonOffsetFactor = this.polygonOffsetFactor;
			if ( this.polygonOffsetUnits !== 0 ) data.polygonOffsetUnits = this.polygonOffsetUnits;

			if ( this.linewidth !== 1 ) data.linewidth = this.linewidth;
			if ( this.dashSize !== undefined ) data.dashSize = this.dashSize;
			if ( this.gapSize !== undefined ) data.gapSize = this.gapSize;
			if ( this.scale !== undefined ) data.scale = this.scale;

			if ( this.dithering === true ) data.dithering = true;

			if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
			if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = this.premultipliedAlpha;

			if ( this.wireframe === true ) data.wireframe = this.wireframe;
			if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
			if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
			if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

			if ( this.morphTargets === true ) data.morphTargets = true;
			if ( this.skinning === true ) data.skinning = true;

			if ( this.visible === false ) data.visible = false;
			if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

			// TODO: Copied from Object3D.toJSON

			function extractFromCache( cache ) {

				var values = [];

				for ( var key in cache ) {

					var data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}

				return values;

			}

			if ( isRoot ) {

				var textures = extractFromCache( meta.textures );
				var images = extractFromCache( meta.images );

				if ( textures.length > 0 ) data.textures = textures;
				if ( images.length > 0 ) data.images = images;

			}

			return data;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.name = source.name;

			this.fog = source.fog;
			this.lights = source.lights;

			this.blending = source.blending;
			this.side = source.side;
			this.flatShading = source.flatShading;
			this.vertexColors = source.vertexColors;

			this.opacity = source.opacity;
			this.transparent = source.transparent;

			this.blendSrc = source.blendSrc;
			this.blendDst = source.blendDst;
			this.blendEquation = source.blendEquation;
			this.blendSrcAlpha = source.blendSrcAlpha;
			this.blendDstAlpha = source.blendDstAlpha;
			this.blendEquationAlpha = source.blendEquationAlpha;

			this.depthFunc = source.depthFunc;
			this.depthTest = source.depthTest;
			this.depthWrite = source.depthWrite;

			this.colorWrite = source.colorWrite;

			this.precision = source.precision;

			this.polygonOffset = source.polygonOffset;
			this.polygonOffsetFactor = source.polygonOffsetFactor;
			this.polygonOffsetUnits = source.polygonOffsetUnits;

			this.dithering = source.dithering;

			this.alphaTest = source.alphaTest;
			this.premultipliedAlpha = source.premultipliedAlpha;

			this.overdraw = source.overdraw;

			this.visible = source.visible;
			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			this.clipShadows = source.clipShadows;
			this.clipIntersection = source.clipIntersection;

			var srcPlanes = source.clippingPlanes,
				dstPlanes = null;

			if ( srcPlanes !== null ) {

				var n = srcPlanes.length;
				dstPlanes = new Array( n );

				for ( var i = 0; i !== n; ++ i )
					dstPlanes[ i ] = srcPlanes[ i ].clone();

			}

			this.clippingPlanes = dstPlanes;

			this.shadowSide = source.shadowSide;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var UniformsUtils = {

		merge: function ( uniforms ) {

			var merged = {};

			for ( var u = 0; u < uniforms.length; u ++ ) {

				var tmp = this.clone( uniforms[ u ] );

				for ( var p in tmp ) {

					merged[ p ] = tmp[ p ];

				}

			}

			return merged;

		},

		clone: function ( uniforms_src ) {

			var uniforms_dst = {};

			for ( var u in uniforms_src ) {

				uniforms_dst[ u ] = {};

				for ( var p in uniforms_src[ u ] ) {

					var parameter_src = uniforms_src[ u ][ p ];

					if ( parameter_src && ( parameter_src.isColor ||
						parameter_src.isMatrix3 || parameter_src.isMatrix4 ||
						parameter_src.isVector2 || parameter_src.isVector3 || parameter_src.isVector4 ||
						parameter_src.isTexture ) ) {

						uniforms_dst[ u ][ p ] = parameter_src.clone();

					} else if ( Array.isArray( parameter_src ) ) {

						uniforms_dst[ u ][ p ] = parameter_src.slice();

					} else {

						uniforms_dst[ u ][ p ] = parameter_src;

					}

				}

			}

			return uniforms_dst;

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function ShaderMaterial( parameters ) {

		Material.call( this );

		this.type = 'ShaderMaterial';

		this.defines = {};
		this.uniforms = {};

		this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
		this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';

		this.linewidth = 1;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false; // set to use scene fog
		this.lights = false; // set to use scene lights
		this.clipping = false; // set to use user-defined clipping planes

		this.skinning = false; // set to use skinning attribute streams
		this.morphTargets = false; // set to use morph targets
		this.morphNormals = false; // set to use morph normals

		this.extensions = {
			derivatives: false, // set to use derivatives
			fragDepth: false, // set to use fragment depth values
			drawBuffers: false, // set to use draw buffers
			shaderTextureLOD: false // set to use shader texture LOD
		};

		// When rendered geometry doesn't include these attributes but the material does,
		// use these default values in WebGL. This avoids errors when buffer data is missing.
		this.defaultAttributeValues = {
			'color': [ 1, 1, 1 ],
			'uv': [ 0, 0 ],
			'uv2': [ 0, 0 ]
		};

		this.index0AttributeName = undefined;
		this.uniformsNeedUpdate = false;

		if ( parameters !== undefined ) {

			if ( parameters.attributes !== undefined ) {

				console.error( 'ShaderMaterial: attributes should now be defined in BufferGeometry instead.' );

			}

			this.setValues( parameters );

		}

	}

	ShaderMaterial.prototype = Object.create( Material.prototype );
	ShaderMaterial.prototype.constructor = ShaderMaterial;

	ShaderMaterial.prototype.isShaderMaterial = true;

	ShaderMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.fragmentShader = source.fragmentShader;
		this.vertexShader = source.vertexShader;

		this.uniforms = UniformsUtils.clone( source.uniforms );

		this.defines = Object.assign( {}, source.defines );

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		this.lights = source.lights;
		this.clipping = source.clipping;

		this.skinning = source.skinning;

		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		this.extensions = source.extensions;

		return this;

	};

	ShaderMaterial.prototype.toJSON = function ( meta ) {

		var data = Material.prototype.toJSON.call( this, meta );

		data.uniforms = {};

		for ( var name in this.uniforms ) {

			var uniform = this.uniforms[ name ];
			var value = uniform.value;

			if ( value.isTexture ) {

				data.uniforms[ name ] = {
					type: 't',
					value: value.toJSON( meta ).uuid
				};

			} else if ( value.isColor ) {

				data.uniforms[ name ] = {
					type: 'c',
					value: value.getHex()
				};

			} else if ( value.isVector2 ) {

				data.uniforms[ name ] = {
					type: 'v2',
					value: value.toArray()
				};

			} else if ( value.isVector3 ) {

				data.uniforms[ name ] = {
					type: 'v3',
					value: value.toArray()
				};

			} else if ( value.isVector4 ) {

				data.uniforms[ name ] = {
					type: 'v4',
					value: value.toArray()
				};

			} else if ( value.isMatrix4 ) {

				data.uniforms[ name ] = {
					type: 'm4',
					value: value.toArray()
				};

			} else {

				data.uniforms[ name ] = {
					value: value
				};

				// note: the array variants v2v, v3v, v4v, m4v and tv are not supported so far

			}

		}

		if ( Object.keys( this.defines ).length > 0 ) data.defines = this.defines;

		data.vertexShader = this.vertexShader;
		data.fragmentShader = this.fragmentShader;

		return data;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshStandardMaterial( parameters ) {

		Material.call( this );

		this.defines = { 'STANDARD': '' };

		this.type = 'MeshStandardMaterial';

		this.color = new Color( 0xffffff ); // diffuse
		this.roughness = 0.5;
		this.metalness = 0.5;

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.emissive = new Color( 0x000000 );
		this.emissiveIntensity = 1.0;
		this.emissiveMap = null;

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2( 1, 1 );

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.roughnessMap = null;

		this.metalnessMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.envMapIntensity = 1.0;

		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.setValues( parameters );

	}

	MeshStandardMaterial.prototype = Object.create( Material.prototype );
	MeshStandardMaterial.prototype.constructor = MeshStandardMaterial;

	MeshStandardMaterial.prototype.isMeshStandardMaterial = true;

	MeshStandardMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.defines = { 'STANDARD': '' };

		this.color.copy( source.color );
		this.roughness = source.roughness;
		this.metalness = source.metalness;

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.emissive.copy( source.emissive );
		this.emissiveMap = source.emissiveMap;
		this.emissiveIntensity = source.emissiveIntensity;

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy( source.normalScale );

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.roughnessMap = source.roughnessMap;

		this.metalnessMap = source.metalnessMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.envMapIntensity = source.envMapIntensity;

		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Vector4( x, y, z, w ) {

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = ( w !== undefined ) ? w : 1;

	}

	Object.assign( Vector4.prototype, {

		isVector4: true,

		set: function ( x, y, z, w ) {

			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;
			this.z = scalar;
			this.w = scalar;

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

		setW: function ( w ) {

			this.w = w;

			return this;

		},

		setComponent: function ( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				case 2: this.z = value; break;
				case 3: this.w = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		},

		getComponent: function ( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				case 2: return this.z;
				case 3: return this.w;
				default: throw new Error( 'index is out of range: ' + index );

			}

		},

		clone: function () {

			return new this.constructor( this.x, this.y, this.z, this.w );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
			this.w = ( v.w !== undefined ) ? v.w : 1;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
			this.w += v.w;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;
			this.z += s;
			this.w += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;
			this.w = a.w + b.w;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;
			this.z += v.z * s;
			this.w += v.w * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
			this.w -= v.w;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;
			this.z -= s;
			this.w -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;
			this.w = a.w - b.w;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;
			this.w *= scalar;

			return this;

		},

		applyMatrix4: function ( m ) {

			var x = this.x, y = this.y, z = this.z, w = this.w;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
			this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
			this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
			this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		setAxisAngleFromQuaternion: function ( q ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

			// q is assumed to be normalized

			this.w = 2 * Math.acos( q.w );

			var s = Math.sqrt( 1 - q.w * q.w );

			if ( s < 0.0001 ) {

				this.x = 1;
				this.y = 0;
				this.z = 0;

			} else {

				this.x = q.x / s;
				this.y = q.y / s;
				this.z = q.z / s;

			}

			return this;

		},

		setAxisAngleFromRotationMatrix: function ( m ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			var angle, x, y, z,		// variables for result
				epsilon = 0.01,		// margin to allow for rounding errors
				epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

				te = m.elements,

				m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
				m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
				m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

			if ( ( Math.abs( m12 - m21 ) < epsilon ) &&
			     ( Math.abs( m13 - m31 ) < epsilon ) &&
			     ( Math.abs( m23 - m32 ) < epsilon ) ) {

				// singularity found
				// first check for identity matrix which must have +1 for all terms
				// in leading diagonal and zero in other terms

				if ( ( Math.abs( m12 + m21 ) < epsilon2 ) &&
				     ( Math.abs( m13 + m31 ) < epsilon2 ) &&
				     ( Math.abs( m23 + m32 ) < epsilon2 ) &&
				     ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

					// this singularity is identity matrix so angle = 0

					this.set( 1, 0, 0, 0 );

					return this; // zero angle, arbitrary axis

				}

				// otherwise this singularity is angle = 180

				angle = Math.PI;

				var xx = ( m11 + 1 ) / 2;
				var yy = ( m22 + 1 ) / 2;
				var zz = ( m33 + 1 ) / 2;
				var xy = ( m12 + m21 ) / 4;
				var xz = ( m13 + m31 ) / 4;
				var yz = ( m23 + m32 ) / 4;

				if ( ( xx > yy ) && ( xx > zz ) ) {

					// m11 is the largest diagonal term

					if ( xx < epsilon ) {

						x = 0;
						y = 0.707106781;
						z = 0.707106781;

					} else {

						x = Math.sqrt( xx );
						y = xy / x;
						z = xz / x;

					}

				} else if ( yy > zz ) {

					// m22 is the largest diagonal term

					if ( yy < epsilon ) {

						x = 0.707106781;
						y = 0;
						z = 0.707106781;

					} else {

						y = Math.sqrt( yy );
						x = xy / y;
						z = yz / y;

					}

				} else {

					// m33 is the largest diagonal term so base result on this

					if ( zz < epsilon ) {

						x = 0.707106781;
						y = 0.707106781;
						z = 0;

					} else {

						z = Math.sqrt( zz );
						x = xz / z;
						y = yz / z;

					}

				}

				this.set( x, y, z, angle );

				return this; // return 180 deg rotation

			}

			// as we have reached here there are no singularities so we can handle normally

			var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 ) +
			                   ( m13 - m31 ) * ( m13 - m31 ) +
			                   ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

			if ( Math.abs( s ) < 0.001 ) s = 1;

			// prevent divide by zero, should not happen if matrix is orthogonal and should be
			// caught by singularity test above, but I've left it in just in case

			this.x = ( m32 - m23 ) / s;
			this.y = ( m13 - m31 ) / s;
			this.z = ( m21 - m12 ) / s;
			this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

			return this;

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );
			this.z = Math.min( this.z, v.z );
			this.w = Math.min( this.w, v.w );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );
			this.z = Math.max( this.z, v.z );
			this.w = Math.max( this.w, v.w );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );
			this.z = Math.max( min.z, Math.min( max.z, this.z ) );
			this.w = Math.max( min.w, Math.min( max.w, this.w ) );

			return this;

		},

		clampScalar: function () {

			var min, max;

			return function clampScalar( minVal, maxVal ) {

				if ( min === undefined ) {

					min = new Vector4();
					max = new Vector4();

				}

				min.set( minVal, minVal, minVal, minVal );
				max.set( maxVal, maxVal, maxVal, maxVal );

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
			this.w = Math.floor( this.w );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );
			this.z = Math.ceil( this.z );
			this.w = Math.ceil( this.w );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );
			this.z = Math.round( this.z );
			this.w = Math.round( this.w );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
			this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
			this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;
			this.z = - this.z;
			this.w = - this.w;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

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
			this.w += ( v.w - this.w ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];
			this.z = array[ offset + 2 ];
			this.w = array[ offset + 3 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;
			array[ offset + 2 ] = this.z;
			array[ offset + 3 ] = this.w;

			return array;

		},

		fromBufferAttribute: function ( attribute, index, offset ) {

			if ( offset !== undefined ) {

				console.warn( 'Vector4: offset has been removed from .fromBufferAttribute().' );

			}

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );
			this.z = attribute.getZ( index );
			this.w = attribute.getW( index );

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function BufferAttribute( array, itemSize, normalized ) {

		if ( Array.isArray( array ) ) {

			throw new TypeError( 'BufferAttribute: array should be a Typed Array.' );

		}

		this.name = '';

		this.array = array;
		this.itemSize = itemSize;
		this.count = array !== undefined ? array.length / itemSize : 0;
		this.normalized = normalized === true;

		this.dynamic = false;
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	Object.defineProperty( BufferAttribute.prototype, 'needsUpdate', {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	Object.assign( BufferAttribute.prototype, {

		isBufferAttribute: true,

		onUploadCallback: function () {},

		setArray: function ( array ) {

			if ( Array.isArray( array ) ) {

				throw new TypeError( 'BufferAttribute: array should be a Typed Array.' );

			}

			this.count = array !== undefined ? array.length / this.itemSize : 0;
			this.array = array;

			return this;

		},

		setDynamic: function ( value ) {

			this.dynamic = value;

			return this;

		},

		copy: function ( source ) {

			this.name = source.name;
			this.array = new source.array.constructor( source.array );
			this.itemSize = source.itemSize;
			this.count = source.count;
			this.normalized = source.normalized;

			this.dynamic = source.dynamic;

			return this;

		},

		copyAt: function ( index1, attribute, index2 ) {

			index1 *= this.itemSize;
			index2 *= attribute.itemSize;

			for ( var i = 0, l = this.itemSize; i < l; i ++ ) {

				this.array[ index1 + i ] = attribute.array[ index2 + i ];

			}

			return this;

		},

		copyArray: function ( array ) {

			this.array.set( array );

			return this;

		},

		copyColorsArray: function ( colors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = colors.length; i < l; i ++ ) {

				var color = colors[ i ];

				if ( color === undefined ) {

					console.warn( 'BufferAttribute.copyColorsArray(): color is undefined', i );
					color = new Color();

				}

				array[ offset ++ ] = color.r;
				array[ offset ++ ] = color.g;
				array[ offset ++ ] = color.b;

			}

			return this;

		},

		copyVector2sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'BufferAttribute.copyVector2sArray(): vector is undefined', i );
					vector = new Vector2();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;

			}

			return this;

		},

		copyVector3sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'BufferAttribute.copyVector3sArray(): vector is undefined', i );
					vector = new Vector3();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;
				array[ offset ++ ] = vector.z;

			}

			return this;

		},

		copyVector4sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'BufferAttribute.copyVector4sArray(): vector is undefined', i );
					vector = new Vector4();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;
				array[ offset ++ ] = vector.z;
				array[ offset ++ ] = vector.w;

			}

			return this;

		},

		set: function ( value, offset ) {

			if ( offset === undefined ) offset = 0;

			this.array.set( value, offset );

			return this;

		},

		getX: function ( index ) {

			return this.array[ index * this.itemSize ];

		},

		setX: function ( index, x ) {

			this.array[ index * this.itemSize ] = x;

			return this;

		},

		getY: function ( index ) {

			return this.array[ index * this.itemSize + 1 ];

		},

		setY: function ( index, y ) {

			this.array[ index * this.itemSize + 1 ] = y;

			return this;

		},

		getZ: function ( index ) {

			return this.array[ index * this.itemSize + 2 ];

		},

		setZ: function ( index, z ) {

			this.array[ index * this.itemSize + 2 ] = z;

			return this;

		},

		getW: function ( index ) {

			return this.array[ index * this.itemSize + 3 ];

		},

		setW: function ( index, w ) {

			this.array[ index * this.itemSize + 3 ] = w;

			return this;

		},

		setXY: function ( index, x, y ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;

			return this;

		},

		setXYZ: function ( index, x, y, z ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;

			return this;

		},

		setXYZW: function ( index, x, y, z, w ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;
			this.array[ index + 3 ] = w;

			return this;

		},

		onUpload: function ( callback ) {

			this.onUploadCallback = callback;

			return this;

		},

		clone: function () {

			return new this.constructor( this.array, this.itemSize ).copy( this );

		}

	} );

	//

	function Int8BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int8Array( array ), itemSize, normalized );

	}

	Int8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int8BufferAttribute.prototype.constructor = Int8BufferAttribute;
	function Uint8BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint8Array( array ), itemSize, normalized );

	}

	Uint8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint8BufferAttribute.prototype.constructor = Uint8BufferAttribute;
	function Uint8ClampedBufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint8ClampedArray( array ), itemSize, normalized );

	}

	Uint8ClampedBufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint8ClampedBufferAttribute.prototype.constructor = Uint8ClampedBufferAttribute;
	function Int16BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int16Array( array ), itemSize, normalized );

	}

	Int16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int16BufferAttribute.prototype.constructor = Int16BufferAttribute;
	function Uint16BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint16Array( array ), itemSize, normalized );

	}

	Uint16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;
	function Int32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int32Array( array ), itemSize, normalized );

	}

	Int32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int32BufferAttribute.prototype.constructor = Int32BufferAttribute;
	function Uint32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint32Array( array ), itemSize, normalized );

	}

	Uint32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;
	function Float32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Float32Array( array ), itemSize, normalized );

	}

	Float32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;
	function Float64BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Float64Array( array ), itemSize, normalized );

	}

	Float64BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Float64BufferAttribute.prototype.constructor = Float64BufferAttribute;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function TextureLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	}

	Object.assign( TextureLoader.prototype, {

		crossOrigin: 'anonymous',

		load: function ( url, onLoad, onProgress, onError ) {

			var texture = new Texture();

			var loader = new ImageLoader( this.manager );
			loader.setCrossOrigin( this.crossOrigin );
			loader.setPath( this.path );

			loader.load( url, function ( image ) {

				texture.image = image;

				// JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
				var isJPEG = url.search( /\.jpe?g$/i ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

				texture.format = isJPEG ? RGBFormat : RGBAFormat;
				texture.needsUpdate = true;

				if ( onLoad !== undefined ) {

					onLoad( texture );

				}

			}, onProgress, onError );

			return texture;

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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function InterleavedBuffer( array, stride ) {

		this.array = array;
		this.stride = stride;
		this.count = array !== undefined ? array.length / stride : 0;

		this.dynamic = false;
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	Object.defineProperty( InterleavedBuffer.prototype, 'needsUpdate', {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	Object.assign( InterleavedBuffer.prototype, {

		isInterleavedBuffer: true,

		onUploadCallback: function () {},

		setArray: function ( array ) {

			if ( Array.isArray( array ) ) {

				throw new TypeError( 'BufferAttribute: array should be a Typed Array.' );

			}

			this.count = array !== undefined ? array.length / this.stride : 0;
			this.array = array;

			return this;

		},

		setDynamic: function ( value ) {

			this.dynamic = value;

			return this;

		},

		copy: function ( source ) {

			this.array = new source.array.constructor( source.array );
			this.count = source.count;
			this.stride = source.stride;
			this.dynamic = source.dynamic;

			return this;

		},

		copyAt: function ( index1, attribute, index2 ) {

			index1 *= this.stride;
			index2 *= attribute.stride;

			for ( var i = 0, l = this.stride; i < l; i ++ ) {

				this.array[ index1 + i ] = attribute.array[ index2 + i ];

			}

			return this;

		},

		set: function ( value, offset ) {

			if ( offset === undefined ) offset = 0;

			this.array.set( value, offset );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		onUpload: function ( callback ) {

			this.onUploadCallback = callback;

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, normalized ) {

		this.data = interleavedBuffer;
		this.itemSize = itemSize;
		this.offset = offset;

		this.normalized = normalized === true;

	}

	Object.defineProperties( InterleavedBufferAttribute.prototype, {

		count: {

			get: function () {

				return this.data.count;

			}

		},

		array: {

			get: function () {

				return this.data.array;

			}

		}

	} );

	Object.assign( InterleavedBufferAttribute.prototype, {

		isInterleavedBufferAttribute: true,

		setX: function ( index, x ) {

			this.data.array[ index * this.data.stride + this.offset ] = x;

			return this;

		},

		setY: function ( index, y ) {

			this.data.array[ index * this.data.stride + this.offset + 1 ] = y;

			return this;

		},

		setZ: function ( index, z ) {

			this.data.array[ index * this.data.stride + this.offset + 2 ] = z;

			return this;

		},

		setW: function ( index, w ) {

			this.data.array[ index * this.data.stride + this.offset + 3 ] = w;

			return this;

		},

		getX: function ( index ) {

			return this.data.array[ index * this.data.stride + this.offset ];

		},

		getY: function ( index ) {

			return this.data.array[ index * this.data.stride + this.offset + 1 ];

		},

		getZ: function ( index ) {

			return this.data.array[ index * this.data.stride + this.offset + 2 ];

		},

		getW: function ( index ) {

			return this.data.array[ index * this.data.stride + this.offset + 3 ];

		},

		setXY: function ( index, x, y ) {

			index = index * this.data.stride + this.offset;

			this.data.array[ index + 0 ] = x;
			this.data.array[ index + 1 ] = y;

			return this;

		},

		setXYZ: function ( index, x, y, z ) {

			index = index * this.data.stride + this.offset;

			this.data.array[ index + 0 ] = x;
			this.data.array[ index + 1 ] = y;
			this.data.array[ index + 2 ] = z;

			return this;

		},

		setXYZW: function ( index, x, y, z, w ) {

			index = index * this.data.stride + this.offset;

			this.data.array[ index + 0 ] = x;
			this.data.array[ index + 1 ] = y;
			this.data.array[ index + 2 ] = z;
			this.data.array[ index + 3 ] = w;

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Sphere( center, radius ) {

		this.center = ( center !== undefined ) ? center : new Vector3();
		this.radius = ( radius !== undefined ) ? radius : 0;

	}

	Object.assign( Sphere.prototype, {

		set: function ( center, radius ) {

			this.center.copy( center );
			this.radius = radius;

			return this;

		},

		setFromPoints: function () {

			var box = new Box3();

			return function setFromPoints( points, optionalCenter ) {

				var center = this.center;

				if ( optionalCenter !== undefined ) {

					center.copy( optionalCenter );

				} else {

					box.setFromPoints( points ).getCenter( center );

				}

				var maxRadiusSq = 0;

				for ( var i = 0, il = points.length; i < il; i ++ ) {

					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

				}

				this.radius = Math.sqrt( maxRadiusSq );

				return this;

			};

		}(),

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( sphere ) {

			this.center.copy( sphere.center );
			this.radius = sphere.radius;

			return this;

		},

		empty: function () {

			return ( this.radius <= 0 );

		},

		containsPoint: function ( point ) {

			return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

		},

		distanceToPoint: function ( point ) {

			return ( point.distanceTo( this.center ) - this.radius );

		},

		intersectsSphere: function ( sphere ) {

			var radiusSum = this.radius + sphere.radius;

			return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

		},

		intersectsBox: function ( box ) {

			return box.intersectsSphere( this );

		},

		intersectsPlane: function ( plane ) {

			return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

		},

		clampPoint: function ( point, target ) {

			var deltaLengthSq = this.center.distanceToSquared( point );

			if ( target === undefined ) {

				console.warn( 'Sphere: .clampPoint() target is now required' );
				target = new Vector3();

			}

			target.copy( point );

			if ( deltaLengthSq > ( this.radius * this.radius ) ) {

				target.sub( this.center ).normalize();
				target.multiplyScalar( this.radius ).add( this.center );

			}

			return target;

		},

		getBoundingBox: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Sphere: .getBoundingBox() target is now required' );
				target = new Box3();

			}

			target.set( this.center, this.center );
			target.expandByScalar( this.radius );

			return target;

		},

		applyMatrix4: function ( matrix ) {

			this.center.applyMatrix4( matrix );
			this.radius = this.radius * matrix.getMaxScaleOnAxis();

			return this;

		},

		translate: function ( offset ) {

			this.center.add( offset );

			return this;

		},

		equals: function ( sphere ) {

			return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Box3( min, max ) {

		this.min = ( min !== undefined ) ? min : new Vector3( + Infinity, + Infinity, + Infinity );
		this.max = ( max !== undefined ) ? max : new Vector3( - Infinity, - Infinity, - Infinity );

	}

	Object.assign( Box3.prototype, {

		isBox3: true,

		set: function ( min, max ) {

			this.min.copy( min );
			this.max.copy( max );

			return this;

		},

		setFromArray: function ( array ) {

			var minX = + Infinity;
			var minY = + Infinity;
			var minZ = + Infinity;

			var maxX = - Infinity;
			var maxY = - Infinity;
			var maxZ = - Infinity;

			for ( var i = 0, l = array.length; i < l; i += 3 ) {

				var x = array[ i ];
				var y = array[ i + 1 ];
				var z = array[ i + 2 ];

				if ( x < minX ) minX = x;
				if ( y < minY ) minY = y;
				if ( z < minZ ) minZ = z;

				if ( x > maxX ) maxX = x;
				if ( y > maxY ) maxY = y;
				if ( z > maxZ ) maxZ = z;

			}

			this.min.set( minX, minY, minZ );
			this.max.set( maxX, maxY, maxZ );

			return this;

		},

		setFromBufferAttribute: function ( attribute ) {

			var minX = + Infinity;
			var minY = + Infinity;
			var minZ = + Infinity;

			var maxX = - Infinity;
			var maxY = - Infinity;
			var maxZ = - Infinity;

			for ( var i = 0, l = attribute.count; i < l; i ++ ) {

				var x = attribute.getX( i );
				var y = attribute.getY( i );
				var z = attribute.getZ( i );

				if ( x < minX ) minX = x;
				if ( y < minY ) minY = y;
				if ( z < minZ ) minZ = z;

				if ( x > maxX ) maxX = x;
				if ( y > maxY ) maxY = y;
				if ( z > maxZ ) maxZ = z;

			}

			this.min.set( minX, minY, minZ );
			this.max.set( maxX, maxY, maxZ );

			return this;

		},

		setFromPoints: function ( points ) {

			this.makeEmpty();

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				this.expandByPoint( points[ i ] );

			}

			return this;

		},

		setFromCenterAndSize: function () {

			var v1 = new Vector3();

			return function setFromCenterAndSize( center, size ) {

				var halfSize = v1.copy( size ).multiplyScalar( 0.5 );

				this.min.copy( center ).sub( halfSize );
				this.max.copy( center ).add( halfSize );

				return this;

			};

		}(),

		setFromObject: function ( object ) {

			this.makeEmpty();

			return this.expandByObject( object );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( box ) {

			this.min.copy( box.min );
			this.max.copy( box.max );

			return this;

		},

		makeEmpty: function () {

			this.min.x = this.min.y = this.min.z = + Infinity;
			this.max.x = this.max.y = this.max.z = - Infinity;

			return this;

		},

		isEmpty: function () {

			// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

			return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

		},

		getCenter: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Box3: .getCenter() target is now required' );
				target = new Vector3();

			}

			return this.isEmpty() ? target.set( 0, 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

		},

		getSize: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Box3: .getSize() target is now required' );
				target = new Vector3();

			}

			return this.isEmpty() ? target.set( 0, 0, 0 ) : target.subVectors( this.max, this.min );

		},

		expandByPoint: function ( point ) {

			this.min.min( point );
			this.max.max( point );

			return this;

		},

		expandByVector: function ( vector ) {

			this.min.sub( vector );
			this.max.add( vector );

			return this;

		},

		expandByScalar: function ( scalar ) {

			this.min.addScalar( - scalar );
			this.max.addScalar( scalar );

			return this;

		},

		expandByObject: function () {

			// Computes the world-axis-aligned bounding box of an object (including its children),
			// accounting for both the object's, and children's, world transforms

			var scope, i, l;

			var v1 = new Vector3();

			function traverse( node ) {

				var geometry = node.geometry;

				if ( geometry !== undefined ) {

					if ( geometry.isGeometry ) {

						var vertices = geometry.vertices;

						for ( i = 0, l = vertices.length; i < l; i ++ ) {

							v1.copy( vertices[ i ] );
							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					} else if ( geometry.isBufferGeometry ) {

						var attribute = geometry.attributes.position;

						if ( attribute !== undefined ) {

							for ( i = 0, l = attribute.count; i < l; i ++ ) {

								v1.fromBufferAttribute( attribute, i ).applyMatrix4( node.matrixWorld );

								scope.expandByPoint( v1 );

							}

						}

					}

				}

			}

			return function expandByObject( object ) {

				scope = this;

				object.updateMatrixWorld( true );

				object.traverse( traverse );

				return this;

			};

		}(),

		containsPoint: function ( point ) {

			return point.x < this.min.x || point.x > this.max.x ||
				point.y < this.min.y || point.y > this.max.y ||
				point.z < this.min.z || point.z > this.max.z ? false : true;

		},

		containsBox: function ( box ) {

			return this.min.x <= box.min.x && box.max.x <= this.max.x &&
				this.min.y <= box.min.y && box.max.y <= this.max.y &&
				this.min.z <= box.min.z && box.max.z <= this.max.z;

		},

		getParameter: function ( point, target ) {

			// This can potentially have a divide by zero if the box
			// has a size dimension of 0.

			if ( target === undefined ) {

				console.warn( 'Box3: .getParameter() target is now required' );
				target = new Vector3();

			}

			return target.set(
				( point.x - this.min.x ) / ( this.max.x - this.min.x ),
				( point.y - this.min.y ) / ( this.max.y - this.min.y ),
				( point.z - this.min.z ) / ( this.max.z - this.min.z )
			);

		},

		intersectsBox: function ( box ) {

			// using 6 splitting planes to rule out intersections.
			return box.max.x < this.min.x || box.min.x > this.max.x ||
				box.max.y < this.min.y || box.min.y > this.max.y ||
				box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

		},

		intersectsSphere: ( function () {

			var closestPoint = new Vector3();

			return function intersectsSphere( sphere ) {

				// Find the point on the AABB closest to the sphere center.
				this.clampPoint( sphere.center, closestPoint );

				// If that point is inside the sphere, the AABB and sphere intersect.
				return closestPoint.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

			};

		} )(),

		intersectsPlane: function ( plane ) {

			// We compute the minimum and maximum dot product values. If those values
			// are on the same side (back or front) of the plane, then there is no intersection.

			var min, max;

			if ( plane.normal.x > 0 ) {

				min = plane.normal.x * this.min.x;
				max = plane.normal.x * this.max.x;

			} else {

				min = plane.normal.x * this.max.x;
				max = plane.normal.x * this.min.x;

			}

			if ( plane.normal.y > 0 ) {

				min += plane.normal.y * this.min.y;
				max += plane.normal.y * this.max.y;

			} else {

				min += plane.normal.y * this.max.y;
				max += plane.normal.y * this.min.y;

			}

			if ( plane.normal.z > 0 ) {

				min += plane.normal.z * this.min.z;
				max += plane.normal.z * this.max.z;

			} else {

				min += plane.normal.z * this.max.z;
				max += plane.normal.z * this.min.z;

			}

			return ( min <= - plane.constant && max >= - plane.constant );

		},

		intersectsTriangle: ( function () {

			// triangle centered vertices
			var v0 = new Vector3();
			var v1 = new Vector3();
			var v2 = new Vector3();

			// triangle edge vectors
			var f0 = new Vector3();
			var f1 = new Vector3();
			var f2 = new Vector3();

			var testAxis = new Vector3();

			var center = new Vector3();
			var extents = new Vector3();

			var triangleNormal = new Vector3();

			function satForAxes( axes ) {

				var i, j;

				for ( i = 0, j = axes.length - 3; i <= j; i += 3 ) {

					testAxis.fromArray( axes, i );
					// project the aabb onto the seperating axis
					var r = extents.x * Math.abs( testAxis.x ) + extents.y * Math.abs( testAxis.y ) + extents.z * Math.abs( testAxis.z );
					// project all 3 vertices of the triangle onto the seperating axis
					var p0 = v0.dot( testAxis );
					var p1 = v1.dot( testAxis );
					var p2 = v2.dot( testAxis );
					// actual test, basically see if either of the most extreme of the triangle points intersects r
					if ( Math.max( - Math.max( p0, p1, p2 ), Math.min( p0, p1, p2 ) ) > r ) {

						// points of the projected triangle are outside the projected half-length of the aabb
						// the axis is seperating and we can exit
						return false;

					}

				}

				return true;

			}

			return function intersectsTriangle( triangle ) {

				if ( this.isEmpty() ) {

					return false;

				}

				// compute box center and extents
				this.getCenter( center );
				extents.subVectors( this.max, center );

				// translate triangle to aabb origin
				v0.subVectors( triangle.a, center );
				v1.subVectors( triangle.b, center );
				v2.subVectors( triangle.c, center );

				// compute edge vectors for triangle
				f0.subVectors( v1, v0 );
				f1.subVectors( v2, v1 );
				f2.subVectors( v0, v2 );

				// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
				// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
				// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
				var axes = [
					0, - f0.z, f0.y, 0, - f1.z, f1.y, 0, - f2.z, f2.y,
					f0.z, 0, - f0.x, f1.z, 0, - f1.x, f2.z, 0, - f2.x,
					- f0.y, f0.x, 0, - f1.y, f1.x, 0, - f2.y, f2.x, 0
				];
				if ( ! satForAxes( axes ) ) {

					return false;

				}

				// test 3 face normals from the aabb
				axes = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
				if ( ! satForAxes( axes ) ) {

					return false;

				}

				// finally testing the face normal of the triangle
				// use already existing triangle edge vectors here
				triangleNormal.crossVectors( f0, f1 );
				axes = [ triangleNormal.x, triangleNormal.y, triangleNormal.z ];
				return satForAxes( axes );

			};

		} )(),

		clampPoint: function ( point, target ) {

			if ( target === undefined ) {

				console.warn( 'Box3: .clampPoint() target is now required' );
				target = new Vector3();

			}

			return target.copy( point ).clamp( this.min, this.max );

		},

		distanceToPoint: function () {

			var v1 = new Vector3();

			return function distanceToPoint( point ) {

				var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
				return clampedPoint.sub( point ).length();

			};

		}(),

		getBoundingSphere: function () {

			var v1 = new Vector3();

			return function getBoundingSphere( target ) {

				if ( target === undefined ) {

					console.warn( 'Box3: .getBoundingSphere() target is now required' );
					target = new Sphere();

				}

				this.getCenter( target.center );

				target.radius = this.getSize( v1 ).length() * 0.5;

				return target;

			};

		}(),

		intersect: function ( box ) {

			this.min.max( box.min );
			this.max.min( box.max );

			// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
			if ( this.isEmpty() ) this.makeEmpty();

			return this;

		},

		union: function ( box ) {

			this.min.min( box.min );
			this.max.max( box.max );

			return this;

		},

		applyMatrix4: function () {

			var points = [
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3()
			];

			return function applyMatrix4( matrix ) {

				// transform of empty box is an empty box.
				if ( this.isEmpty() ) return this;

				// NOTE: I am using a binary pattern to specify all 2^3 combinations below
				points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
				points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
				points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
				points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
				points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
				points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
				points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
				points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 111

				this.setFromPoints( points );

				return this;

			};

		}(),

		translate: function ( offset ) {

			this.min.add( offset );
			this.max.add( offset );

			return this;

		},

		equals: function ( box ) {

			return box.min.equals( this.min ) && box.max.equals( this.max );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function DirectGeometry() {

		this.vertices = [];
		this.normals = [];
		this.colors = [];
		this.uvs = [];
		this.uvs2 = [];

		this.groups = [];

		this.morphTargets = {};

		this.skinWeights = [];
		this.skinIndices = [];

		// this.lineDistances = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		// update flags

		this.verticesNeedUpdate = false;
		this.normalsNeedUpdate = false;
		this.colorsNeedUpdate = false;
		this.uvsNeedUpdate = false;
		this.groupsNeedUpdate = false;

	}

	Object.assign( DirectGeometry.prototype, {

		computeGroups: function ( geometry ) {

			var group;
			var groups = [];
			var materialIndex = undefined;

			var faces = geometry.faces;

			for ( var i = 0; i < faces.length; i ++ ) {

				var face = faces[ i ];

				// materials

				if ( face.materialIndex !== materialIndex ) {

					materialIndex = face.materialIndex;

					if ( group !== undefined ) {

						group.count = ( i * 3 ) - group.start;
						groups.push( group );

					}

					group = {
						start: i * 3,
						materialIndex: materialIndex
					};

				}

			}

			if ( group !== undefined ) {

				group.count = ( i * 3 ) - group.start;
				groups.push( group );

			}

			this.groups = groups;

		},

		fromGeometry: function ( geometry ) {

			var faces = geometry.faces;
			var vertices = geometry.vertices;
			var faceVertexUvs = geometry.faceVertexUvs;

			var hasFaceVertexUv = faceVertexUvs[ 0 ] && faceVertexUvs[ 0 ].length > 0;
			var hasFaceVertexUv2 = faceVertexUvs[ 1 ] && faceVertexUvs[ 1 ].length > 0;

			// morphs

			var morphTargets = geometry.morphTargets;
			var morphTargetsLength = morphTargets.length;

			var morphTargetsPosition;

			if ( morphTargetsLength > 0 ) {

				morphTargetsPosition = [];

				for ( var i = 0; i < morphTargetsLength; i ++ ) {

					morphTargetsPosition[ i ] = {
						name: morphTargets[ i ].name,
					 	data: []
					};

				}

				this.morphTargets.position = morphTargetsPosition;

			}

			var morphNormals = geometry.morphNormals;
			var morphNormalsLength = morphNormals.length;

			var morphTargetsNormal;

			if ( morphNormalsLength > 0 ) {

				morphTargetsNormal = [];

				for ( var i = 0; i < morphNormalsLength; i ++ ) {

					morphTargetsNormal[ i ] = {
						name: morphNormals[ i ].name,
					 	data: []
					};

				}

				this.morphTargets.normal = morphTargetsNormal;

			}

			// skins

			var skinIndices = geometry.skinIndices;
			var skinWeights = geometry.skinWeights;

			var hasSkinIndices = skinIndices.length === vertices.length;
			var hasSkinWeights = skinWeights.length === vertices.length;

			//

			if ( vertices.length > 0 && faces.length === 0 ) {

				console.error( 'DirectGeometry: Faceless geometries are not supported.' );

			}

			for ( var i = 0; i < faces.length; i ++ ) {

				var face = faces[ i ];

				this.vertices.push( vertices[ face.a ], vertices[ face.b ], vertices[ face.c ] );

				var vertexNormals = face.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					this.normals.push( vertexNormals[ 0 ], vertexNormals[ 1 ], vertexNormals[ 2 ] );

				} else {

					var normal = face.normal;

					this.normals.push( normal, normal, normal );

				}

				var vertexColors = face.vertexColors;

				if ( vertexColors.length === 3 ) {

					this.colors.push( vertexColors[ 0 ], vertexColors[ 1 ], vertexColors[ 2 ] );

				} else {

					var color = face.color;

					this.colors.push( color, color, color );

				}

				if ( hasFaceVertexUv === true ) {

					var vertexUvs = faceVertexUvs[ 0 ][ i ];

					if ( vertexUvs !== undefined ) {

						this.uvs.push( vertexUvs[ 0 ], vertexUvs[ 1 ], vertexUvs[ 2 ] );

					} else {

						console.warn( 'DirectGeometry.fromGeometry(): Undefined vertexUv ', i );

						this.uvs.push( new Vector2(), new Vector2(), new Vector2() );

					}

				}

				if ( hasFaceVertexUv2 === true ) {

					var vertexUvs = faceVertexUvs[ 1 ][ i ];

					if ( vertexUvs !== undefined ) {

						this.uvs2.push( vertexUvs[ 0 ], vertexUvs[ 1 ], vertexUvs[ 2 ] );

					} else {

						console.warn( 'DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i );

						this.uvs2.push( new Vector2(), new Vector2(), new Vector2() );

					}

				}

				// morphs

				for ( var j = 0; j < morphTargetsLength; j ++ ) {

					var morphTarget = morphTargets[ j ].vertices;

					morphTargetsPosition[ j ].data.push( morphTarget[ face.a ], morphTarget[ face.b ], morphTarget[ face.c ] );

				}

				for ( var j = 0; j < morphNormalsLength; j ++ ) {

					var morphNormal = morphNormals[ j ].vertexNormals[ i ];

					morphTargetsNormal[ j ].data.push( morphNormal.a, morphNormal.b, morphNormal.c );

				}

				// skins

				if ( hasSkinIndices ) {

					this.skinIndices.push( skinIndices[ face.a ], skinIndices[ face.b ], skinIndices[ face.c ] );

				}

				if ( hasSkinWeights ) {

					this.skinWeights.push( skinWeights[ face.a ], skinWeights[ face.b ], skinWeights[ face.c ] );

				}

			}

			this.computeGroups( geometry );

			this.verticesNeedUpdate = geometry.verticesNeedUpdate;
			this.normalsNeedUpdate = geometry.normalsNeedUpdate;
			this.colorsNeedUpdate = geometry.colorsNeedUpdate;
			this.uvsNeedUpdate = geometry.uvsNeedUpdate;
			this.groupsNeedUpdate = geometry.groupsNeedUpdate;

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function arrayMax( array ) {

		if ( array.length === 0 ) return - Infinity;

		var max = array[ 0 ];

		for ( var i = 1, l = array.length; i < l; ++ i ) {

			if ( array[ i ] > max ) max = array[ i ];

		}

		return max;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var bufferGeometryId = 1; // BufferGeometry uses odd numbers as Id

	function BufferGeometry() {

		Object.defineProperty( this, 'id', { value: bufferGeometryId += 2 } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'BufferGeometry';

		this.index = null;
		this.attributes = {};

		this.morphAttributes = {};

		this.groups = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		this.drawRange = { start: 0, count: Infinity };

		this.userData = {};

	}

	BufferGeometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: BufferGeometry,

		isBufferGeometry: true,

		getIndex: function () {

			return this.index;

		},

		setIndex: function ( index ) {

			if ( Array.isArray( index ) ) {

				this.index = new ( arrayMax( index ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( index, 1 );

			} else {

				this.index = index;

			}

		},

		addAttribute: function ( name, attribute ) {

			if ( ! ( attribute && attribute.isBufferAttribute ) && ! ( attribute && attribute.isInterleavedBufferAttribute ) ) {

				console.warn( 'BufferGeometry: .addAttribute() now expects ( name, attribute ).' );

				return this.addAttribute( name, new BufferAttribute( arguments[ 1 ], arguments[ 2 ] ) );

			}

			if ( name === 'index' ) {

				console.warn( 'BufferGeometry.addAttribute: Use .setIndex() for index attribute.' );
				this.setIndex( attribute );

				return this;

			}

			this.attributes[ name ] = attribute;

			return this;

		},

		getAttribute: function ( name ) {

			return this.attributes[ name ];

		},

		removeAttribute: function ( name ) {

			delete this.attributes[ name ];

			return this;

		},

		addGroup: function ( start, count, materialIndex ) {

			this.groups.push( {

				start: start,
				count: count,
				materialIndex: materialIndex !== undefined ? materialIndex : 0

			} );

		},

		clearGroups: function () {

			this.groups = [];

		},

		setDrawRange: function ( start, count ) {

			this.drawRange.start = start;
			this.drawRange.count = count;

		},

		applyMatrix: function ( matrix ) {

			var position = this.attributes.position;

			if ( position !== undefined ) {

				matrix.applyToBufferAttribute( position );
				position.needsUpdate = true;

			}

			var normal = this.attributes.normal;

			if ( normal !== undefined ) {

				var normalMatrix = new Matrix3().getNormalMatrix( matrix );

				normalMatrix.applyToBufferAttribute( normal );
				normal.needsUpdate = true;

			}

			if ( this.boundingBox !== null ) {

				this.computeBoundingBox();

			}

			if ( this.boundingSphere !== null ) {

				this.computeBoundingSphere();

			}

			return this;

		},

		rotateX: function () {

			// rotate geometry around world x-axis

			var m1 = new Matrix4();

			return function rotateX( angle ) {

				m1.makeRotationX( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateY: function () {

			// rotate geometry around world y-axis

			var m1 = new Matrix4();

			return function rotateY( angle ) {

				m1.makeRotationY( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateZ: function () {

			// rotate geometry around world z-axis

			var m1 = new Matrix4();

			return function rotateZ( angle ) {

				m1.makeRotationZ( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		translate: function () {

			// translate geometry

			var m1 = new Matrix4();

			return function translate( x, y, z ) {

				m1.makeTranslation( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		scale: function () {

			// scale geometry

			var m1 = new Matrix4();

			return function scale( x, y, z ) {

				m1.makeScale( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		lookAt: function () {

			var obj = new Object3D();

			return function lookAt( vector ) {

				obj.lookAt( vector );

				obj.updateMatrix();

				this.applyMatrix( obj.matrix );

			};

		}(),

		center: function () {

			var offset = new Vector3();

			return function center() {

				this.computeBoundingBox();

				this.boundingBox.getCenter( offset ).negate();

				this.translate( offset.x, offset.y, offset.z );

				return this;

			};

		}(),

		setFromObject: function ( object ) {

			// console.log( 'BufferGeometry.setFromObject(). Converting', object, this );

			var geometry = object.geometry;

			if ( object.isPoints || object.isLine ) {

				var positions = new Float32BufferAttribute( geometry.vertices.length * 3, 3 );
				var colors = new Float32BufferAttribute( geometry.colors.length * 3, 3 );

				this.addAttribute( 'position', positions.copyVector3sArray( geometry.vertices ) );
				this.addAttribute( 'color', colors.copyColorsArray( geometry.colors ) );

				if ( geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length ) {

					var lineDistances = new Float32BufferAttribute( geometry.lineDistances.length, 1 );

					this.addAttribute( 'lineDistance', lineDistances.copyArray( geometry.lineDistances ) );

				}

				if ( geometry.boundingSphere !== null ) {

					this.boundingSphere = geometry.boundingSphere.clone();

				}

				if ( geometry.boundingBox !== null ) {

					this.boundingBox = geometry.boundingBox.clone();

				}

			} else if ( object.isMesh ) {

				if ( geometry && geometry.isGeometry ) {

					this.fromGeometry( geometry );

				}

			}

			return this;

		},

		setFromPoints: function ( points ) {

			var position = [];

			for ( var i = 0, l = points.length; i < l; i ++ ) {

				var point = points[ i ];
				position.push( point.x, point.y, point.z || 0 );

			}

			this.addAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

			return this;

		},

		updateFromObject: function ( object ) {

			var geometry = object.geometry;

			if ( object.isMesh ) {

				var direct = geometry.__directGeometry;

				if ( geometry.elementsNeedUpdate === true ) {

					direct = undefined;
					geometry.elementsNeedUpdate = false;

				}

				if ( direct === undefined ) {

					return this.fromGeometry( geometry );

				}

				direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
				direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
				direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
				direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
				direct.groupsNeedUpdate = geometry.groupsNeedUpdate;

				geometry.verticesNeedUpdate = false;
				geometry.normalsNeedUpdate = false;
				geometry.colorsNeedUpdate = false;
				geometry.uvsNeedUpdate = false;
				geometry.groupsNeedUpdate = false;

				geometry = direct;

			}

			var attribute;

			if ( geometry.verticesNeedUpdate === true ) {

				attribute = this.attributes.position;

				if ( attribute !== undefined ) {

					attribute.copyVector3sArray( geometry.vertices );
					attribute.needsUpdate = true;

				}

				geometry.verticesNeedUpdate = false;

			}

			if ( geometry.normalsNeedUpdate === true ) {

				attribute = this.attributes.normal;

				if ( attribute !== undefined ) {

					attribute.copyVector3sArray( geometry.normals );
					attribute.needsUpdate = true;

				}

				geometry.normalsNeedUpdate = false;

			}

			if ( geometry.colorsNeedUpdate === true ) {

				attribute = this.attributes.color;

				if ( attribute !== undefined ) {

					attribute.copyColorsArray( geometry.colors );
					attribute.needsUpdate = true;

				}

				geometry.colorsNeedUpdate = false;

			}

			if ( geometry.uvsNeedUpdate ) {

				attribute = this.attributes.uv;

				if ( attribute !== undefined ) {

					attribute.copyVector2sArray( geometry.uvs );
					attribute.needsUpdate = true;

				}

				geometry.uvsNeedUpdate = false;

			}

			if ( geometry.lineDistancesNeedUpdate ) {

				attribute = this.attributes.lineDistance;

				if ( attribute !== undefined ) {

					attribute.copyArray( geometry.lineDistances );
					attribute.needsUpdate = true;

				}

				geometry.lineDistancesNeedUpdate = false;

			}

			if ( geometry.groupsNeedUpdate ) {

				geometry.computeGroups( object.geometry );
				this.groups = geometry.groups;

				geometry.groupsNeedUpdate = false;

			}

			return this;

		},

		fromGeometry: function ( geometry ) {

			geometry.__directGeometry = new DirectGeometry().fromGeometry( geometry );

			return this.fromDirectGeometry( geometry.__directGeometry );

		},

		fromDirectGeometry: function ( geometry ) {

			var positions = new Float32Array( geometry.vertices.length * 3 );
			this.addAttribute( 'position', new BufferAttribute( positions, 3 ).copyVector3sArray( geometry.vertices ) );

			if ( geometry.normals.length > 0 ) {

				var normals = new Float32Array( geometry.normals.length * 3 );
				this.addAttribute( 'normal', new BufferAttribute( normals, 3 ).copyVector3sArray( geometry.normals ) );

			}

			if ( geometry.colors.length > 0 ) {

				var colors = new Float32Array( geometry.colors.length * 3 );
				this.addAttribute( 'color', new BufferAttribute( colors, 3 ).copyColorsArray( geometry.colors ) );

			}

			if ( geometry.uvs.length > 0 ) {

				var uvs = new Float32Array( geometry.uvs.length * 2 );
				this.addAttribute( 'uv', new BufferAttribute( uvs, 2 ).copyVector2sArray( geometry.uvs ) );

			}

			if ( geometry.uvs2.length > 0 ) {

				var uvs2 = new Float32Array( geometry.uvs2.length * 2 );
				this.addAttribute( 'uv2', new BufferAttribute( uvs2, 2 ).copyVector2sArray( geometry.uvs2 ) );

			}

			// groups

			this.groups = geometry.groups;

			// morphs

			for ( var name in geometry.morphTargets ) {

				var array = [];
				var morphTargets = geometry.morphTargets[ name ];

				for ( var i = 0, l = morphTargets.length; i < l; i ++ ) {

					var morphTarget = morphTargets[ i ];

					var attribute = new Float32BufferAttribute( morphTarget.data.length * 3, 3 );
					attribute.name = morphTarget.name;

					array.push( attribute.copyVector3sArray( morphTarget.data ) );

				}

				this.morphAttributes[ name ] = array;

			}

			// skinning

			if ( geometry.skinIndices.length > 0 ) {

				var skinIndices = new Float32BufferAttribute( geometry.skinIndices.length * 4, 4 );
				this.addAttribute( 'skinIndex', skinIndices.copyVector4sArray( geometry.skinIndices ) );

			}

			if ( geometry.skinWeights.length > 0 ) {

				var skinWeights = new Float32BufferAttribute( geometry.skinWeights.length * 4, 4 );
				this.addAttribute( 'skinWeight', skinWeights.copyVector4sArray( geometry.skinWeights ) );

			}

			//

			if ( geometry.boundingSphere !== null ) {

				this.boundingSphere = geometry.boundingSphere.clone();

			}

			if ( geometry.boundingBox !== null ) {

				this.boundingBox = geometry.boundingBox.clone();

			}

			return this;

		},

		computeBoundingBox: function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new Box3();

			}

			var position = this.attributes.position;

			if ( position !== undefined ) {

				this.boundingBox.setFromBufferAttribute( position );

			} else {

				this.boundingBox.makeEmpty();

			}

			if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

				console.error( 'BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this );

			}

		},

		computeBoundingSphere: function () {

			var box = new Box3();
			var vector = new Vector3();

			return function computeBoundingSphere() {

				if ( this.boundingSphere === null ) {

					this.boundingSphere = new Sphere();

				}

				var position = this.attributes.position;

				if ( position ) {

					var center = this.boundingSphere.center;

					box.setFromBufferAttribute( position );
					box.getCenter( center );

					// hoping to find a boundingSphere with a radius smaller than the
					// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

					var maxRadiusSq = 0;

					for ( var i = 0, il = position.count; i < il; i ++ ) {

						vector.x = position.getX( i );
						vector.y = position.getY( i );
						vector.z = position.getZ( i );
						maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

					}

					this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

					if ( isNaN( this.boundingSphere.radius ) ) {

						console.error( 'BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this );

					}

				}

			};

		}(),

		computeFaceNormals: function () {

			// backwards compatibility

		},

		computeVertexNormals: function () {

			var index = this.index;
			var attributes = this.attributes;

			if ( attributes.position ) {

				var positions = attributes.position.array;

				if ( attributes.normal === undefined ) {

					this.addAttribute( 'normal', new BufferAttribute( new Float32Array( positions.length ), 3 ) );

				} else {

					// reset existing normals to zero

					var array = attributes.normal.array;

					for ( var i = 0, il = array.length; i < il; i ++ ) {

						array[ i ] = 0;

					}

				}

				var normals = attributes.normal.array;

				var vA, vB, vC;
				var pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
				var cb = new Vector3(), ab = new Vector3();

				// indexed elements

				if ( index ) {

					var indices = index.array;

					for ( var i = 0, il = index.count; i < il; i += 3 ) {

						vA = indices[ i + 0 ] * 3;
						vB = indices[ i + 1 ] * 3;
						vC = indices[ i + 2 ] * 3;

						pA.fromArray( positions, vA );
						pB.fromArray( positions, vB );
						pC.fromArray( positions, vC );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ vA ] += cb.x;
						normals[ vA + 1 ] += cb.y;
						normals[ vA + 2 ] += cb.z;

						normals[ vB ] += cb.x;
						normals[ vB + 1 ] += cb.y;
						normals[ vB + 2 ] += cb.z;

						normals[ vC ] += cb.x;
						normals[ vC + 1 ] += cb.y;
						normals[ vC + 2 ] += cb.z;

					}

				} else {

					// non-indexed elements (unconnected triangle soup)

					for ( var i = 0, il = positions.length; i < il; i += 9 ) {

						pA.fromArray( positions, i );
						pB.fromArray( positions, i + 3 );
						pC.fromArray( positions, i + 6 );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ i ] = cb.x;
						normals[ i + 1 ] = cb.y;
						normals[ i + 2 ] = cb.z;

						normals[ i + 3 ] = cb.x;
						normals[ i + 4 ] = cb.y;
						normals[ i + 5 ] = cb.z;

						normals[ i + 6 ] = cb.x;
						normals[ i + 7 ] = cb.y;
						normals[ i + 8 ] = cb.z;

					}

				}

				this.normalizeNormals();

				attributes.normal.needsUpdate = true;

			}

		},

		merge: function ( geometry, offset ) {

			if ( ! ( geometry && geometry.isBufferGeometry ) ) {

				console.error( 'BufferGeometry.merge(): geometry not an instance of BufferGeometry.', geometry );
				return;

			}

			if ( offset === undefined ) {

				offset = 0;

				console.warn(
					'BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. '
					+ 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
				);

			}

			var attributes = this.attributes;

			for ( var key in attributes ) {

				if ( geometry.attributes[ key ] === undefined ) continue;

				var attribute1 = attributes[ key ];
				var attributeArray1 = attribute1.array;

				var attribute2 = geometry.attributes[ key ];
				var attributeArray2 = attribute2.array;

				var attributeSize = attribute2.itemSize;

				for ( var i = 0, j = attributeSize * offset; i < attributeArray2.length; i ++, j ++ ) {

					attributeArray1[ j ] = attributeArray2[ i ];

				}

			}

			return this;

		},

		normalizeNormals: function () {

			var vector = new Vector3();

			return function normalizeNormals() {

				var normals = this.attributes.normal;

				for ( var i = 0, il = normals.count; i < il; i ++ ) {

					vector.x = normals.getX( i );
					vector.y = normals.getY( i );
					vector.z = normals.getZ( i );

					vector.normalize();

					normals.setXYZ( i, vector.x, vector.y, vector.z );

				}

			};

		}(),

		toNonIndexed: function () {

			if ( this.index === null ) {

				console.warn( 'BufferGeometry.toNonIndexed(): Geometry is already non-indexed.' );
				return this;

			}

			var geometry2 = new BufferGeometry();

			var indices = this.index.array;
			var attributes = this.attributes;

			for ( var name in attributes ) {

				var attribute = attributes[ name ];

				var array = attribute.array;
				var itemSize = attribute.itemSize;

				var array2 = new array.constructor( indices.length * itemSize );

				var index = 0, index2 = 0;

				for ( var i = 0, l = indices.length; i < l; i ++ ) {

					index = indices[ i ] * itemSize;

					for ( var j = 0; j < itemSize; j ++ ) {

						array2[ index2 ++ ] = array[ index ++ ];

					}

				}

				geometry2.addAttribute( name, new BufferAttribute( array2, itemSize ) );

			}

			var groups = this.groups;

			for ( var i = 0, l = groups.length; i < l; i ++ ) {

				var group = groups[ i ];
				geometry2.addGroup( group.start, group.count, group.materialIndex );

			}

			return geometry2;

		},

		toJSON: function () {

			var data = {
				metadata: {
					version: 4.5,
					type: 'BufferGeometry',
					generator: 'BufferGeometry.toJSON'
				}
			};

			// standard BufferGeometry serialization

			data.uuid = this.uuid;
			data.type = this.type;
			if ( this.name !== '' ) data.name = this.name;
			if ( Object.keys( this.userData ).length > 0 ) data.userData = this.userData;

			if ( this.parameters !== undefined ) {

				var parameters = this.parameters;

				for ( var key in parameters ) {

					if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

				}

				return data;

			}

			data.data = { attributes: {} };

			var index = this.index;

			if ( index !== null ) {

				var array = Array.prototype.slice.call( index.array );

				data.data.index = {
					type: index.array.constructor.name,
					array: array
				};

			}

			var attributes = this.attributes;

			for ( var key in attributes ) {

				var attribute = attributes[ key ];

				var array = Array.prototype.slice.call( attribute.array );

				data.data.attributes[ key ] = {
					itemSize: attribute.itemSize,
					type: attribute.array.constructor.name,
					array: array,
					normalized: attribute.normalized
				};

			}

			var groups = this.groups;

			if ( groups.length > 0 ) {

				data.data.groups = JSON.parse( JSON.stringify( groups ) );

			}

			var boundingSphere = this.boundingSphere;

			if ( boundingSphere !== null ) {

				data.data.boundingSphere = {
					center: boundingSphere.center.toArray(),
					radius: boundingSphere.radius
				};

			}

			return data;

		},

		clone: function () {
			return new BufferGeometry().copy( this );

		},

		copy: function ( source ) {

			var name, i, l;

			// reset

			this.index = null;
			this.attributes = {};
			this.morphAttributes = {};
			this.groups = [];
			this.boundingBox = null;
			this.boundingSphere = null;

			// name

			this.name = source.name;

			// index

			var index = source.index;

			if ( index !== null ) {

				this.setIndex( index.clone() );

			}

			// attributes

			var attributes = source.attributes;

			for ( name in attributes ) {

				var attribute = attributes[ name ];
				this.addAttribute( name, attribute.clone() );

			}

			// morph attributes

			var morphAttributes = source.morphAttributes;

			for ( name in morphAttributes ) {

				var array = [];
				var morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

				for ( i = 0, l = morphAttribute.length; i < l; i ++ ) {

					array.push( morphAttribute[ i ].clone() );

				}

				this.morphAttributes[ name ] = array;

			}

			// groups

			var groups = source.groups;

			for ( i = 0, l = groups.length; i < l; i ++ ) {

				var group = groups[ i ];
				this.addGroup( group.start, group.count, group.materialIndex );

			}

			// bounding box

			var boundingBox = source.boundingBox;

			if ( boundingBox !== null ) {

				this.boundingBox = boundingBox.clone();

			}

			// bounding sphere

			var boundingSphere = source.boundingSphere;

			if ( boundingSphere !== null ) {

				this.boundingSphere = boundingSphere.clone();

			}

			// draw range

			this.drawRange.start = source.drawRange.start;
			this.drawRange.count = source.drawRange.count;

			// user data

			this.userData = source.userData;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Ray( origin, direction ) {

		this.origin = ( origin !== undefined ) ? origin : new Vector3();
		this.direction = ( direction !== undefined ) ? direction : new Vector3();

	}

	Object.assign( Ray.prototype, {

		set: function ( origin, direction ) {

			this.origin.copy( origin );
			this.direction.copy( direction );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( ray ) {

			this.origin.copy( ray.origin );
			this.direction.copy( ray.direction );

			return this;

		},

		at: function ( t, target ) {

			if ( target === undefined ) {

				console.warn( 'Ray: .at() target is now required' );
				target = new Vector3();

			}

			return target.copy( this.direction ).multiplyScalar( t ).add( this.origin );

		},

		lookAt: function ( v ) {

			this.direction.copy( v ).sub( this.origin ).normalize();

			return this;

		},

		recast: function () {

			var v1 = new Vector3();

			return function recast( t ) {

				this.origin.copy( this.at( t, v1 ) );

				return this;

			};

		}(),

		closestPointToPoint: function ( point, target ) {

			if ( target === undefined ) {

				console.warn( 'Ray: .closestPointToPoint() target is now required' );
				target = new Vector3();

			}

			target.subVectors( point, this.origin );

			var directionDistance = target.dot( this.direction );

			if ( directionDistance < 0 ) {

				return target.copy( this.origin );

			}

			return target.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

		},

		distanceToPoint: function ( point ) {

			return Math.sqrt( this.distanceSqToPoint( point ) );

		},

		distanceSqToPoint: function () {

			var v1 = new Vector3();

			return function distanceSqToPoint( point ) {

				var directionDistance = v1.subVectors( point, this.origin ).dot( this.direction );

				// point behind the ray

				if ( directionDistance < 0 ) {

					return this.origin.distanceToSquared( point );

				}

				v1.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

				return v1.distanceToSquared( point );

			};

		}(),

		distanceSqToSegment: function () {

			var segCenter = new Vector3();
			var segDir = new Vector3();
			var diff = new Vector3();

			return function distanceSqToSegment( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

				// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
				// It returns the min distance between the ray and the segment
				// defined by v0 and v1
				// It can also set two optional targets :
				// - The closest point on the ray
				// - The closest point on the segment

				segCenter.copy( v0 ).add( v1 ).multiplyScalar( 0.5 );
				segDir.copy( v1 ).sub( v0 ).normalize();
				diff.copy( this.origin ).sub( segCenter );

				var segExtent = v0.distanceTo( v1 ) * 0.5;
				var a01 = - this.direction.dot( segDir );
				var b0 = diff.dot( this.direction );
				var b1 = - diff.dot( segDir );
				var c = diff.lengthSq();
				var det = Math.abs( 1 - a01 * a01 );
				var s0, s1, sqrDist, extDet;

				if ( det > 0 ) {

					// The ray and segment are not parallel.

					s0 = a01 * b1 - b0;
					s1 = a01 * b0 - b1;
					extDet = segExtent * det;

					if ( s0 >= 0 ) {

						if ( s1 >= - extDet ) {

							if ( s1 <= extDet ) {

								// region 0
								// Minimum at interior points of ray and segment.

								var invDet = 1 / det;
								s0 *= invDet;
								s1 *= invDet;
								sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

							} else {

								// region 1

								s1 = segExtent;
								s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
								sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

							}

						} else {

							// region 5

							s1 = - segExtent;
							s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						}

					} else {

						if ( s1 <= - extDet ) {

							// region 4

							s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
							s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						} else if ( s1 <= extDet ) {

							// region 3

							s0 = 0;
							s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = s1 * ( s1 + 2 * b1 ) + c;

						} else {

							// region 2

							s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
							s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						}

					}

				} else {

					// Ray and segment are parallel.

					s1 = ( a01 > 0 ) ? - segExtent : segExtent;
					s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

				if ( optionalPointOnRay ) {

					optionalPointOnRay.copy( this.direction ).multiplyScalar( s0 ).add( this.origin );

				}

				if ( optionalPointOnSegment ) {

					optionalPointOnSegment.copy( segDir ).multiplyScalar( s1 ).add( segCenter );

				}

				return sqrDist;

			};

		}(),

		intersectSphere: function () {

			var v1 = new Vector3();

			return function intersectSphere( sphere, target ) {

				v1.subVectors( sphere.center, this.origin );
				var tca = v1.dot( this.direction );
				var d2 = v1.dot( v1 ) - tca * tca;
				var radius2 = sphere.radius * sphere.radius;

				if ( d2 > radius2 ) return null;

				var thc = Math.sqrt( radius2 - d2 );

				// t0 = first intersect point - entrance on front of sphere
				var t0 = tca - thc;

				// t1 = second intersect point - exit point on back of sphere
				var t1 = tca + thc;

				// test to see if both t0 and t1 are behind the ray - if so, return null
				if ( t0 < 0 && t1 < 0 ) return null;

				// test to see if t0 is behind the ray:
				// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
				// in order to always return an intersect point that is in front of the ray.
				if ( t0 < 0 ) return this.at( t1, target );

				// else t0 is in front of the ray, so return the first collision point scaled by t0
				return this.at( t0, target );

			};

		}(),

		intersectsSphere: function ( sphere ) {

			return this.distanceSqToPoint( sphere.center ) <= ( sphere.radius * sphere.radius );

		},

		distanceToPlane: function ( plane ) {

			var denominator = plane.normal.dot( this.direction );

			if ( denominator === 0 ) {

				// line is coplanar, return origin
				if ( plane.distanceToPoint( this.origin ) === 0 ) {

					return 0;

				}

				// Null is preferable to undefined since undefined means.... it is undefined

				return null;

			}

			var t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

			// Return if the ray never intersects the plane

			return t >= 0 ? t : null;

		},

		intersectPlane: function ( plane, target ) {

			var t = this.distanceToPlane( plane );

			if ( t === null ) {

				return null;

			}

			return this.at( t, target );

		},

		intersectsPlane: function ( plane ) {

			// check if the ray lies on the plane first

			var distToPoint = plane.distanceToPoint( this.origin );

			if ( distToPoint === 0 ) {

				return true;

			}

			var denominator = plane.normal.dot( this.direction );

			if ( denominator * distToPoint < 0 ) {

				return true;

			}

			// ray origin is behind the plane (and is pointing behind it)

			return false;

		},

		intersectBox: function ( box, target ) {

			var tmin, tmax, tymin, tymax, tzmin, tzmax;

			var invdirx = 1 / this.direction.x,
				invdiry = 1 / this.direction.y,
				invdirz = 1 / this.direction.z;

			var origin = this.origin;

			if ( invdirx >= 0 ) {

				tmin = ( box.min.x - origin.x ) * invdirx;
				tmax = ( box.max.x - origin.x ) * invdirx;

			} else {

				tmin = ( box.max.x - origin.x ) * invdirx;
				tmax = ( box.min.x - origin.x ) * invdirx;

			}

			if ( invdiry >= 0 ) {

				tymin = ( box.min.y - origin.y ) * invdiry;
				tymax = ( box.max.y - origin.y ) * invdiry;

			} else {

				tymin = ( box.max.y - origin.y ) * invdiry;
				tymax = ( box.min.y - origin.y ) * invdiry;

			}

			if ( ( tmin > tymax ) || ( tymin > tmax ) ) return null;

			// These lines also handle the case where tmin or tmax is NaN
			// (result of 0 * Infinity). x !== x returns true if x is NaN

			if ( tymin > tmin || tmin !== tmin ) tmin = tymin;

			if ( tymax < tmax || tmax !== tmax ) tmax = tymax;

			if ( invdirz >= 0 ) {

				tzmin = ( box.min.z - origin.z ) * invdirz;
				tzmax = ( box.max.z - origin.z ) * invdirz;

			} else {

				tzmin = ( box.max.z - origin.z ) * invdirz;
				tzmax = ( box.min.z - origin.z ) * invdirz;

			}

			if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) return null;

			if ( tzmin > tmin || tmin !== tmin ) tmin = tzmin;

			if ( tzmax < tmax || tmax !== tmax ) tmax = tzmax;

			//return point closest to the ray (positive side)

			if ( tmax < 0 ) return null;

			return this.at( tmin >= 0 ? tmin : tmax, target );

		},

		intersectsBox: ( function () {

			var v = new Vector3();

			return function intersectsBox( box ) {

				return this.intersectBox( box, v ) !== null;

			};

		} )(),

		intersectTriangle: function () {

			// Compute the offset origin, edges, and normal.
			var diff = new Vector3();
			var edge1 = new Vector3();
			var edge2 = new Vector3();
			var normal = new Vector3();

			return function intersectTriangle( a, b, c, backfaceCulling, target ) {

				// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

				edge1.subVectors( b, a );
				edge2.subVectors( c, a );
				normal.crossVectors( edge1, edge2 );

				// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
				// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
				//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
				//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
				//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
				var DdN = this.direction.dot( normal );
				var sign;

				if ( DdN > 0 ) {

					if ( backfaceCulling ) return null;
					sign = 1;

				} else if ( DdN < 0 ) {

					sign = - 1;
					DdN = - DdN;

				} else {

					return null;

				}

				diff.subVectors( this.origin, a );
				var DdQxE2 = sign * this.direction.dot( edge2.crossVectors( diff, edge2 ) );

				// b1 < 0, no intersection
				if ( DdQxE2 < 0 ) {

					return null;

				}

				var DdE1xQ = sign * this.direction.dot( edge1.cross( diff ) );

				// b2 < 0, no intersection
				if ( DdE1xQ < 0 ) {

					return null;

				}

				// b1+b2 > 1, no intersection
				if ( DdQxE2 + DdE1xQ > DdN ) {

					return null;

				}

				// Line intersects triangle, check if ray does.
				var QdN = - sign * diff.dot( normal );

				// t < 0, no intersection
				if ( QdN < 0 ) {

					return null;

				}

				// Ray intersects triangle.
				return this.at( QdN / DdN, target );

			};

		}(),

		applyMatrix4: function ( matrix4 ) {

			this.origin.applyMatrix4( matrix4 );
			this.direction.transformDirection( matrix4 );

			return this;

		},

		equals: function ( ray ) {

			return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Triangle( a, b, c ) {

		this.a = ( a !== undefined ) ? a : new Vector3();
		this.b = ( b !== undefined ) ? b : new Vector3();
		this.c = ( c !== undefined ) ? c : new Vector3();

	}

	Object.assign( Triangle, {

		getNormal: function () {

			var v0 = new Vector3();

			return function getNormal( a, b, c, target ) {

				if ( target === undefined ) {

					console.warn( 'Triangle: .getNormal() target is now required' );
					target = new Vector3();

				}

				target.subVectors( c, b );
				v0.subVectors( a, b );
				target.cross( v0 );

				var targetLengthSq = target.lengthSq();
				if ( targetLengthSq > 0 ) {

					return target.multiplyScalar( 1 / Math.sqrt( targetLengthSq ) );

				}

				return target.set( 0, 0, 0 );

			};

		}(),

		// static/instance method to calculate barycentric coordinates
		// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
		getBarycoord: function () {

			var v0 = new Vector3();
			var v1 = new Vector3();
			var v2 = new Vector3();

			return function getBarycoord( point, a, b, c, target ) {

				v0.subVectors( c, a );
				v1.subVectors( b, a );
				v2.subVectors( point, a );

				var dot00 = v0.dot( v0 );
				var dot01 = v0.dot( v1 );
				var dot02 = v0.dot( v2 );
				var dot11 = v1.dot( v1 );
				var dot12 = v1.dot( v2 );

				var denom = ( dot00 * dot11 - dot01 * dot01 );

				if ( target === undefined ) {

					console.warn( 'Triangle: .getBarycoord() target is now required' );
					target = new Vector3();

				}

				// collinear or singular triangle
				if ( denom === 0 ) {

					// arbitrary location outside of triangle?
					// not sure if this is the best idea, maybe should be returning undefined
					return target.set( - 2, - 1, - 1 );

				}

				var invDenom = 1 / denom;
				var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
				var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

				// barycentric coordinates must always sum to 1
				return target.set( 1 - u - v, v, u );

			};

		}(),

		containsPoint: function () {

			var v1 = new Vector3();

			return function containsPoint( point, a, b, c ) {

				Triangle.getBarycoord( point, a, b, c, v1 );

				return ( v1.x >= 0 ) && ( v1.y >= 0 ) && ( ( v1.x + v1.y ) <= 1 );

			};

		}(),

		getUV: function () {

			var barycoord = new Vector3();

			return function getUV( point, p1, p2, p3, uv1, uv2, uv3, target ) {

				this.getBarycoord( point, p1, p2, p3, barycoord );

				target.set( 0, 0 );
				target.addScaledVector( uv1, barycoord.x );
				target.addScaledVector( uv2, barycoord.y );
				target.addScaledVector( uv3, barycoord.z );

				return target;

			};

		}()

	} );

	Object.assign( Triangle.prototype, {

		set: function ( a, b, c ) {

			this.a.copy( a );
			this.b.copy( b );
			this.c.copy( c );

			return this;

		},

		setFromPointsAndIndices: function ( points, i0, i1, i2 ) {

			this.a.copy( points[ i0 ] );
			this.b.copy( points[ i1 ] );
			this.c.copy( points[ i2 ] );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( triangle ) {

			this.a.copy( triangle.a );
			this.b.copy( triangle.b );
			this.c.copy( triangle.c );

			return this;

		},

		getArea: function () {

			var v0 = new Vector3();
			var v1 = new Vector3();

			return function getArea() {

				v0.subVectors( this.c, this.b );
				v1.subVectors( this.a, this.b );

				return v0.cross( v1 ).length() * 0.5;

			};

		}(),

		getMidpoint: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Triangle: .getMidpoint() target is now required' );
				target = new Vector3();

			}

			return target.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

		},

		getNormal: function ( target ) {

			return Triangle.getNormal( this.a, this.b, this.c, target );

		},

		getPlane: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Triangle: .getPlane() target is now required' );
				target = new Vector3();

			}

			return target.setFromCoplanarPoints( this.a, this.b, this.c );

		},

		getBarycoord: function ( point, target ) {

			return Triangle.getBarycoord( point, this.a, this.b, this.c, target );

		},

		containsPoint: function ( point ) {

			return Triangle.containsPoint( point, this.a, this.b, this.c );

		},

		getUV: function ( point, uv1, uv2, uv3, result ) {

			return Triangle.getUV( point, this.a, this.b, this.c, uv1, uv2, uv3, result );

		},

		intersectsBox: function ( box ) {

			return box.intersectsTriangle( this );

		},

		closestPointToPoint: function () {

			var vab = new Vector3();
			var vac = new Vector3();
			var vbc = new Vector3();
			var vap = new Vector3();
			var vbp = new Vector3();
			var vcp = new Vector3();

			return function closestPointToPoint( p, target ) {

				if ( target === undefined ) {

					console.warn( 'Triangle: .closestPointToPoint() target is now required' );
					target = new Vector3();

				}

				var a = this.a, b = this.b, c = this.c;
				var v, w;

				// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
				// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
				// under the accompanying license; see chapter 5.1.5 for detailed explanation.
				// basically, we're distinguishing which of the voronoi regions of the triangle
				// the point lies in with the minimum amount of redundant computation.

				vab.subVectors( b, a );
				vac.subVectors( c, a );
				vap.subVectors( p, a );
				var d1 = vab.dot( vap );
				var d2 = vac.dot( vap );
				if ( d1 <= 0 && d2 <= 0 ) {

					// vertex region of A; barycentric coords (1, 0, 0)
					return target.copy( a );

				}

				vbp.subVectors( p, b );
				var d3 = vab.dot( vbp );
				var d4 = vac.dot( vbp );
				if ( d3 >= 0 && d4 <= d3 ) {

					// vertex region of B; barycentric coords (0, 1, 0)
					return target.copy( b );

				}

				var vc = d1 * d4 - d3 * d2;
				if ( vc <= 0 && d1 >= 0 && d3 <= 0 ) {

					v = d1 / ( d1 - d3 );
					// edge region of AB; barycentric coords (1-v, v, 0)
					return target.copy( a ).addScaledVector( vab, v );

				}

				vcp.subVectors( p, c );
				var d5 = vab.dot( vcp );
				var d6 = vac.dot( vcp );
				if ( d6 >= 0 && d5 <= d6 ) {

					// vertex region of C; barycentric coords (0, 0, 1)
					return target.copy( c );

				}

				var vb = d5 * d2 - d1 * d6;
				if ( vb <= 0 && d2 >= 0 && d6 <= 0 ) {

					w = d2 / ( d2 - d6 );
					// edge region of AC; barycentric coords (1-w, 0, w)
					return target.copy( a ).addScaledVector( vac, w );

				}

				var va = d3 * d6 - d5 * d4;
				if ( va <= 0 && ( d4 - d3 ) >= 0 && ( d5 - d6 ) >= 0 ) {

					vbc.subVectors( c, b );
					w = ( d4 - d3 ) / ( ( d4 - d3 ) + ( d5 - d6 ) );
					// edge region of BC; barycentric coords (0, 1-w, w)
					return target.copy( b ).addScaledVector( vbc, w ); // edge region of BC

				}

				// face region
				var denom = 1 / ( va + vb + vc );
				// u = va * denom
				v = vb * denom;
				w = vc * denom;
				return target.copy( a ).addScaledVector( vab, v ).addScaledVector( vac, w );

			};

		}(),

		equals: function ( triangle ) {

			return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Face3( a, b, c, normal, color, materialIndex ) {

		this.a = a;
		this.b = b;
		this.c = c;

		this.normal = ( normal && normal.isVector3 ) ? normal : new Vector3();
		this.vertexNormals = Array.isArray( normal ) ? normal : [];

		this.color = ( color && color.isColor ) ? color : new Color();
		this.vertexColors = Array.isArray( color ) ? color : [];

		this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

	}

	Object.assign( Face3.prototype, {

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.a = source.a;
			this.b = source.b;
			this.c = source.c;

			this.normal.copy( source.normal );
			this.color.copy( source.color );

			this.materialIndex = source.materialIndex;

			for ( var i = 0, il = source.vertexNormals.length; i < il; i ++ ) {

				this.vertexNormals[ i ] = source.vertexNormals[ i ].clone();

			}

			for ( var i = 0, il = source.vertexColors.length; i < il; i ++ ) {

				this.vertexColors[ i ] = source.vertexColors[ i ].clone();

			}

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshBasicMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshBasicMaterial';

		this.color = new Color( 0xffffff ); // emissive

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;

		this.lights = false;

		this.setValues( parameters );

	}

	MeshBasicMaterial.prototype = Object.create( Material.prototype );
	MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;

	MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

	MeshBasicMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Mesh( geometry, material ) {

		Object3D.call( this );

		this.type = 'Mesh';

		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new MeshBasicMaterial( { color: Math.random() * 0xffffff } );

		this.drawMode = TrianglesDrawMode;

		this.updateMorphTargets();

	}

	Mesh.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Mesh,

		isMesh: true,

		setDrawMode: function ( value ) {

			this.drawMode = value;

		},

		copy: function ( source ) {

			Object3D.prototype.copy.call( this, source );

			this.drawMode = source.drawMode;

			if ( source.morphTargetInfluences !== undefined ) {

				this.morphTargetInfluences = source.morphTargetInfluences.slice();

			}

			if ( source.morphTargetDictionary !== undefined ) {

				this.morphTargetDictionary = Object.assign( {}, source.morphTargetDictionary );

			}

			return this;

		},

		updateMorphTargets: function () {

			var geometry = this.geometry;
			var m, ml, name;

			if ( geometry.isBufferGeometry ) {

				var morphAttributes = geometry.morphAttributes;
				var keys = Object.keys( morphAttributes );

				if ( keys.length > 0 ) {

					var morphAttribute = morphAttributes[ keys[ 0 ] ];

					if ( morphAttribute !== undefined ) {

						this.morphTargetInfluences = [];
						this.morphTargetDictionary = {};

						for ( m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

							name = morphAttribute[ m ].name || String( m );

							this.morphTargetInfluences.push( 0 );
							this.morphTargetDictionary[ name ] = m;

						}

					}

				}

			} else {

				var morphTargets = geometry.morphTargets;

				if ( morphTargets !== undefined && morphTargets.length > 0 ) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for ( m = 0, ml = morphTargets.length; m < ml; m ++ ) {

						name = morphTargets[ m ].name || String( m );

						this.morphTargetInfluences.push( 0 );
						this.morphTargetDictionary[ name ] = m;

					}

				}

			}

		},

		raycast: ( function () {

			var inverseMatrix = new Matrix4();
			var ray = new Ray();
			var sphere = new Sphere();

			var vA = new Vector3();
			var vB = new Vector3();
			var vC = new Vector3();

			var tempA = new Vector3();
			var tempB = new Vector3();
			var tempC = new Vector3();

			var uvA = new Vector2();
			var uvB = new Vector2();
			var uvC = new Vector2();

			var intersectionPoint = new Vector3();
			var intersectionPointWorld = new Vector3();

			function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

				var intersect;

				if ( material.side === BackSide ) {

					intersect = ray.intersectTriangle( pC, pB, pA, true, point );

				} else {

					intersect = ray.intersectTriangle( pA, pB, pC, material.side !== DoubleSide, point );

				}

				if ( intersect === null ) return null;

				intersectionPointWorld.copy( point );
				intersectionPointWorld.applyMatrix4( object.matrixWorld );

				var distance = raycaster.ray.origin.distanceTo( intersectionPointWorld );

				if ( distance < raycaster.near || distance > raycaster.far ) return null;

				return {
					distance: distance,
					point: intersectionPointWorld.clone(),
					object: object
				};

			}

			function checkBufferGeometryIntersection( object, material, raycaster, ray, position, uv, a, b, c ) {

				vA.fromBufferAttribute( position, a );
				vB.fromBufferAttribute( position, b );
				vC.fromBufferAttribute( position, c );

				var intersection = checkIntersection( object, material, raycaster, ray, vA, vB, vC, intersectionPoint );

				if ( intersection ) {

					if ( uv ) {

						uvA.fromBufferAttribute( uv, a );
						uvB.fromBufferAttribute( uv, b );
						uvC.fromBufferAttribute( uv, c );

						intersection.uv = Triangle.getUV( intersectionPoint, vA, vB, vC, uvA, uvB, uvC, new Vector2() );

					}

					var face = new Face3( a, b, c );
					Triangle.getNormal( vA, vB, vC, face.normal );

					intersection.face = face;

				}

				return intersection;

			}

			return function raycast( raycaster, intersects ) {

				var geometry = this.geometry;
				var material = this.material;
				var matrixWorld = this.matrixWorld;

				if ( material === undefined ) return;

				// Checking boundingSphere distance to ray

				if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere );
				sphere.applyMatrix4( matrixWorld );

				if ( raycaster.ray.intersectsSphere( sphere ) === false ) return;

				//

				inverseMatrix.getInverse( matrixWorld );
				ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

				// Check boundingBox before continuing

				if ( geometry.boundingBox !== null ) {

					if ( ray.intersectsBox( geometry.boundingBox ) === false ) return;

				}

				var intersection;

				if ( geometry.isBufferGeometry ) {

					var a, b, c;
					var index = geometry.index;
					var position = geometry.attributes.position;
					var uv = geometry.attributes.uv;
					var groups = geometry.groups;
					var drawRange = geometry.drawRange;
					var i, j, il, jl;
					var group, groupMaterial;
					var start, end;

					if ( index !== null ) {

						// indexed buffer geometry

						if ( Array.isArray( material ) ) {

							for ( i = 0, il = groups.length; i < il; i ++ ) {

								group = groups[ i ];
								groupMaterial = material[ group.materialIndex ];

								start = Math.max( group.start, drawRange.start );
								end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

								for ( j = start, jl = end; j < jl; j += 3 ) {

									a = index.getX( j );
									b = index.getX( j + 1 );
									c = index.getX( j + 2 );

									intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, ray, position, uv, a, b, c );

									if ( intersection ) {

										intersection.faceIndex = Math.floor( j / 3 ); // triangle number in indexed buffer semantics
										intersects.push( intersection );

									}

								}

							}

						} else {

							start = Math.max( 0, drawRange.start );
							end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

							for ( i = start, il = end; i < il; i += 3 ) {

								a = index.getX( i );
								b = index.getX( i + 1 );
								c = index.getX( i + 2 );

								intersection = checkBufferGeometryIntersection( this, material, raycaster, ray, position, uv, a, b, c );

								if ( intersection ) {

									intersection.faceIndex = Math.floor( i / 3 ); // triangle number in indexed buffer semantics
									intersects.push( intersection );

								}

							}

						}

					} else if ( position !== undefined ) {

						// non-indexed buffer geometry

						if ( Array.isArray( material ) ) {

							for ( i = 0, il = groups.length; i < il; i ++ ) {

								group = groups[ i ];
								groupMaterial = material[ group.materialIndex ];

								start = Math.max( group.start, drawRange.start );
								end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

								for ( j = start, jl = end; j < jl; j += 3 ) {

									a = j;
									b = j + 1;
									c = j + 2;

									intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, ray, position, uv, a, b, c );

									if ( intersection ) {

										intersection.faceIndex = Math.floor( j / 3 ); // triangle number in non-indexed buffer semantics
										intersects.push( intersection );

									}

								}

							}

						} else {

							start = Math.max( 0, drawRange.start );
							end = Math.min( position.count, ( drawRange.start + drawRange.count ) );

							for ( i = start, il = end; i < il; i += 3 ) {

								a = i;
								b = i + 1;
								c = i + 2;

								intersection = checkBufferGeometryIntersection( this, material, raycaster, ray, position, uv, a, b, c );

								if ( intersection ) {

									intersection.faceIndex = Math.floor( i / 3 ); // triangle number in non-indexed buffer semantics
									intersects.push( intersection );

								}

							}

						}

					}

				} else if ( geometry.isGeometry ) {

					var fvA, fvB, fvC;
					var isMultiMaterial = Array.isArray( material );

					var vertices = geometry.vertices;
					var faces = geometry.faces;
					var uvs;

					var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
					if ( faceVertexUvs.length > 0 ) uvs = faceVertexUvs;

					for ( var f = 0, fl = faces.length; f < fl; f ++ ) {

						var face = faces[ f ];
						var faceMaterial = isMultiMaterial ? material[ face.materialIndex ] : material;

						if ( faceMaterial === undefined ) continue;

						fvA = vertices[ face.a ];
						fvB = vertices[ face.b ];
						fvC = vertices[ face.c ];

						if ( faceMaterial.morphTargets === true ) {

							var morphTargets = geometry.morphTargets;
							var morphInfluences = this.morphTargetInfluences;

							vA.set( 0, 0, 0 );
							vB.set( 0, 0, 0 );
							vC.set( 0, 0, 0 );

							for ( var t = 0, tl = morphTargets.length; t < tl; t ++ ) {

								var influence = morphInfluences[ t ];

								if ( influence === 0 ) continue;

								var targets = morphTargets[ t ].vertices;

								vA.addScaledVector( tempA.subVectors( targets[ face.a ], fvA ), influence );
								vB.addScaledVector( tempB.subVectors( targets[ face.b ], fvB ), influence );
								vC.addScaledVector( tempC.subVectors( targets[ face.c ], fvC ), influence );

							}

							vA.add( fvA );
							vB.add( fvB );
							vC.add( fvC );

							fvA = vA;
							fvB = vB;
							fvC = vC;

						}

						intersection = checkIntersection( this, faceMaterial, raycaster, ray, fvA, fvB, fvC, intersectionPoint );

						if ( intersection ) {

							if ( uvs && uvs[ f ] ) {

								var uvs_f = uvs[ f ];
								uvA.copy( uvs_f[ 0 ] );
								uvB.copy( uvs_f[ 1 ] );
								uvC.copy( uvs_f[ 2 ] );

								intersection.uv = Triangle.getUV( intersectionPoint, fvA, fvB, fvC, uvA, uvB, uvC, new Vector2() );

							}

							intersection.face = face;
							intersection.faceIndex = f;
							intersects.push( intersection );

						}

					}

				}

			};

		}() ),

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Skeleton( bones, boneInverses ) {

		// copy the bone array

		bones = bones || [];

		this.bones = bones.slice( 0 );
		this.boneMatrices = new Float32Array( this.bones.length * 16 );

		// use the supplied bone inverses or calculate the inverses

		if ( boneInverses === undefined ) {

			this.calculateInverses();

		} else {

			if ( this.bones.length === boneInverses.length ) {

				this.boneInverses = boneInverses.slice( 0 );

			} else {

				console.warn( 'Skeleton boneInverses is the wrong length.' );

				this.boneInverses = [];

				for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

					this.boneInverses.push( new Matrix4() );

				}

			}

		}

	}

	Object.assign( Skeleton.prototype, {

		calculateInverses: function () {

			this.boneInverses = [];

			for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

				var inverse = new Matrix4();

				if ( this.bones[ i ] ) {

					inverse.getInverse( this.bones[ i ].matrixWorld );

				}

				this.boneInverses.push( inverse );

			}

		},

		pose: function () {

			var bone, i, il;

			// recover the bind-time world matrices

			for ( i = 0, il = this.bones.length; i < il; i ++ ) {

				bone = this.bones[ i ];

				if ( bone ) {

					bone.matrixWorld.getInverse( this.boneInverses[ i ] );

				}

			}

			// compute the local matrices, positions, rotations and scales

			for ( i = 0, il = this.bones.length; i < il; i ++ ) {

				bone = this.bones[ i ];

				if ( bone ) {

					if ( bone.parent && bone.parent.isBone ) {

						bone.matrix.getInverse( bone.parent.matrixWorld );
						bone.matrix.multiply( bone.matrixWorld );

					} else {

						bone.matrix.copy( bone.matrixWorld );

					}

					bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

				}

			}

		},

		update: ( function () {

			var offsetMatrix = new Matrix4();
			var identityMatrix = new Matrix4();

			return function update() {

				var bones = this.bones;
				var boneInverses = this.boneInverses;
				var boneMatrices = this.boneMatrices;
				var boneTexture = this.boneTexture;

				// flatten bone matrices to array

				for ( var i = 0, il = bones.length; i < il; i ++ ) {

					// compute the offset between the current and the original transform

					var matrix = bones[ i ] ? bones[ i ].matrixWorld : identityMatrix;

					offsetMatrix.multiplyMatrices( matrix, boneInverses[ i ] );
					offsetMatrix.toArray( boneMatrices, i * 16 );

				}

				if ( boneTexture !== undefined ) {

					boneTexture.needsUpdate = true;

				}

			};

		} )(),

		clone: function () {

			return new Skeleton( this.bones, this.boneInverses );

		},

		getBoneByName: function ( name ) {

			for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

				var bone = this.bones[ i ];

				if ( bone.name === name ) {

					return bone;

				}

			}

			return undefined;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Bone() {

		Object3D.call( this );

		this.type = 'Bone';

	}

	Bone.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Bone,

		isBone: true

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function SkinnedMesh( geometry, material ) {

		Mesh.call( this, geometry, material );

		this.type = 'SkinnedMesh';

		this.bindMode = 'attached';
		this.bindMatrix = new Matrix4();
		this.bindMatrixInverse = new Matrix4();

		var bones = this.initBones();
		var skeleton = new Skeleton( bones );

		this.bind( skeleton, this.matrixWorld );

		this.normalizeSkinWeights();

	}

	SkinnedMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {

		constructor: SkinnedMesh,

		isSkinnedMesh: true,

		initBones: function () {

			var bones = [], bone, gbone;
			var i, il;

			if ( this.geometry && this.geometry.bones !== undefined ) {

				// first, create array of 'Bone' objects from geometry data

				for ( i = 0, il = this.geometry.bones.length; i < il; i ++ ) {

					gbone = this.geometry.bones[ i ];

					// create new 'Bone' object

					bone = new Bone();
					bones.push( bone );

					// apply values

					bone.name = gbone.name;
					bone.position.fromArray( gbone.pos );
					bone.quaternion.fromArray( gbone.rotq );
					if ( gbone.scl !== undefined ) bone.scale.fromArray( gbone.scl );

				}

				// second, create bone hierarchy

				for ( i = 0, il = this.geometry.bones.length; i < il; i ++ ) {

					gbone = this.geometry.bones[ i ];

					if ( ( gbone.parent !== - 1 ) && ( gbone.parent !== null ) && ( bones[ gbone.parent ] !== undefined ) ) {

						// subsequent bones in the hierarchy

						bones[ gbone.parent ].add( bones[ i ] );

					} else {

						// topmost bone, immediate child of the skinned mesh

						this.add( bones[ i ] );

					}

				}

			}

			// now the bones are part of the scene graph and children of the skinned mesh.
			// let's update the corresponding matrices

			this.updateMatrixWorld( true );

			return bones;

		},

		bind: function ( skeleton, bindMatrix ) {

			this.skeleton = skeleton;

			if ( bindMatrix === undefined ) {

				this.updateMatrixWorld( true );

				this.skeleton.calculateInverses();

				bindMatrix = this.matrixWorld;

			}

			this.bindMatrix.copy( bindMatrix );
			this.bindMatrixInverse.getInverse( bindMatrix );

		},

		pose: function () {

			this.skeleton.pose();

		},

		normalizeSkinWeights: function () {

			var scale, i;

			if ( this.geometry && this.geometry.isGeometry ) {

				for ( i = 0; i < this.geometry.skinWeights.length; i ++ ) {

					var sw = this.geometry.skinWeights[ i ];

					scale = 1.0 / sw.manhattanLength();

					if ( scale !== Infinity ) {

						sw.multiplyScalar( scale );

					} else {

						sw.set( 1, 0, 0, 0 ); // do something reasonable

					}

				}

			} else if ( this.geometry && this.geometry.isBufferGeometry ) {

				var vec = new Vector4();

				var skinWeight = this.geometry.attributes.skinWeight;

				for ( i = 0; i < skinWeight.count; i ++ ) {

					vec.x = skinWeight.getX( i );
					vec.y = skinWeight.getY( i );
					vec.z = skinWeight.getZ( i );
					vec.w = skinWeight.getW( i );

					scale = 1.0 / vec.manhattanLength();

					if ( scale !== Infinity ) {

						vec.multiplyScalar( scale );

					} else {

						vec.set( 1, 0, 0, 0 ); // do something reasonable

					}

					skinWeight.setXYZW( i, vec.x, vec.y, vec.z, vec.w );

				}

			}

		},

		updateMatrixWorld: function ( force ) {

			Mesh.prototype.updateMatrixWorld.call( this, force );

			if ( this.bindMode === 'attached' ) {

				this.bindMatrixInverse.getInverse( this.matrixWorld );

			} else if ( this.bindMode === 'detached' ) {

				this.bindMatrixInverse.getInverse( this.bindMatrix );

			} else {

				console.warn( 'SkinnedMesh: Unrecognized bindMode: ' + this.bindMode );

			}

		},

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LineBasicMaterial( parameters ) {

		Material.call( this );

		this.type = 'LineBasicMaterial';

		this.color = new Color( 0xffffff );

		this.linewidth = 1;
		this.linecap = 'round';
		this.linejoin = 'round';

		this.lights = false;

		this.setValues( parameters );

	}

	LineBasicMaterial.prototype = Object.create( Material.prototype );
	LineBasicMaterial.prototype.constructor = LineBasicMaterial;

	LineBasicMaterial.prototype.isLineBasicMaterial = true;

	LineBasicMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.linewidth = source.linewidth;
		this.linecap = source.linecap;
		this.linejoin = source.linejoin;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Line( geometry, material, mode ) {

		if ( mode === 1 ) {

			console.error( 'Line: parameter LinePieces no longer supported. Use LineSegments instead.' );

		}

		Object3D.call( this );

		this.type = 'Line';

		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new LineBasicMaterial( { color: Math.random() * 0xffffff } );

	}

	Line.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Line,

		isLine: true,

		computeLineDistances: ( function () {

			var start = new Vector3();
			var end = new Vector3();

			return function computeLineDistances() {

				var geometry = this.geometry;

				if ( geometry.isBufferGeometry ) {

					// we assume non-indexed geometry

					if ( geometry.index === null ) {

						var positionAttribute = geometry.attributes.position;
						var lineDistances = [ 0 ];

						for ( var i = 1, l = positionAttribute.count; i < l; i ++ ) {

							start.fromBufferAttribute( positionAttribute, i - 1 );
							end.fromBufferAttribute( positionAttribute, i );

							lineDistances[ i ] = lineDistances[ i - 1 ];
							lineDistances[ i ] += start.distanceTo( end );

						}

						geometry.addAttribute( 'lineDistance', new Float32BufferAttribute( lineDistances, 1 ) );

					} else {

						console.warn( 'Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.' );

					}

				} else if ( geometry.isGeometry ) {

					var vertices = geometry.vertices;
					var lineDistances = geometry.lineDistances;

					lineDistances[ 0 ] = 0;

					for ( var i = 1, l = vertices.length; i < l; i ++ ) {

						lineDistances[ i ] = lineDistances[ i - 1 ];
						lineDistances[ i ] += vertices[ i - 1 ].distanceTo( vertices[ i ] );

					}

				}

				return this;

			};

		}() ),

		raycast: ( function () {

			var inverseMatrix = new Matrix4();
			var ray = new Ray();
			var sphere = new Sphere();

			return function raycast( raycaster, intersects ) {

				var precision = raycaster.linePrecision;

				var geometry = this.geometry;
				var matrixWorld = this.matrixWorld;

				// Checking boundingSphere distance to ray

				if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere );
				sphere.applyMatrix4( matrixWorld );
				sphere.radius += precision;

				if ( raycaster.ray.intersectsSphere( sphere ) === false ) return;

				//

				inverseMatrix.getInverse( matrixWorld );
				ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

				var localPrecision = precision / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
				var localPrecisionSq = localPrecision * localPrecision;

				var vStart = new Vector3();
				var vEnd = new Vector3();
				var interSegment = new Vector3();
				var interRay = new Vector3();
				var step = ( this && this.isLineSegments ) ? 2 : 1;

				if ( geometry.isBufferGeometry ) {

					var index = geometry.index;
					var attributes = geometry.attributes;
					var positions = attributes.position.array;

					if ( index !== null ) {

						var indices = index.array;

						for ( var i = 0, l = indices.length - 1; i < l; i += step ) {

							var a = indices[ i ];
							var b = indices[ i + 1 ];

							vStart.fromArray( positions, a * 3 );
							vEnd.fromArray( positions, b * 3 );

							var distSq = ray.distanceSqToSegment( vStart, vEnd, interRay, interSegment );

							if ( distSq > localPrecisionSq ) continue;

							interRay.applyMatrix4( this.matrixWorld ); //Move back to world space for distance calculation

							var distance = raycaster.ray.origin.distanceTo( interRay );

							if ( distance < raycaster.near || distance > raycaster.far ) continue;

							intersects.push( {

								distance: distance,
								// What do we want? intersection point on the ray or on the segment??
								// point: raycaster.ray.at( distance ),
								point: interSegment.clone().applyMatrix4( this.matrixWorld ),
								index: i,
								face: null,
								faceIndex: null,
								object: this

							} );

						}

					} else {

						for ( var i = 0, l = positions.length / 3 - 1; i < l; i += step ) {

							vStart.fromArray( positions, 3 * i );
							vEnd.fromArray( positions, 3 * i + 3 );

							var distSq = ray.distanceSqToSegment( vStart, vEnd, interRay, interSegment );

							if ( distSq > localPrecisionSq ) continue;

							interRay.applyMatrix4( this.matrixWorld ); //Move back to world space for distance calculation

							var distance = raycaster.ray.origin.distanceTo( interRay );

							if ( distance < raycaster.near || distance > raycaster.far ) continue;

							intersects.push( {

								distance: distance,
								// What do we want? intersection point on the ray or on the segment??
								// point: raycaster.ray.at( distance ),
								point: interSegment.clone().applyMatrix4( this.matrixWorld ),
								index: i,
								face: null,
								faceIndex: null,
								object: this

							} );

						}

					}

				} else if ( geometry.isGeometry ) {

					var vertices = geometry.vertices;
					var nbVertices = vertices.length;

					for ( var i = 0; i < nbVertices - 1; i += step ) {

						var distSq = ray.distanceSqToSegment( vertices[ i ], vertices[ i + 1 ], interRay, interSegment );

						if ( distSq > localPrecisionSq ) continue;

						interRay.applyMatrix4( this.matrixWorld ); //Move back to world space for distance calculation

						var distance = raycaster.ray.origin.distanceTo( interRay );

						if ( distance < raycaster.near || distance > raycaster.far ) continue;

						intersects.push( {

							distance: distance,
							// What do we want? intersection point on the ray or on the segment??
							// point: raycaster.ray.at( distance ),
							point: interSegment.clone().applyMatrix4( this.matrixWorld ),
							index: i,
							face: null,
							faceIndex: null,
							object: this

						} );

					}

				}

			};

		}() ),

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LineSegments( geometry, material ) {

		Line.call( this, geometry, material );

		this.type = 'LineSegments';

	}

	LineSegments.prototype = Object.assign( Object.create( Line.prototype ), {

		constructor: LineSegments,

		isLineSegments: true,

		computeLineDistances: ( function () {

			var start = new Vector3();
			var end = new Vector3();

			return function computeLineDistances() {

				var geometry = this.geometry;

				if ( geometry.isBufferGeometry ) {

					// we assume non-indexed geometry

					if ( geometry.index === null ) {

						var positionAttribute = geometry.attributes.position;
						var lineDistances = [];

						for ( var i = 0, l = positionAttribute.count; i < l; i += 2 ) {

							start.fromBufferAttribute( positionAttribute, i );
							end.fromBufferAttribute( positionAttribute, i + 1 );

							lineDistances[ i ] = ( i === 0 ) ? 0 : lineDistances[ i - 1 ];
							lineDistances[ i + 1 ] = lineDistances[ i ] + start.distanceTo( end );

						}

						geometry.addAttribute( 'lineDistance', new Float32BufferAttribute( lineDistances, 1 ) );

					} else {

						console.warn( 'LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.' );

					}

				} else if ( geometry.isGeometry ) {

					var vertices = geometry.vertices;
					var lineDistances = geometry.lineDistances;

					for ( var i = 0, l = vertices.length; i < l; i += 2 ) {

						start.copy( vertices[ i ] );
						end.copy( vertices[ i + 1 ] );

						lineDistances[ i ] = ( i === 0 ) ? 0 : lineDistances[ i - 1 ];
						lineDistances[ i + 1 ] = lineDistances[ i ] + start.distanceTo( end );

					}

				}

				return this;

			};

		}() )

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LineLoop( geometry, material ) {

		Line.call( this, geometry, material );

		this.type = 'LineLoop';

	}

	LineLoop.prototype = Object.assign( Object.create( Line.prototype ), {

		constructor: LineLoop,

		isLineLoop: true,

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function PointsMaterial( parameters ) {

		Material.call( this );

		this.type = 'PointsMaterial';

		this.color = new Color( 0xffffff );

		this.map = null;

		this.size = 1;
		this.sizeAttenuation = true;

		this.morphTargets = false;

		this.lights = false;

		this.setValues( parameters );

	}

	PointsMaterial.prototype = Object.create( Material.prototype );
	PointsMaterial.prototype.constructor = PointsMaterial;

	PointsMaterial.prototype.isPointsMaterial = true;

	PointsMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.map = source.map;

		this.size = source.size;
		this.sizeAttenuation = source.sizeAttenuation;

		this.morphTargets = source.morphTargets;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Points( geometry, material ) {

		Object3D.call( this );

		this.type = 'Points';

		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new PointsMaterial( { color: Math.random() * 0xffffff } );

	}

	Points.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Points,

		isPoints: true,

		raycast: ( function () {

			var inverseMatrix = new Matrix4();
			var ray = new Ray();
			var sphere = new Sphere();

			return function raycast( raycaster, intersects ) {

				var object = this;
				var geometry = this.geometry;
				var matrixWorld = this.matrixWorld;
				var threshold = raycaster.params.Points.threshold;

				// Checking boundingSphere distance to ray

				if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere );
				sphere.applyMatrix4( matrixWorld );
				sphere.radius += threshold;

				if ( raycaster.ray.intersectsSphere( sphere ) === false ) return;

				//

				inverseMatrix.getInverse( matrixWorld );
				ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

				var localThreshold = threshold / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
				var localThresholdSq = localThreshold * localThreshold;
				var position = new Vector3();
				var intersectPoint = new Vector3();

				function testPoint( point, index ) {

					var rayPointDistanceSq = ray.distanceSqToPoint( point );

					if ( rayPointDistanceSq < localThresholdSq ) {

						ray.closestPointToPoint( point, intersectPoint );
						intersectPoint.applyMatrix4( matrixWorld );

						var distance = raycaster.ray.origin.distanceTo( intersectPoint );

						if ( distance < raycaster.near || distance > raycaster.far ) return;

						intersects.push( {

							distance: distance,
							distanceToRay: Math.sqrt( rayPointDistanceSq ),
							point: intersectPoint.clone(),
							index: index,
							face: null,
							object: object

						} );

					}

				}

				if ( geometry.isBufferGeometry ) {

					var index = geometry.index;
					var attributes = geometry.attributes;
					var positions = attributes.position.array;

					if ( index !== null ) {

						var indices = index.array;

						for ( var i = 0, il = indices.length; i < il; i ++ ) {

							var a = indices[ i ];

							position.fromArray( positions, a * 3 );

							testPoint( position, a );

						}

					} else {

						for ( var i = 0, l = positions.length / 3; i < l; i ++ ) {

							position.fromArray( positions, i * 3 );

							testPoint( position, i );

						}

					}

				} else {

					var vertices = geometry.vertices;

					for ( var i = 0, l = vertices.length; i < l; i ++ ) {

						testPoint( vertices[ i ], i );

					}

				}

			};

		}() ),

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Group() {

		Object3D.call( this );

		this.type = 'Group';

	}

	Group.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Group,

		isGroup: true

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var AnimationUtils = {

		// same as Array.prototype.slice, but also works on typed arrays
		arraySlice: function ( array, from, to ) {

			if ( AnimationUtils.isTypedArray( array ) ) {

				// in ios9 array.subarray(from, undefined) will return empty array
				// but array.subarray(from) or array.subarray(from, len) is correct
				return new array.constructor( array.subarray( from, to !== undefined ? to : array.length ) );

			}

			return array.slice( from, to );

		},

		// converts an array to a specific type
		convertArray: function ( array, type, forceClone ) {

			if ( ! array || // let 'undefined' and 'null' pass
					! forceClone && array.constructor === type ) return array;

			if ( typeof type.BYTES_PER_ELEMENT === 'number' ) {

				return new type( array ); // create typed array

			}

			return Array.prototype.slice.call( array ); // create Array

		},

		isTypedArray: function ( object ) {

			return ArrayBuffer.isView( object ) &&
					! ( object instanceof DataView );

		},

		// returns an array by which times and values can be sorted
		getKeyframeOrder: function ( times ) {

			function compareTime( i, j ) {

				return times[ i ] - times[ j ];

			}

			var n = times.length;
			var result = new Array( n );
			for ( var i = 0; i !== n; ++ i ) result[ i ] = i;

			result.sort( compareTime );

			return result;

		},

		// uses the array previously returned by 'getKeyframeOrder' to sort data
		sortedArray: function ( values, stride, order ) {

			var nValues = values.length;
			var result = new values.constructor( nValues );

			for ( var i = 0, dstOffset = 0; dstOffset !== nValues; ++ i ) {

				var srcOffset = order[ i ] * stride;

				for ( var j = 0; j !== stride; ++ j ) {

					result[ dstOffset ++ ] = values[ srcOffset + j ];

				}

			}

			return result;

		},

		// function for parsing AOS keyframe formats
		flattenJSON: function ( jsonKeys, times, values, valuePropertyName ) {

			var i = 1, key = jsonKeys[ 0 ];

			while ( key !== undefined && key[ valuePropertyName ] === undefined ) {

				key = jsonKeys[ i ++ ];

			}

			if ( key === undefined ) return; // no data

			var value = key[ valuePropertyName ];
			if ( value === undefined ) return; // no data

			if ( Array.isArray( value ) ) {

				do {

					value = key[ valuePropertyName ];

					if ( value !== undefined ) {

						times.push( key.time );
						values.push.apply( values, value ); // push all elements

					}

					key = jsonKeys[ i ++ ];

				} while ( key !== undefined );

			} else if ( value.toArray !== undefined ) {

				// ...assume Math-ish

				do {

					value = key[ valuePropertyName ];

					if ( value !== undefined ) {

						times.push( key.time );
						value.toArray( values, values.length );

					}

					key = jsonKeys[ i ++ ];

				} while ( key !== undefined );

			} else {

				// otherwise push as-is

				do {

					value = key[ valuePropertyName ];

					if ( value !== undefined ) {

						times.push( key.time );
						values.push( value );

					}

					key = jsonKeys[ i ++ ];

				} while ( key !== undefined );

			}

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CubicInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

		this._weightPrev = - 0;
		this._offsetPrev = - 0;
		this._weightNext = - 0;
		this._offsetNext = - 0;

	}

	CubicInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

		constructor: CubicInterpolant,

		DefaultSettings_: {

			endingStart: ZeroCurvatureEnding,
			endingEnd: ZeroCurvatureEnding

		},

		intervalChanged_: function ( i1, t0, t1 ) {

			var pp = this.parameterPositions,
				iPrev = i1 - 2,
				iNext = i1 + 1,

				tPrev = pp[ iPrev ],
				tNext = pp[ iNext ];

			if ( tPrev === undefined ) {

				switch ( this.getSettings_().endingStart ) {

					case ZeroSlopeEnding:

						// f'(t0) = 0
						iPrev = i1;
						tPrev = 2 * t0 - t1;

						break;

					case WrapAroundEnding:

						// use the other end of the curve
						iPrev = pp.length - 2;
						tPrev = t0 + pp[ iPrev ] - pp[ iPrev + 1 ];

						break;

					default: // ZeroCurvatureEnding

						// f''(t0) = 0 a.k.a. Natural Spline
						iPrev = i1;
						tPrev = t1;

				}

			}

			if ( tNext === undefined ) {

				switch ( this.getSettings_().endingEnd ) {

					case ZeroSlopeEnding:

						// f'(tN) = 0
						iNext = i1;
						tNext = 2 * t1 - t0;

						break;

					case WrapAroundEnding:

						// use the other end of the curve
						iNext = 1;
						tNext = t1 + pp[ 1 ] - pp[ 0 ];

						break;

					default: // ZeroCurvatureEnding

						// f''(tN) = 0, a.k.a. Natural Spline
						iNext = i1 - 1;
						tNext = t0;

				}

			}

			var halfDt = ( t1 - t0 ) * 0.5,
				stride = this.valueSize;

			this._weightPrev = halfDt / ( t0 - tPrev );
			this._weightNext = halfDt / ( tNext - t1 );
			this._offsetPrev = iPrev * stride;
			this._offsetNext = iNext * stride;

		},

		interpolate_: function ( i1, t0, t, t1 ) {

			var result = this.resultBuffer,
				values = this.sampleValues,
				stride = this.valueSize,

				o1 = i1 * stride,		o0 = o1 - stride,
				oP = this._offsetPrev, 	oN = this._offsetNext,
				wP = this._weightPrev,	wN = this._weightNext,

				p = ( t - t0 ) / ( t1 - t0 ),
				pp = p * p,
				ppp = pp * p;

			// evaluate polynomials

			var sP = - wP * ppp + 2 * wP * pp - wP * p;
			var s0 = ( 1 + wP ) * ppp + ( - 1.5 - 2 * wP ) * pp + ( - 0.5 + wP ) * p + 1;
			var s1 = ( - 1 - wN ) * ppp + ( 1.5 + wN ) * pp + 0.5 * p;
			var sN = wN * ppp - wN * pp;

			// combine data linearly

			for ( var i = 0; i !== stride; ++ i ) {

				result[ i ] =
						sP * values[ oP + i ] +
						s0 * values[ o0 + i ] +
						s1 * values[ o1 + i ] +
						sN * values[ oN + i ];

			}

			return result;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LinearInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	LinearInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

		constructor: LinearInterpolant,

		interpolate_: function ( i1, t0, t, t1 ) {

			var result = this.resultBuffer,
				values = this.sampleValues,
				stride = this.valueSize,

				offset1 = i1 * stride,
				offset0 = offset1 - stride,

				weight1 = ( t - t0 ) / ( t1 - t0 ),
				weight0 = 1 - weight1;

			for ( var i = 0; i !== stride; ++ i ) {

				result[ i ] =
						values[ offset0 + i ] * weight0 +
						values[ offset1 + i ] * weight1;

			}

			return result;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function DiscreteInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	DiscreteInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

		constructor: DiscreteInterpolant,

		interpolate_: function ( i1  ) {

			return this.copySampleValue_( i1 - 1 );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function KeyframeTrack( name, times, values, interpolation ) {

		if ( name === undefined ) throw new Error( 'KeyframeTrack: track name is undefined' );
		if ( times === undefined || times.length === 0 ) throw new Error( 'KeyframeTrack: no keyframes in track named ' + name );

		this.name = name;

		this.times = AnimationUtils.convertArray( times, this.TimeBufferType );
		this.values = AnimationUtils.convertArray( values, this.ValueBufferType );

		this.setInterpolation( interpolation || this.DefaultInterpolation );

	}

	// Static methods

	Object.assign( KeyframeTrack, {

		// Serialization (in static context, because of constructor invocation
		// and automatic invocation of .toJSON):

		toJSON: function ( track ) {

			var trackType = track.constructor;

			var json;

			// derived classes can define a static toJSON method
			if ( trackType.toJSON !== undefined ) {

				json = trackType.toJSON( track );

			} else {

				// by default, we assume the data can be serialized as-is
				json = {

					'name': track.name,
					'times': AnimationUtils.convertArray( track.times, Array ),
					'values': AnimationUtils.convertArray( track.values, Array )

				};

				var interpolation = track.getInterpolation();

				if ( interpolation !== track.DefaultInterpolation ) {

					json.interpolation = interpolation;

				}

			}

			json.type = track.ValueTypeName; // mandatory

			return json;

		}

	} );

	Object.assign( KeyframeTrack.prototype, {

		constructor: KeyframeTrack,

		TimeBufferType: Float32Array,

		ValueBufferType: Float32Array,

		DefaultInterpolation: InterpolateLinear,

		InterpolantFactoryMethodDiscrete: function ( result ) {

			return new DiscreteInterpolant( this.times, this.values, this.getValueSize(), result );

		},

		InterpolantFactoryMethodLinear: function ( result ) {

			return new LinearInterpolant( this.times, this.values, this.getValueSize(), result );

		},

		InterpolantFactoryMethodSmooth: function ( result ) {

			return new CubicInterpolant( this.times, this.values, this.getValueSize(), result );

		},

		setInterpolation: function ( interpolation ) {

			var factoryMethod;

			switch ( interpolation ) {

				case InterpolateDiscrete:

					factoryMethod = this.InterpolantFactoryMethodDiscrete;

					break;

				case InterpolateLinear:

					factoryMethod = this.InterpolantFactoryMethodLinear;

					break;

				case InterpolateSmooth:

					factoryMethod = this.InterpolantFactoryMethodSmooth;

					break;

			}

			if ( factoryMethod === undefined ) {

				var message = "unsupported interpolation for " +
					this.ValueTypeName + " keyframe track named " + this.name;

				if ( this.createInterpolant === undefined ) {

					// fall back to default, unless the default itself is messed up
					if ( interpolation !== this.DefaultInterpolation ) {

						this.setInterpolation( this.DefaultInterpolation );

					} else {

						throw new Error( message ); // fatal, in this case

					}

				}

				console.warn( 'KeyframeTrack:', message );
				return this;

			}

			this.createInterpolant = factoryMethod;

			return this;

		},

		getInterpolation: function () {

			switch ( this.createInterpolant ) {

				case this.InterpolantFactoryMethodDiscrete:

					return InterpolateDiscrete;

				case this.InterpolantFactoryMethodLinear:

					return InterpolateLinear;

				case this.InterpolantFactoryMethodSmooth:

					return InterpolateSmooth;

			}

		},

		getValueSize: function () {

			return this.values.length / this.times.length;

		},

		// move all keyframes either forwards or backwards in time
		shift: function ( timeOffset ) {

			if ( timeOffset !== 0.0 ) {

				var times = this.times;

				for ( var i = 0, n = times.length; i !== n; ++ i ) {

					times[ i ] += timeOffset;

				}

			}

			return this;

		},

		// scale all keyframe times by a factor (useful for frame <-> seconds conversions)
		scale: function ( timeScale ) {

			if ( timeScale !== 1.0 ) {

				var times = this.times;

				for ( var i = 0, n = times.length; i !== n; ++ i ) {

					times[ i ] *= timeScale;

				}

			}

			return this;

		},

		// removes keyframes before and after animation without changing any values within the range [startTime, endTime].
		// IMPORTANT: We do not shift around keys to the start of the track time, because for interpolated keys this will change their values
		trim: function ( startTime, endTime ) {

			var times = this.times,
				nKeys = times.length,
				from = 0,
				to = nKeys - 1;

			while ( from !== nKeys && times[ from ] < startTime ) {

				++ from;

			}

			while ( to !== - 1 && times[ to ] > endTime ) {

				-- to;

			}

			++ to; // inclusive -> exclusive bound

			if ( from !== 0 || to !== nKeys ) {

				// empty tracks are forbidden, so keep at least one keyframe
				if ( from >= to ) to = Math.max( to, 1 ), from = to - 1;

				var stride = this.getValueSize();
				this.times = AnimationUtils.arraySlice( times, from, to );
				this.values = AnimationUtils.arraySlice( this.values, from * stride, to * stride );

			}

			return this;

		},

		// ensure we do not get a GarbageInGarbageOut situation, make sure tracks are at least minimally viable
		validate: function () {

			var valid = true;

			var valueSize = this.getValueSize();
			if ( valueSize - Math.floor( valueSize ) !== 0 ) {

				console.error( 'KeyframeTrack: Invalid value size in track.', this );
				valid = false;

			}

			var times = this.times,
				values = this.values,

				nKeys = times.length;

			if ( nKeys === 0 ) {

				console.error( 'KeyframeTrack: Track is empty.', this );
				valid = false;

			}

			var prevTime = null;

			for ( var i = 0; i !== nKeys; i ++ ) {

				var currTime = times[ i ];

				if ( typeof currTime === 'number' && isNaN( currTime ) ) {

					console.error( 'KeyframeTrack: Time is not a valid number.', this, i, currTime );
					valid = false;
					break;

				}

				if ( prevTime !== null && prevTime > currTime ) {

					console.error( 'KeyframeTrack: Out of order keys.', this, i, currTime, prevTime );
					valid = false;
					break;

				}

				prevTime = currTime;

			}

			if ( values !== undefined ) {

				if ( AnimationUtils.isTypedArray( values ) ) {

					for ( var i = 0, n = values.length; i !== n; ++ i ) {

						var value = values[ i ];

						if ( isNaN( value ) ) {

							console.error( 'KeyframeTrack: Value is not a valid number.', this, i, value );
							valid = false;
							break;

						}

					}

				}

			}

			return valid;

		},

		// removes equivalent sequential keys as common in morph target sequences
		// (0,0,0,0,1,1,1,0,0,0,0,0,0,0) --> (0,0,1,1,0,0)
		optimize: function () {

			var times = this.times,
				values = this.values,
				stride = this.getValueSize(),

				smoothInterpolation = this.getInterpolation() === InterpolateSmooth,

				writeIndex = 1,
				lastIndex = times.length - 1;

			for ( var i = 1; i < lastIndex; ++ i ) {

				var keep = false;

				var time = times[ i ];
				var timeNext = times[ i + 1 ];

				// remove adjacent keyframes scheduled at the same time

				if ( time !== timeNext && ( i !== 1 || time !== time[ 0 ] ) ) {

					if ( ! smoothInterpolation ) {

						// remove unnecessary keyframes same as their neighbors

						var offset = i * stride,
							offsetP = offset - stride,
							offsetN = offset + stride;

						for ( var j = 0; j !== stride; ++ j ) {

							var value = values[ offset + j ];

							if ( value !== values[ offsetP + j ] ||
								value !== values[ offsetN + j ] ) {

								keep = true;
								break;

							}

						}

					} else {

						keep = true;

					}

				}

				// in-place compaction

				if ( keep ) {

					if ( i !== writeIndex ) {

						times[ writeIndex ] = times[ i ];

						var readOffset = i * stride,
							writeOffset = writeIndex * stride;

						for ( var j = 0; j !== stride; ++ j ) {

							values[ writeOffset + j ] = values[ readOffset + j ];

						}

					}

					++ writeIndex;

				}

			}

			// flush last keyframe (compaction looks ahead)

			if ( lastIndex > 0 ) {

				times[ writeIndex ] = times[ lastIndex ];

				for ( var readOffset = lastIndex * stride, writeOffset = writeIndex * stride, j = 0; j !== stride; ++ j ) {

					values[ writeOffset + j ] = values[ readOffset + j ];

				}

				++ writeIndex;

			}

			if ( writeIndex !== times.length ) {

				this.times = AnimationUtils.arraySlice( times, 0, writeIndex );
				this.values = AnimationUtils.arraySlice( values, 0, writeIndex * stride );

			}

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function BooleanKeyframeTrack( name, times, values ) {

		KeyframeTrack.call( this, name, times, values );

	}

	BooleanKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: BooleanKeyframeTrack,

		ValueTypeName: 'bool',
		ValueBufferType: Array,

		DefaultInterpolation: InterpolateDiscrete,

		InterpolantFactoryMethodLinear: undefined,
		InterpolantFactoryMethodSmooth: undefined

		// Note: Actually this track could have a optimized / compressed
		// representation of a single value and a custom interpolant that
		// computes "firstValue ^ isOdd( index )".

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function ColorKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	ColorKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: ColorKeyframeTrack,

		ValueTypeName: 'color'

		// ValueBufferType is inherited

		// DefaultInterpolation is inherited

		// Note: Very basic implementation and nothing special yet.
		// However, this is the place for color space parameterization.

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function NumberKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	NumberKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: NumberKeyframeTrack,

		ValueTypeName: 'number'

		// ValueBufferType is inherited

		// DefaultInterpolation is inherited

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function QuaternionLinearInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	QuaternionLinearInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

		constructor: QuaternionLinearInterpolant,

		interpolate_: function ( i1, t0, t, t1 ) {

			var result = this.resultBuffer,
				values = this.sampleValues,
				stride = this.valueSize,

				offset = i1 * stride,

				alpha = ( t - t0 ) / ( t1 - t0 );

			for ( var end = offset + stride; offset !== end; offset += 4 ) {

				Quaternion.slerpFlat( result, 0, values, offset - stride, values, offset, alpha );

			}

			return result;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function QuaternionKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	QuaternionKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: QuaternionKeyframeTrack,

		ValueTypeName: 'quaternion',

		// ValueBufferType is inherited

		DefaultInterpolation: InterpolateLinear,

		InterpolantFactoryMethodLinear: function ( result ) {

			return new QuaternionLinearInterpolant( this.times, this.values, this.getValueSize(), result );

		},

		InterpolantFactoryMethodSmooth: undefined // not yet implemented

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function StringKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	StringKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: StringKeyframeTrack,

		ValueTypeName: 'string',
		ValueBufferType: Array,

		DefaultInterpolation: InterpolateDiscrete,

		InterpolantFactoryMethodLinear: undefined,

		InterpolantFactoryMethodSmooth: undefined

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function VectorKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	VectorKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: VectorKeyframeTrack,

		ValueTypeName: 'vector'

		// ValueBufferType is inherited

		// DefaultInterpolation is inherited

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function AnimationClip( name, duration, tracks ) {

		this.name = name;
		this.tracks = tracks;
		this.duration = ( duration !== undefined ) ? duration : - 1;

		this.uuid = _Math.generateUUID();

		// this means it should figure out its duration by scanning the tracks
		if ( this.duration < 0 ) {

			this.resetDuration();

		}

	}

	function getTrackTypeForValueTypeName( typeName ) {

		switch ( typeName.toLowerCase() ) {

			case 'scalar':
			case 'double':
			case 'float':
			case 'number':
			case 'integer':

				return NumberKeyframeTrack;

			case 'vector':
			case 'vector2':
			case 'vector3':
			case 'vector4':

				return VectorKeyframeTrack;

			case 'color':

				return ColorKeyframeTrack;

			case 'quaternion':

				return QuaternionKeyframeTrack;

			case 'bool':
			case 'boolean':

				return BooleanKeyframeTrack;

			case 'string':

				return StringKeyframeTrack;

		}

		throw new Error( 'KeyframeTrack: Unsupported typeName: ' + typeName );

	}

	function parseKeyframeTrack( json ) {

		if ( json.type === undefined ) {

			throw new Error( 'KeyframeTrack: track type undefined, can not parse' );

		}

		var trackType = getTrackTypeForValueTypeName( json.type );

		if ( json.times === undefined ) {

			var times = [], values = [];

			AnimationUtils.flattenJSON( json.keys, times, values, 'value' );

			json.times = times;
			json.values = values;

		}

		// derived classes can define a static parse method
		if ( trackType.parse !== undefined ) {

			return trackType.parse( json );

		} else {

			// by default, we assume a constructor compatible with the base
			return new trackType( json.name, json.times, json.values, json.interpolation );

		}

	}

	Object.assign( AnimationClip, {

		parse: function ( json ) {

			var tracks = [],
				jsonTracks = json.tracks,
				frameTime = 1.0 / ( json.fps || 1.0 );

			for ( var i = 0, n = jsonTracks.length; i !== n; ++ i ) {

				tracks.push( parseKeyframeTrack( jsonTracks[ i ] ).scale( frameTime ) );

			}

			return new AnimationClip( json.name, json.duration, tracks );

		},

		toJSON: function ( clip ) {

			var tracks = [],
				clipTracks = clip.tracks;

			var json = {

				'name': clip.name,
				'duration': clip.duration,
				'tracks': tracks,
				'uuid': clip.uuid

			};

			for ( var i = 0, n = clipTracks.length; i !== n; ++ i ) {

				tracks.push( KeyframeTrack.toJSON( clipTracks[ i ] ) );

			}

			return json;

		},

		CreateFromMorphTargetSequence: function ( name, morphTargetSequence, fps, noLoop ) {

			var numMorphTargets = morphTargetSequence.length;
			var tracks = [];

			for ( var i = 0; i < numMorphTargets; i ++ ) {

				var times = [];
				var values = [];

				times.push(
					( i + numMorphTargets - 1 ) % numMorphTargets,
					i,
					( i + 1 ) % numMorphTargets );

				values.push( 0, 1, 0 );

				var order = AnimationUtils.getKeyframeOrder( times );
				times = AnimationUtils.sortedArray( times, 1, order );
				values = AnimationUtils.sortedArray( values, 1, order );

				// if there is a key at the first frame, duplicate it as the
				// last frame as well for perfect loop.
				if ( ! noLoop && times[ 0 ] === 0 ) {

					times.push( numMorphTargets );
					values.push( values[ 0 ] );

				}

				tracks.push(
					new NumberKeyframeTrack(
						'.morphTargetInfluences[' + morphTargetSequence[ i ].name + ']',
						times, values
					).scale( 1.0 / fps ) );

			}

			return new AnimationClip( name, - 1, tracks );

		},

		findByName: function ( objectOrClipArray, name ) {

			var clipArray = objectOrClipArray;

			if ( ! Array.isArray( objectOrClipArray ) ) {

				var o = objectOrClipArray;
				clipArray = o.geometry && o.geometry.animations || o.animations;

			}

			for ( var i = 0; i < clipArray.length; i ++ ) {

				if ( clipArray[ i ].name === name ) {

					return clipArray[ i ];

				}

			}

			return null;

		},

		CreateClipsFromMorphTargetSequences: function ( morphTargets, fps, noLoop ) {

			var animationToMorphTargets = {};

			// tested with https://regex101.com/ on trick sequences
			// such flamingo_flyA_003, flamingo_run1_003, crdeath0059
			var pattern = /^([\w-]*?)([\d]+)$/;

			// sort morph target names into animation groups based
			// patterns like Walk_001, Walk_002, Run_001, Run_002
			for ( var i = 0, il = morphTargets.length; i < il; i ++ ) {

				var morphTarget = morphTargets[ i ];
				var parts = morphTarget.name.match( pattern );

				if ( parts && parts.length > 1 ) {

					var name = parts[ 1 ];

					var animationMorphTargets = animationToMorphTargets[ name ];
					if ( ! animationMorphTargets ) {

						animationToMorphTargets[ name ] = animationMorphTargets = [];

					}

					animationMorphTargets.push( morphTarget );

				}

			}

			var clips = [];

			for ( var name in animationToMorphTargets ) {

				clips.push( AnimationClip.CreateFromMorphTargetSequence( name, animationToMorphTargets[ name ], fps, noLoop ) );

			}

			return clips;

		},

		// parse the animation.hierarchy format
		parseAnimation: function ( animation, bones ) {

			if ( ! animation ) {

				console.error( 'AnimationClip: No animation in JSONLoader data.' );
				return null;

			}

			var addNonemptyTrack = function ( trackType, trackName, animationKeys, propertyName, destTracks ) {

				// only return track if there are actually keys.
				if ( animationKeys.length !== 0 ) {

					var times = [];
					var values = [];

					AnimationUtils.flattenJSON( animationKeys, times, values, propertyName );

					// empty keys are filtered out, so check again
					if ( times.length !== 0 ) {

						destTracks.push( new trackType( trackName, times, values ) );

					}

				}

			};

			var tracks = [];

			var clipName = animation.name || 'default';
			// automatic length determination in AnimationClip.
			var duration = animation.length || - 1;
			var fps = animation.fps || 30;

			var hierarchyTracks = animation.hierarchy || [];

			for ( var h = 0; h < hierarchyTracks.length; h ++ ) {

				var animationKeys = hierarchyTracks[ h ].keys;

				// skip empty tracks
				if ( ! animationKeys || animationKeys.length === 0 ) continue;

				// process morph targets
				if ( animationKeys[ 0 ].morphTargets ) {

					// figure out all morph targets used in this track
					var morphTargetNames = {};

					for ( var k = 0; k < animationKeys.length; k ++ ) {

						if ( animationKeys[ k ].morphTargets ) {

							for ( var m = 0; m < animationKeys[ k ].morphTargets.length; m ++ ) {

								morphTargetNames[ animationKeys[ k ].morphTargets[ m ] ] = - 1;

							}

						}

					}

					// create a track for each morph target with all zero
					// morphTargetInfluences except for the keys in which
					// the morphTarget is named.
					for ( var morphTargetName in morphTargetNames ) {

						var times = [];
						var values = [];

						for ( var m = 0; m !== animationKeys[ k ].morphTargets.length; ++ m ) {

							var animationKey = animationKeys[ k ];

							times.push( animationKey.time );
							values.push( ( animationKey.morphTarget === morphTargetName ) ? 1 : 0 );

						}

						tracks.push( new NumberKeyframeTrack( '.morphTargetInfluence[' + morphTargetName + ']', times, values ) );

					}

					duration = morphTargetNames.length * ( fps || 1.0 );

				} else {

					// ...assume skeletal animation

					var boneName = '.bones[' + bones[ h ].name + ']';

					addNonemptyTrack(
						VectorKeyframeTrack, boneName + '.position',
						animationKeys, 'pos', tracks );

					addNonemptyTrack(
						QuaternionKeyframeTrack, boneName + '.quaternion',
						animationKeys, 'rot', tracks );

					addNonemptyTrack(
						VectorKeyframeTrack, boneName + '.scale',
						animationKeys, 'scl', tracks );

				}

			}

			if ( tracks.length === 0 ) {

				return null;

			}

			var clip = new AnimationClip( clipName, duration, tracks );

			return clip;

		}

	} );

	Object.assign( AnimationClip.prototype, {

		resetDuration: function () {

			var tracks = this.tracks, duration = 0;

			for ( var i = 0, n = tracks.length; i !== n; ++ i ) {

				var track = this.tracks[ i ];

				duration = Math.max( duration, track.times[ track.times.length - 1 ] );

			}

			this.duration = duration;

			return this;

		},

		trim: function () {

			for ( var i = 0; i < this.tracks.length; i ++ ) {

				this.tracks[ i ].trim( 0, this.duration );

			}

			return this;

		},

		validate: function () {

			var valid = true;

			for ( var i = 0; i < this.tracks.length; i ++ ) {

				valid = valid && this.tracks[ i ].validate();

			}

			return valid;

		},

		optimize: function () {

			for ( var i = 0; i < this.tracks.length; i ++ ) {

				this.tracks[ i ].optimize();

			}

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Scene() {

		Object3D.call( this );

		this.type = 'Scene';

		this.background = null;
		this.fog = null;
		this.overrideMaterial = null;

		this.autoUpdate = true; // checked by the renderer

	}

	Scene.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Scene,

		copy: function ( source, recursive ) {

			Object3D.prototype.copy.call( this, source, recursive );

			if ( source.background !== null ) this.background = source.background.clone();
			if ( source.fog !== null ) this.fog = source.fog.clone();
			if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

			this.autoUpdate = source.autoUpdate;
			this.matrixAutoUpdate = source.matrixAutoUpdate;

			return this;

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			if ( this.background !== null ) data.object.background = this.background.toJSON( meta );
			if ( this.fog !== null ) data.object.fog = this.fog.toJSON();

			return data;

		}

	} );

	var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n";

	var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n";

	var alphatest_fragment = "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n";

	var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n";

	var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";

	var begin_vertex = "\nvec3 transformed = vec3( position );\n";

	var beginnormal_vertex = "\nvec3 objectNormal = vec3( normal );\n";

	var bsdfs = "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}float G_BlinnPhong_Implicit(  ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit(  );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n";

	var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n";

	var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif\n";

	var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n";

	var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif\n";

	var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n";

	var color_fragment = "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif";

	var color_pars_fragment = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n";

	var color_pars_vertex = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif";

	var color_vertex = "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif";

	var common = "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n";

	var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n";

	var defaultnormal_vertex = "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n";

	var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n";

	var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n";

	var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n";

	var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n";

	var encodings_fragment = "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n";

	var encodings_pars_fragment = "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}\n";

	var envmap_fragment = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n";

	var envmap_pars_fragment = "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n";

	var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n";

	var envmap_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n";

	var fog_vertex = "#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif\n";

	var fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif\n";

	var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n";

	var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n";

	var gradientmap_pars_fragment = "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n";

	var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n";

	var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";

	var lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n";

	var lights_pars_begin = "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n";

	var envmap_physical_pars_fragment = "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance(  const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance(  const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n";

	var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n";

	var lights_phong_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n";

	var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n";

	var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n";

	var lights_fragment_begin = "GeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n";

	var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance(  geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance(  geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance(  geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif\n";

	var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n";

	var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";

	var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n#endif\n";

	var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif\n";

	var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n";

	var map_fragment = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n";

	var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n";

	var map_particle_fragment = "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n";

	var map_particle_pars_fragment = "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n";

	var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n";

	var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";

	var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n";

	var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif";

	var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n";

	var normal_fragment_begin = "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n";

	var normal_fragment_maps = "#ifdef USE_NORMALMAP\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t#ifdef FLIP_SIDED\n\t\t\tnormal = - normal;\n\t\t#endif\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tnormal = normalize( normalMatrix * normal );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n";

	var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tuniform mat3 normalMatrix;\n\t#else\n\t\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\t\tvec2 st0 = dFdx( vUv.st );\n\t\t\tvec2 st1 = dFdy( vUv.st );\n\t\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\t\tvec3 N = normalize( surf_norm );\n\t\t\tmat3 tsn = mat3( S, T, N );\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t\tmapN.xy *= normalScale;\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\treturn normalize( tsn * mapN );\n\t\t}\n\t#endif\n#endif\n";

	var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n";

	var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n";

	var project_vertex = "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n";

	var dithering_fragment = "#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n";

	var dithering_pars_fragment = "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n";

	var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n";

	var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";

	var shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n";

	var shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n";

	var shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n";

	var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n";

	var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";

	var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n";

	var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n";

	var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n";

	var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";

	var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";

	var tonemapping_fragment = "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n";

	var tonemapping_pars_fragment = "#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n";

	var uv_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif";

	var uv_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n";

	var uv_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif";

	var uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";

	var uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif";

	var uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif";

	var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n";

	var background_frag = "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tgl_FragColor = texture2D( t2D, vUv );\n}\n";

	var background_vert = "varying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\tgl_Position = vec4( position, 1.0 );\n\tgl_Position.z = 1.0;\n}\n";

	var cube_frag = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n";

	var cube_vert = "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n";

	var depth_frag = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n";

	var depth_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n";

	var distanceRGBA_frag = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n";

	var distanceRGBA_vert = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n";

	var equirect_frag = "uniform sampler2D tEquirect;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n";

	var equirect_vert = "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n";

	var linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n";

	var meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var meshbasic_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

	var meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var meshmatcap_frag = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\tvec4 matcapColor = texture2D( matcap, uv );\n\tmatcapColor = matcapTexelToLinear( matcapColor );\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var meshmatcap_vert = "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}\n";

	var meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

	var meshphong_vert = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var meshphysical_frag = "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

	var meshphysical_vert = "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var normal_frag = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n";

	var normal_vert = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n";

	var points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var points_vert = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}\n";

	var shadow_frag = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n";

	var shadow_vert = "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var sprite_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var sprite_vert = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n";

	var ShaderChunk = {
		alphamap_fragment: alphamap_fragment,
		alphamap_pars_fragment: alphamap_pars_fragment,
		alphatest_fragment: alphatest_fragment,
		aomap_fragment: aomap_fragment,
		aomap_pars_fragment: aomap_pars_fragment,
		begin_vertex: begin_vertex,
		beginnormal_vertex: beginnormal_vertex,
		bsdfs: bsdfs,
		bumpmap_pars_fragment: bumpmap_pars_fragment,
		clipping_planes_fragment: clipping_planes_fragment,
		clipping_planes_pars_fragment: clipping_planes_pars_fragment,
		clipping_planes_pars_vertex: clipping_planes_pars_vertex,
		clipping_planes_vertex: clipping_planes_vertex,
		color_fragment: color_fragment,
		color_pars_fragment: color_pars_fragment,
		color_pars_vertex: color_pars_vertex,
		color_vertex: color_vertex,
		common: common,
		cube_uv_reflection_fragment: cube_uv_reflection_fragment,
		defaultnormal_vertex: defaultnormal_vertex,
		displacementmap_pars_vertex: displacementmap_pars_vertex,
		displacementmap_vertex: displacementmap_vertex,
		emissivemap_fragment: emissivemap_fragment,
		emissivemap_pars_fragment: emissivemap_pars_fragment,
		encodings_fragment: encodings_fragment,
		encodings_pars_fragment: encodings_pars_fragment,
		envmap_fragment: envmap_fragment,
		envmap_pars_fragment: envmap_pars_fragment,
		envmap_pars_vertex: envmap_pars_vertex,
		envmap_physical_pars_fragment: envmap_physical_pars_fragment,
		envmap_vertex: envmap_vertex,
		fog_vertex: fog_vertex,
		fog_pars_vertex: fog_pars_vertex,
		fog_fragment: fog_fragment,
		fog_pars_fragment: fog_pars_fragment,
		gradientmap_pars_fragment: gradientmap_pars_fragment,
		lightmap_fragment: lightmap_fragment,
		lightmap_pars_fragment: lightmap_pars_fragment,
		lights_lambert_vertex: lights_lambert_vertex,
		lights_pars_begin: lights_pars_begin,
		lights_phong_fragment: lights_phong_fragment,
		lights_phong_pars_fragment: lights_phong_pars_fragment,
		lights_physical_fragment: lights_physical_fragment,
		lights_physical_pars_fragment: lights_physical_pars_fragment,
		lights_fragment_begin: lights_fragment_begin,
		lights_fragment_maps: lights_fragment_maps,
		lights_fragment_end: lights_fragment_end,
		logdepthbuf_fragment: logdepthbuf_fragment,
		logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
		logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
		logdepthbuf_vertex: logdepthbuf_vertex,
		map_fragment: map_fragment,
		map_pars_fragment: map_pars_fragment,
		map_particle_fragment: map_particle_fragment,
		map_particle_pars_fragment: map_particle_pars_fragment,
		metalnessmap_fragment: metalnessmap_fragment,
		metalnessmap_pars_fragment: metalnessmap_pars_fragment,
		morphnormal_vertex: morphnormal_vertex,
		morphtarget_pars_vertex: morphtarget_pars_vertex,
		morphtarget_vertex: morphtarget_vertex,
		normal_fragment_begin: normal_fragment_begin,
		normal_fragment_maps: normal_fragment_maps,
		normalmap_pars_fragment: normalmap_pars_fragment,
		packing: packing,
		premultiplied_alpha_fragment: premultiplied_alpha_fragment,
		project_vertex: project_vertex,
		dithering_fragment: dithering_fragment,
		dithering_pars_fragment: dithering_pars_fragment,
		roughnessmap_fragment: roughnessmap_fragment,
		roughnessmap_pars_fragment: roughnessmap_pars_fragment,
		shadowmap_pars_fragment: shadowmap_pars_fragment,
		shadowmap_pars_vertex: shadowmap_pars_vertex,
		shadowmap_vertex: shadowmap_vertex,
		shadowmask_pars_fragment: shadowmask_pars_fragment,
		skinbase_vertex: skinbase_vertex,
		skinning_pars_vertex: skinning_pars_vertex,
		skinning_vertex: skinning_vertex,
		skinnormal_vertex: skinnormal_vertex,
		specularmap_fragment: specularmap_fragment,
		specularmap_pars_fragment: specularmap_pars_fragment,
		tonemapping_fragment: tonemapping_fragment,
		tonemapping_pars_fragment: tonemapping_pars_fragment,
		uv_pars_fragment: uv_pars_fragment,
		uv_pars_vertex: uv_pars_vertex,
		uv_vertex: uv_vertex,
		uv2_pars_fragment: uv2_pars_fragment,
		uv2_pars_vertex: uv2_pars_vertex,
		uv2_vertex: uv2_vertex,
		worldpos_vertex: worldpos_vertex,

		background_frag: background_frag,
		background_vert: background_vert,
		cube_frag: cube_frag,
		cube_vert: cube_vert,
		depth_frag: depth_frag,
		depth_vert: depth_vert,
		distanceRGBA_frag: distanceRGBA_frag,
		distanceRGBA_vert: distanceRGBA_vert,
		equirect_frag: equirect_frag,
		equirect_vert: equirect_vert,
		linedashed_frag: linedashed_frag,
		linedashed_vert: linedashed_vert,
		meshbasic_frag: meshbasic_frag,
		meshbasic_vert: meshbasic_vert,
		meshlambert_frag: meshlambert_frag,
		meshlambert_vert: meshlambert_vert,
		meshmatcap_frag: meshmatcap_frag,
		meshmatcap_vert: meshmatcap_vert,
		meshphong_frag: meshphong_frag,
		meshphong_vert: meshphong_vert,
		meshphysical_frag: meshphysical_frag,
		meshphysical_vert: meshphysical_vert,
		normal_frag: normal_frag,
		normal_vert: normal_vert,
		points_frag: points_frag,
		points_vert: points_vert,
		shadow_frag: shadow_frag,
		shadow_vert: shadow_vert,
		sprite_frag: sprite_frag,
		sprite_vert: sprite_vert
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var UniformsLib = {

		common: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },

			map: { value: null },
			uvTransform: { value: new Matrix3() },

			alphaMap: { value: null },

		},

		specularmap: {

			specularMap: { value: null },

		},

		envmap: {

			envMap: { value: null },
			flipEnvMap: { value: - 1 },
			reflectivity: { value: 1.0 },
			refractionRatio: { value: 0.98 },
			maxMipLevel: { value: 0 }

		},

		aomap: {

			aoMap: { value: null },
			aoMapIntensity: { value: 1 }

		},

		lightmap: {

			lightMap: { value: null },
			lightMapIntensity: { value: 1 }

		},

		emissivemap: {

			emissiveMap: { value: null }

		},

		bumpmap: {

			bumpMap: { value: null },
			bumpScale: { value: 1 }

		},

		normalmap: {

			normalMap: { value: null },
			normalScale: { value: new Vector2( 1, 1 ) }

		},

		displacementmap: {

			displacementMap: { value: null },
			displacementScale: { value: 1 },
			displacementBias: { value: 0 }

		},

		roughnessmap: {

			roughnessMap: { value: null }

		},

		metalnessmap: {

			metalnessMap: { value: null }

		},

		gradientmap: {

			gradientMap: { value: null }

		},

		fog: {

			fogDensity: { value: 0.00025 },
			fogNear: { value: 1 },
			fogFar: { value: 2000 },
			fogColor: { value: new Color( 0xffffff ) }

		},

		lights: {

			ambientLightColor: { value: [] },

			directionalLights: { value: [], properties: {
				direction: {},
				color: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			directionalShadowMap: { value: [] },
			directionalShadowMatrix: { value: [] },

			spotLights: { value: [], properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			spotShadowMap: { value: [] },
			spotShadowMatrix: { value: [] },

			pointLights: { value: [], properties: {
				color: {},
				position: {},
				decay: {},
				distance: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			} },

			pointShadowMap: { value: [] },
			pointShadowMatrix: { value: [] },

			hemisphereLights: { value: [], properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			} },

			// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
			rectAreaLights: { value: [], properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			} }

		},

		points: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },
			size: { value: 1.0 },
			scale: { value: 1.0 },
			map: { value: null },
			uvTransform: { value: new Matrix3() }

		},

		sprite: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },
			center: { value: new Vector2( 0.5, 0.5 ) },
			rotation: { value: 0.0 },
			map: { value: null },
			uvTransform: { value: new Matrix3() }

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ShaderLib = {

		basic: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.meshbasic_vert,
			fragmentShader: ShaderChunk.meshbasic_frag

		},

		lambert: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) }
				}
			] ),

			vertexShader: ShaderChunk.meshlambert_vert,
			fragmentShader: ShaderChunk.meshlambert_frag

		},

		phong: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.gradientmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) },
					specular: { value: new Color( 0x111111 ) },
					shininess: { value: 30 }
				}
			] ),

			vertexShader: ShaderChunk.meshphong_vert,
			fragmentShader: ShaderChunk.meshphong_frag

		},

		standard: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.roughnessmap,
				UniformsLib.metalnessmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) },
					roughness: { value: 0.5 },
					metalness: { value: 0.5 },
					envMapIntensity: { value: 1 } // temporary
				}
			] ),

			vertexShader: ShaderChunk.meshphysical_vert,
			fragmentShader: ShaderChunk.meshphysical_frag

		},

		matcap: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.fog,
				{
					matcap: { value: null }
				}
			] ),

			vertexShader: ShaderChunk.meshmatcap_vert,
			fragmentShader: ShaderChunk.meshmatcap_frag

		},

		points: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.points,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.points_vert,
			fragmentShader: ShaderChunk.points_frag

		},

		dashed: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.fog,
				{
					scale: { value: 1 },
					dashSize: { value: 1 },
					totalSize: { value: 2 }
				}
			] ),

			vertexShader: ShaderChunk.linedashed_vert,
			fragmentShader: ShaderChunk.linedashed_frag

		},

		depth: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.displacementmap
			] ),

			vertexShader: ShaderChunk.depth_vert,
			fragmentShader: ShaderChunk.depth_frag

		},

		normal: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				{
					opacity: { value: 1.0 }
				}
			] ),

			vertexShader: ShaderChunk.normal_vert,
			fragmentShader: ShaderChunk.normal_frag

		},

		sprite: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.sprite,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.sprite_vert,
			fragmentShader: ShaderChunk.sprite_frag

		},

		background: {

			uniforms: {
				t2D: { value: null },
			},

			vertexShader: ShaderChunk.background_vert,
			fragmentShader: ShaderChunk.background_frag

		},
		cube: {

			uniforms: {
				tCube: { value: null },
				tFlip: { value: - 1 },
				opacity: { value: 1.0 }
			},

			vertexShader: ShaderChunk.cube_vert,
			fragmentShader: ShaderChunk.cube_frag

		},

		equirect: {

			uniforms: {
				tEquirect: { value: null },
			},

			vertexShader: ShaderChunk.equirect_vert,
			fragmentShader: ShaderChunk.equirect_frag

		},

		distanceRGBA: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.displacementmap,
				{
					referencePosition: { value: new Vector3() },
					nearDistance: { value: 1 },
					farDistance: { value: 1000 }
				}
			] ),

			vertexShader: ShaderChunk.distanceRGBA_vert,
			fragmentShader: ShaderChunk.distanceRGBA_frag

		},

		shadow: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.lights,
				UniformsLib.fog,
				{
					color: { value: new Color( 0x00000 ) },
					opacity: { value: 1.0 }
				},
			] ),

			vertexShader: ShaderChunk.shadow_vert,
			fragmentShader: ShaderChunk.shadow_frag

		}

	};

	ShaderLib.physical = {

		uniforms: UniformsUtils.merge( [
			ShaderLib.standard.uniforms,
			{
				clearCoat: { value: 0 },
				clearCoatRoughness: { value: 0 }
			}
		] ),

		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function LineDashedMaterial( parameters ) {

		LineBasicMaterial.call( this );

		this.type = 'LineDashedMaterial';

		this.scale = 1;
		this.dashSize = 3;
		this.gapSize = 1;

		this.setValues( parameters );

	}

	LineDashedMaterial.prototype = Object.create( LineBasicMaterial.prototype );
	LineDashedMaterial.prototype.constructor = LineDashedMaterial;

	LineDashedMaterial.prototype.isLineDashedMaterial = true;

	LineDashedMaterial.prototype.copy = function ( source ) {

		LineBasicMaterial.prototype.copy.call( this, source );

		this.scale = source.scale;
		this.dashSize = source.dashSize;
		this.gapSize = source.gapSize;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshDepthMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshDepthMaterial';

		this.depthPacking = BasicDepthPacking;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false;
		this.lights = false;

		this.setValues( parameters );

	}

	MeshDepthMaterial.prototype = Object.create( Material.prototype );
	MeshDepthMaterial.prototype.constructor = MeshDepthMaterial;

	MeshDepthMaterial.prototype.isMeshDepthMaterial = true;

	MeshDepthMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.depthPacking = source.depthPacking;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshDistanceMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshDistanceMaterial';

		this.referencePosition = new Vector3();
		this.nearDistance = 1;
		this.farDistance = 1000;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.fog = false;
		this.lights = false;

		this.setValues( parameters );

	}

	MeshDistanceMaterial.prototype = Object.create( Material.prototype );
	MeshDistanceMaterial.prototype.constructor = MeshDistanceMaterial;

	MeshDistanceMaterial.prototype.isMeshDistanceMaterial = true;

	MeshDistanceMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.referencePosition.copy( source.referencePosition );
		this.nearDistance = source.nearDistance;
		this.farDistance = source.farDistance;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshLambertMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshLambertMaterial';

		this.color = new Color( 0xffffff ); // diffuse

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.emissive = new Color( 0x000000 );
		this.emissiveIntensity = 1.0;
		this.emissiveMap = null;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.setValues( parameters );

	}

	MeshLambertMaterial.prototype = Object.create( Material.prototype );
	MeshLambertMaterial.prototype.constructor = MeshLambertMaterial;

	MeshLambertMaterial.prototype.isMeshLambertMaterial = true;

	MeshLambertMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.emissive.copy( source.emissive );
		this.emissiveMap = source.emissiveMap;
		this.emissiveIntensity = source.emissiveIntensity;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshNormalMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshNormalMaterial';

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2( 1, 1 );

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false;
		this.lights = false;

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.setValues( parameters );

	}

	MeshNormalMaterial.prototype = Object.create( Material.prototype );
	MeshNormalMaterial.prototype.constructor = MeshNormalMaterial;

	MeshNormalMaterial.prototype.isMeshNormalMaterial = true;

	MeshNormalMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy( source.normalScale );

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshPhongMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshPhongMaterial';

		this.color = new Color( 0xffffff ); // diffuse
		this.specular = new Color( 0x111111 );
		this.shininess = 30;

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.emissive = new Color( 0x000000 );
		this.emissiveIntensity = 1.0;
		this.emissiveMap = null;

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2( 1, 1 );

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.setValues( parameters );

	}

	MeshPhongMaterial.prototype = Object.create( Material.prototype );
	MeshPhongMaterial.prototype.constructor = MeshPhongMaterial;

	MeshPhongMaterial.prototype.isMeshPhongMaterial = true;

	MeshPhongMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );
		this.specular.copy( source.specular );
		this.shininess = source.shininess;

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.emissive.copy( source.emissive );
		this.emissiveMap = source.emissiveMap;
		this.emissiveIntensity = source.emissiveIntensity;

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy( source.normalScale );

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshPhysicalMaterial( parameters ) {

		MeshStandardMaterial.call( this );

		this.defines = { 'PHYSICAL': '' };

		this.type = 'MeshPhysicalMaterial';

		this.reflectivity = 0.5; // maps to F0 = 0.04

		this.clearCoat = 0.0;
		this.clearCoatRoughness = 0.0;

		this.setValues( parameters );

	}

	MeshPhysicalMaterial.prototype = Object.create( MeshStandardMaterial.prototype );
	MeshPhysicalMaterial.prototype.constructor = MeshPhysicalMaterial;

	MeshPhysicalMaterial.prototype.isMeshPhysicalMaterial = true;

	MeshPhysicalMaterial.prototype.copy = function ( source ) {

		MeshStandardMaterial.prototype.copy.call( this, source );

		this.defines = { 'PHYSICAL': '' };

		this.reflectivity = source.reflectivity;

		this.clearCoat = source.clearCoat;
		this.clearCoatRoughness = source.clearCoatRoughness;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshToonMaterial( parameters ) {

		MeshPhongMaterial.call( this );

		this.defines = { 'TOON': '' };

		this.type = 'MeshToonMaterial';

		this.gradientMap = null;

		this.setValues( parameters );

	}

	MeshToonMaterial.prototype = Object.create( MeshPhongMaterial.prototype );
	MeshToonMaterial.prototype.constructor = MeshToonMaterial;

	MeshToonMaterial.prototype.isMeshToonMaterial = true;

	MeshToonMaterial.prototype.copy = function ( source ) {

		MeshPhongMaterial.prototype.copy.call( this, source );

		this.gradientMap = source.gradientMap;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function RawShaderMaterial( parameters ) {

		ShaderMaterial.call( this, parameters );

		this.type = 'RawShaderMaterial';

	}

	RawShaderMaterial.prototype = Object.create( ShaderMaterial.prototype );
	RawShaderMaterial.prototype.constructor = RawShaderMaterial;

	RawShaderMaterial.prototype.isRawShaderMaterial = true;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function ShadowMaterial( parameters ) {

		Material.call( this );

		this.type = 'ShadowMaterial';

		this.color = new Color( 0x000000 );
		this.transparent = true;

		this.setValues( parameters );

	}

	ShadowMaterial.prototype = Object.create( Material.prototype );
	ShadowMaterial.prototype.constructor = ShadowMaterial;

	ShadowMaterial.prototype.isShadowMaterial = true;

	ShadowMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function SpriteMaterial( parameters ) {

		Material.call( this );

		this.type = 'SpriteMaterial';

		this.color = new Color( 0xffffff );
		this.map = null;

		this.rotation = 0;

		this.sizeAttenuation = true;

		this.lights = false;
		this.transparent = true;

		this.setValues( parameters );

	}

	SpriteMaterial.prototype = Object.create( Material.prototype );
	SpriteMaterial.prototype.constructor = SpriteMaterial;
	SpriteMaterial.prototype.isSpriteMaterial = true;

	SpriteMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );
		this.map = source.map;

		this.rotation = source.rotation;

		this.sizeAttenuation = source.sizeAttenuation;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MaterialLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
		this.textures = {};

	}

	Object.assign( MaterialLoader.prototype, {

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var loader = new FileLoader( scope.manager );
			loader.load( url, function ( text ) {

				onLoad( scope.parse( JSON.parse( text ) ) );

			}, onProgress, onError );

		},

		setTextures: function ( value ) {

			this.textures = value;

		},

		parse: function ( json ) {

			var textures = this.textures;

			function getTexture( name ) {

				if ( textures[ name ] === undefined ) {

					console.warn( 'MaterialLoader: Undefined texture', name );

				}

				return textures[ name ];

			}

			var Materials = {
	            LineBasicMaterial: LineBasicMaterial,
	            LineDashedMaterial: LineDashedMaterial,
	            MeshBasicMaterial: MeshBasicMaterial,
	            MeshDepthMaterial: MeshDepthMaterial,
	            MeshDistanceMaterial: MeshDistanceMaterial,
	            MeshLambertMaterial: MeshLambertMaterial,
	            MeshNormalMaterial: MeshNormalMaterial,
	            MeshPhongMaterial: MeshPhongMaterial,
	            MeshPhysicalMaterial: MeshPhysicalMaterial,
	            MeshStandardMaterial: MeshStandardMaterial,
	            MeshToonMaterial: MeshToonMaterial,
	            PointsMaterial: PointsMaterial,
	            RawShaderMaterial: RawShaderMaterial,
	            ShaderMaterial: ShaderMaterial,
	            ShadowMaterial: ShadowMaterial,
	            SpriteMaterial: SpriteMaterial
			};
			var material = new Materials[ json.type ]();

			if ( json.uuid !== undefined ) material.uuid = json.uuid;
			if ( json.name !== undefined ) material.name = json.name;
			if ( json.color !== undefined ) material.color.setHex( json.color );
			if ( json.roughness !== undefined ) material.roughness = json.roughness;
			if ( json.metalness !== undefined ) material.metalness = json.metalness;
			if ( json.emissive !== undefined ) material.emissive.setHex( json.emissive );
			if ( json.specular !== undefined ) material.specular.setHex( json.specular );
			if ( json.shininess !== undefined ) material.shininess = json.shininess;
			if ( json.clearCoat !== undefined ) material.clearCoat = json.clearCoat;
			if ( json.clearCoatRoughness !== undefined ) material.clearCoatRoughness = json.clearCoatRoughness;
			if ( json.vertexColors !== undefined ) material.vertexColors = json.vertexColors;
			if ( json.fog !== undefined ) material.fog = json.fog;
			if ( json.flatShading !== undefined ) material.flatShading = json.flatShading;
			if ( json.blending !== undefined ) material.blending = json.blending;
			if ( json.combine !== undefined ) material.combine = json.combine;
			if ( json.side !== undefined ) material.side = json.side;
			if ( json.opacity !== undefined ) material.opacity = json.opacity;
			if ( json.transparent !== undefined ) material.transparent = json.transparent;
			if ( json.alphaTest !== undefined ) material.alphaTest = json.alphaTest;
			if ( json.depthTest !== undefined ) material.depthTest = json.depthTest;
			if ( json.depthWrite !== undefined ) material.depthWrite = json.depthWrite;
			if ( json.colorWrite !== undefined ) material.colorWrite = json.colorWrite;
			if ( json.wireframe !== undefined ) material.wireframe = json.wireframe;
			if ( json.wireframeLinewidth !== undefined ) material.wireframeLinewidth = json.wireframeLinewidth;
			if ( json.wireframeLinecap !== undefined ) material.wireframeLinecap = json.wireframeLinecap;
			if ( json.wireframeLinejoin !== undefined ) material.wireframeLinejoin = json.wireframeLinejoin;

			if ( json.rotation !== undefined ) material.rotation = json.rotation;

			if ( json.linewidth !== 1 ) material.linewidth = json.linewidth;
			if ( json.dashSize !== undefined ) material.dashSize = json.dashSize;
			if ( json.gapSize !== undefined ) material.gapSize = json.gapSize;
			if ( json.scale !== undefined ) material.scale = json.scale;

			if ( json.polygonOffset !== undefined ) material.polygonOffset = json.polygonOffset;
			if ( json.polygonOffsetFactor !== undefined ) material.polygonOffsetFactor = json.polygonOffsetFactor;
			if ( json.polygonOffsetUnits !== undefined ) material.polygonOffsetUnits = json.polygonOffsetUnits;

			if ( json.skinning !== undefined ) material.skinning = json.skinning;
			if ( json.morphTargets !== undefined ) material.morphTargets = json.morphTargets;
			if ( json.dithering !== undefined ) material.dithering = json.dithering;

			if ( json.visible !== undefined ) material.visible = json.visible;
			if ( json.userData !== undefined ) material.userData = json.userData;

			// Shader Material

			if ( json.uniforms !== undefined ) {

				for ( var name in json.uniforms ) {

					var uniform = json.uniforms[ name ];

					material.uniforms[ name ] = {};

					switch ( uniform.type ) {

						case 't':
							material.uniforms[ name ].value = getTexture( uniform.value );
							break;

						case 'c':
							material.uniforms[ name ].value = new Color().setHex( uniform.value );
							break;

						case 'v2':
							material.uniforms[ name ].value = new Vector2().fromArray( uniform.value );
							break;

						case 'v3':
							material.uniforms[ name ].value = new Vector3().fromArray( uniform.value );
							break;

						case 'v4':
							material.uniforms[ name ].value = new Vector4().fromArray( uniform.value );
							break;

						case 'm4':
							material.uniforms[ name ].value = new Matrix4().fromArray( uniform.value );
							break;

						default:
							material.uniforms[ name ].value = uniform.value;

					}

				}

			}

			if ( json.defines !== undefined ) material.defines = json.defines;
			if ( json.vertexShader !== undefined ) material.vertexShader = json.vertexShader;
			if ( json.fragmentShader !== undefined ) material.fragmentShader = json.fragmentShader;

			// Deprecated

			if ( json.shading !== undefined ) material.flatShading = json.shading === 1; // FlatShading

			// for PointsMaterial

			if ( json.size !== undefined ) material.size = json.size;
			if ( json.sizeAttenuation !== undefined ) material.sizeAttenuation = json.sizeAttenuation;

			// maps

			if ( json.map !== undefined ) material.map = getTexture( json.map );

			if ( json.alphaMap !== undefined ) {

				material.alphaMap = getTexture( json.alphaMap );
				material.transparent = true;

			}

			if ( json.bumpMap !== undefined ) material.bumpMap = getTexture( json.bumpMap );
			if ( json.bumpScale !== undefined ) material.bumpScale = json.bumpScale;

			if ( json.normalMap !== undefined ) material.normalMap = getTexture( json.normalMap );
			if ( json.normalMapType !== undefined ) material.normalMapType = json.normalMapType;
			if ( json.normalScale !== undefined ) {

				var normalScale = json.normalScale;

				if ( Array.isArray( normalScale ) === false ) {

					// Blender exporter used to export a scalar. See #7459

					normalScale = [ normalScale, normalScale ];

				}

				material.normalScale = new Vector2().fromArray( normalScale );

			}

			if ( json.displacementMap !== undefined ) material.displacementMap = getTexture( json.displacementMap );
			if ( json.displacementScale !== undefined ) material.displacementScale = json.displacementScale;
			if ( json.displacementBias !== undefined ) material.displacementBias = json.displacementBias;

			if ( json.roughnessMap !== undefined ) material.roughnessMap = getTexture( json.roughnessMap );
			if ( json.metalnessMap !== undefined ) material.metalnessMap = getTexture( json.metalnessMap );

			if ( json.emissiveMap !== undefined ) material.emissiveMap = getTexture( json.emissiveMap );
			if ( json.emissiveIntensity !== undefined ) material.emissiveIntensity = json.emissiveIntensity;

			if ( json.specularMap !== undefined ) material.specularMap = getTexture( json.specularMap );

			if ( json.envMap !== undefined ) material.envMap = getTexture( json.envMap );
			if ( json.envMapIntensity !== undefined ) material.envMapIntensity = json.envMapIntensity;

			if ( json.reflectivity !== undefined ) material.reflectivity = json.reflectivity;

			if ( json.lightMap !== undefined ) material.lightMap = getTexture( json.lightMap );
			if ( json.lightMapIntensity !== undefined ) material.lightMapIntensity = json.lightMapIntensity;

			if ( json.aoMap !== undefined ) material.aoMap = getTexture( json.aoMap );
			if ( json.aoMapIntensity !== undefined ) material.aoMapIntensity = json.aoMapIntensity;

			if ( json.gradientMap !== undefined ) material.gradientMap = getTexture( json.gradientMap );

			return material;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Loader() {}

	Loader.Handlers = {

		handlers: [],

		add: function ( regex, loader ) {

			this.handlers.push( regex, loader );

		},

		get: function ( file ) {

			var handlers = this.handlers;

			for ( var i = 0, l = handlers.length; i < l; i += 2 ) {

				var regex = handlers[ i ];
				var loader = handlers[ i + 1 ];

				if ( regex.test( file ) ) {

					return loader;

				}

			}

			return null;

		}

	};

	Object.assign( Loader.prototype, {

		crossOrigin: 'anonymous',

		onLoadStart: function () {},

		onLoadProgress: function () {},

		onLoadComplete: function () {},

		initMaterials: function ( materials, texturePath, crossOrigin ) {

			var array = [];

			for ( var i = 0; i < materials.length; ++ i ) {

				array[ i ] = this.createMaterial( materials[ i ], texturePath, crossOrigin );

			}

			return array;

		},

		createMaterial: ( function () {

			var BlendingMode = {
				NoBlending: NoBlending,
				NormalBlending: NormalBlending,
				AdditiveBlending: AdditiveBlending,
				SubtractiveBlending: SubtractiveBlending,
				MultiplyBlending: MultiplyBlending,
				CustomBlending: CustomBlending
			};

			var color = new Color();
			var textureLoader = new TextureLoader();
			var materialLoader = new MaterialLoader();

			return function createMaterial( m, texturePath, crossOrigin ) {

				// convert from old material format

				var textures = {};

				function loadTexture( path, repeat, offset, wrap, anisotropy ) {

					var fullPath = texturePath + path;
					var loader = Loader.Handlers.get( fullPath );

					var texture;

					if ( loader !== null ) {

						texture = loader.load( fullPath );

					} else {

						textureLoader.setCrossOrigin( crossOrigin );
						texture = textureLoader.load( fullPath );

					}

					if ( repeat !== undefined ) {

						texture.repeat.fromArray( repeat );

						if ( repeat[ 0 ] !== 1 ) texture.wrapS = RepeatWrapping;
						if ( repeat[ 1 ] !== 1 ) texture.wrapT = RepeatWrapping;

					}

					if ( offset !== undefined ) {

						texture.offset.fromArray( offset );

					}

					if ( wrap !== undefined ) {

						if ( wrap[ 0 ] === 'repeat' ) texture.wrapS = RepeatWrapping;
						if ( wrap[ 0 ] === 'mirror' ) texture.wrapS = MirroredRepeatWrapping;

						if ( wrap[ 1 ] === 'repeat' ) texture.wrapT = RepeatWrapping;
						if ( wrap[ 1 ] === 'mirror' ) texture.wrapT = MirroredRepeatWrapping;

					}

					if ( anisotropy !== undefined ) {

						texture.anisotropy = anisotropy;

					}

					var uuid = _Math.generateUUID();

					textures[ uuid ] = texture;

					return uuid;

				}

				//

				var json = {
					uuid: _Math.generateUUID(),
					type: 'MeshLambertMaterial'
				};

				for ( var name in m ) {

					var value = m[ name ];

					switch ( name ) {

						case 'DbgColor':
						case 'DbgIndex':
						case 'opticalDensity':
						case 'illumination':
							break;
						case 'DbgName':
							json.name = value;
							break;
						case 'blending':
							json.blending = BlendingMode[ value ];
							break;
						case 'colorAmbient':
						case 'mapAmbient':
							console.warn( 'Loader.createMaterial:', name, 'is no longer supported.' );
							break;
						case 'colorDiffuse':
							json.color = color.fromArray( value ).getHex();
							break;
						case 'colorSpecular':
							json.specular = color.fromArray( value ).getHex();
							break;
						case 'colorEmissive':
							json.emissive = color.fromArray( value ).getHex();
							break;
						case 'specularCoef':
							json.shininess = value;
							break;
						case 'shading':
							if ( value.toLowerCase() === 'basic' ) json.type = 'MeshBasicMaterial';
							if ( value.toLowerCase() === 'phong' ) json.type = 'MeshPhongMaterial';
							if ( value.toLowerCase() === 'standard' ) json.type = 'MeshStandardMaterial';
							break;
						case 'mapDiffuse':
							json.map = loadTexture( value, m.mapDiffuseRepeat, m.mapDiffuseOffset, m.mapDiffuseWrap, m.mapDiffuseAnisotropy );
							break;
						case 'mapDiffuseRepeat':
						case 'mapDiffuseOffset':
						case 'mapDiffuseWrap':
						case 'mapDiffuseAnisotropy':
							break;
						case 'mapEmissive':
							json.emissiveMap = loadTexture( value, m.mapEmissiveRepeat, m.mapEmissiveOffset, m.mapEmissiveWrap, m.mapEmissiveAnisotropy );
							break;
						case 'mapEmissiveRepeat':
						case 'mapEmissiveOffset':
						case 'mapEmissiveWrap':
						case 'mapEmissiveAnisotropy':
							break;
						case 'mapLight':
							json.lightMap = loadTexture( value, m.mapLightRepeat, m.mapLightOffset, m.mapLightWrap, m.mapLightAnisotropy );
							break;
						case 'mapLightRepeat':
						case 'mapLightOffset':
						case 'mapLightWrap':
						case 'mapLightAnisotropy':
							break;
						case 'mapAO':
							json.aoMap = loadTexture( value, m.mapAORepeat, m.mapAOOffset, m.mapAOWrap, m.mapAOAnisotropy );
							break;
						case 'mapAORepeat':
						case 'mapAOOffset':
						case 'mapAOWrap':
						case 'mapAOAnisotropy':
							break;
						case 'mapBump':
							json.bumpMap = loadTexture( value, m.mapBumpRepeat, m.mapBumpOffset, m.mapBumpWrap, m.mapBumpAnisotropy );
							break;
						case 'mapBumpScale':
							json.bumpScale = value;
							break;
						case 'mapBumpRepeat':
						case 'mapBumpOffset':
						case 'mapBumpWrap':
						case 'mapBumpAnisotropy':
							break;
						case 'mapNormal':
							json.normalMap = loadTexture( value, m.mapNormalRepeat, m.mapNormalOffset, m.mapNormalWrap, m.mapNormalAnisotropy );
							break;
						case 'mapNormalFactor':
							json.normalScale = value;
							break;
						case 'mapNormalRepeat':
						case 'mapNormalOffset':
						case 'mapNormalWrap':
						case 'mapNormalAnisotropy':
							break;
						case 'mapSpecular':
							json.specularMap = loadTexture( value, m.mapSpecularRepeat, m.mapSpecularOffset, m.mapSpecularWrap, m.mapSpecularAnisotropy );
							break;
						case 'mapSpecularRepeat':
						case 'mapSpecularOffset':
						case 'mapSpecularWrap':
						case 'mapSpecularAnisotropy':
							break;
						case 'mapMetalness':
							json.metalnessMap = loadTexture( value, m.mapMetalnessRepeat, m.mapMetalnessOffset, m.mapMetalnessWrap, m.mapMetalnessAnisotropy );
							break;
						case 'mapMetalnessRepeat':
						case 'mapMetalnessOffset':
						case 'mapMetalnessWrap':
						case 'mapMetalnessAnisotropy':
							break;
						case 'mapRoughness':
							json.roughnessMap = loadTexture( value, m.mapRoughnessRepeat, m.mapRoughnessOffset, m.mapRoughnessWrap, m.mapRoughnessAnisotropy );
							break;
						case 'mapRoughnessRepeat':
						case 'mapRoughnessOffset':
						case 'mapRoughnessWrap':
						case 'mapRoughnessAnisotropy':
							break;
						case 'mapAlpha':
							json.alphaMap = loadTexture( value, m.mapAlphaRepeat, m.mapAlphaOffset, m.mapAlphaWrap, m.mapAlphaAnisotropy );
							break;
						case 'mapAlphaRepeat':
						case 'mapAlphaOffset':
						case 'mapAlphaWrap':
						case 'mapAlphaAnisotropy':
							break;
						case 'flipSided':
							json.side = BackSide;
							break;
						case 'doubleSided':
							json.side = DoubleSide;
							break;
						case 'transparency':
							console.warn( 'Loader.createMaterial: transparency has been renamed to opacity' );
							json.opacity = value;
							break;
						case 'depthTest':
						case 'depthWrite':
						case 'colorWrite':
						case 'opacity':
						case 'reflectivity':
						case 'transparent':
						case 'visible':
						case 'wireframe':
							json[ name ] = value;
							break;
						case 'vertexColors':
							if ( value === true ) json.vertexColors = VertexColors;
							if ( value === 'face' ) json.vertexColors = FaceColors;
							break;
						default:
							console.error( 'Loader.createMaterial: Unsupported', name, value );
							break;

					}

				}

				if ( json.type === 'MeshBasicMaterial' ) delete json.emissive;
				if ( json.type !== 'MeshPhongMaterial' ) delete json.specular;

				if ( json.opacity < 1 ) json.transparent = true;

				materialLoader.setTextures( textures );

				return materialLoader.parse( json );

			};

		} )()

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var LoaderUtils = {

		decodeText: function ( array ) {

			if ( typeof TextDecoder !== 'undefined' ) {

				return new TextDecoder().decode( array );

			}

			// Avoid the String.fromCharCode.apply(null, array) shortcut, which
			// throws a "maximum call stack size exceeded" error for large arrays.

			var s = '';

			for ( var i = 0, il = array.length; i < il; i ++ ) {

				// Implicitly assumes little-endian.
				s += String.fromCharCode( array[ i ] );

			}

			// Merges multi-byte utf-8 characters.
			return decodeURIComponent( escape( s ) );

		},

		extractUrlBase: function ( url ) {

			var index = url.lastIndexOf( '/' );

			if ( index === - 1 ) return './';

			return url.substr( 0, index + 1 );

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Characters [].:/ are reserved for track binding syntax.
	var RESERVED_CHARS_RE = '\\[\\]\\.:\\/';

	function Composite( targetGroup, path, optionalParsedPath ) {

		var parsedPath = optionalParsedPath || PropertyBinding.parseTrackName( path );

		this._targetGroup = targetGroup;
		this._bindings = targetGroup.subscribe_( path, parsedPath );

	}

	Object.assign( Composite.prototype, {

		getValue: function ( array, offset ) {

			this.bind(); // bind all binding

			var firstValidIndex = this._targetGroup.nCachedObjects_,
				binding = this._bindings[ firstValidIndex ];

			// and only call .getValue on the first
			if ( binding !== undefined ) binding.getValue( array, offset );

		},

		setValue: function ( array, offset ) {

			var bindings = this._bindings;

			for ( var i = this._targetGroup.nCachedObjects_,
					  n = bindings.length; i !== n; ++ i ) {

				bindings[ i ].setValue( array, offset );

			}

		},

		bind: function () {

			var bindings = this._bindings;

			for ( var i = this._targetGroup.nCachedObjects_,
					  n = bindings.length; i !== n; ++ i ) {

				bindings[ i ].bind();

			}

		},

		unbind: function () {

			var bindings = this._bindings;

			for ( var i = this._targetGroup.nCachedObjects_,
					  n = bindings.length; i !== n; ++ i ) {

				bindings[ i ].unbind();

			}

		}

	} );
	function PropertyBinding( rootNode, path, parsedPath ) {

		this.path = path;
		this.parsedPath = parsedPath || PropertyBinding.parseTrackName( path );

		this.node = PropertyBinding.findNode( rootNode, this.parsedPath.nodeName ) || rootNode;

		this.rootNode = rootNode;

	}

	Object.assign( PropertyBinding, {

		Composite: Composite,

		create: function ( root, path, parsedPath ) {

			if ( ! ( root && root.isAnimationObjectGroup ) ) {

				return new PropertyBinding( root, path, parsedPath );

			} else {

				return new PropertyBinding.Composite( root, path, parsedPath );

			}

		},
		sanitizeNodeName: ( function () {

			var reservedRe = new RegExp( '[' + RESERVED_CHARS_RE + ']', 'g' );

			return function sanitizeNodeName( name ) {

				return name.replace( /\s/g, '_' ).replace( reservedRe, '' );

			};

		}() ),

		parseTrackName: function () {

			// Attempts to allow node names from any language. ES5's `\w` regexp matches
			// only latin characters, and the unicode \p{L} is not yet supported. So
			// instead, we exclude reserved characters and match everything else.
			var wordChar = '[^' + RESERVED_CHARS_RE + ']';
			var wordCharOrDot = '[^' + RESERVED_CHARS_RE.replace( '\\.', '' ) + ']';

			// Parent directories, delimited by '/' or ':'. Currently unused, but must
			// be matched to parse the rest of the track name.
			var directoryRe = /((?:WC+[\/:])*)/.source.replace( 'WC', wordChar );

			// Target node. May contain word characters (a-zA-Z0-9_) and '.' or '-'.
			var nodeRe = /(WCOD+)?/.source.replace( 'WCOD', wordCharOrDot );

			// Object on target node, and accessor. May not contain reserved
			// characters. Accessor may contain any character except closing bracket.
			var objectRe = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace( 'WC', wordChar );

			// Property and accessor. May not contain reserved characters. Accessor may
			// contain any non-bracket characters.
			var propertyRe = /\.(WC+)(?:\[(.+)\])?/.source.replace( 'WC', wordChar );

			var trackRe = new RegExp( ''
				+ '^'
				+ directoryRe
				+ nodeRe
				+ objectRe
				+ propertyRe
				+ '$'
			);

			var supportedObjectNames = [ 'material', 'materials', 'bones' ];

			return function parseTrackName( trackName ) {

				var matches = trackRe.exec( trackName );

				if ( ! matches ) {

					throw new Error( 'PropertyBinding: Cannot parse trackName: ' + trackName );

				}

				var results = {
					// directoryName: matches[ 1 ], // (tschw) currently unused
					nodeName: matches[ 2 ],
					objectName: matches[ 3 ],
					objectIndex: matches[ 4 ],
					propertyName: matches[ 5 ], // required
					propertyIndex: matches[ 6 ]
				};

				var lastDot = results.nodeName && results.nodeName.lastIndexOf( '.' );

				if ( lastDot !== undefined && lastDot !== - 1 ) {

					var objectName = results.nodeName.substring( lastDot + 1 );

					// Object names must be checked against a whitelist. Otherwise, there
					// is no way to parse 'foo.bar.baz': 'baz' must be a property, but
					// 'bar' could be the objectName, or part of a nodeName (which can
					// include '.' characters).
					if ( supportedObjectNames.indexOf( objectName ) !== - 1 ) {

						results.nodeName = results.nodeName.substring( 0, lastDot );
						results.objectName = objectName;

					}

				}

				if ( results.propertyName === null || results.propertyName.length === 0 ) {

					throw new Error( 'PropertyBinding: can not parse propertyName from trackName: ' + trackName );

				}

				return results;

			};

		}(),

		findNode: function ( root, nodeName ) {

			if ( ! nodeName || nodeName === "" || nodeName === "root" || nodeName === "." || nodeName === - 1 || nodeName === root.name || nodeName === root.uuid ) {

				return root;

			}

			// search into skeleton bones.
			if ( root.skeleton ) {

				var bone = root.skeleton.getBoneByName( nodeName );

				if ( bone !== undefined ) {

					return bone;

				}

			}

			// search into node subtree.
			if ( root.children ) {

				var searchNodeSubtree = function ( children ) {

					for ( var i = 0; i < children.length; i ++ ) {

						var childNode = children[ i ];

						if ( childNode.name === nodeName || childNode.uuid === nodeName ) {

							return childNode;

						}

						var result = searchNodeSubtree( childNode.children );

						if ( result ) return result;

					}

					return null;

				};

				var subTreeNode = searchNodeSubtree( root.children );

				if ( subTreeNode ) {

					return subTreeNode;

				}

			}

			return null;

		}

	} );

	Object.assign( PropertyBinding.prototype, { // prototype, continued

		// these are used to "bind" a nonexistent property
		_getValue_unavailable: function () {},
		_setValue_unavailable: function () {},

		BindingType: {
			Direct: 0,
			EntireArray: 1,
			ArrayElement: 2,
			HasFromToArray: 3
		},

		Versioning: {
			None: 0,
			NeedsUpdate: 1,
			MatrixWorldNeedsUpdate: 2
		},

		GetterByBindingType: [

			function getValue_direct( buffer, offset ) {

				buffer[ offset ] = this.node[ this.propertyName ];

			},

			function getValue_array( buffer, offset ) {

				var source = this.resolvedProperty;

				for ( var i = 0, n = source.length; i !== n; ++ i ) {

					buffer[ offset ++ ] = source[ i ];

				}

			},

			function getValue_arrayElement( buffer, offset ) {

				buffer[ offset ] = this.resolvedProperty[ this.propertyIndex ];

			},

			function getValue_toArray( buffer, offset ) {

				this.resolvedProperty.toArray( buffer, offset );

			}

		],

		SetterByBindingTypeAndVersioning: [

			[
				// Direct

				function setValue_direct( buffer, offset ) {

					this.targetObject[ this.propertyName ] = buffer[ offset ];

				},

				function setValue_direct_setNeedsUpdate( buffer, offset ) {

					this.targetObject[ this.propertyName ] = buffer[ offset ];
					this.targetObject.needsUpdate = true;

				},

				function setValue_direct_setMatrixWorldNeedsUpdate( buffer, offset ) {

					this.targetObject[ this.propertyName ] = buffer[ offset ];
					this.targetObject.matrixWorldNeedsUpdate = true;

				}

			], [

				// EntireArray

				function setValue_array( buffer, offset ) {

					var dest = this.resolvedProperty;

					for ( var i = 0, n = dest.length; i !== n; ++ i ) {

						dest[ i ] = buffer[ offset ++ ];

					}

				},

				function setValue_array_setNeedsUpdate( buffer, offset ) {

					var dest = this.resolvedProperty;

					for ( var i = 0, n = dest.length; i !== n; ++ i ) {

						dest[ i ] = buffer[ offset ++ ];

					}

					this.targetObject.needsUpdate = true;

				},

				function setValue_array_setMatrixWorldNeedsUpdate( buffer, offset ) {

					var dest = this.resolvedProperty;

					for ( var i = 0, n = dest.length; i !== n; ++ i ) {

						dest[ i ] = buffer[ offset ++ ];

					}

					this.targetObject.matrixWorldNeedsUpdate = true;

				}

			], [

				// ArrayElement

				function setValue_arrayElement( buffer, offset ) {

					this.resolvedProperty[ this.propertyIndex ] = buffer[ offset ];

				},

				function setValue_arrayElement_setNeedsUpdate( buffer, offset ) {

					this.resolvedProperty[ this.propertyIndex ] = buffer[ offset ];
					this.targetObject.needsUpdate = true;

				},

				function setValue_arrayElement_setMatrixWorldNeedsUpdate( buffer, offset ) {

					this.resolvedProperty[ this.propertyIndex ] = buffer[ offset ];
					this.targetObject.matrixWorldNeedsUpdate = true;

				}

			], [

				// HasToFromArray

				function setValue_fromArray( buffer, offset ) {

					this.resolvedProperty.fromArray( buffer, offset );

				},

				function setValue_fromArray_setNeedsUpdate( buffer, offset ) {

					this.resolvedProperty.fromArray( buffer, offset );
					this.targetObject.needsUpdate = true;

				},

				function setValue_fromArray_setMatrixWorldNeedsUpdate( buffer, offset ) {

					this.resolvedProperty.fromArray( buffer, offset );
					this.targetObject.matrixWorldNeedsUpdate = true;

				}

			]

		],

		getValue: function getValue_unbound( targetArray, offset ) {

			this.bind();
			this.getValue( targetArray, offset );

			// Note: This class uses a State pattern on a per-method basis:
			// 'bind' sets 'this.getValue' / 'setValue' and shadows the
			// prototype version of these methods with one that represents
			// the bound state. When the property is not found, the methods
			// become no-ops.

		},

		setValue: function getValue_unbound( sourceArray, offset ) {

			this.bind();
			this.setValue( sourceArray, offset );

		},

		// create getter / setter pair for a property in the scene graph
		bind: function () {

			var targetObject = this.node,
				parsedPath = this.parsedPath,

				objectName = parsedPath.objectName,
				propertyName = parsedPath.propertyName,
				propertyIndex = parsedPath.propertyIndex;

			if ( ! targetObject ) {

				targetObject = PropertyBinding.findNode( this.rootNode, parsedPath.nodeName ) || this.rootNode;

				this.node = targetObject;

			}

			// set fail state so we can just 'return' on error
			this.getValue = this._getValue_unavailable;
			this.setValue = this._setValue_unavailable;

			// ensure there is a value node
			if ( ! targetObject ) {

				console.error( 'PropertyBinding: Trying to update node for track: ' + this.path + ' but it wasn\'t found.' );
				return;

			}

			if ( objectName ) {

				var objectIndex = parsedPath.objectIndex;

				// special cases were we need to reach deeper into the hierarchy to get the face materials....
				switch ( objectName ) {

					case 'materials':

						if ( ! targetObject.material ) {

							console.error( 'PropertyBinding: Can not bind to material as node does not have a material.', this );
							return;

						}

						if ( ! targetObject.material.materials ) {

							console.error( 'PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.', this );
							return;

						}

						targetObject = targetObject.material.materials;

						break;

					case 'bones':

						if ( ! targetObject.skeleton ) {

							console.error( 'PropertyBinding: Can not bind to bones as node does not have a skeleton.', this );
							return;

						}

						// potential future optimization: skip this if propertyIndex is already an integer
						// and convert the integer string to a true integer.

						targetObject = targetObject.skeleton.bones;

						// support resolving morphTarget names into indices.
						for ( var i = 0; i < targetObject.length; i ++ ) {

							if ( targetObject[ i ].name === objectIndex ) {

								objectIndex = i;
								break;

							}

						}

						break;

					default:

						if ( targetObject[ objectName ] === undefined ) {

							console.error( 'PropertyBinding: Can not bind to objectName of node undefined.', this );
							return;

						}

						targetObject = targetObject[ objectName ];

				}
				if ( objectIndex !== undefined ) {

					if ( targetObject[ objectIndex ] === undefined ) {

						console.error( 'PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.', this, targetObject );
						return;

					}

					targetObject = targetObject[ objectIndex ];

				}

			}

			// resolve property
			var nodeProperty = targetObject[ propertyName ];

			if ( nodeProperty === undefined ) {

				var nodeName = parsedPath.nodeName;

				console.error( 'PropertyBinding: Trying to update property for track: ' + nodeName +
					'.' + propertyName + ' but it wasn\'t found.', targetObject );
				return;

			}

			// determine versioning scheme
			var versioning = this.Versioning.None;

			this.targetObject = targetObject;

			if ( targetObject.needsUpdate !== undefined ) { // material

				versioning = this.Versioning.NeedsUpdate;

			} else if ( targetObject.matrixWorldNeedsUpdate !== undefined ) { // node transform

				versioning = this.Versioning.MatrixWorldNeedsUpdate;

			}

			// determine how the property gets bound
			var bindingType = this.BindingType.Direct;

			if ( propertyIndex !== undefined ) {

				// access a sub element of the property array (only primitives are supported right now)

				if ( propertyName === "morphTargetInfluences" ) {

					// potential optimization, skip this if propertyIndex is already an integer, and convert the integer string to a true integer.

					// support resolving morphTarget names into indices.
					if ( ! targetObject.geometry ) {

						console.error( 'PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.', this );
						return;

					}

					if ( targetObject.geometry.isBufferGeometry ) {

						if ( ! targetObject.geometry.morphAttributes ) {

							console.error( 'PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.', this );
							return;

						}

						for ( var i = 0; i < this.node.geometry.morphAttributes.position.length; i ++ ) {

							if ( targetObject.geometry.morphAttributes.position[ i ].name === propertyIndex ) {

								propertyIndex = i;
								break;

							}

						}
					} else {

						if ( ! targetObject.geometry.morphTargets ) {

							console.error( 'PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.', this );
							return;

						}

						for ( var i = 0; i < this.node.geometry.morphTargets.length; i ++ ) {

							if ( targetObject.geometry.morphTargets[ i ].name === propertyIndex ) {

								propertyIndex = i;
								break;

							}

						}

					}

				}

				bindingType = this.BindingType.ArrayElement;

				this.resolvedProperty = nodeProperty;
				this.propertyIndex = propertyIndex;

			} else if ( nodeProperty.fromArray !== undefined && nodeProperty.toArray !== undefined ) {

				// must use copy for Object3D.Euler/Quaternion

				bindingType = this.BindingType.HasFromToArray;

				this.resolvedProperty = nodeProperty;

			} else if ( Array.isArray( nodeProperty ) ) {

				bindingType = this.BindingType.EntireArray;

				this.resolvedProperty = nodeProperty;

			} else {

				this.propertyName = propertyName;

			}

			// select getter / setter
			this.getValue = this.GetterByBindingType[ bindingType ];
			this.setValue = this.SetterByBindingTypeAndVersioning[ bindingType ][ versioning ];

		},

		unbind: function () {

			this.node = null;

			// back to the prototype version of getValue / setValue
			// note: avoiding to mutate the shape of 'this' via 'delete'
			this.getValue = this._getValue_unbound;
			this.setValue = this._setValue_unbound;

		}

	} );

	//!\ DECLARE ALIAS AFTER assign prototype !
	Object.assign( PropertyBinding.prototype, {

		// initial state of these methods that calls 'bind'
		_getValue_unbound: PropertyBinding.prototype.getValue,
		_setValue_unbound: PropertyBinding.prototype.setValue,

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var BufferGeometryUtils = {

		computeTangents: function ( geometry ) {

			var index = geometry.index;
			var attributes = geometry.attributes;

			// based on http://www.terathon.com/code/tangent.html
			// (per vertex tangents)

			if ( index === null ||
				 attributes.position === undefined ||
				 attributes.normal === undefined ||
				 attributes.uv === undefined ) {

				console.warn( 'BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()' );
				return;

			}

			var indices = index.array;
			var positions = attributes.position.array;
			var normals = attributes.normal.array;
			var uvs = attributes.uv.array;

			var nVertices = positions.length / 3;

			if ( attributes.tangent === undefined ) {

				geometry.addAttribute( 'tangent', new BufferAttribute( new Float32Array( 4 * nVertices ), 4 ) );

			}

			var tangents = attributes.tangent.array;

			var tan1 = [], tan2 = [];

			for ( var i = 0; i < nVertices; i ++ ) {

				tan1[ i ] = new Vector3();
				tan2[ i ] = new Vector3();

			}

			var vA = new Vector3(),
				vB = new Vector3(),
				vC = new Vector3(),

				uvA = new Vector2(),
				uvB = new Vector2(),
				uvC = new Vector2(),

				sdir = new Vector3(),
				tdir = new Vector3();

			function handleTriangle( a, b, c ) {

				vA.fromArray( positions, a * 3 );
				vB.fromArray( positions, b * 3 );
				vC.fromArray( positions, c * 3 );

				uvA.fromArray( uvs, a * 2 );
				uvB.fromArray( uvs, b * 2 );
				uvC.fromArray( uvs, c * 2 );

				var x1 = vB.x - vA.x;
				var x2 = vC.x - vA.x;

				var y1 = vB.y - vA.y;
				var y2 = vC.y - vA.y;

				var z1 = vB.z - vA.z;
				var z2 = vC.z - vA.z;

				var s1 = uvB.x - uvA.x;
				var s2 = uvC.x - uvA.x;

				var t1 = uvB.y - uvA.y;
				var t2 = uvC.y - uvA.y;

				var r = 1.0 / ( s1 * t2 - s2 * t1 );

				sdir.set(
					( t2 * x1 - t1 * x2 ) * r,
					( t2 * y1 - t1 * y2 ) * r,
					( t2 * z1 - t1 * z2 ) * r
				);

				tdir.set(
					( s1 * x2 - s2 * x1 ) * r,
					( s1 * y2 - s2 * y1 ) * r,
					( s1 * z2 - s2 * z1 ) * r
				);

				tan1[ a ].add( sdir );
				tan1[ b ].add( sdir );
				tan1[ c ].add( sdir );

				tan2[ a ].add( tdir );
				tan2[ b ].add( tdir );
				tan2[ c ].add( tdir );

			}

			var groups = geometry.groups;

			if ( groups.length === 0 ) {

				groups = [ {
					start: 0,
					count: indices.length
				} ];

			}

			for ( var i = 0, il = groups.length; i < il; ++ i ) {

				var group = groups[ i ];

				var start = group.start;
				var count = group.count;

				for ( var j = start, jl = start + count; j < jl; j += 3 ) {

					handleTriangle(
						indices[ j + 0 ],
						indices[ j + 1 ],
						indices[ j + 2 ]
					);

				}

			}

			var tmp = new Vector3(), tmp2 = new Vector3();
			var n = new Vector3(), n2 = new Vector3();
			var w, t, test;

			function handleVertex( v ) {

				n.fromArray( normals, v * 3 );
				n2.copy( n );

				t = tan1[ v ];

				// Gram-Schmidt orthogonalize

				tmp.copy( t );
				tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

				// Calculate handedness

				tmp2.crossVectors( n2, t );
				test = tmp2.dot( tan2[ v ] );
				w = ( test < 0.0 ) ? - 1.0 : 1.0;

				tangents[ v * 4 ] = tmp.x;
				tangents[ v * 4 + 1 ] = tmp.y;
				tangents[ v * 4 + 2 ] = tmp.z;
				tangents[ v * 4 + 3 ] = w;

			}

			for ( var i = 0, il = groups.length; i < il; ++ i ) {

				var group = groups[ i ];

				var start = group.start;
				var count = group.count;

				for ( var j = start, jl = start + count; j < jl; j += 3 ) {

					handleVertex( indices[ j + 0 ] );
					handleVertex( indices[ j + 1 ] );
					handleVertex( indices[ j + 2 ] );

				}

			}

		},
		mergeBufferGeometries: function ( geometries, useGroups ) {

			var isIndexed = geometries[ 0 ].index !== null;

			var attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
			var morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

			var attributes = {};
			var morphAttributes = {};

			var mergedGeometry = new BufferGeometry();

			var offset = 0;

			for ( var i = 0; i < geometries.length; ++ i ) {

				var geometry = geometries[ i ];

				// ensure that all geometries are indexed, or none

				if ( isIndexed !== ( geometry.index !== null ) ) return null;

				// gather attributes, exit early if they're different

				for ( var name in geometry.attributes ) {

					if ( ! attributesUsed.has( name ) ) return null;

					if ( attributes[ name ] === undefined ) attributes[ name ] = [];

					attributes[ name ].push( geometry.attributes[ name ] );

				}

				// gather morph attributes, exit early if they're different

				for ( var name in geometry.morphAttributes ) {

					if ( ! morphAttributesUsed.has( name ) ) return null;

					if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

					morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

				}

				// gather .userData

				mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
				mergedGeometry.userData.mergedUserData.push( geometry.userData );

				if ( useGroups ) {

					var count;

					if ( isIndexed ) {

						count = geometry.index.count;

					} else if ( geometry.attributes.position !== undefined ) {

						count = geometry.attributes.position.count;

					} else {

						return null;

					}

					mergedGeometry.addGroup( offset, count, i );

					offset += count;

				}

			}

			// merge indices

			if ( isIndexed ) {

				var indexOffset = 0;
				var mergedIndex = [];

				for ( var i = 0; i < geometries.length; ++ i ) {

					var index = geometries[ i ].index;

					for ( var j = 0; j < index.count; ++ j ) {

						mergedIndex.push( index.getX( j ) + indexOffset );

					}

					indexOffset += geometries[ i ].attributes.position.count;

				}

				mergedGeometry.setIndex( mergedIndex );

			}

			// merge attributes

			for ( var name in attributes ) {

				var mergedAttribute = this.mergeBufferAttributes( attributes[ name ] );

				if ( ! mergedAttribute ) return null;

				mergedGeometry.addAttribute( name, mergedAttribute );

			}

			// merge morph attributes

			for ( var name in morphAttributes ) {

				var numMorphTargets = morphAttributes[ name ][ 0 ].length;

				if ( numMorphTargets === 0 ) break;

				mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
				mergedGeometry.morphAttributes[ name ] = [];

				for ( var i = 0; i < numMorphTargets; ++ i ) {

					var morphAttributesToMerge = [];

					for ( var j = 0; j < morphAttributes[ name ].length; ++ j ) {

						morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

					}

					var mergedMorphAttribute = this.mergeBufferAttributes( morphAttributesToMerge );

					if ( ! mergedMorphAttribute ) return null;

					mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

				}

			}

			return mergedGeometry;

		},
		mergeBufferAttributes: function ( attributes ) {

			var TypedArray;
			var itemSize;
			var normalized;
			var arrayLength = 0;

			for ( var i = 0; i < attributes.length; ++ i ) {

				var attribute = attributes[ i ];

				if ( attribute.isInterleavedBufferAttribute ) return null;

				if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
				if ( TypedArray !== attribute.array.constructor ) return null;

				if ( itemSize === undefined ) itemSize = attribute.itemSize;
				if ( itemSize !== attribute.itemSize ) return null;

				if ( normalized === undefined ) normalized = attribute.normalized;
				if ( normalized !== attribute.normalized ) return null;

				arrayLength += attribute.array.length;

			}

			var array = new TypedArray( arrayLength );
			var offset = 0;

			for ( var i = 0; i < attributes.length; ++ i ) {

				array.set( attributes[ i ].array, offset );

				offset += attributes[ i ].array.length;

			}

			return new BufferAttribute( array, itemSize, normalized );

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var GLTFLoader = ( function () {

		function GLTFLoader( manager ) {

			this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
			this.dracoLoader = null;

		}

		GLTFLoader.prototype = {

			constructor: GLTFLoader,

			crossOrigin: 'anonymous',

			load: function ( url, onLoad, onProgress, onError ) {

				var scope = this;

				var resourcePath;

				if ( this.resourcePath !== undefined ) {

					resourcePath = this.resourcePath;

				} else if ( this.path !== undefined ) {

					resourcePath = this.path;

				} else {

					resourcePath = LoaderUtils.extractUrlBase( url );

				}

				// Tells the LoadingManager to track an extra item, which resolves after
				// the model is fully loaded. This means the count of items loaded will
				// be incorrect, but ensures manager.onLoad() does not fire early.
				scope.manager.itemStart( url );

				var _onError = function ( e ) {

					if ( onError ) {

						onError( e );

					} else {

						console.error( e );

					}

					scope.manager.itemEnd( url );
					scope.manager.itemError( url );

				};

				var loader = new FileLoader( scope.manager );

				loader.setPath( this.path );
				loader.setResponseType( 'arraybuffer' );

				loader.load( url, function ( data ) {

					try {

						scope.parse( data, resourcePath, function ( gltf ) {

							onLoad( gltf );

							scope.manager.itemEnd( url );

						}, _onError );

					} catch ( e ) {

						_onError( e );

					}

				}, onProgress, _onError );

			},

			setCrossOrigin: function ( value ) {

				this.crossOrigin = value;
				return this;

			},

			setPath: function ( value ) {

				this.path = value;
				return this;

			},

			setResourcePath: function ( value ) {

				this.resourcePath = value;
				return this;

			},

			setDRACOLoader: function ( dracoLoader ) {

				this.dracoLoader = dracoLoader;
				return this;

			},

			parse: function ( data, path, onLoad, onError ) {

				var content;
				var extensions = {};

				if ( typeof data === 'string' ) {

					content = data;

				} else {

					var magic = LoaderUtils.decodeText( new Uint8Array( data, 0, 4 ) );

					if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

						try {

							extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );

						} catch ( error ) {

							if ( onError ) onError( error );
							return;

						}

						content = extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content;

					} else {

						content = LoaderUtils.decodeText( new Uint8Array( data ) );

					}

				}

				var json = JSON.parse( content );

				if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

					if ( onError ) onError( new Error( 'GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead.' ) );
					return;

				}

				if ( json.extensionsUsed ) {

					for ( var i = 0; i < json.extensionsUsed.length; ++ i ) {

						var extensionName = json.extensionsUsed[ i ];
						var extensionsRequired = json.extensionsRequired || [];

						switch ( extensionName ) {

							case EXTENSIONS.KHR_LIGHTS_PUNCTUAL:
								extensions[ extensionName ] = new GLTFLightsExtension( json );
								break;

							case EXTENSIONS.KHR_MATERIALS_UNLIT:
								extensions[ extensionName ] = new GLTFMaterialsUnlitExtension( json );
								break;

							case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
								extensions[ extensionName ] = new GLTFMaterialsPbrSpecularGlossinessExtension();
								break;

							case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
								extensions[ extensionName ] = new GLTFDracoMeshCompressionExtension( json, this.dracoLoader );
								break;

							case EXTENSIONS.MSFT_TEXTURE_DDS:
								extensions[ EXTENSIONS.MSFT_TEXTURE_DDS ] = new GLTFTextureDDSExtension();
								break;

							default:

								if ( extensionsRequired.indexOf( extensionName ) >= 0 ) {

									console.warn( 'GLTFLoader: Unknown extension "' + extensionName + '".' );

								}

						}

					}

				}

				var parser = new GLTFParser( json, extensions, {

					path: path || this.resourcePath || '',
					crossOrigin: this.crossOrigin,
					manager: this.manager

				} );

				parser.parse( function ( scene, scenes, cameras, animations, json ) {

					var glTF = {
						scene: scene,
						scenes: scenes,
						cameras: cameras,
						animations: animations,
						asset: json.asset,
						parser: parser,
						userData: {}
					};

					addUnknownExtensionsToUserData( extensions, glTF, json );

					onLoad( glTF );

				}, onError );

			}

		};
		function GLTFRegistry() {

			var objects = {};

			return	{

				get: function ( key ) {

					return objects[ key ];

				},

				add: function ( key, object ) {

					objects[ key ] = object;

				},

				remove: function ( key ) {

					delete objects[ key ];

				},

				removeAll: function () {

					objects = {};

				}

			};

		}
		var EXTENSIONS = {
			KHR_BINARY_GLTF: 'KHR_binary_glTF',
			KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
			KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
			KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness',
			KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
			MSFT_TEXTURE_DDS: 'MSFT_texture_dds'
		};
		function GLTFTextureDDSExtension() {

			if ( ! DDSLoader ) {

				throw new Error( 'GLTFLoader: Attempting to load .dds texture without importing DDSLoader' );

			}

			this.name = EXTENSIONS.MSFT_TEXTURE_DDS;
			this.ddsLoader = new DDSLoader();

		}
		function GLTFLightsExtension( json ) {

			this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;

			this.lights = [];

			var extension = ( json.extensions && json.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ] ) || {};
			var lightDefs = extension.lights || [];

			for ( var i = 0; i < lightDefs.length; i ++ ) {

				var lightDef = lightDefs[ i ];
				var lightNode;

				var color = new Color( 0xffffff );
				if ( lightDef.color !== undefined ) color.fromArray( lightDef.color );

				var range = lightDef.range !== undefined ? lightDef.range : 0;

				switch ( lightDef.type ) {

					case 'directional':
						lightNode = new DirectionalLight( color );
						lightNode.target.position.set( 0, 0, -1 );
						lightNode.add( lightNode.target );
						break;

					case 'point':
						lightNode = new PointLight( color );
						lightNode.distance = range;
						break;

					case 'spot':
						lightNode = new SpotLight( color );
						lightNode.distance = range;
						// Handle spotlight properties.
						lightDef.spot = lightDef.spot || {};
						lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== undefined ? lightDef.spot.innerConeAngle : 0;
						lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== undefined ? lightDef.spot.outerConeAngle : Math.PI / 4.0;
						lightNode.angle = lightDef.spot.outerConeAngle;
						lightNode.penumbra = 1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
						lightNode.target.position.set( 0, 0, -1 );
						lightNode.add( lightNode.target );
						break;

					default:
						throw new Error( 'GLTFLoader: Unexpected light type, "' + lightDef.type + '".' );

				}

				lightNode.decay = 2;

				if ( lightDef.intensity !== undefined ) lightNode.intensity = lightDef.intensity;

				lightNode.name = lightDef.name || ( 'light_' + i );

				this.lights.push( lightNode );

			}

		}
		function GLTFMaterialsUnlitExtension( json ) {

			this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;

		}

		GLTFMaterialsUnlitExtension.prototype.getMaterialType = function ( material ) {

			return MeshBasicMaterial;

		};

		GLTFMaterialsUnlitExtension.prototype.extendParams = function ( materialParams, material, parser ) {

			var pending = [];

			materialParams.color = new Color( 1.0, 1.0, 1.0 );
			materialParams.opacity = 1.0;

			var metallicRoughness = material.pbrMetallicRoughness;

			if ( metallicRoughness ) {

				if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

					var array = metallicRoughness.baseColorFactor;

					materialParams.color.fromArray( array );
					materialParams.opacity = array[ 3 ];

				}

				if ( metallicRoughness.baseColorTexture !== undefined ) {

					pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture.index ) );

				}

			}

			return Promise.all( pending );

		};
		var BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
		var BINARY_EXTENSION_HEADER_LENGTH = 12;
		var BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

		function GLTFBinaryExtension( data ) {

			this.name = EXTENSIONS.KHR_BINARY_GLTF;
			this.content = null;
			this.body = null;

			var headerView = new DataView( data, 0, BINARY_EXTENSION_HEADER_LENGTH );

			this.header = {
				magic: LoaderUtils.decodeText( new Uint8Array( data.slice( 0, 4 ) ) ),
				version: headerView.getUint32( 4, true ),
				length: headerView.getUint32( 8, true )
			};

			if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

				throw new Error( 'GLTFLoader: Unsupported glTF-Binary header.' );

			} else if ( this.header.version < 2.0 ) {

				throw new Error( 'GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.' );

			}

			var chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
			var chunkIndex = 0;

			while ( chunkIndex < chunkView.byteLength ) {

				var chunkLength = chunkView.getUint32( chunkIndex, true );
				chunkIndex += 4;

				var chunkType = chunkView.getUint32( chunkIndex, true );
				chunkIndex += 4;

				if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

					var contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
					this.content = LoaderUtils.decodeText( contentArray );

				} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

					var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
					this.body = data.slice( byteOffset, byteOffset + chunkLength );

				}

				// Clients must ignore chunks with unknown types.

				chunkIndex += chunkLength;

			}

			if ( this.content === null ) {

				throw new Error( 'GLTFLoader: JSON content not found.' );

			}

		}
		function GLTFDracoMeshCompressionExtension( json, dracoLoader ) {

			if ( ! dracoLoader ) {

				throw new Error( 'GLTFLoader: No DRACOLoader instance provided.' );

			}

			this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
			this.json = json;
			this.dracoLoader = dracoLoader;

		}

		GLTFDracoMeshCompressionExtension.prototype.decodePrimitive = function ( primitive, parser ) {

			var json = this.json;
			var dracoLoader = this.dracoLoader;
			var bufferViewIndex = primitive.extensions[ this.name ].bufferView;
			var gltfAttributeMap = primitive.extensions[ this.name ].attributes;
			var threeAttributeMap = {};
			var attributeNormalizedMap = {};
			var attributeTypeMap = {};

			for ( var attributeName in gltfAttributeMap ) {

				if ( ! ( attributeName in ATTRIBUTES ) ) continue;

				threeAttributeMap[ ATTRIBUTES[ attributeName ] ] = gltfAttributeMap[ attributeName ];

			}

			for ( attributeName in primitive.attributes ) {

				if ( ATTRIBUTES[ attributeName ] !== undefined && gltfAttributeMap[ attributeName ] !== undefined ) {

					var accessorDef = json.accessors[ primitive.attributes[ attributeName ] ];
					var componentType = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

					attributeTypeMap[ ATTRIBUTES[ attributeName ] ] = componentType;
					attributeNormalizedMap[ ATTRIBUTES[ attributeName ] ] = accessorDef.normalized === true;

				}

			}

			return parser.getDependency( 'bufferView', bufferViewIndex ).then( function ( bufferView ) {

				return new Promise( function ( resolve ) {

					dracoLoader.decodeDracoFile( bufferView, function ( geometry ) {

						for ( var attributeName in geometry.attributes ) {

							var attribute = geometry.attributes[ attributeName ];
							var normalized = attributeNormalizedMap[ attributeName ];

							if ( normalized !== undefined ) attribute.normalized = normalized;

						}

						resolve( geometry );

					}, threeAttributeMap, attributeTypeMap );

				} );

			} );

		};
		function GLTFMaterialsPbrSpecularGlossinessExtension() {

			return {

				name: EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,

				specularGlossinessParams: [
					'color',
					'map',
					'lightMap',
					'lightMapIntensity',
					'aoMap',
					'aoMapIntensity',
					'emissive',
					'emissiveIntensity',
					'emissiveMap',
					'bumpMap',
					'bumpScale',
					'normalMap',
					'displacementMap',
					'displacementScale',
					'displacementBias',
					'specularMap',
					'specular',
					'glossinessMap',
					'glossiness',
					'alphaMap',
					'envMap',
					'envMapIntensity',
					'refractionRatio',
				],

				getMaterialType: function () {

					return ShaderMaterial;

				},

				extendParams: function ( params, material, parser ) {

					var pbrSpecularGlossiness = material.extensions[ this.name ];

					var shader = ShaderLib[ 'standard' ];

					var uniforms = UniformsUtils.clone( shader.uniforms );

					var specularMapParsFragmentChunk = [
						'#ifdef USE_SPECULARMAP',
						'	uniform sampler2D specularMap;',
						'#endif'
					].join( '\n' );

					var glossinessMapParsFragmentChunk = [
						'#ifdef USE_GLOSSINESSMAP',
						'	uniform sampler2D glossinessMap;',
						'#endif'
					].join( '\n' );

					var specularMapFragmentChunk = [
						'vec3 specularFactor = specular;',
						'#ifdef USE_SPECULARMAP',
						'	vec4 texelSpecular = texture2D( specularMap, vUv );',
						'	texelSpecular = sRGBToLinear( texelSpecular );',
						'	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture',
						'	specularFactor *= texelSpecular.rgb;',
						'#endif'
					].join( '\n' );

					var glossinessMapFragmentChunk = [
						'float glossinessFactor = glossiness;',
						'#ifdef USE_GLOSSINESSMAP',
						'	vec4 texelGlossiness = texture2D( glossinessMap, vUv );',
						'	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture',
						'	glossinessFactor *= texelGlossiness.a;',
						'#endif'
					].join( '\n' );

					var lightPhysicalFragmentChunk = [
						'PhysicalMaterial material;',
						'material.diffuseColor = diffuseColor.rgb;',
						'material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );',
						'material.specularColor = specularFactor.rgb;',
					].join( '\n' );

					var fragmentShader = shader.fragmentShader
						.replace( 'uniform float roughness;', 'uniform vec3 specular;' )
						.replace( 'uniform float metalness;', 'uniform float glossiness;' )
						.replace( '#include <roughnessmap_pars_fragment>', specularMapParsFragmentChunk )
						.replace( '#include <metalnessmap_pars_fragment>', glossinessMapParsFragmentChunk )
						.replace( '#include <roughnessmap_fragment>', specularMapFragmentChunk )
						.replace( '#include <metalnessmap_fragment>', glossinessMapFragmentChunk )
						.replace( '#include <lights_physical_fragment>', lightPhysicalFragmentChunk );

					delete uniforms.roughness;
					delete uniforms.metalness;
					delete uniforms.roughnessMap;
					delete uniforms.metalnessMap;

					uniforms.specular = { value: new Color().setHex( 0x111111 ) };
					uniforms.glossiness = { value: 0.5 };
					uniforms.specularMap = { value: null };
					uniforms.glossinessMap = { value: null };

					params.vertexShader = shader.vertexShader;
					params.fragmentShader = fragmentShader;
					params.uniforms = uniforms;
					params.defines = { 'STANDARD': '' };

					params.color = new Color( 1.0, 1.0, 1.0 );
					params.opacity = 1.0;

					var pending = [];

					if ( Array.isArray( pbrSpecularGlossiness.diffuseFactor ) ) {

						var array = pbrSpecularGlossiness.diffuseFactor;

						params.color.fromArray( array );
						params.opacity = array[ 3 ];

					}

					if ( pbrSpecularGlossiness.diffuseTexture !== undefined ) {

						pending.push( parser.assignTexture( params, 'map', pbrSpecularGlossiness.diffuseTexture.index ) );

					}

					params.emissive = new Color( 0.0, 0.0, 0.0 );
					params.glossiness = pbrSpecularGlossiness.glossinessFactor !== undefined ? pbrSpecularGlossiness.glossinessFactor : 1.0;
					params.specular = new Color( 1.0, 1.0, 1.0 );

					if ( Array.isArray( pbrSpecularGlossiness.specularFactor ) ) {

						params.specular.fromArray( pbrSpecularGlossiness.specularFactor );

					}

					if ( pbrSpecularGlossiness.specularGlossinessTexture !== undefined ) {

						var specGlossIndex = pbrSpecularGlossiness.specularGlossinessTexture.index;
						pending.push( parser.assignTexture( params, 'glossinessMap', specGlossIndex ) );
						pending.push( parser.assignTexture( params, 'specularMap', specGlossIndex ) );

					}

					return Promise.all( pending );

				},

				createMaterial: function ( params ) {

					// setup material properties based on MeshStandardMaterial for Specular-Glossiness

					var material = new ShaderMaterial( {
						defines: params.defines,
						vertexShader: params.vertexShader,
						fragmentShader: params.fragmentShader,
						uniforms: params.uniforms,
						fog: true,
						lights: true,
						opacity: params.opacity,
						transparent: params.transparent
					} );

					material.isGLTFSpecularGlossinessMaterial = true;

					material.color = params.color;

					material.map = params.map === undefined ? null : params.map;

					material.lightMap = null;
					material.lightMapIntensity = 1.0;

					material.aoMap = params.aoMap === undefined ? null : params.aoMap;
					material.aoMapIntensity = 1.0;

					material.emissive = params.emissive;
					material.emissiveIntensity = 1.0;
					material.emissiveMap = params.emissiveMap === undefined ? null : params.emissiveMap;

					material.bumpMap = params.bumpMap === undefined ? null : params.bumpMap;
					material.bumpScale = 1;

					material.normalMap = params.normalMap === undefined ? null : params.normalMap;
					if ( params.normalScale ) material.normalScale = params.normalScale;

					material.displacementMap = null;
					material.displacementScale = 1;
					material.displacementBias = 0;

					material.specularMap = params.specularMap === undefined ? null : params.specularMap;
					material.specular = params.specular;

					material.glossinessMap = params.glossinessMap === undefined ? null : params.glossinessMap;
					material.glossiness = params.glossiness;

					material.alphaMap = null;

					material.envMap = params.envMap === undefined ? null : params.envMap;
					material.envMapIntensity = 1.0;

					material.refractionRatio = 0.98;

					material.extensions.derivatives = true;

					return material;

				},
				cloneMaterial: function ( source ) {

					var target = source.clone();

					target.isGLTFSpecularGlossinessMaterial = true;

					var params = this.specularGlossinessParams;

					for ( var i = 0, il = params.length; i < il; i ++ ) {

						target[ params[ i ] ] = source[ params[ i ] ];

					}

					return target;

				},

				// Here's based on refreshUniformsCommon() and refreshUniformsStandard() in WebGLRenderer.
				refreshUniforms: function ( renderer, scene, camera, geometry, material, group ) {

					if ( material.isGLTFSpecularGlossinessMaterial !== true ) {

						return;

					}

					var uniforms = material.uniforms;
					var defines = material.defines;

					uniforms.opacity.value = material.opacity;

					uniforms.diffuse.value.copy( material.color );
					uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

					uniforms.map.value = material.map;
					uniforms.specularMap.value = material.specularMap;
					uniforms.alphaMap.value = material.alphaMap;

					uniforms.lightMap.value = material.lightMap;
					uniforms.lightMapIntensity.value = material.lightMapIntensity;

					uniforms.aoMap.value = material.aoMap;
					uniforms.aoMapIntensity.value = material.aoMapIntensity;

					// uv repeat and offset setting priorities
					// 1. color map
					// 2. specular map
					// 3. normal map
					// 4. bump map
					// 5. alpha map
					// 6. emissive map

					var uvScaleMap;

					if ( material.map ) {

						uvScaleMap = material.map;

					} else if ( material.specularMap ) {

						uvScaleMap = material.specularMap;

					} else if ( material.displacementMap ) {

						uvScaleMap = material.displacementMap;

					} else if ( material.normalMap ) {

						uvScaleMap = material.normalMap;

					} else if ( material.bumpMap ) {

						uvScaleMap = material.bumpMap;

					} else if ( material.glossinessMap ) {

						uvScaleMap = material.glossinessMap;

					} else if ( material.alphaMap ) {

						uvScaleMap = material.alphaMap;

					} else if ( material.emissiveMap ) {

						uvScaleMap = material.emissiveMap;

					}

					if ( uvScaleMap !== undefined ) {

						// backwards compatibility
						if ( uvScaleMap.isWebGLRenderTarget ) {

							uvScaleMap = uvScaleMap.texture;

						}

						if ( uvScaleMap.matrixAutoUpdate === true ) {

							uvScaleMap.updateMatrix();

						}

						uniforms.uvTransform.value.copy( uvScaleMap.matrix );

					}

					uniforms.envMap.value = material.envMap;
					uniforms.envMapIntensity.value = material.envMapIntensity;
					uniforms.flipEnvMap.value = ( material.envMap && material.envMap.isCubeTexture ) ? - 1 : 1;

					uniforms.refractionRatio.value = material.refractionRatio;

					uniforms.specular.value.copy( material.specular );
					uniforms.glossiness.value = material.glossiness;

					uniforms.glossinessMap.value = material.glossinessMap;

					uniforms.emissiveMap.value = material.emissiveMap;
					uniforms.bumpMap.value = material.bumpMap;
					uniforms.normalMap.value = material.normalMap;

					uniforms.displacementMap.value = material.displacementMap;
					uniforms.displacementScale.value = material.displacementScale;
					uniforms.displacementBias.value = material.displacementBias;

					if ( uniforms.glossinessMap.value !== null && defines.USE_GLOSSINESSMAP === undefined ) {

						defines.USE_GLOSSINESSMAP = '';
						// set USE_ROUGHNESSMAP to enable vUv
						defines.USE_ROUGHNESSMAP = '';

					}

					if ( uniforms.glossinessMap.value === null && defines.USE_GLOSSINESSMAP !== undefined ) {

						delete defines.USE_GLOSSINESSMAP;
						delete defines.USE_ROUGHNESSMAP;

					}

				}

			};

		}
		// Spline Interpolation
		// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
		function GLTFCubicSplineInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

			Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

		}

		GLTFCubicSplineInterpolant.prototype = Object.create( Interpolant.prototype );
		GLTFCubicSplineInterpolant.prototype.constructor = GLTFCubicSplineInterpolant;

		GLTFCubicSplineInterpolant.prototype.copySampleValue_ = function ( index ) {

			// Copies a sample value to the result buffer. See description of glTF
			// CUBICSPLINE values layout in interpolate_() function below.

			var result = this.resultBuffer,
				values = this.sampleValues,
				valueSize = this.valueSize,
				offset = index * valueSize * 3 + valueSize;

			for ( var i = 0; i !== valueSize; i ++ ) {

				result[ i ] = values[ offset + i ];

			}

			return result;

		};

		GLTFCubicSplineInterpolant.prototype.beforeStart_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;

		GLTFCubicSplineInterpolant.prototype.afterEnd_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;

		GLTFCubicSplineInterpolant.prototype.interpolate_ = function ( i1, t0, t, t1 ) {

			var result = this.resultBuffer;
			var values = this.sampleValues;
			var stride = this.valueSize;

			var stride2 = stride * 2;
			var stride3 = stride * 3;

			var td = t1 - t0;

			var p = ( t - t0 ) / td;
			var pp = p * p;
			var ppp = pp * p;

			var offset1 = i1 * stride3;
			var offset0 = offset1 - stride3;

			var s0 = 2 * ppp - 3 * pp + 1;
			var s1 = ppp - 2 * pp + p;
			var s2 = - 2 * ppp + 3 * pp;
			var s3 = ppp - pp;

			// Layout of keyframe output values for CUBICSPLINE animations:
			//   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
			for ( var i = 0; i !== stride; i ++ ) {

				var p0 = values[ offset0 + i + stride ]; // splineVertex_k
				var m0 = values[ offset0 + i + stride2 ] * td; // outTangent_k * (t_k+1 - t_k)
				var p1 = values[ offset1 + i + stride ]; // splineVertex_k+1
				var m1 = values[ offset1 + i ] * td; // inTangent_k+1 * (t_k+1 - t_k)

				result[ i ] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;

			}

			return result;

		};
		var WEBGL_CONSTANTS = {
			FLOAT: 5126,
			//FLOAT_MAT2: 35674,
			FLOAT_MAT3: 35675,
			FLOAT_MAT4: 35676,
			FLOAT_VEC2: 35664,
			FLOAT_VEC3: 35665,
			FLOAT_VEC4: 35666,
			LINEAR: 9729,
			REPEAT: 10497,
			SAMPLER_2D: 35678,
			POINTS: 0,
			LINES: 1,
			LINE_LOOP: 2,
			LINE_STRIP: 3,
			TRIANGLES: 4,
			TRIANGLE_STRIP: 5,
			TRIANGLE_FAN: 6,
			UNSIGNED_BYTE: 5121,
			UNSIGNED_SHORT: 5123
		};

		var WEBGL_COMPONENT_TYPES = {
			5120: Int8Array,
			5121: Uint8Array,
			5122: Int16Array,
			5123: Uint16Array,
			5125: Uint32Array,
			5126: Float32Array
		};

		var WEBGL_FILTERS = {
			9728: NearestFilter,
			9729: LinearFilter,
			9984: NearestMipMapNearestFilter,
			9985: LinearMipMapNearestFilter,
			9986: NearestMipMapLinearFilter,
			9987: LinearMipMapLinearFilter
		};

		var WEBGL_WRAPPINGS = {
			33071: ClampToEdgeWrapping,
			33648: MirroredRepeatWrapping,
			10497: RepeatWrapping
		};

		var WEBGL_TYPE_SIZES = {
			'SCALAR': 1,
			'VEC2': 2,
			'VEC3': 3,
			'VEC4': 4,
			'MAT2': 4,
			'MAT3': 9,
			'MAT4': 16
		};

		var ATTRIBUTES = {
			POSITION: 'position',
			NORMAL: 'normal',
			TEXCOORD_0: 'uv',
			TEXCOORD0: 'uv', // deprecated
			TEXCOORD: 'uv', // deprecated
			TEXCOORD_1: 'uv2',
			COLOR_0: 'color',
			COLOR0: 'color', // deprecated
			COLOR: 'color', // deprecated
			WEIGHTS_0: 'skinWeight',
			WEIGHT: 'skinWeight', // deprecated
			JOINTS_0: 'skinIndex',
			JOINT: 'skinIndex' // deprecated
		};

		var PATH_PROPERTIES = {
			scale: 'scale',
			translation: 'position',
			rotation: 'quaternion',
			weights: 'morphTargetInfluences'
		};

		var INTERPOLATION = {
			CUBICSPLINE: InterpolateSmooth, // We use custom interpolation GLTFCubicSplineInterpolation for CUBICSPLINE.
			                                      // KeyframeTrack.optimize() can't handle glTF Cubic Spline output values layout,
			                                      // using InterpolateSmooth for KeyframeTrack instantiation to prevent optimization.
			                                      // See KeyframeTrack.optimize() for the detail.
			LINEAR: InterpolateLinear,
			STEP: InterpolateDiscrete
		};

		var ALPHA_MODES = {
			OPAQUE: 'OPAQUE',
			MASK: 'MASK',
			BLEND: 'BLEND'
		};

		var MIME_TYPE_FORMATS = {
			'image/png': RGBAFormat,
			'image/jpeg': RGBFormat
		};
		function resolveURL( url, path ) {

			// Invalid URL
			if ( typeof url !== 'string' || url === '' ) return '';

			// Absolute URL http://,https://,//
			if ( /^(https?:)?\/\//i.test( url ) ) return url;

			// Data URI
			if ( /^data:.*,.*$/i.test( url ) ) return url;

			// Blob URL
			if ( /^blob:.*$/i.test( url ) ) return url;

			// Relative URL
			return path + url;

		}
		function createDefaultMaterial() {

			return new MeshStandardMaterial( {
				color: 0xFFFFFF,
				emissive: 0x000000,
				metalness: 1,
				roughness: 1,
				transparent: false,
				depthTest: true,
				side: FrontSide
			} );

		}

		function addUnknownExtensionsToUserData( knownExtensions, object, objectDef ) {

			// Add unknown glTF extensions to an object's userData.

			for ( var name in objectDef.extensions ) {

				if ( knownExtensions[ name ] === undefined ) {

					object.userData.gltfExtensions = object.userData.gltfExtensions || {};
					object.userData.gltfExtensions[ name ] = objectDef.extensions[ name ];

				}

			}

		}
		function assignExtrasToUserData( object, gltfDef ) {

			if ( gltfDef.extras !== undefined ) {

				if ( typeof gltfDef.extras === 'object' ) {

					object.userData = gltfDef.extras;

				} else {

					console.warn( 'GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras );

				}

			}

		}
		function addMorphTargets( geometry, targets, accessors ) {

			var hasMorphPosition = false;
			var hasMorphNormal = false;

			for ( var i = 0, il = targets.length; i < il; i ++ ) {

				var target = targets[ i ];

				if ( target.POSITION !== undefined ) hasMorphPosition = true;
				if ( target.NORMAL !== undefined ) hasMorphNormal = true;

				if ( hasMorphPosition && hasMorphNormal ) break;

			}

			if ( ! hasMorphPosition && ! hasMorphNormal ) return;

			var morphPositions = [];
			var morphNormals = [];

			for ( var i = 0, il = targets.length; i < il; i ++ ) {

				var target = targets[ i ];
				var attributeName = 'morphTarget' + i;

				if ( hasMorphPosition ) {

					// Three.js morph position is absolute value. The formula is
					//   basePosition
					//     + weight0 * ( morphPosition0 - basePosition )
					//     + weight1 * ( morphPosition1 - basePosition )
					//     ...
					// while the glTF one is relative
					//   basePosition
					//     + weight0 * glTFmorphPosition0
					//     + weight1 * glTFmorphPosition1
					//     ...
					// then we need to convert from relative to absolute here.

					if ( target.POSITION !== undefined ) {

						// Cloning not to pollute original accessor
						var positionAttribute = cloneBufferAttribute( accessors[ target.POSITION ] );
						positionAttribute.name = attributeName;

						var position = geometry.attributes.position;

						for ( var j = 0, jl = positionAttribute.count; j < jl; j ++ ) {

							positionAttribute.setXYZ(
								j,
								positionAttribute.getX( j ) + position.getX( j ),
								positionAttribute.getY( j ) + position.getY( j ),
								positionAttribute.getZ( j ) + position.getZ( j )
							);

						}

					} else {

						positionAttribute = geometry.attributes.position;

					}

					morphPositions.push( positionAttribute );

				}

				if ( hasMorphNormal ) {

					// see target.POSITION's comment

					var normalAttribute;

					if ( target.NORMAL !== undefined ) {

						var normalAttribute = cloneBufferAttribute( accessors[ target.NORMAL ] );
						normalAttribute.name = attributeName;

						var normal = geometry.attributes.normal;

						for ( var j = 0, jl = normalAttribute.count; j < jl; j ++ ) {

							normalAttribute.setXYZ(
								j,
								normalAttribute.getX( j ) + normal.getX( j ),
								normalAttribute.getY( j ) + normal.getY( j ),
								normalAttribute.getZ( j ) + normal.getZ( j )
							);

						}

					} else {

						normalAttribute = geometry.attributes.normal;

					}

					morphNormals.push( normalAttribute );

				}

			}

			if ( hasMorphPosition ) geometry.morphAttributes.position = morphPositions;
			if ( hasMorphNormal ) geometry.morphAttributes.normal = morphNormals;

		}
		function updateMorphTargets( mesh, meshDef ) {

			mesh.updateMorphTargets();

			if ( meshDef.weights !== undefined ) {

				for ( var i = 0, il = meshDef.weights.length; i < il; i ++ ) {

					mesh.morphTargetInfluences[ i ] = meshDef.weights[ i ];

				}

			}

			// .extras has user-defined data, so check that .extras.targetNames is an array.
			if ( meshDef.extras && Array.isArray( meshDef.extras.targetNames ) ) {

				var targetNames = meshDef.extras.targetNames;

				if ( mesh.morphTargetInfluences.length === targetNames.length ) {

					mesh.morphTargetDictionary = {};

					for ( var i = 0, il = targetNames.length; i < il; i ++ ) {

						mesh.morphTargetDictionary[ targetNames[ i ] ] = i;

					}

				} else {

					console.warn( 'GLTFLoader: Invalid extras.targetNames length. Ignoring names.' );

				}

			}

		}

		function isPrimitiveEqual( a, b ) {

			if ( a.indices !== b.indices ) {

				return false;

			}

			return isObjectEqual( a.attributes, b.attributes );

		}

		function isObjectEqual( a, b ) {

			if ( Object.keys( a ).length !== Object.keys( b ).length ) return false;

			for ( var key in a ) {

				if ( a[ key ] !== b[ key ] ) return false;

			}

			return true;

		}

		function isArrayEqual( a, b ) {

			if ( a.length !== b.length ) return false;

			for ( var i = 0, il = a.length; i < il; i ++ ) {

				if ( a[ i ] !== b[ i ] ) return false;

			}

			return true;

		}

		function getCachedGeometry( cache, newPrimitive ) {

			for ( var i = 0, il = cache.length; i < il; i ++ ) {

				var cached = cache[ i ];

				if ( isPrimitiveEqual( cached.primitive, newPrimitive ) ) return cached.promise;

			}

			return null;

		}

		function getCachedCombinedGeometry( cache, geometries ) {

			for ( var i = 0, il = cache.length; i < il; i ++ ) {

				var cached = cache[ i ];

				if ( isArrayEqual( geometries, cached.baseGeometries ) ) return cached.geometry;

			}

			return null;

		}

		function getCachedMultiPassGeometry( cache, geometry, primitives ) {

			for ( var i = 0, il = cache.length; i < il; i ++ ) {

				var cached = cache[ i ];

				if ( geometry === cached.baseGeometry && isArrayEqual( primitives, cached.primitives ) ) return cached.geometry;

			}

			return null;

		}

		function cloneBufferAttribute( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) {

				var count = attribute.count;
				var itemSize = attribute.itemSize;
				var array = attribute.array.slice( 0, count * itemSize );

				for ( var i = 0; i < count; ++ i ) {

					array[ i ] = attribute.getX( i );
					if ( itemSize >= 2 ) array[ i + 1 ] = attribute.getY( i );
					if ( itemSize >= 3 ) array[ i + 2 ] = attribute.getZ( i );
					if ( itemSize >= 4 ) array[ i + 3 ] = attribute.getW( i );

				}

				return new BufferAttribute( array, itemSize, attribute.normalized );

			}

			return attribute.clone();

		}
		function isMultiPassGeometry( primitives ) {

			if ( primitives.length < 2 ) return false;

			var primitive0 = primitives[ 0 ];
			var targets0 = primitive0.targets || [];

			if ( primitive0.indices === undefined ) return false;

			for ( var i = 1, il = primitives.length; i < il; i ++ ) {

				var primitive = primitives[ i ];

				if ( primitive0.mode !== primitive.mode ) return false;
				if ( primitive.indices === undefined ) return false;
				if ( ! isObjectEqual( primitive0.attributes, primitive.attributes ) ) return false;

				var targets = primitive.targets || [];

				if ( targets0.length !== targets.length ) return false;

				for ( var j = 0, jl = targets0.length; j < jl; j ++ ) {

					if ( ! isObjectEqual( targets0[ j ], targets[ j ] ) ) return false;

				}

			}

			return true;

		}
		function GLTFParser( json, extensions, options ) {

			this.json = json || {};
			this.extensions = extensions || {};
			this.options = options || {};

			// loader object cache
			this.cache = new GLTFRegistry();

			// BufferGeometry caching
			this.primitiveCache = [];
			this.multiplePrimitivesCache = [];
			this.multiPassGeometryCache = [];

			this.textureLoader = new TextureLoader( this.options.manager );
			this.textureLoader.setCrossOrigin( this.options.crossOrigin );

			this.fileLoader = new FileLoader( this.options.manager );
			this.fileLoader.setResponseType( 'arraybuffer' );

		}

		GLTFParser.prototype.parse = function ( onLoad, onError ) {

			var json = this.json;

			// Clear the loader cache
			this.cache.removeAll();

			// Mark the special nodes/meshes in json for efficient parse
			this.markDefs();

			// Fire the callback on complete
			this.getMultiDependencies( [

				'scene',
				'animation',
				'camera'

			] ).then( function ( dependencies ) {

				var scenes = dependencies.scenes || [];
				var scene = scenes[ json.scene || 0 ];
				var animations = dependencies.animations || [];
				var cameras = dependencies.cameras || [];

				onLoad( scene, scenes, cameras, animations, json );

			} ).catch( onError );

		};
		GLTFParser.prototype.markDefs = function () {

			var nodeDefs = this.json.nodes || [];
			var skinDefs = this.json.skins || [];
			var meshDefs = this.json.meshes || [];

			var meshReferences = {};
			var meshUses = {};

			// Nothing in the node definition indicates whether it is a Bone or an
			// Object3D. Use the skins' joint references to mark bones.
			for ( var skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex ++ ) {

				var joints = skinDefs[ skinIndex ].joints;

				for ( var i = 0, il = joints.length; i < il; i ++ ) {

					nodeDefs[ joints[ i ] ].isBone = true;

				}

			}

			// Meshes can (and should) be reused by multiple nodes in a glTF asset. To
			// avoid having more than one Mesh with the same name, count
			// references and rename instances below.
			//
			// Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
			for ( var nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

				var nodeDef = nodeDefs[ nodeIndex ];

				if ( nodeDef.mesh !== undefined ) {

					if ( meshReferences[ nodeDef.mesh ] === undefined ) {

						meshReferences[ nodeDef.mesh ] = meshUses[ nodeDef.mesh ] = 0;

					}

					meshReferences[ nodeDef.mesh ] ++;

					// Nothing in the mesh definition indicates whether it is
					// a SkinnedMesh or Mesh. Use the node's mesh reference
					// to mark SkinnedMesh if node has skin.
					if ( nodeDef.skin !== undefined ) {

						meshDefs[ nodeDef.mesh ].isSkinnedMesh = true;

					}

				}

			}

			this.json.meshReferences = meshReferences;
			this.json.meshUses = meshUses;

		};
		GLTFParser.prototype.getDependency = function ( type, index ) {

			var cacheKey = type + ':' + index;
			var dependency = this.cache.get( cacheKey );

			if ( ! dependency ) {

				switch ( type ) {

					case 'scene':
						dependency = this.loadScene( index );
						break;

					case 'node':
						dependency = this.loadNode( index );
						break;

					case 'mesh':
						dependency = this.loadMesh( index );
						break;

					case 'accessor':
						dependency = this.loadAccessor( index );
						break;

					case 'bufferView':
						dependency = this.loadBufferView( index );
						break;

					case 'buffer':
						dependency = this.loadBuffer( index );
						break;

					case 'material':
						dependency = this.loadMaterial( index );
						break;

					case 'texture':
						dependency = this.loadTexture( index );
						break;

					case 'skin':
						dependency = this.loadSkin( index );
						break;

					case 'animation':
						dependency = this.loadAnimation( index );
						break;

					case 'camera':
						dependency = this.loadCamera( index );
						break;

					default:
						throw new Error( 'Unknown type: ' + type );

				}

				this.cache.add( cacheKey, dependency );

			}

			return dependency;

		};
		GLTFParser.prototype.getDependencies = function ( type ) {

			var dependencies = this.cache.get( type );

			if ( ! dependencies ) {

				var parser = this;
				var defs = this.json[ type + ( type === 'mesh' ? 'es' : 's' ) ] || [];

				dependencies = Promise.all( defs.map( function ( def, index ) {

					return parser.getDependency( type, index );

				} ) );

				this.cache.add( type, dependencies );

			}

			return dependencies;

		};
		GLTFParser.prototype.getMultiDependencies = function ( types ) {

			var results = {};
			var pendings = [];

			for ( var i = 0, il = types.length; i < il; i ++ ) {

				var type = types[ i ];
				var value = this.getDependencies( type );

				value = value.then( function ( key, value ) {

					results[ key ] = value;

				}.bind( this, type + ( type === 'mesh' ? 'es' : 's' ) ) );

				pendings.push( value );

			}

			return Promise.all( pendings ).then( function () {

				return results;

			} );

		};
		GLTFParser.prototype.loadBuffer = function ( bufferIndex ) {

			var bufferDef = this.json.buffers[ bufferIndex ];
			var loader = this.fileLoader;

			if ( bufferDef.type && bufferDef.type !== 'arraybuffer' ) {

				throw new Error( 'GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.' );

			}

			// If present, GLB container is required to be the first buffer.
			if ( bufferDef.uri === undefined && bufferIndex === 0 ) {

				return Promise.resolve( this.extensions[ EXTENSIONS.KHR_BINARY_GLTF ].body );

			}

			var options = this.options;

			return new Promise( function ( resolve, reject ) {

				loader.load( resolveURL( bufferDef.uri, options.path ), resolve, undefined, function () {

					reject( new Error( 'GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".' ) );

				} );

			} );

		};
		GLTFParser.prototype.loadBufferView = function ( bufferViewIndex ) {

			var bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

			return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

				var byteLength = bufferViewDef.byteLength || 0;
				var byteOffset = bufferViewDef.byteOffset || 0;
				return buffer.slice( byteOffset, byteOffset + byteLength );

			} );

		};
		GLTFParser.prototype.loadAccessor = function ( accessorIndex ) {

			var parser = this;
			var json = this.json;

			var accessorDef = this.json.accessors[ accessorIndex ];

			if ( accessorDef.bufferView === undefined && accessorDef.sparse === undefined ) {

				// Ignore empty accessors, which may be used to declare runtime
				// information about attributes coming from another source (e.g. Draco
				// compression extension).
				return null;

			}

			var pendingBufferViews = [];

			if ( accessorDef.bufferView !== undefined ) {

				pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.bufferView ) );

			} else {

				pendingBufferViews.push( null );

			}

			if ( accessorDef.sparse !== undefined ) {

				pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.indices.bufferView ) );
				pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.values.bufferView ) );

			}

			return Promise.all( pendingBufferViews ).then( function ( bufferViews ) {

				var bufferView = bufferViews[ 0 ];

				var itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
				var TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

				// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
				var elementBytes = TypedArray.BYTES_PER_ELEMENT;
				var itemBytes = elementBytes * itemSize;
				var byteOffset = accessorDef.byteOffset || 0;
				var byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[ accessorDef.bufferView ].byteStride : undefined;
				var normalized = accessorDef.normalized === true;
				var array, bufferAttribute;

				// The buffer is not interleaved if the stride is the item size in bytes.
				if ( byteStride && byteStride !== itemBytes ) {

					var ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType;
					var ib = parser.cache.get( ibCacheKey );

					if ( ! ib ) {

						// Use the full buffer if it's interleaved.
						array = new TypedArray( bufferView );

						// Integer parameters to IB/IBA are in array elements, not bytes.
						ib = new InterleavedBuffer( array, byteStride / elementBytes );

						parser.cache.add( ibCacheKey, ib );

					}

					bufferAttribute = new InterleavedBufferAttribute( ib, itemSize, byteOffset / elementBytes, normalized );

				} else {

					if ( bufferView === null ) {

						array = new TypedArray( accessorDef.count * itemSize );

					} else {

						array = new TypedArray( bufferView, byteOffset, accessorDef.count * itemSize );

					}

					bufferAttribute = new BufferAttribute( array, itemSize, normalized );

				}

				// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
				if ( accessorDef.sparse !== undefined ) {

					var itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
					var TypedArrayIndices = WEBGL_COMPONENT_TYPES[ accessorDef.sparse.indices.componentType ];

					var byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
					var byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

					var sparseIndices = new TypedArrayIndices( bufferViews[ 1 ], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices );
					var sparseValues = new TypedArray( bufferViews[ 2 ], byteOffsetValues, accessorDef.sparse.count * itemSize );

					if ( bufferView !== null ) {

						// Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
						bufferAttribute.setArray( bufferAttribute.array.slice() );

					}

					for ( var i = 0, il = sparseIndices.length; i < il; i ++ ) {

						var index = sparseIndices[ i ];

						bufferAttribute.setX( index, sparseValues[ i * itemSize ] );
						if ( itemSize >= 2 ) bufferAttribute.setY( index, sparseValues[ i * itemSize + 1 ] );
						if ( itemSize >= 3 ) bufferAttribute.setZ( index, sparseValues[ i * itemSize + 2 ] );
						if ( itemSize >= 4 ) bufferAttribute.setW( index, sparseValues[ i * itemSize + 3 ] );
						if ( itemSize >= 5 ) throw new Error( 'GLTFLoader: Unsupported itemSize in sparse BufferAttribute.' );

					}

				}

				return bufferAttribute;

			} );

		};
		GLTFParser.prototype.loadTexture = function ( textureIndex ) {

			var parser = this;
			var json = this.json;
			var options = this.options;
			var textureLoader = this.textureLoader;

			var URL = window.URL || window.webkitURL;

			var textureDef = json.textures[ textureIndex ];

			var textureExtensions = textureDef.extensions || {};

			var source;

			if ( textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ] ) {

				source = json.images[ textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ].source ];

			} else {

				source = json.images[ textureDef.source ];

			}

			var sourceURI = source.uri;
			var isObjectURL = false;

			if ( source.bufferView !== undefined ) {

				// Load binary image data from bufferView, if provided.

				sourceURI = parser.getDependency( 'bufferView', source.bufferView ).then( function ( bufferView ) {

					isObjectURL = true;
					var blob = new Blob( [ bufferView ], { type: source.mimeType } );
					sourceURI = URL.createObjectURL( blob );
					return sourceURI;

				} );

			}

			return Promise.resolve( sourceURI ).then( function ( sourceURI ) {

				// Load Texture resource.

				var loader = Loader.Handlers.get( sourceURI );

				if ( ! loader ) {

					loader = textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ]
						? parser.extensions[ EXTENSIONS.MSFT_TEXTURE_DDS ].ddsLoader
						: textureLoader;

				}

				return new Promise( function ( resolve, reject ) {

					loader.load( resolveURL( sourceURI, options.path ), resolve, undefined, reject );

				} );

			} ).then( function ( texture ) {

				// Clean up resources and configure Texture.

				if ( isObjectURL === true ) {

					URL.revokeObjectURL( sourceURI );

				}

				texture.flipY = false;

				if ( textureDef.name !== undefined ) texture.name = textureDef.name;

				// Ignore unknown mime types, like DDS files.
				if ( source.mimeType in MIME_TYPE_FORMATS ) {

					texture.format = MIME_TYPE_FORMATS[ source.mimeType ];

				}

				var samplers = json.samplers || {};
				var sampler = samplers[ textureDef.sampler ] || {};

				texture.magFilter = WEBGL_FILTERS[ sampler.magFilter ] || LinearFilter;
				texture.minFilter = WEBGL_FILTERS[ sampler.minFilter ] || LinearMipMapLinearFilter;
				texture.wrapS = WEBGL_WRAPPINGS[ sampler.wrapS ] || RepeatWrapping;
				texture.wrapT = WEBGL_WRAPPINGS[ sampler.wrapT ] || RepeatWrapping;

				return texture;

			} );

		};
		GLTFParser.prototype.assignTexture = function ( materialParams, textureName, textureIndex ) {

			return this.getDependency( 'texture', textureIndex ).then( function ( texture ) {

				materialParams[ textureName ] = texture;

			} );

		};
		GLTFParser.prototype.loadMaterial = function ( materialIndex ) {

			var parser = this;
			var json = this.json;
			var extensions = this.extensions;
			var materialDef = json.materials[ materialIndex ];

			var materialType;
			var materialParams = {};
			var materialExtensions = materialDef.extensions || {};

			var pending = [];

			if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ] ) {

				var sgExtension = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ];
				materialType = sgExtension.getMaterialType( materialDef );
				pending.push( sgExtension.extendParams( materialParams, materialDef, parser ) );

			} else if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ] ) {

				var kmuExtension = extensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ];
				materialType = kmuExtension.getMaterialType( materialDef );
				pending.push( kmuExtension.extendParams( materialParams, materialDef, parser ) );

			} else {

				// Specification:
				// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

				materialType = MeshStandardMaterial;

				var metallicRoughness = materialDef.pbrMetallicRoughness || {};

				materialParams.color = new Color( 1.0, 1.0, 1.0 );
				materialParams.opacity = 1.0;

				if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

					var array = metallicRoughness.baseColorFactor;

					materialParams.color.fromArray( array );
					materialParams.opacity = array[ 3 ];

				}

				if ( metallicRoughness.baseColorTexture !== undefined ) {

					pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture.index ) );

				}

				materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
				materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

				if ( metallicRoughness.metallicRoughnessTexture !== undefined ) {

					var textureIndex = metallicRoughness.metallicRoughnessTexture.index;
					pending.push( parser.assignTexture( materialParams, 'metalnessMap', textureIndex ) );
					pending.push( parser.assignTexture( materialParams, 'roughnessMap', textureIndex ) );

				}

			}

			if ( materialDef.doubleSided === true ) {

				materialParams.side = DoubleSide;

			}

			var alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

			if ( alphaMode === ALPHA_MODES.BLEND ) {

				materialParams.transparent = true;

			} else {

				materialParams.transparent = false;

				if ( alphaMode === ALPHA_MODES.MASK ) {

					materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;

				}

			}

			if ( materialDef.normalTexture !== undefined && materialType !== MeshBasicMaterial ) {

				pending.push( parser.assignTexture( materialParams, 'normalMap', materialDef.normalTexture.index ) );

				materialParams.normalScale = new Vector2( 1, 1 );

				if ( materialDef.normalTexture.scale !== undefined ) {

					materialParams.normalScale.set( materialDef.normalTexture.scale, materialDef.normalTexture.scale );

				}

			}

			if ( materialDef.occlusionTexture !== undefined && materialType !== MeshBasicMaterial ) {

				pending.push( parser.assignTexture( materialParams, 'aoMap', materialDef.occlusionTexture.index ) );

				if ( materialDef.occlusionTexture.strength !== undefined ) {

					materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;

				}

			}

			if ( materialDef.emissiveFactor !== undefined && materialType !== MeshBasicMaterial ) {

				materialParams.emissive = new Color().fromArray( materialDef.emissiveFactor );

			}

			if ( materialDef.emissiveTexture !== undefined && materialType !== MeshBasicMaterial ) {

				pending.push( parser.assignTexture( materialParams, 'emissiveMap', materialDef.emissiveTexture.index ) );

			}

			return Promise.all( pending ).then( function () {

				var material;

				if ( materialType === ShaderMaterial ) {

					material = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].createMaterial( materialParams );

				} else {

					material = new materialType( materialParams );

				}

				if ( materialDef.name !== undefined ) material.name = materialDef.name;

				// Normal map textures use OpenGL conventions:
				// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#materialnormaltexture
				if ( material.normalScale ) {

					material.normalScale.y = - material.normalScale.y;

				}

				// baseColorTexture, emissiveTexture, and specularGlossinessTexture use sRGB encoding.
				if ( material.map ) material.map.encoding = sRGBEncoding;
				if ( material.emissiveMap ) material.emissiveMap.encoding = sRGBEncoding;
				if ( material.specularMap ) material.specularMap.encoding = sRGBEncoding;

				assignExtrasToUserData( material, materialDef );

				if ( materialDef.extensions ) addUnknownExtensionsToUserData( extensions, material, materialDef );

				return material;

			} );

		};
		function addPrimitiveAttributes( geometry, primitiveDef, accessors ) {

			var attributes = primitiveDef.attributes;

			for ( var gltfAttributeName in attributes ) {

				var threeAttributeName = ATTRIBUTES[ gltfAttributeName ];
				var bufferAttribute = accessors[ attributes[ gltfAttributeName ] ];

				// Skip attributes already provided by e.g. Draco extension.
				if ( ! threeAttributeName ) continue;
				if ( threeAttributeName in geometry.attributes ) continue;

				geometry.addAttribute( threeAttributeName, bufferAttribute );

			}

			if ( primitiveDef.indices !== undefined && ! geometry.index ) {

				geometry.setIndex( accessors[ primitiveDef.indices ] );

			}

			if ( primitiveDef.targets !== undefined ) {

				addMorphTargets( geometry, primitiveDef.targets, accessors );

			}

			assignExtrasToUserData( geometry, primitiveDef );

		}
		GLTFParser.prototype.loadGeometries = function ( primitives ) {

			var parser = this;
			var extensions = this.extensions;
			var cache = this.primitiveCache;

			var isMultiPass = isMultiPassGeometry( primitives );
			var originalPrimitives;

			if ( isMultiPass ) {

				originalPrimitives = primitives; // save original primitives and use later

				// We build a single BufferGeometry with .groups from multiple primitives
				// because all primitives share the same attributes/morph/mode and have indices.

				primitives = [ primitives[ 0 ] ];

				// Sets .groups and combined indices to a geometry later in this method.

			}

			return this.getDependencies( 'accessor' ).then( function ( accessors ) {

				var pending = [];

				for ( var i = 0, il = primitives.length; i < il; i ++ ) {

					var primitive = primitives[ i ];

					// See if we've already created this geometry
					var cached = getCachedGeometry( cache, primitive );

					if ( cached ) {

						// Use the cached geometry if it exists
						pending.push( cached );

					} else if ( primitive.extensions && primitive.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ] ) {

						// Use DRACO geometry if available
						var geometryPromise = extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ]
							.decodePrimitive( primitive, parser )
							.then( function ( geometry ) {

								addPrimitiveAttributes( geometry, primitive, accessors );

								return geometry;

							} );

						cache.push( { primitive: primitive, promise: geometryPromise } );

						pending.push( geometryPromise );

					} else {

						// Otherwise create a new geometry
						var geometry = new BufferGeometry();

						addPrimitiveAttributes( geometry, primitive, accessors );

						var geometryPromise = Promise.resolve( geometry );

						// Cache this geometry
						cache.push( { primitive: primitive, promise: geometryPromise } );

						pending.push( geometryPromise );

					}

				}

				return Promise.all( pending ).then( function ( geometries ) {

					if ( isMultiPass ) {

						var baseGeometry = geometries[ 0 ];

						// See if we've already created this combined geometry
						var cache = parser.multiPassGeometryCache;
						var cached = getCachedMultiPassGeometry( cache, baseGeometry, originalPrimitives );

						if ( cached !== null ) return [ cached.geometry ];

						// Cloning geometry because of index override.
						// Attributes can be reused so cloning by myself here.
						var geometry = new BufferGeometry();

						geometry.name = baseGeometry.name;
						geometry.userData = baseGeometry.userData;

						for ( var key in baseGeometry.attributes ) geometry.addAttribute( key, baseGeometry.attributes[ key ] );
						for ( var key in baseGeometry.morphAttributes ) geometry.morphAttributes[ key ] = baseGeometry.morphAttributes[ key ];

						var indices = [];
						var offset = 0;

						for ( var i = 0, il = originalPrimitives.length; i < il; i ++ ) {

							var accessor = accessors[ originalPrimitives[ i ].indices ];

							for ( var j = 0, jl = accessor.count; j < jl; j ++ ) indices.push( accessor.array[ j ] );

							geometry.addGroup( offset, accessor.count, i );

							offset += accessor.count;

						}

						geometry.setIndex( indices );

						cache.push( { geometry: geometry, baseGeometry: baseGeometry, primitives: originalPrimitives } );

						return [ geometry ];

					} else if ( geometries.length > 1 && BufferGeometryUtils !== undefined ) {

						// Tries to merge geometries with BufferGeometryUtils if possible

						for ( var i = 1, il = primitives.length; i < il; i ++ ) {

							// can't merge if draw mode is different
							if ( primitives[ 0 ].mode !== primitives[ i ].mode ) return geometries;

						}

						// See if we've already created this combined geometry
						var cache = parser.multiplePrimitivesCache;
						var cached = getCachedCombinedGeometry( cache, geometries );

						if ( cached ) {

							if ( cached.geometry !== null ) return [ cached.geometry ];

						} else {

							var geometry = BufferGeometryUtils.mergeBufferGeometries( geometries, true );

							cache.push( { geometry: geometry, baseGeometries: geometries } );

							if ( geometry !== null ) return [ geometry ];

						}

					}

					return geometries;

				} );

			} );

		};
		GLTFParser.prototype.loadMesh = function ( meshIndex ) {

			var scope = this;
			var json = this.json;
			var extensions = this.extensions;

			var meshDef = json.meshes[ meshIndex ];

			return this.getMultiDependencies( [

				'accessor',
				'material'

			] ).then( function ( dependencies ) {

				var primitives = meshDef.primitives;
				var originalMaterials = [];

				for ( var i = 0, il = primitives.length; i < il; i ++ ) {

					originalMaterials[ i ] = primitives[ i ].material === undefined
						? createDefaultMaterial()
						: dependencies.materials[ primitives[ i ].material ];

				}

				return scope.loadGeometries( primitives ).then( function ( geometries ) {

					var isMultiMaterial = geometries.length === 1 && geometries[ 0 ].groups.length > 0;

					var meshes = [];

					for ( var i = 0, il = geometries.length; i < il; i ++ ) {

						var geometry = geometries[ i ];
						var primitive = primitives[ i ];

						// 1. create Mesh

						var mesh;

						var material = isMultiMaterial ? originalMaterials : originalMaterials[ i ];

						if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
							primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
							primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
							primitive.mode === undefined ) {

							// .isSkinnedMesh isn't in glTF spec. See .markDefs()
							mesh = meshDef.isSkinnedMesh === true
								? new SkinnedMesh( geometry, material )
								: new Mesh( geometry, material );

							if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

								mesh.drawMode = TriangleStripDrawMode;

							} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

								mesh.drawMode = TriangleFanDrawMode;

							}

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

							mesh = new LineSegments( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

							mesh = new Line( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

							mesh = new LineLoop( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

							mesh = new Points( geometry, material );

						} else {

							throw new Error( 'GLTFLoader: Primitive mode unsupported: ' + primitive.mode );

						}

						if ( Object.keys( mesh.geometry.morphAttributes ).length > 0 ) {

							updateMorphTargets( mesh, meshDef );

						}

						mesh.name = meshDef.name || ( 'mesh_' + meshIndex );

						if ( geometries.length > 1 ) mesh.name += '_' + i;

						assignExtrasToUserData( mesh, meshDef );

						meshes.push( mesh );

						// 2. update Material depending on Mesh and BufferGeometry

						var materials = isMultiMaterial ? mesh.material : [ mesh.material ];

						var useVertexColors = geometry.attributes.color !== undefined;
						var useFlatShading = geometry.attributes.normal === undefined;
						var useSkinning = mesh.isSkinnedMesh === true;
						var useMorphTargets = Object.keys( geometry.morphAttributes ).length > 0;
						var useMorphNormals = useMorphTargets && geometry.morphAttributes.normal !== undefined;

						for ( var j = 0, jl = materials.length; j < jl; j ++ ) {

							var material = materials[ j ];

							if ( mesh.isPoints ) {

								var cacheKey = 'PointsMaterial:' + material.uuid;

								var pointsMaterial = scope.cache.get( cacheKey );

								if ( ! pointsMaterial ) {

									pointsMaterial = new PointsMaterial();
									Material.prototype.copy.call( pointsMaterial, material );
									pointsMaterial.color.copy( material.color );
									pointsMaterial.map = material.map;
									pointsMaterial.lights = false; // PointsMaterial doesn't support lights yet

									scope.cache.add( cacheKey, pointsMaterial );

								}

								material = pointsMaterial;

							} else if ( mesh.isLine ) {

								var cacheKey = 'LineBasicMaterial:' + material.uuid;

								var lineMaterial = scope.cache.get( cacheKey );

								if ( ! lineMaterial ) {

									lineMaterial = new LineBasicMaterial();
									Material.prototype.copy.call( lineMaterial, material );
									lineMaterial.color.copy( material.color );
									lineMaterial.lights = false; // LineBasicMaterial doesn't support lights yet

									scope.cache.add( cacheKey, lineMaterial );

								}

								material = lineMaterial;

							}

							// Clone the material if it will be modified
							if ( useVertexColors || useFlatShading || useSkinning || useMorphTargets ) {

								var cacheKey = 'ClonedMaterial:' + material.uuid + ':';

								if ( material.isGLTFSpecularGlossinessMaterial ) cacheKey += 'specular-glossiness:';
								if ( useSkinning ) cacheKey += 'skinning:';
								if ( useVertexColors ) cacheKey += 'vertex-colors:';
								if ( useFlatShading ) cacheKey += 'flat-shading:';
								if ( useMorphTargets ) cacheKey += 'morph-targets:';
								if ( useMorphNormals ) cacheKey += 'morph-normals:';

								var cachedMaterial = scope.cache.get( cacheKey );

								if ( ! cachedMaterial ) {

									cachedMaterial = material.isGLTFSpecularGlossinessMaterial
										? extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].cloneMaterial( material )
										: material.clone();

									if ( useSkinning ) cachedMaterial.skinning = true;
									if ( useVertexColors ) cachedMaterial.vertexColors = VertexColors;
									if ( useFlatShading ) cachedMaterial.flatShading = true;
									if ( useMorphTargets ) cachedMaterial.morphTargets = true;
									if ( useMorphNormals ) cachedMaterial.morphNormals = true;

									scope.cache.add( cacheKey, cachedMaterial );

								}

								material = cachedMaterial;

							}

							materials[ j ] = material;

							// workarounds for mesh and geometry

							if ( material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined ) {

								console.log( 'GLTFLoader: Duplicating UVs to support aoMap.' );
								geometry.addAttribute( 'uv2', new BufferAttribute( geometry.attributes.uv.array, 2 ) );

							}

							if ( material.isGLTFSpecularGlossinessMaterial ) {

								// for GLTFSpecularGlossinessMaterial(ShaderMaterial) uniforms runtime update
								mesh.onBeforeRender = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].refreshUniforms;

							}

						}

						mesh.material = isMultiMaterial ? materials : materials[ 0 ];

					}

					if ( meshes.length === 1 ) {

						return meshes[ 0 ];

					}

					var group = new Group();

					for ( var i = 0, il = meshes.length; i < il; i ++ ) {

						group.add( meshes[ i ] );

					}

					return group;

				} );

			} );

		};
		GLTFParser.prototype.loadCamera = function ( cameraIndex ) {

			var camera;
			var cameraDef = this.json.cameras[ cameraIndex ];
			var params = cameraDef[ cameraDef.type ];

			if ( ! params ) {

				console.warn( 'GLTFLoader: Missing camera parameters.' );
				return;

			}

			if ( cameraDef.type === 'perspective' ) {

				camera = new PerspectiveCamera( _Math.radToDeg( params.yfov ), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6 );

			} else if ( cameraDef.type === 'orthographic' ) {

				camera = new OrthographicCamera( params.xmag / - 2, params.xmag / 2, params.ymag / 2, params.ymag / - 2, params.znear, params.zfar );

			}

			if ( cameraDef.name !== undefined ) camera.name = cameraDef.name;

			assignExtrasToUserData( camera, cameraDef );

			return Promise.resolve( camera );

		};
		GLTFParser.prototype.loadSkin = function ( skinIndex ) {

			var skinDef = this.json.skins[ skinIndex ];

			var skinEntry = { joints: skinDef.joints };

			if ( skinDef.inverseBindMatrices === undefined ) {

				return Promise.resolve( skinEntry );

			}

			return this.getDependency( 'accessor', skinDef.inverseBindMatrices ).then( function ( accessor ) {

				skinEntry.inverseBindMatrices = accessor;

				return skinEntry;

			} );

		};
		GLTFParser.prototype.loadAnimation = function ( animationIndex ) {

			var json = this.json;

			var animationDef = json.animations[ animationIndex ];

			return this.getMultiDependencies( [

				'accessor',
				'node'

			] ).then( function ( dependencies ) {

				var tracks = [];

				for ( var i = 0, il = animationDef.channels.length; i < il; i ++ ) {

					var channel = animationDef.channels[ i ];
					var sampler = animationDef.samplers[ channel.sampler ];

					if ( sampler ) {

						var target = channel.target;
						var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.
						var input = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.input ] : sampler.input;
						var output = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.output ] : sampler.output;

						var inputAccessor = dependencies.accessors[ input ];
						var outputAccessor = dependencies.accessors[ output ];

						var node = dependencies.nodes[ name ];

						if ( node ) {

							node.updateMatrix();
							node.matrixAutoUpdate = true;

							var TypedKeyframeTrack;

							switch ( PATH_PROPERTIES[ target.path ] ) {

								case PATH_PROPERTIES.weights:

									TypedKeyframeTrack = NumberKeyframeTrack;
									break;

								case PATH_PROPERTIES.rotation:

									TypedKeyframeTrack = QuaternionKeyframeTrack;
									break;

								case PATH_PROPERTIES.position:
								case PATH_PROPERTIES.scale:
								default:

									TypedKeyframeTrack = VectorKeyframeTrack;
									break;

							}

							var targetName = node.name ? node.name : node.uuid;

							var interpolation = sampler.interpolation !== undefined ? INTERPOLATION[ sampler.interpolation ] : InterpolateLinear;

							var targetNames = [];

							if ( PATH_PROPERTIES[ target.path ] === PATH_PROPERTIES.weights ) {

								// node can be Group here but
								// PATH_PROPERTIES.weights(morphTargetInfluences) should be
								// the property of a mesh object under group.

								node.traverse( function ( object ) {

									if ( object.isMesh === true && object.morphTargetInfluences ) {

										targetNames.push( object.name ? object.name : object.uuid );

									}

								} );

							} else {

								targetNames.push( targetName );

							}

							// KeyframeTrack.optimize() will modify given 'times' and 'values'
							// buffers before creating a truncated copy to keep. Because buffers may
							// be reused by other tracks, make copies here.
							for ( var j = 0, jl = targetNames.length; j < jl; j ++ ) {

								var track = new TypedKeyframeTrack(
									targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
									AnimationUtils.arraySlice( inputAccessor.array, 0 ),
									AnimationUtils.arraySlice( outputAccessor.array, 0 ),
									interpolation
								);

								// Here is the trick to enable custom interpolation.
								// Overrides .createInterpolant in a factory method which creates custom interpolation.
								if ( sampler.interpolation === 'CUBICSPLINE' ) {

									track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline( result ) {

										// A CUBICSPLINE keyframe in glTF has three output values for each input value,
										// representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
										// must be divided by three to get the interpolant's sampleSize argument.

										return new GLTFCubicSplineInterpolant( this.times, this.values, this.getValueSize() / 3, result );

									};

									// Workaround, provide an alternate way to know if the interpolant type is cubis spline to track.
									// track.getInterpolation() doesn't return valid value for custom interpolant.
									track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;

								}

								tracks.push( track );

							}

						}

					}

				}

				var name = animationDef.name !== undefined ? animationDef.name : 'animation_' + animationIndex;

				return new AnimationClip( name, undefined, tracks );

			} );

		};
		GLTFParser.prototype.loadNode = function ( nodeIndex ) {

			var json = this.json;
			var extensions = this.extensions;

			var meshReferences = json.meshReferences;
			var meshUses = json.meshUses;

			var nodeDef = json.nodes[ nodeIndex ];

			return this.getMultiDependencies( [

				'mesh',
				'skin',
				'camera',
				'light'

			] ).then( function ( dependencies ) {

				var node;

				// .isBone isn't in glTF spec. See .markDefs
				if ( nodeDef.isBone === true ) {

					node = new Bone();

				} else if ( nodeDef.mesh !== undefined ) {

					var mesh = dependencies.meshes[ nodeDef.mesh ];

					if ( meshReferences[ nodeDef.mesh ] > 1 ) {

						var instanceNum = meshUses[ nodeDef.mesh ] ++;

						node = mesh.clone();
						node.name += '_instance_' + instanceNum;

						// onBeforeRender copy for Specular-Glossiness
						node.onBeforeRender = mesh.onBeforeRender;

						for ( var i = 0, il = node.children.length; i < il; i ++ ) {

							node.children[ i ].name += '_instance_' + instanceNum;
							node.children[ i ].onBeforeRender = mesh.children[ i ].onBeforeRender;

						}

					} else {

						node = mesh;

					}

				} else if ( nodeDef.camera !== undefined ) {

					node = dependencies.cameras[ nodeDef.camera ];

				} else if ( nodeDef.extensions
						 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ]
						 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ].light !== undefined ) {

					var lights = extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ].lights;
					node = lights[ nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ].light ];

				} else {

					node = new Object3D();

				}

				if ( nodeDef.name !== undefined ) {

					node.name = PropertyBinding.sanitizeNodeName( nodeDef.name );

				}

				assignExtrasToUserData( node, nodeDef );

				if ( nodeDef.extensions ) addUnknownExtensionsToUserData( extensions, node, nodeDef );

				if ( nodeDef.matrix !== undefined ) {

					var matrix = new Matrix4();
					matrix.fromArray( nodeDef.matrix );
					node.applyMatrix( matrix );

				} else {

					if ( nodeDef.translation !== undefined ) {

						node.position.fromArray( nodeDef.translation );

					}

					if ( nodeDef.rotation !== undefined ) {

						node.quaternion.fromArray( nodeDef.rotation );

					}

					if ( nodeDef.scale !== undefined ) {

						node.scale.fromArray( nodeDef.scale );

					}

				}

				return node;

			} );

		};
		GLTFParser.prototype.loadScene = function () {

			// scene node hierachy builder

			function buildNodeHierachy( nodeId, parentObject, json, allNodes, skins ) {

				var node = allNodes[ nodeId ];
				var nodeDef = json.nodes[ nodeId ];

				// build skeleton here as well

				if ( nodeDef.skin !== undefined ) {

					var meshes = node.isGroup === true ? node.children : [ node ];

					for ( var i = 0, il = meshes.length; i < il; i ++ ) {

						var mesh = meshes[ i ];
						var skinEntry = skins[ nodeDef.skin ];

						var bones = [];
						var boneInverses = [];

						for ( var j = 0, jl = skinEntry.joints.length; j < jl; j ++ ) {

							var jointId = skinEntry.joints[ j ];
							var jointNode = allNodes[ jointId ];

							if ( jointNode ) {

								bones.push( jointNode );

								var mat = new Matrix4();

								if ( skinEntry.inverseBindMatrices !== undefined ) {

									mat.fromArray( skinEntry.inverseBindMatrices.array, j * 16 );

								}

								boneInverses.push( mat );

							} else {

								console.warn( 'GLTFLoader: Joint "%s" could not be found.', jointId );

							}

						}

						mesh.bind( new Skeleton( bones, boneInverses ), mesh.matrixWorld );

					}

				}

				// build node hierachy

				parentObject.add( node );

				if ( nodeDef.children ) {

					var children = nodeDef.children;

					for ( var i = 0, il = children.length; i < il; i ++ ) {

						var child = children[ i ];
						buildNodeHierachy( child, node, json, allNodes, skins );

					}

				}

			}

			return function loadScene( sceneIndex ) {

				var json = this.json;
				var extensions = this.extensions;
				var sceneDef = this.json.scenes[ sceneIndex ];

				return this.getMultiDependencies( [

					'node',
					'skin'

				] ).then( function ( dependencies ) {

					var scene = new Scene();
					if ( sceneDef.name !== undefined ) scene.name = sceneDef.name;

					assignExtrasToUserData( scene, sceneDef );

					if ( sceneDef.extensions ) addUnknownExtensionsToUserData( extensions, scene, sceneDef );

					var nodeIds = sceneDef.nodes || [];

					for ( var i = 0, il = nodeIds.length; i < il; i ++ ) {

						buildNodeHierachy( nodeIds[ i ], scene, json, dependencies.nodes, dependencies.skins );

					}

					return scene;

				} );

			};

		}();

		return GLTFLoader;

	} )();

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// VRM Specification: https://dwango.github.io/vrm/vrm_spec/
	//
	// VRM is based on glTF 2.0 and VRM extension is defined
	// in top-level json.extensions.VRM

	var VRMLoader = ( function () {

		function VRMLoader( manager ) {

			if ( GLTFLoader === undefined ) {

				throw new Error( 'VRMLoader: Import GLTFLoader.' );

			}

			this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
			this.gltfLoader = new GLTFLoader( this.manager );

		}

		VRMLoader.prototype = {

			constructor: VRMLoader,

			crossOrigin: 'anonymous',

			load: function ( url, onLoad, onProgress, onError ) {

				var scope = this;

				this.gltfLoader.load( url, function ( gltf ) {

					scope.parse( gltf, onLoad );

				}, onProgress, onError );

			},

			setCrossOrigin: function ( value ) {

				this.glTFLoader.setCrossOrigin( value );
				return this;

			},

			setPath: function ( value ) {

				this.glTFLoader.setPath( value );
				return this;

			},

			setDRACOLoader: function ( dracoLoader ) {

				this.glTFLoader.setDRACOLoader( dracoLoader );
				return this;

			},

			parse: function ( gltf, onLoad ) {

				var gltfParser = gltf.parser;
				var gltfExtensions = gltf.userData.gltfExtensions || {};
				var vrmExtension = gltfExtensions.VRM || {};

				// handle VRM Extension here

				onLoad( gltf );

			}

		};

		return VRMLoader;

	} )();

	exports.VRMLoader = VRMLoader;

	return exports;

}({}));
