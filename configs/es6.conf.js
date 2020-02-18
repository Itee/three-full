/**
 * @file The main configuration file for es6-convertor
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

const path = require( 'path' )

module.exports = {
    inputs:    [
        path.join( __dirname, '..', 'node_modules', 'three', 'examples' ),
        path.join( __dirname, '..', 'node_modules', 'three', 'src' )
    ],
    excludes:  [

        // Specific Three stuff to ignore
        'build',
        'libs',
        'Three.js',
        'Three.Legacy.js',
        'Three.Legacy.d.ts',
        'polyfills.js',             // Ignore pure function call (include from gulp)
        'HelioWebXRPolyfill.js',    // Ignore pure function call (include from gulp)
        '.DS_Store',                // Ignore DS_Store from r90
        'README',

        // Intermediary exporter files
        'Curves.js',
        'Geometries.js',
        'Materials.js',
        'Nodes.js',

        '\\examples\\jsm\\loaders\\VRMLLoader',
        '\\examples\\jsm\\loaders\\obj2\\worker\\parallel\\jsm\\OBJLoader2Worker', // Cannot instanciate worker this way
        '\\examples\\jsm\\controls\\experimental',
        '\\examples\\jsm\\webxr\\XRControllerModelFactory',

        // Duplicated files
        '\\examples\\js\\animation',
        '\\examples\\js\\cameras',
        '\\examples\\js\\controls',
        '\\examples\\js\\curves',
        '\\examples\\js\\effects',
        '\\examples\\js\\exporters',
        '\\examples\\js\\geometries',
        '\\examples\\js\\interactive',
        '\\examples\\js\\lights',
        '\\examples\\js\\lines',
        '\\examples\\js\\loaders',  // Care about VRMLLoader and NRRDLoader that are not in jsm but already ignored... so...
        '\\examples\\js\\math',
        '\\examples\\js\\misc',
        '\\examples\\js\\modifier',
        '\\examples\\js\\objects',
        '\\examples\\js\\offscreen',
        '\\examples\\js\\postprocessing',
        '\\examples\\js\\renderers\\CSS2DRenderer',
        '\\examples\\js\\renderers\\CSS3DRenderer',
        '\\examples\\js\\renderers\\Projector',
        '\\examples\\js\\renderers\\RaytracingRenderer',
        '\\examples\\js\\renderers\\RaytracingWorker', // Not Exist in jsm but crash on test
        '\\examples\\js\\renderers\\SVGRenderer',
        '\\examples\\js\\renderers\\WebGLDeferredRenderer',
        '\\examples\\js\\shaders',
        '\\examples\\js\\utils',
        '\\examples\\js\\vr', // HelioWebXRPolyfill is managed by gulp as external file
        '\\examples\\js\\WebGL'

    ],
    output:    path.join( __dirname, '..', 'sources' ),
    edgeCases: {
        BokehShader2:           {
            imports:         [ '!BokehShader' ],
            replacements:    [
                [ 'BokehShader', 'BokehShader2' ]
            ],
            exportsOverride: [ 'BokehShader2', 'BokehDepthShader' ]
        },
        ConvexObjectBreaker:    {
            outputOverride: 'modifiers/ConvexObjectBreaker.js'
        },
        Curve:                  {
            outputOverride: 'curves/Curve.js'
        },
        CurveExtras:            {
            replacements:    [
                [ 'var Curves = ( function () {', '' ],
                [ /return {([\n].*)*/g, '\n' ]
            ],
            exportsOverride: [
                'GrannyKnot',
                'HeartCurve',
                'VivianiCurve',
                'KnotCurve',
                'HelixCurve',
                'TrefoilKnot',
                'TorusKnot',
                'CinquefoilKnot',
                'TrefoilPolynomialKnot',
                'FigureEightPolynomialKnot',
                'DecoratedTorusKnot4a',
                'DecoratedTorusKnot4b',
                'DecoratedTorusKnot5a',
                'DecoratedTorusKnot5c'
            ]
        },
        CurvePath:              {
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
                    '    SplineCurve: SplineCurve,\n' +

                    '    GrannyKnot: GrannyKnot,\n' +
                    '    HeartCurve: HeartCurve,\n' +
                    '    VivianiCurve: VivianiCurve,\n' +
                    '    KnotCurve: KnotCurve,\n' +
                    '    HelixCurve: HelixCurve,\n' +
                    '    TrefoilKnot: TrefoilKnot,\n' +
                    '    TorusKnot: TorusKnot,\n' +
                    '    CinquefoilKnot: CinquefoilKnot,\n' +
                    '    TrefoilPolynomialKnot: TrefoilPolynomialKnot,\n' +
                    '    FigureEightPolynomialKnot: FigureEightPolynomialKnot,\n' +
                    '    DecoratedTorusKnot4a: DecoratedTorusKnot4a,\n' +
                    '    DecoratedTorusKnot4b: DecoratedTorusKnot4b,\n' +
                    '    DecoratedTorusKnot5a: DecoratedTorusKnot5a,\n' +
                    '    DecoratedTorusKnot5c: DecoratedTorusKnot5c\n' +

                    '}\n' +
                    'function CurvePath() {'
                ]
            ]
        },
        DRACOExporter:          {
            imports: [ '!Mesh' ]
        },
        DRACOLoader:            {
            imports: [ '!Mesh' ]
        },
        Earcut:                 {
            imports:        [ '!Node' ],
            outputOverride: 'misc/Earcut.js'
        },
        FBXLoader:              {
            imports: [
                '!NormalNode',
                '!UVNode',
                '!Node',
                '!ColorNode',
                '!Geometry',
                '!Material',
                '!Points'
            ]
        },
        GPUComputationRenderer: {
            outputOverride: 'renderers/GPUComputationRenderer.js'
        },
        Gyroscope:              {
            outputOverride: 'objects/Gyroscope.js'
        },
        ImageUtils:             {
            outputOverride: 'utils/ImageUtils.js'
        },
        Lensflare:              {
            imports: [
                '!Geometry'
            ]
        },
        MaterialLoader:         {
            replacements: [
                [
                    'function MaterialLoader( manager ) {',
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
                    'function MaterialLoader( manager ) {'
                ]
            ]
        },
        MD2Character:           {
            outputOverride: 'objects/MD2Character.js'
        },
        MD2CharacterComplex:    {
            outputOverride: 'objects/MD2CharacterComplex.js'
        },
        MorphAnimMesh:          {
            outputOverride: 'objects/MorphAnimMesh.js'
        },
        MorphBlendMesh:         {
            outputOverride: 'objects/MorphBlendMesh.js'
        },
        NodeMaterialLoader:     {
            replacements: [
                [
                    'var NodeMaterialLoader = function ( manager, library ) {',
                    'var Nodes = {\n' +
                    '	Node:Node,\n' +
                    '	TempNode:TempNode,\n' +
                    '	InputNode:InputNode,\n' +
                    '	ConstNode:ConstNode,\n' +
                    '	VarNode:VarNode,\n' +
                    '	StructNode:StructNode,\n' +
                    '	AttributeNode:AttributeNode,\n' +
                    '	FunctionNode:FunctionNode,\n' +
                    '	ExpressionNode:ExpressionNode,\n' +
                    '	FunctionCallNode:FunctionCallNode,\n' +
                    '	NodeLib:NodeLib,\n' +
                    '	NodeUtils:NodeUtils,\n' +
                    '	NodeFrame:NodeFrame,\n' +
                    '	NodeUniform:NodeUniform,\n' +
                    '	NodeBuilder:NodeBuilder,\n' +
                    '	BoolNode:BoolNode,\n' +
                    '	IntNode:IntNode,\n' +
                    '	FloatNode:FloatNode,\n' +
                    '	Vector2Node:Vector2Node,\n' +
                    '	Vector3Node:Vector3Node,\n' +
                    '	Vector4Node:Vector4Node,\n' +
                    '	ColorNode:ColorNode,\n' +
                    '	Matrix3Node:Matrix3Node,\n' +
                    '	Matrix4Node:Matrix4Node,\n' +
                    '	TextureNode:TextureNode,\n' +
                    '	CubeTextureNode:CubeTextureNode,\n' +
                    '	ScreenNode:ScreenNode,\n' +
                    '	ReflectorNode:ReflectorNode,\n' +
                    '	PropertyNode:PropertyNode,\n' +
                    '	RTTNode:RTTNode,\n' +
                    '	UVNode:UVNode,\n' +
                    '	ColorsNode:ColorsNode,\n' +
                    '	PositionNode:PositionNode,\n' +
                    '	NormalNode:NormalNode,\n' +
                    '	CameraNode:CameraNode,\n' +
                    '	LightNode:LightNode,\n' +
                    '	ReflectNode:ReflectNode,\n' +
                    '	ScreenUVNode:ScreenUVNode,\n' +
                    '	ResolutionNode:ResolutionNode,\n' +
                    '	MathNode:MathNode,\n' +
                    '	OperatorNode:OperatorNode,\n' +
                    '	CondNode:CondNode,\n' +
                    '	NoiseNode:NoiseNode,\n' +
                    '	CheckerNode:CheckerNode,\n' +
                    '	TextureCubeUVNode:TextureCubeUVNode,\n' +
                    '	TextureCubeNode:TextureCubeNode,\n' +
                    '	NormalMapNode:NormalMapNode,\n' +
                    '	BumpMapNode:BumpMapNode,\n' +
                    '	BypassNode:BypassNode,\n' +
                    '	JoinNode:JoinNode,\n' +
                    '	SwitchNode:SwitchNode,\n' +
                    '	TimerNode:TimerNode,\n' +
                    '	VelocityNode:VelocityNode,\n' +
                    '	UVTransformNode:UVTransformNode,\n' +
                    '	MaxMIPLevelNode:MaxMIPLevelNode,\n' +
                    '	SpecularMIPLevelNode:SpecularMIPLevelNode,\n' +
                    '	ColorSpaceNode:ColorSpaceNode,\n' +
                    '	SubSlotNode:SubSlotNode,\n' +
                    '	BlurNode:BlurNode,\n' +
                    '	ColorAdjustmentNode:ColorAdjustmentNode,\n' +
                    '	LuminanceNode:LuminanceNode,\n' +
                    '	RawNode:RawNode,\n' +
                    '	SpriteNode:SpriteNode,\n' +
                    '	PhongNode:PhongNode,\n' +
                    '	StandardNode:StandardNode,\n' +
                    '	MeshStandardNode:MeshStandardNode,\n' +
                    '	NodeMaterial:NodeMaterial,\n' +
                    '	SpriteNodeMaterial:SpriteNodeMaterial,\n' +
                    '	PhongNodeMaterial:PhongNodeMaterial,\n' +
                    '	StandardNodeMaterial:StandardNodeMaterial,\n' +
                    '	MeshStandardNodeMaterial:MeshStandardNodeMaterial,\n' +
                    '	NodePostProcessing:NodePostProcessing\n' +
                    '}\n' +
                    'var NodeMaterialLoader = function ( manager, library ) {'
                ]
            ]

        },
        ObjectLoader:           {
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
                    'var Curves = {\n' +
                    '	ArcCurve: ArcCurve,\n' +
                    '	CatmullRomCurve3: CatmullRomCurve3,\n' +
                    '	CubicBezierCurve: CubicBezierCurve,\n' +
                    '	CubicBezierCurve3: CubicBezierCurve3,\n' +
                    '	EllipseCurve: EllipseCurve,\n' +
                    '	LineCurve: LineCurve,\n' +
                    '	LineCurve3: LineCurve3,\n' +
                    '	QuadraticBezierCurve: QuadraticBezierCurve,\n' +
                    '	QuadraticBezierCurve3: QuadraticBezierCurve3,\n' +
                    '	SplineCurve: SplineCurve,\n' +
                    '	GrannyKnot: GrannyKnot,\n' +
                    '	HeartCurve: HeartCurve,\n' +
                    '	VivianiCurve: VivianiCurve,\n' +
                    '	KnotCurve: KnotCurve,\n' +
                    '	HelixCurve: HelixCurve,\n' +
                    '	TrefoilKnot: TrefoilKnot,\n' +
                    '	TorusKnot: TorusKnot,\n' +
                    '	CinquefoilKnot: CinquefoilKnot,\n' +
                    '	TrefoilPolynomialKnot: TrefoilPolynomialKnot,\n' +
                    '	FigureEightPolynomialKnot: FigureEightPolynomialKnot,\n' +
                    '	DecoratedTorusKnot4a: DecoratedTorusKnot4a,\n' +
                    '	DecoratedTorusKnot4b: DecoratedTorusKnot4b,\n' +
                    '	DecoratedTorusKnot5a: DecoratedTorusKnot5a,\n' +
                    '	DecoratedTorusKnot5c: DecoratedTorusKnot5c,\n' +
                    '}\n' +
                    'function ObjectLoader( manager ) {'
                ]
            ]
        },
        OBJLoader2:             {
            replacements: [
                [ 'for ( let mesh of meshes ) {', '//[ThreeFull] Replace for of loop\n\t\t\tfor ( let i = 0, n = meshes.length ; i < n ; i++) {\n\t\t\t\tconst mesh = meshes[i];' ]
            ]
        },
        OBJLoader2Parallel:       {
            replacements: [
                [ '../examples/loaders/jsm/obj2/worker/parallel/jsm/OBJLoader2Worker.js', '../sources/loaders/obj2/worker/parallel/jsm/OBJLoader2Worker.js' ]
            ]
        },
        Ocean:                  {
            outputOverride: 'objects/Ocean.js'
        },
        ParametricGeometries:   {
            imports: [
                '!PlaneGeometry',
                '!SphereGeometry',
                '!TorusKnotGeometry',
                '!TubeGeometry'
            ]
        },
        PMREMGenerator:         {
            outputOverride: 'utils/PMREMGenerator.js'
        },
        Raycaster:              {
            importsOverride: [ 'Ray' ]
        },
        //        RaytracingWorker:            {
        //            imports: [ '_Math' ]
        //        },
        RollerCoaster:          {
            outputOverride: 'objects/RollerCoaster.js'
        },
        ShaderMaterial:         {
            imports: [
                [ 'default as default_vertex', 'from', '../renderers/shaders/ShaderChunk/default_vertex.glsl.js' ],
                [ 'default as default_fragment', 'from', '../renderers/shaders/ShaderChunk/default_fragment.glsl.js' ]
            ]
        },
        ShapeUtils:             {
            outputOverride: 'utils/ShapeUtils.js'
        },
        SimplifyModifier:       {
            imports: [ '!Triangle' ]
        },
        StandardNode:       {
            replacements: [
                ['\'float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\',','\'float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\''] // Fix eslint extra colon
            ]
        },
        SVGLoader:      {
            imports: [ '!Color' ]
        },
        TransformControls:      {
            imports: [ '!CircleGeometry' ]
        },
        TypedArrayUtils:      {
            imports: [ '!Node' ]
        },
        UniformsUtils:          {
            exportsOverride: [
                'UniformsUtils',
                'cloneUniforms',
                'mergeUniforms'
            ]
        },
        VolumeSlice:            {
            outputOverride: 'audio/VolumeSlice.js'
        },
        //        VRMLLoader:                {
        //            imports: [
        //                [ 'chevrotain', 'from', '../libs/chevrotain.min.js' ]
        ////                [ 'chevrotain', 'from', '../libs/chevrotain.module.min.js' ],
        //            ],
        //        },
        Water2:                 {
            imports:         [
                '!Water'
            ],
            replacements:    [
                [ /Water/g, 'Water2' ],
                [ 'var Water2 = function (', 'function Water2(' ]
            ],
            exportsOverride: [ 'Water2' ]
        },
        WebGL:                  {
            replacements:    [
                [ 'WEBGL', 'WebGL' ]
            ],
            exportsOverride: [ 'WebGL' ],
            outputOverride:  'helpers/WebGL.js'
        },
        WebGLPrograms:          {
            importsOverride: [
                'BackSide',
                'DoubleSide',
                'CubeUVRefractionMapping',
                'CubeUVReflectionMapping',
                'LinearEncoding',
                'ObjectSpaceNormalMap',
                'TangentSpaceNormalMap',
                'NoToneMapping',
                'ShaderLib',
                'UniformsUtils',
                'WebGLProgram'
            ]
        }
    },
    banner:    '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\n' +
                   '// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //\n' +
                   '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\n'
}
