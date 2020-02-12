//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { Light } from './Light';
import { PerspectiveCamera } from './../cameras/PerspectiveCamera';
import { LightShadow } from './LightShadow';

export class PointLightShadow extends LightShadow {

	camera: PerspectiveCamera;

}
export class PointLight extends Light {

	constructor(
		color?: Color | string | number,
		intensity?: number,
		distance?: number,
		decay?: number
	);
	intensity: number;
	distance: number;

	decay: number;
	shadow: PointLightShadow;
	power: number;

}
