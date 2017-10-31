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
        'ColladaLoader.js',                 // Missing export statement for Polygons
        'ParametricGeometries.js',          // Bug TorusKnotCurve from es6-exports
        'RollerCoaster.js',                 // invalid default exports with file name from es6-exports
        'OceanShaders.js',                  // Todo: check how to extends imported lib properly
        'RectAreaLightUniformsLib.js',      //
        'Volume.js',                        // damned eval
        'NRRDLoader.js'                     // Import Volume.js
    ],
    output:    path.join( __dirname, '..', 'sources' ),
    edgeCases: {
        AMFLoader:                 {
            replacements: [
                [ 'matname = matChildEl', 'matName = matChildEl' ]
            ]
        },
        //        AnimationClipCreator:      {
        //            output: './src/misc/AnimationClipCreator.js'
        //        },
        BufferSubdivisionModifier: {
            imports: [ 'import { Face3 } from \'../core/Face3.js\'' ]
        },
        ColorNode:                 {
            imports: [ 'import { NodeMaterial } from \'../../nodes/NodeMaterial\'' ]
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
            imports: [ 'import { CopyShader } from \'../shaders/CopyShader\'' ]
        },
        GLNode:                    {
            imports:      [ 'import { _Math } from \'../math/Math\'' ],
            replacements: [
                [ 'this.uuid = Math.generateUUID();', 'this.uuid = _Math.generateUUID();' ]
            ]
        },
        GLTFExporter:              {
            replacements: [
                [ 'function processMesh( mesh ) {', 'function processMesh( mesh ) {\nvar mode = undefined;' ],
                [ 'objectURL = URL.createObjectURL( blob );', 'var objectURL = URL.createObjectURL( blob );' ],
                [ 'base64data = reader.result;', 'var base64data = reader.result;' ]
            ]
        },
        Lut:                       {
            replacements: [
                [ 'ColorMapKeywords = ', 'var ColorMapKeywords = ' ]
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
        OceanShaders:              {
            imports: [ 'import { ShaderLib } from \'../renderers/shaders/ShaderLib.js\'' ]
        },
        Octree:                    {
            imports:      [ 'import { Raycaster } from \'./core/Raycaster.js\'' ],
            replacements: [
                [ 'instanceof var OctreeNode', 'instanceof OctreeNode' ]
            ]
        },
        ParametricGeometries:      {
            exports: '\nexport { ParametricGeometries };'
        },
        RGBELoader:                {
            replacements: [
                [ 'var HDRLoader =  RGBELoader', 'var RGBELoader' ],
                [ /(return null;[\s\n\r]+};)/g, '$1\nvar HDRLoader = RGBELoader;\n\n' ],
            ]

        },
        ShaderSkin:                {
            imports: [
                'import { UniformsUtils } from \'./renderers/shaders/UniformsUtils\'',
                'import { UniformsLib } from \'./renderers/shaders/UniformsLib\'',
                'import { ShaderChunk } from \'./renderers/shaders/ShaderChunk\''
            ]
        },
        ShaderTerrain:             {
            imports: [
                'import { UniformsUtils } from \'./renderers/shaders/UniformsUtils\'',
                'import { UniformsLib } from \'./renderers/shaders/UniformsLib\'',
                'import { ShaderChunk } from \'./renderers/shaders/ShaderChunk\''
            ]
        },
        Vector2Node:               {
            imports: [ 'import { NodeMaterial } from \'../../nodes/NodeMaterial\'' ]
        },
        Vector3Node:               {
            imports: [ 'import { NodeMaterial } from \'../../nodes/NodeMaterial\'' ]
        },
        Vector4Node:               {
            imports: [ 'import { NodeMaterial } from \'../../nodes/NodeMaterial\'' ]
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
        },
        XLoader:                   {
            replacements: [
                [ 'XLoader.XfileLoadMode.Vartex_init;', 'XLoader.XfileLoadMode.Vartex_init; var' ]
            ]
        },
    }
}