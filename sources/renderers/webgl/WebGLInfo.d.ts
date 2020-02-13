//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLProgram } from './WebGLProgram';
export class WebGLInfo {

	constructor( gl: WebGLRenderingContext );

	autoReset: boolean;
	memory: {
		geometries: number;
		textures: number;
	};
	programs: WebGLProgram[] | null;
	render: {
		calls: number;
		frame: number;
		lines: number;
		points: number;
		triangles: number;
	};
	update( count: number, mode: GLenum, instanceCount: number ): void;
	reset(): void;

}
