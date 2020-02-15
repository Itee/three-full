//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLCubeRenderTarget } from './../renderers/WebGLCubeRenderTarget';
import { WebGLRenderTargetOptions } from './../renderers/WebGLRenderTarget';
import { Scene } from './../scenes/Scene';
import { WebGLRenderer } from './../renderers/WebGLRenderer';
import { Object3D } from './../core/Object3D';

export class CubeCamera extends Object3D {

	constructor( near?: number, far?: number, cubeResolution?: number, options?: WebGLRenderTargetOptions );

	type: 'CubeCamera';

	renderTarget: WebGLCubeRenderTarget;

	update( renderer: WebGLRenderer, scene: Scene ): void;

	clear( renderer: WebGLRenderer, color: boolean, depth: boolean, stencil: boolean ): void;

}
