var Three = (function (exports) {
	'use strict';

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */

	var _Math = {

		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,

		generateUUID: function () {

			// http://www.broofa.com/Tools/Math.uuid.htm
			// Replaced .join with string concatenation (@takahirox)

			var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
			var rnd = 0, r;

			return function generateUUID() {

				var uuid = '';

				for ( var i = 0; i < 36; i ++ ) {

					if ( i === 8 || i === 13 || i === 18 || i === 23 ) {

						uuid += '-';

					} else if ( i === 14 ) {

						uuid += '4';

					} else {

						if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
						r = rnd & 0xf;
						rnd = rnd >> 4;
						uuid += chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];

					}

				}

				return uuid;

			};

		}(),

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

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var GLNode = function( type ) {

		this.uuid = _Math.generateUUID();

		this.allows = {};
		this.requestUpdate = false;

		this.type = type;

	};

	GLNode.prototype.parse = function( builder, context ) {

		context = context || {};

		builder.parsing = true;

		var material = builder.material;

		this.build( builder.addCache( context.cache, context.requires ).addSlot( context.slot ), 'v4' );

		material.clearVertexNode();
		material.clearFragmentNode();

		builder.removeCache().removeSlot();

		builder.parsing = false;

	};

	GLNode.prototype.parseAndBuildCode = function( builder, output, context ) {

		context = context || {};

		this.parse( builder, context );

		return this.buildCode( builder, output, context );

	};

	GLNode.prototype.buildCode = function( builder, output, context ) {

		context = context || {};

		var material = builder.material;

		var data = { result : this.build( builder.addCache( context.cache, context.requires ).addSlot( context.slot ), output ) };

		if ( builder.isShader( 'vertex' ) ) data.code = material.clearVertexNode();
		else data.code = material.clearFragmentNode();

		builder.removeCache().removeSlot();

		return data;

	};

	GLNode.prototype.build = function( builder, output, uuid ) {

		output = output || this.getType( builder, output );

		var material = builder.material, data = material.getDataNode( uuid || this.uuid );

		if ( builder.parsing ) this.appendDepsNode( builder, data, output );

		if ( this.allows[ builder.shader ] === false ) {

			throw new Error( 'Shader ' + shader + ' is not compatible with this node.' );

		}

		if ( this.requestUpdate && material.requestUpdate.indexOf( this ) === - 1 ) {

			material.requestUpdate.push( this );

		}

		return this.generate( builder, output, uuid );

	};

	GLNode.prototype.appendDepsNode = function( builder, data, output ) {

		data.deps = ( data.deps || 0 ) + 1;

		var outputLen = builder.getFormatLength( output );

		if ( outputLen > ( data.outputMax || 0 ) || this.getType( builder, output ) ) {

			data.outputMax = outputLen;
			data.output = output;

		}

	};

	GLNode.prototype.getType = function( builder, output ) {

		return output === 'sampler2D' || output === 'samplerCube' ? output : this.type;

	};

	/**
	 * Automatic node cache
	 * @author sunag / http://www.sunag.com.br/
	 */

	var TempNode = function( type, params ) {

		GLNode.call( this, type );

		params = params || {};

		this.shared = params.shared !== undefined ? params.shared : true;
		this.unique = params.unique !== undefined ? params.unique : false;

	};

	TempNode.prototype = Object.create( GLNode.prototype );
	TempNode.prototype.constructor = TempNode;

	TempNode.prototype.build = function( builder, output, uuid, ns ) {

		output = output || this.getType( builder );

		var material = builder.material;

		if ( this.isShared( builder, output ) ) {

			var isUnique = this.isUnique( builder, output );

			if ( isUnique && this.constructor.uuid === undefined ) {

				this.constructor.uuid = Math.generateUUID();

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

	TempNode.prototype.isShared = function( builder, output ) {

		return output !== 'sampler2D' && output !== 'samplerCube' && this.shared;

	};

	TempNode.prototype.isUnique = function( builder, output ) {

		return this.unique;

	};

	TempNode.prototype.getUuid = function( unique ) {

		var uuid = unique || unique == undefined ? this.constructor.uuid || this.uuid : this.uuid;

		if ( typeof this.scope == "string" ) uuid = this.scope + '-' + uuid;

		return uuid;

	};

	TempNode.prototype.getTemp = function( builder, uuid ) {

		uuid = uuid || this.uuid;

		var material = builder.material;

		if ( builder.isShader( 'vertex' ) && material.vertexTemps[ uuid ] ) return material.vertexTemps[ uuid ].name;
		else if ( material.fragmentTemps[ uuid ] ) return material.fragmentTemps[ uuid ].name;

	};

	TempNode.prototype.generate = function( builder, output, uuid, type, ns ) {

		if ( ! this.isShared( builder, output ) ) console.error( "TempNode is not shared!" );

		uuid = uuid || this.uuid;

		if ( builder.isShader( 'vertex' ) ) return builder.material.getVertexTemp( uuid, type || this.getType( builder ), ns ).name;
		else return builder.material.getFragmentTemp( uuid, type || this.getType( builder ), ns ).name;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 * @thanks bhouston / https://clara.io/
	 */

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

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var RoughnessToBlinnExponentNode = function() {

		TempNode.call( this, 'fv1' );

	};

	RoughnessToBlinnExponentNode.getSpecularMIPLevel = new FunctionNode( [
	// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html
	"float getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {",

		//float envMapWidth = pow( 2.0, maxMIPLevelScalar );
		//float desiredMIPLevel = log2( envMapWidth * sqrt( 3.0 ) ) - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );
		"float maxMIPLevelScalar = float( maxMIPLevel );",
		"float desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );",

		// clamp to allowable LOD ranges.
		"return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );",
	"}"
	].join( "\n" ) );

	RoughnessToBlinnExponentNode.prototype = Object.create( TempNode.prototype );
	RoughnessToBlinnExponentNode.prototype.constructor = RoughnessToBlinnExponentNode;

	RoughnessToBlinnExponentNode.prototype.generate = function( builder, output ) {

		var material = builder.material;

		if ( builder.isShader( 'fragment' ) ) {

			if ( material.isDefined( 'PHYSICAL' ) ) {

				builder.include( RoughnessToBlinnExponentNode.getSpecularMIPLevel );

				if ( builder.isCache( 'clearCoat' ) ) {

					return builder.format( 'getSpecularMIPLevel( Material_ClearCoat_BlinnShininessExponent( material ), 8 )', this.type, output );

				} else {
					
					return builder.format( 'getSpecularMIPLevel( Material_BlinnShininessExponent( material ), 8 )', this.type, output );
					
				}

			} else {

				console.warn( "RoughnessToBlinnExponentNode is only compatible with PhysicalMaterial." );

				return builder.format( '0.0', this.type, output );

			}

		} else {

			console.warn( "RoughnessToBlinnExponentNode is not compatible with " + builder.shader + " shader." );

			return builder.format( '0.0', this.type, output );

		}

	};

	exports.RoughnessToBlinnExponentNode = RoughnessToBlinnExponentNode;

	return exports;

}({}));
