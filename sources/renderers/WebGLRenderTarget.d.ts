//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector4 } from './../math/Vector4';
import { Texture } from './../textures/Texture';
import { DepthTexture } from './../textures/DepthTexture';
import { EventDispatcher } from './../core/EventDispatcher';
import { Wrapping, TextureFilter, TextureDataType } from '../constants';

export interface WebGLRenderTargetOptions {
	wrapS?: Wrapping;
	wrapT?: Wrapping;
	magFilter?: TextureFilter;
	minFilter?: TextureFilter;
	format?: number; 
	type?: TextureDataType; 
	anisotropy?: number; 
	depthBuffer?: boolean; 
	stencilBuffer?: boolean; 
	generateMipmaps?: boolean; 
	depthTexture?: DepthTexture;
}

export class WebGLRenderTarget extends EventDispatcher {

	constructor(
		width: number,
		height: number,
		options?: WebGLRenderTargetOptions
	);

	uuid: string;
	width: number;
	height: number;
	scissor: Vector4;
	scissorTest: boolean;
	viewport: Vector4;
	texture: Texture;
	depthBuffer: boolean;
	stencilBuffer: boolean;
	depthTexture: DepthTexture;
	readonly isWebGLRenderTarget: true;
	wrapS: any;
	
	wrapT: any;
	
	magFilter: any;
	
	minFilter: any;
	
	anisotropy: any;
	
	offset: any;
	
	repeat: any;
	
	format: any;
	
	type: any;
	
	generateMipmaps: any;

	setSize( width: number, height: number ): void;
	clone(): this;
	copy( source: WebGLRenderTarget ): this;
	dispose(): void;

}
