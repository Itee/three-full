/**
 * @file The gulp tasks file
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

const fs          = require( 'fs' )
const runSequence = require( 'run-sequence' )
const gulp        = require( 'gulp' )
const util        = require( 'gulp-util' )
const replace     = require( 'gulp-batch-replace' )
const del         = require( 'del' )
const rollup      = require( 'rollup' )

gulp.task( 'help', ( done ) => {

    const log    = util.log
    const colors = util.colors
    const blue   = colors.blue
    const cyan   = colors.cyan
    const red    = colors.red

    log( 'Available commands using:', blue( 'npm run' ) )
    log( blue( 'npm run' ), cyan( 'help' ), ' - Display this help.' )
    log( blue( 'npm run' ), cyan( 'patch' ), ' - Will patch three package to fix some invalid state.', red( '( Must be run only once after installing three package ! )' ) )
    log( blue( 'npm run' ), cyan( 'clean' ), ' - Will delete builds and sources folders.' )
    log( blue( 'npm run' ), cyan( 'convert' ), ' - Will convert all three files that are not es6 module, to es6 module.' )
    log( blue( 'npm run' ), cyan( 'build' ), ' - Will build three in all module type, for dev and prod environments.' )

    log( '\n' )

    log( 'In case you have', blue( 'gulp' ), 'installed globally, you could use also:' )
    log( blue( 'gulp' ), cyan( 'build-amd-dev' ), ' - Build three as amd module in development environment.' )
    log( blue( 'gulp' ), cyan( 'build-amd-prod' ), ' - Build three as amd module in production environment.' )
    log( blue( 'gulp' ), cyan( 'build-umd-dev' ), ' - Build three as amd module in development environment.' )
    log( blue( 'gulp' ), cyan( 'build-umd-prod' ), ' - Build three as amd module in production environment.' )
    log( blue( 'gulp' ), cyan( 'build-cjs-dev' ), ' - Build three as amd module in development environment.' )
    log( blue( 'gulp' ), cyan( 'build-cjs-prod' ), ' - Build three as amd module in production environment.' )
    log( blue( 'gulp' ), cyan( 'build-es-dev' ), ' - Build three as amd module in development environment.' )
    log( blue( 'gulp' ), cyan( 'build-es-prod' ), ' - Build three as amd module in production environment.', red( '( Will fail ! )' ) )
    log( blue( 'gulp' ), cyan( 'build-iife-dev' ), ' - Build three as amd module in development environment.' )
    log( blue( 'gulp' ), cyan( 'build-iife-prod' ), ' - Build three as amd module in production environment.' )

    done()

} )

/////////////////////
////// PATCHS ///////
/////////////////////

gulp.task( 'patch-three', ( done ) => {

    runSequence(
        [
            'fix-effect-composer',
            'create-pass-file',
            'create-node-lib-declaration-file',
            'create-node-lib-implementation-file',
            'fix-node-lib-export',
            'create-function-node-declaration-file',
            'create-function-node-implementation-file',
            'fix-function-node-export',
            'fix-camera-node'
        ],
        done
    )

} )

gulp.task( 'create-pass-file', ( done ) => {

    const stringFile = '' +
        'var Pass = function () {\n' +
        '\tthis.enabled = true;\n' +
        '\tthis.needsSwap = true;\n' +
        '\tthis.clear = false;\n' +
        '\tthis.renderToScreen = false;\n' +
        '};\n' +
        '\n' +
        'Object.assign( Pass.prototype, {\n' +
        '\tsetSize: function( width, height ) {},\n' +
        '\trender: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {\n' +
        '\t\tconsole.error( \'THREE.Pass: .render() must be implemented in derived pass.\' );\n' +
        '\t}\n' +
        '} );'

    fs.writeFile( "./node_modules/three/examples/js/postprocessing/Pass.js", stringFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "Pass.js was saved !" )
        done()

    } );

} )

gulp.task( 'create-node-lib-declaration-file', ( done ) => {

    const stringFile = '/**\n' +
        ' * @author [Tristan Valcke]{@link https://github.com/Itee}\n' +
        ' * @author sunag / http://www.sunag.com.br/\n' +
        ' */\n' +
        '\n' +
        'var NodeLib = {\n' +
        '\n' +
        '\tnodes: {},\n' +
        '\tkeywords: {},\n' +
        '\n' +
        '\tadd: function( node ) {\n' +
        '\n' +
        '\t\tthis.nodes[ node.name ] = node;\n' +
        '\n' +
        '\t},\n' +
        '\n' +
        '\taddKeyword: function( name, callback, cache ) {\n' +
        '\n' +
        '\t\tcache = cache !== undefined ? cache : true;\n' +
        '\n' +
        '\t\tthis.keywords[ name ] = { callback : callback, cache : cache };\n' +
        '\n' +
        '\t},\n' +
        '\n' +
        '\tremove: function( node ) {\n' +
        '\n' +
        '\t\tdelete this.nodes[ node.name ];\n' +
        '\n' +
        '\t},\n' +
        '\n' +
        '\tremoveKeyword: function( name ) {\n' +
        '\n' +
        '\t\tdelete this.keywords[ name ];\n' +
        '\n' +
        '\t},\n' +
        '\n' +
        '\tget: function( name ) {\n' +
        '\n' +
        '\t\treturn this.nodes[ name ];\n' +
        '\n' +
        '\t},\n' +
        '\n' +
        '\tgetKeyword: function( name, material ) {\n' +
        '\n' +
        '\t\treturn this.keywords[ name ].callback.call( this, material );\n' +
        '\n' +
        '\t},\n' +
        '\n' +
        '\tgetKeywordData: function( name ) {\n' +
        '\n' +
        '\t\treturn this.keywords[ name ];\n' +
        '\n' +
        '\t},\n' +
        '\n' +
        '\tcontains: function( name ) {\n' +
        '\n' +
        '\t\treturn this.nodes[ name ] != undefined;\n' +
        '\n' +
        '\t},\n' +
        '\n' +
        '\tcontainsKeyword: function( name ) {\n' +
        '\n' +
        '\t\treturn this.keywords[ name ] != undefined;\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '};\n' +
        '\n' +
        'export { NodeLib }\n'

    fs.writeFile( "./node_modules/three/examples/js/nodes/NodeLib_Declaration.js", stringFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "NodeLib_Declaration.js was saved!" )
        done()

    } );

} )

