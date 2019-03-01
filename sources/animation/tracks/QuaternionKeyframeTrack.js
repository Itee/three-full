//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { InterpolateLinear } from '../../constants.js'
import { KeyframeTrack } from '../KeyframeTrack.js'
import { QuaternionLinearInterpolant } from '../../math/interpolants/QuaternionLinearInterpolant.js'
function QuaternionKeyframeTrack( name, times, values, interpolation ) {

	KeyframeTrack.call( this, name, times, values, interpolation );

}

QuaternionKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

	constructor: QuaternionKeyframeTrack,

	ValueTypeName: 'quaternion',

	// ValueBufferType is inherited

	DefaultInterpolation: InterpolateLinear,

	InterpolantFactoryMethodLinear: function ( result ) {

		return new QuaternionLinearInterpolant( this.times, this.values, this.getValueSize(), result );

	},

	InterpolantFactoryMethodSmooth: undefined // not yet implemented

} );

export { QuaternionKeyframeTrack }
