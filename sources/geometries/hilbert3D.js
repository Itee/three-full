//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from '../math/Vector3.js'
function hilbert3D( center, size, iterations, v0, v1, v2, v3, v4, v5, v6, v7 ) {

	// Default Vars
	var center = center !== undefined ? center : new Vector3( 0, 0, 0 ),
		size = size !== undefined ? size : 10,
		half = size / 2,
		iterations = iterations !== undefined ? iterations : 1,
		v0 = v0 !== undefined ? v0 : 0,
		v1 = v1 !== undefined ? v1 : 1,
		v2 = v2 !== undefined ? v2 : 2,
		v3 = v3 !== undefined ? v3 : 3,
		v4 = v4 !== undefined ? v4 : 4,
		v5 = v5 !== undefined ? v5 : 5,
		v6 = v6 !== undefined ? v6 : 6,
		v7 = v7 !== undefined ? v7 : 7
	;

	var vec_s = [
		new Vector3( center.x - half, center.y + half, center.z - half ),
		new Vector3( center.x - half, center.y + half, center.z + half ),
		new Vector3( center.x - half, center.y - half, center.z + half ),
		new Vector3( center.x - half, center.y - half, center.z - half ),
		new Vector3( center.x + half, center.y - half, center.z - half ),
		new Vector3( center.x + half, center.y - half, center.z + half ),
		new Vector3( center.x + half, center.y + half, center.z + half ),
		new Vector3( center.x + half, center.y + half, center.z - half )
	];

	var vec = [
		vec_s[ v0 ],
		vec_s[ v1 ],
		vec_s[ v2 ],
		vec_s[ v3 ],
		vec_s[ v4 ],
		vec_s[ v5 ],
		vec_s[ v6 ],
		vec_s[ v7 ]
	];

	// Recurse iterations
	if ( -- iterations >= 0 ) {

		var tmp = [];

		Array.prototype.push.apply( tmp, hilbert3D( vec[ 0 ], half, iterations, v0, v3, v4, v7, v6, v5, v2, v1 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 1 ], half, iterations, v0, v7, v6, v1, v2, v5, v4, v3 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 2 ], half, iterations, v0, v7, v6, v1, v2, v5, v4, v3 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 3 ], half, iterations, v2, v3, v0, v1, v6, v7, v4, v5 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 4 ], half, iterations, v2, v3, v0, v1, v6, v7, v4, v5 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 5 ], half, iterations, v4, v3, v2, v5, v6, v1, v0, v7 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 6 ], half, iterations, v4, v3, v2, v5, v6, v1, v0, v7 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 7 ], half, iterations, v6, v5, v2, v1, v0, v3, v4, v7 ) );

		// Return recursive call
		return tmp;

	}

	// Return complete Hilbert Curve.
	return vec;

}

export { hilbert3D }
