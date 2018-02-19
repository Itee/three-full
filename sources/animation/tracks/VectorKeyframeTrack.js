import { KeyframeTrack } from '../KeyframeTrack.js'





function VectorKeyframeTrack( name, times, values, interpolation ) {

	KeyframeTrack.call( this, name, times, values, interpolation );

}

VectorKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

	constructor: VectorKeyframeTrack,

	ValueTypeName: 'vector'

	// ValueBufferType is inherited

	// DefaultInterpolation is inherited

} );

;

export { VectorKeyframeTrack }
