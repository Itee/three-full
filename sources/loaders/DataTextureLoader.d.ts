//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager';
import { DataTexture } from './../textures/DataTexture';

export class DataTextureLoader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;

  load(
    url: string,
    onLoad: (dataTexture: DataTexture) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): void;
}
