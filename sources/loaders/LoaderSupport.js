//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { MeshStandardMaterial } from '../materials/MeshStandardMaterial.js'
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js'
import { PointsMaterial } from '../materials/PointsMaterial.js'
import { BufferGeometry } from '../core/BufferGeometry.js'
import { BufferAttribute } from '../core/BufferAttribute.js'
import { Mesh } from '../objects/Mesh.js'
import { LineSegments } from '../objects/LineSegments.js'
import { Points } from '../objects/Points.js'
import { MaterialLoader } from './MaterialLoader.js'
import { FileLoader } from './FileLoader.js'
import { VertexColors } from '../constants.js'
import { DefaultLoadingManager } from './LoadingManager.js'
'use strict';

/*
if ( var LoaderSupport === undefined ) { var LoaderSupport = {} }
*/
var LoaderSupport = {}
LoaderSupport.Validator = {
	
	isValid: function( input ) {
		return ( input !== null && input !== undefined );
	},
	
	verifyInput: function( input, defaultValue ) {
		return ( input === null || input === undefined ) ? defaultValue : input;
	}
};
LoaderSupport.Callbacks = function () {
	this.onProgress = null;
	this.onReportError = null;
	this.onMeshAlter = null;
	this.onLoad = null;
	this.onLoadMaterials = null;
};

LoaderSupport.Callbacks.prototype = {

	constructor: LoaderSupport.Callbacks,
	setCallbackOnProgress: function ( callbackOnProgress ) {
		this.onProgress = LoaderSupport.Validator.verifyInput( callbackOnProgress, this.onProgress );
	},
	setCallbackOnReportError: function ( callbackOnReportError ) {
		this.onReportError = LoaderSupport.Validator.verifyInput( callbackOnReportError, this.onReportError );
	},
	setCallbackOnMeshAlter: function ( callbackOnMeshAlter ) {
		this.onMeshAlter = LoaderSupport.Validator.verifyInput( callbackOnMeshAlter, this.onMeshAlter );
	},
	setCallbackOnLoad: function ( callbackOnLoad ) {
		this.onLoad = LoaderSupport.Validator.verifyInput( callbackOnLoad, this.onLoad );
	},
	setCallbackOnLoadMaterials: function ( callbackOnLoadMaterials ) {
		this.onLoadMaterials = LoaderSupport.Validator.verifyInput( callbackOnLoadMaterials, this.onLoadMaterials );
	}

};
LoaderSupport.LoadedMeshUserOverride = function( disregardMesh, alteredMesh ) {
	this.disregardMesh = disregardMesh === true;
	this.alteredMesh = alteredMesh === true;
	this.meshes = [];
};

LoaderSupport.LoadedMeshUserOverride.prototype = {

	constructor: LoaderSupport.LoadedMeshUserOverride,
	addMesh: function ( mesh ) {
		this.meshes.push( mesh );
		this.alteredMesh = true;
	},
	isDisregardMesh: function () {
		return this.disregardMesh;
	},
	providesAlteredMeshes: function () {
		return this.alteredMesh;
	}

};
LoaderSupport.ResourceDescriptor = function ( url, extension ) {
	var urlParts = url.split( '/' );

	this.path;
	this.resourcePath;
	this.name = url;
	this.url = url;
	if ( urlParts.length >= 2 ) {

		this.path = LoaderSupport.Validator.verifyInput( urlParts.slice( 0, urlParts.length - 1).join( '/' ) + '/', this.path );
		this.name = urlParts[ urlParts.length - 1 ];
		this.url = url;

	}
	this.name = LoaderSupport.Validator.verifyInput( this.name, 'Unnamed_Resource' );
	this.extension = LoaderSupport.Validator.verifyInput( extension, 'default' );
	this.extension = this.extension.trim();
	this.content = null;
};

LoaderSupport.ResourceDescriptor.prototype = {

	constructor: LoaderSupport.ResourceDescriptor,
	setContent: function ( content ) {
		this.content = LoaderSupport.Validator.verifyInput( content, null );
	},
	setResourcePath: function ( resourcePath ) {
		this.resourcePath = LoaderSupport.Validator.verifyInput( resourcePath, this.resourcePath );
	}
};
LoaderSupport.PrepData = function ( modelName ) {
	this.logging = {
		enabled: true,
		debug: false
	};
	this.modelName = LoaderSupport.Validator.verifyInput( modelName, '' );
	this.resources = [];
	this.callbacks = new LoaderSupport.Callbacks();
};

