//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLRenderer } from './../WebGLRenderer';
import { WebGLShader } from './WebGLShader';
import { WebGLUniforms } from './WebGLUniforms';

export class WebGLProgram {

	constructor(
		renderer: WebGLRenderer,
		cacheKey: string,
		parameters: object
	);

	name: string;
	id: number;
	cacheKey: string; 
	usedTimes: number;
	program: any;
	vertexShader: WebGLShader;
	fragmentShader: WebGLShader;
	numMultiviewViews: number;
	
	uniforms: any;
	
	attributes: any;

	getUniforms(): WebGLUniforms;
	getAttributes(): any;
	destroy(): void;

}
