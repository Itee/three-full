/**
 * @file The threejs convertor
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

const fs    = require( 'fs' )
const path  = require( 'path' )
const utils = require( './utils' )

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

function _removeCommentsFrom ( file ) {

    return file.replace( /\/\*[\s\S]*?\*\//g, '' ) // Multi-lines comment
               .replace( /\/\/.*/g, '' ) // Single line comment

}

function _removeStringsFrom ( file ) {

    return file.replace( /".*"|\'.*\'/g, '' )

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

function _convertFile ( banner, fileDatas ) {

    const outputPath = fileDatas.output

    const formatedImports = _formatImportStatements( outputPath, fileDatas.imports )
    const formatedFile    = _formatReplacementStatements( fileDatas.file, fileDatas.replacements )
    const formatedExports = _formatExportStatements( outputPath, fileDatas.exports )
    const outputFile      = banner + formatedImports + formatedFile + formatedExports
    const cleanFile       = _cleanFile( outputFile )

    fs.mkdirSync( path.dirname( outputPath ), { recursive: true } )
    fs.writeFileSync( outputPath, cleanFile )

}

function _copyFile ( banner, fileDatas ) {

    const outputPath = fileDatas.output
    const file       = banner + fileDatas.file
    const cleanFile  = _cleanFile( file )

    fs.mkdirSync( path.dirname( outputPath ), { recursive: true } )
    fs.writeFileSync( outputPath, cleanFile )

}

function _cleanFile ( file ) {

    // Remove extra blank lines then extra semi-colon
    return file.replace( /(^[\s\t]*[\r\n]){2,}/gm, '' )
               .replace( /;([\r\n]*;)/gm, ';' )

}

///////////////////////// COMMON UTILS //////////////////////////////

function _makeUnique ( value, index, array ) {

    return array.indexOf( value ) === index

}

/////////////////////////// ES6 CONVERTOR PRIVATE STUFF ////////////////////////////

/////////////////////////// EXPORTS MAPS ////////////////////////////

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
        baseFile      = utils.getFileForPath( filePath )
        file          = _removeCommentsFrom( _removeStringsFrom( baseFile ) )

        exports = _getExportsFor( file, edgeCase[ 'exports' ], edgeCase[ 'exportsOverride' ] )
        if ( !exports ) {

            // Fallback with file name in last resore
            console.error( 'WARNING: ' + baseName + ' from ' + filePath + ' does not contains explicit or implicit export, fallback to file name as default export... If the file name does not corespond to the expected stuff, please update es6.config.edgeCases.' + baseName + '.exports' )
            exports = [ baseName ]

        }

        outputPath = _getOutputFor( filePath, outputBasePath, edgeCase[ 'outputOverride' ] )

        exports.forEach( ( exportedElement ) => {

            // Check case where export is an array with 'from' or 'as'
            if ( Array.isArray( exportedElement ) ) {

                if ( exportedElement.length === 3 ) {

                    if ( exportedElement[ 1 ] === 'as' ) {

                        exportedElement = exportedElement[ 2 ]

                    } else {

                        console.error( 'WARNING: Element "' + exportedElement + '" in file ' + path.basename( filePath ) + ' contain multiples element or alias in an unmanaged way. Defaulting to the first element as export of the file !' )
                        exportedElement = exportedElement[ 0 ]

                    }

                } else {

                    console.error( 'WARNING: Element "' + exportedElement + '" in file ' + path.basename( filePath ) + ' contain multiples element or alias in an unmanaged way. Defaulting to the first element as export of the file !' )
                    exportedElement = exportedElement[ 0 ]

                }

            }

            // Check about duplicated exports, Keep source path when possible then jsm and finally example
            const exportPath = _exportMap[ exportedElement ]
            if ( exportPath ) {

                // Retrieve origin of previous export
                const baseExportPath = _revertExportMap[ exportedElement ]

                //Todo: Need to setup a precedence over file path to determine which export is the right
                const sourcePathTarget  = 'sources\\'
                const srcPathTarget     = 'src\\'
                const modulePathTarget  = 'jsm\\'
                const examplePathTarget = 'examples\\js\\'

                if ( baseExportPath.contains( sourcePathTarget ) ) {

                    if ( filePath.contains( srcPathTarget ) ) {

                        console.error( 'ERROR: Element "' + exportedElement + '" in source folder ' + filePath + ' is already exported by source ' + baseExportPath + '! Unable to determine which source file is the right exporter !!! Please update es6.config.excludes and add the wrong exporter file.' )

                    } else if ( filePath.contains( modulePathTarget ) ) {

                        console.warn( 'WARNING: Element "' + exportedElement + '" in jsm folder ' + filePath + ' is already exported by source ' + baseExportPath + '. Ignoring the jsm export ! Please update es6.config.excludes and add the wrong exporter file: ' + baseExportPath )

                    } else if ( filePath.contains( examplePathTarget ) ) {

                        console.warn( 'WARNING: Element "' + exportedElement + '" in example folder ' + filePath + ' is already exported by source ' + baseExportPath + '. Ignoring the example export ! Please update es6.config.excludes and add the wrong exporter file: ' + baseExportPath )

                    } else {

                        console.error( 'ERROR: Element "' + exportedElement + '" from ' + filePath + ' is already exported by ' + baseExportPath + '! Unable to determine which file is the right exporter !!! Please update es6.config.excludes and add the wrong exporter file.' )

                    }

                } else if ( baseExportPath.contains( modulePathTarget ) ) {

                    if ( filePath.contains( srcPathTarget ) ) {

                        console.warn( 'WARNING: Element "' + exportedElement + '" in source folder ' + filePath + ' is already exported by jsm ' + baseExportPath + '. Replacing by the source file ! Please update es6.config.excludes and add the wrong exporter file: ' + baseExportPath )
                        _exportMap[ exportedElement ]       = outputPath
                        _revertExportMap[ exportedElement ] = filePath

                    } else if ( filePath.contains( modulePathTarget ) ) {

                        console.error( 'ERROR: Element "' + exportedElement + '" in jsm folder ' + filePath + ' is already exported by jsm ' + baseExportPath + '! Unable to determine which jsm file is the right exporter !!! Please update es6.config.excludes and add the wrong exporter file.' )

                    } else if ( filePath.contains( examplePathTarget ) ) {

                        console.warn( 'WARNING: Element "' + exportedElement + '" in example folder ' + filePath + ' is already exported by jsm ' + baseExportPath + '. Ignoring the example export ! Please update es6.config.excludes and add the wrong exporter file: ' + baseExportPath )

                    } else {

                        console.error( 'ERROR: Element "' + exportedElement + '" from ' + filePath + ' is already exported by ' + baseExportPath + '! Unable to determine which file is the right exporter !!! Please update es6.config.excludes and add the wrong exporter file.' )

                    }

                } else if ( baseExportPath.contains( examplePathTarget ) ) {

                    if ( filePath.contains( srcPathTarget ) ) {

                        console.warn( 'WARNING: Element "' + exportedElement + '" in source folder ' + filePath + ' is already exported by example ' + baseExportPath + '. Replacing by the source file ! Please update es6.config.excludes and add the wrong exporter file: ' + baseExportPath )
                        _exportMap[ exportedElement ]       = outputPath
                        _revertExportMap[ exportedElement ] = filePath

                    } else if ( filePath.contains( modulePathTarget ) ) {

                        console.warn( 'WARNING: Element "' + exportedElement + '" in jsm folder ' + filePath + ' is already exported by example ' + baseExportPath + '. Replacing by the jsm export ! Please update es6.config.excludes and add the wrong exporter file: ' + baseExportPath )
                        _exportMap[ exportedElement ]       = outputPath
                        _revertExportMap[ exportedElement ] = filePath

                    } else if ( filePath.contains( examplePathTarget ) ) {

                        console.error( 'ERROR: Element "' + exportedElement + '" in example folder ' + filePath + ' is already exported by example ' + baseExportPath + '! Unable to determine which example file is the right exporter !!! Please update es6.config.excludes and add the wrong exporter file.' )

                    } else {

                        console.error( 'ERROR: Element "' + exportedElement + '" from ' + filePath + ' is already exported by ' + baseExportPath + '! Unable to determine which file is the right exporter !!! Please update es6.config.excludes and add the wrong exporter file.' )

                    }

                } else {

                    console.error( 'ERROR: Element "' + exportedElement + '" from unmanaged file ' + filePath + ' is already exported by unmanaged file ' + baseExportPath + '! Unable to determine which file is the right exporter !!! Please update es6.config.excludes and add the wrong exporter file.' )

                }

            } else {

                _exportMap[ exportedElement ]       = outputPath
                _revertExportMap[ exportedElement ] = filePath

            }

        } )

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
        baseFile      = utils.getFileForPath( filePath )
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
            exports = _getExportsFor( file, edgeCase[ 'exports' ], edgeCase[ 'exportsOverride' ] )
            if ( !exports ) {

                // Fallback with file name in last resore
                console.error( 'WARNING: ' + baseName + ' from ' + filePath + ' does not contains explicit or implicit export, fallback to file name as default export... If the file name does not corespond to the expected stuff, please update es6.config.edgeCases.' + baseName + '.exports' )
                exports = [ baseName ]

            }

            imports = _getImportsFor( {
                file:    _removeCommentsFrom( _removeStringsFrom( baseFile ) ),
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
    matchs.forEach( ( value ) => {

        const results = value.replace( 'import', '' )
                             .replace( 'from', '' )
                             .replace( /[{}]/g, '' )
                             .replace( /(?<!as)\s+(?!as)/g, '' ) // Keep "Foo as _Foo"
                             .split( ',' )

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
    matchs.forEach( ( value ) => {

        const results = value.replace( /Object\.assign\(\s+/g, '' )
                             .replace( /THREE\./g, '' )
                             .replace( /\.prototype/g, '' )
                             .replace( /\s+/g, '' )
                             .split( ',' )

        if ( results.length > 0 ) {
            Array.prototype.push.apply( statements, results )
        }

    } )

    return statements

}

function _getAllInheritStatementsIn ( file, exports ) {

    let statements = []

    const matchs = file.match( /Object\.create\(\s+((THREE.)?(\w+)\.prototype[,]?\s*)+\)/g ) || []
    matchs.forEach( ( value ) => {

        const results = value.replace( /Object\.create\(\s+(THREE.)?/g, '' )
                             .replace( /\.prototype/g, '' )
                             .replace( /\)/g, '' )
                             .replace( /\s+/g, '' )
                             .split( ',' )

        if ( results.length > 0 ) {
            Array.prototype.push.apply( statements, results )
        }

    } )

    return statements

}

function _getAllNewStatementIn ( file, exports ) {

    let statements = []

    const matchs = file.match( /new\sTHREE\.(\w+)\s?/g ) || []
    matchs.forEach( ( value ) => {

        const result = value.replace( /new\sTHREE\./g, '' )
                            .replace( /\s+/g, '' )

        if ( result ) { statements.push( result ) }

    } )

    return statements

}

function _getAllInstanceOfStatementIn ( file, exports ) {

    let statements = []

    const matchs = file.match( /instanceof\sTHREE.(\w+)\s?/g ) || []
    matchs.forEach( ( value ) => {

        const result = value.replace( /instanceof\sTHREE\./g, '' )
                            .replace( /\s+/g, '' )

        if ( result ) { statements.push( result ) }

    } )

    return statements

}

function _getAllThreeObjectsIn ( file, exports ) {

    let statements = []

    const matchs = file.match( /(?<=THREE\.)(\w+)/g ) || []
    matchs.forEach( ( value ) => {

        if ( value ) { statements.push( value ) }

    } )

    return statements

}

function _getAllImportsFromExports ( file, exports ) {

    let statements = []

    for ( let exportName in _exportMap ) {

        const regex  = new RegExp( '(?<!\\w)' + exportName + '(?!\\w)', 'g' )
        const matchs = file.match( regex ) || []
        matchs.forEach( ( value ) => {

            // Check if the new statement is not about the exported object !
            if ( exports.includes( value ) ) {
                return
            }

            if ( value ) { statements.push( value ) }

        } )

    }

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
    Array.prototype.push.apply( statements, _getAllImportsFromExports( file, exports ) )
    Array.prototype.push.apply( statements, _getAllThreeObjectsIn( file, exports ) )
    //    Array.prototype.push.apply( statements, _getAllConstantStatementIn( file ) )

    // Special treatment for intermediary exporter file or Class imported using "as" keyword
    // A class can be inherited and dynamicaly create by new in the same file so we need to check uniqueness

    return statements.flatMap( statement => {

                         if ( statement.contains( ' as ' ) ) {

                             const targetImport = statement.split( ' ' )[ 2 ]
                             if ( targetImport === '_Math' ) {

                                 return [ '_Math' ]

                             } else if ( targetImport === 'Curves' ) {

                                 // Equivalent to ( import * as Curves from 'intermediary exporter file Curves' )
                                 return [
                                     'ArcCurve',
                                     'CatmullRomCurve3',
                                     'CubicBezierCurve',
                                     'CubicBezierCurve3',
                                     'EllipseCurve',
                                     'LineCurve',
                                     'LineCurve3',
                                     'QuadraticBezierCurve',
                                     'QuadraticBezierCurve3',
                                     'SplineCurve',
                                     'GrannyKnot',
                                     'HeartCurve',
                                     'VivianiCurve',
                                     'KnotCurve',
                                     'HelixCurve',
                                     'TrefoilKnot',
                                     'TorusKnot',
                                     'CinquefoilKnot',
                                     'TrefoilPolynomialKnot',
                                     'FigureEightPolynomialKnot',
                                     'DecoratedTorusKnot4a',
                                     'DecoratedTorusKnot4b',
                                     'DecoratedTorusKnot5a',
                                     'DecoratedTorusKnot5c'
                                 ]

                             } else if ( targetImport === 'Geometries' ) {

                                 // Equivalent to ( import * as Geometries from 'intermediary exporter file Geometries' )
                                 return [
                                     'WireframeGeometry',
                                     'TetrahedronGeometry',
                                     'TetrahedronBufferGeometry',
                                     'OctahedronGeometry',
                                     'OctahedronBufferGeometry',
                                     'IcosahedronGeometry',
                                     'IcosahedronBufferGeometry',
                                     'DodecahedronGeometry',
                                     'DodecahedronBufferGeometry',
                                     'PolyhedronGeometry',
                                     'PolyhedronBufferGeometry',
                                     'TubeGeometry',
                                     'TubeBufferGeometry',
                                     'TorusKnotGeometry',
                                     'TorusGeometry',
                                     'TorusBufferGeometry',
                                     'TextGeometry',
                                     'TextBufferGeometry',
                                     'SphereGeometry',
                                     'SphereBufferGeometry',
                                     'RingGeometry',
                                     'RingBufferGeometry',
                                     'PlaneGeometry',
                                     'PlaneBufferGeometry',
                                     'LatheGeometry',
                                     'LatheBufferGeometry',
                                     'ShapeGeometry',
                                     'ShapeBufferGeometry',
                                     'ExtrudeGeometry',
                                     'ExtrudeBufferGeometry',
                                     'EdgesGeometry',
                                     'ConeGeometry',
                                     'ConeBufferGeometry',
                                     'CylinderGeometry',
                                     'CylinderBufferGeometry',
                                     'CircleGeometry',
                                     'CircleBufferGeometry',
                                     'BoxGeometry',
                                     'BoxBufferGeometry'
                                 ]

                             } else if ( targetImport === 'Materials' ) {

                                 // Equivalent to ( import * as Materials from 'intermediary exporter file Materials' )
                                 return [
                                     'LineBasicMaterial',
                                     'LineDashedMaterial',
                                     'MeshBasicMaterial',
                                     'MeshDepthMaterial',
                                     'MeshDistanceMaterial',
                                     'MeshLambertMaterial',
                                     'MeshNormalMaterial',
                                     'MeshPhongMaterial',
                                     'MeshPhysicalMaterial',
                                     'MeshStandardMaterial',
                                     'MeshToonMaterial',
                                     'PointsMaterial',
                                     'RawShaderMaterial',
                                     'ShaderMaterial',
                                     'ShadowMaterial',
                                     'SpriteMaterial'
                                 ]

                             } else if ( targetImport === 'Nodes' ) {

                                 // Equivalent to ( import * as Nodes from 'intermediary exporter file Nodes' )
                                 return [
                                     'Node',
                                     'TempNode',
                                     'InputNode',
                                     'ConstNode',
                                     'VarNode',
                                     'StructNode',
                                     'AttributeNode',
                                     'FunctionNode',
                                     'ExpressionNode',
                                     'FunctionCallNode',
                                     'NodeLib',
                                     'NodeUtils',
                                     'NodeFrame',
                                     'NodeUniform',
                                     'NodeBuilder',
                                     'BoolNode',
                                     'IntNode',
                                     'FloatNode',
                                     'Vector2Node',
                                     'Vector3Node',
                                     'Vector4Node',
                                     'ColorNode',
                                     'Matrix3Node',
                                     'Matrix4Node',
                                     'TextureNode',
                                     'CubeTextureNode',
                                     'ScreenNode',
                                     'ReflectorNode',
                                     'PropertyNode',
                                     'RTTNode',
                                     'UVNode',
                                     'ColorsNode',
                                     'PositionNode',
                                     'NormalNode',
                                     'CameraNode',
                                     'LightNode',
                                     'ReflectNode',
                                     'ScreenUVNode',
                                     'ResolutionNode',
                                     'MathNode',
                                     'OperatorNode',
                                     'CondNode',
                                     'NoiseNode',
                                     'CheckerNode',
                                     'TextureCubeUVNode',
                                     'TextureCubeNode',
                                     'NormalMapNode',
                                     'BumpMapNode',
                                     'BypassNode',
                                     'JoinNode',
                                     'SwitchNode',
                                     'TimerNode',
                                     'VelocityNode',
                                     'UVTransformNode',
                                     'MaxMIPLevelNode',
                                     'SpecularMIPLevelNode',
                                     'ColorSpaceNode',
                                     'SubSlotNode',
                                     'BlurNode',
                                     'ColorAdjustmentNode',
                                     'LuminanceNode',
                                     'RawNode',
                                     'SpriteNode',
                                     'PhongNode',
                                     'StandardNode',
                                     'MeshStandardNode',
                                     'NodeMaterial',
                                     'SpriteNodeMaterial',
                                     'PhongNodeMaterial',
                                     'StandardNodeMaterial',
                                     'MeshStandardNodeMaterial',
                                     'NodePostProcessing'
                                 ]

                             } else {

                                 return []

                             }

                         } else {
                             return [ statement ]
                         }
                     } )
                     .filter( _makeUnique )
                     .filter( ( value ) => { return !( value.endsWith( '_vert' ) || value.endsWith( '_vertex' ) || value.endsWith( '_frag' ) || value.endsWith( '_fragment' ) ) } )
                     .filter( ( value ) => { return !exports.includes( value ) } )

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

            // That why we use path as key and not the inverse
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

            console.error( 'ERROR: ' + path.basename( importPath ) + ' does not contains imports, fallback to file name export...' )

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

    const potentialClassicObjectExports = file.match( /(?<=THREE\.)(\w+)(?=\s*=\s*function)|(?<=THREE\.)(\w+)(?=\s*=\s*\(\s*function)/g )
    if ( potentialClassicObjectExports ) {

        Array.prototype.push.apply( exportedElements, potentialClassicObjectExports )

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

function _getExportsFor ( file, exportsMissing = [], exportsOverride = undefined ) {

    if ( exportsOverride ) {
        return exportsOverride
    }

    // Todo: need to sort different file type before
    const es6Regex = new RegExp( /(export\s(default|var))|((import|export)[\r\n\s]*(default)?({[\w\s,]+}\s?(from)?))/, 'g' )
    if ( file.match( es6Regex ) ) {

        const es6Exports = _getExportsStatementsInES6File( file )
        if ( es6Exports.length > 0 ) {
            if ( exportsMissing ) { Array.prototype.push.apply( es6Exports, exportsMissing ) }
            return es6Exports
        }

    }

    const amdRegex = new RegExp( /define\.amd/, 'g' )
    if ( file.match( amdRegex ) ) {
        console.error( 'WARNING: ' + path.basename( file ) + ' is unable to be process... It is an AMD module. Sorry for the disagreement.' )
        return [ path.basename( file, '.js' ) ]
    }

    const commonjsExports = _getExportsStatementsInCJSFile( file )
    if ( commonjsExports.length > 0 ) {
        if ( exportsMissing ) { Array.prototype.push.apply( commonjsExports, exportsMissing ) }
        return commonjsExports
    }

    // Try to find potential export from assigned javascript object
    const assignementExports = _getExportsStatementsInJSAssignmentsFile( file )
    if ( assignementExports.length > 0 ) {
        if ( exportsMissing ) { Array.prototype.push.apply( assignementExports, exportsMissing ) }
        return assignementExports
    }

    // Try to find potential export from prototype javascript object
    const prototypeExports = _getExportsStatementsInPrototypedFile( file )
    if ( prototypeExports.length > 0 ) {
        if ( exportsMissing ) { Array.prototype.push.apply( prototypeExports, exportsMissing ) }
        return prototypeExports
    }

    // Try to find potential export from library style
    const libExports = _getExportsStatementInLibFile( file )
    if ( libExports.length > 0 ) {
        if ( exportsMissing ) { Array.prototype.push.apply( libExports, exportsMissing ) }
        return libExports
    }

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

        console.error( 'WARNING: ' + path.basename( filePath ) + ' from ' + filePath + ' does not contains explicit or implicit export, fallback to file name as default export... If the file name does not corespond to the expected stuff, please update es6.config.edgeCases.' + path.basename( filePath ) + '.exports' )
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
        const exampleJsmTarget   = 'three\\examples\\jsm'
        const exampleJsTarget    = 'three\\examples\\js'
        const extraTarget        = 'three\\src\\extras'
        const sourceTarget       = 'three\\src'

        let indexOfExampleFontsTarget = path.indexOf( exampleFontsTarget )
        let indexOfExampleJsmTarget   = path.indexOf( exampleJsmTarget )
        let indexOfExampleJsTarget    = path.indexOf( exampleJsTarget )
        let indexOfExtraTarget        = path.indexOf( extraTarget )
        let indexOfSourceTarget       = path.indexOf( sourceTarget )
        let specificPath              = undefined

        if ( indexOfExampleFontsTarget > -1 ) {

            specificPath = 'fonts\\' + path.slice( indexOfExampleFontsTarget + exampleFontsTarget.length )

        } else if ( indexOfExampleJsmTarget > -1 ) {

            specificPath = path.slice( indexOfExampleJsmTarget + exampleJsmTarget.length )

        } else if ( indexOfExampleJsTarget > -1 ) {

            specificPath = path.slice( indexOfExampleJsTarget + exampleJsTarget.length )

        } else if ( indexOfExtraTarget > -1 ) {

            specificPath = path.slice( indexOfExtraTarget + extraTarget.length )

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

            // Add/Remove exports from edgeCase
            for ( let i = 0, numberOfExports = edgeCase.imports.length ; i < numberOfExports ; i++ ) {

                const edgeCaseImport = edgeCase.imports[ i ]

                if ( typeof edgeCaseImport === 'string' && edgeCaseImport.startsWith( '!' ) ) {

                    const realImportName = edgeCaseImport.slice( 1 )

                    if ( data.imports.includes( realImportName ) ) {
                        data.imports.splice( data.imports.indexOf( realImportName ), 1 )
                    } else {
                        console.error( `Try to remove unexisting import ${realImportName} from ${filePath}. You should remove the this case from config file.` )
                    }

                } else {

                    if ( data.imports.includes( edgeCaseImport ) ) {
                        console.error( `Try to add already existing import ${edgeCaseImport} from ${filePath}. You should remove this edge case from config file.` )
                    } else {
                        data.imports.push( edgeCaseImport )
                    }

                }

            }

            //Array.prototype.push.apply( data.imports, edgeCase.imports )
            data.imports.filter( _makeUnique )
        }

        if ( edgeCase.replacementsOverride ) {
            data.replacements = edgeCase.replacementsOverride
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

// STATICS
Object.assign( Es6, {} )

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

        const inputs    = this.inputs
        const excludes  = this.excludes
        const output    = this.output
        //        const output    = _output = this.output
        const edgeCases = this.edgeCases
        const banner    = this.banner

        const allFilesPaths       = utils.getFilesPathsUnder( inputs )
        const availableFilesPaths = utils.excludesFilesPaths( allFilesPaths, excludes )
        const jsFiles             = utils.filterJavascriptFiles( availableFilesPaths )

        _createExportMap( jsFiles, edgeCases, output )
        _createFilesMap( availableFilesPaths, edgeCases, output )

        //
        //

        let fileDatas = undefined

        for ( let fileName in _fileMap ) {

            if ( !_fileMap.hasOwnProperty( fileName ) ) { continue }

            fileDatas = _fileMap[ fileName ]

            if ( fileDatas.isJavascript ) {

                _convertFile( banner, fileDatas )

            } else {

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
