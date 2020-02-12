//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Group } from '../objects/Group.js'
import { LoaderSupport } from './LoaderSupport.js'
import { FileLoader } from './FileLoader.js'
import { MTLLoader } from './MTLLoader.js'
import { LoaderUtils } from './LoaderUtils.js'
import { DefaultLoadingManager } from './LoadingManager.js'

/**
  * @author Kai Salmen / https://kaisalmen.de
  * Development repository: https://github.com/kaisalmen/WWOBJLoader
  */

'use strict';
if ( LoaderSupport === undefined ) console.error( '"LoaderSupport" is not available. "OBJLoader2" requires it. Please include "LoaderSupport.js" in your HTML.' );

/**
 * Use this class to load OBJ data from files or to parse OBJ data from an arraybuffer
 * @class
 *
 * @param {DefaultLoadingManager} [manager] The loadingManager for the loader to use. Default is {@link DefaultLoadingManager}
 */

var OBJLoader2 = function ( manager ) {
	this.manager = LoaderSupport.Validator.verifyInput( manager, DefaultLoadingManager );
	this.logging = {
		enabled: true,
		debug: false
	};

	this.modelName = '';
	this.instanceNo = 0;
	this.path;
	this.resourcePath;
	this.useIndices = false;
	this.disregardNormals = false;
	this.materialPerSmoothingGroup = false;
	this.useOAsMesh = false;
	this.loaderRootNode = new Group();

	this.meshBuilder = new LoaderSupport.MeshBuilder();
	this.callbacks = new LoaderSupport.Callbacks();
	this.workerSupport = new LoaderSupport.WorkerSupport();
	this.terminateWorkerOnLoad = true;
};
OBJLoader2.OBJLOADER2_VERSION = '2.5.1';
console.info( 'Using OBJLoader2 version: ' + OBJLoader2.OBJLOADER2_VERSION );
OBJLoader2.prototype = {

	constructor: OBJLoader2,

	/**
	 * Enable or disable logging in general (except warn and error), plus enable or disable debug logging.
	 *
	 * @param {boolean} enabled True or false.
	 * @param {boolean} debug True or false.
	 */
	setLogging: function ( enabled, debug ) {
		this.logging.enabled = enabled === true;
		this.logging.debug = debug === true;
		this.meshBuilder.setLogging( this.logging.enabled, this.logging.debug );
	},

	/**
	 * Set the name of the model.
	 *
	 * @param {string} modelName
	 */
	setModelName: function ( modelName ) {
		this.modelName = LoaderSupport.Validator.verifyInput( modelName, this.modelName );
	},

	/**
	 * The URL of the base path.
	 *
	 * @param {string} path URL
	 */
	setPath: function ( path ) {
		this.path = LoaderSupport.Validator.verifyInput( path, this.path );
	},

	/**
	 * Allows to specify resourcePath for dependencies of specified resource.
	 * @param {string} resourcePath
	 */
	setResourcePath: function ( resourcePath ) {
		this.resourcePath = LoaderSupport.Validator.verifyInput( resourcePath, this.resourcePath );
	},

	/**
	 * Set the node where the loaded objects will be attached directly.
	 *
	 * @param {Object3D} streamMeshesTo Object already attached to scenegraph where new meshes will be attached to
	 */
	setStreamMeshesTo: function ( streamMeshesTo ) {
		this.loaderRootNode = LoaderSupport.Validator.verifyInput( streamMeshesTo, this.loaderRootNode );
	},

	/**
	 * Set materials loaded by MTLLoader or any other supplier of an Array of {@link Material}.
	 *
	 * @param {Material[]} materials Array of {@link Material}
	 */
	setMaterials: function ( materials ) {
		this.meshBuilder.setMaterials( materials );
	},

	/**
	 * Instructs loaders to create indexed {@link BufferGeometry}.
	 *
	 * @param {boolean} useIndices=false
	 */
	setUseIndices: function ( useIndices ) {
		this.useIndices = useIndices === true;
	},

	/**
	 * Tells whether normals should be completely disregarded and regenerated.
	 *
	 * @param {boolean} disregardNormals=false
	 */
	setDisregardNormals: function ( disregardNormals ) {
		this.disregardNormals = disregardNormals === true;
	},

	/**
	 * Tells whether a material shall be created per smoothing group.
	 *
	 * @param {boolean} materialPerSmoothingGroup=false
	 */
	setMaterialPerSmoothingGroup: function ( materialPerSmoothingGroup ) {
		this.materialPerSmoothingGroup = materialPerSmoothingGroup === true;
	},

	/**
	 * Usually 'o' is meta-information and does not result in creation of new meshes, but mesh creation on occurrence of "o" can be enforced.
	 *
	 * @param {boolean} useOAsMesh=false
	 */
	setUseOAsMesh: function ( useOAsMesh ) {
		this.useOAsMesh = useOAsMesh === true;
	},

	_setCallbacks: function ( callbacks ) {
		if ( LoaderSupport.Validator.isValid( callbacks.onProgress ) ) this.callbacks.setCallbackOnProgress( callbacks.onProgress );
		if ( LoaderSupport.Validator.isValid( callbacks.onReportError ) ) this.callbacks.setCallbackOnReportError( callbacks.onReportError );
		if ( LoaderSupport.Validator.isValid( callbacks.onMeshAlter ) ) this.callbacks.setCallbackOnMeshAlter( callbacks.onMeshAlter );
		if ( LoaderSupport.Validator.isValid( callbacks.onLoad ) ) this.callbacks.setCallbackOnLoad( callbacks.onLoad );
		if ( LoaderSupport.Validator.isValid( callbacks.onLoadMaterials ) ) this.callbacks.setCallbackOnLoadMaterials( callbacks.onLoadMaterials );

		this.meshBuilder._setCallbacks( this.callbacks );
	},

	/**
	 * Announce feedback which is give to the registered callbacks.
	 * @private
	 *
	 * @param {string} type The type of event
	 * @param {string} text Textual description of the event
	 * @param {number} numericalValue Numerical value describing the progress
	 */
	onProgress: function ( type, text, numericalValue ) {
		var content = LoaderSupport.Validator.isValid( text ) ? text: '';
		var event = {
			detail: {
				type: type,
				modelName: this.modelName,
				instanceNo: this.instanceNo,
				text: content,
				numericalValue: numericalValue
			}
		};

		if ( LoaderSupport.Validator.isValid( this.callbacks.onProgress ) ) this.callbacks.onProgress( event );

		if ( this.logging.enabled && this.logging.debug ) console.debug( content );
	},

	_onError: function ( errorMessage ) {
		if ( this.logging.enabled && this.logging.debug ) {

			console.log( errorMessage );

		}
		if ( LoaderSupport.Validator.isValid( this.callbacks.onReportError ) )  {

			this.callbacks.onReportError( errorMessage );

		} else {

			throw errorMessage;

		}
	},

	/**
	 * Use this convenient method to load a file at the given URL. By default the fileLoader uses an ArrayBuffer.
	 *
	 * @param {string} url A string containing the path/URL of the file to be loaded.
	 * @param {callback} onLoad A function to be called after loading is successfully completed. The function receives loaded Object3D as an argument.
	 * @param {callback} [onProgress] A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains total and Integer bytes.
	 * @param {callback} [onError] A function to be called if an error occurs during loading. The function receives the error as an argument.
	 * @param {callback} [onMeshAlter] A function to be called after a new mesh raw data becomes available for alteration.
	 * @param {boolean} [useAsync] If true, uses async loading with worker, if false loads data synchronously.
	 */
	load: function ( url, onLoad, onProgress, onError, onMeshAlter, useAsync ) {
		var resource = new LoaderSupport.ResourceDescriptor( url, 'OBJ' );
		this._loadObj( resource, onLoad, onProgress, onError, onMeshAlter, useAsync );
	},

	_loadObj: function ( resource, onLoad, onProgress, onError, onMeshAlter, useAsync ) {
		var scope = this;
		if ( ! LoaderSupport.Validator.isValid( onError ) ) {

			onError = function ( event ) {

				var errorMessage = event;
				if ( event.currentTarget && event.currentTarget.statusText !== null ) {

					errorMessage = 'Error occurred while downloading!\nurl: ' + event.currentTarget.responseURL + '\nstatus: ' + event.currentTarget.statusText;

				}
				scope._onError( errorMessage );

			};
		}

		// fast-fail
		if ( ! LoaderSupport.Validator.isValid( resource ) ) onError( 'An invalid ResourceDescriptor was provided. Unable to continue!' );
		var fileLoaderOnLoad = function ( content ) {

			resource.content = content;
			if ( useAsync ) {

				scope.parseAsync( content, onLoad );

			} else {

				var callbacks = new LoaderSupport.Callbacks();
				callbacks.setCallbackOnMeshAlter( onMeshAlter );
				scope._setCallbacks( callbacks );
				onLoad(
					{
						detail: {
							loaderRootNode: scope.parse( content ),
							modelName: scope.modelName,
							instanceNo: scope.instanceNo
						}
					}
				);

			}
		};
		this.setPath( resource.path );
		this.setResourcePath( resource.resourcePath );

		// fast-fail
		if ( ! LoaderSupport.Validator.isValid( resource.url ) || LoaderSupport.Validator.isValid( resource.content ) ) {

			fileLoaderOnLoad( LoaderSupport.Validator.isValid( resource.content ) ? resource.content : null );

		} else {

			if ( ! LoaderSupport.Validator.isValid( onProgress ) ) {
				var numericalValueRef = 0;
				var numericalValue = 0;
				onProgress = function ( event ) {
					if ( ! event.lengthComputable ) return;

					numericalValue = event.loaded / event.total;
					if ( numericalValue > numericalValueRef ) {

						numericalValueRef = numericalValue;
						var output = 'Download of "' + resource.url + '": ' + ( numericalValue * 100 ).toFixed( 2 ) + '%';
						scope.onProgress( 'progressLoad', output, numericalValue );

					}
				};
			}
			var fileLoader = new FileLoader( this.manager );
			fileLoader.setPath( this.path || this.resourcePath );
			fileLoader.setResponseType( 'arraybuffer' );
			fileLoader.load( resource.name, fileLoaderOnLoad, onProgress, onError );

		}
	},

	/**
	 * Run the loader according the provided instructions.
	 *
	 * @param {LoaderSupport.PrepData} prepData All parameters and resources required for execution
	 * @param {LoaderSupport.WorkerSupport} [workerSupportExternal] Use pre-existing WorkerSupport
	 */
	run: function ( prepData, workerSupportExternal ) {
		this._applyPrepData( prepData );
		var available = prepData.checkResourceDescriptorFiles( prepData.resources,
			[
				{ ext: "obj", type: "ArrayBuffer", ignore: false },
				{ ext: "mtl", type: "String", ignore: false },
				{ ext: "zip", type: "String", ignore: true }
			]
		);
		if ( LoaderSupport.Validator.isValid( workerSupportExternal ) ) {

			this.terminateWorkerOnLoad = false;
			this.workerSupport = workerSupportExternal;
			this.logging.enabled = this.workerSupport.logging.enabled;
			this.logging.debug = this.workerSupport.logging.debug;

		}
		var scope = this;
		var onMaterialsLoaded = function ( materials ) {
			if ( materials !== null ) scope.meshBuilder.setMaterials( materials );
			scope._loadObj( available.obj, scope.callbacks.onLoad, null, null, scope.callbacks.onMeshAlter, prepData.useAsync );

		};
		this._loadMtl( available.mtl, onMaterialsLoaded, null, null, prepData.crossOrigin, prepData.materialOptions );
	},

	_applyPrepData: function ( prepData ) {
		if ( LoaderSupport.Validator.isValid( prepData ) ) {

			this.setLogging( prepData.logging.enabled, prepData.logging.debug );
			this.setModelName( prepData.modelName );
			this.setStreamMeshesTo( prepData.streamMeshesTo );
			this.meshBuilder.setMaterials( prepData.materials );
			this.setUseIndices( prepData.useIndices );
			this.setDisregardNormals( prepData.disregardNormals );
			this.setMaterialPerSmoothingGroup( prepData.materialPerSmoothingGroup );
			this.setUseOAsMesh( prepData.useOAsMesh );

			this._setCallbacks( prepData.getCallbacks() );

		}
	},

	/**
	 * Parses OBJ data synchronously from arraybuffer or string.
	 *
	 * @param {arraybuffer|string} content OBJ data as Uint8Array or String
	 */
	parse: function ( content ) {
		// fast-fail in case of illegal data
		if ( content === null || content === undefined ) {

			throw 'Provided content is not a valid ArrayBuffer or String. Unable to continue parsing';

		}
		if ( this.logging.enabled ) console.time( 'OBJLoader2 parse: ' + this.modelName );
		this.meshBuilder.init();

		var parser = new OBJLoader2.Parser();
		parser.setLogging( this.logging.enabled, this.logging.debug );
		parser.setMaterialPerSmoothingGroup( this.materialPerSmoothingGroup );
		parser.setUseOAsMesh( this.useOAsMesh );
		parser.setUseIndices( this.useIndices );
		parser.setDisregardNormals( this.disregardNormals );
		// sync code works directly on the material references
		parser.setMaterials( this.meshBuilder.getMaterials() );

		var scope = this;
		var onMeshLoaded = function ( payload ) {
			var meshes = scope.meshBuilder.processPayload( payload );
			var mesh;
			for ( var i in meshes ) {
				mesh = meshes[ i ];
				scope.loaderRootNode.add( mesh );
			}
		};
		parser.setCallbackOnAssetAvailable( onMeshLoaded );
		var onProgressScoped = function ( text, numericalValue ) {
			scope.onProgress( 'progressParse', text, numericalValue );
		};
		parser.setCallbackOnProgress( onProgressScoped );
		var onErrorScoped = function ( message ) {
			scope._onError( message );
		};
		parser.setCallbackOnError( onErrorScoped );

		if ( content instanceof ArrayBuffer || content instanceof Uint8Array ) {

			if ( this.logging.enabled ) console.info( 'Parsing arrayBuffer...' );
			parser.parse( content );

		} else if ( typeof( content ) === 'string' || content instanceof String ) {

			if ( this.logging.enabled ) console.info( 'Parsing text...' );
			parser.parseText( content );

		} else {

			this._onError( 'Provided content was neither of type String nor Uint8Array! Aborting...' );

		}
		if ( this.logging.enabled ) console.timeEnd( 'OBJLoader2 parse: ' + this.modelName );

		return this.loaderRootNode;
	},

	/**
	 * Parses OBJ content asynchronously from arraybuffer.
	 *
	 * @param {arraybuffer} content OBJ data as Uint8Array
	 * @param {callback} onLoad Called after worker successfully completed loading
	 */
	parseAsync: function ( content, onLoad ) {
		var scope = this;
		var measureTime = false;
		var scopedOnLoad = function () {
			onLoad(
				{
					detail: {
						loaderRootNode: scope.loaderRootNode,
						modelName: scope.modelName,
						instanceNo: scope.instanceNo
					}
				}
			);
			if ( measureTime && scope.logging.enabled ) console.timeEnd( 'OBJLoader2 parseAsync: ' + scope.modelName );
		};
		// fast-fail in case of illegal data
		if ( content === null || content === undefined ) {

			throw 'Provided content is not a valid ArrayBuffer or String. Unable to continue parsing';

		} else {

			measureTime = true;

		}
		if ( measureTime && this.logging.enabled ) console.time( 'OBJLoader2 parseAsync: ' + this.modelName );
		this.meshBuilder.init();

		var scopedOnMeshLoaded = function ( payload ) {
			var meshes = scope.meshBuilder.processPayload( payload );
			var mesh;
			for ( var i in meshes ) {
				mesh = meshes[ i ];
				scope.loaderRootNode.add( mesh );
			}
		};
		var buildCode = function ( codeSerializer ) {
			var workerCode = '';
			workerCode += '/**\n';
			workerCode += '  * This code was constructed by OBJLoader2 buildCode.\n';
			workerCode += '  */\n\n';
			workerCode += 'THREE = { LoaderSupport: {}, OBJLoader2: {} };\n\n';
			workerCode += codeSerializer.serializeClass( 'OBJLoader2.Parser', OBJLoader2.Parser );

			return workerCode;
		};
		this.workerSupport.validate( buildCode, 'OBJLoader2.Parser' );
		this.workerSupport.setCallbacks( scopedOnMeshLoaded, scopedOnLoad );
		if ( scope.terminateWorkerOnLoad ) this.workerSupport.setTerminateRequested( true );

		var materialNames = {};
		var materials = this.meshBuilder.getMaterials();
		for ( var materialName in materials ) {

			materialNames[ materialName ] = materialName;

		}
		this.workerSupport.run(
			{
				params: {
					useAsync: true,
					materialPerSmoothingGroup: this.materialPerSmoothingGroup,
					useOAsMesh: this.useOAsMesh,
					useIndices: this.useIndices,
					disregardNormals: this.disregardNormals
				},
				logging: {
					enabled: this.logging.enabled,
					debug: this.logging.debug
				},
				materials: {
					// in async case only material names are supplied to parser
					materials: materialNames
				},
				data: {
					input: content,
					options: null
				}
			}
		);
	},

	/**
	 * Utility method for loading an mtl file according resource description. Provide url or content.
	 *
	 * @param {string} url URL to the file
	 * @param {Object} content The file content as arraybuffer or text
	 * @param {function} onLoad Callback to be called after successful load
	 * @param {callback} [onProgress] A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains total and Integer bytes.
	 * @param {callback} [onError] A function to be called if an error occurs during loading. The function receives the error as an argument.
	 * @param {string} [crossOrigin] CORS value
 	 * @param {Object} [materialOptions] Set material loading options for MTLLoader
	 */
	loadMtl: function ( url, content, onLoad, onProgress, onError, crossOrigin, materialOptions ) {
		var resource = new LoaderSupport.ResourceDescriptor( url, 'MTL' );
		resource.setContent( content );
		this._loadMtl( resource, onLoad, onProgress, onError, crossOrigin, materialOptions );
	},

	_loadMtl: function ( resource, onLoad, onProgress, onError, crossOrigin, materialOptions ) {
		if ( MTLLoader === undefined ) console.error( '"MTLLoader" is not available. "OBJLoader2" requires it for loading MTL files.' );
		if ( LoaderSupport.Validator.isValid( resource ) && this.logging.enabled ) console.time( 'Loading MTL: ' + resource.name );

		var materials = {};
		var scope = this;
		var processMaterials = function ( materialCreator ) {
			var materialCreatorMaterials = [];
			if ( LoaderSupport.Validator.isValid( materialCreator ) ) {

				materialCreator.preload();
				materialCreatorMaterials = materialCreator.materials;
				for ( var materialName in materialCreatorMaterials ) {

					if ( materialCreatorMaterials.hasOwnProperty( materialName ) ) {

						materials[ materialName ] = materialCreatorMaterials[ materialName ];

					}
				}
			}

			if ( LoaderSupport.Validator.isValid( resource ) && scope.logging.enabled ) console.timeEnd( 'Loading MTL: ' + resource.name );
			onLoad( materials, materialCreator );
		};

		// fast-fail
		if ( ! LoaderSupport.Validator.isValid( resource ) || ( ! LoaderSupport.Validator.isValid( resource.content ) && ! LoaderSupport.Validator.isValid( resource.url ) ) ) {

			processMaterials();

		} else {

			var mtlLoader = new MTLLoader( this.manager );
			crossOrigin = LoaderSupport.Validator.verifyInput( crossOrigin, 'anonymous' );
			mtlLoader.setCrossOrigin( crossOrigin );
			mtlLoader.setResourcePath( resource.resourcePath || resource.path );
			if ( LoaderSupport.Validator.isValid( materialOptions ) ) mtlLoader.setMaterialOptions( materialOptions );

			var parseTextWithMtlLoader = function ( content ) {
				var contentAsText = content;
				if ( typeof( content ) !== 'string' && ! ( content instanceof String ) ) {

					if ( content.length > 0 || content.byteLength > 0 ) {

						contentAsText = LoaderUtils.decodeText( content );

					} else {

						scope._onError( 'Unable to parse mtl as it it seems to be neither a String, an Array or an ArrayBuffer!' );
					}

				}
				processMaterials( mtlLoader.parse( contentAsText ) );
			};

			if ( LoaderSupport.Validator.isValid( resource.content ) ) {

				parseTextWithMtlLoader( resource.content );

			} else if ( LoaderSupport.Validator.isValid( resource.url ) ) {

				var fileLoader = new FileLoader( this.manager );
				if ( ! LoaderSupport.Validator.isValid( onError ) ) {
					onError = function ( event ) {
						scope._onError( event );
					}
				}
				if ( ! LoaderSupport.Validator.isValid( onProgress ) ) {
					var numericalValueRef = 0;
					var numericalValue = 0;
					onProgress = function ( event ) {
						if ( ! event.lengthComputable ) return;

						numericalValue = event.loaded / event.total;
						if ( numericalValue > numericalValueRef ) {

							numericalValueRef = numericalValue;
							var output = 'Download of "' + resource.url + '": ' + ( numericalValue * 100 ).toFixed( 2 ) + '%';
							scope.onProgress( 'progressLoad', output, numericalValue );

						}
					};
				}

				fileLoader.load( resource.url, parseTextWithMtlLoader, onProgress, onError );

			}
		}
	}
};
/**
 * Parse OBJ data either from ArrayBuffer or string
 * @class
 */