LoaderSupport.PrepData.prototype = {

	constructor: LoaderSupport.PrepData,
	setLogging: function ( enabled, debug ) {
		this.logging.enabled = enabled === true;
		this.logging.debug = debug === true;
	},
	getCallbacks: function () {
		return this.callbacks;
	},
	addResource: function ( resource ) {
		this.resources.push( resource );
	},
	clone: function () {
		var clone = new LoaderSupport.PrepData( this.modelName );
		clone.logging.enabled = this.logging.enabled;
		clone.logging.debug = this.logging.debug;
		clone.resources = this.resources;
		clone.callbacks = this.callbacks;

		var property, value;
		for ( property in this ) {

			value = this[ property ];
			if ( ! clone.hasOwnProperty( property ) && typeof this[ property ] !== 'function' ) {

				clone[ property ] = value;

			}
		}

		return clone;
	},
	checkResourceDescriptorFiles: function ( resources, fileDesc ) {
		var resource, triple, i, found;
		var result = {};

		for ( var index in resources ) {

			resource = resources[ index ];
			found = false;
			if ( ! LoaderSupport.Validator.isValid( resource.name ) ) continue;
			if ( LoaderSupport.Validator.isValid( resource.content ) ) {

				for ( i = 0; i < fileDesc.length && !found; i++ ) {

					triple = fileDesc[ i ];
					if ( resource.extension.toLowerCase() === triple.ext.toLowerCase() ) {

						if ( triple.ignore ) {

							found = true;

						} else if ( triple.type === "ArrayBuffer" ) {

							// fast-fail on bad type
							if ( ! ( resource.content instanceof ArrayBuffer || resource.content instanceof Uint8Array ) ) throw 'Provided content is not of type ArrayBuffer! Aborting...';
							result[ triple.ext ] = resource;
							found = true;

						} else if ( triple.type === "String" ) {

							if ( ! ( typeof( resource.content ) === 'string' || resource.content instanceof String) ) throw 'Provided  content is not of type String! Aborting...';
							result[ triple.ext ] = resource;
							found = true;

						}

					}

				}
				if ( !found ) throw 'Unidentified resource "' + resource.name + '": ' + resource.url;

			} else {

				// fast-fail on bad type
				if ( ! ( typeof( resource.name ) === 'string' || resource.name instanceof String ) ) throw 'Provided file is not properly defined! Aborting...';
				for ( i = 0; i < fileDesc.length && !found; i++ ) {

					triple = fileDesc[ i ];
					if ( resource.extension.toLowerCase() === triple.ext.toLowerCase() ) {

						if ( ! triple.ignore ) result[ triple.ext ] = resource;
						found = true;

					}

				}
				if ( !found ) throw 'Unidentified resource "' + resource.name + '": ' + resource.url;

			}
		}

		return result;
	}
};
LoaderSupport.MeshBuilder = function() {
	console.info( 'Using LoaderSupport.MeshBuilder version: ' + LoaderSupport.MeshBuilder.LOADER_MESH_BUILDER_VERSION );
	this.validator = LoaderSupport.Validator;

	this.logging = {
		enabled: true,
		debug: false
	};

	this.callbacks = new LoaderSupport.Callbacks();
	this.materials = [];
};
LoaderSupport.MeshBuilder.LOADER_MESH_BUILDER_VERSION = '1.3.0';

