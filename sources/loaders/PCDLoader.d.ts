//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Points,
	Loader,
	LoadingManager
} from '../../../src/Three';
export class PCDLoader extends Loader {

	constructor( manager?: LoadingManager );
	littleEndian: boolean;

	load( url: string, onLoad: ( points: Points ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	parse( data: ArrayBuffer | string, url: string ) : Points;

}
