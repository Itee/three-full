//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Uniform
} from '../../../src/Three';

export const ParallaxShader: {
	modes: {
		none: string;
		basic: string;
		steep: string;
		occlusion: string;
		relief: string;
	};
	uniforms: {
		bumpMap: Uniform;
		map: Uniform;
		parallaxScale: Uniform;
		parallaxMinLayers: Uniform;
		parallaxMaxLayers: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
};
