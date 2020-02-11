/**
 * @file The threejs convertor
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

const fs   = require( 'fs' )
const path = require( 'path' )

////////////////////////// CONDITIONAL UTILS /////////////////////////////

/**
 * Extend the String prototype if contains not exist.
 * It allow to check if the string contains or not a target string
 *
 * @type {Function}
 * @param {string} target - The string to match in current string
 * @return {boolean}
 */
String.prototype.contains = String.prototype.contains || function ( target ) { return this.indexOf( target ) > -1 }

/**
 * Check if the parameter is of type string
 *
 * @param {any} value - The value to check the string type
 * @return {boolean}
 */
function isString ( value ) {

    return ( typeof value === 'string' )

}

/**
 * Check if the parameter is NOT of type string
 *
 * @param {any} value - The value to check the non string type
 * @return {boolean}
 */
function isNotString ( value ) {

    return ( !isString( value ) )

}

/**
 * Check if the parameter is an array of string.
 * Note: An array of empty string will return true.
 *
 * @param {any} values - The value to check if it is an array of string
 * @return {boolean} - True if array of string, false otherwise
 */
function isArrayOfString ( values ) {

    if ( !Array.isArray( values ) ) { return false }

    for ( let index = 0, numberOfValues = values.length ; index < numberOfValues ; index++ ) {

        if ( isNotString( values[ index ] ) ) { return false }

    }

    return true

}

///////////////////////// FILES UTILS //////////////////////////////

function _fileExistForPath ( filePath ) {

    return fs.existsSync( filePath )

}

function _getFileForPath ( filePath ) {

    // In case files doesn't exist
    if ( !fs.existsSync( filePath ) ) {
        throw new Error( 'Invalid file path "' + filePath + '" file does not exist !' )
    }

    return fs.readFileSync( filePath, 'utf8' )

}

