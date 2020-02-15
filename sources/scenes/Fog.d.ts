//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';

export interface IFog {
	name: string;
	color: Color;
	clone(): this;
	toJSON(): any;
}
export class Fog implements IFog {

	constructor( hex: number, near?: number, far?: number );

	name: string;
	color: Color;
	near: number;
	far: number;

	readonly isFog: true;

	clone(): this;
	toJSON(): any;

}
