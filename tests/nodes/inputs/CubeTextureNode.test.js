(function (exports) {
	'use strict';

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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

		if ( this.getShared( builder, output ) ) {

			var isUnique = this.getUnique( builder, output );

			if ( isUnique && this.constructor.uuid === undefined ) {

				this.constructor.uuid = _Math.generateUUID();

			}

			uuid = builder.getUuid( uuid || this.getUuid(), ! isUnique );

			var data = builder.getNodeData( uuid ),
				type = data.output || this.getType( builder );

			if ( builder.parsing ) {

				if ( ( data.deps || 0 ) > 0 || this.getLabel() ) {

					this.appendDepsNode( builder, data, output );

					return this.generate( builder, output, uuid );

				}

				return Node.prototype.build.call( this, builder, output, uuid );

			} else if ( isUnique ) {

				data.name = data.name || Node.prototype.build.call( this, builder, output, uuid );

				return data.name;

			} else if ( ! this.getLabel() && ( ! this.getShared( builder, type ) || ( ! builder.optimize || data.deps === 1 ) ) ) {

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

	TempNode.prototype.getShared = function ( builder, output ) {

		return output !== 'sampler2D' && output !== 'samplerCube' && this.shared;

	};

	TempNode.prototype.getUnique = function ( builder, output ) {

		return this.unique;

	};

	TempNode.prototype.setLabel = function ( name ) {

		this.label = name;

		return this;

	};

	TempNode.prototype.getLabel = function ( builder ) {

		return this.label;

	};

	TempNode.prototype.getUuid = function ( unique ) {

		var uuid = unique || unique == undefined ? this.constructor.uuid || this.uuid : this.uuid;

		if ( typeof this.scope === "string" ) uuid = this.scope + '-' + uuid;

		return uuid;

	};

	TempNode.prototype.getTemp = function ( builder, uuid ) {

		uuid = uuid || this.uuid;

		var tempVar = builder.getVars()[ uuid ];

		return tempVar ? tempVar.name : undefined;

	};

	TempNode.prototype.generate = function ( builder, output, uuid, type, ns ) {

		if ( ! this.getShared( builder, output ) ) console.error( "TempNode is not shared!" );

		uuid = uuid || this.uuid;

		return builder.getTempVar( uuid, type || this.getType( builder ), ns, this.getLabel() ).name;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function InputNode( type, params ) {

		params = params || {};
		params.shared = params.shared !== undefined ? params.shared : false;

		TempNode.call( this, type, params );

		this.readonly = false;

	}

	InputNode.prototype = Object.create( TempNode.prototype );
	InputNode.prototype.constructor = InputNode;

	InputNode.prototype.setReadonly = function ( value ) {

		this.readonly = value;

		return this;

	};

	InputNode.prototype.getReadonly = function ( builder ) {

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
			readonly = this.getReadonly( builder ) && this.generateReadonly !== undefined;

		if ( readonly ) {

			return this.generateReadonly( builder, output, uuid, type, ns, needsUpdate );

		} else {

			if ( builder.isShader( 'vertex' ) ) {

				if ( ! data.vertex ) {

					data.vertex = builder.createVertexUniform( type, this, ns, needsUpdate, this.getLabel() );

				}

				return builder.format( data.vertex.name, type, output );

			} else {

				if ( ! data.fragment ) {

					data.fragment = builder.createFragmentUniform( type, this, ns, needsUpdate, this.getLabel() );

				}

				return builder.format( data.fragment.name, type, output );

			}

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var NodeLib = {

		nodes: {},
		keywords: {},

		add: function ( node ) {

			this.nodes[ node.name ] = node;

		},

		addKeyword: function ( name, callback, cache ) {

			cache = cache !== undefined ? cache : true;

			this.keywords[ name ] = { callback: callback, cache: cache };

		},

		remove: function ( node ) {

			delete this.nodes[ node.name ];

		},

		removeKeyword: function ( name ) {

			delete this.keywords[ name ];

		},

		get: function ( name ) {

			return this.nodes[ name ];

		},

		getKeyword: function ( name, material ) {

			return this.keywords[ name ].callback.call( this, material );

		},

		getKeywordData: function ( name ) {

			return this.keywords[ name ];

		},

		contains: function ( name ) {

			return this.nodes[ name ] != undefined;

		},

		containsKeyword: function ( name ) {

			return this.keywords[ name ] != undefined;

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var declarationRegexp$1 = /^([a-z_0-9]+)\s([a-z_0-9]+)\s*\((.*?)\)/i,
		propertiesRegexp = /[a-z_0-9]+/ig;

	function FunctionNode( src, includes, extensions, keywords, type ) {

		this.isMethod = type === undefined;

		TempNode.call( this, type );

		this.eval( src, includes, extensions, keywords );

	}

	FunctionNode.prototype = Object.create( TempNode.prototype );
	FunctionNode.prototype.constructor = FunctionNode;
	FunctionNode.prototype.nodeType = "Function";

	FunctionNode.prototype.useKeywords = true;

	FunctionNode.prototype.getShared = function ( builder, output ) {

		return ! this.isMethod;

	};

	FunctionNode.prototype.getType = function ( builder ) {

		return builder.getTypeByFormat( this.type );

	};

	FunctionNode.prototype.getInputByName = function ( name ) {

		var i = this.inputs.length;

		while ( i -- ) {

			if ( this.inputs[ i ].name === name ) {

				return this.inputs[ i ];

			}

		}

	};

	FunctionNode.prototype.getIncludeByName = function ( name ) {

		var i = this.includes.length;

		while ( i -- ) {

			if ( this.includes[ i ].name === name ) {

				return this.includes[ i ];

			}

		}

	};

	FunctionNode.prototype.generate = function ( builder, output ) {

		var match, offset = 0, src = this.src;

		for ( var i = 0; i < this.includes.length; i ++ ) {

			builder.include( this.includes[ i ], this );

		}

		for ( var ext in this.extensions ) {

			builder.extensions[ ext ] = true;

		}

		while ( match = propertiesRegexp.exec( this.src ) ) {

			var prop = match[ 0 ],
				isGlobal = this.isMethod ? ! this.getInputByName( prop ) : true,
				reference = prop;

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

			return builder.format( '( ' + src + ' )', this.getType( builder ), output );

		}

	};

	FunctionNode.prototype.eval = function ( src, includes, extensions, keywords ) {

		this.src = src || '';

		this.includes = includes || [];
		this.extensions = extensions || {};
		this.keywords = keywords || {};

		if ( this.isMethod ) {

			var match = this.src.match( declarationRegexp$1 );

			this.inputs = [];

			if ( match && match.length == 4 ) {

				this.type = match[ 1 ];
				this.name = match[ 2 ];

				var inputs = match[ 3 ].match( propertiesRegexp );

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
							name: name,
							type: type,
							qualifier: qualifier
						} );

					}

				}

			} else {

				this.type = '';
				this.name = '';

			}

		}

	};

	FunctionNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.isMethod = source.isMethod;
		this.useKeywords = source.useKeywords;

		this.eval( source.src, source.includes, source.extensions, source.keywords );

		if ( source.type !== undefined ) this.type = source.type;

	};

	FunctionNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.src = this.src;
			data.isMethod = this.isMethod;
			data.useKeywords = this.useKeywords;

			if ( ! this.isMethod ) data.type = this.type;

			data.extensions = JSON.parse( JSON.stringify( this.extensions ) );
			data.keywords = {};

			for ( var keyword in this.keywords ) {

				data.keywords[ keyword ] = this.keywords[ keyword ].toJSON( meta ).uuid;

			}

			if ( this.includes.length ) {

				data.includes = [];

				for ( var i = 0; i < this.includes.length; i ++ ) {

					data.includes.push( this.includes[ i ].toJSON( meta ).uuid );

				}

			}

		}

		return data;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var LinearEncoding = 3000;
	var sRGBEncoding = 3001;
	var GammaEncoding = 3007;
	var RGBEEncoding = 3002;
	var RGBM7Encoding = 3004;
	var RGBM16Encoding = 3005;
	var RGBDEncoding = 3006;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

			"	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;",
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
			"	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;",
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	exports.CubeTextureNode = CubeTextureNode;

}((this.Three = this.Three || {})));
