//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Uniform
} from '../../../src/Three';

export const ConvolutionShader: {
	defines: {
		KERNEL_SIZE_FLOAT: string;
		KERNEL_SIZE_INT: string;
	},
	uniforms: {
		tDiffuse: Uniform;
		uImageIncrement: Uniform;
		cKernel: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;

	buildKernel( sigma: number ): number[];
};
