const path   = require( 'path' )
const buble  = require( 'rollup-plugin-buble' )
const terser = require( 'rollup-plugin-terser' ).terser

// const onProduction = process.env.BUILD || false
// const wantSourceMap = process.env.SOURCEMAP || false
// const format = process.env.FORMAT

module.exports = function rollupConfigure ( format, onProduction, wantSourceMap ) {
    const _format        = format || 'umd'
    const _onProduction  = onProduction || false
    const _wantSourceMap = !_onProduction

    const fileName       = 'Three'
    const fileExtension  = ( _onProduction ) ? '.min.js' : '.js'
    const inputFilePath  = path.join( __dirname, '..', 'sources/' + fileName + '.js' )
    const outputFilePath = path.join( __dirname, '..', 'builds/' + fileName + '.' + _format + fileExtension )

    let banner = '// Made by Itee (https://github.com/Itee) with ES6 Convertor script\n\n'

    // Add deprecation message
    if( !_onProduction ) {
        banner += `console.warn('[ThreeFull]: I am glad to annonce since Three release his examples files under JSM folder, this repository should be avoided. The first goal of this repository was to provided an alternative solution during this migration. From now, please consider to use Three.module.js instead even if i maintain this repository for my personal usage. Thanks for all ! Itee...');\n`
    }

    if ( _format === 'cjs' ) {
        banner += '' +
            'var DEBUG = (process && process.env && process.env.Debug);\n' +
            'var window = getGlobalWindowObject();\n' +
            '\n' +
            'function getGlobalWindowObject() {\n' +
            '   \n' +
            '   if( typeof Window !== \'undefined\' ) {\n' +
            '   \n' +
            '       if(window && window instanceof Window ) {\n' +
            '           return window;\n' +
            '       } else if ( global ) {\n' +
            '           \n' +
            '           if( global instanceof Window ) {\n' +
            '               return global;\n' +
            '           } else if ( global.hasOwnProperty(\'window\') && global.window instanceof Window ) {\n' +
            '               return global.window;\n' +
            '           } else {\n' +
            '               if( DEBUG ) { console.warn("Three-Full: Unable to assign global variable as window object. Some dependencies that depending on global window variable could not work properly."); }\n' +
            '               return {};\n' +
            '           }\n' +
            '           \n' +
            '       } else if ( GLOBAL ) {\n' +
            '           \n' +
            '           if( GLOBAL instanceof Window ) {\n' +
            '               return GLOBAL;\n' +
            '           } else if ( GLOBAL.hasOwnProperty(\'window\') && GLOBAL.window instanceof Window ) {\n' +
            '               return GLOBAL.window;\n' +
            '           } else {\n' +
            '               if( DEBUG ) { console.warn("Three-Full: Unable to assign GLOBAL variable as window object. Some dependencies that depending on global window variable could not work properly."); }\n' +
            '               return {};\n' +
            '           }\n' +
            '           \n' +
            '       } else if ( self ) {\n' +
            '           \n' +
            '           if( self instanceof Window ) {\n' +
            '               return self;\n' +
            '           } else if ( self.hasOwnProperty(\'window\') && self.window instanceof Window ) {\n' +
            '               return self.window;\n' +
            '           } else {\n' +
            '               if( DEBUG ) { console.warn("Three-Full: Unable to assign self variable as window object. Some dependencies that depending on global window variable could not work properly."); }\n' +
            '               return {};\n' +
            '           }\n' +
            '           \n' +
            '       } else {\n' +
            '           if( DEBUG ) { console.warn("Three-Full: Unable to find classic window global variable declaration in [window, global, GLOBAL or self]. Some dependencies that depending on global window variable could not work properly."); }\n' +
            '           return {};\n' +
            '       }\n' +
            '   \n' +
            '   } else {\n' +
            '       if( DEBUG ) { console.warn("Three-Full: It seems you are using this package in a non-browser environment. Some dependencies that depending on global window variable could not work properly."); }\n' +
            '       return {};\n' +
            '   }\n' +
            '}\n\n'
    }

    function glsl () {
        return {
            transform ( code, id ) {
                if ( !/\.glsl$/.test( id ) ) {
                    return
                }

                var transformedCode = 'export default ' + JSON.stringify(
                    code
                        .replace( /[ \t]*\/\/.*\n/g, '' )
                        .replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' )
                        .replace( /\n{2,}/g, '\n' )
                ) + ';'
                return {
                    code: transformedCode,
                    map:  { mappings: '' }
                }
            }
        }
    }

    return {
        inputOptions:  {

            // core options
            input:    inputFilePath,
            external: [],
            plugins:  [
                glsl(),
                buble(),
                onProduction && terser()
            ],

            // advanced options
            onwarn: function onWarn ( { loc, frame, message } ) {
                if ( loc ) {
                    // Ignore eval error from LoaderSupport, Volume
                    if ( loc.file.includes( 'LoaderSupport.js' ) ) { return }
                    if ( loc.file.includes( 'Volume.js' ) ) { return }

                    console.warn( `${loc.file} (${loc.line}:${loc.column}) ${message}` )
                    if ( frame ) {
                        console.warn( frame )
                    }
                } else {
                    console.warn( message )
                }
            },
            cache:  undefined,

            // danger zone
            acorn:         undefined,
            context:       undefined,
            moduleContext: {}
        },
        outputOptions: {
            // core options
            file:    outputFilePath,
            format:  format,
            name:    fileName,
            globals: {},

            // advanced options
            paths:     {},
            banner:    banner,
            footer:    '',
            intro:     '',
            outro:     '',
            sourcemap: _wantSourceMap,
            interop:   true,

            // danger zone
            //            exports: 'none',
            //            amd:     {},
            indent: '  ',
            strict: true
        }
    }

}
