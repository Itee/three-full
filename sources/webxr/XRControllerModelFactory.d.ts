//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Group,
	Object3D,
	Texture
} from '../../../src/Three';

import { GLTFLoader } from '../loaders/GLTFLoader';

export class XRControllerModel extends Object3D {
	constructor( );

	motionController: any;

	setEnvironmentMap( envMap: Texture ): XRControllerModel;
}

export class XRControllerModelFactory {
	constructor( gltfLoader?: GLTFLoader );
	gltfLoader: GLTFLoader | null;
	path: string;

	createControllerModel( controller: Group ): XRControllerModel;
}
