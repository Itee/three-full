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
        [ 'fix-effect-composer', 'create-pass-file' ],
        done
    )

} )

gulp.task( 'create-pass-file', ( done ) => {

    const PassFile = '' +
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

    fs.writeFile( "./node_modules/three/examples/js/postprocessing/Pass.js", PassFile, ( error ) => {

        if ( error ) {
            return console.error( error )
        }

        console.log( "The file was saved!" )
        done()

    } );

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
        './sources'
    ] )

} )

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
       .convert( () => {

           copyPolyfills()
           updateThreeExports()

           done()

       } )

    function copyPolyfills () {

        fs.writeFileSync( './sources/polyfills.js', fs.readFileSync( './node_modules/three/src/polyfills.js', 'utf8' ) )

    }

    function updateThreeExports () {

        const mainExportFile = './sources/Three.js'

        let exports = es6.getAllExports( '.\\src\\Three.js' ).replace( /import/g, 'export' )

        let data = '// Made by ES6 Convertor\n\n' +
            'import \'./polyfills.js\';\n\n' +
            exports

        fs.writeFileSync( mainExportFile, data )

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
        //        'build-es-prod', // Invalid char break it
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
