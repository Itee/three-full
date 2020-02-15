//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Object3D,
	AnimationClip
} from '../../../src/Three';

export interface GLTFExporterOptions {
	binary?: boolean;
	trs?: boolean;
	onlyVisible?: boolean;
	truncateDrawRange?: boolean;
	embedImages?: boolean;
	animations?: AnimationClip[];
	forceIndices?: boolean;
	forcePowerOfTwoTextures?: boolean;
	includeCustomExtensions?: boolean;
}

export class GLTFExporter {

	constructor();

	parse( input: Object3D, onCompleted: ( gltf: object ) => void, options: GLTFExporterOptions ): void;

}
