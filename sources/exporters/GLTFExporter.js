//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from '../math/Vector3.js'
import { BufferGeometry } from '../core/BufferGeometry.js'
import { BufferAttribute } from '../core/BufferAttribute.js'
import { Scene } from '../scenes/Scene.js'
import {
	DoubleSide,
	VertexColors,
	RGBAFormat,
	InterpolateDiscrete,
	TriangleStripDrawMode,
	TriangleFanDrawMode
} from '../constants.js'
import { _Math } from '../math/Math.js'
import { PropertyBinding } from '../animation/PropertyBinding.js'
//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------
var WEBGL_CONSTANTS = {
	POINTS: 0x0000,
	LINES: 0x0001,
	LINE_LOOP: 0x0002,
	LINE_STRIP: 0x0003,
	TRIANGLES: 0x0004,
	TRIANGLE_STRIP: 0x0005,
	TRIANGLE_FAN: 0x0006,

	UNSIGNED_BYTE: 0x1401,
	UNSIGNED_SHORT: 0x1403,
	FLOAT: 0x1406,
	UNSIGNED_INT: 0x1405,
	ARRAY_BUFFER: 0x8892,
	ELEMENT_ARRAY_BUFFER: 0x8893,

	NEAREST: 0x2600,
	LINEAR: 0x2601,
	NEAREST_MIPMAP_NEAREST: 0x2700,
	LINEAR_MIPMAP_NEAREST: 0x2701,
	NEAREST_MIPMAP_LINEAR: 0x2702,
	LINEAR_MIPMAP_LINEAR: 0x2703
};

var THREE_TO_WEBGL = {
	// @TODO Replace with computed property name [*] when available on es6
	1003: WEBGL_CONSTANTS.NEAREST,
	1004: WEBGL_CONSTANTS.NEAREST_MIPMAP_NEAREST,
	1005: WEBGL_CONSTANTS.NEAREST_MIPMAP_LINEAR,
	1006: WEBGL_CONSTANTS.LINEAR,
	1007: WEBGL_CONSTANTS.LINEAR_MIPMAP_NEAREST,
	1008: WEBGL_CONSTANTS.LINEAR_MIPMAP_LINEAR
};

var PATH_PROPERTIES = {
	scale: 'scale',
	position: 'translation',
	quaternion: 'rotation',
	morphTargetInfluences: 'weights'
};

//------------------------------------------------------------------------------
// GLTF Exporter
//------------------------------------------------------------------------------
var GLTFExporter = function () {};

