//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ShaderMaterialParameters } from './ShaderMaterial';
import { IUniform } from '../renderers/shaders/UniformsLib';
import { MaterialParameters, Material } from './Material';
export interface ShaderMaterialParameters extends MaterialParameters {
  defines?: any;
  uniforms?: any;
  vertexShader?: string;
  fragmentShader?: string;
  lineWidth?: number;
  wireframe?: boolean;
  wireframeLinewidth?: number;
  lights?: boolean;
  clipping?: boolean;
  skinning?: boolean;
  morphTargets?: boolean;
  morphNormals?: boolean;
}

export class ShaderMaterial extends Material {
  constructor(parameters?: ShaderMaterialParameters);

  defines: any;
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

  setValues(parameters: ShaderMaterialParameters): void;
  toJSON(meta: any): any;
}
