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
import { Group } from '../objects/Group.js'
import { VertexColors } from '../constants.js'
import { DefaultLoadingManager } from './LoadingManager.js'



'use strict';

var LoaderSupport = {}


LoaderSupport.Validator = {
	
	isValid: function( input ) {
		return ( input !== null && input !== undefined );
	},
	
	verifyInput: function( input, defaultValue ) {
		return ( input === null || input === undefined ) ? defaultValue : input;
	}
};



LoaderSupport.ConsoleLogger = (function () {

	function ConsoleLogger( enabled, debug ) {
		this.enabled = enabled !== false;
		this.debug = debug === true;
	}

	
	ConsoleLogger.prototype.setDebug = function ( debug ) {
		this.debug = debug === true;
	};

	
	ConsoleLogger.prototype.isDebug = function () {
		return this.isEnabled() && this.debug;
	};

	
	ConsoleLogger.prototype.setEnabled = function ( enabled ) {
		this.enabled = enabled === true;
	};

	
	ConsoleLogger.prototype.isEnabled = function () {
		return this.enabled;
	};

	
	ConsoleLogger.prototype.logDebug = function ( message, additional ) {
		if ( this.enabled && this.debug ) {

			this._createStatement( message, 'Additional content:', additional, function ( output ) { console.debug( output ) } );

		}
	};

	
	ConsoleLogger.prototype.logInfo = function ( message, additional ) {
		if ( this.enabled ) {

			this._createStatement( message, 'Additional content:', additional, function ( output ) { console.info( output ) } );

		}
	};

	
	ConsoleLogger.prototype.logWarn = function ( message, additional ) {
		this._createStatement( message, 'Additional content:', additional, function ( output ) { console.warn( output ) } );
	};

	
	ConsoleLogger.prototype.logError = function ( message, additional ) {
		this._createStatement( message, 'Additional content:', additional, function ( output ) { console.error( output ) } );
	};

	
	ConsoleLogger.prototype.logTimeStart = function ( id ) {
		if ( this.enabled ) console.time( id );
	};

	
	ConsoleLogger.prototype.logTimeEnd = function ( id ) {
		if ( this.enabled ) console.timeEnd( id );
	};

	ConsoleLogger.prototype._createStatement = function ( message, addHeader, additional, logFunction ) {
		var output = message;
		if ( Array.isArray( additional ) ) {

			output += '\n' + addHeader + '\n' + additional.join( '\n' );

		}
		logFunction( output );
	};

	return ConsoleLogger;
})();


LoaderSupport.Callbacks = (function () {

	var Validator = LoaderSupport.Validator;

	function Callbacks() {
		this.onProgress = null;
		this.onMeshAlter = null;
		this.onLoad = null;
		this.onLoadMaterials = null;
	}

	
	Callbacks.prototype.setCallbackOnProgress = function ( callbackOnProgress ) {
		this.onProgress = Validator.verifyInput( callbackOnProgress, this.onProgress );
	};

	
	Callbacks.prototype.setCallbackOnMeshAlter = function ( callbackOnMeshAlter ) {
		this.onMeshAlter = Validator.verifyInput( callbackOnMeshAlter, this.onMeshAlter );
	};

	
	Callbacks.prototype.setCallbackOnLoad = function ( callbackOnLoad ) {
		this.onLoad = Validator.verifyInput( callbackOnLoad, this.onLoad );
	};

	
	Callbacks.prototype.setCallbackOnLoadMaterials = function ( callbackOnLoadMaterials ) {
		this.onLoadMaterials = Validator.verifyInput( callbackOnLoadMaterials, this.onLoadMaterials );
	};

	return Callbacks;
})();



LoaderSupport.LoadedMeshUserOverride = (function () {

	function LoadedMeshUserOverride( disregardMesh, alteredMesh ) {
		this.disregardMesh = disregardMesh === true;
		this.alteredMesh = alteredMesh === true;
		this.meshes = [];
	}

	
	LoadedMeshUserOverride.prototype.addMesh = function ( mesh ) {
		this.meshes.push( mesh );
		this.alteredMesh = true;
	};

	
	LoadedMeshUserOverride.prototype.isDisregardMesh = function () {
		return this.disregardMesh;
	};

	
	LoadedMeshUserOverride.prototype.providesAlteredMeshes = function () {
		return this.alteredMesh;
	};

	return LoadedMeshUserOverride;
})();



LoaderSupport.ResourceDescriptor = (function () {

	var Validator = LoaderSupport.Validator;

	function ResourceDescriptor( url, extension ) {
		var urlParts = url.split( '/' );

		if ( urlParts.length < 2 ) {

			this.path = null;
			this.name = url;
			this.url = url;

		} else {

			this.path = Validator.verifyInput( urlParts.slice( 0, urlParts.length - 1).join( '/' ) + '/', null );
			this.name = Validator.verifyInput( urlParts[ urlParts.length - 1 ], null );
			this.url = url;

		}
		this.extension = Validator.verifyInput( extension, "default" );
		this.extension = this.extension.trim();
		this.content = null;
	}

	
	ResourceDescriptor.prototype.setContent = function ( content ) {
		this.content = Validator.verifyInput( content, null );
	};

	return ResourceDescriptor;
})();



