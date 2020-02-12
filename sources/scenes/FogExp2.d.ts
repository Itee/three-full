//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { IFog } from './Fog';

export class FogExp2 implements IFog {

	constructor( hex: number | string, density?: number );

	name: string;
	color: Color;
	density: number;

	clone(): this;
	toJSON(): any;

}
