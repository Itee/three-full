/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

const fs   = require( 'fs' )
const path = require( 'path' )

function fileExistForPath ( filePath ) {

    return fs.existsSync( filePath )

}

function getFileForPath ( filePath ) {

    // In case files doesn't exist
    if ( !fileExistForPath( filePath ) ) {
        throw new Error( 'Invalid file path "' + filePath + '" file does not exist !' )
    }

    return fs.readFileSync( filePath, 'utf8' )

}

function getUncommentedFileForPath ( filePath ) {

    return getFileForPath( filePath ).replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g, '$1' )

}

/**
 * Return all the files paths under filePaths in a recursive way.
 *
 * @param filePaths - An array of string, representing the base path where looking for get all files paths
 * @return {Array.<string>} - An array of files paths
 * @private
 */
function getFilesPathsUnder ( filePaths ) {

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

        if ( !fileExistForPath( filePath ) ) {
            console.error( 'ES6Converter: Invalid file path "' + filePath + '"' )
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
function excludesFilesPaths ( filePaths, excludes ) {

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

            } else if ( path.includes( excludePattern ) ) {
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
function filterJavascriptFiles ( filePaths ) {

    let filteredFilesPath = []

    let filePath = undefined
    for ( let filePathIndex = 0, numberOfFilePaths = filePaths.length ; filePathIndex < numberOfFilePaths ; filePathIndex++ ) {

        filePath = filePaths[ filePathIndex ]

        // Not a js file like fonts or shaders
        const fileExtension = path.extname( filePath )
        if ( filePath.indexOf("glsl") > -1 || fileExtension !== '.js' ) {
            continue
        }

        filteredFilesPath.push( filePath )

    }

    return filteredFilesPath

}

module.exports = {
    fileExistForPath,
    getFileForPath,
    getFilesPathsUnder,
    getUncommentedFileForPath,
    excludesFilesPaths,
    filterJavascriptFiles
}
