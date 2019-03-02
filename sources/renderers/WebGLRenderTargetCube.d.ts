//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  WebGLRenderTargetOptions,
  WebGLRenderTarget,
} from './WebGLRenderTarget';

export class WebGLRenderTargetCube extends WebGLRenderTarget {
  constructor(
    width: number,
    height: number,
    options?: WebGLRenderTargetOptions
  );

  activeCubeFace: number; // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5
  activeMipMapLevel: number;
}