LoaderSupport.MeshBuilder.prototype = {

	constructor: LoaderSupport.MeshBuilder,
	setLogging: function ( enabled, debug ) {
		this.logging.enabled = enabled === true;
		this.logging.debug = debug === true;
	},
	init: function () {
		var defaultMaterial = new MeshStandardMaterial( { color: 0xDCF1FF } );
		defaultMaterial.name = 'defaultMaterial';

		var defaultVertexColorMaterial = new MeshStandardMaterial( { color: 0xDCF1FF } );
		defaultVertexColorMaterial.name = 'defaultVertexColorMaterial';
		defaultVertexColorMaterial.vertexColors = VertexColors;

		var defaultLineMaterial = new LineBasicMaterial();
		defaultLineMaterial.name = 'defaultLineMaterial';

		var defaultPointMaterial = new PointsMaterial( { size: 1 } );
		defaultPointMaterial.name = 'defaultPointMaterial';

		var runtimeMaterials = {};
		runtimeMaterials[ defaultMaterial.name ] = defaultMaterial;
		runtimeMaterials[ defaultVertexColorMaterial.name ] = defaultVertexColorMaterial;
		runtimeMaterials[ defaultLineMaterial.name ] = defaultLineMaterial;
		runtimeMaterials[ defaultPointMaterial.name ] = defaultPointMaterial;

		this.updateMaterials(
			{
				cmd: 'materialData',
				materials: {
					materialCloneInstructions: null,
					serializedMaterials: null,
					runtimeMaterials: runtimeMaterials
				}
			}
		);
	},
	setMaterials: function ( materials ) {
		var payload = {
			cmd: 'materialData',
			materials: {
				materialCloneInstructions: null,
				serializedMaterials: null,
				runtimeMaterials: this.validator.isValid( this.callbacks.onLoadMaterials ) ? this.callbacks.onLoadMaterials( materials ) : materials
			}
		};
		this.updateMaterials( payload );
	},

	_setCallbacks: function ( callbacks ) {
		if ( this.validator.isValid( callbacks.onProgress ) ) this.callbacks.setCallbackOnProgress( callbacks.onProgress );
		if ( this.validator.isValid( callbacks.onReportError ) ) this.callbacks.setCallbackOnReportError( callbacks.onReportError );
		if ( this.validator.isValid( callbacks.onMeshAlter ) ) this.callbacks.setCallbackOnMeshAlter( callbacks.onMeshAlter );
		if ( this.validator.isValid( callbacks.onLoad ) ) this.callbacks.setCallbackOnLoad( callbacks.onLoad );
		if ( this.validator.isValid( callbacks.onLoadMaterials ) ) this.callbacks.setCallbackOnLoadMaterials( callbacks.onLoadMaterials );
	},
	processPayload: function ( payload ) {
		if ( payload.cmd === 'meshData' ) {

			return this.buildMeshes( payload );

		} else if ( payload.cmd === 'materialData' ) {

			this.updateMaterials( payload );
			return null;

		}
	},
	buildMeshes: function ( meshPayload ) {
		var meshName = meshPayload.params.meshName;

		var bufferGeometry = new BufferGeometry();
		bufferGeometry.addAttribute( 'position', new BufferAttribute( new Float32Array( meshPayload.buffers.vertices ), 3 ) );
		if ( this.validator.isValid( meshPayload.buffers.indices ) ) {

			bufferGeometry.setIndex( new BufferAttribute( new Uint32Array( meshPayload.buffers.indices ), 1 ));

		}
		var haveVertexColors = this.validator.isValid( meshPayload.buffers.colors );
		if ( haveVertexColors ) {

			bufferGeometry.addAttribute( 'color', new BufferAttribute( new Float32Array( meshPayload.buffers.colors ), 3 ) );

		}
		if ( this.validator.isValid( meshPayload.buffers.normals ) ) {

			bufferGeometry.addAttribute( 'normal', new BufferAttribute( new Float32Array( meshPayload.buffers.normals ), 3 ) );

		} else {

			bufferGeometry.computeVertexNormals();

		}
		if ( this.validator.isValid( meshPayload.buffers.uvs ) ) {

			bufferGeometry.addAttribute( 'uv', new BufferAttribute( new Float32Array( meshPayload.buffers.uvs ), 2 ) );

		}

		var material, materialName, key;
		var materialNames = meshPayload.materials.materialNames;
		var createMultiMaterial = meshPayload.materials.multiMaterial;
		var multiMaterials = [];
		for ( key in materialNames ) {

			materialName = materialNames[ key ];
			material = this.materials[ materialName ];
			if ( createMultiMaterial ) multiMaterials.push( material );

		}
		if ( createMultiMaterial ) {

			material = multiMaterials;
			var materialGroups = meshPayload.materials.materialGroups;
			var materialGroup;
			for ( key in materialGroups ) {

				materialGroup = materialGroups[ key ];
				bufferGeometry.addGroup( materialGroup.start, materialGroup.count, materialGroup.index );

			}

		}

		var meshes = [];
		var mesh;
		var callbackOnMeshAlter = this.callbacks.onMeshAlter;
		var callbackOnMeshAlterResult;
		var useOrgMesh = true;
		var geometryType = this.validator.verifyInput( meshPayload.geometryType, 0 );
		if ( this.validator.isValid( callbackOnMeshAlter ) ) {

			callbackOnMeshAlterResult = callbackOnMeshAlter(
				{
					detail: {
						meshName: meshName,
						bufferGeometry: bufferGeometry,
						material: material,
						geometryType: geometryType
					}
				}
			);
			if ( this.validator.isValid( callbackOnMeshAlterResult ) ) {

				if ( callbackOnMeshAlterResult.isDisregardMesh() ) {

					useOrgMesh = false;

				} else if ( callbackOnMeshAlterResult.providesAlteredMeshes() ) {

					for ( var i in callbackOnMeshAlterResult.meshes ) {

						meshes.push( callbackOnMeshAlterResult.meshes[ i ] );

					}
					useOrgMesh = false;

				}

			}

		}
		if ( useOrgMesh ) {

			if ( meshPayload.computeBoundingSphere ) bufferGeometry.computeBoundingSphere();
			if ( geometryType === 0 ) {

				mesh = new Mesh( bufferGeometry, material );

			} else if ( geometryType === 1) {

				mesh = new LineSegments( bufferGeometry, material );

			} else {

				mesh = new Points( bufferGeometry, material );

			}
			mesh.name = meshName;
			meshes.push( mesh );

		}

		var progressMessage;
		if ( this.validator.isValid( meshes ) && meshes.length > 0 ) {

			var meshNames = [];
			for ( var i in meshes ) {

				mesh = meshes[ i ];
				meshNames[ i ] = mesh.name;

			}
			progressMessage = 'Adding mesh(es) (' + meshNames.length + ': ' + meshNames + ') from input mesh: ' + meshName;
			progressMessage += ' (' + ( meshPayload.progress.numericalValue * 100 ).toFixed( 2 ) + '%)';

		} else {

			progressMessage = 'Not adding mesh: ' + meshName;
			progressMessage += ' (' + ( meshPayload.progress.numericalValue * 100 ).toFixed( 2 ) + '%)';

		}
		var callbackOnProgress = this.callbacks.onProgress;
		if ( this.validator.isValid( callbackOnProgress ) ) {

			var event = new CustomEvent( 'MeshBuilderEvent', {
				detail: {
					type: 'progress',
					modelName: meshPayload.params.meshName,
					text: progressMessage,
					numericalValue: meshPayload.progress.numericalValue
				}
			} );
			callbackOnProgress( event );

		}

		return meshes;
	},
	updateMaterials: function ( materialPayload ) {
		var material, materialName;
		var materialCloneInstructions = materialPayload.materials.materialCloneInstructions;
		if ( this.validator.isValid( materialCloneInstructions ) ) {

			var materialNameOrg = materialCloneInstructions.materialNameOrg;
			var materialOrg = this.materials[ materialNameOrg ];

			if ( this.validator.isValid( materialNameOrg ) ) {

				material = materialOrg.clone();

				materialName = materialCloneInstructions.materialName;
				material.name = materialName;

				var materialProperties = materialCloneInstructions.materialProperties;
				for ( var key in materialProperties ) {

					if ( material.hasOwnProperty( key ) && materialProperties.hasOwnProperty( key ) ) material[ key ] = materialProperties[ key ];

				}
				this.materials[ materialName ] = material;

			} else {

				console.warn( 'Requested material "' + materialNameOrg + '" is not available!' );

			}
		}

		var materials = materialPayload.materials.serializedMaterials;
		if ( this.validator.isValid( materials ) && Object.keys( materials ).length > 0 ) {

			var loader = new MaterialLoader();
			var materialJson;
			for ( materialName in materials ) {

				materialJson = materials[ materialName ];
				if ( this.validator.isValid( materialJson ) ) {

					material = loader.parse( materialJson );
					if ( this.logging.enabled ) console.info( 'De-serialized material with name "' + materialName + '" will be added.' );
					this.materials[ materialName ] = material;
				}

			}

		}

		materials = materialPayload.materials.runtimeMaterials;
		if ( this.validator.isValid( materials ) && Object.keys( materials ).length > 0 ) {

			for ( materialName in materials ) {

				material = materials[ materialName ];
				if ( this.logging.enabled ) console.info( 'Material with name "' + materialName + '" will be added.' );
				this.materials[ materialName ] = material;

			}

		}
	},
	getMaterialsJSON: function () {
		var materialsJSON = {};
		var material;
		for ( var materialName in this.materials ) {

			material = this.materials[ materialName ];
			materialsJSON[ materialName ] = material.toJSON();
		}

		return materialsJSON;
	},
	getMaterials: function () {
		return this.materials;
	}

};
LoaderSupport.WorkerSupport = function () {
	console.info( 'Using LoaderSupport.WorkerSupport version: ' + LoaderSupport.WorkerSupport.WORKER_SUPPORT_VERSION );
	this.logging = {
		enabled: true,
		debug: false
	};

	//Choose implementation of worker based on environment
	this.loaderWorker = typeof window !== "undefined" ? new LoaderSupport.WorkerSupport.LoaderWorker() : new LoaderSupport.WorkerSupport.NodeLoaderWorker();
};

