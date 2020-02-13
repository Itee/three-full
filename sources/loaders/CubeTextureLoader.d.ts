//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Loader } from './Loader';
import { LoadingManager } from './LoadingManager';
import { CubeTexture } from './../textures/CubeTexture';

export class CubeTextureLoader extends Loader {

	constructor( manager?: LoadingManager );

	load(
		urls: Array<string>,
		onLoad?: ( texture: CubeTexture ) => void,
		onProgress?: ( event: ProgressEvent ) => void,
		onError?: ( event: ErrorEvent ) => void
	): CubeTexture;

}
