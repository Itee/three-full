//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Loader,
	LoadingManager,
	Material,
	Object3D
} from '../../../src/Three';

export interface LWO {
	materials: Material[];
	meshes: Object3D[];
}

export interface LWOLoaderParameters {
	resourcePath?: string;

}

export class LWOLoader extends Loader {

	constructor( manager?: LoadingManager, parameters?: LWOLoaderParameters );

	load( url: string, onLoad: ( lwo: LWO ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	parse( data: ArrayBuffer, path: string, modelName: string ): LWO;

}
