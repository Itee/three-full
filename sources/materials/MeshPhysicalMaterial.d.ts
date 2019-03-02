//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  MeshStandardMaterialParameters,
  MeshStandardMaterial,
} from './MeshStandardMaterial';

export interface MeshPhysicalMaterialParameters
  extends MeshStandardMaterialParameters {
  reflectivity?: number;
  clearCoat?: number;
  clearCoatRoughness?: number;
}

export class MeshPhysicalMaterial extends MeshStandardMaterial {
  constructor(parameters: MeshPhysicalMaterialParameters);

  defines: any;
  reflectivity: number;
  clearCoat: number;
  clearCoatRoughness: number;
}
