/**
 * @file The gulp tasks file
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

const fs      = require( 'fs' )
const path    = require( 'path' )
const gulp    = require( 'gulp' )
const util    = require( 'gulp-util' )
const eslint  = require( 'gulp-eslint' )
const replace = require( 'gulp-batch-replace' )
const del     = require( 'del' )
const rollup  = require( 'rollup' )
const fsUtils = require( './utils' )
const karma     = require( 'karma' )

const log     = util.log
const colors  = util.colors
const red     = colors.red
const green   = colors.green
const blue    = colors.blue
const cyan    = colors.cyan
const yellow  = colors.yellow
const magenta = colors.magenta

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

/**
 * Remove the Pass object from Effect composer and create a new file for Pass class in
 * create-pass-file task
 */
gulp.task( 'fix-effect-composer', () => {

    return gulp.src( './node_modules/three/examples/js/postprocessing/EffectComposer.js' )
               .pipe( replace( [ [ 'THREE.Pass = function () {', '/*\n' ] ] ) )
               .pipe( replace( [ [ /console\.error\(\s?\'THREE.Pass:[\w\s'.:();}]+/g, '\n*/' ] ] ) )
               .pipe( gulp.dest( './node_modules/three/examples/js/postprocessing' ) )

} )

/**
 * See above
 */
gulp.task( 'create-pass-file', ( done ) => {

    const stringFile = 'THREE.Pass = function () {\n' +
        '\n' +
        '\t// if set to true, the pass is processed by the composer\n' +
        '\tthis.enabled = true;\n' +
        '\n' +
        '\t// if set to true, the pass indicates to swap read and write buffer after rendering\n' +
        '\tthis.needsSwap = true;\n' +
        '\n' +
        '\t// if set to true, the pass clears its buffer before rendering\n' +
        '\tthis.clear = false;\n' +
        '\n' +
        '\t// if set to true, the result of the pass is rendered to screen\n' +
        '\tthis.renderToScreen = false;\n' +
        '\n' +
        '};\n' +
        '\n' +
        'Object.assign( THREE.Pass.prototype, {\n' +
        '\n' +
        '\tsetSize: function ( width, height ) {},\n' +
        '\n' +
        '\trender: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {\n' +
        '\n' +
        '\t\tconsole.error( \'THREE.Pass: .render() must be implemented in derived pass.\' );\n' +
        '\n' +
        '\t}\n' +
        '\n' +
        '} );'

    fs.writeFile( "./node_modules/three/examples/js/postprocessing/Pass.js", stringFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "Pass.js was saved !" )
        done()

    } );

} )

/**
 * Add missing this statement in generate method of StructNode
 */
gulp.task( 'fix-struct-node', () => {

    return gulp.src( './node_modules/three/examples/js/nodes/core/StructNode.js' )
               .pipe( replace( [ [ '+ src +', '+ this.src +' ] ] ) )
               .pipe( gulp.dest( './node_modules/three/examples/js/nodes/core' ) )

} )

gulp.task( 'fix-buffer-geometry-util', () => {

    const replacement = 'for ( var attributeNameIndex = 0, numberOfAttributes = attributeNames.length ; attributeNameIndex < numberOfAttributes ; attributeNameIndex++  ) {\n' +
                            '\t\t\tvar name = attributeNames[ attributeNameIndex ];'

    return gulp.src( './node_modules/three/examples/js/utils/BufferGeometryUtils.js' )
               .pipe( replace( [ [ 'for ( var name of attributeNames ) {', replacement  ] ] ) )
               .pipe( gulp.dest( './node_modules/three/examples/js/utils' ) )

} )

gulp.task( 'patch-three',
    gulp.parallel(
        'fix-effect-composer',
        'create-pass-file',
        'fix-struct-node',
        'fix-buffer-geometry-util'
    )
)

/////////////////////
////// CLEAN ////////
/////////////////////

gulp.task( 'clean-builds', () => {

    return del( [
        './builds'
    ] )

})

gulp.task( 'clean-sources', () => {

    return del( [
        './sources'
    ] )

})

gulp.task( 'clean-tests', () => {

    return del( [
        './tests/**/*.js',
        './tests/**/*.html',
    ] )

})

gulp.task( 'clean', gulp.parallel('clean-builds', 'clean-sources', 'clean-tests') )

/**
 * @method npm run lint
 * @description Will lint the sources files and try to fix the style when possible
 */
