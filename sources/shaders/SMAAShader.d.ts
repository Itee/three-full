//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Uniform
} from '../../../src/Three';

export const SMAAEdgesShader: {
	defines: {
		SMAA_THRESHOLD: string;
	},
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};

export const SMAAWeightsShader: {
	defines: {
		SMAA_MAX_SEARCH_STEPS: string;
		SMAA_AREATEX_MAX_DISTANCE: string;
		SMAA_AREATEX_PIXEL_SIZE: string;
		SMAA_AREATEX_SUBTEX_SIZE: string;
	},
	uniforms: {
		tDiffuse: Uniform;
		tArea: Uniform;
		tSearch: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};

export const SMAABlendShader: {
	uniforms: {
		tDiffuse: Uniform;
		tColor: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
