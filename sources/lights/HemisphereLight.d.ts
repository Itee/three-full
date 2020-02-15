//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { Light } from './Light';

export class HemisphereLight extends Light {

	constructor(
		skyColor?: Color | string | number,
		groundColor?: Color | string | number,
		intensity?: number
	);

	skyColor: Color;
	groundColor: Color;
	intensity: number;
	readonly isHemisphereLight: true;

}
