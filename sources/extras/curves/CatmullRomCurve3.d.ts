//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './../../math/Vector3';
import { Curve } from './../core/Curve';
export namespace CurveUtils {
	export function tangentQuadraticBezier(
		t: number,
		p0: number,
		p1: number,
		p2: number
	): number;
	export function tangentCubicBezier(
		t: number,
		p0: number,
		p1: number,
		p2: number,
		p3: number
	): number;
	export function tangentSpline(
		t: number,
		p0: number,
		p1: number,
		p2: number,
		p3: number
	): number;
	export function interpolate(
		p0: number,
		p1: number,
		p2: number,
		p3: number,
		t: number
	): number;
}

export class CatmullRomCurve3 extends Curve<Vector3> {

	constructor(
		points?: Vector3[],
		closed?: boolean,
		curveType?: string,
		tension?: number
	);

	points: Vector3[];

	getPoint( t: number ): Vector3;

}
