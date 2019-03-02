//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager';
export class ImageLoader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;
  crossOrigin: string;
  withCredentials: string;
  path: string;
  load(
    url: string,
    onLoad?: (image: HTMLImageElement) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): HTMLImageElement;
  setCrossOrigin(crossOrigin: string): ImageLoader;
  setWithCredentials(value: string): ImageLoader;
  setPath(value: string): ImageLoader;
}
