//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Uniform
} from '../../../src/Three';

export const HalftoneShader: {
	uniforms: {
		tDiffuse: Uniform;
		shape: Uniform;
		radius: Uniform;
		rotateR: Uniform;
		rotateG: Uniform;
		rotateB: Uniform;
		scatter: Uniform;
		width: Uniform;
		height: Uniform;
		blending: Uniform;
		blendingMode: Uniform;
		greyscale: Uniform;
		disable: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
