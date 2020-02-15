//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Loader } from './Loader';
import { LoadingManager } from './LoadingManager';

export class FileLoader extends Loader {

	constructor( manager?: LoadingManager );

	mimeType: undefined | MimeType;
	responseType: undefined |string;
	withCredentials: undefined |string;
	requestHeader: undefined | { [header: string]: string };

	load(
		url: string,
		onLoad?: ( response: string | ArrayBuffer ) => void,
		onProgress?: ( request: ProgressEvent ) => void,
		onError?: ( event: ErrorEvent ) => void
	): any;
	setMimeType( mimeType: MimeType ): FileLoader;
	setResponseType( responseType: string ): FileLoader;
	setWithCredentials( value: boolean ): FileLoader;
	setRequestHeader( value: { [header: string]: string } ): FileLoader;

}
