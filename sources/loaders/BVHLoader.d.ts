//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	AnimationClip,
	Skeleton,
	Loader,
	LoadingManager
} from '../../../src/Three';
export interface BVH {
	clip: AnimationClip;
	skeleton: Skeleton;
}

export class BVHLoader extends Loader {

	constructor( manager?: LoadingManager );
	animateBonePositions: boolean;
	animateBoneRotations: boolean;

	load( url: string, onLoad: ( bvh: BVH ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	parse( text: string ) : BVH;

}