LoaderSupport.PrepData = (function () {

	var Validator = LoaderSupport.Validator;

	function PrepData( modelName ) {
		this.modelName = Validator.verifyInput( modelName, '' );
		this.resources = [];
		this.streamMeshesTo = null;
		this.materialPerSmoothingGroup = false;
		this.useIndices = false;
		this.disregardNormals = false;
		this.callbacks = new LoaderSupport.Callbacks();
		this.crossOrigin;
		this.useAsync = false;
	}

	
	PrepData.prototype.setStreamMeshesTo = function ( streamMeshesTo ) {
		this.streamMeshesTo = Validator.verifyInput( streamMeshesTo, null );
	};

	
	PrepData.prototype.setMaterialPerSmoothingGroup = function ( materialPerSmoothingGroup ) {
		this.materialPerSmoothingGroup = materialPerSmoothingGroup === true;
	};

	
	PrepData.prototype.setUseIndices = function ( useIndices ) {
		this.useIndices = useIndices === true;
	};

	
	PrepData.prototype.setDisregardNormals = function ( disregardNormals ) {
		this.disregardNormals = disregardNormals === true;
	};

	
	PrepData.prototype.getCallbacks = function () {
		return this.callbacks;
	};

	
	PrepData.prototype.setCrossOrigin = function ( crossOrigin ) {
		this.crossOrigin = crossOrigin;
	};

	
	PrepData.prototype.addResource = function ( resource ) {
		this.resources.push( resource );
	};

	
	PrepData.prototype.setUseAsync = function ( useAsync ) {
		this.useAsync = useAsync === true;
	};

	
	PrepData.prototype.clone = function () {
		var clone = new LoaderSupport.PrepData( this.modelName );
		clone.resources = this.resources;
		clone.streamMeshesTo = this.streamMeshesTo;
		clone.materialPerSmoothingGroup = this.materialPerSmoothingGroup;
		clone.useIndices = this.useIndices;
		clone.disregardNormals = this.disregardNormals;
		clone.callbacks = this.callbacks;
		clone.crossOrigin = this.crossOrigin;
		clone.useAsync = this.useAsync;
		return clone;
	};

	return PrepData;
})();


