//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLRenderTargetOptions, WebGLRenderTarget } from './WebGLRenderTarget';
import { WebGLRenderer } from './WebGLRenderer';
import { Texture } from './../textures/Texture';

export class WebGLCubeRenderTarget extends WebGLRenderTarget {

	constructor(
		size: number,
		options?: WebGLRenderTargetOptions
	);

	fromEquirectangularTexture( renderer: WebGLRenderer, texture: Texture ): this;

}
