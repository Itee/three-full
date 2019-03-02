//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { Texture } from './../textures/Texture';
import { MaterialParameters, Material } from './Material';

export interface SpriteMaterialParameters extends MaterialParameters {
  color?: Color | string | number;
  map?: Texture;
  rotation?: number;
}

export class SpriteMaterial extends Material {
  constructor(parameters?: SpriteMaterialParameters);

  color: Color;
  map: Texture | null;
  rotation: number;
  isSpriteMaterial: true;

  setValues(parameters: SpriteMaterialParameters): void;
  copy(source: SpriteMaterial): this;
}
