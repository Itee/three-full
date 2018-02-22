import { Interpolant } from '../math/Interpolant.js'
import { FileLoader } from './FileLoader.js'
import { Color } from '../math/Color.js'
import { DirectionalLight } from '../lights/DirectionalLight.js'
import { PointLight } from '../lights/PointLight.js'
import { SpotLight } from '../lights/SpotLight.js'
import { AmbientLight } from '../lights/AmbientLight.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { MeshStandardMaterial } from '../materials/MeshStandardMaterial.js'
import { BufferAttribute } from '../core/BufferAttribute.js'
import { TextureLoader } from './TextureLoader.js'
import { InterleavedBuffer } from '../core/InterleavedBuffer.js'
import { InterleavedBufferAttribute } from '../core/InterleavedBufferAttribute.js'
import { Vector2 } from '../math/Vector2.js'
import { BufferGeometry } from '../core/BufferGeometry.js'
import { Group } from '../objects/Group.js'
import { SkinnedMesh } from '../objects/SkinnedMesh.js'
import { Mesh } from '../objects/Mesh.js'
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js'
import { LineSegments } from '../objects/LineSegments.js'
import { Line } from '../objects/Line.js'
import { LineLoop } from '../objects/LineLoop.js'
import { PointsMaterial } from '../materials/PointsMaterial.js'
import { Points } from '../objects/Points.js'
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { AnimationClip } from '../animation/AnimationClip.js'
import { Bone } from '../objects/Bone.js'
import { Object3D } from '../core/Object3D.js'
import { Matrix4 } from '../math/Matrix4.js'
import { Skeleton } from '../objects/Skeleton.js'
import { Scene } from '../scenes/Scene.js'
import {
	FrontSide,
	BackSide,
	DoubleSide,
	VertexColors,
	AddEquation,
	SubtractEquation,
	ReverseSubtractEquation,
	ZeroFactor,
	OneFactor,
	SrcColorFactor,
	OneMinusSrcColorFactor,
	SrcAlphaFactor,
	OneMinusSrcAlphaFactor,
	DstAlphaFactor,
	OneMinusDstAlphaFactor,
	DstColorFactor,
	OneMinusDstColorFactor,
	SrcAlphaSaturateFactor,
	NeverDepth,
	AlwaysDepth,
	LessDepth,
	LessEqualDepth,
	EqualDepth,
	GreaterEqualDepth,
	NotEqualDepth,
	RepeatWrapping,
	ClampToEdgeWrapping,
	MirroredRepeatWrapping,
	NearestFilter,
	NearestMipMapNearestFilter,
	NearestMipMapLinearFilter,
	LinearFilter,
	LinearMipMapNearestFilter,
	LinearMipMapLinearFilter,
	UnsignedByteType,
	UnsignedShort4444Type,
	UnsignedShort5551Type,
	UnsignedShort565Type,
	AlphaFormat,
	RGBFormat,
	RGBAFormat,
	LuminanceFormat,
	LuminanceAlphaFormat,
	InterpolateDiscrete,
	InterpolateLinear,
	InterpolateSmooth,
	TriangleStripDrawMode,
	TriangleFanDrawMode,
	sRGBEncoding
} from '../constants.js'
import { DefaultLoadingManager } from './LoadingManager.js'
import { MeshPhongMaterial } from '../materials/MeshPhongMaterial.js'
import { MeshLambertMaterial } from '../materials/MeshLambertMaterial.js'
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js'
import { ShaderLib } from '../renderers/shaders/ShaderLib.js'
import { UniformsUtils } from '../renderers/shaders/UniformsUtils.js'
import { Loader } from './Loader.js'
import { LoaderUtils } from './LoaderUtils.js'
import { AnimationUtils } from '../animation/AnimationUtils.js'
import { _Math } from '../math/Math.js'
import { Matrix3 } from '../math/Matrix3.js'
import { Vector3 } from '../math/Vector3.js'
import { Vector4 } from '../math/Vector4.js'
import { Texture } from '../textures/Texture.js'
import { Material } from '../materials/Material.js'
import { NumberKeyframeTrack } from '../animation/tracks/NumberKeyframeTrack.js'
import { QuaternionKeyframeTrack } from '../animation/tracks/QuaternionKeyframeTrack.js'
import { VectorKeyframeTrack } from '../animation/tracks/VectorKeyframeTrack.js'
import { PropertyBinding } from '../animation/PropertyBinding.js'



