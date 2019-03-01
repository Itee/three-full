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
	var SSAOShader = {

		uniforms: {

			"tDiffuse":     { value: null },
			"tDepth":       { value: null },
			"size":         { value: new Vector2( 512, 512 ) },
			"cameraNear":   { value: 1 },
			"cameraFar":    { value: 100 },
			"radius":       { value: 32 },
			"onlyAO":       { value: 0 },
			"aoClamp":      { value: 0.25 },
			"lumInfluence": { value: 0.7 }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = uv;",

				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform float cameraNear;",
			"uniform float cameraFar;",
			"#ifdef USE_LOGDEPTHBUF",
				"uniform float logDepthBufFC;",
			"#endif",

			"uniform float radius;",     // ao radius
			"uniform bool onlyAO;",      // use only ambient occlusion pass?

			"uniform vec2 size;",        // texture width, height
			"uniform float aoClamp;",    // depth clamp - reduces haloing at screen edges

			"uniform float lumInfluence;",  // how much luminance affects occlusion

			"uniform sampler2D tDiffuse;",
			"uniform sampler2D tDepth;",

			"varying vec2 vUv;",

			// "#define PI 3.14159265",
			"#define DL 2.399963229728653",  // PI * ( 3.0 - sqrt( 5.0 ) )
			"#define EULER 2.718281828459045",

			// user variables

			"const int samples = 64;",     // ao sample count

			"const bool useNoise = true;",      // use noise instead of pattern for sample dithering
			"const float noiseAmount = 0.0004;", // dithering amount

			"const float diffArea = 0.4;",   // self-shadowing reduction
			"const float gDisplace = 0.4;",  // gauss bell center
			// RGBA depth

			"#include <packing>",

			// generating noise / pattern texture for dithering

			"vec2 rand( const vec2 coord ) {",

				"vec2 noise;",

				"if ( useNoise ) {",

					"float nx = dot ( coord, vec2( 12.9898, 78.233 ) );",
					"float ny = dot ( coord, vec2( 12.9898, 78.233 ) * 2.0 );",

					"noise = clamp( fract ( 43758.5453 * sin( vec2( nx, ny ) ) ), 0.0, 1.0 );",

				"} else {",

					"float ff = fract( 1.0 - coord.s * ( size.x / 2.0 ) );",
					"float gg = fract( coord.t * ( size.y / 2.0 ) );",

					"noise = vec2( 0.25, 0.75 ) * vec2( ff ) + vec2( 0.75, 0.25 ) * gg;",

				"}",

				"return ( noise * 2.0  - 1.0 ) * noiseAmount;",

			"}",

			"float readDepth( const in vec2 coord ) {",

				"float cameraFarPlusNear = cameraFar + cameraNear;",
				"float cameraFarMinusNear = cameraFar - cameraNear;",
				"float cameraCoef = 2.0 * cameraNear;",

				"#ifdef USE_LOGDEPTHBUF",

					"float logz = unpackRGBAToDepth( texture2D( tDepth, coord ) );",
					"float w = pow(2.0, (logz / logDepthBufFC)) - 1.0;",
					"float z = (logz / w) + 1.0;",

				"#else",

					"float z = unpackRGBAToDepth( texture2D( tDepth, coord ) );",

				"#endif",

				"return cameraCoef / ( cameraFarPlusNear - z * cameraFarMinusNear );",
			"}",

			"float compareDepths( const in float depth1, const in float depth2, inout int far ) {",

				"float garea = 8.0;",                         // gauss bell width
				"float diff = ( depth1 - depth2 ) * 100.0;",  // depth difference (0-100)

				// reduce left bell width to avoid self-shadowing

				"if ( diff < gDisplace ) {",

					"garea = diffArea;",

				"} else {",

					"far = 1;",

				"}",

				"float dd = diff - gDisplace;",
				"float gauss = pow( EULER, -2.0 * ( dd * dd ) / ( garea * garea ) );",
				"return gauss;",

			"}",

			"float calcAO( float depth, float dw, float dh ) {",

				"vec2 vv = vec2( dw, dh );",

				"vec2 coord1 = vUv + radius * vv;",
				"vec2 coord2 = vUv - radius * vv;",

				"float temp1 = 0.0;",
				"float temp2 = 0.0;",

				"int far = 0;",
				"temp1 = compareDepths( depth, readDepth( coord1 ), far );",

				// DEPTH EXTRAPOLATION

				"if ( far > 0 ) {",

					"temp2 = compareDepths( readDepth( coord2 ), depth, far );",
					"temp1 += ( 1.0 - temp1 ) * temp2;",

				"}",

				"return temp1;",

			"}",

			"void main() {",

				"vec2 noise = rand( vUv );",
				"float depth = readDepth( vUv );",

				"float tt = clamp( depth, aoClamp, 1.0 );",

				"float w = ( 1.0 / size.x ) / tt + ( noise.x * ( 1.0 - noise.x ) );",
				"float h = ( 1.0 / size.y ) / tt + ( noise.y * ( 1.0 - noise.y ) );",

				"float ao = 0.0;",

				"float dz = 1.0 / float( samples );",
				"float l = 0.0;",
				"float z = 1.0 - dz / 2.0;",

				"for ( int i = 0; i <= samples; i ++ ) {",

					"float r = sqrt( 1.0 - z );",

					"float pw = cos( l ) * r;",
					"float ph = sin( l ) * r;",
					"ao += calcAO( depth, pw * w, ph * h );",
					"z = z - dz;",
					"l = l + DL;",

				"}",

				"ao /= float( samples );",
				"ao = 1.0 - ao;",

				"vec3 color = texture2D( tDiffuse, vUv ).rgb;",

				"vec3 lumcoeff = vec3( 0.299, 0.587, 0.114 );",
				"float lum = dot( color.rgb, lumcoeff );",
				"vec3 luminance = vec3( lum );",

				"vec3 final = vec3( color * mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) );",  // mix( color * ao, white, luminance )

				"if ( onlyAO ) {",

					"final = vec3( mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) );",  // ambient occlusion only

				"}",

				"gl_FragColor = vec4( final, 1.0 );",

			"}"

		].join( "\n" )

	};

	exports.SSAOShader = SSAOShader;

	return exports;

}({}));
