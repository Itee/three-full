//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { LightProbe } from './LightProbe';

export class HemisphereLightProbe extends LightProbe {

	constructor( skyColor?: Color | string | number, groundColor?: Color | string | number, intensity?: number );

	readonly isHemisphereLightProbe: true;

}
