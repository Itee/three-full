//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLRenderer, WebGLRendererParameters } from './../WebGLRenderer';
import { ShaderMaterial } from './../../materials/ShaderMaterial';
import { WebGLShader } from './WebGLShader';
import { WebGLExtensions } from './WebGLExtensions';
import { WebGLUniforms } from './WebGLUniforms';

export class WebGLProgram {

	constructor(
		renderer: WebGLRenderer,
		extensions: WebGLExtensions,
		code: string,
		material: ShaderMaterial,
		shader: WebGLShader,
		parameters: WebGLRendererParameters
	);

	id: number;
	code: string;
	usedTimes: number;
	program: any;
	vertexShader: WebGLShader;
	fragmentShader: WebGLShader;
	
	uniforms: any;
	
	attributes: any;

	getUniforms(): WebGLUniforms;
	getAttributes(): any;
	destroy(): void;

}
