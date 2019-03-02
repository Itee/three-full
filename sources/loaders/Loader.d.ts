//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Material } from './../materials/Material';
import { LoaderHandler } from './FileLoader';

// Loaders //////////////////////////////////////////////////////////////////////////////////
export class Loader {
  constructor();
  onLoadStart: () => void;
  onLoadProgress: () => void;
  onLoadComplete: () => void;
  crossOrigin: string;
  extractUrlBase(url: string): string;
  initMaterials(materials: Material[], texturePath: string): Material[];
  createMaterial(
    m: Material,
    texturePath: string,
    crossOrigin?: string
  ): boolean;

  static Handlers: LoaderHandler;
}
