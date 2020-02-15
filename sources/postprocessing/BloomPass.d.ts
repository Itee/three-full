//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	WebGLRenderTarget,
	ShaderMaterial
} from '../../../src/Three';

import { Pass } from './Pass';

export class BloomPass extends Pass {

	constructor( strength?: number, kernelSize?: number, sigma?: number, resolution?: number );
	renderTargetX: WebGLRenderTarget;
	renderTargetY: WebGLRenderTarget;
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	convolutionUniforms: object;
	materialConvolution: ShaderMaterial;
	fsQuad: object;

}
