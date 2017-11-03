import { FileLoader } from '../loaders/FileLoader.js'
import { Color } from '../math/Color.js'
import { DirectionalLight } from '../lights/DirectionalLight.js'
import { PointLight } from '../lights/PointLight.js'
import { SpotLight } from '../lights/SpotLight.js'
import { AmbientLight } from '../lights/AmbientLight.js'
import {
	ShaderMaterial,
	MeshStandardMaterial
} from '../materials/Materials.js'
import { TextureLoader } from '../loaders/TextureLoader.js'
import { InterleavedBuffer } from '../core/InterleavedBuffer.js'
import { InterleavedBufferAttribute } from '../core/InterleavedBufferAttribute.js'
import { BufferAttribute } from '../core/BufferAttribute.js'
import { Vector2 } from '../math/Vector2.js'
import { BufferGeometry } from '../core/BufferGeometry.js'
import { Group } from '../objects/Group.js'
import { Mesh } from '../objects/Mesh.js'
import { LineSegments } from '../objects/LineSegments.js'
import { Line } from '../objects/Line.js'
import { LineLoop } from '../objects/LineLoop.js'
import { Points } from '../objects/Points.js'
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { AnimationClip } from '../animation/AnimationClip.js'
import { Bone } from '../objects/Bone.js'
import { Object3D } from '../core/Object3D.js'
import { Matrix4 } from '../math/Matrix4.js'
import { SkinnedMesh } from '../objects/SkinnedMesh.js'
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

/**
 * @author Rich Tibbett / https://github.com/richtr
 * @author mrdoob / http://mrdoob.com/
 * @author Tony Parisi / http://www.tonyparisi.com/
 * @author Takahiro / https://github.com/takahirox
 * @author Don McCurdy / https://www.donmccurdy.com
 */

