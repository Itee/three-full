//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager';
import { CubeTexture } from './../textures/CubeTexture';

export class CubeTextureLoader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;
  crossOrigin: string;
  path?: string;

  load(
    urls: Array<string>,
    onLoad?: (texture: CubeTexture) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): CubeTexture;
  setCrossOrigin(crossOrigin: string): this;
  setPath(path: string): this;
}
