//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { RectAreaLight } from './../lights/RectAreaLight';
import { Color } from './../math/Color';
import { Line } from '../objects/Line';

export class RectAreaLightHelper extends Line {

	constructor( light: RectAreaLight, color?: Color | string | number );

	light: RectAreaLight;
	color: Color | string | number | undefined;

	update(): void;
	dispose(): void;

}
