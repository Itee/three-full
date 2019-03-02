//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLRenderer } from './../WebGLRenderer';
import { WebGLProgram } from './WebGLProgram';
import { ShaderMaterial } from './../../materials/ShaderMaterial';

export class WebGLPrograms {
  constructor(renderer: WebGLRenderer, capabilities: any);

  programs: WebGLProgram[];

  getParameters(
    material: ShaderMaterial,
    lights: any,
    fog: any,
    nClipPlanes: number,
    object: any
  ): any;
  getProgramCode(material: ShaderMaterial, parameters: any): string;
  acquireProgram(
    material: ShaderMaterial,
    parameters: any,
    code: string
  ): WebGLProgram;
  releaseProgram(program: WebGLProgram): void;
}
