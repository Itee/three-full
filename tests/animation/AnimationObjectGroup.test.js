var Three = (function (exports) {
	'use strict';

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

			for ( var i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++ i ) {

				bindings[ i ].setValue( array, offset );

			}

		},

		bind: function () {

			var bindings = this._bindings;

			for ( var i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++ i ) {

				bindings[ i ].bind();

			}

		},

		unbind: function () {

			var bindings = this._bindings;

			for ( var i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++ i ) {

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
	function AnimationObjectGroup() {

		this.uuid = _Math.generateUUID();

		// cached objects followed by the active ones
		this._objects = Array.prototype.slice.call( arguments );

		this.nCachedObjects_ = 0; // threshold
		// note: read by PropertyBinding.Composite

		var indices = {};
		this._indicesByUUID = indices; // for bookkeeping

		for ( var i = 0, n = arguments.length; i !== n; ++ i ) {

			indices[ arguments[ i ].uuid ] = i;

		}

		this._paths = []; // inside: string
		this._parsedPaths = []; // inside: { we don't care, here }
		this._bindings = []; // inside: Array< PropertyBinding >
		this._bindingsIndicesByPath = {}; // inside: indices in these arrays

		var scope = this;

		this.stats = {

			objects: {
				get total() {

					return scope._objects.length;

				},
				get inUse() {

					return this.total - scope.nCachedObjects_;

				}
			},
			get bindingsPerObject() {

				return scope._bindings.length;

			}

		};

	}

	Object.assign( AnimationObjectGroup.prototype, {

		isAnimationObjectGroup: true,

		add: function () {

			var objects = this._objects,
				nObjects = objects.length,
				nCachedObjects = this.nCachedObjects_,
				indicesByUUID = this._indicesByUUID,
				paths = this._paths,
				parsedPaths = this._parsedPaths,
				bindings = this._bindings,
				nBindings = bindings.length,
				knownObject = undefined;

			for ( var i = 0, n = arguments.length; i !== n; ++ i ) {

				var object = arguments[ i ],
					uuid = object.uuid,
					index = indicesByUUID[ uuid ];

				if ( index === undefined ) {

					// unknown object -> add it to the ACTIVE region

					index = nObjects ++;
					indicesByUUID[ uuid ] = index;
					objects.push( object );

					// accounting is done, now do the same for all bindings

					for ( var j = 0, m = nBindings; j !== m; ++ j ) {

						bindings[ j ].push( new PropertyBinding( object, paths[ j ], parsedPaths[ j ] ) );

					}

				} else if ( index < nCachedObjects ) {

					knownObject = objects[ index ];

					// move existing object to the ACTIVE region

					var firstActiveIndex = -- nCachedObjects,
						lastCachedObject = objects[ firstActiveIndex ];

					indicesByUUID[ lastCachedObject.uuid ] = index;
					objects[ index ] = lastCachedObject;

					indicesByUUID[ uuid ] = firstActiveIndex;
					objects[ firstActiveIndex ] = object;

					// accounting is done, now do the same for all bindings

					for ( var j = 0, m = nBindings; j !== m; ++ j ) {

						var bindingsForPath = bindings[ j ],
							lastCached = bindingsForPath[ firstActiveIndex ],
							binding = bindingsForPath[ index ];

						bindingsForPath[ index ] = lastCached;

						if ( binding === undefined ) {

							// since we do not bother to create new bindings
							// for objects that are cached, the binding may
							// or may not exist

							binding = new PropertyBinding( object, paths[ j ], parsedPaths[ j ] );

						}

						bindingsForPath[ firstActiveIndex ] = binding;

					}

				} else if ( objects[ index ] !== knownObject ) {

					console.error( 'AnimationObjectGroup: Different objects with the same UUID ' +
						'detected. Clean the caches or recreate your infrastructure when reloading scenes.' );

				} // else the object is already where we want it to be

			} // for arguments

			this.nCachedObjects_ = nCachedObjects;

		},

		remove: function () {

			var objects = this._objects,
				nCachedObjects = this.nCachedObjects_,
				indicesByUUID = this._indicesByUUID,
				bindings = this._bindings,
				nBindings = bindings.length;

			for ( var i = 0, n = arguments.length; i !== n; ++ i ) {

				var object = arguments[ i ],
					uuid = object.uuid,
					index = indicesByUUID[ uuid ];

				if ( index !== undefined && index >= nCachedObjects ) {

					// move existing object into the CACHED region

					var lastCachedIndex = nCachedObjects ++,
						firstActiveObject = objects[ lastCachedIndex ];

					indicesByUUID[ firstActiveObject.uuid ] = index;
					objects[ index ] = firstActiveObject;

					indicesByUUID[ uuid ] = lastCachedIndex;
					objects[ lastCachedIndex ] = object;

					// accounting is done, now do the same for all bindings

					for ( var j = 0, m = nBindings; j !== m; ++ j ) {

						var bindingsForPath = bindings[ j ],
							firstActive = bindingsForPath[ lastCachedIndex ],
							binding = bindingsForPath[ index ];

						bindingsForPath[ index ] = firstActive;
						bindingsForPath[ lastCachedIndex ] = binding;

					}

				}

			} // for arguments

			this.nCachedObjects_ = nCachedObjects;

		},

		// remove & forget
		uncache: function () {

			var objects = this._objects,
				nObjects = objects.length,
				nCachedObjects = this.nCachedObjects_,
				indicesByUUID = this._indicesByUUID,
				bindings = this._bindings,
				nBindings = bindings.length;

			for ( var i = 0, n = arguments.length; i !== n; ++ i ) {

				var object = arguments[ i ],
					uuid = object.uuid,
					index = indicesByUUID[ uuid ];

				if ( index !== undefined ) {

					delete indicesByUUID[ uuid ];

					if ( index < nCachedObjects ) {

						// object is cached, shrink the CACHED region

						var firstActiveIndex = -- nCachedObjects,
							lastCachedObject = objects[ firstActiveIndex ],
							lastIndex = -- nObjects,
							lastObject = objects[ lastIndex ];

						// last cached object takes this object's place
						indicesByUUID[ lastCachedObject.uuid ] = index;
						objects[ index ] = lastCachedObject;

						// last object goes to the activated slot and pop
						indicesByUUID[ lastObject.uuid ] = firstActiveIndex;
						objects[ firstActiveIndex ] = lastObject;
						objects.pop();

						// accounting is done, now do the same for all bindings

						for ( var j = 0, m = nBindings; j !== m; ++ j ) {

							var bindingsForPath = bindings[ j ],
								lastCached = bindingsForPath[ firstActiveIndex ],
								last = bindingsForPath[ lastIndex ];

							bindingsForPath[ index ] = lastCached;
							bindingsForPath[ firstActiveIndex ] = last;
							bindingsForPath.pop();

						}

					} else {

						// object is active, just swap with the last and pop

						var lastIndex = -- nObjects,
							lastObject = objects[ lastIndex ];

						indicesByUUID[ lastObject.uuid ] = index;
						objects[ index ] = lastObject;
						objects.pop();

						// accounting is done, now do the same for all bindings

						for ( var j = 0, m = nBindings; j !== m; ++ j ) {

							var bindingsForPath = bindings[ j ];

							bindingsForPath[ index ] = bindingsForPath[ lastIndex ];
							bindingsForPath.pop();

						}

					} // cached or active

				} // if object is known

			} // for arguments

			this.nCachedObjects_ = nCachedObjects;

		},

		// Internal interface used by befriended PropertyBinding.Composite:

		subscribe_: function ( path, parsedPath ) {

			// returns an array of bindings for the given path that is changed
			// according to the contained objects in the group

			var indicesByPath = this._bindingsIndicesByPath,
				index = indicesByPath[ path ],
				bindings = this._bindings;

			if ( index !== undefined ) return bindings[ index ];

			var paths = this._paths,
				parsedPaths = this._parsedPaths,
				objects = this._objects,
				nObjects = objects.length,
				nCachedObjects = this.nCachedObjects_,
				bindingsForPath = new Array( nObjects );

			index = bindings.length;

			indicesByPath[ path ] = index;

			paths.push( path );
			parsedPaths.push( parsedPath );
			bindings.push( bindingsForPath );

			for ( var i = nCachedObjects, n = objects.length; i !== n; ++ i ) {

				var object = objects[ i ];
				bindingsForPath[ i ] = new PropertyBinding( object, path, parsedPath );

			}

			return bindingsForPath;

		},

		unsubscribe_: function ( path ) {

			// tells the group to forget about a property path and no longer
			// update the array previously obtained with 'subscribe_'

			var indicesByPath = this._bindingsIndicesByPath,
				index = indicesByPath[ path ];

			if ( index !== undefined ) {

				var paths = this._paths,
					parsedPaths = this._parsedPaths,
					bindings = this._bindings,
					lastBindingsIndex = bindings.length - 1,
					lastBindings = bindings[ lastBindingsIndex ],
					lastBindingsPath = path[ lastBindingsIndex ];

				indicesByPath[ lastBindingsPath ] = index;

				bindings[ index ] = lastBindings;
				bindings.pop();

				parsedPaths[ index ] = parsedPaths[ lastBindingsIndex ];
				parsedPaths.pop();

				paths[ index ] = paths[ lastBindingsIndex ];
				paths.pop();

			}

		}

	} );

	exports.AnimationObjectGroup = AnimationObjectGroup;

	return exports;

}({}));
