//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLRenderer, WebGLRendererParameters } from './../WebGLRenderer';
import { ShaderMaterial } from './../../materials/ShaderMaterial';
import { WebGLShader } from './WebGLShader';
import { WebGLUniforms } from './WebGLUniforms';

export class WebGLProgram {
  constructor(
    renderer: WebGLRenderer,
    code: string,
    material: ShaderMaterial,
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
