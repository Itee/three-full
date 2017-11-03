/**
 * @file The threejs convertor
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

const fs   = require( 'fs' )
const path = require( 'path' )

////////////////////////// CONDITIONAL UTILS /////////////////////////////

String.prototype.contains = String.prototype.contains || function ( target ) { return this.indexOf( target ) > -1 }

function isString ( value ) {

    return ( typeof value === 'string' )

}

function isNotString ( value ) {

    return ( !isString( value ) )

}

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

            console.error( "Invalid stat object !" )

        }

    }

}

function _excludesFilesPaths ( filePaths, excludes ) {

    let filteredFilesPath = []

    let filePath = undefined
    for ( let filePathIndex = 0, numberOfFilePaths = filePaths.length ; filePathIndex < numberOfFilePaths ; filePathIndex++ ) {
        filePath = filePaths[ filePathIndex ]

        if ( isExclude( filePath ) ) {
            console.log( 'Exclude: ' + filePath )
            continue
        }

        filteredFilesPath.push( filePath )

    }

    return filteredFilesPath

    function isExclude ( path ) {

        for ( let i = 0, pathLength = excludes.length ; i < pathLength ; i++ ) {

            if ( path.contains( excludes[ i ] ) ) {
                return true
            }

        }

        return false

    }

}

function _filterJavascriptFiles ( filePaths ) {

    let filteredFilesPath = []

    let filePath = undefined
    for ( let filePathIndex = 0, numberOfFilePaths = filePaths.length ; filePathIndex < numberOfFilePaths ; filePathIndex++ ) {

        filePath = filePaths[ filePathIndex ]

        // Not a js file like fonts or shaders
        const fileExtension = path.extname( filePath )
        if ( fileExtension !== '.js' ) {
            console.log( 'Not Js:  ' + filePath )
            continue
        }

        filteredFilesPath.push( filePath )

    }

    return filteredFilesPath

}

function _filterES6Files ( filePaths ) {

    let filteredFilesPath = []

    const es6Regex = new RegExp( /import\s?{[\w\s]+}\s?from\s?|export[{\r\n\s]+(\w+[,\r\n\s]*)+[}]?;?/, 'g' )

    let filePath = undefined
    for ( let filePathIndex = 0, numberOfFilePaths = filePaths.length ; filePathIndex < numberOfFilePaths ; filePathIndex++ ) {

        filePath = filePaths[ filePathIndex ]

        const file = _getFileForPath( filePath ).replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '' )
        if ( file.match( es6Regex ) ) {
            console.log( 'Filter:  ' + filePath )
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

function _createFile ( filePath, imports, replacements, exports, outputPath ) {

    // Compute imports
    const formatedImports = _formatImportStatements( filePath, imports ) || ''
    const formatedFile    = _formatReplacementStatements( filePath, replacements )
    const formatedExports = _formatExportStatements( filePath, exports )
    const outputFile      = formatedImports + formatedFile + formatedExports

    _createFoldersTree( path.dirname( outputPath ) )

    fs.writeFileSync( outputPath, outputFile )

}

function _copyFile ( filePath, outputPath ) {

    let file = _getFileForPath( filePath )

    _createFoldersTree( path.dirname( outputPath ) )

    fs.writeFileSync( outputPath, file )

}

///////////////////////// COMMON UTILS //////////////////////////////

function _makeUnique ( value, index, array ) {

    //.filter( ( v, i, a ) => a.indexOf( v ) === i )
    return array.indexOf( value ) === index

}

/////////////////////////// ES6 CONVERTOR PRIVATE STUFF ////////////////////////////

/////////////////////////// EXPORTS MAPS ////////////////////////////

let _exportMap       = {}
let _revertExportMap = {}

function _createExportMap ( filesPaths ) {

    filesPaths.forEach( ( filePath ) => {

        const exportedElements = _getExportedElementForFile( filePath )
        exportedElements.forEach( ( exportedElement ) => {

            if ( _exportMap[ exportedElement ] ) {

                // Keep source path when possible
                const exportPath = _exportMap[ exportedElement ]

                const sourcePathTarget = 'src\\'

                if ( exportPath.contains( sourcePathTarget ) ) {

                    if ( filePath.contains( sourcePathTarget ) ) {

                        console.error( 'WARNING: Element "' + exportedElement + '" in source ' + path.basename( filePath ) + ' is already exported by source ' + path.basename( exportPath ) + ' wich source file is the right exporter ?' )

                    } else {

                        // stay like this
                        console.warn( 'WARNING: Element "' + exportedElement + '" in example ' + path.basename( filePath ) + ' is already exported by source ' + path.basename( exportPath ) + ' just ignoring the example export !' )

                    }

                } else {

                    if ( filePath.contains( sourcePathTarget ) ) {

                        _exportMap[ exportedElement ] = filePath
                        console.warn( 'WARNING: Element "' + exportedElement + '" in source ' + path.basename( filePath ) + ' is already exported by example ' + path.basename( exportPath ) + ' replacing by the source file !' )

                    } else {

                        console.error( 'WARNING: Element "' + exportedElement + '" in example ' + path.basename( filePath ) + ' is already exported by example ' + path.basename( exportPath ) + ' wich example file is the right exporter ?' )

                    }

                }

                return

            }

            _exportMap[ exportedElement ] = filePath

        } )

        _revertExportMap[ filePath ] = exportedElements

    } )

    // LOG
    //    console.log( 'exportMap:' + JSON.stringify( orderKeys( _exportMap ), null, 4 ) );
    //    console.log( 'revertExportMap:' + JSON.stringify( orderKeys( _revertExportMap ), null, 4 ) );
    //    function orderKeys ( obj ) {
    //
    //        var keys = Object.keys( obj ).sort( function keyOrder ( k1, k2 ) {
    //            if ( k1 < k2 ) {
    //                return -1
    //            } else if ( k1 > k2 ) {
    //                return +1
    //            } else {
    //                return 0
    //            }
    //        } )
    //
    //        var i, after = {}
    //        for ( i = 0 ; i < keys.length ; i++ ) {
    //            after[ keys[ i ] ] = obj[ keys[ i ] ]
    //            delete obj[ keys[ i ] ]
    //        }
    //
    //        for ( i = 0 ; i < keys.length ; i++ ) {
    //            obj[ keys[ i ] ] = after[ keys[ i ] ]
    //        }
    //        return obj
    //    }

}

/////////////////////////// IMPORTS ////////////////////////////

function _getAllExtendsStatementIn ( file, filePath ) {

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
                  if ( _exportMap[ result ] === filePath ) {
                      results.splice( i, 1 )
                  }

                  if ( !result ) {
                      results.splice( i, 1 )
                  }

              }

              if ( results.length > 0 ) {
                  Array.prototype.push.apply( statements, results )
              }

          } )

    // By direct prototype assignement
    // See BufferSubdivisionModifier

    return statements

}

function _getAllInheritStatementsIn ( file, filePath ) {

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

                  if ( _exportMap[ result ] === filePath ) {
                      results.splice( i, 1 )
                  }

              }

              if ( results.length > 0 ) {
                  Array.prototype.push.apply( statements, results )
              }

          } )

    return statements

}

function _getAllNewStatementIn ( file, filePath ) {

    let statements = []

    const matchs = file.match( /new\sTHREE.(\w+)\s?/g ) || []
    matchs.filter( _makeUnique )
          .forEach( ( value ) => {

              const result = value.replace( /new\sTHREE\./g, '' )
                                  .replace( /\s+/g, '' )

              // Check if the new statement is not about the exported object !
              if ( _exportMap[ result ] === filePath ) {
                  return
              }

              if ( result ) { statements.push( result ) }

          } )

    return statements

}

function _getAllInstanceOfStatementIn ( file, filePath ) {

    let statements = []

    const matchs = file.match( /instanceof\sTHREE.(\w+)\s?/g ) || []
    matchs.filter( _makeUnique )
          .forEach( ( value ) => {

              const result = value.replace( /instanceof\sTHREE\./g, '' )
                                  .replace( /\s+/g, '' )

              // Check if the new statement is not about the exported object !
              if ( _exportMap[ result ] === filePath ) {
                  return
              }

              if ( result ) { statements.push( result ) }

          } )

    return statements

}

function _getAllConstantStatementIn ( file ) {

    const constantFilePath = _exportMap[ 'REVISION' ]
    const constants        = _revertExportMap[ constantFilePath ]

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

function _getImportsFor ( filePath ) {

    const file = _getFileForPath( filePath ).replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '' )

    let statements = []

    Array.prototype.push.apply( statements, _getAllInheritStatementsIn( file, filePath ) )
    Array.prototype.push.apply( statements, _getAllExtendsStatementIn( file, filePath ) )
    Array.prototype.push.apply( statements, _getAllNewStatementIn( file, filePath ) )
    Array.prototype.push.apply( statements, _getAllInstanceOfStatementIn( file, filePath ) )
    Array.prototype.push.apply( statements, _getAllConstantStatementIn( file ) )

    // A class can be inherited and dynamicaly create by new in the same file so we need to check uniqueness
    return statements.filter( _makeUnique )

}

function _formatImportStatements ( importerFilePath, objectNames ) {

    // TODO [Itee]: must take into account the file rerouting in edge cases

    if ( !importerFilePath ) {
        console.error( 'Invalid argument importerFilePath' )
        return null
    }

    if ( !objectNames ) {
        console.error( 'Invalid argument objectNames' )
        return null
    }

    let importStatements = []

    // Count number of sub folder to return to file path root
    let importerSpecificPath = getSpecificPath( importerFilePath )

    let importsMap = {}
    objectNames.forEach( ( objectName ) => {

        const sourcePath = _exportMap[ objectName ]
        if ( !sourcePath ) {
            console.error( 'Missing export statement for: ' + objectName + ' in ' + importerSpecificPath + ' this is an edge case that will probably need to be managed manually !!!\n' )
            return
        }

        const specificSourcePath = getSpecificPath( sourcePath )

        compareAndRemoveDuplicates( importerSpecificPath, specificSourcePath )
        const importerDeepLevel = importerSpecificPath.match( /\//g ) || []
        const relativePart      = getRelativePartFor( importerDeepLevel.length )
        const relativePath      = relativePart + specificSourcePath

        if( ! importsMap[ relativePath ] ) {
            importsMap[ relativePath ] = []
        }
        importsMap[ relativePath ].push( objectName )

    } )

    for ( var importPath in importsMap ) {

        let imports = importsMap[ importPath ]

        let formatedImports = 'import {'

        if ( imports.length === 1 ) {

            formatedImports += ' ' + imports[ 0 ] + ' '

        } else  if ( imports.length > 1 ) {

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

    // Todo: duplicate
    function getSpecificPath ( path ) {

        const exampleTarget = 'js\\'
        const sourceTarget  = 'src\\'

        let indexOfExampleTarget = path.indexOf( exampleTarget )
        let indexOfSourceTarget  = path.indexOf( sourceTarget )
        let specificPath         = undefined
        if ( indexOfExampleTarget > -1 ) {

            specificPath = path.slice( indexOfExampleTarget + exampleTarget.length )

        } else if ( indexOfSourceTarget > -1 ) {

            specificPath = path.slice( indexOfSourceTarget + sourceTarget.length )

        } else {

            throw new Error( "Unable to find specific path part for: " + path )

        }

        return specificPath.replace( /\\/g, '/' )

    }

    function compareAndRemoveDuplicates ( path1, path2 ) {

        while ( path1.substring( 0, 1 ) === path2.substring( 0, 1 ) ) {

            path1 = path1.substring( 1 )
            path2 = path2.substring( 1 )

        }

    }

    function getRelativePartFor ( deepLevel ) {

        let relativePart = ''

        if ( deepLevel === 0 ) {

            relativePart = './'

        } else {

            for ( let i = 0 ; i < deepLevel ; i++ ) {
                relativePart += '../'
            }

        }

        return relativePart

    }

}

/////////////////////////// REPLACEMENTS ////////////////////////////

function _getReplacementsFor ( filePath ) {

    // Todo[Itee]: Should be split into sub function for each file type ( es6, iife, etc... ) like getImportsFor

    let replacements = []

    // Replace main class by a var
    const exports = _revertExportMap[ filePath ]
    if ( !exports ) { throw new Error( 'No exports for: ' + filePath ) }

    for ( let i = 0, numberOfExports = exports.length ; i < numberOfExports ; i++ ) {

        const exportedObject = exports[ i ]

        const regex2       = new RegExp( 'THREE.' + exportedObject + ' =', 'g' )
        const replacement2 = 'var ' + exportedObject + ' ='
        replacements.push( [ regex2, replacement2 ] )

        // THREE.HDRLoader = THREE.RGBELoader = function ( manager ) {
        const regex1       = new RegExp( ' = var', 'g' )
        const replacement1 = ' = '
        replacements.push( [ regex1, replacement1 ] )

    }

    // Replace IIFE
    const file = _getFileForPath( filePath ).replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '' ) // remove comments
                                            .replace( /\s+/g, '' )   // Remoce spaces

    // Check if this iife is a main englobing function or inner function
    const matchIife = file.match( /^\(\s*function\s*\(\s*(\w+)?\s*\)\s*\{/g ) || []
    if ( matchIife.length > 0 ) {

        replacements.push( [ /\(\s*function\s*\(\s*(\w+)?\s*\)\s*\{/, '' ] )

        // Check for end type with params or not
        const matchParametrizedEndIife = file.match( /}\s*\)\s*\(\s*[\w.=\s]*(\|\|\s*\{\})?\s*\);?$/ ) || []
        const matchEmptyEndIife        = file.match( /}\s*\(\s*[\w]*\s*\)\s*\);?$/ ) || []
        if ( matchParametrizedEndIife.length > 0 ) {

            replacements.push( [ /}\s*\)\s*\(\s*[\w.=\s]*(\|\|\s*\{\})?\s*\);?/, '' ] )

        } else if ( matchEmptyEndIife.length > 0 ) {

            replacements.push( [ /}\s*\(\s*[\w]*\s*\)\s*\);?/, '' ] )

        } else {

            throw new Error( 'Unable to match end of IIFE in ' + filePath )

        }

    }

    // Finally replace all THREE occurence
    replacements.push( [ /THREE\./g, '' ] )

    // Replace assignement to itself
    replacements.push( [ /var\s?(\w+)\s?=\s?\1;/g, '' ] )

    return replacements

}

function _formatReplacementStatements ( filePath, replacements ) {

    let file = _getFileForPath( filePath )

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

    const es6MatchedExports = file.match( /export[{\r\n\s]+(\w+[,\r\n\s]*)+[}]?/g )
    if ( es6MatchedExports ) {

        // Clean
        es6MatchedExports.forEach( ( value ) => {

            if ( value.contains( 'from' ) ) {

                return

            }

            if ( value.contains( 'as' ) ) {

                value = value.replace( /\w+\sas/g, '' )

            }

            if ( value.contains( 'var' ) ) {

                value = value.replace( /var/g, '' )

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

function _getExportedElementForFile ( filePath ) {

    const file = _getFileForPath( filePath ).replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '' ) // remove comments
    //                                .replace( /\s*/g, '')

    // Try to find exports for es6 modules
    const es6Exports = _getExportsStatementsInES6File( file )
    if ( es6Exports.length > 0 ) { return es6Exports }

    // Try to find exports for commonjs
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

    // Fallback with file name in last resore
    console.error( 'WARNING: ' + path.basename( filePath ) + ' does not contains explicit or implicit export, fallback to file name export...' )
    return [ path.basename( filePath, '.js' ) ]

}

