//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './../math/Color';
import { LineSegments } from './../objects/LineSegments';

export class GridHelper extends LineSegments {

	constructor(
		size: number,
		divisions: number,
		color1?: Color | number,
		color2?: Color | number
	);
	
	setColors( color1?: Color | number, color2?: Color | number ): void;

}
