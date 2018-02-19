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