GLTFExporter.prototype = {

	constructor: GLTFExporter,
	parse: function ( input, onDone, options ) {

		var DEFAULT_OPTIONS = {
			binary: false,
			trs: false,
			onlyVisible: true,
			truncateDrawRange: true,
			embedImages: true,
			animations: [],
			forceIndices: false,
			forcePowerOfTwoTextures: false
		};

		options = Object.assign( {}, DEFAULT_OPTIONS, options );

		if ( options.animations.length > 0 ) {

			// Only TRS properties, and not matrices, may be targeted by animation.
			options.trs = true;

		}

		var outputJSON = {

			asset: {

				version: "2.0",
				generator: "GLTFExporter"

			}

		};

		var byteOffset = 0;
		var buffers = [];
		var pending = [];
		var nodeMap = new Map();
		var skins = [];
		var extensionsUsed = {};
		var cachedData = {

			attributes: new Map(),
			materials: new Map(),
			textures: new Map(),
			images: new Map()

		};

		var cachedCanvas;
		function equalArray( array1, array2 ) {

			return ( array1.length === array2.length ) && array1.every( function ( element, index ) {

				return element === array2[ index ];

			} );

		}
		function stringToArrayBuffer( text ) {

			if ( window.TextEncoder !== undefined ) {

				return new TextEncoder().encode( text ).buffer;

			}

			var array = new Uint8Array( new ArrayBuffer( text.length ) );

			for ( var i = 0, il = text.length; i < il; i ++ ) {

				var value = text.charCodeAt( i );

				// Replacing multi-byte character with space(0x20).
				array[ i ] = value > 0xFF ? 0x20 : value;

			}

			return array.buffer;

		}
		function getMinMax( attribute, start, count ) {

			var output = {

				min: new Array( attribute.itemSize ).fill( Number.POSITIVE_INFINITY ),
				max: new Array( attribute.itemSize ).fill( Number.NEGATIVE_INFINITY )

			};

			for ( var i = start; i < start + count; i ++ ) {

				for ( var a = 0; a < attribute.itemSize; a ++ ) {

					var value = attribute.array[ i * attribute.itemSize + a ];
					output.min[ a ] = Math.min( output.min[ a ], value );
					output.max[ a ] = Math.max( output.max[ a ], value );

				}

			}

			return output;

		}
		function isPowerOfTwo( image ) {

			return _Math.isPowerOfTwo( image.width ) && _Math.isPowerOfTwo( image.height );

		}
		function isNormalizedNormalAttribute( normal ) {

			if ( cachedData.attributes.has( normal ) ) {

				return false;

			}

			var v = new Vector3();

			for ( var i = 0, il = normal.count; i < il; i ++ ) {

				// 0.0005 is from glTF-validator
				if ( Math.abs( v.fromArray( normal.array, i * 3 ).length() - 1.0 ) > 0.0005 ) return false;

			}

			return true;

		}
		function createNormalizedNormalAttribute( normal ) {

			if ( cachedData.attributes.has( normal ) ) {

				return cachedData.attributes.get( normal );

			}

			var attribute = normal.clone();

			var v = new Vector3();

			for ( var i = 0, il = attribute.count; i < il; i ++ ) {

				v.fromArray( attribute.array, i * 3 );

				if ( v.x === 0 && v.y === 0 && v.z === 0 ) {

					// if values can't be normalized set (1, 0, 0)
					v.setX( 1.0 );

				} else {

					v.normalize();

				}

				v.toArray( attribute.array, i * 3 );

			}

			cachedData.attributes.set( normal, attribute );

			return attribute;

		}
		function getPaddedBufferSize( bufferSize ) {

			return Math.ceil( bufferSize / 4 ) * 4;

		}
		function getPaddedArrayBuffer( arrayBuffer, paddingByte ) {

			paddingByte = paddingByte || 0;

			var paddedLength = getPaddedBufferSize( arrayBuffer.byteLength );

			if ( paddedLength !== arrayBuffer.byteLength ) {

				var array = new Uint8Array( paddedLength );
				array.set( new Uint8Array( arrayBuffer ) );

				if ( paddingByte !== 0 ) {

					for ( var i = arrayBuffer.byteLength; i < paddedLength; i ++ ) {

						array[ i ] = paddingByte;

					}

				}

				return array.buffer;

			}

			return arrayBuffer;

		}
		function serializeUserData( object ) {

			try {

				return JSON.parse( JSON.stringify( object.userData ) );

			} catch ( error ) {

				console.warn( 'GLTFExporter: userData of \'' + object.name + '\' ' +
					'won\'t be serialized because of JSON.stringify error - ' + error.message );

				return {};

			}

		}
		function processBuffer( buffer ) {

			if ( ! outputJSON.buffers ) {

				outputJSON.buffers = [ { byteLength: 0 } ];

			}

			// All buffers are merged before export.
			buffers.push( buffer );

			return 0;

		}
		function processBufferView( attribute, componentType, start, count, target ) {

			if ( ! outputJSON.bufferViews ) {

				outputJSON.bufferViews = [];

			}

			// Create a new dataview and dump the attribute's array into it

			var componentSize;

			if ( componentType === WEBGL_CONSTANTS.UNSIGNED_BYTE ) {

				componentSize = 1;

			} else if ( componentType === WEBGL_CONSTANTS.UNSIGNED_SHORT ) {

				componentSize = 2;

			} else {

				componentSize = 4;

			}

			var byteLength = getPaddedBufferSize( count * attribute.itemSize * componentSize );
			var dataView = new DataView( new ArrayBuffer( byteLength ) );
			var offset = 0;

			for ( var i = start; i < start + count; i ++ ) {

				for ( var a = 0; a < attribute.itemSize; a ++ ) {

					// @TODO Fails on InterleavedBufferAttribute, and could probably be
					// optimized for normal BufferAttribute.
					var value = attribute.array[ i * attribute.itemSize + a ];

					if ( componentType === WEBGL_CONSTANTS.FLOAT ) {

						dataView.setFloat32( offset, value, true );

					} else if ( componentType === WEBGL_CONSTANTS.UNSIGNED_INT ) {

						dataView.setUint32( offset, value, true );

					} else if ( componentType === WEBGL_CONSTANTS.UNSIGNED_SHORT ) {

						dataView.setUint16( offset, value, true );

					} else if ( componentType === WEBGL_CONSTANTS.UNSIGNED_BYTE ) {

						dataView.setUint8( offset, value );

					}

					offset += componentSize;

				}

			}

			var gltfBufferView = {

				buffer: processBuffer( dataView.buffer ),
				byteOffset: byteOffset,
				byteLength: byteLength

			};

			if ( target !== undefined ) gltfBufferView.target = target;

			if ( target === WEBGL_CONSTANTS.ARRAY_BUFFER ) {

				// Only define byteStride for vertex attributes.
				gltfBufferView.byteStride = attribute.itemSize * componentSize;

			}

			byteOffset += byteLength;

			outputJSON.bufferViews.push( gltfBufferView );

			// @TODO Merge bufferViews where possible.
			var output = {

				id: outputJSON.bufferViews.length - 1,
				byteLength: 0

			};

			return output;

		}
		function processBufferViewImage( blob ) {

			if ( ! outputJSON.bufferViews ) {

				outputJSON.bufferViews = [];

			}

			return new Promise( function ( resolve ) {

				var reader = new window.FileReader();
				reader.readAsArrayBuffer( blob );
				reader.onloadend = function () {

					var buffer = getPaddedArrayBuffer( reader.result );

					var bufferView = {
						buffer: processBuffer( buffer ),
						byteOffset: byteOffset,
						byteLength: buffer.byteLength
					};

					byteOffset += buffer.byteLength;

					outputJSON.bufferViews.push( bufferView );

					resolve( outputJSON.bufferViews.length - 1 );

				};

			} );

		}
		function processAccessor( attribute, geometry, start, count ) {

			var types = {

				1: 'SCALAR',
				2: 'VEC2',
				3: 'VEC3',
				4: 'VEC4',
				16: 'MAT4'

			};

			var componentType;

			// Detect the component type of the attribute array (float, uint or ushort)
			if ( attribute.array.constructor === Float32Array ) {

				componentType = WEBGL_CONSTANTS.FLOAT;

			} else if ( attribute.array.constructor === Uint32Array ) {

				componentType = WEBGL_CONSTANTS.UNSIGNED_INT;

			} else if ( attribute.array.constructor === Uint16Array ) {

				componentType = WEBGL_CONSTANTS.UNSIGNED_SHORT;

			} else if ( attribute.array.constructor === Uint8Array ) {

				componentType = WEBGL_CONSTANTS.UNSIGNED_BYTE;

			} else {

				throw new Error( 'GLTFExporter: Unsupported bufferAttribute component type.' );

			}

			if ( start === undefined ) start = 0;
			if ( count === undefined ) count = attribute.count;

			// @TODO Indexed buffer geometry with drawRange not supported yet
			if ( options.truncateDrawRange && geometry !== undefined && geometry.index === null ) {

				var end = start + count;
				var end2 = geometry.drawRange.count === Infinity
					? attribute.count
					: geometry.drawRange.start + geometry.drawRange.count;

				start = Math.max( start, geometry.drawRange.start );
				count = Math.min( end, end2 ) - start;

				if ( count < 0 ) count = 0;

			}

			// Skip creating an accessor if the attribute doesn't have data to export
			if ( count === 0 ) {

				return null;

			}

			var minMax = getMinMax( attribute, start, count );

			var bufferViewTarget;

			// If geometry isn't provided, don't infer the target usage of the bufferView. For
			// animation samplers, target must not be set.
			if ( geometry !== undefined ) {

				bufferViewTarget = attribute === geometry.index ? WEBGL_CONSTANTS.ELEMENT_ARRAY_BUFFER : WEBGL_CONSTANTS.ARRAY_BUFFER;

			}

			var bufferView = processBufferView( attribute, componentType, start, count, bufferViewTarget );

			var gltfAccessor = {

				bufferView: bufferView.id,
				byteOffset: bufferView.byteOffset,
				componentType: componentType,
				count: count,
				max: minMax.max,
				min: minMax.min,
				type: types[ attribute.itemSize ]

			};

			if ( ! outputJSON.accessors ) {

				outputJSON.accessors = [];

			}

			outputJSON.accessors.push( gltfAccessor );

			return outputJSON.accessors.length - 1;

		}
		function processImage( image, format, flipY ) {

			if ( ! cachedData.images.has( image ) ) {

				cachedData.images.set( image, {} );

			}

			var cachedImages = cachedData.images.get( image );
			var mimeType = format === RGBAFormat ? 'image/png' : 'image/jpeg';
			var key = mimeType + ":flipY/" + flipY.toString();

			if ( cachedImages[ key ] !== undefined ) {

				return cachedImages[ key ];

			}

			if ( ! outputJSON.images ) {

				outputJSON.images = [];

			}

			var gltfImage = { mimeType: mimeType };

			if ( options.embedImages ) {

				var canvas = cachedCanvas = cachedCanvas || document.createElement( 'canvas' );

				canvas.width = image.width;
				canvas.height = image.height;

				if ( options.forcePowerOfTwoTextures && ! isPowerOfTwo( image ) ) {

					console.warn( 'GLTFExporter: Resized non-power-of-two image.', image );

					canvas.width = _Math.floorPowerOfTwo( canvas.width );
					canvas.height = _Math.floorPowerOfTwo( canvas.height );

				}

				var ctx = canvas.getContext( '2d' );

				if ( flipY === true ) {

					ctx.translate( 0, canvas.height );
					ctx.scale( 1, - 1 );

				}

				ctx.drawImage( image, 0, 0, canvas.width, canvas.height );

				if ( options.binary === true ) {

					pending.push( new Promise( function ( resolve ) {

						canvas.toBlob( function ( blob ) {

							processBufferViewImage( blob ).then( function ( bufferViewIndex ) {

								gltfImage.bufferView = bufferViewIndex;

								resolve();

							} );

						}, mimeType );

					} ) );

				} else {

					gltfImage.uri = canvas.toDataURL( mimeType );

				}

			} else {

				gltfImage.uri = image.src;

			}

			outputJSON.images.push( gltfImage );

			var index = outputJSON.images.length - 1;
			cachedImages[ key ] = index;

			return index;

		}
		function processSampler( map ) {

			if ( ! outputJSON.samplers ) {

				outputJSON.samplers = [];

			}

			var gltfSampler = {

				magFilter: THREE_TO_WEBGL[ map.magFilter ],
				minFilter: THREE_TO_WEBGL[ map.minFilter ],
				wrapS: THREE_TO_WEBGL[ map.wrapS ],
				wrapT: THREE_TO_WEBGL[ map.wrapT ]

			};

			outputJSON.samplers.push( gltfSampler );

			return outputJSON.samplers.length - 1;

		}
		function processTexture( map ) {

			if ( cachedData.textures.has( map ) ) {

				return cachedData.textures.get( map );

			}

			if ( ! outputJSON.textures ) {

				outputJSON.textures = [];

			}

			var gltfTexture = {

				sampler: processSampler( map ),
				source: processImage( map.image, map.format, map.flipY )

			};

			outputJSON.textures.push( gltfTexture );

			var index = outputJSON.textures.length - 1;
			cachedData.textures.set( map, index );

			return index;

		}
		function processMaterial( material ) {

			if ( cachedData.materials.has( material ) ) {

				return cachedData.materials.get( material );

			}

			if ( ! outputJSON.materials ) {

				outputJSON.materials = [];

			}

			if ( material.isShaderMaterial ) {

				console.warn( 'GLTFExporter: ShaderMaterial not supported.' );
				return null;

			}

			// @QUESTION Should we avoid including any attribute that has the default value?
			var gltfMaterial = {

				pbrMetallicRoughness: {}

			};

			if ( material.isMeshBasicMaterial ) {

				gltfMaterial.extensions = { KHR_materials_unlit: {} };

				extensionsUsed[ 'KHR_materials_unlit' ] = true;

			} else if ( ! material.isMeshStandardMaterial ) {

				console.warn( 'GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.' );

			}

			// pbrMetallicRoughness.baseColorFactor
			var color = material.color.toArray().concat( [ material.opacity ] );

			if ( ! equalArray( color, [ 1, 1, 1, 1 ] ) ) {

				gltfMaterial.pbrMetallicRoughness.baseColorFactor = color;

			}

			if ( material.isMeshStandardMaterial ) {

				gltfMaterial.pbrMetallicRoughness.metallicFactor = material.metalness;
				gltfMaterial.pbrMetallicRoughness.roughnessFactor = material.roughness;

			} else if ( material.isMeshBasicMaterial ) {

				gltfMaterial.pbrMetallicRoughness.metallicFactor = 0.0;
				gltfMaterial.pbrMetallicRoughness.roughnessFactor = 0.9;

			} else {

				gltfMaterial.pbrMetallicRoughness.metallicFactor = 0.5;
				gltfMaterial.pbrMetallicRoughness.roughnessFactor = 0.5;

			}

			// pbrMetallicRoughness.metallicRoughnessTexture
			if ( material.metalnessMap || material.roughnessMap ) {

				if ( material.metalnessMap === material.roughnessMap ) {

					gltfMaterial.pbrMetallicRoughness.metallicRoughnessTexture = {

						index: processTexture( material.metalnessMap )

					};

				} else {

					console.warn( 'GLTFExporter: Ignoring metalnessMap and roughnessMap because they are not the same Texture.' );

				}

			}

			// pbrMetallicRoughness.baseColorTexture
			if ( material.map ) {

				gltfMaterial.pbrMetallicRoughness.baseColorTexture = {

					index: processTexture( material.map )

				};

			}

			if ( material.isMeshBasicMaterial ||
				material.isLineBasicMaterial ||
				material.isPointsMaterial ) {

			} else {

				// emissiveFactor
				var emissive = material.emissive.clone().multiplyScalar( material.emissiveIntensity ).toArray();

				if ( ! equalArray( emissive, [ 0, 0, 0 ] ) ) {

					gltfMaterial.emissiveFactor = emissive;

				}

				// emissiveTexture
				if ( material.emissiveMap ) {

					gltfMaterial.emissiveTexture = {

						index: processTexture( material.emissiveMap )

					};

				}

			}

			// normalTexture
			if ( material.normalMap ) {

				gltfMaterial.normalTexture = {

					index: processTexture( material.normalMap )

				};

				if ( material.normalScale.x !== - 1 ) {

					if ( material.normalScale.x !== material.normalScale.y ) {

						console.warn( 'GLTFExporter: Normal scale components are different, ignoring Y and exporting X.' );

					}

					gltfMaterial.normalTexture.scale = material.normalScale.x;

				}

			}

			// occlusionTexture
			if ( material.aoMap ) {

				gltfMaterial.occlusionTexture = {

					index: processTexture( material.aoMap )

				};

				if ( material.aoMapIntensity !== 1.0 ) {

					gltfMaterial.occlusionTexture.strength = material.aoMapIntensity;

				}

			}

			// alphaMode
			if ( material.transparent || material.alphaTest > 0.0 ) {

				gltfMaterial.alphaMode = material.opacity < 1.0 ? 'BLEND' : 'MASK';

				// Write alphaCutoff if it's non-zero and different from the default (0.5).
				if ( material.alphaTest > 0.0 && material.alphaTest !== 0.5 ) {

					gltfMaterial.alphaCutoff = material.alphaTest;

				}

			}

			// doubleSided
			if ( material.side === DoubleSide ) {

				gltfMaterial.doubleSided = true;

			}

			if ( material.name !== '' ) {

				gltfMaterial.name = material.name;

			}

			if ( Object.keys( material.userData ).length > 0 ) {

				gltfMaterial.extras = serializeUserData( material );

			}

			outputJSON.materials.push( gltfMaterial );

			var index = outputJSON.materials.length - 1;
			cachedData.materials.set( material, index );

			return index;

		}
		function processMesh( mesh ) {

			var geometry = mesh.geometry;

			var mode;

			// Use the correct mode
			if ( mesh.isLineSegments ) {

				mode = WEBGL_CONSTANTS.LINES;

			} else if ( mesh.isLineLoop ) {

				mode = WEBGL_CONSTANTS.LINE_LOOP;

			} else if ( mesh.isLine ) {

				mode = WEBGL_CONSTANTS.LINE_STRIP;

			} else if ( mesh.isPoints ) {

				mode = WEBGL_CONSTANTS.POINTS;

			} else {

				if ( ! geometry.isBufferGeometry ) {

					var geometryTemp = new BufferGeometry();
					geometryTemp.fromGeometry( geometry );
					geometry = geometryTemp;

				}

				if ( mesh.drawMode === TriangleFanDrawMode ) {

					console.warn( 'GLTFExporter: TriangleFanDrawMode and wireframe incompatible.' );
					mode = WEBGL_CONSTANTS.TRIANGLE_FAN;

				} else if ( mesh.drawMode === TriangleStripDrawMode ) {

					mode = mesh.material.wireframe ? WEBGL_CONSTANTS.LINE_STRIP : WEBGL_CONSTANTS.TRIANGLE_STRIP;

				} else {

					mode = mesh.material.wireframe ? WEBGL_CONSTANTS.LINES : WEBGL_CONSTANTS.TRIANGLES;

				}

			}

			var gltfMesh = {};

			var attributes = {};
			var primitives = [];
			var targets = [];

			// Conversion between attributes names in threejs and gltf spec
			var nameConversion = {

				uv: 'TEXCOORD_0',
				uv2: 'TEXCOORD_1',
				color: 'COLOR_0',
				skinWeight: 'WEIGHTS_0',
				skinIndex: 'JOINTS_0'

			};

			var originalNormal = geometry.getAttribute( 'normal' );

			if ( originalNormal !== undefined && ! isNormalizedNormalAttribute( originalNormal ) ) {

				console.warn( 'GLTFExporter: Creating normalized normal attribute from the non-normalized one.' );

				geometry.addAttribute( 'normal', createNormalizedNormalAttribute( originalNormal ) );

			}

			// @QUESTION Detect if .vertexColors = VertexColors?
			// For every attribute create an accessor
			for ( var attributeName in geometry.attributes ) {

				var attribute = geometry.attributes[ attributeName ];
				attributeName = nameConversion[ attributeName ] || attributeName.toUpperCase();

				// JOINTS_0 must be UNSIGNED_BYTE or UNSIGNED_SHORT.
				var array = attribute.array;
				if ( attributeName === 'JOINTS_0' &&
					! ( array instanceof Uint16Array ) &&
					! ( array instanceof Uint8Array ) ) {

					console.warn( 'GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.' );
					attribute = new BufferAttribute( new Uint16Array( array ), attribute.itemSize, attribute.normalized );

				}

				if ( attributeName.substr( 0, 5 ) !== 'MORPH' ) {

					var accessor = processAccessor( attribute, geometry );
					if ( accessor !== null ) {

						attributes[ attributeName ] = accessor;

					}

				}

			}

			if ( originalNormal !== undefined ) geometry.addAttribute( 'normal', originalNormal );

			// Skip if no exportable attributes found
			if ( Object.keys( attributes ).length === 0 ) {

				return null;

			}

			// Morph targets
			if ( mesh.morphTargetInfluences !== undefined && mesh.morphTargetInfluences.length > 0 ) {

				var weights = [];
				var targetNames = [];
				var reverseDictionary = {};

				if ( mesh.morphTargetDictionary !== undefined ) {

					for ( var key in mesh.morphTargetDictionary ) {

						reverseDictionary[ mesh.morphTargetDictionary[ key ] ] = key;

					}

				}

				for ( var i = 0; i < mesh.morphTargetInfluences.length; ++ i ) {

					var target = {};

					var warned = false;

					for ( var attributeName in geometry.morphAttributes ) {

						// glTF 2.0 morph supports only POSITION/NORMAL/TANGENT.
						// Three.js doesn't support TANGENT yet.

						if ( attributeName !== 'position' && attributeName !== 'normal' ) {

							if ( ! warned ) {

								console.warn( 'GLTFExporter: Only POSITION and NORMAL morph are supported.' );
								warned = true;

							}

							continue;

						}

						var attribute = geometry.morphAttributes[ attributeName ][ i ];

						// Three.js morph attribute has absolute values while the one of glTF has relative values.
						//
						// glTF 2.0 Specification:
						// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#morph-targets

						var baseAttribute = geometry.attributes[ attributeName ];
						// Clones attribute not to override
						var relativeAttribute = attribute.clone();

						for ( var j = 0, jl = attribute.count; j < jl; j ++ ) {

							relativeAttribute.setXYZ(
								j,
								attribute.getX( j ) - baseAttribute.getX( j ),
								attribute.getY( j ) - baseAttribute.getY( j ),
								attribute.getZ( j ) - baseAttribute.getZ( j )
							);

						}

						target[ attributeName.toUpperCase() ] = processAccessor( relativeAttribute, geometry );

					}

					targets.push( target );

					weights.push( mesh.morphTargetInfluences[ i ] );
					if ( mesh.morphTargetDictionary !== undefined ) targetNames.push( reverseDictionary[ i ] );

				}

				gltfMesh.weights = weights;

				if ( targetNames.length > 0 ) {

					gltfMesh.extras = {};
					gltfMesh.extras.targetNames = targetNames;

				}

			}

			var extras = ( Object.keys( geometry.userData ).length > 0 ) ? serializeUserData( geometry ) : undefined;

			var forceIndices = options.forceIndices;
			var isMultiMaterial = Array.isArray( mesh.material );

			if ( isMultiMaterial && geometry.groups.length === 0 ) return null;

			if ( ! forceIndices && geometry.index === null && isMultiMaterial ) {

				// temporal workaround.
				console.warn( 'GLTFExporter: Creating index for non-indexed multi-material mesh.' );
				forceIndices = true;

			}

			var didForceIndices = false;

			if ( geometry.index === null && forceIndices ) {

				var indices = [];

				for ( var i = 0, il = geometry.attributes.position.count; i < il; i ++ ) {

					indices[ i ] = i;

				}

				geometry.setIndex( indices );

				didForceIndices = true;

			}

			var materials = isMultiMaterial ? mesh.material : [ mesh.material ];
			var groups = isMultiMaterial ? geometry.groups : [ { materialIndex: 0, start: undefined, count: undefined } ];

			for ( var i = 0, il = groups.length; i < il; i ++ ) {

				var primitive = {
					mode: mode,
					attributes: attributes,
				};

				if ( extras ) primitive.extras = extras;

				if ( targets.length > 0 ) primitive.targets = targets;

				if ( geometry.index !== null ) {

					primitive.indices = processAccessor( geometry.index, geometry, groups[ i ].start, groups[ i ].count );

				}

				var material = processMaterial( materials[ groups[ i ].materialIndex ] );

				if ( material !== null ) {

					primitive.material = material;

				}

				primitives.push( primitive );

			}

			if ( didForceIndices ) {

				geometry.setIndex( null );

			}

			gltfMesh.primitives = primitives;

			if ( ! outputJSON.meshes ) {

				outputJSON.meshes = [];

			}

			outputJSON.meshes.push( gltfMesh );

			return outputJSON.meshes.length - 1;

		}
		function processCamera( camera ) {

			if ( ! outputJSON.cameras ) {

				outputJSON.cameras = [];

			}

			var isOrtho = camera.isOrthographicCamera;

			var gltfCamera = {

				type: isOrtho ? 'orthographic' : 'perspective'

			};

			if ( isOrtho ) {

				gltfCamera.orthographic = {

					xmag: camera.right * 2,
					ymag: camera.top * 2,
					zfar: camera.far <= 0 ? 0.001 : camera.far,
					znear: camera.near < 0 ? 0 : camera.near

				};

			} else {

				gltfCamera.perspective = {

					aspectRatio: camera.aspect,
					yfov: _Math.degToRad( camera.fov ) / camera.aspect,
					zfar: camera.far <= 0 ? 0.001 : camera.far,
					znear: camera.near < 0 ? 0 : camera.near

				};

			}

			if ( camera.name !== '' ) {

				gltfCamera.name = camera.type;

			}

			outputJSON.cameras.push( gltfCamera );

			return outputJSON.cameras.length - 1;

		}
		function processAnimation( clip, root ) {

			if ( ! outputJSON.animations ) {

				outputJSON.animations = [];

			}

			var channels = [];
			var samplers = [];

			for ( var i = 0; i < clip.tracks.length; ++ i ) {

				var track = clip.tracks[ i ];
				var trackBinding = PropertyBinding.parseTrackName( track.name );
				var trackNode = PropertyBinding.findNode( root, trackBinding.nodeName );
				var trackProperty = PATH_PROPERTIES[ trackBinding.propertyName ];

				if ( trackBinding.objectName === 'bones' ) {

					if ( trackNode.isSkinnedMesh === true ) {

						trackNode = trackNode.skeleton.getBoneByName( trackBinding.objectIndex );

					} else {

						trackNode = undefined;

					}

				}

				if ( ! trackNode || ! trackProperty ) {

					console.warn( 'GLTFExporter: Could not export animation track "%s".', track.name );
					return null;

				}

				var inputItemSize = 1;
				var outputItemSize = track.values.length / track.times.length;

				if ( trackProperty === PATH_PROPERTIES.morphTargetInfluences ) {

					if ( trackNode.morphTargetInfluences.length !== 1 &&
						trackBinding.propertyIndex !== undefined ) {

						console.warn( 'GLTFExporter: Skipping animation track "%s". ' +
							'Morph target keyframe tracks must target all available morph targets ' +
							'for the given mesh.', track.name );
						continue;

					}

					outputItemSize /= trackNode.morphTargetInfluences.length;

				}

				var interpolation;

				// @TODO export CubicInterpolant(InterpolateSmooth) as CUBICSPLINE

				// Detecting glTF cubic spline interpolant by checking factory method's special property
				// GLTFCubicSplineInterpolant is a custom interpolant and track doesn't return
				// valid value from .getInterpolation().
				if ( track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === true ) {

					interpolation = 'CUBICSPLINE';

					// itemSize of CUBICSPLINE keyframe is 9
					// (VEC3 * 3: inTangent, splineVertex, and outTangent)
					// but needs to be stored as VEC3 so dividing by 3 here.
					outputItemSize /= 3;

				} else if ( track.getInterpolation() === InterpolateDiscrete ) {

					interpolation = 'STEP';

				} else {

					interpolation = 'LINEAR';

				}

				samplers.push( {

					input: processAccessor( new BufferAttribute( track.times, inputItemSize ) ),
					output: processAccessor( new BufferAttribute( track.values, outputItemSize ) ),
					interpolation: interpolation

				} );

				channels.push( {

					sampler: samplers.length - 1,
					target: {
						node: nodeMap.get( trackNode ),
						path: trackProperty
					}

				} );

			}

			outputJSON.animations.push( {

				name: clip.name || 'clip_' + outputJSON.animations.length,
				samplers: samplers,
				channels: channels

			} );

			return outputJSON.animations.length - 1;

		}

		function processSkin( object ) {

			var node = outputJSON.nodes[ nodeMap.get( object ) ];

			var skeleton = object.skeleton;
			var rootJoint = object.skeleton.bones[ 0 ];

			if ( rootJoint === undefined ) return null;

			var joints = [];
			var inverseBindMatrices = new Float32Array( skeleton.bones.length * 16 );

			for ( var i = 0; i < skeleton.bones.length; ++ i ) {

				joints.push( nodeMap.get( skeleton.bones[ i ] ) );

				skeleton.boneInverses[ i ].toArray( inverseBindMatrices, i * 16 );

			}

			if ( outputJSON.skins === undefined ) {

				outputJSON.skins = [];

			}

			outputJSON.skins.push( {

				inverseBindMatrices: processAccessor( new BufferAttribute( inverseBindMatrices, 16 ) ),
				joints: joints,
				skeleton: nodeMap.get( rootJoint )

			} );

			var skinIndex = node.skin = outputJSON.skins.length - 1;

			return skinIndex;

		}
		function processNode( object ) {

			if ( object.isLight ) {

				console.warn( 'GLTFExporter: Unsupported node type:', object.constructor.name );
				return null;

			}

			if ( ! outputJSON.nodes ) {

				outputJSON.nodes = [];

			}

			var gltfNode = {};

			if ( options.trs ) {

				var rotation = object.quaternion.toArray();
				var position = object.position.toArray();
				var scale = object.scale.toArray();

				if ( ! equalArray( rotation, [ 0, 0, 0, 1 ] ) ) {

					gltfNode.rotation = rotation;

				}

				if ( ! equalArray( position, [ 0, 0, 0 ] ) ) {

					gltfNode.translation = position;

				}

				if ( ! equalArray( scale, [ 1, 1, 1 ] ) ) {

					gltfNode.scale = scale;

				}

			} else {

				object.updateMatrix();
				if ( ! equalArray( object.matrix.elements, [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ] ) ) {

					gltfNode.matrix = object.matrix.elements;

				}

			}

			// We don't export empty strings name because it represents no-name in Three.js.
			if ( object.name !== '' ) {

				gltfNode.name = String( object.name );

			}

			if ( object.userData && Object.keys( object.userData ).length > 0 ) {

				gltfNode.extras = serializeUserData( object );

			}

			if ( object.isMesh || object.isLine || object.isPoints ) {

				var mesh = processMesh( object );

				if ( mesh !== null ) {

					gltfNode.mesh = mesh;

				}

			} else if ( object.isCamera ) {

				gltfNode.camera = processCamera( object );

			}

			if ( object.isSkinnedMesh ) {

				skins.push( object );

			}

			if ( object.children.length > 0 ) {

				var children = [];

				for ( var i = 0, l = object.children.length; i < l; i ++ ) {

					var child = object.children[ i ];

					if ( child.visible || options.onlyVisible === false ) {

						var node = processNode( child );

						if ( node !== null ) {

							children.push( node );

						}

					}

				}

				if ( children.length > 0 ) {

					gltfNode.children = children;

				}
			}

			outputJSON.nodes.push( gltfNode );

			var nodeIndex = outputJSON.nodes.length - 1;
			nodeMap.set( object, nodeIndex );

			return nodeIndex;

		}
		function processScene( scene ) {

			if ( ! outputJSON.scenes ) {

				outputJSON.scenes = [];
				outputJSON.scene = 0;

			}

			var gltfScene = {

				nodes: []

			};

			if ( scene.name !== '' ) {

				gltfScene.name = scene.name;

			}

			if ( scene.userData && Object.keys( scene.userData ).length > 0 ) {

				gltfScene.extras = serializeUserData( scene );

			}

			outputJSON.scenes.push( gltfScene );

			var nodes = [];

			for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

				var child = scene.children[ i ];

				if ( child.visible || options.onlyVisible === false ) {

					var node = processNode( child );

					if ( node !== null ) {

						nodes.push( node );

					}

				}

			}

			if ( nodes.length > 0 ) {

				gltfScene.nodes = nodes;

			}

		}
		function processObjects( objects ) {

			var scene = new Scene();
			scene.name = 'AuxScene';

			for ( var i = 0; i < objects.length; i ++ ) {

				// We push directly to children instead of calling `add` to prevent
				// modify the .parent and break its original scene and hierarchy
				scene.children.push( objects[ i ] );

			}

			processScene( scene );

		}

		function processInput( input ) {

			input = input instanceof Array ? input : [ input ];

			var objectsWithoutScene = [];

			for ( var i = 0; i < input.length; i ++ ) {

				if ( input[ i ] instanceof Scene ) {

					processScene( input[ i ] );

				} else {

					objectsWithoutScene.push( input[ i ] );

				}

			}

			if ( objectsWithoutScene.length > 0 ) {

				processObjects( objectsWithoutScene );

			}

			for ( var i = 0; i < skins.length; ++ i ) {

				processSkin( skins[ i ] );

			}

			for ( var i = 0; i < options.animations.length; ++ i ) {

				processAnimation( options.animations[ i ], input[ 0 ] );

			}

		}

		processInput( input );

		Promise.all( pending ).then( function () {

			// Merge buffers.
			var blob = new Blob( buffers, { type: 'application/octet-stream' } );

			// Declare extensions.
			var extensionsUsedList = Object.keys( extensionsUsed );
			if ( extensionsUsedList.length > 0 ) outputJSON.extensionsUsed = extensionsUsedList;

			if ( outputJSON.buffers && outputJSON.buffers.length > 0 ) {

				// Update bytelength of the single buffer.
				outputJSON.buffers[ 0 ].byteLength = blob.size;

				var reader = new window.FileReader();

				if ( options.binary === true ) {

					// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#glb-file-format-specification

					var GLB_HEADER_BYTES = 12;
					var GLB_HEADER_MAGIC = 0x46546C67;
					var GLB_VERSION = 2;

					var GLB_CHUNK_PREFIX_BYTES = 8;
					var GLB_CHUNK_TYPE_JSON = 0x4E4F534A;
					var GLB_CHUNK_TYPE_BIN = 0x004E4942;

					reader.readAsArrayBuffer( blob );
					reader.onloadend = function () {

						// Binary chunk.
						var binaryChunk = getPaddedArrayBuffer( reader.result );
						var binaryChunkPrefix = new DataView( new ArrayBuffer( GLB_CHUNK_PREFIX_BYTES ) );
						binaryChunkPrefix.setUint32( 0, binaryChunk.byteLength, true );
						binaryChunkPrefix.setUint32( 4, GLB_CHUNK_TYPE_BIN, true );

						// JSON chunk.
						var jsonChunk = getPaddedArrayBuffer( stringToArrayBuffer( JSON.stringify( outputJSON ) ), 0x20 );
						var jsonChunkPrefix = new DataView( new ArrayBuffer( GLB_CHUNK_PREFIX_BYTES ) );
						jsonChunkPrefix.setUint32( 0, jsonChunk.byteLength, true );
						jsonChunkPrefix.setUint32( 4, GLB_CHUNK_TYPE_JSON, true );

						// GLB header.
						var header = new ArrayBuffer( GLB_HEADER_BYTES );
						var headerView = new DataView( header );
						headerView.setUint32( 0, GLB_HEADER_MAGIC, true );
						headerView.setUint32( 4, GLB_VERSION, true );
						var totalByteLength = GLB_HEADER_BYTES
							+ jsonChunkPrefix.byteLength + jsonChunk.byteLength
							+ binaryChunkPrefix.byteLength + binaryChunk.byteLength;
						headerView.setUint32( 8, totalByteLength, true );

						var glbBlob = new Blob( [
							header,
							jsonChunkPrefix,
							jsonChunk,
							binaryChunkPrefix,
							binaryChunk
						], { type: 'application/octet-stream' } );

						var glbReader = new window.FileReader();
						glbReader.readAsArrayBuffer( glbBlob );
						glbReader.onloadend = function () {

							onDone( glbReader.result );

						};

					};

				} else {

					reader.readAsDataURL( blob );
					reader.onloadend = function () {

						var base64data = reader.result;
						outputJSON.buffers[ 0 ].uri = base64data;
						onDone( outputJSON );

					};

				}

			} else {

				onDone( outputJSON );

			}

		} );

	}

};

export { GLTFExporter }
