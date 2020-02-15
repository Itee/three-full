//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Material,
	WebGLRenderer,
	WebGLRenderTarget
} from '../../../src/Three';

export class Pass {

	constructor();
	enabled: boolean;
	needsSwap: boolean;
	clear: boolean;
	renderToScreen: boolean;

	setSize( width: number, height: number ): void;
	render( renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean ): void;

}

export namespace Pass {
	class FullScreenQuad {

		constructor( material?: Material );

		render( renderer: WebGLRenderer ): void;
		dispose(): void;

		material: Material;

	}
}
