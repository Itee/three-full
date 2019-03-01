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
	var declarationRegexp = /^([a-z_0-9]+)\s([a-z_0-9]+)\s*\((.*?)\)/i,
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

	FunctionNode.prototype.isShared = function ( builder, output ) {

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

			var match = this.src.match( declarationRegexp );

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
	function MaxMIPLevelNode( texture ) {

		FloatNode.call( this );

		this.texture = texture;

		this.maxMIPLevel = 0;

	}

	MaxMIPLevelNode.prototype = Object.create( FloatNode.prototype );
	MaxMIPLevelNode.prototype.constructor = MaxMIPLevelNode;
	MaxMIPLevelNode.prototype.nodeType = "MaxMIPLevel";

	Object.defineProperties( MaxMIPLevelNode.prototype, {

		value: {

			get: function () {

				if ( this.maxMIPLevel === 0 ) {

					var image = this.texture.value.image ? this.texture.value.image[ 0 ] : undefined;

					this.maxMIPLevel = image !== undefined ? Math.log( Math.max( image.width, image.height ) ) * Math.LOG2E : 0;

				}

				return this.maxMIPLevel;

			},

			set: function () { }

		}

	} );

	MaxMIPLevelNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.texture = this.texture.uuid;

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
	function RoughnessToBlinnExponentNode( texture ) {

		TempNode.call( this, 'f' );

		this.texture = texture;

		this.maxMIPLevel = new MaxMIPLevelNode( texture );
		this.blinnShininessExponent = new BlinnShininessExponentNode();

	}

	RoughnessToBlinnExponentNode.Nodes = ( function () {

		var getSpecularMIPLevel = new FunctionNode( [
			// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html
			"float getSpecularMIPLevel( const in float blinnShininessExponent, const in float maxMIPLevelScalar ) {",

			//	float envMapWidth = pow( 2.0, maxMIPLevelScalar );
			//	float desiredMIPLevel = log2( envMapWidth * sqrt( 3.0 ) ) - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );

			"	float desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );",

			// clamp to allowable LOD ranges.
			"	return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );",

			"}"
		].join( "\n" ) );

		return {
			getSpecularMIPLevel: getSpecularMIPLevel
		};

	} )();

	RoughnessToBlinnExponentNode.prototype = Object.create( TempNode.prototype );
	RoughnessToBlinnExponentNode.prototype.constructor = RoughnessToBlinnExponentNode;
	RoughnessToBlinnExponentNode.prototype.nodeType = "RoughnessToBlinnExponent";

	RoughnessToBlinnExponentNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			this.maxMIPLevel.texture = this.texture;

			var getSpecularMIPLevel = builder.include( RoughnessToBlinnExponentNode.Nodes.getSpecularMIPLevel );

			return builder.format( getSpecularMIPLevel + '( ' + this.blinnShininessExponent.build( builder, 'f' ) + ', ' + this.maxMIPLevel.build( builder, 'f' ) + ' )', this.type, output );

		} else {

			console.warn( "RoughnessToBlinnExponentNode is not compatible with " + builder.shader + " shader." );

			return builder.format( '0.0', this.type, output );

		}

	};

	RoughnessToBlinnExponentNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.texture = source.texture;

	};

	RoughnessToBlinnExponentNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.texture = this.texture;

		}

		return data;

	};

	exports.RoughnessToBlinnExponentNode = RoughnessToBlinnExponentNode;

	return exports;

}({}));
