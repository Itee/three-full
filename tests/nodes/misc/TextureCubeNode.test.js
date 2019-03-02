var Three = (function (exports) {
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

			return builder.format( '( ' + this.src + ' )', this.getType( builder ), output );

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
	var declarationRegexp$2 = /^([a-z_0-9]+)\s([a-z_0-9]+)\s*\((.*?)\)/i,
		propertiesRegexp$1 = /[a-z_0-9]+/ig;

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

		while ( match = propertiesRegexp$1.exec( this.src ) ) {

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

			var match = this.src.match( declarationRegexp$2 );

			this.inputs = [];

			if ( match && match.length == 4 ) {

				this.type = match[ 1 ];
				this.name = match[ 2 ];

				var inputs = match[ 3 ].match( propertiesRegexp$1 );

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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	exports.TextureCubeNode = TextureCubeNode;

	return exports;

}({}));
