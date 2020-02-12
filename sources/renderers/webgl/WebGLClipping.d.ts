//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Camera } from './../../cameras/Camera';

export class WebGLClipping {

	uniform: { value: any; needsUpdate: boolean };
	numPlanes: number;

	init( planes: any[], enableLocalClipping: boolean, camera: Camera ): boolean;
	beginShadows(): void;
	endShadows(): void;
	setState(
		planes: any[],
		clipShadows: boolean,
		camera: Camera,
		cache: boolean,
		fromCache: boolean
	): void;

}
