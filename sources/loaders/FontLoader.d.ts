//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Loader } from './Loader';
import { LoadingManager } from './LoadingManager';
import { Font } from './../extras/core/Font';

export class FontLoader extends Loader {

	constructor( manager?: LoadingManager );

	load(
		url: string,
		onLoad?: ( responseFont: Font ) => void,
		onProgress?: ( event: ProgressEvent ) => void,
		onError?: ( event: ErrorEvent ) => void
	): void;
	parse( json: any ): Font;

}
