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
			loader.setPath( scope.path );
			loader.load( url, function ( text ) {

				onLoad( scope.parse( JSON.parse( text ) ) );

			}, onProgress, onError );

			return this;

		},

		setPath: function ( value ) {

			this.path = value;
			return this;

		},

		getObjectByName: function ( uuid ) {

			return this.names[ uuid ];

		},

		getObjectById: function ( uuid ) {

			return this.library[ uuid ] ||
				this.nodes[ uuid ] ||
				this.materials[ uuid ] ||
				this.passes[ uuid ] ||
				this.names[ uuid ];

		},

		getNode: function ( uuid ) {

			var object = this.getObjectById( uuid );

			if ( ! object ) {

				console.warn( "Node \"" + uuid + "\" not found." );

			}

			return object;

		},

		resolve: function( json ) {

			switch( typeof json ) {

				case "boolean":
				case "number":

					return json;

				case "string":

					if (/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/i.test(json) || this.library[ json ]) {

						return this.getNode( json );

					}

					return json;

				default:

					if ( Array.isArray( json ) ) {

						for(var i = 0; i < json.length; i++) {

							json[i] = this.resolve( json[i] );

						}

					} else {

						for ( var prop in json ) {

							if (prop === "uuid") continue;

							json[ prop ] = this.resolve( json[ prop ] );

						}

					}

			}

			return json;

		},

		declare: function( json ) {

			var uuid, node, object;

			for ( uuid in json.nodes ) {

				node = json.nodes[ uuid ];

				object = new THREE[ node.nodeType + "Node" ]();

				if ( node.name ) {

					object.name = node.name;

					this.names[ object.name ] = object;

				}

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

			if ( json.material ) this.material = this.materials[ json.material ];

			if ( json.pass ) this.pass = this.passes[ json.pass ];

			return json;

		},

		parse: function ( json ) {

			var uuid;

			json = this.resolve( this.declare( json ) );

			for ( uuid in json.nodes ) {

				this.nodes[ uuid ].copy( json.nodes[ uuid ] );

			}

			for ( uuid in json.materials ) {

				this.materials[ uuid ].copy( json.materials[ uuid ] );

			}

			for ( uuid in json.passes ) {

				this.passes[ uuid ].copy( json.passes[ uuid ] );

			}

			return this.material || this.pass || this;

		}

	} );

	exports.NodeMaterialLoader = NodeMaterialLoader;
	exports.NodeMaterialLoaderUtils = NodeMaterialLoaderUtils;

	return exports;

}({}));
