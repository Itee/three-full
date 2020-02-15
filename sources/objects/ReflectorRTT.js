//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Reflector } from './Reflector.js'

/**
 * RTT version
 */
var ReflectorRTT = function ( geometry, options ) {

	Reflector.call( this, geometry, options );

	this.geometry.setDrawRange( 0, 0 ); // avoid rendering geometry

};

ReflectorRTT.prototype = Object.create( Reflector.prototype );

export { ReflectorRTT }
