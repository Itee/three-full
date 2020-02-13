//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Loader } from './Loader';
import { LoadingManager } from './LoadingManager';

export class ImageBitmapLoader extends Loader {

	constructor( manager?: LoadingManager );

	options: undefined | object;

	setOptions( options: object ): ImageBitmapLoader;
	load(
		url: string,
		onLoad?: ( response: ImageBitmap ) => void,
		onProgress?: ( request: ProgressEvent ) => void,
		onError?: ( event: ErrorEvent ) => void
	): any;

}