function _getExportsFor ( filePath ) {

    return _revertExportMap[ filePath ]

}

function _formatExportStatements ( filePath, exports ) {

    // Formating
    let formatedExports = '\nexport {'
    if ( exports.length === 0 ) {

        console.error( 'WARNING: ' + path.basename( filePath ) + ' does not contains explicit or implicit export, fallback to file name export...' )
        formatedExports += ' ' + path.basename( filePath, '.js' ) + ' '

    } else if ( exports.length === 1 ) {

        formatedExports += ' ' + exports[ 0 ] + ' '

    } else {

        formatedExports += '\n'

        let exportedObject = undefined
        for ( let i = 0, numberOfExports = exports.length ; i < numberOfExports ; i++ ) {
            exportedObject = exports[ i ]

            if ( i === numberOfExports - 1 ) {
                formatedExports += '\t' + exportedObject + '\n'
            } else {
                formatedExports += '\t' + exportedObject + ',\n'
            }

        }

    }
    formatedExports += '}\n'

    return formatedExports

}

/////////////////////////// OUTPUT ////////////////////////////

function _getOutputFor ( filePath, output ) {

    const dirName        = path.dirname( filePath )
    const specificPart   = getSpecificPath( dirName )
    const baseName       = path.basename( filePath )
    const fullOutputPath = path.join( output, specificPart, baseName )

    return fullOutputPath

    // Todo: make it for real use case from output dir
    // Todo: duplicate
    function getSpecificPath ( path ) {

        const exampleFontsTarget = 'examples\\fonts'
        const exampleJsTarget    = 'examples\\js'
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

            console.error( "Unable to find specific path part for: " + path )
            specificPath = ''

        }

        return specificPath.replace( /\\/g, '/' )

    }

}

