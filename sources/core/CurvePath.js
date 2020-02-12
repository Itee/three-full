//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Curve } from '../curves/Curve.js'
import { ArcCurve } from '../curves/ArcCurve.js'
import { CatmullRomCurve3 } from '../curves/CatmullRomCurve3.js'
import { CubicBezierCurve } from '../curves/CubicBezierCurve.js'
import { CubicBezierCurve3 } from '../curves/CubicBezierCurve3.js'
import { EllipseCurve } from '../curves/EllipseCurve.js'
import { LineCurve } from '../curves/LineCurve.js'
import { LineCurve3 } from '../curves/LineCurve3.js'
import { QuadraticBezierCurve } from '../curves/QuadraticBezierCurve.js'
import { QuadraticBezierCurve3 } from '../curves/QuadraticBezierCurve3.js'
import { SplineCurve } from '../curves/SplineCurve.js'
import {
	GrannyKnot,
	HeartCurve,
	VivianiCurve,
	KnotCurve,
	HelixCurve,
	TrefoilKnot,
	TorusKnot,
	CinquefoilKnot,
	TrefoilPolynomialKnot,
	FigureEightPolynomialKnot,
	DecoratedTorusKnot4a,
	DecoratedTorusKnot4b,
	DecoratedTorusKnot5a,
	DecoratedTorusKnot5c
} from '../curves/CurveExtras.js'
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 **/

/**************************************************************
 *	Curved Path - a curve path is simply a array of connected
 *  curves, but retains the api of a curve
 **************************************************************/

var Curves = {
    ArcCurve: ArcCurve,
    CatmullRomCurve3: CatmullRomCurve3,
    CubicBezierCurve: CubicBezierCurve,
    CubicBezierCurve3: CubicBezierCurve3,
    EllipseCurve: EllipseCurve,
    LineCurve: LineCurve,
    LineCurve3: LineCurve3,
    QuadraticBezierCurve: QuadraticBezierCurve,
    QuadraticBezierCurve3: QuadraticBezierCurve3,
    SplineCurve: SplineCurve,
    GrannyKnot: GrannyKnot,
    HeartCurve: HeartCurve,
    VivianiCurve: VivianiCurve,
    KnotCurve: KnotCurve,
    HelixCurve: HelixCurve,
    TrefoilKnot: TrefoilKnot,
    TorusKnot: TorusKnot,
    CinquefoilKnot: CinquefoilKnot,
    TrefoilPolynomialKnot: TrefoilPolynomialKnot,
    FigureEightPolynomialKnot: FigureEightPolynomialKnot,
    DecoratedTorusKnot4a: DecoratedTorusKnot4a,
    DecoratedTorusKnot4b: DecoratedTorusKnot4b,
    DecoratedTorusKnot5a: DecoratedTorusKnot5a,
    DecoratedTorusKnot5c: DecoratedTorusKnot5c
}
function CurvePath() {

	Curve.call( this );

	this.type = 'CurvePath';

	this.curves = [];
	this.autoClose = false; // Automatically closes the path

}