LoaderSupport.WorkerSupport.WORKER_SUPPORT_VERSION = '2.3.0';

LoaderSupport.WorkerSupport.prototype = {

	constructor: LoaderSupport.WorkerSupport,
	setLogging: function ( enabled, debug ) {
		this.logging.enabled = enabled === true;
		this.logging.debug = debug === true;
		this.loaderWorker.setLogging( this.logging.enabled, this.logging.debug );
	},
	setForceWorkerDataCopy: function ( forceWorkerDataCopy ) {
		this.loaderWorker.setForceCopy( forceWorkerDataCopy );
	},
	validate: function ( functionCodeBuilder, parserName, libLocations, libPath, runnerImpl ) {
		if ( LoaderSupport.Validator.isValid( this.loaderWorker.worker ) ) return;

		if ( this.logging.enabled ) {

			console.info( 'WorkerSupport: Building worker code...' );
			console.time( 'buildWebWorkerCode' );

		}
		if ( LoaderSupport.Validator.isValid( runnerImpl ) ) {

			if ( this.logging.enabled ) console.info( 'WorkerSupport: Using "' + runnerImpl.runnerName + '" as Runner class for worker.' );

		// Browser implementation
		} else if ( typeof window !== "undefined" ) {

			runnerImpl = LoaderSupport.WorkerRunnerRefImpl;
			if ( this.logging.enabled ) console.info( 'WorkerSupport: Using DEFAULT "LoaderSupport.WorkerRunnerRefImpl" as Runner class for worker.' );

		// NodeJS implementation
		} else {

			runnerImpl = LoaderSupport.NodeWorkerRunnerRefImpl;
			if ( this.logging.enabled ) console.info( 'WorkerSupport: Using DEFAULT "LoaderSupport.NodeWorkerRunnerRefImpl" as Runner class for worker.' );

		}
		var userWorkerCode = functionCodeBuilder( LoaderSupport.WorkerSupport.CodeSerializer );
		userWorkerCode += 'var Parser = '+ parserName +  ';\n\n';
		userWorkerCode += LoaderSupport.WorkerSupport.CodeSerializer.serializeClass( runnerImpl.runnerName, runnerImpl );
		userWorkerCode += 'new ' + runnerImpl.runnerName + '();\n\n';

		var scope = this;
		if ( LoaderSupport.Validator.isValid( libLocations ) && libLocations.length > 0 ) {

			var libsContent = '';
			var loadAllLibraries = function ( path, locations ) {
				if ( locations.length === 0 ) {

					scope.loaderWorker.initWorker( libsContent + userWorkerCode, runnerImpl.runnerName );
					if ( scope.logging.enabled ) console.timeEnd( 'buildWebWorkerCode' );

				} else {

					var loadedLib = function ( contentAsString ) {
						libsContent += contentAsString;
						loadAllLibraries( path, locations );
					};

					var fileLoader = new FileLoader();
					fileLoader.setPath( path );
					fileLoader.setResponseType( 'text' );
					fileLoader.load( locations[ 0 ], loadedLib );
					locations.shift();

				}
			};
			loadAllLibraries( libPath, libLocations );

		} else {

			this.loaderWorker.initWorker( userWorkerCode, runnerImpl.runnerName );
			if ( this.logging.enabled ) console.timeEnd( 'buildWebWorkerCode' );

		}
	},
	setCallbacks: function ( meshBuilder, onLoad ) {
		this.loaderWorker.setCallbacks( meshBuilder, onLoad );
	},
	run: function ( payload ) {
		this.loaderWorker.run( payload );
	},
	setTerminateRequested: function ( terminateRequested ) {
		this.loaderWorker.setTerminateRequested( terminateRequested );
	}

};
LoaderSupport.WorkerSupport.LoaderWorker = function () {
	this._reset();
};

