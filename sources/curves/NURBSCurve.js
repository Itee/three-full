//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Curve } from './Curve.js'
import { Vector4 } from '../math/Vector4.js'
import { Vector3 } from '../math/Vector3.js'
import { NURBSUtils } from './NURBSUtils.js'
var NURBSCurve = function ( degree, knots , controlPoints , startKnot , endKnot  ) {

	Curve.call( this );

	this.degree = degree;
	this.knots = knots;
	this.controlPoints = [];
	// Used by periodic NURBS to remove hidden spans
	this.startKnot = startKnot || 0;
	this.endKnot = endKnot || ( this.knots.length - 1 );
	for ( var i = 0; i < controlPoints.length; ++ i ) {

		// ensure Vector4 for control points
		var point = controlPoints[ i ];
		this.controlPoints[ i ] = new Vector4( point.x, point.y, point.z, point.w );

	}

};
NURBSCurve.prototype = Object.create( Curve.prototype );
NURBSCurve.prototype.constructor = NURBSCurve;
NURBSCurve.prototype.getPoint = function ( t ) {

	var u = this.knots[ this.startKnot ] + t * ( this.knots[ this.endKnot ] - this.knots[ this.startKnot ] ); // linear mapping t->u

	// following results in (wx, wy, wz, w) homogeneous point
	var hpoint = NURBSUtils.calcBSplinePoint( this.degree, this.knots, this.controlPoints, u );

	if ( hpoint.w != 1.0 ) {

		// project to 3D space: (wx, wy, wz, w) -> (x, y, z, 1)
		hpoint.divideScalar( hpoint.w );

	}

	return new Vector3( hpoint.x, hpoint.y, hpoint.z );

};
NURBSCurve.prototype.getTangent = function ( t ) {

	var u = this.knots[ 0 ] + t * ( this.knots[ this.knots.length - 1 ] - this.knots[ 0 ] );
	var ders = NURBSUtils.calcNURBSDerivatives( this.degree, this.knots, this.controlPoints, u, 1 );
	var tangent = ders[ 1 ].clone();
	tangent.normalize();

	return tangent;

};

export { NURBSCurve }
