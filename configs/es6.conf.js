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
			originOverride: 'three/src/animation/AnimationClipCreator.js'
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
			originOverride: 'three/src/utils/BufferGeometryUtils.js'
		},
		BufferSubdivisionModifier: {
			imports: [ 'Face3' ]
		},
		BVHLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		Car: {
			originOverride: 'three/src/objects/Car.js'
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
				'Loader'
			]
		},
		ColorNode: {
			imports: [ 'NodeMaterial' ]
		},
		ConvexObjectBreaker: {
			originOverride: 'three/src/modifiers/ConvexObjectBreaker.js'
		},
		CubeTexturePass: {
			imports: [ 'ShaderLib' ]
		},
		Curve: {
			originOverride: 'three/src/curves/Curve.js'
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
			originOverride: 'three/src/curves/CurveExtras.js'
		},
		Detector: {
			originOverride: 'three/src/helpers/Detector.js'
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
				'LoaderUtils'
			]
		},
		FilmPass: {
			imports: [
				'FilmShader',
				'UniformsUtils'
			]
		},
		FunctionNode: {
			imports: [ 'NodeLib' ]
		},
		GCodeLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		GlitchPass: {
			imports: [
				'DigitalGlitch',
				'UniformsUtils'
			]
		},
		GLNode: {
			imports: [ '_Math' ],
			replacements: [
				[ 'this.uuid = Math.generateUUID();', 'this.uuid = _Math.generateUUID();' ]
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
				'AnimationUtils'
			]
		},
		GPUComputationRenderer: {
			originOverride: 'three/src/renderers/GPUComputationRenderer.js'
		},
		GPUParticleSystem: {
			originOverride: 'three/src/objects/GPUParticleSystem.js'
		},
		Gyroscope: {
			originOverride: 'three/src/objects/Gyroscope.js'
		},
		HDRCubeTextureLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		ImageBitmapLoader: {
			imports: [
				'DefaultLoadingManager',
				'Cache'
			]
		},
		ImprovedNoise: {
			originOverride: 'three/src/misc/ImprovedNoise.js'
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
				'LoaderUtils'
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
			originOverride: 'three/src/objects/MarchingCubes.js'
		},
		MD2Loader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		MD2Character: {
			originOverride: 'three/src/objects/MD2Character.js'
		},
		MD2CharacterComplex: {
			originOverride: 'three/src/objects/MD2CharacterComplex.js'
		},
		MMDLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		MorphAnimMesh: {
			originOverride: 'three/src/objects/MorphAnimMesh.js'
		},
		MorphBlendMesh: {
			originOverride: 'three/src/objects/MorphBlendMesh.js'
		},
		MTLLoader: {
			imports: [ 'DefaultLoadingManager' ]
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
			originOverride: 'three/src/objects/Ocean.js'
		},
		OceanShaders: {
			imports: [ 'ShaderLib' ]
		},
		Octree: {
			imports: [ 'Raycaster' ],
			replacements: [
				[ 'instanceof var OctreeNode', 'instanceof OctreeNode' ]
			],
			originOverride: 'three/src/utils/Octree.js'
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
			originOverride: 'three/src/utils/PRNG.js'
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
			originOverride: 'three/src/utils/QuickHull.js'
		},
		Refractor: {
			imports: [ 'UniformsUtils' ]
		},
		Reflector: {
			imports: [ 'UniformsUtils' ]
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
			originOverride: 'three/src/shaders/ShaderGodRays.js'
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
			originOverride: 'three/src/shaders/ShaderSkin.js'
		},
		ShaderTerrain: {
			imports: [
				'UniformsUtils',
				'UniformsLib',
				'ShaderChunk'
			],
			originOverride: 'three/src/shaders/ShaderTerrain.js'
		},
		ShaderToon: {
			originOverride: 'three/src/shaders/ShaderToon.js'
		},
		ShadowMapViewer: {
			imports: [ 'UnpackDepthRGBAShader' ]
		},
		SimplexNoise: {
			originOverride: 'three/src/misc/SimplexNoise.js'
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
			originOverride: 'three/src/animation/TimelinerController.js'
		},
		TTFLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		TypedArrayUtils: {
			imports: [
				'AnimationUtils',
				'Timeliner'
			],
			originOverride: 'three/src/utils/TypedArrayUtils.js'
		},
		UCSCharacter: {
			originOverride: 'three/src/objects/UCSCharacter.js'
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
			originOverride: 'three/src/audio/VolumeSlice.js'
		},
		VRMLLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		VTKLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
		Water: {
			imports: [
				'UniformsUtils',
				'UniformsLib',
				'ShaderChunk'
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
