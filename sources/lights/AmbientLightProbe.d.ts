//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { LightProbe } from './LightProbe';

export class AmbientLightProbe extends LightProbe {

	constructor( color?: Color | string | number, intensity?: number );

	isAmbientLightProbe: true;

}