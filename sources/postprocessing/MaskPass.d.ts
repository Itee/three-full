//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Scene,
	Camera,
} from '../../../src/Three';

import { Pass } from './Pass';

export class MaskPass extends Pass {

	constructor( scene: Scene, camera: Camera );
	scene: Scene;
	camera: Camera;
	inverse: boolean;

}

export class ClearMaskPass extends Pass {

	constructor();

}