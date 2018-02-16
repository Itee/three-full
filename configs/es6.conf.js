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

		// Specific Three stuff to ignore
		'build',
        'libs',
		'Three.js',
		'Three.Legacy.js',
		'polyfills.js',
        '.DS_Store',						// Ignore DS_Store from r90

        // Intermediary exporter files
		'Curves.js',
		'Geometries.js',
		'Materials.js',


		// Worker
		'RaytracingWorker.js',				// Ignore worker
		'OffscreenCanvas.js',				// Ignore worker
        'ctm',                              // Todo: Need to check worker import

		// Folder
		'draco',                            // draco_decoder use Eval !
		'sea3d',                            // Duplicate export 'SEA3D'
		'crossfade',                        // Scene has already been declared

		// Specific file
		'Cloth.js',							// Use global variable from example html ! Need to be refactored
		'ParametricGeometries.js',          // Bug TorusKnotCurve from es6-exports
		'OceanShaders.js',                  // Todo: check how to extends imported lib properly
		'RectAreaLightUniformsLib.js',      // Todo: check how to extends imported lib properly
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
		ArcCurve: {
			outputOverride: 'curves/ArcCurve.js'
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
				'LoaderUtils',
				'Loader'
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
        BokehShader2: {
            replacements:    [
                [ 'BokehShader', 'BokehShader2' ],
                [ 'BokehShader2 = {', 'var BokehShader2 = {' ]
            ],
            exportsOverride: [ 'BokehShader2' ]
        },
		BufferGeometryUtils: {
			outputOverride: 'utils/BufferGeometryUtils.js'
		},
		BufferSubdivisionModifier: {
			imports: [
				'Face3',
				'Vector3',
				'Vector2'
			]
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
        CatmullRomCurve3: {
            outputOverride: 'curves/CatmullRomCurve3.js'
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
				'VectorKeyframeTrack',
				'PropertyBinding'
			],
            exportsOverride: [
            	'GLTFLoader'
			]
		},
        GPUComputationRenderer: {
            exportsOverride: [ 'GPUComputationRenderer' ],
            outputOverride:  'renderers/GPUComputationRenderer.js'
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
		hilbert2D: {
            exportsOverride: [ 'hilbert2D' ],
		},
		hilbert3D: {
            exportsOverride: [ 'hilbert3D' ],
		},
		ImprovedNoise: {
			exportsOverride: [ 'ImprovedNoise' ],
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
			],
            exportsOverride: [ 'LegacyGLTFLoader' ]
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
        NodeMaterialLoader: {
			imports: [
				'DefaultLoadingManager',
			],
			replacements: [
				['NodeMaterialLoaderUtils = {', 'var NodeMaterialLoaderUtils = {']
			],
			exports: [
				'NodeMaterialLoaderUtils'
			]
		},
		NodePass: {
			imports: [
				'_Math'
			]
		},
		NURBSCurve: {
			imports: [ 'NURBSUtils' ]
		},
		NURBSSurface: {
			imports: [ 'NURBSUtils' ]
		},
		OBJLoader: {
			imports: [ 'DefaultLoadingManager' ],
            exportsOverride: [ 'OBJLoader' ]
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
        Pass: {
            exportsOverride: [ 'Pass' ]
		},
		PDBLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		PlayCanvasLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		PRNG: {
			outputOverride: 'utils/PRNG.js',
            exportsOverride: [ 'PRNG' ]
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
            exportsOverride: [ 'QuickHull' ],
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
        RollerCoaster: {
			exportsOverride: [
				'RollerCoasterGeometry',
				'RollerCoasterLiftersGeometry',
				'RollerCoasterShadowGeometry',
				'SkyGeometry',
				'TreesGeometry'
			],
			outputOverride: 'objects/RollerCoaster.js'
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
			outputOverride: 'misc/SimplexNoise.js',
            exportsOverride: [ 'SimplexNoise' ]
		},
		Sky: {
			imports: [ 'UniformsUtils' ]
		},
		SMAAPass: {
			imports: [
				'SMAAShader',
				'UniformsUtils'
			],
            exportsOverride: [ 'SMAAPass' ]
		},
        SMAAShader: {
            exportsOverride: [ 'SMAAShader' ]
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
				'AnimationUtils'
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
            imports:         [
                'UniformsUtils',
                'UniformsLib'
            ],
            replacements:    [
                [ /Water/g, 'Water2' ],
                [ 'Water2 = function (', 'function Water2(' ],
            ],
            exportsOverride: [ 'Water2' ]
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
			],
            exportsOverride: [ 'WebVR' ]
		}
	}
}
