//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { DepthPackingStrategies } from '../constants';
import { MaterialParameters, Material } from './Material';
import { Texture } from './../textures/Texture';

export interface MeshDepthMaterialParameters extends MaterialParameters {
	map?: Texture | null;
	alphaMap?: Texture | null;
	depthPacking?: DepthPackingStrategies;
	displacementMap?: Texture | null;
	displacementScale?: number;
	displacementBias?: number;
	wireframe?: boolean;
	wireframeLinewidth?: number;
}

export class MeshDepthMaterial extends Material {

	constructor( parameters?: MeshDepthMaterialParameters );

	map: Texture | null;
	alphaMap: Texture | null;
	depthPacking: DepthPackingStrategies;
	displacementMap: Texture | null;
	displacementScale: number;
	displacementBias: number;
	wireframe: boolean;
	wireframeLinewidth: number;

	setValues( parameters: MeshDepthMaterialParameters ): void;

}