LoaderSupport.Builder = (function () {

	var LOADER_BUILDER_VERSION = '1.1.1';

	var Validator = LoaderSupport.Validator;
	var ConsoleLogger = LoaderSupport.ConsoleLogger;

	function Builder( logger ) {
		this.logger = Validator.verifyInput( logger, new ConsoleLogger() );
		this.logger.logInfo( 'Using LoaderSupport.Builder version: ' + LOADER_BUILDER_VERSION );
		this.callbacks = new LoaderSupport.Callbacks();
		this.materials = [];
		this._createDefaultMaterials();
	}

	Builder.prototype._createDefaultMaterials = function () {
		var defaultMaterial = new MeshStandardMaterial( { color: 0xDCF1FF } );
		defaultMaterial.name = 'defaultMaterial';

		var defaultVertexColorMaterial = new MeshStandardMaterial( { color: 0xDCF1FF } );
		defaultVertexColorMaterial.name = 'defaultVertexColorMaterial';
		defaultVertexColorMaterial.vertexColors = VertexColors;

		var defaultLineMaterial = new LineBasicMaterial();
		defaultLineMaterial.name = 'defaultLineMaterial';

		var defaultPointMaterial = new PointsMaterial( { size: 1, sizeAttenuation: false } );
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
	};

	
	Builder.prototype.setMaterials = function ( materials ) {
		var payload = {
			cmd: 'materialData',
			materials: {
				materialCloneInstructions: null,
				serializedMaterials: null,
				runtimeMaterials: Validator.isValid( this.callbacks.onLoadMaterials ) ? this.callbacks.onLoadMaterials( materials ) : materials
			}
		};
		this.updateMaterials( payload );
	};

	Builder.prototype._setCallbacks = function ( callbacks ) {
		if ( Validator.isValid( callbacks.onProgress ) ) this.callbacks.setCallbackOnProgress( callbacks.onProgress );
		if ( Validator.isValid( callbacks.onMeshAlter ) ) this.callbacks.setCallbackOnMeshAlter( callbacks.onMeshAlter );
		if ( Validator.isValid( callbacks.onLoad ) ) this.callbacks.setCallbackOnLoad( callbacks.onLoad );
		if ( Validator.isValid( callbacks.onLoadMaterials ) ) this.callbacks.setCallbackOnLoadMaterials( callbacks.onLoadMaterials );
	};

	
	Builder.prototype.processPayload = function ( payload ) {
		if ( payload.cmd === 'meshData' ) {

			return this.buildMeshes( payload );

		} else if ( payload.cmd === 'materialData' ) {

			this.updateMaterials( payload );
			return null;

		}
	};

	
	Builder.prototype.buildMeshes = function ( meshPayload ) {
		var meshName = meshPayload.params.meshName;

		var bufferGeometry = new BufferGeometry();
		bufferGeometry.addAttribute( 'position', new BufferAttribute( new Float32Array( meshPayload.buffers.vertices ), 3 ) );
		if ( Validator.isValid( meshPayload.buffers.indices ) ) {

			bufferGeometry.setIndex( new BufferAttribute( new Uint32Array( meshPayload.buffers.indices ), 1 ));

		}
		var haveVertexColors = Validator.isValid( meshPayload.buffers.colors );
		if ( haveVertexColors ) {

			bufferGeometry.addAttribute( 'color', new BufferAttribute( new Float32Array( meshPayload.buffers.colors ), 3 ) );

		}
		if ( Validator.isValid( meshPayload.buffers.normals ) ) {

			bufferGeometry.addAttribute( 'normal', new BufferAttribute( new Float32Array( meshPayload.buffers.normals ), 3 ) );

		} else {

			bufferGeometry.computeVertexNormals();

		}
		if ( Validator.isValid( meshPayload.buffers.uvs ) ) {

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
		var geometryType = Validator.verifyInput( meshPayload.geometryType, 0 );
		if ( Validator.isValid( callbackOnMeshAlter ) ) {

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
			if ( Validator.isValid( callbackOnMeshAlterResult ) ) {

				if ( ! callbackOnMeshAlterResult.isDisregardMesh() && callbackOnMeshAlterResult.providesAlteredMeshes() ) {

					for ( var i in callbackOnMeshAlterResult.meshes ) {

						meshes.push( callbackOnMeshAlterResult.meshes[ i ] );

					}

				}
				useOrgMesh = false;

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
		if ( Validator.isValid( meshes ) && meshes.length > 0 ) {

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
		if ( Validator.isValid( callbackOnProgress ) ) {

			var event = new CustomEvent( 'BuilderEvent', {
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
	};

	
	Builder.prototype.updateMaterials = function ( materialPayload ) {
		var material, materialName;
		var materialCloneInstructions = materialPayload.materials.materialCloneInstructions;
		if ( Validator.isValid( materialCloneInstructions ) ) {

			var materialNameOrg = materialCloneInstructions.materialNameOrg;
			var materialOrg = this.materials[ materialNameOrg ];

			if ( Validator.isValid( materialNameOrg ) ) {

				material = materialOrg.clone();

				materialName = materialCloneInstructions.materialName;
				material.name = materialName;

				var materialProperties = materialCloneInstructions.materialProperties;
				for ( var key in materialProperties ) {

					if ( material.hasOwnProperty( key ) && materialProperties.hasOwnProperty( key ) ) material[ key ] = materialProperties[ key ];

				}
				this.materials[ materialName ] = material;

			} else {

				this.logger.logWarn( 'Requested material "' + materialNameOrg + '" is not available!' );

			}
		}

		var materials = materialPayload.materials.serializedMaterials;
		if ( Validator.isValid( materials ) && Object.keys( materials ).length > 0 ) {

			var loader = new MaterialLoader();
			var materialJson;
			for ( materialName in materials ) {

				materialJson = materials[ materialName ];
				if ( Validator.isValid( materialJson ) ) {

					material = loader.parse( materialJson );
					this.logger.logInfo( 'De-serialized material with name "' + materialName + '" will be added.' );
					this.materials[ materialName ] = material;
				}

			}

		}

		materials = materialPayload.materials.runtimeMaterials;
		if ( Validator.isValid( materials ) && Object.keys( materials ).length > 0 ) {

			for ( materialName in materials ) {

				material = materials[ materialName ];
				this.logger.logInfo( 'Material with name "' + materialName + '" will be added.' );
				this.materials[ materialName ] = material;

			}

		}
	};

	
	Builder.prototype.getMaterialsJSON = function () {
		var materialsJSON = {};
		var material;
		for ( var materialName in this.materials ) {

			material = this.materials[ materialName ];
			materialsJSON[ materialName ] = material.toJSON();
		}

		return materialsJSON;
	};

	
	Builder.prototype.getMaterials = function () {
		return this.materials;
	};

	return Builder;
})();


LoaderSupport.LoaderBase = (function () {

	var Validator = LoaderSupport.Validator;
	var ConsoleLogger = LoaderSupport.ConsoleLogger;

	function LoaderBase( manager, logger ) {
		this.manager = Validator.verifyInput( manager, DefaultLoadingManager );
		this.logger = Validator.verifyInput( logger, new ConsoleLogger() );

		this.fileLoader = new FileLoader( this.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

		this.modelName = '';
		this.instanceNo = 0;
		this.path = '';
		this.useIndices = false;
		this.disregardNormals = false;

		this.loaderRootNode = new Group();
		this.builder = new LoaderSupport.Builder( this.logger );
		this.callbacks = new LoaderSupport.Callbacks();
	}

	LoaderBase.prototype._applyPrepData = function ( prepData ) {
		if ( Validator.isValid( prepData ) ) {

			this.setModelName( prepData.modelName );
			this.setStreamMeshesTo( prepData.streamMeshesTo );
			this.builder.setMaterials( prepData.materials );
			this.setUseIndices( prepData.useIndices );
			this.setDisregardNormals( prepData.disregardNormals );

			this._setCallbacks( prepData.getCallbacks() );
		}
	};

	LoaderBase.prototype._setCallbacks = function ( callbacks ) {
		if ( Validator.isValid( callbacks.onProgress ) ) this.callbacks.setCallbackOnProgress( callbacks.onProgress );
		if ( Validator.isValid( callbacks.onMeshAlter ) ) this.callbacks.setCallbackOnMeshAlter( callbacks.onMeshAlter );
		if ( Validator.isValid( callbacks.onLoad ) ) this.callbacks.setCallbackOnLoad( callbacks.onLoad );
		if ( Validator.isValid( callbacks.onLoadMaterials ) ) this.callbacks.setCallbackOnLoadMaterials( callbacks.onLoadMaterials );

		this.builder._setCallbacks( this.callbacks );
	};

	
	LoaderBase.prototype.getLogger = function () {
		return this.logger;
	};

	
	LoaderBase.prototype.setModelName = function ( modelName ) {
		this.modelName = Validator.verifyInput( modelName, this.modelName );
	};

	
	LoaderBase.prototype.setPath = function ( path ) {
		this.path = Validator.verifyInput( path, this.path );
	};

	
	LoaderBase.prototype.setStreamMeshesTo = function ( streamMeshesTo ) {
		this.loaderRootNode = Validator.verifyInput( streamMeshesTo, this.loaderRootNode );
	};

	
	LoaderBase.prototype.setMaterials = function ( materials ) {
		this.builder.setMaterials( materials );
	};

	
	LoaderBase.prototype.setUseIndices = function ( useIndices ) {
		this.useIndices = useIndices === true;
	};

	
	LoaderBase.prototype.setDisregardNormals = function ( disregardNormals ) {
		this.disregardNormals = disregardNormals === true;
	};

	
	LoaderBase.prototype.onProgress = function ( type, text, numericalValue ) {
		var content = Validator.isValid( text ) ? text: '';
		var event = {
			detail: {
				type: type,
				modelName: this.modelName,
				instanceNo: this.instanceNo,
				text: content,
				numericalValue: numericalValue
			}
		};

		if ( Validator.isValid( this.callbacks.onProgress ) ) this.callbacks.onProgress( event );

		this.logger.logDebug( content );
	};

	
	LoaderBase.prototype.load = function ( url, onLoad, onProgress, onError, onMeshAlter, useAsync ) {
		var scope = this;
		if ( ! Validator.isValid( onProgress ) ) {
			var numericalValueRef = 0;
			var numericalValue = 0;
			onProgress = function ( event ) {
				if ( ! event.lengthComputable ) return;

				numericalValue = event.loaded / event.total;
				if ( numericalValue > numericalValueRef ) {

					numericalValueRef = numericalValue;
					var output = 'Download of "' + url + '": ' + ( numericalValue * 100 ).toFixed( 2 ) + '%';
					scope.onProgress( 'progressLoad', output, numericalValue );

				}
			};
		}

		if ( ! Validator.isValid( onError ) ) {
			onError = function ( event ) {
				var output = 'Error occurred while downloading "' + url + '"';
				scope.logger.logError( output + ': ' + event );
				scope.onProgress( 'error', output, -1 );
			};
		}

		this.fileLoader.setPath( this.path );
		this.fileLoader.load( url, function ( content ) {
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

		}, onProgress, onError );

	};

	
	LoaderBase.prototype.checkResourceDescriptorFiles = function ( resources, fileDesc ) {
		var resource, triple, i, found;
		var result = {};

		for ( var index in resources ) {

			resource = resources[ index ];
			found = false;
			if ( ! Validator.isValid( resource.name ) ) continue;
			if ( Validator.isValid( resource.content ) ) {

				for ( i = 0; i < fileDesc.length && !found; i++ ) {

					triple = fileDesc[ i ];
					if ( resource.extension.toLowerCase() === triple.ext.toLowerCase() ) {

						if ( triple.ignore ) {

							found = true;

						} else if ( triple.type === "Uint8Array" ) {

							// fast-fail on bad type
							if ( ! ( resource.content instanceof Uint8Array ) ) throw 'Provided content is not of type arraybuffer! Aborting...';
							result[ triple.ext ] = resource;
							found = true;

						} else if ( triple.type === "String" ) {

							if ( ! (typeof(resource.content) === 'string' || resource.content instanceof String) ) throw 'Provided  content is not of type String! Aborting...';
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
	};

	return LoaderBase;
})();


LoaderSupport.WorkerRunnerRefImpl = (function () {

	function WorkerRunnerRefImpl() {
		var scope = this;
		var scopedRunner = function( event ) {
			scope.processMessage( event.data );
		};
		self.addEventListener( 'message', scopedRunner, false );
	}

	
	WorkerRunnerRefImpl.prototype.applyProperties = function ( parser, params ) {
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
	};

	
	WorkerRunnerRefImpl.prototype.processMessage = function ( payload ) {
		var logEnabled = payload.logger.enabled;
		var logDebug = payload.logger.enabled;
		if ( payload.cmd === 'run' ) {

			var callbacks = {
				callbackBuilder: function ( payload ) {
					self.postMessage( payload );
				},
				callbackProgress: function ( text ) {
					if ( logEnabled && logDebug ) console.debug( 'WorkerRunner: progress: ' + text );
				}
			};

			// Parser is expected to be named as such
			var parser = new Parser();
			if ( typeof parser[ 'setLogConfig' ] === 'function' ) parser.setLogConfig( logEnabled, logDebug );
			this.applyProperties( parser, payload.params );
			this.applyProperties( parser, payload.materials );
			this.applyProperties( parser, callbacks );
			parser.workerScope = self;
			parser.parse( payload.data.input, payload.data.options );

			if ( logEnabled ) console.log( 'WorkerRunner: Run complete!' );

			callbacks.callbackBuilder( {
				cmd: 'complete',
				msg: 'WorkerRunner completed run.'
			} );

		} else {

			console.error( 'WorkerRunner: Received unknown command: ' + payload.cmd );

		}
	};

	return WorkerRunnerRefImpl;
})();


LoaderSupport.WorkerSupport = (function () {

	var WORKER_SUPPORT_VERSION = '2.1.2';

	var Validator = LoaderSupport.Validator;

	var LoaderWorker = (function () {

		function LoaderWorker( logger ) {
			this.logger = Validator.verifyInput( logger, new LoaderSupport.ConsoleLogger() );
			this._reset();
		}

		LoaderWorker.prototype._reset = function () {
			this.worker = null;
			this.runnerImplName = null;
			this.callbacks = {
				builder: null,
				onLoad: null
			};
			this.terminateRequested = false;
			this.queuedMessage = null;
			this.started = false;
		};

		LoaderWorker.prototype.initWorker = function ( code, runnerImplName ) {
			this.runnerImplName = runnerImplName;
			var blob = new Blob( [ code ], { type: 'application/javascript' } );
			this.worker = new Worker( window.URL.createObjectURL( blob ) );
			this.worker.onmessage = this._receiveWorkerMessage;

			// set referemce to this, then processing in worker scope within "_receiveWorkerMessage" can access members
			this.worker.runtimeRef = this;

			// process stored queuedMessage
			this._postMessage();
		};

		
		LoaderWorker.prototype._receiveWorkerMessage = function ( e ) {
			var payload = e.data;
			switch ( payload.cmd ) {
				case 'meshData':
				case 'materialData':
				case 'imageData':
					this.runtimeRef.callbacks.builder( payload );
					break;

				case 'complete':
					this.runtimeRef.queuedMessage = null;
					this.started = false;
					this.runtimeRef.callbacks.onLoad( payload.msg );

					if ( this.runtimeRef.terminateRequested ) {

						this.runtimeRef.logger.logInfo( 'WorkerSupport [' + this.runtimeRef.runnerImplName + ']: Run is complete. Terminating application on request!' );
						this.runtimeRef._terminate();

					}
					break;

				case 'error':
					this.runtimeRef.logger.logError( 'WorkerSupport [' + this.runtimeRef.runnerImplName + ']: Reported error: ' + payload.msg );
					this.runtimeRef.queuedMessage = null;
					this.started = false;
					this.runtimeRef.callbacks.onLoad( payload.msg );

					if ( this.runtimeRef.terminateRequested ) {

						this.runtimeRef.logger.logInfo( 'WorkerSupport [' + this.runtimeRef.runnerImplName + ']: Run reported error. Terminating application on request!' );
						this.runtimeRef._terminate();

					}
					break;

				default:
					this.runtimeRef.logger.logError( 'WorkerSupport [' + this.runtimeRef.runnerImplName + ']: Received unknown command: ' + payload.cmd );
					break;

			}
		};

		LoaderWorker.prototype.setCallbacks = function ( builder, onLoad ) {
			this.callbacks.builder = Validator.verifyInput( builder, this.callbacks.builder );
			this.callbacks.onLoad = Validator.verifyInput( onLoad, this.callbacks.onLoad );
		};

		LoaderWorker.prototype.run = function( payload ) {
			if ( Validator.isValid( this.queuedMessage ) ) {

				console.warn( 'Already processing message. Rejecting new run instruction' );
				return;

			} else {

				this.queuedMessage = payload;
				this.started = true;

			}
			if ( ! Validator.isValid( this.callbacks.builder ) ) throw 'Unable to run as no "builder" callback is set.';
			if ( ! Validator.isValid( this.callbacks.onLoad ) ) throw 'Unable to run as no "onLoad" callback is set.';
			if ( payload.cmd !== 'run' ) payload.cmd = 'run';
			if ( Validator.isValid( payload.logger ) ) {

				payload.logger.enabled = Validator.verifyInput( payload.logger.enabled, true );
				payload.logger.debug = Validator.verifyInput( payload.logger.debug, false );

			} else {

				payload.logger = {
					enabled: true,
					debug: false
				}

			}
			this._postMessage();
		};

		LoaderWorker.prototype._postMessage = function () {
			if ( Validator.isValid( this.queuedMessage ) && Validator.isValid( this.worker ) ) {

				if ( this.queuedMessage.data.input instanceof ArrayBuffer ) {

					this.worker.postMessage( this.queuedMessage, [ this.queuedMessage.data.input ] );

				} else {

					this.worker.postMessage( this.queuedMessage );

				}

			}
		};

		LoaderWorker.prototype.setTerminateRequested = function ( terminateRequested ) {
			this.terminateRequested = terminateRequested === true;
			if ( this.terminateRequested && Validator.isValid( this.worker ) && ! Validator.isValid( this.queuedMessage ) && this.started ) {

				this.logger.logInfo( 'Worker is terminated immediately as it is not running!' );
				this._terminate();

			}
		};

		LoaderWorker.prototype._terminate = function () {
			this.worker.terminate();
			this._reset();
		};

		return LoaderWorker;

	})();

	function WorkerSupport( logger ) {
		this.logger = Validator.verifyInput( logger, new LoaderSupport.ConsoleLogger() );
		this.logger.logInfo( 'Using LoaderSupport.WorkerSupport version: ' + WORKER_SUPPORT_VERSION );

		// check worker support first
		if ( window.Worker === undefined ) throw "This browser does not support web workers!";
		if ( window.Blob === undefined  ) throw "This browser does not support Blob!";
		if ( typeof window.URL.createObjectURL !== 'function'  ) throw "This browser does not support Object creation from URL!";

		this.loaderWorker = new LoaderWorker( this.logger );
	}

	
	WorkerSupport.prototype.validate = function ( functionCodeBuilder, parserName, libLocations, libPath, runnerImpl ) {
		if ( Validator.isValid( this.loaderWorker.worker ) ) return;

		this.logger.logInfo( 'WorkerSupport: Building worker code...' );
		this.logger.logTimeStart( 'buildWebWorkerCode' );

		if ( Validator.isValid( runnerImpl ) ) {

			this.logger.logInfo( 'WorkerSupport: Using "' + runnerImpl.name + '" as Runner class for worker.' );

		} else {

			runnerImpl = LoaderSupport.WorkerRunnerRefImpl;
			this.logger.logInfo( 'WorkerSupport: Using DEFAULT "LoaderSupport.WorkerRunnerRefImpl" as Runner class for worker.' );

		}

		var userWorkerCode = functionCodeBuilder( buildObject, buildSingleton );
		userWorkerCode += 'var Parser = '+ parserName + ';\n\n';
		userWorkerCode += buildSingleton( runnerImpl.name, runnerImpl );
		userWorkerCode += 'new ' + runnerImpl.name + '();\n\n';

		var scope = this;
		if ( Validator.isValid( libLocations ) && libLocations.length > 0 ) {

			var libsContent = '';
			var loadAllLibraries = function ( path, locations ) {
				if ( locations.length === 0 ) {

					scope.loaderWorker.initWorker( libsContent + userWorkerCode, runnerImpl.name );
					scope.logger.logTimeEnd( 'buildWebWorkerCode' );

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

			this.loaderWorker.initWorker( userWorkerCode, runnerImpl.name );
			this.logger.logTimeEnd( 'buildWebWorkerCode' );

		}
	};

	
	WorkerSupport.prototype.setCallbacks = function ( builder, onLoad ) {
		this.loaderWorker.setCallbacks( builder, onLoad );
	};

	
	WorkerSupport.prototype.run = function ( payload ) {
		this.loaderWorker.run( payload );
	};

	
	WorkerSupport.prototype.setTerminateRequested = function ( terminateRequested ) {
		this.loaderWorker.setTerminateRequested( terminateRequested );
	};

	var buildObject = function ( fullName, object ) {
		var objectString = fullName + ' = {\n';
		var part;
		for ( var name in object ) {

			part = object[ name ];
			if ( typeof( part ) === 'string' || part instanceof String ) {

				part = part.replace( '\n', '\\n' );
				part = part.replace( '\r', '\\r' );
				objectString += '\t' + name + ': "' + part + '",\n';

			} else if ( part instanceof Array ) {

				objectString += '\t' + name + ': [' + part + '],\n';

			} else if ( Number.isInteger( part ) ) {

				objectString += '\t' + name + ': ' + part + ',\n';

			} else if ( typeof part === 'function' ) {

				objectString += '\t' + name + ': ' + part + ',\n';

			}

		}
		objectString += '}\n\n';

		return objectString;
	};

	var buildSingleton = function ( fullName, object, internalName ) {
		var objectString = '';
		var objectName = ( Validator.isValid( internalName ) ) ? internalName : object.name;

		var funcString, objectPart, constructorString;
		for ( var name in object.prototype ) {

			objectPart = object.prototype[ name ];
			if ( name === 'constructor' ) {

				funcString = objectPart.toString();
				funcString = funcString.replace( 'function', '' );
				constructorString = '\tfunction ' + objectName + funcString + ';\n\n';

			} else if ( typeof objectPart === 'function' ) {

				funcString = objectPart.toString();
				objectString += '\t' + objectName + '.prototype.' + name + ' = ' + funcString + ';\n\n';

			}

		}
		objectString += '\treturn ' + objectName + ';\n';
		objectString += '})();\n\n';
		if ( ! Validator.isValid( constructorString ) ) {

			constructorString = fullName + ' = (function () {\n\n';
			constructorString += '\t' + object.prototype.constructor.toString() + '\n\n';
			objectString = constructorString + objectString;

		} else {

			objectString = fullName + ' = (function () {\n\n' + constructorString + objectString;

		}
		return objectString;
	};

	return WorkerSupport;

})();


LoaderSupport.WorkerDirector = (function () {

	var LOADER_WORKER_DIRECTOR_VERSION = '2.1.0';

	var Validator = LoaderSupport.Validator;

	var MAX_WEB_WORKER = 16;
	var MAX_QUEUE_SIZE = 8192;

	function WorkerDirector( classDef, logger ) {
		this.logger = Validator.verifyInput( logger, new LoaderSupport.ConsoleLogger() );
		this.logger.logInfo( 'Using LoaderSupport.WorkerDirector version: ' + LOADER_WORKER_DIRECTOR_VERSION );

		this.maxQueueSize = MAX_QUEUE_SIZE ;
		this.maxWebWorkers = MAX_WEB_WORKER;
		this.crossOrigin = null;

		if ( ! Validator.isValid( classDef ) ) throw 'Provided invalid classDef: ' + classDef;

		this.workerDescription = {
			classDef: classDef,
			globalCallbacks: {},
			workerSupports: {}
		};
		this.objectsCompleted = 0;
		this.instructionQueue = [];
		this.instructionQueuePointer = 0;

		this.callbackOnFinishedProcessing = null;
	}

	
	WorkerDirector.prototype.getMaxQueueSize = function () {
		return this.maxQueueSize;
	};

	
	WorkerDirector.prototype.getMaxWebWorkers = function () {
		return this.maxWebWorkers;
	};

	
	WorkerDirector.prototype.setCrossOrigin = function ( crossOrigin ) {
		this.crossOrigin = crossOrigin;
	};

	
	WorkerDirector.prototype.prepareWorkers = function ( globalCallbacks, maxQueueSize, maxWebWorkers ) {
		if ( Validator.isValid( globalCallbacks ) ) this.workerDescription.globalCallbacks = globalCallbacks;
		this.maxQueueSize = Math.min( maxQueueSize, MAX_QUEUE_SIZE );
		this.maxWebWorkers = Math.min( maxWebWorkers, MAX_WEB_WORKER );
		this.maxWebWorkers = Math.min( this.maxWebWorkers, this.maxQueueSize );
		this.objectsCompleted = 0;
		this.instructionQueue = [];
		this.instructionQueuePointer = 0;

		for ( var instanceNo = 0; instanceNo < this.maxWebWorkers; instanceNo++ ) {

			this.workerDescription.workerSupports[ instanceNo ] = {
				instanceNo: instanceNo,
				inUse: false,
				terminateRequested: false,
				workerSupport: new LoaderSupport.WorkerSupport( this.logger ),
				loader: null
			};

		}
	};

	
	WorkerDirector.prototype.enqueueForRun = function ( prepData ) {
		if ( this.instructionQueue.length < this.maxQueueSize ) {
			this.instructionQueue.push( prepData );
		}
	};

	
	WorkerDirector.prototype.isRunning = function () {
		var wsKeys = Object.keys( this.workerDescription.workerSupports );
		return ( ( this.instructionQueue.length > 0 && this.instructionQueuePointer < this.instructionQueue.length ) || wsKeys.length > 0 );
	};

	
	WorkerDirector.prototype.processQueue = function () {
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
	};

	WorkerDirector.prototype._kickWorkerRun = function( prepData, supportDesc ) {
		supportDesc.inUse = true;
		supportDesc.workerSupport.setTerminateRequested( supportDesc.terminateRequested );

		this.logger.logInfo( '\nAssigning next item from queue to worker (queue length: ' + this.instructionQueue.length + ')\n\n' );

		var scope = this;
		var prepDataCallbacks = prepData.getCallbacks();
		var globalCallbacks = this.workerDescription.globalCallbacks;
		var wrapperOnLoad = function ( event ) {
			if ( Validator.isValid( globalCallbacks.onLoad ) ) globalCallbacks.onLoad( event );
			if ( Validator.isValid( prepDataCallbacks.onLoad ) ) prepDataCallbacks.onLoad( event );
			scope.objectsCompleted++;
			supportDesc.inUse = false;

			scope.processQueue();
		};

		var wrapperOnProgress = function ( event ) {
			if ( Validator.isValid( globalCallbacks.onProgress ) ) globalCallbacks.onProgress( event );
			if ( Validator.isValid( prepDataCallbacks.onProgress ) ) prepDataCallbacks.onProgress( event );
		};

		var wrapperOnMeshAlter = function ( event ) {
			if ( Validator.isValid( globalCallbacks.onMeshAlter ) ) globalCallbacks.onMeshAlter( event );
			if ( Validator.isValid( prepDataCallbacks.onMeshAlter ) ) prepDataCallbacks.onMeshAlter( event );
		};

		supportDesc.loader = this._buildLoader( supportDesc.instanceNo );

		var updatedCallbacks = new LoaderSupport.Callbacks();
		updatedCallbacks.setCallbackOnLoad( wrapperOnLoad );
		updatedCallbacks.setCallbackOnProgress( wrapperOnProgress );
		updatedCallbacks.setCallbackOnMeshAlter( wrapperOnMeshAlter );
		prepData.callbacks = updatedCallbacks;

		supportDesc.loader.run( prepData, supportDesc.workerSupport );
	};

	WorkerDirector.prototype._buildLoader = function ( instanceNo ) {
		var classDef = this.workerDescription.classDef;
		var loader = Object.create( classDef.prototype );
		this.workerDescription.classDef.call( loader, DefaultLoadingManager, this.logger );

		// verify that all required functions are implemented
		if ( ! loader.hasOwnProperty( 'instanceNo' ) ) throw classDef.name + ' has no property "instanceNo".';
		loader.instanceNo = instanceNo;

		if ( ! loader.hasOwnProperty( 'workerSupport' ) ) {

			throw classDef.name + ' has no property "workerSupport".';

		}
		if ( typeof loader.run !== 'function'  ) throw classDef.name + ' has no function "run".';
		if ( ! loader.hasOwnProperty( 'callbacks' ) || ! Validator.isValid( loader.callbacks ) ) {

			this.logger.logWarn( classDef.name + ' has an invalid property "callbacks". Will change to "LoaderSupport.Callbacks"' );
			loader.callbacks = new LoaderSupport.Callbacks();

		}
		return loader;
	};

	WorkerDirector.prototype._deregister = function ( supportDesc ) {
		if ( Validator.isValid( supportDesc ) ) {

			supportDesc.workerSupport.setTerminateRequested( true );
			this.logger.logInfo( 'Requested termination of worker #' + supportDesc.instanceNo + '.' );

			var loaderCallbacks = supportDesc.loader.callbacks;
			if ( Validator.isValid( loaderCallbacks.onProgress ) ) loaderCallbacks.onProgress( { detail: { text: '' } } );
			delete this.workerDescription.workerSupports[ supportDesc.instanceNo ];

		}
	};

	
	WorkerDirector.prototype.tearDown = function ( callbackOnFinishedProcessing ) {
		this.logger.logInfo( 'WorkerDirector received the deregister call. Terminating all workers!' );

		this.instructionQueuePointer = this.instructionQueue.length;
		this.callbackOnFinishedProcessing = Validator.verifyInput( callbackOnFinishedProcessing, null );

		for ( var name in this.workerDescription.workerSupports ) {

			this.workerDescription.workerSupports[ name ].terminateRequested = true;

		}
	};

	return WorkerDirector;

})();

export { LoaderSupport }
