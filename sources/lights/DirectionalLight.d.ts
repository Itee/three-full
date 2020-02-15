//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { Object3D } from './../core/Object3D';
import { DirectionalLightShadow } from './DirectionalLightShadow';
import { Light } from './Light';
export class DirectionalLight extends Light {

	constructor( color?: Color | string | number, intensity?: number );
	target: Object3D;
	intensity: number;

	shadow: DirectionalLightShadow;
	readonly isDirectionalLight: true;

}
