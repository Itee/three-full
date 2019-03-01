//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { EllipseCurve } from './EllipseCurve.js'
function ArcCurve( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise ) {

	EllipseCurve.call( this, aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise );

	this.type = 'ArcCurve';

}

ArcCurve.prototype = Object.create( EllipseCurve.prototype );
ArcCurve.prototype.constructor = ArcCurve;

ArcCurve.prototype.isArcCurve = true;

export { ArcCurve }
