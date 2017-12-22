var Three = (function (exports) {
	'use strict';

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */

	var _Math = {

		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,

		generateUUID: function () {

			// http://www.broofa.com/Tools/Math.uuid.htm
			// Replaced .join with string concatenation (@takahirox)

			var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
			var rnd = 0, r;

			return function generateUUID() {

				var uuid = '';

				for ( var i = 0; i < 36; i ++ ) {

					if ( i === 8 || i === 13 || i === 18 || i === 23 ) {

						uuid += '-';

					} else if ( i === 14 ) {

						uuid += '4';

					} else {

						if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
						r = rnd & 0xf;
						rnd = rnd >> 4;
						uuid += chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];

					}

				}

				return uuid;

			};

		}(),

		clamp: function ( value, min, max ) {

			return Math.max( min, Math.min( max, value ) );

		},

		// compute euclidian modulo of m % n
		// https://en.wikipedia.org/wiki/Modulo_operation

		euclideanModulo: function ( n, m ) {

			return ( ( n % m ) + m ) % m;

		},

		// Linear mapping from range <a1, a2> to range <b1, b2>

		mapLinear: function ( x, a1, a2, b1, b2 ) {

			return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

		},

		// https://en.wikipedia.org/wiki/Linear_interpolation

		lerp: function ( x, y, t ) {

			return ( 1 - t ) * x + t * y;

		},

		// http://en.wikipedia.org/wiki/Smoothstep

		smoothstep: function ( x, min, max ) {

			if ( x <= min ) return 0;
			if ( x >= max ) return 1;

			x = ( x - min ) / ( max - min );

			return x * x * ( 3 - 2 * x );

		},

		smootherstep: function ( x, min, max ) {

			if ( x <= min ) return 0;
			if ( x >= max ) return 1;

			x = ( x - min ) / ( max - min );

			return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

		},

		// Random integer from <low, high> interval

		randInt: function ( low, high ) {

			return low + Math.floor( Math.random() * ( high - low + 1 ) );

		},

		// Random float from <low, high> interval

		randFloat: function ( low, high ) {

			return low + Math.random() * ( high - low );

		},

		// Random float from <-range/2, range/2> interval

		randFloatSpread: function ( range ) {

			return range * ( 0.5 - Math.random() );

		},

		degToRad: function ( degrees ) {

			return degrees * _Math.DEG2RAD;

		},

		radToDeg: function ( radians ) {

			return radians * _Math.RAD2DEG;

		},

		isPowerOfTwo: function ( value ) {

			return ( value & ( value - 1 ) ) === 0 && value !== 0;

		},

		ceilPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

		},

		floorPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

		}

	};

	/**
	 * @author bhouston / http://clara.io
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
	 *
	 * The poles (phi) are at the positive and negative y axis.
	 * The equator starts at positive z.
	 */

	function Spherical( radius, phi, theta ) {

		this.radius = ( radius !== undefined ) ? radius : 1.0;
		this.phi = ( phi !== undefined ) ? phi : 0; // up / down towards top and bottom pole
		this.theta = ( theta !== undefined ) ? theta : 0; // around the equator of the sphere

		return this;

	}

	Object.assign( Spherical.prototype, {

		set: function ( radius, phi, theta ) {

			this.radius = radius;
			this.phi = phi;
			this.theta = theta;

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( other ) {

			this.radius = other.radius;
			this.phi = other.phi;
			this.theta = other.theta;

			return this;

		},

		// restrict phi to be betwee EPS and PI-EPS
		makeSafe: function () {

			var EPS = 0.000001;
			this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );

			return this;

		},

		setFromVector3: function ( vec3 ) {

			this.radius = vec3.length();

			if ( this.radius === 0 ) {

				this.theta = 0;
				this.phi = 0;

			} else {

				this.theta = Math.atan2( vec3.x, vec3.z ); // equator angle around y-up axis
				this.phi = Math.acos( _Math.clamp( vec3.y / this.radius, - 1, 1 ) ); // polar angle

			}

			return this;

		}

	} );

	exports.Spherical = Spherical;

	return exports;

}({}));
