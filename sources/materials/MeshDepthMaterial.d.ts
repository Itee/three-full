//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { DepthPackingStrategies } from '../constants';
import { MaterialParameters, Material } from './Material';

export interface MeshDepthMaterialParameters extends MaterialParameters {
  wireframe?: boolean;
  wireframeLinewidth?: number;
}

export class MeshDepthMaterial extends Material {
  constructor(parameters?: MeshDepthMaterialParameters);

  wireframe: boolean;
  wireframeLinewidth: number;
  depthPacking: DepthPackingStrategies;

  setValues(parameters: MeshDepthMaterialParameters): void;
}
