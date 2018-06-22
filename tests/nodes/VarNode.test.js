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

	var VarNode = function ( type ) {

		GLNode.call( this, type );

	};

	VarNode.prototype = Object.create( GLNode.prototype );
	VarNode.prototype.constructor = VarNode;
	VarNode.prototype.nodeType = "Var";

	VarNode.prototype.getType = function ( builder ) {

		return builder.getTypeByFormat( this.type );

	};

	VarNode.prototype.generate = function ( builder, output ) {

		var varying = builder.material.getVar( this.uuid, this.type );

		return builder.format( varying.name, this.getType( builder ), output );

	};

	VarNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.out = this.type;

		}

		return data;

	};

	exports.VarNode = VarNode;

	return exports;

}({}));
