import { Mirror } from './Mirror.js'
var MirrorRTT = function ( width, height, options ) {

	Mirror.call( this, width, height, options );

	this.geometry.setDrawRange( 0, 0 ); // avoid rendering geometry

};

MirrorRTT.prototype = Object.create( Mirror.prototype );

export { MirrorRTT }