LoaderSupport.WorkerSupport.LoaderWorker.prototype = {

	constructor: LoaderSupport.WorkerSupport.LoaderWorker,

	_reset: function () {
		this.logging = {
			enabled: true,
			debug: false
		};
		this.worker = null;
		this.runnerImplName = null;
		this.callbacks = {
			meshBuilder: null,
			onLoad: null
		};
		this.terminateRequested = false;
		this.queuedMessage = null;
		this.started = false;
		this.forceCopy = false;
	},
	checkSupport: function() {
		if ( window.Worker === undefined ) return "This browser does not support web workers!";
		if ( window.Blob === undefined  ) return "This browser does not support Blob!";
		if ( typeof window.URL.createObjectURL !== 'function'  ) return "This browser does not support Object creation from URL!";
	},

	setLogging: function ( enabled, debug ) {
		this.logging.enabled = enabled === true;
		this.logging.debug = debug === true;
	},

	setForceCopy: function ( forceCopy ) {
		this.forceCopy = forceCopy === true;
	},

	initWorker: function ( code, runnerImplName ) {
		var supportError = this.checkSupport();
		if ( supportError ) {

			throw supportError;

		}
		this.runnerImplName = runnerImplName;

		var blob = new Blob( [ code ], { type: 'application/javascript' } );
		this.worker = new Worker( window.URL.createObjectURL( blob ) );

		this.worker.onmessage = this._receiveWorkerMessage;

		// set referemce to this, then processing in worker scope within "_receiveWorkerMessage" can access members
		this.worker.runtimeRef = this;

		// process stored queuedMessage
		this._postMessage();
	},
	_receiveWorkerMessage: function ( e ) {
		var payload = e.data;
		switch ( payload.cmd ) {
			case 'meshData':
			case 'materialData':
			case 'imageData':
				this.runtimeRef.callbacks.meshBuilder( payload );
				break;

			case 'complete':
				this.runtimeRef.queuedMessage = null;
				this.started = false;
				this.runtimeRef.callbacks.onLoad( payload.msg );

				if ( this.runtimeRef.terminateRequested ) {

					if ( this.runtimeRef.logging.enabled ) console.info( 'WorkerSupport [' + this.runtimeRef.runnerImplName + ']: Run is complete. Terminating application on request!' );
					this.runtimeRef._terminate();

				}
				break;

			case 'error':
				console.error( 'WorkerSupport [' + this.runtimeRef.runnerImplName + ']: Reported error: ' + payload.msg );
				this.runtimeRef.queuedMessage = null;
				this.started = false;
				this.runtimeRef.callbacks.onLoad( payload.msg );

				if ( this.runtimeRef.terminateRequested ) {

					if ( this.runtimeRef.logging.enabled ) console.info( 'WorkerSupport [' + this.runtimeRef.runnerImplName + ']: Run reported error. Terminating application on request!' );
					this.runtimeRef._terminate();

				}
				break;

			default:
				console.error( 'WorkerSupport [' + this.runtimeRef.runnerImplName + ']: Received unknown command: ' + payload.cmd );
				break;

		}
	},

	setCallbacks: function ( meshBuilder, onLoad ) {
		this.callbacks.meshBuilder = LoaderSupport.Validator.verifyInput( meshBuilder, this.callbacks.meshBuilder );
		this.callbacks.onLoad = LoaderSupport.Validator.verifyInput( onLoad, this.callbacks.onLoad );
	},

	run: function( payload ) {
		if ( LoaderSupport.Validator.isValid( this.queuedMessage ) ) {

			console.warn( 'Already processing message. Rejecting new run instruction' );
			return;

		} else {

			this.queuedMessage = payload;
			this.started = true;

		}
		if ( ! LoaderSupport.Validator.isValid( this.callbacks.meshBuilder ) ) throw 'Unable to run as no "MeshBuilder" callback is set.';
		if ( ! LoaderSupport.Validator.isValid( this.callbacks.onLoad ) ) throw 'Unable to run as no "onLoad" callback is set.';
		if ( payload.cmd !== 'run' ) payload.cmd = 'run';
		if ( LoaderSupport.Validator.isValid( payload.logging ) ) {

			payload.logging.enabled = payload.logging.enabled === true;
			payload.logging.debug = payload.logging.debug === true;

		} else {

			payload.logging = {
				enabled: true,
				debug: false
			}

		}
		this._postMessage();
	},

	_postMessage: function () {
		if ( LoaderSupport.Validator.isValid( this.queuedMessage ) && LoaderSupport.Validator.isValid( this.worker ) ) {

			if ( this.queuedMessage.data.input instanceof ArrayBuffer ) {

				var content;
				if ( this.forceCopy ) {

					content = this.queuedMessage.data.input.slice( 0 );

				} else {

					content = this.queuedMessage.data.input;

				}
				this.worker.postMessage( this.queuedMessage, [ content ] );

			} else {

				this.worker.postMessage( this.queuedMessage );

			}

		}
	},

	setTerminateRequested: function ( terminateRequested ) {
		this.terminateRequested = terminateRequested === true;
		if ( this.terminateRequested && LoaderSupport.Validator.isValid( this.worker ) && ! LoaderSupport.Validator.isValid( this.queuedMessage ) && this.started ) {

			if ( this.logging.enabled ) console.info( 'Worker is terminated immediately as it is not running!' );
			this._terminate();

		}
	},

	_terminate: function () {
		this.worker.terminate();
		this._reset();
	}
};
LoaderSupport.WorkerSupport.CodeSerializer = {
	serializeObject: function ( fullName, object ) {
		var objectString = fullName + ' = {\n\n';
		var part;
		for ( var name in object ) {

			part = object[ name ];
			if ( typeof( part ) === 'string' || part instanceof String ) {

				part = part.replace( '\n', '\\n' );
				part = part.replace( '\r', '\\r' );
				objectString += '\t' + name + ': "' + part + '",\n';

			} else if ( part instanceof Array ) {

				objectString += '\t' + name + ': [' + part + '],\n';

			} else if ( typeof part === 'object' ) {

				// TODO: Short-cut for now. Recursion required?
				objectString += '\t' + name + ': {},\n';

			} else {

				objectString += '\t' + name + ': ' + part + ',\n';

			}

		}
		objectString += '}\n\n';

		return objectString;
	},
	serializeClass: function ( fullName, object, constructorName, basePrototypeName, ignoreFunctions, includeFunctions, overrideFunctions ) {
		var valueString, objectPart, constructorString, i, funcOverride;
		var prototypeFunctions = [];
		var objectProperties = [];
		var objectFunctions = [];
		var isExtended = ( basePrototypeName !== null && basePrototypeName !== undefined );

		if ( ! Array.isArray( ignoreFunctions ) ) ignoreFunctions = [];
		if ( ! Array.isArray( includeFunctions ) ) includeFunctions = null;
		if ( ! Array.isArray( overrideFunctions ) ) overrideFunctions = [];

		for ( var name in object.prototype ) {

			objectPart = object.prototype[ name ];
			valueString = objectPart.toString();
			if ( name === 'constructor' ) {

				constructorString = fullName + ' = ' + valueString + ';\n\n';

			} else if ( typeof objectPart === 'function' ) {

				if ( ignoreFunctions.indexOf( name ) < 0 && ( includeFunctions === null || includeFunctions.indexOf( name ) >= 0 ) ) {

					funcOverride = overrideFunctions[ name ];
					if ( funcOverride && funcOverride.fullName === fullName + '.prototype.' + name ) {

						valueString = funcOverride.code;

					}
					if ( isExtended ) {

						prototypeFunctions.push( fullName + '.prototype.' + name + ' = ' + valueString + ';\n\n' );

					} else {

						prototypeFunctions.push( '\t' + name + ': ' + valueString + ',\n\n' );

					}
				}

			}

		}
		for ( var name in object ) {

			objectPart = object[ name ];

			if ( typeof objectPart === 'function' ) {

				if ( ignoreFunctions.indexOf( name ) < 0 && ( includeFunctions === null || includeFunctions.indexOf( name ) >= 0 ) ) {

					funcOverride = overrideFunctions[ name ];
					if ( funcOverride && funcOverride.fullName === fullName + '.' + name ) {

						valueString = funcOverride.code;

					} else {

						valueString = objectPart.toString();

					}
					objectFunctions.push( fullName + '.' + name + ' = ' + valueString + ';\n\n' );

				}

			} else {

				if ( typeof( objectPart ) === 'string' || objectPart instanceof String) {

					valueString = '\"' + objectPart.toString() + '\"';

				} else if ( typeof objectPart === 'object' ) {

					// TODO: Short-cut for now. Recursion required?
					valueString = "{}";

				} else {

					valueString = objectPart;

				}
				objectProperties.push( fullName + '.' + name + ' = ' + valueString + ';\n' );

			}

		}
		if ( ( constructorString === undefined || constructorString === null ) && typeof object.prototype.constructor === 'function' ) {

			constructorString = fullName + ' = ' + object.prototype.constructor.toString().replace( constructorName, '' );

		}
		var objectString = constructorString + '\n\n';
		if ( isExtended ) {

			objectString += fullName + '.prototype = Object.create( ' + basePrototypeName + '.prototype );\n';

		}
		objectString += fullName + '.prototype.constructor = ' + fullName + ';\n';
		objectString += '\n\n';

		for ( i = 0; i < objectProperties.length; i ++ ) objectString += objectProperties[ i ];
		objectString += '\n\n';

		for ( i = 0; i < objectFunctions.length; i ++ ) objectString += objectFunctions[ i ];
		objectString += '\n\n';

		if ( isExtended ) {

			for ( i = 0; i < prototypeFunctions.length; i ++ ) objectString += prototypeFunctions[ i ];

		} else {

			objectString += fullName + '.prototype = {\n\n';
			for ( i = 0; i < prototypeFunctions.length; i ++ ) objectString += prototypeFunctions[ i ];
			objectString += '\n};';

		}
		objectString += '\n\n';

		return objectString;
	},
};
LoaderSupport.WorkerRunnerRefImpl = function () {
	var scopedRunner = function( event ) {
		this.processMessage( event.data );
	};
	this.getParentScope().addEventListener( 'message', scopedRunner.bind( this ) );
};