gulp.task( 'create-node-lib-implementation-file', ( done ) => {

    const stringFile = '/**\n' +
        ' * @author [Tristan Valcke]{@link https://github.com/Itee}\n' +
        ' * @author sunag / http://www.sunag.com.br/\n' +
        ' */\n' +
        '\n' +
        'import { NodeLib } from \'./NodeLib_Declaration\'\n' +
        'import { UVNode } from \'./accessors/UVNode.js\'\n' +
        'import { PositionNode } from \'./accessors/PositionNode.js\'\n' +
        'import { NormalNode } from \'./accessors/NormalNode.js\'\n' +
        'import { TimerNode } from \'./utils/TimerNode.js\'\n' +
        'import { ConstNode } from \'./ConstNode.js\'\n' +
        '\n' +
        '// Fix circular dependency, see #2\n' +
        'import { FunctionNode } from \'./FunctionNode\'\n' +
        '\n' +
        '\n' +
        '//\n' +
        '//\tKeywords\n' +
        '//\n' +
        '\n' +
        'NodeLib.addKeyword( \'uv\', function() {\n' +
        '\n' +
        '\treturn new UVNode();\n' +
        '\n' +
        '} );\n' +
        '\n' +
        'NodeLib.addKeyword( \'uv2\', function() {\n' +
        '\n' +
        '\treturn new UVNode( 1 );\n' +
        '\n' +
        '} );\n' +
        '\n' +
        'NodeLib.addKeyword( \'position\', function() {\n' +
        '\n' +
        '\treturn new PositionNode();\n' +
        '\n' +
        '} );\n' +
        '\n' +
        'NodeLib.addKeyword( \'worldPosition\', function() {\n' +
        '\n' +
        '\treturn new PositionNode( PositionNode.WORLD );\n' +
        '\n' +
        '} );\n' +
        '\n' +
        'NodeLib.addKeyword( \'normal\', function() {\n' +
        '\n' +
        '\treturn new NormalNode();\n' +
        '\n' +
        '} );\n' +
        '\n' +
        'NodeLib.addKeyword( \'worldNormal\', function() {\n' +
        '\n' +
        '\treturn new NormalNode( NormalNode.WORLD );\n' +
        '\n' +
        '} );\n' +
        '\n' +
        'NodeLib.addKeyword( \'viewPosition\', function() {\n' +
        '\n' +
        '\treturn new PositionNode( NormalNode.VIEW );\n' +
        '\n' +
        '} );\n' +
        '\n' +
        'NodeLib.addKeyword( \'viewNormal\', function() {\n' +
        '\n' +
        '\treturn new NormalNode( NormalNode.VIEW );\n' +
        '\n' +
        '} );\n' +
        '\n' +
        'NodeLib.addKeyword( \'time\', function() {\n' +
        '\n' +
        '\treturn new TimerNode();\n' +
        '\n' +
        '} );\n' +
        '\n' +
        '//\n' +
        '//\tLuma\n' +
        '//\n' +
        '\n' +
        'NodeLib.add( new ConstNode( "vec3 LUMA vec3(0.2125, 0.7154, 0.0721)" ) );\n' +
        '\n' +
        '//\n' +
        '//\tNormalMap\n' +
        '//\n' +
        '\n' +
        'NodeLib.add( new FunctionNode( [\n' +
        '\t// Per-Pixel Tangent Space Normal Mapping\n' +
        '\t// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n' +
        '\t"vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 map, vec2 mUv, vec2 scale ) {",\n' +
        '\t"\tvec3 q0 = dFdx( eye_pos );",\n' +
        '\t"\tvec3 q1 = dFdy( eye_pos );",\n' +
        '\t"\tvec2 st0 = dFdx( mUv.st );",\n' +
        '\t"\tvec2 st1 = dFdy( mUv.st );",\n' +
        '\t"\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );",\n' +
        '\t"\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );",\n' +
        '\t"\tvec3 N = normalize( surf_norm );",\n' +
        '\t"\tvec3 mapN = map * 2.0 - 1.0;",\n' +
        '\t"\tmapN.xy = scale * mapN.xy;",\n' +
        '\t"\tmat3 tsn = mat3( S, T, N );",\n' +
        '\t"\treturn normalize( tsn * mapN );",\n' +
        '\t"}"\n' +
        '].join( "\\n" ), null, { derivatives: true } ) );\n' +
        '\n' +
        '//\n' +
        '//\tNoise\n' +
        '//\n' +
        '\n' +
        'NodeLib.add( new FunctionNode( [\n' +
        '\t"float snoise(vec2 co) {",\n' +
        '\t"\treturn fract( sin( dot(co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );",\n' +
        '\t"}"\n' +
        '].join( "\\n" ) ) );\n' +
        '\n' +
        '//\n' +
        '//\tHue\n' +
        '//\n' +
        '\n' +
        'NodeLib.add( new FunctionNode( [\n' +
        '\t"vec3 hue_rgb(vec3 rgb, float adjustment) {",\n' +
        '\t"\tconst mat3 RGBtoYIQ = mat3(0.299, 0.587, 0.114, 0.595716, -0.274453, -0.321263, 0.211456, -0.522591, 0.311135);",\n' +
        '\t"\tconst mat3 YIQtoRGB = mat3(1.0, 0.9563, 0.6210, 1.0, -0.2721, -0.6474, 1.0, -1.107, 1.7046);",\n' +
        '\t"\tvec3 yiq = RGBtoYIQ * rgb;",\n' +
        '\t"\tfloat hue = atan(yiq.z, yiq.y) + adjustment;",\n' +
        '\t"\tfloat chroma = sqrt(yiq.z * yiq.z + yiq.y * yiq.y);",\n' +
        '\t"\treturn YIQtoRGB * vec3(yiq.x, chroma * cos(hue), chroma * sin(hue));",\n' +
        '\t"}"\n' +
        '].join( "\\n" ) ) );\n' +
        '\n' +
        '//\n' +
        '//\tSaturation\n' +
        '//\n' +
        '\n' +
        'NodeLib.add( new FunctionNode( [\n' +
        '\t// Algorithm from Chapter 16 of OpenGL Shading Language\n' +
        '\t"vec3 saturation_rgb(vec3 rgb, float adjustment) {",\n' +
        '\t"\tvec3 intensity = vec3(dot(rgb, LUMA));",\n' +
        '\t"\treturn mix(intensity, rgb, adjustment);",\n' +
        '\t"}"\n' +
        '].join( "\\n" ) ) );\n' +
        '\n' +
        '//\n' +
        '//\tLuminance\n' +
        '//\n' +
        '\n' +
        'NodeLib.add( new FunctionNode( [\n' +
        '\t// Algorithm from Chapter 10 of Graphics Shaders\n' +
        '\t"float luminance_rgb(vec3 rgb) {",\n' +
        '\t"\treturn dot(rgb, LUMA);",\n' +
        '\t"}"\n' +
        '].join( "\\n" ) ) );\n' +
        '\n' +
        '//\n' +
        '//\tVibrance\n' +
        '//\n' +
        '\n' +
        'NodeLib.add( new FunctionNode( [\n' +
        '\t// Shader by Evan Wallace adapted by @lo-th\n' +
        '\t"vec3 vibrance_rgb(vec3 rgb, float adjustment) {",\n' +
        '\t"\tfloat average = (rgb.r + rgb.g + rgb.b) / 3.0;",\n' +
        '\t"\tfloat mx = max(rgb.r, max(rgb.g, rgb.b));",\n' +
        '\t"\tfloat amt = (mx - average) * (-3.0 * adjustment);",\n' +
        '\t"\treturn mix(rgb.rgb, vec3(mx), amt);",\n' +
        '\t"}"\n' +
        '].join( "\\n" ) ) );\n' +
        '\n' +
        'export { NodeLib }\n'

    fs.writeFile( "./node_modules/three/examples/js/nodes/NodeLib_Implementation.js", stringFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "NodeLib_Implementation.js was saved !" )
        done()

    } );

} )

