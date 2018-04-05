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

					if ( this.status === 200 ) {

						for ( var i = 0, il = callbacks.length; i < il; i ++ ) {

							var callback = callbacks[ i ];
							if ( callback.onLoad ) callback.onLoad( response );

						}

						scope.manager.itemEnd( url );

					} else if ( this.status === 0 ) {

						// Some browsers return HTTP Status 0 when using non-http protocol
						// e.g. 'file://' or 'data://'. Handle as success.

						console.warn( 'FileLoader: HTTP Status 0 received.' );

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

	var _Math = {

		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,

		generateUUID: ( function () {

			// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

			var lut = [];

			for ( var i = 0; i < 256; i ++ ) {

				lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 ).toUpperCase();

			}

			return function generateUUID() {

				var d0 = Math.random() * 0xffffffff | 0;
				var d1 = Math.random() * 0xffffffff | 0;
				var d2 = Math.random() * 0xffffffff | 0;
				var d3 = Math.random() * 0xffffffff | 0;
				return lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
					lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
					lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
					lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];

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

	var GLNode = function ( type ) {

		this.uuid = _Math.generateUUID();

		this.name = "";
		this.allows = {};

		this.type = type;

		this.userData = {};

	};

	GLNode.prototype.isNode = true;

	GLNode.prototype.parse = function ( builder, context ) {

		context = context || {};

		builder.parsing = true;

		var material = builder.material;

		this.build( builder.addCache( context.cache, context.requires ).addSlot( context.slot ), 'v4' );

		material.clearVertexNode();
		material.clearFragmentNode();

		builder.removeCache().removeSlot();

		builder.parsing = false;

	};

	GLNode.prototype.parseAndBuildCode = function ( builder, output, context ) {

		context = context || {};

		this.parse( builder, context );

		return this.buildCode( builder, output, context );

	};

	GLNode.prototype.buildCode = function ( builder, output, context ) {

		context = context || {};

		var material = builder.material;

		var data = { result: this.build( builder.addCache( context.cache, context.requires ).addSlot( context.slot ), output ) };

		if ( builder.isShader( 'vertex' ) ) data.code = material.clearVertexNode();
		else data.code = material.clearFragmentNode();

		builder.removeCache().removeSlot();

		return data;

	};

	GLNode.prototype.build = function ( builder, output, uuid ) {

		output = output || this.getType( builder, output );

		var material = builder.material, data = material.getDataNode( uuid || this.uuid );

		if ( builder.parsing ) this.appendDepsNode( builder, data, output );

		if ( this.allows[ builder.shader ] === false ) {

			throw new Error( 'Shader ' + shader + ' is not compatible with this node.' );

		}

		if ( material.nodes.indexOf( this ) === - 1 ) {

			material.nodes.push( this );

		}

		if ( this.updateFrame !== undefined && material.updaters.indexOf( this ) === - 1 ) {

			material.updaters.push( this );

		}

		return this.generate( builder, output, uuid );

	};

	GLNode.prototype.appendDepsNode = function ( builder, data, output ) {

		data.deps = ( data.deps || 0 ) + 1;

		var outputLen = builder.getFormatLength( output );

		if ( outputLen > ( data.outputMax || 0 ) || this.getType( builder, output ) ) {

			data.outputMax = outputLen;
			data.output = output;

		}

	};

	GLNode.prototype.getType = function ( builder, output ) {

		return output === 'sampler2D' || output === 'samplerCube' ? output : this.type;

	};

	GLNode.prototype.getJSONNode = function ( meta ) {

		var isRootObject = ( meta === undefined || typeof meta === 'string' );

		if ( ! isRootObject && meta.nodes[ this.uuid ] !== undefined ) {

			return meta.nodes[ this.uuid ];

		}

	};

	GLNode.prototype.createJSONNode = function ( meta ) {

		var isRootObject = ( meta === undefined || typeof meta === 'string' );

		var data = {};

		if ( typeof this.nodeType !== "string" ) throw new Error( "Node does not allow serialization." );

		data.uuid = this.uuid;
		data.type = this.nodeType + "Node";

		if ( this.name !== "" ) data.name = this.name;

		if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

		if ( ! isRootObject ) {

			meta.nodes[ this.uuid ] = data;

		}

		return data;

	};

	GLNode.prototype.toJSON = function ( meta ) {

		return this.getJSONNode( meta ) || this.createJSONNode( meta );

	};

	var TempNode = function ( type, params ) {

		GLNode.call( this, type );

		params = params || {};

		this.shared = params.shared !== undefined ? params.shared : true;
		this.unique = params.unique !== undefined ? params.unique : false;

	};

	TempNode.prototype = Object.create( GLNode.prototype );
	TempNode.prototype.constructor = TempNode;

	TempNode.prototype.build = function ( builder, output, uuid, ns ) {

		output = output || this.getType( builder );

		var material = builder.material;

		if ( this.isShared( builder, output ) ) {

			var isUnique = this.isUnique( builder, output );

			if ( isUnique && this.constructor.uuid === undefined ) {

				this.constructor.uuid = _Math.generateUUID();

			}

			uuid = builder.getUuid( uuid || this.getUuid(), ! isUnique );

			var data = material.getDataNode( uuid );

			if ( builder.parsing ) {

				if ( data.deps || 0 > 0 ) {

					this.appendDepsNode( builder, data, output );

					return this.generate( builder, type, uuid );

				}

				return GLNode.prototype.build.call( this, builder, output, uuid );

			} else if ( isUnique ) {

				data.name = data.name || GLNode.prototype.build.call( this, builder, output, uuid );

				return data.name;

			} else if ( ! builder.optimize || data.deps == 1 ) {

				return GLNode.prototype.build.call( this, builder, output, uuid );

			}

			uuid = this.getUuid( false );

			var name = this.getTemp( builder, uuid );
			var type = data.output || this.getType( builder );

			if ( name ) {

				return builder.format( name, type, output );

			} else {

				name = TempNode.prototype.generate.call( this, builder, output, uuid, data.output, ns );

				var code = this.generate( builder, type, uuid );

				if ( builder.isShader( 'vertex' ) ) material.addVertexNode( name + '=' + code + ';' );
				else material.addFragmentNode( name + '=' + code + ';' );

				return builder.format( name, type, output );

			}

		}

		return GLNode.prototype.build.call( this, builder, output, uuid );

	};

	TempNode.prototype.isShared = function ( builder, output ) {

		return output !== 'sampler2D' && output !== 'samplerCube' && this.shared;

	};

	TempNode.prototype.isUnique = function ( builder, output ) {

		return this.unique;

	};

	TempNode.prototype.getUuid = function ( unique ) {

		var uuid = unique || unique == undefined ? this.constructor.uuid || this.uuid : this.uuid;

		if ( typeof this.scope == "string" ) uuid = this.scope + '-' + uuid;

		return uuid;

	};

	TempNode.prototype.getTemp = function ( builder, uuid ) {

		uuid = uuid || this.uuid;

		var material = builder.material;

		if ( builder.isShader( 'vertex' ) && material.vertexTemps[ uuid ] ) return material.vertexTemps[ uuid ].name;
		else if ( material.fragmentTemps[ uuid ] ) return material.fragmentTemps[ uuid ].name;

	};

	TempNode.prototype.generate = function ( builder, output, uuid, type, ns ) {

		if ( ! this.isShared( builder, output ) ) console.error( "TempNode is not shared!" );

		uuid = uuid || this.uuid;

		if ( builder.isShader( 'vertex' ) ) return builder.material.getVertexTemp( uuid, type || this.getType( builder ), ns ).name;
		else return builder.material.getFragmentTemp( uuid, type || this.getType( builder ), ns ).name;

	};

	var FunctionNode = function( src, includesOrType, extensionsOrIncludes, keywordsOrExtensions ) {

		src = src || '';

		this.isMethod = typeof includesOrType !== "string";
		this.useKeywords = true;

		TempNode.call( this, this.isMethod ? null : includesOrType );

		if ( this.isMethod ) this.eval( src, includesOrType, extensionsOrIncludes, keywordsOrExtensions );
		else this.eval( src, extensionsOrIncludes, keywordsOrExtensions );

	};

	FunctionNode.rDeclaration = /^([a-z_0-9]+)\s([a-z_0-9]+)\s?\((.*?)\)/i;
	FunctionNode.rProperties = /[a-z_0-9]+/ig;

	FunctionNode.prototype = Object.create( TempNode.prototype );
	FunctionNode.prototype.constructor = FunctionNode;

	FunctionNode.prototype.eval = function( src, includes, extensions, keywords ) {

		src = ( src || '' ).trim();

		this.includes = includes || [];
		this.extensions = extensions || {};
		this.keywords = keywords || {};

		if ( this.isMethod ) {

			var match = src.match( FunctionNode.rDeclaration );

			this.inputs = [];

			if ( match && match.length == 4 ) {

				this.type = match[ 1 ];
				this.name = match[ 2 ];

				var inputs = match[ 3 ].match( FunctionNode.rProperties );

				if ( inputs ) {

					var i = 0;

					while ( i < inputs.length ) {

						var qualifier = inputs[ i ++ ];
						var type, name;

						if ( qualifier == 'in' || qualifier == 'out' || qualifier == 'inout' ) {

							type = inputs[ i ++ ];

						} else {

							type = qualifier;
							qualifier = '';

						}

						name = inputs[ i ++ ];

						this.inputs.push( {
							name : name,
							type : type,
							qualifier : qualifier
						} );

					}

				}

			} else {

				this.type = '';
				this.name = '';

			}

		}

		this.value = src;

	};

	var NodeLib = {

		nodes: {},
		keywords: {},

		add: function( node ) {

			this.nodes[ node.name ] = node;

		},

		addKeyword: function( name, callback, cache ) {

			cache = cache !== undefined ? cache : true;

			this.keywords[ name ] = { callback : callback, cache : cache };

		},

		remove: function( node ) {

			delete this.nodes[ node.name ];

		},

		removeKeyword: function( name ) {

			delete this.keywords[ name ];

		},

		get: function( name ) {

			return this.nodes[ name ];

		},

		getKeyword: function( name, material ) {

			return this.keywords[ name ].callback.call( this, material );

		},

		getKeywordData: function( name ) {

			return this.keywords[ name ];

		},

		contains: function( name ) {

			return this.nodes[ name ] != undefined;

		},

		containsKeyword: function( name ) {

			return this.keywords[ name ] != undefined;

		}

	};

	var UVNode = function ( index ) {

		TempNode.call( this, 'v2', { shared: false } );

		this.index = index || 0;

	};

	UVNode.vertexDict = [ 'uv', 'uv2' ];
	UVNode.fragmentDict = [ 'vUv', 'vUv2' ];

	UVNode.prototype = Object.create( TempNode.prototype );
	UVNode.prototype.constructor = UVNode;
	UVNode.prototype.nodeType = "UV";

	UVNode.prototype.generate = function ( builder, output ) {

		var material = builder.material;
		var result;

		material.requires.uv[ this.index ] = true;

		if ( builder.isShader( 'vertex' ) ) result = UVNode.vertexDict[ this.index ];
		else result = UVNode.fragmentDict[ this.index ];

		return builder.format( result, this.getType( builder ), output );

	};

	UVNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.index = this.index;

		}

		return data;

	};

	var PositionNode = function ( scope ) {

		TempNode.call( this, 'v3' );

		this.scope = scope || PositionNode.LOCAL;

	};

	PositionNode.LOCAL = 'local';
	PositionNode.WORLD = 'world';
	PositionNode.VIEW = 'view';
	PositionNode.PROJECTION = 'projection';

	PositionNode.prototype = Object.create( TempNode.prototype );
	PositionNode.prototype.constructor = PositionNode;
	PositionNode.prototype.nodeType = "Position";

	PositionNode.prototype.getType = function ( builder ) {

		switch ( this.scope ) {

			case PositionNode.PROJECTION:
				return 'v4';

		}

		return this.type;

	};

	PositionNode.prototype.isShared = function ( builder ) {

		switch ( this.scope ) {

			case PositionNode.LOCAL:
			case PositionNode.WORLD:
				return false;

		}

		return true;

	};

	PositionNode.prototype.generate = function ( builder, output ) {

		var material = builder.material;
		var result;

		switch ( this.scope ) {

			case PositionNode.LOCAL:

				material.requires.position = true;

				if ( builder.isShader( 'vertex' ) ) result = 'transformed';
				else result = 'vPosition';

				break;

			case PositionNode.WORLD:

				material.requires.worldPosition = true;

				if ( builder.isShader( 'vertex' ) ) result = 'vWPosition';
				else result = 'vWPosition';

				break;

			case PositionNode.VIEW:

				if ( builder.isShader( 'vertex' ) ) result = '-mvPosition.xyz';
				else result = 'vViewPosition';

				break;

			case PositionNode.PROJECTION:

				if ( builder.isShader( 'vertex' ) ) result = '(projectionMatrix * modelViewMatrix * vec4( position, 1.0 ))';
				else result = 'vec4( 0.0 )';

				break;

		}

		return builder.format( result, this.getType( builder ), output );

	};

	PositionNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	var NormalNode = function ( scope ) {

		TempNode.call( this, 'v3' );

		this.scope = scope || NormalNode.LOCAL;

	};

	NormalNode.LOCAL = 'local';
	NormalNode.WORLD = 'world';
	NormalNode.VIEW = 'view';

	NormalNode.prototype = Object.create( TempNode.prototype );
	NormalNode.prototype.constructor = NormalNode;
	NormalNode.prototype.nodeType = "Normal";

	NormalNode.prototype.isShared = function ( builder ) {

		switch ( this.scope ) {

			case NormalNode.WORLD:
				return true;

		}

		return false;

	};

	NormalNode.prototype.generate = function ( builder, output ) {

		var material = builder.material;
		var result;

		switch ( this.scope ) {

			case NormalNode.LOCAL:

				material.requires.normal = true;

				if ( builder.isShader( 'vertex' ) ) result = 'normal';
				else result = 'vObjectNormal';

				break;

			case NormalNode.WORLD:

				material.requires.worldNormal = true;

				if ( builder.isShader( 'vertex' ) ) result = '( modelMatrix * vec4( objectNormal, 0.0 ) ).xyz';
				else result = 'vWNormal';

				break;

			case NormalNode.VIEW:

				result = 'vNormal';

				break;

		}

		return builder.format( result, this.getType( builder ), output );

	};

	NormalNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	var InputNode = function ( type, params ) {

		params = params || {};
		params.shared = params.shared !== undefined ? params.shared : false;

		TempNode.call( this, type, params );

		this.readonly = false;

	};

	InputNode.prototype = Object.create( TempNode.prototype );
	InputNode.prototype.constructor = InputNode;

	InputNode.prototype.isReadonly = function ( builder ) {

		return this.readonly;

	};

	InputNode.prototype.generate = function ( builder, output, uuid, type, ns, needsUpdate ) {

		var material = builder.material;

		uuid = builder.getUuid( uuid || this.getUuid() );
		type = type || this.getType( builder );

		var data = material.getDataNode( uuid ),
			readonly = this.isReadonly( builder ) && this.generateReadonly !== undefined;

		if ( readonly ) {

			return this.generateReadonly( builder, output, uuid, type, ns, needsUpdate );

		} else {

			if ( builder.isShader( 'vertex' ) ) {

				if ( ! data.vertex ) {

					data.vertex = material.createVertexUniform( type, this.value, ns, needsUpdate );

				}

				return builder.format( data.vertex.name, type, output );

			} else {

				if ( ! data.fragment ) {

					data.fragment = material.createFragmentUniform( type, this.value, ns, needsUpdate );

				}

				return builder.format( data.fragment.name, type, output );

			}

		}

	};

	var FloatNode = function ( value ) {

		InputNode.call( this, 'fv1' );

		this.value = [ value || 0 ];

	};

	FloatNode.prototype = Object.create( InputNode.prototype );
	FloatNode.prototype.constructor = FloatNode;
	FloatNode.prototype.nodeType = "Float";

	Object.defineProperties( FloatNode.prototype, {
		number: {
			get: function () {

				return this.value[ 0 ];

			},
			set: function ( val ) {

				this.value[ 0 ] = val;

			}
		}
	} );

	FloatNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		var value = this.number;

		return builder.format( Math.floor( value ) !== value ? value : value + ".0", type, output );

	};

	FloatNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.number = this.number;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	var TimerNode = function ( scale, scope ) {

		FloatNode.call( this );

		this.scale = scale !== undefined ? scale : 1;
		this.scope = scope || TimerNode.GLOBAL;

		this.timeScale = this.scale !== 1;

	};

	TimerNode.GLOBAL = 'global';
	TimerNode.LOCAL = 'local';
	TimerNode.DELTA = 'delta';

	TimerNode.prototype = Object.create( FloatNode.prototype );
	TimerNode.prototype.constructor = TimerNode;
	TimerNode.prototype.nodeType = "Timer";

	TimerNode.prototype.isReadonly = function ( builder ) {

		return false;

	};

	TimerNode.prototype.isUnique = function ( builder ) {

		// share TimerNode "uniform" input if is used on more time with others TimerNode
		return this.timeScale && ( this.scope === TimerNode.GLOBAL || this.scope === TimerNode.DELTA );

	};

	TimerNode.prototype.updateFrame = function ( frame ) {

		var scale = this.timeScale ? this.scale : 1;

		switch( this.scope ) {

			case TimerNode.LOCAL:

				this.number += frame.delta * scale;

				break;

			case TimerNode.DELTA:

				this.number = frame.delta * scale;

				break;

			default:

				this.number = frame.time * scale;

		}

	};

	TimerNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;
			data.scale = this.scale;
			data.timeScale = this.timeScale;

		}

		return data;

	};

	var ConstNode = function ( src, useDefine ) {

		TempNode.call( this );

		this.eval( src || ConstNode.PI, useDefine );

	};

	ConstNode.PI = 'PI';
	ConstNode.PI2 = 'PI2';
	ConstNode.RECIPROCAL_PI = 'RECIPROCAL_PI';
	ConstNode.RECIPROCAL_PI2 = 'RECIPROCAL_PI2';
	ConstNode.LOG2 = 'LOG2';
	ConstNode.EPSILON = 'EPSILON';

	ConstNode.prototype = Object.create( TempNode.prototype );
	ConstNode.prototype.constructor = ConstNode;
	ConstNode.prototype.nodeType = "Const";

	ConstNode.prototype.getType = function ( builder ) {

		return builder.getTypeByFormat( this.type );

	};

	ConstNode.prototype.eval = function ( src, useDefine ) {

		src = ( src || '' ).trim();

		var name, type, value = "";

		var rDeclaration = /^([a-z_0-9]+)\s([a-z_0-9]+)\s?\=?\s?(.*?)(\;|$)/i;
		var match = src.match( rDeclaration );

		this.useDefine = useDefine;

		if ( match && match.length > 1 ) {

			type = match[ 1 ];
			name = match[ 2 ];
			value = match[ 3 ];

		} else {

			name = src;
			type = 'fv1';

		}

		this.name = name;
		this.type = type;
		this.value = value;

	};

	ConstNode.prototype.build = function ( builder, output ) {

		if ( output === 'source' ) {

			if ( this.value ) {

				if ( this.useDefine ) {

					return '#define ' + this.name + ' ' + this.value;

				}

				return 'const ' + this.type + ' ' + this.name + ' = ' + this.value + ';';

			}

		} else {

			builder.include( this );

			return builder.format( this.name, this.getType( builder ), output );

		}

	};

	ConstNode.prototype.generate = function ( builder, output ) {

		return builder.format( this.name, this.getType( builder ), output );

	};

	ConstNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.name = this.name;
			data.out = this.type;

			if ( this.value ) data.value = this.value;
			if ( data.useDefine === true ) data.useDefine = true;

		}

		return data;

	};

	// Fix circular dependency, see #2



	//
	//	Keywords
	//

	NodeLib.addKeyword( 'uv', function() {

		return new UVNode();

	} );

	NodeLib.addKeyword( 'uv2', function() {

		return new UVNode( 1 );

	} );

	NodeLib.addKeyword( 'position', function() {

		return new PositionNode();

	} );

	NodeLib.addKeyword( 'worldPosition', function() {

		return new PositionNode( PositionNode.WORLD );

	} );

	NodeLib.addKeyword( 'normal', function() {

		return new NormalNode();

	} );

	NodeLib.addKeyword( 'worldNormal', function() {

		return new NormalNode( NormalNode.WORLD );

	} );

	NodeLib.addKeyword( 'viewPosition', function() {

		return new PositionNode( NormalNode.VIEW );

	} );

	NodeLib.addKeyword( 'viewNormal', function() {

		return new NormalNode( NormalNode.VIEW );

	} );

	NodeLib.addKeyword( 'time', function() {

		return new TimerNode();

	} );

	//
	//	Luma
	//

	NodeLib.add( new ConstNode( "vec3 LUMA vec3(0.2125, 0.7154, 0.0721)" ) );

	//
	//	NormalMap
	//

	NodeLib.add( new FunctionNode( [
		// Per-Pixel Tangent Space Normal Mapping
		// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html
		"vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 map, vec2 mUv, vec2 scale ) {",
		"	vec3 q0 = dFdx( eye_pos );",
		"	vec3 q1 = dFdy( eye_pos );",
		"	vec2 st0 = dFdx( mUv.st );",
		"	vec2 st1 = dFdy( mUv.st );",
		"	vec3 S = normalize( q0 * st1.t - q1 * st0.t );",
		"	vec3 T = normalize( -q0 * st1.s + q1 * st0.s );",
		"	vec3 N = normalize( surf_norm );",
		"	vec3 mapN = map * 2.0 - 1.0;",
		"	mapN.xy = scale * mapN.xy;",
		"	mat3 tsn = mat3( S, T, N );",
		"	return normalize( tsn * mapN );",
		"}"
	].join( "\n" ), null, { derivatives: true } ) );

	//
	//	Noise
	//

	NodeLib.add( new FunctionNode( [
		"float snoise(vec2 co) {",
		"	return fract( sin( dot(co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );",
		"}"
	].join( "\n" ) ) );

	//
	//	Hue
	//

	NodeLib.add( new FunctionNode( [
		"vec3 hue_rgb(vec3 rgb, float adjustment) {",
		"	const mat3 RGBtoYIQ = mat3(0.299, 0.587, 0.114, 0.595716, -0.274453, -0.321263, 0.211456, -0.522591, 0.311135);",
		"	const mat3 YIQtoRGB = mat3(1.0, 0.9563, 0.6210, 1.0, -0.2721, -0.6474, 1.0, -1.107, 1.7046);",
		"	vec3 yiq = RGBtoYIQ * rgb;",
		"	float hue = atan(yiq.z, yiq.y) + adjustment;",
		"	float chroma = sqrt(yiq.z * yiq.z + yiq.y * yiq.y);",
		"	return YIQtoRGB * vec3(yiq.x, chroma * cos(hue), chroma * sin(hue));",
		"}"
	].join( "\n" ) ) );

	//
	//	Saturation
	//

	NodeLib.add( new FunctionNode( [
		// Algorithm from Chapter 16 of OpenGL Shading Language
		"vec3 saturation_rgb(vec3 rgb, float adjustment) {",
		"	vec3 intensity = vec3(dot(rgb, LUMA));",
		"	return mix(intensity, rgb, adjustment);",
		"}"
	].join( "\n" ) ) );

	//
	//	Luminance
	//

	NodeLib.add( new FunctionNode( [
		// Algorithm from Chapter 10 of Graphics Shaders
		"float luminance_rgb(vec3 rgb) {",
		"	return dot(rgb, LUMA);",
		"}"
	].join( "\n" ) ) );

	//
	//	Vibrance
	//

	NodeLib.add( new FunctionNode( [
		// Shader by Evan Wallace adapted by @lo-th
		"vec3 vibrance_rgb(vec3 rgb, float adjustment) {",
		"	float average = (rgb.r + rgb.g + rgb.b) / 3.0;",
		"	float mx = max(rgb.r, max(rgb.g, rgb.b));",
		"	float amt = (mx - average) * (-3.0 * adjustment);",
		"	return mix(rgb.rgb, vec3(mx), amt);",
		"}"
	].join( "\n" ) ) );

	// Fix circular dependency, see #2


	FunctionNode.prototype.isShared = function( builder, output ) {

		return ! this.isMethod;

	};

	FunctionNode.prototype.getType = function( builder ) {

		return builder.getTypeByFormat( this.type );

	};

	FunctionNode.prototype.getInputByName = function( name ) {

		var i = this.inputs.length;

		while ( i -- ) {

			if ( this.inputs[ i ].name === name )
				return this.inputs[ i ];

		}

	};

	FunctionNode.prototype.getIncludeByName = function( name ) {

		var i = this.includes.length;

		while ( i -- ) {

			if ( this.includes[ i ].name === name )
				return this.includes[ i ];

		}

	};

	FunctionNode.prototype.generate = function( builder, output ) {

		var match, offset = 0, src = this.value;

		for ( var i = 0; i < this.includes.length; i ++ ) {

			builder.include( this.includes[ i ], this );

		}

		for ( var ext in this.extensions ) {

			builder.material.extensions[ ext ] = true;

		}

		while ( match = FunctionNode.rProperties.exec( this.value ) ) {

			var prop = match[ 0 ], isGlobal = this.isMethod ? ! this.getInputByName( prop ) : true;
			var reference = prop;

			if ( this.keywords[ prop ] || ( this.useKeywords && isGlobal && NodeLib.containsKeyword( prop ) ) ) {

				var node = this.keywords[ prop ];

				if ( ! node ) {

					var keyword = NodeLib.getKeywordData( prop );

					if ( keyword.cache ) node = builder.keywords[ prop ];

					node = node || NodeLib.getKeyword( prop, builder );

					if ( keyword.cache ) builder.keywords[ prop ] = node;

				}

				reference = node.build( builder );

			}

			if ( prop != reference ) {

				src = src.substring( 0, match.index + offset ) + reference + src.substring( match.index + prop.length + offset );

				offset += reference.length - prop.length;

			}

			if ( this.getIncludeByName( reference ) === undefined && NodeLib.contains( reference ) ) {

				builder.include( NodeLib.get( reference ) );

			}

		}

		if ( output === 'source' ) {

			return src;

		} else if ( this.isMethod ) {

			builder.include( this, false, src );

			return this.name;

		} else {

			return builder.format( "(" + src + ")", this.getType( builder ), output );

		}

	};

	var CameraNode = function ( scope, camera ) {

		TempNode.call( this, 'v3' );

		this.setScope( scope || CameraNode.POSITION );
		this.setCamera( camera );

	};

	CameraNode.fDepthColor = new FunctionNode( [
		"float depthColor( float mNear, float mFar ) {",
		"	#ifdef USE_LOGDEPTHBUF_EXT",
		"		float depth = gl_FragDepthEXT / gl_FragCoord.w;",
		"	#else",
		"		float depth = gl_FragCoord.z / gl_FragCoord.w;",
		"	#endif",
		"	return 1.0 - smoothstep( mNear, mFar, depth );",
		"}"
	].join( "\n" ) );

	CameraNode.POSITION = 'position';
	CameraNode.DEPTH = 'depth';
	CameraNode.TO_VERTEX = 'toVertex';

	CameraNode.prototype = Object.create( TempNode.prototype );
	CameraNode.prototype.constructor = CameraNode;
	CameraNode.prototype.nodeType = "Camera";

	CameraNode.prototype.setCamera = function ( camera ) {

		this.camera = camera;
		this.updateFrame = camera !== undefined ? this.onUpdateFrame : undefined;

	};

	CameraNode.prototype.setScope = function ( scope ) {

		switch ( this.scope ) {

			case CameraNode.DEPTH:

				delete this.near;
				delete this.far;

				break;

		}

		this.scope = scope;

		switch ( scope ) {

			case CameraNode.DEPTH:

				var camera = this.camera;

				this.near = new FloatNode( this.camera ? this.camera.near : 1 );
				this.far = new FloatNode( this.camera ? this.camera.far : 1200 );

				break;

		}

	};

	CameraNode.prototype.getType = function ( builder ) {

		switch ( this.scope ) {

			case CameraNode.DEPTH:
				return 'fv1';

		}

		return this.type;

	};

	CameraNode.prototype.isUnique = function ( builder ) {

		switch ( this.scope ) {

			case CameraNode.DEPTH:
			case CameraNode.TO_VERTEX:
				return true;

		}

		return false;

	};

	CameraNode.prototype.isShared = function ( builder ) {

		switch ( this.scope ) {

			case CameraNode.POSITION:
				return false;

		}

		return true;

	};

	CameraNode.prototype.generate = function ( builder, output ) {

		var material = builder.material;
		var result;

		switch ( this.scope ) {

			case CameraNode.POSITION:

				result = 'cameraPosition';

				break;

			case CameraNode.DEPTH:

				var func = CameraNode.fDepthColor;

				builder.include( func );

				result = func.name + '(' + this.near.build( builder, 'fv1' ) + ',' + this.far.build( builder, 'fv1' ) + ')';

				break;

			case CameraNode.TO_VERTEX:

				result = 'normalize( ' + new PositionNode( PositionNode.WORLD ).build( builder, 'v3' ) + ' - cameraPosition )';

				break;

		}

		return builder.format( result, this.getType( builder ), output );

	};

	CameraNode.prototype.onUpdateFrame = function ( frame ) {

		switch ( this.scope ) {

			case CameraNode.DEPTH:

				var camera = this.camera;

				this.near.number = this.camera.near;
				this.far.number = this.camera.far;

				break;

		}

	};

	CameraNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

			if ( this.camera ) data.camera = this.camera.uuid;

			switch ( this.scope ) {

				case CameraNode.DEPTH:

					data.near = this.near.number;
					data.far = this.far.number;

					break;

			}

		}

		return data;

	};

	var NodeMaterialLoader = function ( manager, library ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

		this.nodes = {};
		this.materials = {};
		this.passes = {};
		this.names = {};
		this.library = library || {};

	};

	var NodeMaterialLoaderUtils = {

		replaceUUIDObject: function ( object, uuid, value, recursive ) {

			recursive = recursive !== undefined ? recursive : true;

			if ( typeof uuid === "object" ) uuid = uuid.uuid;

			if ( typeof object === "object" ) {

				var keys = Object.keys( object );

				for ( var i = 0; i < keys.length; i ++ ) {

					var key = keys[ i ];

					if ( recursive ) {

						object[ key ] = this.replaceUUIDObject( object[ key ], uuid, value );

					}

					if ( key === uuid ) {

						object[ uuid ] = object[ key ];

						delete object[ key ];

					}

				}

			}

			return object === uuid ? value : object;

		},

		replaceUUID: function ( json, uuid, value ) {

			this.replaceUUIDObject( json, uuid, value, false );
			this.replaceUUIDObject( json.nodes, uuid, value );
			this.replaceUUIDObject( json.materials, uuid, value );
			this.replaceUUIDObject( json.passes, uuid, value );
			this.replaceUUIDObject( json.library, uuid, value, false );

			return json;

		}

	};

	Object.assign( NodeMaterialLoader.prototype, {

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var loader = new FileLoader( scope.manager );
			loader.load( url, function ( text ) {

				onLoad( scope.parse( JSON.parse( text ) ) );

			}, onProgress, onError );

			return this;

		},

		getObjectByName: function ( uuid ) {

			return this.names[ uuid ];

		},

		getObjectById: function ( uuid ) {

			return this.library[ uuid ] || this.nodes[ uuid ] || this.names[ uuid ];

		},

		getNode: function ( uuid ) {

			var object = this.getObjectById( uuid );

			if ( ! object ) {

				console.warn( "Node \"" + uuid + "\" not found." );

			}

			return object;

		},

		parse: function ( json ) {

			var uuid, node, object, prop, i;

			for ( uuid in json.nodes ) {

				node = json.nodes[ uuid ];

				object = new THREE[ node.type ]();

				if ( node.name ) {

					object.name = node.name;

					this.names[ object.name ] = object;

				} else {

					// ignore "uniform" shader input ( for optimization )
					object.readonly = true;

				}

				if ( node.readonly !== undefined ) object.readonly = node.readonly;

				this.nodes[ uuid ] = object;

			}

			for ( uuid in json.materials ) {

				node = json.materials[ uuid ];

				object = new THREE[ node.type ]();

				if ( node.name ) {

					object.name = node.name;

					this.names[ object.name ] = object;

				}

				this.materials[ uuid ] = object;

			}

			for ( uuid in json.passes ) {

				node = json.passes[ uuid ];

				object = new THREE[ node.type ]();

				if ( node.name ) {

					object.name = node.name;

					this.names[ object.name ] = object;

				}

				this.passes[ uuid ] = object;

			}

			if ( json.material ) this.material = this.materials[ uuid ];
			if ( json.pass ) this.pass = this.passes[ uuid ];

			for ( uuid in json.nodes ) {

				node = json.nodes[ uuid ];
				object = this.nodes[ uuid ];

				switch ( node.type ) {

					case "FloatNode":

						object.number = node.number;

						break;

					case "ColorNode":

						object.value.copy( node );

						break;

					case "Vector2Node":

						object.x = node.x;
						object.y = node.y;

						break;


					case "Vector3Node":

						object.x = node.x;
						object.y = node.y;
						object.z = node.z;

						break;

					case "Vector4Node":

						object.x = node.x;
						object.y = node.y;
						object.z = node.z;
						object.w = node.w;

						break;

					case "Matrix3Node":
					case "Matrix4Node":

						object.value.fromArray( node.elements );

						break;

					case "OperatorNode":

						object.a = this.getNode( node.a );
						object.b = this.getNode( node.b );
						object.op = node.op;

						break;

					case "Math1Node":

						object.a = this.getNode( node.a );
						object.method = node.method;

						break;

					case "Math2Node":

						object.a = this.getNode( node.a );
						object.b = this.getNode( node.b );
						object.method = node.method;

						break;

					case "Math3Node":

						object.a = this.getNode( node.a );
						object.b = this.getNode( node.b );
						object.c = this.getNode( node.c );
						object.method = node.method;

						break;

					case "UVNode":
					case "ColorsNode":

						object.index = node.index;

						break;


					case "LuminanceNode":

						object.rgb = this.getNode( node.rgb );

						break;

					case "PositionNode":
					case "NormalNode":
					case "ReflectNode":
					case "LightNode":

						object.scope = node.scope;

						break;

					case "SwitchNode":

						object.node = this.getNode( node.node );
						object.components = node.components;

						break;

					case "JoinNode":

						for ( prop in node.inputs ) {

							object[ prop ] = this.getNode( node.inputs[ prop ] );

						}

						break;

					case "CameraNode":

						object.setScope( node.scope );

						if ( node.camera ) object.setCamera( this.getNode( node.camera ) );

						switch ( node.scope ) {

							case CameraNode.DEPTH:

								object.near.number = node.near;
								object.far.number = node.far;

								break;

						}

						break;

					case "ColorAdjustmentNode":

						object.rgb = this.getNode( node.rgb );
						object.adjustment = this.getNode( node.adjustment );
						object.method = node.method;

						break;

					case "UVTransformNode":

						object.uv = this.getNode( node.uv );
						object.transform = this.getNode( node.transform );

						break;

					case "BumpNode":

						object.value = this.getNode( node.value );
						object.coord = this.getNode( node.coord );
						object.scale = this.getNode( node.scale );

						break;

					case "BlurNode":

						object.value = this.getNode( node.value );
						object.coord = this.getNode( node.coord );
						object.scale = this.getNode( node.scale );

						object.value = this.getNode( node.value );
						object.coord = this.getNode( node.coord );
						object.radius = this.getNode( node.radius );

						if ( node.size !== undefined ) object.size = new Vector2( node.size.x, node.size.y );

						object.blurX = node.blurX;
						object.blurY = node.blurY;

						break;

					case "ResolutionNode":

						object.renderer = this.getNode( node.renderer );

						break;

					case "ScreenUVNode":

						object.resolution = this.getNode( node.resolution );

						break;

					case "VelocityNode":

						if ( node.target ) object.setTarget( this.getNode( node.target ) );
						object.setParams( node.params );

						break;

					case "TimerNode":

						object.scope = node.scope;
						object.scale = node.scale;

						break;

					case "ConstNode":

						object.name = node.name;
						object.type = node.out;
						object.value = node.value;
						object.useDefine = node.useDefine === true;

						break;

					case "AttributeNode":
					case "VarNode":

						object.type = node.out;

						break;


					case "ReflectorNode":

						object.setMirror( this.getNode( node.mirror ) );

						if ( node.offset ) object.offset = this.getNode( node.offset );

						break;

					case "NoiseNode":

						object.coord = this.getNode( node.coord );

						break;

					case "FunctionNode":

						object.isMethod = node.isMethod;
						object.useKeywords = node.useKeywords;

						object.extensions = node.extensions;
						object.keywords = {};

						for ( prop in node.keywords ) {

							object.keywords[ prop ] = this.getNode( node.keywords[ prop ] );

						}

						if ( node.includes ) {

							for ( i = 0; i < node.includes.length; i ++ ) {

								object.includes.push( this.getNode( node.includes[ i ] ) );

							}

						}

						object.eval( node.src, object.includes, object.extensions, object.keywords );

						if ( ! object.isMethod ) object.type = node.out;

						break;

					case "FunctionCallNode":

						for ( prop in node.inputs ) {

							object.inputs[ prop ] = this.getNode( node.inputs[ prop ] );

						}

						object.value = this.getNode( node.value );

						break;

					case "TextureNode":
					case "CubeTextureNode":
					case "ScreenNode":

						if ( node.value ) object.value = this.getNode( node.value );

						object.coord = this.getNode( node.coord );

						if ( node.bias ) object.bias = this.getNode( node.bias );
						if ( object.project !== undefined ) object.project = node.project;

						break;

					case "RoughnessToBlinnExponentNode":
						break;

					case "RawNode":

						object.value = this.getNode( node.value );

						break;

					case "StandardNode":
					case "PhongNode":
					case "SpriteNode":

						object.color = this.getNode( node.color );

						if ( node.alpha ) object.alpha = this.getNode( node.alpha );

						if ( node.specular ) object.specular = this.getNode( node.specular );
						if ( node.shininess ) object.shininess = this.getNode( node.shininess );

						if ( node.roughness ) object.roughness = this.getNode( node.roughness );
						if ( node.metalness ) object.metalness = this.getNode( node.metalness );

						if ( node.reflectivity ) object.reflectivity = this.getNode( node.reflectivity );

						if ( node.clearCoat ) object.clearCoat = this.getNode( node.clearCoat );
						if ( node.clearCoatRoughness ) object.clearCoatRoughness = this.getNode( node.clearCoatRoughness );

						if ( node.normal ) object.normal = this.getNode( node.normal );
						if ( node.normalScale ) object.normalScale = this.getNode( node.normalScale );

						if ( node.emissive ) object.emissive = this.getNode( node.emissive );
						if ( node.ambient ) object.ambient = this.getNode( node.ambient );

						if ( node.shadow ) object.shadow = this.getNode( node.shadow );
						if ( node.light ) object.light = this.getNode( node.light );

						if ( node.ao ) object.ao = this.getNode( node.ao );

						if ( node.environment ) object.environment = this.getNode( node.environment );
						if ( node.environmentAlpha ) object.environmentAlpha = this.getNode( node.environmentAlpha );

						if ( node.transform ) object.transform = this.getNode( node.transform );

						if ( node.spherical === false ) object.spherical = false;

						break;

					default:

						console.warn( node.type, "not supported." );

				}

			}

			for ( uuid in json.materials ) {

				node = json.materials[ uuid ];
				object = this.materials[ uuid ];

				if ( node.name !== undefined ) object.name = node.name;

				if ( node.blending !== undefined ) object.blending = node.blending;
				if ( node.flatShading !== undefined ) object.flatShading = node.flatShading;
				if ( node.side !== undefined ) object.side = node.side;

				object.depthFunc = node.depthFunc;
				object.depthTest = node.depthTest;
				object.depthWrite = node.depthWrite;

				if ( node.wireframe !== undefined ) object.wireframe = node.wireframe;
				if ( node.wireframeLinewidth !== undefined ) object.wireframeLinewidth = node.wireframeLinewidth;
				if ( node.wireframeLinecap !== undefined ) object.wireframeLinecap = node.wireframeLinecap;
				if ( node.wireframeLinejoin !== undefined ) object.wireframeLinejoin = node.wireframeLinejoin;

				if ( node.skinning !== undefined ) object.skinning = node.skinning;
				if ( node.morphTargets !== undefined ) object.morphTargets = node.morphTargets;

				if ( node.visible !== undefined ) object.visible = node.visible;
				if ( node.userData !== undefined ) object.userData = node.userData;

				object.vertex = this.getNode( node.vertex );
				object.fragment = this.getNode( node.fragment );

				if ( object.vertex === object.fragment ) {

					// replace main node

					object.node = object.vertex;

				}

				object.build();

				if ( node.fog !== undefined ) object.fog = node.fog;
				if ( node.lights !== undefined ) object.lights = node.lights;

				if ( node.transparent !== undefined ) object.transparent = node.transparent;

			}

			for ( uuid in json.passes ) {

				node = json.passes[ uuid ];
				object = this.passes[ uuid ];

				object.value = this.getNode( node.value );

				object.build();

			}

			return this.material || this.pass || this;

		}

	} );

	exports.NodeMaterialLoader = NodeMaterialLoader;
	exports.NodeMaterialLoaderUtils = NodeMaterialLoaderUtils;

	return exports;

}({}));
