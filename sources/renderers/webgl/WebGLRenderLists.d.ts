//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../../core/Object3D';
import { Geometry } from './../../core/Geometry';
import { Material } from './../../materials/Material';
import { WebGLProgram } from './WebGLProgram';
import { Group } from './../../objects/Group';
import { Scene } from './../../scenes/Scene';
import { Camera } from './../../cameras/Camera';
import { BufferGeometry } from '../../core/BufferGeometry';

export interface RenderTarget {} 

export interface RenderItem {
  id: number;
  object: Object3D;
  geometry: Geometry | BufferGeometry;
  material: Material;
  program: WebGLProgram;
  renderOrder: number;
  z: number;
  group: Group;
}

export class WebGLRenderList {
  opaque: Array<RenderItem>;
  transparent: Array<any>;
  init(): void;
  push(
    object: Object3D,
    geometry: Geometry | BufferGeometry,
    material: Material,
    z: number,
    group: Group
  ): void;

  sort(): void;
}

export class WebGLRenderLists {
  dispose(): void;
  
  get(scene: Scene, camera: Camera): WebGLRenderList;
}
