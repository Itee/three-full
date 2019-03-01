var Three = (function (exports) {
	'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var REVISION = '98';
	var CullFaceNone = 0;
	var CullFaceBack = 1;
	var CullFaceFront = 2;
	var PCFShadowMap = 1;
	var PCFSoftShadowMap = 2;
	var FrontSide = 0;
	var BackSide = 1;
	var DoubleSide = 2;
	var FlatShading = 1;
	var NoColors = 0;
	var NoBlending = 0;
	var NormalBlending = 1;
	var AdditiveBlending = 2;
	var SubtractiveBlending = 3;
	var MultiplyBlending = 4;
	var CustomBlending = 5;
	var AddEquation = 100;
	var SubtractEquation = 101;
	var ReverseSubtractEquation = 102;
	var MinEquation = 103;
	var MaxEquation = 104;
	var ZeroFactor = 200;
	var OneFactor = 201;
	var SrcColorFactor = 202;
	var OneMinusSrcColorFactor = 203;
	var SrcAlphaFactor = 204;
	var OneMinusSrcAlphaFactor = 205;
	var DstAlphaFactor = 206;
	var OneMinusDstAlphaFactor = 207;
	var DstColorFactor = 208;
	var OneMinusDstColorFactor = 209;
	var SrcAlphaSaturateFactor = 210;
	var NeverDepth = 0;
	var AlwaysDepth = 1;
	var LessDepth = 2;
	var LessEqualDepth = 3;
	var EqualDepth = 4;
	var GreaterEqualDepth = 5;
	var GreaterDepth = 6;
	var NotEqualDepth = 7;
	var MultiplyOperation = 0;
	var MixOperation = 1;
	var AddOperation = 2;
	var NoToneMapping = 0;
	var LinearToneMapping = 1;
	var ReinhardToneMapping = 2;
	var Uncharted2ToneMapping = 3;
	var CineonToneMapping = 4;
	var UVMapping = 300;
	var CubeReflectionMapping = 301;
	var CubeRefractionMapping = 302;
	var EquirectangularReflectionMapping = 303;
	var EquirectangularRefractionMapping = 304;
	var SphericalReflectionMapping = 305;
	var CubeUVReflectionMapping = 306;
	var CubeUVRefractionMapping = 307;
	var RepeatWrapping = 1000;
	var ClampToEdgeWrapping = 1001;
	var MirroredRepeatWrapping = 1002;
	var NearestFilter = 1003;
	var NearestMipMapNearestFilter = 1004;
	var NearestMipMapLinearFilter = 1005;
	var LinearFilter = 1006;
	var LinearMipMapNearestFilter = 1007;
	var LinearMipMapLinearFilter = 1008;
	var UnsignedByteType = 1009;
	var ByteType = 1010;
	var ShortType = 1011;
	var UnsignedShortType = 1012;
	var IntType = 1013;
	var UnsignedIntType = 1014;
	var FloatType = 1015;
	var HalfFloatType = 1016;
	var UnsignedShort4444Type = 1017;
	var UnsignedShort5551Type = 1018;
	var UnsignedShort565Type = 1019;
	var UnsignedInt248Type = 1020;
	var AlphaFormat = 1021;
	var RGBFormat = 1022;
	var RGBAFormat = 1023;
	var LuminanceFormat = 1024;
	var LuminanceAlphaFormat = 1025;
	var DepthFormat = 1026;
	var DepthStencilFormat = 1027;
	var RedFormat = 1028;
	var RGB_S3TC_DXT1_Format = 33776;
	var RGBA_S3TC_DXT1_Format = 33777;
	var RGBA_S3TC_DXT3_Format = 33778;
	var RGBA_S3TC_DXT5_Format = 33779;
	var RGB_PVRTC_4BPPV1_Format = 35840;
	var RGB_PVRTC_2BPPV1_Format = 35841;
	var RGBA_PVRTC_4BPPV1_Format = 35842;
	var RGBA_PVRTC_2BPPV1_Format = 35843;
	var RGB_ETC1_Format = 36196;
	var RGBA_ASTC_4x4_Format = 37808;
	var RGBA_ASTC_5x4_Format = 37809;
	var RGBA_ASTC_5x5_Format = 37810;
	var RGBA_ASTC_6x5_Format = 37811;
	var RGBA_ASTC_6x6_Format = 37812;
	var RGBA_ASTC_8x5_Format = 37813;
	var RGBA_ASTC_8x6_Format = 37814;
	var RGBA_ASTC_8x8_Format = 37815;
	var RGBA_ASTC_10x5_Format = 37816;
	var RGBA_ASTC_10x6_Format = 37817;
	var RGBA_ASTC_10x8_Format = 37818;
	var RGBA_ASTC_10x10_Format = 37819;
	var RGBA_ASTC_12x10_Format = 37820;
	var RGBA_ASTC_12x12_Format = 37821;
	var TrianglesDrawMode = 0;
	var TriangleStripDrawMode = 1;
	var TriangleFanDrawMode = 2;
	var LinearEncoding = 3000;
	var sRGBEncoding = 3001;
	var GammaEncoding = 3007;
	var RGBEEncoding = 3002;
	var RGBM7Encoding = 3004;
	var RGBM16Encoding = 3005;
	var RGBDEncoding = 3006;
	var BasicDepthPacking = 3200;
	var RGBADepthPacking = 3201;
	var ObjectSpaceNormalMap = 1;

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

				if ( this.combine !== undefined ) data.combine = this.combine;
				if ( this.envMapIntensity !== undefined ) data.envMapIntensity = this.envMapIntensity;

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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

		isQuaternion: true,

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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Matrix3() {

		this.elements = [

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'Matrix3: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	Object.assign( Matrix3.prototype, {

		isMatrix3: true,

		set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

			var te = this.elements;

			te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
			te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
			te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

			return this;

		},

		identity: function () {

			this.set(

				1, 0, 0,
				0, 1, 0,
				0, 0, 1

			);

			return this;

		},

		clone: function () {

			return new this.constructor().fromArray( this.elements );

		},

		copy: function ( m ) {

			var te = this.elements;
			var me = m.elements;

			te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
			te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
			te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

			return this;

		},

		setFromMatrix4: function ( m ) {

			var me = m.elements;

			this.set(

				me[ 0 ], me[ 4 ], me[ 8 ],
				me[ 1 ], me[ 5 ], me[ 9 ],
				me[ 2 ], me[ 6 ], me[ 10 ]

			);

			return this;

		},

		applyToBufferAttribute: function () {

			var v1 = new Vector3();

			return function applyToBufferAttribute( attribute ) {

				for ( var i = 0, l = attribute.count; i < l; i ++ ) {

					v1.x = attribute.getX( i );
					v1.y = attribute.getY( i );
					v1.z = attribute.getZ( i );

					v1.applyMatrix3( this );

					attribute.setXYZ( i, v1.x, v1.y, v1.z );

				}

				return attribute;

			};

		}(),

		multiply: function ( m ) {

			return this.multiplyMatrices( this, m );

		},

		premultiply: function ( m ) {

			return this.multiplyMatrices( m, this );

		},

		multiplyMatrices: function ( a, b ) {

			var ae = a.elements;
			var be = b.elements;
			var te = this.elements;

			var a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
			var a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
			var a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

			var b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
			var b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
			var b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

			te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
			te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
			te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

			te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
			te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
			te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

			te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
			te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
			te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

			return this;

		},

		multiplyScalar: function ( s ) {

			var te = this.elements;

			te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
			te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
			te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

			return this;

		},

		determinant: function () {

			var te = this.elements;

			var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
				d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
				g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

			return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

		},

		getInverse: function ( matrix, throwOnDegenerate ) {

			if ( matrix && matrix.isMatrix4 ) {

				console.error( "Matrix3: .getInverse() no longer takes a Matrix4 argument." );

			}

			var me = matrix.elements,
				te = this.elements,

				n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ],
				n12 = me[ 3 ], n22 = me[ 4 ], n32 = me[ 5 ],
				n13 = me[ 6 ], n23 = me[ 7 ], n33 = me[ 8 ],

				t11 = n33 * n22 - n32 * n23,
				t12 = n32 * n13 - n33 * n12,
				t13 = n23 * n12 - n22 * n13,

				det = n11 * t11 + n21 * t12 + n31 * t13;

			if ( det === 0 ) {

				var msg = "Matrix3: .getInverse() can't invert matrix, determinant is 0";

				if ( throwOnDegenerate === true ) {

					throw new Error( msg );

				} else {

					console.warn( msg );

				}

				return this.identity();

			}

			var detInv = 1 / det;

			te[ 0 ] = t11 * detInv;
			te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
			te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

			te[ 3 ] = t12 * detInv;
			te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
			te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

			te[ 6 ] = t13 * detInv;
			te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
			te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

			return this;

		},

		transpose: function () {

			var tmp, m = this.elements;

			tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
			tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
			tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

			return this;

		},

		getNormalMatrix: function ( matrix4 ) {

			return this.setFromMatrix4( matrix4 ).getInverse( this ).transpose();

		},

		transposeIntoArray: function ( r ) {

			var m = this.elements;

			r[ 0 ] = m[ 0 ];
			r[ 1 ] = m[ 3 ];
			r[ 2 ] = m[ 6 ];
			r[ 3 ] = m[ 1 ];
			r[ 4 ] = m[ 4 ];
			r[ 5 ] = m[ 7 ];
			r[ 6 ] = m[ 2 ];
			r[ 7 ] = m[ 5 ];
			r[ 8 ] = m[ 8 ];

			return this;

		},

		setUvTransform: function ( tx, ty, sx, sy, rotation, cx, cy ) {

			var c = Math.cos( rotation );
			var s = Math.sin( rotation );

			this.set(
				sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,
				- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,
				0, 0, 1
			);

		},

		scale: function ( sx, sy ) {

			var te = this.elements;

			te[ 0 ] *= sx; te[ 3 ] *= sx; te[ 6 ] *= sx;
			te[ 1 ] *= sy; te[ 4 ] *= sy; te[ 7 ] *= sy;

			return this;

		},

		rotate: function ( theta ) {

			var c = Math.cos( theta );
			var s = Math.sin( theta );

			var te = this.elements;

			var a11 = te[ 0 ], a12 = te[ 3 ], a13 = te[ 6 ];
			var a21 = te[ 1 ], a22 = te[ 4 ], a23 = te[ 7 ];

			te[ 0 ] = c * a11 + s * a21;
			te[ 3 ] = c * a12 + s * a22;
			te[ 6 ] = c * a13 + s * a23;

			te[ 1 ] = - s * a11 + c * a21;
			te[ 4 ] = - s * a12 + c * a22;
			te[ 7 ] = - s * a13 + c * a23;

			return this;

		},

		translate: function ( tx, ty ) {

			var te = this.elements;

			te[ 0 ] += tx * te[ 2 ]; te[ 3 ] += tx * te[ 5 ]; te[ 6 ] += tx * te[ 8 ];
			te[ 1 ] += ty * te[ 2 ]; te[ 4 ] += ty * te[ 5 ]; te[ 7 ] += ty * te[ 8 ];

			return this;

		},

		equals: function ( matrix ) {

			var te = this.elements;
			var me = matrix.elements;

			for ( var i = 0; i < 9; i ++ ) {

				if ( te[ i ] !== me[ i ] ) return false;

			}

			return true;

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			for ( var i = 0; i < 9; i ++ ) {

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

			return array;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ImageUtils = {

		getDataURL: function ( image ) {

			var canvas;

			if ( typeof HTMLCanvasElement == 'undefined' ) {

				return image.src;

			} else if ( image instanceof HTMLCanvasElement ) {

				canvas = image;

			} else {

				canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
				canvas.width = image.width;
				canvas.height = image.height;

				var context = canvas.getContext( '2d' );

				if ( image instanceof ImageData ) {

					context.putImageData( image, 0, 0 );

				} else {

					context.drawImage( image, 0, 0, image.width, image.height );

				}

			}

			if ( canvas.width > 2048 || canvas.height > 2048 ) {

				return canvas.toDataURL( 'image/jpeg', 0.6 );

			} else {

				return canvas.toDataURL( 'image/png' );

			}

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var textureId = 0;

	function Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

		Object.defineProperty( this, 'id', { value: textureId ++ } );

		this.uuid = _Math.generateUUID();

		this.name = '';

		this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
		this.mipmaps = [];

		this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;

		this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
		this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;

		this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
		this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;

		this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

		this.format = format !== undefined ? format : RGBAFormat;
		this.type = type !== undefined ? type : UnsignedByteType;

		this.offset = new Vector2( 0, 0 );
		this.repeat = new Vector2( 1, 1 );
		this.center = new Vector2( 0, 0 );
		this.rotation = 0;

		this.matrixAutoUpdate = true;
		this.matrix = new Matrix3();

		this.generateMipmaps = true;
		this.premultiplyAlpha = false;
		this.flipY = true;
		this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

		// Values of encoding !== LinearEncoding only supported on map, envMap and emissiveMap.
		//
		// Also changing the encoding after already used by a Material will not automatically make the Material
		// update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
		this.encoding = encoding !== undefined ? encoding : LinearEncoding;

		this.version = 0;
		this.onUpdate = null;

	}

	Texture.DEFAULT_IMAGE = undefined;
	Texture.DEFAULT_MAPPING = UVMapping;

	Texture.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Texture,

		isTexture: true,

		updateMatrix: function () {

			this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.name = source.name;

			this.image = source.image;
			this.mipmaps = source.mipmaps.slice( 0 );

			this.mapping = source.mapping;

			this.wrapS = source.wrapS;
			this.wrapT = source.wrapT;

			this.magFilter = source.magFilter;
			this.minFilter = source.minFilter;

			this.anisotropy = source.anisotropy;

			this.format = source.format;
			this.type = source.type;

			this.offset.copy( source.offset );
			this.repeat.copy( source.repeat );
			this.center.copy( source.center );
			this.rotation = source.rotation;

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrix.copy( source.matrix );

			this.generateMipmaps = source.generateMipmaps;
			this.premultiplyAlpha = source.premultiplyAlpha;
			this.flipY = source.flipY;
			this.unpackAlignment = source.unpackAlignment;
			this.encoding = source.encoding;

			return this;

		},

		toJSON: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

				return meta.textures[ this.uuid ];

			}

			var output = {

				metadata: {
					version: 4.5,
					type: 'Texture',
					generator: 'Texture.toJSON'
				},

				uuid: this.uuid,
				name: this.name,

				mapping: this.mapping,

				repeat: [ this.repeat.x, this.repeat.y ],
				offset: [ this.offset.x, this.offset.y ],
				center: [ this.center.x, this.center.y ],
				rotation: this.rotation,

				wrap: [ this.wrapS, this.wrapT ],

				format: this.format,
				minFilter: this.minFilter,
				magFilter: this.magFilter,
				anisotropy: this.anisotropy,

				flipY: this.flipY

			};

			if ( this.image !== undefined ) {

				// TODO: Move to Image

				var image = this.image;

				if ( image.uuid === undefined ) {

					image.uuid = _Math.generateUUID(); // UGH

				}

				if ( ! isRootObject && meta.images[ image.uuid ] === undefined ) {

					var url;

					if ( Array.isArray( image ) ) {

						// process array of images e.g. CubeTexture

						url = [];

						for ( var i = 0, l = image.length; i < l; i ++ ) {

							url.push( ImageUtils.getDataURL( image[ i ] ) );

						}

					} else {

						// process single image

						url = ImageUtils.getDataURL( image );

					}

					meta.images[ image.uuid ] = {
						uuid: image.uuid,
						url: url
					};

				}

				output.image = image.uuid;

			}

			if ( ! isRootObject ) {

				meta.textures[ this.uuid ] = output;

			}

			return output;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		},

		transformUv: function ( uv ) {

			if ( this.mapping !== UVMapping ) return uv;

			uv.applyMatrix3( this.matrix );

			if ( uv.x < 0 || uv.x > 1 ) {

				switch ( this.wrapS ) {

					case RepeatWrapping:

						uv.x = uv.x - Math.floor( uv.x );
						break;

					case ClampToEdgeWrapping:

						uv.x = uv.x < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

							uv.x = Math.ceil( uv.x ) - uv.x;

						} else {

							uv.x = uv.x - Math.floor( uv.x );

						}
						break;

				}

			}

			if ( uv.y < 0 || uv.y > 1 ) {

				switch ( this.wrapT ) {

					case RepeatWrapping:

						uv.y = uv.y - Math.floor( uv.y );
						break;

					case ClampToEdgeWrapping:

						uv.y = uv.y < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

							uv.y = Math.ceil( uv.y ) - uv.y;

						} else {

							uv.y = uv.y - Math.floor( uv.y );

						}
						break;

				}

			}

			if ( this.flipY ) {

				uv.y = 1 - uv.y;

			}

			return uv;

		}

	} );

	Object.defineProperty( Texture.prototype, "needsUpdate", {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function DataTexture( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

		Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.image = { data: data, width: width, height: height };

		this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
		this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;

		this.generateMipmaps = false;
		this.flipY = false;
		this.unpackAlignment = 1;

	}

	DataTexture.prototype = Object.create( Texture.prototype );
	DataTexture.prototype.constructor = DataTexture;

	DataTexture.prototype.isDataTexture = true;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Box3( min, max ) {

		this.min = ( min !== undefined ) ? min : new Vector3( + Infinity, + Infinity, + Infinity );
		this.max = ( max !== undefined ) ? max : new Vector3( - Infinity, - Infinity, - Infinity );

	}

	Object.assign( Box3.prototype, {

		isBox3: true,

		set: function ( min, max ) {

			this.min.copy( min );
			this.max.copy( max );

			return this;

		},

		setFromArray: function ( array ) {

			var minX = + Infinity;
			var minY = + Infinity;
			var minZ = + Infinity;

			var maxX = - Infinity;
			var maxY = - Infinity;
			var maxZ = - Infinity;

			for ( var i = 0, l = array.length; i < l; i += 3 ) {

				var x = array[ i ];
				var y = array[ i + 1 ];
				var z = array[ i + 2 ];

				if ( x < minX ) minX = x;
				if ( y < minY ) minY = y;
				if ( z < minZ ) minZ = z;

				if ( x > maxX ) maxX = x;
				if ( y > maxY ) maxY = y;
				if ( z > maxZ ) maxZ = z;

			}

			this.min.set( minX, minY, minZ );
			this.max.set( maxX, maxY, maxZ );

			return this;

		},

		setFromBufferAttribute: function ( attribute ) {

			var minX = + Infinity;
			var minY = + Infinity;
			var minZ = + Infinity;

			var maxX = - Infinity;
			var maxY = - Infinity;
			var maxZ = - Infinity;

			for ( var i = 0, l = attribute.count; i < l; i ++ ) {

				var x = attribute.getX( i );
				var y = attribute.getY( i );
				var z = attribute.getZ( i );

				if ( x < minX ) minX = x;
				if ( y < minY ) minY = y;
				if ( z < minZ ) minZ = z;

				if ( x > maxX ) maxX = x;
				if ( y > maxY ) maxY = y;
				if ( z > maxZ ) maxZ = z;

			}

			this.min.set( minX, minY, minZ );
			this.max.set( maxX, maxY, maxZ );

			return this;

		},

		setFromPoints: function ( points ) {

			this.makeEmpty();

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				this.expandByPoint( points[ i ] );

			}

			return this;

		},

		setFromCenterAndSize: function () {

			var v1 = new Vector3();

			return function setFromCenterAndSize( center, size ) {

				var halfSize = v1.copy( size ).multiplyScalar( 0.5 );

				this.min.copy( center ).sub( halfSize );
				this.max.copy( center ).add( halfSize );

				return this;

			};

		}(),

		setFromObject: function ( object ) {

			this.makeEmpty();

			return this.expandByObject( object );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( box ) {

			this.min.copy( box.min );
			this.max.copy( box.max );

			return this;

		},

		makeEmpty: function () {

			this.min.x = this.min.y = this.min.z = + Infinity;
			this.max.x = this.max.y = this.max.z = - Infinity;

			return this;

		},

		isEmpty: function () {

			// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

			return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

		},

		getCenter: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Box3: .getCenter() target is now required' );
				target = new Vector3();

			}

			return this.isEmpty() ? target.set( 0, 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

		},

		getSize: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Box3: .getSize() target is now required' );
				target = new Vector3();

			}

			return this.isEmpty() ? target.set( 0, 0, 0 ) : target.subVectors( this.max, this.min );

		},

		expandByPoint: function ( point ) {

			this.min.min( point );
			this.max.max( point );

			return this;

		},

		expandByVector: function ( vector ) {

			this.min.sub( vector );
			this.max.add( vector );

			return this;

		},

		expandByScalar: function ( scalar ) {

			this.min.addScalar( - scalar );
			this.max.addScalar( scalar );

			return this;

		},

		expandByObject: function () {

			// Computes the world-axis-aligned bounding box of an object (including its children),
			// accounting for both the object's, and children's, world transforms

			var scope, i, l;

			var v1 = new Vector3();

			function traverse( node ) {

				var geometry = node.geometry;

				if ( geometry !== undefined ) {

					if ( geometry.isGeometry ) {

						var vertices = geometry.vertices;

						for ( i = 0, l = vertices.length; i < l; i ++ ) {

							v1.copy( vertices[ i ] );
							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					} else if ( geometry.isBufferGeometry ) {

						var attribute = geometry.attributes.position;

						if ( attribute !== undefined ) {

							for ( i = 0, l = attribute.count; i < l; i ++ ) {

								v1.fromBufferAttribute( attribute, i ).applyMatrix4( node.matrixWorld );

								scope.expandByPoint( v1 );

							}

						}

					}

				}

			}

			return function expandByObject( object ) {

				scope = this;

				object.updateMatrixWorld( true );

				object.traverse( traverse );

				return this;

			};

		}(),

		containsPoint: function ( point ) {

			return point.x < this.min.x || point.x > this.max.x ||
				point.y < this.min.y || point.y > this.max.y ||
				point.z < this.min.z || point.z > this.max.z ? false : true;

		},

		containsBox: function ( box ) {

			return this.min.x <= box.min.x && box.max.x <= this.max.x &&
				this.min.y <= box.min.y && box.max.y <= this.max.y &&
				this.min.z <= box.min.z && box.max.z <= this.max.z;

		},

		getParameter: function ( point, target ) {

			// This can potentially have a divide by zero if the box
			// has a size dimension of 0.

			if ( target === undefined ) {

				console.warn( 'Box3: .getParameter() target is now required' );
				target = new Vector3();

			}

			return target.set(
				( point.x - this.min.x ) / ( this.max.x - this.min.x ),
				( point.y - this.min.y ) / ( this.max.y - this.min.y ),
				( point.z - this.min.z ) / ( this.max.z - this.min.z )
			);

		},

		intersectsBox: function ( box ) {

			// using 6 splitting planes to rule out intersections.
			return box.max.x < this.min.x || box.min.x > this.max.x ||
				box.max.y < this.min.y || box.min.y > this.max.y ||
				box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

		},

		intersectsSphere: ( function () {

			var closestPoint = new Vector3();

			return function intersectsSphere( sphere ) {

				// Find the point on the AABB closest to the sphere center.
				this.clampPoint( sphere.center, closestPoint );

				// If that point is inside the sphere, the AABB and sphere intersect.
				return closestPoint.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

			};

		} )(),

		intersectsPlane: function ( plane ) {

			// We compute the minimum and maximum dot product values. If those values
			// are on the same side (back or front) of the plane, then there is no intersection.

			var min, max;

			if ( plane.normal.x > 0 ) {

				min = plane.normal.x * this.min.x;
				max = plane.normal.x * this.max.x;

			} else {

				min = plane.normal.x * this.max.x;
				max = plane.normal.x * this.min.x;

			}

			if ( plane.normal.y > 0 ) {

				min += plane.normal.y * this.min.y;
				max += plane.normal.y * this.max.y;

			} else {

				min += plane.normal.y * this.max.y;
				max += plane.normal.y * this.min.y;

			}

			if ( plane.normal.z > 0 ) {

				min += plane.normal.z * this.min.z;
				max += plane.normal.z * this.max.z;

			} else {

				min += plane.normal.z * this.max.z;
				max += plane.normal.z * this.min.z;

			}

			return ( min <= - plane.constant && max >= - plane.constant );

		},

		intersectsTriangle: ( function () {

			// triangle centered vertices
			var v0 = new Vector3();
			var v1 = new Vector3();
			var v2 = new Vector3();

			// triangle edge vectors
			var f0 = new Vector3();
			var f1 = new Vector3();
			var f2 = new Vector3();

			var testAxis = new Vector3();

			var center = new Vector3();
			var extents = new Vector3();

			var triangleNormal = new Vector3();

			function satForAxes( axes ) {

				var i, j;

				for ( i = 0, j = axes.length - 3; i <= j; i += 3 ) {

					testAxis.fromArray( axes, i );
					// project the aabb onto the seperating axis
					var r = extents.x * Math.abs( testAxis.x ) + extents.y * Math.abs( testAxis.y ) + extents.z * Math.abs( testAxis.z );
					// project all 3 vertices of the triangle onto the seperating axis
					var p0 = v0.dot( testAxis );
					var p1 = v1.dot( testAxis );
					var p2 = v2.dot( testAxis );
					// actual test, basically see if either of the most extreme of the triangle points intersects r
					if ( Math.max( - Math.max( p0, p1, p2 ), Math.min( p0, p1, p2 ) ) > r ) {

						// points of the projected triangle are outside the projected half-length of the aabb
						// the axis is seperating and we can exit
						return false;

					}

				}

				return true;

			}

			return function intersectsTriangle( triangle ) {

				if ( this.isEmpty() ) {

					return false;

				}

				// compute box center and extents
				this.getCenter( center );
				extents.subVectors( this.max, center );

				// translate triangle to aabb origin
				v0.subVectors( triangle.a, center );
				v1.subVectors( triangle.b, center );
				v2.subVectors( triangle.c, center );

				// compute edge vectors for triangle
				f0.subVectors( v1, v0 );
				f1.subVectors( v2, v1 );
				f2.subVectors( v0, v2 );

				// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
				// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
				// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
				var axes = [
					0, - f0.z, f0.y, 0, - f1.z, f1.y, 0, - f2.z, f2.y,
					f0.z, 0, - f0.x, f1.z, 0, - f1.x, f2.z, 0, - f2.x,
					- f0.y, f0.x, 0, - f1.y, f1.x, 0, - f2.y, f2.x, 0
				];
				if ( ! satForAxes( axes ) ) {

					return false;

				}

				// test 3 face normals from the aabb
				axes = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
				if ( ! satForAxes( axes ) ) {

					return false;

				}

				// finally testing the face normal of the triangle
				// use already existing triangle edge vectors here
				triangleNormal.crossVectors( f0, f1 );
				axes = [ triangleNormal.x, triangleNormal.y, triangleNormal.z ];
				return satForAxes( axes );

			};

		} )(),

		clampPoint: function ( point, target ) {

			if ( target === undefined ) {

				console.warn( 'Box3: .clampPoint() target is now required' );
				target = new Vector3();

			}

			return target.copy( point ).clamp( this.min, this.max );

		},

		distanceToPoint: function () {

			var v1 = new Vector3();

			return function distanceToPoint( point ) {

				var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
				return clampedPoint.sub( point ).length();

			};

		}(),

		getBoundingSphere: function () {

			var v1 = new Vector3();

			return function getBoundingSphere( target ) {

				if ( target === undefined ) {

					console.warn( 'Box3: .getBoundingSphere() target is now required' );
					target = new Sphere();

				}

				this.getCenter( target.center );

				target.radius = this.getSize( v1 ).length() * 0.5;

				return target;

			};

		}(),

		intersect: function ( box ) {

			this.min.max( box.min );
			this.max.min( box.max );

			// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
			if ( this.isEmpty() ) this.makeEmpty();

			return this;

		},

		union: function ( box ) {

			this.min.min( box.min );
			this.max.max( box.max );

			return this;

		},

		applyMatrix4: function () {

			var points = [
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3()
			];

			return function applyMatrix4( matrix ) {

				// transform of empty box is an empty box.
				if ( this.isEmpty() ) return this;

				// NOTE: I am using a binary pattern to specify all 2^3 combinations below
				points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
				points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
				points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
				points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
				points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
				points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
				points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
				points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 111

				this.setFromPoints( points );

				return this;

			};

		}(),

		translate: function ( offset ) {

			this.min.add( offset );
			this.max.add( offset );

			return this;

		},

		equals: function ( box ) {

			return box.min.equals( this.min ) && box.max.equals( this.max );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Sphere( center, radius ) {

		this.center = ( center !== undefined ) ? center : new Vector3();
		this.radius = ( radius !== undefined ) ? radius : 0;

	}

	Object.assign( Sphere.prototype, {

		set: function ( center, radius ) {

			this.center.copy( center );
			this.radius = radius;

			return this;

		},

		setFromPoints: function () {

			var box = new Box3();

			return function setFromPoints( points, optionalCenter ) {

				var center = this.center;

				if ( optionalCenter !== undefined ) {

					center.copy( optionalCenter );

				} else {

					box.setFromPoints( points ).getCenter( center );

				}

				var maxRadiusSq = 0;

				for ( var i = 0, il = points.length; i < il; i ++ ) {

					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

				}

				this.radius = Math.sqrt( maxRadiusSq );

				return this;

			};

		}(),

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( sphere ) {

			this.center.copy( sphere.center );
			this.radius = sphere.radius;

			return this;

		},

		empty: function () {

			return ( this.radius <= 0 );

		},

		containsPoint: function ( point ) {

			return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

		},

		distanceToPoint: function ( point ) {

			return ( point.distanceTo( this.center ) - this.radius );

		},

		intersectsSphere: function ( sphere ) {

			var radiusSum = this.radius + sphere.radius;

			return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

		},

		intersectsBox: function ( box ) {

			return box.intersectsSphere( this );

		},

		intersectsPlane: function ( plane ) {

			return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

		},

		clampPoint: function ( point, target ) {

			var deltaLengthSq = this.center.distanceToSquared( point );

			if ( target === undefined ) {

				console.warn( 'Sphere: .clampPoint() target is now required' );
				target = new Vector3();

			}

			target.copy( point );

			if ( deltaLengthSq > ( this.radius * this.radius ) ) {

				target.sub( this.center ).normalize();
				target.multiplyScalar( this.radius ).add( this.center );

			}

			return target;

		},

		getBoundingBox: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Sphere: .getBoundingBox() target is now required' );
				target = new Box3();

			}

			target.set( this.center, this.center );
			target.expandByScalar( this.radius );

			return target;

		},

		applyMatrix4: function ( matrix ) {

			this.center.applyMatrix4( matrix );
			this.radius = this.radius * matrix.getMaxScaleOnAxis();

			return this;

		},

		translate: function ( offset ) {

			this.center.add( offset );

			return this;

		},

		equals: function ( sphere ) {

			return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Plane( normal, constant ) {

		// normal is assumed to be normalized

		this.normal = ( normal !== undefined ) ? normal : new Vector3( 1, 0, 0 );
		this.constant = ( constant !== undefined ) ? constant : 0;

	}

	Object.assign( Plane.prototype, {

		set: function ( normal, constant ) {

			this.normal.copy( normal );
			this.constant = constant;

			return this;

		},

		setComponents: function ( x, y, z, w ) {

			this.normal.set( x, y, z );
			this.constant = w;

			return this;

		},

		setFromNormalAndCoplanarPoint: function ( normal, point ) {

			this.normal.copy( normal );
			this.constant = - point.dot( this.normal );

			return this;

		},

		setFromCoplanarPoints: function () {

			var v1 = new Vector3();
			var v2 = new Vector3();

			return function setFromCoplanarPoints( a, b, c ) {

				var normal = v1.subVectors( c, b ).cross( v2.subVectors( a, b ) ).normalize();

				// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

				this.setFromNormalAndCoplanarPoint( normal, a );

				return this;

			};

		}(),

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( plane ) {

			this.normal.copy( plane.normal );
			this.constant = plane.constant;

			return this;

		},

		normalize: function () {

			// Note: will lead to a divide by zero if the plane is invalid.

			var inverseNormalLength = 1.0 / this.normal.length();
			this.normal.multiplyScalar( inverseNormalLength );
			this.constant *= inverseNormalLength;

			return this;

		},

		negate: function () {

			this.constant *= - 1;
			this.normal.negate();

			return this;

		},

		distanceToPoint: function ( point ) {

			return this.normal.dot( point ) + this.constant;

		},

		distanceToSphere: function ( sphere ) {

			return this.distanceToPoint( sphere.center ) - sphere.radius;

		},

		projectPoint: function ( point, target ) {

			if ( target === undefined ) {

				console.warn( 'Plane: .projectPoint() target is now required' );
				target = new Vector3();

			}

			return target.copy( this.normal ).multiplyScalar( - this.distanceToPoint( point ) ).add( point );

		},

		intersectLine: function () {

			var v1 = new Vector3();

			return function intersectLine( line, target ) {

				if ( target === undefined ) {

					console.warn( 'Plane: .intersectLine() target is now required' );
					target = new Vector3();

				}

				var direction = line.delta( v1 );

				var denominator = this.normal.dot( direction );

				if ( denominator === 0 ) {

					// line is coplanar, return origin
					if ( this.distanceToPoint( line.start ) === 0 ) {

						return target.copy( line.start );

					}

					// Unsure if this is the correct method to handle this case.
					return undefined;

				}

				var t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

				if ( t < 0 || t > 1 ) {

					return undefined;

				}

				return target.copy( direction ).multiplyScalar( t ).add( line.start );

			};

		}(),

		intersectsLine: function ( line ) {

			// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

			var startSign = this.distanceToPoint( line.start );
			var endSign = this.distanceToPoint( line.end );

			return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

		},

		intersectsBox: function ( box ) {

			return box.intersectsPlane( this );

		},

		intersectsSphere: function ( sphere ) {

			return sphere.intersectsPlane( this );

		},

		coplanarPoint: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Plane: .coplanarPoint() target is now required' );
				target = new Vector3();

			}

			return target.copy( this.normal ).multiplyScalar( - this.constant );

		},

		applyMatrix4: function () {

			var v1 = new Vector3();
			var m1 = new Matrix3();

			return function applyMatrix4( matrix, optionalNormalMatrix ) {

				var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix( matrix );

				var referencePoint = this.coplanarPoint( v1 ).applyMatrix4( matrix );

				var normal = this.normal.applyMatrix3( normalMatrix ).normalize();

				this.constant = - referencePoint.dot( normal );

				return this;

			};

		}(),

		translate: function ( offset ) {

			this.constant -= offset.dot( this.normal );

			return this;

		},

		equals: function ( plane ) {

			return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Frustum( p0, p1, p2, p3, p4, p5 ) {

		this.planes = [

			( p0 !== undefined ) ? p0 : new Plane(),
			( p1 !== undefined ) ? p1 : new Plane(),
			( p2 !== undefined ) ? p2 : new Plane(),
			( p3 !== undefined ) ? p3 : new Plane(),
			( p4 !== undefined ) ? p4 : new Plane(),
			( p5 !== undefined ) ? p5 : new Plane()

		];

	}

	Object.assign( Frustum.prototype, {

		set: function ( p0, p1, p2, p3, p4, p5 ) {

			var planes = this.planes;

			planes[ 0 ].copy( p0 );
			planes[ 1 ].copy( p1 );
			planes[ 2 ].copy( p2 );
			planes[ 3 ].copy( p3 );
			planes[ 4 ].copy( p4 );
			planes[ 5 ].copy( p5 );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( frustum ) {

			var planes = this.planes;

			for ( var i = 0; i < 6; i ++ ) {

				planes[ i ].copy( frustum.planes[ i ] );

			}

			return this;

		},

		setFromMatrix: function ( m ) {

			var planes = this.planes;
			var me = m.elements;
			var me0 = me[ 0 ], me1 = me[ 1 ], me2 = me[ 2 ], me3 = me[ 3 ];
			var me4 = me[ 4 ], me5 = me[ 5 ], me6 = me[ 6 ], me7 = me[ 7 ];
			var me8 = me[ 8 ], me9 = me[ 9 ], me10 = me[ 10 ], me11 = me[ 11 ];
			var me12 = me[ 12 ], me13 = me[ 13 ], me14 = me[ 14 ], me15 = me[ 15 ];

			planes[ 0 ].setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 ).normalize();
			planes[ 1 ].setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 ).normalize();
			planes[ 2 ].setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 ).normalize();
			planes[ 3 ].setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 ).normalize();
			planes[ 4 ].setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 ).normalize();
			planes[ 5 ].setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 ).normalize();

			return this;

		},

		intersectsObject: function () {

			var sphere = new Sphere();

			return function intersectsObject( object ) {

				var geometry = object.geometry;

				if ( geometry.boundingSphere === null )
					geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere )
					.applyMatrix4( object.matrixWorld );

				return this.intersectsSphere( sphere );

			};

		}(),

		intersectsSprite: function () {

			var sphere = new Sphere();

			return function intersectsSprite( sprite ) {

				sphere.center.set( 0, 0, 0 );
				sphere.radius = 0.7071067811865476;
				sphere.applyMatrix4( sprite.matrixWorld );

				return this.intersectsSphere( sphere );

			};

		}(),

		intersectsSphere: function ( sphere ) {

			var planes = this.planes;
			var center = sphere.center;
			var negRadius = - sphere.radius;

			for ( var i = 0; i < 6; i ++ ) {

				var distance = planes[ i ].distanceToPoint( center );

				if ( distance < negRadius ) {

					return false;

				}

			}

			return true;

		},

		intersectsBox: function () {

			var p = new Vector3();

			return function intersectsBox( box ) {

				var planes = this.planes;

				for ( var i = 0; i < 6; i ++ ) {

					var plane = planes[ i ];

					// corner at max distance

					p.x = plane.normal.x > 0 ? box.max.x : box.min.x;
					p.y = plane.normal.y > 0 ? box.max.y : box.min.y;
					p.z = plane.normal.z > 0 ? box.max.z : box.min.z;

					if ( plane.distanceToPoint( p ) < 0 ) {

						return false;

					}

				}

				return true;

			};

		}(),

		containsPoint: function ( point ) {

			var planes = this.planes;

			for ( var i = 0; i < 6; i ++ ) {

				if ( planes[ i ].distanceToPoint( point ) < 0 ) {

					return false;

				}

			}

			return true;

		}

	} );

	var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n";

	var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n";

	var alphatest_fragment = "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n";

	var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n";

	var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";

	var begin_vertex = "\nvec3 transformed = vec3( position );\n";

	var beginnormal_vertex = "\nvec3 objectNormal = vec3( normal );\n";

	var bsdfs = "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}float G_BlinnPhong_Implicit(  ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit(  );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n";

	var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n";

	var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif\n";

	var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n";

	var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif\n";

	var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n";

	var color_fragment = "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif";

	var color_pars_fragment = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n";

	var color_pars_vertex = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif";

	var color_vertex = "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif";

	var common = "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n";

	var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n";

	var defaultnormal_vertex = "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n";

	var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n";

	var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n";

	var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n";

	var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n";

	var encodings_fragment = "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n";

	var encodings_pars_fragment = "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}\n";

	var envmap_fragment = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n";

	var envmap_pars_fragment = "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n";

	var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n";

	var envmap_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n";

	var fog_vertex = "#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif\n";

	var fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif\n";

	var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n";

	var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n";

	var gradientmap_pars_fragment = "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n";

	var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n";

	var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";

	var lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n";

	var lights_pars_begin = "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n";

	var envmap_physical_pars_fragment = "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance(  const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance(  const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n";

	var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n";

	var lights_phong_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n";

	var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n";

	var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n";

	var lights_fragment_begin = "GeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n";

	var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance(  geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance(  geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance(  geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif\n";

	var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n";

	var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";

	var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n#endif\n";

	var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif\n";

	var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n";

	var map_fragment = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n";

	var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n";

	var map_particle_fragment = "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n";

	var map_particle_pars_fragment = "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n";

	var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n";

	var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";

	var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n";

	var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif";

	var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n";

	var normal_fragment_begin = "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n";

	var normal_fragment_maps = "#ifdef USE_NORMALMAP\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t#ifdef FLIP_SIDED\n\t\t\tnormal = - normal;\n\t\t#endif\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tnormal = normalize( normalMatrix * normal );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n";

	var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tuniform mat3 normalMatrix;\n\t#else\n\t\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\t\tvec2 st0 = dFdx( vUv.st );\n\t\t\tvec2 st1 = dFdy( vUv.st );\n\t\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\t\tvec3 N = normalize( surf_norm );\n\t\t\tmat3 tsn = mat3( S, T, N );\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t\tmapN.xy *= normalScale;\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\treturn normalize( tsn * mapN );\n\t\t}\n\t#endif\n#endif\n";

	var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n";

	var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n";

	var project_vertex = "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n";

	var dithering_fragment = "#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n";

	var dithering_pars_fragment = "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n";

	var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n";

	var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";

	var shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n";

	var shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n";

	var shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n";

	var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n";

	var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";

	var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n";

	var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n";

	var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n";

	var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";

	var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";

	var tonemapping_fragment = "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n";

	var tonemapping_pars_fragment = "#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n";

	var uv_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif";

	var uv_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n";

	var uv_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif";

	var uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";

	var uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif";

	var uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif";

	var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n";

	var background_frag = "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tgl_FragColor = texture2D( t2D, vUv );\n}\n";

	var background_vert = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position, 1.0 );\n\tgl_Position.z = 1.0;\n}\n";

	var cube_frag = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n";

	var cube_vert = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n";

	var depth_frag = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n";

	var depth_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n";

	var distanceRGBA_frag = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n";

	var distanceRGBA_vert = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n";

	var equirect_frag = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n";

	var equirect_vert = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n";

	var linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n";

	var meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var meshbasic_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

	var meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var meshmatcap_frag = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\tvec4 matcapColor = texture2D( matcap, uv );\n\tmatcapColor = matcapTexelToLinear( matcapColor );\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var meshmatcap_vert = "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}\n";

	var meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

	var meshphong_vert = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var meshphysical_frag = "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

	var meshphysical_vert = "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var normal_frag = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n";

	var normal_vert = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n";

	var points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var points_vert = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}\n";

	var shadow_frag = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n";

	var shadow_vert = "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";

	var sprite_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";

	var sprite_vert = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n";

	var ShaderChunk = {
		alphamap_fragment: alphamap_fragment,
		alphamap_pars_fragment: alphamap_pars_fragment,
		alphatest_fragment: alphatest_fragment,
		aomap_fragment: aomap_fragment,
		aomap_pars_fragment: aomap_pars_fragment,
		begin_vertex: begin_vertex,
		beginnormal_vertex: beginnormal_vertex,
		bsdfs: bsdfs,
		bumpmap_pars_fragment: bumpmap_pars_fragment,
		clipping_planes_fragment: clipping_planes_fragment,
		clipping_planes_pars_fragment: clipping_planes_pars_fragment,
		clipping_planes_pars_vertex: clipping_planes_pars_vertex,
		clipping_planes_vertex: clipping_planes_vertex,
		color_fragment: color_fragment,
		color_pars_fragment: color_pars_fragment,
		color_pars_vertex: color_pars_vertex,
		color_vertex: color_vertex,
		common: common,
		cube_uv_reflection_fragment: cube_uv_reflection_fragment,
		defaultnormal_vertex: defaultnormal_vertex,
		displacementmap_pars_vertex: displacementmap_pars_vertex,
		displacementmap_vertex: displacementmap_vertex,
		emissivemap_fragment: emissivemap_fragment,
		emissivemap_pars_fragment: emissivemap_pars_fragment,
		encodings_fragment: encodings_fragment,
		encodings_pars_fragment: encodings_pars_fragment,
		envmap_fragment: envmap_fragment,
		envmap_pars_fragment: envmap_pars_fragment,
		envmap_pars_vertex: envmap_pars_vertex,
		envmap_physical_pars_fragment: envmap_physical_pars_fragment,
		envmap_vertex: envmap_vertex,
		fog_vertex: fog_vertex,
		fog_pars_vertex: fog_pars_vertex,
		fog_fragment: fog_fragment,
		fog_pars_fragment: fog_pars_fragment,
		gradientmap_pars_fragment: gradientmap_pars_fragment,
		lightmap_fragment: lightmap_fragment,
		lightmap_pars_fragment: lightmap_pars_fragment,
		lights_lambert_vertex: lights_lambert_vertex,
		lights_pars_begin: lights_pars_begin,
		lights_phong_fragment: lights_phong_fragment,
		lights_phong_pars_fragment: lights_phong_pars_fragment,
		lights_physical_fragment: lights_physical_fragment,
		lights_physical_pars_fragment: lights_physical_pars_fragment,
		lights_fragment_begin: lights_fragment_begin,
		lights_fragment_maps: lights_fragment_maps,
		lights_fragment_end: lights_fragment_end,
		logdepthbuf_fragment: logdepthbuf_fragment,
		logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
		logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
		logdepthbuf_vertex: logdepthbuf_vertex,
		map_fragment: map_fragment,
		map_pars_fragment: map_pars_fragment,
		map_particle_fragment: map_particle_fragment,
		map_particle_pars_fragment: map_particle_pars_fragment,
		metalnessmap_fragment: metalnessmap_fragment,
		metalnessmap_pars_fragment: metalnessmap_pars_fragment,
		morphnormal_vertex: morphnormal_vertex,
		morphtarget_pars_vertex: morphtarget_pars_vertex,
		morphtarget_vertex: morphtarget_vertex,
		normal_fragment_begin: normal_fragment_begin,
		normal_fragment_maps: normal_fragment_maps,
		normalmap_pars_fragment: normalmap_pars_fragment,
		packing: packing,
		premultiplied_alpha_fragment: premultiplied_alpha_fragment,
		project_vertex: project_vertex,
		dithering_fragment: dithering_fragment,
		dithering_pars_fragment: dithering_pars_fragment,
		roughnessmap_fragment: roughnessmap_fragment,
		roughnessmap_pars_fragment: roughnessmap_pars_fragment,
		shadowmap_pars_fragment: shadowmap_pars_fragment,
		shadowmap_pars_vertex: shadowmap_pars_vertex,
		shadowmap_vertex: shadowmap_vertex,
		shadowmask_pars_fragment: shadowmask_pars_fragment,
		skinbase_vertex: skinbase_vertex,
		skinning_pars_vertex: skinning_pars_vertex,
		skinning_vertex: skinning_vertex,
		skinnormal_vertex: skinnormal_vertex,
		specularmap_fragment: specularmap_fragment,
		specularmap_pars_fragment: specularmap_pars_fragment,
		tonemapping_fragment: tonemapping_fragment,
		tonemapping_pars_fragment: tonemapping_pars_fragment,
		uv_pars_fragment: uv_pars_fragment,
		uv_pars_vertex: uv_pars_vertex,
		uv_vertex: uv_vertex,
		uv2_pars_fragment: uv2_pars_fragment,
		uv2_pars_vertex: uv2_pars_vertex,
		uv2_vertex: uv2_vertex,
		worldpos_vertex: worldpos_vertex,

		background_frag: background_frag,
		background_vert: background_vert,
		cube_frag: cube_frag,
		cube_vert: cube_vert,
		depth_frag: depth_frag,
		depth_vert: depth_vert,
		distanceRGBA_frag: distanceRGBA_frag,
		distanceRGBA_vert: distanceRGBA_vert,
		equirect_frag: equirect_frag,
		equirect_vert: equirect_vert,
		linedashed_frag: linedashed_frag,
		linedashed_vert: linedashed_vert,
		meshbasic_frag: meshbasic_frag,
		meshbasic_vert: meshbasic_vert,
		meshlambert_frag: meshlambert_frag,
		meshlambert_vert: meshlambert_vert,
		meshmatcap_frag: meshmatcap_frag,
		meshmatcap_vert: meshmatcap_vert,
		meshphong_frag: meshphong_frag,
		meshphong_vert: meshphong_vert,
		meshphysical_frag: meshphysical_frag,
		meshphysical_vert: meshphysical_vert,
		normal_frag: normal_frag,
		normal_vert: normal_vert,
		points_frag: points_frag,
		points_vert: points_vert,
		shadow_frag: shadow_frag,
		shadow_vert: shadow_vert,
		sprite_frag: sprite_frag,
		sprite_vert: sprite_vert
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var UniformsLib = {

		common: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },

			map: { value: null },
			uvTransform: { value: new Matrix3() },

			alphaMap: { value: null },

		},

		specularmap: {

			specularMap: { value: null },

		},

		envmap: {

			envMap: { value: null },
			flipEnvMap: { value: - 1 },
			reflectivity: { value: 1.0 },
			refractionRatio: { value: 0.98 },
			maxMipLevel: { value: 0 }

		},

		aomap: {

			aoMap: { value: null },
			aoMapIntensity: { value: 1 }

		},

		lightmap: {

			lightMap: { value: null },
			lightMapIntensity: { value: 1 }

		},

		emissivemap: {

			emissiveMap: { value: null }

		},

		bumpmap: {

			bumpMap: { value: null },
			bumpScale: { value: 1 }

		},

		normalmap: {

			normalMap: { value: null },
			normalScale: { value: new Vector2( 1, 1 ) }

		},

		displacementmap: {

			displacementMap: { value: null },
			displacementScale: { value: 1 },
			displacementBias: { value: 0 }

		},

		roughnessmap: {

			roughnessMap: { value: null }

		},

		metalnessmap: {

			metalnessMap: { value: null }

		},

		gradientmap: {

			gradientMap: { value: null }

		},

		fog: {

			fogDensity: { value: 0.00025 },
			fogNear: { value: 1 },
			fogFar: { value: 2000 },
			fogColor: { value: new Color( 0xffffff ) }

		},

		lights: {

			ambientLightColor: { value: [] },

			directionalLights: { value: [], properties: {
				direction: {},
				color: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			directionalShadowMap: { value: [] },
			directionalShadowMatrix: { value: [] },

			spotLights: { value: [], properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			spotShadowMap: { value: [] },
			spotShadowMatrix: { value: [] },

			pointLights: { value: [], properties: {
				color: {},
				position: {},
				decay: {},
				distance: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			} },

			pointShadowMap: { value: [] },
			pointShadowMatrix: { value: [] },

			hemisphereLights: { value: [], properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			} },

			// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
			rectAreaLights: { value: [], properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			} }

		},

		points: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },
			size: { value: 1.0 },
			scale: { value: 1.0 },
			map: { value: null },
			uvTransform: { value: new Matrix3() }

		},

		sprite: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },
			center: { value: new Vector2( 0.5, 0.5 ) },
			rotation: { value: 0.0 },
			map: { value: null },
			uvTransform: { value: new Matrix3() }

		}

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ShaderLib = {

		basic: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.meshbasic_vert,
			fragmentShader: ShaderChunk.meshbasic_frag

		},

		lambert: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) }
				}
			] ),

			vertexShader: ShaderChunk.meshlambert_vert,
			fragmentShader: ShaderChunk.meshlambert_frag

		},

		phong: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.gradientmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) },
					specular: { value: new Color( 0x111111 ) },
					shininess: { value: 30 }
				}
			] ),

			vertexShader: ShaderChunk.meshphong_vert,
			fragmentShader: ShaderChunk.meshphong_frag

		},

		standard: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.roughnessmap,
				UniformsLib.metalnessmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) },
					roughness: { value: 0.5 },
					metalness: { value: 0.5 },
					envMapIntensity: { value: 1 } // temporary
				}
			] ),

			vertexShader: ShaderChunk.meshphysical_vert,
			fragmentShader: ShaderChunk.meshphysical_frag

		},

		matcap: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.fog,
				{
					matcap: { value: null }
				}
			] ),

			vertexShader: ShaderChunk.meshmatcap_vert,
			fragmentShader: ShaderChunk.meshmatcap_frag

		},

		points: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.points,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.points_vert,
			fragmentShader: ShaderChunk.points_frag

		},

		dashed: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.fog,
				{
					scale: { value: 1 },
					dashSize: { value: 1 },
					totalSize: { value: 2 }
				}
			] ),

			vertexShader: ShaderChunk.linedashed_vert,
			fragmentShader: ShaderChunk.linedashed_frag

		},

		depth: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.displacementmap
			] ),

			vertexShader: ShaderChunk.depth_vert,
			fragmentShader: ShaderChunk.depth_frag

		},

		normal: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				{
					opacity: { value: 1.0 }
				}
			] ),

			vertexShader: ShaderChunk.normal_vert,
			fragmentShader: ShaderChunk.normal_frag

		},

		sprite: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.sprite,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.sprite_vert,
			fragmentShader: ShaderChunk.sprite_frag

		},

		background: {

			uniforms: {
				uvTransform: { value: new Matrix3() },
				t2D: { value: null },
			},

			vertexShader: ShaderChunk.background_vert,
			fragmentShader: ShaderChunk.background_frag

		},
		cube: {

			uniforms: {
				tCube: { value: null },
				tFlip: { value: - 1 },
				opacity: { value: 1.0 }
			},

			vertexShader: ShaderChunk.cube_vert,
			fragmentShader: ShaderChunk.cube_frag

		},

		equirect: {

			uniforms: {
				tEquirect: { value: null },
			},

			vertexShader: ShaderChunk.equirect_vert,
			fragmentShader: ShaderChunk.equirect_frag

		},

		distanceRGBA: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.common,
				UniformsLib.displacementmap,
				{
					referencePosition: { value: new Vector3() },
					nearDistance: { value: 1 },
					farDistance: { value: 1000 }
				}
			] ),

			vertexShader: ShaderChunk.distanceRGBA_vert,
			fragmentShader: ShaderChunk.distanceRGBA_frag

		},

		shadow: {

			uniforms: UniformsUtils.merge( [
				UniformsLib.lights,
				UniformsLib.fog,
				{
					color: { value: new Color( 0x00000 ) },
					opacity: { value: 1.0 }
				},
			] ),

			vertexShader: ShaderChunk.shadow_vert,
			fragmentShader: ShaderChunk.shadow_frag

		}

	};

	ShaderLib.physical = {

		uniforms: UniformsUtils.merge( [
			ShaderLib.standard.uniforms,
			{
				clearCoat: { value: 0 },
				clearCoatRoughness: { value: 0 }
			}
		] ),

		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLAnimation() {

		var context = null;
		var isAnimating = false;
		var animationLoop = null;

		function onAnimationFrame( time, frame ) {

			if ( isAnimating === false ) return;

			animationLoop( time, frame );

			context.requestAnimationFrame( onAnimationFrame );

		}

		return {

			start: function () {

				if ( isAnimating === true ) return;
				if ( animationLoop === null ) return;

				context.requestAnimationFrame( onAnimationFrame );

				isAnimating = true;

			},

			stop: function () {

				isAnimating = false;

			},

			setAnimationLoop: function ( callback ) {

				animationLoop = callback;

			},

			setContext: function ( value ) {

				context = value;

			}

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLAttributes( gl ) {

		var buffers = new WeakMap();

		function createBuffer( attribute, bufferType ) {

			var array = attribute.array;
			var usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

			var buffer = gl.createBuffer();

			gl.bindBuffer( bufferType, buffer );
			gl.bufferData( bufferType, array, usage );

			attribute.onUploadCallback();

			var type = gl.FLOAT;

			if ( array instanceof Float32Array ) {

				type = gl.FLOAT;

			} else if ( array instanceof Float64Array ) {

				console.warn( 'WebGLAttributes: Unsupported data buffer format: Float64Array.' );

			} else if ( array instanceof Uint16Array ) {

				type = gl.UNSIGNED_SHORT;

			} else if ( array instanceof Int16Array ) {

				type = gl.SHORT;

			} else if ( array instanceof Uint32Array ) {

				type = gl.UNSIGNED_INT;

			} else if ( array instanceof Int32Array ) {

				type = gl.INT;

			} else if ( array instanceof Int8Array ) {

				type = gl.BYTE;

			} else if ( array instanceof Uint8Array ) {

				type = gl.UNSIGNED_BYTE;

			}

			return {
				buffer: buffer,
				type: type,
				bytesPerElement: array.BYTES_PER_ELEMENT,
				version: attribute.version
			};

		}

		function updateBuffer( buffer, attribute, bufferType ) {

			var array = attribute.array;
			var updateRange = attribute.updateRange;

			gl.bindBuffer( bufferType, buffer );

			if ( attribute.dynamic === false ) {

				gl.bufferData( bufferType, array, gl.STATIC_DRAW );

			} else if ( updateRange.count === - 1 ) {

				// Not using update ranges

				gl.bufferSubData( bufferType, 0, array );

			} else if ( updateRange.count === 0 ) {

				console.error( 'WebGLObjects.updateBuffer: dynamic BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.' );

			} else {

				gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
					array.subarray( updateRange.offset, updateRange.offset + updateRange.count ) );

				updateRange.count = - 1; // reset range

			}

		}

		//

		function get( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			return buffers.get( attribute );

		}

		function remove( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			var data = buffers.get( attribute );

			if ( data ) {

				gl.deleteBuffer( data.buffer );

				buffers.delete( attribute );

			}

		}

		function update( attribute, bufferType ) {

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			var data = buffers.get( attribute );

			if ( data === undefined ) {

				buffers.set( attribute, createBuffer( attribute, bufferType ) );

			} else if ( data.version < attribute.version ) {

				updateBuffer( data.buffer, attribute, bufferType );

				data.version = attribute.version;

			}

		}

		return {

			get: get,
			remove: remove,
			update: update

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Face3( a, b, c, normal, color, materialIndex ) {

		this.a = a;
		this.b = b;
		this.c = c;

		this.normal = ( normal && normal.isVector3 ) ? normal : new Vector3();
		this.vertexNormals = Array.isArray( normal ) ? normal : [];

		this.color = ( color && color.isColor ) ? color : new Color();
		this.vertexColors = Array.isArray( color ) ? color : [];

		this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

	}

	Object.assign( Face3.prototype, {

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.a = source.a;
			this.b = source.b;
			this.c = source.c;

			this.normal.copy( source.normal );
			this.color.copy( source.color );

			this.materialIndex = source.materialIndex;

			for ( var i = 0, il = source.vertexNormals.length; i < il; i ++ ) {

				this.vertexNormals[ i ] = source.vertexNormals[ i ].clone();

			}

			for ( var i = 0, il = source.vertexColors.length; i < il; i ++ ) {

				this.vertexColors[ i ] = source.vertexColors[ i ].clone();

			}

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Euler( x, y, z, order ) {

		this._x = x || 0;
		this._y = y || 0;
		this._z = z || 0;
		this._order = order || Euler.DefaultOrder;

	}

	Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

	Euler.DefaultOrder = 'XYZ';

	Object.defineProperties( Euler.prototype, {

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

		order: {

			get: function () {

				return this._order;

			},

			set: function ( value ) {

				this._order = value;
				this.onChangeCallback();

			}

		}

	} );

	Object.assign( Euler.prototype, {

		isEuler: true,

		set: function ( x, y, z, order ) {

			this._x = x;
			this._y = y;
			this._z = z;
			this._order = order || this._order;

			this.onChangeCallback();

			return this;

		},

		clone: function () {

			return new this.constructor( this._x, this._y, this._z, this._order );

		},

		copy: function ( euler ) {

			this._x = euler._x;
			this._y = euler._y;
			this._z = euler._z;
			this._order = euler._order;

			this.onChangeCallback();

			return this;

		},

		setFromRotationMatrix: function ( m, order, update ) {

			var clamp = _Math.clamp;

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			var te = m.elements;
			var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
			var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
			var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

			order = order || this._order;

			if ( order === 'XYZ' ) {

				this._y = Math.asin( clamp( m13, - 1, 1 ) );

				if ( Math.abs( m13 ) < 0.99999 ) {

					this._x = Math.atan2( - m23, m33 );
					this._z = Math.atan2( - m12, m11 );

				} else {

					this._x = Math.atan2( m32, m22 );
					this._z = 0;

				}

			} else if ( order === 'YXZ' ) {

				this._x = Math.asin( - clamp( m23, - 1, 1 ) );

				if ( Math.abs( m23 ) < 0.99999 ) {

					this._y = Math.atan2( m13, m33 );
					this._z = Math.atan2( m21, m22 );

				} else {

					this._y = Math.atan2( - m31, m11 );
					this._z = 0;

				}

			} else if ( order === 'ZXY' ) {

				this._x = Math.asin( clamp( m32, - 1, 1 ) );

				if ( Math.abs( m32 ) < 0.99999 ) {

					this._y = Math.atan2( - m31, m33 );
					this._z = Math.atan2( - m12, m22 );

				} else {

					this._y = 0;
					this._z = Math.atan2( m21, m11 );

				}

			} else if ( order === 'ZYX' ) {

				this._y = Math.asin( - clamp( m31, - 1, 1 ) );

				if ( Math.abs( m31 ) < 0.99999 ) {

					this._x = Math.atan2( m32, m33 );
					this._z = Math.atan2( m21, m11 );

				} else {

					this._x = 0;
					this._z = Math.atan2( - m12, m22 );

				}

			} else if ( order === 'YZX' ) {

				this._z = Math.asin( clamp( m21, - 1, 1 ) );

				if ( Math.abs( m21 ) < 0.99999 ) {

					this._x = Math.atan2( - m23, m22 );
					this._y = Math.atan2( - m31, m11 );

				} else {

					this._x = 0;
					this._y = Math.atan2( m13, m33 );

				}

			} else if ( order === 'XZY' ) {

				this._z = Math.asin( - clamp( m12, - 1, 1 ) );

				if ( Math.abs( m12 ) < 0.99999 ) {

					this._x = Math.atan2( m32, m22 );
					this._y = Math.atan2( m13, m11 );

				} else {

					this._x = Math.atan2( - m23, m33 );
					this._y = 0;

				}

			} else {

				console.warn( 'Euler: .setFromRotationMatrix() given unsupported order: ' + order );

			}

			this._order = order;

			if ( update !== false ) this.onChangeCallback();

			return this;

		},

		setFromQuaternion: function () {

			var matrix = new Matrix4();

			return function setFromQuaternion( q, order, update ) {

				matrix.makeRotationFromQuaternion( q );

				return this.setFromRotationMatrix( matrix, order, update );

			};

		}(),

		setFromVector3: function ( v, order ) {

			return this.set( v.x, v.y, v.z, order || this._order );

		},

		reorder: function () {

			// WARNING: this discards revolution information -bhouston

			var q = new Quaternion();

			return function reorder( newOrder ) {

				q.setFromEuler( this );

				return this.setFromQuaternion( q, newOrder );

			};

		}(),

		equals: function ( euler ) {

			return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

		},

		fromArray: function ( array ) {

			this._x = array[ 0 ];
			this._y = array[ 1 ];
			this._z = array[ 2 ];
			if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

			this.onChangeCallback();

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this._x;
			array[ offset + 1 ] = this._y;
			array[ offset + 2 ] = this._z;
			array[ offset + 3 ] = this._order;

			return array;

		},

		toVector3: function ( optionalResult ) {

			if ( optionalResult ) {

				return optionalResult.set( this._x, this._y, this._z );

			} else {

				return new Vector3( this._x, this._y, this._z );

			}

		},

		onChange: function ( callback ) {

			this.onChangeCallback = callback;

			return this;

		},

		onChangeCallback: function () {}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Layers() {

		this.mask = 1 | 0;

	}

	Object.assign( Layers.prototype, {

		set: function ( channel ) {

			this.mask = 1 << channel | 0;

		},

		enable: function ( channel ) {

			this.mask |= 1 << channel | 0;

		},

		toggle: function ( channel ) {

			this.mask ^= 1 << channel | 0;

		},

		disable: function ( channel ) {

			this.mask &= ~ ( 1 << channel | 0 );

		},

		test: function ( layers ) {

			return ( this.mask & layers.mask ) !== 0;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var object3DId = 0;

	function Object3D() {

		Object.defineProperty( this, 'id', { value: object3DId ++ } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'Object3D';

		this.parent = null;
		this.children = [];

		this.up = Object3D.DefaultUp.clone();

		var position = new Vector3();
		var rotation = new Euler();
		var quaternion = new Quaternion();
		var scale = new Vector3( 1, 1, 1 );

		function onRotationChange() {

			quaternion.setFromEuler( rotation, false );

		}

		function onQuaternionChange() {

			rotation.setFromQuaternion( quaternion, undefined, false );

		}

		rotation.onChange( onRotationChange );
		quaternion.onChange( onQuaternionChange );

		Object.defineProperties( this, {
			position: {
				configurable: true,
				enumerable: true,
				value: position
			},
			rotation: {
				configurable: true,
				enumerable: true,
				value: rotation
			},
			quaternion: {
				configurable: true,
				enumerable: true,
				value: quaternion
			},
			scale: {
				configurable: true,
				enumerable: true,
				value: scale
			},
			modelViewMatrix: {
				value: new Matrix4()
			},
			normalMatrix: {
				value: new Matrix3()
			}
		} );

		this.matrix = new Matrix4();
		this.matrixWorld = new Matrix4();

		this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
		this.matrixWorldNeedsUpdate = false;

		this.layers = new Layers();
		this.visible = true;

		this.castShadow = false;
		this.receiveShadow = false;

		this.frustumCulled = true;
		this.renderOrder = 0;

		this.userData = {};

	}

	Object3D.DefaultUp = new Vector3( 0, 1, 0 );
	Object3D.DefaultMatrixAutoUpdate = true;

	Object3D.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Object3D,

		isObject3D: true,

		onBeforeRender: function () {},
		onAfterRender: function () {},

		applyMatrix: function ( matrix ) {

			this.matrix.multiplyMatrices( matrix, this.matrix );

			this.matrix.decompose( this.position, this.quaternion, this.scale );

		},

		applyQuaternion: function ( q ) {

			this.quaternion.premultiply( q );

			return this;

		},

		setRotationFromAxisAngle: function ( axis, angle ) {

			// assumes axis is normalized

			this.quaternion.setFromAxisAngle( axis, angle );

		},

		setRotationFromEuler: function ( euler ) {

			this.quaternion.setFromEuler( euler, true );

		},

		setRotationFromMatrix: function ( m ) {

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			this.quaternion.setFromRotationMatrix( m );

		},

		setRotationFromQuaternion: function ( q ) {

			// assumes q is normalized

			this.quaternion.copy( q );

		},

		rotateOnAxis: function () {

			// rotate object on axis in object space
			// axis is assumed to be normalized

			var q1 = new Quaternion();

			return function rotateOnAxis( axis, angle ) {

				q1.setFromAxisAngle( axis, angle );

				this.quaternion.multiply( q1 );

				return this;

			};

		}(),

		rotateOnWorldAxis: function () {

			// rotate object on axis in world space
			// axis is assumed to be normalized
			// method assumes no rotated parent

			var q1 = new Quaternion();

			return function rotateOnWorldAxis( axis, angle ) {

				q1.setFromAxisAngle( axis, angle );

				this.quaternion.premultiply( q1 );

				return this;

			};

		}(),

		rotateX: function () {

			var v1 = new Vector3( 1, 0, 0 );

			return function rotateX( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		rotateY: function () {

			var v1 = new Vector3( 0, 1, 0 );

			return function rotateY( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		rotateZ: function () {

			var v1 = new Vector3( 0, 0, 1 );

			return function rotateZ( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		translateOnAxis: function () {

			// translate object by distance along axis in object space
			// axis is assumed to be normalized

			var v1 = new Vector3();

			return function translateOnAxis( axis, distance ) {

				v1.copy( axis ).applyQuaternion( this.quaternion );

				this.position.add( v1.multiplyScalar( distance ) );

				return this;

			};

		}(),

		translateX: function () {

			var v1 = new Vector3( 1, 0, 0 );

			return function translateX( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		translateY: function () {

			var v1 = new Vector3( 0, 1, 0 );

			return function translateY( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		translateZ: function () {

			var v1 = new Vector3( 0, 0, 1 );

			return function translateZ( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		localToWorld: function ( vector ) {

			return vector.applyMatrix4( this.matrixWorld );

		},

		worldToLocal: function () {

			var m1 = new Matrix4();

			return function worldToLocal( vector ) {

				return vector.applyMatrix4( m1.getInverse( this.matrixWorld ) );

			};

		}(),

		lookAt: function () {

			// This method does not support objects having non-uniformly-scaled parent(s)

			var q1 = new Quaternion();
			var m1 = new Matrix4();
			var target = new Vector3();
			var position = new Vector3();

			return function lookAt( x, y, z ) {

				if ( x.isVector3 ) {

					target.copy( x );

				} else {

					target.set( x, y, z );

				}

				var parent = this.parent;

				this.updateWorldMatrix( true, false );

				position.setFromMatrixPosition( this.matrixWorld );

				if ( this.isCamera ) {

					m1.lookAt( position, target, this.up );

				} else {

					m1.lookAt( target, position, this.up );

				}

				this.quaternion.setFromRotationMatrix( m1 );

				if ( parent ) {

					m1.extractRotation( parent.matrixWorld );
					q1.setFromRotationMatrix( m1 );
					this.quaternion.premultiply( q1.inverse() );

				}

			};

		}(),

		add: function ( object ) {

			if ( arguments.length > 1 ) {

				for ( var i = 0; i < arguments.length; i ++ ) {

					this.add( arguments[ i ] );

				}

				return this;

			}

			if ( object === this ) {

				console.error( "Object3D.add: object can't be added as a child of itself.", object );
				return this;

			}

			if ( ( object && object.isObject3D ) ) {

				if ( object.parent !== null ) {

					object.parent.remove( object );

				}

				object.parent = this;
				object.dispatchEvent( { type: 'added' } );

				this.children.push( object );

			} else {

				console.error( "Object3D.add: object not an instance of Object3D.", object );

			}

			return this;

		},

		remove: function ( object ) {

			if ( arguments.length > 1 ) {

				for ( var i = 0; i < arguments.length; i ++ ) {

					this.remove( arguments[ i ] );

				}

				return this;

			}

			var index = this.children.indexOf( object );

			if ( index !== - 1 ) {

				object.parent = null;

				object.dispatchEvent( { type: 'removed' } );

				this.children.splice( index, 1 );

			}

			return this;

		},

		getObjectById: function ( id ) {

			return this.getObjectByProperty( 'id', id );

		},

		getObjectByName: function ( name ) {

			return this.getObjectByProperty( 'name', name );

		},

		getObjectByProperty: function ( name, value ) {

			if ( this[ name ] === value ) return this;

			for ( var i = 0, l = this.children.length; i < l; i ++ ) {

				var child = this.children[ i ];
				var object = child.getObjectByProperty( name, value );

				if ( object !== undefined ) {

					return object;

				}

			}

			return undefined;

		},

		getWorldPosition: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Object3D: .getWorldPosition() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			return target.setFromMatrixPosition( this.matrixWorld );

		},

		getWorldQuaternion: function () {

			var position = new Vector3();
			var scale = new Vector3();

			return function getWorldQuaternion( target ) {

				if ( target === undefined ) {

					console.warn( 'Object3D: .getWorldQuaternion() target is now required' );
					target = new Quaternion();

				}

				this.updateMatrixWorld( true );

				this.matrixWorld.decompose( position, target, scale );

				return target;

			};

		}(),

		getWorldScale: function () {

			var position = new Vector3();
			var quaternion = new Quaternion();

			return function getWorldScale( target ) {

				if ( target === undefined ) {

					console.warn( 'Object3D: .getWorldScale() target is now required' );
					target = new Vector3();

				}

				this.updateMatrixWorld( true );

				this.matrixWorld.decompose( position, quaternion, target );

				return target;

			};

		}(),

		getWorldDirection: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Object3D: .getWorldDirection() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			var e = this.matrixWorld.elements;

			return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

		},

		raycast: function () {},

		traverse: function ( callback ) {

			callback( this );

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverse( callback );

			}

		},

		traverseVisible: function ( callback ) {

			if ( this.visible === false ) return;

			callback( this );

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverseVisible( callback );

			}

		},

		traverseAncestors: function ( callback ) {

			var parent = this.parent;

			if ( parent !== null ) {

				callback( parent );

				parent.traverseAncestors( callback );

			}

		},

		updateMatrix: function () {

			this.matrix.compose( this.position, this.quaternion, this.scale );

			this.matrixWorldNeedsUpdate = true;

		},

		updateMatrixWorld: function ( force ) {

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			if ( this.matrixWorldNeedsUpdate || force ) {

				if ( this.parent === null ) {

					this.matrixWorld.copy( this.matrix );

				} else {

					this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

				}

				this.matrixWorldNeedsUpdate = false;

				force = true;

			}

			// update children

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].updateMatrixWorld( force );

			}

		},

		updateWorldMatrix: function ( updateParents, updateChildren ) {

			var parent = this.parent;

			if ( updateParents === true && parent !== null ) {

				parent.updateWorldMatrix( true, false );

			}

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			// update children

			if ( updateChildren === true ) {

				var children = this.children;

				for ( var i = 0, l = children.length; i < l; i ++ ) {

					children[ i ].updateWorldMatrix( false, true );

				}

			}

		},

		toJSON: function ( meta ) {

			// meta is a string when called from JSON.stringify
			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			var output = {};

			// meta is a hash used to collect geometries, materials.
			// not providing it implies that this is the root object
			// being serialized.
			if ( isRootObject ) {

				// initialize meta obj
				meta = {
					geometries: {},
					materials: {},
					textures: {},
					images: {},
					shapes: {}
				};

				output.metadata = {
					version: 4.5,
					type: 'Object',
					generator: 'Object3D.toJSON'
				};

			}

			// standard Object3D serialization

			var object = {};

			object.uuid = this.uuid;
			object.type = this.type;

			if ( this.name !== '' ) object.name = this.name;
			if ( this.castShadow === true ) object.castShadow = true;
			if ( this.receiveShadow === true ) object.receiveShadow = true;
			if ( this.visible === false ) object.visible = false;
			if ( this.frustumCulled === false ) object.frustumCulled = false;
			if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
			if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;

			object.layers = this.layers.mask;
			object.matrix = this.matrix.toArray();

			if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

			//

			function serialize( library, element ) {

				if ( library[ element.uuid ] === undefined ) {

					library[ element.uuid ] = element.toJSON( meta );

				}

				return element.uuid;

			}

			if ( this.isMesh || this.isLine || this.isPoints ) {

				object.geometry = serialize( meta.geometries, this.geometry );

				var parameters = this.geometry.parameters;

				if ( parameters !== undefined && parameters.shapes !== undefined ) {

					var shapes = parameters.shapes;

					if ( Array.isArray( shapes ) ) {

						for ( var i = 0, l = shapes.length; i < l; i ++ ) {

							var shape = shapes[ i ];

							serialize( meta.shapes, shape );

						}

					} else {

						serialize( meta.shapes, shapes );

					}

				}

			}

			if ( this.material !== undefined ) {

				if ( Array.isArray( this.material ) ) {

					var uuids = [];

					for ( var i = 0, l = this.material.length; i < l; i ++ ) {

						uuids.push( serialize( meta.materials, this.material[ i ] ) );

					}

					object.material = uuids;

				} else {

					object.material = serialize( meta.materials, this.material );

				}

			}

			//

			if ( this.children.length > 0 ) {

				object.children = [];

				for ( var i = 0; i < this.children.length; i ++ ) {

					object.children.push( this.children[ i ].toJSON( meta ).object );

				}

			}

			if ( isRootObject ) {

				var geometries = extractFromCache( meta.geometries );
				var materials = extractFromCache( meta.materials );
				var textures = extractFromCache( meta.textures );
				var images = extractFromCache( meta.images );
				var shapes = extractFromCache( meta.shapes );

				if ( geometries.length > 0 ) output.geometries = geometries;
				if ( materials.length > 0 ) output.materials = materials;
				if ( textures.length > 0 ) output.textures = textures;
				if ( images.length > 0 ) output.images = images;
				if ( shapes.length > 0 ) output.shapes = shapes;

			}

			output.object = object;

			return output;

			// extract data from the cache hash
			// remove metadata on each item
			// and return as array
			function extractFromCache( cache ) {

				var values = [];
				for ( var key in cache ) {

					var data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}
				return values;

			}

		},

		clone: function ( recursive ) {

			return new this.constructor().copy( this, recursive );

		},

		copy: function ( source, recursive ) {

			if ( recursive === undefined ) recursive = true;

			this.name = source.name;

			this.up.copy( source.up );

			this.position.copy( source.position );
			this.quaternion.copy( source.quaternion );
			this.scale.copy( source.scale );

			this.matrix.copy( source.matrix );
			this.matrixWorld.copy( source.matrixWorld );

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

			this.layers.mask = source.layers.mask;
			this.visible = source.visible;

			this.castShadow = source.castShadow;
			this.receiveShadow = source.receiveShadow;

			this.frustumCulled = source.frustumCulled;
			this.renderOrder = source.renderOrder;

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			if ( recursive === true ) {

				for ( var i = 0; i < source.children.length; i ++ ) {

					var child = source.children[ i ];
					this.add( child.clone() );

				}

			}

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var geometryId = 0; // Geometry uses even numbers as Id

	function Geometry() {

		Object.defineProperty( this, 'id', { value: geometryId += 2 } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'Geometry';

		this.vertices = [];
		this.colors = [];
		this.faces = [];
		this.faceVertexUvs = [[]];

		this.morphTargets = [];
		this.morphNormals = [];

		this.skinWeights = [];
		this.skinIndices = [];

		this.lineDistances = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		// update flags

		this.elementsNeedUpdate = false;
		this.verticesNeedUpdate = false;
		this.uvsNeedUpdate = false;
		this.normalsNeedUpdate = false;
		this.colorsNeedUpdate = false;
		this.lineDistancesNeedUpdate = false;
		this.groupsNeedUpdate = false;

	}

	Geometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Geometry,

		isGeometry: true,

		applyMatrix: function ( matrix ) {

			var normalMatrix = new Matrix3().getNormalMatrix( matrix );

			for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

				var vertex = this.vertices[ i ];
				vertex.applyMatrix4( matrix );

			}

			for ( var i = 0, il = this.faces.length; i < il; i ++ ) {

				var face = this.faces[ i ];
				face.normal.applyMatrix3( normalMatrix ).normalize();

				for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

					face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

				}

			}

			if ( this.boundingBox !== null ) {

				this.computeBoundingBox();

			}

			if ( this.boundingSphere !== null ) {

				this.computeBoundingSphere();

			}

			this.verticesNeedUpdate = true;
			this.normalsNeedUpdate = true;

			return this;

		},

		rotateX: function () {

			// rotate geometry around world x-axis

			var m1 = new Matrix4();

			return function rotateX( angle ) {

				m1.makeRotationX( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateY: function () {

			// rotate geometry around world y-axis

			var m1 = new Matrix4();

			return function rotateY( angle ) {

				m1.makeRotationY( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateZ: function () {

			// rotate geometry around world z-axis

			var m1 = new Matrix4();

			return function rotateZ( angle ) {

				m1.makeRotationZ( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		translate: function () {

			// translate geometry

			var m1 = new Matrix4();

			return function translate( x, y, z ) {

				m1.makeTranslation( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		scale: function () {

			// scale geometry

			var m1 = new Matrix4();

			return function scale( x, y, z ) {

				m1.makeScale( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		lookAt: function () {

			var obj = new Object3D();

			return function lookAt( vector ) {

				obj.lookAt( vector );

				obj.updateMatrix();

				this.applyMatrix( obj.matrix );

			};

		}(),

		fromBufferGeometry: function ( geometry ) {

			var scope = this;

			var indices = geometry.index !== null ? geometry.index.array : undefined;
			var attributes = geometry.attributes;

			var positions = attributes.position.array;
			var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
			var colors = attributes.color !== undefined ? attributes.color.array : undefined;
			var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
			var uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;

			if ( uvs2 !== undefined ) this.faceVertexUvs[ 1 ] = [];

			for ( var i = 0, j = 0; i < positions.length; i += 3, j += 2 ) {

				scope.vertices.push( new Vector3().fromArray( positions, i ) );

				if ( colors !== undefined ) {

					scope.colors.push( new Color().fromArray( colors, i ) );

				}

			}

			function addFace( a, b, c, materialIndex ) {

				var vertexColors = ( colors === undefined ) ? [] : [
					scope.colors[ a ].clone(),
					scope.colors[ b ].clone(),
					scope.colors[ c ].clone() ];

				var vertexNormals = ( normals === undefined ) ? [] : [
					new Vector3().fromArray( normals, a * 3 ),
					new Vector3().fromArray( normals, b * 3 ),
					new Vector3().fromArray( normals, c * 3 )
				];

				var face = new Face3( a, b, c, vertexNormals, vertexColors, materialIndex );

				scope.faces.push( face );

				if ( uvs !== undefined ) {

					scope.faceVertexUvs[ 0 ].push( [
						new Vector2().fromArray( uvs, a * 2 ),
						new Vector2().fromArray( uvs, b * 2 ),
						new Vector2().fromArray( uvs, c * 2 )
					] );

				}

				if ( uvs2 !== undefined ) {

					scope.faceVertexUvs[ 1 ].push( [
						new Vector2().fromArray( uvs2, a * 2 ),
						new Vector2().fromArray( uvs2, b * 2 ),
						new Vector2().fromArray( uvs2, c * 2 )
					] );

				}

			}

			var groups = geometry.groups;

			if ( groups.length > 0 ) {

				for ( var i = 0; i < groups.length; i ++ ) {

					var group = groups[ i ];

					var start = group.start;
					var count = group.count;

					for ( var j = start, jl = start + count; j < jl; j += 3 ) {

						if ( indices !== undefined ) {

							addFace( indices[ j ], indices[ j + 1 ], indices[ j + 2 ], group.materialIndex );

						} else {

							addFace( j, j + 1, j + 2, group.materialIndex );

						}

					}

				}

			} else {

				if ( indices !== undefined ) {

					for ( var i = 0; i < indices.length; i += 3 ) {

						addFace( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

					}

				} else {

					for ( var i = 0; i < positions.length / 3; i += 3 ) {

						addFace( i, i + 1, i + 2 );

					}

				}

			}

			this.computeFaceNormals();

			if ( geometry.boundingBox !== null ) {

				this.boundingBox = geometry.boundingBox.clone();

			}

			if ( geometry.boundingSphere !== null ) {

				this.boundingSphere = geometry.boundingSphere.clone();

			}

			return this;

		},

		center: function () {

			var offset = new Vector3();

			return function center() {

				this.computeBoundingBox();

				this.boundingBox.getCenter( offset ).negate();

				this.translate( offset.x, offset.y, offset.z );

				return this;

			};

		}(),

		normalize: function () {

			this.computeBoundingSphere();

			var center = this.boundingSphere.center;
			var radius = this.boundingSphere.radius;

			var s = radius === 0 ? 1 : 1.0 / radius;

			var matrix = new Matrix4();
			matrix.set(
				s, 0, 0, - s * center.x,
				0, s, 0, - s * center.y,
				0, 0, s, - s * center.z,
				0, 0, 0, 1
			);

			this.applyMatrix( matrix );

			return this;

		},

		computeFaceNormals: function () {

			var cb = new Vector3(), ab = new Vector3();

			for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

				var face = this.faces[ f ];

				var vA = this.vertices[ face.a ];
				var vB = this.vertices[ face.b ];
				var vC = this.vertices[ face.c ];

				cb.subVectors( vC, vB );
				ab.subVectors( vA, vB );
				cb.cross( ab );

				cb.normalize();

				face.normal.copy( cb );

			}

		},

		computeVertexNormals: function ( areaWeighted ) {

			if ( areaWeighted === undefined ) areaWeighted = true;

			var v, vl, f, fl, face, vertices;

			vertices = new Array( this.vertices.length );

			for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ] = new Vector3();

			}

			if ( areaWeighted ) {

				// vertex normals weighted by triangle areas
				// http://www.iquilezles.org/www/articles/normals/normals.htm

				var vA, vB, vC;
				var cb = new Vector3(), ab = new Vector3();

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					face = this.faces[ f ];

					vA = this.vertices[ face.a ];
					vB = this.vertices[ face.b ];
					vC = this.vertices[ face.c ];

					cb.subVectors( vC, vB );
					ab.subVectors( vA, vB );
					cb.cross( ab );

					vertices[ face.a ].add( cb );
					vertices[ face.b ].add( cb );
					vertices[ face.c ].add( cb );

				}

			} else {

				this.computeFaceNormals();

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					face = this.faces[ f ];

					vertices[ face.a ].add( face.normal );
					vertices[ face.b ].add( face.normal );
					vertices[ face.c ].add( face.normal );

				}

			}

			for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ].normalize();

			}

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				var vertexNormals = face.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					vertexNormals[ 0 ].copy( vertices[ face.a ] );
					vertexNormals[ 1 ].copy( vertices[ face.b ] );
					vertexNormals[ 2 ].copy( vertices[ face.c ] );

				} else {

					vertexNormals[ 0 ] = vertices[ face.a ].clone();
					vertexNormals[ 1 ] = vertices[ face.b ].clone();
					vertexNormals[ 2 ] = vertices[ face.c ].clone();

				}

			}

			if ( this.faces.length > 0 ) {

				this.normalsNeedUpdate = true;

			}

		},

		computeFlatVertexNormals: function () {

			var f, fl, face;

			this.computeFaceNormals();

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				var vertexNormals = face.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					vertexNormals[ 0 ].copy( face.normal );
					vertexNormals[ 1 ].copy( face.normal );
					vertexNormals[ 2 ].copy( face.normal );

				} else {

					vertexNormals[ 0 ] = face.normal.clone();
					vertexNormals[ 1 ] = face.normal.clone();
					vertexNormals[ 2 ] = face.normal.clone();

				}

			}

			if ( this.faces.length > 0 ) {

				this.normalsNeedUpdate = true;

			}

		},

		computeMorphNormals: function () {

			var i, il, f, fl, face;

			// save original normals
			// - create temp variables on first access
			//   otherwise just copy (for faster repeated calls)

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				if ( ! face.__originalFaceNormal ) {

					face.__originalFaceNormal = face.normal.clone();

				} else {

					face.__originalFaceNormal.copy( face.normal );

				}

				if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

				for ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

					if ( ! face.__originalVertexNormals[ i ] ) {

						face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

					} else {

						face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

					}

				}

			}

			// use temp geometry to compute face and vertex normals for each morph

			var tmpGeo = new Geometry();
			tmpGeo.faces = this.faces;

			for ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {

				// create on first access

				if ( ! this.morphNormals[ i ] ) {

					this.morphNormals[ i ] = {};
					this.morphNormals[ i ].faceNormals = [];
					this.morphNormals[ i ].vertexNormals = [];

					var dstNormalsFace = this.morphNormals[ i ].faceNormals;
					var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

					var faceNormal, vertexNormals;

					for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

						faceNormal = new Vector3();
						vertexNormals = { a: new Vector3(), b: new Vector3(), c: new Vector3() };

						dstNormalsFace.push( faceNormal );
						dstNormalsVertex.push( vertexNormals );

					}

				}

				var morphNormals = this.morphNormals[ i ];

				// set vertices to morph target

				tmpGeo.vertices = this.morphTargets[ i ].vertices;

				// compute morph normals

				tmpGeo.computeFaceNormals();
				tmpGeo.computeVertexNormals();

				// store morph normals

				var faceNormal, vertexNormals;

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					face = this.faces[ f ];

					faceNormal = morphNormals.faceNormals[ f ];
					vertexNormals = morphNormals.vertexNormals[ f ];

					faceNormal.copy( face.normal );

					vertexNormals.a.copy( face.vertexNormals[ 0 ] );
					vertexNormals.b.copy( face.vertexNormals[ 1 ] );
					vertexNormals.c.copy( face.vertexNormals[ 2 ] );

				}

			}

			// restore original normals

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				face.normal = face.__originalFaceNormal;
				face.vertexNormals = face.__originalVertexNormals;

			}

		},

		computeBoundingBox: function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new Box3();

			}

			this.boundingBox.setFromPoints( this.vertices );

		},

		computeBoundingSphere: function () {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new Sphere();

			}

			this.boundingSphere.setFromPoints( this.vertices );

		},

		merge: function ( geometry, matrix, materialIndexOffset ) {

			if ( ! ( geometry && geometry.isGeometry ) ) {

				console.error( 'Geometry.merge(): geometry not an instance of Geometry.', geometry );
				return;

			}

			var normalMatrix,
				vertexOffset = this.vertices.length,
				vertices1 = this.vertices,
				vertices2 = geometry.vertices,
				faces1 = this.faces,
				faces2 = geometry.faces,
				uvs1 = this.faceVertexUvs[ 0 ],
				uvs2 = geometry.faceVertexUvs[ 0 ],
				colors1 = this.colors,
				colors2 = geometry.colors;

			if ( materialIndexOffset === undefined ) materialIndexOffset = 0;

			if ( matrix !== undefined ) {

				normalMatrix = new Matrix3().getNormalMatrix( matrix );

			}

			// vertices

			for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

				var vertex = vertices2[ i ];

				var vertexCopy = vertex.clone();

				if ( matrix !== undefined ) vertexCopy.applyMatrix4( matrix );

				vertices1.push( vertexCopy );

			}

			// colors

			for ( var i = 0, il = colors2.length; i < il; i ++ ) {

				colors1.push( colors2[ i ].clone() );

			}

			// faces

			for ( i = 0, il = faces2.length; i < il; i ++ ) {

				var face = faces2[ i ], faceCopy, normal, color,
					faceVertexNormals = face.vertexNormals,
					faceVertexColors = face.vertexColors;

				faceCopy = new Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );
				faceCopy.normal.copy( face.normal );

				if ( normalMatrix !== undefined ) {

					faceCopy.normal.applyMatrix3( normalMatrix ).normalize();

				}

				for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {

					normal = faceVertexNormals[ j ].clone();

					if ( normalMatrix !== undefined ) {

						normal.applyMatrix3( normalMatrix ).normalize();

					}

					faceCopy.vertexNormals.push( normal );

				}

				faceCopy.color.copy( face.color );

				for ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {

					color = faceVertexColors[ j ];
					faceCopy.vertexColors.push( color.clone() );

				}

				faceCopy.materialIndex = face.materialIndex + materialIndexOffset;

				faces1.push( faceCopy );

			}

			// uvs

			for ( i = 0, il = uvs2.length; i < il; i ++ ) {

				var uv = uvs2[ i ], uvCopy = [];

				if ( uv === undefined ) {

					continue;

				}

				for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

					uvCopy.push( uv[ j ].clone() );

				}

				uvs1.push( uvCopy );

			}

		},

		mergeMesh: function ( mesh ) {

			if ( ! ( mesh && mesh.isMesh ) ) {

				console.error( 'Geometry.mergeMesh(): mesh not an instance of Mesh.', mesh );
				return;

			}

			if ( mesh.matrixAutoUpdate ) mesh.updateMatrix();

			this.merge( mesh.geometry, mesh.matrix );

		},
		mergeVertices: function () {

			var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
			var unique = [], changes = [];

			var v, key;
			var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
			var precision = Math.pow( 10, precisionPoints );
			var i, il, face;
			var indices, j, jl;

			for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

				v = this.vertices[ i ];
				key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );

				if ( verticesMap[ key ] === undefined ) {

					verticesMap[ key ] = i;
					unique.push( this.vertices[ i ] );
					changes[ i ] = unique.length - 1;

				} else {

					//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
					changes[ i ] = changes[ verticesMap[ key ] ];

				}

			}
			// if faces are completely degenerate after merging vertices, we
			// have to remove them from the geometry.
			var faceIndicesToRemove = [];

			for ( i = 0, il = this.faces.length; i < il; i ++ ) {

				face = this.faces[ i ];

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];

				indices = [ face.a, face.b, face.c ];

				// if any duplicate vertices are found in a Face3
				// we have to remove the face as nothing can be saved
				for ( var n = 0; n < 3; n ++ ) {

					if ( indices[ n ] === indices[ ( n + 1 ) % 3 ] ) {

						faceIndicesToRemove.push( i );
						break;

					}

				}

			}

			for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {

				var idx = faceIndicesToRemove[ i ];

				this.faces.splice( idx, 1 );

				for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

					this.faceVertexUvs[ j ].splice( idx, 1 );

				}

			}

			// Use unique set of vertices

			var diff = this.vertices.length - unique.length;
			this.vertices = unique;
			return diff;

		},

		setFromPoints: function ( points ) {

			this.vertices = [];

			for ( var i = 0, l = points.length; i < l; i ++ ) {

				var point = points[ i ];
				this.vertices.push( new Vector3( point.x, point.y, point.z || 0 ) );

			}

			return this;

		},

		sortFacesByMaterialIndex: function () {

			var faces = this.faces;
			var length = faces.length;

			// tag faces

			for ( var i = 0; i < length; i ++ ) {

				faces[ i ]._id = i;

			}

			// sort faces

			function materialIndexSort( a, b ) {

				return a.materialIndex - b.materialIndex;

			}

			faces.sort( materialIndexSort );

			// sort uvs

			var uvs1 = this.faceVertexUvs[ 0 ];
			var uvs2 = this.faceVertexUvs[ 1 ];

			var newUvs1, newUvs2;

			if ( uvs1 && uvs1.length === length ) newUvs1 = [];
			if ( uvs2 && uvs2.length === length ) newUvs2 = [];

			for ( var i = 0; i < length; i ++ ) {

				var id = faces[ i ]._id;

				if ( newUvs1 ) newUvs1.push( uvs1[ id ] );
				if ( newUvs2 ) newUvs2.push( uvs2[ id ] );

			}

			if ( newUvs1 ) this.faceVertexUvs[ 0 ] = newUvs1;
			if ( newUvs2 ) this.faceVertexUvs[ 1 ] = newUvs2;

		},

		toJSON: function () {

			var data = {
				metadata: {
					version: 4.5,
					type: 'Geometry',
					generator: 'Geometry.toJSON'
				}
			};

			// standard Geometry serialization

			data.uuid = this.uuid;
			data.type = this.type;
			if ( this.name !== '' ) data.name = this.name;

			if ( this.parameters !== undefined ) {

				var parameters = this.parameters;

				for ( var key in parameters ) {

					if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

				}

				return data;

			}

			var vertices = [];

			for ( var i = 0; i < this.vertices.length; i ++ ) {

				var vertex = this.vertices[ i ];
				vertices.push( vertex.x, vertex.y, vertex.z );

			}

			var faces = [];
			var normals = [];
			var normalsHash = {};
			var colors = [];
			var colorsHash = {};
			var uvs = [];
			var uvsHash = {};

			for ( var i = 0; i < this.faces.length; i ++ ) {

				var face = this.faces[ i ];

				var hasMaterial = true;
				var hasFaceUv = false; // deprecated
				var hasFaceVertexUv = this.faceVertexUvs[ 0 ][ i ] !== undefined;
				var hasFaceNormal = face.normal.length() > 0;
				var hasFaceVertexNormal = face.vertexNormals.length > 0;
				var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
				var hasFaceVertexColor = face.vertexColors.length > 0;

				var faceType = 0;

				faceType = setBit( faceType, 0, 0 ); // isQuad
				faceType = setBit( faceType, 1, hasMaterial );
				faceType = setBit( faceType, 2, hasFaceUv );
				faceType = setBit( faceType, 3, hasFaceVertexUv );
				faceType = setBit( faceType, 4, hasFaceNormal );
				faceType = setBit( faceType, 5, hasFaceVertexNormal );
				faceType = setBit( faceType, 6, hasFaceColor );
				faceType = setBit( faceType, 7, hasFaceVertexColor );

				faces.push( faceType );
				faces.push( face.a, face.b, face.c );
				faces.push( face.materialIndex );

				if ( hasFaceVertexUv ) {

					var faceVertexUvs = this.faceVertexUvs[ 0 ][ i ];

					faces.push(
						getUvIndex( faceVertexUvs[ 0 ] ),
						getUvIndex( faceVertexUvs[ 1 ] ),
						getUvIndex( faceVertexUvs[ 2 ] )
					);

				}

				if ( hasFaceNormal ) {

					faces.push( getNormalIndex( face.normal ) );

				}

				if ( hasFaceVertexNormal ) {

					var vertexNormals = face.vertexNormals;

					faces.push(
						getNormalIndex( vertexNormals[ 0 ] ),
						getNormalIndex( vertexNormals[ 1 ] ),
						getNormalIndex( vertexNormals[ 2 ] )
					);

				}

				if ( hasFaceColor ) {

					faces.push( getColorIndex( face.color ) );

				}

				if ( hasFaceVertexColor ) {

					var vertexColors = face.vertexColors;

					faces.push(
						getColorIndex( vertexColors[ 0 ] ),
						getColorIndex( vertexColors[ 1 ] ),
						getColorIndex( vertexColors[ 2 ] )
					);

				}

			}

			function setBit( value, position, enabled ) {

				return enabled ? value | ( 1 << position ) : value & ( ~ ( 1 << position ) );

			}

			function getNormalIndex( normal ) {

				var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

				if ( normalsHash[ hash ] !== undefined ) {

					return normalsHash[ hash ];

				}

				normalsHash[ hash ] = normals.length / 3;
				normals.push( normal.x, normal.y, normal.z );

				return normalsHash[ hash ];

			}

			function getColorIndex( color ) {

				var hash = color.r.toString() + color.g.toString() + color.b.toString();

				if ( colorsHash[ hash ] !== undefined ) {

					return colorsHash[ hash ];

				}

				colorsHash[ hash ] = colors.length;
				colors.push( color.getHex() );

				return colorsHash[ hash ];

			}

			function getUvIndex( uv ) {

				var hash = uv.x.toString() + uv.y.toString();

				if ( uvsHash[ hash ] !== undefined ) {

					return uvsHash[ hash ];

				}

				uvsHash[ hash ] = uvs.length / 2;
				uvs.push( uv.x, uv.y );

				return uvsHash[ hash ];

			}

			data.data = {};

			data.data.vertices = vertices;
			data.data.normals = normals;
			if ( colors.length > 0 ) data.data.colors = colors;
			if ( uvs.length > 0 ) data.data.uvs = [ uvs ]; // temporal backward compatibility
			data.data.faces = faces;

			return data;

		},

		clone: function () {
			return new Geometry().copy( this );

		},

		copy: function ( source ) {

			var i, il, j, jl, k, kl;

			// reset

			this.vertices = [];
			this.colors = [];
			this.faces = [];
			this.faceVertexUvs = [[]];
			this.morphTargets = [];
			this.morphNormals = [];
			this.skinWeights = [];
			this.skinIndices = [];
			this.lineDistances = [];
			this.boundingBox = null;
			this.boundingSphere = null;

			// name

			this.name = source.name;

			// vertices

			var vertices = source.vertices;

			for ( i = 0, il = vertices.length; i < il; i ++ ) {

				this.vertices.push( vertices[ i ].clone() );

			}

			// colors

			var colors = source.colors;

			for ( i = 0, il = colors.length; i < il; i ++ ) {

				this.colors.push( colors[ i ].clone() );

			}

			// faces

			var faces = source.faces;

			for ( i = 0, il = faces.length; i < il; i ++ ) {

				this.faces.push( faces[ i ].clone() );

			}

			// face vertex uvs

			for ( i = 0, il = source.faceVertexUvs.length; i < il; i ++ ) {

				var faceVertexUvs = source.faceVertexUvs[ i ];

				if ( this.faceVertexUvs[ i ] === undefined ) {

					this.faceVertexUvs[ i ] = [];

				}

				for ( j = 0, jl = faceVertexUvs.length; j < jl; j ++ ) {

					var uvs = faceVertexUvs[ j ], uvsCopy = [];

					for ( k = 0, kl = uvs.length; k < kl; k ++ ) {

						var uv = uvs[ k ];

						uvsCopy.push( uv.clone() );

					}

					this.faceVertexUvs[ i ].push( uvsCopy );

				}

			}

			// morph targets

			var morphTargets = source.morphTargets;

			for ( i = 0, il = morphTargets.length; i < il; i ++ ) {

				var morphTarget = {};
				morphTarget.name = morphTargets[ i ].name;

				// vertices

				if ( morphTargets[ i ].vertices !== undefined ) {

					morphTarget.vertices = [];

					for ( j = 0, jl = morphTargets[ i ].vertices.length; j < jl; j ++ ) {

						morphTarget.vertices.push( morphTargets[ i ].vertices[ j ].clone() );

					}

				}

				// normals

				if ( morphTargets[ i ].normals !== undefined ) {

					morphTarget.normals = [];

					for ( j = 0, jl = morphTargets[ i ].normals.length; j < jl; j ++ ) {

						morphTarget.normals.push( morphTargets[ i ].normals[ j ].clone() );

					}

				}

				this.morphTargets.push( morphTarget );

			}

			// morph normals

			var morphNormals = source.morphNormals;

			for ( i = 0, il = morphNormals.length; i < il; i ++ ) {

				var morphNormal = {};

				// vertex normals

				if ( morphNormals[ i ].vertexNormals !== undefined ) {

					morphNormal.vertexNormals = [];

					for ( j = 0, jl = morphNormals[ i ].vertexNormals.length; j < jl; j ++ ) {

						var srcVertexNormal = morphNormals[ i ].vertexNormals[ j ];
						var destVertexNormal = {};

						destVertexNormal.a = srcVertexNormal.a.clone();
						destVertexNormal.b = srcVertexNormal.b.clone();
						destVertexNormal.c = srcVertexNormal.c.clone();

						morphNormal.vertexNormals.push( destVertexNormal );

					}

				}

				// face normals

				if ( morphNormals[ i ].faceNormals !== undefined ) {

					morphNormal.faceNormals = [];

					for ( j = 0, jl = morphNormals[ i ].faceNormals.length; j < jl; j ++ ) {

						morphNormal.faceNormals.push( morphNormals[ i ].faceNormals[ j ].clone() );

					}

				}

				this.morphNormals.push( morphNormal );

			}

			// skin weights

			var skinWeights = source.skinWeights;

			for ( i = 0, il = skinWeights.length; i < il; i ++ ) {

				this.skinWeights.push( skinWeights[ i ].clone() );

			}

			// skin indices

			var skinIndices = source.skinIndices;

			for ( i = 0, il = skinIndices.length; i < il; i ++ ) {

				this.skinIndices.push( skinIndices[ i ].clone() );

			}

			// line distances

			var lineDistances = source.lineDistances;

			for ( i = 0, il = lineDistances.length; i < il; i ++ ) {

				this.lineDistances.push( lineDistances[ i ] );

			}

			// bounding box

			var boundingBox = source.boundingBox;

			if ( boundingBox !== null ) {

				this.boundingBox = boundingBox.clone();

			}

			// bounding sphere

			var boundingSphere = source.boundingSphere;

			if ( boundingSphere !== null ) {

				this.boundingSphere = boundingSphere.clone();

			}

			// update flags

			this.elementsNeedUpdate = source.elementsNeedUpdate;
			this.verticesNeedUpdate = source.verticesNeedUpdate;
			this.uvsNeedUpdate = source.uvsNeedUpdate;
			this.normalsNeedUpdate = source.normalsNeedUpdate;
			this.colorsNeedUpdate = source.colorsNeedUpdate;
			this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
			this.groupsNeedUpdate = source.groupsNeedUpdate;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function BufferAttribute( array, itemSize, normalized ) {

		if ( Array.isArray( array ) ) {

			throw new TypeError( 'BufferAttribute: array should be a Typed Array.' );

		}

		this.name = '';

		this.array = array;
		this.itemSize = itemSize;
		this.count = array !== undefined ? array.length / itemSize : 0;
		this.normalized = normalized === true;

		this.dynamic = false;
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	Object.defineProperty( BufferAttribute.prototype, 'needsUpdate', {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	Object.assign( BufferAttribute.prototype, {

		isBufferAttribute: true,

		onUploadCallback: function () {},

		setArray: function ( array ) {

			if ( Array.isArray( array ) ) {

				throw new TypeError( 'BufferAttribute: array should be a Typed Array.' );

			}

			this.count = array !== undefined ? array.length / this.itemSize : 0;
			this.array = array;

			return this;

		},

		setDynamic: function ( value ) {

			this.dynamic = value;

			return this;

		},

		copy: function ( source ) {

			this.name = source.name;
			this.array = new source.array.constructor( source.array );
			this.itemSize = source.itemSize;
			this.count = source.count;
			this.normalized = source.normalized;

			this.dynamic = source.dynamic;

			return this;

		},

		copyAt: function ( index1, attribute, index2 ) {

			index1 *= this.itemSize;
			index2 *= attribute.itemSize;

			for ( var i = 0, l = this.itemSize; i < l; i ++ ) {

				this.array[ index1 + i ] = attribute.array[ index2 + i ];

			}

			return this;

		},

		copyArray: function ( array ) {

			this.array.set( array );

			return this;

		},

		copyColorsArray: function ( colors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = colors.length; i < l; i ++ ) {

				var color = colors[ i ];

				if ( color === undefined ) {

					console.warn( 'BufferAttribute.copyColorsArray(): color is undefined', i );
					color = new Color();

				}

				array[ offset ++ ] = color.r;
				array[ offset ++ ] = color.g;
				array[ offset ++ ] = color.b;

			}

			return this;

		},

		copyVector2sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'BufferAttribute.copyVector2sArray(): vector is undefined', i );
					vector = new Vector2();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;

			}

			return this;

		},

		copyVector3sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'BufferAttribute.copyVector3sArray(): vector is undefined', i );
					vector = new Vector3();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;
				array[ offset ++ ] = vector.z;

			}

			return this;

		},

		copyVector4sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'BufferAttribute.copyVector4sArray(): vector is undefined', i );
					vector = new Vector4();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;
				array[ offset ++ ] = vector.z;
				array[ offset ++ ] = vector.w;

			}

			return this;

		},

		set: function ( value, offset ) {

			if ( offset === undefined ) offset = 0;

			this.array.set( value, offset );

			return this;

		},

		getX: function ( index ) {

			return this.array[ index * this.itemSize ];

		},

		setX: function ( index, x ) {

			this.array[ index * this.itemSize ] = x;

			return this;

		},

		getY: function ( index ) {

			return this.array[ index * this.itemSize + 1 ];

		},

		setY: function ( index, y ) {

			this.array[ index * this.itemSize + 1 ] = y;

			return this;

		},

		getZ: function ( index ) {

			return this.array[ index * this.itemSize + 2 ];

		},

		setZ: function ( index, z ) {

			this.array[ index * this.itemSize + 2 ] = z;

			return this;

		},

		getW: function ( index ) {

			return this.array[ index * this.itemSize + 3 ];

		},

		setW: function ( index, w ) {

			this.array[ index * this.itemSize + 3 ] = w;

			return this;

		},

		setXY: function ( index, x, y ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;

			return this;

		},

		setXYZ: function ( index, x, y, z ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;

			return this;

		},

		setXYZW: function ( index, x, y, z, w ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;
			this.array[ index + 3 ] = w;

			return this;

		},

		onUpload: function ( callback ) {

			this.onUploadCallback = callback;

			return this;

		},

		clone: function () {

			return new this.constructor( this.array, this.itemSize ).copy( this );

		}

	} );

	//

	function Int8BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int8Array( array ), itemSize, normalized );

	}

	Int8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int8BufferAttribute.prototype.constructor = Int8BufferAttribute;
	function Uint8BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint8Array( array ), itemSize, normalized );

	}

	Uint8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint8BufferAttribute.prototype.constructor = Uint8BufferAttribute;
	function Uint8ClampedBufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint8ClampedArray( array ), itemSize, normalized );

	}

	Uint8ClampedBufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint8ClampedBufferAttribute.prototype.constructor = Uint8ClampedBufferAttribute;
	function Int16BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int16Array( array ), itemSize, normalized );

	}

	Int16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int16BufferAttribute.prototype.constructor = Int16BufferAttribute;
	function Uint16BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint16Array( array ), itemSize, normalized );

	}

	Uint16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;
	function Int32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int32Array( array ), itemSize, normalized );

	}

	Int32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int32BufferAttribute.prototype.constructor = Int32BufferAttribute;
	function Uint32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint32Array( array ), itemSize, normalized );

	}

	Uint32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;
	function Float32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Float32Array( array ), itemSize, normalized );

	}

	Float32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;
	function Float64BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Float64Array( array ), itemSize, normalized );

	}

	Float64BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Float64BufferAttribute.prototype.constructor = Float64BufferAttribute;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function DirectGeometry() {

		this.vertices = [];
		this.normals = [];
		this.colors = [];
		this.uvs = [];
		this.uvs2 = [];

		this.groups = [];

		this.morphTargets = {};

		this.skinWeights = [];
		this.skinIndices = [];

		// this.lineDistances = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		// update flags

		this.verticesNeedUpdate = false;
		this.normalsNeedUpdate = false;
		this.colorsNeedUpdate = false;
		this.uvsNeedUpdate = false;
		this.groupsNeedUpdate = false;

	}

	Object.assign( DirectGeometry.prototype, {

		computeGroups: function ( geometry ) {

			var group;
			var groups = [];
			var materialIndex = undefined;

			var faces = geometry.faces;

			for ( var i = 0; i < faces.length; i ++ ) {

				var face = faces[ i ];

				// materials

				if ( face.materialIndex !== materialIndex ) {

					materialIndex = face.materialIndex;

					if ( group !== undefined ) {

						group.count = ( i * 3 ) - group.start;
						groups.push( group );

					}

					group = {
						start: i * 3,
						materialIndex: materialIndex
					};

				}

			}

			if ( group !== undefined ) {

				group.count = ( i * 3 ) - group.start;
				groups.push( group );

			}

			this.groups = groups;

		},

		fromGeometry: function ( geometry ) {

			var faces = geometry.faces;
			var vertices = geometry.vertices;
			var faceVertexUvs = geometry.faceVertexUvs;

			var hasFaceVertexUv = faceVertexUvs[ 0 ] && faceVertexUvs[ 0 ].length > 0;
			var hasFaceVertexUv2 = faceVertexUvs[ 1 ] && faceVertexUvs[ 1 ].length > 0;

			// morphs

			var morphTargets = geometry.morphTargets;
			var morphTargetsLength = morphTargets.length;

			var morphTargetsPosition;

			if ( morphTargetsLength > 0 ) {

				morphTargetsPosition = [];

				for ( var i = 0; i < morphTargetsLength; i ++ ) {

					morphTargetsPosition[ i ] = {
						name: morphTargets[ i ].name,
					 	data: []
					};

				}

				this.morphTargets.position = morphTargetsPosition;

			}

			var morphNormals = geometry.morphNormals;
			var morphNormalsLength = morphNormals.length;

			var morphTargetsNormal;

			if ( morphNormalsLength > 0 ) {

				morphTargetsNormal = [];

				for ( var i = 0; i < morphNormalsLength; i ++ ) {

					morphTargetsNormal[ i ] = {
						name: morphNormals[ i ].name,
					 	data: []
					};

				}

				this.morphTargets.normal = morphTargetsNormal;

			}

			// skins

			var skinIndices = geometry.skinIndices;
			var skinWeights = geometry.skinWeights;

			var hasSkinIndices = skinIndices.length === vertices.length;
			var hasSkinWeights = skinWeights.length === vertices.length;

			//

			if ( vertices.length > 0 && faces.length === 0 ) {

				console.error( 'DirectGeometry: Faceless geometries are not supported.' );

			}

			for ( var i = 0; i < faces.length; i ++ ) {

				var face = faces[ i ];

				this.vertices.push( vertices[ face.a ], vertices[ face.b ], vertices[ face.c ] );

				var vertexNormals = face.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					this.normals.push( vertexNormals[ 0 ], vertexNormals[ 1 ], vertexNormals[ 2 ] );

				} else {

					var normal = face.normal;

					this.normals.push( normal, normal, normal );

				}

				var vertexColors = face.vertexColors;

				if ( vertexColors.length === 3 ) {

					this.colors.push( vertexColors[ 0 ], vertexColors[ 1 ], vertexColors[ 2 ] );

				} else {

					var color = face.color;

					this.colors.push( color, color, color );

				}

				if ( hasFaceVertexUv === true ) {

					var vertexUvs = faceVertexUvs[ 0 ][ i ];

					if ( vertexUvs !== undefined ) {

						this.uvs.push( vertexUvs[ 0 ], vertexUvs[ 1 ], vertexUvs[ 2 ] );

					} else {

						console.warn( 'DirectGeometry.fromGeometry(): Undefined vertexUv ', i );

						this.uvs.push( new Vector2(), new Vector2(), new Vector2() );

					}

				}

				if ( hasFaceVertexUv2 === true ) {

					var vertexUvs = faceVertexUvs[ 1 ][ i ];

					if ( vertexUvs !== undefined ) {

						this.uvs2.push( vertexUvs[ 0 ], vertexUvs[ 1 ], vertexUvs[ 2 ] );

					} else {

						console.warn( 'DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i );

						this.uvs2.push( new Vector2(), new Vector2(), new Vector2() );

					}

				}

				// morphs

				for ( var j = 0; j < morphTargetsLength; j ++ ) {

					var morphTarget = morphTargets[ j ].vertices;

					morphTargetsPosition[ j ].data.push( morphTarget[ face.a ], morphTarget[ face.b ], morphTarget[ face.c ] );

				}

				for ( var j = 0; j < morphNormalsLength; j ++ ) {

					var morphNormal = morphNormals[ j ].vertexNormals[ i ];

					morphTargetsNormal[ j ].data.push( morphNormal.a, morphNormal.b, morphNormal.c );

				}

				// skins

				if ( hasSkinIndices ) {

					this.skinIndices.push( skinIndices[ face.a ], skinIndices[ face.b ], skinIndices[ face.c ] );

				}

				if ( hasSkinWeights ) {

					this.skinWeights.push( skinWeights[ face.a ], skinWeights[ face.b ], skinWeights[ face.c ] );

				}

			}

			this.computeGroups( geometry );

			this.verticesNeedUpdate = geometry.verticesNeedUpdate;
			this.normalsNeedUpdate = geometry.normalsNeedUpdate;
			this.colorsNeedUpdate = geometry.colorsNeedUpdate;
			this.uvsNeedUpdate = geometry.uvsNeedUpdate;
			this.groupsNeedUpdate = geometry.groupsNeedUpdate;

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function arrayMax( array ) {

		if ( array.length === 0 ) return - Infinity;

		var max = array[ 0 ];

		for ( var i = 1, l = array.length; i < l; ++ i ) {

			if ( array[ i ] > max ) max = array[ i ];

		}

		return max;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var bufferGeometryId = 1; // BufferGeometry uses odd numbers as Id

	function BufferGeometry() {

		Object.defineProperty( this, 'id', { value: bufferGeometryId += 2 } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'BufferGeometry';

		this.index = null;
		this.attributes = {};

		this.morphAttributes = {};

		this.groups = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		this.drawRange = { start: 0, count: Infinity };

		this.userData = {};

	}

	BufferGeometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: BufferGeometry,

		isBufferGeometry: true,

		getIndex: function () {

			return this.index;

		},

		setIndex: function ( index ) {

			if ( Array.isArray( index ) ) {

				this.index = new ( arrayMax( index ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( index, 1 );

			} else {

				this.index = index;

			}

		},

		addAttribute: function ( name, attribute ) {

			if ( ! ( attribute && attribute.isBufferAttribute ) && ! ( attribute && attribute.isInterleavedBufferAttribute ) ) {

				console.warn( 'BufferGeometry: .addAttribute() now expects ( name, attribute ).' );

				return this.addAttribute( name, new BufferAttribute( arguments[ 1 ], arguments[ 2 ] ) );

			}

			if ( name === 'index' ) {

				console.warn( 'BufferGeometry.addAttribute: Use .setIndex() for index attribute.' );
				this.setIndex( attribute );

				return this;

			}

			this.attributes[ name ] = attribute;

			return this;

		},

		getAttribute: function ( name ) {

			return this.attributes[ name ];

		},

		removeAttribute: function ( name ) {

			delete this.attributes[ name ];

			return this;

		},

		addGroup: function ( start, count, materialIndex ) {

			this.groups.push( {

				start: start,
				count: count,
				materialIndex: materialIndex !== undefined ? materialIndex : 0

			} );

		},

		clearGroups: function () {

			this.groups = [];

		},

		setDrawRange: function ( start, count ) {

			this.drawRange.start = start;
			this.drawRange.count = count;

		},

		applyMatrix: function ( matrix ) {

			var position = this.attributes.position;

			if ( position !== undefined ) {

				matrix.applyToBufferAttribute( position );
				position.needsUpdate = true;

			}

			var normal = this.attributes.normal;

			if ( normal !== undefined ) {

				var normalMatrix = new Matrix3().getNormalMatrix( matrix );

				normalMatrix.applyToBufferAttribute( normal );
				normal.needsUpdate = true;

			}

			if ( this.boundingBox !== null ) {

				this.computeBoundingBox();

			}

			if ( this.boundingSphere !== null ) {

				this.computeBoundingSphere();

			}

			return this;

		},

		rotateX: function () {

			// rotate geometry around world x-axis

			var m1 = new Matrix4();

			return function rotateX( angle ) {

				m1.makeRotationX( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateY: function () {

			// rotate geometry around world y-axis

			var m1 = new Matrix4();

			return function rotateY( angle ) {

				m1.makeRotationY( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateZ: function () {

			// rotate geometry around world z-axis

			var m1 = new Matrix4();

			return function rotateZ( angle ) {

				m1.makeRotationZ( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		translate: function () {

			// translate geometry

			var m1 = new Matrix4();

			return function translate( x, y, z ) {

				m1.makeTranslation( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		scale: function () {

			// scale geometry

			var m1 = new Matrix4();

			return function scale( x, y, z ) {

				m1.makeScale( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		lookAt: function () {

			var obj = new Object3D();

			return function lookAt( vector ) {

				obj.lookAt( vector );

				obj.updateMatrix();

				this.applyMatrix( obj.matrix );

			};

		}(),

		center: function () {

			var offset = new Vector3();

			return function center() {

				this.computeBoundingBox();

				this.boundingBox.getCenter( offset ).negate();

				this.translate( offset.x, offset.y, offset.z );

				return this;

			};

		}(),

		setFromObject: function ( object ) {

			// console.log( 'BufferGeometry.setFromObject(). Converting', object, this );

			var geometry = object.geometry;

			if ( object.isPoints || object.isLine ) {

				var positions = new Float32BufferAttribute( geometry.vertices.length * 3, 3 );
				var colors = new Float32BufferAttribute( geometry.colors.length * 3, 3 );

				this.addAttribute( 'position', positions.copyVector3sArray( geometry.vertices ) );
				this.addAttribute( 'color', colors.copyColorsArray( geometry.colors ) );

				if ( geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length ) {

					var lineDistances = new Float32BufferAttribute( geometry.lineDistances.length, 1 );

					this.addAttribute( 'lineDistance', lineDistances.copyArray( geometry.lineDistances ) );

				}

				if ( geometry.boundingSphere !== null ) {

					this.boundingSphere = geometry.boundingSphere.clone();

				}

				if ( geometry.boundingBox !== null ) {

					this.boundingBox = geometry.boundingBox.clone();

				}

			} else if ( object.isMesh ) {

				if ( geometry && geometry.isGeometry ) {

					this.fromGeometry( geometry );

				}

			}

			return this;

		},

		setFromPoints: function ( points ) {

			var position = [];

			for ( var i = 0, l = points.length; i < l; i ++ ) {

				var point = points[ i ];
				position.push( point.x, point.y, point.z || 0 );

			}

			this.addAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

			return this;

		},

		updateFromObject: function ( object ) {

			var geometry = object.geometry;

			if ( object.isMesh ) {

				var direct = geometry.__directGeometry;

				if ( geometry.elementsNeedUpdate === true ) {

					direct = undefined;
					geometry.elementsNeedUpdate = false;

				}

				if ( direct === undefined ) {

					return this.fromGeometry( geometry );

				}

				direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
				direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
				direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
				direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
				direct.groupsNeedUpdate = geometry.groupsNeedUpdate;

				geometry.verticesNeedUpdate = false;
				geometry.normalsNeedUpdate = false;
				geometry.colorsNeedUpdate = false;
				geometry.uvsNeedUpdate = false;
				geometry.groupsNeedUpdate = false;

				geometry = direct;

			}

			var attribute;

			if ( geometry.verticesNeedUpdate === true ) {

				attribute = this.attributes.position;

				if ( attribute !== undefined ) {

					attribute.copyVector3sArray( geometry.vertices );
					attribute.needsUpdate = true;

				}

				geometry.verticesNeedUpdate = false;

			}

			if ( geometry.normalsNeedUpdate === true ) {

				attribute = this.attributes.normal;

				if ( attribute !== undefined ) {

					attribute.copyVector3sArray( geometry.normals );
					attribute.needsUpdate = true;

				}

				geometry.normalsNeedUpdate = false;

			}

			if ( geometry.colorsNeedUpdate === true ) {

				attribute = this.attributes.color;

				if ( attribute !== undefined ) {

					attribute.copyColorsArray( geometry.colors );
					attribute.needsUpdate = true;

				}

				geometry.colorsNeedUpdate = false;

			}

			if ( geometry.uvsNeedUpdate ) {

				attribute = this.attributes.uv;

				if ( attribute !== undefined ) {

					attribute.copyVector2sArray( geometry.uvs );
					attribute.needsUpdate = true;

				}

				geometry.uvsNeedUpdate = false;

			}

			if ( geometry.lineDistancesNeedUpdate ) {

				attribute = this.attributes.lineDistance;

				if ( attribute !== undefined ) {

					attribute.copyArray( geometry.lineDistances );
					attribute.needsUpdate = true;

				}

				geometry.lineDistancesNeedUpdate = false;

			}

			if ( geometry.groupsNeedUpdate ) {

				geometry.computeGroups( object.geometry );
				this.groups = geometry.groups;

				geometry.groupsNeedUpdate = false;

			}

			return this;

		},

		fromGeometry: function ( geometry ) {

			geometry.__directGeometry = new DirectGeometry().fromGeometry( geometry );

			return this.fromDirectGeometry( geometry.__directGeometry );

		},

		fromDirectGeometry: function ( geometry ) {

			var positions = new Float32Array( geometry.vertices.length * 3 );
			this.addAttribute( 'position', new BufferAttribute( positions, 3 ).copyVector3sArray( geometry.vertices ) );

			if ( geometry.normals.length > 0 ) {

				var normals = new Float32Array( geometry.normals.length * 3 );
				this.addAttribute( 'normal', new BufferAttribute( normals, 3 ).copyVector3sArray( geometry.normals ) );

			}

			if ( geometry.colors.length > 0 ) {

				var colors = new Float32Array( geometry.colors.length * 3 );
				this.addAttribute( 'color', new BufferAttribute( colors, 3 ).copyColorsArray( geometry.colors ) );

			}

			if ( geometry.uvs.length > 0 ) {

				var uvs = new Float32Array( geometry.uvs.length * 2 );
				this.addAttribute( 'uv', new BufferAttribute( uvs, 2 ).copyVector2sArray( geometry.uvs ) );

			}

			if ( geometry.uvs2.length > 0 ) {

				var uvs2 = new Float32Array( geometry.uvs2.length * 2 );
				this.addAttribute( 'uv2', new BufferAttribute( uvs2, 2 ).copyVector2sArray( geometry.uvs2 ) );

			}

			// groups

			this.groups = geometry.groups;

			// morphs

			for ( var name in geometry.morphTargets ) {

				var array = [];
				var morphTargets = geometry.morphTargets[ name ];

				for ( var i = 0, l = morphTargets.length; i < l; i ++ ) {

					var morphTarget = morphTargets[ i ];

					var attribute = new Float32BufferAttribute( morphTarget.data.length * 3, 3 );
					attribute.name = morphTarget.name;

					array.push( attribute.copyVector3sArray( morphTarget.data ) );

				}

				this.morphAttributes[ name ] = array;

			}

			// skinning

			if ( geometry.skinIndices.length > 0 ) {

				var skinIndices = new Float32BufferAttribute( geometry.skinIndices.length * 4, 4 );
				this.addAttribute( 'skinIndex', skinIndices.copyVector4sArray( geometry.skinIndices ) );

			}

			if ( geometry.skinWeights.length > 0 ) {

				var skinWeights = new Float32BufferAttribute( geometry.skinWeights.length * 4, 4 );
				this.addAttribute( 'skinWeight', skinWeights.copyVector4sArray( geometry.skinWeights ) );

			}

			//

			if ( geometry.boundingSphere !== null ) {

				this.boundingSphere = geometry.boundingSphere.clone();

			}

			if ( geometry.boundingBox !== null ) {

				this.boundingBox = geometry.boundingBox.clone();

			}

			return this;

		},

		computeBoundingBox: function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new Box3();

			}

			var position = this.attributes.position;

			if ( position !== undefined ) {

				this.boundingBox.setFromBufferAttribute( position );

			} else {

				this.boundingBox.makeEmpty();

			}

			if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

				console.error( 'BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this );

			}

		},

		computeBoundingSphere: function () {

			var box = new Box3();
			var vector = new Vector3();

			return function computeBoundingSphere() {

				if ( this.boundingSphere === null ) {

					this.boundingSphere = new Sphere();

				}

				var position = this.attributes.position;

				if ( position ) {

					var center = this.boundingSphere.center;

					box.setFromBufferAttribute( position );
					box.getCenter( center );

					// hoping to find a boundingSphere with a radius smaller than the
					// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

					var maxRadiusSq = 0;

					for ( var i = 0, il = position.count; i < il; i ++ ) {

						vector.x = position.getX( i );
						vector.y = position.getY( i );
						vector.z = position.getZ( i );
						maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

					}

					this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

					if ( isNaN( this.boundingSphere.radius ) ) {

						console.error( 'BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this );

					}

				}

			};

		}(),

		computeFaceNormals: function () {

			// backwards compatibility

		},

		computeVertexNormals: function () {

			var index = this.index;
			var attributes = this.attributes;

			if ( attributes.position ) {

				var positions = attributes.position.array;

				if ( attributes.normal === undefined ) {

					this.addAttribute( 'normal', new BufferAttribute( new Float32Array( positions.length ), 3 ) );

				} else {

					// reset existing normals to zero

					var array = attributes.normal.array;

					for ( var i = 0, il = array.length; i < il; i ++ ) {

						array[ i ] = 0;

					}

				}

				var normals = attributes.normal.array;

				var vA, vB, vC;
				var pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
				var cb = new Vector3(), ab = new Vector3();

				// indexed elements

				if ( index ) {

					var indices = index.array;

					for ( var i = 0, il = index.count; i < il; i += 3 ) {

						vA = indices[ i + 0 ] * 3;
						vB = indices[ i + 1 ] * 3;
						vC = indices[ i + 2 ] * 3;

						pA.fromArray( positions, vA );
						pB.fromArray( positions, vB );
						pC.fromArray( positions, vC );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ vA ] += cb.x;
						normals[ vA + 1 ] += cb.y;
						normals[ vA + 2 ] += cb.z;

						normals[ vB ] += cb.x;
						normals[ vB + 1 ] += cb.y;
						normals[ vB + 2 ] += cb.z;

						normals[ vC ] += cb.x;
						normals[ vC + 1 ] += cb.y;
						normals[ vC + 2 ] += cb.z;

					}

				} else {

					// non-indexed elements (unconnected triangle soup)

					for ( var i = 0, il = positions.length; i < il; i += 9 ) {

						pA.fromArray( positions, i );
						pB.fromArray( positions, i + 3 );
						pC.fromArray( positions, i + 6 );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ i ] = cb.x;
						normals[ i + 1 ] = cb.y;
						normals[ i + 2 ] = cb.z;

						normals[ i + 3 ] = cb.x;
						normals[ i + 4 ] = cb.y;
						normals[ i + 5 ] = cb.z;

						normals[ i + 6 ] = cb.x;
						normals[ i + 7 ] = cb.y;
						normals[ i + 8 ] = cb.z;

					}

				}

				this.normalizeNormals();

				attributes.normal.needsUpdate = true;

			}

		},

		merge: function ( geometry, offset ) {

			if ( ! ( geometry && geometry.isBufferGeometry ) ) {

				console.error( 'BufferGeometry.merge(): geometry not an instance of BufferGeometry.', geometry );
				return;

			}

			if ( offset === undefined ) {

				offset = 0;

				console.warn(
					'BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. '
					+ 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
				);

			}

			var attributes = this.attributes;

			for ( var key in attributes ) {

				if ( geometry.attributes[ key ] === undefined ) continue;

				var attribute1 = attributes[ key ];
				var attributeArray1 = attribute1.array;

				var attribute2 = geometry.attributes[ key ];
				var attributeArray2 = attribute2.array;

				var attributeSize = attribute2.itemSize;

				for ( var i = 0, j = attributeSize * offset; i < attributeArray2.length; i ++, j ++ ) {

					attributeArray1[ j ] = attributeArray2[ i ];

				}

			}

			return this;

		},

		normalizeNormals: function () {

			var vector = new Vector3();

			return function normalizeNormals() {

				var normals = this.attributes.normal;

				for ( var i = 0, il = normals.count; i < il; i ++ ) {

					vector.x = normals.getX( i );
					vector.y = normals.getY( i );
					vector.z = normals.getZ( i );

					vector.normalize();

					normals.setXYZ( i, vector.x, vector.y, vector.z );

				}

			};

		}(),

		toNonIndexed: function () {

			if ( this.index === null ) {

				console.warn( 'BufferGeometry.toNonIndexed(): Geometry is already non-indexed.' );
				return this;

			}

			var geometry2 = new BufferGeometry();

			var indices = this.index.array;
			var attributes = this.attributes;

			for ( var name in attributes ) {

				var attribute = attributes[ name ];

				var array = attribute.array;
				var itemSize = attribute.itemSize;

				var array2 = new array.constructor( indices.length * itemSize );

				var index = 0, index2 = 0;

				for ( var i = 0, l = indices.length; i < l; i ++ ) {

					index = indices[ i ] * itemSize;

					for ( var j = 0; j < itemSize; j ++ ) {

						array2[ index2 ++ ] = array[ index ++ ];

					}

				}

				geometry2.addAttribute( name, new BufferAttribute( array2, itemSize ) );

			}

			var groups = this.groups;

			for ( var i = 0, l = groups.length; i < l; i ++ ) {

				var group = groups[ i ];
				geometry2.addGroup( group.start, group.count, group.materialIndex );

			}

			return geometry2;

		},

		toJSON: function () {

			var data = {
				metadata: {
					version: 4.5,
					type: 'BufferGeometry',
					generator: 'BufferGeometry.toJSON'
				}
			};

			// standard BufferGeometry serialization

			data.uuid = this.uuid;
			data.type = this.type;
			if ( this.name !== '' ) data.name = this.name;
			if ( Object.keys( this.userData ).length > 0 ) data.userData = this.userData;

			if ( this.parameters !== undefined ) {

				var parameters = this.parameters;

				for ( var key in parameters ) {

					if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

				}

				return data;

			}

			data.data = { attributes: {} };

			var index = this.index;

			if ( index !== null ) {

				var array = Array.prototype.slice.call( index.array );

				data.data.index = {
					type: index.array.constructor.name,
					array: array
				};

			}

			var attributes = this.attributes;

			for ( var key in attributes ) {

				var attribute = attributes[ key ];

				var array = Array.prototype.slice.call( attribute.array );

				data.data.attributes[ key ] = {
					itemSize: attribute.itemSize,
					type: attribute.array.constructor.name,
					array: array,
					normalized: attribute.normalized
				};

			}

			var groups = this.groups;

			if ( groups.length > 0 ) {

				data.data.groups = JSON.parse( JSON.stringify( groups ) );

			}

			var boundingSphere = this.boundingSphere;

			if ( boundingSphere !== null ) {

				data.data.boundingSphere = {
					center: boundingSphere.center.toArray(),
					radius: boundingSphere.radius
				};

			}

			return data;

		},

		clone: function () {
			return new BufferGeometry().copy( this );

		},

		copy: function ( source ) {

			var name, i, l;

			// reset

			this.index = null;
			this.attributes = {};
			this.morphAttributes = {};
			this.groups = [];
			this.boundingBox = null;
			this.boundingSphere = null;

			// name

			this.name = source.name;

			// index

			var index = source.index;

			if ( index !== null ) {

				this.setIndex( index.clone() );

			}

			// attributes

			var attributes = source.attributes;

			for ( name in attributes ) {

				var attribute = attributes[ name ];
				this.addAttribute( name, attribute.clone() );

			}

			// morph attributes

			var morphAttributes = source.morphAttributes;

			for ( name in morphAttributes ) {

				var array = [];
				var morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

				for ( i = 0, l = morphAttribute.length; i < l; i ++ ) {

					array.push( morphAttribute[ i ].clone() );

				}

				this.morphAttributes[ name ] = array;

			}

			// groups

			var groups = source.groups;

			for ( i = 0, l = groups.length; i < l; i ++ ) {

				var group = groups[ i ];
				this.addGroup( group.start, group.count, group.materialIndex );

			}

			// bounding box

			var boundingBox = source.boundingBox;

			if ( boundingBox !== null ) {

				this.boundingBox = boundingBox.clone();

			}

			// bounding sphere

			var boundingSphere = source.boundingSphere;

			if ( boundingSphere !== null ) {

				this.boundingSphere = boundingSphere.clone();

			}

			// draw range

			this.drawRange.start = source.drawRange.start;
			this.drawRange.count = source.drawRange.count;

			// user data

			this.userData = source.userData;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// BoxGeometry

	function BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) {

		Geometry.call( this );

		this.type = 'BoxGeometry';

		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments
		};

		this.fromBufferGeometry( new BoxBufferGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) );
		this.mergeVertices();

	}

	BoxGeometry.prototype = Object.create( Geometry.prototype );
	BoxGeometry.prototype.constructor = BoxGeometry;

	// BoxBufferGeometry

	function BoxBufferGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) {

		BufferGeometry.call( this );

		this.type = 'BoxBufferGeometry';

		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments
		};

		var scope = this;

		width = width || 1;
		height = height || 1;
		depth = depth || 1;

		// segments

		widthSegments = Math.floor( widthSegments ) || 1;
		heightSegments = Math.floor( heightSegments ) || 1;
		depthSegments = Math.floor( depthSegments ) || 1;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		var numberOfVertices = 0;
		var groupStart = 0;

		// build each side of the box geometry

		buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
		buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
		buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
		buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
		buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
		buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		function buildPlane( u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex ) {

			var segmentWidth = width / gridX;
			var segmentHeight = height / gridY;

			var widthHalf = width / 2;
			var heightHalf = height / 2;
			var depthHalf = depth / 2;

			var gridX1 = gridX + 1;
			var gridY1 = gridY + 1;

			var vertexCounter = 0;
			var groupCount = 0;

			var ix, iy;

			var vector = new Vector3();

			// generate vertices, normals and uvs

			for ( iy = 0; iy < gridY1; iy ++ ) {

				var y = iy * segmentHeight - heightHalf;

				for ( ix = 0; ix < gridX1; ix ++ ) {

					var x = ix * segmentWidth - widthHalf;

					// set values to correct vector component

					vector[ u ] = x * udir;
					vector[ v ] = y * vdir;
					vector[ w ] = depthHalf;

					// now apply vector to vertex buffer

					vertices.push( vector.x, vector.y, vector.z );

					// set values to correct vector component

					vector[ u ] = 0;
					vector[ v ] = 0;
					vector[ w ] = depth > 0 ? 1 : - 1;

					// now apply vector to normal buffer

					normals.push( vector.x, vector.y, vector.z );

					// uvs

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );

					// counters

					vertexCounter += 1;

				}

			}

			// indices

			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment

			for ( iy = 0; iy < gridY; iy ++ ) {

				for ( ix = 0; ix < gridX; ix ++ ) {

					var a = numberOfVertices + ix + gridX1 * iy;
					var b = numberOfVertices + ix + gridX1 * ( iy + 1 );
					var c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
					var d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

					// increase counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup( groupStart, groupCount, materialIndex );

			// calculate new start value for groups

			groupStart += groupCount;

			// update total number of vertices

			numberOfVertices += vertexCounter;

		}

	}

	BoxBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	BoxBufferGeometry.prototype.constructor = BoxBufferGeometry;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PlaneGeometry

	function PlaneGeometry( width, height, widthSegments, heightSegments ) {

		Geometry.call( this );

		this.type = 'PlaneGeometry';

		this.parameters = {
			width: width,
			height: height,
			widthSegments: widthSegments,
			heightSegments: heightSegments
		};

		this.fromBufferGeometry( new PlaneBufferGeometry( width, height, widthSegments, heightSegments ) );
		this.mergeVertices();

	}

	PlaneGeometry.prototype = Object.create( Geometry.prototype );
	PlaneGeometry.prototype.constructor = PlaneGeometry;

	// PlaneBufferGeometry

	function PlaneBufferGeometry( width, height, widthSegments, heightSegments ) {

		BufferGeometry.call( this );

		this.type = 'PlaneBufferGeometry';

		this.parameters = {
			width: width,
			height: height,
			widthSegments: widthSegments,
			heightSegments: heightSegments
		};

		width = width || 1;
		height = height || 1;

		var width_half = width / 2;
		var height_half = height / 2;

		var gridX = Math.floor( widthSegments ) || 1;
		var gridY = Math.floor( heightSegments ) || 1;

		var gridX1 = gridX + 1;
		var gridY1 = gridY + 1;

		var segment_width = width / gridX;
		var segment_height = height / gridY;

		var ix, iy;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// generate vertices, normals and uvs

		for ( iy = 0; iy < gridY1; iy ++ ) {

			var y = iy * segment_height - height_half;

			for ( ix = 0; ix < gridX1; ix ++ ) {

				var x = ix * segment_width - width_half;

				vertices.push( x, - y, 0 );

				normals.push( 0, 0, 1 );

				uvs.push( ix / gridX );
				uvs.push( 1 - ( iy / gridY ) );

			}

		}

		// indices

		for ( iy = 0; iy < gridY; iy ++ ) {

			for ( ix = 0; ix < gridX; ix ++ ) {

				var a = ix + gridX1 * iy;
				var b = ix + gridX1 * ( iy + 1 );
				var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				var d = ( ix + 1 ) + gridX1 * iy;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	PlaneBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	PlaneBufferGeometry.prototype.constructor = PlaneBufferGeometry;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Ray( origin, direction ) {

		this.origin = ( origin !== undefined ) ? origin : new Vector3();
		this.direction = ( direction !== undefined ) ? direction : new Vector3();

	}

	Object.assign( Ray.prototype, {

		set: function ( origin, direction ) {

			this.origin.copy( origin );
			this.direction.copy( direction );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( ray ) {

			this.origin.copy( ray.origin );
			this.direction.copy( ray.direction );

			return this;

		},

		at: function ( t, target ) {

			if ( target === undefined ) {

				console.warn( 'Ray: .at() target is now required' );
				target = new Vector3();

			}

			return target.copy( this.direction ).multiplyScalar( t ).add( this.origin );

		},

		lookAt: function ( v ) {

			this.direction.copy( v ).sub( this.origin ).normalize();

			return this;

		},

		recast: function () {

			var v1 = new Vector3();

			return function recast( t ) {

				this.origin.copy( this.at( t, v1 ) );

				return this;

			};

		}(),

		closestPointToPoint: function ( point, target ) {

			if ( target === undefined ) {

				console.warn( 'Ray: .closestPointToPoint() target is now required' );
				target = new Vector3();

			}

			target.subVectors( point, this.origin );

			var directionDistance = target.dot( this.direction );

			if ( directionDistance < 0 ) {

				return target.copy( this.origin );

			}

			return target.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

		},

		distanceToPoint: function ( point ) {

			return Math.sqrt( this.distanceSqToPoint( point ) );

		},

		distanceSqToPoint: function () {

			var v1 = new Vector3();

			return function distanceSqToPoint( point ) {

				var directionDistance = v1.subVectors( point, this.origin ).dot( this.direction );

				// point behind the ray

				if ( directionDistance < 0 ) {

					return this.origin.distanceToSquared( point );

				}

				v1.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

				return v1.distanceToSquared( point );

			};

		}(),

		distanceSqToSegment: function () {

			var segCenter = new Vector3();
			var segDir = new Vector3();
			var diff = new Vector3();

			return function distanceSqToSegment( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

				// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
				// It returns the min distance between the ray and the segment
				// defined by v0 and v1
				// It can also set two optional targets :
				// - The closest point on the ray
				// - The closest point on the segment

				segCenter.copy( v0 ).add( v1 ).multiplyScalar( 0.5 );
				segDir.copy( v1 ).sub( v0 ).normalize();
				diff.copy( this.origin ).sub( segCenter );

				var segExtent = v0.distanceTo( v1 ) * 0.5;
				var a01 = - this.direction.dot( segDir );
				var b0 = diff.dot( this.direction );
				var b1 = - diff.dot( segDir );
				var c = diff.lengthSq();
				var det = Math.abs( 1 - a01 * a01 );
				var s0, s1, sqrDist, extDet;

				if ( det > 0 ) {

					// The ray and segment are not parallel.

					s0 = a01 * b1 - b0;
					s1 = a01 * b0 - b1;
					extDet = segExtent * det;

					if ( s0 >= 0 ) {

						if ( s1 >= - extDet ) {

							if ( s1 <= extDet ) {

								// region 0
								// Minimum at interior points of ray and segment.

								var invDet = 1 / det;
								s0 *= invDet;
								s1 *= invDet;
								sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

							} else {

								// region 1

								s1 = segExtent;
								s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
								sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

							}

						} else {

							// region 5

							s1 = - segExtent;
							s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						}

					} else {

						if ( s1 <= - extDet ) {

							// region 4

							s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
							s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						} else if ( s1 <= extDet ) {

							// region 3

							s0 = 0;
							s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = s1 * ( s1 + 2 * b1 ) + c;

						} else {

							// region 2

							s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
							s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						}

					}

				} else {

					// Ray and segment are parallel.

					s1 = ( a01 > 0 ) ? - segExtent : segExtent;
					s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

				if ( optionalPointOnRay ) {

					optionalPointOnRay.copy( this.direction ).multiplyScalar( s0 ).add( this.origin );

				}

				if ( optionalPointOnSegment ) {

					optionalPointOnSegment.copy( segDir ).multiplyScalar( s1 ).add( segCenter );

				}

				return sqrDist;

			};

		}(),

		intersectSphere: function () {

			var v1 = new Vector3();

			return function intersectSphere( sphere, target ) {

				v1.subVectors( sphere.center, this.origin );
				var tca = v1.dot( this.direction );
				var d2 = v1.dot( v1 ) - tca * tca;
				var radius2 = sphere.radius * sphere.radius;

				if ( d2 > radius2 ) return null;

				var thc = Math.sqrt( radius2 - d2 );

				// t0 = first intersect point - entrance on front of sphere
				var t0 = tca - thc;

				// t1 = second intersect point - exit point on back of sphere
				var t1 = tca + thc;

				// test to see if both t0 and t1 are behind the ray - if so, return null
				if ( t0 < 0 && t1 < 0 ) return null;

				// test to see if t0 is behind the ray:
				// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
				// in order to always return an intersect point that is in front of the ray.
				if ( t0 < 0 ) return this.at( t1, target );

				// else t0 is in front of the ray, so return the first collision point scaled by t0
				return this.at( t0, target );

			};

		}(),

		intersectsSphere: function ( sphere ) {

			return this.distanceSqToPoint( sphere.center ) <= ( sphere.radius * sphere.radius );

		},

		distanceToPlane: function ( plane ) {

			var denominator = plane.normal.dot( this.direction );

			if ( denominator === 0 ) {

				// line is coplanar, return origin
				if ( plane.distanceToPoint( this.origin ) === 0 ) {

					return 0;

				}

				// Null is preferable to undefined since undefined means.... it is undefined

				return null;

			}

			var t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

			// Return if the ray never intersects the plane

			return t >= 0 ? t : null;

		},

		intersectPlane: function ( plane, target ) {

			var t = this.distanceToPlane( plane );

			if ( t === null ) {

				return null;

			}

			return this.at( t, target );

		},

		intersectsPlane: function ( plane ) {

			// check if the ray lies on the plane first

			var distToPoint = plane.distanceToPoint( this.origin );

			if ( distToPoint === 0 ) {

				return true;

			}

			var denominator = plane.normal.dot( this.direction );

			if ( denominator * distToPoint < 0 ) {

				return true;

			}

			// ray origin is behind the plane (and is pointing behind it)

			return false;

		},

		intersectBox: function ( box, target ) {

			var tmin, tmax, tymin, tymax, tzmin, tzmax;

			var invdirx = 1 / this.direction.x,
				invdiry = 1 / this.direction.y,
				invdirz = 1 / this.direction.z;

			var origin = this.origin;

			if ( invdirx >= 0 ) {

				tmin = ( box.min.x - origin.x ) * invdirx;
				tmax = ( box.max.x - origin.x ) * invdirx;

			} else {

				tmin = ( box.max.x - origin.x ) * invdirx;
				tmax = ( box.min.x - origin.x ) * invdirx;

			}

			if ( invdiry >= 0 ) {

				tymin = ( box.min.y - origin.y ) * invdiry;
				tymax = ( box.max.y - origin.y ) * invdiry;

			} else {

				tymin = ( box.max.y - origin.y ) * invdiry;
				tymax = ( box.min.y - origin.y ) * invdiry;

			}

			if ( ( tmin > tymax ) || ( tymin > tmax ) ) return null;

			// These lines also handle the case where tmin or tmax is NaN
			// (result of 0 * Infinity). x !== x returns true if x is NaN

			if ( tymin > tmin || tmin !== tmin ) tmin = tymin;

			if ( tymax < tmax || tmax !== tmax ) tmax = tymax;

			if ( invdirz >= 0 ) {

				tzmin = ( box.min.z - origin.z ) * invdirz;
				tzmax = ( box.max.z - origin.z ) * invdirz;

			} else {

				tzmin = ( box.max.z - origin.z ) * invdirz;
				tzmax = ( box.min.z - origin.z ) * invdirz;

			}

			if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) return null;

			if ( tzmin > tmin || tmin !== tmin ) tmin = tzmin;

			if ( tzmax < tmax || tmax !== tmax ) tmax = tzmax;

			//return point closest to the ray (positive side)

			if ( tmax < 0 ) return null;

			return this.at( tmin >= 0 ? tmin : tmax, target );

		},

		intersectsBox: ( function () {

			var v = new Vector3();

			return function intersectsBox( box ) {

				return this.intersectBox( box, v ) !== null;

			};

		} )(),

		intersectTriangle: function () {

			// Compute the offset origin, edges, and normal.
			var diff = new Vector3();
			var edge1 = new Vector3();
			var edge2 = new Vector3();
			var normal = new Vector3();

			return function intersectTriangle( a, b, c, backfaceCulling, target ) {

				// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

				edge1.subVectors( b, a );
				edge2.subVectors( c, a );
				normal.crossVectors( edge1, edge2 );

				// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
				// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
				//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
				//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
				//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
				var DdN = this.direction.dot( normal );
				var sign;

				if ( DdN > 0 ) {

					if ( backfaceCulling ) return null;
					sign = 1;

				} else if ( DdN < 0 ) {

					sign = - 1;
					DdN = - DdN;

				} else {

					return null;

				}

				diff.subVectors( this.origin, a );
				var DdQxE2 = sign * this.direction.dot( edge2.crossVectors( diff, edge2 ) );

				// b1 < 0, no intersection
				if ( DdQxE2 < 0 ) {

					return null;

				}

				var DdE1xQ = sign * this.direction.dot( edge1.cross( diff ) );

				// b2 < 0, no intersection
				if ( DdE1xQ < 0 ) {

					return null;

				}

				// b1+b2 > 1, no intersection
				if ( DdQxE2 + DdE1xQ > DdN ) {

					return null;

				}

				// Line intersects triangle, check if ray does.
				var QdN = - sign * diff.dot( normal );

				// t < 0, no intersection
				if ( QdN < 0 ) {

					return null;

				}

				// Ray intersects triangle.
				return this.at( QdN / DdN, target );

			};

		}(),

		applyMatrix4: function ( matrix4 ) {

			this.origin.applyMatrix4( matrix4 );
			this.direction.transformDirection( matrix4 );

			return this;

		},

		equals: function ( ray ) {

			return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Triangle( a, b, c ) {

		this.a = ( a !== undefined ) ? a : new Vector3();
		this.b = ( b !== undefined ) ? b : new Vector3();
		this.c = ( c !== undefined ) ? c : new Vector3();

	}

	Object.assign( Triangle, {

		getNormal: function () {

			var v0 = new Vector3();

			return function getNormal( a, b, c, target ) {

				if ( target === undefined ) {

					console.warn( 'Triangle: .getNormal() target is now required' );
					target = new Vector3();

				}

				target.subVectors( c, b );
				v0.subVectors( a, b );
				target.cross( v0 );

				var targetLengthSq = target.lengthSq();
				if ( targetLengthSq > 0 ) {

					return target.multiplyScalar( 1 / Math.sqrt( targetLengthSq ) );

				}

				return target.set( 0, 0, 0 );

			};

		}(),

		// static/instance method to calculate barycentric coordinates
		// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
		getBarycoord: function () {

			var v0 = new Vector3();
			var v1 = new Vector3();
			var v2 = new Vector3();

			return function getBarycoord( point, a, b, c, target ) {

				v0.subVectors( c, a );
				v1.subVectors( b, a );
				v2.subVectors( point, a );

				var dot00 = v0.dot( v0 );
				var dot01 = v0.dot( v1 );
				var dot02 = v0.dot( v2 );
				var dot11 = v1.dot( v1 );
				var dot12 = v1.dot( v2 );

				var denom = ( dot00 * dot11 - dot01 * dot01 );

				if ( target === undefined ) {

					console.warn( 'Triangle: .getBarycoord() target is now required' );
					target = new Vector3();

				}

				// collinear or singular triangle
				if ( denom === 0 ) {

					// arbitrary location outside of triangle?
					// not sure if this is the best idea, maybe should be returning undefined
					return target.set( - 2, - 1, - 1 );

				}

				var invDenom = 1 / denom;
				var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
				var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

				// barycentric coordinates must always sum to 1
				return target.set( 1 - u - v, v, u );

			};

		}(),

		containsPoint: function () {

			var v1 = new Vector3();

			return function containsPoint( point, a, b, c ) {

				Triangle.getBarycoord( point, a, b, c, v1 );

				return ( v1.x >= 0 ) && ( v1.y >= 0 ) && ( ( v1.x + v1.y ) <= 1 );

			};

		}(),

		getUV: function () {

			var barycoord = new Vector3();

			return function getUV( point, p1, p2, p3, uv1, uv2, uv3, target ) {

				this.getBarycoord( point, p1, p2, p3, barycoord );

				target.set( 0, 0 );
				target.addScaledVector( uv1, barycoord.x );
				target.addScaledVector( uv2, barycoord.y );
				target.addScaledVector( uv3, barycoord.z );

				return target;

			};

		}()

	} );

	Object.assign( Triangle.prototype, {

		set: function ( a, b, c ) {

			this.a.copy( a );
			this.b.copy( b );
			this.c.copy( c );

			return this;

		},

		setFromPointsAndIndices: function ( points, i0, i1, i2 ) {

			this.a.copy( points[ i0 ] );
			this.b.copy( points[ i1 ] );
			this.c.copy( points[ i2 ] );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( triangle ) {

			this.a.copy( triangle.a );
			this.b.copy( triangle.b );
			this.c.copy( triangle.c );

			return this;

		},

		getArea: function () {

			var v0 = new Vector3();
			var v1 = new Vector3();

			return function getArea() {

				v0.subVectors( this.c, this.b );
				v1.subVectors( this.a, this.b );

				return v0.cross( v1 ).length() * 0.5;

			};

		}(),

		getMidpoint: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Triangle: .getMidpoint() target is now required' );
				target = new Vector3();

			}

			return target.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

		},

		getNormal: function ( target ) {

			return Triangle.getNormal( this.a, this.b, this.c, target );

		},

		getPlane: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Triangle: .getPlane() target is now required' );
				target = new Vector3();

			}

			return target.setFromCoplanarPoints( this.a, this.b, this.c );

		},

		getBarycoord: function ( point, target ) {

			return Triangle.getBarycoord( point, this.a, this.b, this.c, target );

		},

		containsPoint: function ( point ) {

			return Triangle.containsPoint( point, this.a, this.b, this.c );

		},

		getUV: function ( point, uv1, uv2, uv3, result ) {

			return Triangle.getUV( point, this.a, this.b, this.c, uv1, uv2, uv3, result );

		},

		intersectsBox: function ( box ) {

			return box.intersectsTriangle( this );

		},

		closestPointToPoint: function () {

			var vab = new Vector3();
			var vac = new Vector3();
			var vbc = new Vector3();
			var vap = new Vector3();
			var vbp = new Vector3();
			var vcp = new Vector3();

			return function closestPointToPoint( p, target ) {

				if ( target === undefined ) {

					console.warn( 'Triangle: .closestPointToPoint() target is now required' );
					target = new Vector3();

				}

				var a = this.a, b = this.b, c = this.c;
				var v, w;

				// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
				// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
				// under the accompanying license; see chapter 5.1.5 for detailed explanation.
				// basically, we're distinguishing which of the voronoi regions of the triangle
				// the point lies in with the minimum amount of redundant computation.

				vab.subVectors( b, a );
				vac.subVectors( c, a );
				vap.subVectors( p, a );
				var d1 = vab.dot( vap );
				var d2 = vac.dot( vap );
				if ( d1 <= 0 && d2 <= 0 ) {

					// vertex region of A; barycentric coords (1, 0, 0)
					return target.copy( a );

				}

				vbp.subVectors( p, b );
				var d3 = vab.dot( vbp );
				var d4 = vac.dot( vbp );
				if ( d3 >= 0 && d4 <= d3 ) {

					// vertex region of B; barycentric coords (0, 1, 0)
					return target.copy( b );

				}

				var vc = d1 * d4 - d3 * d2;
				if ( vc <= 0 && d1 >= 0 && d3 <= 0 ) {

					v = d1 / ( d1 - d3 );
					// edge region of AB; barycentric coords (1-v, v, 0)
					return target.copy( a ).addScaledVector( vab, v );

				}

				vcp.subVectors( p, c );
				var d5 = vab.dot( vcp );
				var d6 = vac.dot( vcp );
				if ( d6 >= 0 && d5 <= d6 ) {

					// vertex region of C; barycentric coords (0, 0, 1)
					return target.copy( c );

				}

				var vb = d5 * d2 - d1 * d6;
				if ( vb <= 0 && d2 >= 0 && d6 <= 0 ) {

					w = d2 / ( d2 - d6 );
					// edge region of AC; barycentric coords (1-w, 0, w)
					return target.copy( a ).addScaledVector( vac, w );

				}

				var va = d3 * d6 - d5 * d4;
				if ( va <= 0 && ( d4 - d3 ) >= 0 && ( d5 - d6 ) >= 0 ) {

					vbc.subVectors( c, b );
					w = ( d4 - d3 ) / ( ( d4 - d3 ) + ( d5 - d6 ) );
					// edge region of BC; barycentric coords (0, 1-w, w)
					return target.copy( b ).addScaledVector( vbc, w ); // edge region of BC

				}

				// face region
				var denom = 1 / ( va + vb + vc );
				// u = va * denom
				v = vb * denom;
				w = vc * denom;
				return target.copy( a ).addScaledVector( vab, v ).addScaledVector( vac, w );

			};

		}(),

		equals: function ( triangle ) {

			return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshBasicMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshBasicMaterial';

		this.color = new Color( 0xffffff ); // emissive

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;

		this.lights = false;

		this.setValues( parameters );

	}

	MeshBasicMaterial.prototype = Object.create( Material.prototype );
	MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;

	MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

	MeshBasicMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Mesh( geometry, material ) {

		Object3D.call( this );

		this.type = 'Mesh';

		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new MeshBasicMaterial( { color: Math.random() * 0xffffff } );

		this.drawMode = TrianglesDrawMode;

		this.updateMorphTargets();

	}

	Mesh.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Mesh,

		isMesh: true,

		setDrawMode: function ( value ) {

			this.drawMode = value;

		},

		copy: function ( source ) {

			Object3D.prototype.copy.call( this, source );

			this.drawMode = source.drawMode;

			if ( source.morphTargetInfluences !== undefined ) {

				this.morphTargetInfluences = source.morphTargetInfluences.slice();

			}

			if ( source.morphTargetDictionary !== undefined ) {

				this.morphTargetDictionary = Object.assign( {}, source.morphTargetDictionary );

			}

			return this;

		},

		updateMorphTargets: function () {

			var geometry = this.geometry;
			var m, ml, name;

			if ( geometry.isBufferGeometry ) {

				var morphAttributes = geometry.morphAttributes;
				var keys = Object.keys( morphAttributes );

				if ( keys.length > 0 ) {

					var morphAttribute = morphAttributes[ keys[ 0 ] ];

					if ( morphAttribute !== undefined ) {

						this.morphTargetInfluences = [];
						this.morphTargetDictionary = {};

						for ( m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

							name = morphAttribute[ m ].name || String( m );

							this.morphTargetInfluences.push( 0 );
							this.morphTargetDictionary[ name ] = m;

						}

					}

				}

			} else {

				var morphTargets = geometry.morphTargets;

				if ( morphTargets !== undefined && morphTargets.length > 0 ) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for ( m = 0, ml = morphTargets.length; m < ml; m ++ ) {

						name = morphTargets[ m ].name || String( m );

						this.morphTargetInfluences.push( 0 );
						this.morphTargetDictionary[ name ] = m;

					}

				}

			}

		},

		raycast: ( function () {

			var inverseMatrix = new Matrix4();
			var ray = new Ray();
			var sphere = new Sphere();

			var vA = new Vector3();
			var vB = new Vector3();
			var vC = new Vector3();

			var tempA = new Vector3();
			var tempB = new Vector3();
			var tempC = new Vector3();

			var uvA = new Vector2();
			var uvB = new Vector2();
			var uvC = new Vector2();

			var intersectionPoint = new Vector3();
			var intersectionPointWorld = new Vector3();

			function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

				var intersect;

				if ( material.side === BackSide ) {

					intersect = ray.intersectTriangle( pC, pB, pA, true, point );

				} else {

					intersect = ray.intersectTriangle( pA, pB, pC, material.side !== DoubleSide, point );

				}

				if ( intersect === null ) return null;

				intersectionPointWorld.copy( point );
				intersectionPointWorld.applyMatrix4( object.matrixWorld );

				var distance = raycaster.ray.origin.distanceTo( intersectionPointWorld );

				if ( distance < raycaster.near || distance > raycaster.far ) return null;

				return {
					distance: distance,
					point: intersectionPointWorld.clone(),
					object: object
				};

			}

			function checkBufferGeometryIntersection( object, material, raycaster, ray, position, uv, a, b, c ) {

				vA.fromBufferAttribute( position, a );
				vB.fromBufferAttribute( position, b );
				vC.fromBufferAttribute( position, c );

				var intersection = checkIntersection( object, material, raycaster, ray, vA, vB, vC, intersectionPoint );

				if ( intersection ) {

					if ( uv ) {

						uvA.fromBufferAttribute( uv, a );
						uvB.fromBufferAttribute( uv, b );
						uvC.fromBufferAttribute( uv, c );

						intersection.uv = Triangle.getUV( intersectionPoint, vA, vB, vC, uvA, uvB, uvC, new Vector2() );

					}

					var face = new Face3( a, b, c );
					Triangle.getNormal( vA, vB, vC, face.normal );

					intersection.face = face;

				}

				return intersection;

			}

			return function raycast( raycaster, intersects ) {

				var geometry = this.geometry;
				var material = this.material;
				var matrixWorld = this.matrixWorld;

				if ( material === undefined ) return;

				// Checking boundingSphere distance to ray

				if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere );
				sphere.applyMatrix4( matrixWorld );

				if ( raycaster.ray.intersectsSphere( sphere ) === false ) return;

				//

				inverseMatrix.getInverse( matrixWorld );
				ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

				// Check boundingBox before continuing

				if ( geometry.boundingBox !== null ) {

					if ( ray.intersectsBox( geometry.boundingBox ) === false ) return;

				}

				var intersection;

				if ( geometry.isBufferGeometry ) {

					var a, b, c;
					var index = geometry.index;
					var position = geometry.attributes.position;
					var uv = geometry.attributes.uv;
					var groups = geometry.groups;
					var drawRange = geometry.drawRange;
					var i, j, il, jl;
					var group, groupMaterial;
					var start, end;

					if ( index !== null ) {

						// indexed buffer geometry

						if ( Array.isArray( material ) ) {

							for ( i = 0, il = groups.length; i < il; i ++ ) {

								group = groups[ i ];
								groupMaterial = material[ group.materialIndex ];

								start = Math.max( group.start, drawRange.start );
								end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

								for ( j = start, jl = end; j < jl; j += 3 ) {

									a = index.getX( j );
									b = index.getX( j + 1 );
									c = index.getX( j + 2 );

									intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, ray, position, uv, a, b, c );

									if ( intersection ) {

										intersection.faceIndex = Math.floor( j / 3 ); // triangle number in indexed buffer semantics
										intersects.push( intersection );

									}

								}

							}

						} else {

							start = Math.max( 0, drawRange.start );
							end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

							for ( i = start, il = end; i < il; i += 3 ) {

								a = index.getX( i );
								b = index.getX( i + 1 );
								c = index.getX( i + 2 );

								intersection = checkBufferGeometryIntersection( this, material, raycaster, ray, position, uv, a, b, c );

								if ( intersection ) {

									intersection.faceIndex = Math.floor( i / 3 ); // triangle number in indexed buffer semantics
									intersects.push( intersection );

								}

							}

						}

					} else if ( position !== undefined ) {

						// non-indexed buffer geometry

						if ( Array.isArray( material ) ) {

							for ( i = 0, il = groups.length; i < il; i ++ ) {

								group = groups[ i ];
								groupMaterial = material[ group.materialIndex ];

								start = Math.max( group.start, drawRange.start );
								end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

								for ( j = start, jl = end; j < jl; j += 3 ) {

									a = j;
									b = j + 1;
									c = j + 2;

									intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, ray, position, uv, a, b, c );

									if ( intersection ) {

										intersection.faceIndex = Math.floor( j / 3 ); // triangle number in non-indexed buffer semantics
										intersects.push( intersection );

									}

								}

							}

						} else {

							start = Math.max( 0, drawRange.start );
							end = Math.min( position.count, ( drawRange.start + drawRange.count ) );

							for ( i = start, il = end; i < il; i += 3 ) {

								a = i;
								b = i + 1;
								c = i + 2;

								intersection = checkBufferGeometryIntersection( this, material, raycaster, ray, position, uv, a, b, c );

								if ( intersection ) {

									intersection.faceIndex = Math.floor( i / 3 ); // triangle number in non-indexed buffer semantics
									intersects.push( intersection );

								}

							}

						}

					}

				} else if ( geometry.isGeometry ) {

					var fvA, fvB, fvC;
					var isMultiMaterial = Array.isArray( material );

					var vertices = geometry.vertices;
					var faces = geometry.faces;
					var uvs;

					var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
					if ( faceVertexUvs.length > 0 ) uvs = faceVertexUvs;

					for ( var f = 0, fl = faces.length; f < fl; f ++ ) {

						var face = faces[ f ];
						var faceMaterial = isMultiMaterial ? material[ face.materialIndex ] : material;

						if ( faceMaterial === undefined ) continue;

						fvA = vertices[ face.a ];
						fvB = vertices[ face.b ];
						fvC = vertices[ face.c ];

						if ( faceMaterial.morphTargets === true ) {

							var morphTargets = geometry.morphTargets;
							var morphInfluences = this.morphTargetInfluences;

							vA.set( 0, 0, 0 );
							vB.set( 0, 0, 0 );
							vC.set( 0, 0, 0 );

							for ( var t = 0, tl = morphTargets.length; t < tl; t ++ ) {

								var influence = morphInfluences[ t ];

								if ( influence === 0 ) continue;

								var targets = morphTargets[ t ].vertices;

								vA.addScaledVector( tempA.subVectors( targets[ face.a ], fvA ), influence );
								vB.addScaledVector( tempB.subVectors( targets[ face.b ], fvB ), influence );
								vC.addScaledVector( tempC.subVectors( targets[ face.c ], fvC ), influence );

							}

							vA.add( fvA );
							vB.add( fvB );
							vC.add( fvC );

							fvA = vA;
							fvB = vB;
							fvC = vC;

						}

						intersection = checkIntersection( this, faceMaterial, raycaster, ray, fvA, fvB, fvC, intersectionPoint );

						if ( intersection ) {

							if ( uvs && uvs[ f ] ) {

								var uvs_f = uvs[ f ];
								uvA.copy( uvs_f[ 0 ] );
								uvB.copy( uvs_f[ 1 ] );
								uvC.copy( uvs_f[ 2 ] );

								intersection.uv = Triangle.getUV( intersectionPoint, fvA, fvB, fvC, uvA, uvB, uvC, new Vector2() );

							}

							intersection.face = face;
							intersection.faceIndex = f;
							intersects.push( intersection );

						}

					}

				}

			};

		}() ),

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLBackground( renderer, state, objects, premultipliedAlpha ) {

		var clearColor = new Color( 0x000000 );
		var clearAlpha = 0;

		var planeMesh;
		var boxMesh;

		function render( renderList, scene, camera, forceClear ) {

			var background = scene.background;

			if ( background === null ) {

				setClear( clearColor, clearAlpha );

			} else if ( background && background.isColor ) {

				setClear( background, 1 );
				forceClear = true;

			}

			if ( renderer.autoClear || forceClear ) {

				renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );

			}

			if ( background && ( background.isCubeTexture || background.isWebGLRenderTargetCube ) ) {

				if ( boxMesh === undefined ) {

					boxMesh = new Mesh(
						new BoxBufferGeometry( 1, 1, 1 ),
						new ShaderMaterial( {
							type: 'BackgroundCubeMaterial',
							uniforms: UniformsUtils.clone( ShaderLib.cube.uniforms ),
							vertexShader: ShaderLib.cube.vertexShader,
							fragmentShader: ShaderLib.cube.fragmentShader,
							side: BackSide,
							depthTest: true,
							depthWrite: false,
							fog: false
						} )
					);

					boxMesh.geometry.removeAttribute( 'normal' );
					boxMesh.geometry.removeAttribute( 'uv' );

					boxMesh.onBeforeRender = function ( renderer, scene, camera ) {

						this.matrixWorld.copyPosition( camera.matrixWorld );

					};

					objects.update( boxMesh );

				}

				boxMesh.material.uniforms.tCube.value = ( background.isWebGLRenderTargetCube ) ? background.texture : background;
				boxMesh.material.uniforms.tFlip.value = ( background.isWebGLRenderTargetCube ) ? 1 : - 1;

				// push to the pre-sorted opaque render list
				renderList.push( boxMesh, boxMesh.geometry, boxMesh.material, 0, null );

			} else if ( background && background.isTexture ) {

				if ( planeMesh === undefined ) {

					planeMesh = new Mesh(
						new PlaneBufferGeometry( 2, 2 ),
						new ShaderMaterial( {
							type: 'BackgroundMaterial',
							uniforms: UniformsUtils.clone( ShaderLib.background.uniforms ),
							vertexShader: ShaderLib.background.vertexShader,
							fragmentShader: ShaderLib.background.fragmentShader,
							side: FrontSide,
							depthTest: true,
							depthWrite: false,
							fog: false
						} )
					);

					planeMesh.geometry.removeAttribute( 'normal' );

					objects.update( planeMesh );

				}

				planeMesh.material.uniforms.t2D.value = background;

				if ( background.matrixAutoUpdate === true ) {

					background.updateMatrix();

				}

				planeMesh.material.uniforms.uvTransform.value.copy( background.matrix );

				// push to the pre-sorted opaque render list
				renderList.push( planeMesh, planeMesh.geometry, planeMesh.material, 0, null );

			}

		}

		function setClear( color, alpha ) {

			state.buffers.color.setClear( color.r, color.g, color.b, alpha, premultipliedAlpha );

		}

		return {

			getClearColor: function () {

				return clearColor;

			},
			setClearColor: function ( color, alpha ) {

				clearColor.set( color );
				clearAlpha = alpha !== undefined ? alpha : 1;
				setClear( clearColor, clearAlpha );

			},
			getClearAlpha: function () {

				return clearAlpha;

			},
			setClearAlpha: function ( alpha ) {

				clearAlpha = alpha;
				setClear( clearColor, clearAlpha );

			},
			render: render

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLBufferRenderer( gl, extensions, info, capabilities ) {

		var mode;

		function setMode( value ) {

			mode = value;

		}

		function render( start, count ) {

			gl.drawArrays( mode, start, count );

			info.update( count, mode );

		}

		function renderInstances( geometry, start, count ) {

			var extension;

			if ( capabilities.isWebGL2 ) {

				extension = gl;

			} else {

				extension = extensions.get( 'ANGLE_instanced_arrays' );

				if ( extension === null ) {

					console.error( 'WebGLBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			extension[ capabilities.isWebGL2 ? 'drawArraysInstanced' : 'drawArraysInstancedANGLE' ]( mode, start, count, geometry.maxInstancedCount );

			info.update( count, mode, geometry.maxInstancedCount );

		}

		//

		this.setMode = setMode;
		this.render = render;
		this.renderInstances = renderInstances;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLCapabilities( gl, extensions, parameters ) {

		var maxAnisotropy;

		function getMaxAnisotropy() {

			if ( maxAnisotropy !== undefined ) return maxAnisotropy;

			var extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			if ( extension !== null ) {

				maxAnisotropy = gl.getParameter( extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT );

			} else {

				maxAnisotropy = 0;

			}

			return maxAnisotropy;

		}

		function getMaxPrecision( precision ) {

			if ( precision === 'highp' ) {

				if ( gl.getShaderPrecisionFormat( gl.VERTEX_SHADER, gl.HIGH_FLOAT ).precision > 0 &&
				     gl.getShaderPrecisionFormat( gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).precision > 0 ) {

					return 'highp';

				}

				precision = 'mediump';

			}

			if ( precision === 'mediump' ) {

				if ( gl.getShaderPrecisionFormat( gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).precision > 0 &&
				     gl.getShaderPrecisionFormat( gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).precision > 0 ) {

					return 'mediump';

				}

			}

			return 'lowp';

		}

		var isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;

		var precision = parameters.precision !== undefined ? parameters.precision : 'highp';
		var maxPrecision = getMaxPrecision( precision );

		if ( maxPrecision !== precision ) {

			console.warn( 'WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.' );
			precision = maxPrecision;

		}

		var logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

		var maxTextures = gl.getParameter( gl.MAX_TEXTURE_IMAGE_UNITS );
		var maxVertexTextures = gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
		var maxTextureSize = gl.getParameter( gl.MAX_TEXTURE_SIZE );
		var maxCubemapSize = gl.getParameter( gl.MAX_CUBE_MAP_TEXTURE_SIZE );

		var maxAttributes = gl.getParameter( gl.MAX_VERTEX_ATTRIBS );
		var maxVertexUniforms = gl.getParameter( gl.MAX_VERTEX_UNIFORM_VECTORS );
		var maxVaryings = gl.getParameter( gl.MAX_VARYING_VECTORS );
		var maxFragmentUniforms = gl.getParameter( gl.MAX_FRAGMENT_UNIFORM_VECTORS );

		var vertexTextures = maxVertexTextures > 0;
		var floatFragmentTextures = isWebGL2 || !! extensions.get( 'OES_texture_float' );
		var floatVertexTextures = vertexTextures && floatFragmentTextures;

		return {

			isWebGL2: isWebGL2,

			getMaxAnisotropy: getMaxAnisotropy,
			getMaxPrecision: getMaxPrecision,

			precision: precision,
			logarithmicDepthBuffer: logarithmicDepthBuffer,

			maxTextures: maxTextures,
			maxVertexTextures: maxVertexTextures,
			maxTextureSize: maxTextureSize,
			maxCubemapSize: maxCubemapSize,

			maxAttributes: maxAttributes,
			maxVertexUniforms: maxVertexUniforms,
			maxVaryings: maxVaryings,
			maxFragmentUniforms: maxFragmentUniforms,

			vertexTextures: vertexTextures,
			floatFragmentTextures: floatFragmentTextures,
			floatVertexTextures: floatVertexTextures

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLClipping() {

		var scope = this,

			globalState = null,
			numGlobalPlanes = 0,
			localClippingEnabled = false,
			renderingShadows = false,

			plane = new Plane(),
			viewNormalMatrix = new Matrix3(),

			uniform = { value: null, needsUpdate: false };

		this.uniform = uniform;
		this.numPlanes = 0;
		this.numIntersection = 0;

		this.init = function ( planes, enableLocalClipping, camera ) {

			var enabled =
				planes.length !== 0 ||
				enableLocalClipping ||
				// enable state of previous frame - the clipping code has to
				// run another frame in order to reset the state:
				numGlobalPlanes !== 0 ||
				localClippingEnabled;

			localClippingEnabled = enableLocalClipping;

			globalState = projectPlanes( planes, camera, 0 );
			numGlobalPlanes = planes.length;

			return enabled;

		};

		this.beginShadows = function () {

			renderingShadows = true;
			projectPlanes( null );

		};

		this.endShadows = function () {

			renderingShadows = false;
			resetGlobalState();

		};

		this.setState = function ( planes, clipIntersection, clipShadows, camera, cache, fromCache ) {

			if ( ! localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && ! clipShadows ) {

				// there's no local clipping

				if ( renderingShadows ) {

					// there's no global clipping

					projectPlanes( null );

				} else {

					resetGlobalState();

				}

			} else {

				var nGlobal = renderingShadows ? 0 : numGlobalPlanes,
					lGlobal = nGlobal * 4,

					dstArray = cache.clippingState || null;

				uniform.value = dstArray; // ensure unique state

				dstArray = projectPlanes( planes, camera, lGlobal, fromCache );

				for ( var i = 0; i !== lGlobal; ++ i ) {

					dstArray[ i ] = globalState[ i ];

				}

				cache.clippingState = dstArray;
				this.numIntersection = clipIntersection ? this.numPlanes : 0;
				this.numPlanes += nGlobal;

			}
		};

		function resetGlobalState() {

			if ( uniform.value !== globalState ) {

				uniform.value = globalState;
				uniform.needsUpdate = numGlobalPlanes > 0;

			}

			scope.numPlanes = numGlobalPlanes;
			scope.numIntersection = 0;

		}

		function projectPlanes( planes, camera, dstOffset, skipTransform ) {

			var nPlanes = planes !== null ? planes.length : 0,
				dstArray = null;

			if ( nPlanes !== 0 ) {

				dstArray = uniform.value;

				if ( skipTransform !== true || dstArray === null ) {

					var flatSize = dstOffset + nPlanes * 4,
						viewMatrix = camera.matrixWorldInverse;

					viewNormalMatrix.getNormalMatrix( viewMatrix );

					if ( dstArray === null || dstArray.length < flatSize ) {

						dstArray = new Float32Array( flatSize );

					}

					for ( var i = 0, i4 = dstOffset; i !== nPlanes; ++ i, i4 += 4 ) {

						plane.copy( planes[ i ] ).applyMatrix4( viewMatrix, viewNormalMatrix );

						plane.normal.toArray( dstArray, i4 );
						dstArray[ i4 + 3 ] = plane.constant;

					}

				}

				uniform.value = dstArray;
				uniform.needsUpdate = true;

			}

			scope.numPlanes = nPlanes;

			return dstArray;

		}

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLExtensions( gl ) {

		var extensions = {};

		return {

			get: function ( name ) {

				if ( extensions[ name ] !== undefined ) {

					return extensions[ name ];

				}

				var extension;

				switch ( name ) {

					case 'WEBGL_depth_texture':
						extension = gl.getExtension( 'WEBGL_depth_texture' ) || gl.getExtension( 'MOZ_WEBGL_depth_texture' ) || gl.getExtension( 'WEBKIT_WEBGL_depth_texture' );
						break;

					case 'EXT_texture_filter_anisotropic':
						extension = gl.getExtension( 'EXT_texture_filter_anisotropic' ) || gl.getExtension( 'MOZ_EXT_texture_filter_anisotropic' ) || gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );
						break;

					case 'WEBGL_compressed_texture_s3tc':
						extension = gl.getExtension( 'WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'MOZ_WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_s3tc' );
						break;

					case 'WEBGL_compressed_texture_pvrtc':
						extension = gl.getExtension( 'WEBGL_compressed_texture_pvrtc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_pvrtc' );
						break;

					default:
						extension = gl.getExtension( name );

				}

				if ( extension === null ) {

					console.warn( 'WebGLRenderer: ' + name + ' extension not supported.' );

				}

				extensions[ name ] = extension;

				return extension;

			}

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLGeometries( gl, attributes, info ) {

		var geometries = {};
		var wireframeAttributes = {};

		function onGeometryDispose( event ) {

			var geometry = event.target;
			var buffergeometry = geometries[ geometry.id ];

			if ( buffergeometry.index !== null ) {

				attributes.remove( buffergeometry.index );

			}

			for ( var name in buffergeometry.attributes ) {

				attributes.remove( buffergeometry.attributes[ name ] );

			}

			geometry.removeEventListener( 'dispose', onGeometryDispose );

			delete geometries[ geometry.id ];

			var attribute = wireframeAttributes[ buffergeometry.id ];

			if ( attribute ) {

				attributes.remove( attribute );
				delete wireframeAttributes[ buffergeometry.id ];

			}

			//

			info.memory.geometries --;

		}

		function get( object, geometry ) {

			var buffergeometry = geometries[ geometry.id ];

			if ( buffergeometry ) return buffergeometry;

			geometry.addEventListener( 'dispose', onGeometryDispose );

			if ( geometry.isBufferGeometry ) {

				buffergeometry = geometry;

			} else if ( geometry.isGeometry ) {

				if ( geometry._bufferGeometry === undefined ) {

					geometry._bufferGeometry = new BufferGeometry().setFromObject( object );

				}

				buffergeometry = geometry._bufferGeometry;

			}

			geometries[ geometry.id ] = buffergeometry;

			info.memory.geometries ++;

			return buffergeometry;

		}

		function update( geometry ) {

			var index = geometry.index;
			var geometryAttributes = geometry.attributes;

			if ( index !== null ) {

				attributes.update( index, gl.ELEMENT_ARRAY_BUFFER );

			}

			for ( var name in geometryAttributes ) {

				attributes.update( geometryAttributes[ name ], gl.ARRAY_BUFFER );

			}

			// morph targets

			var morphAttributes = geometry.morphAttributes;

			for ( var name in morphAttributes ) {

				var array = morphAttributes[ name ];

				for ( var i = 0, l = array.length; i < l; i ++ ) {

					attributes.update( array[ i ], gl.ARRAY_BUFFER );

				}

			}

		}

		function getWireframeAttribute( geometry ) {

			var attribute = wireframeAttributes[ geometry.id ];

			if ( attribute ) return attribute;

			var indices = [];

			var geometryIndex = geometry.index;
			var geometryAttributes = geometry.attributes;

			// console.time( 'wireframe' );

			if ( geometryIndex !== null ) {

				var array = geometryIndex.array;

				for ( var i = 0, l = array.length; i < l; i += 3 ) {

					var a = array[ i + 0 ];
					var b = array[ i + 1 ];
					var c = array[ i + 2 ];

					indices.push( a, b, b, c, c, a );

				}

			} else {

				var array = geometryAttributes.position.array;

				for ( var i = 0, l = ( array.length / 3 ) - 1; i < l; i += 3 ) {

					var a = i + 0;
					var b = i + 1;
					var c = i + 2;

					indices.push( a, b, b, c, c, a );

				}

			}

			// console.timeEnd( 'wireframe' );

			attribute = new ( arrayMax( indices ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( indices, 1 );

			attributes.update( attribute, gl.ELEMENT_ARRAY_BUFFER );

			wireframeAttributes[ geometry.id ] = attribute;

			return attribute;

		}

		return {

			get: get,
			update: update,

			getWireframeAttribute: getWireframeAttribute

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLIndexedBufferRenderer( gl, extensions, info, capabilities ) {

		var mode;

		function setMode( value ) {

			mode = value;

		}

		var type, bytesPerElement;

		function setIndex( value ) {

			type = value.type;
			bytesPerElement = value.bytesPerElement;

		}

		function render( start, count ) {

			gl.drawElements( mode, count, type, start * bytesPerElement );

			info.update( count, mode );

		}

		function renderInstances( geometry, start, count ) {

			var extension;

			if ( capabilities.isWebGL2 ) {

				extension = gl;

			} else {

				var extension = extensions.get( 'ANGLE_instanced_arrays' );

				if ( extension === null ) {

					console.error( 'WebGLIndexedBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			extension[ capabilities.isWebGL2 ? 'drawElementsInstanced' : 'drawElementsInstancedANGLE' ]( mode, count, type, start * bytesPerElement, geometry.maxInstancedCount );

			info.update( count, mode, geometry.maxInstancedCount );

		}

		//

		this.setMode = setMode;
		this.setIndex = setIndex;
		this.render = render;
		this.renderInstances = renderInstances;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLInfo( gl ) {

		var memory = {
			geometries: 0,
			textures: 0
		};

		var render = {
			frame: 0,
			calls: 0,
			triangles: 0,
			points: 0,
			lines: 0
		};

		function update( count, mode, instanceCount ) {

			instanceCount = instanceCount || 1;

			render.calls ++;

			switch ( mode ) {

				case gl.TRIANGLES:
					render.triangles += instanceCount * ( count / 3 );
					break;

				case gl.TRIANGLE_STRIP:
				case gl.TRIANGLE_FAN:
					render.triangles += instanceCount * ( count - 2 );
					break;

				case gl.LINES:
					render.lines += instanceCount * ( count / 2 );
					break;

				case gl.LINE_STRIP:
					render.lines += instanceCount * ( count - 1 );
					break;

				case gl.LINE_LOOP:
					render.lines += instanceCount * count;
					break;

				case gl.POINTS:
					render.points += instanceCount * count;
					break;

				default:
					console.error( 'WebGLInfo: Unknown draw mode:', mode );
					break;

			}

		}

		function reset() {

			render.frame ++;
			render.calls = 0;
			render.triangles = 0;
			render.points = 0;
			render.lines = 0;

		}

		return {
			memory: memory,
			render: render,
			programs: null,
			autoReset: true,
			reset: reset,
			update: update
		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function absNumericalSort( a, b ) {

		return Math.abs( b[ 1 ] ) - Math.abs( a[ 1 ] );

	}

	function WebGLMorphtargets( gl ) {

		var influencesList = {};
		var morphInfluences = new Float32Array( 8 );

		function update( object, geometry, material, program ) {

			var objectInfluences = object.morphTargetInfluences;

			var length = objectInfluences.length;

			var influences = influencesList[ geometry.id ];

			if ( influences === undefined ) {

				// initialise list

				influences = [];

				for ( var i = 0; i < length; i ++ ) {

					influences[ i ] = [ i, 0 ];

				}

				influencesList[ geometry.id ] = influences;

			}

			var morphTargets = material.morphTargets && geometry.morphAttributes.position;
			var morphNormals = material.morphNormals && geometry.morphAttributes.normal;

			// Remove current morphAttributes

			for ( var i = 0; i < length; i ++ ) {

				var influence = influences[ i ];

				if ( influence[ 1 ] !== 0 ) {

					if ( morphTargets ) geometry.removeAttribute( 'morphTarget' + i );
					if ( morphNormals ) geometry.removeAttribute( 'morphNormal' + i );

				}

			}

			// Collect influences

			for ( var i = 0; i < length; i ++ ) {

				var influence = influences[ i ];

				influence[ 0 ] = i;
				influence[ 1 ] = objectInfluences[ i ];

			}

			influences.sort( absNumericalSort );

			// Add morphAttributes

			for ( var i = 0; i < 8; i ++ ) {

				var influence = influences[ i ];

				if ( influence ) {

					var index = influence[ 0 ];
					var value = influence[ 1 ];

					if ( value ) {

						if ( morphTargets ) geometry.addAttribute( 'morphTarget' + i, morphTargets[ index ] );
						if ( morphNormals ) geometry.addAttribute( 'morphNormal' + i, morphNormals[ index ] );

						morphInfluences[ i ] = value;
						continue;

					}

				}

				morphInfluences[ i ] = 0;

			}

			program.getUniforms().setValue( gl, 'morphTargetInfluences', morphInfluences );

		}

		return {

			update: update

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLObjects( geometries, info ) {

		var updateList = {};

		function update( object ) {

			var frame = info.render.frame;

			var geometry = object.geometry;
			var buffergeometry = geometries.get( object, geometry );

			// Update once per frame

			if ( updateList[ buffergeometry.id ] !== frame ) {

				if ( geometry.isGeometry ) {

					buffergeometry.updateFromObject( object );

				}

				geometries.update( buffergeometry );

				updateList[ buffergeometry.id ] = frame;

			}

			return buffergeometry;

		}

		function dispose() {

			updateList = {};

		}

		return {

			update: update,
			dispose: dispose

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CubeTexture( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

		images = images !== undefined ? images : [];
		mapping = mapping !== undefined ? mapping : CubeReflectionMapping;

		Texture.call( this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.flipY = false;

	}

	CubeTexture.prototype = Object.create( Texture.prototype );
	CubeTexture.prototype.constructor = CubeTexture;

	CubeTexture.prototype.isCubeTexture = true;

	Object.defineProperty( CubeTexture.prototype, 'images', {

		get: function () {

			return this.image;

		},

		set: function ( value ) {

			this.image = value;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function DataTexture3D( data, width, height, depth ) {

		// We're going to add .setXXX() methods for setting properties later.
		// Users can still set in DataTexture3D directly.
		//
		//	var texture = new DataTexture3D( data, width, height, depth );
		// 	texture.anisotropy = 16;
		//
		// See #14839

		Texture.call( this, null );

		this.image = { data: data, width: width, height: height, depth: depth };

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.generateMipmaps = false;
		this.flipY = false;

	}

	DataTexture3D.prototype = Object.create( Texture.prototype );
	DataTexture3D.prototype.constructor = DataTexture3D;
	DataTexture3D.prototype.isDataTexture3D = true;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var emptyTexture = new Texture();
	var emptyTexture3d = new DataTexture3D();
	var emptyCubeTexture = new CubeTexture();

	// --- Base for inner nodes (including the root) ---

	function UniformContainer() {

		this.seq = [];
		this.map = {};

	}

	// --- Utilities ---

	// Array Caches (provide typed arrays for temporary by size)

	var arrayCacheF32 = [];
	var arrayCacheI32 = [];

	// Float32Array caches used for uploading Matrix uniforms

	var mat4array = new Float32Array( 16 );
	var mat3array = new Float32Array( 9 );
	var mat2array = new Float32Array( 4 );

	// Flattening for arrays of vectors and matrices

	function flatten( array, nBlocks, blockSize ) {

		var firstElem = array[ 0 ];

		if ( firstElem <= 0 || firstElem > 0 ) return array;
		// unoptimized: ! isNaN( firstElem )
		// see http://jacksondunstan.com/articles/983

		var n = nBlocks * blockSize,
			r = arrayCacheF32[ n ];

		if ( r === undefined ) {

			r = new Float32Array( n );
			arrayCacheF32[ n ] = r;

		}

		if ( nBlocks !== 0 ) {

			firstElem.toArray( r, 0 );

			for ( var i = 1, offset = 0; i !== nBlocks; ++ i ) {

				offset += blockSize;
				array[ i ].toArray( r, offset );

			}

		}

		return r;

	}

	function arraysEqual( a, b ) {

		if ( a.length !== b.length ) return false;

		for ( var i = 0, l = a.length; i < l; i ++ ) {

			if ( a[ i ] !== b[ i ] ) return false;

		}

		return true;

	}

	function copyArray( a, b ) {

		for ( var i = 0, l = b.length; i < l; i ++ ) {

			a[ i ] = b[ i ];

		}

	}

	// Texture unit allocation

	function allocTexUnits( renderer, n ) {

		var r = arrayCacheI32[ n ];

		if ( r === undefined ) {

			r = new Int32Array( n );
			arrayCacheI32[ n ] = r;

		}

		for ( var i = 0; i !== n; ++ i )
			r[ i ] = renderer.allocTextureUnit();

		return r;

	}

	// --- Setters ---

	// Note: Defining these methods externally, because they come in a bunch
	// and this way their names minify.

	// Single scalar

	function setValue1f( gl, v ) {

		var cache = this.cache;

		if ( cache[ 0 ] === v ) return;

		gl.uniform1f( this.addr, v );

		cache[ 0 ] = v;

	}

	function setValue1i( gl, v ) {

		var cache = this.cache;

		if ( cache[ 0 ] === v ) return;

		gl.uniform1i( this.addr, v );

		cache[ 0 ] = v;

	}

	// Single float vector (from flat array or VectorN)

	function setValue2fv( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y ) {

				gl.uniform2f( this.addr, v.x, v.y );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform2fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValue3fv( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z ) {

				gl.uniform3f( this.addr, v.x, v.y, v.z );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;

			}

		} else if ( v.r !== undefined ) {

			if ( cache[ 0 ] !== v.r || cache[ 1 ] !== v.g || cache[ 2 ] !== v.b ) {

				gl.uniform3f( this.addr, v.r, v.g, v.b );

				cache[ 0 ] = v.r;
				cache[ 1 ] = v.g;
				cache[ 2 ] = v.b;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform3fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValue4fv( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z || cache[ 3 ] !== v.w ) {

				gl.uniform4f( this.addr, v.x, v.y, v.z, v.w );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;
				cache[ 3 ] = v.w;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform4fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	// Single matrix (from flat array or MatrixN)

	function setValue2fm( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix2fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat2array.set( elements );

			gl.uniformMatrix2fv( this.addr, false, mat2array );

			copyArray( cache, elements );

		}

	}

	function setValue3fm( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix3fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat3array.set( elements );

			gl.uniformMatrix3fv( this.addr, false, mat3array );

			copyArray( cache, elements );

		}

	}

	function setValue4fm( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix4fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat4array.set( elements );

			gl.uniformMatrix4fv( this.addr, false, mat4array );

			copyArray( cache, elements );

		}

	}

	// Single texture (2D / Cube)

	function setValueT1( gl, v, renderer ) {

		var cache = this.cache;
		var unit = renderer.allocTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		renderer.setTexture2D( v || emptyTexture, unit );

	}

	function setValueT3D1( gl, v, renderer ) {

		var cache = this.cache;
		var unit = renderer.allocTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		renderer.setTexture3D( v || emptyTexture3d, unit );

	}

	function setValueT6( gl, v, renderer ) {

		var cache = this.cache;
		var unit = renderer.allocTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		renderer.setTextureCube( v || emptyCubeTexture, unit );

	}

	// Integer / Boolean vectors or arrays thereof (always flat arrays)

	function setValue2iv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform2iv( this.addr, v );

		copyArray( cache, v );

	}

	function setValue3iv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform3iv( this.addr, v );

		copyArray( cache, v );

	}

	function setValue4iv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform4iv( this.addr, v );

		copyArray( cache, v );

	}

	// Helper to pick the right setter for the singular case

	function getSingularSetter( type ) {

		switch ( type ) {

			case 0x1406: return setValue1f; // FLOAT
			case 0x8b50: return setValue2fv; // _VEC2
			case 0x8b51: return setValue3fv; // _VEC3
			case 0x8b52: return setValue4fv; // _VEC4

			case 0x8b5a: return setValue2fm; // _MAT2
			case 0x8b5b: return setValue3fm; // _MAT3
			case 0x8b5c: return setValue4fm; // _MAT4

			case 0x8b5e: case 0x8d66: return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
			case 0x8B5F: return setValueT3D1; // SAMPLER_3D
			case 0x8b60: return setValueT6; // SAMPLER_CUBE

			case 0x1404: case 0x8b56: return setValue1i; // INT, BOOL
			case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
			case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
			case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

		}

	}

	// Array of scalars

	function setValue1fv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform1fv( this.addr, v );

		copyArray( cache, v );

	}
	function setValue1iv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform1iv( this.addr, v );

		copyArray( cache, v );

	}

	// Array of vectors (flat or from THREE classes)

	function setValueV2a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 2 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniform2fv( this.addr, data );

		this.updateCache( data );

	}

	function setValueV3a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 3 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniform3fv( this.addr, data );

		this.updateCache( data );

	}

	function setValueV4a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 4 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniform4fv( this.addr, data );

		this.updateCache( data );

	}

	// Array of matrices (flat or from THREE clases)

	function setValueM2a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 4 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniformMatrix2fv( this.addr, false, data );

		this.updateCache( data );

	}

	function setValueM3a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 9 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniformMatrix3fv( this.addr, false, data );

		this.updateCache( data );

	}

	function setValueM4a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 16 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniformMatrix4fv( this.addr, false, data );

		this.updateCache( data );

	}

	// Array of textures (2D / Cube)

	function setValueT1a( gl, v, renderer ) {

		var cache = this.cache;
		var n = v.length;

		var units = allocTexUnits( renderer, n );

		if ( arraysEqual( cache, units ) === false ) {

			gl.uniform1iv( this.addr, units );
			copyArray( cache, units );

		}

		for ( var i = 0; i !== n; ++ i ) {

			renderer.setTexture2D( v[ i ] || emptyTexture, units[ i ] );

		}

	}

	function setValueT6a( gl, v, renderer ) {

		var cache = this.cache;
		var n = v.length;

		var units = allocTexUnits( renderer, n );

		if ( arraysEqual( cache, units ) === false ) {

			gl.uniform1iv( this.addr, units );
			copyArray( cache, units );

		}

		for ( var i = 0; i !== n; ++ i ) {

			renderer.setTextureCube( v[ i ] || emptyCubeTexture, units[ i ] );

		}

	}

	// Helper to pick the right setter for a pure (bottom-level) array

	function getPureArraySetter( type ) {

		switch ( type ) {

			case 0x1406: return setValue1fv; // FLOAT
			case 0x8b50: return setValueV2a; // _VEC2
			case 0x8b51: return setValueV3a; // _VEC3
			case 0x8b52: return setValueV4a; // _VEC4

			case 0x8b5a: return setValueM2a; // _MAT2
			case 0x8b5b: return setValueM3a; // _MAT3
			case 0x8b5c: return setValueM4a; // _MAT4

			case 0x8b5e: return setValueT1a; // SAMPLER_2D
			case 0x8b60: return setValueT6a; // SAMPLER_CUBE

			case 0x1404: case 0x8b56: return setValue1iv; // INT, BOOL
			case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
			case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
			case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

		}

	}

	// --- Uniform Classes ---

	function SingleUniform( id, activeInfo, addr ) {

		this.id = id;
		this.addr = addr;
		this.cache = [];
		this.setValue = getSingularSetter( activeInfo.type );

		// this.path = activeInfo.name; // DEBUG

	}

	function PureArrayUniform( id, activeInfo, addr ) {

		this.id = id;
		this.addr = addr;
		this.cache = [];
		this.size = activeInfo.size;
		this.setValue = getPureArraySetter( activeInfo.type );

		// this.path = activeInfo.name; // DEBUG

	}

	PureArrayUniform.prototype.updateCache = function ( data ) {

		var cache = this.cache;

		if ( data instanceof Float32Array && cache.length !== data.length ) {

			this.cache = new Float32Array( data.length );

		}

		copyArray( cache, data );

	};

	function StructuredUniform( id ) {

		this.id = id;

		UniformContainer.call( this ); // mix-in

	}

	StructuredUniform.prototype.setValue = function ( gl, value, renderer ) {

		var seq = this.seq;

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ];
			u.setValue( gl, value[ u.id ], renderer );

		}

	};

	// --- Top-level ---

	// Parser - builds up the property tree from the path strings

	var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;

	// extracts
	// 	- the identifier (member name or array index)
	//  - followed by an optional right bracket (found when array index)
	//  - followed by an optional left bracket or dot (type of subscript)
	//
	// Note: These portions can be read in a non-overlapping fashion and
	// allow straightforward parsing of the hierarchy that WebGL encodes
	// in the uniform names.

	function addUniform( container, uniformObject ) {

		container.seq.push( uniformObject );
		container.map[ uniformObject.id ] = uniformObject;

	}

	function parseUniform( activeInfo, addr, container ) {

		var path = activeInfo.name,
			pathLength = path.length;

		// reset RegExp object, because of the early exit of a previous run
		RePathPart.lastIndex = 0;

		while ( true ) {

			var match = RePathPart.exec( path ),
				matchEnd = RePathPart.lastIndex,

				id = match[ 1 ],
				idIsIndex = match[ 2 ] === ']',
				subscript = match[ 3 ];

			if ( idIsIndex ) id = id | 0; // convert to integer

			if ( subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength ) {

				// bare name or "pure" bottom-level array "[0]" suffix

				addUniform( container, subscript === undefined ?
					new SingleUniform( id, activeInfo, addr ) :
					new PureArrayUniform( id, activeInfo, addr ) );

				break;

			} else {

				// step into inner node / create it in case it doesn't exist

				var map = container.map, next = map[ id ];

				if ( next === undefined ) {

					next = new StructuredUniform( id );
					addUniform( container, next );

				}

				container = next;

			}

		}

	}

	// Root Container

	function WebGLUniforms( gl, program, renderer ) {

		UniformContainer.call( this );

		this.renderer = renderer;

		var n = gl.getProgramParameter( program, gl.ACTIVE_UNIFORMS );

		for ( var i = 0; i < n; ++ i ) {

			var info = gl.getActiveUniform( program, i ),
				addr = gl.getUniformLocation( program, info.name );

			parseUniform( info, addr, this );

		}

	}

	WebGLUniforms.prototype.setValue = function ( gl, name, value ) {

		var u = this.map[ name ];

		if ( u !== undefined ) u.setValue( gl, value, this.renderer );

	};

	WebGLUniforms.prototype.setOptional = function ( gl, object, name ) {

		var v = object[ name ];

		if ( v !== undefined ) this.setValue( gl, name, v );

	};
	// Static interface

	WebGLUniforms.upload = function ( gl, seq, values, renderer ) {

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ],
				v = values[ u.id ];

			if ( v.needsUpdate !== false ) {

				// note: always updating when .needsUpdate is undefined
				u.setValue( gl, v.value, renderer );

			}

		}

	};

	WebGLUniforms.seqWithValue = function ( seq, values ) {

		var r = [];

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ];
			if ( u.id in values ) r.push( u );

		}

		return r;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function addLineNumbers( string ) {

		var lines = string.split( '\n' );

		for ( var i = 0; i < lines.length; i ++ ) {

			lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];

		}

		return lines.join( '\n' );

	}

	function WebGLShader( gl, type, string ) {

		var shader = gl.createShader( type );

		gl.shaderSource( shader, string );
		gl.compileShader( shader );

		if ( gl.getShaderParameter( shader, gl.COMPILE_STATUS ) === false ) {

			console.error( 'WebGLShader: Shader couldn\'t compile.' );

		}

		if ( gl.getShaderInfoLog( shader ) !== '' ) {

			console.warn( 'WebGLShader: gl.getShaderInfoLog()', type === gl.VERTEX_SHADER ? 'vertex' : 'fragment', gl.getShaderInfoLog( shader ), addLineNumbers( string ) );

		}

		// --enable-privileged-webgl-extension
		// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

		return shader;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var programIdCount = 0;

	function getEncodingComponents( encoding ) {

		switch ( encoding ) {

			case LinearEncoding:
				return [ 'Linear', '( value )' ];
			case sRGBEncoding:
				return [ 'sRGB', '( value )' ];
			case RGBEEncoding:
				return [ 'RGBE', '( value )' ];
			case RGBM7Encoding:
				return [ 'RGBM', '( value, 7.0 )' ];
			case RGBM16Encoding:
				return [ 'RGBM', '( value, 16.0 )' ];
			case RGBDEncoding:
				return [ 'RGBD', '( value, 256.0 )' ];
			case GammaEncoding:
				return [ 'Gamma', '( value, float( GAMMA_FACTOR ) )' ];
			default:
				throw new Error( 'unsupported encoding: ' + encoding );

		}

	}

	function getTexelDecodingFunction( functionName, encoding ) {

		var components = getEncodingComponents( encoding );
		return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[ 0 ] + 'ToLinear' + components[ 1 ] + '; }';

	}

	function getTexelEncodingFunction( functionName, encoding ) {

		var components = getEncodingComponents( encoding );
		return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[ 0 ] + components[ 1 ] + '; }';

	}

	function getToneMappingFunction( functionName, toneMapping ) {

		var toneMappingName;

		switch ( toneMapping ) {

			case LinearToneMapping:
				toneMappingName = 'Linear';
				break;

			case ReinhardToneMapping:
				toneMappingName = 'Reinhard';
				break;

			case Uncharted2ToneMapping:
				toneMappingName = 'Uncharted2';
				break;

			case CineonToneMapping:
				toneMappingName = 'OptimizedCineon';
				break;

			default:
				throw new Error( 'unsupported toneMapping: ' + toneMapping );

		}

		return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';

	}

	function generateExtensions( extensions, parameters, rendererExtensions ) {

		extensions = extensions || {};

		var chunks = [
			( extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || ( parameters.normalMap && ! parameters.objectSpaceNormalMap ) || parameters.flatShading ) ? '#extension GL_OES_standard_derivatives : enable' : '',
			( extensions.fragDepth || parameters.logarithmicDepthBuffer ) && rendererExtensions.get( 'EXT_frag_depth' ) ? '#extension GL_EXT_frag_depth : enable' : '',
			( extensions.drawBuffers ) && rendererExtensions.get( 'WEBGL_draw_buffers' ) ? '#extension GL_EXT_draw_buffers : require' : '',
			( extensions.shaderTextureLOD || parameters.envMap ) && rendererExtensions.get( 'EXT_shader_texture_lod' ) ? '#extension GL_EXT_shader_texture_lod : enable' : ''
		];

		return chunks.filter( filterEmptyLine ).join( '\n' );

	}

	function generateDefines( defines ) {

		var chunks = [];

		for ( var name in defines ) {

			var value = defines[ name ];

			if ( value === false ) continue;

			chunks.push( '#define ' + name + ' ' + value );

		}

		return chunks.join( '\n' );

	}

	function fetchAttributeLocations( gl, program ) {

		var attributes = {};

		var n = gl.getProgramParameter( program, gl.ACTIVE_ATTRIBUTES );

		for ( var i = 0; i < n; i ++ ) {

			var info = gl.getActiveAttrib( program, i );
			var name = info.name;

			// console.log( 'WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

			attributes[ name ] = gl.getAttribLocation( program, name );

		}

		return attributes;

	}

	function filterEmptyLine( string ) {

		return string !== '';

	}

	function replaceLightNums( string, parameters ) {

		return string
			.replace( /NUM_DIR_LIGHTS/g, parameters.numDirLights )
			.replace( /NUM_SPOT_LIGHTS/g, parameters.numSpotLights )
			.replace( /NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights )
			.replace( /NUM_POINT_LIGHTS/g, parameters.numPointLights )
			.replace( /NUM_HEMI_LIGHTS/g, parameters.numHemiLights );

	}

	function replaceClippingPlaneNums( string, parameters ) {

		return string
			.replace( /NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes )
			.replace( /UNION_CLIPPING_PLANES/g, ( parameters.numClippingPlanes - parameters.numClipIntersection ) );

	}

	function parseIncludes( string ) {

		var pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

		function replace( match, include ) {

			var replace = ShaderChunk[ include ];

			if ( replace === undefined ) {

				throw new Error( 'Can not resolve #include <' + include + '>' );

			}

			return parseIncludes( replace );

		}

		return string.replace( pattern, replace );

	}

	function unrollLoops( string ) {

		var pattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;

		function replace( match, start, end, snippet ) {

			var unroll = '';

			for ( var i = parseInt( start ); i < parseInt( end ); i ++ ) {

				unroll += snippet.replace( /\[ i \]/g, '[ ' + i + ' ]' );

			}

			return unroll;

		}

		return string.replace( pattern, replace );

	}

	function WebGLProgram( renderer, extensions, code, material, shader, parameters, capabilities ) {

		var gl = renderer.context;

		var defines = material.defines;

		var vertexShader = shader.vertexShader;
		var fragmentShader = shader.fragmentShader;

		var shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';

		if ( parameters.shadowMapType === PCFShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';

		} else if ( parameters.shadowMapType === PCFSoftShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';

		}

		var envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
		var envMapModeDefine = 'ENVMAP_MODE_REFLECTION';
		var envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';

		if ( parameters.envMap ) {

			switch ( material.envMap.mapping ) {

				case CubeReflectionMapping:
				case CubeRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
					break;

				case CubeUVReflectionMapping:
				case CubeUVRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
					break;

				case EquirectangularReflectionMapping:
				case EquirectangularRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_EQUIREC';
					break;

				case SphericalReflectionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_SPHERE';
					break;

			}

			switch ( material.envMap.mapping ) {

				case CubeRefractionMapping:
				case EquirectangularRefractionMapping:
					envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
					break;

			}

			switch ( material.combine ) {

				case MultiplyOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
					break;

				case MixOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
					break;

				case AddOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
					break;

			}

		}

		var gammaFactorDefine = ( renderer.gammaFactor > 0 ) ? renderer.gammaFactor : 1.0;

		// console.log( 'building new program ' );

		//

		var customExtensions = capabilities.isWebGL2 ? '' : generateExtensions( material.extensions, parameters, extensions );

		var customDefines = generateDefines( defines );

		//

		var program = gl.createProgram();

		var prefixVertex, prefixFragment;

		if ( material.isRawShaderMaterial ) {

			prefixVertex = [

				customDefines

			].filter( filterEmptyLine ).join( '\n' );

			if ( prefixVertex.length > 0 ) {

				prefixVertex += '\n';

			}

			prefixFragment = [

				customExtensions,
				customDefines

			].filter( filterEmptyLine ).join( '\n' );

			if ( prefixFragment.length > 0 ) {

				prefixFragment += '\n';

			}

		} else {

			prefixVertex = [

				'precision ' + parameters.precision + ' float;',
				'precision ' + parameters.precision + ' int;',

				'#define SHADER_NAME ' + shader.name,

				customDefines,

				parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',

				'#define GAMMA_FACTOR ' + gammaFactorDefine,

				'#define MAX_BONES ' + parameters.maxBones,
				( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
				( parameters.useFog && parameters.fogExp ) ? '#define FOG_EXP2' : '',

				parameters.map ? '#define USE_MAP' : '',
				parameters.envMap ? '#define USE_ENVMAP' : '',
				parameters.envMap ? '#define ' + envMapModeDefine : '',
				parameters.lightMap ? '#define USE_LIGHTMAP' : '',
				parameters.aoMap ? '#define USE_AOMAP' : '',
				parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
				parameters.bumpMap ? '#define USE_BUMPMAP' : '',
				parameters.normalMap ? '#define USE_NORMALMAP' : '',
				( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
				parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
				parameters.specularMap ? '#define USE_SPECULARMAP' : '',
				parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
				parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
				parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
				parameters.vertexColors ? '#define USE_COLOR' : '',

				parameters.flatShading ? '#define FLAT_SHADED' : '',

				parameters.skinning ? '#define USE_SKINNING' : '',
				parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',

				parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
				parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
				parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
				parameters.flipSided ? '#define FLIP_SIDED' : '',

				parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
				parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

				parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

				parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
				parameters.logarithmicDepthBuffer && ( capabilities.isWebGL2 || extensions.get( 'EXT_frag_depth' ) ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

				'uniform mat4 modelMatrix;',
				'uniform mat4 modelViewMatrix;',
				'uniform mat4 projectionMatrix;',
				'uniform mat4 viewMatrix;',
				'uniform mat3 normalMatrix;',
				'uniform vec3 cameraPosition;',

				'attribute vec3 position;',
				'attribute vec3 normal;',
				'attribute vec2 uv;',

				'#ifdef USE_COLOR',

				'	attribute vec3 color;',

				'#endif',

				'#ifdef USE_MORPHTARGETS',

				'	attribute vec3 morphTarget0;',
				'	attribute vec3 morphTarget1;',
				'	attribute vec3 morphTarget2;',
				'	attribute vec3 morphTarget3;',

				'	#ifdef USE_MORPHNORMALS',

				'		attribute vec3 morphNormal0;',
				'		attribute vec3 morphNormal1;',
				'		attribute vec3 morphNormal2;',
				'		attribute vec3 morphNormal3;',

				'	#else',

				'		attribute vec3 morphTarget4;',
				'		attribute vec3 morphTarget5;',
				'		attribute vec3 morphTarget6;',
				'		attribute vec3 morphTarget7;',

				'	#endif',

				'#endif',

				'#ifdef USE_SKINNING',

				'	attribute vec4 skinIndex;',
				'	attribute vec4 skinWeight;',

				'#endif',

				'\n'

			].filter( filterEmptyLine ).join( '\n' );

			prefixFragment = [

				customExtensions,

				'precision ' + parameters.precision + ' float;',
				'precision ' + parameters.precision + ' int;',

				'#define SHADER_NAME ' + shader.name,

				customDefines,

				parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest + ( parameters.alphaTest % 1 ? '' : '.0' ) : '', // add '.0' if integer

				'#define GAMMA_FACTOR ' + gammaFactorDefine,

				( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
				( parameters.useFog && parameters.fogExp ) ? '#define FOG_EXP2' : '',

				parameters.map ? '#define USE_MAP' : '',
				parameters.envMap ? '#define USE_ENVMAP' : '',
				parameters.envMap ? '#define ' + envMapTypeDefine : '',
				parameters.envMap ? '#define ' + envMapModeDefine : '',
				parameters.envMap ? '#define ' + envMapBlendingDefine : '',
				parameters.lightMap ? '#define USE_LIGHTMAP' : '',
				parameters.aoMap ? '#define USE_AOMAP' : '',
				parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
				parameters.bumpMap ? '#define USE_BUMPMAP' : '',
				parameters.normalMap ? '#define USE_NORMALMAP' : '',
				( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
				parameters.specularMap ? '#define USE_SPECULARMAP' : '',
				parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
				parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
				parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
				parameters.vertexColors ? '#define USE_COLOR' : '',

				parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

				parameters.flatShading ? '#define FLAT_SHADED' : '',

				parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
				parameters.flipSided ? '#define FLIP_SIDED' : '',

				parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
				parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

				parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

				parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',

				parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
				parameters.logarithmicDepthBuffer && ( capabilities.isWebGL2 || extensions.get( 'EXT_frag_depth' ) ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

				parameters.envMap && ( capabilities.isWebGL2 || extensions.get( 'EXT_shader_texture_lod' ) ) ? '#define TEXTURE_LOD_EXT' : '',

				'uniform mat4 viewMatrix;',
				'uniform vec3 cameraPosition;',

				( parameters.toneMapping !== NoToneMapping ) ? '#define TONE_MAPPING' : '',
				( parameters.toneMapping !== NoToneMapping ) ? ShaderChunk[ 'tonemapping_pars_fragment' ] : '', // this code is required here because it is used by the toneMapping() function defined below
				( parameters.toneMapping !== NoToneMapping ) ? getToneMappingFunction( 'toneMapping', parameters.toneMapping ) : '',

				parameters.dithering ? '#define DITHERING' : '',

				( parameters.outputEncoding || parameters.mapEncoding || parameters.matcapEncoding || parameters.envMapEncoding || parameters.emissiveMapEncoding ) ?
					ShaderChunk[ 'encodings_pars_fragment' ] : '', // this code is required here because it is used by the various encoding/decoding function defined below
				parameters.mapEncoding ? getTexelDecodingFunction( 'mapTexelToLinear', parameters.mapEncoding ) : '',
				parameters.matcapEncoding ? getTexelDecodingFunction( 'matcapTexelToLinear', parameters.matcapEncoding ) : '',
				parameters.envMapEncoding ? getTexelDecodingFunction( 'envMapTexelToLinear', parameters.envMapEncoding ) : '',
				parameters.emissiveMapEncoding ? getTexelDecodingFunction( 'emissiveMapTexelToLinear', parameters.emissiveMapEncoding ) : '',
				parameters.outputEncoding ? getTexelEncodingFunction( 'linearToOutputTexel', parameters.outputEncoding ) : '',

				parameters.depthPacking ? '#define DEPTH_PACKING ' + material.depthPacking : '',

				'\n'

			].filter( filterEmptyLine ).join( '\n' );

		}

		vertexShader = parseIncludes( vertexShader );
		vertexShader = replaceLightNums( vertexShader, parameters );
		vertexShader = replaceClippingPlaneNums( vertexShader, parameters );

		fragmentShader = parseIncludes( fragmentShader );
		fragmentShader = replaceLightNums( fragmentShader, parameters );
		fragmentShader = replaceClippingPlaneNums( fragmentShader, parameters );

		vertexShader = unrollLoops( vertexShader );
		fragmentShader = unrollLoops( fragmentShader );

		if ( capabilities.isWebGL2 && ! material.isRawShaderMaterial ) {

			var isGLSL3ShaderMaterial = false;

			var versionRegex = /^\s*#version\s+300\s+es\s*\n/;

			if ( material.isShaderMaterial &&
				vertexShader.match( versionRegex ) !== null &&
				fragmentShader.match( versionRegex ) !== null ) {

				isGLSL3ShaderMaterial = true;

				vertexShader = vertexShader.replace( versionRegex, '' );
				fragmentShader = fragmentShader.replace( versionRegex, '' );

			}

			// GLSL 3.0 conversion
			prefixVertex = [
				'#version 300 es\n',
				'#define attribute in',
				'#define varying out',
				'#define texture2D texture'
			].join( '\n' ) + '\n' + prefixVertex;

			prefixFragment = [
				'#version 300 es\n',
				'#define varying in',
				isGLSL3ShaderMaterial ? '' : 'out highp vec4 pc_fragColor;',
				isGLSL3ShaderMaterial ? '' : '#define gl_FragColor pc_fragColor',
				'#define gl_FragDepthEXT gl_FragDepth',
				'#define texture2D texture',
				'#define textureCube texture',
				'#define texture2DProj textureProj',
				'#define texture2DLodEXT textureLod',
				'#define texture2DProjLodEXT textureProjLod',
				'#define textureCubeLodEXT textureLod',
				'#define texture2DGradEXT textureGrad',
				'#define texture2DProjGradEXT textureProjGrad',
				'#define textureCubeGradEXT textureGrad'
			].join( '\n' ) + '\n' + prefixFragment;

		}

		var vertexGlsl = prefixVertex + vertexShader;
		var fragmentGlsl = prefixFragment + fragmentShader;

		// console.log( '*VERTEX*', vertexGlsl );
		// console.log( '*FRAGMENT*', fragmentGlsl );

		var glVertexShader = WebGLShader( gl, gl.VERTEX_SHADER, vertexGlsl );
		var glFragmentShader = WebGLShader( gl, gl.FRAGMENT_SHADER, fragmentGlsl );

		gl.attachShader( program, glVertexShader );
		gl.attachShader( program, glFragmentShader );

		// Force a particular attribute to index 0.

		if ( material.index0AttributeName !== undefined ) {

			gl.bindAttribLocation( program, 0, material.index0AttributeName );

		} else if ( parameters.morphTargets === true ) {

			// programs with morphTargets displace position out of attribute 0
			gl.bindAttribLocation( program, 0, 'position' );

		}

		gl.linkProgram( program );

		var programLog = gl.getProgramInfoLog( program ).trim();
		var vertexLog = gl.getShaderInfoLog( glVertexShader ).trim();
		var fragmentLog = gl.getShaderInfoLog( glFragmentShader ).trim();

		var runnable = true;
		var haveDiagnostics = true;

		// console.log( '**VERTEX**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glVertexShader ) );
		// console.log( '**FRAGMENT**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glFragmentShader ) );

		if ( gl.getProgramParameter( program, gl.LINK_STATUS ) === false ) {

			runnable = false;

			console.error( 'WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter( program, gl.VALIDATE_STATUS ), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog );

		} else if ( programLog !== '' ) {

			console.warn( 'WebGLProgram: gl.getProgramInfoLog()', programLog );

		} else if ( vertexLog === '' || fragmentLog === '' ) {

			haveDiagnostics = false;

		}

		if ( haveDiagnostics ) {

			this.diagnostics = {

				runnable: runnable,
				material: material,

				programLog: programLog,

				vertexShader: {

					log: vertexLog,
					prefix: prefixVertex

				},

				fragmentShader: {

					log: fragmentLog,
					prefix: prefixFragment

				}

			};

		}

		// clean up

		gl.deleteShader( glVertexShader );
		gl.deleteShader( glFragmentShader );

		// set up caching for uniform locations

		var cachedUniforms;

		this.getUniforms = function () {

			if ( cachedUniforms === undefined ) {

				cachedUniforms = new WebGLUniforms( gl, program, renderer );

			}

			return cachedUniforms;

		};

		// set up caching for attribute locations

		var cachedAttributes;

		this.getAttributes = function () {

			if ( cachedAttributes === undefined ) {

				cachedAttributes = fetchAttributeLocations( gl, program );

			}

			return cachedAttributes;

		};

		// free resource

		this.destroy = function () {

			gl.deleteProgram( program );
			this.program = undefined;

		};

		// DEPRECATED

		Object.defineProperties( this, {

			uniforms: {
				get: function () {

					console.warn( 'WebGLProgram: .uniforms is now .getUniforms().' );
					return this.getUniforms();

				}
			},

			attributes: {
				get: function () {

					console.warn( 'WebGLProgram: .attributes is now .getAttributes().' );
					return this.getAttributes();

				}
			}

		} );
		//

		this.name = shader.name;
		this.id = programIdCount ++;
		this.code = code;
		this.usedTimes = 1;
		this.program = program;
		this.vertexShader = glVertexShader;
		this.fragmentShader = glFragmentShader;

		return this;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLPrograms( renderer, extensions, capabilities ) {

		var programs = [];

		var shaderIDs = {
			MeshDepthMaterial: 'depth',
			MeshDistanceMaterial: 'distanceRGBA',
			MeshNormalMaterial: 'normal',
			MeshBasicMaterial: 'basic',
			MeshLambertMaterial: 'lambert',
			MeshPhongMaterial: 'phong',
			MeshToonMaterial: 'phong',
			MeshStandardMaterial: 'physical',
			MeshPhysicalMaterial: 'physical',
			MeshMatcapMaterial: 'matcap',
			LineBasicMaterial: 'basic',
			LineDashedMaterial: 'dashed',
			PointsMaterial: 'points',
			ShadowMaterial: 'shadow',
			SpriteMaterial: 'sprite'
		};

		var parameterNames = [
			"precision", "supportsVertexTextures", "map", "mapEncoding", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding",
			"lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "displacementMap", "specularMap",
			"roughnessMap", "metalnessMap", "gradientMap",
			"alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp",
			"flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning",
			"maxBones", "useVertexTexture", "morphTargets", "morphNormals",
			"maxMorphTargets", "maxMorphNormals", "premultipliedAlpha",
			"numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights",
			"shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights',
			"alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering"
		];
		function allocateBones( object ) {

			var skeleton = object.skeleton;
			var bones = skeleton.bones;

			if ( capabilities.floatVertexTextures ) {

				return 1024;

			} else {

				// default for when object is not specified
				// ( for example when prebuilding shader to be used with multiple objects )
				//
				//  - leave some extra space for other uniforms
				//  - limit here is ANGLE's 254 max uniform vectors
				//    (up to 54 should be safe)

				var nVertexUniforms = capabilities.maxVertexUniforms;
				var nVertexMatrices = Math.floor( ( nVertexUniforms - 20 ) / 4 );

				var maxBones = Math.min( nVertexMatrices, bones.length );

				if ( maxBones < bones.length ) {

					console.warn( 'WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.' );
					return 0;

				}

				return maxBones;

			}

		}

		function getTextureEncodingFromMap( map, gammaOverrideLinear ) {

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

		this.getParameters = function ( material, lights, shadows, fog, nClipPlanes, nClipIntersection, object ) {

			var shaderID = shaderIDs[ material.type ];

			// heuristics to create shader parameters according to lights in the scene
			// (not to blow over maxLights budget)

			var maxBones = object.isSkinnedMesh ? allocateBones( object ) : 0;
			var precision = capabilities.precision;

			if ( material.precision !== null ) {

				precision = capabilities.getMaxPrecision( material.precision );

				if ( precision !== material.precision ) {

					console.warn( 'WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.' );

				}

			}

			var currentRenderTarget = renderer.getRenderTarget();

			var parameters = {

				shaderID: shaderID,

				precision: precision,
				supportsVertexTextures: capabilities.vertexTextures,
				outputEncoding: getTextureEncodingFromMap( ( ! currentRenderTarget ) ? null : currentRenderTarget.texture, renderer.gammaOutput ),
				map: !! material.map,
				mapEncoding: getTextureEncodingFromMap( material.map, renderer.gammaInput ),
				matcap: !! material.matcap,
				matcapEncoding: getTextureEncodingFromMap( material.matcap, renderer.gammaInput ),
				envMap: !! material.envMap,
				envMapMode: material.envMap && material.envMap.mapping,
				envMapEncoding: getTextureEncodingFromMap( material.envMap, renderer.gammaInput ),
				envMapCubeUV: ( !! material.envMap ) && ( ( material.envMap.mapping === CubeUVReflectionMapping ) || ( material.envMap.mapping === CubeUVRefractionMapping ) ),
				lightMap: !! material.lightMap,
				aoMap: !! material.aoMap,
				emissiveMap: !! material.emissiveMap,
				emissiveMapEncoding: getTextureEncodingFromMap( material.emissiveMap, renderer.gammaInput ),
				bumpMap: !! material.bumpMap,
				normalMap: !! material.normalMap,
				objectSpaceNormalMap: material.normalMapType === ObjectSpaceNormalMap,
				displacementMap: !! material.displacementMap,
				roughnessMap: !! material.roughnessMap,
				metalnessMap: !! material.metalnessMap,
				specularMap: !! material.specularMap,
				alphaMap: !! material.alphaMap,

				gradientMap: !! material.gradientMap,

				combine: material.combine,

				vertexColors: material.vertexColors,

				fog: !! fog,
				useFog: material.fog,
				fogExp: ( fog && fog.isFogExp2 ),

				flatShading: material.flatShading,

				sizeAttenuation: material.sizeAttenuation,
				logarithmicDepthBuffer: capabilities.logarithmicDepthBuffer,

				skinning: material.skinning && maxBones > 0,
				maxBones: maxBones,
				useVertexTexture: capabilities.floatVertexTextures,

				morphTargets: material.morphTargets,
				morphNormals: material.morphNormals,
				maxMorphTargets: renderer.maxMorphTargets,
				maxMorphNormals: renderer.maxMorphNormals,

				numDirLights: lights.directional.length,
				numPointLights: lights.point.length,
				numSpotLights: lights.spot.length,
				numRectAreaLights: lights.rectArea.length,
				numHemiLights: lights.hemi.length,

				numClippingPlanes: nClipPlanes,
				numClipIntersection: nClipIntersection,

				dithering: material.dithering,

				shadowMapEnabled: renderer.shadowMap.enabled && object.receiveShadow && shadows.length > 0,
				shadowMapType: renderer.shadowMap.type,

				toneMapping: renderer.toneMapping,
				physicallyCorrectLights: renderer.physicallyCorrectLights,

				premultipliedAlpha: material.premultipliedAlpha,

				alphaTest: material.alphaTest,
				doubleSided: material.side === DoubleSide,
				flipSided: material.side === BackSide,

				depthPacking: ( material.depthPacking !== undefined ) ? material.depthPacking : false

			};

			return parameters;

		};

		this.getProgramCode = function ( material, parameters ) {

			var array = [];

			if ( parameters.shaderID ) {

				array.push( parameters.shaderID );

			} else {

				array.push( material.fragmentShader );
				array.push( material.vertexShader );

			}

			if ( material.defines !== undefined ) {

				for ( var name in material.defines ) {

					array.push( name );
					array.push( material.defines[ name ] );

				}

			}

			for ( var i = 0; i < parameterNames.length; i ++ ) {

				array.push( parameters[ parameterNames[ i ] ] );

			}

			array.push( material.onBeforeCompile.toString() );

			array.push( renderer.gammaOutput );

			array.push( renderer.gammaFactor );

			return array.join();

		};

		this.acquireProgram = function ( material, shader, parameters, code ) {

			var program;

			// Check if code has been already compiled
			for ( var p = 0, pl = programs.length; p < pl; p ++ ) {

				var programInfo = programs[ p ];

				if ( programInfo.code === code ) {

					program = programInfo;
					++ program.usedTimes;

					break;

				}

			}

			if ( program === undefined ) {

				program = new WebGLProgram( renderer, extensions, code, material, shader, parameters, capabilities );
				programs.push( program );

			}

			return program;

		};

		this.releaseProgram = function ( program ) {

			if ( -- program.usedTimes === 0 ) {

				// Remove from unordered set
				var i = programs.indexOf( program );
				programs[ i ] = programs[ programs.length - 1 ];
				programs.pop();

				// Free WebGL resources
				program.destroy();

			}

		};

		// Exposed for resource monitoring & error feedback via renderer.info:
		this.programs = programs;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLProperties() {

		var properties = new WeakMap();

		function get( object ) {

			var map = properties.get( object );

			if ( map === undefined ) {

				map = {};
				properties.set( object, map );

			}

			return map;

		}

		function remove( object ) {

			properties.delete( object );

		}

		function update( object, key, value ) {

			properties.get( object )[ key ] = value;

		}

		function dispose() {

			properties = new WeakMap();

		}

		return {
			get: get,
			remove: remove,
			update: update,
			dispose: dispose
		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function painterSortStable( a, b ) {

		if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} else if ( a.program && b.program && a.program !== b.program ) {

			return a.program.id - b.program.id;

		} else if ( a.material.id !== b.material.id ) {

			return a.material.id - b.material.id;

		} else if ( a.z !== b.z ) {

			return a.z - b.z;

		} else {

			return a.id - b.id;

		}

	}

	function reversePainterSortStable( a, b ) {

		if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} if ( a.z !== b.z ) {

			return b.z - a.z;

		} else {

			return a.id - b.id;

		}

	}
	function WebGLRenderList() {

		var renderItems = [];
		var renderItemsIndex = 0;

		var opaque = [];
		var transparent = [];

		function init() {

			renderItemsIndex = 0;

			opaque.length = 0;
			transparent.length = 0;

		}

		function push( object, geometry, material, z, group ) {

			var renderItem = renderItems[ renderItemsIndex ];

			if ( renderItem === undefined ) {

				renderItem = {
					id: object.id,
					object: object,
					geometry: geometry,
					material: material,
					program: material.program,
					renderOrder: object.renderOrder,
					z: z,
					group: group
				};

				renderItems[ renderItemsIndex ] = renderItem;

			} else {

				renderItem.id = object.id;
				renderItem.object = object;
				renderItem.geometry = geometry;
				renderItem.material = material;
				renderItem.program = material.program;
				renderItem.renderOrder = object.renderOrder;
				renderItem.z = z;
				renderItem.group = group;

			}
			( material.transparent === true ? transparent : opaque ).push( renderItem );

			renderItemsIndex ++;

		}

		function sort() {

			if ( opaque.length > 1 ) opaque.sort( painterSortStable );
			if ( transparent.length > 1 ) transparent.sort( reversePainterSortStable );

		}

		return {
			opaque: opaque,
			transparent: transparent,

			init: init,
			push: push,

			sort: sort
		};

	}

	function WebGLRenderLists() {

		var lists = {};

		function get( scene, camera ) {

			var hash = scene.id + ',' + camera.id;
			var list = lists[ hash ];

			if ( list === undefined ) {

				// console.log( 'WebGLRenderLists:', hash );

				list = new WebGLRenderList();
				lists[ hash ] = list;

			}

			return list;

		}

		function dispose() {

			lists = {};

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function UniformsCache() {

		var lights = {};

		return {

			get: function ( light ) {

				if ( lights[ light.id ] !== undefined ) {

					return lights[ light.id ];

				}

				var uniforms;

				switch ( light.type ) {

					case 'DirectionalLight':
						uniforms = {
							direction: new Vector3(),
							color: new Color(),

							shadow: false,
							shadowBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2()
						};
						break;

					case 'SpotLight':
						uniforms = {
							position: new Vector3(),
							direction: new Vector3(),
							color: new Color(),
							distance: 0,
							coneCos: 0,
							penumbraCos: 0,
							decay: 0,

							shadow: false,
							shadowBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2()
						};
						break;

					case 'PointLight':
						uniforms = {
							position: new Vector3(),
							color: new Color(),
							distance: 0,
							decay: 0,

							shadow: false,
							shadowBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2(),
							shadowCameraNear: 1,
							shadowCameraFar: 1000
						};
						break;

					case 'HemisphereLight':
						uniforms = {
							direction: new Vector3(),
							skyColor: new Color(),
							groundColor: new Color()
						};
						break;

					case 'RectAreaLight':
						uniforms = {
							color: new Color(),
							position: new Vector3(),
							halfWidth: new Vector3(),
							halfHeight: new Vector3()
							// TODO (abelnation): set RectAreaLight shadow uniforms
						};
						break;

				}

				lights[ light.id ] = uniforms;

				return uniforms;

			}

		};

	}

	var count = 0;

	function WebGLLights() {

		var cache = new UniformsCache();

		var state = {

			id: count ++,

			hash: {
				stateID: - 1,
				directionalLength: - 1,
				pointLength: - 1,
				spotLength: - 1,
				rectAreaLength: - 1,
				hemiLength: - 1,
				shadowsLength: - 1
			},

			ambient: [ 0, 0, 0 ],
			directional: [],
			directionalShadowMap: [],
			directionalShadowMatrix: [],
			spot: [],
			spotShadowMap: [],
			spotShadowMatrix: [],
			rectArea: [],
			point: [],
			pointShadowMap: [],
			pointShadowMatrix: [],
			hemi: []

		};

		var vector3 = new Vector3();
		var matrix4 = new Matrix4();
		var matrix42 = new Matrix4();

		function setup( lights, shadows, camera ) {

			var r = 0, g = 0, b = 0;

			var directionalLength = 0;
			var pointLength = 0;
			var spotLength = 0;
			var rectAreaLength = 0;
			var hemiLength = 0;

			var viewMatrix = camera.matrixWorldInverse;

			for ( var i = 0, l = lights.length; i < l; i ++ ) {

				var light = lights[ i ];

				var color = light.color;
				var intensity = light.intensity;
				var distance = light.distance;

				var shadowMap = ( light.shadow && light.shadow.map ) ? light.shadow.map.texture : null;

				if ( light.isAmbientLight ) {

					r += color.r * intensity;
					g += color.g * intensity;
					b += color.b * intensity;

				} else if ( light.isDirectionalLight ) {

					var uniforms = cache.get( light );

					uniforms.color.copy( light.color ).multiplyScalar( light.intensity );
					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					vector3.setFromMatrixPosition( light.target.matrixWorld );
					uniforms.direction.sub( vector3 );
					uniforms.direction.transformDirection( viewMatrix );

					uniforms.shadow = light.castShadow;

					if ( light.castShadow ) {

						var shadow = light.shadow;

						uniforms.shadowBias = shadow.bias;
						uniforms.shadowRadius = shadow.radius;
						uniforms.shadowMapSize = shadow.mapSize;

					}

					state.directionalShadowMap[ directionalLength ] = shadowMap;
					state.directionalShadowMatrix[ directionalLength ] = light.shadow.matrix;
					state.directional[ directionalLength ] = uniforms;

					directionalLength ++;

				} else if ( light.isSpotLight ) {

					var uniforms = cache.get( light );

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					uniforms.color.copy( color ).multiplyScalar( intensity );
					uniforms.distance = distance;

					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					vector3.setFromMatrixPosition( light.target.matrixWorld );
					uniforms.direction.sub( vector3 );
					uniforms.direction.transformDirection( viewMatrix );

					uniforms.coneCos = Math.cos( light.angle );
					uniforms.penumbraCos = Math.cos( light.angle * ( 1 - light.penumbra ) );
					uniforms.decay = light.decay;

					uniforms.shadow = light.castShadow;

					if ( light.castShadow ) {

						var shadow = light.shadow;

						uniforms.shadowBias = shadow.bias;
						uniforms.shadowRadius = shadow.radius;
						uniforms.shadowMapSize = shadow.mapSize;

					}

					state.spotShadowMap[ spotLength ] = shadowMap;
					state.spotShadowMatrix[ spotLength ] = light.shadow.matrix;
					state.spot[ spotLength ] = uniforms;

					spotLength ++;

				} else if ( light.isRectAreaLight ) {

					var uniforms = cache.get( light );

					// (a) intensity is the total visible light emitted
					//uniforms.color.copy( color ).multiplyScalar( intensity / ( light.width * light.height * Math.PI ) );

					// (b) intensity is the brightness of the light
					uniforms.color.copy( color ).multiplyScalar( intensity );

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					// extract local rotation of light to derive width/height half vectors
					matrix42.identity();
					matrix4.copy( light.matrixWorld );
					matrix4.premultiply( viewMatrix );
					matrix42.extractRotation( matrix4 );

					uniforms.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
					uniforms.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

					uniforms.halfWidth.applyMatrix4( matrix42 );
					uniforms.halfHeight.applyMatrix4( matrix42 );

					// TODO (abelnation): RectAreaLight distance?
					// uniforms.distance = distance;

					state.rectArea[ rectAreaLength ] = uniforms;

					rectAreaLength ++;

				} else if ( light.isPointLight ) {

					var uniforms = cache.get( light );

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					uniforms.color.copy( light.color ).multiplyScalar( light.intensity );
					uniforms.distance = light.distance;
					uniforms.decay = light.decay;

					uniforms.shadow = light.castShadow;

					if ( light.castShadow ) {

						var shadow = light.shadow;

						uniforms.shadowBias = shadow.bias;
						uniforms.shadowRadius = shadow.radius;
						uniforms.shadowMapSize = shadow.mapSize;
						uniforms.shadowCameraNear = shadow.camera.near;
						uniforms.shadowCameraFar = shadow.camera.far;

					}

					state.pointShadowMap[ pointLength ] = shadowMap;
					state.pointShadowMatrix[ pointLength ] = light.shadow.matrix;
					state.point[ pointLength ] = uniforms;

					pointLength ++;

				} else if ( light.isHemisphereLight ) {

					var uniforms = cache.get( light );

					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					uniforms.direction.transformDirection( viewMatrix );
					uniforms.direction.normalize();

					uniforms.skyColor.copy( light.color ).multiplyScalar( intensity );
					uniforms.groundColor.copy( light.groundColor ).multiplyScalar( intensity );

					state.hemi[ hemiLength ] = uniforms;

					hemiLength ++;

				}

			}

			state.ambient[ 0 ] = r;
			state.ambient[ 1 ] = g;
			state.ambient[ 2 ] = b;

			state.directional.length = directionalLength;
			state.spot.length = spotLength;
			state.rectArea.length = rectAreaLength;
			state.point.length = pointLength;
			state.hemi.length = hemiLength;

			state.hash.stateID = state.id;
			state.hash.directionalLength = directionalLength;
			state.hash.pointLength = pointLength;
			state.hash.spotLength = spotLength;
			state.hash.rectAreaLength = rectAreaLength;
			state.hash.hemiLength = hemiLength;
			state.hash.shadowsLength = shadows.length;

		}

		return {
			setup: setup,
			state: state
		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLRenderState() {

		var lights = new WebGLLights();

		var lightsArray = [];
		var shadowsArray = [];

		function init() {

			lightsArray.length = 0;
			shadowsArray.length = 0;

		}

		function pushLight( light ) {

			lightsArray.push( light );

		}

		function pushShadow( shadowLight ) {

			shadowsArray.push( shadowLight );

		}

		function setupLights( camera ) {

			lights.setup( lightsArray, shadowsArray, camera );

		}

		var state = {
			lightsArray: lightsArray,
			shadowsArray: shadowsArray,

			lights: lights
		};

		return {
			init: init,
			state: state,
			setupLights: setupLights,

			pushLight: pushLight,
			pushShadow: pushShadow
		};

	}

	function WebGLRenderStates() {

		var renderStates = {};

		function get( scene, camera ) {

			var renderState;

			if ( renderStates[ scene.id ] === undefined ) {

				renderState = new WebGLRenderState();
				renderStates[ scene.id ] = {};
				renderStates[ scene.id ][ camera.id ] = renderState;

			} else {

				if ( renderStates[ scene.id ][ camera.id ] === undefined ) {

					renderState = new WebGLRenderState();
					renderStates[ scene.id ][ camera.id ] = renderState;

				} else {

					renderState = renderStates[ scene.id ][ camera.id ];

				}

			}

			return renderState;

		}

		function dispose() {

			renderStates = {};

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLRenderTarget( width, height, options ) {

		this.width = width;
		this.height = height;

		this.scissor = new Vector4( 0, 0, width, height );
		this.scissorTest = false;

		this.viewport = new Vector4( 0, 0, width, height );

		options = options || {};

		if ( options.minFilter === undefined ) options.minFilter = LinearFilter;

		this.texture = new Texture( undefined, undefined, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding );

		this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : true;

		this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
		this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
		this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;

	}

	WebGLRenderTarget.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: WebGLRenderTarget,

		isWebGLRenderTarget: true,

		setSize: function ( width, height ) {

			if ( this.width !== width || this.height !== height ) {

				this.width = width;
				this.height = height;

				this.dispose();

			}

			this.viewport.set( 0, 0, width, height );
			this.scissor.set( 0, 0, width, height );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.width = source.width;
			this.height = source.height;

			this.viewport.copy( source.viewport );

			this.texture = source.texture.clone();

			this.depthBuffer = source.depthBuffer;
			this.stencilBuffer = source.stencilBuffer;
			this.depthTexture = source.depthTexture;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshDepthMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshDepthMaterial';

		this.depthPacking = BasicDepthPacking;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false;
		this.lights = false;

		this.setValues( parameters );

	}

	MeshDepthMaterial.prototype = Object.create( Material.prototype );
	MeshDepthMaterial.prototype.constructor = MeshDepthMaterial;

	MeshDepthMaterial.prototype.isMeshDepthMaterial = true;

	MeshDepthMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.depthPacking = source.depthPacking;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MeshDistanceMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshDistanceMaterial';

		this.referencePosition = new Vector3();
		this.nearDistance = 1;
		this.farDistance = 1000;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.fog = false;
		this.lights = false;

		this.setValues( parameters );

	}

	MeshDistanceMaterial.prototype = Object.create( Material.prototype );
	MeshDistanceMaterial.prototype.constructor = MeshDistanceMaterial;

	MeshDistanceMaterial.prototype.isMeshDistanceMaterial = true;

	MeshDistanceMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.referencePosition.copy( source.referencePosition );
		this.nearDistance = source.nearDistance;
		this.farDistance = source.farDistance;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		return this;

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLShadowMap( _renderer, _objects, maxTextureSize ) {

		var _frustum = new Frustum(),
			_projScreenMatrix = new Matrix4(),

			_shadowMapSize = new Vector2(),
			_maxShadowMapSize = new Vector2( maxTextureSize, maxTextureSize ),

			_lookTarget = new Vector3(),
			_lightPositionWorld = new Vector3(),

			_MorphingFlag = 1,
			_SkinningFlag = 2,

			_NumberOfMaterialVariants = ( _MorphingFlag | _SkinningFlag ) + 1,

			_depthMaterials = new Array( _NumberOfMaterialVariants ),
			_distanceMaterials = new Array( _NumberOfMaterialVariants ),

			_materialCache = {};

		var shadowSide = { 0: BackSide, 1: FrontSide, 2: DoubleSide };

		var cubeDirections = [
			new Vector3( 1, 0, 0 ), new Vector3( - 1, 0, 0 ), new Vector3( 0, 0, 1 ),
			new Vector3( 0, 0, - 1 ), new Vector3( 0, 1, 0 ), new Vector3( 0, - 1, 0 )
		];

		var cubeUps = [
			new Vector3( 0, 1, 0 ), new Vector3( 0, 1, 0 ), new Vector3( 0, 1, 0 ),
			new Vector3( 0, 1, 0 ), new Vector3( 0, 0, 1 ),	new Vector3( 0, 0, - 1 )
		];

		var cube2DViewPorts = [
			new Vector4(), new Vector4(), new Vector4(),
			new Vector4(), new Vector4(), new Vector4()
		];

		// init

		for ( var i = 0; i !== _NumberOfMaterialVariants; ++ i ) {

			var useMorphing = ( i & _MorphingFlag ) !== 0;
			var useSkinning = ( i & _SkinningFlag ) !== 0;

			var depthMaterial = new MeshDepthMaterial( {

				depthPacking: RGBADepthPacking,

				morphTargets: useMorphing,
				skinning: useSkinning

			} );

			_depthMaterials[ i ] = depthMaterial;

			//

			var distanceMaterial = new MeshDistanceMaterial( {

				morphTargets: useMorphing,
				skinning: useSkinning

			} );

			_distanceMaterials[ i ] = distanceMaterial;

		}

		//

		var scope = this;

		this.enabled = false;

		this.autoUpdate = true;
		this.needsUpdate = false;

		this.type = PCFShadowMap;

		this.render = function ( lights, scene, camera ) {

			if ( scope.enabled === false ) return;
			if ( scope.autoUpdate === false && scope.needsUpdate === false ) return;

			if ( lights.length === 0 ) return;

			// TODO Clean up (needed in case of contextlost)
			var _gl = _renderer.context;
			var _state = _renderer.state;

			// Set GL state for depth map.
			_state.disable( _gl.BLEND );
			_state.buffers.color.setClear( 1, 1, 1, 1 );
			_state.buffers.depth.setTest( true );
			_state.setScissorTest( false );

			// render depth map

			var faceCount;

			for ( var i = 0, il = lights.length; i < il; i ++ ) {

				var light = lights[ i ];
				var shadow = light.shadow;
				var isPointLight = light && light.isPointLight;

				if ( shadow === undefined ) {

					console.warn( 'WebGLShadowMap:', light, 'has no shadow.' );
					continue;

				}

				var shadowCamera = shadow.camera;

				_shadowMapSize.copy( shadow.mapSize );
				_shadowMapSize.min( _maxShadowMapSize );

				if ( isPointLight ) {

					var vpWidth = _shadowMapSize.x;
					var vpHeight = _shadowMapSize.y;

					// These viewports map a cube-map onto a 2D texture with the
					// following orientation:
					//
					//  xzXZ
					//   y Y
					//
					// X - Positive x direction
					// x - Negative x direction
					// Y - Positive y direction
					// y - Negative y direction
					// Z - Positive z direction
					// z - Negative z direction

					// positive X
					cube2DViewPorts[ 0 ].set( vpWidth * 2, vpHeight, vpWidth, vpHeight );
					// negative X
					cube2DViewPorts[ 1 ].set( 0, vpHeight, vpWidth, vpHeight );
					// positive Z
					cube2DViewPorts[ 2 ].set( vpWidth * 3, vpHeight, vpWidth, vpHeight );
					// negative Z
					cube2DViewPorts[ 3 ].set( vpWidth, vpHeight, vpWidth, vpHeight );
					// positive Y
					cube2DViewPorts[ 4 ].set( vpWidth * 3, 0, vpWidth, vpHeight );
					// negative Y
					cube2DViewPorts[ 5 ].set( vpWidth, 0, vpWidth, vpHeight );

					_shadowMapSize.x *= 4.0;
					_shadowMapSize.y *= 2.0;

				}

				if ( shadow.map === null ) {

					var pars = { minFilter: NearestFilter, magFilter: NearestFilter, format: RGBAFormat };

					shadow.map = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars );
					shadow.map.texture.name = light.name + ".shadowMap";

					shadowCamera.updateProjectionMatrix();

				}

				if ( shadow.isSpotLightShadow ) {

					shadow.update( light );

				}

				var shadowMap = shadow.map;
				var shadowMatrix = shadow.matrix;

				_lightPositionWorld.setFromMatrixPosition( light.matrixWorld );
				shadowCamera.position.copy( _lightPositionWorld );

				if ( isPointLight ) {

					faceCount = 6;

					// for point lights we set the shadow matrix to be a translation-only matrix
					// equal to inverse of the light's position

					shadowMatrix.makeTranslation( - _lightPositionWorld.x, - _lightPositionWorld.y, - _lightPositionWorld.z );

				} else {

					faceCount = 1;

					_lookTarget.setFromMatrixPosition( light.target.matrixWorld );
					shadowCamera.lookAt( _lookTarget );
					shadowCamera.updateMatrixWorld();

					// compute shadow matrix

					shadowMatrix.set(
						0.5, 0.0, 0.0, 0.5,
						0.0, 0.5, 0.0, 0.5,
						0.0, 0.0, 0.5, 0.5,
						0.0, 0.0, 0.0, 1.0
					);

					shadowMatrix.multiply( shadowCamera.projectionMatrix );
					shadowMatrix.multiply( shadowCamera.matrixWorldInverse );

				}

				_renderer.setRenderTarget( shadowMap );
				_renderer.clear();

				// render shadow map for each cube face (if omni-directional) or
				// run a single pass if not

				for ( var face = 0; face < faceCount; face ++ ) {

					if ( isPointLight ) {

						_lookTarget.copy( shadowCamera.position );
						_lookTarget.add( cubeDirections[ face ] );
						shadowCamera.up.copy( cubeUps[ face ] );
						shadowCamera.lookAt( _lookTarget );
						shadowCamera.updateMatrixWorld();

						var vpDimensions = cube2DViewPorts[ face ];
						_state.viewport( vpDimensions );

					}

					// update camera matrices and frustum

					_projScreenMatrix.multiplyMatrices( shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse );
					_frustum.setFromMatrix( _projScreenMatrix );

					// set object matrices & frustum culling

					renderObject( scene, camera, shadowCamera, isPointLight );

				}

			}

			scope.needsUpdate = false;

		};

		function getDepthMaterial( object, material, isPointLight, lightPositionWorld, shadowCameraNear, shadowCameraFar ) {

			var geometry = object.geometry;

			var result = null;

			var materialVariants = _depthMaterials;
			var customMaterial = object.customDepthMaterial;

			if ( isPointLight ) {

				materialVariants = _distanceMaterials;
				customMaterial = object.customDistanceMaterial;

			}

			if ( ! customMaterial ) {

				var useMorphing = false;

				if ( material.morphTargets ) {

					if ( geometry && geometry.isBufferGeometry ) {

						useMorphing = geometry.morphAttributes && geometry.morphAttributes.position && geometry.morphAttributes.position.length > 0;

					} else if ( geometry && geometry.isGeometry ) {

						useMorphing = geometry.morphTargets && geometry.morphTargets.length > 0;

					}

				}

				if ( object.isSkinnedMesh && material.skinning === false ) {

					console.warn( 'WebGLShadowMap: SkinnedMesh with material.skinning set to false:', object );

				}

				var useSkinning = object.isSkinnedMesh && material.skinning;

				var variantIndex = 0;

				if ( useMorphing ) variantIndex |= _MorphingFlag;
				if ( useSkinning ) variantIndex |= _SkinningFlag;

				result = materialVariants[ variantIndex ];

			} else {

				result = customMaterial;

			}

			if ( _renderer.localClippingEnabled &&
					material.clipShadows === true &&
					material.clippingPlanes.length !== 0 ) {

				// in this case we need a unique material instance reflecting the
				// appropriate state

				var keyA = result.uuid, keyB = material.uuid;

				var materialsForVariant = _materialCache[ keyA ];

				if ( materialsForVariant === undefined ) {

					materialsForVariant = {};
					_materialCache[ keyA ] = materialsForVariant;

				}

				var cachedMaterial = materialsForVariant[ keyB ];

				if ( cachedMaterial === undefined ) {

					cachedMaterial = result.clone();
					materialsForVariant[ keyB ] = cachedMaterial;

				}

				result = cachedMaterial;

			}

			result.visible = material.visible;
			result.wireframe = material.wireframe;

			result.side = ( material.shadowSide != null ) ? material.shadowSide : shadowSide[ material.side ];

			result.clipShadows = material.clipShadows;
			result.clippingPlanes = material.clippingPlanes;
			result.clipIntersection = material.clipIntersection;

			result.wireframeLinewidth = material.wireframeLinewidth;
			result.linewidth = material.linewidth;

			if ( isPointLight && result.isMeshDistanceMaterial ) {

				result.referencePosition.copy( lightPositionWorld );
				result.nearDistance = shadowCameraNear;
				result.farDistance = shadowCameraFar;

			}

			return result;

		}

		function renderObject( object, camera, shadowCamera, isPointLight ) {

			if ( object.visible === false ) return;

			var visible = object.layers.test( camera.layers );

			if ( visible && ( object.isMesh || object.isLine || object.isPoints ) ) {

				if ( object.castShadow && ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) ) {

					object.modelViewMatrix.multiplyMatrices( shadowCamera.matrixWorldInverse, object.matrixWorld );

					var geometry = _objects.update( object );
					var material = object.material;

					if ( Array.isArray( material ) ) {

						var groups = geometry.groups;

						for ( var k = 0, kl = groups.length; k < kl; k ++ ) {

							var group = groups[ k ];
							var groupMaterial = material[ group.materialIndex ];

							if ( groupMaterial && groupMaterial.visible ) {

								var depthMaterial = getDepthMaterial( object, groupMaterial, isPointLight, _lightPositionWorld, shadowCamera.near, shadowCamera.far );
								_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, group );

							}

						}

					} else if ( material.visible ) {

						var depthMaterial = getDepthMaterial( object, material, isPointLight, _lightPositionWorld, shadowCamera.near, shadowCamera.far );
						_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, null );

					}

				}

			}

			var children = object.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				renderObject( children[ i ], camera, shadowCamera, isPointLight );

			}

		}

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLState( gl, extensions, utils, capabilities ) {

		function ColorBuffer() {

			var locked = false;

			var color = new Vector4();
			var currentColorMask = null;
			var currentColorClear = new Vector4( 0, 0, 0, 0 );

			return {

				setMask: function ( colorMask ) {

					if ( currentColorMask !== colorMask && ! locked ) {

						gl.colorMask( colorMask, colorMask, colorMask, colorMask );
						currentColorMask = colorMask;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( r, g, b, a, premultipliedAlpha ) {

					if ( premultipliedAlpha === true ) {

						r *= a; g *= a; b *= a;

					}

					color.set( r, g, b, a );

					if ( currentColorClear.equals( color ) === false ) {

						gl.clearColor( r, g, b, a );
						currentColorClear.copy( color );

					}

				},

				reset: function () {

					locked = false;

					currentColorMask = null;
					currentColorClear.set( - 1, 0, 0, 0 ); // set to invalid state

				}

			};

		}

		function DepthBuffer() {

			var locked = false;

			var currentDepthMask = null;
			var currentDepthFunc = null;
			var currentDepthClear = null;

			return {

				setTest: function ( depthTest ) {

					if ( depthTest ) {

						enable( gl.DEPTH_TEST );

					} else {

						disable( gl.DEPTH_TEST );

					}

				},

				setMask: function ( depthMask ) {

					if ( currentDepthMask !== depthMask && ! locked ) {

						gl.depthMask( depthMask );
						currentDepthMask = depthMask;

					}

				},

				setFunc: function ( depthFunc ) {

					if ( currentDepthFunc !== depthFunc ) {

						if ( depthFunc ) {

							switch ( depthFunc ) {

								case NeverDepth:

									gl.depthFunc( gl.NEVER );
									break;

								case AlwaysDepth:

									gl.depthFunc( gl.ALWAYS );
									break;

								case LessDepth:

									gl.depthFunc( gl.LESS );
									break;

								case LessEqualDepth:

									gl.depthFunc( gl.LEQUAL );
									break;

								case EqualDepth:

									gl.depthFunc( gl.EQUAL );
									break;

								case GreaterEqualDepth:

									gl.depthFunc( gl.GEQUAL );
									break;

								case GreaterDepth:

									gl.depthFunc( gl.GREATER );
									break;

								case NotEqualDepth:

									gl.depthFunc( gl.NOTEQUAL );
									break;

								default:

									gl.depthFunc( gl.LEQUAL );

							}

						} else {

							gl.depthFunc( gl.LEQUAL );

						}

						currentDepthFunc = depthFunc;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( depth ) {

					if ( currentDepthClear !== depth ) {

						gl.clearDepth( depth );
						currentDepthClear = depth;

					}

				},

				reset: function () {

					locked = false;

					currentDepthMask = null;
					currentDepthFunc = null;
					currentDepthClear = null;

				}

			};

		}

		function StencilBuffer() {

			var locked = false;

			var currentStencilMask = null;
			var currentStencilFunc = null;
			var currentStencilRef = null;
			var currentStencilFuncMask = null;
			var currentStencilFail = null;
			var currentStencilZFail = null;
			var currentStencilZPass = null;
			var currentStencilClear = null;

			return {

				setTest: function ( stencilTest ) {

					if ( stencilTest ) {

						enable( gl.STENCIL_TEST );

					} else {

						disable( gl.STENCIL_TEST );

					}

				},

				setMask: function ( stencilMask ) {

					if ( currentStencilMask !== stencilMask && ! locked ) {

						gl.stencilMask( stencilMask );
						currentStencilMask = stencilMask;

					}

				},

				setFunc: function ( stencilFunc, stencilRef, stencilMask ) {

					if ( currentStencilFunc !== stencilFunc ||
					     currentStencilRef 	!== stencilRef 	||
					     currentStencilFuncMask !== stencilMask ) {

						gl.stencilFunc( stencilFunc, stencilRef, stencilMask );

						currentStencilFunc = stencilFunc;
						currentStencilRef = stencilRef;
						currentStencilFuncMask = stencilMask;

					}

				},

				setOp: function ( stencilFail, stencilZFail, stencilZPass ) {

					if ( currentStencilFail	 !== stencilFail 	||
					     currentStencilZFail !== stencilZFail ||
					     currentStencilZPass !== stencilZPass ) {

						gl.stencilOp( stencilFail, stencilZFail, stencilZPass );

						currentStencilFail = stencilFail;
						currentStencilZFail = stencilZFail;
						currentStencilZPass = stencilZPass;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( stencil ) {

					if ( currentStencilClear !== stencil ) {

						gl.clearStencil( stencil );
						currentStencilClear = stencil;

					}

				},

				reset: function () {

					locked = false;

					currentStencilMask = null;
					currentStencilFunc = null;
					currentStencilRef = null;
					currentStencilFuncMask = null;
					currentStencilFail = null;
					currentStencilZFail = null;
					currentStencilZPass = null;
					currentStencilClear = null;

				}

			};

		}

		//

		var colorBuffer = new ColorBuffer();
		var depthBuffer = new DepthBuffer();
		var stencilBuffer = new StencilBuffer();

		var maxVertexAttributes = gl.getParameter( gl.MAX_VERTEX_ATTRIBS );
		var newAttributes = new Uint8Array( maxVertexAttributes );
		var enabledAttributes = new Uint8Array( maxVertexAttributes );
		var attributeDivisors = new Uint8Array( maxVertexAttributes );

		var enabledCapabilities = {};

		var compressedTextureFormats = null;

		var currentProgram = null;

		var currentBlendingEnabled = null;
		var currentBlending = null;
		var currentBlendEquation = null;
		var currentBlendSrc = null;
		var currentBlendDst = null;
		var currentBlendEquationAlpha = null;
		var currentBlendSrcAlpha = null;
		var currentBlendDstAlpha = null;
		var currentPremultipledAlpha = false;

		var currentFlipSided = null;
		var currentCullFace = null;

		var currentLineWidth = null;

		var currentPolygonOffsetFactor = null;
		var currentPolygonOffsetUnits = null;

		var maxTextures = gl.getParameter( gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS );

		var lineWidthAvailable = false;
		var version = 0;
		var glVersion = gl.getParameter( gl.VERSION );

		if ( glVersion.indexOf( 'WebGL' ) !== - 1 ) {

			version = parseFloat( /^WebGL\ ([0-9])/.exec( glVersion )[ 1 ] );
			lineWidthAvailable = ( version >= 1.0 );

		} else if ( glVersion.indexOf( 'OpenGL ES' ) !== - 1 ) {

			version = parseFloat( /^OpenGL\ ES\ ([0-9])/.exec( glVersion )[ 1 ] );
			lineWidthAvailable = ( version >= 2.0 );

		}

		var currentTextureSlot = null;
		var currentBoundTextures = {};

		var currentScissor = new Vector4();
		var currentViewport = new Vector4();

		function createTexture( type, target, count ) {

			var data = new Uint8Array( 4 ); // 4 is required to match default unpack alignment of 4.
			var texture = gl.createTexture();

			gl.bindTexture( type, texture );
			gl.texParameteri( type, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
			gl.texParameteri( type, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

			for ( var i = 0; i < count; i ++ ) {

				gl.texImage2D( target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data );

			}

			return texture;

		}

		var emptyTextures = {};
		emptyTextures[ gl.TEXTURE_2D ] = createTexture( gl.TEXTURE_2D, gl.TEXTURE_2D, 1 );
		emptyTextures[ gl.TEXTURE_CUBE_MAP ] = createTexture( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6 );

		// init

		colorBuffer.setClear( 0, 0, 0, 1 );
		depthBuffer.setClear( 1 );
		stencilBuffer.setClear( 0 );

		enable( gl.DEPTH_TEST );
		depthBuffer.setFunc( LessEqualDepth );

		setFlipSided( false );
		setCullFace( CullFaceBack );
		enable( gl.CULL_FACE );

		setBlending( NoBlending );

		//

		function initAttributes() {

			for ( var i = 0, l = newAttributes.length; i < l; i ++ ) {

				newAttributes[ i ] = 0;

			}

		}

		function enableAttribute( attribute ) {

			enableAttributeAndDivisor( attribute, 0 );

		}

		function enableAttributeAndDivisor( attribute, meshPerAttribute ) {

			newAttributes[ attribute ] = 1;

			if ( enabledAttributes[ attribute ] === 0 ) {

				gl.enableVertexAttribArray( attribute );
				enabledAttributes[ attribute ] = 1;

			}

			if ( attributeDivisors[ attribute ] !== meshPerAttribute ) {

				var extension = capabilities.isWebGL2 ? gl : extensions.get( 'ANGLE_instanced_arrays' );

				extension[ capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE' ]( attribute, meshPerAttribute );
				attributeDivisors[ attribute ] = meshPerAttribute;

			}

		}

		function disableUnusedAttributes() {

			for ( var i = 0, l = enabledAttributes.length; i !== l; ++ i ) {

				if ( enabledAttributes[ i ] !== newAttributes[ i ] ) {

					gl.disableVertexAttribArray( i );
					enabledAttributes[ i ] = 0;

				}

			}

		}

		function enable( id ) {

			if ( enabledCapabilities[ id ] !== true ) {

				gl.enable( id );
				enabledCapabilities[ id ] = true;

			}

		}

		function disable( id ) {

			if ( enabledCapabilities[ id ] !== false ) {

				gl.disable( id );
				enabledCapabilities[ id ] = false;

			}

		}

		function getCompressedTextureFormats() {

			if ( compressedTextureFormats === null ) {

				compressedTextureFormats = [];

				if ( extensions.get( 'WEBGL_compressed_texture_pvrtc' ) ||
				     extensions.get( 'WEBGL_compressed_texture_s3tc' ) ||
				     extensions.get( 'WEBGL_compressed_texture_etc1' ) ||
				     extensions.get( 'WEBGL_compressed_texture_astc' ) ) {

					var formats = gl.getParameter( gl.COMPRESSED_TEXTURE_FORMATS );

					for ( var i = 0; i < formats.length; i ++ ) {

						compressedTextureFormats.push( formats[ i ] );

					}

				}

			}

			return compressedTextureFormats;

		}

		function useProgram( program ) {

			if ( currentProgram !== program ) {

				gl.useProgram( program );

				currentProgram = program;

				return true;

			}

			return false;

		}

		function setBlending( blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha ) {

			if ( blending === NoBlending ) {

				if ( currentBlendingEnabled ) {

					disable( gl.BLEND );
					currentBlendingEnabled = false;

				}

				return;

			}

			if ( ! currentBlendingEnabled ) {

				enable( gl.BLEND );
				currentBlendingEnabled = true;

			}

			if ( blending !== CustomBlending ) {

				if ( blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha ) {

					if ( currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation ) {

						gl.blendEquation( gl.FUNC_ADD );

						currentBlendEquation = AddEquation;
						currentBlendEquationAlpha = AddEquation;

					}

					if ( premultipliedAlpha ) {

						switch ( blending ) {

							case NormalBlending:
								gl.blendFuncSeparate( gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA );
								break;

							case AdditiveBlending:
								gl.blendFunc( gl.ONE, gl.ONE );
								break;

							case SubtractiveBlending:
								gl.blendFuncSeparate( gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA );
								break;

							case MultiplyBlending:
								gl.blendFuncSeparate( gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA );
								break;

							default:
								console.error( 'WebGLState: Invalid blending: ', blending );
								break;

						}

					} else {

						switch ( blending ) {

							case NormalBlending:
								gl.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA );
								break;

							case AdditiveBlending:
								gl.blendFunc( gl.SRC_ALPHA, gl.ONE );
								break;

							case SubtractiveBlending:
								gl.blendFunc( gl.ZERO, gl.ONE_MINUS_SRC_COLOR );
								break;

							case MultiplyBlending:
								gl.blendFunc( gl.ZERO, gl.SRC_COLOR );
								break;

							default:
								console.error( 'WebGLState: Invalid blending: ', blending );
								break;

						}

					}

					currentBlendSrc = null;
					currentBlendDst = null;
					currentBlendSrcAlpha = null;
					currentBlendDstAlpha = null;

					currentBlending = blending;
					currentPremultipledAlpha = premultipliedAlpha;

				}

				return;

			}

			// custom blending

			blendEquationAlpha = blendEquationAlpha || blendEquation;
			blendSrcAlpha = blendSrcAlpha || blendSrc;
			blendDstAlpha = blendDstAlpha || blendDst;

			if ( blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha ) {

				gl.blendEquationSeparate( utils.convert( blendEquation ), utils.convert( blendEquationAlpha ) );

				currentBlendEquation = blendEquation;
				currentBlendEquationAlpha = blendEquationAlpha;

			}

			if ( blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha ) {

				gl.blendFuncSeparate( utils.convert( blendSrc ), utils.convert( blendDst ), utils.convert( blendSrcAlpha ), utils.convert( blendDstAlpha ) );

				currentBlendSrc = blendSrc;
				currentBlendDst = blendDst;
				currentBlendSrcAlpha = blendSrcAlpha;
				currentBlendDstAlpha = blendDstAlpha;

			}

			currentBlending = blending;
			currentPremultipledAlpha = null;

		}

		function setMaterial( material, frontFaceCW ) {

			material.side === DoubleSide
				? disable( gl.CULL_FACE )
				: enable( gl.CULL_FACE );

			var flipSided = ( material.side === BackSide );
			if ( frontFaceCW ) flipSided = ! flipSided;

			setFlipSided( flipSided );

			( material.blending === NormalBlending && material.transparent === false )
				? setBlending( NoBlending )
				: setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha );

			depthBuffer.setFunc( material.depthFunc );
			depthBuffer.setTest( material.depthTest );
			depthBuffer.setMask( material.depthWrite );
			colorBuffer.setMask( material.colorWrite );

			setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

		}

		//

		function setFlipSided( flipSided ) {

			if ( currentFlipSided !== flipSided ) {

				if ( flipSided ) {

					gl.frontFace( gl.CW );

				} else {

					gl.frontFace( gl.CCW );

				}

				currentFlipSided = flipSided;

			}

		}

		function setCullFace( cullFace ) {

			if ( cullFace !== CullFaceNone ) {

				enable( gl.CULL_FACE );

				if ( cullFace !== currentCullFace ) {

					if ( cullFace === CullFaceBack ) {

						gl.cullFace( gl.BACK );

					} else if ( cullFace === CullFaceFront ) {

						gl.cullFace( gl.FRONT );

					} else {

						gl.cullFace( gl.FRONT_AND_BACK );

					}

				}

			} else {

				disable( gl.CULL_FACE );

			}

			currentCullFace = cullFace;

		}

		function setLineWidth( width ) {

			if ( width !== currentLineWidth ) {

				if ( lineWidthAvailable ) gl.lineWidth( width );

				currentLineWidth = width;

			}

		}

		function setPolygonOffset( polygonOffset, factor, units ) {

			if ( polygonOffset ) {

				enable( gl.POLYGON_OFFSET_FILL );

				if ( currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units ) {

					gl.polygonOffset( factor, units );

					currentPolygonOffsetFactor = factor;
					currentPolygonOffsetUnits = units;

				}

			} else {

				disable( gl.POLYGON_OFFSET_FILL );

			}

		}

		function setScissorTest( scissorTest ) {

			if ( scissorTest ) {

				enable( gl.SCISSOR_TEST );

			} else {

				disable( gl.SCISSOR_TEST );

			}

		}

		// texture

		function activeTexture( webglSlot ) {

			if ( webglSlot === undefined ) webglSlot = gl.TEXTURE0 + maxTextures - 1;

			if ( currentTextureSlot !== webglSlot ) {

				gl.activeTexture( webglSlot );
				currentTextureSlot = webglSlot;

			}

		}

		function bindTexture( webglType, webglTexture ) {

			if ( currentTextureSlot === null ) {

				activeTexture();

			}

			var boundTexture = currentBoundTextures[ currentTextureSlot ];

			if ( boundTexture === undefined ) {

				boundTexture = { type: undefined, texture: undefined };
				currentBoundTextures[ currentTextureSlot ] = boundTexture;

			}

			if ( boundTexture.type !== webglType || boundTexture.texture !== webglTexture ) {

				gl.bindTexture( webglType, webglTexture || emptyTextures[ webglType ] );

				boundTexture.type = webglType;
				boundTexture.texture = webglTexture;

			}

		}

		function compressedTexImage2D() {

			try {

				gl.compressedTexImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'WebGLState:', error );

			}

		}

		function texImage2D() {

			try {

				gl.texImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'WebGLState:', error );

			}

		}

		function texImage3D() {

			try {

				gl.texImage3D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'WebGLState:', error );

			}

		}

		//

		function scissor( scissor ) {

			if ( currentScissor.equals( scissor ) === false ) {

				gl.scissor( scissor.x, scissor.y, scissor.z, scissor.w );
				currentScissor.copy( scissor );

			}

		}

		function viewport( viewport ) {

			if ( currentViewport.equals( viewport ) === false ) {

				gl.viewport( viewport.x, viewport.y, viewport.z, viewport.w );
				currentViewport.copy( viewport );

			}

		}

		//

		function reset() {

			for ( var i = 0; i < enabledAttributes.length; i ++ ) {

				if ( enabledAttributes[ i ] === 1 ) {

					gl.disableVertexAttribArray( i );
					enabledAttributes[ i ] = 0;

				}

			}

			enabledCapabilities = {};

			compressedTextureFormats = null;

			currentTextureSlot = null;
			currentBoundTextures = {};

			currentProgram = null;

			currentBlending = null;

			currentFlipSided = null;
			currentCullFace = null;

			colorBuffer.reset();
			depthBuffer.reset();
			stencilBuffer.reset();

		}

		return {

			buffers: {
				color: colorBuffer,
				depth: depthBuffer,
				stencil: stencilBuffer
			},

			initAttributes: initAttributes,
			enableAttribute: enableAttribute,
			enableAttributeAndDivisor: enableAttributeAndDivisor,
			disableUnusedAttributes: disableUnusedAttributes,
			enable: enable,
			disable: disable,
			getCompressedTextureFormats: getCompressedTextureFormats,

			useProgram: useProgram,

			setBlending: setBlending,
			setMaterial: setMaterial,

			setFlipSided: setFlipSided,
			setCullFace: setCullFace,

			setLineWidth: setLineWidth,
			setPolygonOffset: setPolygonOffset,

			setScissorTest: setScissorTest,

			activeTexture: activeTexture,
			bindTexture: bindTexture,
			compressedTexImage2D: compressedTexImage2D,
			texImage2D: texImage2D,
			texImage3D: texImage3D,

			scissor: scissor,
			viewport: viewport,

			reset: reset

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info ) {

		var _videoTextures = {};
		var _canvas;

		//

		function clampToMaxSize( image, maxSize ) {

			if ( image.width > maxSize || image.height > maxSize ) {

				if ( 'data' in image ) {

					console.warn( 'WebGLRenderer: image in DataTexture is too big (' + image.width + 'x' + image.height + ').' );
					return;

				}

				// Warning: Scaling through the canvas will only work with images that use
				// premultiplied alpha.

				var scale = maxSize / Math.max( image.width, image.height );

				var canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
				canvas.width = Math.floor( image.width * scale );
				canvas.height = Math.floor( image.height * scale );

				var context = canvas.getContext( '2d' );
				context.drawImage( image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height );

				console.warn( 'WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height );

				return canvas;

			}

			return image;

		}

		function isPowerOfTwo( image ) {

			return _Math.isPowerOfTwo( image.width ) && _Math.isPowerOfTwo( image.height );

		}

		function makePowerOfTwo( image ) {

			if ( image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap ) {

				if ( _canvas === undefined ) _canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );

				_canvas.width = _Math.floorPowerOfTwo( image.width );
				_canvas.height = _Math.floorPowerOfTwo( image.height );

				var context = _canvas.getContext( '2d' );
				context.drawImage( image, 0, 0, _canvas.width, _canvas.height );

				console.warn( 'WebGLRenderer: image is not power of two (' + image.width + 'x' + image.height + '). Resized to ' + _canvas.width + 'x' + _canvas.height );

				return _canvas;

			}

			return image;

		}

		function textureNeedsPowerOfTwo( texture ) {

			if ( capabilities.isWebGL2 ) return false;

			return ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) ||
				( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter );

		}

		function textureNeedsGenerateMipmaps( texture, isPowerOfTwo ) {

			return texture.generateMipmaps && isPowerOfTwo &&
				texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

		}

		function generateMipmap( target, texture, width, height ) {

			_gl.generateMipmap( target );

			var textureProperties = properties.get( texture );

			// Note: Math.log( x ) * Math.LOG2E used instead of Math.log2( x ) which is not supported by IE11
			textureProperties.__maxMipLevel = Math.log( Math.max( width, height ) ) * Math.LOG2E;

		}

		function getInternalFormat( glFormat, glType ) {

			if ( ! capabilities.isWebGL2 ) return glFormat;

			if ( glFormat === _gl.RED ) {

				if ( glType === _gl.FLOAT ) return _gl.R32F;
				if ( glType === _gl.HALF_FLOAT ) return _gl.R16F;
				if ( glType === _gl.UNSIGNED_BYTE ) return _gl.R8;

			}

			if ( glFormat === _gl.RGB ) {

				if ( glType === _gl.FLOAT ) return _gl.RGB32F;
				if ( glType === _gl.HALF_FLOAT ) return _gl.RGB16F;
				if ( glType === _gl.UNSIGNED_BYTE ) return _gl.RGB8;

			}

			if ( glFormat === _gl.RGBA ) {

				if ( glType === _gl.FLOAT ) return _gl.RGBA32F;
				if ( glType === _gl.HALF_FLOAT ) return _gl.RGBA16F;
				if ( glType === _gl.UNSIGNED_BYTE ) return _gl.RGBA8;

			}

			return glFormat;

		}

		// Fallback filters for non-power-of-2 textures

		function filterFallback( f ) {

			if ( f === NearestFilter || f === NearestMipMapNearestFilter || f === NearestMipMapLinearFilter ) {

				return _gl.NEAREST;

			}

			return _gl.LINEAR;

		}

		//

		function onTextureDispose( event ) {

			var texture = event.target;

			texture.removeEventListener( 'dispose', onTextureDispose );

			deallocateTexture( texture );

			if ( texture.isVideoTexture ) {

				delete _videoTextures[ texture.id ];

			}

			info.memory.textures --;

		}

		function onRenderTargetDispose( event ) {

			var renderTarget = event.target;

			renderTarget.removeEventListener( 'dispose', onRenderTargetDispose );

			deallocateRenderTarget( renderTarget );

			info.memory.textures --;

		}

		//

		function deallocateTexture( texture ) {

			var textureProperties = properties.get( texture );

			if ( texture.image && textureProperties.__image__webglTextureCube ) {

				// cube texture

				_gl.deleteTexture( textureProperties.__image__webglTextureCube );

			} else {

				// 2D texture

				if ( textureProperties.__webglInit === undefined ) return;

				_gl.deleteTexture( textureProperties.__webglTexture );

			}

			// remove all webgl properties
			properties.remove( texture );

		}

		function deallocateRenderTarget( renderTarget ) {

			var renderTargetProperties = properties.get( renderTarget );
			var textureProperties = properties.get( renderTarget.texture );

			if ( ! renderTarget ) return;

			if ( textureProperties.__webglTexture !== undefined ) {

				_gl.deleteTexture( textureProperties.__webglTexture );

			}

			if ( renderTarget.depthTexture ) {

				renderTarget.depthTexture.dispose();

			}

			if ( renderTarget.isWebGLRenderTargetCube ) {

				for ( var i = 0; i < 6; i ++ ) {

					_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer[ i ] );
					if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer[ i ] );

				}

			} else {

				_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer );
				if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer );

			}

			properties.remove( renderTarget.texture );
			properties.remove( renderTarget );

		}

		//
		function setTexture2D( texture, slot ) {

			var textureProperties = properties.get( texture );

			if ( texture.isVideoTexture ) updateVideoTexture( texture );

			if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

				var image = texture.image;

				if ( image === undefined ) {

					console.warn( 'WebGLRenderer: Texture marked for update but image is undefined' );

				} else if ( image.complete === false ) {

					console.warn( 'WebGLRenderer: Texture marked for update but image is incomplete' );

				} else {

					uploadTexture( textureProperties, texture, slot );
					return;

				}

			}

			state.activeTexture( _gl.TEXTURE0 + slot );
			state.bindTexture( _gl.TEXTURE_2D, textureProperties.__webglTexture );

		}

		function setTexture3D( texture, slot ) {

			var textureProperties = properties.get( texture );

			if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

				uploadTexture( textureProperties, texture, slot );
				return;

			}

			state.activeTexture( _gl.TEXTURE0 + slot );
			state.bindTexture( _gl.TEXTURE_3D, textureProperties.__webglTexture );

		}
		function setTextureCube( texture, slot ) {

			var textureProperties = properties.get( texture );

			if ( texture.image.length === 6 ) {

				if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

					if ( ! textureProperties.__image__webglTextureCube ) {

						texture.addEventListener( 'dispose', onTextureDispose );

						textureProperties.__image__webglTextureCube = _gl.createTexture();

						info.memory.textures ++;

					}

					state.activeTexture( _gl.TEXTURE0 + slot );
					state.bindTexture( _gl.TEXTURE_CUBE_MAP, textureProperties.__image__webglTextureCube );

					_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );

					var isCompressed = ( texture && texture.isCompressedTexture );
					var isDataTexture = ( texture.image[ 0 ] && texture.image[ 0 ].isDataTexture );

					var cubeImage = [];

					for ( var i = 0; i < 6; i ++ ) {

						if ( ! isCompressed && ! isDataTexture ) {

							cubeImage[ i ] = clampToMaxSize( texture.image[ i ], capabilities.maxCubemapSize );

						} else {

							cubeImage[ i ] = isDataTexture ? texture.image[ i ].image : texture.image[ i ];

						}

					}

					var image = cubeImage[ 0 ],
						isPowerOfTwoImage = isPowerOfTwo( image ),
						glFormat = utils.convert( texture.format ),
						glType = utils.convert( texture.type ),
						glInternalFormat = getInternalFormat( glFormat, glType );

					setTextureParameters( _gl.TEXTURE_CUBE_MAP, texture, isPowerOfTwoImage );

					for ( var i = 0; i < 6; i ++ ) {

						if ( ! isCompressed ) {

							if ( isDataTexture ) {

								state.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glInternalFormat, cubeImage[ i ].width, cubeImage[ i ].height, 0, glFormat, glType, cubeImage[ i ].data );

							} else {

								state.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glInternalFormat, glFormat, glType, cubeImage[ i ] );

							}

						} else {

							var mipmap, mipmaps = cubeImage[ i ].mipmaps;

							for ( var j = 0, jl = mipmaps.length; j < jl; j ++ ) {

								mipmap = mipmaps[ j ];

								if ( texture.format !== RGBAFormat && texture.format !== RGBFormat ) {

									if ( state.getCompressedTextureFormats().indexOf( glFormat ) > - 1 ) {

										state.compressedTexImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

									} else {

										console.warn( 'WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()' );

									}

								} else {

									state.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

								}

							}

						}

					}

					if ( ! isCompressed ) {

						textureProperties.__maxMipLevel = 0;

					} else {

						textureProperties.__maxMipLevel = mipmaps.length - 1;

					}

					if ( textureNeedsGenerateMipmaps( texture, isPowerOfTwoImage ) ) {

						// We assume images for cube map have the same size.
						generateMipmap( _gl.TEXTURE_CUBE_MAP, texture, image.width, image.height );

					}

					textureProperties.__version = texture.version;

					if ( texture.onUpdate ) texture.onUpdate( texture );

				} else {

					state.activeTexture( _gl.TEXTURE0 + slot );
					state.bindTexture( _gl.TEXTURE_CUBE_MAP, textureProperties.__image__webglTextureCube );

				}

			}

		}

		function setTextureCubeDynamic( texture, slot ) {

			state.activeTexture( _gl.TEXTURE0 + slot );
			state.bindTexture( _gl.TEXTURE_CUBE_MAP, properties.get( texture ).__webglTexture );

		}

		function setTextureParameters( textureType, texture, isPowerOfTwoImage ) {

			var extension;

			if ( isPowerOfTwoImage ) {

				_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, utils.convert( texture.wrapS ) );
				_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, utils.convert( texture.wrapT ) );

				_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, utils.convert( texture.magFilter ) );
				_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, utils.convert( texture.minFilter ) );

			} else {

				_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
				_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );

				if ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) {

					console.warn( 'WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to ClampToEdgeWrapping.' );

				}

				_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, filterFallback( texture.magFilter ) );
				_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, filterFallback( texture.minFilter ) );

				if ( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter ) {

					console.warn( 'WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to NearestFilter or LinearFilter.' );

				}

			}

			extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			if ( extension ) {

				if ( texture.type === FloatType && extensions.get( 'OES_texture_float_linear' ) === null ) return;
				if ( texture.type === HalfFloatType && ( capabilities.isWebGL2 || extensions.get( 'OES_texture_half_float_linear' ) ) === null ) return;

				if ( texture.anisotropy > 1 || properties.get( texture ).__currentAnisotropy ) {

					_gl.texParameterf( textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, capabilities.getMaxAnisotropy() ) );
					properties.get( texture ).__currentAnisotropy = texture.anisotropy;

				}

			}

		}

		function uploadTexture( textureProperties, texture, slot ) {

			var textureType;

			if ( texture.isDataTexture3D ) {

				textureType = _gl.TEXTURE_3D;

			} else {

				textureType = _gl.TEXTURE_2D;

			}
			if ( textureProperties.__webglInit === undefined ) {

				textureProperties.__webglInit = true;

				texture.addEventListener( 'dispose', onTextureDispose );

				textureProperties.__webglTexture = _gl.createTexture();

				info.memory.textures ++;

			}
			state.activeTexture( _gl.TEXTURE0 + slot );
			state.bindTexture( textureType, textureProperties.__webglTexture );
			_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );
			_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha );
			_gl.pixelStorei( _gl.UNPACK_ALIGNMENT, texture.unpackAlignment );

			var image = clampToMaxSize( texture.image, capabilities.maxTextureSize );

			if ( textureNeedsPowerOfTwo( texture ) && isPowerOfTwo( image ) === false ) {

				image = makePowerOfTwo( image );

			}

			var isPowerOfTwoImage = isPowerOfTwo( image ),
				glFormat = utils.convert( texture.format ),
				glType = utils.convert( texture.type ),
				glInternalFormat = getInternalFormat( glFormat, glType );

			setTextureParameters( textureType, texture, isPowerOfTwoImage );

			var mipmap, mipmaps = texture.mipmaps;

			if ( texture.isDepthTexture ) {

				// populate depth texture with dummy data

				glInternalFormat = _gl.DEPTH_COMPONENT;

				if ( texture.type === FloatType ) {

					if ( ! capabilities.isWebGL2 ) throw new Error( 'Float Depth Texture only supported in WebGL2.0' );
					glInternalFormat = _gl.DEPTH_COMPONENT32F;

				} else if ( capabilities.isWebGL2 ) {

					// WebGL 2.0 requires signed internalformat for glTexImage2D
					glInternalFormat = _gl.DEPTH_COMPONENT16;

				}

				if ( texture.format === DepthFormat && glInternalFormat === _gl.DEPTH_COMPONENT ) {

					// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
					// DEPTH_COMPONENT and type is not UNSIGNED_SHORT or UNSIGNED_INT
					// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
					if ( texture.type !== UnsignedShortType && texture.type !== UnsignedIntType ) {

						console.warn( 'WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.' );

						texture.type = UnsignedShortType;
						glType = utils.convert( texture.type );

					}

				}

				// Depth stencil textures need the DEPTH_STENCIL internal format
				// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
				if ( texture.format === DepthStencilFormat ) {

					glInternalFormat = _gl.DEPTH_STENCIL;

					// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
					// DEPTH_STENCIL and type is not UNSIGNED_INT_24_8_WEBGL.
					// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
					if ( texture.type !== UnsignedInt248Type ) {

						console.warn( 'WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.' );

						texture.type = UnsignedInt248Type;
						glType = utils.convert( texture.type );

					}

				}

				state.texImage2D( _gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null );

			} else if ( texture.isDataTexture ) {

				// use manually created mipmaps if available
				// if there are no manual mipmaps
				// set 0 level mipmap and then use GL to generate other mipmap levels

				if ( mipmaps.length > 0 && isPowerOfTwoImage ) {

					for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

						mipmap = mipmaps[ i ];
						state.texImage2D( _gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

					}

					texture.generateMipmaps = false;
					textureProperties.__maxMipLevel = mipmaps.length - 1;

				} else {

					state.texImage2D( _gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data );
					textureProperties.__maxMipLevel = 0;

				}

			} else if ( texture.isCompressedTexture ) {

				for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

					mipmap = mipmaps[ i ];

					if ( texture.format !== RGBAFormat && texture.format !== RGBFormat ) {

						if ( state.getCompressedTextureFormats().indexOf( glFormat ) > - 1 ) {

							state.compressedTexImage2D( _gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

						} else {

							console.warn( 'WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()' );

						}

					} else {

						state.texImage2D( _gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

					}

				}

				textureProperties.__maxMipLevel = mipmaps.length - 1;

			} else if ( texture.isDataTexture3D ) {

				state.texImage3D( _gl.TEXTURE_3D, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );
				textureProperties.__maxMipLevel = 0;

			} else {

				// regular Texture (image, video, canvas)

				// use manually created mipmaps if available
				// if there are no manual mipmaps
				// set 0 level mipmap and then use GL to generate other mipmap levels

				if ( mipmaps.length > 0 && isPowerOfTwoImage ) {

					for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

						mipmap = mipmaps[ i ];
						state.texImage2D( _gl.TEXTURE_2D, i, glInternalFormat, glFormat, glType, mipmap );

					}

					texture.generateMipmaps = false;
					textureProperties.__maxMipLevel = mipmaps.length - 1;

				} else {

					state.texImage2D( _gl.TEXTURE_2D, 0, glInternalFormat, glFormat, glType, image );
					textureProperties.__maxMipLevel = 0;

				}

			}

			if ( textureNeedsGenerateMipmaps( texture, isPowerOfTwoImage ) ) {

				generateMipmap( _gl.TEXTURE_2D, texture, image.width, image.height );

			}

			textureProperties.__version = texture.version;

			if ( texture.onUpdate ) texture.onUpdate( texture );

		}

		// Render targets

		// Setup storage for target texture and bind it to correct framebuffer
		function setupFrameBufferTexture( framebuffer, renderTarget, attachment, textureTarget ) {

			var glFormat = utils.convert( renderTarget.texture.format );
			var glType = utils.convert( renderTarget.texture.type );
			var glInternalFormat = getInternalFormat( glFormat, glType );
			state.texImage2D( textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );
			_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
			_gl.framebufferTexture2D( _gl.FRAMEBUFFER, attachment, textureTarget, properties.get( renderTarget.texture ).__webglTexture, 0 );
			_gl.bindFramebuffer( _gl.FRAMEBUFFER, null );

		}

		// Setup storage for internal depth/stencil buffers and bind to correct framebuffer
		function setupRenderBufferStorage( renderbuffer, renderTarget ) {

			_gl.bindRenderbuffer( _gl.RENDERBUFFER, renderbuffer );

			if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

				_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height );
				_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

			} else if ( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

				_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height );
				_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

			} else {

				// FIXME: We don't support !depth !stencil
				_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.RGBA4, renderTarget.width, renderTarget.height );

			}

			_gl.bindRenderbuffer( _gl.RENDERBUFFER, null );

		}

		// Setup resources for a Depth Texture for a FBO (needs an extension)
		function setupDepthTexture( framebuffer, renderTarget ) {

			var isCube = ( renderTarget && renderTarget.isWebGLRenderTargetCube );
			if ( isCube ) throw new Error( 'Depth Texture with cube render targets is not supported' );

			_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );

			if ( ! ( renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture ) ) {

				throw new Error( 'renderTarget.depthTexture must be an instance of DepthTexture' );

			}

			// upload an empty depth texture with framebuffer size
			if ( ! properties.get( renderTarget.depthTexture ).__webglTexture ||
					renderTarget.depthTexture.image.width !== renderTarget.width ||
					renderTarget.depthTexture.image.height !== renderTarget.height ) {

				renderTarget.depthTexture.image.width = renderTarget.width;
				renderTarget.depthTexture.image.height = renderTarget.height;
				renderTarget.depthTexture.needsUpdate = true;

			}

			setTexture2D( renderTarget.depthTexture, 0 );

			var webglDepthTexture = properties.get( renderTarget.depthTexture ).__webglTexture;

			if ( renderTarget.depthTexture.format === DepthFormat ) {

				_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0 );

			} else if ( renderTarget.depthTexture.format === DepthStencilFormat ) {

				_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0 );

			} else {

				throw new Error( 'Unknown depthTexture format' );

			}

		}

		// Setup GL resources for a non-texture depth buffer
		function setupDepthRenderbuffer( renderTarget ) {

			var renderTargetProperties = properties.get( renderTarget );

			var isCube = ( renderTarget.isWebGLRenderTargetCube === true );

			if ( renderTarget.depthTexture ) {

				if ( isCube ) throw new Error( 'target.depthTexture not supported in Cube render targets' );

				setupDepthTexture( renderTargetProperties.__webglFramebuffer, renderTarget );

			} else {

				if ( isCube ) {

					renderTargetProperties.__webglDepthbuffer = [];

					for ( var i = 0; i < 6; i ++ ) {

						_gl.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer[ i ] );
						renderTargetProperties.__webglDepthbuffer[ i ] = _gl.createRenderbuffer();
						setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer[ i ], renderTarget );

					}

				} else {

					_gl.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer );
					renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
					setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer, renderTarget );

				}

			}

			_gl.bindFramebuffer( _gl.FRAMEBUFFER, null );

		}

		// Set up GL resources for the render target
		function setupRenderTarget( renderTarget ) {

			var renderTargetProperties = properties.get( renderTarget );
			var textureProperties = properties.get( renderTarget.texture );

			renderTarget.addEventListener( 'dispose', onRenderTargetDispose );

			textureProperties.__webglTexture = _gl.createTexture();

			info.memory.textures ++;

			var isCube = ( renderTarget.isWebGLRenderTargetCube === true );
			var isTargetPowerOfTwo = isPowerOfTwo( renderTarget );

			// Setup framebuffer

			if ( isCube ) {

				renderTargetProperties.__webglFramebuffer = [];

				for ( var i = 0; i < 6; i ++ ) {

					renderTargetProperties.__webglFramebuffer[ i ] = _gl.createFramebuffer();

				}

			} else {

				renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();

			}

			// Setup color buffer

			if ( isCube ) {

				state.bindTexture( _gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture );
				setTextureParameters( _gl.TEXTURE_CUBE_MAP, renderTarget.texture, isTargetPowerOfTwo );

				for ( var i = 0; i < 6; i ++ ) {

					setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer[ i ], renderTarget, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i );

				}

				if ( textureNeedsGenerateMipmaps( renderTarget.texture, isTargetPowerOfTwo ) ) {

					generateMipmap( _gl.TEXTURE_CUBE_MAP, renderTarget.texture, renderTarget.width, renderTarget.height );

				}

				state.bindTexture( _gl.TEXTURE_CUBE_MAP, null );

			} else {

				state.bindTexture( _gl.TEXTURE_2D, textureProperties.__webglTexture );
				setTextureParameters( _gl.TEXTURE_2D, renderTarget.texture, isTargetPowerOfTwo );
				setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D );

				if ( textureNeedsGenerateMipmaps( renderTarget.texture, isTargetPowerOfTwo ) ) {

					generateMipmap( _gl.TEXTURE_2D, renderTarget.texture, renderTarget.width, renderTarget.height );

				}

				state.bindTexture( _gl.TEXTURE_2D, null );

			}

			// Setup depth and stencil buffers

			if ( renderTarget.depthBuffer ) {

				setupDepthRenderbuffer( renderTarget );

			}

		}

		function updateRenderTargetMipmap( renderTarget ) {

			var texture = renderTarget.texture;
			var isTargetPowerOfTwo = isPowerOfTwo( renderTarget );

			if ( textureNeedsGenerateMipmaps( texture, isTargetPowerOfTwo ) ) {

				var target = renderTarget.isWebGLRenderTargetCube ? _gl.TEXTURE_CUBE_MAP : _gl.TEXTURE_2D;
				var webglTexture = properties.get( texture ).__webglTexture;

				state.bindTexture( target, webglTexture );
				generateMipmap( target, texture, renderTarget.width, renderTarget.height );
				state.bindTexture( target, null );

			}

		}

		function updateVideoTexture( texture ) {

			var id = texture.id;
			var frame = info.render.frame;

			// Check the last frame we updated the VideoTexture

			if ( _videoTextures[ id ] !== frame ) {

				_videoTextures[ id ] = frame;
				texture.update();

			}

		}

		this.setTexture2D = setTexture2D;
		this.setTexture3D = setTexture3D;
		this.setTextureCube = setTextureCube;
		this.setTextureCubeDynamic = setTextureCubeDynamic;
		this.setupRenderTarget = setupRenderTarget;
		this.updateRenderTargetMipmap = updateRenderTargetMipmap;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLUtils( gl, extensions, capabilities ) {

		function convert( p ) {

			var extension;

			if ( p === RepeatWrapping ) return gl.REPEAT;
			if ( p === ClampToEdgeWrapping ) return gl.CLAMP_TO_EDGE;
			if ( p === MirroredRepeatWrapping ) return gl.MIRRORED_REPEAT;

			if ( p === NearestFilter ) return gl.NEAREST;
			if ( p === NearestMipMapNearestFilter ) return gl.NEAREST_MIPMAP_NEAREST;
			if ( p === NearestMipMapLinearFilter ) return gl.NEAREST_MIPMAP_LINEAR;

			if ( p === LinearFilter ) return gl.LINEAR;
			if ( p === LinearMipMapNearestFilter ) return gl.LINEAR_MIPMAP_NEAREST;
			if ( p === LinearMipMapLinearFilter ) return gl.LINEAR_MIPMAP_LINEAR;

			if ( p === UnsignedByteType ) return gl.UNSIGNED_BYTE;
			if ( p === UnsignedShort4444Type ) return gl.UNSIGNED_SHORT_4_4_4_4;
			if ( p === UnsignedShort5551Type ) return gl.UNSIGNED_SHORT_5_5_5_1;
			if ( p === UnsignedShort565Type ) return gl.UNSIGNED_SHORT_5_6_5;

			if ( p === ByteType ) return gl.BYTE;
			if ( p === ShortType ) return gl.SHORT;
			if ( p === UnsignedShortType ) return gl.UNSIGNED_SHORT;
			if ( p === IntType ) return gl.INT;
			if ( p === UnsignedIntType ) return gl.UNSIGNED_INT;
			if ( p === FloatType ) return gl.FLOAT;

			if ( p === HalfFloatType ) {

				if ( capabilities.isWebGL2 ) return gl.HALF_FLOAT;

				extension = extensions.get( 'OES_texture_half_float' );

				if ( extension !== null ) return extension.HALF_FLOAT_OES;

			}

			if ( p === AlphaFormat ) return gl.ALPHA;
			if ( p === RGBFormat ) return gl.RGB;
			if ( p === RGBAFormat ) return gl.RGBA;
			if ( p === LuminanceFormat ) return gl.LUMINANCE;
			if ( p === LuminanceAlphaFormat ) return gl.LUMINANCE_ALPHA;
			if ( p === DepthFormat ) return gl.DEPTH_COMPONENT;
			if ( p === DepthStencilFormat ) return gl.DEPTH_STENCIL;
			if ( p === RedFormat ) return gl.RED;

			if ( p === AddEquation ) return gl.FUNC_ADD;
			if ( p === SubtractEquation ) return gl.FUNC_SUBTRACT;
			if ( p === ReverseSubtractEquation ) return gl.FUNC_REVERSE_SUBTRACT;

			if ( p === ZeroFactor ) return gl.ZERO;
			if ( p === OneFactor ) return gl.ONE;
			if ( p === SrcColorFactor ) return gl.SRC_COLOR;
			if ( p === OneMinusSrcColorFactor ) return gl.ONE_MINUS_SRC_COLOR;
			if ( p === SrcAlphaFactor ) return gl.SRC_ALPHA;
			if ( p === OneMinusSrcAlphaFactor ) return gl.ONE_MINUS_SRC_ALPHA;
			if ( p === DstAlphaFactor ) return gl.DST_ALPHA;
			if ( p === OneMinusDstAlphaFactor ) return gl.ONE_MINUS_DST_ALPHA;

			if ( p === DstColorFactor ) return gl.DST_COLOR;
			if ( p === OneMinusDstColorFactor ) return gl.ONE_MINUS_DST_COLOR;
			if ( p === SrcAlphaSaturateFactor ) return gl.SRC_ALPHA_SATURATE;

			if ( p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format ||
				p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_s3tc' );

				if ( extension !== null ) {

					if ( p === RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
					if ( p === RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
					if ( p === RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
					if ( p === RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

				}

			}

			if ( p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format ||
				p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_pvrtc' );

				if ( extension !== null ) {

					if ( p === RGB_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
					if ( p === RGB_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
					if ( p === RGBA_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
					if ( p === RGBA_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

				}

			}

			if ( p === RGB_ETC1_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_etc1' );

				if ( extension !== null ) return extension.COMPRESSED_RGB_ETC1_WEBGL;

			}

			if ( p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format ||
				p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format ||
				p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format ||
				p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format ||
				p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_astc' );

				if ( extension !== null ) {

					return p;

				}

			}

			if ( p === MinEquation || p === MaxEquation ) {

				if ( capabilities.isWebGL2 ) {

					if ( p === MinEquation ) return gl.MIN;
					if ( p === MaxEquation ) return gl.MAX;

				}

				extension = extensions.get( 'EXT_blend_minmax' );

				if ( extension !== null ) {

					if ( p === MinEquation ) return extension.MIN_EXT;
					if ( p === MaxEquation ) return extension.MAX_EXT;

				}

			}

			if ( p === UnsignedInt248Type ) {

				if ( capabilities.isWebGL2 ) return gl.UNSIGNED_INT_24_8;

				extension = extensions.get( 'WEBGL_depth_texture' );

				if ( extension !== null ) return extension.UNSIGNED_INT_24_8_WEBGL;

			}

			return 0;

		}

		return { convert: convert };

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Group() {

		Object3D.call( this );

		this.type = 'Group';

	}

	Group.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Group,

		isGroup: true

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Camera() {

		Object3D.call( this );

		this.type = 'Camera';

		this.matrixWorldInverse = new Matrix4();

		this.projectionMatrix = new Matrix4();
		this.projectionMatrixInverse = new Matrix4();

	}

	Camera.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Camera,

		isCamera: true,

		copy: function ( source, recursive ) {

			Object3D.prototype.copy.call( this, source, recursive );

			this.matrixWorldInverse.copy( source.matrixWorldInverse );

			this.projectionMatrix.copy( source.projectionMatrix );
			this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

			return this;

		},

		getWorldDirection: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'Camera: .getWorldDirection() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			var e = this.matrixWorld.elements;

			return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

		},

		updateMatrixWorld: function ( force ) {

			Object3D.prototype.updateMatrixWorld.call( this, force );

			this.matrixWorldInverse.getInverse( this.matrixWorld );

		},

		clone: function () {

			return new this.constructor().copy( this );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function PerspectiveCamera( fov, aspect, near, far ) {

		Camera.call( this );

		this.type = 'PerspectiveCamera';

		this.fov = fov !== undefined ? fov : 50;
		this.zoom = 1;

		this.near = near !== undefined ? near : 0.1;
		this.far = far !== undefined ? far : 2000;
		this.focus = 10;

		this.aspect = aspect !== undefined ? aspect : 1;
		this.view = null;

		this.filmGauge = 35;	// width of the film (default in millimeters)
		this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

		this.updateProjectionMatrix();

	}

	PerspectiveCamera.prototype = Object.assign( Object.create( Camera.prototype ), {

		constructor: PerspectiveCamera,

		isPerspectiveCamera: true,

		copy: function ( source, recursive ) {

			Camera.prototype.copy.call( this, source, recursive );

			this.fov = source.fov;
			this.zoom = source.zoom;

			this.near = source.near;
			this.far = source.far;
			this.focus = source.focus;

			this.aspect = source.aspect;
			this.view = source.view === null ? null : Object.assign( {}, source.view );

			this.filmGauge = source.filmGauge;
			this.filmOffset = source.filmOffset;

			return this;

		},
		setFocalLength: function ( focalLength ) {

			// see http://www.bobatkins.com/photography/technical/field_of_view.html
			var vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

			this.fov = _Math.RAD2DEG * 2 * Math.atan( vExtentSlope );
			this.updateProjectionMatrix();

		},
		getFocalLength: function () {

			var vExtentSlope = Math.tan( _Math.DEG2RAD * 0.5 * this.fov );

			return 0.5 * this.getFilmHeight() / vExtentSlope;

		},

		getEffectiveFOV: function () {

			return _Math.RAD2DEG * 2 * Math.atan(
				Math.tan( _Math.DEG2RAD * 0.5 * this.fov ) / this.zoom );

		},

		getFilmWidth: function () {

			// film not completely covered in portrait format (aspect < 1)
			return this.filmGauge * Math.min( this.aspect, 1 );

		},

		getFilmHeight: function () {

			// film not completely covered in landscape format (aspect > 1)
			return this.filmGauge / Math.max( this.aspect, 1 );

		},
		setViewOffset: function ( fullWidth, fullHeight, x, y, width, height ) {

			this.aspect = fullWidth / fullHeight;

			if ( this.view === null ) {

				this.view = {
					enabled: true,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				};

			}

			this.view.enabled = true;
			this.view.fullWidth = fullWidth;
			this.view.fullHeight = fullHeight;
			this.view.offsetX = x;
			this.view.offsetY = y;
			this.view.width = width;
			this.view.height = height;

			this.updateProjectionMatrix();

		},

		clearViewOffset: function () {

			if ( this.view !== null ) {

				this.view.enabled = false;

			}

			this.updateProjectionMatrix();

		},

		updateProjectionMatrix: function () {

			var near = this.near,
				top = near * Math.tan( _Math.DEG2RAD * 0.5 * this.fov ) / this.zoom,
				height = 2 * top,
				width = this.aspect * height,
				left = - 0.5 * width,
				view = this.view;

			if ( this.view !== null && this.view.enabled ) {

				var fullWidth = view.fullWidth,
					fullHeight = view.fullHeight;

				left += view.offsetX * width / fullWidth;
				top -= view.offsetY * height / fullHeight;
				width *= view.width / fullWidth;
				height *= view.height / fullHeight;

			}

			var skew = this.filmOffset;
			if ( skew !== 0 ) left += near * skew / this.getFilmWidth();

			this.projectionMatrix.makePerspective( left, left + width, top, top - height, near, this.far );

			this.projectionMatrixInverse.getInverse( this.projectionMatrix );

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			data.object.fov = this.fov;
			data.object.zoom = this.zoom;

			data.object.near = this.near;
			data.object.far = this.far;
			data.object.focus = this.focus;

			data.object.aspect = this.aspect;

			if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

			data.object.filmGauge = this.filmGauge;
			data.object.filmOffset = this.filmOffset;

			return data;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function ArrayCamera( array ) {

		PerspectiveCamera.call( this );

		this.cameras = array || [];

	}

	ArrayCamera.prototype = Object.assign( Object.create( PerspectiveCamera.prototype ), {

		constructor: ArrayCamera,

		isArrayCamera: true

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var cameraLPos = new Vector3();
	var cameraRPos = new Vector3();
	function setProjectionFromUnion( camera, cameraL, cameraR ) {

		cameraLPos.setFromMatrixPosition( cameraL.matrixWorld );
		cameraRPos.setFromMatrixPosition( cameraR.matrixWorld );

		var ipd = cameraLPos.distanceTo( cameraRPos );

		var projL = cameraL.projectionMatrix.elements;
		var projR = cameraR.projectionMatrix.elements;

		// VR systems will have identical far and near planes, and
		// most likely identical top and bottom frustum extents.
		// Use the left camera for these values.
		var near = projL[ 14 ] / ( projL[ 10 ] - 1 );
		var far = projL[ 14 ] / ( projL[ 10 ] + 1 );
		var topFov = ( projL[ 9 ] + 1 ) / projL[ 5 ];
		var bottomFov = ( projL[ 9 ] - 1 ) / projL[ 5 ];

		var leftFov = ( projL[ 8 ] - 1 ) / projL[ 0 ];
		var rightFov = ( projR[ 8 ] + 1 ) / projR[ 0 ];
		var left = near * leftFov;
		var right = near * rightFov;

		// Calculate the new camera's position offset from the
		// left camera. xOffset should be roughly half `ipd`.
		var zOffset = ipd / ( - leftFov + rightFov );
		var xOffset = zOffset * - leftFov;

		// TODO: Better way to apply this offset?
		cameraL.matrixWorld.decompose( camera.position, camera.quaternion, camera.scale );
		camera.translateX( xOffset );
		camera.translateZ( zOffset );
		camera.matrixWorld.compose( camera.position, camera.quaternion, camera.scale );
		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		// Find the union of the frustum values of the cameras and scale
		// the values so that the near plane's position does not change in world space,
		// although must now be relative to the new union camera.
		var near2 = near + zOffset;
		var far2 = far + zOffset;
		var left2 = left - xOffset;
		var right2 = right + ( ipd - xOffset );
		var top2 = topFov * far / far2 * near2;
		var bottom2 = bottomFov * far / far2 * near2;

		camera.projectionMatrix.makePerspective( left2, right2, top2, bottom2, near2, far2 );

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebVRManager( renderer ) {

		var scope = this;

		var device = null;
		var frameData = null;

		var poseTarget = null;

		var controllers = [];
		var standingMatrix = new Matrix4();
		var standingMatrixInverse = new Matrix4();

		var framebufferScaleFactor = 1.0;

		var frameOfReferenceType = 'stage';

		if ( typeof window !== 'undefined' && 'VRFrameData' in window ) {

			frameData = new window.VRFrameData();
			window.addEventListener( 'vrdisplaypresentchange', onVRDisplayPresentChange, false );

		}

		var matrixWorldInverse = new Matrix4();
		var tempQuaternion = new Quaternion();
		var tempPosition = new Vector3();

		var cameraL = new PerspectiveCamera();
		cameraL.bounds = new Vector4( 0.0, 0.0, 0.5, 1.0 );
		cameraL.layers.enable( 1 );

		var cameraR = new PerspectiveCamera();
		cameraR.bounds = new Vector4( 0.5, 0.0, 0.5, 1.0 );
		cameraR.layers.enable( 2 );

		var cameraVR = new ArrayCamera( [ cameraL, cameraR ] );
		cameraVR.layers.enable( 1 );
		cameraVR.layers.enable( 2 );

		//

		function isPresenting() {

			return device !== null && device.isPresenting === true;

		}

		var currentSize, currentPixelRatio;

		function onVRDisplayPresentChange() {

			if ( isPresenting() ) {

				var eyeParameters = device.getEyeParameters( 'left' );
				var renderWidth = eyeParameters.renderWidth * framebufferScaleFactor;
				var renderHeight = eyeParameters.renderHeight * framebufferScaleFactor;

				currentPixelRatio = renderer.getPixelRatio();
				currentSize = renderer.getSize();

				renderer.setDrawingBufferSize( renderWidth * 2, renderHeight, 1 );

				animation.start();

			} else {

				if ( scope.enabled ) {

					renderer.setDrawingBufferSize( currentSize.width, currentSize.height, currentPixelRatio );

				}

				animation.stop();

			}

		}

		//

		var triggers = [];

		function findGamepad( id ) {

			var gamepads = navigator.getGamepads && navigator.getGamepads();

			for ( var i = 0, j = 0, l = gamepads.length; i < l; i ++ ) {

				var gamepad = gamepads[ i ];

				if ( gamepad && ( gamepad.id === 'Daydream Controller' ||
					gamepad.id === 'Gear VR Controller' || gamepad.id === 'Oculus Go Controller' ||
					gamepad.id === 'OpenVR Gamepad' || gamepad.id.startsWith( 'Oculus Touch' ) ||
					gamepad.id.startsWith( 'Spatial Controller' ) ) ) {

					if ( j === id ) return gamepad;

					j ++;

				}

			}

		}

		function updateControllers() {

			for ( var i = 0; i < controllers.length; i ++ ) {

				var controller = controllers[ i ];

				var gamepad = findGamepad( i );

				if ( gamepad !== undefined && gamepad.pose !== undefined ) {

					if ( gamepad.pose === null ) return;

					//  Pose

					var pose = gamepad.pose;

					if ( pose.hasPosition === false ) controller.position.set( 0.2, - 0.6, - 0.05 );

					if ( pose.position !== null ) controller.position.fromArray( pose.position );
					if ( pose.orientation !== null ) controller.quaternion.fromArray( pose.orientation );
					controller.matrix.compose( controller.position, controller.quaternion, controller.scale );
					controller.matrix.premultiply( standingMatrix );
					controller.matrix.decompose( controller.position, controller.quaternion, controller.scale );
					controller.matrixWorldNeedsUpdate = true;
					controller.visible = true;

					//  Trigger

					var buttonId = gamepad.id === 'Daydream Controller' ? 0 : 1;

					if ( triggers[ i ] !== gamepad.buttons[ buttonId ].pressed ) {

						triggers[ i ] = gamepad.buttons[ buttonId ].pressed;

						if ( triggers[ i ] === true ) {

							controller.dispatchEvent( { type: 'selectstart' } );

						} else {

							controller.dispatchEvent( { type: 'selectend' } );
							controller.dispatchEvent( { type: 'select' } );

						}

					}

				} else {

					controller.visible = false;

				}

			}

		}

		//

		this.enabled = false;

		this.getController = function ( id ) {

			var controller = controllers[ id ];

			if ( controller === undefined ) {

				controller = new Group();
				controller.matrixAutoUpdate = false;
				controller.visible = false;

				controllers[ id ] = controller;

			}

			return controller;

		};

		this.getDevice = function () {

			return device;

		};

		this.setDevice = function ( value ) {

			if ( value !== undefined ) device = value;

			animation.setContext( value );

		};

		this.setFramebufferScaleFactor = function ( value ) {

			framebufferScaleFactor = value;

		};

		this.setFrameOfReferenceType = function ( value ) {

			frameOfReferenceType = value;

		};

		this.setPoseTarget = function ( object ) {

			if ( object !== undefined ) poseTarget = object;

		};

		this.getCamera = function ( camera ) {

			var userHeight = frameOfReferenceType === 'stage' ? 1.6 : 0;

			if ( device === null ) {

				camera.position.set( 0, userHeight, 0 );
				return camera;

			}

			device.depthNear = camera.near;
			device.depthFar = camera.far;

			device.getFrameData( frameData );

			//

			if ( frameOfReferenceType === 'stage' ) {

				var stageParameters = device.stageParameters;

				if ( stageParameters ) {

					standingMatrix.fromArray( stageParameters.sittingToStandingTransform );

				} else {

					standingMatrix.makeTranslation( 0, userHeight, 0 );

				}

			}
			var pose = frameData.pose;
			var poseObject = poseTarget !== null ? poseTarget : camera;

			// We want to manipulate poseObject by its position and quaternion components since users may rely on them.
			poseObject.matrix.copy( standingMatrix );
			poseObject.matrix.decompose( poseObject.position, poseObject.quaternion, poseObject.scale );

			if ( pose.orientation !== null ) {

				tempQuaternion.fromArray( pose.orientation );
				poseObject.quaternion.multiply( tempQuaternion );

			}

			if ( pose.position !== null ) {

				tempQuaternion.setFromRotationMatrix( standingMatrix );
				tempPosition.fromArray( pose.position );
				tempPosition.applyQuaternion( tempQuaternion );
				poseObject.position.add( tempPosition );

			}

			poseObject.updateMatrixWorld();

			if ( device.isPresenting === false ) return camera;

			//

			cameraL.near = camera.near;
			cameraR.near = camera.near;

			cameraL.far = camera.far;
			cameraR.far = camera.far;

			cameraL.matrixWorldInverse.fromArray( frameData.leftViewMatrix );
			cameraR.matrixWorldInverse.fromArray( frameData.rightViewMatrix );

			// TODO (mrdoob) Double check this code

			standingMatrixInverse.getInverse( standingMatrix );

			if ( frameOfReferenceType === 'stage' ) {

				cameraL.matrixWorldInverse.multiply( standingMatrixInverse );
				cameraR.matrixWorldInverse.multiply( standingMatrixInverse );

			}

			var parent = poseObject.parent;

			if ( parent !== null ) {

				matrixWorldInverse.getInverse( parent.matrixWorld );

				cameraL.matrixWorldInverse.multiply( matrixWorldInverse );
				cameraR.matrixWorldInverse.multiply( matrixWorldInverse );

			}

			// envMap and Mirror needs camera.matrixWorld

			cameraL.matrixWorld.getInverse( cameraL.matrixWorldInverse );
			cameraR.matrixWorld.getInverse( cameraR.matrixWorldInverse );

			cameraL.projectionMatrix.fromArray( frameData.leftProjectionMatrix );
			cameraR.projectionMatrix.fromArray( frameData.rightProjectionMatrix );

			setProjectionFromUnion( cameraVR, cameraL, cameraR );

			//

			var layers = device.getLayers();

			if ( layers.length ) {

				var layer = layers[ 0 ];

				if ( layer.leftBounds !== null && layer.leftBounds.length === 4 ) {

					cameraL.bounds.fromArray( layer.leftBounds );

				}

				if ( layer.rightBounds !== null && layer.rightBounds.length === 4 ) {

					cameraR.bounds.fromArray( layer.rightBounds );

				}

			}

			updateControllers();

			return cameraVR;

		};

		this.getStandingMatrix = function () {

			return standingMatrix;

		};

		this.isPresenting = isPresenting;

		// Animation Loop

		var animation = new WebGLAnimation();

		this.setAnimationLoop = function ( callback ) {

			animation.setAnimationLoop( callback );

		};

		this.submitFrame = function () {

			if ( isPresenting() ) device.submitFrame();

		};

		this.dispose = function () {

			if ( typeof window !== 'undefined' ) {

				window.removeEventListener( 'vrdisplaypresentchange', onVRDisplayPresentChange );

			}

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebXRManager( renderer ) {

		var gl = renderer.context;

		var device = null;
		var session = null;

		var framebufferScaleFactor = 1.0;

		var frameOfReference = null;
		var frameOfReferenceType = 'stage';

		var pose = null;

		var controllers = [];
		var inputSources = [];

		function isPresenting() {

			return session !== null && frameOfReference !== null;

		}

		//

		var cameraL = new PerspectiveCamera();
		cameraL.layers.enable( 1 );
		cameraL.viewport = new Vector4();

		var cameraR = new PerspectiveCamera();
		cameraR.layers.enable( 2 );
		cameraR.viewport = new Vector4();

		var cameraVR = new ArrayCamera( [ cameraL, cameraR ] );
		cameraVR.layers.enable( 1 );
		cameraVR.layers.enable( 2 );

		//

		this.enabled = false;

		this.getController = function ( id ) {

			var controller = controllers[ id ];

			if ( controller === undefined ) {

				controller = new Group();
				controller.matrixAutoUpdate = false;
				controller.visible = false;

				controllers[ id ] = controller;

			}

			return controller;

		};

		this.getDevice = function () {

			return device;

		};

		this.setDevice = function ( value ) {

			if ( value !== undefined ) device = value;
			if ( value instanceof XRDevice ) gl.setCompatibleXRDevice( value );

		};

		//

		function onSessionEvent( event ) {

			var controller = controllers[ inputSources.indexOf( event.inputSource ) ];
			if ( controller ) controller.dispatchEvent( { type: event.type } );

		}

		function onSessionEnd() {

			renderer.setFramebuffer( null );
			animation.stop();

		}

		this.setFramebufferScaleFactor = function ( value ) {

			framebufferScaleFactor = value;

		};

		this.setFrameOfReferenceType = function ( value ) {

			frameOfReferenceType = value;

		};

		this.setSession = function ( value ) {

			session = value;

			if ( session !== null ) {

				session.addEventListener( 'select', onSessionEvent );
				session.addEventListener( 'selectstart', onSessionEvent );
				session.addEventListener( 'selectend', onSessionEvent );
				session.addEventListener( 'end', onSessionEnd );

				session.baseLayer = new XRWebGLLayer( session, gl, { framebufferScaleFactor: framebufferScaleFactor } );
				session.requestFrameOfReference( frameOfReferenceType ).then( function ( value ) {

					frameOfReference = value;

					renderer.setFramebuffer( session.baseLayer.framebuffer );

					animation.setContext( session );
					animation.start();

				} );

				//

				inputSources = session.getInputSources();

				session.addEventListener( 'inputsourceschange', function () {

					inputSources = session.getInputSources();
					console.log( inputSources );

					for ( var i = 0; i < controllers.length; i ++ ) {

						var controller = controllers[ i ];
						controller.userData.inputSource = inputSources[ i ];

					}

				} );

			}

		};

		function updateCamera( camera, parent ) {

			if ( parent === null ) {

				camera.matrixWorld.copy( camera.matrix );

			} else {

				camera.matrixWorld.multiplyMatrices( parent.matrixWorld, camera.matrix );

			}

			camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		}

		this.getCamera = function ( camera ) {

			if ( isPresenting() ) {

				var parent = camera.parent;
				var cameras = cameraVR.cameras;

				updateCamera( cameraVR, parent );

				for ( var i = 0; i < cameras.length; i ++ ) {

					updateCamera( cameras[ i ], parent );

				}

				// update camera and its children

				camera.matrixWorld.copy( cameraVR.matrixWorld );

				var children = camera.children;

				for ( var i = 0, l = children.length; i < l; i ++ ) {

					children[ i ].updateMatrixWorld( true );

				}

				setProjectionFromUnion( cameraVR, cameraL, cameraR );

				return cameraVR;

			}

			return camera;

		};

		this.isPresenting = isPresenting;

		// Animation Loop

		var onAnimationFrameCallback = null;

		function onAnimationFrame( time, frame ) {

			pose = frame.getDevicePose( frameOfReference );

			if ( pose !== null ) {

				var layer = session.baseLayer;
				var views = frame.views;

				for ( var i = 0; i < views.length; i ++ ) {

					var view = views[ i ];
					var viewport = layer.getViewport( view );
					var viewMatrix = pose.getViewMatrix( view );

					var camera = cameraVR.cameras[ i ];
					camera.matrix.fromArray( viewMatrix ).getInverse( camera.matrix );
					camera.projectionMatrix.fromArray( view.projectionMatrix );
					camera.viewport.set( viewport.x, viewport.y, viewport.width, viewport.height );

					if ( i === 0 ) {

						cameraVR.matrix.copy( camera.matrix );

					}

				}

			}

			//

			for ( var i = 0; i < controllers.length; i ++ ) {

				var controller = controllers[ i ];

				var inputSource = inputSources[ i ];

				if ( inputSource ) {

					var inputPose = frame.getInputPose( inputSource, frameOfReference );

					if ( inputPose !== null ) {

						if ( 'targetRay' in inputPose ) {

							controller.matrix.elements = inputPose.targetRay.transformMatrix;

						} else if ( 'pointerMatrix' in inputPose ) {

							// DEPRECATED

							controller.matrix.elements = inputPose.pointerMatrix;

						}

						controller.matrix.decompose( controller.position, controller.rotation, controller.scale );
						controller.visible = true;

						continue;

					}

				}

				controller.visible = false;

			}

			if ( onAnimationFrameCallback ) onAnimationFrameCallback( time );

		}

		var animation = new WebGLAnimation();
		animation.setAnimationLoop( onAnimationFrame );

		this.setAnimationLoop = function ( callback ) {

			onAnimationFrameCallback = callback;

		};

		this.dispose = function () {};

		// DEPRECATED

		this.getStandingMatrix = function () {

			console.warn( 'WebXRManager: getStandingMatrix() is no longer needed.' );
			return new Matrix4();

		};

		this.submitFrame = function () {};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function WebGLRenderer( parameters ) {

		console.log( 'WebGLRenderer', REVISION );

		parameters = parameters || {};

		var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' ),
			_context = parameters.context !== undefined ? parameters.context : null,

			_alpha = parameters.alpha !== undefined ? parameters.alpha : false,
			_depth = parameters.depth !== undefined ? parameters.depth : true,
			_stencil = parameters.stencil !== undefined ? parameters.stencil : true,
			_antialias = parameters.antialias !== undefined ? parameters.antialias : false,
			_premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
			_preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
			_powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';

		var currentRenderList = null;
		var currentRenderState = null;

		// public properties

		this.domElement = _canvas;
		this.context = null;

		// clearing

		this.autoClear = true;
		this.autoClearColor = true;
		this.autoClearDepth = true;
		this.autoClearStencil = true;

		// scene graph

		this.sortObjects = true;

		// user-defined clipping

		this.clippingPlanes = [];
		this.localClippingEnabled = false;

		// physically based shading

		this.gammaFactor = 2.0;	// for backwards compatibility
		this.gammaInput = false;
		this.gammaOutput = false;

		// physical lights

		this.physicallyCorrectLights = false;

		// tone mapping

		this.toneMapping = LinearToneMapping;
		this.toneMappingExposure = 1.0;
		this.toneMappingWhitePoint = 1.0;

		// morphs

		this.maxMorphTargets = 8;
		this.maxMorphNormals = 4;

		// internal properties

		var _this = this,

			_isContextLost = false,

			// internal state cache

			_framebuffer = null,

			_currentRenderTarget = null,
			_currentFramebuffer = null,
			_currentMaterialId = - 1,

			// geometry and program caching

			_currentGeometryProgram = {
				geometry: null,
				program: null,
				wireframe: false
			},

			_currentCamera = null,
			_currentArrayCamera = null,

			_currentViewport = new Vector4(),
			_currentScissor = new Vector4(),
			_currentScissorTest = null,

			//

			_usedTextureUnits = 0,

			//

			_width = _canvas.width,
			_height = _canvas.height,

			_pixelRatio = 1,

			_viewport = new Vector4( 0, 0, _width, _height ),
			_scissor = new Vector4( 0, 0, _width, _height ),
			_scissorTest = false,

			// frustum

			_frustum = new Frustum(),

			// clipping

			_clipping = new WebGLClipping(),
			_clippingEnabled = false,
			_localClippingEnabled = false,

			// camera matrices cache

			_projScreenMatrix = new Matrix4(),

			_vector3 = new Vector3();

		function getTargetPixelRatio() {

			return _currentRenderTarget === null ? _pixelRatio : 1;

		}

		// initialize

		var _gl;

		try {

			var contextAttributes = {
				alpha: _alpha,
				depth: _depth,
				stencil: _stencil,
				antialias: _antialias,
				premultipliedAlpha: _premultipliedAlpha,
				preserveDrawingBuffer: _preserveDrawingBuffer,
				powerPreference: _powerPreference
			};

			// event listeners must be registered before WebGL context is created, see #12753

			_canvas.addEventListener( 'webglcontextlost', onContextLost, false );
			_canvas.addEventListener( 'webglcontextrestored', onContextRestore, false );

			_gl = _context || _canvas.getContext( 'webgl', contextAttributes ) || _canvas.getContext( 'experimental-webgl', contextAttributes );

			if ( _gl === null ) {

				if ( _canvas.getContext( 'webgl' ) !== null ) {

					throw new Error( 'Error creating WebGL context with your selected attributes.' );

				} else {

					throw new Error( 'Error creating WebGL context.' );

				}

			}

			// Some experimental-webgl implementations do not have getShaderPrecisionFormat

			if ( _gl.getShaderPrecisionFormat === undefined ) {

				_gl.getShaderPrecisionFormat = function () {

					return { 'rangeMin': 1, 'rangeMax': 1, 'precision': 1 };

				};

			}

		} catch ( error ) {

			console.error( 'WebGLRenderer: ' + error.message );

		}

		var extensions, capabilities, state, info;
		var properties, textures, attributes, geometries, objects;
		var programCache, renderLists, renderStates;

		var background, morphtargets, bufferRenderer, indexedBufferRenderer;

		var utils;

		function initGLContext() {

			extensions = new WebGLExtensions( _gl );

			capabilities = new WebGLCapabilities( _gl, extensions, parameters );

			if ( ! capabilities.isWebGL2 ) {

				extensions.get( 'WEBGL_depth_texture' );
				extensions.get( 'OES_texture_float' );
				extensions.get( 'OES_texture_half_float' );
				extensions.get( 'OES_texture_half_float_linear' );
				extensions.get( 'OES_standard_derivatives' );
				extensions.get( 'OES_element_index_uint' );
				extensions.get( 'ANGLE_instanced_arrays' );

			}

			extensions.get( 'OES_texture_float_linear' );

			utils = new WebGLUtils( _gl, extensions, capabilities );

			state = new WebGLState( _gl, extensions, utils, capabilities );
			state.scissor( _currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ) );
			state.viewport( _currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ) );

			info = new WebGLInfo( _gl );
			properties = new WebGLProperties();
			textures = new WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info );
			attributes = new WebGLAttributes( _gl );
			geometries = new WebGLGeometries( _gl, attributes, info );
			objects = new WebGLObjects( geometries, info );
			morphtargets = new WebGLMorphtargets( _gl );
			programCache = new WebGLPrograms( _this, extensions, capabilities );
			renderLists = new WebGLRenderLists();
			renderStates = new WebGLRenderStates();

			background = new WebGLBackground( _this, state, objects, _premultipliedAlpha );

			bufferRenderer = new WebGLBufferRenderer( _gl, extensions, info, capabilities );
			indexedBufferRenderer = new WebGLIndexedBufferRenderer( _gl, extensions, info, capabilities );

			info.programs = programCache.programs;

			_this.context = _gl;
			_this.capabilities = capabilities;
			_this.extensions = extensions;
			_this.properties = properties;
			_this.renderLists = renderLists;
			_this.state = state;
			_this.info = info;

		}

		initGLContext();

		// vr

		var vr = null;

		if ( typeof navigator !== 'undefined' ) {

			vr = ( 'xr' in navigator ) ? new WebXRManager( _this ) : new WebVRManager( _this );

		}

		this.vr = vr;

		// shadow map

		var shadowMap = new WebGLShadowMap( _this, objects, capabilities.maxTextureSize );

		this.shadowMap = shadowMap;

		// API

		this.getContext = function () {

			return _gl;

		};

		this.getContextAttributes = function () {

			return _gl.getContextAttributes();

		};

		this.forceContextLoss = function () {

			var extension = extensions.get( 'WEBGL_lose_context' );
			if ( extension ) extension.loseContext();

		};

		this.forceContextRestore = function () {

			var extension = extensions.get( 'WEBGL_lose_context' );
			if ( extension ) extension.restoreContext();

		};

		this.getPixelRatio = function () {

			return _pixelRatio;

		};

		this.setPixelRatio = function ( value ) {

			if ( value === undefined ) return;

			_pixelRatio = value;

			this.setSize( _width, _height, false );

		};

		this.getSize = function () {

			return {
				width: _width,
				height: _height
			};

		};

		this.setSize = function ( width, height, updateStyle ) {

			if ( vr.isPresenting() ) {

				console.warn( 'WebGLRenderer: Can\'t change size while VR device is presenting.' );
				return;

			}

			_width = width;
			_height = height;

			_canvas.width = width * _pixelRatio;
			_canvas.height = height * _pixelRatio;

			if ( updateStyle !== false ) {

				_canvas.style.width = width + 'px';
				_canvas.style.height = height + 'px';

			}

			this.setViewport( 0, 0, width, height );

		};

		this.getDrawingBufferSize = function () {

			return {
				width: _width * _pixelRatio,
				height: _height * _pixelRatio
			};

		};

		this.setDrawingBufferSize = function ( width, height, pixelRatio ) {

			_width = width;
			_height = height;

			_pixelRatio = pixelRatio;

			_canvas.width = width * pixelRatio;
			_canvas.height = height * pixelRatio;

			this.setViewport( 0, 0, width, height );

		};

		this.getCurrentViewport = function () {

			return _currentViewport;

		};

		this.setViewport = function ( x, y, width, height ) {

			_viewport.set( x, _height - y - height, width, height );
			state.viewport( _currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ) );

		};

		this.setScissor = function ( x, y, width, height ) {

			_scissor.set( x, _height - y - height, width, height );
			state.scissor( _currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ) );

		};

		this.setScissorTest = function ( boolean ) {

			state.setScissorTest( _scissorTest = boolean );

		};

		// Clearing

		this.getClearColor = function () {

			return background.getClearColor();

		};

		this.setClearColor = function () {

			background.setClearColor.apply( background, arguments );

		};

		this.getClearAlpha = function () {

			return background.getClearAlpha();

		};

		this.setClearAlpha = function () {

			background.setClearAlpha.apply( background, arguments );

		};

		this.clear = function ( color, depth, stencil ) {

			var bits = 0;

			if ( color === undefined || color ) bits |= _gl.COLOR_BUFFER_BIT;
			if ( depth === undefined || depth ) bits |= _gl.DEPTH_BUFFER_BIT;
			if ( stencil === undefined || stencil ) bits |= _gl.STENCIL_BUFFER_BIT;

			_gl.clear( bits );

		};

		this.clearColor = function () {

			this.clear( true, false, false );

		};

		this.clearDepth = function () {

			this.clear( false, true, false );

		};

		this.clearStencil = function () {

			this.clear( false, false, true );

		};

		//

		this.dispose = function () {

			_canvas.removeEventListener( 'webglcontextlost', onContextLost, false );
			_canvas.removeEventListener( 'webglcontextrestored', onContextRestore, false );

			renderLists.dispose();
			renderStates.dispose();
			properties.dispose();
			objects.dispose();

			vr.dispose();

			animation.stop();

		};

		// Events

		function onContextLost( event ) {

			event.preventDefault();

			console.log( 'WebGLRenderer: Context Lost.' );

			_isContextLost = true;

		}

		function onContextRestore(  ) {

			console.log( 'WebGLRenderer: Context Restored.' );

			_isContextLost = false;

			initGLContext();

		}

		function onMaterialDispose( event ) {

			var material = event.target;

			material.removeEventListener( 'dispose', onMaterialDispose );

			deallocateMaterial( material );

		}

		// Buffer deallocation

		function deallocateMaterial( material ) {

			releaseMaterialProgramReference( material );

			properties.remove( material );

		}
		function releaseMaterialProgramReference( material ) {

			var programInfo = properties.get( material ).program;

			material.program = undefined;

			if ( programInfo !== undefined ) {

				programCache.releaseProgram( programInfo );

			}

		}

		// Buffer rendering

		function renderObjectImmediate( object, program ) {

			object.render( function ( object ) {

				_this.renderBufferImmediate( object, program );

			} );

		}

		this.renderBufferImmediate = function ( object, program ) {

			state.initAttributes();

			var buffers = properties.get( object );

			if ( object.hasPositions && ! buffers.position ) buffers.position = _gl.createBuffer();
			if ( object.hasNormals && ! buffers.normal ) buffers.normal = _gl.createBuffer();
			if ( object.hasUvs && ! buffers.uv ) buffers.uv = _gl.createBuffer();
			if ( object.hasColors && ! buffers.color ) buffers.color = _gl.createBuffer();

			var programAttributes = program.getAttributes();

			if ( object.hasPositions ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, buffers.position );
				_gl.bufferData( _gl.ARRAY_BUFFER, object.positionArray, _gl.DYNAMIC_DRAW );

				state.enableAttribute( programAttributes.position );
				_gl.vertexAttribPointer( programAttributes.position, 3, _gl.FLOAT, false, 0, 0 );

			}

			if ( object.hasNormals ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, buffers.normal );
				_gl.bufferData( _gl.ARRAY_BUFFER, object.normalArray, _gl.DYNAMIC_DRAW );

				state.enableAttribute( programAttributes.normal );
				_gl.vertexAttribPointer( programAttributes.normal, 3, _gl.FLOAT, false, 0, 0 );

			}

			if ( object.hasUvs ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, buffers.uv );
				_gl.bufferData( _gl.ARRAY_BUFFER, object.uvArray, _gl.DYNAMIC_DRAW );

				state.enableAttribute( programAttributes.uv );
				_gl.vertexAttribPointer( programAttributes.uv, 2, _gl.FLOAT, false, 0, 0 );

			}

			if ( object.hasColors ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, buffers.color );
				_gl.bufferData( _gl.ARRAY_BUFFER, object.colorArray, _gl.DYNAMIC_DRAW );

				state.enableAttribute( programAttributes.color );
				_gl.vertexAttribPointer( programAttributes.color, 3, _gl.FLOAT, false, 0, 0 );

			}

			state.disableUnusedAttributes();

			_gl.drawArrays( _gl.TRIANGLES, 0, object.count );

			object.count = 0;

		};

		this.renderBufferDirect = function ( camera, fog, geometry, material, object, group ) {

			var frontFaceCW = ( object.isMesh && object.normalMatrix.determinant() < 0 );

			state.setMaterial( material, frontFaceCW );

			var program = setProgram( camera, fog, material, object );

			var updateBuffers = false;

			if ( _currentGeometryProgram.geometry !== geometry.id ||
				_currentGeometryProgram.program !== program.id ||
				_currentGeometryProgram.wireframe !== ( material.wireframe === true ) ) {

				_currentGeometryProgram.geometry = geometry.id;
				_currentGeometryProgram.program = program.id;
				_currentGeometryProgram.wireframe = material.wireframe === true;
				updateBuffers = true;

			}

			if ( object.morphTargetInfluences ) {

				morphtargets.update( object, geometry, material, program );

				updateBuffers = true;

			}

			//

			var index = geometry.index;
			var position = geometry.attributes.position;
			var rangeFactor = 1;

			if ( material.wireframe === true ) {

				index = geometries.getWireframeAttribute( geometry );
				rangeFactor = 2;

			}

			var attribute;
			var renderer = bufferRenderer;

			if ( index !== null ) {

				attribute = attributes.get( index );

				renderer = indexedBufferRenderer;
				renderer.setIndex( attribute );

			}

			if ( updateBuffers ) {

				setupVertexAttributes( material, program, geometry );

				if ( index !== null ) {

					_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, attribute.buffer );

				}

			}

			//

			var dataCount = Infinity;

			if ( index !== null ) {

				dataCount = index.count;

			} else if ( position !== undefined ) {

				dataCount = position.count;

			}

			var rangeStart = geometry.drawRange.start * rangeFactor;
			var rangeCount = geometry.drawRange.count * rangeFactor;

			var groupStart = group !== null ? group.start * rangeFactor : 0;
			var groupCount = group !== null ? group.count * rangeFactor : Infinity;

			var drawStart = Math.max( rangeStart, groupStart );
			var drawEnd = Math.min( dataCount, rangeStart + rangeCount, groupStart + groupCount ) - 1;

			var drawCount = Math.max( 0, drawEnd - drawStart + 1 );

			if ( drawCount === 0 ) return;

			//

			if ( object.isMesh ) {

				if ( material.wireframe === true ) {

					state.setLineWidth( material.wireframeLinewidth * getTargetPixelRatio() );
					renderer.setMode( _gl.LINES );

				} else {

					switch ( object.drawMode ) {

						case TrianglesDrawMode:
							renderer.setMode( _gl.TRIANGLES );
							break;

						case TriangleStripDrawMode:
							renderer.setMode( _gl.TRIANGLE_STRIP );
							break;

						case TriangleFanDrawMode:
							renderer.setMode( _gl.TRIANGLE_FAN );
							break;

					}

				}
			} else if ( object.isLine ) {

				var lineWidth = material.linewidth;

				if ( lineWidth === undefined ) lineWidth = 1; // Not using Line*Material

				state.setLineWidth( lineWidth * getTargetPixelRatio() );

				if ( object.isLineSegments ) {

					renderer.setMode( _gl.LINES );

				} else if ( object.isLineLoop ) {

					renderer.setMode( _gl.LINE_LOOP );

				} else {

					renderer.setMode( _gl.LINE_STRIP );

				}

			} else if ( object.isPoints ) {

				renderer.setMode( _gl.POINTS );

			} else if ( object.isSprite ) {

				renderer.setMode( _gl.TRIANGLES );

			}

			if ( geometry && geometry.isInstancedBufferGeometry ) {

				if ( geometry.maxInstancedCount > 0 ) {

					renderer.renderInstances( geometry, drawStart, drawCount );

				}

			} else {

				renderer.render( drawStart, drawCount );

			}

		};

		function setupVertexAttributes( material, program, geometry ) {

			if ( geometry && geometry.isInstancedBufferGeometry & ! capabilities.isWebGL2 ) {

				if ( extensions.get( 'ANGLE_instanced_arrays' ) === null ) {

					console.error( 'WebGLRenderer.setupVertexAttributes: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			state.initAttributes();

			var geometryAttributes = geometry.attributes;

			var programAttributes = program.getAttributes();

			var materialDefaultAttributeValues = material.defaultAttributeValues;

			for ( var name in programAttributes ) {

				var programAttribute = programAttributes[ name ];

				if ( programAttribute >= 0 ) {

					var geometryAttribute = geometryAttributes[ name ];

					if ( geometryAttribute !== undefined ) {

						var normalized = geometryAttribute.normalized;
						var size = geometryAttribute.itemSize;

						var attribute = attributes.get( geometryAttribute );

						// TODO Attribute may not be available on context restore

						if ( attribute === undefined ) continue;

						var buffer = attribute.buffer;
						var type = attribute.type;
						var bytesPerElement = attribute.bytesPerElement;

						if ( geometryAttribute.isInterleavedBufferAttribute ) {

							var data = geometryAttribute.data;
							var stride = data.stride;
							var offset = geometryAttribute.offset;

							if ( data && data.isInstancedInterleavedBuffer ) {

								state.enableAttributeAndDivisor( programAttribute, data.meshPerAttribute );

								if ( geometry.maxInstancedCount === undefined ) {

									geometry.maxInstancedCount = data.meshPerAttribute * data.count;

								}

							} else {

								state.enableAttribute( programAttribute );

							}

							_gl.bindBuffer( _gl.ARRAY_BUFFER, buffer );
							_gl.vertexAttribPointer( programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement );

						} else {

							if ( geometryAttribute.isInstancedBufferAttribute ) {

								state.enableAttributeAndDivisor( programAttribute, geometryAttribute.meshPerAttribute );

								if ( geometry.maxInstancedCount === undefined ) {

									geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;

								}

							} else {

								state.enableAttribute( programAttribute );

							}

							_gl.bindBuffer( _gl.ARRAY_BUFFER, buffer );
							_gl.vertexAttribPointer( programAttribute, size, type, normalized, 0, 0 );

						}

					} else if ( materialDefaultAttributeValues !== undefined ) {

						var value = materialDefaultAttributeValues[ name ];

						if ( value !== undefined ) {

							switch ( value.length ) {

								case 2:
									_gl.vertexAttrib2fv( programAttribute, value );
									break;

								case 3:
									_gl.vertexAttrib3fv( programAttribute, value );
									break;

								case 4:
									_gl.vertexAttrib4fv( programAttribute, value );
									break;

								default:
									_gl.vertexAttrib1fv( programAttribute, value );

							}

						}

					}

				}

			}

			state.disableUnusedAttributes();

		}

		// Compile

		this.compile = function ( scene, camera ) {

			currentRenderState = renderStates.get( scene, camera );
			currentRenderState.init();

			scene.traverse( function ( object ) {

				if ( object.isLight ) {

					currentRenderState.pushLight( object );

					if ( object.castShadow ) {

						currentRenderState.pushShadow( object );

					}

				}

			} );

			currentRenderState.setupLights( camera );

			scene.traverse( function ( object ) {

				if ( object.material ) {

					if ( Array.isArray( object.material ) ) {

						for ( var i = 0; i < object.material.length; i ++ ) {

							initMaterial( object.material[ i ], scene.fog, object );

						}

					} else {

						initMaterial( object.material, scene.fog, object );

					}

				}

			} );

		};

		// Animation Loop

		var onAnimationFrameCallback = null;

		function onAnimationFrame( time ) {

			if ( vr.isPresenting() ) return;
			if ( onAnimationFrameCallback ) onAnimationFrameCallback( time );

		}

		var animation = new WebGLAnimation();
		animation.setAnimationLoop( onAnimationFrame );

		if ( typeof window !== 'undefined' ) animation.setContext( window );

		this.setAnimationLoop = function ( callback ) {

			onAnimationFrameCallback = callback;
			vr.setAnimationLoop( callback );

			animation.start();

		};

		// Rendering

		this.render = function ( scene, camera, renderTarget, forceClear ) {

			if ( ! ( camera && camera.isCamera ) ) {

				console.error( 'WebGLRenderer.render: camera is not an instance of Camera.' );
				return;

			}

			if ( _isContextLost ) return;

			// reset caching for this frame

			_currentGeometryProgram.geometry = null;
			_currentGeometryProgram.program = null;
			_currentGeometryProgram.wireframe = false;
			_currentMaterialId = - 1;
			_currentCamera = null;

			// update scene graph

			if ( scene.autoUpdate === true ) scene.updateMatrixWorld();

			// update camera matrices and frustum

			if ( camera.parent === null ) camera.updateMatrixWorld();

			if ( vr.enabled ) {

				camera = vr.getCamera( camera );

			}

			//

			currentRenderState = renderStates.get( scene, camera );
			currentRenderState.init();

			scene.onBeforeRender( _this, scene, camera, renderTarget );

			_projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
			_frustum.setFromMatrix( _projScreenMatrix );

			_localClippingEnabled = this.localClippingEnabled;
			_clippingEnabled = _clipping.init( this.clippingPlanes, _localClippingEnabled, camera );

			currentRenderList = renderLists.get( scene, camera );
			currentRenderList.init();

			projectObject( scene, camera, _this.sortObjects );

			if ( _this.sortObjects === true ) {

				currentRenderList.sort();

			}

			//

			if ( _clippingEnabled ) _clipping.beginShadows();

			var shadowsArray = currentRenderState.state.shadowsArray;

			shadowMap.render( shadowsArray, scene, camera );

			currentRenderState.setupLights( camera );

			if ( _clippingEnabled ) _clipping.endShadows();

			//

			if ( this.info.autoReset ) this.info.reset();

			if ( renderTarget === undefined ) {

				renderTarget = null;

			}

			this.setRenderTarget( renderTarget );

			//

			background.render( currentRenderList, scene, camera, forceClear );

			// render scene

			var opaqueObjects = currentRenderList.opaque;
			var transparentObjects = currentRenderList.transparent;

			if ( scene.overrideMaterial ) {

				var overrideMaterial = scene.overrideMaterial;

				if ( opaqueObjects.length ) renderObjects( opaqueObjects, scene, camera, overrideMaterial );
				if ( transparentObjects.length ) renderObjects( transparentObjects, scene, camera, overrideMaterial );

			} else {

				// opaque pass (front-to-back order)

				if ( opaqueObjects.length ) renderObjects( opaqueObjects, scene, camera );

				// transparent pass (back-to-front order)

				if ( transparentObjects.length ) renderObjects( transparentObjects, scene, camera );

			}

			// Generate mipmap if we're using any kind of mipmap filtering

			if ( renderTarget ) {

				textures.updateRenderTargetMipmap( renderTarget );

			}

			// Ensure depth buffer writing is enabled so it can be cleared on next render

			state.buffers.depth.setTest( true );
			state.buffers.depth.setMask( true );
			state.buffers.color.setMask( true );

			state.setPolygonOffset( false );

			scene.onAfterRender( _this, scene, camera );

			if ( vr.enabled ) {

				vr.submitFrame();

			}

			// _gl.finish();

			currentRenderList = null;
			currentRenderState = null;

		};

		function projectObject( object, camera, sortObjects ) {

			if ( object.visible === false ) return;

			var visible = object.layers.test( camera.layers );

			if ( visible ) {

				if ( object.isLight ) {

					currentRenderState.pushLight( object );

					if ( object.castShadow ) {

						currentRenderState.pushShadow( object );

					}

				} else if ( object.isSprite ) {

					if ( ! object.frustumCulled || _frustum.intersectsSprite( object ) ) {

						if ( sortObjects ) {

							_vector3.setFromMatrixPosition( object.matrixWorld )
								.applyMatrix4( _projScreenMatrix );

						}

						var geometry = objects.update( object );
						var material = object.material;

						currentRenderList.push( object, geometry, material, _vector3.z, null );

					}

				} else if ( object.isImmediateRenderObject ) {

					if ( sortObjects ) {

						_vector3.setFromMatrixPosition( object.matrixWorld )
							.applyMatrix4( _projScreenMatrix );

					}

					currentRenderList.push( object, null, object.material, _vector3.z, null );

				} else if ( object.isMesh || object.isLine || object.isPoints ) {

					if ( object.isSkinnedMesh ) {

						object.skeleton.update();

					}

					if ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) {

						if ( sortObjects ) {

							_vector3.setFromMatrixPosition( object.matrixWorld )
								.applyMatrix4( _projScreenMatrix );

						}

						var geometry = objects.update( object );
						var material = object.material;

						if ( Array.isArray( material ) ) {

							var groups = geometry.groups;

							for ( var i = 0, l = groups.length; i < l; i ++ ) {

								var group = groups[ i ];
								var groupMaterial = material[ group.materialIndex ];

								if ( groupMaterial && groupMaterial.visible ) {

									currentRenderList.push( object, geometry, groupMaterial, _vector3.z, group );

								}

							}

						} else if ( material.visible ) {

							currentRenderList.push( object, geometry, material, _vector3.z, null );

						}

					}

				}

			}

			var children = object.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				projectObject( children[ i ], camera, sortObjects );

			}

		}

		function renderObjects( renderList, scene, camera, overrideMaterial ) {

			for ( var i = 0, l = renderList.length; i < l; i ++ ) {

				var renderItem = renderList[ i ];

				var object = renderItem.object;
				var geometry = renderItem.geometry;
				var material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
				var group = renderItem.group;

				if ( camera.isArrayCamera ) {

					_currentArrayCamera = camera;

					var cameras = camera.cameras;

					for ( var j = 0, jl = cameras.length; j < jl; j ++ ) {

						var camera2 = cameras[ j ];

						if ( object.layers.test( camera2.layers ) ) {

							if ( 'viewport' in camera2 ) { // XR

								state.viewport( _currentViewport.copy( camera2.viewport ) );

							} else {

								var bounds = camera2.bounds;

								var x = bounds.x * _width;
								var y = bounds.y * _height;
								var width = bounds.z * _width;
								var height = bounds.w * _height;

								state.viewport( _currentViewport.set( x, y, width, height ).multiplyScalar( _pixelRatio ) );

							}

							currentRenderState.setupLights( camera2 );

							renderObject( object, scene, camera2, geometry, material, group );

						}

					}

				} else {

					_currentArrayCamera = null;

					renderObject( object, scene, camera, geometry, material, group );

				}

			}

		}

		function renderObject( object, scene, camera, geometry, material, group ) {

			object.onBeforeRender( _this, scene, camera, geometry, material, group );
			currentRenderState = renderStates.get( scene, _currentArrayCamera || camera );

			object.modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );
			object.normalMatrix.getNormalMatrix( object.modelViewMatrix );

			if ( object.isImmediateRenderObject ) {

				state.setMaterial( material );

				var program = setProgram( camera, scene.fog, material, object );

				_currentGeometryProgram.geometry = null;
				_currentGeometryProgram.program = null;
				_currentGeometryProgram.wireframe = false;

				renderObjectImmediate( object, program );

			} else {

				_this.renderBufferDirect( camera, scene.fog, geometry, material, object, group );

			}

			object.onAfterRender( _this, scene, camera, geometry, material, group );
			currentRenderState = renderStates.get( scene, _currentArrayCamera || camera );

		}

		function initMaterial( material, fog, object ) {

			var materialProperties = properties.get( material );

			var lights = currentRenderState.state.lights;
			var shadowsArray = currentRenderState.state.shadowsArray;

			var lightsHash = materialProperties.lightsHash;
			var lightsStateHash = lights.state.hash;

			var parameters = programCache.getParameters(
				material, lights.state, shadowsArray, fog, _clipping.numPlanes, _clipping.numIntersection, object );

			var code = programCache.getProgramCode( material, parameters );

			var program = materialProperties.program;
			var programChange = true;

			if ( program === undefined ) {

				// new material
				material.addEventListener( 'dispose', onMaterialDispose );

			} else if ( program.code !== code ) {

				// changed glsl or parameters
				releaseMaterialProgramReference( material );

			} else if ( lightsHash.stateID !== lightsStateHash.stateID ||
				lightsHash.directionalLength !== lightsStateHash.directionalLength ||
				lightsHash.pointLength !== lightsStateHash.pointLength ||
				lightsHash.spotLength !== lightsStateHash.spotLength ||
				lightsHash.rectAreaLength !== lightsStateHash.rectAreaLength ||
				lightsHash.hemiLength !== lightsStateHash.hemiLength ||
				lightsHash.shadowsLength !== lightsStateHash.shadowsLength ) {

				lightsHash.stateID = lightsStateHash.stateID;
				lightsHash.directionalLength = lightsStateHash.directionalLength;
				lightsHash.pointLength = lightsStateHash.pointLength;
				lightsHash.spotLength = lightsStateHash.spotLength;
				lightsHash.rectAreaLength = lightsStateHash.rectAreaLength;
				lightsHash.hemiLength = lightsStateHash.hemiLength;
				lightsHash.shadowsLength = lightsStateHash.shadowsLength;

				programChange = false;

			} else if ( parameters.shaderID !== undefined ) {

				// same glsl and uniform list
				return;

			} else {

				// only rebuild uniform list
				programChange = false;

			}

			if ( programChange ) {

				if ( parameters.shaderID ) {

					var shader = ShaderLib[ parameters.shaderID ];

					materialProperties.shader = {
						name: material.type,
						uniforms: UniformsUtils.clone( shader.uniforms ),
						vertexShader: shader.vertexShader,
						fragmentShader: shader.fragmentShader
					};

				} else {

					materialProperties.shader = {
						name: material.type,
						uniforms: material.uniforms,
						vertexShader: material.vertexShader,
						fragmentShader: material.fragmentShader
					};

				}

				material.onBeforeCompile( materialProperties.shader, _this );

				// Computing code again as onBeforeCompile may have changed the shaders
				code = programCache.getProgramCode( material, parameters );

				program = programCache.acquireProgram( material, materialProperties.shader, parameters, code );

				materialProperties.program = program;
				material.program = program;

			}

			var programAttributes = program.getAttributes();

			if ( material.morphTargets ) {

				material.numSupportedMorphTargets = 0;

				for ( var i = 0; i < _this.maxMorphTargets; i ++ ) {

					if ( programAttributes[ 'morphTarget' + i ] >= 0 ) {

						material.numSupportedMorphTargets ++;

					}

				}

			}

			if ( material.morphNormals ) {

				material.numSupportedMorphNormals = 0;

				for ( var i = 0; i < _this.maxMorphNormals; i ++ ) {

					if ( programAttributes[ 'morphNormal' + i ] >= 0 ) {

						material.numSupportedMorphNormals ++;

					}

				}

			}

			var uniforms = materialProperties.shader.uniforms;

			if ( ! material.isShaderMaterial &&
				! material.isRawShaderMaterial ||
				material.clipping === true ) {

				materialProperties.numClippingPlanes = _clipping.numPlanes;
				materialProperties.numIntersection = _clipping.numIntersection;
				uniforms.clippingPlanes = _clipping.uniform;

			}

			materialProperties.fog = fog;

			// store the light setup it was created for
			if ( lightsHash === undefined ) {

				materialProperties.lightsHash = lightsHash = {};

			}

			lightsHash.stateID = lightsStateHash.stateID;
			lightsHash.directionalLength = lightsStateHash.directionalLength;
			lightsHash.pointLength = lightsStateHash.pointLength;
			lightsHash.spotLength = lightsStateHash.spotLength;
			lightsHash.rectAreaLength = lightsStateHash.rectAreaLength;
			lightsHash.hemiLength = lightsStateHash.hemiLength;
			lightsHash.shadowsLength = lightsStateHash.shadowsLength;

			if ( material.lights ) {

				// wire up the material to this renderer's lighting state

				uniforms.ambientLightColor.value = lights.state.ambient;
				uniforms.directionalLights.value = lights.state.directional;
				uniforms.spotLights.value = lights.state.spot;
				uniforms.rectAreaLights.value = lights.state.rectArea;
				uniforms.pointLights.value = lights.state.point;
				uniforms.hemisphereLights.value = lights.state.hemi;

				uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
				uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
				uniforms.spotShadowMap.value = lights.state.spotShadowMap;
				uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
				uniforms.pointShadowMap.value = lights.state.pointShadowMap;
				uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
				// TODO (abelnation): add area lights shadow info to uniforms

			}

			var progUniforms = materialProperties.program.getUniforms(),
				uniformsList =
					WebGLUniforms.seqWithValue( progUniforms.seq, uniforms );

			materialProperties.uniformsList = uniformsList;

		}

		function setProgram( camera, fog, material, object ) {

			_usedTextureUnits = 0;

			var materialProperties = properties.get( material );
			var lights = currentRenderState.state.lights;

			var lightsHash = materialProperties.lightsHash;
			var lightsStateHash = lights.state.hash;

			if ( _clippingEnabled ) {

				if ( _localClippingEnabled || camera !== _currentCamera ) {

					var useCache =
						camera === _currentCamera &&
						material.id === _currentMaterialId;

					// we might want to call this function with some ClippingGroup
					// object instead of the material, once it becomes feasible
					// (#8465, #8379)
					_clipping.setState(
						material.clippingPlanes, material.clipIntersection, material.clipShadows,
						camera, materialProperties, useCache );

				}

			}

			if ( material.needsUpdate === false ) {

				if ( materialProperties.program === undefined ) {

					material.needsUpdate = true;

				} else if ( material.fog && materialProperties.fog !== fog ) {

					material.needsUpdate = true;

				} else if ( material.lights && ( lightsHash.stateID !== lightsStateHash.stateID ||
					lightsHash.directionalLength !== lightsStateHash.directionalLength ||
					lightsHash.pointLength !== lightsStateHash.pointLength ||
					lightsHash.spotLength !== lightsStateHash.spotLength ||
					lightsHash.rectAreaLength !== lightsStateHash.rectAreaLength ||
					lightsHash.hemiLength !== lightsStateHash.hemiLength ||
					lightsHash.shadowsLength !== lightsStateHash.shadowsLength ) ) {

					material.needsUpdate = true;

				} else if ( materialProperties.numClippingPlanes !== undefined &&
					( materialProperties.numClippingPlanes !== _clipping.numPlanes ||
					materialProperties.numIntersection !== _clipping.numIntersection ) ) {

					material.needsUpdate = true;

				}

			}

			if ( material.needsUpdate ) {

				initMaterial( material, fog, object );
				material.needsUpdate = false;

			}

			var refreshProgram = false;
			var refreshMaterial = false;
			var refreshLights = false;

			var program = materialProperties.program,
				p_uniforms = program.getUniforms(),
				m_uniforms = materialProperties.shader.uniforms;

			if ( state.useProgram( program.program ) ) {

				refreshProgram = true;
				refreshMaterial = true;
				refreshLights = true;

			}

			if ( material.id !== _currentMaterialId ) {

				_currentMaterialId = material.id;

				refreshMaterial = true;

			}

			if ( refreshProgram || _currentCamera !== camera ) {

				p_uniforms.setValue( _gl, 'projectionMatrix', camera.projectionMatrix );

				if ( capabilities.logarithmicDepthBuffer ) {

					p_uniforms.setValue( _gl, 'logDepthBufFC',
						2.0 / ( Math.log( camera.far + 1.0 ) / Math.LN2 ) );

				}

				if ( _currentCamera !== camera ) {

					_currentCamera = camera;

					// lighting uniforms depend on the camera so enforce an update
					// now, in case this material supports lights - or later, when
					// the next material that does gets activated:

					refreshMaterial = true;		// set to true on material change
					refreshLights = true;		// remains set until update done

				}

				// load material specific uniforms
				// (shader material also gets them for the sake of genericity)

				if ( material.isShaderMaterial ||
					material.isMeshPhongMaterial ||
					material.isMeshStandardMaterial ||
					material.envMap ) {

					var uCamPos = p_uniforms.map.cameraPosition;

					if ( uCamPos !== undefined ) {

						uCamPos.setValue( _gl,
							_vector3.setFromMatrixPosition( camera.matrixWorld ) );

					}

				}

				if ( material.isMeshPhongMaterial ||
					material.isMeshLambertMaterial ||
					material.isMeshBasicMaterial ||
					material.isMeshStandardMaterial ||
					material.isShaderMaterial ||
					material.skinning ) {

					p_uniforms.setValue( _gl, 'viewMatrix', camera.matrixWorldInverse );

				}

			}

			// skinning uniforms must be set even if material didn't change
			// auto-setting of texture unit for bone texture must go before other textures
			// not sure why, but otherwise weird things happen

			if ( material.skinning ) {

				p_uniforms.setOptional( _gl, object, 'bindMatrix' );
				p_uniforms.setOptional( _gl, object, 'bindMatrixInverse' );

				var skeleton = object.skeleton;

				if ( skeleton ) {

					var bones = skeleton.bones;

					if ( capabilities.floatVertexTextures ) {

						if ( skeleton.boneTexture === undefined ) {

							// layout (1 matrix = 4 pixels)
							//      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
							//  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
							//       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
							//       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
							//       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)
							var size = Math.sqrt( bones.length * 4 ); // 4 pixels needed for 1 matrix
							size = _Math.ceilPowerOfTwo( size );
							size = Math.max( size, 4 );

							var boneMatrices = new Float32Array( size * size * 4 ); // 4 floats per RGBA pixel
							boneMatrices.set( skeleton.boneMatrices ); // copy current values

							var boneTexture = new DataTexture( boneMatrices, size, size, RGBAFormat, FloatType );
							boneTexture.needsUpdate = true;

							skeleton.boneMatrices = boneMatrices;
							skeleton.boneTexture = boneTexture;
							skeleton.boneTextureSize = size;

						}

						p_uniforms.setValue( _gl, 'boneTexture', skeleton.boneTexture );
						p_uniforms.setValue( _gl, 'boneTextureSize', skeleton.boneTextureSize );

					} else {

						p_uniforms.setOptional( _gl, skeleton, 'boneMatrices' );

					}

				}

			}

			if ( refreshMaterial ) {

				p_uniforms.setValue( _gl, 'toneMappingExposure', _this.toneMappingExposure );
				p_uniforms.setValue( _gl, 'toneMappingWhitePoint', _this.toneMappingWhitePoint );

				if ( material.lights ) {

					// the current material requires lighting info

					// note: all lighting uniforms are always set correctly
					// they simply reference the renderer's state for their
					// values
					//
					// use the current material's .needsUpdate flags to set
					// the GL state when required

					markUniformsLightsNeedsUpdate( m_uniforms, refreshLights );

				}

				// refresh uniforms common to several materials

				if ( fog && material.fog ) {

					refreshUniformsFog( m_uniforms, fog );

				}

				if ( material.isMeshBasicMaterial ) {

					refreshUniformsCommon( m_uniforms, material );

				} else if ( material.isMeshLambertMaterial ) {

					refreshUniformsCommon( m_uniforms, material );
					refreshUniformsLambert( m_uniforms, material );

				} else if ( material.isMeshPhongMaterial ) {

					refreshUniformsCommon( m_uniforms, material );

					if ( material.isMeshToonMaterial ) {

						refreshUniformsToon( m_uniforms, material );

					} else {

						refreshUniformsPhong( m_uniforms, material );

					}

				} else if ( material.isMeshStandardMaterial ) {

					refreshUniformsCommon( m_uniforms, material );

					if ( material.isMeshPhysicalMaterial ) {

						refreshUniformsPhysical( m_uniforms, material );

					} else {

						refreshUniformsStandard( m_uniforms, material );

					}

				} else if ( material.isMeshMatcapMaterial ) {

					refreshUniformsCommon( m_uniforms, material );

					refreshUniformsMatcap( m_uniforms, material );

				} else if ( material.isMeshDepthMaterial ) {

					refreshUniformsCommon( m_uniforms, material );
					refreshUniformsDepth( m_uniforms, material );

				} else if ( material.isMeshDistanceMaterial ) {

					refreshUniformsCommon( m_uniforms, material );
					refreshUniformsDistance( m_uniforms, material );

				} else if ( material.isMeshNormalMaterial ) {

					refreshUniformsCommon( m_uniforms, material );
					refreshUniformsNormal( m_uniforms, material );

				} else if ( material.isLineBasicMaterial ) {

					refreshUniformsLine( m_uniforms, material );

					if ( material.isLineDashedMaterial ) {

						refreshUniformsDash( m_uniforms, material );

					}

				} else if ( material.isPointsMaterial ) {

					refreshUniformsPoints( m_uniforms, material );

				} else if ( material.isSpriteMaterial ) {

					refreshUniformsSprites( m_uniforms, material );

				} else if ( material.isShadowMaterial ) {

					m_uniforms.color.value = material.color;
					m_uniforms.opacity.value = material.opacity;

				}

				// RectAreaLight Texture
				// TODO (mrdoob): Find a nicer implementation

				if ( m_uniforms.ltc_1 !== undefined ) m_uniforms.ltc_1.value = UniformsLib.LTC_1;
				if ( m_uniforms.ltc_2 !== undefined ) m_uniforms.ltc_2.value = UniformsLib.LTC_2;

				WebGLUniforms.upload( _gl, materialProperties.uniformsList, m_uniforms, _this );

			}

			if ( material.isShaderMaterial && material.uniformsNeedUpdate === true ) {

				WebGLUniforms.upload( _gl, materialProperties.uniformsList, m_uniforms, _this );
				material.uniformsNeedUpdate = false;

			}

			if ( material.isSpriteMaterial ) {

				p_uniforms.setValue( _gl, 'center', object.center );

			}

			// common matrices

			p_uniforms.setValue( _gl, 'modelViewMatrix', object.modelViewMatrix );
			p_uniforms.setValue( _gl, 'normalMatrix', object.normalMatrix );
			p_uniforms.setValue( _gl, 'modelMatrix', object.matrixWorld );

			return program;

		}

		// Uniforms (refresh uniforms objects)

		function refreshUniformsCommon( uniforms, material ) {

			uniforms.opacity.value = material.opacity;

			if ( material.color ) {

				uniforms.diffuse.value = material.color;

			}

			if ( material.emissive ) {

				uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

			}

			if ( material.map ) {

				uniforms.map.value = material.map;

			}

			if ( material.alphaMap ) {

				uniforms.alphaMap.value = material.alphaMap;

			}

			if ( material.specularMap ) {

				uniforms.specularMap.value = material.specularMap;

			}

			if ( material.envMap ) {

				uniforms.envMap.value = material.envMap;

				// don't flip CubeTexture envMaps, flip everything else:
				//  WebGLRenderTargetCube will be flipped for backwards compatibility
				//  WebGLRenderTargetCube.texture will be flipped because it's a Texture and NOT a CubeTexture
				// this check must be handled differently, or removed entirely, if WebGLRenderTargetCube uses a CubeTexture in the future
				uniforms.flipEnvMap.value = ( ! ( material.envMap && material.envMap.isCubeTexture ) ) ? 1 : - 1;

				uniforms.reflectivity.value = material.reflectivity;
				uniforms.refractionRatio.value = material.refractionRatio;

				uniforms.maxMipLevel.value = properties.get( material.envMap ).__maxMipLevel;

			}

			if ( material.lightMap ) {

				uniforms.lightMap.value = material.lightMap;
				uniforms.lightMapIntensity.value = material.lightMapIntensity;

			}

			if ( material.aoMap ) {

				uniforms.aoMap.value = material.aoMap;
				uniforms.aoMapIntensity.value = material.aoMapIntensity;

			}

			// uv repeat and offset setting priorities
			// 1. color map
			// 2. specular map
			// 3. normal map
			// 4. bump map
			// 5. alpha map
			// 6. emissive map

			var uvScaleMap;

			if ( material.map ) {

				uvScaleMap = material.map;

			} else if ( material.specularMap ) {

				uvScaleMap = material.specularMap;

			} else if ( material.displacementMap ) {

				uvScaleMap = material.displacementMap;

			} else if ( material.normalMap ) {

				uvScaleMap = material.normalMap;

			} else if ( material.bumpMap ) {

				uvScaleMap = material.bumpMap;

			} else if ( material.roughnessMap ) {

				uvScaleMap = material.roughnessMap;

			} else if ( material.metalnessMap ) {

				uvScaleMap = material.metalnessMap;

			} else if ( material.alphaMap ) {

				uvScaleMap = material.alphaMap;

			} else if ( material.emissiveMap ) {

				uvScaleMap = material.emissiveMap;

			}

			if ( uvScaleMap !== undefined ) {

				// backwards compatibility
				if ( uvScaleMap.isWebGLRenderTarget ) {

					uvScaleMap = uvScaleMap.texture;

				}

				if ( uvScaleMap.matrixAutoUpdate === true ) {

					uvScaleMap.updateMatrix();

				}

				uniforms.uvTransform.value.copy( uvScaleMap.matrix );

			}

		}

		function refreshUniformsLine( uniforms, material ) {

			uniforms.diffuse.value = material.color;
			uniforms.opacity.value = material.opacity;

		}

		function refreshUniformsDash( uniforms, material ) {

			uniforms.dashSize.value = material.dashSize;
			uniforms.totalSize.value = material.dashSize + material.gapSize;
			uniforms.scale.value = material.scale;

		}

		function refreshUniformsPoints( uniforms, material ) {

			uniforms.diffuse.value = material.color;
			uniforms.opacity.value = material.opacity;
			uniforms.size.value = material.size * _pixelRatio;
			uniforms.scale.value = _height * 0.5;

			uniforms.map.value = material.map;

			if ( material.map !== null ) {

				if ( material.map.matrixAutoUpdate === true ) {

					material.map.updateMatrix();

				}

				uniforms.uvTransform.value.copy( material.map.matrix );

			}

		}

		function refreshUniformsSprites( uniforms, material ) {

			uniforms.diffuse.value = material.color;
			uniforms.opacity.value = material.opacity;
			uniforms.rotation.value = material.rotation;
			uniforms.map.value = material.map;

			if ( material.map !== null ) {

				if ( material.map.matrixAutoUpdate === true ) {

					material.map.updateMatrix();

				}

				uniforms.uvTransform.value.copy( material.map.matrix );

			}

		}

		function refreshUniformsFog( uniforms, fog ) {

			uniforms.fogColor.value = fog.color;

			if ( fog.isFog ) {

				uniforms.fogNear.value = fog.near;
				uniforms.fogFar.value = fog.far;

			} else if ( fog.isFogExp2 ) {

				uniforms.fogDensity.value = fog.density;

			}

		}

		function refreshUniformsLambert( uniforms, material ) {

			if ( material.emissiveMap ) {

				uniforms.emissiveMap.value = material.emissiveMap;

			}

		}

		function refreshUniformsPhong( uniforms, material ) {

			uniforms.specular.value = material.specular;
			uniforms.shininess.value = Math.max( material.shininess, 1e-4 ); // to prevent pow( 0.0, 0.0 )

			if ( material.emissiveMap ) {

				uniforms.emissiveMap.value = material.emissiveMap;

			}

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;
				uniforms.bumpScale.value = material.bumpScale;
				if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;
				uniforms.normalScale.value.copy( material.normalScale );
				if ( material.side === BackSide ) uniforms.normalScale.value.negate();

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

		}

		function refreshUniformsToon( uniforms, material ) {

			refreshUniformsPhong( uniforms, material );

			if ( material.gradientMap ) {

				uniforms.gradientMap.value = material.gradientMap;

			}

		}

		function refreshUniformsStandard( uniforms, material ) {

			uniforms.roughness.value = material.roughness;
			uniforms.metalness.value = material.metalness;

			if ( material.roughnessMap ) {

				uniforms.roughnessMap.value = material.roughnessMap;

			}

			if ( material.metalnessMap ) {

				uniforms.metalnessMap.value = material.metalnessMap;

			}

			if ( material.emissiveMap ) {

				uniforms.emissiveMap.value = material.emissiveMap;

			}

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;
				uniforms.bumpScale.value = material.bumpScale;
				if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;
				uniforms.normalScale.value.copy( material.normalScale );
				if ( material.side === BackSide ) uniforms.normalScale.value.negate();

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

			if ( material.envMap ) {

				//uniforms.envMap.value = material.envMap; // part of uniforms common
				uniforms.envMapIntensity.value = material.envMapIntensity;

			}

		}

		function refreshUniformsPhysical( uniforms, material ) {

			refreshUniformsStandard( uniforms, material );

			uniforms.reflectivity.value = material.reflectivity; // also part of uniforms common

			uniforms.clearCoat.value = material.clearCoat;
			uniforms.clearCoatRoughness.value = material.clearCoatRoughness;

		}

		function refreshUniformsMatcap( uniforms, material ) {

			if ( material.matcap ) {

				uniforms.matcap.value = material.matcap;

			}

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;
				uniforms.bumpScale.value = material.bumpScale;
				if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;
				uniforms.normalScale.value.copy( material.normalScale );
				if ( material.side === BackSide ) uniforms.normalScale.value.negate();

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

		}

		function refreshUniformsDepth( uniforms, material ) {

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

		}

		function refreshUniformsDistance( uniforms, material ) {

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

			uniforms.referencePosition.value.copy( material.referencePosition );
			uniforms.nearDistance.value = material.nearDistance;
			uniforms.farDistance.value = material.farDistance;

		}

		function refreshUniformsNormal( uniforms, material ) {

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;
				uniforms.bumpScale.value = material.bumpScale;
				if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;
				uniforms.normalScale.value.copy( material.normalScale );
				if ( material.side === BackSide ) uniforms.normalScale.value.negate();

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

		}

		// If uniforms are marked as clean, they don't need to be loaded to the GPU.

		function markUniformsLightsNeedsUpdate( uniforms, value ) {

			uniforms.ambientLightColor.needsUpdate = value;

			uniforms.directionalLights.needsUpdate = value;
			uniforms.pointLights.needsUpdate = value;
			uniforms.spotLights.needsUpdate = value;
			uniforms.rectAreaLights.needsUpdate = value;
			uniforms.hemisphereLights.needsUpdate = value;

		}

		// Textures

		function allocTextureUnit() {

			var textureUnit = _usedTextureUnits;

			if ( textureUnit >= capabilities.maxTextures ) {

				console.warn( 'WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures );

			}

			_usedTextureUnits += 1;

			return textureUnit;

		}

		this.allocTextureUnit = allocTextureUnit;

		// this.setTexture2D = setTexture2D;
		this.setTexture2D = ( function () {

			var warned = false;

			// backwards compatibility: peel texture.texture
			return function setTexture2D( texture, slot ) {

				if ( texture && texture.isWebGLRenderTarget ) {

					if ( ! warned ) {

						console.warn( "WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead." );
						warned = true;

					}

					texture = texture.texture;

				}

				textures.setTexture2D( texture, slot );

			};

		}() );

		this.setTexture3D = ( function () {

			// backwards compatibility: peel texture.texture
			return function setTexture3D( texture, slot ) {

				textures.setTexture3D( texture, slot );

			};

		}() );

		this.setTexture = ( function () {

			var warned = false;

			return function setTexture( texture, slot ) {

				if ( ! warned ) {

					console.warn( "WebGLRenderer: .setTexture is deprecated, use setTexture2D instead." );
					warned = true;

				}

				textures.setTexture2D( texture, slot );

			};

		}() );

		this.setTextureCube = ( function () {

			var warned = false;

			return function setTextureCube( texture, slot ) {

				// backwards compatibility: peel texture.texture
				if ( texture && texture.isWebGLRenderTargetCube ) {

					if ( ! warned ) {

						console.warn( "WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead." );
						warned = true;

					}

					texture = texture.texture;

				}

				// currently relying on the fact that WebGLRenderTargetCube.texture is a Texture and NOT a CubeTexture
				// TODO: unify these code paths
				if ( ( texture && texture.isCubeTexture ) ||
					( Array.isArray( texture.image ) && texture.image.length === 6 ) ) {

					// CompressedTexture can have Array in image :/

					// this function alone should take care of cube textures
					textures.setTextureCube( texture, slot );

				} else {

					// assumed: texture property of WebGLRenderTargetCube

					textures.setTextureCubeDynamic( texture, slot );

				}

			};

		}() );

		//

		this.setFramebuffer = function ( value ) {

			_framebuffer = value;

		};

		this.getRenderTarget = function () {

			return _currentRenderTarget;

		};

		this.setRenderTarget = function ( renderTarget ) {

			_currentRenderTarget = renderTarget;

			if ( renderTarget && properties.get( renderTarget ).__webglFramebuffer === undefined ) {

				textures.setupRenderTarget( renderTarget );

			}

			var framebuffer = _framebuffer;
			var isCube = false;

			if ( renderTarget ) {

				var __webglFramebuffer = properties.get( renderTarget ).__webglFramebuffer;

				if ( renderTarget.isWebGLRenderTargetCube ) {

					framebuffer = __webglFramebuffer[ renderTarget.activeCubeFace ];
					isCube = true;

				} else {

					framebuffer = __webglFramebuffer;

				}

				_currentViewport.copy( renderTarget.viewport );
				_currentScissor.copy( renderTarget.scissor );
				_currentScissorTest = renderTarget.scissorTest;

			} else {

				_currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio );
				_currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio );
				_currentScissorTest = _scissorTest;

			}

			if ( _currentFramebuffer !== framebuffer ) {

				_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
				_currentFramebuffer = framebuffer;

			}

			state.viewport( _currentViewport );
			state.scissor( _currentScissor );
			state.setScissorTest( _currentScissorTest );

			if ( isCube ) {

				var textureProperties = properties.get( renderTarget.texture );
				_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderTarget.activeCubeFace, textureProperties.__webglTexture, renderTarget.activeMipMapLevel );

			}

		};

		this.readRenderTargetPixels = function ( renderTarget, x, y, width, height, buffer ) {

			if ( ! ( renderTarget && renderTarget.isWebGLRenderTarget ) ) {

				console.error( 'WebGLRenderer.readRenderTargetPixels: renderTarget is not WebGLRenderTarget.' );
				return;

			}

			var framebuffer = properties.get( renderTarget ).__webglFramebuffer;

			if ( framebuffer ) {

				var restore = false;

				if ( framebuffer !== _currentFramebuffer ) {

					_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );

					restore = true;

				}

				try {

					var texture = renderTarget.texture;
					var textureFormat = texture.format;
					var textureType = texture.type;

					if ( textureFormat !== RGBAFormat && utils.convert( textureFormat ) !== _gl.getParameter( _gl.IMPLEMENTATION_COLOR_READ_FORMAT ) ) {

						console.error( 'WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.' );
						return;

					}

					if ( textureType !== UnsignedByteType && utils.convert( textureType ) !== _gl.getParameter( _gl.IMPLEMENTATION_COLOR_READ_TYPE ) && // IE11, Edge and Chrome Mac < 52 (#9513)
						! ( textureType === FloatType && ( capabilities.isWebGL2 || extensions.get( 'OES_texture_float' ) || extensions.get( 'WEBGL_color_buffer_float' ) ) ) && // Chrome Mac >= 52 and Firefox
						! ( textureType === HalfFloatType && ( capabilities.isWebGL2 ? extensions.get( 'EXT_color_buffer_float' ) : extensions.get( 'EXT_color_buffer_half_float' ) ) ) ) {

						console.error( 'WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.' );
						return;

					}

					if ( _gl.checkFramebufferStatus( _gl.FRAMEBUFFER ) === _gl.FRAMEBUFFER_COMPLETE ) {

						// the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)

						if ( ( x >= 0 && x <= ( renderTarget.width - width ) ) && ( y >= 0 && y <= ( renderTarget.height - height ) ) ) {

							_gl.readPixels( x, y, width, height, utils.convert( textureFormat ), utils.convert( textureType ), buffer );

						}

					} else {

						console.error( 'WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.' );

					}

				} finally {

					if ( restore ) {

						_gl.bindFramebuffer( _gl.FRAMEBUFFER, _currentFramebuffer );

					}

				}

			}

		};

		this.copyFramebufferToTexture = function ( position, texture, level ) {

			var width = texture.image.width;
			var height = texture.image.height;
			var glFormat = utils.convert( texture.format );

			this.setTexture2D( texture, 0 );

			_gl.copyTexImage2D( _gl.TEXTURE_2D, level || 0, glFormat, position.x, position.y, width, height, 0 );

		};

		this.copyTextureToTexture = function ( position, srcTexture, dstTexture, level ) {

			var width = srcTexture.image.width;
			var height = srcTexture.image.height;
			var glFormat = utils.convert( dstTexture.format );
			var glType = utils.convert( dstTexture.type );

			this.setTexture2D( dstTexture, 0 );

			if ( srcTexture.isDataTexture ) {

				_gl.texSubImage2D( _gl.TEXTURE_2D, level || 0, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data );

			} else {

				_gl.texSubImage2D( _gl.TEXTURE_2D, level || 0, position.x, position.y, glFormat, glType, srcTexture.image );

			}

		};

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function DepthTexture( width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format ) {

		format = format !== undefined ? format : DepthFormat;

		if ( format !== DepthFormat && format !== DepthStencilFormat ) {

			throw new Error( 'DepthTexture format must be either DepthFormat or DepthStencilFormat' );

		}

		if ( type === undefined && format === DepthFormat ) type = UnsignedShortType;
		if ( type === undefined && format === DepthStencilFormat ) type = UnsignedInt248Type;

		Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

		this.image = { width: width, height: height };

		this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
		this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;

		this.flipY = false;
		this.generateMipmaps	= false;

	}

	DepthTexture.prototype = Object.create( Texture.prototype );
	DepthTexture.prototype.constructor = DepthTexture;
	DepthTexture.prototype.isDepthTexture = true;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var Pass = function () {

		// if set to true, the pass is processed by the composer
		this.enabled = true;

		// if set to true, the pass indicates to swap read and write buffer after rendering
		this.needsSwap = true;

		// if set to true, the pass clears its buffer before rendering
		this.clear = false;

		// if set to true, the result of the pass is rendered to screen
		this.renderToScreen = false;

	};

	Object.assign( Pass.prototype, {

		setSize: function ( width, height ) {},

		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			console.error( 'Pass: .render() must be implemented in derived pass.' );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

		Pass.call( this );

		this.scene = scene;
		this.camera = camera;

		this.overrideMaterial = overrideMaterial;

		this.clearColor = clearColor;
		this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

		this.clear = true;
		this.clearDepth = false;
		this.needsSwap = false;

	};

	RenderPass.prototype = Object.assign( Object.create( Pass.prototype ), {

		constructor: RenderPass,

		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			var oldAutoClear = renderer.autoClear;
			renderer.autoClear = false;

			this.scene.overrideMaterial = this.overrideMaterial;

			var oldClearColor, oldClearAlpha;

			if ( this.clearColor ) {

				oldClearColor = renderer.getClearColor().getHex();
				oldClearAlpha = renderer.getClearAlpha();

				renderer.setClearColor( this.clearColor, this.clearAlpha );

			}

			if ( this.clearDepth ) {

				renderer.clearDepth();

			}

			renderer.render( this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear );

			if ( this.clearColor ) {

				renderer.setClearColor( oldClearColor, oldClearAlpha );

			}

			this.scene.overrideMaterial = null;
			renderer.autoClear = oldAutoClear;
		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function OrthographicCamera( left, right, top, bottom, near, far ) {

		Camera.call( this );

		this.type = 'OrthographicCamera';

		this.zoom = 1;
		this.view = null;

		this.left = ( left !== undefined ) ? left : - 1;
		this.right = ( right !== undefined ) ? right : 1;
		this.top = ( top !== undefined ) ? top : 1;
		this.bottom = ( bottom !== undefined ) ? bottom : - 1;

		this.near = ( near !== undefined ) ? near : 0.1;
		this.far = ( far !== undefined ) ? far : 2000;

		this.updateProjectionMatrix();

	}

	OrthographicCamera.prototype = Object.assign( Object.create( Camera.prototype ), {

		constructor: OrthographicCamera,

		isOrthographicCamera: true,

		copy: function ( source, recursive ) {

			Camera.prototype.copy.call( this, source, recursive );

			this.left = source.left;
			this.right = source.right;
			this.top = source.top;
			this.bottom = source.bottom;
			this.near = source.near;
			this.far = source.far;

			this.zoom = source.zoom;
			this.view = source.view === null ? null : Object.assign( {}, source.view );

			return this;

		},

		setViewOffset: function ( fullWidth, fullHeight, x, y, width, height ) {

			if ( this.view === null ) {

				this.view = {
					enabled: true,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				};

			}

			this.view.enabled = true;
			this.view.fullWidth = fullWidth;
			this.view.fullHeight = fullHeight;
			this.view.offsetX = x;
			this.view.offsetY = y;
			this.view.width = width;
			this.view.height = height;

			this.updateProjectionMatrix();

		},

		clearViewOffset: function () {

			if ( this.view !== null ) {

				this.view.enabled = false;

			}

			this.updateProjectionMatrix();

		},

		updateProjectionMatrix: function () {

			var dx = ( this.right - this.left ) / ( 2 * this.zoom );
			var dy = ( this.top - this.bottom ) / ( 2 * this.zoom );
			var cx = ( this.right + this.left ) / 2;
			var cy = ( this.top + this.bottom ) / 2;

			var left = cx - dx;
			var right = cx + dx;
			var top = cy + dy;
			var bottom = cy - dy;

			if ( this.view !== null && this.view.enabled ) {

				var zoomW = this.zoom / ( this.view.width / this.view.fullWidth );
				var zoomH = this.zoom / ( this.view.height / this.view.fullHeight );
				var scaleW = ( this.right - this.left ) / this.view.width;
				var scaleH = ( this.top - this.bottom ) / this.view.height;

				left += scaleW * ( this.view.offsetX / zoomW );
				right = left + scaleW * ( this.view.width / zoomW );
				top -= scaleH * ( this.view.offsetY / zoomH );
				bottom = top - scaleH * ( this.view.height / zoomH );

			}

			this.projectionMatrix.makeOrthographic( left, right, top, bottom, this.near, this.far );

			this.projectionMatrixInverse.getInverse( this.projectionMatrix );

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			data.object.zoom = this.zoom;
			data.object.left = this.left;
			data.object.right = this.right;
			data.object.top = this.top;
			data.object.bottom = this.bottom;
			data.object.near = this.near;
			data.object.far = this.far;

			if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

			return data;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Scene() {

		Object3D.call( this );

		this.type = 'Scene';

		this.background = null;
		this.fog = null;
		this.overrideMaterial = null;

		this.autoUpdate = true; // checked by the renderer

	}

	Scene.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Scene,

		copy: function ( source, recursive ) {

			Object3D.prototype.copy.call( this, source, recursive );

			if ( source.background !== null ) this.background = source.background.clone();
			if ( source.fog !== null ) this.fog = source.fog.clone();
			if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

			this.autoUpdate = source.autoUpdate;
			this.matrixAutoUpdate = source.matrixAutoUpdate;

			return this;

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			if ( this.background !== null ) data.object.background = this.background.toJSON( meta );
			if ( this.fog !== null ) data.object.fog = this.fog.toJSON();

			return data;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ShaderPass = function ( shader, textureID ) {

		Pass.call( this );

		this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

		if ( shader instanceof ShaderMaterial ) {

			this.uniforms = shader.uniforms;

			this.material = shader;

		} else if ( shader ) {

			this.uniforms = UniformsUtils.clone( shader.uniforms );

			this.material = new ShaderMaterial( {

				defines: Object.assign( {}, shader.defines ),
				uniforms: this.uniforms,
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader

			} );

		}

		this.camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
		this.scene = new Scene();

		this.quad = new Mesh( new PlaneBufferGeometry( 2, 2 ), null );
		this.quad.frustumCulled = false; // Avoid getting clipped
		this.scene.add( this.quad );

	};

	ShaderPass.prototype = Object.assign( Object.create( Pass.prototype ), {

		constructor: ShaderPass,

		render: function( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			if ( this.uniforms[ this.textureID ] ) {

				this.uniforms[ this.textureID ].value = readBuffer.texture;

			}

			this.quad.material = this.material;

			if ( this.renderToScreen ) {

				renderer.render( this.scene, this.camera );

			} else {

				renderer.render( this.scene, this.camera, writeBuffer, this.clear );

			}

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var MaskPass = function ( scene, camera ) {

		Pass.call( this );

		this.scene = scene;
		this.camera = camera;

		this.clear = true;
		this.needsSwap = false;

		this.inverse = false;

	};

	MaskPass.prototype = Object.assign( Object.create( Pass.prototype ), {

		constructor: MaskPass,

		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			var context = renderer.context;
			var state = renderer.state;

			// don't update color or depth

			state.buffers.color.setMask( false );
			state.buffers.depth.setMask( false );

			// lock buffers

			state.buffers.color.setLocked( true );
			state.buffers.depth.setLocked( true );

			// set up stencil

			var writeValue, clearValue;

			if ( this.inverse ) {

				writeValue = 0;
				clearValue = 1;

			} else {

				writeValue = 1;
				clearValue = 0;

			}

			state.buffers.stencil.setTest( true );
			state.buffers.stencil.setOp( context.REPLACE, context.REPLACE, context.REPLACE );
			state.buffers.stencil.setFunc( context.ALWAYS, writeValue, 0xffffffff );
			state.buffers.stencil.setClear( clearValue );

			// draw into the stencil buffer

			renderer.render( this.scene, this.camera, readBuffer, this.clear );
			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

			// unlock color and depth buffer for subsequent rendering

			state.buffers.color.setLocked( false );
			state.buffers.depth.setLocked( false );

			// only render where stencil is set to 1

			state.buffers.stencil.setFunc( context.EQUAL, 1, 0xffffffff );  // draw if == 1
			state.buffers.stencil.setOp( context.KEEP, context.KEEP, context.KEEP );

		}

	} );
	var ClearMaskPass = function () {

		Pass.call( this );

		this.needsSwap = false;

	};

	ClearMaskPass.prototype = Object.create( Pass.prototype );

	Object.assign( ClearMaskPass.prototype, {

		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			renderer.state.buffers.stencil.setTest( false );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var CopyShader = {

		uniforms: {

			"tDiffuse": { value: null },
			"opacity":  { value: 1.0 }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform float opacity;",

			"uniform sampler2D tDiffuse;",

			"varying vec2 vUv;",

			"void main() {",

				"vec4 texel = texture2D( tDiffuse, vUv );",
				"gl_FragColor = opacity * texel;",

			"}"

		].join( "\n" )

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var EffectComposer = function ( renderer, renderTarget ) {

		this.renderer = renderer;

		if ( renderTarget === undefined ) {

			var parameters = {
				minFilter: LinearFilter,
				magFilter: LinearFilter,
				format: RGBAFormat,
				stencilBuffer: false
			};

			var size = renderer.getDrawingBufferSize();
			renderTarget = new WebGLRenderTarget( size.width, size.height, parameters );
			renderTarget.texture.name = 'EffectComposer.rt1';

		}

		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();
		this.renderTarget2.texture.name = 'EffectComposer.rt2';

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

		this.passes = [];

		// dependencies

		if ( CopyShader === undefined ) {

			console.error( 'EffectComposer relies on CopyShader' );

		}

		if ( ShaderPass === undefined ) {

			console.error( 'EffectComposer relies on ShaderPass' );

		}

		this.copyPass = new ShaderPass( CopyShader );

	};

	Object.assign( EffectComposer.prototype, {

		swapBuffers: function () {

			var tmp = this.readBuffer;
			this.readBuffer = this.writeBuffer;
			this.writeBuffer = tmp;

		},

		addPass: function ( pass ) {

			this.passes.push( pass );

			var size = this.renderer.getDrawingBufferSize();
			pass.setSize( size.width, size.height );

		},

		insertPass: function ( pass, index ) {

			this.passes.splice( index, 0, pass );

		},

		render: function ( delta ) {

			var maskActive = false;

			var pass, i, il = this.passes.length;

			for ( i = 0; i < il; i ++ ) {

				pass = this.passes[ i ];

				if ( pass.enabled === false ) continue;

				pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );

				if ( pass.needsSwap ) {

					if ( maskActive ) {

						var context = this.renderer.context;

						context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

						this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );

						context.stencilFunc( context.EQUAL, 1, 0xffffffff );

					}

					this.swapBuffers();

				}

				if ( MaskPass !== undefined ) {

					if ( pass instanceof MaskPass ) {

						maskActive = true;

					} else if ( pass instanceof ClearMaskPass ) {

						maskActive = false;

					}

				}

			}

		},

		reset: function ( renderTarget ) {

			if ( renderTarget === undefined ) {

				var size = this.renderer.getDrawingBufferSize();

				renderTarget = this.renderTarget1.clone();
				renderTarget.setSize( size.width, size.height );

			}

			this.renderTarget1.dispose();
			this.renderTarget2.dispose();
			this.renderTarget1 = renderTarget;
			this.renderTarget2 = renderTarget.clone();

			this.writeBuffer = this.renderTarget1;
			this.readBuffer = this.renderTarget2;

		},

		setSize: function ( width, height ) {

			this.renderTarget1.setSize( width, height );
			this.renderTarget2.setSize( width, height );

			for ( var i = 0; i < this.passes.length; i ++ ) {

				this.passes[ i ].setSize( width, height );

			}

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SphereGeometry

	function SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

		Geometry.call( this );

		this.type = 'SphereGeometry';

		this.parameters = {
			radius: radius,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			phiStart: phiStart,
			phiLength: phiLength,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		this.fromBufferGeometry( new SphereBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) );
		this.mergeVertices();

	}

	SphereGeometry.prototype = Object.create( Geometry.prototype );
	SphereGeometry.prototype.constructor = SphereGeometry;

	// SphereBufferGeometry

	function SphereBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

		BufferGeometry.call( this );

		this.type = 'SphereBufferGeometry';

		this.parameters = {
			radius: radius,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			phiStart: phiStart,
			phiLength: phiLength,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		radius = radius || 1;

		widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
		heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

		phiStart = phiStart !== undefined ? phiStart : 0;
		phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

		thetaStart = thetaStart !== undefined ? thetaStart : 0;
		thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

		var thetaEnd = thetaStart + thetaLength;

		var ix, iy;

		var index = 0;
		var grid = [];

		var vertex = new Vector3();
		var normal = new Vector3();

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// generate vertices, normals and uvs

		for ( iy = 0; iy <= heightSegments; iy ++ ) {

			var verticesRow = [];

			var v = iy / heightSegments;

			for ( ix = 0; ix <= widthSegments; ix ++ ) {

				var u = ix / widthSegments;

				// vertex

				vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
				vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
				vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal

				normal.set( vertex.x, vertex.y, vertex.z ).normalize();
				normals.push( normal.x, normal.y, normal.z );

				// uv

				uvs.push( u, 1 - v );

				verticesRow.push( index ++ );

			}

			grid.push( verticesRow );

		}

		// indices

		for ( iy = 0; iy < heightSegments; iy ++ ) {

			for ( ix = 0; ix < widthSegments; ix ++ ) {

				var a = grid[ iy ][ ix + 1 ];
				var b = grid[ iy ][ ix ];
				var c = grid[ iy + 1 ][ ix ];
				var d = grid[ iy + 1 ][ ix + 1 ];

				if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d );
				if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	SphereBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	SphereBufferGeometry.prototype.constructor = SphereBufferGeometry;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Uniform( value ) {

		if ( typeof value === 'string' ) {

			console.warn( 'Uniform: Type parameter is no longer needed.' );
			value = arguments[ 1 ];

		}

		this.value = value;

	}

	Uniform.prototype.clone = function () {

		return new Uniform( this.value.clone === undefined ? this.value : this.value.clone() );

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var FXAAShader = {

		uniforms: {

			"tDiffuse":   { value: null },
			"resolution": { value: new Vector2( 1 / 1024, 1 / 512 ) }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [
	        "precision highp float;",
	        "",
	        "uniform sampler2D tDiffuse;",
	        "",
	        "uniform vec2 resolution;",
	        "",
	        "varying vec2 vUv;",
	        "",
	        "// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)",
	        "",
	        "//----------------------------------------------------------------------------------",
	        "// File:        es3-kepler\FXAA\assets\shaders/FXAA_DefaultES.frag",
	        "// SDK Version: v3.00",
	        "// Email:       gameworks@nvidia.com",
	        "// Site:        http://developer.nvidia.com/",
	        "//",
	        "// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.",
	        "//",
	        "// Redistribution and use in source and binary forms, with or without",
	        "// modification, are permitted provided that the following conditions",
	        "// are met:",
	        "//  * Redistributions of source code must retain the above copyright",
	        "//    notice, this list of conditions and the following disclaimer.",
	        "//  * Redistributions in binary form must reproduce the above copyright",
	        "//    notice, this list of conditions and the following disclaimer in the",
	        "//    documentation and/or other materials provided with the distribution.",
	        "//  * Neither the name of NVIDIA CORPORATION nor the names of its",
	        "//    contributors may be used to endorse or promote products derived",
	        "//    from this software without specific prior written permission.",
	        "//",
	        "// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ``AS IS'' AND ANY",
	        "// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE",
	        "// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR",
	        "// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR",
	        "// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,",
	        "// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,",
	        "// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR",
	        "// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY",
	        "// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT",
	        "// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE",
	        "// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.",
	        "//",
	        "//----------------------------------------------------------------------------------",
	        "",
	        "#define FXAA_PC 1",
	        "#define FXAA_GLSL_100 1",
	        "#define FXAA_QUALITY_PRESET 12",
	        "",
	        "#define FXAA_GREEN_AS_LUMA 1",
	        "",
	        "",
	        "#ifndef FXAA_PC_CONSOLE",
	        "    //",
	        "    // The console algorithm for PC is included",
	        "    // for developers targeting really low spec machines.",
	        "    // Likely better to just run FXAA_PC, and use a really low preset.",
	        "    //",
	        "    #define FXAA_PC_CONSOLE 0",
	        "#endif",
	        "",
	        "#ifndef FXAA_GLSL_120",
	        "    #define FXAA_GLSL_120 0",
	        "#endif",
	        "",
	        "#ifndef FXAA_GLSL_130",
	        "    #define FXAA_GLSL_130 0",
	        "#endif",
	        "",
	        "#ifndef FXAA_HLSL_3",
	        "    #define FXAA_HLSL_3 0",
	        "#endif",
	        "",
	        "#ifndef FXAA_HLSL_4",
	        "    #define FXAA_HLSL_4 0",
	        "#endif",
	        "",
	        "#ifndef FXAA_HLSL_5",
	        "    #define FXAA_HLSL_5 0",
	        "#endif",
	        "",
	        "#ifndef FXAA_GREEN_AS_LUMA",
	        "    //",
	        "    // For those using non-linear color,",
	        "    // and either not able to get luma in alpha, or not wanting to,",
	        "    // this enables FXAA to run using green as a proxy for luma.",
	        "    // So with this enabled, no need to pack luma in alpha.",
	        "    //",
	        "    // This will turn off AA on anything which lacks some amount of green.",
	        "    // Pure red and blue or combination of only R and B, will get no AA.",
	        "    //",
	        "    // Might want to lower the settings for both,",
	        "    //    fxaaConsoleEdgeThresholdMin",
	        "    //    fxaaQualityEdgeThresholdMin",
	        "    // In order to insure AA does not get turned off on colors",
	        "    // which contain a minor amount of green.",
	        "    //",
	        "    // 1 = On.",
	        "    // 0 = Off.",
	        "    //",
	        "    #define FXAA_GREEN_AS_LUMA 0",
	        "#endif",
	        "",
	        "#ifndef FXAA_EARLY_EXIT",
	        "    //",
	        "    // Controls algorithm's early exit path.",
	        "    // On PS3 turning this ON adds 2 cycles to the shader.",
	        "    // On 360 turning this OFF adds 10ths of a millisecond to the shader.",
	        "    // Turning this off on console will result in a more blurry image.",
	        "    // So this defaults to on.",
	        "    //",
	        "    // 1 = On.",
	        "    // 0 = Off.",
	        "    //",
	        "    #define FXAA_EARLY_EXIT 1",
	        "#endif",
	        "",
	        "#ifndef FXAA_DISCARD",
	        "    //",
	        "    // Only valid for PC OpenGL currently.",
	        "    // Probably will not work when FXAA_GREEN_AS_LUMA = 1.",
	        "    //",
	        "    // 1 = Use discard on pixels which don't need AA.",
	        "    //     For APIs which enable concurrent TEX+ROP from same surface.",
	        "    // 0 = Return unchanged color on pixels which don't need AA.",
	        "    //",
	        "    #define FXAA_DISCARD 0",
	        "#endif",
	        "",
	        "#ifndef FXAA_FAST_PIXEL_OFFSET",
	        "    //",
	        "    // Used for GLSL 120 only.",
	        "    //",
	        "    // 1 = GL API supports fast pixel offsets",
	        "    // 0 = do not use fast pixel offsets",
	        "    //",
	        "    #ifdef GL_EXT_gpu_shader4",
	        "        #define FXAA_FAST_PIXEL_OFFSET 1",
	        "    #endif",
	        "    #ifdef GL_NV_gpu_shader5",
	        "        #define FXAA_FAST_PIXEL_OFFSET 1",
	        "    #endif",
	        "    #ifdef GL_ARB_gpu_shader5",
	        "        #define FXAA_FAST_PIXEL_OFFSET 1",
	        "    #endif",
	        "    #ifndef FXAA_FAST_PIXEL_OFFSET",
	        "        #define FXAA_FAST_PIXEL_OFFSET 0",
	        "    #endif",
	        "#endif",
	        "",
	        "#ifndef FXAA_GATHER4_ALPHA",
	        "    //",
	        "    // 1 = API supports gather4 on alpha channel.",
	        "    // 0 = API does not support gather4 on alpha channel.",
	        "    //",
	        "    #if (FXAA_HLSL_5 == 1)",
	        "        #define FXAA_GATHER4_ALPHA 1",
	        "    #endif",
	        "    #ifdef GL_ARB_gpu_shader5",
	        "        #define FXAA_GATHER4_ALPHA 1",
	        "    #endif",
	        "    #ifdef GL_NV_gpu_shader5",
	        "        #define FXAA_GATHER4_ALPHA 1",
	        "    #endif",
	        "    #ifndef FXAA_GATHER4_ALPHA",
	        "        #define FXAA_GATHER4_ALPHA 0",
	        "    #endif",
	        "#endif",
	        "",
	        "",
	        "",
	        "#ifndef FXAA_QUALITY_PRESET",
	        "    //",
	        "    // Choose the quality preset.",
	        "    // This needs to be compiled into the shader as it effects code.",
	        "    // Best option to include multiple presets is to",
	        "    // in each shader define the preset, then include this file.",
	        "    //",
	        "    // OPTIONS",
	        "    // -----------------------------------------------------------------------",
	        "    // 10 to 15 - default medium dither (10=fastest, 15=highest quality)",
	        "    // 20 to 29 - less dither, more expensive (20=fastest, 29=highest quality)",
	        "    // 39       - no dither, very expensive",
	        "    //",
	        "    // NOTES",
	        "    // -----------------------------------------------------------------------",
	        "    // 12 = slightly faster then FXAA 3.9 and higher edge quality (default)",
	        "    // 13 = about same speed as FXAA 3.9 and better than 12",
	        "    // 23 = closest to FXAA 3.9 visually and performance wise",
	        "    //  _ = the lowest digit is directly related to performance",
	        "    // _  = the highest digit is directly related to style",
	        "    //",
	        "    #define FXAA_QUALITY_PRESET 12",
	        "#endif",
	        "",
	        "",
	        "",
	        "",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 10)",
	        "    #define FXAA_QUALITY_PS 3",
	        "    #define FXAA_QUALITY_P0 1.5",
	        "    #define FXAA_QUALITY_P1 3.0",
	        "    #define FXAA_QUALITY_P2 12.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 11)",
	        "    #define FXAA_QUALITY_PS 4",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 3.0",
	        "    #define FXAA_QUALITY_P3 12.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 12)",
	        "    #define FXAA_QUALITY_PS 5",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 4.0",
	        "    #define FXAA_QUALITY_P4 12.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 13)",
	        "    #define FXAA_QUALITY_PS 6",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 4.0",
	        "    #define FXAA_QUALITY_P5 12.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 14)",
	        "    #define FXAA_QUALITY_PS 7",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 4.0",
	        "    #define FXAA_QUALITY_P6 12.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 15)",
	        "    #define FXAA_QUALITY_PS 8",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 2.0",
	        "    #define FXAA_QUALITY_P6 4.0",
	        "    #define FXAA_QUALITY_P7 12.0",
	        "#endif",
	        "",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 20)",
	        "    #define FXAA_QUALITY_PS 3",
	        "    #define FXAA_QUALITY_P0 1.5",
	        "    #define FXAA_QUALITY_P1 2.0",
	        "    #define FXAA_QUALITY_P2 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 21)",
	        "    #define FXAA_QUALITY_PS 4",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 22)",
	        "    #define FXAA_QUALITY_PS 5",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 23)",
	        "    #define FXAA_QUALITY_PS 6",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 24)",
	        "    #define FXAA_QUALITY_PS 7",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 3.0",
	        "    #define FXAA_QUALITY_P6 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 25)",
	        "    #define FXAA_QUALITY_PS 8",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 2.0",
	        "    #define FXAA_QUALITY_P6 4.0",
	        "    #define FXAA_QUALITY_P7 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 26)",
	        "    #define FXAA_QUALITY_PS 9",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 2.0",
	        "    #define FXAA_QUALITY_P6 2.0",
	        "    #define FXAA_QUALITY_P7 4.0",
	        "    #define FXAA_QUALITY_P8 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 27)",
	        "    #define FXAA_QUALITY_PS 10",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 2.0",
	        "    #define FXAA_QUALITY_P6 2.0",
	        "    #define FXAA_QUALITY_P7 2.0",
	        "    #define FXAA_QUALITY_P8 4.0",
	        "    #define FXAA_QUALITY_P9 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 28)",
	        "    #define FXAA_QUALITY_PS 11",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 2.0",
	        "    #define FXAA_QUALITY_P6 2.0",
	        "    #define FXAA_QUALITY_P7 2.0",
	        "    #define FXAA_QUALITY_P8 2.0",
	        "    #define FXAA_QUALITY_P9 4.0",
	        "    #define FXAA_QUALITY_P10 8.0",
	        "#endif",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 29)",
	        "    #define FXAA_QUALITY_PS 12",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.5",
	        "    #define FXAA_QUALITY_P2 2.0",
	        "    #define FXAA_QUALITY_P3 2.0",
	        "    #define FXAA_QUALITY_P4 2.0",
	        "    #define FXAA_QUALITY_P5 2.0",
	        "    #define FXAA_QUALITY_P6 2.0",
	        "    #define FXAA_QUALITY_P7 2.0",
	        "    #define FXAA_QUALITY_P8 2.0",
	        "    #define FXAA_QUALITY_P9 2.0",
	        "    #define FXAA_QUALITY_P10 4.0",
	        "    #define FXAA_QUALITY_P11 8.0",
	        "#endif",
	        "",
	        "",
	        "#if (FXAA_QUALITY_PRESET == 39)",
	        "    #define FXAA_QUALITY_PS 12",
	        "    #define FXAA_QUALITY_P0 1.0",
	        "    #define FXAA_QUALITY_P1 1.0",
	        "    #define FXAA_QUALITY_P2 1.0",
	        "    #define FXAA_QUALITY_P3 1.0",
	        "    #define FXAA_QUALITY_P4 1.0",
	        "    #define FXAA_QUALITY_P5 1.5",
	        "    #define FXAA_QUALITY_P6 2.0",
	        "    #define FXAA_QUALITY_P7 2.0",
	        "    #define FXAA_QUALITY_P8 2.0",
	        "    #define FXAA_QUALITY_P9 2.0",
	        "    #define FXAA_QUALITY_P10 4.0",
	        "    #define FXAA_QUALITY_P11 8.0",
	        "#endif",
	        "",
	        "",
	        "",
	        "",
	        "#if (FXAA_GLSL_100 == 1) || (FXAA_GLSL_120 == 1) || (FXAA_GLSL_130 == 1)",
	        "    #define FxaaBool bool",
	        "    #define FxaaDiscard discard",
	        "    #define FxaaFloat float",
	        "    #define FxaaFloat2 vec2",
	        "    #define FxaaFloat3 vec3",
	        "    #define FxaaFloat4 vec4",
	        "    #define FxaaHalf float",
	        "    #define FxaaHalf2 vec2",
	        "    #define FxaaHalf3 vec3",
	        "    #define FxaaHalf4 vec4",
	        "    #define FxaaInt2 ivec2",
	        "    #define FxaaSat(x) clamp(x, 0.0, 1.0)",
	        "    #define FxaaTex sampler2D",
	        "#else",
	        "    #define FxaaBool bool",
	        "    #define FxaaDiscard clip(-1)",
	        "    #define FxaaFloat float",
	        "    #define FxaaFloat2 float2",
	        "    #define FxaaFloat3 float3",
	        "    #define FxaaFloat4 float4",
	        "    #define FxaaHalf half",
	        "    #define FxaaHalf2 half2",
	        "    #define FxaaHalf3 half3",
	        "    #define FxaaHalf4 half4",
	        "    #define FxaaSat(x) saturate(x)",
	        "#endif",
	        "",
	        "#if (FXAA_GLSL_100 == 1)",
	        "  #define FxaaTexTop(t, p) texture2D(t, p, 0.0)",
	        "  #define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), 0.0)",
	        "#endif",
	        "",
	        "#if (FXAA_GLSL_120 == 1)",
	        "    // Requires,",
	        "    //  #version 120",
	        "    // And at least,",
	        "    //  #extension GL_EXT_gpu_shader4 : enable",
	        "    //  (or set FXAA_FAST_PIXEL_OFFSET 1 to work like DX9)",
	        "    #define FxaaTexTop(t, p) texture2DLod(t, p, 0.0)",
	        "    #if (FXAA_FAST_PIXEL_OFFSET == 1)",
	        "        #define FxaaTexOff(t, p, o, r) texture2DLodOffset(t, p, 0.0, o)",
	        "    #else",
	        "        #define FxaaTexOff(t, p, o, r) texture2DLod(t, p + (o * r), 0.0)",
	        "    #endif",
	        "    #if (FXAA_GATHER4_ALPHA == 1)",
	        "        // use #extension GL_ARB_gpu_shader5 : enable",
	        "        #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)",
	        "        #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)",
	        "        #define FxaaTexGreen4(t, p) textureGather(t, p, 1)",
	        "        #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)",
	        "    #endif",
	        "#endif",
	        "",
	        "#if (FXAA_GLSL_130 == 1)",
	        "    // Requires \"#version 130\" or better",
	        "    #define FxaaTexTop(t, p) textureLod(t, p, 0.0)",
	        "    #define FxaaTexOff(t, p, o, r) textureLodOffset(t, p, 0.0, o)",
	        "    #if (FXAA_GATHER4_ALPHA == 1)",
	        "        // use #extension GL_ARB_gpu_shader5 : enable",
	        "        #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)",
	        "        #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)",
	        "        #define FxaaTexGreen4(t, p) textureGather(t, p, 1)",
	        "        #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)",
	        "    #endif",
	        "#endif",
	        "",
	        "#if (FXAA_HLSL_3 == 1)",
	        "    #define FxaaInt2 float2",
	        "    #define FxaaTex sampler2D",
	        "    #define FxaaTexTop(t, p) tex2Dlod(t, float4(p, 0.0, 0.0))",
	        "    #define FxaaTexOff(t, p, o, r) tex2Dlod(t, float4(p + (o * r), 0, 0))",
	        "#endif",
	        "",
	        "#if (FXAA_HLSL_4 == 1)",
	        "    #define FxaaInt2 int2",
	        "    struct FxaaTex { SamplerState smpl; Texture2D tex; };",
	        "    #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)",
	        "    #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)",
	        "#endif",
	        "",
	        "#if (FXAA_HLSL_5 == 1)",
	        "    #define FxaaInt2 int2",
	        "    struct FxaaTex { SamplerState smpl; Texture2D tex; };",
	        "    #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)",
	        "    #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)",
	        "    #define FxaaTexAlpha4(t, p) t.tex.GatherAlpha(t.smpl, p)",
	        "    #define FxaaTexOffAlpha4(t, p, o) t.tex.GatherAlpha(t.smpl, p, o)",
	        "    #define FxaaTexGreen4(t, p) t.tex.GatherGreen(t.smpl, p)",
	        "    #define FxaaTexOffGreen4(t, p, o) t.tex.GatherGreen(t.smpl, p, o)",
	        "#endif",
	        "",
	        "",
	        "",
	        "#if (FXAA_GREEN_AS_LUMA == 0)",
	        "    FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.w; }",
	        "#else",
	        "    FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.y; }",
	        "#endif",
	        "",
	        "",
	        "",
	        "",
	        "",
	        "#if (FXAA_PC == 1)",
	        "",
	        "FxaaFloat4 FxaaPixelShader(",
	        "    //",
	        "    // Use noperspective interpolation here (turn off perspective interpolation).",
	        "    // {xy} = center of pixel",
	        "    FxaaFloat2 pos,",
	        "    //",
	        "    // Used only for FXAA Console, and not used on the 360 version.",
	        "    // Use noperspective interpolation here (turn off perspective interpolation).",
	        "    // {xy_} = upper left of pixel",
	        "    // {_zw} = lower right of pixel",
	        "    FxaaFloat4 fxaaConsolePosPos,",
	        "    //",
	        "    // Input color texture.",
	        "    // {rgb_} = color in linear or perceptual color space",
	        "    // if (FXAA_GREEN_AS_LUMA == 0)",
	        "    //     {__a} = luma in perceptual color space (not linear)",
	        "    FxaaTex tex,",
	        "    //",
	        "    // Only used on the optimized 360 version of FXAA Console.",
	        "    // For everything but 360, just use the same input here as for \"tex\".",
	        "    // For 360, same texture, just alias with a 2nd sampler.",
	        "    // This sampler needs to have an exponent bias of -1.",
	        "    FxaaTex fxaaConsole360TexExpBiasNegOne,",
	        "    //",
	        "    // Only used on the optimized 360 version of FXAA Console.",
	        "    // For everything but 360, just use the same input here as for \"tex\".",
	        "    // For 360, same texture, just alias with a 3nd sampler.",
	        "    // This sampler needs to have an exponent bias of -2.",
	        "    FxaaTex fxaaConsole360TexExpBiasNegTwo,",
	        "    //",
	        "    // Only used on FXAA Quality.",
	        "    // This must be from a constant/uniform.",
	        "    // {x_} = 1.0/screenWidthInPixels",
	        "    // {_y} = 1.0/screenHeightInPixels",
	        "    FxaaFloat2 fxaaQualityRcpFrame,",
	        "    //",
	        "    // Only used on FXAA Console.",
	        "    // This must be from a constant/uniform.",
	        "    // This effects sub-pixel AA quality and inversely sharpness.",
	        "    //   Where N ranges between,",
	        "    //     N = 0.50 (default)",
	        "    //     N = 0.33 (sharper)",
	        "    // {x__} = -N/screenWidthInPixels",
	        "    // {_y_} = -N/screenHeightInPixels",
	        "    // {_z_} =  N/screenWidthInPixels",
	        "    // {__w} =  N/screenHeightInPixels",
	        "    FxaaFloat4 fxaaConsoleRcpFrameOpt,",
	        "    //",
	        "    // Only used on FXAA Console.",
	        "    // Not used on 360, but used on PS3 and PC.",
	        "    // This must be from a constant/uniform.",
	        "    // {x__} = -2.0/screenWidthInPixels",
	        "    // {_y_} = -2.0/screenHeightInPixels",
	        "    // {_z_} =  2.0/screenWidthInPixels",
	        "    // {__w} =  2.0/screenHeightInPixels",
	        "    FxaaFloat4 fxaaConsoleRcpFrameOpt2,",
	        "    //",
	        "    // Only used on FXAA Console.",
	        "    // Only used on 360 in place of fxaaConsoleRcpFrameOpt2.",
	        "    // This must be from a constant/uniform.",
	        "    // {x__} =  8.0/screenWidthInPixels",
	        "    // {_y_} =  8.0/screenHeightInPixels",
	        "    // {_z_} = -4.0/screenWidthInPixels",
	        "    // {__w} = -4.0/screenHeightInPixels",
	        "    FxaaFloat4 fxaaConsole360RcpFrameOpt2,",
	        "    //",
	        "    // Only used on FXAA Quality.",
	        "    // This used to be the FXAA_QUALITY_SUBPIX define.",
	        "    // It is here now to allow easier tuning.",
	        "    // Choose the amount of sub-pixel aliasing removal.",
	        "    // This can effect sharpness.",
	        "    //   1.00 - upper limit (softer)",
	        "    //   0.75 - default amount of filtering",
	        "    //   0.50 - lower limit (sharper, less sub-pixel aliasing removal)",
	        "    //   0.25 - almost off",
	        "    //   0.00 - completely off",
	        "    FxaaFloat fxaaQualitySubpix,",
	        "    //",
	        "    // Only used on FXAA Quality.",
	        "    // This used to be the FXAA_QUALITY_EDGE_THRESHOLD define.",
	        "    // It is here now to allow easier tuning.",
	        "    // The minimum amount of local contrast required to apply algorithm.",
	        "    //   0.333 - too little (faster)",
	        "    //   0.250 - low quality",
	        "    //   0.166 - default",
	        "    //   0.125 - high quality",
	        "    //   0.063 - overkill (slower)",
	        "    FxaaFloat fxaaQualityEdgeThreshold,",
	        "    //",
	        "    // Only used on FXAA Quality.",
	        "    // This used to be the FXAA_QUALITY_EDGE_THRESHOLD_MIN define.",
	        "    // It is here now to allow easier tuning.",
	        "    // Trims the algorithm from processing darks.",
	        "    //   0.0833 - upper limit (default, the start of visible unfiltered edges)",
	        "    //   0.0625 - high quality (faster)",
	        "    //   0.0312 - visible limit (slower)",
	        "    // Special notes when using FXAA_GREEN_AS_LUMA,",
	        "    //   Likely want to set this to zero.",
	        "    //   As colors that are mostly not-green",
	        "    //   will appear very dark in the green channel!",
	        "    //   Tune by looking at mostly non-green content,",
	        "    //   then start at zero and increase until aliasing is a problem.",
	        "    FxaaFloat fxaaQualityEdgeThresholdMin,",
	        "    //",
	        "    // Only used on FXAA Console.",
	        "    // This used to be the FXAA_CONSOLE_EDGE_SHARPNESS define.",
	        "    // It is here now to allow easier tuning.",
	        "    // This does not effect PS3, as this needs to be compiled in.",
	        "    //   Use FXAA_CONSOLE_PS3_EDGE_SHARPNESS for PS3.",
	        "    //   Due to the PS3 being ALU bound,",
	        "    //   there are only three safe values here: 2 and 4 and 8.",
	        "    //   These options use the shaders ability to a free *|/ by 2|4|8.",
	        "    // For all other platforms can be a non-power of two.",
	        "    //   8.0 is sharper (default!!!)",
	        "    //   4.0 is softer",
	        "    //   2.0 is really soft (good only for vector graphics inputs)",
	        "    FxaaFloat fxaaConsoleEdgeSharpness,",
	        "    //",
	        "    // Only used on FXAA Console.",
	        "    // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD define.",
	        "    // It is here now to allow easier tuning.",
	        "    // This does not effect PS3, as this needs to be compiled in.",
	        "    //   Use FXAA_CONSOLE_PS3_EDGE_THRESHOLD for PS3.",
	        "    //   Due to the PS3 being ALU bound,",
	        "    //   there are only two safe values here: 1/4 and 1/8.",
	        "    //   These options use the shaders ability to a free *|/ by 2|4|8.",
	        "    // The console setting has a different mapping than the quality setting.",
	        "    // Other platforms can use other values.",
	        "    //   0.125 leaves less aliasing, but is softer (default!!!)",
	        "    //   0.25 leaves more aliasing, and is sharper",
	        "    FxaaFloat fxaaConsoleEdgeThreshold,",
	        "    //",
	        "    // Only used on FXAA Console.",
	        "    // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD_MIN define.",
	        "    // It is here now to allow easier tuning.",
	        "    // Trims the algorithm from processing darks.",
	        "    // The console setting has a different mapping than the quality setting.",
	        "    // This only applies when FXAA_EARLY_EXIT is 1.",
	        "    // This does not apply to PS3,",
	        "    // PS3 was simplified to avoid more shader instructions.",
	        "    //   0.06 - faster but more aliasing in darks",
	        "    //   0.05 - default",
	        "    //   0.04 - slower and less aliasing in darks",
	        "    // Special notes when using FXAA_GREEN_AS_LUMA,",
	        "    //   Likely want to set this to zero.",
	        "    //   As colors that are mostly not-green",
	        "    //   will appear very dark in the green channel!",
	        "    //   Tune by looking at mostly non-green content,",
	        "    //   then start at zero and increase until aliasing is a problem.",
	        "    FxaaFloat fxaaConsoleEdgeThresholdMin,",
	        "    //",
	        "    // Extra constants for 360 FXAA Console only.",
	        "    // Use zeros or anything else for other platforms.",
	        "    // These must be in physical constant registers and NOT immediates.",
	        "    // Immediates will result in compiler un-optimizing.",
	        "    // {xyzw} = float4(1.0, -1.0, 0.25, -0.25)",
	        "    FxaaFloat4 fxaaConsole360ConstDir",
	        ") {",
	        "",
	        "    FxaaFloat2 posM;",
	        "    posM.x = pos.x;",
	        "    posM.y = pos.y;",
	        "    #if (FXAA_GATHER4_ALPHA == 1)",
	        "        #if (FXAA_DISCARD == 0)",
	        "            FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);",
	        "            #if (FXAA_GREEN_AS_LUMA == 0)",
	        "                #define lumaM rgbyM.w",
	        "            #else",
	        "                #define lumaM rgbyM.y",
	        "            #endif",
	        "        #endif",
	        "        #if (FXAA_GREEN_AS_LUMA == 0)",
	        "            FxaaFloat4 luma4A = FxaaTexAlpha4(tex, posM);",
	        "            FxaaFloat4 luma4B = FxaaTexOffAlpha4(tex, posM, FxaaInt2(-1, -1));",
	        "        #else",
	        "            FxaaFloat4 luma4A = FxaaTexGreen4(tex, posM);",
	        "            FxaaFloat4 luma4B = FxaaTexOffGreen4(tex, posM, FxaaInt2(-1, -1));",
	        "        #endif",
	        "        #if (FXAA_DISCARD == 1)",
	        "            #define lumaM luma4A.w",
	        "        #endif",
	        "        #define lumaE luma4A.z",
	        "        #define lumaS luma4A.x",
	        "        #define lumaSE luma4A.y",
	        "        #define lumaNW luma4B.w",
	        "        #define lumaN luma4B.z",
	        "        #define lumaW luma4B.x",
	        "    #else",
	        "        FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);",
	        "        #if (FXAA_GREEN_AS_LUMA == 0)",
	        "            #define lumaM rgbyM.w",
	        "        #else",
	        "            #define lumaM rgbyM.y",
	        "        #endif",
	        "        #if (FXAA_GLSL_100 == 1)",
	        "          FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0, 1.0), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 0.0), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0,-1.0), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 0.0), fxaaQualityRcpFrame.xy));",
	        "        #else",
	        "          FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0, 1), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 0), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0,-1), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 0), fxaaQualityRcpFrame.xy));",
	        "        #endif",
	        "    #endif",
	        "",
	        "    FxaaFloat maxSM = max(lumaS, lumaM);",
	        "    FxaaFloat minSM = min(lumaS, lumaM);",
	        "    FxaaFloat maxESM = max(lumaE, maxSM);",
	        "    FxaaFloat minESM = min(lumaE, minSM);",
	        "    FxaaFloat maxWN = max(lumaN, lumaW);",
	        "    FxaaFloat minWN = min(lumaN, lumaW);",
	        "    FxaaFloat rangeMax = max(maxWN, maxESM);",
	        "    FxaaFloat rangeMin = min(minWN, minESM);",
	        "    FxaaFloat rangeMaxScaled = rangeMax * fxaaQualityEdgeThreshold;",
	        "    FxaaFloat range = rangeMax - rangeMin;",
	        "    FxaaFloat rangeMaxClamped = max(fxaaQualityEdgeThresholdMin, rangeMaxScaled);",
	        "    FxaaBool earlyExit = range < rangeMaxClamped;",
	        "",
	        "    if(earlyExit)",
	        "        #if (FXAA_DISCARD == 1)",
	        "            FxaaDiscard;",
	        "        #else",
	        "            return rgbyM;",
	        "        #endif",
	        "",
	        "    #if (FXAA_GATHER4_ALPHA == 0)",
	        "        #if (FXAA_GLSL_100 == 1)",
	        "          FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0,-1.0), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 1.0), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0,-1.0), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 1.0), fxaaQualityRcpFrame.xy));",
	        "        #else",
	        "          FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1,-1), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 1), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1,-1), fxaaQualityRcpFrame.xy));",
	        "          FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));",
	        "        #endif",
	        "    #else",
	        "        FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(1, -1), fxaaQualityRcpFrame.xy));",
	        "        FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));",
	        "    #endif",
	        "",
	        "    FxaaFloat lumaNS = lumaN + lumaS;",
	        "    FxaaFloat lumaWE = lumaW + lumaE;",
	        "    FxaaFloat subpixRcpRange = 1.0/range;",
	        "    FxaaFloat subpixNSWE = lumaNS + lumaWE;",
	        "    FxaaFloat edgeHorz1 = (-2.0 * lumaM) + lumaNS;",
	        "    FxaaFloat edgeVert1 = (-2.0 * lumaM) + lumaWE;",
	        "",
	        "    FxaaFloat lumaNESE = lumaNE + lumaSE;",
	        "    FxaaFloat lumaNWNE = lumaNW + lumaNE;",
	        "    FxaaFloat edgeHorz2 = (-2.0 * lumaE) + lumaNESE;",
	        "    FxaaFloat edgeVert2 = (-2.0 * lumaN) + lumaNWNE;",
	        "",
	        "    FxaaFloat lumaNWSW = lumaNW + lumaSW;",
	        "    FxaaFloat lumaSWSE = lumaSW + lumaSE;",
	        "    FxaaFloat edgeHorz4 = (abs(edgeHorz1) * 2.0) + abs(edgeHorz2);",
	        "    FxaaFloat edgeVert4 = (abs(edgeVert1) * 2.0) + abs(edgeVert2);",
	        "    FxaaFloat edgeHorz3 = (-2.0 * lumaW) + lumaNWSW;",
	        "    FxaaFloat edgeVert3 = (-2.0 * lumaS) + lumaSWSE;",
	        "    FxaaFloat edgeHorz = abs(edgeHorz3) + edgeHorz4;",
	        "    FxaaFloat edgeVert = abs(edgeVert3) + edgeVert4;",
	        "",
	        "    FxaaFloat subpixNWSWNESE = lumaNWSW + lumaNESE;",
	        "    FxaaFloat lengthSign = fxaaQualityRcpFrame.x;",
	        "    FxaaBool horzSpan = edgeHorz >= edgeVert;",
	        "    FxaaFloat subpixA = subpixNSWE * 2.0 + subpixNWSWNESE;",
	        "",
	        "    if(!horzSpan) lumaN = lumaW;",
	        "    if(!horzSpan) lumaS = lumaE;",
	        "    if(horzSpan) lengthSign = fxaaQualityRcpFrame.y;",
	        "    FxaaFloat subpixB = (subpixA * (1.0/12.0)) - lumaM;",
	        "",
	        "    FxaaFloat gradientN = lumaN - lumaM;",
	        "    FxaaFloat gradientS = lumaS - lumaM;",
	        "    FxaaFloat lumaNN = lumaN + lumaM;",
	        "    FxaaFloat lumaSS = lumaS + lumaM;",
	        "    FxaaBool pairN = abs(gradientN) >= abs(gradientS);",
	        "    FxaaFloat gradient = max(abs(gradientN), abs(gradientS));",
	        "    if(pairN) lengthSign = -lengthSign;",
	        "    FxaaFloat subpixC = FxaaSat(abs(subpixB) * subpixRcpRange);",
	        "",
	        "    FxaaFloat2 posB;",
	        "    posB.x = posM.x;",
	        "    posB.y = posM.y;",
	        "    FxaaFloat2 offNP;",
	        "    offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;",
	        "    offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;",
	        "    if(!horzSpan) posB.x += lengthSign * 0.5;",
	        "    if( horzSpan) posB.y += lengthSign * 0.5;",
	        "",
	        "    FxaaFloat2 posN;",
	        "    posN.x = posB.x - offNP.x * FXAA_QUALITY_P0;",
	        "    posN.y = posB.y - offNP.y * FXAA_QUALITY_P0;",
	        "    FxaaFloat2 posP;",
	        "    posP.x = posB.x + offNP.x * FXAA_QUALITY_P0;",
	        "    posP.y = posB.y + offNP.y * FXAA_QUALITY_P0;",
	        "    FxaaFloat subpixD = ((-2.0)*subpixC) + 3.0;",
	        "    FxaaFloat lumaEndN = FxaaLuma(FxaaTexTop(tex, posN));",
	        "    FxaaFloat subpixE = subpixC * subpixC;",
	        "    FxaaFloat lumaEndP = FxaaLuma(FxaaTexTop(tex, posP));",
	        "",
	        "    if(!pairN) lumaNN = lumaSS;",
	        "    FxaaFloat gradientScaled = gradient * 1.0/4.0;",
	        "    FxaaFloat lumaMM = lumaM - lumaNN * 0.5;",
	        "    FxaaFloat subpixF = subpixD * subpixE;",
	        "    FxaaBool lumaMLTZero = lumaMM < 0.0;",
	        "",
	        "    lumaEndN -= lumaNN * 0.5;",
	        "    lumaEndP -= lumaNN * 0.5;",
	        "    FxaaBool doneN = abs(lumaEndN) >= gradientScaled;",
	        "    FxaaBool doneP = abs(lumaEndP) >= gradientScaled;",
	        "    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P1;",
	        "    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P1;",
	        "    FxaaBool doneNP = (!doneN) || (!doneP);",
	        "    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P1;",
	        "    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P1;",
	        "",
	        "    if(doneNP) {",
	        "        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "        doneN = abs(lumaEndN) >= gradientScaled;",
	        "        doneP = abs(lumaEndP) >= gradientScaled;",
	        "        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P2;",
	        "        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P2;",
	        "        doneNP = (!doneN) || (!doneP);",
	        "        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P2;",
	        "        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P2;",
	        "",
	        "        #if (FXAA_QUALITY_PS > 3)",
	        "        if(doneNP) {",
	        "            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "            doneN = abs(lumaEndN) >= gradientScaled;",
	        "            doneP = abs(lumaEndP) >= gradientScaled;",
	        "            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P3;",
	        "            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P3;",
	        "            doneNP = (!doneN) || (!doneP);",
	        "            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P3;",
	        "            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P3;",
	        "",
	        "            #if (FXAA_QUALITY_PS > 4)",
	        "            if(doneNP) {",
	        "                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "                doneN = abs(lumaEndN) >= gradientScaled;",
	        "                doneP = abs(lumaEndP) >= gradientScaled;",
	        "                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P4;",
	        "                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P4;",
	        "                doneNP = (!doneN) || (!doneP);",
	        "                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P4;",
	        "                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P4;",
	        "",
	        "                #if (FXAA_QUALITY_PS > 5)",
	        "                if(doneNP) {",
	        "                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "                    doneN = abs(lumaEndN) >= gradientScaled;",
	        "                    doneP = abs(lumaEndP) >= gradientScaled;",
	        "                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P5;",
	        "                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P5;",
	        "                    doneNP = (!doneN) || (!doneP);",
	        "                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P5;",
	        "                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P5;",
	        "",
	        "                    #if (FXAA_QUALITY_PS > 6)",
	        "                    if(doneNP) {",
	        "                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "                        doneN = abs(lumaEndN) >= gradientScaled;",
	        "                        doneP = abs(lumaEndP) >= gradientScaled;",
	        "                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P6;",
	        "                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P6;",
	        "                        doneNP = (!doneN) || (!doneP);",
	        "                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P6;",
	        "                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P6;",
	        "",
	        "                        #if (FXAA_QUALITY_PS > 7)",
	        "                        if(doneNP) {",
	        "                            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "                            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "                            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "                            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "                            doneN = abs(lumaEndN) >= gradientScaled;",
	        "                            doneP = abs(lumaEndP) >= gradientScaled;",
	        "                            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P7;",
	        "                            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P7;",
	        "                            doneNP = (!doneN) || (!doneP);",
	        "                            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P7;",
	        "                            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P7;",
	        "",
	        "    #if (FXAA_QUALITY_PS > 8)",
	        "    if(doneNP) {",
	        "        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "        doneN = abs(lumaEndN) >= gradientScaled;",
	        "        doneP = abs(lumaEndP) >= gradientScaled;",
	        "        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P8;",
	        "        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P8;",
	        "        doneNP = (!doneN) || (!doneP);",
	        "        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P8;",
	        "        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P8;",
	        "",
	        "        #if (FXAA_QUALITY_PS > 9)",
	        "        if(doneNP) {",
	        "            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "            doneN = abs(lumaEndN) >= gradientScaled;",
	        "            doneP = abs(lumaEndP) >= gradientScaled;",
	        "            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P9;",
	        "            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P9;",
	        "            doneNP = (!doneN) || (!doneP);",
	        "            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P9;",
	        "            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P9;",
	        "",
	        "            #if (FXAA_QUALITY_PS > 10)",
	        "            if(doneNP) {",
	        "                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "                doneN = abs(lumaEndN) >= gradientScaled;",
	        "                doneP = abs(lumaEndP) >= gradientScaled;",
	        "                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P10;",
	        "                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P10;",
	        "                doneNP = (!doneN) || (!doneP);",
	        "                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P10;",
	        "                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P10;",
	        "",
	        "                #if (FXAA_QUALITY_PS > 11)",
	        "                if(doneNP) {",
	        "                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "                    doneN = abs(lumaEndN) >= gradientScaled;",
	        "                    doneP = abs(lumaEndP) >= gradientScaled;",
	        "                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P11;",
	        "                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P11;",
	        "                    doneNP = (!doneN) || (!doneP);",
	        "                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P11;",
	        "                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P11;",
	        "",
	        "                    #if (FXAA_QUALITY_PS > 12)",
	        "                    if(doneNP) {",
	        "                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
	        "                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
	        "                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
	        "                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
	        "                        doneN = abs(lumaEndN) >= gradientScaled;",
	        "                        doneP = abs(lumaEndP) >= gradientScaled;",
	        "                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P12;",
	        "                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P12;",
	        "                        doneNP = (!doneN) || (!doneP);",
	        "                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P12;",
	        "                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P12;",
	        "",
	        "                    }",
	        "                    #endif",
	        "",
	        "                }",
	        "                #endif",
	        "",
	        "            }",
	        "            #endif",
	        "",
	        "        }",
	        "        #endif",
	        "",
	        "    }",
	        "    #endif",
	        "",
	        "                        }",
	        "                        #endif",
	        "",
	        "                    }",
	        "                    #endif",
	        "",
	        "                }",
	        "                #endif",
	        "",
	        "            }",
	        "            #endif",
	        "",
	        "        }",
	        "        #endif",
	        "",
	        "    }",
	        "",
	        "    FxaaFloat dstN = posM.x - posN.x;",
	        "    FxaaFloat dstP = posP.x - posM.x;",
	        "    if(!horzSpan) dstN = posM.y - posN.y;",
	        "    if(!horzSpan) dstP = posP.y - posM.y;",
	        "",
	        "    FxaaBool goodSpanN = (lumaEndN < 0.0) != lumaMLTZero;",
	        "    FxaaFloat spanLength = (dstP + dstN);",
	        "    FxaaBool goodSpanP = (lumaEndP < 0.0) != lumaMLTZero;",
	        "    FxaaFloat spanLengthRcp = 1.0/spanLength;",
	        "",
	        "    FxaaBool directionN = dstN < dstP;",
	        "    FxaaFloat dst = min(dstN, dstP);",
	        "    FxaaBool goodSpan = directionN ? goodSpanN : goodSpanP;",
	        "    FxaaFloat subpixG = subpixF * subpixF;",
	        "    FxaaFloat pixelOffset = (dst * (-spanLengthRcp)) + 0.5;",
	        "    FxaaFloat subpixH = subpixG * fxaaQualitySubpix;",
	        "",
	        "    FxaaFloat pixelOffsetGood = goodSpan ? pixelOffset : 0.0;",
	        "    FxaaFloat pixelOffsetSubpix = max(pixelOffsetGood, subpixH);",
	        "    if(!horzSpan) posM.x += pixelOffsetSubpix * lengthSign;",
	        "    if( horzSpan) posM.y += pixelOffsetSubpix * lengthSign;",
	        "    #if (FXAA_DISCARD == 1)",
	        "        return FxaaTexTop(tex, posM);",
	        "    #else",
	        "        return FxaaFloat4(FxaaTexTop(tex, posM).xyz, lumaM);",
	        "    #endif",
	        "}",
	        "",
	        "#endif",
	        "",
	        "void main() {",
	        "  gl_FragColor = FxaaPixelShader(",
	        "    vUv,",
	        "    vec4(0.0),",
	        "    tDiffuse,",
	        "    tDiffuse,",
	        "    tDiffuse,",
	        "    resolution,",
	        "    vec4(0.0),",
	        "    vec4(0.0),",
	        "    vec4(0.0),",
	        "    0.75,",
	        "    0.166,",
	        "    0.0833,",
	        "    0.0,",
	        "    0.0,",
	        "    0.0,",
	        "    vec4(0.0)",
	        "  );",
	        "",
	        "  // TODO avoid querying texture twice for same texel",
	        "  gl_FragColor.a = texture2D(tDiffuse, vUv).a;",
	        "}"
		].join("\n")

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var WebGLDeferredRenderer = function ( parameters ) {

		parameters = parameters || {};

		// private properties

		var _this = this;

		var _gl;

		var _width, _height;

		// for Classic Deferred Rendering
		var _compColor;
		var _passColor, _passForward, _passCopy;

		// for Light Pre-Pass
		var _compReconstruction;
		var _passReconstruction;

		// for Common
		var _compNormalDepth, _compLight, _compFinal;
		var _passNormalDepth, _passLight, _passLightFullscreen, _passFinal, _passFXAA;

		var _depthTexture;

		var _currentCamera;

		var _lightScene, _lightFullscreenScene;

		var _antialias = false;
		var _hasTransparentObject = false;
		var _lightPrePass = false;
		var _cacheKeepAlive = false;

		var _tmpMaterial = new ShaderMaterial( { visible: false } );
		var _tmpVector3 = new Vector3();

		// scene/material/light cache for deferred rendering.
		// save them at the creation and release
		// if they're unused removeThresholdCount frames
		// unless _cacheKeepAlive is true.

		// scene.uuid -> lightScene, lightFullscreenScene
		var _lightScenesCache = {};
		var _lightFullscreenScenesCache = {};

		// object.material.uuid -> deferredMaterial or
		// object.material[ n ].uuid -> deferredMaterial
		var _normalDepthMaterialsCache = {};
		var _normalDepthShininessMaterialsCache = {};
		var _colorMaterialsCache = {};
		var _reconstructionMaterialsCache = {};

		// originalLight.uuid -> deferredLight
		var _deferredLightsCache = {};

		// deferredLight.uuid -> deferredLightMaterial
		var _classicDeferredLightMaterialsCache = {};
		var _lightPrePassMaterialsCache = {};

		var _removeThresholdCount = 60;

		// deferredMaterials.uuid -> object.material or
		// deferredMaterials.uuid -> object.material[ n ]
		// save before render and release after render.
		var _originalMaterialsTable = {};

		// object.uuid -> originalOnBeforeRender
		// save before render and release after render.
		var _originalOnBeforeRendersTable = {};

		// object.material.uuid -> object.material.visible or
		// object.material[ i ].uuid -> object.material[ i ].visible or
		// save before render and release after render.
		var _originalVisibleTable = {};

		// external properties

		this.renderer = undefined;
		this.domElement = undefined;

		this.forwardRendering = false;  // for debug

		// private methods

		function init( parameters ) {

			_this.renderer = parameters.renderer !== undefined ? parameters.renderer : new WebGLRenderer();
			_this.domElement = _this.renderer.domElement;

			_gl = _this.renderer.context;

			_width = parameters.width !== undefined ? parameters.width : _this.renderer.getSize().width;
			_height = parameters.height !== undefined ? parameters.height : _this.renderer.getSize().height;

			var antialias = parameters.antialias !== undefined ? parameters.antialias : false;

			if ( parameters.cacheKeepAlive !== undefined ) _cacheKeepAlive = parameters.cacheKeepAlive;

			initDepthTexture();

			initPassNormalDepth();
			initPassColor();
			initPassLight();
			initPassReconstruction();
			initPassFinal();

			_this.setSize( _width, _height );
			_this.setAntialias( antialias );
			_this.enableLightPrePass( false );

		}

		function initDepthTexture() {

			_depthTexture = new DepthTexture(
				_width,
				_height,
				UnsignedInt248Type,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				DepthStencilFormat
			);

		}

		function initPassNormalDepth() {

			_passNormalDepth = new RenderPass();
			_passNormalDepth.clear = true;

			var rt = new WebGLRenderTarget( _width, _height, {
				minFilter: NearestFilter,
				magFilter: NearestFilter,
				format: RGBAFormat,
				type: FloatType,
				stencilBuffer: true,
				depthTexture: _depthTexture
			} );

			rt.texture.generateMipamps = false;

			_compNormalDepth = new EffectComposer( _this.renderer, rt );
			_compNormalDepth.addPass( _passNormalDepth );

		}

		function initPassColor() {

			_passColor = new RenderPass();
			_passColor.clear = true;

			var rt = new WebGLRenderTarget( _width, _height, {
				minFilter: NearestFilter,
				magFilter: NearestFilter,
				format: RGBAFormat,
				type: FloatType,
				depthTexture: _depthTexture
			} );

			rt.texture.generateMipamps = false;

			_compColor = new EffectComposer( _this.renderer, rt );
			_compColor.addPass( _passColor );

		}

		function initPassLight() {

			_passLightFullscreen = new RenderPass();
			_passLightFullscreen.clear = true;
			_passLightFullscreen.camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

			_passLight = new RenderPass();
			_passLight.clear = false;

			var rt = new WebGLRenderTarget( _width, _height, {
				minFilter: NearestFilter,
				magFilter: NearestFilter,
				format: RGBAFormat,
				type: FloatType,
				depthTexture: _depthTexture
			} );

			rt.texture.generateMipamps = false;

			_compLight = new EffectComposer( _this.renderer, rt );
			_compLight.addPass( _passLightFullscreen );
			_compLight.addPass( _passLight );

		}

		function initPassReconstruction() {

			_passReconstruction = new RenderPass();
			_passReconstruction.clear = true;

			var rt = new WebGLRenderTarget( _width, _height, {
				minFilter: NearestFilter,
				magFilter: NearestFilter,
				format: RGBAFormat,
				type: FloatType,
				depthTexture: _depthTexture
			} );

			rt.texture.generateMipamps = false;

			_compReconstruction = new EffectComposer( _this.renderer, rt );
			_compReconstruction.addPass( _passReconstruction );

		}

		function initPassFinal() {

			_passFinal = new ShaderPass( ShaderDeferred[ 'final' ] );
			_passFinal.clear = true;
			_passFinal.uniforms.samplerResult.value = _compLight.renderTarget2.texture;
			_passFinal.material.blending = NoBlending;
			_passFinal.material.depthWrite = false;
			_passFinal.material.depthTest = false;

			_passForward = new RenderPass();
			_passForward.clear = false;

			_passCopy = new ShaderPass( CopyShader );

			_passFXAA = new ShaderPass( FXAAShader );

			var rt = new WebGLRenderTarget( _width, _height, {
				minFilter: NearestFilter,
				magFilter: LinearFilter,
				format: RGBFormat,
				type: UnsignedByteType,
				depthTexture: _depthTexture
			} );

			rt.texture.generateMipamps = false;

			_compFinal = new EffectComposer( _this.renderer, rt );
			_compFinal.addPass( _passFinal );
			_compFinal.addPass( _passForward );
			_compFinal.addPass( _passCopy );
			_compFinal.addPass( _passFXAA );

		}

		function initLightScene( scene ) {

			var lightSceneData = _lightScenesCache[ scene.uuid ];
			var lightFullscreenSceneData = _lightFullscreenScenesCache[ scene.uuid ];

			if ( lightSceneData === undefined ) {

				var s = new Scene();
				s.userData.lights = {};

				lightSceneData = createCacheData();
				lightSceneData.scene = s;

				_lightScenesCache[ scene.uuid ] = lightSceneData;

			}

			if ( lightFullscreenSceneData === undefined ) {

				var s = new Scene();
				s.userData.lights = {};

				var emissiveLight = createDeferredEmissiveLight();

				s.userData.emissiveLight = emissiveLight;
				s.add( emissiveLight );

				lightFullscreenSceneData = createCacheData();
				lightFullscreenSceneData.scene = s;

				_lightFullscreenScenesCache[ scene.uuid ] = lightFullscreenSceneData;

			}

			lightSceneData.used = true;
			lightFullscreenSceneData.used = true;

			var lightScene = lightSceneData.scene;
			var lightFullscreenScene = lightFullscreenSceneData.scene;

			// emissiveLight is only for Classic Deferred Rendering
			lightFullscreenScene.userData.emissiveLight.visible = ! _lightPrePass;

			_lightScene = lightScene;
			_lightFullscreenScene = lightFullscreenScene;

		}

		function getMaterialFromCacheOrCreate( originalMaterial, cache, createFunc, updateFunc ) {

			var data = cache[ originalMaterial.uuid ];

			if ( data === undefined ) {

				data = createCacheData();
				data.material = createFunc( originalMaterial );
				cache[ originalMaterial.uuid ] = data;

			}

			data.used = true;

			updateFunc( data.material, originalMaterial );

			_originalMaterialsTable[ data.material.uuid ] = originalMaterial;

			return data.material;

		}

		function overrideMaterialAndOnBeforeRender( object, getMaterialFunc, onBeforeRender ) {

			if ( object.material === undefined ) return;

			if ( Array.isArray( object.material ) ) {

				for ( var i = 0, il = object.material.length; i < il; i ++ ) {

					object.material[ i ] = getMaterialFunc( object.material[ i ] );

				}

			} else {

				object.material = getMaterialFunc( object.material );

			}

			object.onBeforeRender = onBeforeRender;

		}

		function restoreOriginalMaterial( object ) {

			if ( object.material === undefined ) return;

			if ( Array.isArray( object.material ) ) {

				for ( var i = 0, il = object.material.length; i < il; i ++ ) {

					object.material[ i ] = _originalMaterialsTable[ object.material[ i ].uuid ];

				}

			} else {

				object.material = _originalMaterialsTable[ object.material.uuid ];

			}

		}

		function setMaterialNormalDepth( object ) {

			overrideMaterialAndOnBeforeRender( object, getNormalDepthMaterial, updateDeferredNormalDepthUniforms );

		}

		function getNormalDepthMaterial( originalMaterial ) {

			return getMaterialFromCacheOrCreate(
				originalMaterial,
				( _lightPrePass ) ? _normalDepthShininessMaterialsCache : _normalDepthMaterialsCache,
				createDeferredNormalDepthMaterial,
				updateDeferredNormalDepthMaterial
			);

		}

		function createDeferredNormalDepthMaterial( originalMaterial ) {

			var shader = ( _lightPrePass ) ? ShaderDeferred[ 'normalDepthShininess' ] : ShaderDeferred[ 'normalDepth' ];

			return new ShaderMaterial( {
				uniforms: Object.assign( {}, shader.uniforms ),
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				blending: NoBlending
			} );

		}

		function updateDeferredNormalDepthMaterial( material, originalMaterial ) {

			if ( originalMaterial.skinning !== undefined ) material.skinning = originalMaterial.skinning;
			if ( originalMaterial.morphTargets !== undefined ) material.morphTargets = originalMaterial.morphTargets;

			if ( originalMaterial.visible === true ) {

				material.visible = ! originalMaterial.transparent;

			} else {

				material.visible = false;

			}

		}

		function updateDeferredNormalDepthUniforms( renderer, scene, camera, geometry, material, group ) {

			if ( ! _lightPrePass ) return;

			var originalMaterial = _originalMaterialsTable[ material.uuid ];

			if ( originalMaterial === undefined || originalMaterial.shininess === undefined ) return;

			material.uniforms.shininess.value = originalMaterial.shininess;

		}

		function setMaterialColor( object ) {

			overrideMaterialAndOnBeforeRender( object, getColorMaterial, updateDeferredColorUniforms );

		}

		function getColorMaterial( originalMaterial ) {

			return getMaterialFromCacheOrCreate(
				originalMaterial,
				_colorMaterialsCache,
				createDeferredColorMaterial,
				updateDeferredColorMaterial
			);

		}

		function createDeferredColorMaterial( originalMaterial ) {

			var shader = ShaderDeferred[ 'color' ];

			var material = new ShaderMaterial( {
				uniforms: Object.assign( {}, shader.uniforms ),
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				blending: NoBlending
			} );

			if ( originalMaterial.map !== undefined ) material.map = originalMaterial.map;

			return material;

		}

		function updateDeferredColorMaterial( material, originalMaterial ) {

			if ( originalMaterial.map !== undefined ) material.map = originalMaterial.map;
			if ( originalMaterial.skinning !== undefined ) material.skinning = originalMaterial.skinning;
			if ( originalMaterial.morphTargets !== undefined ) material.morphTargets = originalMaterial.morphTargets;

			if ( originalMaterial.visible === true ) {

				material.visible = ! originalMaterial.transparent;

			} else {

				material.visible = false;

			}

		}

		function updateDeferredColorUniforms( renderer, scene, camera, geometry, material, group ) {

			var originalMaterial = _originalMaterialsTable[ material.uuid ];
			var uniforms = material.uniforms;

			var diffuse, emissive;

			if ( originalMaterial.isMeshBasicMaterial === true ) {

				emissive = originalMaterial.color;

			} else {

				diffuse = originalMaterial.color;
				emissive = originalMaterial.emissive;

			}

			var specular = originalMaterial.specular;
			var shininess = originalMaterial.shininess;
			var map = originalMaterial.map;

			if ( diffuse !== undefined ) uniforms.diffuse.value.copy( diffuse );
			if ( emissive !== undefined ) uniforms.emissive.value.copy( emissive );
			if ( specular !== undefined ) uniforms.specular.value.copy( specular );
			if ( shininess !== undefined && uniforms.shininess !== undefined ) uniforms.shininess.value = shininess;
			if ( map !== undefined ) uniforms.map.value = map;

		}

		function setMaterialReconstruction( object ) {

			overrideMaterialAndOnBeforeRender( object, getReconstructionMaterial, updateDeferredReconstructionUniforms );

		}

		function getReconstructionMaterial( originalMaterial ) {

			if ( originalMaterial.transparent === true ) {

				_originalMaterialsTable[ originalMaterial.uuid ] = originalMaterial;
				return originalMaterial;

			}

			return getMaterialFromCacheOrCreate(
				originalMaterial,
				_reconstructionMaterialsCache,
				createDeferredReconstructionMaterial,
				updateDeferredReconstructionMaterial
			);

		}

		function createDeferredReconstructionMaterial( originalMaterial ) {

			var shader = ShaderDeferred[ 'reconstruction' ];

			var material = new ShaderMaterial( {
				uniforms: Object.assign( {}, shader.uniforms ),
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				blending: NoBlending
			} );

			if ( originalMaterial.map !== undefined ) material.map = originalMaterial.map;

			return material;

		}

		function updateDeferredReconstructionMaterial( material, originalMaterial ) {

			updateDeferredColorMaterial( material, originalMaterial );

		}

		function updateDeferredReconstructionUniforms( renderer, scene, camera, geometry, material, group ) {

			if ( material.transparent === true ) {

				// 'this' is object here because this method is set as object.onBefore()
				var onBeforeRender = _originalOnBeforeRendersTable[ this.uuid ];

				if ( onBeforeRender ) {

					onBeforeRender.call( this, renderer, scene, camera, geometry, material, group );

				}

				return;

			}

			updateDeferredColorUniforms( renderer, scene, camera, geometry, material, group );

			material.uniforms.samplerLight.value = _compLight.renderTarget2.texture;

		}

		function setVisibleForForwardRendering( object ) {

			if ( object.material === undefined ) return;

			if ( Array.isArray( object.material ) ) {

				for ( var i = 0, il = object.material.length; i < il; i ++ ) {

					if ( _originalVisibleTable[ object.material[ i ].uuid ] === undefined ) {

						_originalVisibleTable[ object.material[ i ].uuid ] = object.material[ i ].visible;
						object.material[ i ].visible = object.material[ i ].transparent && object.material[ i ].visible;

					}

				}

			} else {

				if ( _originalVisibleTable[ object.material.uuid ] === undefined ) {

					_originalVisibleTable[ object.material.uuid ] = object.material.visible;
					object.material.visible = object.material.transparent && object.material.visible;

				}

			}

		}

		function restoreVisible( object ) {

			if ( object.material === undefined ) return;

			if ( Array.isArray( object.material ) ) {

				for ( var i = 0, il = object.material.length; i < il; i ++ ) {

					object.material[ i ].visible = _originalVisibleTable[ object.material[ i ].uuid ];

				}

			} else {

				object.material.visible = _originalVisibleTable[ object.material.uuid ];

			}

		}

		function createDeferredEmissiveLight() {

			var shader = ShaderDeferred[ 'emissiveLight' ];

			var material = new ShaderMaterial( {
				uniforms: Object.assign( {}, shader.uniforms ),
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader,
				blending: NoBlending,
				depthWrite: false
			} );

			var geometry = new PlaneBufferGeometry( 2, 2 );
			var mesh = new Mesh( geometry, material );

			mesh.onBeforeRender = function ( renderer, scene, camera, geometry, material, group ) {

				material.uniforms.samplerColor.value = _compColor.renderTarget2.texture;

			};

			return mesh;

		}

		function createDeferredLight( originalLight ) {

			if ( originalLight.isPointLight ) {

				return createDeferredPointLight( originalLight );

			} else if ( originalLight.isSpotLight ) {

				return createDeferredSpotLight( originalLight );

			} else if ( originalLight.isDirectionalLight ) {

				return createDeferredDirectionalLight( originalLight );

			}

			return null;

		}

		function createDeferredLightMaterial( originalLight ) {

			if ( originalLight.isPointLight ) {

				return createDeferredPointLightMaterial();

			} else if ( originalLight.isSpotLight ) {

				return createDeferredSpotLightMaterial();

			} else if ( originalLight.isDirectionalLight ) {

				return createDeferredDirectionalLightMaterial();

			}

			return null;

		}

		function getDeferredLightMaterial( light ) {

			var cache = ( _lightPrePass ) ? _lightPrePassMaterialsCache : _classicDeferredLightMaterialsCache;

			var data = cache[ light.uuid ];

			if ( data === undefined ) {

				data = createCacheData();
				data.material = createDeferredLightMaterial( light.userData.originalLight );
				cache[ light.uuid ] = data;

			}

			data.used = true;

			return data.material;

		}

		function updateDeferredLight( light ) {

			var originalLight = light.userData.originalLight;

			if ( originalLight.isPointLight ) {

				updateDeferredPointLight( light );

			}

		}

		function createDeferredLightMesh( light, geometry ) {

			var mesh = new Mesh( geometry, _tmpMaterial );

			mesh.userData.originalLight = light;

			return mesh;

		}

		function createDeferredLightShaderMaterial( shader ) {

			var material = new ShaderMaterial( {
				uniforms: Object.assign( {}, shader.uniforms ),
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader,
				transparent: true,
				blending: AdditiveBlending,
				depthWrite: false
			} );

			if ( _lightPrePass ) material.premultipliedAlpha = true;

			return material;

		}

		function updateDeferredLightCommonUniforms( uniforms ) {

			if ( _lightPrePass ) {

				uniforms.samplerNormalDepthShininess.value = _compNormalDepth.renderTarget2.texture;

			} else {

				uniforms.samplerNormalDepth.value = _compNormalDepth.renderTarget2.texture;
				uniforms.samplerColor.value = _compColor.renderTarget2.texture;

			}

		}

		function createDeferredPointLight( light ) {

			var mesh = createDeferredLightMesh( light, new SphereBufferGeometry( 1, 16, 8 ) );
			mesh.onBeforeRender = updateDeferredPointLightUniforms;
			return mesh;

		}
		function createDeferredPointLightMaterial() {

			var shader = ( _lightPrePass ) ? ShaderDeferred[ 'pointLightPre' ] : ShaderDeferred[ 'pointLight' ];

			var material = createDeferredLightShaderMaterial( shader );

			material.side = BackSide;
			material.depthFunc = GreaterEqualDepth;

			return material;

		}

		function updateDeferredPointLight( light ) {

			var originalLight = light.userData.originalLight;
			var distance = originalLight.distance;

			if ( distance > 0 ) {

				light.scale.set( 1, 1, 1 ).multiplyScalar( distance );
				light.position.setFromMatrixPosition( originalLight.matrixWorld );

			}

		}

		function updateDeferredPointLightUniforms( renderer, scene, camera, geometry, material, group ) {

			var light = this;

			var originalLight = light.userData.originalLight;
			var distance = originalLight.distance;
			var uniforms = material.uniforms;

			uniforms.lightColor.value.copy( originalLight.color );

			if ( distance > 0 ) {

				uniforms.lightRadius.value = distance;
				uniforms.lightIntensity.value = originalLight.intensity;
				uniforms.lightPositionVS.value.setFromMatrixPosition( originalLight.matrixWorld ).applyMatrix4( _currentCamera.matrixWorldInverse );

			} else {

				uniforms.lightRadius.value = Infinity;

			}

			updateDeferredLightCommonUniforms( uniforms );

		}

		function createDeferredSpotLight( light ) {

			var mesh = createDeferredLightMesh( light, new PlaneBufferGeometry( 2, 2 ) );
			mesh.onBeforeRender = updateDeferredSpotLightUniforms;
			return mesh;

		}

		function createDeferredSpotLightMaterial() {

			var shader = ( _lightPrePass ) ? ShaderDeferred[ 'spotLightPre' ] : ShaderDeferred[ 'spotLight' ];

			var material = createDeferredLightShaderMaterial( shader );

			material.depthTest = false;

			return material;

		}

		function updateDeferredSpotLightUniforms( renderer, scene, camera, geometry, material, group ) {

			var light = this;

			var originalLight = light.userData.originalLight;
			var uniforms = light.material.uniforms;

			uniforms.lightAngle.value = originalLight.angle;
			uniforms.lightColor.value.copy( originalLight.color );
			uniforms.lightIntensity.value = originalLight.intensity;
			uniforms.lightPositionVS.value.setFromMatrixPosition( originalLight.matrixWorld ).applyMatrix4( _currentCamera.matrixWorldInverse );

			var vec = uniforms.lightDirectionVS.value;
			var vec2 = _tmpVector3;

			vec.setFromMatrixPosition( originalLight.matrixWorld );
			vec2.setFromMatrixPosition( originalLight.target.matrixWorld );
			vec.sub( vec2 ).normalize().transformDirection( _currentCamera.matrixWorldInverse );

			updateDeferredLightCommonUniforms( uniforms );

		}

		function createDeferredDirectionalLight( light ) {

			var mesh = createDeferredLightMesh( light, new PlaneBufferGeometry( 2, 2 ) );
			mesh.onBeforeRender = updateDeferredDirectionalLightUniforms;
			return mesh;

		}

		function createDeferredDirectionalLightMaterial() {

			var shader = ( _lightPrePass ) ? ShaderDeferred[ 'directionalLightPre' ] : ShaderDeferred[ 'directionalLight' ];

			var material = createDeferredLightShaderMaterial( shader );

			material.depthTest = false;

			return material;

		}

		function updateDeferredDirectionalLightUniforms( renderer, scene, camera, geometry, material, group ) {

			var light = this;

			var originalLight = light.userData.originalLight;
			var uniforms = light.material.uniforms;

			uniforms.lightColor.value.copy( originalLight.color );
			uniforms.lightIntensity.value = originalLight.intensity;

			var vec = uniforms.lightDirectionVS.value;
			var vec2 = _tmpVector3;

			vec.setFromMatrixPosition( originalLight.matrixWorld );
			vec2.setFromMatrixPosition( originalLight.target.matrixWorld );
			vec.sub( vec2 ).normalize().transformDirection( _currentCamera.matrixWorldInverse );

			updateDeferredLightCommonUniforms( uniforms );

		}

		function saveOriginalOnBeforeRenderAndCheckTransparency( object ) {

			if ( object.material === undefined ) return;

			_originalOnBeforeRendersTable[ object.uuid ] = object.onBeforeRender;

			// _hasTransparentObject is used only for Classic Deferred Rendering
			if ( _hasTransparentObject || _lightPrePass ) return;

			if ( ! object.visible ) return;

			if ( Array.isArray( object.material ) ) {

				for ( var i = 0, il = object.material.length; i < il; i ++ ) {

					if ( object.material[ i ].visible === true && object.material[ i ].transparent === true ) {

						_hasTransparentObject = true;
						break;

					}

				}

			} else {

				if ( object.material.visible === true && object.material.transparent === true ) _hasTransparentObject = true;

			}

		}

		function restoreOriginalOnBeforeRender( object ) {

			if ( object.material === undefined ) return;

			object.onBeforeRender = _originalOnBeforeRendersTable[ object.uuid ];

		}

		function addDeferredLightsToLightScene( object ) {

			if ( object.isLight !== true ) return;

			var data = _deferredLightsCache[ object.uuid ];

			if ( data === undefined ) {

				data = createCacheData();
				data.light = createDeferredLight( object );
				_deferredLightsCache[ object.uuid ] = data;

			}

			data.used = true;

			var light = data.light;

			if ( light === null ) return;

			var scene = ( object.isPointLight === true ) ? _lightScene : _lightFullscreenScene;

			var lights = scene.userData.lights;

			if ( lights[ light.uuid ] === undefined ) {

				scene.add( light );

				lights[ light.uuid ] = {
					light: light,
					found: true
				};

			}

			lights[ light.uuid ].found = true;

		}

		function updateDeferredLightsInLightScene( scene ) {

			var lights = scene.userData.lights;
			var keys = Object.keys( lights );

			for ( var i = 0, il = keys.length; i < il; i ++ ) {

				var key = keys[ i ];

				if ( lights[ key ].found === false ) {

					scene.remove( lights[ key ].light );
					delete lights[ key ];

				} else {

					var light = lights[ key ].light;
					light.material = getDeferredLightMaterial( light );

					updateDeferredLight( light );
					lights[ key ].found = false;

				}

			}

		}

		function updateDeferredCommonUniforms( camera ) {

			var uniforms = ShaderDeferredCommon[ 'commonUniforms' ];

			uniforms.viewWidth.value = _width;
			uniforms.viewHeight.value = _height;

			uniforms.matProjInverse.value.getInverse( camera.projectionMatrix );

		}

		function enableFinalPasses() {

			if ( _lightPrePass ) {

				_passForward.renderToScreen = false;
				_passForward.enabled = false;

				_passCopy.renderToScreen = false;
				_passCopy.enabled = false;

				if ( _antialias ) {

					_passFinal.renderToScreen = false;

					_passFXAA.renderToScreen = true;
					_passFXAA.enabled = true;

				} else {

					_passFinal.renderToScreen = true;

					_passFXAA.renderToScreen = false;
					_passFXAA.enabled = false;

				}

			} else {

				if ( _hasTransparentObject ) {

					if ( _antialias ) {

						_passFinal.renderToScreen = false;

						_passForward.renderToScreen = false;
						_passForward.enabled = true;

						_passCopy.renderToScreen = false;
						_passCopy.enabled = false;

						_passFXAA.renderToScreen = true;
						_passFXAA.enabled = true;

					} else {

						_passFinal.renderToScreen = false;

						_passForward.renderToScreen = false;
						_passForward.enabled = true;

						_passCopy.renderToScreen = true;
						_passCopy.enabled = true;

						_passFXAA.renderToScreen = false;
						_passFXAA.enabled = false;

					}

				} else {

					if ( _antialias ) {

						_passFinal.renderToScreen = false;

						_passForward.renderToScreen = false;
						_passForward.enabled = false;

						_passCopy.renderToScreen = false;
						_passCopy.enabled = false;

						_passFXAA.renderToScreen = true;
						_passFXAA.enabled = true;

					} else {

						_passFinal.renderToScreen = true;

						_passForward.renderToScreen = false;
						_passForward.enabled = false;

						_passCopy.renderToScreen = false;
						_passCopy.enabled = false;

						_passFXAA.renderToScreen = false;
						_passFXAA.enabled = false;

					}

				}

			}

		}

		function createCacheData() {

			return {
				used: true,
				keepAlive: _cacheKeepAlive,
				count: 0
			};

		}

		function cleanupCache( cache ) {

			var keys = Object.keys( cache );

			for ( var i = 0, il = keys.length; i < il; i ++ ) {

				var key = keys[ i ];

				if ( cache[ key ].used === false ) {

					cache[ key ].count++;

					if ( cache[ key ].keepAlive === false && cache[ key ].count > _removeThresholdCount ) {

						delete cache[ key ];

					}

				} else {

					cache[ key ].used = false;
					cache[ key ].count = 0;

				}

			}

		}

		function cleanupTable( table ) {

			var keys = Object.keys( table );

			for ( var i = 0, il = keys.length; i < il; i ++ ) {

				var key = keys[ i ];

				table[ key ] = undefined;

			}

		}

		function cleanupCaches() {

			cleanupCache( _lightScenesCache );
			cleanupCache( _lightFullscreenScenesCache );
			cleanupCache( _normalDepthMaterialsCache );
			cleanupCache( _normalDepthShininessMaterialsCache );
			cleanupCache( _colorMaterialsCache );
			cleanupCache( _reconstructionMaterialsCache );
			cleanupCache( _classicDeferredLightMaterialsCache );
			cleanupCache( _lightPrePassMaterialsCache );
			cleanupCache( _deferredLightsCache );

			cleanupTable( _originalMaterialsTable );
			cleanupTable( _originalOnBeforeRendersTable );
			cleanupTable( _originalVisibleTable );

		}
		function renderNormalDepth( scene, camera ) {

			scene.traverse( setMaterialNormalDepth );

			_passNormalDepth.scene = scene;
			_passNormalDepth.camera = camera;

			_this.renderer.autoClearDepth = true;
			_this.renderer.autoClearStencil = true;

			_gl.enable( _gl.STENCIL_TEST );
			_gl.stencilFunc( _gl.ALWAYS, 1, 0xffffffff );
			_gl.stencilOp( _gl.REPLACE, _gl.REPLACE, _gl.REPLACE );

			_compNormalDepth.render();

			scene.traverse( restoreOriginalMaterial );

		}
		function renderColor( scene, camera ) {

			scene.traverse( setMaterialColor );

			_passColor.scene = scene;
			_passColor.camera = camera;

			_this.renderer.autoClearDepth = false;
			_this.renderer.autoClearStencil = false;

			_gl.stencilFunc( _gl.EQUAL, 1, 0xffffffff );
			_gl.stencilOp( _gl.KEEP, _gl.KEEP, _gl.KEEP );

			_compColor.render();

			scene.traverse( restoreOriginalMaterial );

		}
		function renderLight( scene, camera ) {

			scene.traverse( addDeferredLightsToLightScene );

			updateDeferredLightsInLightScene( _lightScene );
			updateDeferredLightsInLightScene( _lightFullscreenScene );

			_passLight.scene = _lightScene;
			_passLight.camera = camera;

			_passLightFullscreen.scene = _lightFullscreenScene;

			_this.renderer.autoClearDepth = false;
			_this.renderer.autoClearStencil = false;

			_compLight.render();

			_gl.disable( _gl.STENCIL_TEST );

		}
		function renderLightPre( scene, camera ) {

			scene.traverse( addDeferredLightsToLightScene );

			updateDeferredLightsInLightScene( _lightScene );
			updateDeferredLightsInLightScene( _lightFullscreenScene );

			_passLight.scene = _lightScene;
			_passLight.camera = camera;

			_passLightFullscreen.scene = _lightFullscreenScene;

			_this.renderer.autoClearDepth = false;
			_this.renderer.autoClearStencil = false;

			_gl.stencilFunc( _gl.EQUAL, 1, 0xffffffff );
			_gl.stencilOp( _gl.KEEP, _gl.KEEP, _gl.KEEP );

			_compLight.render();

		}
		function renderReconstruction( scene, camera ) {

			scene.traverse( setMaterialReconstruction );

			_passReconstruction.scene = scene;
			_passReconstruction.camera = camera;

			_this.renderer.autoClearDepth = false;
			_this.renderer.autoClearStencil = false;

			_compReconstruction.render();

			_gl.disable( _gl.STENCIL_TEST );

			scene.traverse( restoreOriginalMaterial );

		}
		function renderFinal( scene, camera ) {

			if ( ! _lightPrePass && _hasTransparentObject ) {

				scene.traverse( setVisibleForForwardRendering );
				scene.traverse( restoreOriginalOnBeforeRender );

				_passForward.scene = scene;
				_passForward.camera = camera;

			}

			enableFinalPasses();

			_this.renderer.autoClearDepth = false;
			_this.renderer.autoClearStencil = false;

			_compFinal.render();

			if ( ! _lightPrePass && _hasTransparentObject ) {

				scene.traverse( restoreVisible );

			}

		}

		// external APIs

		this.setSize = function ( width, height ) {

			_width = width;
			_height = height;

			this.renderer.setSize( _width, _height );

			_compNormalDepth.setSize( _width, _height );
			_compColor.setSize( _width, _height );
			_compLight.setSize( _width, _height );
			_compReconstruction.setSize( _width, _height );
			_compFinal.setSize( _width, _height );

			_depthTexture.image.width = _width;
			_depthTexture.image.height = _height;
			_depthTexture.needsUpdate = true;

			_passFXAA.uniforms.resolution.value.set( 1 / _width, 1 / _height );

		};

		this.setAntialias = function ( enabled ) {

			_antialias = enabled;

		};

		this.enableLightPrePass = function ( enabled ) {

			_lightPrePass = enabled;

			_passFinal.uniforms.samplerResult.value = ( _lightPrePass ) ? _compReconstruction.renderTarget2.texture : _compLight.renderTarget2.texture;

		};

		this.render = function ( scene, camera ) {

			// for debug to compare with normal forward rendering

			if ( this.forwardRendering ) {

				this.renderer.render( scene, camera );
				return;

			}

			var currentSceneAutoUpdate = scene.autoUpdate;
			var currentAutoClearColor = this.renderer.autoClearColor;
			var currentAutoClearDepth = this.renderer.autoClearDepth;
			var currentAutoClearStencil = this.renderer.autoClearStencil;

			_currentCamera = camera;

			initLightScene( scene );

			scene.autoUpdate = false;
			scene.updateMatrixWorld();

			_hasTransparentObject = false;

			scene.traverse( saveOriginalOnBeforeRenderAndCheckTransparency );

			updateDeferredCommonUniforms( camera );

			renderNormalDepth( scene, camera );

			if ( _lightPrePass ) {

				renderLightPre( scene, camera );
				renderReconstruction( scene, camera );

			} else {

				renderColor( scene, camera );
				renderLight( scene, camera );

			}

			renderFinal( scene, camera );

			scene.traverse( restoreOriginalOnBeforeRender );

			cleanupCaches();

			scene.autoUpdate = currentSceneAutoUpdate;
			this.renderer.autoClearColor = currentAutoClearColor;
			this.renderer.autoClearDepth = currentAutoClearDepth;
			this.renderer.autoClearStencil = currentAutoClearStencil;

		};

		// initialize

		init( parameters );

	};

	var DeferredShaderChunk = {

		packVector3: [

			"float vec3_to_float( vec3 data ) {",

			"	const float unit = 255.0/256.0;",
			"	highp float compressed = fract( data.x * unit ) + floor( data.y * unit * 255.0 ) + floor( data.z * unit * 255.0 ) * 255.0;",
			"	return compressed;",

			"}"

		].join( "\n" ),

		unpackFloat: [

			"vec3 float_to_vec3( float data ) {",

			"	const float unit = 255.0;",
			"	vec3 uncompressed;",
			"	uncompressed.x = fract( data );",
			"	float zInt = floor( data / unit );",
			"	uncompressed.z = fract( zInt / unit );",
			"	uncompressed.y = fract( floor( data - ( zInt * unit ) ) / unit );",
			"	return uncompressed;",

			"}"

		].join( "\n" ),

		// Refer to http://aras-p.info/texts/CompactNormalStorage.html
		packNormal: [

			"vec2 normal_to_vec2( vec3 normal ) {",

			"	return normal.xy / sqrt( normal.z * 8.0 + 8.0 ) + 0.5;",

			"}"

		].join( "\n" ),

		unpackVector2: [

			"vec3 vec2_to_normal( vec2 data ) {",

			"	vec2 fenc = data * 4.0 - 2.0;",
			"	float f = dot( fenc, fenc );",
			"	float g = sqrt( 1.0 - f / 4.0 );",
			"	vec3 normal;",
			"	normal.xy = fenc * g;",
			"	normal.z = 1.0 - f / 2.0;",
			"	return normal;",

			"}"

		].join( "\n" ),

		computeTextureCoord: [

			"vec2 texCoord = gl_FragCoord.xy / vec2( viewWidth, viewHeight );"

		].join( "\n" ),

		packNormalDepth: [

			"vec4 packedNormalDepth;",
			"packedNormalDepth.xyz = normal * 0.5 + 0.5;",
			"packedNormalDepth.w = position.z / position.w;"

		].join( "\n" ),

		unpackNormalDepth: [

			"vec4 normalDepthMap = texture2D( samplerNormalDepth, texCoord );",
			"float depth = normalDepthMap.w;",

			"if ( depth == 0.0 ) discard;",

			"vec3 normal = normalDepthMap.xyz * 2.0 - 1.0;"

		].join( "\n" ),

		packNormalDepthShininess: [

			"vec4 packedNormalDepthShininess;",
			"packedNormalDepthShininess.xy = normal_to_vec2( normal );",
			"packedNormalDepthShininess.z = shininess;",
			"packedNormalDepthShininess.w = position.z / position.w;"

		].join( "\n" ),

		unpackNormalDepthShininess: [

			"vec4 normalDepthMap = texture2D( samplerNormalDepthShininess, texCoord );",
			"float depth = normalDepthMap.w;",

			"if ( depth == 0.0 ) discard;",

			"vec3 normal = vec2_to_normal( normalDepthMap.xy );",
			"float shininess = normalDepthMap.z;"

		].join( "\n" ),

		packColor: [

			"vec4 packedColor;",
			"packedColor.x = vec3_to_float( diffuseColor.rgb );",
			"packedColor.y = vec3_to_float( emissiveColor );",
			"packedColor.z = vec3_to_float( specularColor );",
			"packedColor.w = shininess;"

		].join( "\n" ),

		unpackColor: [

			"vec4 colorMap = texture2D( samplerColor, texCoord );",
			"vec3 diffuseColor = float_to_vec3( colorMap.x );",
			"vec3 emissiveColor = float_to_vec3( colorMap.y );",
			"vec3 specularColor = float_to_vec3( colorMap.z );",
			"float shininess = colorMap.w;"

		].join( "\n" ),

		packLight: [

			"vec4 packedLight;",
			"packedLight.xyz = lightIntensity * lightColor * max( dot( lightVector, normal ), 0.0 ) * attenuation;",
			"packedLight.w = lightIntensity * specular * max( dot( lightVector, normal ), 0.0 ) * attenuation;"

		].join( "\n" ),

		computeVertexPositionVS: [

			"vec2 xy = texCoord * 2.0 - 1.0;",
			"vec4 vertexPositionProjected = vec4( xy, depth, 1.0 );",
			"vec4 vertexPositionVS = matProjInverse * vertexPositionProjected;",
			"vertexPositionVS.xyz /= vertexPositionVS.w;",
			"vertexPositionVS.w = 1.0;"

		].join( "\n" ),

		// TODO: calculate schlick
		computeSpecular: [

			"vec3 halfVector = normalize( lightVector - normalize( vertexPositionVS.xyz ) );",
			"float dotNormalHalf = max( dot( normal, halfVector ), 0.0 );",
			"float specular = 0.31830988618 * ( shininess * 0.5 + 1.0 ) * pow( dotNormalHalf, shininess );"

		].join( "\n" ),

		combine: [

			"gl_FragColor = vec4( lightIntensity * lightColor * max( dot( lightVector, normal ), 0.0 ) * ( diffuseColor + specular * specularColor ) * attenuation, 1.0 );"

		].join( "\n" )

	};

	var ShaderDeferredCommon = {

		commonUniforms: {

			matProjInverse: new Uniform( new Matrix4() ),

			viewWidth: new Uniform( 800 ),
			viewHeight: new Uniform( 600 )

		}

	};

	var ShaderDeferred = {

		normalDepth: {

			uniforms: {},

			vertexShader: [

				"varying vec3 vNormal;",
				"varying vec4 vPosition;",

				"#include <morphtarget_pars_vertex>",
				"#include <skinning_pars_vertex>",

				"void main() {",

				"#include <begin_vertex>",
				"#include <beginnormal_vertex>",
				"#include <skinbase_vertex>",
				"#include <skinnormal_vertex>",
				"#include <defaultnormal_vertex>",
				"#include <morphtarget_vertex>",
				"#include <skinning_vertex>",
				"#include <project_vertex>",

				"	vNormal = normalize( transformedNormal );",
				"	vPosition = gl_Position;",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"varying vec3 vNormal;",
				"varying vec4 vPosition;",

				"void main() {",

				"	vec3 normal = vNormal;",
				"	vec4 position = vPosition;",

				DeferredShaderChunk[ "packNormalDepth" ],

				"	gl_FragColor = packedNormalDepth;",

				"}"

			].join( "\n" )

		},

		color: {

			uniforms: {

				map: new Uniform( null ),
				offsetRepeat: new Uniform( new Vector4( 0, 0, 1, 1 ) ),

				diffuse: new Uniform( new Color( 0x000000 ) ),
				emissive: new Uniform( new Color( 0x000000 ) ),
				specular: new Uniform( new Color( 0x000000 ) ),
				shininess: new Uniform( 30.0 )

			},

			vertexShader: [

				"#include <uv_pars_vertex>",
				"#include <morphtarget_pars_vertex>",
				"#include <skinning_pars_vertex>",

				"void main() {",

				"#include <uv_vertex>",
				"#include <begin_vertex>",
				"#include <beginnormal_vertex>",
				"#include <skinbase_vertex>",
				"#include <skinnormal_vertex>",
				"#include <defaultnormal_vertex>",
				"#include <morphtarget_vertex>",
				"#include <skinning_vertex>",
				"#include <project_vertex>",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"uniform vec3 diffuse;",
				"uniform vec3 emissive;",
				"uniform vec3 specular;",
				"uniform float shininess;",

				"#include <uv_pars_fragment>",
				"#include <map_pars_fragment>",
				DeferredShaderChunk[ "packVector3" ],

				"void main() {",

				"	vec4 diffuseColor = vec4( diffuse, 1.0 );",
				"	vec3 emissiveColor = emissive;",
				"	vec3 specularColor = specular;",

				"#include <map_fragment>",
				DeferredShaderChunk[ "packColor" ],

				"	gl_FragColor = packedColor;",

				"}"

			].join( "\n" )

		},

		emissiveLight: {

			uniforms: Object.assign(

				{

					samplerColor: new Uniform( null )

				},

				ShaderDeferredCommon[ 'commonUniforms' ]

			),

			vertexShader: [

				"void main() { ",

				"	gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );",

				"}"

			].join( '\n' ),

			fragmentShader: [

				"uniform sampler2D samplerColor;",

				"uniform float viewHeight;",
				"uniform float viewWidth;",

				DeferredShaderChunk[ "unpackFloat" ],

				"void main() {",

				DeferredShaderChunk[ "computeTextureCoord" ],
				DeferredShaderChunk[ "unpackColor" ],

				"	gl_FragColor = vec4( emissiveColor, 1.0 );",

				"}"

			].join( '\n' )

		},

		pointLight: {

			uniforms: Object.assign(

				{

					samplerNormalDepth: new Uniform( null ),
					samplerColor: new Uniform( null ),

					lightColor: new Uniform( new Color( 0x000000 ) ),
					lightPositionVS: new Uniform( new Vector3( 0, 1, 0 ) ),
					lightIntensity: new Uniform( 1.0 ),
					lightRadius: new Uniform( 1.0 )

				},

				ShaderDeferredCommon[ 'commonUniforms' ]

			),

			vertexShader: [

				"void main() {",

				"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"uniform sampler2D samplerNormalDepth;",
				"uniform sampler2D samplerColor;",

				"uniform float viewHeight;",
				"uniform float viewWidth;",

				"uniform vec3 lightColor;",
				"uniform vec3 lightPositionVS;",
				"uniform float lightIntensity;",
				"uniform float lightRadius;",

				"uniform mat4 matProjInverse;",

				DeferredShaderChunk[ "unpackFloat" ],

				"void main() {",

				DeferredShaderChunk[ "computeTextureCoord" ],
				DeferredShaderChunk[ "unpackNormalDepth" ],
				DeferredShaderChunk[ "computeVertexPositionVS" ],

				"	vec3 lightVector = lightPositionVS - vertexPositionVS.xyz;",
				"	float distance = length( lightVector );",

				"	if ( distance > lightRadius ) discard;",

				"	lightVector = normalize( lightVector );",

				DeferredShaderChunk[ "unpackColor" ],
				DeferredShaderChunk[ "computeSpecular" ],

				"	//float cutoff = 0.3;",
				"	//float denom = distance / lightRadius + 1.0;",
				"	//float attenuation = 1.0 / ( denom * denom );",
				"	//attenuation = ( attenuation - cutoff ) / ( 1.0 - cutoff );",
				"	//attenuation = max( attenuation, 0.0 );",
				"	//attenuation *= attenuation;",

				"	//diffuseColor *= saturate( -distance / lightRadius + 1.0 );",
				"	//float attenuation = 1.0;",

				"	float attenuation = saturate( -distance / lightRadius + 1.0 );",

				DeferredShaderChunk[ "combine" ],

				"}"

			].join( "\n" )

		},

		spotLight: {

			uniforms: Object.assign(

				{

					samplerNormalDepth: new Uniform( null ),
					samplerColor: new Uniform( null ),

					lightColor: new Uniform( new Color( 0x000000 ) ),
					lightDirectionVS: new Uniform( new Vector3( 0, 1, 0 ) ),
					lightPositionVS: new Uniform( new Vector3( 0, 1, 0 ) ),
					lightAngle: new Uniform( 1.0 ),
					lightIntensity: new Uniform( 1.0 )

				},

				ShaderDeferredCommon[ 'commonUniforms' ]

			),

			vertexShader: [

				"void main() { ",

				"	gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"uniform sampler2D samplerNormalDepth;",
				"uniform sampler2D samplerColor;",

				"uniform float viewHeight;",
				"uniform float viewWidth;",

				"uniform vec3 lightColor;",
				"uniform vec3 lightPositionVS;",
				"uniform vec3 lightDirectionVS;",
				"uniform float lightAngle;",
				"uniform float lightIntensity;",

				"uniform mat4 matProjInverse;",

				DeferredShaderChunk[ "unpackFloat" ],

				"void main() {",

				DeferredShaderChunk[ "computeTextureCoord" ],
				DeferredShaderChunk[ "unpackNormalDepth" ],
				DeferredShaderChunk[ "computeVertexPositionVS" ],
				DeferredShaderChunk[ "unpackColor" ],

				"	vec3 lightVector = normalize( lightPositionVS.xyz - vertexPositionVS.xyz );",

				"	float rho = dot( lightDirectionVS, lightVector );",
				"	float rhoMax = cos( lightAngle );",

				"	if ( rho <= rhoMax ) discard;",

				"	float theta = rhoMax + 0.0001;",
				"	float phi = rhoMax + 0.05;",
				"	float falloff = 4.0;",

				"	float spot = 0.0;",

				"	if ( rho >= phi ) {",

				"		spot = 1.0;",

				"	} else if ( rho <= theta ) {",

				"		spot = 0.0;",

				"	} else { ",

				"		spot = pow( ( rho - theta ) / ( phi - theta ), falloff );",

				"	}",

				"	diffuseColor *= spot;",

				DeferredShaderChunk[ "computeSpecular" ],

				"	const float attenuation = 1.0;",

				DeferredShaderChunk[ "combine" ],

				"}"

			].join( "\n" )

		},

		directionalLight: {

			uniforms: Object.assign(

				{

					samplerNormalDepth: new Uniform( null ),
					samplerColor: new Uniform( null ),

					lightColor: new Uniform( new Color( 0x000000 ) ),
					lightDirectionVS: new Uniform( new Vector3( 0, 1, 0 ) ),
					lightIntensity: new Uniform( 1.0 )
				},

				ShaderDeferredCommon[ 'commonUniforms' ]

			),

			vertexShader: [

				"void main() { ",

				"	gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );",

				"}"

			].join( '\n' ),

			fragmentShader: [

				"uniform sampler2D samplerNormalDepth;",
				"uniform sampler2D samplerColor;",

				"uniform float viewHeight;",
				"uniform float viewWidth;",

				"uniform vec3 lightColor;",
				"uniform vec3 lightDirectionVS;",
				"uniform float lightIntensity;",

				"uniform mat4 matProjInverse;",

				DeferredShaderChunk[ "unpackFloat" ],

				"void main() {",

				DeferredShaderChunk[ "computeTextureCoord" ],
				DeferredShaderChunk[ "unpackNormalDepth" ],
				DeferredShaderChunk[ "computeVertexPositionVS" ],
				DeferredShaderChunk[ "unpackColor" ],

				"	vec3 lightVector = normalize( lightDirectionVS );",

				DeferredShaderChunk[ "computeSpecular" ],

				"	const float attenuation = 1.0;",

				DeferredShaderChunk[ "combine" ],

				"}"

			].join( '\n' )

		},

		normalDepthShininess: {

			uniforms: {

				shininess: new Uniform( 30.0 )

			},

			vertexShader: [

				"varying vec3 vNormal;",
				"varying vec4 vPosition;",

				"#include <morphtarget_pars_vertex>",
				"#include <skinning_pars_vertex>",

				"void main() {",

				"#include <begin_vertex>",
				"#include <beginnormal_vertex>",
				"#include <skinbase_vertex>",
				"#include <skinnormal_vertex>",
				"#include <defaultnormal_vertex>",
				"#include <morphtarget_vertex>",
				"#include <skinning_vertex>",
				"#include <project_vertex>",

				"	vNormal = normalize( transformedNormal );",
				"	vPosition = gl_Position;",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"varying vec3 vNormal;",
				"varying vec4 vPosition;",

				"uniform float shininess;",

				DeferredShaderChunk[ "packNormal" ],

				"void main() {",

				"	vec3 normal = vNormal;",
				"	vec4 position = vPosition;",

				DeferredShaderChunk[ "packNormalDepthShininess" ],

				"	gl_FragColor = packedNormalDepthShininess;",

				"}"

			].join( "\n" )

		},

		pointLightPre: {

			uniforms: Object.assign(

				{

					samplerNormalDepthShininess: new Uniform( null ),

					lightColor: new Uniform( new Color( 0x000000 ) ),
					lightPositionVS: new Uniform( new Vector3( 0, 1, 0 ) ),
					lightIntensity: new Uniform( 1.0 ),
					lightRadius: new Uniform( 1.0 )
				},

				ShaderDeferredCommon[ 'commonUniforms' ]

			),
			vertexShader: [

				"void main() {",

				"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"uniform sampler2D samplerNormalDepthShininess;",

				"uniform float viewHeight;",
				"uniform float viewWidth;",

				"uniform vec3 lightColor;",
				"uniform vec3 lightPositionVS;",
				"uniform float lightIntensity;",
				"uniform float lightRadius;",

				"uniform mat4 matProjInverse;",

				DeferredShaderChunk[ "unpackFloat" ],
				DeferredShaderChunk[ "unpackVector2" ],

				"void main() {",

				DeferredShaderChunk[ "computeTextureCoord" ],
				DeferredShaderChunk[ "unpackNormalDepthShininess" ],
				DeferredShaderChunk[ "computeVertexPositionVS" ],

				"	vec3 lightVector = lightPositionVS - vertexPositionVS.xyz;",
				"	float distance = length( lightVector );",

				"	if ( distance > lightRadius ) discard;",

				"	lightVector = normalize( lightVector );",

				DeferredShaderChunk[ "computeSpecular" ],

				"	float attenuation = saturate( -distance / lightRadius + 1.0 );",

				DeferredShaderChunk[ "packLight" ],

				"	gl_FragColor = packedLight;",

				"}"

			].join( "\n" )

		},

		spotLightPre: {

			uniforms: Object.assign(

				{

					samplerNormalDepthShininess: new Uniform( null ),

					lightColor: new Uniform( new Color( 0x000000 ) ),
					lightDirectionVS: new Uniform( new Vector3( 0, 1, 0 ) ),
					lightPositionVS: new Uniform( new Vector3( 0, 1, 0 ) ),
					lightAngle: new Uniform( 1.0 ),
					lightIntensity: new Uniform( 1.0 )

				},

				ShaderDeferredCommon[ 'commonUniforms' ]

			),

			vertexShader: [

				"void main() { ",

				"	gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"uniform sampler2D samplerNormalDepthShininess;",

				"uniform float viewHeight;",
				"uniform float viewWidth;",

				"uniform vec3 lightColor;",
				"uniform vec3 lightPositionVS;",
				"uniform vec3 lightDirectionVS;",
				"uniform float lightAngle;",
				"uniform float lightIntensity;",

				"uniform mat4 matProjInverse;",

				DeferredShaderChunk[ "unpackFloat" ],
				DeferredShaderChunk[ "unpackVector2" ],

				"void main() {",

				DeferredShaderChunk[ "computeTextureCoord" ],
				DeferredShaderChunk[ "unpackNormalDepthShininess" ],
				DeferredShaderChunk[ "computeVertexPositionVS" ],

				"	vec3 lightVector = normalize( lightPositionVS.xyz - vertexPositionVS.xyz );",

				"	float rho = dot( lightDirectionVS, lightVector );",
				"	float rhoMax = cos( lightAngle );",

				"	if ( rho <= rhoMax ) discard;",

				"	float theta = rhoMax + 0.0001;",
				"	float phi = rhoMax + 0.05;",
				"	float falloff = 4.0;",

				"	float spot = 0.0;",

				"	if ( rho >= phi ) {",

				"		spot = 1.0;",

				"	} else if ( rho <= theta ) {",

				"		spot = 0.0;",

				"	} else { ",

				"		spot = pow( ( rho - theta ) / ( phi - theta ), falloff );",

				"	}",

				DeferredShaderChunk[ "computeSpecular" ],

				"	const float attenuation = 1.0;",

				DeferredShaderChunk[ "packLight" ],

				"	gl_FragColor = spot * packedLight;",

				"}"

			].join( "\n" )

		},

		directionalLightPre: {

			uniforms: Object.assign(

				{

					samplerNormalDepthShininess: new Uniform( null ),

					lightColor: new Uniform( new Color( 0x000000 ) ),
					lightDirectionVS: new Uniform( new Vector3( 0, 1, 0 ) ),
					lightIntensity: new Uniform( 1.0 )

				},

				ShaderDeferredCommon[ 'commonUniforms' ]

			),

			vertexShader: [

				"void main() { ",

				"	gl_Position = vec4( sign( position.xy ), 0.0, 1.0 );",

				"}"

			].join( '\n' ),

			fragmentShader: [

				"uniform sampler2D samplerNormalDepthShininess;",

				"uniform float viewHeight;",
				"uniform float viewWidth;",

				"uniform vec3 lightColor;",
				"uniform vec3 lightDirectionVS;",
				"uniform float lightIntensity;",

				"uniform mat4 matProjInverse;",

				DeferredShaderChunk[ "unpackFloat" ],
				DeferredShaderChunk[ "unpackVector2" ],

				"void main() {",

				DeferredShaderChunk[ "computeTextureCoord" ],
				DeferredShaderChunk[ "unpackNormalDepthShininess" ],
				DeferredShaderChunk[ "computeVertexPositionVS" ],

				"	vec3 lightVector = normalize( lightDirectionVS );",

				DeferredShaderChunk[ "computeSpecular" ],

				"	const float attenuation = 1.0;",

				DeferredShaderChunk[ "packLight" ],

				"	gl_FragColor = packedLight;",

				"}"

			].join( '\n' )

		},

		reconstruction: {

			uniforms: Object.assign(

				{

					samplerLight: new Uniform( null ),

					map: new Uniform( null ),
					offsetRepeat: new Uniform( new Vector4( 0, 0, 1, 1 ) ),

					diffuse: new Uniform( new Color( 0x000000 ) ),
					emissive: new Uniform( new Color( 0x000000 ) ),
					specular: new Uniform( new Color( 0x000000 ) ),
					shininess: new Uniform( 30.0 )

				},

				ShaderDeferredCommon[ 'commonUniforms' ]

			),

			vertexShader: [

				"#include <uv_pars_vertex>",
				"#include <morphtarget_pars_vertex>",
				"#include <skinning_pars_vertex>",

				"void main() {",

				"#include <uv_vertex>",
				"#include <begin_vertex>",
				"#include <beginnormal_vertex>",
				"#include <skinbase_vertex>",
				"#include <skinnormal_vertex>",
				"#include <defaultnormal_vertex>",
				"#include <morphtarget_vertex>",
				"#include <skinning_vertex>",
				"#include <project_vertex>",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"uniform sampler2D samplerLight;",

				"uniform vec3 diffuse;",
				"uniform vec3 emissive;",
				"uniform vec3 specular;",
				"uniform float shininess;",

				"uniform float viewHeight;",
				"uniform float viewWidth;",

				"#include <uv_pars_fragment>",
				"#include <map_pars_fragment>",

				DeferredShaderChunk[ "unpackFloat" ],

				"void main() {",

				"	vec4 diffuseColor = vec4( diffuse, 1.0 );",
				"	vec3 emissiveColor = emissive;",
				"	vec3 specularColor = specular;",

				DeferredShaderChunk[ "computeTextureCoord" ],

				"	vec4 light = texture2D( samplerLight, texCoord );",

				"#include <map_fragment>",

				"	vec3 diffuseFinal = diffuseColor.rgb * light.rgb;",
				"	vec3 emissiveFinal = emissiveColor;",
				"	vec3 specularFinal = specularColor * light.rgb * light.a;",

				"	gl_FragColor = vec4( diffuseFinal + emissiveFinal + specularFinal, 1.0 );",

				"}"

			].join( "\n" )

		},

		// TODO: implement tone mapping
		final: {

			uniforms: {

				samplerResult: new Uniform( null )

			},

			vertexShader: [

				"varying vec2 texCoord;",

				"void main() {",

				"	vec4 pos = vec4( sign( position.xy ), 0.0, 1.0 );",
				"	texCoord = pos.xy * vec2( 0.5 ) + 0.5;",
				"	gl_Position = pos;",

				"}"

			].join( "\n" ),

			fragmentShader: [

				"varying vec2 texCoord;",
				"uniform sampler2D samplerResult;",

				"void main() {",

				"	gl_FragColor = texture2D( samplerResult, texCoord );",

				"}"

			].join( "\n" )

		}

	};

	exports.WebGLDeferredRenderer = WebGLDeferredRenderer;

	return exports;

}({}));
