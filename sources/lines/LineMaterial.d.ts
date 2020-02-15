//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Color,
	MaterialParameters,
	ShaderMaterial,
	Vector2
} from '../../../src/Three';

export interface LineMaterialParameters extends MaterialParameters {
	color?: number;
	dashed?: boolean;
	dashScale?: number;
	dashSize?: number;
	gapSize?: number;
	linewidth?: number;
	resolution?: Vector2;
}

export class LineMaterial extends ShaderMaterial {

	constructor( parameters?: LineMaterialParameters );
	color: Color;
	dashed: boolean;
	dashScale: number;
	dashSize: number;
	gapSize: number;
	readonly isLineMaterial: true;
	linewidth: number;
	resolution: Vector2;

}
