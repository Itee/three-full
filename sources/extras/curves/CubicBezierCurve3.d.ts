//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './../../math/Vector3';
import { Curve } from './../core/Curve';

export class CubicBezierCurve3 extends Curve<Vector3> {

	constructor( v0: Vector3, v1: Vector3, v2: Vector3, v3: Vector3 );

	v0: Vector3;
	v1: Vector3;
	v2: Vector3;
	v3: Vector3;

	getPoint( t: number ): Vector3;

}
