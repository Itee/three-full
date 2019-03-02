//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager';
import { CompressedTexture } from './../textures/CompressedTexture';
export class CompressedTextureLoader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;
  path: string;

  load(
    url: string,
    onLoad: (texture: CompressedTexture) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): void;
  setPath(path: string): CompressedTextureLoader;
}