LoaderSupport.WorkerRunnerRefImpl.runnerName = 'LoaderSupport.WorkerRunnerRefImpl';

LoaderSupport.WorkerRunnerRefImpl.prototype = {

	constructor: LoaderSupport.WorkerRunnerRefImpl,
	getParentScope: function () {
		return self;
	},
	applyProperties: function ( parser, params ) {
		var property, funcName, values;
		for ( property in params ) {
			funcName = 'set' + property.substring( 0, 1 ).toLocaleUpperCase() + property.substring( 1 );
			values = params[ property ];

			if ( typeof parser[ funcName ] === 'function' ) {

				parser[ funcName ]( values );

			} else if ( parser.hasOwnProperty( property ) ) {

				parser[ property ] = values;

			}
		}
	},
	processMessage: function ( payload ) {
		if ( payload.cmd === 'run' ) {

			var self = this.getParentScope();
			var callbacks = {
				callbackMeshBuilder: function ( payload ) {
					self.postMessage( payload );
				},
				callbackProgress: function ( text ) {
					if ( payload.logging.enabled && payload.logging.debug ) console.debug( 'WorkerRunner: progress: ' + text );
				}
			};

			// Parser is expected to be named as such
			var parser = new Parser();
			if ( typeof parser[ 'setLogging' ] === 'function' ) parser.setLogging( payload.logging.enabled, payload.logging.debug );
			this.applyProperties( parser, payload.params );
			this.applyProperties( parser, payload.materials );
			this.applyProperties( parser, callbacks );
			parser.workerScope = self;
			parser.parse( payload.data.input, payload.data.options );

			if ( payload.logging.enabled ) console.log( 'WorkerRunner: Run complete!' );

			callbacks.callbackMeshBuilder( {
				cmd: 'complete',
				msg: 'WorkerRunner completed run.'
			} );

		} else {

			console.error( 'WorkerRunner: Received unknown command: ' + payload.cmd );

		}
	}
};
LoaderSupport.NodeWorkerRunnerRefImpl = function () {
	this.runnerName = 'LoaderSupport.NodeWorkerRunnerRefImpl';
	// No call to super because super class only binds to processMessage
	// In NodeJS, there is no addEventListener so use onmessage.
	// Also, the message object can be passed directly to
	// processMessage() as it isn't an `Event`, but a plain object
	// with the data
	this.getParentScope().onmessage = this.processMessage.bind( this );
};

LoaderSupport.NodeWorkerRunnerRefImpl.prototype = Object.create( LoaderSupport.WorkerRunnerRefImpl.prototype );
LoaderSupport.NodeWorkerRunnerRefImpl.prototype.constructor = LoaderSupport.NodeWorkerRunnerRefImpl;
LoaderSupport.NodeWorkerRunnerRefImpl.runnerName = 'LoaderSupport.NodeWorkerRunnerRefImpl';

