//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { PerspectiveCamera } from './PerspectiveCamera';
import { Camera } from './Camera';

export class StereoCamera extends Camera {

	constructor();

	type: 'StereoCamera';

	aspect: number;
	eyeSep: number;
	cameraL: PerspectiveCamera;
	cameraR: PerspectiveCamera;

	update( camera: PerspectiveCamera ): void;

}
