//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { IUniform } from './UniformsLib';

export interface Shader {
	uniforms: { [uniform: string]: IUniform };
	vertexShader: string;
	fragmentShader: string;
}

export let ShaderLib: {
	[name: string]: Shader;
	basic: Shader;
	lambert: Shader;
	phong: Shader;
	standard: Shader;
	matcap: Shader;
	points: Shader;
	dashed: Shader;
	depth: Shader;
	normal: Shader;
	sprite: Shader;
	background: Shader;
	cube: Shader;
	equirect: Shader;
	distanceRGBA: Shader;
	shadow: Shader;
	physical: Shader;
};