LoaderSupport.NodeWorkerRunnerRefImpl.prototype = {

	getParentScope: function(){
		// Work around webpack builds failing with NodeJS requires
		// (placing it outside this function will fail because
		// this class is passed to the worker as a string!)
		var _require = eval( 'require' );
		return _require( 'worker_threads' ).parentPort;
	}
};
LoaderSupport.WorkerSupport.NodeLoaderWorker = function (){
	LoaderSupport.WorkerSupport.LoaderWorker.call( this );
};

LoaderSupport.WorkerSupport.NodeLoaderWorker.prototype = Object.create( LoaderSupport.WorkerSupport.LoaderWorker.prototype );
LoaderSupport.WorkerSupport.NodeLoaderWorker.prototype.constructor = LoaderSupport.WorkerSupport.NodeLoaderWorker;
LoaderSupport.WorkerSupport.NodeLoaderWorker.checkSupport = function() {
	try {
		// Work around webpack builds failing with NodeJS requires
		var _require = eval( 'require' );
		_require.resolve( 'worker_threads' );
	}
	catch(e) {
		return 'This version of Node does not support web workers!';
	}
};
LoaderSupport.WorkerSupport.NodeLoaderWorker.prototype.initWorker = function ( code, runnerImplName ) {
	var supportError = this.checkSupport();
	if( supportError ) {

		throw supportError;

	}
	this.runnerImplName = runnerImplName;

	// Work around webpack builds failing with NodeJS requires
	var _require = eval( 'require' );
	var Worker = _require( 'worker_threads' ).Worker;
	this.worker = new Worker( code, { eval: true } );

	this.worker.onmessage = this._receiveWorkerMessage;

	// set referemce to this, then processing in worker scope within "_receiveWorkerMessage" can access members
	this.worker.runtimeRef = this;

	// process stored queuedMessage
	this._postMessage();
};
LoaderSupport.WorkerDirector = function ( classDef ) {
	console.info( 'Using LoaderSupport.WorkerDirector version: ' + LoaderSupport.WorkerDirector.LOADER_WORKER_DIRECTOR_VERSION );
	this.logging = {
		enabled: true,
		debug: false
	};

	this.maxQueueSize = LoaderSupport.WorkerDirector.MAX_QUEUE_SIZE ;
	this.maxWebWorkers = LoaderSupport.WorkerDirector.MAX_WEB_WORKER;
	this.crossOrigin = null;

	if ( ! LoaderSupport.Validator.isValid( classDef ) ) throw 'Provided invalid classDef: ' + classDef;

	this.workerDescription = {
		classDef: classDef,
		globalCallbacks: {},
		workerSupports: {},
		forceWorkerDataCopy: true
	};
	this.objectsCompleted = 0;
	this.instructionQueue = [];
	this.instructionQueuePointer = 0;

	this.callbackOnFinishedProcessing = null;
}
LoaderSupport.WorkerDirector.LOADER_WORKER_DIRECTOR_VERSION = '2.3.0';
LoaderSupport.WorkerDirector.MAX_WEB_WORKER = 16;
LoaderSupport.WorkerDirector.MAX_QUEUE_SIZE = 2048;