var GLTFLoader = ( function () {

	function GLTFLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	}

	GLTFLoader.prototype = {

		constructor: GLTFLoader,

		crossOrigin: 'Anonymous',

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var path = this.path !== undefined ? this.path : LoaderUtils.extractUrlBase( url );

			var loader = new FileLoader( scope.manager );

			loader.setResponseType( 'arraybuffer' );

			loader.load( url, function ( data ) {

				try {

					scope.parse( data, path, onLoad, onError );

				} catch ( e ) {

					if ( onError !== undefined ) {

						onError( e );

					} else {

						throw e;

					}

				}

			}, onProgress, onError );

		},

		setCrossOrigin: function ( value ) {

			this.crossOrigin = value;
			return this;

		},

		setPath: function ( value ) {

			this.path = value;
			return this;

		},

		parse: function ( data, path, onLoad, onError ) {

			var content;
			var extensions = {};

			if ( typeof data === 'string' ) {

				content = data;

			} else {

				var magic = LoaderUtils.decodeText( new Uint8Array( data, 0, 4 ) );

				if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

					try {

						extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );

					} catch ( error ) {

						if ( onError ) onError( error );
						return;

					}

					content = extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content;

				} else {

					content = LoaderUtils.decodeText( new Uint8Array( data ) );

				}

			}

			var json = JSON.parse( content );

			if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

				if ( onError ) onError( new Error( 'GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead.' ) );
				return;

			}

			if ( json.extensionsUsed ) {

				if ( json.extensionsUsed.indexOf( EXTENSIONS.KHR_LIGHTS ) >= 0 ) {

					extensions[ EXTENSIONS.KHR_LIGHTS ] = new GLTFLightsExtension( json );

				}

				if ( json.extensionsUsed.indexOf( EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ) >= 0 ) {

					extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ] = new GLTFMaterialsPbrSpecularGlossinessExtension();

				}

			}

			console.time( 'GLTFLoader' );

			var parser = new GLTFParser( json, extensions, {

				path: path || this.path || '',
				crossOrigin: this.crossOrigin,
				manager: this.manager

			} );

			parser.parse( function ( scene, scenes, cameras, animations, asset ) {

				console.timeEnd( 'GLTFLoader' );

				var glTF = {
					scene: scene,
					scenes: scenes,
					cameras: cameras,
					animations: animations,
					asset: asset
				};

				onLoad( glTF );

			}, onError );

		}

	};

	

	function GLTFRegistry() {

		var objects = {};

		return	{

			get: function ( key ) {

				return objects[ key ];

			},

			add: function ( key, object ) {

				objects[ key ] = object;

			},

			remove: function ( key ) {

				delete objects[ key ];

			},

			removeAll: function () {

				objects = {};

			}

		};

	}

	
	
	

	var EXTENSIONS = {
		KHR_BINARY_GLTF: 'KHR_binary_glTF',
		KHR_LIGHTS: 'KHR_lights',
		KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness'
	};

	
	function GLTFLightsExtension( json ) {

		this.name = EXTENSIONS.KHR_LIGHTS;

		this.lights = {};

		var extension = ( json.extensions && json.extensions[ EXTENSIONS.KHR_LIGHTS ] ) || {};
		var lights = extension.lights || {};

		for ( var lightId in lights ) {

			var light = lights[ lightId ];
			var lightNode;

			var color = new Color().fromArray( light.color );

			switch ( light.type ) {

				case 'directional':
					lightNode = new DirectionalLight( color );
					lightNode.position.set( 0, 0, 1 );
					break;

				case 'point':
					lightNode = new PointLight( color );
					break;

				case 'spot':
					lightNode = new SpotLight( color );
					lightNode.position.set( 0, 0, 1 );
					break;

				case 'ambient':
					lightNode = new AmbientLight( color );
					break;

			}

			if ( lightNode ) {

				if ( light.constantAttenuation !== undefined ) {

					lightNode.intensity = light.constantAttenuation;

				}

				if ( light.linearAttenuation !== undefined ) {

					lightNode.distance = 1 / light.linearAttenuation;

				}

				if ( light.quadraticAttenuation !== undefined ) {

					lightNode.decay = light.quadraticAttenuation;

				}

				if ( light.fallOffAngle !== undefined ) {

					lightNode.angle = light.fallOffAngle;

				}

				if ( light.fallOffExponent !== undefined ) {

					console.warn( 'GLTFLoader:: light.fallOffExponent not currently supported.' );

				}

				lightNode.name = light.name || ( 'light_' + lightId );
				this.lights[ lightId ] = lightNode;

			}

		}

	}

	

	var BINARY_EXTENSION_BUFFER_NAME = 'binary_glTF';
	var BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
	var BINARY_EXTENSION_HEADER_LENGTH = 12;
	var BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

	function GLTFBinaryExtension( data ) {

		this.name = EXTENSIONS.KHR_BINARY_GLTF;
		this.content = null;
		this.body = null;

		var headerView = new DataView( data, 0, BINARY_EXTENSION_HEADER_LENGTH );

		this.header = {
			magic: LoaderUtils.decodeText( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

			throw new Error( 'GLTFLoader: Unsupported glTF-Binary header.' );

		} else if ( this.header.version < 2.0 ) {

			throw new Error( 'GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.' );

		}

		var chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
		var chunkIndex = 0;

		while ( chunkIndex < chunkView.byteLength ) {

			var chunkLength = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			var chunkType = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

				var contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
				this.content = LoaderUtils.decodeText( contentArray );

			} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

				var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
				this.body = data.slice( byteOffset, byteOffset + chunkLength );

			}

			// Clients must ignore chunks with unknown types.

			chunkIndex += chunkLength;

		}

		if ( this.content === null ) {

			throw new Error( 'GLTFLoader: JSON content not found.' );

		}

	}

	
	function GLTFMaterialsPbrSpecularGlossinessExtension() {

		return {

			name: EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,

			specularGlossinessParams: [
				'color',
				'map',
				'lightMap',
				'lightMapIntensity',
				'aoMap',
				'aoMapIntensity',
				'emissive',
				'emissiveIntensity',
				'emissiveMap',
				'bumpMap',
				'bumpScale',
				'normalMap',
				'displacementMap',
				'displacementScale',
				'displacementBias',
				'specularMap',
				'specular',
				'glossinessMap',
				'glossiness',
				'alphaMap',
				'envMap',
				'envMapIntensity',
				'refractionRatio',
			],

			getMaterialType: function () {

				return ShaderMaterial;

			},

			extendParams: function ( params, material, parser ) {

				var pbrSpecularGlossiness = material.extensions[ this.name ];

				var shader = ShaderLib[ 'standard' ];

				var uniforms = UniformsUtils.clone( shader.uniforms );

				var specularMapParsFragmentChunk = [
					'#ifdef USE_SPECULARMAP',
					'	uniform sampler2D specularMap;',
					'#endif'
				].join( '\n' );

				var glossinessMapParsFragmentChunk = [
					'#ifdef USE_GLOSSINESSMAP',
					'	uniform sampler2D glossinessMap;',
					'#endif'
				].join( '\n' );

				var specularMapFragmentChunk = [
					'vec3 specularFactor = specular;',
					'#ifdef USE_SPECULARMAP',
					'	vec4 texelSpecular = texture2D( specularMap, vUv );',
					'	texelSpecular = sRGBToLinear( texelSpecular );',
					'	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture',
					'	specularFactor *= texelSpecular.rgb;',
					'#endif'
				].join( '\n' );

				var glossinessMapFragmentChunk = [
					'float glossinessFactor = glossiness;',
					'#ifdef USE_GLOSSINESSMAP',
					'	vec4 texelGlossiness = texture2D( glossinessMap, vUv );',
					'	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture',
					'	glossinessFactor *= texelGlossiness.a;',
					'#endif'
				].join( '\n' );

				var lightPhysicalFragmentChunk = [
					'PhysicalMaterial material;',
					'material.diffuseColor = diffuseColor.rgb;',
					'material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );',
					'material.specularColor = specularFactor.rgb;',
				].join( '\n' );

				var fragmentShader = shader.fragmentShader
					.replace( '#include <specularmap_fragment>', '' )
					.replace( 'uniform float roughness;', 'uniform vec3 specular;' )
					.replace( 'uniform float metalness;', 'uniform float glossiness;' )
					.replace( '#include <roughnessmap_pars_fragment>', specularMapParsFragmentChunk )
					.replace( '#include <metalnessmap_pars_fragment>', glossinessMapParsFragmentChunk )
					.replace( '#include <roughnessmap_fragment>', specularMapFragmentChunk )
					.replace( '#include <metalnessmap_fragment>', glossinessMapFragmentChunk )
					.replace( '#include <lights_physical_fragment>', lightPhysicalFragmentChunk );

				delete uniforms.roughness;
				delete uniforms.metalness;
				delete uniforms.roughnessMap;
				delete uniforms.metalnessMap;

				uniforms.specular = { value: new Color().setHex( 0x111111 ) };
				uniforms.glossiness = { value: 0.5 };
				uniforms.specularMap = { value: null };
				uniforms.glossinessMap = { value: null };

				params.vertexShader = shader.vertexShader;
				params.fragmentShader = fragmentShader;
				params.uniforms = uniforms;
				params.defines = { 'STANDARD': '' };

				params.color = new Color( 1.0, 1.0, 1.0 );
				params.opacity = 1.0;

				var pending = [];

				if ( Array.isArray( pbrSpecularGlossiness.diffuseFactor ) ) {

					var array = pbrSpecularGlossiness.diffuseFactor;

					params.color.fromArray( array );
					params.opacity = array[ 3 ];

				}

				if ( pbrSpecularGlossiness.diffuseTexture !== undefined ) {

					pending.push( parser.assignTexture( params, 'map', pbrSpecularGlossiness.diffuseTexture.index ) );

				}

				params.emissive = new Color( 0.0, 0.0, 0.0 );
				params.glossiness = pbrSpecularGlossiness.glossinessFactor !== undefined ? pbrSpecularGlossiness.glossinessFactor : 1.0;
				params.specular = new Color( 1.0, 1.0, 1.0 );

				if ( Array.isArray( pbrSpecularGlossiness.specularFactor ) ) {

					params.specular.fromArray( pbrSpecularGlossiness.specularFactor );

				}

				if ( pbrSpecularGlossiness.specularGlossinessTexture !== undefined ) {

					var specGlossIndex = pbrSpecularGlossiness.specularGlossinessTexture.index;
					pending.push( parser.assignTexture( params, 'glossinessMap', specGlossIndex ) );
					pending.push( parser.assignTexture( params, 'specularMap', specGlossIndex ) );

				}

				return Promise.all( pending );

			},

			createMaterial: function ( params ) {

				// setup material properties based on MeshStandardMaterial for Specular-Glossiness

				var material = new ShaderMaterial( {
					defines: params.defines,
					vertexShader: params.vertexShader,
					fragmentShader: params.fragmentShader,
					uniforms: params.uniforms,
					fog: true,
					lights: true,
					opacity: params.opacity,
					transparent: params.transparent
				} );

				material.isGLTFSpecularGlossinessMaterial = true;

				material.color = params.color;

				material.map = params.map === undefined ? null : params.map;

				material.lightMap = null;
				material.lightMapIntensity = 1.0;

				material.aoMap = params.aoMap === undefined ? null : params.aoMap;
				material.aoMapIntensity = 1.0;

				material.emissive = params.emissive;
				material.emissiveIntensity = 1.0;
				material.emissiveMap = params.emissiveMap === undefined ? null : params.emissiveMap;

				material.bumpMap = params.bumpMap === undefined ? null : params.bumpMap;
				material.bumpScale = 1;

				material.normalMap = params.normalMap === undefined ? null : params.normalMap;
				if ( params.normalScale ) material.normalScale = params.normalScale;

				material.displacementMap = null;
				material.displacementScale = 1;
				material.displacementBias = 0;

				material.specularMap = params.specularMap === undefined ? null : params.specularMap;
				material.specular = params.specular;

				material.glossinessMap = params.glossinessMap === undefined ? null : params.glossinessMap;
				material.glossiness = params.glossiness;

				material.alphaMap = null;

				material.envMap = params.envMap === undefined ? null : params.envMap;
				material.envMapIntensity = 1.0;

				material.refractionRatio = 0.98;

				material.extensions.derivatives = true;

				return material;

			},

			
			cloneMaterial: function ( source ) {

				var target = source.clone();

				target.isGLTFSpecularGlossinessMaterial = true;

				var params = this.specularGlossinessParams;

				for ( var i = 0, il = params.length; i < il; i ++ ) {

					target[ params[ i ] ] = source[ params[ i ] ];

				}

				return target;

			},

			// Here's based on refreshUniformsCommon() and refreshUniformsStandard() in WebGLRenderer.
			refreshUniforms: function ( renderer, scene, camera, geometry, material, group ) {

				if ( material.isGLTFSpecularGlossinessMaterial !== true ) {

					return;

				}

				var uniforms = material.uniforms;
				var defines = material.defines;

				uniforms.opacity.value = material.opacity;

				uniforms.diffuse.value.copy( material.color );
				uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

				uniforms.map.value = material.map;
				uniforms.specularMap.value = material.specularMap;
				uniforms.alphaMap.value = material.alphaMap;

				uniforms.lightMap.value = material.lightMap;
				uniforms.lightMapIntensity.value = material.lightMapIntensity;

				uniforms.aoMap.value = material.aoMap;
				uniforms.aoMapIntensity.value = material.aoMapIntensity;

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

				} else if ( material.glossinessMap ) {

					uvScaleMap = material.glossinessMap;

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

					var offset;
					var repeat;

					if ( uvScaleMap.matrix !== undefined ) {

						// > r88.

						if ( uvScaleMap.matrixAutoUpdate === true ) {

							offset = uvScaleMap.offset;
							repeat = uvScaleMap.repeat;
							var rotation = uvScaleMap.rotation;
							var center = uvScaleMap.center;

							uvScaleMap.matrix.setUvTransform( offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y );

						}

						uniforms.uvTransform.value.copy( uvScaleMap.matrix );

					} else {

						// <= r87. Remove when reasonable.

						offset = uvScaleMap.offset;
						repeat = uvScaleMap.repeat;

						uniforms.offsetRepeat.value.set( offset.x, offset.y, repeat.x, repeat.y );

					}

				}

				uniforms.envMap.value = material.envMap;
				uniforms.envMapIntensity.value = material.envMapIntensity;
				uniforms.flipEnvMap.value = ( material.envMap && material.envMap.isCubeTexture ) ? - 1 : 1;

				uniforms.refractionRatio.value = material.refractionRatio;

				uniforms.specular.value.copy( material.specular );
				uniforms.glossiness.value = material.glossiness;

				uniforms.glossinessMap.value = material.glossinessMap;

				uniforms.emissiveMap.value = material.emissiveMap;
				uniforms.bumpMap.value = material.bumpMap;
				uniforms.normalMap.value = material.normalMap;

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

				if ( uniforms.glossinessMap.value !== null && defines.USE_GLOSSINESSMAP === undefined ) {

					defines.USE_GLOSSINESSMAP = '';
					// set USE_ROUGHNESSMAP to enable vUv
					defines.USE_ROUGHNESSMAP = '';

				}

				if ( uniforms.glossinessMap.value === null && defines.USE_GLOSSINESSMAP !== undefined ) {

					delete defines.USE_GLOSSINESSMAP;
					delete defines.USE_ROUGHNESSMAP;

				}

			}

		};

	}

	
	
	

	// Spline Interpolation
	// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
	function GLTFCubicSplineInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	};

	GLTFCubicSplineInterpolant.prototype = Object.create( Interpolant.prototype );
	GLTFCubicSplineInterpolant.prototype.constructor = GLTFCubicSplineInterpolant;

	GLTFCubicSplineInterpolant.prototype.interpolate_ = function ( i1, t0, t, t1 ) {

		var result = this.resultBuffer;
		var values = this.sampleValues;
		var stride = this.valueSize;

		var stride2 = stride * 2;
		var stride3 = stride * 3;

		var td = t1 - t0;

		var p = ( t - t0 ) / td;
		var pp = p * p;
		var ppp = pp * p;

		var offset1 = i1 * stride3;
		var offset0 = offset1 - stride3;

		var s0 = 2 * ppp - 3 * pp + 1;
		var s1 = ppp - 2 * pp + p;
		var s2 = - 2 * ppp + 3 * pp;
		var s3 = ppp - pp;

		// Layout of keyframe output values for CUBICSPLINE animations:
		//   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
		for ( var i = 0; i !== stride; i ++ ) {

			var p0 = values[ offset0 + i + stride ];        // splineVertex_k
			var m0 = values[ offset0 + i + stride2 ] * td;  // outTangent_k * (t_k+1 - t_k)
			var p1 = values[ offset1 + i + stride ];        // splineVertex_k+1
			var m1 = values[ offset1 + i ] * td;            // inTangent_k+1 * (t_k+1 - t_k)

			result[ i ] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;

		}

		return result;

	};

	
	
	

	

	var WEBGL_CONSTANTS = {
		FLOAT: 5126,
		//FLOAT_MAT2: 35674,
		FLOAT_MAT3: 35675,
		FLOAT_MAT4: 35676,
		FLOAT_VEC2: 35664,
		FLOAT_VEC3: 35665,
		FLOAT_VEC4: 35666,
		LINEAR: 9729,
		REPEAT: 10497,
		SAMPLER_2D: 35678,
		POINTS: 0,
		LINES: 1,
		LINE_LOOP: 2,
		LINE_STRIP: 3,
		TRIANGLES: 4,
		TRIANGLE_STRIP: 5,
		TRIANGLE_FAN: 6,
		UNSIGNED_BYTE: 5121,
		UNSIGNED_SHORT: 5123
	};

	var WEBGL_TYPE = {
		5126: Number,
		//35674: Matrix2,
		35675: Matrix3,
		35676: Matrix4,
		35664: Vector2,
		35665: Vector3,
		35666: Vector4,
		35678: Texture
	};

	var WEBGL_COMPONENT_TYPES = {
		5120: Int8Array,
		5121: Uint8Array,
		5122: Int16Array,
		5123: Uint16Array,
		5125: Uint32Array,
		5126: Float32Array
	};

	var WEBGL_FILTERS = {
		9728: NearestFilter,
		9729: LinearFilter,
		9984: NearestMipMapNearestFilter,
		9985: LinearMipMapNearestFilter,
		9986: NearestMipMapLinearFilter,
		9987: LinearMipMapLinearFilter
	};

	var WEBGL_WRAPPINGS = {
		33071: ClampToEdgeWrapping,
		33648: MirroredRepeatWrapping,
		10497: RepeatWrapping
	};

	var WEBGL_TEXTURE_FORMATS = {
		6406: AlphaFormat,
		6407: RGBFormat,
		6408: RGBAFormat,
		6409: LuminanceFormat,
		6410: LuminanceAlphaFormat
	};

	var WEBGL_TEXTURE_DATATYPES = {
		5121: UnsignedByteType,
		32819: UnsignedShort4444Type,
		32820: UnsignedShort5551Type,
		33635: UnsignedShort565Type
	};

	var WEBGL_SIDES = {
		1028: BackSide, // Culling front
		1029: FrontSide // Culling back
		//1032: NoSide   // Culling front and back, what to do?
	};

	var WEBGL_DEPTH_FUNCS = {
		512: NeverDepth,
		513: LessDepth,
		514: EqualDepth,
		515: LessEqualDepth,
		516: GreaterEqualDepth,
		517: NotEqualDepth,
		518: GreaterEqualDepth,
		519: AlwaysDepth
	};

	var WEBGL_BLEND_EQUATIONS = {
		32774: AddEquation,
		32778: SubtractEquation,
		32779: ReverseSubtractEquation
	};

	var WEBGL_BLEND_FUNCS = {
		0: ZeroFactor,
		1: OneFactor,
		768: SrcColorFactor,
		769: OneMinusSrcColorFactor,
		770: SrcAlphaFactor,
		771: OneMinusSrcAlphaFactor,
		772: DstAlphaFactor,
		773: OneMinusDstAlphaFactor,
		774: DstColorFactor,
		775: OneMinusDstColorFactor,
		776: SrcAlphaSaturateFactor
		// The followings are not supported by Three.js yet
		//32769: CONSTANT_COLOR,
		//32770: ONE_MINUS_CONSTANT_COLOR,
		//32771: CONSTANT_ALPHA,
		//32772: ONE_MINUS_CONSTANT_COLOR
	};

	var WEBGL_TYPE_SIZES = {
		'SCALAR': 1,
		'VEC2': 2,
		'VEC3': 3,
		'VEC4': 4,
		'MAT2': 4,
		'MAT3': 9,
		'MAT4': 16
	};

	var PATH_PROPERTIES = {
		scale: 'scale',
		translation: 'position',
		rotation: 'quaternion',
		weights: 'morphTargetInfluences'
	};

	var INTERPOLATION = {
		CUBICSPLINE: InterpolateSmooth, // We use custom interpolation GLTFCubicSplineInterpolation for CUBICSPLINE.
		                                      // KeyframeTrack.optimize() can't handle glTF Cubic Spline output values layout,
		                                      // using InterpolateSmooth for KeyframeTrack instantiation to prevent optimization.
		                                      // See KeyframeTrack.optimize() for the detail.
		LINEAR: InterpolateLinear,
		STEP: InterpolateDiscrete
	};

	var STATES_ENABLES = {
		2884: 'CULL_FACE',
		2929: 'DEPTH_TEST',
		3042: 'BLEND',
		3089: 'SCISSOR_TEST',
		32823: 'POLYGON_OFFSET_FILL',
		32926: 'SAMPLE_ALPHA_TO_COVERAGE'
	};

	var ALPHA_MODES = {
		OPAQUE: 'OPAQUE',
		MASK: 'MASK',
		BLEND: 'BLEND'
	};

	

	function resolveURL( url, path ) {

		// Invalid URL
		if ( typeof url !== 'string' || url === '' ) return '';

		// Absolute URL http://,https://,//
		if ( /^(https?:)?\/\//i.test( url ) ) return url;

		// Data URI
		if ( /^data:.*,.*$/i.test( url ) ) return url;

		// Blob URL
		if ( /^blob:.*$/i.test( url ) ) return url;

		// Relative URL
		return path + url;

	}

	
	function createDefaultMaterial() {

		return new MeshStandardMaterial( {
			color: 0xFFFFFF,
			emissive: 0x000000,
			metalness: 1,
			roughness: 1,
			transparent: false,
			depthTest: true,
			side: FrontSide
		} );

	}

	
	function addMorphTargets( mesh, meshDef, primitiveDef, accessors ) {

		var geometry = mesh.geometry;
		var material = mesh.material;

		var targets = primitiveDef.targets;
		var morphAttributes = geometry.morphAttributes;

		morphAttributes.position = [];
		morphAttributes.normal = [];

		material.morphTargets = true;

		for ( var i = 0, il = targets.length; i < il; i ++ ) {

			var target = targets[ i ];
			var attributeName = 'morphTarget' + i;

			var positionAttribute, normalAttribute;

			if ( target.POSITION !== undefined ) {

				// Three.js morph formula is
				//   position
				//     + weight0 * ( morphTarget0 - position )
				//     + weight1 * ( morphTarget1 - position )
				//     ...
				// while the glTF one is
				//   position
				//     + weight0 * morphTarget0
				//     + weight1 * morphTarget1
				//     ...
				// then adding position to morphTarget.
				// So morphTarget value will depend on mesh's position, then cloning attribute
				// for the case if attribute is shared among two or more meshes.

				positionAttribute = cloneBufferAttribute( accessors[ target.POSITION ] );
				var position = geometry.attributes.position;

				for ( var j = 0, jl = positionAttribute.count; j < jl; j ++ ) {

					positionAttribute.setXYZ(
						j,
						positionAttribute.getX( j ) + position.getX( j ),
						positionAttribute.getY( j ) + position.getY( j ),
						positionAttribute.getZ( j ) + position.getZ( j )
					);

				}

			} else if ( geometry.attributes.position ) {

				// Copying the original position not to affect the final position.
				// See the formula above.
				positionAttribute = cloneBufferAttribute( geometry.attributes.position );

			}

			if ( positionAttribute !== undefined ) {

				positionAttribute.name = attributeName;
				morphAttributes.position.push( positionAttribute );

			}

			if ( target.NORMAL !== undefined ) {

				material.morphNormals = true;

				// see target.POSITION's comment

				normalAttribute = cloneBufferAttribute( accessors[ target.NORMAL ] );
				var normal = geometry.attributes.normal;

				for ( var j = 0, jl = normalAttribute.count; j < jl; j ++ ) {

					normalAttribute.setXYZ(
						j,
						normalAttribute.getX( j ) + normal.getX( j ),
						normalAttribute.getY( j ) + normal.getY( j ),
						normalAttribute.getZ( j ) + normal.getZ( j )
					);

				}

			} else if ( geometry.attributes.normal !== undefined ) {

				normalAttribute = cloneBufferAttribute( geometry.attributes.normal );

			}

			if ( normalAttribute !== undefined ) {

				normalAttribute.name = attributeName;
				morphAttributes.normal.push( normalAttribute );

			}

		}

		mesh.updateMorphTargets();

		if ( meshDef.weights !== undefined ) {

			for ( var i = 0, il = meshDef.weights.length; i < il; i ++ ) {

				mesh.morphTargetInfluences[ i ] = meshDef.weights[ i ];

			}

		}

	}

	function isPrimitiveEqual( a, b ) {

		if ( a.indices !== b.indices ) {

			return false;

		}

		var attribA = a.attributes || {};
		var attribB = b.attributes || {};
		var keysA = Object.keys( attribA );
		var keysB = Object.keys( attribB );

		if ( keysA.length !== keysB.length ) {

			return false;

		}

		for ( var i = 0, il = keysA.length; i < il; i ++ ) {

			var key = keysA[ i ];

			if ( attribA[ key ] !== attribB[ key ] ) {

				return false;

			}

		}

		return true;

	}

	function getCachedGeometry( cache, newPrimitive ) {

		for ( var i = 0, il = cache.length; i < il; i ++ ) {

			var cached = cache[ i ];

			if ( isPrimitiveEqual( cached.primitive, newPrimitive ) ) {

				return cached.geometry;

			}

		}

		return null;

	}

	function cloneBufferAttribute( attribute ) {

		if ( attribute.isInterleavedBufferAttribute ) {

			var count = attribute.count;
			var itemSize = attribute.itemSize;
			var array = attribute.array.slice( 0, count * itemSize );

			for ( var i = 0; i < count; ++ i ) {

				array[ i ] = attribute.getX( i );
				if ( itemSize >= 2 ) array[ i + 1 ] = attribute.getY( i );
				if ( itemSize >= 3 ) array[ i + 2 ] = attribute.getZ( i );
				if ( itemSize >= 4 ) array[ i + 3 ] = attribute.getW( i );

			}

			return new BufferAttribute( array, itemSize, attribute.normalized );

		}

		return attribute.clone();

	}

	

	function GLTFParser( json, extensions, options ) {

		this.json = json || {};
		this.extensions = extensions || {};
		this.options = options || {};

		// loader object cache
		this.cache = new GLTFRegistry();

		// BufferGeometry caching
		this.primitiveCache = [];

		this.textureLoader = new TextureLoader( this.options.manager );
		this.textureLoader.setCrossOrigin( this.options.crossOrigin );

		this.fileLoader = new FileLoader( this.options.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

	}

	GLTFParser.prototype.parse = function ( onLoad, onError ) {

		var json = this.json;

		// Clear the loader cache
		this.cache.removeAll();

		// Mark the special nodes/meshes in json for efficient parse
		this.markDefs();

		// Fire the callback on complete
		this.getMultiDependencies( [

			'scene',
			'animation',
			'camera'

		] ).then( function ( dependencies ) {

			var scenes = dependencies.scenes || [];
			var scene = scenes[ json.scene || 0 ];
			var animations = dependencies.animations || [];
			var asset = json.asset;
			var cameras = dependencies.cameras || [];

			onLoad( scene, scenes, cameras, animations, asset );

		} ).catch( onError );

	};

	
	GLTFParser.prototype.markDefs = function () {

		var nodeDefs = this.json.nodes || [];
		var skinDefs = this.json.skins || [];
		var meshDefs = this.json.meshes || [];

		var meshReferences = {};
		var meshUses = {};

		// Nothing in the node definition indicates whether it is a Bone or an
		// Object3D. Use the skins' joint references to mark bones.
		for ( var skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex ++ ) {

			var joints = skinDefs[ skinIndex ].joints;

			for ( var i = 0, il = joints.length; i < il; i ++ ) {

				nodeDefs[ joints[ i ] ].isBone = true;

			}

		}

		// Meshes can (and should) be reused by multiple nodes in a glTF asset. To
		// avoid having more than one Mesh with the same name, count
		// references and rename instances below.
		//
		// Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
		for ( var nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			var nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.mesh !== undefined ) {

				if ( meshReferences[ nodeDef.mesh ] === undefined ) {

					meshReferences[ nodeDef.mesh ] = meshUses[ nodeDef.mesh ] = 0;

				}

				meshReferences[ nodeDef.mesh ] ++;

				// Nothing in the mesh definition indicates whether it is
				// a SkinnedMesh or Mesh. Use the node's mesh reference
				// to mark SkinnedMesh if node has skin.
				if ( nodeDef.skin !== undefined ) {

					meshDefs[ nodeDef.mesh ].isSkinnedMesh = true;

				}

			}

		}

		this.json.meshReferences = meshReferences;
		this.json.meshUses = meshUses;

	};

	
	GLTFParser.prototype.getDependency = function ( type, index ) {

		var cacheKey = type + ':' + index;
		var dependency = this.cache.get( cacheKey );

		if ( ! dependency ) {

			var fnName = 'load' + type.charAt( 0 ).toUpperCase() + type.slice( 1 );
			dependency = this[ fnName ]( index );
			this.cache.add( cacheKey, dependency );

		}

		return dependency;

	};

	
	GLTFParser.prototype.getDependencies = function ( type ) {

		var dependencies = this.cache.get( type );

		if ( ! dependencies ) {

			var parser = this;
			var defs = this.json[ type + ( type === 'mesh' ? 'es' : 's' ) ] || [];

			dependencies = Promise.all( defs.map( function ( def, index ) {

				return parser.getDependency( type, index );

			} ) );

			this.cache.add( type, dependencies );

		}

		return dependencies;

	};

	
	GLTFParser.prototype.getMultiDependencies = function ( types ) {

		var results = {};
		var pendings = [];

		for ( var i = 0, il = types.length; i < il; i ++ ) {

			var type = types[ i ];
			var value = this.getDependencies( type );

			value = value.then( function ( key, value ) {

				results[ key ] = value;

			}.bind( this, type + ( type === 'mesh' ? 'es' : 's' ) ) );

			pendings.push( value );

		}

		return Promise.all( pendings ).then( function () {

			return results;

		} );

	};

	
	GLTFParser.prototype.loadBuffer = function ( bufferIndex ) {

		var bufferDef = this.json.buffers[ bufferIndex ];
		var loader = this.fileLoader;

		if ( bufferDef.type && bufferDef.type !== 'arraybuffer' ) {

			throw new Error( 'GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.' );

		}

		// If present, GLB container is required to be the first buffer.
		if ( bufferDef.uri === undefined && bufferIndex === 0 ) {

			return Promise.resolve( this.extensions[ EXTENSIONS.KHR_BINARY_GLTF ].body );

		}

		var options = this.options;

		return new Promise( function ( resolve, reject ) {

			loader.load( resolveURL( bufferDef.uri, options.path ), resolve, undefined, function () {

				reject( new Error( 'GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".' ) );

			} );

		} );

	};

	
	GLTFParser.prototype.loadBufferView = function ( bufferViewIndex ) {

		var bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

		return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

			var byteLength = bufferViewDef.byteLength || 0;
			var byteOffset = bufferViewDef.byteOffset || 0;
			return buffer.slice( byteOffset, byteOffset + byteLength );

		} );

	};

	
	GLTFParser.prototype.loadAccessor = function ( accessorIndex ) {

		var parser = this;
		var json = this.json;

		var accessorDef = this.json.accessors[ accessorIndex ];

		var pendingBufferViews = [];

		if ( accessorDef.bufferView !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.bufferView ) );

		} else {

			pendingBufferViews.push( null );

		}

		if ( accessorDef.sparse !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.indices.bufferView ) );
			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.values.bufferView ) );

		}

		return Promise.all( pendingBufferViews ).then( function ( bufferViews ) {

			var bufferView = bufferViews[ 0 ];

			var itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			var TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

			// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
			var elementBytes = TypedArray.BYTES_PER_ELEMENT;
			var itemBytes = elementBytes * itemSize;
			var byteOffset = accessorDef.byteOffset || 0;
			var byteStride = json.bufferViews[ accessorDef.bufferView ].byteStride;
			var normalized = accessorDef.normalized === true;
			var array, bufferAttribute;

			// The buffer is not interleaved if the stride is the item size in bytes.
			if ( byteStride && byteStride !== itemBytes ) {

				var ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType;
				var ib = parser.cache.get( ibCacheKey );

				if ( ! ib ) {

					// Use the full buffer if it's interleaved.
					array = new TypedArray( bufferView );

					// Integer parameters to IB/IBA are in array elements, not bytes.
					ib = new InterleavedBuffer( array, byteStride / elementBytes );

					parser.cache.add( ibCacheKey, ib );

				}

				bufferAttribute = new InterleavedBufferAttribute( ib, itemSize, byteOffset / elementBytes, normalized );

			} else {

				if ( bufferView === null ) {

					array = new TypedArray( accessorDef.count * itemSize );

				} else {

					array = new TypedArray( bufferView, byteOffset, accessorDef.count * itemSize );

				}

				bufferAttribute = new BufferAttribute( array, itemSize, normalized );

			}

			// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
			if ( accessorDef.sparse !== undefined ) {

				var itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
				var TypedArrayIndices = WEBGL_COMPONENT_TYPES[ accessorDef.sparse.indices.componentType ];

				var byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
				var byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

				var sparseIndices = new TypedArrayIndices( bufferViews[ 1 ], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices );
				var sparseValues = new TypedArray( bufferViews[ 2 ], byteOffsetValues, accessorDef.sparse.count * itemSize );

				if ( bufferView !== null ) {

					// Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
					bufferAttribute.setArray( bufferAttribute.array.slice() );

				}

				for ( var i = 0, il = sparseIndices.length; i < il; i ++ ) {

					var index = sparseIndices[ i ];

					bufferAttribute.setX( index, sparseValues[ i * itemSize ] );
					if ( itemSize >= 2 ) bufferAttribute.setY( index, sparseValues[ i * itemSize + 1 ] );
					if ( itemSize >= 3 ) bufferAttribute.setZ( index, sparseValues[ i * itemSize + 2 ] );
					if ( itemSize >= 4 ) bufferAttribute.setW( index, sparseValues[ i * itemSize + 3 ] );
					if ( itemSize >= 5 ) throw new Error( 'GLTFLoader: Unsupported itemSize in sparse BufferAttribute.' );

				}

			}

			return bufferAttribute;

		} );

	};

	
	GLTFParser.prototype.loadTexture = function ( textureIndex ) {

		var parser = this;
		var json = this.json;
		var options = this.options;
		var textureLoader = this.textureLoader;

		var URL = window.URL || window.webkitURL;

		var textureDef = json.textures[ textureIndex ];
		var source = json.images[ textureDef.source ];
		var sourceURI = source.uri;
		var isObjectURL = false;

		if ( source.bufferView !== undefined ) {

			// Load binary image data from bufferView, if provided.

			sourceURI = parser.getDependency( 'bufferView', source.bufferView ).then( function ( bufferView ) {

				isObjectURL = true;
				var blob = new Blob( [ bufferView ], { type: source.mimeType } );
				sourceURI = URL.createObjectURL( blob );
				return sourceURI;

			} );

		}

		return Promise.resolve( sourceURI ).then( function ( sourceURI ) {

			// Load Texture resource.

			var loader = Loader.Handlers.get( sourceURI ) || textureLoader;

			return new Promise( function ( resolve, reject ) {

				loader.load( resolveURL( sourceURI, options.path ), resolve, undefined, reject );

			} );

		} ).then( function ( texture ) {

			// Clean up resources and configure Texture.

			if ( isObjectURL === true ) {

				URL.revokeObjectURL( sourceURI );

			}

			texture.flipY = false;

			if ( textureDef.name !== undefined ) texture.name = textureDef.name;

			texture.format = textureDef.format !== undefined ? WEBGL_TEXTURE_FORMATS[ textureDef.format ] : RGBAFormat;

			if ( textureDef.internalFormat !== undefined && texture.format !== WEBGL_TEXTURE_FORMATS[ textureDef.internalFormat ] ) {

				console.warn( 'GLTFLoader: Three.js does not support texture internalFormat which is different from texture format. ' +
											'internalFormat will be forced to be the same value as format.' );

			}

			texture.type = textureDef.type !== undefined ? WEBGL_TEXTURE_DATATYPES[ textureDef.type ] : UnsignedByteType;

			var samplers = json.samplers || {};
			var sampler = samplers[ textureDef.sampler ] || {};

			texture.magFilter = WEBGL_FILTERS[ sampler.magFilter ] || LinearFilter;
			texture.minFilter = WEBGL_FILTERS[ sampler.minFilter ] || LinearMipMapLinearFilter;
			texture.wrapS = WEBGL_WRAPPINGS[ sampler.wrapS ] || RepeatWrapping;
			texture.wrapT = WEBGL_WRAPPINGS[ sampler.wrapT ] || RepeatWrapping;

			return texture;

		} );

	};

	
	GLTFParser.prototype.assignTexture = function ( materialParams, textureName, textureIndex ) {

		return this.getDependency( 'texture', textureIndex ).then( function ( texture ) {

			materialParams[ textureName ] = texture;

		} );

	};

	
	GLTFParser.prototype.loadMaterial = function ( materialIndex ) {

		var parser = this;
		var json = this.json;
		var extensions = this.extensions;
		var materialDef = this.json.materials[ materialIndex ];

		var materialType;
		var materialParams = {};
		var materialExtensions = materialDef.extensions || {};

		var pending = [];

		if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ] ) {

			var sgExtension = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ];
			materialType = sgExtension.getMaterialType( materialDef );
			pending.push( sgExtension.extendParams( materialParams, materialDef, parser ) );

		} else if ( materialDef.pbrMetallicRoughness !== undefined ) {

			// Specification:
			// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

			materialType = MeshStandardMaterial;

			var metallicRoughness = materialDef.pbrMetallicRoughness;

			materialParams.color = new Color( 1.0, 1.0, 1.0 );
			materialParams.opacity = 1.0;

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				var array = metallicRoughness.baseColorFactor;

				materialParams.color.fromArray( array );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture.index ) );

			}

			materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
			materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

			if ( metallicRoughness.metallicRoughnessTexture !== undefined ) {

				var textureIndex = metallicRoughness.metallicRoughnessTexture.index;
				pending.push( parser.assignTexture( materialParams, 'metalnessMap', textureIndex ) );
				pending.push( parser.assignTexture( materialParams, 'roughnessMap', textureIndex ) );

			}

		} else {

			materialType = MeshPhongMaterial;

		}

		if ( materialDef.doubleSided === true ) {

			materialParams.side = DoubleSide;

		}

		var alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

		if ( alphaMode === ALPHA_MODES.BLEND ) {

			materialParams.transparent = true;

		} else {

			materialParams.transparent = false;

			if ( alphaMode === ALPHA_MODES.MASK ) {

				materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;

			}

		}

		if ( materialDef.normalTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'normalMap', materialDef.normalTexture.index ) );

			materialParams.normalScale = new Vector2( 1, 1 );

			if ( materialDef.normalTexture.scale !== undefined ) {

				materialParams.normalScale.set( materialDef.normalTexture.scale, materialDef.normalTexture.scale );

			}

		}

		if ( materialDef.occlusionTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'aoMap', materialDef.occlusionTexture.index ) );

			if ( materialDef.occlusionTexture.strength !== undefined ) {

				materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;

			}

		}

		if ( materialDef.emissiveFactor !== undefined ) {

			if ( materialType === MeshBasicMaterial ) {

				materialParams.color = new Color().fromArray( materialDef.emissiveFactor );

			} else {

				materialParams.emissive = new Color().fromArray( materialDef.emissiveFactor );

			}

		}

		if ( materialDef.emissiveTexture !== undefined ) {

			if ( materialType === MeshBasicMaterial ) {

				pending.push( parser.assignTexture( materialParams, 'map', materialDef.emissiveTexture.index ) );

			} else {

				pending.push( parser.assignTexture( materialParams, 'emissiveMap', materialDef.emissiveTexture.index ) );

			}

		}

		return Promise.all( pending ).then( function () {

			var material;

			if ( materialType === ShaderMaterial ) {

				material = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].createMaterial( materialParams );

			} else {

				material = new materialType( materialParams );

			}

			if ( materialDef.name !== undefined ) material.name = materialDef.name;

			// Normal map textures use OpenGL conventions:
			// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#materialnormaltexture
			if ( material.normalScale ) {

				material.normalScale.x = - material.normalScale.x;

			}

			// emissiveTexture and baseColorTexture use sRGB encoding.
			if ( material.map ) material.map.encoding = sRGBEncoding;
			if ( material.emissiveMap ) material.emissiveMap.encoding = sRGBEncoding;

			if ( materialDef.extras ) material.userData = materialDef.extras;

			return material;

		} );

	};

	
	GLTFParser.prototype.loadGeometries = function ( primitives ) {

		var cache = this.primitiveCache;

		return this.getDependencies( 'accessor' ).then( function ( accessors ) {

			var geometries = [];

			for ( var i = 0, il = primitives.length; i < il; i ++ ) {

				var primitive = primitives[ i ];

				// See if we've already created this geometry
				var cached = getCachedGeometry( cache, primitive );

				if ( cached ) {

					// Use the cached geometry if it exists
					geometries.push( cached );

				} else {

					// Otherwise create a new geometry
					var geometry = new BufferGeometry();

					var attributes = primitive.attributes;

					for ( var attributeId in attributes ) {

						var attributeEntry = attributes[ attributeId ];

						var bufferAttribute = accessors[ attributeEntry ];

						switch ( attributeId ) {

							case 'POSITION':

								geometry.addAttribute( 'position', bufferAttribute );
								break;

							case 'NORMAL':

								geometry.addAttribute( 'normal', bufferAttribute );
								break;

							case 'TEXCOORD_0':
							case 'TEXCOORD0':
							case 'TEXCOORD':

								geometry.addAttribute( 'uv', bufferAttribute );
								break;

							case 'TEXCOORD_1':

								geometry.addAttribute( 'uv2', bufferAttribute );
								break;

							case 'COLOR_0':
							case 'COLOR0':
							case 'COLOR':

								geometry.addAttribute( 'color', bufferAttribute );
								break;

							case 'WEIGHTS_0':
							case 'WEIGHT': // WEIGHT semantic deprecated.

								geometry.addAttribute( 'skinWeight', bufferAttribute );
								break;

							case 'JOINTS_0':
							case 'JOINT': // JOINT semantic deprecated.

								geometry.addAttribute( 'skinIndex', bufferAttribute );
								break;

						}

					}

					if ( primitive.indices !== undefined ) {

						geometry.setIndex( accessors[ primitive.indices ] );

					}

					// Cache this geometry
					cache.push( {

						primitive: primitive,
						geometry: geometry

					} );

					geometries.push( geometry );

				}

			}

			return geometries;

		} );

	};

	
	GLTFParser.prototype.loadMesh = function ( meshIndex ) {

		var scope = this;
		var json = this.json;
		var extensions = this.extensions;

		var meshDef = this.json.meshes[ meshIndex ];

		return this.getMultiDependencies( [

			'accessor',
			'material'

		] ).then( function ( dependencies ) {

			var group = new Group();

			var primitives = meshDef.primitives;

			return scope.loadGeometries( primitives ).then( function ( geometries ) {

				for ( var i = 0, il = primitives.length; i < il; i ++ ) {

					var primitive = primitives[ i ];
					var geometry = geometries[ i ];

					var material = primitive.material === undefined
						? createDefaultMaterial()
						: dependencies.materials[ primitive.material ];

					if ( material.aoMap
							&& geometry.attributes.uv2 === undefined
							&& geometry.attributes.uv !== undefined ) {

						console.log( 'GLTFLoader: Duplicating UVs to support aoMap.' );
						geometry.addAttribute( 'uv2', new BufferAttribute( geometry.attributes.uv.array, 2 ) );

					}

					// If the material will be modified later on, clone it now.
					var useVertexColors = geometry.attributes.color !== undefined;
					var useFlatShading = geometry.attributes.normal === undefined;
					var useSkinning = meshDef.isSkinnedMesh === true;
					var useMorphTargets = primitive.targets !== undefined;

					if ( useVertexColors || useFlatShading || useSkinning || useMorphTargets ) {

						if ( material.isGLTFSpecularGlossinessMaterial ) {

							var specGlossExtension = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ];
							material = specGlossExtension.cloneMaterial( material );

						} else {

							material = material.clone();

						}

					}

					if ( useVertexColors ) {

						material.vertexColors = VertexColors;
						material.needsUpdate = true;

					}

					if ( useFlatShading ) {

						material.flatShading = true;

					}

					var mesh;

					if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
						primitive.mode === undefined ) {

						if ( useSkinning ) {

							mesh = new SkinnedMesh( geometry, material );
							material.skinning = true;

						} else {

							mesh = new Mesh( geometry, material );

						}

						if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

							mesh.drawMode = TriangleStripDrawMode;

						} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

							mesh.drawMode = TriangleFanDrawMode;

						}

					} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ||
						primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ||
						primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

						var cacheKey = 'LineBasicMaterial:' + material.uuid;

						var lineMaterial = scope.cache.get( cacheKey );

						if ( ! lineMaterial ) {

							lineMaterial = new LineBasicMaterial();
							Material.prototype.copy.call( lineMaterial, material );
							lineMaterial.color.copy( material.color );
							lineMaterial.lights = false;  // LineBasicMaterial doesn't support lights yet

							scope.cache.add( cacheKey, lineMaterial );

						}

						material = lineMaterial;

						if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

							mesh = new LineSegments( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

							mesh = new Line( geometry, material );

						} else {

							mesh = new LineLoop( geometry, material );

						}

					} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

						var cacheKey = 'PointsMaterial:' + material.uuid;

						var pointsMaterial = scope.cache.get( cacheKey );

						if ( ! pointsMaterial ) {

							pointsMaterial = new PointsMaterial();
							Material.prototype.copy.call( pointsMaterial, material );
							pointsMaterial.color.copy( material.color );
							pointsMaterial.map = material.map;
							pointsMaterial.lights = false;  // PointsMaterial doesn't support lights yet

							scope.cache.add( cacheKey, pointsMaterial );

						}

						material = pointsMaterial;

						mesh = new Points( geometry, material );

					} else {

						throw new Error( 'GLTFLoader: Primitive mode unsupported: ' + primitive.mode );

					}

					mesh.name = meshDef.name || ( 'mesh_' + meshIndex );

					if ( useMorphTargets ) {

						addMorphTargets( mesh, meshDef, primitive, dependencies.accessors );

					}

					if ( meshDef.extras !== undefined ) mesh.userData = meshDef.extras;
					if ( primitive.extras !== undefined ) mesh.geometry.userData = primitive.extras;

					// for Specular-Glossiness.
					if ( material.isGLTFSpecularGlossinessMaterial === true ) {

						mesh.onBeforeRender = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].refreshUniforms;

					}

					if ( primitives.length > 1 ) {

						mesh.name += '_' + i;

						group.add( mesh );

					} else {

						return mesh;

					}

				}

				return group;

			} );

		} );

	};

	
	GLTFParser.prototype.loadCamera = function ( cameraIndex ) {

		var camera;
		var cameraDef = this.json.cameras[ cameraIndex ];
		var params = cameraDef[ cameraDef.type ];

		if ( ! params ) {

			console.warn( 'GLTFLoader: Missing camera parameters.' );
			return;

		}

		if ( cameraDef.type === 'perspective' ) {

			var aspectRatio = params.aspectRatio || 1;
			var xfov = params.yfov * aspectRatio;

			camera = new PerspectiveCamera( _Math.radToDeg( xfov ), aspectRatio, params.znear || 1, params.zfar || 2e6 );

		} else if ( cameraDef.type === 'orthographic' ) {

			camera = new OrthographicCamera( params.xmag / - 2, params.xmag / 2, params.ymag / 2, params.ymag / - 2, params.znear, params.zfar );

		}

		if ( cameraDef.name !== undefined ) camera.name = cameraDef.name;
		if ( cameraDef.extras ) camera.userData = cameraDef.extras;

		return Promise.resolve( camera );

	};

	
	GLTFParser.prototype.loadSkin = function ( skinIndex ) {

		var skinDef = this.json.skins[ skinIndex ];

		var skinEntry = { joints: skinDef.joints };

		if ( skinDef.inverseBindMatrices === undefined ) {

			return Promise.resolve( skinEntry );

		}

		return this.getDependency( 'accessor', skinDef.inverseBindMatrices ).then( function ( accessor ) {

			skinEntry.inverseBindMatrices = accessor;

			return skinEntry;

		} );

	};

	
	GLTFParser.prototype.loadAnimation = function ( animationIndex ) {

		var json = this.json;

		var animationDef = this.json.animations[ animationIndex ];

		return this.getMultiDependencies( [

			'accessor',
			'node'

		] ).then( function ( dependencies ) {

			var tracks = [];

			for ( var i = 0, il = animationDef.channels.length; i < il; i ++ ) {

				var channel = animationDef.channels[ i ];
				var sampler = animationDef.samplers[ channel.sampler ];

				if ( sampler ) {

					var target = channel.target;
					var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.
					var input = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.input ] : sampler.input;
					var output = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.output ] : sampler.output;

					var inputAccessor = dependencies.accessors[ input ];
					var outputAccessor = dependencies.accessors[ output ];

					var node = dependencies.nodes[ name ];

					if ( node ) {

						node.updateMatrix();
						node.matrixAutoUpdate = true;

						var TypedKeyframeTrack;

						switch ( PATH_PROPERTIES[ target.path ] ) {

							case PATH_PROPERTIES.weights:

								TypedKeyframeTrack = NumberKeyframeTrack;
								break;

							case PATH_PROPERTIES.rotation:

								TypedKeyframeTrack = QuaternionKeyframeTrack;
								break;

							case PATH_PROPERTIES.position:
							case PATH_PROPERTIES.scale:
							default:

								TypedKeyframeTrack = VectorKeyframeTrack;
								break;

						}

						var targetName = node.name ? node.name : node.uuid;

						var interpolation = sampler.interpolation !== undefined ? INTERPOLATION[ sampler.interpolation ] : InterpolateLinear;

						var targetNames = [];

						if ( PATH_PROPERTIES[ target.path ] === PATH_PROPERTIES.weights ) {

							// node should be Group here but
							// PATH_PROPERTIES.weights(morphTargetInfluences) should be
							// the property of a mesh object under node.
							// So finding targets here.

							node.traverse( function ( object ) {

								if ( object.isMesh === true && object.material.morphTargets === true ) {

									targetNames.push( object.name ? object.name : object.uuid );

								}

							} );

						} else {

							targetNames.push( targetName );

						}

						// KeyframeTrack.optimize() will modify given 'times' and 'values'
						// buffers before creating a truncated copy to keep. Because buffers may
						// be reused by other tracks, make copies here.
						for ( var j = 0, jl = targetNames.length; j < jl; j ++ ) {

							var track = new TypedKeyframeTrack(
								targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
								AnimationUtils.arraySlice( inputAccessor.array, 0 ),
								AnimationUtils.arraySlice( outputAccessor.array, 0 ),
								interpolation
							);

							// Here is the trick to enable custom interpolation.
							// Overrides .createInterpolant in a factory method which creates custom interpolation.
							if ( sampler.interpolation === 'CUBICSPLINE' ) {

								track.createInterpolant = function ( result ) {

									// A CUBICSPLINE keyframe in glTF has three output values for each input value,
									// representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
									// must be divided by three to get the interpolant's sampleSize argument.

									return new GLTFCubicSplineInterpolant( this.times, this.values, this.getValueSize() / 3, result );

								};

							}

							tracks.push( track );

						}

					}

				}

			}

			var name = animationDef.name !== undefined ? animationDef.name : 'animation_' + animationIndex;

			return new AnimationClip( name, undefined, tracks );

		} );

	};

	
	GLTFParser.prototype.loadNode = function ( nodeIndex ) {

		var json = this.json;
		var extensions = this.extensions;

		var meshReferences = this.json.meshReferences;
		var meshUses = this.json.meshUses;

		var nodeDef = this.json.nodes[ nodeIndex ];

		return this.getMultiDependencies( [

			'mesh',
			'skin',
			'camera'

		] ).then( function ( dependencies ) {

			var node;

			if ( nodeDef.isBone === true ) {

				node = new Bone();

			} else if ( nodeDef.mesh !== undefined ) {

				var mesh = dependencies.meshes[ nodeDef.mesh ];

				node = mesh.clone();

				// for Specular-Glossiness
				if ( mesh.isGroup === true ) {

					for ( var i = 0, il = mesh.children.length; i < il; i ++ ) {

						var child = mesh.children[ i ];

						if ( child.material && child.material.isGLTFSpecularGlossinessMaterial === true ) {

							node.children[ i ].onBeforeRender = child.onBeforeRender;

						}

					}

				} else {

					if ( mesh.material && mesh.material.isGLTFSpecularGlossinessMaterial === true ) {

						node.onBeforeRender = mesh.onBeforeRender;

					}

				}

				if ( meshReferences[ nodeDef.mesh ] > 1 ) {

					node.name += '_instance_' + meshUses[ nodeDef.mesh ] ++;

				}

			} else if ( nodeDef.camera !== undefined ) {

				node = dependencies.cameras[ nodeDef.camera ];

			} else if ( nodeDef.extensions
					 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ]
					 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light !== undefined ) {

				var lights = extensions[ EXTENSIONS.KHR_LIGHTS ].lights;
				node = lights[ nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light ];

			} else {

				node = new Object3D();

			}

			if ( nodeDef.name !== undefined ) {

				node.name = PropertyBinding.sanitizeNodeName( nodeDef.name );

			}

			if ( nodeDef.extras ) node.userData = nodeDef.extras;

			if ( nodeDef.matrix !== undefined ) {

				var matrix = new Matrix4();
				matrix.fromArray( nodeDef.matrix );
				node.applyMatrix( matrix );

			} else {

				if ( nodeDef.translation !== undefined ) {

					node.position.fromArray( nodeDef.translation );

				}

				if ( nodeDef.rotation !== undefined ) {

					node.quaternion.fromArray( nodeDef.rotation );

				}

				if ( nodeDef.scale !== undefined ) {

					node.scale.fromArray( nodeDef.scale );

				}

			}

			return node;

		} );

	};

	
	GLTFParser.prototype.loadScene = function () {

		// scene node hierachy builder

		function buildNodeHierachy( nodeId, parentObject, json, allNodes, skins ) {

			var node = allNodes[ nodeId ];
			var nodeDef = json.nodes[ nodeId ];

			// build skeleton here as well

			if ( nodeDef.skin !== undefined ) {

				var meshes = node.isGroup === true ? node.children : [ node ];

				for ( var i = 0, il = meshes.length; i < il; i ++ ) {

					var mesh = meshes[ i ];
					var skinEntry = skins[ nodeDef.skin ];

					var bones = [];
					var boneInverses = [];

					for ( var j = 0, jl = skinEntry.joints.length; j < jl; j ++ ) {

						var jointId = skinEntry.joints[ j ];
						var jointNode = allNodes[ jointId ];

						if ( jointNode ) {

							bones.push( jointNode );

							var mat = new Matrix4();

							if ( skinEntry.inverseBindMatrices !== undefined ) {

								mat.fromArray( skinEntry.inverseBindMatrices.array, j * 16 );

							}

							boneInverses.push( mat );

						} else {

							console.warn( 'GLTFLoader: Joint "%s" could not be found.', jointId );

						}

					}

					mesh.bind( new Skeleton( bones, boneInverses ), mesh.matrixWorld );

				}

			}

			// build node hierachy

			parentObject.add( node );

			if ( nodeDef.children ) {

				var children = nodeDef.children;

				for ( var i = 0, il = children.length; i < il; i ++ ) {

					var child = children[ i ];
					buildNodeHierachy( child, node, json, allNodes, skins );

				}

			}

		}

		return function loadScene( sceneIndex ) {

			var json = this.json;
			var extensions = this.extensions;
			var sceneDef = this.json.scenes[ sceneIndex ];

			return this.getMultiDependencies( [

				'node',
				'skin'

			] ).then( function ( dependencies ) {

				var scene = new Scene();
				if ( sceneDef.name !== undefined ) scene.name = sceneDef.name;

				if ( sceneDef.extras ) scene.userData = sceneDef.extras;

				var nodeIds = sceneDef.nodes || [];

				for ( var i = 0, il = nodeIds.length; i < il; i ++ ) {

					buildNodeHierachy( nodeIds[ i ], scene, json, dependencies.nodes, dependencies.skins );

				}

				// Ambient lighting, if present, is always attached to the scene root.
				if ( sceneDef.extensions
						 && sceneDef.extensions[ EXTENSIONS.KHR_LIGHTS ]
						 && sceneDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light !== undefined ) {

					var lights = extensions[ EXTENSIONS.KHR_LIGHTS ].lights;
					scene.add( lights[ sceneDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light ] );

				}

				return scene;

			} );

		};

	}();

	return GLTFLoader;

} )();

export { GLTFLoader }
