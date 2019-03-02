//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager';
import { Font } from './../extras/core/Font';

export class FontLoader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;

  load(
    url: string,
    onLoad?: (responseFont: Font) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): void;
  parse(json: any): Font;
}
