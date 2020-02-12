//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Texture } from './../textures/Texture';
import { MeshPhongMaterialParameters, MeshPhongMaterial } from './MeshPhongMaterial';

export interface MeshToonMaterialParameters extends MeshPhongMaterialParameters {
	gradientMap?: Texture;
}

export class MeshToonMaterial extends MeshPhongMaterial {

	constructor( parameters?: MeshToonMaterialParameters );

	gradientMap: Texture | null;

	setValues( parameters: MeshToonMaterialParameters ): void;

}
