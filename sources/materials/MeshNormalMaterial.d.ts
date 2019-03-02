//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { MaterialParameters, Material } from './Material';

export interface MeshNormalMaterialParameters extends MaterialParameters {
  
  wireframe?: boolean;
  
  wireframeLinewidth?: number;
  morphTargets?: boolean;
}

export class MeshNormalMaterial extends Material {
  constructor(parameters?: MeshNormalMaterialParameters);

  wireframe: boolean;
  wireframeLinewidth: number;
  morphTargets: boolean;

  setValues(parameters: MeshNormalMaterialParameters): void;
}
