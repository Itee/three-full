//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface WebGLCapabilitiesParameters {
	precision?: any;
	logarithmicDepthBuffer?: any;
}

export class WebGLCapabilities {

	constructor(
		gl: WebGLRenderingContext,
		extensions: any,
		parameters: WebGLCapabilitiesParameters
	);

	isWebGL2: boolean;
	precision: any;
	logarithmicDepthBuffer: any;
	maxTextures: any;
	maxVertexTextures: any;
	maxTextureSize: any;
	maxCubemapSize: any;
	maxAttributes: any;
	maxVertexUniforms: any;
	maxVaryings: any;
	maxFragmentUniforms: any;
	vertexTextures: any;
	floatFragmentTextures: any;
	floatVertexTextures: any;

	getMaxAnisotropy(): number;
	getMaxPrecision( precision: string ): string;

}