var GLTFLoader = ( function () {

	function GLTFLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	}

	GLTFLoader.prototype = {

		constructor: GLTFLoader,

		crossOrigin: 'Anonymous',

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var path = this.path !== undefined ? this.path : Loader.prototype.extractUrlBase( url );

			var loader = new FileLoader( scope.manager );

			loader.setResponseType( 'arraybuffer' );

			loader.load( url, function ( data ) {

				try {

					scope.parse( data, path, onLoad, onError );

				} catch ( e ) {

					if ( onError !== undefined ) {

						// For SyntaxError or TypeError, return a generic failure message.
						onError( e.constructor === Error ? e : new Error( 'GLTFLoader: Unable to parse model.' ) );

					}

				}

			}, onProgress, onError );

		},

		setCrossOrigin: function ( value ) {

			this.crossOrigin = value;

		},

		setPath: function ( value ) {

			this.path = value;

		},

		parse: function ( data, path, onLoad, onError ) {

			var content;
			var extensions = {};

			if ( typeof data === 'string' ) {

				content = data;

			} else {

				var magic = convertUint8ArrayToString( new Uint8Array( data, 0, 4 ) );

				if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

					extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );
					content = extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content;

				} else {

					content = convertUint8ArrayToString( new Uint8Array( data ) );

				}

			}

			var json = JSON.parse( content );

			if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

				onError( new Error( 'GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.' ) );
				return;

			}

			if ( json.extensionsUsed ) {

				if ( json.extensionsUsed.indexOf( EXTENSIONS.KHR_LIGHTS ) >= 0 ) {

					extensions[ EXTENSIONS.KHR_LIGHTS ] = new GLTFLightsExtension( json );

				}

				if ( json.extensionsUsed.indexOf( EXTENSIONS.KHR_MATERIALS_COMMON ) >= 0 ) {

					extensions[ EXTENSIONS.KHR_MATERIALS_COMMON ] = new GLTFMaterialsCommonExtension( json );

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

			parser.parse( function ( scene, scenes, cameras, animations ) {

				console.timeEnd( 'GLTFLoader' );

				var glTF = {
					scene: scene,
					scenes: scenes,
					cameras: cameras,
					animations: animations
				};

				onLoad( glTF );

			}, onError );

		}

	};

	/* GLTFREGISTRY */

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

	/*********************************/
	/********** EXTENSIONS ***********/
	/*********************************/

	var EXTENSIONS = {
		KHR_BINARY_GLTF: 'KHR_binary_glTF',
		KHR_LIGHTS: 'KHR_lights',
		KHR_MATERIALS_COMMON: 'KHR_materials_common',
		KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness'
	};

	/**
	 * Lights Extension
	 *
	 * Specification: PENDING
	 */
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

	/**
	 * Common Materials Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/Khronos/KHR_materials_common
	 */
	function GLTFMaterialsCommonExtension( json ) {

		this.name = EXTENSIONS.KHR_MATERIALS_COMMON;

	}

	GLTFMaterialsCommonExtension.prototype.getMaterialType = function ( material ) {

		var khrMaterial = material.extensions[ this.name ];

		switch ( khrMaterial.type ) {

			case 'commonBlinn' :
			case 'commonPhong' :
				return MeshPhongMaterial;

			case 'commonLambert' :
				return MeshLambertMaterial;

			case 'commonConstant' :
			default :
				return MeshBasicMaterial;

		}

	};

	GLTFMaterialsCommonExtension.prototype.extendParams = function ( materialParams, material, parser ) {

		var khrMaterial = material.extensions[ this.name ];

		var pending = [];

		var keys = [];

		// TODO: Currently ignored: 'ambientFactor', 'ambientTexture'
		switch ( khrMaterial.type ) {

			case 'commonBlinn' :
			case 'commonPhong' :
				keys.push( 'diffuseFactor', 'diffuseTexture', 'specularFactor', 'specularTexture', 'shininessFactor' );
				break;

			case 'commonLambert' :
				keys.push( 'diffuseFactor', 'diffuseTexture' );
				break;

			case 'commonConstant' :
			default :
				break;

		}

		var materialValues = {};

		keys.forEach( function ( v ) {

			if ( khrMaterial[ v ] !== undefined ) materialValues[ v ] = khrMaterial[ v ];

		} );

		if ( materialValues.diffuseFactor !== undefined ) {

			materialParams.color = new Color().fromArray( materialValues.diffuseFactor );
			materialParams.opacity = materialValues.diffuseFactor[ 3 ];

		}

		if ( materialValues.diffuseTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'map', materialValues.diffuseTexture.index ) );

		}

		if ( materialValues.specularFactor !== undefined ) {

			materialParams.specular = new Color().fromArray( materialValues.specularFactor );

		}

		if ( materialValues.specularTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'specularMap', materialValues.specularTexture.index ) );

		}

		if ( materialValues.shininessFactor !== undefined ) {

			materialParams.shininess = materialValues.shininessFactor;

		}

		return Promise.all( pending );

	};

	/* BINARY EXTENSION */

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
			magic: convertUint8ArrayToString( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

			throw new Error( 'GLTFLoader: Unsupported glTF-Binary header.' );

		} else if ( this.header.version < 2.0 ) {

			throw new Error( 'GLTFLoader: Legacy binary file detected. Use GLTFLoader instead.' );

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
				this.content = convertUint8ArrayToString( contentArray );

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

	/**
	 * Specular-Glossiness Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/Khronos/KHR_materials_pbrSpecularGlossiness
	 */
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

			/**
			 * Clones a GLTFSpecularGlossinessMaterial instance. The ShaderMaterial.copy() method can
			 * copy only properties it knows about or inherits, and misses many properties that would
			 * normally be defined by MeshStandardMaterial.
			 *
			 * This method allows GLTFSpecularGlossinessMaterials to be cloned in the process of
			 * loading a glTF model, but cloning later (e.g. by the user) would require these changes
			 * AND also updating `.onBeforeRender` on the parent mesh.
			 *
			 * @param  {ShaderMaterial} source
			 * @return {ShaderMaterial}
			 */
			cloneMaterial: function ( source ) {

				var target = source.clone();

				target.isGLTFSpecularGlossinessMaterial = true;

				var params = this.specularGlossinessParams;

				for ( var i = 0; i < params.length; i ++ ) {

					target[ params[ i ] ] = source[ params[ i ] ];

				}

				return target;

			},

			// Here's based on refreshUniformsCommon() and refreshUniformsStandard() in WebGLRenderer.
			refreshUniforms: function ( renderer, scene, camera, geometry, material, group ) {

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

	/*********************************/
	/********** INTERNALS ************/
	/*********************************/

	/* CONSTANTS */

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
		CATMULLROMSPLINE: InterpolateSmooth,
		CUBICSPLINE: InterpolateSmooth,
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

	/* UTILITY FUNCTIONS */

	function _each( object, callback, thisObj ) {

		if ( ! object ) {

			return Promise.resolve();

		}

		var results;
		var fns = [];

		if ( Object.prototype.toString.call( object ) === '[object Array]' ) {

			results = [];

			var length = object.length;

			for ( var idx = 0; idx < length; idx ++ ) {

				var value = callback.call( thisObj || this, object[ idx ], idx );

				if ( value ) {

					if ( value instanceof Promise ) {

						value = value.then( function ( key, value ) {

							results[ key ] = value;

						}.bind( this, idx ) );

					} else {

						results[ idx ] = value;

					}

					fns.push( value );

				}

			}

		} else {

			results = {};

			for ( var key in object ) {

				if ( object.hasOwnProperty( key ) ) {

					var value = callback.call( thisObj || this, object[ key ], key );

					if ( value ) {

						if ( value instanceof Promise ) {

							value = value.then( function ( key, value ) {

								results[ key ] = value;

							}.bind( this, key ) );

						} else {

							results[ key ] = value;

						}

						fns.push( value );

					}

				}

			}

		}

		return Promise.all( fns ).then( function () {

			return results;

		} );

	}

	function resolveURL( url, path ) {

		// Invalid URL
		if ( typeof url !== 'string' || url === '' )
			return '';

		// Absolute URL http://,https://,//
		if ( /^(https?:)?\/\//i.test( url ) ) {

			return url;

		}

		// Data URI
		if ( /^data:.*,.*$/i.test( url ) ) {

			return url;

		}

		// Blob URL
		if ( /^blob:.*$/i.test( url ) ) {

			return url;

		}

		// Relative URL
		return path + url;

	}

	function convertUint8ArrayToString( array ) {

		if ( window.TextDecoder !== undefined ) {

			return new TextDecoder().decode( array );

		}

		// Avoid the String.fromCharCode.apply(null, array) shortcut, which
		// throws a "maximum call stack size exceeded" error for large arrays.

		var s = '';

		for ( var i = 0, il = array.length; i < il; i ++ ) {

			s += String.fromCharCode( array[ i ] );

		}

		return s;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
	 */
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

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
	 *
	 * TODO: Implement support for morph targets on TANGENT attribute.
	 *
	 * @param {Mesh} mesh
	 * @param {GLTF.Mesh} meshDef
	 * @param {GLTF.Primitive} primitiveDef
	 * @param {Object} dependencies
	 */
	function addMorphTargets( mesh, meshDef, primitiveDef, dependencies ) {

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

				positionAttribute = dependencies.accessors[ target.POSITION ].clone();
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
				positionAttribute = geometry.attributes.position.clone();

			}

			if ( positionAttribute !== undefined ) {

				positionAttribute.name = attributeName;
				morphAttributes.position.push( positionAttribute );

			}

			if ( target.NORMAL !== undefined ) {

				material.morphNormals = true;

				// see target.POSITION's comment

				normalAttribute = dependencies.accessors[ target.NORMAL ].clone();
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

				normalAttribute = geometry.attributes.normal.clone();

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

	/* GLTF PARSER */

	function GLTFParser( json, extensions, options ) {

		this.json = json || {};
		this.extensions = extensions || {};
		this.options = options || {};

		// loader object cache
		this.cache = new GLTFRegistry();

		this.textureLoader = new TextureLoader( this.options.manager );
		this.textureLoader.setCrossOrigin( this.options.crossOrigin );

		this.fileLoader = new FileLoader( this.options.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

	}

	GLTFParser.prototype._withDependencies = function ( dependencies ) {

		var _dependencies = {};

		for ( var i = 0; i < dependencies.length; i ++ ) {

			var dependency = dependencies[ i ];
			var fnName = 'load' + dependency.charAt( 0 ).toUpperCase() + dependency.slice( 1 );

			var cached = this.cache.get( dependency );

			if ( cached !== undefined ) {

				_dependencies[ dependency ] = cached;

			} else if ( this[ fnName ] ) {

				var fn = this[ fnName ]();
				this.cache.add( dependency, fn );

				_dependencies[ dependency ] = fn;

			}

		}

		return _each( _dependencies, function ( dependency ) {

			return dependency;

		} );

	};

	GLTFParser.prototype.parse = function ( onLoad, onError ) {

		var json = this.json;
		var parser = this;

		// Clear the loader cache
		this.cache.removeAll();

		// Fire the callback on complete
		this._withDependencies( [

			'scenes',
			'animations'

		] ).then( function ( dependencies ) {

			var scenes = dependencies.scenes || [];
			var scene = scenes[ json.scene || 0 ];
			var animations = dependencies.animations || [];

			parser.getDependencies( 'camera' ).then( function ( cameras ) {

				onLoad( scene, scenes, cameras, animations );

			} ).catch( onError );

		} ).catch( onError );

	};

	/**
	 * Requests the specified dependency asynchronously, with caching.
	 * @param {string} type
	 * @param {number} index
	 * @return {Promise<Object>}
	 */
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

	/**
	 * Requests all dependencies of the specified type asynchronously, with caching.
	 * @param {string} type
	 * @return {Promise<Array<Object>>}
	 */
	GLTFParser.prototype.getDependencies = function ( type ) {

		var parser = this;
		var defs = this.json[ type + 's' ] || [];

		return Promise.all( defs.map( function ( def, index ) {

			return parser.getDependency( type, index );

		} ) );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferIndex
	 * @return {Promise<ArrayBuffer>}
	 */
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

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferViewIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	GLTFParser.prototype.loadBufferView = function ( bufferViewIndex ) {

		var bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

		return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

			var byteLength = bufferViewDef.byteLength || 0;
			var byteOffset = bufferViewDef.byteOffset || 0;
			return buffer.slice( byteOffset, byteOffset + byteLength );

		} );

	};

	GLTFParser.prototype.loadAccessors = function () {

		var parser = this;
		var json = this.json;

		return _each( json.accessors, function ( accessor ) {

			return parser.getDependency( 'bufferView', accessor.bufferView ).then( function ( bufferView ) {

				var itemSize = WEBGL_TYPE_SIZES[ accessor.type ];
				var TypedArray = WEBGL_COMPONENT_TYPES[ accessor.componentType ];

				// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
				var elementBytes = TypedArray.BYTES_PER_ELEMENT;
				var itemBytes = elementBytes * itemSize;
				var byteStride = json.bufferViews[ accessor.bufferView ].byteStride;
				var normalized = accessor.normalized === true;
				var array;

				// The buffer is not interleaved if the stride is the item size in bytes.
				if ( byteStride && byteStride !== itemBytes ) {

					// Use the full buffer if it's interleaved.
					array = new TypedArray( bufferView );

					// Integer parameters to IB/IBA are in array elements, not bytes.
					var ib = new InterleavedBuffer( array, byteStride / elementBytes );

					return new InterleavedBufferAttribute( ib, itemSize, accessor.byteOffset / elementBytes, normalized );

				} else {

					array = new TypedArray( bufferView, accessor.byteOffset, accessor.count * itemSize );

					return new BufferAttribute( array, itemSize, normalized );

				}

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
	 * @param {number} textureIndex
	 * @return {Promise<Texture>}
	 */
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

			sourceURI = parser.getDependency( 'bufferView', source.bufferView )
				.then( function ( bufferView ) {

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

	/**
	 * Asynchronously assigns a texture to the given material parameters.
	 * @param {Object} materialParams
	 * @param {string} textureName
	 * @param {number} textureIndex
	 * @return {Promise}
	 */
	GLTFParser.prototype.assignTexture = function ( materialParams, textureName, textureIndex ) {

		return this.getDependency( 'texture', textureIndex ).then( function ( texture ) {

			materialParams[ textureName ] = texture;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
	 * @return {Promise<Array<Material>>}
	 */
	GLTFParser.prototype.loadMaterials = function () {

		var parser = this;
		var json = this.json;
		var extensions = this.extensions;

		return _each( json.materials, function ( material ) {

			var materialType;
			var materialParams = {};
			var materialExtensions = material.extensions || {};

			var pending = [];

			if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_COMMON ] ) {

				var khcExtension = extensions[ EXTENSIONS.KHR_MATERIALS_COMMON ];
				materialType = khcExtension.getMaterialType( material );
				pending.push( khcExtension.extendParams( materialParams, material, parser ) );

			} else if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ] ) {

				var sgExtension = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ];
				materialType = sgExtension.getMaterialType( material );
				pending.push( sgExtension.extendParams( materialParams, material, parser ) );

			} else if ( material.pbrMetallicRoughness !== undefined ) {

				// Specification:
				// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

				materialType = MeshStandardMaterial;

				var metallicRoughness = material.pbrMetallicRoughness;

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

			if ( material.doubleSided === true ) {

				materialParams.side = DoubleSide;

			}

			var alphaMode = material.alphaMode || ALPHA_MODES.OPAQUE;

			if ( alphaMode !== ALPHA_MODES.OPAQUE ) {

				materialParams.transparent = true;

				if ( alphaMode === ALPHA_MODES.MASK ) {

					materialParams.alphaTest = material.alphaCutoff || 0.5;

				}

			} else {

				materialParams.transparent = false;

			}

			if ( material.normalTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'normalMap', material.normalTexture.index ) );

				materialParams.normalScale = new Vector2( 1, 1 );

				if ( material.normalTexture.scale !== undefined ) {

					materialParams.normalScale.set( material.normalTexture.scale, material.normalTexture.scale );

				}

			}

			if ( material.occlusionTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'aoMap', material.occlusionTexture.index ) );

				if ( material.occlusionTexture.strength !== undefined ) {

					materialParams.aoMapIntensity = material.occlusionTexture.strength;

				}

			}

			if ( material.emissiveFactor !== undefined ) {

				if ( materialType === MeshBasicMaterial ) {

					materialParams.color = new Color().fromArray( material.emissiveFactor );

				} else {

					materialParams.emissive = new Color().fromArray( material.emissiveFactor );

				}

			}

			if ( material.emissiveTexture !== undefined ) {

				if ( materialType === MeshBasicMaterial ) {

					pending.push( parser.assignTexture( materialParams, 'map', material.emissiveTexture.index ) );

				} else {

					pending.push( parser.assignTexture( materialParams, 'emissiveMap', material.emissiveTexture.index ) );

				}

			}

			return Promise.all( pending ).then( function () {

				var _material;

				if ( materialType === ShaderMaterial ) {

					_material = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].createMaterial( materialParams );

				} else {

					_material = new materialType( materialParams );

				}

				if ( material.name !== undefined ) _material.name = material.name;

				// Normal map textures use OpenGL conventions:
				// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#materialnormaltexture
				if ( _material.normalScale ) {

					_material.normalScale.x = - _material.normalScale.x;

				}

				// emissiveTexture and baseColorTexture use sRGB encoding.
				if ( _material.map ) _material.map.encoding = sRGBEncoding;
				if ( _material.emissiveMap ) _material.emissiveMap.encoding = sRGBEncoding;

				if ( material.extras ) _material.userData = material.extras;

				return _material;

			} );

		} );

	};

	GLTFParser.prototype.loadGeometries = function ( primitives ) {

		return this._withDependencies( [

			'accessors',

		] ).then( function ( dependencies ) {

			return _each( primitives, function ( primitive ) {

				var geometry = new BufferGeometry();

				var attributes = primitive.attributes;

				for ( var attributeId in attributes ) {

					var attributeEntry = attributes[ attributeId ];

					if ( attributeEntry === undefined ) return;

					var bufferAttribute = dependencies.accessors[ attributeEntry ];

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

					geometry.setIndex( dependencies.accessors[ primitive.indices ] );

				}

				return geometry;

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
	 */
	GLTFParser.prototype.loadMeshes = function () {

		var scope = this;
		var json = this.json;
		var extensions = this.extensions;

		return this._withDependencies( [

			'accessors',
			'materials'

		] ).then( function ( dependencies ) {

			return _each( json.meshes, function ( meshDef, meshIndex ) {

				var group = new Group();

				var primitives = meshDef.primitives || [];

				return scope.loadGeometries( primitives ).then( function ( geometries ) {

					for ( var i = 0; i < primitives.length; i ++ ) {

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

						var useVertexColors = geometry.attributes.color !== undefined;
						var useFlatShading = geometry.attributes.normal === undefined;

						if ( useVertexColors || useFlatShading ) {

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

						if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === undefined ) {

							mesh = new Mesh( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

							mesh = new Mesh( geometry, material );
							mesh.drawMode = TriangleStripDrawMode;

						} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

							mesh = new Mesh( geometry, material );
							mesh.drawMode = TriangleFanDrawMode;

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

							mesh = new LineSegments( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

							mesh = new Line( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

							mesh = new LineLoop( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

							mesh = new Points( geometry, material );

						} else {

							throw new Error( 'GLTFLoader: Primitive mode unsupported: ', primitive.mode );

						}

						mesh.name = meshDef.name || ( 'mesh_' + meshIndex );

						if ( primitive.targets !== undefined ) {

							addMorphTargets( mesh, meshDef, primitive, dependencies );

						}

						if ( primitive.extras ) mesh.userData = primitive.extras;

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

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
	 * @param {number} cameraIndex
	 * @return {Promise<Camera>}
	 */
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

			camera = new PerspectiveCamera( Math.radToDeg( xfov ), aspectRatio, params.znear || 1, params.zfar || 2e6 );

		} else if ( cameraDef.type === 'orthographic' ) {

			camera = new OrthographicCamera( params.xmag / -2, params.xmag / 2, params.ymag / 2, params.ymag / -2, params.znear, params.zfar );

		}

		if ( cameraDef.name !== undefined ) camera.name = cameraDef.name;
		if ( cameraDef.extras ) camera.userData = cameraDef.extras;

		return Promise.resolve( camera );

	};

	GLTFParser.prototype.loadSkins = function () {

		var json = this.json;

		return this._withDependencies( [

			'accessors'

		] ).then( function ( dependencies ) {

			return _each( json.skins, function ( skin ) {

				var _skin = {
					joints: skin.joints,
					inverseBindMatrices: dependencies.accessors[ skin.inverseBindMatrices ]
				};

				return _skin;

			} );

		} );

	};

	GLTFParser.prototype.loadAnimations = function () {

		var json = this.json;

		return this._withDependencies( [

			'accessors',
			'nodes'

		] ).then( function ( dependencies ) {

			return _each( json.animations, function ( animation, animationId ) {

				var tracks = [];

				for ( var i = 0; i < animation.channels.length; i ++ ) {

					var channel = animation.channels[ i ];
					var sampler = animation.samplers[ channel.sampler ];

					if ( sampler ) {

						var target = channel.target;
						var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.
						var input = animation.parameters !== undefined ? animation.parameters[ sampler.input ] : sampler.input;
						var output = animation.parameters !== undefined ? animation.parameters[ sampler.output ] : sampler.output;

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

							if ( sampler.interpolation === 'CATMULLROMSPLINE' ) {

								console.warn( 'GLTFLoader: CATMULLROMSPLINE interpolation is not supported. Using CUBICSPLINE instead.' );

							}

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

								tracks.push( new TypedKeyframeTrack(
									targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
									AnimationUtils.arraySlice( inputAccessor.array, 0 ),
									AnimationUtils.arraySlice( outputAccessor.array, 0 ),
									interpolation
								) );

							}

						}

					}

				}

				var name = animation.name !== undefined ? animation.name : 'animation_' + animationId;

				return new AnimationClip( name, undefined, tracks );

			} );

		} );

	};

	GLTFParser.prototype.loadNodes = function () {

		var json = this.json;
		var extensions = this.extensions;
		var scope = this;

		var nodes = json.nodes || [];
		var skins = json.skins || [];

		var meshReferences = {};
		var meshUses = {};

		// Nothing in the node definition indicates whether it is a Bone or an
		// Object3D. Use the skins' joint references to mark bones.
		for ( var skinIndex in skins ) {

			var joints = skins[ skinIndex ].joints;

			for ( var i = 0; i < joints.length; ++ i ) {

				nodes[ joints[ i ] ].isBone = true;

			}

		}

		// Meshes can (and should) be reused by multiple nodes in a glTF asset. To
		// avoid having more than one Mesh with the same name, count
		// references and rename instances below.
		//
		// Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
		for ( var nodeIndex in nodes ) {

			var nodeDef = nodes[ nodeIndex ];

			if ( nodeDef.mesh !== undefined ) {

				if ( meshReferences[ nodeDef.mesh ] === undefined ) {

					meshReferences[ nodeDef.mesh ] = meshUses[ nodeDef.mesh ] = 0;

				}

				meshReferences[ nodeDef.mesh ]++;

			}

		}

		return scope._withDependencies( [

			'meshes',
			'skins',
			'cameras'

		] ).then( function ( dependencies ) {

			return _each( json.nodes, function ( nodeDef ) {

				if ( nodeDef.isBone === true ) {

					return new Bone();

				} else if ( nodeDef.mesh !== undefined ) {

					var mesh = dependencies.meshes[ nodeDef.mesh ].clone();

					if ( meshReferences[ nodeDef.mesh ] > 1 ) {

						mesh.name += '_instance_' + meshUses[ nodeDef.mesh ]++;

					}

					return mesh;

				} else if ( nodeDef.camera !== undefined ) {

					return scope.getDependency( 'camera', nodeDef.camera );

				} else if ( nodeDef.extensions
								 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ]
								 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light !== undefined ) {

					var lights = extensions[ EXTENSIONS.KHR_LIGHTS ].lights;
					return lights[ nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light ];

				} else {

					return new Object3D();

				}

			} ).then( function ( __nodes ) {

				return _each( __nodes, function ( node, nodeIndex ) {

					var nodeDef = json.nodes[ nodeIndex ];

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

					if ( nodeDef.skin !== undefined ) {

						var skinnedMeshes = [];

						var meshes = node.children.length > 0 ? node.children : [ node ];

						for ( var i = 0; i < meshes.length; i ++ ) {

							var mesh = meshes[ i ];
							var skinEntry = dependencies.skins[ nodeDef.skin ];

							// Replace Mesh with SkinnedMesh.
							var geometry = mesh.geometry;
							var material = mesh.material;
							material.skinning = true;

							var skinnedMesh = new SkinnedMesh( geometry, material );
							skinnedMesh.morphTargetInfluences = mesh.morphTargetInfluences;
							skinnedMesh.userData = mesh.userData;
							skinnedMesh.name = mesh.name;

							var bones = [];
							var boneInverses = [];

							for ( var j = 0, l = skinEntry.joints.length; j < l; j ++ ) {

								var jointId = skinEntry.joints[ j ];
								var jointNode = __nodes[ jointId ];

								if ( jointNode ) {

									bones.push( jointNode );

									var m = skinEntry.inverseBindMatrices.array;
									var mat = new Matrix4().fromArray( m, j * 16 );
									boneInverses.push( mat );

								} else {

									console.warn( 'GLTFLoader: Joint "%s" could not be found.', jointId );

								}

							}

							skinnedMesh.bind( new Skeleton( bones, boneInverses ), skinnedMesh.matrixWorld );

							skinnedMeshes.push( skinnedMesh );

						}

						if ( node.children.length > 0 ) {

							node.remove.apply( node, node.children );
							node.add.apply( node, skinnedMeshes );

						} else {

							node = skinnedMeshes[ 0 ];

						}

					}

					return node;

				} );

			} );

		} );

	};

	GLTFParser.prototype.loadScenes = function () {

		var json = this.json;
		var extensions = this.extensions;

		// scene node hierachy builder

		function buildNodeHierachy( nodeId, parentObject, allNodes ) {

			var _node = allNodes[ nodeId ];
			parentObject.add( _node );

			var node = json.nodes[ nodeId ];

			if ( node.children ) {

				var children = node.children;

				for ( var i = 0, l = children.length; i < l; i ++ ) {

					var child = children[ i ];
					buildNodeHierachy( child, _node, allNodes );

				}

			}

		}

		return this._withDependencies( [

			'nodes'

		] ).then( function ( dependencies ) {

			return _each( json.scenes, function ( scene ) {

				var _scene = new Scene();
				if ( scene.name !== undefined ) _scene.name = scene.name;

				if ( scene.extras ) _scene.userData = scene.extras;

				var nodes = scene.nodes || [];

				for ( var i = 0, l = nodes.length; i < l; i ++ ) {

					var nodeId = nodes[ i ];
					buildNodeHierachy( nodeId, _scene, dependencies.nodes );

				}

				_scene.traverse( function ( child ) {

					// for Specular-Glossiness.
					if ( child.material && child.material.isGLTFSpecularGlossinessMaterial ) {

						child.onBeforeRender = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].refreshUniforms;

					}

				} );

				// Ambient lighting, if present, is always attached to the scene root.
				if ( scene.extensions
							 && scene.extensions[ EXTENSIONS.KHR_LIGHTS ]
							 && scene.extensions[ EXTENSIONS.KHR_LIGHTS ].light !== undefined ) {

					var lights = extensions[ EXTENSIONS.KHR_LIGHTS ].lights;
					_scene.add( lights[ scene.extensions[ EXTENSIONS.KHR_LIGHTS ].light ] );

				}

				return _scene;

			} );

		} );

	};

	return GLTFLoader;

} )();

export { GLTFLoader }