gulp.task( 'fix-node-lib-export', ( done ) => {

    const stringFile = '/**\n' +
        ' * @author [Tristan Valcke]{@link https://github.com/Itee}\n' +
        ' * @author sunag / http://www.sunag.com.br/\n' +
        ' */\n' +
        '\n' +
        'export { NodeLib } from \'./NodeLib_Implementation\'\n'

    fs.writeFile( "./node_modules/three/examples/js/nodes/NodeLib.js", stringFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "NodeLib.js was overrided !" )
        done()

    } );

} )

gulp.task( 'create-function-node-declaration-file', ( done ) => {

    const stringFile = '/**\n' +
        ' * @author [Tristan Valcke]{@link https://github.com/Itee}\n' +
        ' * @author sunag / http://www.sunag.com.br/\n' +
        ' * @thanks bhouston / https://clara.io/\n' +
        ' */\n' +
        '\n' +
        'import { TempNode } from \'./TempNode.js\'\n' +
        '\n' +
        'var FunctionNode = function( src, includesOrType, extensionsOrIncludes, keywordsOrExtensions ) {\n' +
        '\n' +
        '\tsrc = src || \'\';\n' +
        '\n' +
        '\tthis.isMethod = typeof includesOrType !== "string";\n' +
        '\tthis.useKeywords = true;\n' +
        '\n' +
        '\tTempNode.call( this, this.isMethod ? null : includesOrType );\n' +
        '\n' +
        '\tif ( this.isMethod ) this.eval( src, includesOrType, extensionsOrIncludes, keywordsOrExtensions );\n' +
        '\telse this.eval( src, extensionsOrIncludes, keywordsOrExtensions );\n' +
        '\n' +
        '};\n' +
        '\n' +
        'FunctionNode.rDeclaration = /^([a-z_0-9]+)\\s([a-z_0-9]+)\\s?\\((.*?)\\)/i;\n' +
        'FunctionNode.rProperties = /[a-z_0-9]+/ig;\n' +
        '\n' +
        'FunctionNode.prototype = Object.create( TempNode.prototype );\n' +
        'FunctionNode.prototype.constructor = FunctionNode;\n' +
        '\n' +
        'FunctionNode.prototype.eval = function( src, includes, extensions, keywords ) {\n' +
        '\n' +
        '\tsrc = ( src || \'\' ).trim();\n' +
        '\n' +
        '\tthis.includes = includes || [];\n' +
        '\tthis.extensions = extensions || {};\n' +
        '\tthis.keywords = keywords || {};\n' +
        '\n' +
        '\tif ( this.isMethod ) {\n' +
        '\n' +
        '\t\tvar match = src.match( FunctionNode.rDeclaration );\n' +
        '\n' +
        '\t\tthis.inputs = [];\n' +
        '\n' +
        '\t\tif ( match && match.length == 4 ) {\n' +
        '\n' +
        '\t\t\tthis.type = match[ 1 ];\n' +
        '\t\t\tthis.name = match[ 2 ];\n' +
        '\n' +
        '\t\t\tvar inputs = match[ 3 ].match( FunctionNode.rProperties );\n' +
        '\n' +
        '\t\t\tif ( inputs ) {\n' +
        '\n' +
        '\t\t\t\tvar i = 0;\n' +
        '\n' +
        '\t\t\t\twhile ( i < inputs.length ) {\n' +
        '\n' +
        '\t\t\t\t\tvar qualifier = inputs[ i ++ ];\n' +
        '\t\t\t\t\tvar type, name;\n' +
        '\n' +
        '\t\t\t\t\tif ( qualifier == \'in\' || qualifier == \'out\' || qualifier == \'inout\' ) {\n' +
        '\n' +
        '\t\t\t\t\t\ttype = inputs[ i ++ ];\n' +
        '\n' +
        '\t\t\t\t\t} else {\n' +
        '\n' +
        '\t\t\t\t\t\ttype = qualifier;\n' +
        '\t\t\t\t\t\tqualifier = \'\';\n' +
        '\n' +
        '\t\t\t\t\t}\n' +
        '\n' +
        '\t\t\t\t\tname = inputs[ i ++ ];\n' +
        '\n' +
        '\t\t\t\t\tthis.inputs.push( {\n' +
        '\t\t\t\t\t\tname : name,\n' +
        '\t\t\t\t\t\ttype : type,\n' +
        '\t\t\t\t\t\tqualifier : qualifier\n' +
        '\t\t\t\t\t} );\n' +
        '\n' +
        '\t\t\t\t}\n' +
        '\n' +
        '\t\t\t}\n' +
        '\n' +
        '\t\t} else {\n' +
        '\n' +
        '\t\t\tthis.type = \'\';\n' +
        '\t\t\tthis.name = \'\';\n' +
        '\n' +
        '\t\t}\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '\tthis.value = src;\n' +
        '\n' +
        '};\n' +
        '\n' +
        'export { FunctionNode }\n'

    fs.writeFile( "./node_modules/three/examples/js/nodes/FunctionNode_Declaration.js", stringFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "FunctionNode_Declaration.js was saved !" )
        done()

    } );

} )