CurvePath.prototype = Object.assign( Object.create( Curve.prototype ), {

	constructor: CurvePath,

	add: function ( curve ) {

		this.curves.push( curve );

	},

	closePath: function () {

		// Add a line curve if start and end of lines are not connected
		var startPoint = this.curves[ 0 ].getPoint( 0 );
		var endPoint = this.curves[ this.curves.length - 1 ].getPoint( 1 );

		if ( ! startPoint.equals( endPoint ) ) {

			this.curves.push( new Curves[ 'LineCurve' ]( endPoint, startPoint ) );

		}

	},

	// To get accurate point with reference to
	// entire path distance at time t,
	// following has to be done:

	// 1. Length of each sub path have to be known
	// 2. Locate and identify type of curve
	// 3. Get t for the curve
	// 4. Return curve.getPointAt(t')

	getPoint: function ( t ) {

		var d = t * this.getLength();
		var curveLengths = this.getCurveLengths();
		var i = 0;

		// To think about boundaries points.

		while ( i < curveLengths.length ) {

			if ( curveLengths[ i ] >= d ) {

				var diff = curveLengths[ i ] - d;
				var curve = this.curves[ i ];

				var segmentLength = curve.getLength();
				var u = segmentLength === 0 ? 0 : 1 - diff / segmentLength;

				return curve.getPointAt( u );

			}

			i ++;

		}

		return null;

		// loop where sum != 0, sum > d , sum+1 <d

	},

	// We cannot use the default Curve getPoint() with getLength() because in
	// Curve, getLength() depends on getPoint() but in CurvePath
	// getPoint() depends on getLength

	getLength: function () {

		var lens = this.getCurveLengths();
		return lens[ lens.length - 1 ];

	},

	// cacheLengths must be recalculated.
	updateArcLengths: function () {

		this.needsUpdate = true;
		this.cacheLengths = null;
		this.getCurveLengths();

	},

	// Compute lengths and cache them
	// We cannot overwrite getLengths() because UtoT mapping uses it.

	getCurveLengths: function () {

		// We use cache values if curves and cache array are same length

		if ( this.cacheLengths && this.cacheLengths.length === this.curves.length ) {

			return this.cacheLengths;

		}

		// Get length of sub-curve
		// Push sums into cached array

		var lengths = [], sums = 0;

		for ( var i = 0, l = this.curves.length; i < l; i ++ ) {

			sums += this.curves[ i ].getLength();
			lengths.push( sums );

		}

		this.cacheLengths = lengths;

		return lengths;

	},

	getSpacedPoints: function ( divisions ) {

		if ( divisions === undefined ) divisions = 40;

		var points = [];

		for ( var i = 0; i <= divisions; i ++ ) {

			points.push( this.getPoint( i / divisions ) );

		}

		if ( this.autoClose ) {

			points.push( points[ 0 ] );

		}

		return points;

	},

	getPoints: function ( divisions ) {

		divisions = divisions || 12;

		var points = [], last;

		for ( var i = 0, curves = this.curves; i < curves.length; i ++ ) {

			var curve = curves[ i ];
			var resolution = ( curve && curve.isEllipseCurve ) ? divisions * 2
				: ( curve && ( curve.isLineCurve || curve.isLineCurve3 ) ) ? 1
					: ( curve && curve.isSplineCurve ) ? divisions * curve.points.length
						: divisions;

			var pts = curve.getPoints( resolution );

			for ( var j = 0; j < pts.length; j ++ ) {

				var point = pts[ j ];

				if ( last && last.equals( point ) ) continue; // ensures no consecutive points are duplicates

				points.push( point );
				last = point;

			}

		}

		if ( this.autoClose && points.length > 1 && ! points[ points.length - 1 ].equals( points[ 0 ] ) ) {

			points.push( points[ 0 ] );

		}

		return points;

	},

	copy: function ( source ) {

		Curve.prototype.copy.call( this, source );

		this.curves = [];

		for ( var i = 0, l = source.curves.length; i < l; i ++ ) {

			var curve = source.curves[ i ];

			this.curves.push( curve.clone() );

		}

		this.autoClose = source.autoClose;

		return this;

	},

	toJSON: function () {

		var data = Curve.prototype.toJSON.call( this );

		data.autoClose = this.autoClose;
		data.curves = [];

		for ( var i = 0, l = this.curves.length; i < l; i ++ ) {

			var curve = this.curves[ i ];
			data.curves.push( curve.toJSON() );

		}

		return data;

	},

	fromJSON: function ( json ) {

		Curve.prototype.fromJSON.call( this, json );

		this.autoClose = json.autoClose;
		this.curves = [];

		for ( var i = 0, l = json.curves.length; i < l; i ++ ) {

			var curve = json.curves[ i ];
			this.curves.push( new Curves[ curve.type ]().fromJSON( curve ) );

		}

		return this;

	}

} );

export { CurvePath }
