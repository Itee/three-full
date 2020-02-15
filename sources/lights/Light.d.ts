//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { LightShadow } from './LightShadow';
import { Object3D } from './../core/Object3D';
export class Light extends Object3D {

	constructor( hex?: number | string, intensity?: number );

	color: Color;
	intensity: number;
	readonly isLight: true;
	receiveShadow: boolean;
	shadow: LightShadow;
	
	shadowCameraFov: any;
	
	shadowCameraLeft: any;
	
	shadowCameraRight: any;
	
	shadowCameraTop: any;
	
	shadowCameraBottom: any;
	
	shadowCameraNear: any;
	
	shadowCameraFar: any;
	
	shadowBias: any;
	
	shadowMapWidth: any;
	
	shadowMapHeight: any;

}
