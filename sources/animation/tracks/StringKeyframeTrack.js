//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { InterpolateDiscrete } from '../../constants.js'
import { KeyframeTrack } from '../KeyframeTrack.js'
function StringKeyframeTrack( name, times, values, interpolation ) {

	KeyframeTrack.call( this, name, times, values, interpolation );

}

StringKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

	constructor: StringKeyframeTrack,

	ValueTypeName: 'string',
	ValueBufferType: Array,

	DefaultInterpolation: InterpolateDiscrete,

	InterpolantFactoryMethodLinear: undefined,

	InterpolantFactoryMethodSmooth: undefined

} );

export { StringKeyframeTrack }
