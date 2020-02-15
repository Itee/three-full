//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Curve,
	Vector2,
	Vector3,
	Vector4
} from '../../../src/Three';

export class NURBSCurve extends Curve<Vector3> {

	constructor( degree: number, knots: number[], controlPoints: Vector2[] | Vector3[] | Vector4[], startKnot: number, endKnot: number );

}
