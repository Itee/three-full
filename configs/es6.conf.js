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
		'polyfills.js',
		'libs',

		'RaytracingWorker.js',
		'ctm',                              // Todo: Need to check worker import
		'draco',                            // draco_decoder use Eval !
		'sea3d',                            // Duplicate export 'SEA3D'
		'crossfade',                        // Scene has already been declared

		'ParametricGeometries.js',          // Bug TorusKnotCurve from es6-exports
		'RollerCoaster.js',                 // invalid default exports with file name from es6-exports
		'OceanShaders.js',                  // Todo: check how to extends imported lib properly
		'RectAreaLightUniformsLib.js',      //
		'Volume.js',                        // damned eval
		'NRRDLoader.js'                     // Import Volume.js
	],
	output: path.join( __dirname, '..', 'sources' ),
	edgeCases: {
		//        AnimationClipCreator:      {
		//            output: './src/misc/AnimationClipCreator.js'
		//        },
		'3MFLoader': {
			imports: [
				'DefaultLoadingManager',
				'TextDecoder'
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
				'TextDecoder'
			]
		},
		AssimpJSONLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		AssimpLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		AWDLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		BabylonLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		BinaryLoader: {
			imports: [ 'DefaultLoadingManager' ]
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
		BufferSubdivisionModifier: {
			imports: [ 'Face3' ]
		},
		BVHLoader: {
			imports: [ 'DefaultLoadingManager' ]
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
				'Loader'
			]
		},
		ColorNode: {
			imports: [ 'NodeMaterial' ]
		},
		CubeTexturePass: {
			imports: [ 'ShaderLib' ]
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
		FBXLoader: {
			imports: [
				'DefaultLoadingManager',
				'TextDecoder'
			] // + ZLib
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
		GLTFExporter: {
			imports: [ 'TextEncoder' ]
		},
		GLTFLoader: {
			imports: [
				'DefaultLoadingManager',
				'MeshPhongMaterial',
				'MeshLambertMaterial',
				'MeshBasicMaterial',
				'ShaderLib',
				'UniformsUtils',
				'TextDecoder',
				'AnimationUtils'
			]
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
				'TextDecoder'
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
			]
		},
		MD2Loader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		MMDExporter: {
			imports: [ 'MMDParser' ]
		},
		MMDLoader: {
			imports: [
				'DefaultLoadingManager',
				'MMDParser'
			]
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
			]
		},
		OutlineEffect: {
			imports: [ 'ShaderLib' ]
		},
		PDBLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		PlayCanvasLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		PRWMLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		OceanShaders: {
			imports: [ 'ShaderLib' ]
		},
		Octree: {
			imports: [ 'Raycaster' ],
			replacements: [
				[ 'instanceof var OctreeNode', 'instanceof OctreeNode' ]
			]
		},
		OutlinePass: {
			imports: [
				'CopyShader',
				'UniformsUtils'
			]
		},
		ParametricGeometries: {
			exports: [ 'ParametricGeometries' ]
		},
		PCDLoader: {
			imports: [
				'DefaultLoadingManager',
				'TextDecoder'
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
				'TextDecoder'
			]
		},
		PVRLoader: {
			imports: [ 'DefaultLoadingManager' ]
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
				[ 'var HDRLoader =  RGBELoader', 'var RGBELoader' ],
				[ /(return null;[\s\n\r]+};)/g, '$1\nvar HDRLoader = RGBELoader;\n\n' ],
			]

		},
		SAOPass: {
			imports: [
				'SSAOShader',
				'DepthLimitedBlurShader',
				'CopyShader',
				'UnpackDepthRGBAShader',
				'BlurShaderUtils',
				'UniformsUtils'
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
		ShaderPass: {
			imports: [ 'UniformsUtils' ]
		},
		ShaderSkin: {
			imports: [
				'UniformsUtils',
				'UniformsLib',
				'ShaderChunk'
			]
		},
		ShaderTerrain: {
			imports: [
				'UniformsUtils',
				'UniformsLib',
				'ShaderChunk'
			]
		},
		ShadowMapViewer: {
			imports: [ 'UnpackDepthRGBAShader' ]
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
		SSAOPass: {
			imports: [ 'SSAOShader' ]
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
				'TextDecoder'
			]
		},
		SVGLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		TDSLoader: {
			imports: [ 'DefaultLoadingManager' ]
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
			imports: [ 'AnimationUtils' ]
		},
		TTFLoader: {
			imports: [ 'DefaultLoadingManager' ] // + opentype
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
		VRMLLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		VTKLoader: {
			imports: [ 'DefaultLoadingManager' ] // + ZLib
		},
		Water: {
			imports: [
				'UniformsUtils',
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
		},
		XLoader: {
			imports: [ 'DefaultLoadingManager' ]
		}
	}
}
