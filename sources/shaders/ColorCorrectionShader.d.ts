//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Uniform
} from '../../../src/Three';

export const ColorCorrectionShader: {
	uniforms: {
		tDiffuse: Uniform;
		powRGB: Uniform;
		mulRGB: Uniform;
		addRGB: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
