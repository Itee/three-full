//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLProgram } from './WebGLProgram';
import { WebGLTextures } from './WebGLTextures';

export class WebGLUniforms {

	constructor( gl: any, program: WebGLProgram );

	setValue( gl: any, name: string, value: any, textures: WebGLTextures ): void;
	setOptional( gl: any, object: any, name: string ): void;

	static upload( gl: any, seq: any, values: any[], textures: WebGLTextures ): void;
	static seqWithValue( seq: any, values: any[] ): any[];
	static splitDynamic( seq: any, values: any[] ): any[];
	static evalDynamic( seq: any, values: any[], object: any, camera: any ): any[];

}