gulp.task( 'create-function-node-implementation-file', ( done ) => {

    const stringFile = '/**\n' +
        ' * @author [Tristan Valcke]{@link https://github.com/Itee}\n' +
        ' * @author sunag / http://www.sunag.com.br/\n' +
        ' * @thanks bhouston / https://clara.io/\n' +
        ' */\n' +
        '\n' +
        'import { FunctionNode } from \'./FunctionNode_Declaration.js\'\n' +
        '\n' +
        '// Fix circular dependency, see #2\n' +
        'import { NodeLib } from \'../nodes/NodeLib.js\'\n' +
        '\n' +
        'FunctionNode.prototype.isShared = function( builder, output ) {\n' +
        '\n' +
        '\treturn ! this.isMethod;\n' +
        '\n' +
        '};\n' +
        '\n' +
        'FunctionNode.prototype.getType = function( builder ) {\n' +
        '\n' +
        '\treturn builder.getTypeByFormat( this.type );\n' +
        '\n' +
        '};\n' +
        '\n' +
        'FunctionNode.prototype.getInputByName = function( name ) {\n' +
        '\n' +
        '\tvar i = this.inputs.length;\n' +
        '\n' +
        '\twhile ( i -- ) {\n' +
        '\n' +
        '\t\tif ( this.inputs[ i ].name === name )\n' +
        '\t\t\treturn this.inputs[ i ];\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '};\n' +
        '\n' +
        'FunctionNode.prototype.getIncludeByName = function( name ) {\n' +
        '\n' +
        '\tvar i = this.includes.length;\n' +
        '\n' +
        '\twhile ( i -- ) {\n' +
        '\n' +
        '\t\tif ( this.includes[ i ].name === name )\n' +
        '\t\t\treturn this.includes[ i ];\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '};\n' +
        '\n' +
        'FunctionNode.prototype.generate = function( builder, output ) {\n' +
        '\n' +
        '\tvar match, offset = 0, src = this.value;\n' +
        '\n' +
        '\tfor ( var i = 0; i < this.includes.length; i ++ ) {\n' +
        '\n' +
        '\t\tbuilder.include( this.includes[ i ], this );\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '\tfor ( var ext in this.extensions ) {\n' +
        '\n' +
        '\t\tbuilder.material.extensions[ ext ] = true;\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '\twhile ( match = FunctionNode.rProperties.exec( this.value ) ) {\n' +
        '\n' +
        '\t\tvar prop = match[ 0 ], isGlobal = this.isMethod ? ! this.getInputByName( prop ) : true;\n' +
        '\t\tvar reference = prop;\n' +
        '\n' +
        '\t\tif ( this.keywords[ prop ] || ( this.useKeywords && isGlobal && NodeLib.containsKeyword( prop ) ) ) {\n' +
        '\n' +
        '\t\t\tvar node = this.keywords[ prop ];\n' +
        '\n' +
        '\t\t\tif ( ! node ) {\n' +
        '\n' +
        '\t\t\t\tvar keyword = NodeLib.getKeywordData( prop );\n' +
        '\n' +
        '\t\t\t\tif ( keyword.cache ) node = builder.keywords[ prop ];\n' +
        '\n' +
        '\t\t\t\tnode = node || NodeLib.getKeyword( prop, builder );\n' +
        '\n' +
        '\t\t\t\tif ( keyword.cache ) builder.keywords[ prop ] = node;\n' +
        '\n' +
        '\t\t\t}\n' +
        '\n' +
        '\t\t\treference = node.build( builder );\n' +
        '\n' +
        '\t\t}\n' +
        '\n' +
        '\t\tif ( prop != reference ) {\n' +
        '\n' +
        '\t\t\tsrc = src.substring( 0, match.index + offset ) + reference + src.substring( match.index + prop.length + offset );\n' +
        '\n' +
        '\t\t\toffset += reference.length - prop.length;\n' +
        '\n' +
        '\t\t}\n' +
        '\n' +
        '\t\tif ( this.getIncludeByName( reference ) === undefined && NodeLib.contains( reference ) ) {\n' +
        '\n' +
        '\t\t\tbuilder.include( NodeLib.get( reference ) );\n' +
        '\n' +
        '\t\t}\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '\tif ( output === \'source\' ) {\n' +
        '\n' +
        '\t\treturn src;\n' +
        '\n' +
        '\t} else if ( this.isMethod ) {\n' +
        '\n' +
        '\t\tbuilder.include( this, false, src );\n' +
        '\n' +
        '\t\treturn this.name;\n' +
        '\n' +
        '\t} else {\n' +
        '\n' +
        '\t\treturn builder.format( "(" + src + ")", this.getType( builder ), output );\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '};\n' +
        '\n' +
        'export { FunctionNode }\n'

    fs.writeFile( "./node_modules/three/examples/js/nodes/FunctionNode_Implementation.js", stringFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "FunctionNode_Implementation.js was saved !" )
        done()

    } );

} )

