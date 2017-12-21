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
    output:    path.join( __dirname, '..', 'sources' ),
    edgeCases: {
        //        AnimationClipCreator:      {
        //            output: './src/misc/AnimationClipCreator.js'
        //        },
        BufferSubdivisionModifier: {
            imports: [ 'Face3' ]
        },
        ColladaLoader:             {
            imports: [
                'DefaultLoadingManager',
                'Loader'
            ]
        },
        ColorNode:                 {
            imports: [ 'NodeMaterial' ]
        },
        CurveExtras:               {
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
        EffectComposer:            {
            imports: [ 'CopyShader' ]
        },
        GLNode:                    {
            imports:      [ '_Math' ],
            replacements: [
                [ 'this.uuid = Math.generateUUID();', 'this.uuid = _Math.generateUUID();' ]
            ]
        },
        Lut:                       {
            replacements: [
                [ 'ColorMapKeywords = ', 'var ColorMapKeywords = ' ]
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
                'AnimationUtils'
            ]
        },
        MarchingCubes:             {
            replacements: [
                [ 'edgeTable = new Int32Array', 'var edgeTable = new Int32Array' ],
                [ 'triTable = new Int32Array', 'var triTable = new Int32Array' ]
            ]
        },
        OBJLoader2:                {
            replacements: [
                [ 'if ( var OBJLoader2 === undefined ) { var OBJLoader2 = {} }', '' ]
            ]
        },
        LoaderSupport:                {
            replacements: [
                [ 'if ( var LoaderSupport === undefined ) { var LoaderSupport = {} }', 'var LoaderSupport = {}' ]
            ]
        },
        OceanShaders:              {
            imports: [ 'ShaderLib' ]
        },
        Octree:                    {
            imports:      [ 'Raycaster' ],
            replacements: [
                [ 'instanceof var OctreeNode', 'instanceof OctreeNode' ]
            ]
        },
        ParametricGeometries:      {
            exports: [ 'ParametricGeometries' ]
        },
        RGBELoader:                {
            replacements: [
                [ 'var HDRLoader =  RGBELoader', 'var RGBELoader' ],
                [ /(return null;[\s\n\r]+};)/g, '$1\nvar HDRLoader = RGBELoader;\n\n' ],
            ]

        },
        ShaderPass: {
            imports: [ 'UniformsUtils' ]
        },
        ShaderSkin:                {
            imports: [
                'UniformsUtils',
                'UniformsLib',
                'ShaderChunk'
            ]
        },
        ShaderTerrain:             {
            imports: [
                'UniformsUtils',
                'UniformsLib',
                'ShaderChunk'
            ]
        },
        Vector2Node:               {
            imports: [ 'NodeMaterial' ]
        },
        Vector3Node:               {
            imports: [ 'NodeMaterial' ]
        },
        Vector4Node:               {
            imports: [ 'NodeMaterial' ]
        },
        WebGLDeferredRenderer:     {
            replacements: [
                [ 'DeferredShaderChunk = ', 'var DeferredShaderChunk = ' ],
                [ 'ShaderDeferredCommon = ', 'var ShaderDeferredCommon = ' ],
                [ 'ShaderDeferred = ', 'var ShaderDeferred = ' ],
            ]
        },
        WebVR:                     {
            replacements: [
                [ 'var WEBVR', 'var WebVR' ]
            ]
        }
    }
}
