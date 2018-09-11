/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

const fs   = require( 'fs' )
const path = require( 'path' )

function _fileExistForPath ( filePath ) {

    return fs.existsSync( filePath )

}

function _getFilesPathsUnder ( filePaths ) {

    let files = []

    if ( Array.isArray( filePaths ) ) {

        let filePath = undefined
        for ( let pathIndex = 0, numberOfPaths = filePaths.length ; pathIndex < numberOfPaths ; pathIndex++ ) {

            filePath = filePaths[ pathIndex ]
            checkStateOf( filePath )

        }

    } else {

        checkStateOf( filePaths )

    }

    return files

    function getFilesPathsUnderFolder ( folder ) {

        fs.readdirSync( folder ).forEach( ( name ) => {

            const filePath = path.resolve( folder, name )
            checkStateOf( filePath )

        } )

    }

    function checkStateOf ( filePath ) {

        if ( !_fileExistForPath( filePath ) ) {
            console.error( 'Invalid file path "' + filePath + '"' )
            return
        }

        const stats = fs.statSync( filePath )
        if ( stats.isFile() ) {

            files.push( filePath )

        } else if ( stats.isDirectory() ) {

            Array.prototype.push.apply( files, getFilesPathsUnderFolder( filePath ) )

        } else {

            console.error( "Invalid stat object !" )

        }

    }

}

/**
 * Will create an array without the strings in filePaths that are matched in excludes paths
 *
 * @param {Array.<string>} filePaths - An array of string to clean
 * @param {Array.<string>} excludes - The paths to remove
 * @return {Array.<string>} The cleaned filePaths of excludes paths
 * @private
 */
function _excludesFilesPaths ( filePaths, excludes ) {

    let filteredFilesPath = []

    let filePath = undefined
    for ( let filePathIndex = 0, numberOfFilePaths = filePaths.length ; filePathIndex < numberOfFilePaths ; filePathIndex++ ) {
        filePath = filePaths[ filePathIndex ]

        if ( isExclude( filePath ) ) {
            continue
        }

        filteredFilesPath.push( filePath )

    }

    return filteredFilesPath

    function isExclude ( path ) {

        let isExclude      = false
        let excludePattern = undefined
        for ( let i = 0, pathLength = excludes.length ; i < pathLength ; i++ ) {

            excludePattern = excludes[ i ]

            // In case this is a file name it must fully match
            if ( excludePattern.indexOf( '.' ) > -1 ) {

                const fileName = path.replace( /^.*(\\|\/|\:)/, '' )
                if ( fileName === excludePattern ) {
                    isExclude = true
                }

            } else if ( path.contains( excludePattern ) ) {
                isExclude = true
            }

        }

        return isExclude

    }

}

/**
 * Will filter file paths an keep only js files
 *
 * @param {Array.<string>} filePaths - An array of path to filter
 * @return {Array.<string>} The filtered path with only javascript files
 * @private
 */
function _filterJavascriptFiles ( filePaths ) {

    let filteredFilesPath = []

    let filePath = undefined
    for ( let filePathIndex = 0, numberOfFilePaths = filePaths.length ; filePathIndex < numberOfFilePaths ; filePathIndex++ ) {

        filePath = filePaths[ filePathIndex ]

        // Not a js file like fonts or shaders
        const fileExtension = path.extname( filePath )
        if ( fileExtension !== '.js' ) {
            continue
        }

        filteredFilesPath.push( filePath )

    }

    return filteredFilesPath

}

function glsl () {

    return {

        transform ( code, id ) {

            if ( /\.glsl$/.test( id ) === false ) {
                return;
            }

            var transformedCode = 'export default ' + JSON.stringify(
                code
                    .replace( /[ \t]*\/\/.*\n/g, '' ) // remove //
                    .replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' ) // remove /* */
                    .replace( /\n{2,}/g, '\n' ) // # \n+ to \n
            ) + ';';
            return {
                code: transformedCode,
                map:  { mappings: '' }
            };

        }

    };

}

function RollupTestConfigurationBuilder () {

    const excludes = [
        'Three.js',
        'polyfills.js',
        'utils.js',
        'constants.js',
    ]

    const basePath            = path.join( __dirname, '..' )
    const sourcesPath         = path.join( basePath, 'sources' )
    const testsPath           = path.join( basePath, 'tests' )
    const sourcesFilesPath    = _getFilesPathsUnder( sourcesPath )
    const availableFilesPaths = _excludesFilesPaths( sourcesFilesPath, excludes )
    const jsFilesPath         = _filterJavascriptFiles( availableFilesPaths )

    const configs = []

    for ( let pathIndex = 0, numberOfPaths = jsFilesPath.length ; pathIndex < numberOfPaths ; pathIndex++ ) {
        const filePath = jsFilesPath[ pathIndex ]
        const dirPath  = path.dirname( filePath )

        const sourcePathSplits = dirPath.split( path.sep )
        while ( sourcePathSplits[ 0 ] !== 'sources' || sourcePathSplits.length === 0 ) {
            sourcePathSplits.shift()
        }
        sourcePathSplits.shift()

        const fileName     = path.basename( filePath, path.extname( filePath ) )
        const testFileName = fileName + '.test.js'
        const testPath     = path.join( testsPath, sourcePathSplits.join( path.sep ), testFileName )

        configs.push( {
            input:   filePath,
            plugins: [ glsl() ],
            output:  {
                indent: '\t',
                format: 'iife',
                name:   'Three',
                file:   testPath
            }
        } )
    }

    return configs

}

module.exports = RollupTestConfigurationBuilder()
