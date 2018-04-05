const path        = require( 'path' )
const buble       = require( 'rollup-plugin-buble' )
const uglify      = require( 'rollup-plugin-uglify-es' )

// const onProduction = process.env.BUILD || false
// const wantSourceMap = process.env.SOURCEMAP || false
// const format = process.env.FORMAT

module.exports = function rollupConfigure ( format, onProduction, wantSourceMap ) {
    const _format        = format || 'umd'
    const _onProduction  = onProduction || false
    const _wantSourceMap = wantSourceMap || false

    const fileName       = 'Three'
    const fileExtension  = (_onProduction) ? '.min.js' : '.js'
    const inputFilePath  = path.join( __dirname, '..', 'sources/' + fileName + '.js' )
    const outputFilePath = path.join( __dirname, '..', 'builds/' + fileName + '.' + _format + fileExtension )

    const banner = '// Made by Itee (https://github.com/Itee) with ES6 Convertor script\n\n'
    if( _format === 'cjs' ) {
        banner += 'var window = window || (function(){ console.warn("It seems you are using this package in a non-browser environment. Some dependencies that depending on global window variable could not work properly."); return {} })()\n\n'
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
                onProduction && uglify()
            ],

            // advanced options
            onwarn: function onWarn ( { loc, frame, message } ) {
                // print location if applicable
                if ( loc ) {
                    console.log("YES WE HAVE A LOC !!!");
                    console.warn( `${loc.file} (${loc.line}:${loc.column}) ${message}` )
                    if ( frame ) {
                        console.warn( frame )
                    }
                } else {
                    console.log("DAMNED NO LOC PROVIDE !!!");

                    console.warn( message )
                }
            },
            cache:  undefined,

            // danger zone
            acorn:         undefined,
            context:       undefined,
            moduleContext: {},
            legacy:        undefined
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
            indent:  '  ',
            strict:  true
        }
    }

}
