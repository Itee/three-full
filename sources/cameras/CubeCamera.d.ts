//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLRenderTargetCube } from './../renderers/WebGLRenderTargetCube';
import { Scene } from './../scenes/Scene';
import { WebGLRenderer } from './../renderers/WebGLRenderer';
import { Object3D } from './../core/Object3D';

export class CubeCamera extends Object3D {
  constructor(near?: number, far?: number, cubeResolution?: number);

  type: 'CubeCamera';

  renderTarget: WebGLRenderTargetCube;
  //updateCubeMap(renderer: Renderer, scene: Scene): void;

  update(renderer: WebGLRenderer, scene: Scene): void;
}
