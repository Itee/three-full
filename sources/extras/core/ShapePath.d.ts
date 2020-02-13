//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector2 } from './../../math/Vector2';
import { Shape } from './Shape';

export class ShapePath {

	constructor();

	subPaths: any[];
	currentPath: any;

	moveTo( x: number, y: number ): this;
	lineTo( x: number, y: number ): this;
	quadraticCurveTo( aCPx: number, aCPy: number, aX: number, aY: number ): this;
	bezierCurveTo(
		aCP1x: number,
		aCP1y: number,
		aCP2x: number,
		aCP2y: number,
		aX: number,
		aY: number
	): this;
	splineThru( pts: Vector2[] ): this;
	toShapes( isCCW: boolean, noHoles?: boolean ): Shape[];

}
