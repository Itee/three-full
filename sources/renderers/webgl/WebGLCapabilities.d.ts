//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface WebGLCapabilitiesParameters {
	precision?: string;
	logarithmicDepthBuffer?: boolean;
}

export class WebGLCapabilities {

	constructor(
		gl: WebGLRenderingContext,
		extensions: any,
		parameters: WebGLCapabilitiesParameters
	);

	readonly isWebGL2: true;
	precision: string;
	logarithmicDepthBuffer: boolean;
	maxTextures: number;
	maxVertexTextures: number;
	maxTextureSize: number;
	maxCubemapSize: number;
	maxAttributes: number;
	maxVertexUniforms: number;
	maxVaryings: number;
	maxFragmentUniforms: number;
	vertexTextures: boolean;
	floatFragmentTextures: boolean;
	floatVertexTextures: boolean;

	getMaxAnisotropy(): number;
	getMaxPrecision( precision: string ): string;

}
