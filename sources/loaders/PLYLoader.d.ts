//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	BufferGeometry,
	Loader,
	LoadingManager
} from '../../../src/Three';
export class PLYLoader extends Loader {

	constructor( manager?: LoadingManager );
	propertyNameMapping: object;

	load( url: string, onLoad: ( geometry: BufferGeometry ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	setPropertyNameMapping( mapping: object ) : void;
	parse( data: ArrayBuffer | string ) : BufferGeometry;

}
