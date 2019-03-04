(function (exports) {
	'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var _Math = {

		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,

		generateUUID: ( function () {

			// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

			var lut = [];

			for ( var i = 0; i < 256; i ++ ) {

				lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

			}

			return function generateUUID() {

				var d0 = Math.random() * 0xffffffff | 0;
				var d1 = Math.random() * 0xffffffff | 0;
				var d2 = Math.random() * 0xffffffff | 0;
				var d3 = Math.random() * 0xffffffff | 0;
				var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
					lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
					lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
					lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];

				// .toUpperCase() here flattens concatenated strings to save heap memory space.
				return uuid.toUpperCase();

			};

		} )(),

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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ColorConverter = {

		setHSV: function ( color, h, s, v ) {

			// https://gist.github.com/xpansive/1337890#file-index-js

			h = _Math.euclideanModulo( h, 1 );
			s = _Math.clamp( s, 0, 1 );
			v = _Math.clamp( v, 0, 1 );

			return color.setHSL( h, ( s * v ) / ( ( h = ( 2 - s ) * v ) < 1 ? h : ( 2 - h ) ), h * 0.5 );

		},

		getHSV: function() {

			var hsl = {};

			return function getHSV( color, target ) {

				if ( target === undefined ) {

					console.warn( 'ColorConverter: .getHSV() target is now required' );
					target = { h: 0, s: 0, l: 0 };

				}

				color.getHSL( hsl );

				// based on https://gist.github.com/xpansive/1337890#file-index-js
				hsl.s *= ( hsl.l < 0.5 ) ? hsl.l : ( 1 - hsl.l );

				target.h = hsl.h;
				target.s = 2 * hsl.s / ( hsl.l + hsl.s );
				target.v = hsl.l + hsl.s;

				return target;

			};

		}(),

		// where c, m, y, k is between 0 and 1
		
		setCMYK: function ( color, c, m, y, k ) {

			var r = ( 1 - c ) * ( 1 - k );
			var g = ( 1 - m ) * ( 1 - k );
			var b = ( 1 - y ) * ( 1 - k );

			return color.setRGB( r, g, b );

		},

		getCMYK: function ( color, target ) {

			if ( target === undefined ) {

				console.warn( 'ColorConverter: .getCMYK() target is now required' );
				target = { c: 0, m: 0, y: 0, k:0 };

			}

			var r = color.r;
			var g = color.g;
			var b = color.b;

			var k = 1 - Math.max( r, g, b );
			var c = ( 1 - r - k ) / ( 1 - k );
			var m = ( 1 - g - k ) / ( 1 - k );
			var y = ( 1 - b - k ) / ( 1 - k );

			target.c = c;
			target.m = m;
			target.y = y;
			target.k = k;

			return target;

		}
	};

	exports.ColorConverter = ColorConverter;

}((this.Three = this.Three || {})));