gulp.task( 'fix-function-node-export', ( done ) => {

    const stringFile = '/**\n' +
        ' * @author [Tristan Valcke]{@link https://github.com/Itee}\n' +
        ' * @author sunag / http://www.sunag.com.br/\n' +
        ' * @thanks bhouston / https://clara.io/\n' +
        ' */\n' +
        '\n' +
        'export { FunctionNode } from \'./FunctionNode_Implementation\'\n'

    fs.writeFile( "./node_modules/three/examples/js/nodes/FunctionNode.js", stringFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "FunctionNode.js was overrided !" )
        done()

    } );

} )

gulp.task( 'fix-camera-node', () => {

    return gulp.src( './node_modules/three/examples/js/nodes/accessors/CameraNode.js' )
               .pipe( replace( [ [ 'camera ? camera.near : 1', 'this.camera ? this.camera.near : 1' ] ] ) )
               .pipe( replace( [ [ 'camera ? camera.far : 1200', 'this.camera ? this.camera.far : 1200' ] ] ) )
               .pipe( replace( [ [ 'this.near.number = camera.near;', 'this.near.number = this.camera.near;' ] ] ) )
               .pipe( replace( [ [ 'this.far.number = camera.far;', 'this.far.number = this.camera.far;' ] ] ) )
               .pipe( gulp.dest( './node_modules/three/examples/js/nodes/accessors' ) )

} )

