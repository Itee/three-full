//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	AnimationClip,
	Loader,
	LoadingManager,
	Scene
} from '../../../src/Three';
export interface Collada {
	animations: AnimationClip[];
	kinematics: object;
	library: object;
	scene: Scene;
}

export class ColladaLoader extends Loader {

	constructor( manager?: LoadingManager );

	load( url: string, onLoad: ( collada: Collada ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	parse( text: string, path: string ) : Collada;

}