OBJLoader2.Parser = function () {
	this.callbacks = {
		onProgress: null,
		onAssetAvailable: null,
		onError: null
	};
	this.contentRef = null;
	this.legacyMode = false;

	this.materials = {};
	this.useAsync = false;
	this.materialPerSmoothingGroup = false;
	this.useOAsMesh = false;
	this.useIndices = false;
	this.disregardNormals = false;

	this.vertices = [];
	this.colors = [];
	this.normals = [];
	this.uvs = [];

	this.rawMesh = {
		objectName: '',
		groupName: '',
		activeMtlName: '',
		mtllibName: '',

		// reset with new mesh
		faceType: -1,
		subGroups: [],
		subGroupInUse: null,
		smoothingGroup: {
			splitMaterials: false,
			normalized: -1,
			real: -1
		},
		counts: {
			doubleIndicesCount: 0,
			faceCount: 0,
			mtlCount: 0,
			smoothingGroupCount: 0
		}
	};

	this.inputObjectCount = 1;
	this.outputObjectCount = 1;
	this.globalCounts = {
		vertices: 0,
		faces: 0,
		doubleIndicesCount: 0,
		lineByte: 0,
		currentByte: 0,
		totalBytes: 0
	};

	this.logging = {
		enabled: true,
		debug: false
	};
};
OBJLoader2.Parser.prototype = {

	constructor: OBJLoader2.Parser,

	resetRawMesh: function () {
		// faces are stored according combined index of group, material and smoothingGroup (0 or not)
		this.rawMesh.subGroups = [];
		this.rawMesh.subGroupInUse = null;
		this.rawMesh.smoothingGroup.normalized = -1;
		this.rawMesh.smoothingGroup.real = -1;

		// this default index is required as it is possible to define faces without 'g' or 'usemtl'
		this.pushSmoothingGroup( 1 );

		this.rawMesh.counts.doubleIndicesCount = 0;
		this.rawMesh.counts.faceCount = 0;
		this.rawMesh.counts.mtlCount = 0;
		this.rawMesh.counts.smoothingGroupCount = 0;
	},

	setUseAsync: function ( useAsync ) {
		this.useAsync = useAsync;
	},

	setMaterialPerSmoothingGroup: function ( materialPerSmoothingGroup ) {
		this.materialPerSmoothingGroup = materialPerSmoothingGroup;
	},

	setUseOAsMesh: function ( useOAsMesh ) {
		this.useOAsMesh = useOAsMesh;
	},

	setUseIndices: function ( useIndices ) {
		this.useIndices = useIndices;
	},

	setDisregardNormals: function ( disregardNormals ) {
		this.disregardNormals = disregardNormals;
	},

	setMaterials: function ( materials ) {
		if ( materials === undefined || materials === null ) return;

		for ( var materialName in materials ) {
			if ( materials.hasOwnProperty( materialName ) ) {

				this.materials[ materialName ] = materials[ materialName ];

			}
		}
	},

	setCallbackOnAssetAvailable: function ( onAssetAvailable ) {
		if ( onAssetAvailable !== null && onAssetAvailable !== undefined ) {

			this.callbacks.onAssetAvailable = onAssetAvailable;

		}
	},

	setCallbackOnProgress: function ( onProgress ) {
		if ( onProgress !== null && onProgress !== undefined ) {

			this.callbacks.onProgress = onProgress;

		}
	},

	setCallbackOnError: function ( onError ) {
		if ( onError !== null && onError !== undefined ) {

			this.callbacks.onError = onError;

		}
	},
	setLogging: function ( enabled, debug ) {
		this.logging.enabled = enabled === true;
		this.logging.debug = debug === true;
	},

	configure: function () {
		if ( this.callbacks.onAssetAvailable === null ) {

			var errorMessage = 'Unable to run as no callback for building meshes is set.';
			if ( this.callbacks.onError !== null ) {

				this.callbacks.onError( errorMessage );

			} else {

				throw errorMessage;
			}

		}
		this.pushSmoothingGroup( 1 );

		if ( this.logging.enabled ) {

			var matKeys = Object.keys( this.materials );
			var matNames = ( matKeys.length > 0 ) ? '\n\tmaterialNames:\n\t\t- ' + matKeys.join( '\n\t\t- ' ) : '\n\tmaterialNames: None';
			var printedConfig = 'OBJLoader2.Parser configuration:'
				+ matNames
				+ '\n\tuseAsync: ' + this.useAsync
				+ '\n\tmaterialPerSmoothingGroup: ' + this.materialPerSmoothingGroup
				+ '\n\tuseOAsMesh: ' + this.useOAsMesh
				+ '\n\tuseIndices: ' + this.useIndices
				+ '\n\tdisregardNormals: ' + this.disregardNormals;
			if ( this.callbacks.onProgress !== null ) {
				printedConfig += '\n\tcallbacks.onProgress: ' + this.callbacks.onProgress.name;
			}
			if ( this.callbacks.onAssetAvailable !== null ) {
				printedConfig += '\n\tcallbacks.onAssetAvailable: ' + this.callbacks.onAssetAvailable.name;
			}
			if ( this.callbacks.onError !== null ) {
				printedConfig += '\n\tcallbacks.onError: ' + this.callbacks.onError.name;
			}
			console.info( printedConfig );
		}
	},

	/**
	 * Parse the provided arraybuffer
	 *
	 * @param {Uint8Array} arrayBuffer OBJ data as Uint8Array
	 */
	parse: function ( arrayBuffer ) {
		if ( this.logging.enabled ) console.time( 'OBJLoader2.Parser.parse' );
		this.configure();

		var arrayBufferView = new Uint8Array( arrayBuffer );
		this.contentRef = arrayBufferView;
		var length = arrayBufferView.byteLength;
		this.globalCounts.totalBytes = length;
		var buffer = new Array( 128 );

		for ( var code, word = '', bufferPointer = 0, slashesCount = 0, i = 0; i < length; i++ ) {

			code = arrayBufferView[ i ];
			switch ( code ) {
				// space
				case 32:
					if ( word.length > 0 ) buffer[ bufferPointer++ ] = word;
					word = '';
					break;
				// slash
				case 47:
					if ( word.length > 0 ) buffer[ bufferPointer++ ] = word;
					slashesCount++;
					word = '';
					break;

				// LF
				case 10:
					if ( word.length > 0 ) buffer[ bufferPointer++ ] = word;
					word = '';
					this.globalCounts.lineByte = this.globalCounts.currentByte;
					this.globalCounts.currentByte = i;
					this.processLine( buffer, bufferPointer, slashesCount );
					bufferPointer = 0;
					slashesCount = 0;
					break;

				// CR
				case 13:
					break;

				default:
					word += String.fromCharCode( code );
					break;
			}
		}
		this.finalizeParsing();
		if ( this.logging.enabled ) console.timeEnd(  'OBJLoader2.Parser.parse' );
	},

	/**
	 * Parse the provided text
	 *
	 * @param {string} text OBJ data as string
	 */
	parseText: function ( text ) {
		if ( this.logging.enabled ) console.time(  'OBJLoader2.Parser.parseText' );
		this.configure();
		this.legacyMode = true;
		this.contentRef = text;
		var length = text.length;
		this.globalCounts.totalBytes = length;
		var buffer = new Array( 128 );

		for ( var char, word = '', bufferPointer = 0, slashesCount = 0, i = 0; i < length; i++ ) {

			char = text[ i ];
			switch ( char ) {
				case ' ':
					if ( word.length > 0 ) buffer[ bufferPointer++ ] = word;
					word = '';
					break;

				case '/':
					if ( word.length > 0 ) buffer[ bufferPointer++ ] = word;
					slashesCount++;
					word = '';
					break;

				case '\n':
					if ( word.length > 0 ) buffer[ bufferPointer++ ] = word;
					word = '';
					this.globalCounts.lineByte = this.globalCounts.currentByte;
					this.globalCounts.currentByte = i;
					this.processLine( buffer, bufferPointer, slashesCount );
					bufferPointer = 0;
					slashesCount = 0;
					break;

				case '\r':
					break;

				default:
					word += char;
			}
		}
		this.finalizeParsing();
		if ( this.logging.enabled ) console.timeEnd( 'OBJLoader2.Parser.parseText' );
	},

	processLine: function ( buffer, bufferPointer, slashesCount ) {
		if ( bufferPointer < 1 ) return;

		var reconstructString = function ( content, legacyMode, start, stop ) {
			var line = '';
			if ( stop > start ) {

				var i;
				if ( legacyMode ) {

					for ( i = start; i < stop; i++ ) line += content[ i ];

				} else {
					for ( i = start; i < stop; i++ ) line += String.fromCharCode( content[ i ] );

				}
				line = line.trim();

			}
			return line;
		};

		var bufferLength, length, i, lineDesignation;
		lineDesignation = buffer [ 0 ];
		switch ( lineDesignation ) {
			case 'v':
				this.vertices.push( parseFloat( buffer[ 1 ] ) );
				this.vertices.push( parseFloat( buffer[ 2 ] ) );
				this.vertices.push( parseFloat( buffer[ 3 ] ) );
				if ( bufferPointer > 4 ) {

					this.colors.push( parseFloat( buffer[ 4 ] ) );
					this.colors.push( parseFloat( buffer[ 5 ] ) );
					this.colors.push( parseFloat( buffer[ 6 ] ) );

				}
				break;

			case 'vt':
				this.uvs.push( parseFloat( buffer[ 1 ] ) );
				this.uvs.push( parseFloat( buffer[ 2 ] ) );
				break;

			case 'vn':
				this.normals.push( parseFloat( buffer[ 1 ] ) );
				this.normals.push( parseFloat( buffer[ 2 ] ) );
				this.normals.push( parseFloat( buffer[ 3 ] ) );
				break;

			case 'f':
				bufferLength = bufferPointer - 1;

				// "f vertex ..."
				if ( slashesCount === 0 ) {

					this.checkFaceType( 0 );
					for ( i = 2, length = bufferLength; i < length; i ++ ) {

						this.buildFace( buffer[ 1 ] );
						this.buildFace( buffer[ i ] );
						this.buildFace( buffer[ i + 1 ] );

					}

					// "f vertex/uv ..."
				} else if  ( bufferLength === slashesCount * 2 ) {

					this.checkFaceType( 1 );
					for ( i = 3, length = bufferLength - 2; i < length; i += 2 ) {

						this.buildFace( buffer[ 1 ], buffer[ 2 ] );
						this.buildFace( buffer[ i ], buffer[ i + 1 ] );
						this.buildFace( buffer[ i + 2 ], buffer[ i + 3 ] );

					}

					// "f vertex/uv/normal ..."
				} else if  ( bufferLength * 2 === slashesCount * 3 ) {

					this.checkFaceType( 2 );
					for ( i = 4, length = bufferLength - 3; i < length; i += 3 ) {

						this.buildFace( buffer[ 1 ], buffer[ 2 ], buffer[ 3 ] );
						this.buildFace( buffer[ i ], buffer[ i + 1 ], buffer[ i + 2 ] );
						this.buildFace( buffer[ i + 3 ], buffer[ i + 4 ], buffer[ i + 5 ] );

					}

					// "f vertex//normal ..."
				} else {

					this.checkFaceType( 3 );
					for ( i = 3, length = bufferLength - 2; i < length; i += 2 ) {

						this.buildFace( buffer[ 1 ], undefined, buffer[ 2 ] );
						this.buildFace( buffer[ i ], undefined, buffer[ i + 1 ] );
						this.buildFace( buffer[ i + 2 ], undefined, buffer[ i + 3 ] );

					}

				}
				break;

			case 'l':
			case 'p':
				bufferLength = bufferPointer - 1;
				if ( bufferLength === slashesCount * 2 )  {

					this.checkFaceType( 4 );
					for ( i = 1, length = bufferLength + 1; i < length; i += 2 ) this.buildFace( buffer[ i ], buffer[ i + 1 ] );

				} else {

					this.checkFaceType( ( lineDesignation === 'l' ) ? 5 : 6  );
					for ( i = 1, length = bufferLength + 1; i < length; i ++ ) this.buildFace( buffer[ i ] );

				}
				break;

			case 's':
				this.pushSmoothingGroup( buffer[ 1 ] );
				break;

			case 'g':
				// 'g' leads to creation of mesh if valid data (faces declaration was done before), otherwise only groupName gets set
				this.processCompletedMesh();
				this.rawMesh.groupName = reconstructString( this.contentRef, this.legacyMode, this.globalCounts.lineByte + 2, this.globalCounts.currentByte );
				break;

			case 'o':
				// 'o' is meta-information and usually does not result in creation of new meshes, but can be enforced with "useOAsMesh"
				if ( this.useOAsMesh ) this.processCompletedMesh();
				this.rawMesh.objectName = reconstructString( this.contentRef, this.legacyMode, this.globalCounts.lineByte + 2, this.globalCounts.currentByte );
				break;

			case 'mtllib':
				this.rawMesh.mtllibName = reconstructString( this.contentRef, this.legacyMode, this.globalCounts.lineByte + 7, this.globalCounts.currentByte );
				break;

			case 'usemtl':
				var mtlName = reconstructString( this.contentRef, this.legacyMode, this.globalCounts.lineByte + 7, this.globalCounts.currentByte );
				if ( mtlName !== '' && this.rawMesh.activeMtlName !== mtlName ) {

					this.rawMesh.activeMtlName = mtlName;
					this.rawMesh.counts.mtlCount++;
					this.checkSubGroup();

				}
				break;

			default:
				break;
		}
	},

	pushSmoothingGroup: function ( smoothingGroup ) {
		var smoothingGroupInt = parseInt( smoothingGroup );
		if ( isNaN( smoothingGroupInt ) ) {
			smoothingGroupInt = smoothingGroup === "off" ? 0 : 1;
		}

		var smoothCheck = this.rawMesh.smoothingGroup.normalized;
		this.rawMesh.smoothingGroup.normalized = this.rawMesh.smoothingGroup.splitMaterials ? smoothingGroupInt : ( smoothingGroupInt === 0 ) ? 0 : 1;
		this.rawMesh.smoothingGroup.real = smoothingGroupInt;

		if ( smoothCheck !== smoothingGroupInt ) {

			this.rawMesh.counts.smoothingGroupCount++;
			this.checkSubGroup();

		}
	},

	/**
	 * Expanded faceTypes include all four face types, both line types and the point type
	 * faceType = 0: "f vertex ..."
	 * faceType = 1: "f vertex/uv ..."
	 * faceType = 2: "f vertex/uv/normal ..."
	 * faceType = 3: "f vertex//normal ..."
	 * faceType = 4: "l vertex/uv ..." or "l vertex ..."
	 * faceType = 5: "l vertex ..."
	 * faceType = 6: "p vertex ..."
	 */
	checkFaceType: function ( faceType ) {
		if ( this.rawMesh.faceType !== faceType ) {

			this.processCompletedMesh();
			this.rawMesh.faceType = faceType;
			this.checkSubGroup();

		}
	},

	checkSubGroup: function () {
		var index = this.rawMesh.activeMtlName + '|' + this.rawMesh.smoothingGroup.normalized;
		this.rawMesh.subGroupInUse = this.rawMesh.subGroups[ index ];

		if ( this.rawMesh.subGroupInUse === undefined || this.rawMesh.subGroupInUse === null ) {

			this.rawMesh.subGroupInUse = {
				index: index,
				objectName: this.rawMesh.objectName,
				groupName: this.rawMesh.groupName,
				materialName: this.rawMesh.activeMtlName,
				smoothingGroup: this.rawMesh.smoothingGroup.normalized,
				vertices: [],
				indexMappingsCount: 0,
				indexMappings: [],
				indices: [],
				colors: [],
				uvs: [],
				normals: []
			};
			this.rawMesh.subGroups[ index ] = this.rawMesh.subGroupInUse;

		}
	},

	buildFace: function ( faceIndexV, faceIndexU, faceIndexN ) {
		if ( this.disregardNormals ) faceIndexN = undefined;
		var scope = this;
		var updateSubGroupInUse = function () {

			var faceIndexVi = parseInt( faceIndexV );
			var indexPointerV = 3 * ( faceIndexVi > 0 ? faceIndexVi - 1 : faceIndexVi + scope.vertices.length / 3 );
			var indexPointerC = scope.colors.length > 0 ? indexPointerV : null;

			var vertices = scope.rawMesh.subGroupInUse.vertices;
			vertices.push( scope.vertices[ indexPointerV++ ] );
			vertices.push( scope.vertices[ indexPointerV++ ] );
			vertices.push( scope.vertices[ indexPointerV ] );

			if ( indexPointerC !== null ) {

				var colors = scope.rawMesh.subGroupInUse.colors;
				colors.push( scope.colors[ indexPointerC++ ] );
				colors.push( scope.colors[ indexPointerC++ ] );
				colors.push( scope.colors[ indexPointerC ] );

			}
			if ( faceIndexU ) {

				var faceIndexUi = parseInt( faceIndexU );
				var indexPointerU = 2 * ( faceIndexUi > 0 ? faceIndexUi - 1 : faceIndexUi + scope.uvs.length / 2 );
				var uvs = scope.rawMesh.subGroupInUse.uvs;
				uvs.push( scope.uvs[ indexPointerU++ ] );
				uvs.push( scope.uvs[ indexPointerU ] );

			}
			if ( faceIndexN ) {

				var faceIndexNi = parseInt( faceIndexN );
				var indexPointerN = 3 * ( faceIndexNi > 0 ? faceIndexNi - 1 : faceIndexNi + scope.normals.length / 3 );
				var normals = scope.rawMesh.subGroupInUse.normals;
				normals.push( scope.normals[ indexPointerN++ ] );
				normals.push( scope.normals[ indexPointerN++ ] );
				normals.push( scope.normals[ indexPointerN ] );

			}
		};

		if ( this.useIndices ) {

			var mappingName = faceIndexV + ( faceIndexU ? '_' + faceIndexU : '_n' ) + ( faceIndexN ? '_' + faceIndexN : '_n' );
			var indicesPointer = this.rawMesh.subGroupInUse.indexMappings[ mappingName ];
			if ( indicesPointer === undefined || indicesPointer === null ) {

				indicesPointer = this.rawMesh.subGroupInUse.vertices.length / 3;
				updateSubGroupInUse();
				this.rawMesh.subGroupInUse.indexMappings[ mappingName ] = indicesPointer;
				this.rawMesh.subGroupInUse.indexMappingsCount++;

			} else {

				this.rawMesh.counts.doubleIndicesCount++;

			}
			this.rawMesh.subGroupInUse.indices.push( indicesPointer );

		} else {

			updateSubGroupInUse();

		}
		this.rawMesh.counts.faceCount++;
	},

	createRawMeshReport: function ( inputObjectCount ) {
		return 'Input Object number: ' + inputObjectCount +
			'\n\tObject name: ' + this.rawMesh.objectName +
			'\n\tGroup name: ' + this.rawMesh.groupName +
			'\n\tMtllib name: ' + this.rawMesh.mtllibName +
			'\n\tVertex count: ' + this.vertices.length / 3 +
			'\n\tNormal count: ' + this.normals.length / 3 +
			'\n\tUV count: ' + this.uvs.length / 2 +
			'\n\tSmoothingGroup count: ' + this.rawMesh.counts.smoothingGroupCount +
			'\n\tMaterial count: ' + this.rawMesh.counts.mtlCount +
			'\n\tReal MeshOutputGroup count: ' + this.rawMesh.subGroups.length;
	},

	/**
	 * Clear any empty subGroup and calculate absolute vertex, normal and uv counts
	 */
	finalizeRawMesh: function () {
		var meshOutputGroupTemp = [];
		var meshOutputGroup;
		var absoluteVertexCount = 0;
		var absoluteIndexMappingsCount = 0;
		var absoluteIndexCount = 0;
		var absoluteColorCount = 0;
		var absoluteNormalCount = 0;
		var absoluteUvCount = 0;
		var indices;
		for ( var name in this.rawMesh.subGroups ) {

			meshOutputGroup = this.rawMesh.subGroups[ name ];
			if ( meshOutputGroup.vertices.length > 0 ) {

				indices = meshOutputGroup.indices;
				if ( indices.length > 0 && absoluteIndexMappingsCount > 0 ) {

					for ( var i in indices ) indices[ i ] = indices[ i ] + absoluteIndexMappingsCount;

				}
				meshOutputGroupTemp.push( meshOutputGroup );
				absoluteVertexCount += meshOutputGroup.vertices.length;
				absoluteIndexMappingsCount += meshOutputGroup.indexMappingsCount;
				absoluteIndexCount += meshOutputGroup.indices.length;
				absoluteColorCount += meshOutputGroup.colors.length;
				absoluteUvCount += meshOutputGroup.uvs.length;
				absoluteNormalCount += meshOutputGroup.normals.length;

			}
		}

		// do not continue if no result
		var result = null;
		if ( meshOutputGroupTemp.length > 0 ) {

			result = {
				name: this.rawMesh.groupName !== '' ? this.rawMesh.groupName : this.rawMesh.objectName,
				subGroups: meshOutputGroupTemp,
				absoluteVertexCount: absoluteVertexCount,
				absoluteIndexCount: absoluteIndexCount,
				absoluteColorCount: absoluteColorCount,
				absoluteNormalCount: absoluteNormalCount,
				absoluteUvCount: absoluteUvCount,
				faceCount: this.rawMesh.counts.faceCount,
				doubleIndicesCount: this.rawMesh.counts.doubleIndicesCount
			};

		}
		return result;
	},

	processCompletedMesh: function () {
		var result = this.finalizeRawMesh();
		var haveMesh = result !== null;
		if ( haveMesh ) {

			if ( this.colors.length > 0 && this.colors.length !== this.vertices.length && this.callbacks.onError !== null ) {

				this.callbacks.onError( 'Vertex Colors were detected, but vertex count and color count do not match!' );

			}
			if ( this.logging.enabled && this.logging.debug ) console.debug( this.createRawMeshReport( this.inputObjectCount ) );
			this.inputObjectCount++;

			this.buildMesh( result );
			var progressBytesPercent = this.globalCounts.currentByte / this.globalCounts.totalBytes;
			if ( this.callbacks.onProgress !== null ) {

				this.callbacks.onProgress( 'Completed [o: ' + this.rawMesh.objectName + ' g:' + this.rawMesh.groupName +
					'] Total progress: ' + ( progressBytesPercent * 100 ).toFixed( 2 ) + '%', progressBytesPercent );

			}
			this.resetRawMesh();
			return true;

		}
		return haveMesh;
	},

	/**
	 * SubGroups are transformed to too intermediate format that is forwarded to the MeshBuilder.
	 * It is ensured that SubGroups only contain objects with vertices (no need to check).
	 *
	 * @param result
	 */
	buildMesh: function ( result ) {
		var meshOutputGroups = result.subGroups;

		var vertexFA = new Float32Array( result.absoluteVertexCount );
		this.globalCounts.vertices += result.absoluteVertexCount / 3;
		this.globalCounts.faces += result.faceCount;
		this.globalCounts.doubleIndicesCount += result.doubleIndicesCount;
		var indexUA = ( result.absoluteIndexCount > 0 ) ? new Uint32Array( result.absoluteIndexCount ) : null;
		var colorFA = ( result.absoluteColorCount > 0 ) ? new Float32Array( result.absoluteColorCount ) : null;
		var normalFA = ( result.absoluteNormalCount > 0 ) ? new Float32Array( result.absoluteNormalCount ) : null;
		var uvFA = ( result.absoluteUvCount > 0 ) ? new Float32Array( result.absoluteUvCount ) : null;
		var haveVertexColors = colorFA !== null;

		var meshOutputGroup;
		var materialNames = [];

		var createMultiMaterial = ( meshOutputGroups.length > 1 );
		var materialIndex = 0;
		var materialIndexMapping = [];
		var selectedMaterialIndex;
		var materialGroup;
		var materialGroups = [];

		var vertexFAOffset = 0;
		var indexUAOffset = 0;
		var colorFAOffset = 0;
		var normalFAOffset = 0;
		var uvFAOffset = 0;
		var materialGroupOffset = 0;
		var materialGroupLength = 0;

		var materialOrg, material, materialName, materialNameOrg;
		// only one specific face type
		for ( var oodIndex in meshOutputGroups ) {

			if ( ! meshOutputGroups.hasOwnProperty( oodIndex ) ) continue;
			meshOutputGroup = meshOutputGroups[ oodIndex ];

			materialNameOrg = meshOutputGroup.materialName;
			if ( this.rawMesh.faceType < 4 ) {

				materialName = materialNameOrg + ( haveVertexColors ? '_vertexColor' : '' ) + ( meshOutputGroup.smoothingGroup === 0 ? '_flat' : '' );
			} else {

				materialName = this.rawMesh.faceType === 6 ? 'defaultPointMaterial' : 'defaultLineMaterial';

			}
			materialOrg = this.materials[ materialNameOrg ];
			material = this.materials[ materialName ];

			// both original and derived names do not lead to an existing material => need to use a default material
			if ( ( materialOrg === undefined || materialOrg === null ) && ( material === undefined || material === null ) ) {

				materialName = haveVertexColors ? 'defaultVertexColorMaterial' : 'defaultMaterial';
				material = this.materials[ materialName ];
				if ( this.logging.enabled ) {

					console.info( 'object_group "' + meshOutputGroup.objectName + '_' +
						meshOutputGroup.groupName + '" was defined with unresolvable material "' +
						materialNameOrg + '"! Assigning "' + materialName + '".' );

				}

			}
			if ( material === undefined || material === null ) {

				var materialCloneInstructions = {
					materialNameOrg: materialNameOrg,
					materialName: materialName,
					materialProperties: {
						vertexColors: haveVertexColors ? 2 : 0,
						flatShading: meshOutputGroup.smoothingGroup === 0
					}
				};
				var payload = {
					cmd: 'materialData',
					materials: {
						materialCloneInstructions: materialCloneInstructions
					}
				};
				this.callbacks.onAssetAvailable( payload );

				// fake entry for async; sync Parser always works on material references (Builder update directly visible here)
				if ( this.useAsync ) this.materials[ materialName ] = materialCloneInstructions;

			}

			if ( createMultiMaterial ) {

				// re-use material if already used before. Reduces materials array size and eliminates duplicates
				selectedMaterialIndex = materialIndexMapping[ materialName ];
				if ( ! selectedMaterialIndex ) {

					selectedMaterialIndex = materialIndex;
					materialIndexMapping[ materialName ] = materialIndex;
					materialNames.push( materialName );
					materialIndex++;

				}
				materialGroupLength = this.useIndices ? meshOutputGroup.indices.length : meshOutputGroup.vertices.length / 3;
				materialGroup = {
					start: materialGroupOffset,
					count: materialGroupLength,
					index: selectedMaterialIndex
				};
				materialGroups.push( materialGroup );
				materialGroupOffset += materialGroupLength;

			} else {

				materialNames.push( materialName );

			}

			vertexFA.set( meshOutputGroup.vertices, vertexFAOffset );
			vertexFAOffset += meshOutputGroup.vertices.length;

			if ( indexUA ) {

				indexUA.set( meshOutputGroup.indices, indexUAOffset );
				indexUAOffset += meshOutputGroup.indices.length;

			}

			if ( colorFA ) {

				colorFA.set( meshOutputGroup.colors, colorFAOffset );
				colorFAOffset += meshOutputGroup.colors.length;

			}

			if ( normalFA ) {

				normalFA.set( meshOutputGroup.normals, normalFAOffset );
				normalFAOffset += meshOutputGroup.normals.length;

			}
			if ( uvFA ) {

				uvFA.set( meshOutputGroup.uvs, uvFAOffset );
				uvFAOffset += meshOutputGroup.uvs.length;

			}

			if ( this.logging.enabled && this.logging.debug ) {
				var materialIndexLine = ( selectedMaterialIndex === undefined || selectedMaterialIndex === null ) ? '' : '\n\t\tmaterialIndex: ' + selectedMaterialIndex;
				var createdReport = '\tOutput Object no.: ' + this.outputObjectCount +
					'\n\t\tgroupName: ' + meshOutputGroup.groupName +
					'\n\t\tIndex: ' + meshOutputGroup.index +
					'\n\t\tfaceType: ' + this.rawMesh.faceType +
					'\n\t\tmaterialName: ' + meshOutputGroup.materialName +
					'\n\t\tsmoothingGroup: ' + meshOutputGroup.smoothingGroup +
					materialIndexLine +
					'\n\t\tobjectName: ' + meshOutputGroup.objectName +
					'\n\t\t#vertices: ' + meshOutputGroup.vertices.length / 3 +
					'\n\t\t#indices: ' + meshOutputGroup.indices.length +
					'\n\t\t#colors: ' + meshOutputGroup.colors.length / 3 +
					'\n\t\t#uvs: ' + meshOutputGroup.uvs.length / 2 +
					'\n\t\t#normals: ' + meshOutputGroup.normals.length / 3;
				console.debug( createdReport );
			}

		}

		this.outputObjectCount++;
		this.callbacks.onAssetAvailable(
			{
				cmd: 'meshData',
				progress: {
					numericalValue: this.globalCounts.currentByte / this.globalCounts.totalBytes
				},
				params: {
					meshName: result.name
				},
				materials: {
					multiMaterial: createMultiMaterial,
					materialNames: materialNames,
					materialGroups: materialGroups
				},
				buffers: {
					vertices: vertexFA,
					indices: indexUA,
					colors: colorFA,
					normals: normalFA,
					uvs: uvFA
				},
				// 0: mesh, 1: line, 2: point
				geometryType: this.rawMesh.faceType < 4 ? 0 : ( this.rawMesh.faceType === 6 ) ? 2 : 1
			},
			[ vertexFA.buffer ],
			indexUA !== null ?  [ indexUA.buffer ] : null,
			colorFA !== null ? [ colorFA.buffer ] : null,
			normalFA !== null ? [ normalFA.buffer ] : null,
			uvFA !== null ? [ uvFA.buffer ] : null
		);
	},

	finalizeParsing: function () {
		if ( this.logging.enabled ) console.info( 'Global output object count: ' + this.outputObjectCount );
		if ( this.processCompletedMesh() && this.logging.enabled ) {

			var parserFinalReport = 'Overall counts: ' +
				'\n\tVertices: ' + this.globalCounts.vertices +
				'\n\tFaces: ' + this.globalCounts.faces +
				'\n\tMultiple definitions: ' + this.globalCounts.doubleIndicesCount;
			console.info( parserFinalReport );

		}
	}
};

export { OBJLoader2 }
