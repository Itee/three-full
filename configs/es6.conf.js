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
        'polyfills.js',     // Ignore pure function call (include from gulp)
        'HelioWebXRPolyfill.js',     // Ignore pure function call (include from gulp)
        '.DS_Store',        // Ignore DS_Store from r90
        'README',

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
        'jsm',								// Contain duplicate exports

        // Specific file
        'Cloth.js',							// Use global variable from example html ! Need to be refactored
        'OceanShaders.js',                  // Todo: check how to extends imported lib properly
        'RectAreaLightUniformsLib.js',      // Todo: check how to extends imported lib properly
        'Volume.js',                        // damned eval
        'NRRDLoader.js',                    // Import Volume.js
        'XLoader.js'                     	// amd module
    ],
    output:    path.join( __dirname, '..', 'sources' ),
    edgeCases: {
        AnimationClipCreator:        {
            outputOverride: 'animation/AnimationClipCreator.js'
        },
        ArcCurve:                    {
            outputOverride: 'curves/ArcCurve.js'
        },
        BasisTextureLoader:          {
            exportsOverride: [ 'BasisTextureLoader' ]
        },
        BokehShader2:                {
            importsOverride: [ 'Vector2' ],
            replacements:    [
                [ 'BokehShader', 'BokehShader2' ],
                [ 'BokehShader2 = {', 'var BokehShader2 = {' ]
            ],
            exportsOverride: [ 'BokehShader2', 'BokehDepthShader' ]
        },
        BufferGeometryUtils:         {
            outputOverride: 'utils/BufferGeometryUtils.js'
        },
        Car:                         {
            imports:        [
                '_Math'
            ],
            outputOverride: 'objects/Car.js'
        },
        CatmullRomCurve3:            {
            outputOverride: 'curves/CatmullRomCurve3.js'
        },
        ColladaLoader:               {
            imports: [
                '_Math'
            ]
        },
        ColorConverter:              {
            imports: [ '_Math' ]
        },
        ConvexObjectBreaker:         {
            outputOverride: 'modifiers/ConvexObjectBreaker.js'
        },
        CubicBezierCurve:            {
            outputOverride: 'curves/CubicBezierCurve.js'
        },
        CubicBezierCurve3:           {
            outputOverride: 'curves/CubicBezierCurve3.js'
        },
        Curve:                       {
            outputOverride: 'curves/Curve.js'
        },
        CurveExtras:                 {
            replacements:   [
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
        CurvePath:                   {
            // Equivalent to ( import * as Curves from 'intermediary exporter file Curves' )
            imports:        [
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
            replacements:   [
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
        DeviceOrientationControls:   {
            imports: [
                '_Math'
            ]
        },
        DracoExporter:               {
            importsOverride: [ 'BufferGeometry' ]
        },
        DRACOLoader:                 {
            imports: [ '!Mesh' ]
        },
        Earcut:                      {
            importsOverride: [],
            outputOverride:  'misc/Earcut.js'
        },
        EllipseCurve:                {
            outputOverride: 'curves/EllipseCurve.js'
        },
        FBXLoader:                   {
            imports: [
                '_Math',
                '!NormalNode',
                '!UVNode',
                '!Node',
                '!ColorNode',
                '!Geometry',
                '!Material',
                '!Points'
            ]
        },
        Fire:                        {
            imports: [
                '_Math'
            ]
        },
        FirstPersonControls:         {
            imports: [
                '_Math'
            ]
        },
        Font:                        {
            outputOverride: 'core/Font.js'
        },
        FunctionNode_Implementation: {
            importsOverride: [
                [ 'FunctionNode', 'from', './FunctionNode_Declaration' ],
                'NodeLib'
            ]
        },
        GlitchPass:                  {
            imports: [
                '_Math'
            ]
        },
        GLNode:                      {
            imports:      [ '_Math' ],
            replacements: [
                [ 'this.uuid = Math.generateUUID();', 'this.uuid = _Math.generateUUID();' ]
            ]
        },
        GLTFExporter:                {
            imports: [
                '_Math'
            ]
        },
        GLTFLoader:                  {
            imports:         [
                '_Math'
            ],
            exportsOverride: [
                'GLTFLoader'
            ]
        },
        GPUComputationRenderer:      {
            exportsOverride: [ 'GPUComputationRenderer' ],
            outputOverride:  'renderers/GPUComputationRenderer.js'
        },
        GPUParticleSystem:           {
            imports:        [ '_Math' ],
            outputOverride: 'objects/GPUParticleSystem.js'
        },
        Gyroscope:                   {
            outputOverride: 'objects/Gyroscope.js'
        },
        hilbert2D:                   {
            exportsOverride: [ 'hilbert2D' ]
        },
        hilbert3D:                   {
            exportsOverride: [ 'hilbert3D' ]
        },
        ImageUtils:                  {
            outputOverride: 'utils/ImageUtils.js'
        },
        ImmediateRenderObject:       {
            outputOverride: 'objects/ImmediateRenderObject.js'
        },
        ImprovedNoise:               {
            exportsOverride: [ 'ImprovedNoise' ],
            outputOverride:  'misc/ImprovedNoise.js'
        },
        Interpolations:              {
            outputOverride: 'core/Interpolations.js'
        },
        LDrawLoader:                 {
            replacements: [
                [ 'console.warn( \'LDrawLoader: Error parsing material\' + lineParser.getLineNumberString() );', '' ], // Bug fix !!!
                [ 'LineParser.getLineNumberString()', 'lineParser.getLineNumberString()' ] 							 // Bug fix !!!
            ]
        },
        LegacyGLTFLoader:            {
            imports:         [
                '_Math'
            ],
            exportsOverride: [ 'LegacyGLTFLoader' ]
        },
        Lensflare:                   {
            imports: [
                '!Geometry'
            ]
        },
        LightningStorm:              {
            imports: [
                '_Math'
            ]
        },
        LightningStrike:             {
            imports: [
                '_Math'
            ]
        },
        LineCurve:                   {
            outputOverride: 'curves/LineCurve.js'
        },
        LineCurve3:                  {
            outputOverride: 'curves/LineCurve3.js'
        },
        LoaderSupport:               {
            replacements:    [
                [ 'if ( var LoaderSupport === undefined ) { var LoaderSupport = {} }', '' ],
                [ 'LoaderSupport.Validator = {', '\nvar LoaderSupport = {}\nLoaderSupport.Validator = {' ]
            ],
            exportsOverride: [ 'LoaderSupport' ]
        },
        Lut:                         {
            exportsOverride: [ 'Lut', 'ColorMapKeywords' ]
        },
        MarchingCubes:               {
            replacements:   [
                [ 'edgeTable = new Int32Array', 'var edgeTable = new Int32Array' ],
                [ 'triTable = new Int32Array', 'var triTable = new Int32Array' ]
            ],
            outputOverride: 'objects/MarchingCubes.js'
        },
        MaterialLoader:              {
            // Equivalent to ( import * as Materials from 'intermediary exporter file Materials' )
            imports:      [
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
        MD2Character:                {
            outputOverride: 'objects/MD2Character.js'
        },
        MD2CharacterComplex:         {
            imports:        [
                '_Math'
            ],
            outputOverride: 'objects/MD2CharacterComplex.js'
        },
        MorphAnimMesh:               {
            outputOverride: 'objects/MorphAnimMesh.js'
        },
        MorphBlendMesh:              {
            imports:        [
                '_Math'
            ],
            outputOverride: 'objects/MorphBlendMesh.js'
        },
        Node:                        {
            imports: [
                '_Math'
            ]
        },
        NodeMaterialLoader:          {
            exportsOverride: [ 'NodeMaterialLoader', 'NodeMaterialLoaderUtils' ]
        },
        NodePass:                    {
            imports: [
                '_Math'
            ]
        },
        ObjectLoader:                {
            // Equivalent to ( import * as Geometries from 'intermediary exporter file Geometries' )
            imports:      [
                'WireframeGeometry',
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
        OBJLoader:                   {
            exportsOverride: [ 'OBJLoader' ]
        },
        OBJLoader2:                  {
            replacements: [
                [ 'if ( var OBJLoader2 === undefined ) { var OBJLoader2 = {} }', '' ]
            ]
        },
        Ocean:                       {
            outputOverride: 'objects/Ocean.js'
        },
        Octree:                      {
            imports:        [
                'Raycaster',
                '_Math'
            ],
            replacements:   [
                [ 'instanceof var OctreeNode', 'instanceof OctreeNode' ]
            ],
            outputOverride: 'utils/Octree.js'
        },
        OrbitControls:               {
            replacements: [
                [ 'ScreenSpacePanning = 0;', 'var ScreenSpacePanning = 0;' ],
                [ 'HorizontalPanning = 1;', 'var HorizontalPanning = 1;' ]
            ]
        },
        OutlineEffect:               {
            imports: [
                '!MeshBasicMaterial',
                '!MeshLambertMaterial',
                '!MeshPhongMaterial',
                '!MeshToonMaterial',
                '!MeshStandardMaterial',
                '!MeshPhysicalMaterial'
            ]
        },
        Pass:                        {
            exportsOverride: [ 'Pass' ]
        },
        Path:                        {
            outputOverride: 'core/Path.js'
        },
        PRNG:                        {
            outputOverride:  'utils/PRNG.js',
            exportsOverride: [ 'PRNG' ]
        },
        ParametricGeometries:        {
            importsOverride: [
                'Vector3',
                'ParametricGeometry',
                'Geometry',
                'ArrowHelper',
                'Curve'
            ],
            exportsOverride: [ 'ParametricGeometries' ],
            outputOverride:  'geometries/ParametricGeometries.js'
        },
        QuadraticBezierCurve:        {
            outputOverride: 'curves/QuadraticBezierCurve.js'
        },
        QuadraticBezierCurve3:       {
            outputOverride: 'curves/QuadraticBezierCurve3.js'
        },
        QuickHull:                   {
            exportsOverride: [ 'QuickHull' ],
            outputOverride:  'utils/QuickHull.js'
        },
        Raycaster:                   {
            importsOverride: [ 'Ray' ]
        },
        Refractor:                   {
            imports: [
                '_Math'
            ]
        },
        Reflector:                   {
            imports: [
                '_Math'
            ]
        },
        RGBELoader:                  {
            replacements: [
                [ 'HDRLoader = RGBELoader', 'var RGBELoader' ],
                [ /(return null;[\s\n\r]+};)/g, '$1\nvar HDRLoader = RGBELoader;\n\n' ]
            ]

        },
        RollerCoaster:               {
            exportsOverride: [
                'RollerCoasterGeometry',
                'RollerCoasterLiftersGeometry',
                'RollerCoasterShadowGeometry',
                'SkyGeometry',
                'TreesGeometry'
            ],
            outputOverride:  'objects/RollerCoaster.js'
        },
        ShaderGodRays:               {
            outputOverride: 'shaders/ShaderGodRays.js'
        },
        ShaderSkin:                  {
            outputOverride: 'shaders/ShaderSkin.js'
        },
        ShaderTerrain:               {
            outputOverride: 'shaders/ShaderTerrain.js'
        },
        ShaderToon:                  {
            outputOverride: 'shaders/ShaderToon.js'
        },
        ShaderTranslucent:           {
            outputOverride: 'shaders/ShaderTranslucent.js'
        },
        ShaderMaterial:              {
            imports: [
                [ 'default as default_vertex', 'from', '../renderers/shaders/ShaderChunk/default_vertex.glsl.js' ],
                [ 'default as default_fragment', 'from', '../renderers/shaders/ShaderChunk/default_fragment.glsl.js' ]
            ]
        },
        Shape:                       {
            outputOverride: 'core/Shape.js'
        },
        ShapePath:                   {
            outputOverride: 'core/ShapePath.js'
        },
        ShapeUtils:                  {
            outputOverride: 'utils/ShapeUtils.js'
        },
        SimplexNoise:                {
            outputOverride:  'misc/SimplexNoise.js',
            exportsOverride: [ 'SimplexNoise' ]
        },
        SimplifyModifier:            {
            imports: [ '!Triangle' ]
        },
        SkeletonUtils:               {
            replacements: [
                [ 'new Vector2( targetParentPos.x, targetParentPos.y ),', 'new Vector2( targetParentPos.x, targetParentPos.y )' ],
                [ 'new Vector2( sourceParentPos.x, sourceParentPos.y ),', 'new Vector2( sourceParentPos.x, sourceParentPos.y )' ]
            ]
        },
        SMAAPass:                    {
            exportsOverride: [ 'SMAAPass' ]
        },
        SMAAShader:                  {
            exportsOverride: [ 'SMAAEdgesShader', 'SMAAWeightsShader', 'SMAABlendShader' ]
        },
        SoftwareRenderer:            {
            imports: [ '_Math', '!Texture' ]
        },
        SplineCurve:                 {
            outputOverride: 'curves/SplineCurve.js'
        },
        SSAOPass:                    {
            imports: [
                '_Math'
            ]
        },
        TimelinerController:         {
            outputOverride: 'animation/TimelinerController.js'
        },
        TempNode:                    {
            imports: [ '_Math' ]
        },
        TransformControls:           {
            imports: [ '!CircleGeometry' ]
        },
        TypedArrayUtils:             {
            imports:        [
                '!Node'
            ],
            outputOverride: 'utils/TypedArrayUtils.js'
        },
        UCSCharacter:                {
            outputOverride: 'objects/UCSCharacter.js'
        },
        UniformsUtils:               {
            exportsOverride: [
                'UniformsUtils',
                'cloneUniforms',
                'mergeUniforms'
            ]
        },
        VolumeSlice:                 {
            outputOverride: 'audio/VolumeSlice.js'
        },
        VolumeShader:                {
            exportsOverride: [ 'VolumeRenderShader1' ]
        },
        Water:                       {
            imports: [
                '_Math'
            ]
        },
        Water2:                      {
            imports:         [
                '!Water'
            ],
            replacements:    [
                [ /Water/g, 'Water2' ],
                [ 'Water2 = function (', 'function Water2(' ]
            ],
            exportsOverride: [ 'Water2' ]
        },
        WebGL:                       {
            replacements:    [
                [ 'WEBGL', 'WebGL' ]
            ],
            exportsOverride: [ 'WebGL' ],
            outputOverride:  'helpers/WebGL.js'
        },
        WebGLPrograms:               {
            importsOverride: [
                'BackSide',
                'DoubleSide',
                'CubeUVRefractionMapping',
                'CubeUVReflectionMapping',
                'GammaEncoding',
                'LinearEncoding',
                'ObjectSpaceNormalMap',
                'WebGLProgram'
            ]
        },
        WebGLDeferredRenderer:       {
            exportsOverride: [ 'WebGLDeferredRenderer', 'ShaderDeferred', 'ShaderDeferredCommon', 'DeferredShaderChunk' ]
        },
        WebVR:                       {
            replacements:    [
                [ 'var WEBVR', 'var WebVR' ]
            ],
            exportsOverride: [ 'WebVR' ]
        }
    },
    banner:    '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\n' +
                   '// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //\n' +
                   '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\n'
}
