//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Scene,
	Camera,
	ShaderMaterial,
	WebGLRenderTarget,
	MeshDepthMaterial,
	Color
} from '../../../src/Three';

import { Pass } from './Pass';

export interface BokehPassParamters {
	focus?: number;
	aspect?: number;
	aperture?: number;
	maxblur?: number;
	width?: number;
	height?: number;
}

export class BokehPass extends Pass {

	constructor( scene: Scene, camera: Camera, params: BokehPassParamters );
	scene: Scene;
	camera: Camera;
	renderTargetColor: WebGLRenderTarget;
	renderTargetDepth: WebGLRenderTarget;
	materialDepth: MeshDepthMaterial;
	materialBokeh: ShaderMaterial;
	uniforms: object;
	fsQuad: object;
	oldClearColor: Color;

}
