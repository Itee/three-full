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
		'Nodes.js',
		'THREE.Nodes.js',


		// Worker
		'RaytracingWorker.js',				// Ignore worker
		'OffscreenCanvas.js',				// Ignore worker
        'ctm',                              // Todo: Need to check worker import

		// Folder
		'draco',                            // draco_decoder use Eval !
		'sea3d',                            // Duplicate export 'SEA3D'
		'crossfade',                        // Scene has already been declared
		'offscreen',						// Should be in HTML File
		'ldraw',							// target NodeJs and use require

		// Specific file
		'Cloth.js',							// Use global variable from example html ! Need to be refactored
		'ParametricGeometries.js',          // Bug TorusKnotCurve from es6-exports
		'OceanShaders.js',                  // Todo: check how to extends imported lib properly
		'RectAreaLightUniformsLib.js',      // Todo: check how to extends imported lib properly
		'Volume.js',                        // damned eval
		'NRRDLoader.js',                    // Import Volume.js
		'XLoader.js',                     	// amd module
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
		AfterimagePass: {
            imports: [
                'AfterimageShader',
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
				'LoaderUtils'
			]
		},
		AssimpLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
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
            exportsOverride: [ 'BokehShader2', 'BokehDepthShader' ]
        },
		BufferGeometryUtils: {
			outputOverride: 'utils/BufferGeometryUtils.js'
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
				'BokehDepthShader',
				'UniformsUtils'
			]
		},
		ColladaLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'_Math'
			]
		},
		ColorConverter: {
			imports: [ '_Math' ]
		},
		ConvexObjectBreaker: {
			outputOverride: 'modifiers/ConvexObjectBreaker.js'
		},
		CubeTexturePass: {
			imports: [ 'ShaderLib' ]
		},
        CubicBezierCurve: {
            outputOverride: 'curves/CubicBezierCurve.js'
        },
        CubicBezierCurve3: {
            outputOverride: 'curves/CubicBezierCurve3.js'
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
        CurvePath: {
            // Equivalent to ( import * as Curves from 'intermediary exporter file Curves' )
            imports: [
                'ArcCurve',
                'CatmullRomCurve3',
                'CubicBezierCurve',
                'CubicBezierCurve3',
                'EllipseCurve',
                'LineCurve',
                'LineCurve3',
                'QuadraticBezierCurve',
                'QuadraticBezierCurve3',
                'SplineCurve'
            ],
            replacements: [
                [
                	'function CurvePath() {',
					'var Curves = {\n' +
                    '    ArcCurve: ArcCurve,\n' +
                    '    CatmullRomCurve3: CatmullRomCurve3,\n' +
                    '    CubicBezierCurve: CubicBezierCurve,\n' +
                    '    CubicBezierCurve3: CubicBezierCurve3,\n' +
                    '    EllipseCurve: EllipseCurve,\n' +
                    '    LineCurve: LineCurve,\n' +
                    '    LineCurve3: LineCurve3,\n' +
                    '    QuadraticBezierCurve: QuadraticBezierCurve,\n' +
                    '    QuadraticBezierCurve3: QuadraticBezierCurve3,\n' +
                    '    SplineCurve: SplineCurve\n' +
                    '}\n' +
                    'function CurvePath() {'
				]
            ],
            outputOverride: 'core/CurvePath.js'
        },
        Detector: {
			outputOverride: 'helpers/Detector.js',
			replacements: [
				[/if \( typeof module === 'object' \) {/g, ''],
				[ /module\.exports\s*=\s*\{?[^}]*}?/g, '']
			]
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
        DRACOLoader: {
            imports: [
                'DefaultLoadingManager',
                'Uint8BufferAttribute',
                'Uint16BufferAttribute',
                'Uint32BufferAttribute',
                'Int8BufferAttribute',
                'Int16BufferAttribute',
                'Int32BufferAttribute',
                'Float32BufferAttribute',
            ]
        },
		Earcut: {
            outputOverride: 'misc/Earcut.js'
        },
		EffectComposer: {
			imports: [ 'CopyShader' ]
		},
        EllipseCurve: {
            outputOverride: 'curves/EllipseCurve.js'
        },
        EquirectangularToCubeGenerator: {
            imports: [ 'UniformsUtils' ],
			replacements: [
				['EquirectangularToCubeGenerator = (', 'var EquirectangularToCubeGenerator = (']
			],
			exports: [
				'EquirectangularToCubeGenerator'
			]
		},
        EXRLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
		FBXLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'PropertyBinding',
				'_Math'
			]
		},
		FilmPass: {
			imports: [
				'FilmShader',
				'UniformsUtils'
			]
		},
		Fire: {
			imports: [
				'_Math'
			]
		},
        FirstPersonControls: {
			imports: [
				'_Math'
			]
		},
		Font: {
            outputOverride: 'core/Font.js'
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
                '_Math',
                'PropertyBinding',
                'InterpolateLinear'
            ]
		},
		GLTFLoader: {
			imports: [
				'DefaultLoadingManager',
				'MeshBasicMaterial',
				'ShaderLib',
				'UniformsUtils',
				'Loader',
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
				'PropertyBinding',
				'BufferGeometryUtils'
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
		HalftonePass: {
            imports: [
            	'UniformsUtils',
            	'HalftoneShader'
			]
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
        ImmediateRenderObject: {
            outputOverride: 'objects/ImmediateRenderObject.js'
        },
        ImprovedNoise: {
			exportsOverride: [ 'ImprovedNoise' ],
			outputOverride: 'misc/ImprovedNoise.js'
		},
        Interpolations: {
            outputOverride: 'core/Interpolations.js'
        },
        KMZLoader: {
			imports: [ 'DefaultLoadingManager' ]
		},
        LDrawLoader: {
			imports: [
				'DefaultLoadingManager'
			],
			replacements: [
				['console.warn( \'LDrawLoader: Error parsing material\' + lineParser.getLineNumberString() );', ''], // Bug fix !!!
				['LineParser.getLineNumberString()', 'lineParser.getLineNumberString()'], 							 // Bug fix !!!
			]
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
		LegacyJSONLoader: {
            imports: [
                'DefaultLoadingManager',
                'Loader',
                'LoaderUtils',
				'AnimationClip'
            ]
		},
        LightningStorm: {
            imports: [
                '_Math'
            ]
        },
		LightningStrike: {
			imports: [
				'_Math',
				'SimplexNoise',
			]
		},
        LineCurve: {
            outputOverride: 'curves/LineCurve.js'
        },
        LineCurve3: {
            outputOverride: 'curves/LineCurve3.js'
        },
        LineMaterial: {
            imports: [
                'UniformsLib',
                'UniformsUtils',
                'ShaderLib'
            ]
        },
        LoaderSupport: {
			imports: [ 'DefaultLoadingManager' ],
			replacements: [
				[ 'if ( var LoaderSupport === undefined )', '/*\nif ( var LoaderSupport === undefined )' ],
				[ 'LoaderSupport.Validator = {', '*/\nvar LoaderSupport = {}\nLoaderSupport.Validator = {' ]
			],
            exportsOverride: [ 'LoaderSupport' ]
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
		MaterialLoader: {
            // Equivalent to ( import * as Materials from 'intermediary exporter file Materials' )
            imports: [
            	'LineBasicMaterial',
            	'LineDashedMaterial',
            	'MeshBasicMaterial',
            	'MeshDepthMaterial',
            	'MeshDistanceMaterial',
            	'MeshLambertMaterial',
            	'MeshNormalMaterial',
            	'MeshPhongMaterial',
            	'MeshPhysicalMaterial',
            	'MeshStandardMaterial',
            	'MeshToonMaterial',
            	'PointsMaterial',
            	'RawShaderMaterial',
            	'ShaderMaterial',
            	'ShadowMaterial',
            	'SpriteMaterial'
			],
            replacements: [
                [
				'var material = new Materials[ json.type ]();',
				'var Materials = {\n' +
                '            LineBasicMaterial: LineBasicMaterial,\n' +
                '            LineDashedMaterial: LineDashedMaterial,\n' +
                '            MeshBasicMaterial: MeshBasicMaterial,\n' +
                '            MeshDepthMaterial: MeshDepthMaterial,\n' +
                '            MeshDistanceMaterial: MeshDistanceMaterial,\n' +
                '            MeshLambertMaterial: MeshLambertMaterial,\n' +
                '            MeshNormalMaterial: MeshNormalMaterial,\n' +
                '            MeshPhongMaterial: MeshPhongMaterial,\n' +
                '            MeshPhysicalMaterial: MeshPhysicalMaterial,\n' +
                '            MeshStandardMaterial: MeshStandardMaterial,\n' +
                '            MeshToonMaterial: MeshToonMaterial,\n' +
                '            PointsMaterial: PointsMaterial,\n' +
                '            RawShaderMaterial: RawShaderMaterial,\n' +
                '            ShaderMaterial: ShaderMaterial,\n' +
                '            ShadowMaterial: ShadowMaterial,\n' +
                '            SpriteMaterial: SpriteMaterial\n' +
                '\t\t}\n' +
                '\t\tvar material = new Materials[ json.type ]();'
				]
            ]
		},
		MD2Loader: {
			imports: [
				'DefaultLoadingManager',
				'AnimationClip'
			]
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
		MMDLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils',
				'VectorKeyframeTrack',
				'QuaternionKeyframeTrack'
			]
		},
		MorphAnimMesh: {
            imports: [
                'AnimationClip'
            ],
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
				'LoaderUtils',
				'Loader'
			]
		},
		Node: {
            imports: [ '_Math' ]
		},
        NodeBuilder: {
            imports: [ 'TextureCubeNode' ]
        },
        NodeMaterialLoader: {
			imports: [
				'DefaultLoadingManager'
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
        ObjectLoader: {
            // Equivalent to ( import * as Geometries from 'intermediary exporter file Geometries' )
            imports: [
                'WireframeGeometry',
                //'ParametricGeometry', 		Invalid due to TorusKnotCurve bug
                //'ParametricBufferGeometry',	Invalid due to TorusKnotCurve bug
                'TetrahedronGeometry',
                'TetrahedronBufferGeometry',
                'OctahedronGeometry',
                'OctahedronBufferGeometry',
                'IcosahedronGeometry',
                'IcosahedronBufferGeometry',
                'DodecahedronGeometry',
                'DodecahedronBufferGeometry',
                'PolyhedronGeometry',
                'PolyhedronBufferGeometry',
                'TubeGeometry',
                'TubeBufferGeometry',
                'TorusKnotGeometry',
                'TorusGeometry',
                'TorusBufferGeometry',
                'TextGeometry',
                'TextBufferGeometry',
                'SphereGeometry',
                'SphereBufferGeometry',
                'RingGeometry',
                'RingBufferGeometry',
                'PlaneGeometry',
                'PlaneBufferGeometry',
                'LatheGeometry',
                'LatheBufferGeometry',
                'ShapeGeometry',
                'ShapeBufferGeometry',
                'ExtrudeGeometry',
                'ExtrudeBufferGeometry',
                'EdgesGeometry',
                'ConeGeometry',
                'ConeBufferGeometry',
                'CylinderGeometry',
                'CylinderBufferGeometry',
                'CircleGeometry',
                'CircleBufferGeometry',
                'BoxGeometry',
                'BoxBufferGeometry'
            ],
            replacements: [
                [
                    'function ObjectLoader( manager ) {',
                    'var Geometries = {\n' +
                    '    WireframeGeometry: WireframeGeometry,\n' +
                    '    TetrahedronGeometry: TetrahedronGeometry,\n' +
                    '    TetrahedronBufferGeometry: TetrahedronBufferGeometry,\n' +
                    '    OctahedronGeometry: OctahedronGeometry,\n' +
                    '    OctahedronBufferGeometry: OctahedronBufferGeometry,\n' +
                    '    IcosahedronGeometry: IcosahedronGeometry,\n' +
                    '    IcosahedronBufferGeometry: IcosahedronBufferGeometry,\n' +
                    '    DodecahedronGeometry: DodecahedronGeometry,\n' +
                    '    DodecahedronBufferGeometry: DodecahedronBufferGeometry,\n' +
                    '    PolyhedronGeometry: PolyhedronGeometry,\n' +
                    '    PolyhedronBufferGeometry: PolyhedronBufferGeometry,\n' +
                    '    TubeGeometry: TubeGeometry,\n' +
                    '    TubeBufferGeometry: TubeBufferGeometry,\n' +
                    '    TorusKnotGeometry: TorusKnotGeometry,\n' +
                    '    TorusGeometry: TorusGeometry,\n' +
                    '    TorusBufferGeometry: TorusBufferGeometry,\n' +
                    '    TextGeometry: TextGeometry,\n' +
                    '    TextBufferGeometry: TextBufferGeometry,\n' +
                    '    SphereGeometry: SphereGeometry,\n' +
                    '    SphereBufferGeometry: SphereBufferGeometry,\n' +
                    '    RingGeometry: RingGeometry,\n' +
                    '    RingBufferGeometry: RingBufferGeometry,\n' +
                    '    PlaneGeometry: PlaneGeometry,\n' +
                    '    PlaneBufferGeometry: PlaneBufferGeometry,\n' +
                    '    LatheGeometry: LatheGeometry,\n' +
                    '    LatheBufferGeometry: LatheBufferGeometry,\n' +
                    '    ShapeGeometry: ShapeGeometry,\n' +
                    '    ShapeBufferGeometry: ShapeBufferGeometry,\n' +
                    '    ExtrudeGeometry: ExtrudeGeometry,\n' +
                    '    ExtrudeBufferGeometry: ExtrudeBufferGeometry,\n' +
                    '    EdgesGeometry: EdgesGeometry,\n' +
                    '    ConeGeometry: ConeGeometry,\n' +
                    '    ConeBufferGeometry: ConeBufferGeometry,\n' +
                    '    CylinderGeometry: CylinderGeometry,\n' +
                    '    CylinderBufferGeometry: CylinderBufferGeometry,\n' +
                    '    CircleGeometry: CircleGeometry,\n' +
                    '    CircleBufferGeometry: CircleBufferGeometry,\n' +
                    '    BoxGeometry: BoxGeometry,\n' +
                    '    BoxBufferGeometry: BoxBufferGeometry\n' +
                    '}\n' +
                    'function ObjectLoader( manager ) {'
                ]
            ]
		},
		OBJLoader: {
			imports: [ 'DefaultLoadingManager' ],
            exportsOverride: [ 'OBJLoader' ]
		},
		OBJLoader2: {
            imports: [
            	'DefaultLoadingManager',
				'LoaderUtils'
			],
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
		OrbitControls: {
            replacements: [
                ['ScreenSpacePanning = 0;', 'var ScreenSpacePanning = 0;'],
                ['HorizontalPanning = 1;', 'var HorizontalPanning = 1;']
            ]
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
        Path: {
            outputOverride: 'core/Path.js'
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
        QuadraticBezierCurve: {
            outputOverride: 'curves/QuadraticBezierCurve.js'
        },
        QuadraticBezierCurve3: {
            outputOverride: 'curves/QuadraticBezierCurve3.js'
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
		ReflectorNode: {
            imports: [
                'InputNode'
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
		ShaderGodRays: {
			outputOverride: 'shaders/ShaderGodRays.js'
		},
		ShaderLib: {
			imports: [
                ['mergeUniforms', 'from', './UniformsUtils']
			]
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
        ShaderTranslucent: {
            imports: [
                'UniformsUtils',
                'UniformsLib',
                'ShaderChunk'
            ],
            outputOverride: 'shaders/ShaderTranslucent.js'
        },
		ShadowMapViewer: {
			imports: [ 'UnpackDepthRGBAShader' ]
		},
		ShaderMaterial: {
			imports: [
                ['cloneUniforms', 'from', '../renderers/shaders/UniformsUtils'],
                ['default as default_vertex', 'from', '../renderers/shaders/ShaderChunk/default_vertex.glsl.js'],
                ['default as default_fragment', 'from', '../renderers/shaders/ShaderChunk/default_fragment.glsl.js']
			]
		},
        Shape: {
            outputOverride: 'core/Shape.js'
        },
		ShapePath: {
            outputOverride: 'core/ShapePath.js'
        },
		ShapeUtils: {
            outputOverride: 'utils/ShapeUtils.js'
        },
        SimplexNoise: {
			outputOverride: 'misc/SimplexNoise.js',
            exportsOverride: [ 'SimplexNoise' ]
		},
		SkeletonUtils: {
			replacements: [
                [ 'new Vector2( targetParentPos.x, targetParentPos.y ),', 'new Vector2( targetParentPos.x, targetParentPos.y )' ],
                [ 'new Vector2( sourceParentPos.x, sourceParentPos.y ),', 'new Vector2( sourceParentPos.x, sourceParentPos.y )' ]
			]
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
        SoftwareRenderer: {
            imports: [ '_Math' ]
        },
        SplineCurve: {
            outputOverride: 'curves/SplineCurve.js'
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
			imports: [
                '_Math',
                'CopyShader',
                'SimplexNoise',
                'SSAOBlurShader',
                'SSAODepthShader',
                'SSAOShader',
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
				'DefaultLoadingManager'
			]
		},
		TypedArrayUtils: {
			imports: [
				'Timeliner'
			],
			outputOverride: 'utils/TypedArrayUtils.js'
		},
		UCSCharacter: {
			outputOverride: 'objects/UCSCharacter.js'
		},
		UniformsUtils: {
			exports: [
				'cloneUniforms',
                'mergeUniforms'
			]
		},
		UnrealBloomPass: {
			imports: [
				'LuminosityHighPassShader',
				'UniformsUtils',
				'CopyShader'
			]
		},
		VolumeSlice: {
			outputOverride: 'audio/VolumeSlice.js'
		},
		VRMLLoader: {
			imports: [
				'DefaultLoadingManager',
				'LoaderUtils'
			]
		},
        VRMLoader: {
            imports: [
                'DefaultLoadingManager'
            ]
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
        WebGL: {
            replacements:    [
                [ 'WEBGL', 'WebGL' ]
            ],
            exportsOverride: [ 'WebGL' ],
            outputOverride: 'helpers/WebGL.js'
        },
		WebGLBackground: {
            imports: [
                ['cloneUniforms', 'from', '../shaders/UniformsUtils']
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
		WebGLRenderer: {
            imports: [
                ['cloneUniforms', 'from', './shaders/UniformsUtils']
            ]
		},
		WebVR: {
			replacements: [
				[ 'var WEBVR', 'var WebVR' ]
			],
            exportsOverride: [ 'WebVR' ]
		}
	},
	banner: '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\n' +
			'// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //\n' +
            '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\n'
}
