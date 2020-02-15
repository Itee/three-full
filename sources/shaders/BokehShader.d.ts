//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Uniform
} from '../../../src/Three';

export const BokehShader: {
	defines: {
		DEPTH_PACKING: number;
		PERSPECTIVE_CAMERA: number;
	}
	uniforms: {
		tColor: Uniform;
		tDepth: Uniform;
		focus: Uniform;
		aspect: Uniform;
		aperture: Uniform;
		maxblur: Uniform;
		nearClip: Uniform;
		farClip: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