/////////////////////////// EDGE CASES ////////////////////////////

function _applyEdgeCases ( filePath, imports, replacements, exports, outputPath, edgeCases ) {

    const baseName = path.basename( filePath, '.js' )
    const edgeCase = edgeCases[ baseName ]

    let data = {
        imports:      imports,
        replacements: replacements,
        exports:      exports,
        output:       outputPath,
    }

    if ( edgeCase ) {

        if ( edgeCase.imports_override ) {
            data.imports = edgeCase.imports_override
        } else if ( edgeCase.imports ) {
            Array.prototype.push.apply( data.imports, edgeCase.imports )
        }

        if ( edgeCase.replacements_override ) {
            data.replacements = edgeCase.replacements_override
        } else if ( edgeCase.replacements ) {
            Array.prototype.push.apply( data.replacements, edgeCase.replacements )
        }

        if ( edgeCase.exports_override ) {
            data.exports = edgeCase.exports_override
        } else if ( edgeCase.exports ) {
            Array.prototype.push.apply( data.exports, edgeCase.exports )
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

    convert: function convert ( callback ) {

        const inputs    = this.inputs
        const excludes  = this.excludes
        const output    = this.output
        const edgeCases = this.edgeCases

        const allFilesPaths       = _getFilesPathsUnder( inputs, [] )
        const availableFilesPaths = _excludesFilesPaths( allFilesPaths, excludes )
        const jsFiles             = _filterJavascriptFiles( availableFilesPaths )
        const filesToConvert      = _filterES6Files( jsFiles )

        _createExportMap( jsFiles )

        console.log( '\n' )

        for ( let filePathIndex = 0, numberOfFilePaths = allFilesPaths.length ; filePathIndex < numberOfFilePaths ; filePathIndex++ ) {

            const filePath = allFilesPaths[ filePathIndex ]

            if ( filesToConvert.includes( filePath ) ) {

                let imports      = _getImportsFor( filePath )
                let replacements = _getReplacementsFor( filePath )
                let exports      = _getExportsFor( filePath )
                let outputPath   = _getOutputFor( filePath, output )

                console.log( 'Convert: ' + filePath + '\nto       ' + outputPath + '\n' )

                const data = _applyEdgeCases( filePath, imports, replacements, exports, outputPath, edgeCases )
                _createFile( filePath, data.imports, data.replacements, data.exports, data.output )

            } else if ( availableFilesPaths.includes( filePath ) ) {

                let imports      = ''
                let replacements = []
                let exports      = ''
                let outputPath   = _getOutputFor( filePath, output )

                console.log( 'Copy:    ' + filePath + '\nto       ' + outputPath + '\n' )

                const data = _applyEdgeCases( filePath, imports, replacements, exports, outputPath, edgeCases )
                _copyFile( filePath, data.output )

            } else {

                console.log( 'Skip:    ' + filePath + '\n' )

            }

        }

        callback()

    },

    getAllExports: function getAllExports ( path ) {

        // Todo: should be exports
        return _formatImportStatements( path, Object.keys( _exportMap ) )

    },

} )

const instance = new Es6()
module.exports = instance
