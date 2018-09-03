var Three = (function (exports) {
	'use strict';

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

	function Node( type ) {

		this.uuid = _Math.generateUUID();

		this.name = "";

		this.type = type;

		this.userData = {};

	}

	Node.prototype = {

		constructor: Node,

		isNode: true,

		parse: function ( builder, settings ) {

			settings = settings || {};

			builder.parsing = true;

			this.build( builder.addFlow( settings.slot, settings.cache, settings.context ), 'v4' );

			builder.clearVertexNodeCode();
			builder.clearFragmentNodeCode();

			builder.removeFlow();

			builder.parsing = false;

		},

		parseAndBuildCode: function ( builder, output, settings ) {

			settings = settings || {};

			this.parse( builder, settings );

			return this.buildCode( builder, output, settings );

		},

		buildCode: function ( builder, output, settings ) {

			settings = settings || {};

			var data = { result: this.build( builder.addFlow( settings.slot, settings.cache, settings.context ), output ) };

			data.code = builder.clearNodeCode();

			builder.removeFlow();

			return data;

		},

		build: function ( builder, output, uuid ) {

			output = output || this.getType( builder, output );

			var data = builder.getNodeData( uuid || this );

			if ( builder.parsing ) {

				this.appendDepsNode( builder, data, output );

			}

			if ( builder.nodes.indexOf( this ) === - 1 ) {

				builder.nodes.push( this );

			}

			if ( this.updateFrame !== undefined && builder.updaters.indexOf( this ) === - 1 ) {

				builder.updaters.push( this );

			}

			return this.generate( builder, output, uuid );

		},

		appendDepsNode: function ( builder, data, output ) {

			data.deps = ( data.deps || 0 ) + 1;

			var outputLen = builder.getTypeLength( output );

			if ( outputLen > ( data.outputMax || 0 ) || this.getType( builder, output ) ) {

				data.outputMax = outputLen;
				data.output = output;

			}

		},

		setName: function ( name ) {

			this.name = name;

			return this;

		},

		getName: function ( builder ) {

			return this.name;

		},

		getType: function ( builder, output ) {

			return output === 'sampler2D' || output === 'samplerCube' ? output : this.type;

		},

		getJSONNode: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( ! isRootObject && meta.nodes[ this.uuid ] !== undefined ) {

				return meta.nodes[ this.uuid ];

			}

		},

		copy: function ( source ) {

			if ( source.name !== undefined ) this.name = source.name;

			if ( source.userData !== undefined ) this.userData = JSON.parse( JSON.stringify( source.userData ) );

		},

		createJSONNode: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			var data = {};

			if ( typeof this.nodeType !== "string" ) throw new Error( "Node does not allow serialization." );

			data.uuid = this.uuid;
			data.nodeType = this.nodeType;

			if ( this.name !== "" ) data.name = this.name;

			if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

			if ( ! isRootObject ) {

				meta.nodes[ this.uuid ] = data;

			}

			return data;

		},

		toJSON: function ( meta ) {

			return this.getJSONNode( meta ) || this.createJSONNode( meta );

		}

	};

	function TempNode( type, params ) {

		Node.call( this, type );

		params = params || {};

		this.shared = params.shared !== undefined ? params.shared : true;
		this.unique = params.unique !== undefined ? params.unique : false;

	}

	TempNode.prototype = Object.create( Node.prototype );
	TempNode.prototype.constructor = TempNode;

	TempNode.prototype.build = function ( builder, output, uuid, ns ) {

		output = output || this.getType( builder );

		if ( this.isShared( builder, output ) ) {

			var isUnique = this.isUnique( builder, output );

			if ( isUnique && this.constructor.uuid === undefined ) {

				this.constructor.uuid = _Math.generateUUID();

			}

			uuid = builder.getUuid( uuid || this.getUuid(), ! isUnique );

			var data = builder.getNodeData( uuid ),
				type = data.output || this.getType( builder );

			if ( builder.parsing ) {

				if ( ( data.deps || 0 ) > 0 ) {

					this.appendDepsNode( builder, data, output );

					return this.generate( builder, output, uuid );

				}

				return Node.prototype.build.call( this, builder, output, uuid );

			} else if ( isUnique ) {

				data.name = data.name || Node.prototype.build.call( this, builder, output, uuid );

				return data.name;

			} else if ( ! this.isShared( builder, type ) || ( ! builder.optimize || data.deps == 1 ) ) {

				return Node.prototype.build.call( this, builder, output, uuid );

			}

			uuid = this.getUuid( false );

			var name = this.getTemp( builder, uuid );

			if ( name ) {

				return builder.format( name, type, output );

			} else {

				name = TempNode.prototype.generate.call( this, builder, output, uuid, data.output, ns );

				var code = this.generate( builder, type, uuid );

				builder.addNodeCode( name + ' = ' + code + ';' );

				return builder.format( name, type, output );

			}

		}

		return Node.prototype.build.call( this, builder, output, uuid );

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

		var tempVar = builder.getVars()[ uuid ];

		return tempVar ? tempVar.name : undefined;

	};

	TempNode.prototype.generate = function ( builder, output, uuid, type, ns ) {

		if ( ! this.isShared( builder, output ) ) console.error( "TempNode is not shared!" );

		uuid = uuid || this.uuid;

		return builder.getTempVar( uuid, type || this.getType( builder ), ns ).name;

	};

	function InputNode( type, params ) {

		params = params || {};
		params.shared = params.shared !== undefined ? params.shared : false;

		TempNode.call( this, type, params );

		this.readonly = false;

	}

	InputNode.prototype = Object.create( TempNode.prototype );
	InputNode.prototype.constructor = InputNode;

	InputNode.prototype.isReadonly = function ( builder ) {

		return this.readonly;

	};

	InputNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		if ( source.readonly !== undefined ) this.readonly = source.readonly;

	};

	InputNode.prototype.createJSONNode = function ( meta ) {

		var data = TempNode.prototype.createJSONNode.call( this, meta );

		if ( this.readonly === true ) data.readonly = this.readonly;

		return data;

	};

	InputNode.prototype.generate = function ( builder, output, uuid, type, ns, needsUpdate ) {

		uuid = builder.getUuid( uuid || this.getUuid() );
		type = type || this.getType( builder );

		var data = builder.getNodeData( uuid ),
			readonly = this.isReadonly( builder ) && this.generateReadonly !== undefined;

		if ( readonly ) {

			return this.generateReadonly( builder, output, uuid, type, ns, needsUpdate );

		} else {

			if ( builder.isShader( 'vertex' ) ) {

				if ( ! data.vertex ) {

					data.vertex = builder.createVertexUniform( type, this, ns, needsUpdate );

				}

				return builder.format( data.vertex.name, type, output );

			} else {

				if ( ! data.fragment ) {

					data.fragment = builder.createFragmentUniform( type, this, ns, needsUpdate );

				}

				return builder.format( data.fragment.name, type, output );

			}

		}

	};

	var NodeUtils = {

		elements: [ 'x', 'y', 'z', 'w' ],

		addShortcuts: function () {

			function applyShortcut( proxy, property, subProperty ) {

				if ( subProperty ) {

					return {

						get: function () {

							return this[ proxy ][ property ][ subProperty ];

						},

						set: function ( val ) {

							this[ proxy ][ property ][ subProperty ] = val;

						}

					};

				} else {

					return {

						get: function () {

							return this[ proxy ][ property ];

						},

						set: function ( val ) {

							this[ proxy ][ property ] = val;

						}

					};

				}

			}

			return function addShortcuts( proto, proxy, list ) {

				var shortcuts = {};

				for ( var i = 0; i < list.length; ++ i ) {

					var data = list[ i ].split( "." ),
						property = data[ 0 ],
						subProperty = data[ 1 ];

					shortcuts[ property ] = applyShortcut( proxy, property, subProperty );

				}

				Object.defineProperties( proto, shortcuts );

			};

		}()

	};

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

	function NodeUniform( params ) {

		params = params || {};

		this.name = params.name;
		this.type = params.type;
		this.node = params.node;
		this.needsUpdate = params.needsUpdate;

	}

	Object.defineProperties( NodeUniform.prototype, {

		value: {

			get: function () {

				return this.node.value;

			},

			set: function ( val ) {

				this.node.value = val;

			}

		}

	} );

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

	var vertexDict = [ 'uv', 'uv2' ],
		fragmentDict = [ 'vUv', 'vUv2' ];

	function UVNode( index ) {

		TempNode.call( this, 'v2', { shared: false } );

		this.index = index || 0;

	}

	UVNode.prototype = Object.create( TempNode.prototype );
	UVNode.prototype.constructor = UVNode;
	UVNode.prototype.nodeType = "UV";

	UVNode.prototype.generate = function ( builder, output ) {

		builder.requires.uv[ this.index ] = true;

		var result = builder.isShader( 'vertex' ) ? vertexDict[ this.index ] : fragmentDict[ this.index ];

		return builder.format( result, this.getType( builder ), output );

	};

	UVNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.index = source.index;

	};

	UVNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.index = this.index;

		}

		return data;

	};

	NodeLib.addKeyword( 'uv', function () {

		return new UVNode();

	} );

	NodeLib.addKeyword( 'uv2', function () {

		return new UVNode( 1 );

	} );

	function PositionNode( scope ) {

		TempNode.call( this, 'v3' );

		this.scope = scope || PositionNode.LOCAL;

	}

	PositionNode.LOCAL = 'local';
	PositionNode.WORLD = 'world';
	PositionNode.VIEW = 'view';
	PositionNode.PROJECTION = 'projection';

	PositionNode.prototype = Object.create( TempNode.prototype );
	PositionNode.prototype.constructor = PositionNode;
	PositionNode.prototype.nodeType = "Position";

	PositionNode.prototype.getType = function ( ) {

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

		var result;

		switch ( this.scope ) {

			case PositionNode.LOCAL:

				builder.requires.position = true;

				result = builder.isShader( 'vertex' ) ? 'transformed' : 'vPosition';

				break;

			case PositionNode.WORLD:

				builder.requires.worldPosition = true;

				result = 'vWPosition';

				break;

			case PositionNode.VIEW:

				result = builder.isShader( 'vertex' ) ? '-mvPosition.xyz' : 'vViewPosition';

				break;

			case PositionNode.PROJECTION:

				result = builder.isShader( 'vertex' ) ? '( projectionMatrix * modelViewMatrix * vec4( position, 1.0 ) )' : 'vec4( 0.0 )';

				break;

		}

		return builder.format( result, this.getType( builder ), output );

	};

	PositionNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.scope = source.scope;

	};

	PositionNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	NodeLib.addKeyword( 'position', function () {

		return new PositionNode();

	} );

	NodeLib.addKeyword( 'worldPosition', function () {

		return new PositionNode( PositionNode.WORLD );

	} );

	NodeLib.addKeyword( 'viewPosition', function () {

		return new PositionNode( NormalNode.VIEW );

	} );

	function NormalNode$1( scope ) {

		TempNode.call( this, 'v3' );

		this.scope = scope || NormalNode$1.LOCAL;

	}

	NormalNode$1.LOCAL = 'local';
	NormalNode$1.WORLD = 'world';
	NormalNode$1.VIEW = 'view';

	NormalNode$1.prototype = Object.create( TempNode.prototype );
	NormalNode$1.prototype.constructor = NormalNode$1;
	NormalNode$1.prototype.nodeType = "Normal";

	NormalNode$1.prototype.isShared = function ( builder ) {

		switch ( this.scope ) {

			case NormalNode$1.WORLD:

				return true;

		}

		return false;

	};

	NormalNode$1.prototype.generate = function ( builder, output ) {

		var result;

		switch ( this.scope ) {

			case NormalNode$1.LOCAL:

				builder.requires.normal = true;

				result = 'normal';

				break;

			case NormalNode$1.WORLD:

				builder.requires.worldNormal = true;

				result = builder.isShader( 'vertex' ) ? '( modelMatrix * vec4( objectNormal, 0.0 ) ).xyz' : 'vWNormal';

				break;

			case NormalNode$1.VIEW:

				result = 'vNormal';

				break;

		}

		return builder.format( result, this.getType( builder ), output );

	};

	NormalNode$1.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.scope = source.scope;

	};

	NormalNode$1.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	NodeLib.addKeyword( 'normal', function () {

		return new NormalNode$1();

	} );

	NodeLib.addKeyword( 'worldNormal', function () {

		return new NormalNode$1( NormalNode$1.WORLD );

	} );

	NodeLib.addKeyword( 'viewNormal', function () {

		return new NormalNode$1( NormalNode$1.VIEW );

	} );

	function FloatNode( value ) {

		InputNode.call( this, 'f' );

		this.value = value || 0;

	}

	FloatNode.prototype = Object.create( InputNode.prototype );
	FloatNode.prototype.constructor = FloatNode;
	FloatNode.prototype.nodeType = "Float";

	FloatNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( this.value + ( this.value % 1 ? '' : '.0' ), type, output );

	};

	FloatNode.prototype.copy = function ( source ) {

		InputNode.prototype.copy.call( this, source );

		this.value = source.value;

	};

	FloatNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	function TimerNode( scale, scope, timeScale ) {

		FloatNode.call( this );

		this.scale = scale !== undefined ? scale : 1;
		this.scope = scope || TimerNode.GLOBAL;

		this.timeScale = timeScale !== undefined ? timeScale : this.scale !== 1;

	}

	TimerNode.GLOBAL = 'global';
	TimerNode.LOCAL = 'local';
	TimerNode.DELTA = 'delta';

	TimerNode.prototype = Object.create( FloatNode.prototype );
	TimerNode.prototype.constructor = TimerNode;
	TimerNode.prototype.nodeType = "Timer";

	TimerNode.prototype.isReadonly = function () {

		// never use TimerNode as readonly but aways as "uniform"

		return false;

	};

	TimerNode.prototype.isUnique = function () {

		// share TimerNode "uniform" input if is used on more time with others TimerNode

		return this.timeScale && ( this.scope === TimerNode.GLOBAL || this.scope === TimerNode.DELTA );

	};

	TimerNode.prototype.updateFrame = function ( frame ) {

		var scale = this.timeScale ? this.scale : 1;

		switch ( this.scope ) {

			case TimerNode.LOCAL:

				this.value += frame.delta * scale;

				break;

			case TimerNode.DELTA:

				this.value = frame.delta * scale;

				break;

			default:

				this.value = frame.time * scale;

		}

	};

	TimerNode.prototype.copy = function ( source ) {

		FloatNode.prototype.copy.call( this, source );

		this.scope = source.scope;
		this.scale = source.scale;

		this.timeScale = source.timeScale;

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

	NodeLib.addKeyword( 'time', function () {

		return new TimerNode();

	} );

	var declarationRegexp = /^([a-z_0-9]+)\s([a-z_0-9]+)\s?\=?\s?(.*?)(\;|$)/i;

	function ConstNode( src, useDefine ) {

		TempNode.call( this );

		this.eval( src || ConstNode.PI, useDefine );

	}

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

		this.src = src || '';

		var name, type, value = "";

		var match = this.src.match( declarationRegexp );

		this.useDefine = useDefine || this.src.charAt( 0 ) === '#';

		if ( match && match.length > 1 ) {

			type = match[ 1 ];
			name = match[ 2 ];
			value = match[ 3 ];

		} else {

			name = this.src;
			type = 'f';

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

			} else if ( this.useDefine ) {

				return this.src;

			}

		} else {

			builder.include( this );

			return builder.format( this.name, this.getType( builder ), output );

		}

	};

	ConstNode.prototype.generate = function ( builder, output ) {

		return builder.format( this.name, this.getType( builder ), output );

	};

	ConstNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.eval( source.src, source.useDefine );

	};

	ConstNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.src = this.src;

			if ( data.useDefine === true ) data.useDefine = true;

		}

		return data;

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
	FunctionNode.prototype.nodeType = "Function";

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

		return new NormalNode$1();

	} );

	NodeLib.addKeyword( 'worldNormal', function() {

		return new NormalNode$1( NormalNode$1.WORLD );

	} );

	NodeLib.addKeyword( 'viewPosition', function() {

		return new PositionNode( NormalNode$1.VIEW );

	} );

	NodeLib.addKeyword( 'viewNormal', function() {

		return new NormalNode$1( NormalNode$1.VIEW );

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

	var declarationRegexp$1 = /^struct\s*([a-z_0-9]+)\s*{\s*((.|\n)*?)}/img,
		propertiesRegexp = /\s*(\w*?)\s*(\w*?)(\=|\;)/img;

	function StructNode( src ) {

		TempNode.call( this );

		this.eval( src );

	}

	StructNode.prototype = Object.create( TempNode.prototype );
	StructNode.prototype.constructor = StructNode;
	StructNode.prototype.nodeType = "Struct";

	StructNode.prototype.getType = function ( builder ) {

		return builder.getTypeByFormat( this.name );

	};

	StructNode.prototype.getInputByName = function ( name ) {

		var i = this.inputs.length;

		while ( i -- ) {

			if ( this.inputs[ i ].name === name ) {

				return this.inputs[ i ];

			}

		}

	};

	StructNode.prototype.generate = function ( builder, output ) {

		if ( output === 'source' ) {

			return this.src + ';';

		} else {

			return builder.format( '( ' + src + ' )', this.getType( builder ), output );

		}

	};

	StructNode.prototype.eval = function ( src ) {

		this.src = src || '';

		this.inputs = [];

		var declaration = declarationRegexp$1.exec( this.src );

		if ( declaration ) {

			var properties = declaration[ 2 ], match;

			while ( match = propertiesRegexp.exec( properties ) ) {

				this.inputs.push( {
					type: match[ 1 ],
					name: match[ 2 ]
				} );

			}

			this.name = declaration[ 1 ];

		} else {

			this.name = '';

		}

		this.type = this.name;

	};

	StructNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.src = this.src;

		}

		return data;

	};

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

	function Vector2Node( x, y ) {

		InputNode.call( this, 'v2' );

		this.value = x instanceof Vector2 ? x : new Vector2( x, y );

	}

	Vector2Node.prototype = Object.create( InputNode.prototype );
	Vector2Node.prototype.constructor = Vector2Node;
	Vector2Node.prototype.nodeType = "Vector2";

	NodeUtils.addShortcuts( Vector2Node.prototype, 'value', [ 'x', 'y' ] );

	Vector2Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "vec2( " + this.x + ", " + this.y + " )", type, output );

	};

	Vector2Node.prototype.copy = function ( source ) {

		InputNode.prototype.copy.call( this, source );

		this.value.copy( source );

	};

	Vector2Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.x = this.x;
			data.y = this.y;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

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

	function Vector3Node( x, y, z ) {

		InputNode.call( this, 'v3' );

		this.value = x instanceof Vector3 ? x : new Vector3( x, y, z );

	}

	Vector3Node.prototype = Object.create( InputNode.prototype );
	Vector3Node.prototype.constructor = Vector3Node;
	Vector3Node.prototype.nodeType = "Vector3";

	NodeUtils.addShortcuts( Vector3Node.prototype, 'value', [ 'x', 'y', 'z' ] );

	Vector3Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "vec3( " + this.x + ", " + this.y + ", " + this.z + " )", type, output );

	};

	Vector3Node.prototype.copy = function ( source ) {

		InputNode.prototype.copy.call( this, source );

		this.value.copy( source );

	};

	Vector3Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.x = this.x;
			data.y = this.y;
			data.z = this.z;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	var FrontSide = 0;
	var FlatShading = 1;
	var NoColors = 0;
	var NormalBlending = 1;
	var AddEquation = 100;
	var SrcAlphaFactor = 204;
	var OneMinusSrcAlphaFactor = 205;
	var LessEqualDepth = 3;
	var CubeReflectionMapping = 301;
	var CubeRefractionMapping = 302;
	var CubeUVReflectionMapping = 306;
	var CubeUVRefractionMapping = 307;
	var LinearEncoding = 3000;
	var sRGBEncoding = 3001;
	var GammaEncoding = 3007;
	var RGBEEncoding = 3002;
	var RGBM7Encoding = 3004;
	var RGBM16Encoding = 3005;
	var RGBDEncoding = 3006;

	function ColorSpaceNode( input, method ) {

		TempNode.call( this, 'v4' );

		this.input = input;

		this.method = method || ColorSpaceNode.LINEAR;

	}

	ColorSpaceNode.Nodes = ( function () {

		// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/

		var LinearToLinear = new FunctionNode( [
			"vec4 LinearToLinear( in vec4 value ) {",

			"	return value;",

			"}"
		].join( "\n" ) );

		var GammaToLinear = new FunctionNode( [
			"vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {",

			"	return vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );",

			"}"
		].join( "\n" ) );

		var LinearToGamma = new FunctionNode( [
			"vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {",

			"	return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );",

			"}"
		].join( "\n" ) );

		var sRGBToLinear = new FunctionNode( [
			"vec4 sRGBToLinear( in vec4 value ) {",

			"	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );",

			"}"
		].join( "\n" ) );

		var LinearTosRGB = new FunctionNode( [
			"vec4 LinearTosRGB( in vec4 value ) {",

			"	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );",

			"}"
		].join( "\n" ) );

		var RGBEToLinear = new FunctionNode( [
			"vec4 RGBEToLinear( in vec4 value ) {",

			"	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );",

			"}"
		].join( "\n" ) );

		var LinearToRGBE = new FunctionNode( [
			"vec4 LinearToRGBE( in vec4 value ) {",

			"	float maxComponent = max( max( value.r, value.g ), value.b );",
			"	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );",
			"	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );",
			//  return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );

			"}"
		].join( "\n" ) );

		// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html

		var RGBMToLinear = new FunctionNode( [
			"vec3 RGBMToLinear( in vec4 value, in float maxRange ) {",

			"	return vec4( value.xyz * value.w * maxRange, 1.0 );",

			"}"
		].join( "\n" ) );

		var LinearToRGBM = new FunctionNode( [
			"vec3 LinearToRGBM( in vec4 value, in float maxRange ) {",

			"	float maxRGB = max( value.x, max( value.g, value.b ) );",
			"	float M      = clamp( maxRGB / maxRange, 0.0, 1.0 );",
			"	M            = ceil( M * 255.0 ) / 255.0;",
			"	return vec4( value.rgb / ( M * maxRange ), M );",

			"}"
		].join( "\n" ) );

		// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html

		var RGBDToLinear = new FunctionNode( [
			"vec3 RGBDToLinear( in vec4 value, in float maxRange ) {",

			"	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );",

			"}"
		].join( "\n" ) );


		var LinearToRGBD = new FunctionNode( [
			"vec3 LinearToRGBD( in vec4 value, in float maxRange ) {",

			"	float maxRGB = max( value.x, max( value.g, value.b ) );",
			"	float D      = max( maxRange / maxRGB, 1.0 );",
			"	D            = min( floor( D ) / 255.0, 1.0 );",
			"	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );",

			"}"
		].join( "\n" ) );

		// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html

		// M matrix, for encoding

		var cLogLuvM = new ConstNode( "const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );" );

		var LinearToLogLuv = new FunctionNode( [
			"vec4 LinearToLogLuv( in vec4 value ) {",

			"	vec3 Xp_Y_XYZp = value.rgb * cLogLuvM;",
			"	Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));",
			"	vec4 vResult;",
			"	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;",
			"	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;",
			"	vResult.w = fract(Le);",
			"	vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;",
			"	return vResult;",

			"}"
		].join( "\n" ), [ cLogLuvM ] );

		// Inverse M matrix, for decoding

		var cLogLuvInverseM = new ConstNode( "const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );" );

		var LogLuvToLinear = new FunctionNode( [
			"vec4 LogLuvToLinear( in vec4 value ) {",

			"	float Le = value.z * 255.0 + value.w;",
			"	vec3 Xp_Y_XYZp;",
			"	Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);",
			"	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;",
			"	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;",
			"	vec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;",
			"	return vec4( max(vRGB, 0.0), 1.0 );",

			"}"
		].join( "\n" ), [ cLogLuvInverseM ] );

		return {
			LinearToLinear: LinearToLinear,
			GammaToLinear: GammaToLinear,
			LinearToGamma: LinearToGamma,
			sRGBToLinear: sRGBToLinear,
			LinearTosRGB: LinearTosRGB,
			RGBEToLinear: RGBEToLinear,
			LinearToRGBE: LinearToRGBE,
			RGBMToLinear: RGBMToLinear,
			LinearToRGBM: LinearToRGBM,
			RGBDToLinear: RGBDToLinear,
			LinearToRGBD: LinearToRGBD,
			cLogLuvM: cLogLuvM,
			LinearToLogLuv: LinearToLogLuv,
			cLogLuvInverseM: cLogLuvInverseM,
			LogLuvToLinear: LogLuvToLinear
		};

	} )();

	ColorSpaceNode.LINEAR_TO_LINEAR = 'LinearToLinear';

	ColorSpaceNode.GAMMA_TO_LINEAR = 'GammaToLinear';
	ColorSpaceNode.LINEAR_TO_GAMMA = 'LinearToGamma';

	ColorSpaceNode.SRGB_TO_LINEAR = 'sRGBToLinear';
	ColorSpaceNode.LINEAR_TO_SRGB = 'LinearTosRGB';

	ColorSpaceNode.RGBE_TO_LINEAR = 'RGBEToLinear';
	ColorSpaceNode.LINEAR_TO_RGBE = 'LinearToRGBE';

	ColorSpaceNode.RGBM_TO_LINEAR = 'RGBMToLinear';
	ColorSpaceNode.LINEAR_TO_RGBM = 'LinearToRGBM';

	ColorSpaceNode.RGBD_TO_LINEAR = 'RGBDToLinear';
	ColorSpaceNode.LINEAR_TO_RGBD = 'LinearToRGBD';

	ColorSpaceNode.LINEAR_TO_LOG_LUV = 'LinearToLogLuv';
	ColorSpaceNode.LOG_LUV_TO_LINEAR = 'LogLuvToLinear';

	ColorSpaceNode.prototype = Object.create( TempNode.prototype );
	ColorSpaceNode.prototype.constructor = ColorSpaceNode;
	ColorSpaceNode.prototype.nodeType = "ColorAdjustment";

	ColorSpaceNode.prototype.generate = function ( builder, output ) {

		var input = builder.context.input || this.input.build( builder, 'v4' ),
			encodingMethod = builder.context.encoding !== undefined ? this.getEncodingMethod( builder.context.encoding ) : [ this.method ],
			factor = this.factor ? this.factor.build( builder, 'f' ) : encodingMethod[ 1 ];

		var method = builder.include( ColorSpaceNode.Nodes[ encodingMethod[ 0 ] ] );

		if ( factor ) {

			return builder.format( method + '( ' + input + ', ' + factor + ' )', this.getType( builder ), output );

		} else {

			return builder.format( method + '( ' + input + ' )', this.getType( builder ), output );

		}

	};

	ColorSpaceNode.prototype.getDecodingMethod = function ( encoding ) {

		var components = this.getEncodingComponents( encoding );

		components[ 0 ] += 'ToLinear';

		return components;

	};

	ColorSpaceNode.prototype.getEncodingMethod = function ( encoding ) {

		var components = this.getEncodingComponents( encoding );

		components[ 0 ] = 'LinearTo' + components[ 0 ];

		return components;

	};

	ColorSpaceNode.prototype.getEncodingComponents = function ( encoding ) {

		switch ( encoding ) {

			case LinearEncoding:
				return [ 'Linear' ];
			case sRGBEncoding:
				return [ 'sRGB' ];
			case RGBEEncoding:
				return [ 'RGBE' ];
			case RGBM7Encoding:
				return [ 'RGBM', '7.0' ];
			case RGBM16Encoding:
				return [ 'RGBM', '16.0' ];
			case RGBDEncoding:
				return [ 'RGBD', '256.0' ];
			case GammaEncoding:
				return [ 'Gamma', 'float( GAMMA_FACTOR )' ];

		}

	};

	ColorSpaceNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.input = source.input;
		this.method = source.method;

	};

	ColorSpaceNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.input = this.input.toJSON( meta ).uuid;
			data.method = this.method;

		}

		return data;

	};

	function TextureNode( value, uv, bias, project ) {

		InputNode.call( this, 'v4', { shared: true } );

		this.value = value;
		this.uv = uv || new UVNode();
		this.bias = bias;
		this.project = project !== undefined ? project : false;

	}

	TextureNode.prototype = Object.create( InputNode.prototype );
	TextureNode.prototype.constructor = TextureNode;
	TextureNode.prototype.nodeType = "Texture";

	TextureNode.prototype.getTexture = function ( builder, output ) {

		return InputNode.prototype.generate.call( this, builder, output, this.value.uuid, 't' );

	};

	TextureNode.prototype.generate = function ( builder, output ) {

		if ( output === 'sampler2D' ) {

			return this.getTexture( builder, output );

		}

		var tex = this.getTexture( builder, output ),
			uv = this.uv.build( builder, this.project ? 'v4' : 'v2' ),
			bias = this.bias ? this.bias.build( builder, 'f' ) : undefined;

		if ( bias == undefined && builder.context.bias ) {

			bias = new builder.context.bias( this ).build( builder, 'f' );

		}

		var method, code;

		if ( this.project ) method = 'texture2DProj';
		else method = bias ? 'tex2DBias' : 'tex2D';

		if ( bias ) code = method + '( ' + tex + ', ' + uv + ', ' + bias + ' )';
		else code = method + '( ' + tex + ', ' + uv + ' )';

		// add this context to replace ColorSpaceNode.input to code

		builder.addContext( { input: code, encoding: builder.getTextureEncodingFromMap( this.value ), include: builder.isShader( 'vertex' ) } );

		this.colorSpace = this.colorSpace || new ColorSpaceNode( this );
		code = this.colorSpace.build( builder, this.type );

		builder.removeContext();

		return builder.format( code, this.type, output );

	};

	TextureNode.prototype.copy = function ( source ) {

		InputNode.prototype.copy.call( this, source );

		if ( source.value ) this.value = source.value;

		this.uv = source.uv;

		if ( source.bias ) this.bias = source.bias;
		if ( source.project !== undefined ) this.project = source.project;

	};

	TextureNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			if ( this.value ) data.value = this.value.uuid;

			data.uv = this.uv.toJSON( meta ).uuid;
			data.project = this.project;

			if ( this.bias ) data.bias = this.bias.toJSON( meta ).uuid;

		}

		return data;

	};

	function ReflectNode( scope ) {

		TempNode.call( this, 'v3', { unique: true } );

		this.scope = scope || ReflectNode.CUBE;

	}

	ReflectNode.CUBE = 'cube';
	ReflectNode.SPHERE = 'sphere';
	ReflectNode.VECTOR = 'vector';

	ReflectNode.prototype = Object.create( TempNode.prototype );
	ReflectNode.prototype.constructor = ReflectNode;
	ReflectNode.prototype.nodeType = "Reflect";

	ReflectNode.prototype.getType = function ( builder ) {

		switch ( this.scope ) {

			case ReflectNode.SPHERE:

				return 'v2';

		}

		return this.type;

	};

	ReflectNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var result;

			switch ( this.scope ) {

				case ReflectNode.VECTOR:

					builder.addNodeCode( 'vec3 reflectVec = inverseTransformDirection( reflect( -normalize( vViewPosition ), normal ), viewMatrix );' );

					result = 'reflectVec';

					break;

				case ReflectNode.CUBE:

					var reflectVec = new ReflectNode( ReflectNode.VECTOR ).build( builder, 'v3' );

					builder.addNodeCode( 'vec3 reflectCubeVec = vec3( -1.0 * ' + reflectVec + '.x, ' + reflectVec + '.yz );' );

					result = 'reflectCubeVec';

					break;

				case ReflectNode.SPHERE:

					var reflectVec = new ReflectNode( ReflectNode.VECTOR ).build( builder, 'v3' );

					builder.addNodeCode( 'vec2 reflectSphereVec = normalize( ( viewMatrix * vec4( ' + reflectVec + ', 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) ).xy * 0.5 + 0.5;' );

					result = 'reflectSphereVec';

					break;

			}

			return builder.format( result, this.getType( builder ), output );

		} else {

			console.warn( "ReflectNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec3( 0.0 )', this.type, output );

		}

	};

	ReflectNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	function CubeTextureNode( value, uv, bias ) {

		InputNode.call( this, 'v4', { shared: true } );

		this.value = value;
		this.uv = uv || new ReflectNode();
		this.bias = bias;

	}

	CubeTextureNode.prototype = Object.create( InputNode.prototype );
	CubeTextureNode.prototype.constructor = CubeTextureNode;
	CubeTextureNode.prototype.nodeType = "CubeTexture";

	CubeTextureNode.prototype.getTexture = function ( builder, output ) {

		return InputNode.prototype.generate.call( this, builder, output, this.value.uuid, 'tc' );

	};

	CubeTextureNode.prototype.generate = function ( builder, output ) {

		if ( output === 'samplerCube' ) {

			return this.getTexture( builder, output );

		}

		var cubetex = this.getTexture( builder, output );
		var uv = this.uv.build( builder, 'v3' );
		var bias = this.bias ? this.bias.build( builder, 'f' ) : undefined;

		if ( bias === undefined && builder.context.bias ) {

			bias = new builder.context.bias( this ).build( builder, 'f' );

		}

		var code;

		if ( bias ) code = 'texCubeBias( ' + cubetex + ', ' + uv + ', ' + bias + ' )';
		else code = 'texCube( ' + cubetex + ', ' + uv + ' )';

		// add this context to replace ColorSpaceNode.input to code

		builder.addContext( { input: code, encoding: builder.getTextureEncodingFromMap( this.value ), include: builder.isShader( 'vertex' ) } );

		this.colorSpace = this.colorSpace || new ColorSpaceNode( this );
		code = this.colorSpace.build( builder, this.type );

		builder.removeContext();

		return builder.format( code, this.type, output );

	};

	CubeTextureNode.prototype.copy = function ( source ) {

		InputNode.prototype.copy.call( this, source );

		if ( source.value ) this.value = source.value;

		this.uv = source.uv;

		if ( source.bias ) this.bias = source.bias;

	};

	CubeTextureNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.uuid;
			data.uv = this.uv.toJSON( meta ).uuid;

			if ( this.bias ) data.bias = this.bias.toJSON( meta ).uuid;

		}

		return data;

	};

	function BlinnShininessExponentNode() {

		TempNode.call( this, 'f' );

	}

	BlinnShininessExponentNode.prototype = Object.create( TempNode.prototype );
	BlinnShininessExponentNode.prototype.constructor = BlinnShininessExponentNode;
	BlinnShininessExponentNode.prototype.nodeType = "BlinnShininessExponent";

	BlinnShininessExponentNode.prototype.generate = function ( builder, output ) {

		if ( builder.isCache( 'clearCoat' ) ) {

			return builder.format( 'Material_ClearCoat_BlinnShininessExponent( material )', this.type, output );

		} else {

			return builder.format( 'Material_BlinnShininessExponent( material )', this.type, output );

		}

	};

	function BlinnExponentToRoughnessNode( blinnExponent ) {

		TempNode.call( this, 'f' );

		this.blinnExponent = blinnExponent || new BlinnShininessExponentNode();

	}

	BlinnExponentToRoughnessNode.prototype = Object.create( TempNode.prototype );
	BlinnExponentToRoughnessNode.prototype.constructor = BlinnExponentToRoughnessNode;
	BlinnExponentToRoughnessNode.prototype.nodeType = "BlinnExponentToRoughness";

	BlinnExponentToRoughnessNode.prototype.generate = function ( builder, output ) {

		return builder.format( 'BlinnExponentToGGXRoughness( ' + this.blinnExponent.build( builder, 'f' ) + ' )', this.type, output );

	};

	BlinnExponentToRoughnessNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.blinnExponent = source.blinnExponent;

	};

	BlinnExponentToRoughnessNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.blinnExponent = this.blinnExponent;

		}

		return data;

	};

	function TextureCubeUVNode( uv, textureSize, blinnExponentToRoughness ) {

		TempNode.call( this, 'TextureCubeUVData' ); // TextureCubeUVData is type as StructNode

		this.uv = uv || new ReflectNode( ReflectNode.VECTOR );
		this.textureSize = textureSize || new FloatNode( 1024 );
		this.blinnExponentToRoughness = blinnExponentToRoughness || new BlinnExponentToRoughnessNode();

	}

	TextureCubeUVNode.Nodes = ( function () {

		var TextureCubeUVData = new StructNode( [
			"struct TextureCubeUVData {",
			"	vec2 uv_10;",
			"	vec2 uv_20;",
			"	float t;",
			"}"
		].join( "\n" ) );

		var getFaceFromDirection = new FunctionNode( [
			"int getFaceFromDirection(vec3 direction) {",
			"	vec3 absDirection = abs(direction);",
			"	int face = -1;",
			"	if( absDirection.x > absDirection.z ) {",
			"		if(absDirection.x > absDirection.y )",
			"			face = direction.x > 0.0 ? 0 : 3;",
			"		else",
			"			face = direction.y > 0.0 ? 1 : 4;",
			"	}",
			"	else {",
			"		if(absDirection.z > absDirection.y )",
			"			face = direction.z > 0.0 ? 2 : 5;",
			"		else",
			"			face = direction.y > 0.0 ? 1 : 4;",
			"	}",
			"	return face;",
			"}"
		].join( "\n" ) );

		var cubeUV_maxLods1 = new ConstNode( "#define cubeUV_maxLods1 ( log2( cubeUV_textureSize * 0.25 ) - 1.0 )" );
		var cubeUV_rangeClamp = new ConstNode( "#define cubeUV_rangeClamp ( exp2( ( 6.0 - 1.0 ) * 2.0 ) )" );

		var MipLevelInfo = new FunctionNode( [
			"vec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness, in float cubeUV_textureSize ) {",
			"	float scale = exp2(cubeUV_maxLods1 - roughnessLevel);",
			"	float dxRoughness = dFdx(roughness);",
			"	float dyRoughness = dFdy(roughness);",
			"	vec3 dx = dFdx( vec * scale * dxRoughness );",
			"	vec3 dy = dFdy( vec * scale * dyRoughness );",
			"	float d = max( dot( dx, dx ), dot( dy, dy ) );",
			// Clamp the value to the max mip level counts. hard coded to 6 mips"
			"	d = clamp(d, 1.0, cubeUV_rangeClamp);",
			"	float mipLevel = 0.5 * log2(d);",
			"	return vec2(floor(mipLevel), fract(mipLevel));",
			"}"
		].join( "\n" ), [ cubeUV_maxLods1, cubeUV_rangeClamp ], { derivatives: true } );

		var cubeUV_maxLods2 = new ConstNode( "#define cubeUV_maxLods2 ( log2( cubeUV_textureSize * 0.25 ) - 2.0 )" );
		var cubeUV_rcpTextureSize = new ConstNode( "#define cubeUV_rcpTextureSize ( 1.0 / cubeUV_textureSize )" );

		var getCubeUV = new FunctionNode( [
			"vec2 getCubeUV( vec3 direction, float roughnessLevel, float mipLevel, in float cubeUV_textureSize ) {",
			"	mipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;",
			"	float a = 16.0 * cubeUV_rcpTextureSize;",
			"",
			"	vec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );",
			"	vec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;",
			// float powScale = exp2(roughnessLevel + mipLevel);"
			"	float powScale = exp2_packed.x * exp2_packed.y;",
			// float scale =  1.0 / exp2(roughnessLevel + 2.0 + mipLevel);"
			"	float scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;",
			// float mipOffset = 0.75*(1.0 - 1.0/exp2(mipLevel))/exp2(roughnessLevel);"
			"	float mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;",
			"",
			"	bool bRes = mipLevel == 0.0;",
			"	scale =  bRes && (scale < a) ? a : scale;",
			"",
			"	vec3 r;",
			"	vec2 offset;",
			"	int face = getFaceFromDirection(direction);",
			"",
			"	float rcpPowScale = 1.0 / powScale;",
			"",
			"	if( face == 0) {",
			"		r = vec3(direction.x, -direction.z, direction.y);",
			"		offset = vec2(0.0+mipOffset,0.75 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;",
			"	}",
			"	else if( face == 1) {",
			"		r = vec3(direction.y, direction.x, direction.z);",
			"		offset = vec2(scale+mipOffset, 0.75 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;",
			"	}",
			"	else if( face == 2) {",
			"		r = vec3(direction.z, direction.x, direction.y);",
			"		offset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;",
			"	}",
			"	else if( face == 3) {",
			"		r = vec3(direction.x, direction.z, direction.y);",
			"		offset = vec2(0.0+mipOffset,0.5 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;",
			"	}",
			"	else if( face == 4) {",
			"		r = vec3(direction.y, direction.x, -direction.z);",
			"		offset = vec2(scale+mipOffset, 0.5 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;",
			"	}",
			"	else {",
			"		r = vec3(direction.z, -direction.x, direction.y);",
			"		offset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;",
			"	}",
			"	r = normalize(r);",
			"	float texelOffset = 0.5 * cubeUV_rcpTextureSize;",
			"	vec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;",
			"	vec2 base = offset + vec2( texelOffset );",
			"	return base + s * ( scale - 2.0 * texelOffset );",
			"}"
		].join( "\n" ), [ cubeUV_maxLods2, cubeUV_rcpTextureSize, getFaceFromDirection ] );

		var cubeUV_maxLods3 = new ConstNode( "#define cubeUV_maxLods3 ( log2( cubeUV_textureSize * 0.25 ) - 3.0 )" );

		var textureCubeUV = new FunctionNode( [
			"TextureCubeUVData textureCubeUV( vec3 reflectedDirection, float roughness, in float cubeUV_textureSize ) {",
			"	float roughnessVal = roughness * cubeUV_maxLods3;",
			"	float r1 = floor(roughnessVal);",
			"	float r2 = r1 + 1.0;",
			"	float t = fract(roughnessVal);",
			"	vec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness, cubeUV_textureSize);",
			"	float s = mipInfo.y;",
			"	float level0 = mipInfo.x;",
			"	float level1 = level0 + 1.0;",
			"	level1 = level1 > 5.0 ? 5.0 : level1;",
			"",
			// round to nearest mipmap if we are not interpolating."
			"	level0 += min( floor( s + 0.5 ), 5.0 );",
			"",
			// Tri linear interpolation."
			"	vec2 uv_10 = getCubeUV(reflectedDirection, r1, level0, cubeUV_textureSize);",
			"	vec2 uv_20 = getCubeUV(reflectedDirection, r2, level0, cubeUV_textureSize);",
			"",
			"	return TextureCubeUVData(uv_10, uv_20, t);",
			"}"
		].join( "\n" ), [ TextureCubeUVData, cubeUV_maxLods3, MipLevelInfo, getCubeUV ] );

		return {
			TextureCubeUVData: TextureCubeUVData,
			textureCubeUV: textureCubeUV
		};

	} )();

	TextureCubeUVNode.prototype = Object.create( TempNode.prototype );
	TextureCubeUVNode.prototype.constructor = TextureCubeUVNode;
	TextureCubeUVNode.prototype.nodeType = "TextureCubeUV";

	TextureCubeUVNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var textureCubeUV = builder.include( TextureCubeUVNode.Nodes.textureCubeUV );

			return builder.format( textureCubeUV + '( ' + this.uv.build( builder, 'v3' ) + ', ' +
				this.blinnExponentToRoughness.build( builder, 'f' ) + ', ' +
				this.textureSize.build( builder, 'f' ) + ' )', this.getType( builder ), output );

		} else {

			console.warn( "TextureCubeUVNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

		}

	};

	TextureCubeUVNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.uv = this.uv.toJSON( meta ).uuid;
			data.textureSize = this.textureSize.toJSON( meta ).uuid;
			data.blinnExponentToRoughness = this.blinnExponentToRoughness.toJSON( meta ).uuid;

		}

		return data;

	};

	function TextureCubeNode( value, uv ) {

		TempNode.call( this, 'v4' );

		this.value = value;
		this.uv = uv || new TextureCubeUVNode();

	}

	TextureCubeNode.prototype = Object.create( TempNode.prototype );
	TextureCubeNode.prototype.constructor = TextureCubeNode;
	TextureCubeNode.prototype.nodeType = "TextureCube";

	TextureCubeNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var uv_10 = this.uv.build( builder ) + '.uv_10',
				uv_20 = this.uv.build( builder ) + '.uv_20',
				t = this.uv.build( builder ) + '.t';

			var color10 = builder.getTexelDecodingFunctionFromTexture( 'texture2D( ' + this.value.build( builder, 'sampler2D' ) + ', ' + uv_10 + ' )', this.value.value ),
				color20 = builder.getTexelDecodingFunctionFromTexture( 'texture2D( ' + this.value.build( builder, 'sampler2D' ) + ', ' + uv_20 + ' )', this.value.value );

			return builder.format( 'vec4( mix( ' + color10 + ', ' + color20 + ', ' + t + ' ).rgb, 1.0 )', this.getType( builder ), output );

		} else {

			console.warn( "TextureCubeNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

		}

	};

	TextureCubeNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.uv = this.uv.toJSON( meta ).uuid;
			data.textureSize = this.textureSize.toJSON( meta ).uuid;
			data.blinnExponentToRoughness = this.blinnExponentToRoughness.toJSON( meta ).uuid;

			if ( this.roughness ) data.roughness = this.roughness.toJSON( meta ).uuid;

		}

		return data;

	};

	var elements = NodeUtils.elements,
		constructors = [ 'float', 'vec2', 'vec3', 'vec4' ],
		convertFormatToType = {
			float: 'f',
			vec2: 'v2',
			vec3: 'v3',
			vec4: 'v4',
			mat4: 'v4',
			int: 'i'
		},
		convertTypeToFormat = {
			t: 'sampler2D',
			tc: 'samplerCube',
			b: 'bool',
			i: 'int',
			f: 'float',
			c: 'vec3',
			v2: 'vec2',
			v3: 'vec3',
			v4: 'vec4',
			m3: 'mat3',
			m4: 'mat4'
		};

	function NodeBuilder() {

		this.slots = [];
		this.caches = [];
		this.contexts = [];

		this.keywords = {};

		this.nodeData = {};

		this.requires = {
			uv: [],
			color: [],
			lights: false,
			fog: false
		};

		this.includes = {
			consts: [],
			functions: [],
			structs: []
		};

		this.attributes = {};

		this.prefixCode = [
			"#ifdef TEXTURE_LOD_EXT",

			"	#define texCube(a, b) textureCube(a, b)",
			"	#define texCubeBias(a, b, c) textureCubeLodEXT(a, b, c)",

			"	#define tex2D(a, b) texture2D(a, b)",
			"	#define tex2DBias(a, b, c) texture2DLodEXT(a, b, c)",

			"#else",

			"	#define texCube(a, b) textureCube(a, b)",
			"	#define texCubeBias(a, b, c) textureCube(a, b, c)",

			"	#define tex2D(a, b) texture2D(a, b)",
			"	#define tex2DBias(a, b, c) texture2D(a, b, c)",

			"#endif",

			"#include <packing>",
			"#include <common>"

		].join( "\n" );

		this.parsCode = {
			vertex: '',
			fragment: ''
		};

		this.code = {
			vertex: '',
			fragment: ''
		};

		this.nodeCode = {
			vertex: '',
			fragment: ''
		};

		this.resultCode = {
			vertex: '',
			fragment: ''
		};

		this.finalCode = {
			vertex: '',
			fragment: ''
		};

		this.inputs = {
			uniforms: {
				list: [],
				vertex: [],
				fragment: []
			},
			vars: {
				varying: [],
				vertex: [],
				fragment: []
			}
		};

		// send to material

		this.defines = {};

		this.uniforms = {};

		this.extensions = {};

		this.updaters = [];

		this.nodes = [];

		// --

		this.parsing = false;
		this.optimize = true;

	}

	NodeBuilder.prototype = {

		constructor: NodeBuilder,

		build: function ( vertex, fragment ) {

			this.buildShader( 'vertex', vertex );
			this.buildShader( 'fragment', fragment );

			if ( this.requires.uv[ 0 ] ) {

				this.addVaryCode( 'varying vec2 vUv;' );

				this.addVertexFinalCode( 'vUv = uv;' );

			}

			if ( this.requires.uv[ 1 ] ) {

				this.addVaryCode( 'varying vec2 vUv2;' );
				this.addVertexParsCode( 'attribute vec2 uv2;' );

				this.addVertexFinalCode( 'vUv2 = uv2;' );

			}

			if ( this.requires.color[ 0 ] ) {

				this.addVaryCode( 'varying vec4 vColor;' );
				this.addVertexParsCode( 'attribute vec4 color;' );

				this.addVertexFinalCode( 'vColor = color;' );

			}

			if ( this.requires.color[ 1 ] ) {

				this.addVaryCode( 'varying vec4 vColor2;' );
				this.addVertexParsCode( 'attribute vec4 color2;' );

				this.addVertexFinalCode( 'vColor2 = color2;' );

			}

			if ( this.requires.position ) {

				this.addVaryCode( 'varying vec3 vPosition;' );

				this.addVertexFinalCode( 'vPosition = transformed;' );

			}

			if ( this.requires.worldPosition ) {

				this.addVaryCode( 'varying vec3 vWPosition;' );

				this.addVertexFinalCode( 'vWPosition = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;' );

			}

			if ( this.requires.normal ) {

				this.addVaryCode( 'varying vec3 vObjectNormal;' );

				this.addVertexFinalCode( 'vObjectNormal = normal;' );

			}

			if ( this.requires.worldNormal ) {

				this.addVaryCode( 'varying vec3 vWNormal;' );

				this.addVertexFinalCode( 'vWNormal = ( modelMatrix * vec4( objectNormal, 0.0 ) ).xyz;' );

			}

			return this;

		},

		buildShader: function ( shader, node ) {

			this.resultCode[ shader ] = node.build( this.setShader( shader ), 'v4' );

		},

		setMaterial: function ( material, renderer ) {

			this.material = material;
			this.renderer = renderer;

			this.requires.lights = material.lights;
			this.requires.fog = material.fog;

			this.mergeDefines( material.defines );

			return this;

		},

		addFlow: function ( slot, cache, context ) {

			return this.addSlot( slot ).addCache( cache ).addContext( context );

		},

		removeFlow: function () {

			return this.removeSlot().removeCache().removeContext();

		},

		addCache: function ( name ) {

			this.cache = name || '';
			this.caches.push( this.cache );

			return this;

		},

		removeCache: function () {

			this.caches.pop();
			this.cache = this.caches[ this.caches.length - 1 ] || '';

			return this;

		},

		addContext: function ( context ) {

			this.context = Object.assign( {}, this.context, context );
			this.contexts.push( this.context );

			return this;

		},

		removeContext: function () {

			this.contexts.pop();
			this.context = this.contexts[ this.contexts.length - 1 ] || {};

			return this;

		},

		addSlot: function ( name ) {

			this.slot = name || '';
			this.slots.push( this.slot );

			return this;

		},

		removeSlot: function () {

			this.slots.pop();
			this.slot = this.slots[ this.slots.length - 1 ] || '';

			return this;

		},


		addVertexCode: function ( code ) {

			this.addCode( code, 'vertex' );

		},

		addFragmentCode: function ( code ) {

			this.addCode( code, 'fragment' );

		},

		addCode: function ( code, shader ) {

			this.code[ shader || this.shader ] += code + '\n';

		},


		addVertexNodeCode: function ( code ) {

			this.addNodeCode( code, 'vertex' );

		},

		addFragmentNodeCode: function ( code ) {

			this.addNodeCode( code, 'fragment' );

		},

		addNodeCode: function ( code, shader ) {

			this.nodeCode[ shader || this.shader ] += code + '\n';

		},

		clearNodeCode: function ( shader ) {

			shader = shader || this.shader;

			var code = this.nodeCode[ shader ];

			this.nodeCode[ shader ] = '';

			return code;

		},

		clearVertexNodeCode: function ( ) {

			return this.clearNodeCode( 'vertex' );

		},

		clearFragmentNodeCode: function ( ) {

			return this.clearNodeCode( 'fragment' );

		},

		addVertexFinalCode: function ( code ) {

			this.addFinalCode( code, 'vertex' );

		},

		addFragmentFinalCode: function ( code ) {

			this.addFinalCode( code, 'fragment' );

		},

		addFinalCode: function ( code, shader ) {

			this.finalCode[ shader || this.shader ] += code + '\n';

		},


		addVertexParsCode: function ( code ) {

			this.addParsCode( code, 'vertex' );

		},

		addFragmentParsCode: function ( code ) {

			this.addParsCode( code, 'fragment' );

		},

		addParsCode: function ( code, shader ) {

			this.parsCode[ shader || this.shader ] += code + '\n';

		},


		addVaryCode: function ( code ) {

			this.addVertexParsCode( code );
			this.addFragmentParsCode( code );

		},


		isCache: function ( name ) {

			return this.caches.indexOf( name ) !== - 1;

		},

		isSlot: function ( name ) {

			return this.slots.indexOf( name ) !== - 1;

		},

		define: function ( name, value ) {

			this.defines[ name ] = value === undefined ? 1 : value;

		},

		isDefined: function ( name ) {

			return this.defines[ name ] !== undefined;

		},

		getVar: function ( uuid, type, ns, shader ) {

			shader = shader || 'varying';

			var vars = this.getVars( shader ),
				data = vars[ uuid ];

			if ( ! data ) {

				var index = vars.length,
					name = ns ? ns : 'nVv' + index;

				data = { name: name, type: type };

				vars.push( data );
				vars[ uuid ] = data;

			}

			return data;

		},

		getTempVar: function ( uuid, type, ns ) {

			return this.getVar( uuid, type, ns, this.shader );

		},

		getAttribute: function ( name, type ) {

			if ( ! this.attributes[ name ] ) {

				var varying = this.getVar( name, type );

				this.addVertexParsCode( 'attribute ' + type + ' ' + name + ';' );
				this.addVertexFinalCode( varying.name + ' = ' + name + ';' );

				this.attributes[ name ] = { varying: varying, name: name, type: type };

			}

			return this.attributes[ name ];

		},

		getCode: function ( shader ) {

			return [
				this.prefixCode,
				this.parsCode[ shader ],
				this.getVarListCode( this.getVars( 'varying' ), 'varying' ),
				this.getVarListCode( this.inputs.uniforms[ shader ], 'uniform' ),
				this.getIncludesCode( 'consts', shader ),
				this.getIncludesCode( 'structs', shader ),
				this.getIncludesCode( 'functions', shader ),
				'void main() {',
				this.getVarListCode( this.getVars( shader ) ),
				this.code[ shader ],
				this.resultCode[ shader ],
				this.finalCode[ shader ],
				'}'
			].join( "\n" );

		},

		getVarListCode: function ( vars, prefix ) {

			prefix = prefix || '';

			var code = '';

			for ( var i = 0, l = vars.length; i < l; ++ i ) {

				var nVar = vars[ i ],
					type = nVar.type,
					name = nVar.name;

				var formatType = this.getFormatByType( type );

				if ( formatType === undefined ) {

					throw new Error( "Node pars " + formatType + " not found." );

				}

				code += prefix + ' ' + formatType + ' ' + name + ';\n';

			}

			return code;

		},

		getVars: function ( shader ) {

			return this.inputs.vars[ shader || this.shader ];

		},

		getNodeData: function ( node ) {

			var uuid = node.isNode ? node.uuid : node;

			return this.nodeData[ uuid ] = this.nodeData[ uuid ] || {};

		},

		createUniform: function ( shader, type, node, ns, needsUpdate ) {

			var uniforms = this.inputs.uniforms,
				index = uniforms.list.length;

			var uniform = new NodeUniform( {
				type: type,
				name: ns ? ns : 'nVu' + index,
				node: node,
				needsUpdate: needsUpdate
			} );

			uniforms.list.push( uniform );

			uniforms[ shader ].push( uniform );
			uniforms[ shader ][ uniform.name ] = uniform;

			this.uniforms[ uniform.name ] = uniform;

			return uniform;

		},

		createVertexUniform: function ( type, node, ns, needsUpdate ) {

			return this.createUniform( 'vertex', type, node, ns, needsUpdate );

		},

		createFragmentUniform: function ( type, node, ns, needsUpdate ) {

			return this.createUniform( 'fragment', type, node, ns, needsUpdate );

		},

		include: function ( node, parent, source ) {

			var includesStruct;

			node = typeof node === 'string' ? NodeLib.get( node ) : node;

			if ( this.context.include === false ) {

				return node.name;

			}


			if ( node instanceof FunctionNode ) {

				includesStruct = this.includes.functions;

			} else if ( node instanceof ConstNode ) {

				includesStruct = this.includes.consts;

			} else if ( node instanceof StructNode ) {

				includesStruct = this.includes.structs;

			}

			var includes = includesStruct[ this.shader ] = includesStruct[ this.shader ] || [];

			if ( node ) {

				var included = includes[ node.name ];

				if ( ! included ) {

					included = includes[ node.name ] = {
						node: node,
						deps: []
					};

					includes.push( included );

					included.src = node.build( this, 'source' );

				}

				if ( node instanceof FunctionNode && parent && includes[ parent.name ] && includes[ parent.name ].deps.indexOf( node ) == - 1 ) {

					includes[ parent.name ].deps.push( node );

					if ( node.includes && node.includes.length ) {

						var i = 0;

						do {

							this.include( node.includes[ i ++ ], parent );

						} while ( i < node.includes.length );

					}

				}

				if ( source ) {

					included.src = source;

				}

				return node.name;

			} else {

				throw new Error( "Include not found." );

			}

		},

		colorToVectorProperties: function ( color ) {

			return color.replace( 'r', 'x' ).replace( 'g', 'y' ).replace( 'b', 'z' ).replace( 'a', 'w' );

		},

		colorToVector: function ( color ) {

			return color.replace( /c/g, 'v3' );

		},

		getIncludes: function ( type, shader ) {

			return this.includes[ type ][ shader || this.shader ];

		},

		getIncludesCode: function () {

			function sortByPosition( a, b ) {

				return a.deps.length - b.deps.length;

			}

			return function getIncludesCode( type, shader ) {

				var includes = this.getIncludes( type, shader );

				if ( ! includes ) return '';

				var code = '',
					includes = includes.sort( sortByPosition );

				for ( var i = 0; i < includes.length; i ++ ) {

					if ( includes[ i ].src ) code += includes[ i ].src + '\n';

				}

				return code;

			};

		}(),

		getConstructorFromLength: function ( len ) {

			return constructors[ len - 1 ];

		},

		isTypeMatrix: function ( format ) {

			return /^m/.test( format );

		},

		getTypeLength: function ( type ) {

			if ( type === 'f' ) return 1;

			return parseInt( this.colorToVector( type ).substr( 1 ) );

		},

		getTypeFromLength: function ( len ) {

			if ( len === 1 ) return 'f';

			return 'v' + len;

		},

		findNode: function () {

			for ( var i = 0; i < arguments.length; i ++ ) {

				var nodeCandidate = arguments[ i ];

				if ( nodeCandidate !== undefined && nodeCandidate.isNode ) {

					return nodeCandidate;

				}

			}

		},

		resolve: function () {

			for ( var i = 0; i < arguments.length; i ++ ) {

				var nodeCandidate = arguments[ i ];

				if ( nodeCandidate !== undefined ) {

					if ( nodeCandidate.isNode ) {

						return nodeCandidate;

					} else if ( nodeCandidate.isTexture ) {

						switch ( nodeCandidate.mapping ) {

							case CubeReflectionMapping:
							case CubeRefractionMapping:

								return new CubeTextureNode( nodeCandidate );

								break;

							case CubeUVReflectionMapping:
							case CubeUVRefractionMapping:

								return new TextureCubeNode( new TextureNode( nodeCandidate ) );

								break;

							default:

								return new TextureNode( nodeCandidate );

						}

					} else if ( nodeCandidate.isVector2 ) {

						return new Vector2Node( nodeCandidate );

					} else if ( nodeCandidate.isVector3 ) {

						return new Vector3Node( nodeCandidate );

					} else if ( nodeCandidate.isVector4 ) {

						return new Vector4Node( nodeCandidate );

					}

				}

			}

		},

		format: function ( code, from, to ) {

			var typeToType = this.colorToVector( to + ' <- ' + from );

			switch ( typeToType ) {

				case 'f <- v2' : return code + '.x';
				case 'f <- v3' : return code + '.x';
				case 'f <- v4' : return code + '.x';
				case 'f <- i' : return 'float( ' + code + ' )';

				case 'v2 <- f' : return 'vec2( ' + code + ' )';
				case 'v2 <- v3': return code + '.xy';
				case 'v2 <- v4': return code + '.xy';
				case 'v2 <- i' : return 'vec2( float( ' + code + ' ) )';

				case 'v3 <- f' : return 'vec3( ' + code + ' )';
				case 'v3 <- v2': return 'vec3( ' + code + ', 0.0 )';
				case 'v3 <- v4': return code + '.xyz';
				case 'v3 <- i' : return 'vec2( float( ' + code + ' ) )';

				case 'v4 <- f' : return 'vec4( ' + code + ' )';
				case 'v4 <- v2': return 'vec4( ' + code + ', 0.0, 1.0 )';
				case 'v4 <- v3': return 'vec4( ' + code + ', 1.0 )';
				case 'v4 <- i' : return 'vec4( float( ' + code + ' ) )';

				case 'i <- f' : return 'int( ' + code + ' )';
				case 'i <- v2' : return 'int( ' + code + '.x )';
				case 'i <- v3' : return 'int( ' + code + '.x )';
				case 'i <- v4' : return 'int( ' + code + '.x )';

			}

			return code;

		},

		getTypeByFormat: function ( format ) {

			return convertFormatToType[ format ] || format;

		},

		getFormatByType: function ( type ) {

			return convertTypeToFormat[ type ] || type;

		},

		getUuid: function ( uuid, useCache ) {

			useCache = useCache !== undefined ? useCache : true;

			if ( useCache && this.cache ) uuid = this.cache + '-' + uuid;

			return uuid;

		},

		getElementByIndex: function ( index ) {

			return elements[ index ];

		},

		getIndexByElement: function ( elm ) {

			return elements.indexOf( elm );

		},

		isShader: function ( shader ) {

			return this.shader === shader;

		},

		setShader: function ( shader ) {

			this.shader = shader;

			return this;

		},

		mergeDefines: function ( defines ) {

			for ( var name in defines ) {

				this.defines[ name ] = defines[ name ];

			}

			return this.defines;

		},

		mergeUniform: function ( uniforms ) {

			for ( var name in uniforms ) {

				this.uniforms[ name ] = uniforms[ name ];

			}

			return this.uniforms;

		},

		getTextureEncodingFromMap: function ( map, gammaOverrideLinear ) {

			gammaOverrideLinear = gammaOverrideLinear !== undefined ? gammaOverrideLinear : this.context.gamma && ( this.renderer ? this.renderer.gammaInput : false );

			var encoding;

			if ( ! map ) {

				encoding = LinearEncoding;

			} else if ( map.isTexture ) {

				encoding = map.encoding;

			} else if ( map.isWebGLRenderTarget ) {

				console.warn( "WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead." );
				encoding = map.texture.encoding;

			}

			// add backwards compatibility for WebGLRenderer.gammaInput/gammaOutput parameter, should probably be removed at some point.
			if ( encoding === LinearEncoding && gammaOverrideLinear ) {

				encoding = GammaEncoding;

			}

			return encoding;

		}

	};

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

	function ColorNode( color, g, b ) {

		InputNode.call( this, 'c' );

		this.value = color instanceof Color ? color : new Color( color || 0, g, b );

	}

	ColorNode.prototype = Object.create( InputNode.prototype );
	ColorNode.prototype.constructor = ColorNode;
	ColorNode.prototype.nodeType = "Color";

	NodeUtils.addShortcuts( ColorNode.prototype, 'value', [ 'r', 'g', 'b' ] );

	ColorNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "vec3( " + this.r + ", " + this.g + ", " + this.b + " )", type, output );

	};

	ColorNode.prototype.copy = function ( source ) {

		InputNode.prototype.copy.call( this, source );

		this.value.copy( source );

	};

	ColorNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.r = this.r;
			data.g = this.g;
			data.b = this.b;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	function RawNode( value ) {

		Node.call( this, 'v4' );

		this.value = value;

	}

	RawNode.prototype = Object.create( Node.prototype );
	RawNode.prototype.constructor = RawNode;
	RawNode.prototype.nodeType = "Raw";

	RawNode.prototype.generate = function ( builder ) {

		var data = this.value.parseAndBuildCode( builder, this.type ),
			code = data.code + '\n';

		if ( builder.isShader( 'vertex' ) ) {

			code += 'gl_Position = ' + data.result + ';';

		} else {

			code += 'gl_FragColor = ' + data.result + ';';

		}

		return code;

	};

	RawNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		this.value = source.value;

	};

	RawNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.toJSON( meta ).uuid;

		}

		return data;

	};

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

	function NodeMaterial( vertex, fragment ) {

		ShaderMaterial.call( this );

		this.vertex = vertex || new RawNode( new PositionNode( PositionNode.PROJECTION ) );
		this.fragment = fragment || new RawNode( new ColorNode( 0xFF0000 ) );

		this.updaters = [];

	}

	NodeMaterial.prototype = Object.create( ShaderMaterial.prototype );
	NodeMaterial.prototype.constructor = NodeMaterial;
	NodeMaterial.prototype.type = "NodeMaterial";

	NodeMaterial.prototype.isNodeMaterial = true;

	Object.defineProperties( NodeMaterial.prototype, {

		properties: {

			get: function () {

				return this.fragment.properties;

			}

		}

	} );

	NodeMaterial.prototype.updateFrame = function ( frame ) {

		for ( var i = 0; i < this.updaters.length; ++ i ) {

			frame.updateNode( this.updaters[ i ] );

		}

	};

	NodeMaterial.prototype.onBeforeCompile = function ( shader, renderer ) {

		if ( this.needsUpdate ) {

			this.build( { renderer: renderer } );

			shader.uniforms = this.uniforms;
			shader.vertexShader = this.vertexShader;
			shader.fragmentShader = this.fragmentShader;

		}

	};

	NodeMaterial.prototype.build = function ( params ) {

		params = params || {};

		var builder = params.builder || new NodeBuilder();

		builder.setMaterial( this, params.renderer );
		builder.build( this.vertex, this.fragment );

		this.vertexShader = builder.getCode( 'vertex' );
		this.fragmentShader = builder.getCode( 'fragment' );

		this.defines = builder.defines;
		this.uniforms = builder.uniforms;
		this.extensions = builder.extensions;
		this.updaters = builder.updaters;

		this.fog = builder.requires.fog;
		this.lights = builder.requires.lights;

		this.transparent = builder.requires.transparent || this.blending > NormalBlending;

		this.needsUpdate = false;

		return this;

	};

	NodeMaterial.prototype.copy = function ( source ) {

		var uuid = this.uuid;

		for ( var name in source ) {

			this[ name ] = source[ name ];

		}

		this.uuid = uuid;

		if ( source.userData !== undefined ) {

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

		}

	};

	NodeMaterial.prototype.toJSON = function ( meta ) {

		var isRootObject = ( meta === undefined || typeof meta === 'string' );

		if ( isRootObject ) {

			meta = {
				nodes: {}
			};

		}

		if ( meta && ! meta.materials ) meta.materials = {};

		if ( ! meta.materials[ this.uuid ] ) {

			var data = {};

			data.uuid = this.uuid;
			data.type = this.type;

			meta.materials[ data.uuid ] = data;

			if ( this.name !== "" ) data.name = this.name;

			if ( this.size !== undefined ) data.size = this.size;
			if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

			if ( this.blending !== NormalBlending ) data.blending = this.blending;
			if ( this.flatShading === true ) data.flatShading = this.flatShading;
			if ( this.side !== FrontSide ) data.side = this.side;
			if ( this.vertexColors !== NoColors ) data.vertexColors = this.vertexColors;

			if ( this.depthFunc !== LessEqualDepth ) data.depthFunc = this.depthFunc;
			if ( this.depthTest === false ) data.depthTest = this.depthTest;
			if ( this.depthWrite === false ) data.depthWrite = this.depthWrite;

			if ( this.linewidth !== 1 ) data.linewidth = this.linewidth;
			if ( this.dashSize !== undefined ) data.dashSize = this.dashSize;
			if ( this.gapSize !== undefined ) data.gapSize = this.gapSize;
			if ( this.scale !== undefined ) data.scale = this.scale;

			if ( this.dithering === true ) data.dithering = true;

			if ( this.wireframe === true ) data.wireframe = this.wireframe;
			if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
			if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
			if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

			if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
			if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = this.premultipliedAlpha;

			if ( this.morphTargets === true ) data.morphTargets = true;
			if ( this.skinning === true ) data.skinning = true;

			if ( this.visible === false ) data.visible = false;
			if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

			data.fog = this.fog;
			data.lights = this.lights;

			data.vertex = this.vertex.toJSON( meta ).uuid;
			data.fragment = this.fragment.toJSON( meta ).uuid;

		}

		meta.material = this.uuid;

		return meta;

	};

	function Vector4Node( x, y, z, w ) {

		InputNode.call( this, 'v4' );

		this.value = x instanceof Vector4 ? x : new Vector4( x, y, z, w );

	}

	Vector4Node.prototype = Object.create( InputNode.prototype );
	Vector4Node.prototype.constructor = Vector4Node;
	Vector4Node.prototype.nodeType = "Vector4";

	NodeUtils.addShortcuts( Vector4Node.prototype, 'value', [ 'x', 'y', 'z', 'w' ] );

	Vector4Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "vec4( " + this.x + ", " + this.y + ", " + this.z + ", " + this.w + " )", type, output );

	};

	Vector4Node.prototype.copy = function ( source ) {

		InputNode.prototype.copy.call( this, source );

		this.value.copy( source );

	};

	Vector4Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.x = this.x;
			data.y = this.y;
			data.z = this.z;
			data.w = this.w;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	exports.Vector4Node = Vector4Node;

	return exports;

}({}));
