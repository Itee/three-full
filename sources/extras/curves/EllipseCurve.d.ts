//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Curve } from './../core/Curve';
import { Vector2 } from '../../math/Vector2';

export class EllipseCurve extends Curve<Vector2> {

	constructor(
		aX: number,
		aY: number,
		xRadius: number,
		yRadius: number,
		aStartAngle: number,
		aEndAngle: number,
		aClockwise: boolean,
		aRotation: number
	);

	aX: number;
	aY: number;
	xRadius: number;
	yRadius: number;
	aStartAngle: number;
	aEndAngle: number;
	aClockwise: boolean;
	aRotation: number;

}
