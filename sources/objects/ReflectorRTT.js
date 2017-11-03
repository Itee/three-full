import { Reflector } from '../objects/Reflector.js'

var ReflectorRTT = function ( width, height, options ) {

	Reflector.call( this, width, height, options );

	this.geometry.setDrawRange( 0, 0 ); // avoid rendering geometry

};

ReflectorRTT.prototype = Object.create( Reflector.prototype );

export { ReflectorRTT }
