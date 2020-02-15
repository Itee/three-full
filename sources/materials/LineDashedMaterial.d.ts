//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { MaterialParameters } from './Material';
import { LineBasicMaterial } from './LineBasicMaterial';

export interface LineDashedMaterialParameters extends MaterialParameters {
	color?: Color | string | number;
	linewidth?: number;
	scale?: number;
	dashSize?: number;
	gapSize?: number;
}

export class LineDashedMaterial extends LineBasicMaterial {

	constructor( parameters?: LineDashedMaterialParameters );

	scale: number;
	dashSize: number;
	gapSize: number;
	readonly isLineDashedMaterial: true;

	setValues( parameters: LineDashedMaterialParameters ): void;

}