gulp.task( 'lint-sources', () => {

    const eslintConfig = require( './configs/eslint.conf.js' )
    const filesToLint  = [ './sources/**/*.js' ]

    return gulp.src( filesToLint )
               .pipe( eslint( eslintConfig ) )
               .pipe( eslint.format( 'stylish' ) )
               .pipe( gulp.dest( './sources' ) )
               .pipe( eslint.failAfterError() )

} )

gulp.task( 'lint-tests', () => {

    const eslintConfig = require( './configs/eslint.conf.js' )
    const filesToLint  = [ './tests/**/*.js' ]

    return gulp.src( filesToLint )
               .pipe( eslint( eslintConfig ) )
               .pipe( eslint.format( 'stylish' ) )
               .pipe( gulp.dest( './tests' ) )
               .pipe( eslint.failAfterError() )

} )

gulp.task( 'lint', gulp.parallel('lint-sources', 'lint-tests') )

/////////////////////
///// CONVERT ///////
/////////////////////

gulp.task( 'convert-three', ( done ) => {

    const es6    = require( './es6-convertor' )
    const config = require( './configs/es6.conf' )

    es6.setInputs( config.inputs )
       .setExcludes( config.excludes )
       .setOutput( config.output )
       .setEdgeCases( config.edgeCases )
       .setBanner( config.banner )
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

        const imports = 'import \'./polyfills.js\';\n\n'
        const exports = es6.getAllExports( mainExporterFilePath )
        const data    = imports + exports

        fs.writeFileSync( mainExporterFilePath, data )

    }

} )

/////////////////////
////// BUILDS ///////
/////////////////////

gulp.task( 'build-test-javascript', ( done ) => {

    const configs = require( './configs/rollup.tests.conf' )

    nextBuild()

    function nextBuild () {
        'use strict'

        if ( configs.length === 0 ) {
            done()
            return
        }

        build( configs.pop(), nextBuild )

    }

    function build ( config, done ) {

        log( `Building ${config.input}` )

        rollup.rollup( config )
              .then( ( bundle ) => {

                  bundle.write( config.output )
                        .then( ( r ) => {
                            done()
                        } )
                        .catch( ( error ) => {
                            log( red( error ) )
                            done()
                        } )

              } )
              .catch( ( error ) => {
                  log( red( error ) )
                  done()
              } )

    }

} )

gulp.task( 'build-test-unit', ( done ) => {

    const unitsConfig = require( './configs/units.conf' )
    const excludes       = [
//        'shaders'
    ]

    const basePath     = path.join( __dirname, 'tests' )
    const filesPath    = fsUtils.getFilesPathsUnder( basePath )
    const allowedPaths = fsUtils.excludesFilesPaths( filesPath, excludes )
    const jsFilesPath  = fsUtils.filterJavascriptFiles( allowedPaths )

    for ( let pathIndex = 0, numberOfPaths = jsFilesPath.length ; pathIndex < numberOfPaths ; pathIndex++ ) {

        const filePath     = jsFilesPath[ pathIndex ]
        const dirPath      = path.dirname( filePath )
        const fileBaseName = path.basename( filePath )
        const fileName     = path.basename( filePath, '.test.js' )
        const outputPath   = path.join( dirPath, fileName + '.unit.js' )

        // Get exports from file then for each...
        const edgeCases  = unitsConfig[ fileName ] || {}
        const imports    = edgeCases.imports || ''
        const preRequise = edgeCases.preRequise || ''
        const args       = edgeCases.args || ''
        const exports    = edgeCases.exports || [ fileName ]

        const template = `
            /* global describe, it */
            describe( '${fileName}', () => {
                ${Object.values( exports ).map( function ( value ) {
                    
                    return `
                    it( '${value} is bundlable', () => {
                        should.exist( Three['${value}'] )
                    } )
                    
                    it( '${value} is instanciable', () => {
                        should.exist( new Three['${value}'](${args}) )
                    } )
                    `
        
                } ).join( '\n' )}
            } )
            `

        console.log( 'Create ' + outputPath )
        fs.writeFileSync( outputPath, template )

    }

    done()

} )

