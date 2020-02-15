//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	ShaderMaterial,
	WebGLRenderTarget
} from '../../../src/Three';

import { Pass } from './Pass';

export class SavePass extends Pass {

	constructor( renderTarget: WebGLRenderTarget );
	textureID: string;
	renderTarget: WebGLRenderTarget;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;

}
