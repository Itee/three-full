var Three = (function (exports) {
	'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Vector2( x, y ) {

		this.x = x || 0;
		this.y = y || 0;

	}

	Object.defineProperties( Vector2.prototype, {

		"width": {

			get: function () {

				return this.x;

			},

			set: function ( value ) {

				this.x = value;

			}

		},

		"height": {

			get: function () {

				return this.y;

			},

			set: function ( value ) {

				this.y = value;

			}

		}

	} );

	Object.assign( Vector2.prototype, {

		isVector2: true,

		set: function ( x, y ) {

			this.x = x;
			this.y = y;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;

			return this;

		},

		setX: function ( x ) {

			this.x = x;

			return this;

		},

		setY: function ( y ) {

			this.y = y;

			return this;

		},

		setComponent: function ( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		},

		getComponent: function ( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				default: throw new Error( 'index is out of range: ' + index );

			}

		},

		clone: function () {

			return new this.constructor( this.x, this.y );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;

		},

		multiply: function ( v ) {

			this.x *= v.x;
			this.y *= v.y;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;

			return this;

		},

		divide: function ( v ) {

			this.x /= v.x;
			this.y /= v.y;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		applyMatrix3: function ( m ) {

			var x = this.x, y = this.y;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

			return this;

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );

			return this;

		},

		clampScalar: function () {

			var min = new Vector2();
			var max = new Vector2();

			return function clampScalar( minVal, maxVal ) {

				min.set( minVal, minVal );
				max.set( maxVal, maxVal );

				return this.clamp( min, max );

			};

		}(),

		clampLength: function ( min, max ) {

			var length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		},

		floor: function () {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y;

		},

		cross: function ( v ) {

			return this.x * v.y - this.y * v.x;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y );

		},

		normalize: function () {

			return this.divideScalar( this.length() || 1 );

		},

		angle: function () {

			// computes the angle in radians with respect to the positive x-axis

			var angle = Math.atan2( this.y, this.x );

			if ( angle < 0 ) angle += 2 * Math.PI;

			return angle;

		},

		distanceTo: function ( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		},

		distanceToSquared: function ( v ) {

			var dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;

		},

		manhattanDistanceTo: function ( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

		},

		setLength: function ( length ) {

			return this.normalize().multiplyScalar( length );

		},

		lerp: function ( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;

			return array;

		},

		fromBufferAttribute: function ( attribute, index, offset ) {

			if ( offset !== undefined ) {

				console.warn( 'Vector2: offset has been removed from .fromBufferAttribute().' );

			}

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );

			return this;

		},

		rotateAround: function ( center, angle ) {

			var c = Math.cos( angle ), s = Math.sin( angle );

			var x = this.x - center.x;
			var y = this.y - center.y;

			this.x = x * c - y * s + center.x;
			this.y = x * s + y * c + center.y;

			return this;

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var UVsDebug = function ( geometry, size ) {

		// handles wrapping of uv.x > 1 only

		var abc = 'abc';
		var a = new Vector2();
		var b = new Vector2();

		var uvs = [
			new Vector2(),
			new Vector2(),
			new Vector2()
		];

		var face = [];

		var canvas = document.createElement( 'canvas' );
		var width = size || 1024; // power of 2 required for wrapping
		var height = size || 1024;
		canvas.width = width;
		canvas.height = height;

		var ctx = canvas.getContext( '2d' );
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba( 0, 0, 0, 1.0 )';
		ctx.textAlign = 'center';

		// paint background white

		ctx.fillStyle = 'rgba( 255, 255, 255, 1.0 )';
		ctx.fillRect( 0, 0, width, height );

		if ( geometry.isGeometry ) {

			var faces = geometry.faces;
			var uvSet = geometry.faceVertexUvs[ 0 ];

			for ( var i = 0, il = uvSet.length; i < il; i ++ ) {

				var face = faces[ i ];
				var uv = uvSet[ i ];

				face[ 0 ] = face.a;
				face[ 1 ] = face.b;
				face[ 2 ] = face.c;

				uvs[ 0 ].copy( uv[ 0 ] );
				uvs[ 1 ].copy( uv[ 1 ] );
				uvs[ 2 ].copy( uv[ 2 ] );

				processFace( face, uvs, i );

			}

		} else {

			var index = geometry.index;
			var uvAttribute = geometry.attributes.uv;

			if ( index ) {

				// indexed geometry

				for ( var i = 0, il = index.count; i < il; i += 3 ) {

					face[ 0 ] = index.getX( i );
					face[ 1 ] = index.getX( i + 1 );
					face[ 2 ] = index.getX( i + 2 );

					uvs[ 0 ].fromBufferAttribute( uvAttribute, face[ 0 ] );
					uvs[ 1 ].fromBufferAttribute( uvAttribute, face[ 1 ] );
					uvs[ 2 ].fromBufferAttribute( uvAttribute, face[ 2 ] );

					processFace( face, uvs, i );

				}

			} else {

				// non-indexed geometry

				for ( var i = 0, il = uvAttribute.count; i < il; i += 3 ) {

					face[ 0 ] = i;
					face[ 1 ] = i + 1;
					face[ 2 ] = i + 2;

					uvs[ 0 ].fromBufferAttribute( uvAttribute, face[ 0 ] );
					uvs[ 1 ].fromBufferAttribute( uvAttribute, face[ 1 ] );
					uvs[ 2 ].fromBufferAttribute( uvAttribute, face[ 2 ] );

					processFace( face, uvs, i );

				}

			}

		}

		return canvas;

		function processFace( face, uvs, index ) {

			// draw contour of face

			ctx.beginPath();

			a.set( 0, 0 );

			for ( var j = 0, jl = uvs.length; j < jl; j ++ ) {

				var uv = uvs[ j ];

				a.x += uv.x;
				a.y += uv.y;

				if ( j === 0 ) {

					ctx.moveTo( uv.x * width, ( 1 - uv.y ) * height );

				} else {

					ctx.lineTo( uv.x * width, ( 1 - uv.y ) * height );

				}

			}

			ctx.closePath();
			ctx.stroke();

			// calculate center of face

			a.divideScalar( uvs.length );

			// label the face number

			ctx.font = '12pt Arial bold';
			ctx.fillStyle = 'rgba( 0, 0, 0, 1.0 )';
			ctx.fillText( index, a.x * width, ( 1 - a.y ) * height );

			if ( a.x > 0.95 ) {

				// wrap x // 0.95 is arbitrary

				ctx.fillText( index, ( a.x % 1 ) * width, ( 1 - a.y ) * height );

			}

			//

			ctx.font = '8pt Arial bold';
			ctx.fillStyle = 'rgba( 0, 0, 0, 1.0 )';

			// label uv edge orders

			for ( j = 0, jl = uvs.length; j < jl; j ++ ) {

				var uv = uvs[ j ];
				b.addVectors( a, uv ).divideScalar( 2 );

				var vnum = face[ j ];
				ctx.fillText( abc[ j ] + vnum, b.x * width, ( 1 - b.y ) * height );

				if ( b.x > 0.95 ) {

					// wrap x

					ctx.fillText( abc[ j ] + vnum, ( b.x % 1 ) * width, ( 1 - b.y ) * height );

				}

			}

		}

	};

	exports.UVsDebug = UVsDebug;

	return exports;

}({}));
