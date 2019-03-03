//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from './../core/Geometry';
import { Material } from './../materials/Material';
import { Loader } from './Loader';

export class JSONLoader extends Loader {
  constructor(manager?: LoadingManager);

  manager: LoadingManager;
  withCredentials: boolean;

  load(
    url: string,
    onLoad?: (geometry: Geometry, materials: Material[]) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): void;
  setTexturePath(value: string): void;
  parse(
    json: any,
    texturePath?: string
  ): { geometry: Geometry; materials?: Material[] };
}

export const DefaultLoadingManager: LoadingManager;
export class LoadingManager {
  constructor(
    onLoad?: () => void,
    onProgress?: (url: string, loaded: number, total: number) => void,
    onError?: (url: string) => void
  );

  onStart?: (url: string, loaded: number, total: number) => void;
  onLoad: () => void;
  onProgress: (item: any, loaded: number, total: number) => void;
  onError: (url: string) => void;
  setURLModifier(callback?: (url: string) => string): void;
  resolveURL(url: string): string;

  itemStart(url: string): void;
  itemEnd(url: string): void;
  itemError(url: string): void;
}
