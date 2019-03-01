//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { KeyframeTrack } from '../KeyframeTrack.js'
function ColorKeyframeTrack( name, times, values, interpolation ) {

	KeyframeTrack.call( this, name, times, values, interpolation );

}

ColorKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

	constructor: ColorKeyframeTrack,

	ValueTypeName: 'color'

	// ValueBufferType is inherited

	// DefaultInterpolation is inherited

	// Note: Very basic implementation and nothing special yet.
	// However, this is the place for color space parameterization.

} );

export { ColorKeyframeTrack }
