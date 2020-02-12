//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { MaterialParameters, Material } from './Material';
import { Vector3 } from './../math/Vector3';
import { Texture } from './../textures/Texture';

export interface MeshDistanceMaterialParameters extends MaterialParameters {
	referencePosition?: Vector3;
	nearDistance?: number;
	farDistance?: number;
	displacementMap?: Texture;
	displacementScale?: number;
	displacementBias?: number;
}

export class MeshDistanceMaterial extends Material {

	constructor( parameters?: MeshDistanceMaterialParameters );

	referencePosition: Vector3;
	nearDistance: number;
	farDistance: number;
	displacementMap: Texture | null;
	displacementScale: number;
	displacementBias: number;

	setValues( parameters: MeshDistanceMaterialParameters ): void;

}
