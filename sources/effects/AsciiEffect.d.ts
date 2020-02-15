//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Camera,
	Scene,
	WebGLRenderer
} from '../../../src/Three';

export interface AsciiEffectOptions {
	resolution?: number;
	scale?: number;
	color?: boolean;
	alpha?: boolean;
	block?: boolean;
	invert?: boolean;
}

export class AsciiEffect {

	constructor( renderer: WebGLRenderer, charSet?: string, options?: AsciiEffectOptions );
	domElement: HTMLElement;

	render( scene: Scene, camera: Camera ): void;
	setSize( width: number, height: number ): void;

}