function _removeCommentsFrom( file ) {

    return file.replace( /\/\*[\s\S]*?\*\//g, '' ) // Multi-lines comment
               .replace( /\/\/.*/g, '' ) // Single line comment

}

function _removeStringsFrom( file ) {

    return file.replace( /".*"|\'.*\'/g, '')
//    return file.replace( /(?<=').*(?=')|(?<=").*(?=")|(?<=`).*(?=`)/g, '')

    //return removeDoubleQuoteContentFrom ( removeSingleQuoteContentFrom ( file ) )

    /*
    let chars = file.split('')

    let singleQuote  = false
    let doubleQuote  = false
    let oneLineComment = false
    let previousChar = undefined
    let currentChar  = undefined
    let nextChar     = undefined
    for ( let i = 1, n = chars.length ; i < n - 1 ; i++ ) {

        previousChar = chars[ i - 1 ]
        currentChar = chars[ i ]
        nextChar = chars[ i + 1 ]

        if ( currentChar === '/' && nextChar === '/' ) {
            oneLineComment = true
            chars[ i ] = ''
            continue
        }
        if ( oneLineComment && currentChar === '\n' || nextChar === '\r' ) {
            oneLineComment = false
            continue
        }

        if( oneLineComment ) {
            chars[ i ] = ''
            continue
        }

        if( currentChar === '\'' ) {

            if( singleQuote && previousChar === '\\') {
                chars[ i ] = ''
            } else {
                singleQuote = !singleQuote
            }

            continue

        }

        if( currentChar === '"' ) {

            if( doubleQuote && previousChar === '\\') {
                chars[ i ] = ''
            } else {
                doubleQuote = !doubleQuote
            }

            continue

        }

        if ( singleQuote || doubleQuote ) { chars[ i ] = '' }

    }

    return chars.join('')
    */

    function removeSingleQuoteContentFrom ( file ) {

        let chars = file.split( '' )

        let singleQuote  = false
        let previousChar = undefined
        let currentChar  = undefined
        let nextChar     = undefined

        for ( let i = 1, n = chars.length ; i < n - 1 ; i++ ) {

            previousChar = chars[ i - 1 ]
            currentChar = chars[ i ]
            nextChar = chars[ i + 1 ]

            if ( currentChar === '\'' ) {

                singleQuote = !singleQuote

            } else if ( singleQuote ) {

                if ( currentChar === '\\' && nextChar === '\''  ) { chars[ i + 1 ] = '' }

                chars[ i ] = ''

            }

        }

        return chars.join('')

    }

    function removeDoubleQuoteContentFrom ( file ) {

        let chars = file.split( '' )

        let doubleQuote  = false
        let previousChar = undefined
        let currentChar  = undefined
        let nextChar     = undefined

        for ( let i = 1, n = chars.length ; i < n - 1 ; i++ ) {

            previousChar = chars[ i - 1 ]
            currentChar = chars[ i ]
            nextChar = chars[ i + 1 ]

            if ( currentChar === '"' ) {

                doubleQuote = !doubleQuote

            } else if ( doubleQuote ) {

                if ( currentChar === '\\' && nextChar === '"'  ) { chars[ i + 1 ] = '' }

                chars[ i ] = ''

            }

        }

        return chars.join('')

    }

}

/**
 * Return all the files paths under filePaths in a recursive way.
 *
 * @param filePaths - An array of string, representing the base path where looking for get all files paths
 * @return {Array.<string>} - An array of files paths
 * @private
 */
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
            console.error( 'ES6Converter: Invalid file path "' + filePath + '"' )
            return
        }

        const stats = fs.statSync( filePath )
        if ( stats.isFile() ) {

            files.push( filePath )

        } else if ( stats.isDirectory() ) {

            Array.prototype.push.apply( files, getFilesPathsUnderFolder( filePath ) )

        } else {

            console.error( 'Invalid stat object !' )

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
            //            console.log( 'Exclude: ' + filePath )
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

function _getFileType ( file ) {

    // Todo: use regex as global
    // Todo: use Object.freeze about fileType

    const es6Regex              = new RegExp( /(export\s(default|var))|((import|export)[\r\n\s]*(default)?({[\w\s,]+}\s?(from)?))/, 'g' )
    const amdRegex              = new RegExp( /define\.amd/, 'g' )
    const cjsRegex              = new RegExp( /module\.exports\s*=\s*\{?[^}]*}?/g )
    const classicObjectRegex    = new RegExp( /(THREE.(\w+)\s*=\s*)+\s*function/g )
    const prototypedObjectRegex = new RegExp( /prototype\.constructor\s?=\s?(THREE\.)?(\w)+/g )
    const libRegex              = new RegExp( /THREE.(\w+) = \{/g )

    let fileType = undefined

    const es6Match = file.match( es6Regex )
    if ( es6Match && es6Match.length > 0 ) {
        return 'es6'
    }

    const amdMatch = file.match( amdRegex )
    if ( amdMatch && amdMatch.length > 0 ) {
        return 'amd'
    }

    const cjsMatch = file.match( cjsRegex )
    if ( cjsMatch && cjsMatch.length > 0 ) {
        return 'cjs'
    }

    const classicObjectMatch = file.match( classicObjectRegex )
    if ( classicObjectMatch && classicObjectMatch.length > 0 ) {
        return 'classic'
    }

    const prototypedObjectMatch = file.match( prototypedObjectRegex )
    if ( prototypedObjectMatch && prototypedObjectMatch.length > 0 ) {
        return 'prototype'
    }

    const libMatch = file.match( libRegex )
    if ( libMatch && libMatch.length > 0 ) {
        return 'lib'
    }

    return 'unknown'

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
        if ( filePath.indexOf( 'glsl' ) > -1 || fileExtension !== '.js' ) {
            //            console.log( 'Not Js:  ' + filePath )
            continue
        }

        filteredFilesPath.push( filePath )

    }

    return filteredFilesPath

}

function _createFoldersTree ( folderPath ) {

    const sep     = path.sep
    const initDir = path.isAbsolute( folderPath ) ? sep : ''

    folderPath
        .split( sep )
        .reduce( ( parentDir, childDir ) => {

            const curDir = path.resolve( parentDir, childDir )

            if ( !fs.existsSync( curDir ) ) {
                fs.mkdirSync( curDir )
            }

            return curDir

        }, initDir )

}

function _convertFile ( banner, fileDatas ) {

    const outputPath = fileDatas.output

    const formatedImports = _formatImportStatements( outputPath, fileDatas.imports )
    const formatedFile    = _formatReplacementStatements( fileDatas.file, fileDatas.replacements )
    const formatedExports = _formatExportStatements( outputPath, fileDatas.exports )
    const outputFile      = banner + formatedImports + formatedFile + formatedExports
    const cleanFile       = _cleanFile( outputFile )

    _createFoldersTree( path.dirname( outputPath ) )

    fs.writeFileSync( outputPath, cleanFile )

}

function _copyFile ( banner, fileDatas ) {

    const outputPath = fileDatas.output
    const file       = banner + fileDatas.file
    const cleanFile  = _cleanFile( file )

    _createFoldersTree( path.dirname( outputPath ) )

    fs.writeFileSync( outputPath, cleanFile )

}

function _cleanFile ( file ) {

    // Remove extra blank lines then extra semi-colon
    return file.replace( /(^[\s\t]*[\r\n]){2,}/gm, '' )
               .replace( /;([\r\n]*;)/gm, ';' )

}

///////////////////////// COMMON UTILS //////////////////////////////

function _makeUnique ( value, index, array ) {

    //.filter( ( v, i, a ) => a.indexOf( v ) === i )
    return array.indexOf( value ) === index

}

/////////////////////////// ES6 CONVERTOR PRIVATE STUFF ////////////////////////////

/////////////////////////// EXPORTS MAPS ////////////////////////////

let _output          = ''
let _exportMap       = {}
let _revertExportMap = {}
let _fileMap         = {}

function _createDataMap ( filesPaths, edgeCases, outputBasePath ) {

    let fileExtension = undefined
    let baseName      = undefined
    let edgeCase      = undefined
    let file          = undefined
    let isJavascript  = undefined

    let overrideFilePath = undefined
    let outputPath       = undefined
    let fileType         = undefined
    let imports          = undefined
    let exports          = undefined
    let replacements     = undefined

    let data = undefined

    filesPaths.forEach( ( filePath ) => {

    } )

}

function _createExportMap ( filesPaths, edgeCases, outputBasePath ) {

    let fileExtension = undefined
    let baseName      = undefined
    let edgeCase      = undefined
    let baseFile      = undefined
    let file          = undefined

    let exports          = undefined
    let overrideFilePath = undefined
    let outputPath       = undefined

    filesPaths.forEach( ( filePath ) => {

        fileExtension = path.extname( filePath )
        baseName      = path.basename( filePath, fileExtension )
        edgeCase      = edgeCases[ baseName ] || {}
        baseFile      = _getFileForPath( filePath )
        file          = _removeCommentsFrom ( _removeStringsFrom( baseFile ) )

        exports = _getExportsFor( file, edgeCase[ 'exportsOverride' ] )
        if ( !exports ) {

            // Fallback with file name in last resore
            console.error( 'WARNING: ' + baseName + ' does not contains explicit or implicit export, fallback to file name as export...' )
            exports = [ baseName ]

        }

        outputPath = _getOutputFor( filePath, outputBasePath, edgeCase[ 'outputOverride' ] )

        exports.forEach( ( exportedElement ) => {

            // Check case where export is an array with 'from' or 'as'
            if ( Array.isArray( exportedElement ) ) {
                exportedElement = exportedElement[ 0 ]
            }

            if ( _exportMap[ exportedElement ] ) {

                //Todo: Need to setup a precedence over file path to determine which export is the right

                // Keep source path when possible
                const exportPath = _exportMap[ exportedElement ]

                const sourcePathTarget = 'sources\\'
                const srcPathTarget    = 'src\\'

                if ( exportPath.contains( sourcePathTarget ) ) {

                    if ( filePath.contains( srcPathTarget ) ) {

                        console.error( 'WARNING: Element "' + exportedElement + '" in source ' + path.basename( filePath ) + ' is already exported by source ' + path.basename( exportPath ) + '! Unable to determine which source file is the right exporter !!!' )

                    } else {

                        // stay like this
                        console.warn( 'WARNING: Element "' + exportedElement + '" in example ' + path.basename( filePath ) + ' is already exported by source ' + path.basename( exportPath ) + '. Ignoring the example export !' )

                    }

                } else {

                    if ( filePath.contains( srcPathTarget ) ) {

                        _exportMap[ exportedElement ] = outputPath
                        console.warn( 'WARNING: Element "' + exportedElement + '" in source ' + path.basename( filePath ) + ' is already exported by example ' + path.basename( exportPath ) + ' replacing by the source file !' )

                    } else {

                        console.error( 'WARNING: Element "' + exportedElement + '" in example ' + path.basename( filePath ) + ' is already exported by example ' + path.basename( exportPath ) + '! Unable to determine which example file is the right exporter !!!' )

                    }

                }

                return

            }

            _exportMap[ exportedElement ] = outputPath

        } )

        _revertExportMap[ outputPath ] = exports

    } )

}

function _createFilesMap ( filesPaths, edgeCases, outputBasePath ) {

    let fileExtension = undefined
    let baseName      = undefined
    let edgeCase      = undefined
    let file          = undefined
    let baseFile      = undefined
    let isGLSL        = undefined
    let isJavascript  = undefined

    let overrideFilePath = undefined
    let fileType         = undefined
    let imports          = undefined
    let replacements     = undefined
    let exports          = undefined
    let outputPath       = undefined

    let data = undefined

    filesPaths.forEach( ( filePath ) => {

        fileExtension = path.extname( filePath )
        baseName      = path.basename( filePath, fileExtension )
        baseFile      = _getFileForPath( filePath )
        file          = _removeCommentsFrom( baseFile )
        isGLSL        = ( baseName.indexOf( 'glsl' ) > -1 )
        isJavascript  = ( !isGLSL && fileExtension === '.js' )

        if ( _fileMap[ baseName ] ) {
            console.error( 'The key ' + baseName + ' already exist in the file map ! Is there a duplicate file ??? Skip it !' )
            return
        }

        if ( isJavascript ) {

            edgeCase   = edgeCases[ baseName ] || {}
            outputPath = _getOutputFor( filePath, outputBasePath, edgeCase[ 'outputOverride' ] )
            fileType   = _getFileType( file )

            // Processing exports
            exports = _getExportsFor( file, edgeCase[ 'exportsOverride' ] )
            if ( !exports ) {

                // Fallback with file name in last resore
                console.error( 'WARNING: ' + baseName + ' does not contains explicit or implicit export, fallback to file name as export...' )
                exports = [ baseName ]

            }

            imports = _getImportsFor( {
                file:   _removeCommentsFrom ( _removeStringsFrom( baseFile ) ),
                exports: exports,
                output:  outputPath
            } )

            replacements = _getReplacementsFor( file, exports )

            data = _applyEdgeCases( filePath, imports, replacements, exports, outputPath, edgeCase )

            _fileMap[ baseName ] = {
                path:         filePath,
                isJavascript: ( fileExtension === '.js' ),
                fileType:     fileType,
                file:         baseFile,
                imports:      data.imports,
                replacements: data.replacements,
                exports:      data.exports,
                output:       data.output
            }

        } else {

            _fileMap[ baseName ] = {
                path:         filePath,
                isJavascript: isJavascript,
                file:         file,
                output:       _getOutputFor( filePath, outputBasePath )
            }

        }

    } )

}

/////////////////////////// IMPORTS ////////////////////////////

function _getAllImportsStatementIn ( file, exports ) {

    let statements = []

    const matchs = file.match( /import\s+(?:(?:({[\w\s,]+})|([\w,*-]+))\s+)+from/g ) || []
    matchs.filter( _makeUnique )
          .forEach( ( value ) => {

              const results = value.replace( 'import', '' )
                                   .replace( 'from', '' )
                                   .replace( /[{}]/g, '' )
                                   .replace( /\s+/g, '' )
                                   .split( ',' )

              // Check if the extends statement is not about the exported object !
              let result = undefined
              for ( let i = results.length - 1 ; i >= 0 ; --i ) {
                  result = results[ i ]

                  // Check if import matching does no concerne inner class
                  if ( exports.includes( result ) ) {
                      return
                  }

                  if ( !result ) {
                      results.splice( i, 1 )
                  }

              }

              if ( results.length > 0 ) {
                  Array.prototype.push.apply( statements, results )
              }

          } )

    return statements

}

function _getAllExtendsStatementIn ( file, exports ) {

    let statements = []

    // By Object.assign
    const matchs = file.match( /Object\.assign\(\s*((THREE.)?(\w+)\.prototype[,]*\s*){2,}/g ) || []
    matchs.filter( _makeUnique )
          .forEach( ( value ) => {

              const results = value.replace( /Object\.assign\(\s+/g, '' )
                                   .replace( /THREE\./g, '' )
                                   .replace( /\.prototype/g, '' )
                                   .replace( /\s+/g, '' )
                                   .split( ',' )

              // Check if the extends statement is not about the exported object !
              let result = undefined
              for ( let i = results.length - 1 ; i >= 0 ; --i ) {
                  result = results[ i ]

                  // Check if import matching does no concerne inner class
                  if ( !result || exports.includes( result ) ) {
                      results.splice( i, 1 )
                  }

              }

              if ( results.length > 0 ) {
                  Array.prototype.push.apply( statements, results )
              }

          } )

    return statements

}

function _getAllInheritStatementsIn ( file, exports ) {

    let statements = []

    const matchs = file.match( /Object\.create\(\s+((THREE.)?(\w+)\.prototype[,]?\s*)+\)/g ) || []
    matchs.filter( _makeUnique )
          .forEach( ( value ) => {

              const results = value.replace( /Object\.create\(\s+(THREE.)?/g, '' )
                                   .replace( /\.prototype/g, '' )
                                   .replace( /\)/g, '' )
                                   .replace( /\s+/g, '' )
                                   .split( ',' )

              // Check if the inherit statement is not about the exported object !
              let result = undefined
              for ( let i = 0, resultLength = results.length ; i < resultLength ; i++ ) {
                  result = results[ i ]

                  if ( !result || exports.includes( result ) ) {
                      results.splice( i, 1 )
                  }

              }

              if ( results.length > 0 ) {
                  Array.prototype.push.apply( statements, results )
              }

          } )

    return statements

}

function _getAllNewStatementIn ( file, exports ) {

    let statements = []

    const matchs = file.match( /new\sTHREE.(\w+)\s?/g ) || []
    matchs.filter( _makeUnique )
          .forEach( ( value ) => {

              const result = value.replace( /new\sTHREE\./g, '' )
                                  .replace( /\s+/g, '' )

              // Check if the new statement is not about the exported object !
              if ( exports.includes( result ) ) {
                  return
              }

              if ( result ) { statements.push( result ) }

          } )

    return statements

}

function _getAllInstanceOfStatementIn ( file, exports ) {

    let statements = []

    const matchs = file.match( /instanceof\sTHREE.(\w+)\s?/g ) || []
    matchs.filter( _makeUnique )
          .forEach( ( value ) => {

              const result = value.replace( /instanceof\sTHREE\./g, '' )
                                  .replace( /\s+/g, '' )

              // Check if the new statement is not about the exported object !
              if ( exports.includes( result ) ) {
                  return
              }

              if ( result ) { statements.push( result ) }

          } )

    return statements

}

function _getAllConstantStatementIn ( file ) {

    const constantFilePath = _exportMap[ 'REVISION' ]
    const constants        = _revertExportMap[ constantFilePath ]
    if ( !constants ) { throw new Error( 'No constants for: ' + constantFilePath ) }

    // Find
    let matchedStatements = []
    constants.forEach( ( value ) => {

        const regex  = new RegExp( 'THREE.' + value, 'g' )
        const matchs = file.match( regex )

        Array.prototype.push.apply( matchedStatements, matchs )

    } )

    // Clean
    let statements = []
    matchedStatements.filter( _makeUnique ).forEach( ( value ) => {

        const result = value.replace( /THREE\./g, '' )
                            .replace( /\s+/g, '' )

        if ( result ) { statements.push( result ) }

    } )

    return statements

}

function _getImportsFor ( fileDatas ) {

    const file       = fileDatas.file
    const exports    = fileDatas.exports
    const outputPath = fileDatas.output

    let statements = []

    Array.prototype.push.apply( statements, _getAllImportsStatementIn( file, exports ) )
    Array.prototype.push.apply( statements, _getAllInheritStatementsIn( file, exports ) )
    Array.prototype.push.apply( statements, _getAllExtendsStatementIn( file, exports ) )
    Array.prototype.push.apply( statements, _getAllNewStatementIn( file, exports ) )
    Array.prototype.push.apply( statements, _getAllInstanceOfStatementIn( file, exports ) )
    Array.prototype.push.apply( statements, _getAllConstantStatementIn( file ) )

    // A class can be inherited and dynamicaly create by new in the same file so we need to check uniqueness
    return statements.filter( _makeUnique )

}

function _formatImportStatements ( importerFilePath, objectNames ) {

    let importStatements = []
    let importsMap       = {}

    objectNames.forEach( ( objectName ) => {

        if ( Array.isArray( objectName ) ) {

            importsMap[ objectName[ 2 ] ] = []
            importsMap[ objectName[ 2 ] ].push( objectName[ 0 ] )

        } else {

            const exporterFilePath = _exportMap[ objectName ]
            if ( !exporterFilePath ) {
                console.error( 'Missing export statement for: ' + objectName + ' in ' + importerFilePath + ' this is an edge case that will probably need to be managed manually !!!' )
                return
            }

            // Compute relative path from importer to exporter
            const importerDirectoryName      = path.dirname( importerFilePath )
            const exporterDirectoryName      = path.dirname( exporterFilePath )
            const exporterBaseName           = path.basename( exporterFilePath )
            const relativePath               = path.relative( importerDirectoryName, exporterDirectoryName )
            const firstChar                  = relativePath[ 0 ]
            const notStartWithDot            = ( firstChar !== '.' )
            const relativeFilePath           = ( notStartWithDot ) ? './' + path.join( relativePath, exporterBaseName ) : path.join( relativePath, exporterBaseName )
            const relativeFilePathNormalized = relativeFilePath.replace( /\\/g, '/' )

            if ( !importsMap[ relativeFilePathNormalized ] ) {
                importsMap[ relativeFilePathNormalized ] = []
            }
            importsMap[ relativeFilePathNormalized ].push( objectName )

        }

    } )

    for ( var importPath in importsMap ) {

        let imports = importsMap[ importPath ]

        let formatedImports = 'import {'

        if ( imports.length === 1 ) {

            formatedImports += ' ' + imports[ 0 ] + ' '

        } else if ( imports.length > 1 ) {

            formatedImports += '\n'

            let importedObject = undefined
            for ( let i = 0, numberOfImports = imports.length ; i < numberOfImports ; i++ ) {
                importedObject = imports[ i ]

                if ( i === numberOfImports - 1 ) {
                    formatedImports += '\t' + importedObject + '\n'
                } else {
                    formatedImports += '\t' + importedObject + ',\n'
                }

            }

        } else {

            console.error( 'WARNING: ' + path.basename( importPath ) + ' does not contains imports, fallback to file name export...' )

        }
        formatedImports += '} from \'' + importPath + '\''

        importStatements.push( formatedImports )

    }

    return importStatements.join( '\n' ).concat( '\n\n' ) // don't forget last feed line

}

/////////////////////////// REPLACEMENTS ////////////////////////////
function _getEs6ReplacementsFor () {

    let replacements = []

    replacements.push( [ /import\s+(?:(?:({[\w\s,]+})|([\w,*-]+))\s+)+from.+/g, '' ] )
    replacements.push( [ /export var/g, 'var' ] )
    replacements.push( [ /export function/g, 'function' ] )
    replacements.push( [ /export(?:[^s]|)(\s*{(?:[\w\s,])+}\s*)(?:(?:from)?\s?['"][./]+[\w.]+['"];?)?/g, '' ] )
    //    replacements.push( [ /export([^s]|)\s*{(?:[\w\s,])+}\s*(?!\s?from)/g, '' ] )
    //    replacements.push( [ /export[^s](?:([\w*{}\n\r\t, ]+)\s*);*/g, '' ] )

    return replacements

}

function _getExportsReplacementsFor ( exports ) {

    let replacements = []

    for ( let i = 0, numberOfExports = exports.length ; i < numberOfExports ; i++ ) {

        const exportedObject = exports[ i ]

        const regex2       = new RegExp( 'THREE.' + exportedObject + ' =', 'g' )
        const replacement2 = 'var ' + exportedObject + ' ='
        replacements.push( [ regex2, replacement2 ] )

        // Todo: externalize below
        // THREE.HDRLoader = THREE.RGBELoader = function ( manager ) {
        const regex1       = new RegExp( ' = var ', 'g' )
        const replacement1 = ' = '
        replacements.push( [ regex1, replacement1 ] )

    }

    return replacements

}

function _getIifeReplacementsFor ( file ) {

    const unspacedFile = file.replace( /\s+/g, '' )
    let replacements   = []

    // Check if this iife is a main englobing function or inner function
    const matchIife = unspacedFile.match( /^\(\s*function\s*\(\s*(\w+)?\s*\)\s*\{/g ) || []
    if ( matchIife.length > 0 ) {

        replacements.push( [ /\(\s*function\s*\(\s*(\w+)?\s*\)\s*\{/, '' ] )

        // Check for end type with params or not
        const matchParametrizedEndIife = unspacedFile.match( /}\s*\)\s*\(\s*[\w.=\s]*(\|\|\s*\{\})?\s*\);?$/ ) || []
        const matchEmptyEndIife        = unspacedFile.match( /}\s*\(\s*[\w]*\s*\)\s*\);?$/ ) || []
        if ( matchParametrizedEndIife.length > 0 ) {

            replacements.push( [ /}\s*\)\s*\(\s*[\w.=\s]*(\|\|\s*\{\})?\s*\);?/, '' ] )

        } else if ( matchEmptyEndIife.length > 0 ) {

            replacements.push( [ /}\s*\(\s*[\w]*\s*\)\s*\);?/, '' ] )

        } else {

            throw new Error( 'Unable to match end of IIFE in ' + filePath )

        }

    }

    return replacements

}

function _getThreeReplacementsFor () {

    return [
        [ /THREE\.Math\./g, '_Math.' ],
        [ /THREE\./g, '' ]
    ]

}

function _getAutoAssignementReplacementsFor () {

    return [ [ /var\s?(\w+)\s?=\s?\1;/g, '' ] ]

}

function _getReplacementsFor ( file, exports ) {

    let replacements = []

    Array.prototype.push.apply( replacements, _getEs6ReplacementsFor() )
    Array.prototype.push.apply( replacements, _getExportsReplacementsFor( exports ) )
    Array.prototype.push.apply( replacements, _getIifeReplacementsFor( file ) )
    Array.prototype.push.apply( replacements, _getThreeReplacementsFor() )
    Array.prototype.push.apply( replacements, _getAutoAssignementReplacementsFor() )

    return replacements

}

function _formatReplacementStatements ( file, replacements ) {

    let replacement = undefined
    for ( let replaceIndex = 0, numberOfReplacements = replacements.length ; replaceIndex < numberOfReplacements ; replaceIndex++ ) {
        replacement = replacements[ replaceIndex ]

        file = file.replace( replacement[ 0 ], replacement[ 1 ] )

    }

    return file

}

/////////////////////////// EXPORTS ////////////////////////////

function _getExportsStatementsInES6File ( file ) {

    let exportedElements = []

    // Todo: May be it should be splitted by export type... direct, named, default, as etc...
    const es6MatchedExports = file.match( /export(?:[^s]|)(?:(?:\s*{([\w\s,]+)}\s*)(?:(?:from)?\s?['"]([./]+[\w.]+['"]);?)?|(var\s+.+))/g )
    if ( es6MatchedExports ) {

        // Clean
        es6MatchedExports.forEach( ( value ) => {

            if ( value.contains( 'from' ) ) {

                const splitOnFrom = value.split( 'from' )
                const exports     = splitOnFrom[ 0 ]
                    .replace( /export/g, '' )
                    .replace( /[\s\n\r;{}]+/g, '' )
                //                    .split( ',' )

                const exportFile = splitOnFrom[ 1 ].replace( /[\s'";]+/g, '' )

                // Todo: allow exports like 'foo, bar, baz' and parse it when create exports statements
                Array.prototype.push.apply( exportedElements, [ [ exports, 'from', exportFile ] ] )
                return

            }

            if ( value.contains( 'as' ) ) {

                value = value.replace( /\w+\sas/g, '' )

            }

            if ( value.contains( 'var' ) ) {

                value = value.replace( /export/g, '' )
                             .replace( /var/g, '' )
                             .replace( /\s*=\s*.+/g, '' )

            }

            if ( value.contains( 'function' ) ) {

                value = value.replace( /function/g, '' )

            }

            const results = value.replace( /export/g, '' )
                                 .replace( /[\s\n\r;{}]+/g, '' )
                                 .split( ',' )

            Array.prototype.push.apply( exportedElements, results )

        } )

    }

    return exportedElements

}

function _getExportsStatementsInCJSFile ( file ) {

    let exportedElements = []

    const commonjsExports = file.match( /module\.exports\s*=\s*\{?[^}]*}?/g )
    if ( commonjsExports ) {

        // Clean
        commonjsExports.forEach( ( value ) => {

            const results = value.replace( /module\.exports/g, '' )
                                 .replace( /[\s\n\r;{}=]+/g, '' )
                                 .split( ',' )

            Array.prototype.push.apply( exportedElements, results )

        } )

    }

    return exportedElements

}

function _getExportsStatementsInJSAssignmentsFile ( file ) {

    let exportedElements = []

    const potentialClassicObjectExports = file.match( /(THREE.(\w+)\s*=\s*)+\s*function/g )
    if ( potentialClassicObjectExports ) {

        // Clean
        potentialClassicObjectExports.forEach( ( value ) => {

            const results = value.replace( /THREE\.|\s*=\s*function/g, '' )
                                 .replace( /\s*/g, '' )
                                 .split( '=' )

            Array.prototype.push.apply( exportedElements, results )

        } )

    }

    return exportedElements

}

function _getExportsStatementsInPrototypedFile ( file ) {

    let exportedElements = []

    const potentialPrototypedObjectExports = file.match( /prototype\.constructor\s?=\s?(THREE\.)?(\w)+/g )
    if ( potentialPrototypedObjectExports ) {

        // Clean
        potentialPrototypedObjectExports.forEach( ( value ) => {

            const result = value.replace( /prototype\.constructor\s?=\s?/g, '' )
                                .replace( /THREE\./g, '' )

            exportedElements.push( result )

        } )

    }

    return exportedElements

}

function _getExportsStatementInLibFile ( file ) {

    let exportedElements = []

    const potentialLibExports = file.match( /THREE.(\w+) = \{/g )
    if ( potentialLibExports ) {

        // Clean
        potentialLibExports.forEach( ( value ) => {

            const result = value.replace( /THREE\.| = \{/g, '' )

            exportedElements.push( result )

        } )

    }

    return exportedElements

}

function _getExportsFor ( file, exportsOverride = undefined ) {

    if ( exportsOverride ) {
        return exportsOverride
    }

    // Todo: need to sort different file type before
    const es6Regex = new RegExp( /(export\s(default|var))|((import|export)[\r\n\s]*(default)?({[\w\s,]+}\s?(from)?))/, 'g' )
    if ( file.match( es6Regex ) ) {

        const es6Exports = _getExportsStatementsInES6File( file )
        if ( es6Exports.length > 0 ) {
            return es6Exports
        }

    }

    const amdRegex = new RegExp( /define\.amd/, 'g' )
    if ( file.match( amdRegex ) ) {
        console.error( 'WARNING: ' + path.basename( filePath ) + ' is unable to be process... It is an AMD module. Sorry for the disagreement.' )
        return [ path.basename( filePath, '.js' ) ]
    }

    const commonjsExports = _getExportsStatementsInCJSFile( file )
    if ( commonjsExports.length > 0 ) { return commonjsExports }

    // Try to find potential export from assigned javascript object
    const assignementExports = _getExportsStatementsInJSAssignmentsFile( file )
    if ( assignementExports.length > 0 ) { return assignementExports }

    // Try to find potential export from prototype javascript object
    const prototypeExports = _getExportsStatementsInPrototypedFile( file )
    if ( prototypeExports.length > 0 ) { return prototypeExports }

    // Try to find potential export from library style
    const libExports = _getExportsStatementInLibFile( file )
    if ( libExports.length > 0 ) { return libExports }

    return null

}

function _formatExportStatements ( filePath, exports ) {

    // Formating
    let formatedExports = ''

    // First check for specified exports
    let specificExports = []
    let regularExports  = []

    exports.forEach( exports => {

        ( Array.isArray( exports ) ) ? specificExports.push( exports ) : regularExports.push( exports )

    } )

    if ( specificExports.length === 0 && regularExports.length === 0 ) {

        console.error( 'WARNING: ' + path.basename( filePath ) + ' does not contains explicit or implicit export, fallback to file name export... It must be an Es6 file with it own exports !' )
        return ''

    }

    // Process specific exports
    for ( let i = 0, numbSpecExp = specificExports.length ; i < numbSpecExp ; i++ ) {

        const exports          = specificExports[ i ]
        const exportedClass    = exports[ 0 ]
        const exportAction     = exports[ 1 ]
        const exportComplement = exports[ 2 ]

        if ( exportAction === 'from' ) {

            formatedExports += 'export { ' + exports[ 0 ] + ' } from "' + exportComplement + '"' + '\n'

        } else if ( exportAction === 'as' ) {

            formatedExports += 'export { ' + exports[ 0 ] + ' as ' + exportComplement + ' } ' + '\n'

        } else {

            // Todo: export { Foo as Bar } from 'Baz'
            throw new Error( 'Invalid specified export action !' )

        }

    }

    // Process regular exports
    const numberOfExports = regularExports.length
    if ( numberOfExports === 1 ) {

        formatedExports += '\nexport { ' + exports[ 0 ] + ' }\n'

    } else if ( numberOfExports > 1 ) {

        formatedExports += '\nexport {\n'
        for ( let i = 0 ; i < numberOfExports ; i++ ) {

            formatedExports += ( i === numberOfExports - 1 ) ? '\t' + regularExports[ i ] + '\n' : '\t' + regularExports[ i ] + ',\n'

        }
        formatedExports += '}\n'

    }

    return formatedExports

}

/////////////////////////// OUTPUT ////////////////////////////

function _getOutputFor ( filePath, outputBasePath, outputOverride = undefined ) {

    if ( outputOverride ) {
        return path.join( outputBasePath, outputOverride )
    }

    const dirName        = path.dirname( filePath )
    const specificPart   = getSpecificPath( dirName )
    const baseName       = path.basename( filePath )
    const fullOutputPath = path.join( outputBasePath, specificPart, baseName )

    return fullOutputPath

    // Todo: make it for real use case from output dir
    // Todo: duplicate
    function getSpecificPath ( path ) {

        const exampleFontsTarget = 'three\\examples\\fonts'
        const exampleJsTarget    = 'three\\examples\\js'
        const sourceTarget       = 'three\\src'

        let indexOfExampleFontsTarget = path.indexOf( exampleFontsTarget )
        let indexOfExampleJsTarget    = path.indexOf( exampleJsTarget )
        let indexOfSourceTarget       = path.indexOf( sourceTarget )
        let specificPath              = undefined

        if ( indexOfExampleFontsTarget > -1 ) {

            specificPath = 'fonts\\' + path.slice( indexOfExampleFontsTarget + exampleFontsTarget.length )

        } else if ( indexOfExampleJsTarget > -1 ) {

            specificPath = path.slice( indexOfExampleJsTarget + exampleJsTarget.length )

        } else if ( indexOfSourceTarget > -1 ) {

            specificPath = path.slice( indexOfSourceTarget + sourceTarget.length )

        } else {

            console.error( 'Unable to find specific path part for: ' + path )
            specificPath = ''

        }

        return specificPath.replace( /\\/g, '/' )

    }

}

/////////////////////////// EDGE CASES ////////////////////////////

function _applyEdgeCases ( filePath, imports, replacements, exports, outputPath, edgeCase ) {

    let data = {
        imports:      imports,
        replacements: replacements,
        exports:      exports,
        output:       outputPath
    }

    if ( edgeCase ) {

        if ( edgeCase.importsOverride ) {
            data.imports = edgeCase.importsOverride
        } else if ( edgeCase.imports ) {
            Array.prototype.push.apply( data.imports, edgeCase.imports )
            data.imports.filter( _makeUnique )
        }

        if ( edgeCase.replacements_override ) {
            data.replacements = edgeCase.replacements_override
        } else if ( edgeCase.replacements ) {
            Array.prototype.push.apply( data.replacements, edgeCase.replacements )
            data.replacements.filter( _makeUnique )
        }

        if ( edgeCase.exportsOverride ) {
            data.exports = edgeCase.exportsOverride
        } else if ( edgeCase.exports ) {
            Array.prototype.push.apply( data.exports, edgeCase.exports )
            data.exports.filter( _makeUnique )
        }

        if ( edgeCase.output ) {
            data.output = edgeCase.output
        }

    }

    return data

}

function Es6 () {

    this.inputs    = []
    this.excludes  = []
    this.output    = ''
    this.edgeCases = []
    this.banner    = ''

}

Object.assign( Es6.prototype, {

    setInputs: function setInputs ( inputs ) {

        if ( isArrayOfString( inputs ) ) {

            this.inputs = inputs

        } else if ( isString( inputs ) ) {

            this.inputs = [ inputs ]

        } else {

            throw new Error( 'ES6Converter: Invalid inputs arguments, expected a String or Array of String' )

        }

        return this

    },

    setExcludes: function setExcludes ( excludes ) {

        if ( isArrayOfString( excludes ) ) {

            this.excludes = excludes

        } else if ( isString( excludes ) ) {

            this.excludes = [ excludes ]

        } else {

            throw new Error( 'ES6Converter: Invalid excludes arguments, expected a String or Array of String' )

        }

        return this

    },

    setOutput: function setOutput ( output ) {

        if ( isString( output ) ) {

            this.output = output

        } else {

            throw new Error( 'ES6Converter: Invalid output arguments, expected a String' )

        }

        return this

    },

    setEdgeCases: function setEdgeCases ( edgeCases ) {

        // Todo: object edge case or validate object structure of input value here !
        this.edgeCases = edgeCases

        return this

    },

    setBanner: function setBanner ( banner ) {

        if ( isNotString( banner ) ) { throw new TypeError( 'Invalid banner, expect a string.' )}

        this.banner = banner

        return this

    },

    convert: function convert ( callback ) {

        const inputs   = this.inputs
        const excludes = this.excludes
        const output   = _output = this.output
        const edgeCases = this.edgeCases
        const banner    = this.banner

        const allFilesPaths       = _getFilesPathsUnder( inputs )
        const availableFilesPaths = _excludesFilesPaths( allFilesPaths, excludes )
        const jsFiles             = _filterJavascriptFiles( availableFilesPaths )

        _createExportMap( jsFiles, edgeCases, output )
        _createFilesMap( availableFilesPaths, edgeCases, output )

        //
        //

        let fileDatas = undefined

        for ( let fileName in _fileMap ) {

            if ( !_fileMap.hasOwnProperty( fileName ) ) { continue }

            fileDatas = _fileMap[ fileName ]

            if ( fileDatas.isJavascript ) {

                //                console.log('Convert: ' + fileDatas.path)
                _convertFile( banner, fileDatas )

            } else {

                //                console.log('Copy:    ' + fileDatas.path)
                _copyFile( banner, fileDatas )

            }

        }

        callback()

    },

    getAllExports: function getAllExports ( path ) {

        // Todo: should be exports
        const formatedImportStatements = _formatImportStatements( path, Object.keys( _exportMap ) )
        const formatedExportStatements = formatedImportStatements.replace( /import/g, 'export' )
        return formatedExportStatements

    }

} )

const instance = new Es6()
module.exports = instance
