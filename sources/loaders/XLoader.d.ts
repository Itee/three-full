//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Mesh,
	Loader,
	LoadingManager
} from '../../../src/Three';

export interface XResult {
	animations: object[];
	models: Mesh[];
}

export class XLoader extends Loader {

	constructor( manager?: LoadingManager );

	load( url: string, onLoad: ( object: XResult ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ): void;
	parse( data: ArrayBuffer | string, onLoad: ( object: object ) => void ): object;

}
