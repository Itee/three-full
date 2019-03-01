//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from '../math/Vector3.js'
function hilbert2D( center, size, iterations, v0, v1, v2, v3 ) {

	// Default Vars
	var center = center !== undefined ? center : new Vector3( 0, 0, 0 ),
		size = size !== undefined ? size : 10,
		half = size / 2,
		iterations = iterations !== undefined ? iterations : 1,
		v0 = v0 !== undefined ? v0 : 0,
		v1 = v1 !== undefined ? v1 : 1,
		v2 = v2 !== undefined ? v2 : 2,
		v3 = v3 !== undefined ? v3 : 3
	;

	var vec_s = [
		new Vector3( center.x - half, center.y, center.z - half ),
		new Vector3( center.x - half, center.y, center.z + half ),
		new Vector3( center.x + half, center.y, center.z + half ),
		new Vector3( center.x + half, center.y, center.z - half )
	];

	var vec = [
		vec_s[ v0 ],
		vec_s[ v1 ],
		vec_s[ v2 ],
		vec_s[ v3 ]
	];

	// Recurse iterations
	if ( 0 <= -- iterations ) {

		var tmp = [];

		Array.prototype.push.apply( tmp, hilbert2D( vec[ 0 ], half, iterations, v0, v3, v2, v1 ) );
		Array.prototype.push.apply( tmp, hilbert2D( vec[ 1 ], half, iterations, v0, v1, v2, v3 ) );
		Array.prototype.push.apply( tmp, hilbert2D( vec[ 2 ], half, iterations, v0, v1, v2, v3 ) );
		Array.prototype.push.apply( tmp, hilbert2D( vec[ 3 ], half, iterations, v2, v1, v0, v3 ) );

		// Return recursive call
		return tmp;

	}

	// Return complete Hilbert Curve.
	return vec;

}

export { hilbert2D }
