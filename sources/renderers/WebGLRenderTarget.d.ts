//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector4 } from './../math/Vector4';
import { Texture } from './../textures/Texture';
import { EventDispatcher } from './../core/EventDispatcher';
import { Wrapping, TextureFilter, TextureDataType } from '../constants';

export interface WebGLRenderTargetOptions {
  wrapS?: Wrapping;
  wrapT?: Wrapping;
  magFilter?: TextureFilter;
  minFilter?: TextureFilter;
  format?: number; // RGBAFormat;
  type?: TextureDataType; // UnsignedByteType;
  anisotropy?: number; // 1;
  depthBuffer?: boolean; // true;
  stencilBuffer?: boolean; // true;
  generateMipmaps?: boolean; // true;
}

export class WebGLRenderTarget extends EventDispatcher {
  constructor(
    width: number,
    height: number,
    options?: WebGLRenderTargetOptions
  );

  uuid: string;
  width: number;
  height: number;
  scissor: Vector4;
  scissorTest: boolean;
  viewport: Vector4;
  texture: Texture;
  depthBuffer: boolean;
  stencilBuffer: boolean;
  depthTexture: Texture;
  
  wrapS: any;
  
  wrapT: any;
  
  magFilter: any;
  
  minFilter: any;
  
  anisotropy: any;
  
  offset: any;
  
  repeat: any;
  
  format: any;
  
  type: any;
  
  generateMipmaps: any;

  setSize(width: number, height: number): void;
  clone(): this;
  copy(source: WebGLRenderTarget): this;
  dispose(): void;
}
