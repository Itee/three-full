//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { Object3D } from './../core/Object3D';
import { SpotLightShadow } from './SpotLightShadow';
import { Light } from './Light';
export class SpotLight extends Light {

	constructor(
		color?: Color | string | number,
		intensity?: number,
		distance?: number,
		angle?: number,
		exponent?: number,
		decay?: number
	);
	target: Object3D;
	intensity: number;
	distance: number;
	angle: number;
	exponent: number;

	decay: number;
	shadow: SpotLightShadow;
	power: number;
	penumbra: number;
	readonly isSpotLight: true;

}
