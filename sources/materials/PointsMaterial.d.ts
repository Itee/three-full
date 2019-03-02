//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Material, MaterialParameters } from './Material';
import { Color } from './../math/Color';
import { Texture } from './../textures/Texture';

// MultiMaterial does not inherit the Material class in the original code. However, it should treat as Material class.
// See tests/canvas/canvas_materials.ts.

export class MultiMaterial extends Material {
  constructor(materials?: Material[]);

  isMultiMaterial: true;

  materials: Material[];

  toJSON(meta: any): any;
}
export interface PointsMaterialParameters extends MaterialParameters {
  color?: Color | string | number;
  map?: Texture;
  size?: number;
  sizeAttenuation?: boolean;
}

export class PointsMaterial extends Material {
  constructor(parameters?: PointsMaterialParameters);

  color: Color;
  map: Texture | null;
  size: number;
  sizeAttenuation: boolean;

  setValues(parameters: PointsMaterialParameters): void;
}