gulp.task( 'fix-effect-composer', () => {

    return gulp.src( './node_modules/three/examples/js/postprocessing/EffectComposer.js' )
               .pipe( replace( [ [ 'THREE.Pass = function () {', '/*\n' ] ] ) )
               .pipe( replace( [ [ /console\.error\(\s?\'THREE.Pass:[\w\s'.:();}]+/g, '\n*/' ] ] ) )
               .pipe( gulp.dest( './node_modules/three/examples/js/postprocessing' ) )

} )

/////////////////////
////// CLEAN ////////
/////////////////////

gulp.task( 'clean', () => {

    return del( [
        './builds',
        './sources',
        './tests/**/*.js',
    ] )

} )

/////////////////////
///// CONVERT ///////
/////////////////////

gulp.task( 'convert-three', ( done ) => {

    //	const acorn = require( 'acorn' )
    //
    //	const file = fs.readFileSync( './node_modules/three/examples/js/animation/CCDIKSolver.js', 'utf8' )
    //
    //	const result = acorn.parse( file, { sourceType: 'module' } )
    //
    //	console.log( result )

    const es6    = require( './es6-convertor' )
    const config = require( './configs/es6.conf' )

    es6.setInputs( config.inputs )
       .setExcludes( config.excludes )
       .setOutput( config.output )
       .setEdgeCases( config.edgeCases )
       .convert( () => {

           copyPolyfills()
           copyShaderChunk()
           updateThreeExports()

           done()

       } )

    function copyPolyfills () {

        fs.writeFileSync( './sources/polyfills.js', fs.readFileSync( './node_modules/three/src/polyfills.js', 'utf8' ) )

    }

    function copyShaderChunk () {

        fs.writeFileSync( './sources/renderers/shaders/ShaderChunk.js', fs.readFileSync( './node_modules/three/src/renderers/shaders/ShaderChunk.js', 'utf8' ) )

    }

    function updateThreeExports () {

        const mainExporterFilePath = './sources/Three.js'
        const exports              = es6.getAllExports( mainExporterFilePath )

        let data = '// Made by Itee (https://github.com/Itee) with ES6 Convertor script\n\n' +
            'import \'./polyfills.js\';\n\n' +
            exports

        fs.writeFileSync( mainExporterFilePath, data )

    }

} )