LoaderSupport.WorkerDirector.prototype = {

	constructor: LoaderSupport.WorkerDirector,
	
	setLogging: function ( enabled, debug ) {
		this.logging.enabled = enabled === true;
		this.logging.debug = debug === true;
	},
	getMaxQueueSize: function () {
		return this.maxQueueSize;
	},
	getMaxWebWorkers: function () {
		return this.maxWebWorkers;
	},
	setCrossOrigin: function ( crossOrigin ) {
		this.crossOrigin = crossOrigin;
	},
	setForceWorkerDataCopy: function ( forceWorkerDataCopy ) {
		this.workerDescription.forceWorkerDataCopy = forceWorkerDataCopy === true;
	},
	prepareWorkers: function ( globalCallbacks, maxQueueSize, maxWebWorkers ) {
		if ( LoaderSupport.Validator.isValid( globalCallbacks ) ) this.workerDescription.globalCallbacks = globalCallbacks;
		this.maxQueueSize = Math.min( maxQueueSize, LoaderSupport.WorkerDirector.MAX_QUEUE_SIZE );
		this.maxWebWorkers = Math.min( maxWebWorkers, LoaderSupport.WorkerDirector.MAX_WEB_WORKER );
		this.maxWebWorkers = Math.min( this.maxWebWorkers, this.maxQueueSize );
		this.objectsCompleted = 0;
		this.instructionQueue = [];
		this.instructionQueuePointer = 0;

		for ( var instanceNo = 0; instanceNo < this.maxWebWorkers; instanceNo++ ) {

			var workerSupport = new LoaderSupport.WorkerSupport();
			workerSupport.setLogging( this.logging.enabled, this.logging.debug );
			workerSupport.setForceWorkerDataCopy( this.workerDescription.forceWorkerDataCopy );
			this.workerDescription.workerSupports[ instanceNo ] = {
				instanceNo: instanceNo,
				inUse: false,
				terminateRequested: false,
				workerSupport: workerSupport,
				loader: null
			};

		}
	},
	enqueueForRun: function ( prepData ) {
		if ( this.instructionQueue.length < this.maxQueueSize ) {
			this.instructionQueue.push( prepData );
		}
	},
	isRunning: function () {
		var wsKeys = Object.keys( this.workerDescription.workerSupports );
		return ( ( this.instructionQueue.length > 0 && this.instructionQueuePointer < this.instructionQueue.length ) || wsKeys.length > 0 );
	},
	processQueue: function () {
		var prepData, supportDesc;
		for ( var instanceNo in this.workerDescription.workerSupports ) {

			supportDesc = this.workerDescription.workerSupports[ instanceNo ];
			if ( ! supportDesc.inUse ) {

				if ( this.instructionQueuePointer < this.instructionQueue.length ) {

					prepData = this.instructionQueue[ this.instructionQueuePointer ];
					this._kickWorkerRun( prepData, supportDesc );
					this.instructionQueuePointer++;

				} else {

					this._deregister( supportDesc );

				}

			}

		}

		if ( ! this.isRunning() && this.callbackOnFinishedProcessing !== null ) {

			this.callbackOnFinishedProcessing();
			this.callbackOnFinishedProcessing = null;

		}
	},

	_kickWorkerRun: function( prepData, supportDesc ) {
		supportDesc.inUse = true;
		supportDesc.workerSupport.setTerminateRequested( supportDesc.terminateRequested );

		if ( this.logging.enabled ) console.info( '\nAssigning next item from queue to worker (queue length: ' + this.instructionQueue.length + ')\n\n' );

		var validator = LoaderSupport.Validator;
		var scope = this;
		var prepDataCallbacks = prepData.getCallbacks();
		var globalCallbacks = this.workerDescription.globalCallbacks;
		var wrapperOnLoad = function ( event ) {
			if ( validator.isValid( globalCallbacks.onLoad ) ) globalCallbacks.onLoad( event );
			if ( validator.isValid( prepDataCallbacks.onLoad ) ) prepDataCallbacks.onLoad( event );
			scope.objectsCompleted++;
			supportDesc.inUse = false;

			scope.processQueue();
		};

		var wrapperOnProgress = function ( event ) {
			if ( validator.isValid( globalCallbacks.onProgress ) ) globalCallbacks.onProgress( event );
			if ( validator.isValid( prepDataCallbacks.onProgress ) ) prepDataCallbacks.onProgress( event );
		};

		var wrapperOnMeshAlter = function ( event, override ) {
			if ( validator.isValid( globalCallbacks.onMeshAlter ) ) override = globalCallbacks.onMeshAlter( event, override );
			if ( validator.isValid( prepDataCallbacks.onMeshAlter ) ) override = globalCallbacks.onMeshAlter( event, override );
			return override;
		};

		var wrapperOnLoadMaterials = function ( materials ) {
			if ( validator.isValid( globalCallbacks.onLoadMaterials ) ) materials = globalCallbacks.onLoadMaterials( materials );
			if ( validator.isValid( prepDataCallbacks.onLoadMaterials ) ) materials = prepDataCallbacks.onLoadMaterials( materials );
			return materials;
		};

		var wrapperOnReportError = function ( errorMessage ) {
			var continueProcessing = true;
			if ( validator.isValid( globalCallbacks.onReportError ) ) continueProcessing = globalCallbacks.onReportError( supportDesc, errorMessage );
			if ( validator.isValid( prepDataCallbacks.onReportError ) )	continueProcessing = prepDataCallbacks.onReportError( supportDesc, errorMessage );

			if ( ! validator.isValid( globalCallbacks.onReportError ) && ! validator.isValid( prepDataCallbacks.onReportError ) ) {

				console.error( 'Loader reported an error: ' );
				console.error( errorMessage );

			}
			if ( continueProcessing ) {

				supportDesc.inUse = false;
				scope.processQueue();

			}
		};

		supportDesc.loader = this._buildLoader( supportDesc.instanceNo );

		var updatedCallbacks = new LoaderSupport.Callbacks();
		updatedCallbacks.setCallbackOnLoad( wrapperOnLoad );
		updatedCallbacks.setCallbackOnProgress( wrapperOnProgress );
		updatedCallbacks.setCallbackOnReportError( wrapperOnReportError );
		updatedCallbacks.setCallbackOnMeshAlter( wrapperOnMeshAlter );
		updatedCallbacks.setCallbackOnLoadMaterials( wrapperOnLoadMaterials );
		prepData.callbacks = updatedCallbacks;

		supportDesc.loader.run( prepData, supportDesc.workerSupport );
	},

	_buildLoader: function ( instanceNo ) {
		var classDef = this.workerDescription.classDef;
		var loader = Object.create( classDef.prototype );
		classDef.call( loader, DefaultLoadingManager );

		// verify that all required functions are implemented
		if ( ! loader.hasOwnProperty( 'instanceNo' ) ) throw classDef.name + ' has no property "instanceNo".';
		loader.instanceNo = instanceNo;

		if ( ! loader.hasOwnProperty( 'workerSupport' ) ) {

			throw classDef.name + ' has no property "workerSupport".';

		}
		if ( typeof loader.run !== 'function'  ) throw classDef.name + ' has no function "run".';
		if ( ! loader.hasOwnProperty( 'callbacks' ) || ! LoaderSupport.Validator.isValid( loader.callbacks ) ) {

			console.warn( classDef.name + ' has an invalid property "callbacks". Will change to "LoaderSupport.Callbacks"' );
			loader.callbacks = new LoaderSupport.Callbacks();

		}

		return loader;
	},

	_deregister: function ( supportDesc ) {
		if ( LoaderSupport.Validator.isValid( supportDesc ) ) {

			supportDesc.workerSupport.setTerminateRequested( true );
			if ( this.logging.enabled ) console.info( 'Requested termination of worker #' + supportDesc.instanceNo + '.' );

			var loaderCallbacks = supportDesc.loader.callbacks;
			if ( LoaderSupport.Validator.isValid( loaderCallbacks.onProgress ) ) loaderCallbacks.onProgress( { detail: { text: '' } } );
			delete this.workerDescription.workerSupports[ supportDesc.instanceNo ];

		}
	},
	tearDown: function ( callbackOnFinishedProcessing ) {
		if ( this.logging.enabled ) console.info( 'WorkerDirector received the deregister call. Terminating all workers!' );

		this.instructionQueuePointer = this.instructionQueue.length;
		this.callbackOnFinishedProcessing = LoaderSupport.Validator.verifyInput( callbackOnFinishedProcessing, null );

		for ( var name in this.workerDescription.workerSupports ) {

			this.workerDescription.workerSupports[ name ].terminateRequested = true;

		}
	}

};

export { LoaderSupport }
