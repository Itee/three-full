//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Camera,
	Scene,
	WebGLRenderer
} from '../../../src/Three';

export class StereoEffect {

	constructor( renderer: WebGLRenderer );

	setEyeSeparation( eyeSep: number ): void;
	render( scene: Scene, camera: Camera ): void;
	setSize( width: number, height: number ): void;

}
