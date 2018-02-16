/**
 * @file The main configuration file for es6-convertor
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

const path = require( 'path' )

module.exports = {
	inputs: [
		path.join( __dirname, '..', 'node_modules', 'three', 'examples' ),
		path.join( __dirname, '..', 'node_modules', 'three', 'src' )
	],
	excludes: [
		'build',
		'Three.js',
		'Three.Legacy.js',
		'polyfills.js',
		'libs',
		'Curves.js',						// Ignore intermediary exporter files
		'Geometries.js',					// Ignore intermediary exporter files
		'Materials.js',						// Ignore intermediary exporter files

		'RaytracingWorker.js',
		'ctm',                              // Todo: Need to check worker import
		'draco',                            // draco_decoder use Eval !
		'sea3d',                            // Duplicate export 'SEA3D'
		'crossfade',                        // Scene has already been declared
		'Cloth.js',							// Use global variable from example html ! Need to be refactored
		'ParametricGeometries.js',          // Bug TorusKnotCurve from es6-exports
		'RollerCoaster.js',                 // invalid default exports with file name from es6-exports
		'OceanShaders.js',                  // Todo: check how to extends imported lib properly
		'RectAreaLightUniformsLib.js',      //
		'Volume.js',                        // damned eval
		'NRRDLoader.js',                    // Import Volume.js
		'XLoader.js'                     	// amd module
	],
	output: path.join( __dirname, '..', 'sources' ),
	edgeCases: {
		'3MFLoader': {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		AdaptiveToneMappingPass: {
			imports: [
				'CopyShader',
				'LuminosityShader',
				'ToneMapShader',
				'UniformsUtils'
			]
		},
		AMFLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		AnimationClipCreator: {
			outputOverride: 'animation/AnimationClipCreator.js'
		},
		AssimpJSONLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'Loader'
			]
		},
		AssimpLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'Loader'
			]
		},
		AWDLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		BabylonLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		BinaryLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		BloomPass: {
			imports: [
				'CopyShader',
				'ConvolutionShader',
				'UniformsUtils'
			]
		},
		BokehPass: {
			imports: [
				'BokehShader',
				'UniformsUtils'
			]
		},
		BufferGeometryUtils: {
			outputOverride: 'utils/BufferGeometryUtils.js'
		},
		BufferSubdivisionModifier: {
			imports: [ 'Face3' ]
		},
		BVHLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		Car: {
            imports: [
                '_Math'
            ],
			outputOverride: 'objects/Car.js'
		},
		CinematicCamera: {
			imports: [
				'BokehShader',
				'UniformsUtils'
			]
		},
		ColladaLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'Loader',
				'_Math'
			]
		},
		ColorConverter: {
			imports: [ '_Math' ]
		},
		ColorNode: {
			imports: [ 'NodeMaterial' ]
		},
		ConvexObjectBreaker: {
			outputOverride: 'modifiers/ConvexObjectBreaker.js'
		},
		CubeTexturePass: {
			imports: [ 'ShaderLib' ]
		},
		Curve: {
			outputOverride: 'curves/Curve.js'
		},
		CurveExtras: {
			replacements: [
				[ 'Curves.GrannyKnot = GrannyKnot;', '' ],
				[ 'Curves.HeartCurve = HeartCurve;', '' ],
				[ 'Curves.VivianiCurve = VivianiCurve;', '' ],
				[ 'Curves.KnotCurve = KnotCurve;', '' ],
				[ 'Curves.HelixCurve = HelixCurve;', '' ],
				[ 'Curves.TrefoilKnot = TrefoilKnot;', '' ],
				[ 'Curves.TorusKnot = TorusKnot;', '' ],
				[ 'Curves.CinquefoilKnot = CinquefoilKnot;', '' ],
				[ 'Curves.TrefoilPolynomialKnot = TrefoilPolynomialKnot;', '' ],
				[ 'Curves.FigureEightPolynomialKnot = FigureEightPolynomialKnot;', '' ],
				[ 'Curves.DecoratedTorusKnot4a = DecoratedTorusKnot4a;', '' ],
				[ 'Curves.DecoratedTorusKnot4b = DecoratedTorusKnot4b;', '' ],
				[ 'Curves.DecoratedTorusKnot5a = DecoratedTorusKnot5a;', '' ],
				[ 'Curves.DecoratedTorusKnot5c = DecoratedTorusKnot5c;', '' ]
			],
			outputOverride: 'curves/CurveExtras.js'
		},
		Detector: {
			outputOverride: 'helpers/Detector.js'
		},
        DeviceOrientationControls: {
            imports: [
                '_Math'
            ]
        },
        DotScreenPass: {
            imports: [
                'DotScreenShader',
                'UniformsUtils'
            ]
        },
		EffectComposer: {
			imports: [ 'CopyShader' ]
		},
		EXRLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		FBXLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'_Math'
			]
		},
		FilmPass: {
			imports: [
				'FilmShader',
				'UniformsUtils'
			]
		},
        FirstPersonControls: {
			imports: [
				'_Math'
			]
		},
        FunctionNode_Implementation: {
            importsOverride: [
                ['FunctionNode', 'from', './FunctionNode_Declaration'],
                'NodeLib'
            ]
        },
		GCodeLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		GlitchPass: {
			imports: [
				'DigitalGlitch',
				'UniformsUtils',
				'_Math'
			]
		},
		GLNode: {
			imports: [ '_Math' ],
			replacements: [
				[ 'this.uuid = Math.generateUUID();', 'this.uuid = _Math.generateUUID();' ]
			]
		},
		GLTFExporter: {
            imports: [
                '_Math'
            ]
		},
		GLTFLoader: {
			imports: [
				'DefaultLoadingManager',
				'MeshPhongMaterial',
				'MeshLambertMaterial',
				'MeshBasicMaterial',
				'ShaderLib',
				'UniformsUtils',
				'LoaderUtils',
				'AnimationUtils',
				'_Math',
				'Matrix3',
				'Vector3',
				'Vector4',
				'Texture',
				'Material',
				'NumberKeyframeTrack',
				'QuaternionKeyframeTrack',
				'VectorKeyframeTrack'
			],
			replacements: [
				['GLTFLoader = (', 'var GLTFLoader = (']
			],
            exportsOverride: [
            	'GLTFLoader'
			]
		},
		GPUComputationRenderer: {
			outputOverride: 'renderers/GPUComputationRenderer.js'
		},
		GPUParticleSystem: {
            imports: [ '_Math' ],
			outputOverride: 'objects/GPUParticleSystem.js'
		},
		Gyroscope: {
			outputOverride: 'objects/Gyroscope.js'
		},
		HDRCubeTextureLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		ImprovedNoise: {
			outputOverride: 'misc/ImprovedNoise.js'
		},
		KMZLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		LegacyGLTFLoader: {
			imports: [
				'DefaultLoadingManager',
				'Loader',
				'Matrix3',
				'Vector2',
				'Vector3',
				'Vector4',
				'UniformsUtils',
				'MeshBasicMaterial',
				'MeshLambertMaterial',
				'QuaternionKeyframeTrack',
				'VectorKeyframeTrack',
				'AnimationUtils',
				'LoaderUtils',
				'_Math'
			]
		},
		LoaderSupport: {
			imports: [ 'DefaultLoadingManager' ],
			replacements: [
				[ 'if ( var LoaderSupport === undefined ) { var LoaderSupport = {} }', 'var LoaderSupport = {}' ]
			]
		},
		Lut: {
			replacements: [
				[ 'ColorMapKeywords = ', 'var ColorMapKeywords = ' ]
			]
		},
		MarchingCubes: {
			replacements: [
				[ 'edgeTable = new Int32Array', 'var edgeTable = new Int32Array' ],
				[ 'triTable = new Int32Array', 'var triTable = new Int32Array' ]
			],
			outputOverride: 'objects/MarchingCubes.js'
		},
		MD2Loader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		MD2Character: {
			outputOverride: 'objects/MD2Character.js'
		},
		MD2CharacterComplex: {
            imports: [
                '_Math'
            ],
			outputOverride: 'objects/MD2CharacterComplex.js'
		},
		MMDExporter: {
            imports: [
                '_Math'
            ]
		},
		MMDLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'_Math'
			]
		},
		MorphAnimMesh: {
			outputOverride: 'objects/MorphAnimMesh.js'
		},
		MorphBlendMesh: {
            imports: [
                '_Math'
            ],
			outputOverride: 'objects/MorphBlendMesh.js'
		},
		MTLLoader: {
			imports: [
				'DefaultLoadingManager',
				'Loader'
			]
		},
        NodeLib_Implementation: {
            importsOverride: [
                [ 'NodeLib', 'from', './NodeLib_Declaration' ],
                'UVNode',
                'PositionNode',
                'NormalNode',
                'TimerNode',
                'ConstNode',
                'FunctionNode'
            ]
        },
		NodeMaterial: {
			imports: [ 'NodeLib' ]
		},
		NURBSCurve: {
			imports: [ 'NURBSUtils' ]
		},
		NURBSSurface: {
			imports: [ 'NURBSUtils' ]
		},
		OBJLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		OBJLoader2: {
			replacements: [
				[ 'if ( var OBJLoader2 === undefined ) { var OBJLoader2 = {} }', '' ]
			]
		},
		Ocean: {
			imports: [
				'ShaderLib',
				'UniformsUtils'
			],
			outputOverride: 'objects/Ocean.js'
		},
		OceanShaders: {
			imports: [ 'ShaderLib' ]
		},
		Octree: {
			imports: [
				'Raycaster',
				'_Math'
			],
			replacements: [
				[ 'instanceof var OctreeNode', 'instanceof OctreeNode' ]
			],
			outputOverride: 'utils/Octree.js'
		},
		OutlineEffect: {
			imports: [ 'ShaderLib' ]
		},
		OutlinePass: {
			imports: [
				'CopyShader',
				'UniformsUtils'
			]
		},
		PDBLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		PlayCanvasLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		PRNG: {
			outputOverride: 'utils/PRNG.js'
		},
		PRWMLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		ParametricGeometries: {
			exports: [ 'ParametricGeometries' ]
		},
		PCDLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		PhongNode: {
			imports: [
				'UniformsUtils',
				'UniformsLib'
			]
		},
		PLYLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		PVRLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		QuickHull: {
			outputOverride: 'utils/QuickHull.js'
		},
		Refractor: {
            imports: [
                'UniformsUtils',
                '_Math'
            ]
		},
		Reflector: {
			imports: [
				'UniformsUtils',
				'_Math'
			]
		},
		RGBELoader: {
			imports: [ 'DefaultLoadingManager' ],
			replacements: [
				[ 'var HDRLoader = RGBELoader', 'var RGBELoader' ],
				[ /(return null;[\s\n\r]+};)/g, '$1\nvar HDRLoader = RGBELoader;\n\n' ],
			]

		},
		SAOPass: {
			imports: [
				'SAOShader',
				'DepthLimitedBlurShader',
				'CopyShader',
				'UnpackDepthRGBAShader',
				'BlurShaderUtils',
				'UniformsUtils'
			]
		},
		SSAOPass: {
			imports: [
				'SSAOShader'
			]
		},
		SavePass: {
			imports: [
				'CopyShader',
				'UniformsUtils'
			]
		},
		ScreenNode: {
			imports: [ 'InputNode' ]
		},
		ShaderGodRays: {
			outputOverride: 'shaders/ShaderGodRays.js'
		},
		ShaderPass: {
			imports: [ 'UniformsUtils' ]
		},
		ShaderSkin: {
			imports: [
				'UniformsUtils',
				'UniformsLib',
				'ShaderChunk'
			],
			outputOverride: 'shaders/ShaderSkin.js'
		},
		ShaderTerrain: {
			imports: [
				'UniformsUtils',
				'UniformsLib',
				'ShaderChunk'
			],
			outputOverride: 'shaders/ShaderTerrain.js'
		},
		ShaderToon: {
			outputOverride: 'shaders/ShaderToon.js'
		},
		ShadowMapViewer: {
			imports: [ 'UnpackDepthRGBAShader' ]
		},
		SimplexNoise: {
			outputOverride: 'misc/SimplexNoise.js'
		},
		Sky: {
			imports: [ 'UniformsUtils' ]
		},
		SMAAPass: {
			imports: [
				'SMAAShader',
				'UniformsUtils'
			]
		},
		SpriteNode: {
			imports: [
				'UniformsUtils',
				'UniformsLib'
			]
		},
		SSAARenderPass: {
			imports: [
				'CopyShader',
				'UniformsUtils'
			]
		},
		StandardNode: {
			imports: [
				'UniformsUtils',
				'UniformsLib'
			]
		},
		STLLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		SVGLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		TDSLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		TexturePass: {
			imports: [
				'CopyShader',
				'UniformsUtils'
			]
		},
		TGALoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		TimelinerController: {
			imports: [
				'AnimationUtils',
				'Timeliner'
			],
			outputOverride: 'animation/TimelinerController.js'
		},
		TempNode: {
			imports: [ '_Math' ]
		},
		TTFLoader: {
			imports: [
				'DefaultLoadingManager',
				'_Math'
			]
		},
		TypedArrayUtils: {
			imports: [
				'AnimationUtils',
				'Timeliner'
			],
			outputOverride: 'utils/TypedArrayUtils.js'
		},
		UCSCharacter: {
			outputOverride: 'objects/UCSCharacter.js'
		},
		UnrealBloomPass: {
			imports: [
				'LuminosityHighPassShader',
				'UniformsUtils',
				'CopyShader'
			]
		},
		Vector2Node: {
			imports: [ 'NodeMaterial' ]
		},
		Vector3Node: {
			imports: [ 'NodeMaterial' ]
		},
		Vector4Node: {
			imports: [ 'NodeMaterial' ]
		},
		VolumeSlice: {
			outputOverride: 'audio/VolumeSlice.js'
		},
		VRMLLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		VTKLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'_Math'
			]
		},
		Water: {
			imports: [
				'UniformsUtils',
				'UniformsLib',
				'ShaderChunk',
				'_Math'
			]
		},
		Water2: {
			imports: [
				'UniformsUtils',
				'UniformsLib'
			]
		},
		WebGLDeferredRenderer: {
			imports: [
				'CopyShader',
				'FXAAShader'
			],
			replacements: [
				[ 'DeferredShaderChunk = ', 'var DeferredShaderChunk = ' ],
				[ 'ShaderDeferredCommon = ', 'var ShaderDeferredCommon = ' ],
				[ 'ShaderDeferred = ', 'var ShaderDeferred = ' ],
			]
		},
		WebVR: {
			replacements: [
				[ 'var WEBVR', 'var WebVR' ]
			]
		}
	}
}