gulp.task( 'build-test-html', ( done ) => {

    const unitsConfig = require( './configs/units.conf' )
    const excludes       = [
        //        'shaders'
    ]

    const basePath     = path.join( __dirname, 'tests' )
    const filesPath    = fsUtils.getFilesPathsUnder( basePath )
    const allowedPaths = fsUtils.excludesFilesPaths( filesPath, excludes )
    const jsFilesPath  = fsUtils.filterJavascriptFiles( allowedPaths )

    for ( let pathIndex = 0, numberOfPaths = jsFilesPath.length ; pathIndex < numberOfPaths ; pathIndex++ ) {

        const filePath     = jsFilesPath[ pathIndex ]
        const dirPath      = path.dirname( filePath )
        const fileBaseName = path.basename( filePath )
        const fileName     = path.basename( filePath, '.test.js' )
        const outputPath   = path.join( dirPath, fileName + '.unit.html' )

        // Get exports from file then for each...
        const edgeCases  = unitsConfig[ fileName ] || {}
        const imports    = edgeCases.imports || ''
        const preRequise = edgeCases.preRequise || ''
        const args       = edgeCases.args || ''
        const exports    = edgeCases.exports || [ fileName ]

        let template = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>${fileName}</title>
                    <style>
                        html {
                            height: 100%;
                        }
                        body {
                            min-height: 100%;
                            /*display: table;*/
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 0;
                            text-align: center;
                        }
                    </style>
                </head>
                <body id="body">
                    ${imports} 
                    <script type="application/javascript" src="./${fileName}.test.js"></script>
                    <script type="application/javascript">
                        /* global Three */
                        ${preRequise}
                        try {
                            
                            ${Object.values( exports ).map( function ( value ) {
            return 'var instance = new Three["' + value + '"]()'
        } ).join( '\n\t\t\t\t\t\t\t' )}
                            
                            onResult ( 'SUCCESS', 'Successfully instancing ${exports.toString()}', 'green' )
                    
                        } catch ( error ) {
                    
                            onResult ( 'ERROR', error.message, 'red' )
                    
                        }
                    
                        function onResult ( title, message, bgColor ) {
                    
                            var container = document.createElement( 'div' )
                            document.body.appendChild( container )
                    
                            var titleElement = document.createElement( 'h1' )
                            titleElement.innerHTML += title
                            container.appendChild( titleElement )
                    
                            var messageElement = document.createElement( 'p' )
                            messageElement.innerHTML += message
                            container.appendChild( messageElement )
                    
                            document.body.style.backgroundColor = bgColor
                    
                        }
                    </script>
                </body>
            </html>
            `

        console.log( 'Create ' + outputPath )
        fs.writeFileSync( outputPath, template )

    }

    done()

} )

gulp.task( 'build-test-three', ( done ) => {

    const outputPath = path.join( __dirname, 'tests', 'Three.unit.html' )

    const template = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Three Unit</title>
                    <style>
                        html {
                            height: 100%;
                        }
                        body {
                            min-height: 100%;
                            /*display: table;*/
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 0;
                            text-align: center;
                        }
                    </style>
                </head>
                <body id="body">
                    <script type="application/javascript" src="../builds/Three.iife.js"></script>
                    <script type="application/javascript">
                        /* global Three */
                        var container = document.createElement( 'div' )
                        document.body.appendChild( container )
                
                        var titleElement = document.createElement( 'h1' )
                        titleElement.innerHTML += 'Three'
                        container.appendChild( titleElement )
                
                        var messageElement = document.createElement( 'p' )
                        messageElement.innerHTML += 'revision ' + Three.REVISION
                        container.appendChild( messageElement )
                
                        document.body.style.backgroundColor = 'green'
                    </script>
                </body>
            </html>
            `

    console.log( 'Create ' + outputPath )
    fs.writeFileSync( outputPath, template )

    done()

} )

gulp.task( 'build-test', gulp.series( 'clean-tests', 'build-test-javascript', 'build-test-unit', 'build-test-html', 'build-test-three' ) )

/**
 * @method npm run unit
 * @description Will run unit tests using karma
 */
gulp.task( 'test', ( done ) => {

    const karmaServer = new karma.Server( {
        configFile: `${__dirname}/configs/karma.units.conf.js`,
        singleRun:  true
    }, ( exitCode ) => {

        if ( exitCode !== 0 ) {
            done( `Karma server exit with code ${exitCode}` )
        } else {
            log( `Karma server exit with code ${exitCode}` )
            done()
        }

    } )

    karmaServer.on( 'browser_error', ( browser, error ) => {
        log( 'browser_error: ' + red( error.message ) )
    } )

    karmaServer.start()

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

gulp.task( 'build-three',
    gulp.series(
        'build-amd-dev',
        'build-amd-prod',
        'build-umd-dev',
        'build-umd-prod',
        'build-cjs-dev',
        'build-cjs-prod',
        'build-es-dev',
        'build-es-prod',
        'build-iife-dev',
        'build-iife-prod'
    )
)

//////////////////////
////// RELEASE ///////
//////////////////////

gulp.task( 'release',
    gulp.series(
        'clean',
        'convert-three',
        'build-test',
        'lint',
        'build-three'
    )
)
