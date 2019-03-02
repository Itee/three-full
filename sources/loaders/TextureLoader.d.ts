//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager';
import { Texture } from './../textures/Texture';
export class TextureLoader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;
  crossOrigin: string;
  withCredentials: string;
  path: string;
  load(
    url: string,
    onLoad?: (texture: Texture) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): Texture;
  setCrossOrigin(crossOrigin: string): TextureLoader;
  setWithCredentials(value: string): TextureLoader;
  setPath(path: string): TextureLoader;
}
