//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	CubeTexture,
	LightProbe,
	WebGLRenderer,
	WebGLCubeRenderTarget,
} from '../../../src/Three';

export namespace LightProbeGenerator {

	export function fromCubeTexture( cubeTexture: CubeTexture ): LightProbe;
	export function fromCubeRenderTarget( renderer: WebGLRenderer, cubeRenderTarget: WebGLCubeRenderTarget ): LightProbe;

}
