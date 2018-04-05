import { BufferGeometry } from '../core/BufferGeometry.js'
import { BufferAttribute } from '../core/BufferAttribute.js'
import { Scene } from '../scenes/Scene.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { MeshStandardMaterial } from '../materials/MeshStandardMaterial.js'
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js'
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js'
import { PointsMaterial } from '../materials/PointsMaterial.js'
import { LineSegments } from '../objects/LineSegments.js'
import { LineLoop } from '../objects/LineLoop.js'
import { Line } from '../objects/Line.js'
import { Points } from '../objects/Points.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { Light } from '../lights/Light.js'
import { Mesh } from '../objects/Mesh.js'
import { Camera } from '../cameras/Camera.js'
import { SkinnedMesh } from '../objects/SkinnedMesh.js'
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
			trs: false,
			onlyVisible: true,
			truncateDrawRange: true,
			embedImages: true,
			animations: []
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
		var dataViews = [];
		var nodeMap = {};
		var skins = [];
		var cachedData = {

			images: {},
			materials: {}

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

			var buffer = new ArrayBuffer( text.length );

			var bufferView = new Uint8Array( buffer );

			for ( var i = 0; i < text.length; ++ i ) {

				bufferView[ i ] = text.charCodeAt( i );

			}

			return buffer;

		}

		
		function getMinMax( attribute ) {

			var output = {

				min: new Array( attribute.itemSize ).fill( Number.POSITIVE_INFINITY ),
				max: new Array( attribute.itemSize ).fill( Number.NEGATIVE_INFINITY )

			};

			for ( var i = 0; i < attribute.count; i ++ ) {

				for ( var a = 0; a < attribute.itemSize; a ++ ) {

					var value = attribute.array[ i * attribute.itemSize + a ];
					output.min[ a ] = Math.min( output.min[ a ], value );
					output.max[ a ] = Math.max( output.max[ a ], value );

				}

			}

			return output;

		}

		
		function getPaddedBufferSize( bufferSize ) {

			return Math.ceil( bufferSize / 4 ) * 4;

		}
		
		
		function processBuffer( attribute, componentType, start, count ) {

			if ( ! outputJSON.buffers ) {

				outputJSON.buffers = [

					{

						byteLength: 0,
						uri: ''

					}

				];

			}

			var offset = 0;
			var componentSize = componentType === WEBGL_CONSTANTS.UNSIGNED_SHORT ? 2 : 4;

			// Create a new dataview and dump the attribute's array into it
			var byteLength = count * attribute.itemSize * componentSize;
			
			// adjust required size of array buffer with padding 
			// to satisfy gltf requirement that the length is divisible by 4
			byteLength = getPaddedBufferSize( byteLength );

			var dataView = new DataView( new ArrayBuffer( byteLength ) );

			for ( var i = start; i < start + count; i ++ ) {

				for ( var a = 0; a < attribute.itemSize; a ++ ) {

					var value = attribute.array[ i * attribute.itemSize + a ];

					if ( componentType === WEBGL_CONSTANTS.FLOAT ) {

						dataView.setFloat32( offset, value, true );

					} else if ( componentType === WEBGL_CONSTANTS.UNSIGNED_INT ) {

						dataView.setUint32( offset, value, true );

					} else if ( componentType === WEBGL_CONSTANTS.UNSIGNED_SHORT ) {

						dataView.setUint16( offset, value, true );

					}

					offset += componentSize;

				}

			}

			// We just use one buffer
			dataViews.push( dataView );

			// Always using just one buffer
			return 0;

		}

		
		function processBufferView( data, componentType, start, count, target ) {

			if ( ! outputJSON.bufferViews ) {

				outputJSON.bufferViews = [];

			}

			var componentSize = componentType === WEBGL_CONSTANTS.UNSIGNED_SHORT ? 2 : 4;

			// Create a new dataview and dump the attribute's array into it
			var byteLength = count * data.itemSize * componentSize;

			var gltfBufferView = {

				buffer: processBuffer( data, componentType, start, count ),
				byteOffset: byteOffset,
				byteLength: byteLength

			};

			if ( target !== undefined ) gltfBufferView.target = target;

			if ( target === WEBGL_CONSTANTS.ARRAY_BUFFER ) {

				// Only define byteStride for vertex attributes.
				gltfBufferView.byteStride = data.itemSize * componentSize;

			}

			byteOffset += byteLength;

			outputJSON.bufferViews.push( gltfBufferView );

			// @TODO Ideally we'll have just two bufferviews: 0 is for vertex attributes, 1 for indices
			var output = {

				id: outputJSON.bufferViews.length - 1,
				byteLength: 0

			};

			return output;

		}

		
		function processAccessor( attribute, geometry ) {

			if ( ! outputJSON.accessors ) {

				outputJSON.accessors = [];

			}

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

			} else {

				throw new Error( 'GLTFExporter: Unsupported bufferAttribute component type.' );

			}

			var minMax = getMinMax( attribute );

			var start = 0;
			var count = attribute.count;

			// @TODO Indexed buffer geometry with drawRange not supported yet
			if ( options.truncateDrawRange && geometry !== undefined && geometry.index === null ) {

				start = geometry.drawRange.start;
				count = geometry.drawRange.count !== Infinity ? geometry.drawRange.count : attribute.count;

			}

			var bufferViewTarget;

			// If geometry isn't provided, don't infer the target usage of the bufferView. For
			// animation samplers, target must not be set.
			if ( geometry !== undefined ) {

				var isVertexAttributes = componentType === WEBGL_CONSTANTS.FLOAT;
				bufferViewTarget = isVertexAttributes ? WEBGL_CONSTANTS.ARRAY_BUFFER : WEBGL_CONSTANTS.ELEMENT_ARRAY_BUFFER;

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

			outputJSON.accessors.push( gltfAccessor );

			return outputJSON.accessors.length - 1;

		}

		
		function processImage( map ) {

			if ( cachedData.images[ map.uuid ] !== undefined ) {

				return cachedData.images[ map.uuid ];

			}

			if ( ! outputJSON.images ) {

				outputJSON.images = [];

			}

			var mimeType = map.format === RGBAFormat ? 'image/png' : 'image/jpeg';
			var gltfImage = {mimeType: mimeType};

			if ( options.embedImages ) {

				var canvas = cachedCanvas = cachedCanvas || document.createElement( 'canvas' );
				canvas.width = map.image.width;
				canvas.height = map.image.height;
				var ctx = canvas.getContext( '2d' );

				if ( map.flipY === true ) {

					ctx.translate( 0, map.image.height );
					ctx.scale( 1, -1 );

				}

				ctx.drawImage( map.image, 0, 0 );

				// @TODO Embed in { bufferView } if options.binary set.

				gltfImage.uri = canvas.toDataURL( mimeType );

			} else {

				gltfImage.uri = map.image.src;

			}

			outputJSON.images.push( gltfImage );

			var index = outputJSON.images.length - 1;
			cachedData.images[ map.uuid ] = index;

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

			if ( ! outputJSON.textures ) {

				outputJSON.textures = [];

			}

			var gltfTexture = {

				sampler: processSampler( map ),
				source: processImage( map )

			};

			outputJSON.textures.push( gltfTexture );

			return outputJSON.textures.length - 1;

		}

		
		function processMaterial( material ) {

			if ( cachedData.materials[ material.uuid ] !== undefined ) {

				return cachedData.materials[ material.uuid ];

			}

			if ( ! outputJSON.materials ) {

				outputJSON.materials = [];

			}

			if ( material instanceof ShaderMaterial ) {

				console.warn( 'GLTFExporter: ShaderMaterial not supported.' );
				return null;

			}


			if ( ! ( material instanceof MeshStandardMaterial ) ) {

				console.warn( 'GLTFExporter: Currently just StandardMaterial is supported. Material conversion may lose information.' );

			}

			// @QUESTION Should we avoid including any attribute that has the default value?
			var gltfMaterial = {

				pbrMetallicRoughness: {}

			};

			// pbrMetallicRoughness.baseColorFactor
			var color = material.color.toArray().concat( [ material.opacity ] );

			if ( ! equalArray( color, [ 1, 1, 1, 1 ] ) ) {

				gltfMaterial.pbrMetallicRoughness.baseColorFactor = color;

			}

			if ( material instanceof MeshStandardMaterial ) {

				gltfMaterial.pbrMetallicRoughness.metallicFactor = material.metalness;
				gltfMaterial.pbrMetallicRoughness.roughnessFactor = material.roughness;

			} else {

				gltfMaterial.pbrMetallicRoughness.metallicFactor = 0.5;
				gltfMaterial.pbrMetallicRoughness.roughnessFactor = 0.5;

			}

			// pbrMetallicRoughness.baseColorTexture
			if ( material.map ) {

				gltfMaterial.pbrMetallicRoughness.baseColorTexture = {

					index: processTexture( material.map )

				};

			}

			if ( material instanceof MeshBasicMaterial ||
				material instanceof LineBasicMaterial ||
				material instanceof PointsMaterial ) {

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

			if ( material.name ) {

				gltfMaterial.name = material.name;

			}

			outputJSON.materials.push( gltfMaterial );

			var index = outputJSON.materials.length - 1;
			cachedData.materials[ material.uuid ] = index;

			return index;

		}

		
		function processMesh( mesh ) {

			if ( ! outputJSON.meshes ) {

				outputJSON.meshes = [];

			}

			var geometry = mesh.geometry;

			var mode;

			// Use the correct mode
			if ( mesh instanceof LineSegments ) {

				mode = WEBGL_CONSTANTS.LINES;

			} else if ( mesh instanceof LineLoop ) {

				mode = WEBGL_CONSTANTS.LINE_LOOP;

			} else if ( mesh instanceof Line ) {

				mode = WEBGL_CONSTANTS.LINE_STRIP;

			} else if ( mesh instanceof Points ) {

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

			var gltfMesh = {
				primitives: [
					{
						mode: mode,
						attributes: {},
					}
				]
			};

			var material = processMaterial( mesh.material );
			if ( material !== null ) {

				gltfMesh.primitives[ 0 ].material = material;

			}


			if ( geometry.index ) {

				gltfMesh.primitives[ 0 ].indices = processAccessor( geometry.index, geometry );

			}

			// We've just one primitive per mesh
			var gltfAttributes = gltfMesh.primitives[ 0 ].attributes;

			// Conversion between attributes names in threejs and gltf spec
			var nameConversion = {

				uv: 'TEXCOORD_0',
				uv2: 'TEXCOORD_1',
				color: 'COLOR_0',
				skinWeight: 'WEIGHTS_0',
				skinIndex: 'JOINTS_0'

			};

			// @QUESTION Detect if .vertexColors = VertexColors?
			// For every attribute create an accessor
			for ( var attributeName in geometry.attributes ) {

				var attribute = geometry.attributes[ attributeName ];
				attributeName = nameConversion[ attributeName ] || attributeName.toUpperCase();

				if ( attributeName.substr( 0, 5 ) !== 'MORPH' ) {

					gltfAttributes[ attributeName ] = processAccessor( attribute, geometry );

				}

			}

			// Morph targets
			if ( mesh.morphTargetInfluences !== undefined && mesh.morphTargetInfluences.length > 0 ) {

				var weights = [];
				gltfMesh.primitives[ 0 ].targets = [];

				for ( var i = 0; i < mesh.morphTargetInfluences.length; ++ i ) {

					var target = {};

					for ( var attributeName in geometry.morphAttributes ) {

						var attribute = geometry.morphAttributes[ attributeName ][ i ];
						attributeName = nameConversion[ attributeName ] || attributeName.toUpperCase();
						target[ attributeName ] = processAccessor( attribute, geometry );

					}

					gltfMesh.primitives[ 0 ].targets.push( target );

					weights.push( mesh.morphTargetInfluences[ i ] );

				}

				gltfMesh.weights = weights;

			}

			outputJSON.meshes.push( gltfMesh );

			return outputJSON.meshes.length - 1;

		}

		
		function processCamera( camera ) {

			if ( ! outputJSON.cameras ) {

				outputJSON.cameras = [];

			}

			var isOrtho = camera instanceof OrthographicCamera;

			var gltfCamera = {

				type: isOrtho ? 'orthographic' : 'perspective'

			};

			if ( isOrtho ) {

				gltfCamera.orthographic = {

					xmag: camera.right * 2,
					ymag: camera.top * 2,
					zfar: camera.far,
					znear: camera.near

				};

			} else {

				gltfCamera.perspective = {

					aspectRatio: camera.aspect,
					yfov: _Math.degToRad( camera.fov ) / camera.aspect,
					zfar: camera.far,
					znear: camera.near

				};

			}

			if ( camera.name ) {

				gltfCamera.name = camera.type;

			}

			outputJSON.cameras.push( gltfCamera );

			return outputJSON.cameras.length - 1;

		}

		
		function processAnimation ( clip, root ) {

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

					outputItemSize /= trackNode.morphTargetInfluences.length;

				}

				samplers.push( {

					input: processAccessor( new BufferAttribute( track.times, inputItemSize ) ),
					output: processAccessor( new BufferAttribute( track.values, outputItemSize ) ),
					interpolation: track.getInterpolation() === InterpolateDiscrete ? 'STEP' : 'LINEAR'

				} );

				channels.push( {

					sampler: samplers.length - 1,
					target: {
						node: nodeMap[ trackNode.uuid ],
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

			var node = outputJSON.nodes[ nodeMap[ object.uuid ] ];

			var skeleton = object.skeleton;
			var rootJoint = object.skeleton.bones[ 0 ];

			if ( rootJoint === undefined ) return null;

			var joints = [];
			var inverseBindMatrices = new Float32Array( skeleton.bones.length * 16 );

			for ( var i = 0; i < skeleton.bones.length; ++ i ) {

				joints.push( nodeMap[ skeleton.bones[ i ].uuid ] );

				skeleton.boneInverses[ i ].toArray( inverseBindMatrices, i * 16 );

			}

			if ( outputJSON.skins === undefined ) {

				outputJSON.skins = [];

			}

			outputJSON.skins.push( {

				inverseBindMatrices: processAccessor( new BufferAttribute( inverseBindMatrices, 16 ) ),
				joints: joints,
				skeleton: nodeMap[ rootJoint.uuid ]

			} );

			var skinIndex = node.skin = outputJSON.skins.length - 1;

			return skinIndex;

		}

		
		function processNode( object ) {

			if ( object instanceof Light ) {

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

			if ( object.name ) {

				gltfNode.name = String( object.name );

			}

			if ( object.userData && Object.keys( object.userData ).length > 0 ) {

				try {

					gltfNode.extras = JSON.parse( JSON.stringify( object.userData ) );

				} catch ( e ) {

					throw new Error( 'GLTFExporter: userData can\'t be serialized' );

				}

			}

			if ( object instanceof Mesh ||
				object instanceof Line ||
				object instanceof Points ) {

				gltfNode.mesh = processMesh( object );

			} else if ( object instanceof Camera ) {

				gltfNode.camera = processCamera( object );

			}

			if ( object instanceof SkinnedMesh ) {

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

			var nodeIndex = nodeMap[ object.uuid ] = outputJSON.nodes.length - 1;

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

			if ( scene.name ) {

				gltfScene.name = scene.name;

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

		// Generate buffer
		// Create a new blob with all the dataviews from the buffers
		var blob = new Blob( dataViews, { type: 'application/octet-stream' } );

		// Update the bytlength of the only main buffer and update the uri with the base64 representation of it
		if ( outputJSON.buffers && outputJSON.buffers.length > 0 ) {

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
					var binaryChunk = reader.result;
					var binaryChunkPrefix = new DataView( new ArrayBuffer( GLB_CHUNK_PREFIX_BYTES ) );
					binaryChunkPrefix.setUint32( 0, binaryChunk.byteLength, true );
					binaryChunkPrefix.setUint32( 4, GLB_CHUNK_TYPE_BIN, true );

					// JSON chunk.
					delete outputJSON.buffers[ 0 ].uri; // Omitted URI indicates use of binary chunk.
					var jsonChunk = stringToArrayBuffer( JSON.stringify( outputJSON ) );
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

	}

};

export { GLTFExporter }
