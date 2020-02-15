//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Texture,
	Loader,
	LoadingManager
} from '../../../src/Three';

export class TGALoader extends Loader {

	constructor( manager?: LoadingManager );

	load( url: string, onLoad: ( texture: Texture ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	parse( data: ArrayBuffer ) : Texture;

}
