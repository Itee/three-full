//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { MaterialParameters, Material } from './Material';

export interface ShadowMaterialParameters extends MaterialParameters {
	color?: Color | string | number;
}

export class ShadowMaterial extends Material {

	constructor( parameters?: ShadowMaterialParameters );

	color: Color;

}
