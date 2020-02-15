//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	WebGLRenderTarget,
	WebGLRenderTargetOptions,
} from './WebGLRenderTarget';

export class WebGLMultiviewRenderTarget extends WebGLRenderTarget {

	constructor(
		width: number,
		height: number,
		numViews: number,
		options?: WebGLRenderTargetOptions
	);

	readonly isWebGLMultiviewRenderTarget: true;
	setNumViews( numViews: number ): this;

}
