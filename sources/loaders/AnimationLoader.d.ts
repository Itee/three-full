//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager';

export class AnimationLoader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;

  load(
    url: string,
    onLoad?: (response: string | ArrayBuffer) => void,
    onProgress?: (request: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): any;
  parse(json: any, onLoad: (response: string | ArrayBuffer) => void): void;
  setPath(path: string): AnimationLoader;
}
