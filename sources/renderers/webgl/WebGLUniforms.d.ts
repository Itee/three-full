//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLProgram } from './WebGLProgram';
import { WebGLTextures } from './WebGLTextures';

export class WebGLUniforms {

	constructor( gl: WebGLRenderingContext, program: WebGLProgram );

	setValue( gl: WebGLRenderingContext, name: string, value: any, textures: WebGLTextures ): void;
	setOptional( gl: WebGLRenderingContext, object: any, name: string ): void;

	static upload( gl: WebGLRenderingContext, seq: any, values: any[], textures: WebGLTextures ): void;
	static seqWithValue( seq: any, values: any[] ): any[];

}
