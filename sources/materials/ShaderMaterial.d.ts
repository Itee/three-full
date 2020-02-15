//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { IUniform } from '../renderers/shaders/UniformsLib';
import { MaterialParameters, Material } from './Material';
export interface ShaderMaterialParameters extends MaterialParameters {
	uniforms?: any;
	vertexShader?: string;
	fragmentShader?: string;
	linewidth?: number;
	wireframe?: boolean;
	wireframeLinewidth?: number;
	lights?: boolean;
	clipping?: boolean;
	skinning?: boolean;
	morphTargets?: boolean;
	morphNormals?: boolean;
	extensions?: {
		derivatives?: boolean;
		fragDepth?: boolean;
		drawBuffers?: boolean;
		shaderTextureLOD?: boolean;
	};
}

export class ShaderMaterial extends Material {

	constructor( parameters?: ShaderMaterialParameters );

	uniforms: { [uniform: string]: IUniform };
	vertexShader: string;
	fragmentShader: string;
	linewidth: number;
	wireframe: boolean;
	wireframeLinewidth: number;
	lights: boolean;
	clipping: boolean;
	skinning: boolean;
	morphTargets: boolean;
	morphNormals: boolean;
	
	derivatives: any;
	extensions: {
		derivatives: boolean;
		fragDepth: boolean;
		drawBuffers: boolean;
		shaderTextureLOD: boolean;
	};
	defaultAttributeValues: any;
	index0AttributeName: string | undefined;
	uniformsNeedUpdate: boolean;

	setValues( parameters: ShaderMaterialParameters ): void;
	toJSON( meta: any ): any;

}
