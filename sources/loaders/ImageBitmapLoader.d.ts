//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager.js';

export class ImageBitmapLoader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;

  setOptions(options: any): ImageBitmapLoader;
  load(
    url: string,
    onLoad?: (response: string | ArrayBuffer) => void,
    onProgress?: (request: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): any;
  setCrossOrigin(): ImageBitmapLoader;
  setPath(path: string): ImageBitmapLoader;
}
