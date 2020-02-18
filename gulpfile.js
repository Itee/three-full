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
const karma   = require( 'karma' )

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

    return gulp.src( './node_modules/three/examples/jsm/postprocessing/EffectComposer.js' )
               .pipe( replace( [ [ /\/\*[\s\S]*?\*\//g, '' ] ] ) ) // Clear multiline comment
               .pipe( replace( [ [ 'var Pass = function () {', '/* START_COMMENT\nvar Pass = function () {' ] ] ) ) // Add multiline comment around pass class
               .pipe( replace( [ [ 'export { EffectComposer, Pass };', 'export { EffectComposer, Pass };\nEND_COMMENT */\nexport { EffectComposer };' ] ] ) )
               .pipe( replace( [ [ '\/\* START_COMMENT[\s\S]*END_COMMENT \*\/', '' ] ] ) ) // Then remove comment
               .pipe( replace( [ [ 'Mesh,', '' ] ] ) ) // Then extra imports
               .pipe( replace( [ [ 'OrthographicCamera,', '' ] ] ) ) // Then extra imports
               .pipe( replace( [ [ 'PlaneBufferGeometry,', '' ] ] ) ) // Then extra imports
               .pipe( gulp.dest( './node_modules/three/examples/jsm/postprocessing' ) )

} )

gulp.task( 'patch-three',
    gulp.parallel(
        'fix-effect-composer'
    )
)

/////////////////////
////// CLEAN ////////
/////////////////////

gulp.task( 'clean-builds', () => {

    return del( [
        './builds'
    ] )

} )

gulp.task( 'clean-sources', () => {

    return del( [
        './sources'
    ] )

} )

gulp.task( 'clean-tests', () => {

    return del( [
        './tests'
    ] )

} )

gulp.task( 'clean', gulp.parallel( 'clean-builds', 'clean-sources', 'clean-tests' ) )

/**
 * @method npm run lint
 * @description Will lint the sources files and try to fix the style when possible
 */
gulp.task( 'lint-sources', () => {

    const eslintConfig = require( './configs/eslint.conf.js' )
    const filesToLint  = [ './sources/**/*.js', '!./sources/libs/**' ]

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

gulp.task( 'lint', gulp.parallel( 'lint-sources', 'lint-tests' ) )

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
           copyLibs()
           copyWorkers()
           updateThreeExports()

           done()

       } )

    function copyPolyfills () {

        fs.writeFileSync( './sources/polyfills.js', fs.readFileSync( './node_modules/three/src/polyfills.js', 'utf8' ) )

        fs.mkdirSync('./sources/vr', { recursive: true })
        fs.writeFileSync( './sources/vr/HelioWebXRPolyfill.js', fs.readFileSync( './node_modules/three/examples/js/vr/HelioWebXRPolyfill.js', 'utf8' ) )

    }

    function copyShaderChunk () {

        fs.writeFileSync( './sources/renderers/shaders/ShaderChunk.js', fs.readFileSync( './node_modules/three/src/renderers/shaders/ShaderChunk.js', 'utf8' ) )

    }

    function copyLibs () {

        // From modules
        fs.mkdirSync('./sources/libs', { recursive: true })
        fs.writeFileSync( './sources/libs/chevrotain.module.min.js', fs.readFileSync( './node_modules/three/examples/jsm/libs/chevrotain.module.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/dat.gui.module.js', fs.readFileSync( './node_modules/three/examples/jsm/libs/dat.gui.module.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/gunzip.module.min.js', fs.readFileSync( './node_modules/three/examples/jsm/libs/gunzip.module.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/inflate.module.min.js', fs.readFileSync( './node_modules/three/examples/jsm/libs/inflate.module.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/mmdparser.module.js', fs.readFileSync( './node_modules/three/examples/jsm/libs/mmdparser.module.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/motion-controllers.module.js', fs.readFileSync( './node_modules/three/examples/jsm/libs/motion-controllers.module.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/stats.module.js', fs.readFileSync( './node_modules/three/examples/jsm/libs/stats.module.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/tween.module.min.js', fs.readFileSync( './node_modules/three/examples/jsm/libs/tween.module.min.js', 'utf8' ) )

        // From libs
        fs.mkdirSync('./sources/libs', { recursive: true })
        fs.writeFileSync( './sources/libs/ammo.js', fs.readFileSync( './node_modules/three/examples/js/libs/ammo.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/chevrotain.min.js', fs.readFileSync( './node_modules/three/examples/js/libs/chevrotain.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/dat.gui.min.js', fs.readFileSync( './node_modules/three/examples/js/libs/dat.gui.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/inflate.min.js', fs.readFileSync( './node_modules/three/examples/js/libs/inflate.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/jszip.min.js', fs.readFileSync( './node_modules/three/examples/js/libs/jszip.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/opentype.min.js', fs.readFileSync( './node_modules/three/examples/js/libs/opentype.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/stats.min.js', fs.readFileSync( './node_modules/three/examples/js/libs/stats.min.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/timeliner_gui.min.js', fs.readFileSync( './node_modules/three/examples/js/libs/timeliner_gui.min.js', 'utf8' ) )

        fs.mkdirSync('./sources/libs/basis', { recursive: true })
        fs.writeFileSync( './sources/libs/basis/basis_transcoder.js', fs.readFileSync( './node_modules/three/examples/js/libs/basis/basis_transcoder.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/basis/basis_transcoder.wasm', fs.readFileSync( './node_modules/three/examples/js/libs/basis/basis_transcoder.wasm', 'utf8' ) )
        fs.writeFileSync( './sources/libs/basis/README.md', fs.readFileSync( './node_modules/three/examples/js/libs/basis/README.md', 'utf8' ) )

        fs.mkdirSync('./sources/libs/draco', { recursive: true })
        fs.writeFileSync( './sources/libs/draco/draco_decoder.js', fs.readFileSync( './node_modules/three/examples/js/libs/draco/draco_decoder.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/draco/draco_decoder.wasm', fs.readFileSync( './node_modules/three/examples/js/libs/draco/draco_decoder.wasm', 'utf8' ) )
        fs.writeFileSync( './sources/libs/draco/draco_encoder.js', fs.readFileSync( './node_modules/three/examples/js/libs/draco/draco_encoder.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/draco/draco_wasm_wrapper.js', fs.readFileSync( './node_modules/three/examples/js/libs/draco/draco_wasm_wrapper.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/draco/README.md', fs.readFileSync( './node_modules/three/examples/js/libs/draco/README.md', 'utf8' ) )
        fs.mkdirSync('./sources/libs/draco/gltf', { recursive: true })
        fs.writeFileSync( './sources/libs/draco/gltf/draco_decoder.js', fs.readFileSync( './node_modules/three/examples/js/libs/draco/gltf/draco_decoder.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/draco/gltf/draco_decoder.wasm', fs.readFileSync( './node_modules/three/examples/js/libs/draco/gltf/draco_decoder.wasm', 'utf8' ) )
        fs.writeFileSync( './sources/libs/draco/gltf/draco_encoder.js', fs.readFileSync( './node_modules/three/examples/js/libs/draco/gltf/draco_encoder.js', 'utf8' ) )
        fs.writeFileSync( './sources/libs/draco/gltf/draco_wasm_wrapper.js', fs.readFileSync( './node_modules/three/examples/js/libs/draco/gltf/draco_wasm_wrapper.js', 'utf8' ) )

    }

    function copyWorkers () {

        fs.mkdirSync('./sources/loaders/obj2/worker/parallel/jsm/', { recursive: true })
        fs.writeFileSync( './sources/loaders/obj2/worker/parallel/jsm/OBJLoader2Worker.js', fs.readFileSync( './node_modules/three/examples/jsm/loaders/obj2/worker/parallel/jsm/OBJLoader2Worker.js', 'utf8' ) )

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
    const excludes    = [
        //        'shaders'
    ]

    const basePath     = path.join( __dirname, 'tests' )
    const filesPath    = fsUtils.getFilesPathsUnder( basePath )
    const allowedPaths = fsUtils.excludesFilesPaths( filesPath, excludes )
    const jsFilesPath  = fsUtils.filterJavascriptFiles( allowedPaths, ( path ) => {

        if ( path.includes( 'glsl' ) || !path.includes( '.js' ) || path.includes( '.unit.js' ) ) {
            return false
        }
        return true

    } )

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

                    const statement = `Three${Array.isArray(value) ? 
                        Object.values( value ).map( (property) => { 
                            return `['${property}']`
                        }).join('') 
                        : 
                        `['${value}']`}`
                    
                    return `
                            it( '${value} is bundlable', () => {
                                should.exist( ${statement} )
                            } )
                            
                            it( '${value} is instanciable', () => {
                                should.exist( new ${statement}(${args}) )
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
    const excludes    = [
        //        'shaders'
    ]

    const basePath     = path.join( __dirname, 'tests' )
    const filesPath    = fsUtils.getFilesPathsUnder( basePath )
    const allowedPaths = fsUtils.excludesFilesPaths( filesPath, excludes )
    const jsFilesPath  = fsUtils.filterJavascriptFiles( allowedPaths, ( path ) => {

        if ( path.includes( 'glsl' ) || !path.includes( '.js' ) || path.includes( '.unit.js' ) ) {
            return false
        }
        return true

    } )

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
                    <div id="container">
                        <h1 id="title"></h1>
                        <div id="messages"></div>
                    </div>
                    
                    <script type="application/javascript">
                        var _isOnError = false
                        window.onerror = function onErrorHandler( error ) {
                            
                            if(_isOnError) {
                                var messageElement = document.createElement( 'p' )
                                messageElement.innerHTML == error
                                document.getElementById('messages').appendChild( messageElement )
                                return
                            }
                            _isOnError = true
                            
                            document.body.style.backgroundColor = 'red'
                            document.getElementById('title').innerHTML = 'Error'
                            
                            var messageElement = document.createElement( 'p' )
                            messageElement.innerHTML == error
                            document.getElementById('messages').appendChild( messageElement )
                            
                        }
                    </script>
                    ${imports} 
                    <script type="application/javascript" src="./${fileName}.test.js"></script>
                    <script type="application/javascript">
                        /* global Three */
                        ${preRequise}
                        try {
                            
                            ${Object.values( exports ).map( function ( value ) {
                                const statement = `Three${Array.isArray(value) ? Object.values( value ).map( (property) => { return `['${property}']`}).join('') : `['${value}']`}`
                                return `var instance = new ${statement}()`
                            } ).join( '\n\t\t\t\t\t\t\t' )}
                            
                            onResult ( 'SUCCESS', 'Successfully instancing ${exports.toString()}', 'green' )
                    
                        } catch ( error ) {
                    
                            onResult ( 'ERROR', error.message, 'red' )
                    
                        }
                    
                        function onResult ( title, message, bgColor ) {
                    
                            document.body.style.backgroundColor = bgColor
                            document.getElementById('title').innerHTML = title
                            
                            var messageElement = document.createElement( 'p' )
                            messageElement.innerHTML = message
                            document.getElementById('messages').appendChild( messageElement )
                    
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
                    <div id="container">
                        <h1 id="title"></h1>
                        <div id="messages"></div>
                    </div>
                    
                    <script type="application/javascript">
                        var _isOnError = false
                        window.onerror = function onErrorHandler( error ) {
                            
                            if(_isOnError) {
                                var messageElement = document.createElement( 'p' )
                                messageElement.innerHTML = error
                                document.getElementById('messages').appendChild( messageElement )

                                return
                            }
                            
                            document.body.style.backgroundColor = 'red'
                            document.getElementById('title').innerHTML = 'Error'
                            
                            var messageElement = document.createElement( 'p' )
                            messageElement.innerHTML = error
                            document.getElementById('messages').appendChild( messageElement )
                            
                        }
                    </script>
                    <script type="application/javascript" src="builds/Three.iife.js"></script>
                    <script type="application/javascript">
                        /* global Three */
                        
                        if(Three) {
                            
                            document.body.style.backgroundColor = 'green'
                            document.getElementById('title').innerHTML = 'Three'
                            
                            var messageElement = document.createElement( 'p' )
                            messageElement.innerHTML = 'revision ' + Three.REVISION
                            document.getElementById('messages').appendChild( messageElement )
                            
                        }
                        
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
        'lint-sources',
        'build-three',
        'build-test',
        'lint-tests',
        'test'
    )
)