/////////////////////
////// BUILDS ///////
/////////////////////

gulp.task( 'build-three', ( done ) => {

    runSequence(
        'build-amd-dev',
        'build-amd-prod',
        'build-umd-dev',
        'build-umd-prod',
        'build-cjs-dev',
        'build-cjs-prod',
        'build-es-dev',
        'build-es-prod',
        'build-iife-dev',
        'build-iife-prod',
        done
    )

} )

gulp.task( 'build-amd-dev', ( done ) => {

    const onProduction  = false
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'amd', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )
gulp.task( 'build-amd-prod', ( done ) => {

    const onProduction  = true
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'amd', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )

gulp.task( 'build-umd-dev', ( done ) => {

    const onProduction  = false
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'umd', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )
gulp.task( 'build-umd-prod', ( done ) => {

    const onProduction  = true
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'umd', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )

gulp.task( 'build-cjs-dev', ( done ) => {

    const onProduction  = false
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'cjs', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )
gulp.task( 'build-cjs-prod', ( done ) => {

    const onProduction  = true
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'cjs', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )

gulp.task( 'build-es-dev', ( done ) => {

    const onProduction  = false
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'es', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )
gulp.task( 'build-es-prod', ( done ) => {

    const onProduction  = true
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'es', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error, other ) => {
                        console.error( error )
                        console.error( error.code )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )

gulp.task( 'build-iife-dev', ( done ) => {

    const onProduction  = false
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'iife', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )
gulp.task( 'build-iife-prod', ( done ) => {

    const onProduction  = true
    const wantSourceMap = false
    const config        = require( './configs/rollup.conf.js' )( 'iife', onProduction, wantSourceMap )

    rollup.rollup( config.inputOptions )
          .then( ( bundle ) => {

              bundle.write( config.outputOptions )
                    .then( () => {
                        done()
                    } )
                    .catch( ( error ) => {
                        console.error( error )
                        done()
                    } )

          } )
          .catch( ( error ) => {
              console.error( error )
              done()
          } )

} )

//////////////////////
////// RELEASE ///////
//////////////////////

gulp.task( 'release', ( done ) => {

    runSequence(
        'clean',
        'convert-three',
        'build-three',
        done
    )

} )
