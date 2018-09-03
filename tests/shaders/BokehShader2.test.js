var Three = (function (exports) {
	'use strict';

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

	var BokehShader2 = {

		uniforms: {

			"textureWidth":  { value: 1.0 },
			"textureHeight":  { value: 1.0 },

			"focalDepth":   { value: 1.0 },
			"focalLength":   { value: 24.0 },
			"fstop": { value: 0.9 },

			"tColor":   { value: null },
			"tDepth":   { value: null },

			"maxblur":  { value: 1.0 },

			"showFocus":   { value: 0 },
			"manualdof":   { value: 0 },
			"vignetting":   { value: 0 },
			"depthblur":   { value: 0 },

			"threshold":  { value: 0.5 },
			"gain":  { value: 2.0 },
			"bias":  { value: 0.5 },
			"fringe":  { value: 0.7 },

			"znear":  { value: 0.1 },
			"zfar":  { value: 100 },

			"noise":  { value: 1 },
			"dithering":  { value: 0.0001 },
			"pentagon": { value: 0 },

			"shaderFocus":  { value: 1 },
			"focusCoords":  { value: new Vector2() }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"#include <common>",

			"varying vec2 vUv;",

			"uniform sampler2D tColor;",
			"uniform sampler2D tDepth;",
			"uniform float textureWidth;",
			"uniform float textureHeight;",

			"uniform float focalDepth;  //focal distance value in meters, but you may use autofocus option below",
			"uniform float focalLength; //focal length in mm",
			"uniform float fstop; //f-stop value",
			"uniform bool showFocus; //show debug focus point and focal range (red = focal point, green = focal range)",

			"",

			"uniform float znear; // camera clipping start",
			"uniform float zfar; // camera clipping end",

			"//------------------------------------------",
			"//user variables",

			"const int samples = SAMPLES; //samples on the first ring",
			"const int rings = RINGS; //ring count",

			"const int maxringsamples = rings * samples;",

			"uniform bool manualdof; // manual dof calculation",
			"float ndofstart = 1.0; // near dof blur start",
			"float ndofdist = 2.0; // near dof blur falloff distance",
			"float fdofstart = 1.0; // far dof blur start",
			"float fdofdist = 3.0; // far dof blur falloff distance",

			"float CoC = 0.03; //circle of confusion size in mm (35mm film = 0.03mm)",

			"uniform bool vignetting; // use optical lens vignetting",

			"float vignout = 1.3; // vignetting outer border",
			"float vignin = 0.0; // vignetting inner border",
			"float vignfade = 22.0; // f-stops till vignete fades",

			"uniform bool shaderFocus;",
			"// disable if you use external focalDepth value",

			"uniform vec2 focusCoords;",
			"// autofocus point on screen (0.0,0.0 - left lower corner, 1.0,1.0 - upper right)",
			"// if center of screen use vec2(0.5, 0.5);",

			"uniform float maxblur;",
			"//clamp value of max blur (0.0 = no blur, 1.0 default)",

			"uniform float threshold; // highlight threshold;",
			"uniform float gain; // highlight gain;",

			"uniform float bias; // bokeh edge bias",
			"uniform float fringe; // bokeh chromatic aberration / fringing",

			"uniform bool noise; //use noise instead of pattern for sample dithering",

			"uniform float dithering;",

			"uniform bool depthblur; // blur the depth buffer",
			"float dbsize = 1.25; // depth blur size",

			"",

			"uniform bool pentagon; //use pentagon as bokeh shape?",
			"float feather = 0.4; //pentagon shape feather",

			"//------------------------------------------",

			"float penta(vec2 coords) {",
				"//pentagonal shape",
				"float scale = float(rings) - 1.3;",
				"vec4  HS0 = vec4( 1.0,         0.0,         0.0,  1.0);",
				"vec4  HS1 = vec4( 0.309016994, 0.951056516, 0.0,  1.0);",
				"vec4  HS2 = vec4(-0.809016994, 0.587785252, 0.0,  1.0);",
				"vec4  HS3 = vec4(-0.809016994,-0.587785252, 0.0,  1.0);",
				"vec4  HS4 = vec4( 0.309016994,-0.951056516, 0.0,  1.0);",
				"vec4  HS5 = vec4( 0.0        ,0.0         , 1.0,  1.0);",

				"vec4  one = vec4( 1.0 );",

				"vec4 P = vec4((coords),vec2(scale, scale));",

				"vec4 dist = vec4(0.0);",
				"float inorout = -4.0;",

				"dist.x = dot( P, HS0 );",
				"dist.y = dot( P, HS1 );",
				"dist.z = dot( P, HS2 );",
				"dist.w = dot( P, HS3 );",

				"dist = smoothstep( -feather, feather, dist );",

				"inorout += dot( dist, one );",

				"dist.x = dot( P, HS4 );",
				"dist.y = HS5.w - abs( P.z );",

				"dist = smoothstep( -feather, feather, dist );",
				"inorout += dist.x;",

				"return clamp( inorout, 0.0, 1.0 );",
			"}",

			"float bdepth(vec2 coords) {",
				"// Depth buffer blur",
				"float d = 0.0;",
				"float kernel[9];",
				"vec2 offset[9];",

				"vec2 wh = vec2(1.0/textureWidth,1.0/textureHeight) * dbsize;",

				"offset[0] = vec2(-wh.x,-wh.y);",
				"offset[1] = vec2( 0.0, -wh.y);",
				"offset[2] = vec2( wh.x -wh.y);",

				"offset[3] = vec2(-wh.x,  0.0);",
				"offset[4] = vec2( 0.0,   0.0);",
				"offset[5] = vec2( wh.x,  0.0);",

				"offset[6] = vec2(-wh.x, wh.y);",
				"offset[7] = vec2( 0.0,  wh.y);",
				"offset[8] = vec2( wh.x, wh.y);",

				"kernel[0] = 1.0/16.0;   kernel[1] = 2.0/16.0;   kernel[2] = 1.0/16.0;",
				"kernel[3] = 2.0/16.0;   kernel[4] = 4.0/16.0;   kernel[5] = 2.0/16.0;",
				"kernel[6] = 1.0/16.0;   kernel[7] = 2.0/16.0;   kernel[8] = 1.0/16.0;",

				"for( int i=0; i<9; i++ ) {",
					"float tmp = texture2D(tDepth, coords + offset[i]).r;",
					"d += tmp * kernel[i];",
				"}",

				"return d;",
			"}",

			"vec3 color(vec2 coords,float blur) {",
				"//processing the sample",

				"vec3 col = vec3(0.0);",
				"vec2 texel = vec2(1.0/textureWidth,1.0/textureHeight);",

				"col.r = texture2D(tColor,coords + vec2(0.0,1.0)*texel*fringe*blur).r;",
				"col.g = texture2D(tColor,coords + vec2(-0.866,-0.5)*texel*fringe*blur).g;",
				"col.b = texture2D(tColor,coords + vec2(0.866,-0.5)*texel*fringe*blur).b;",

				"vec3 lumcoeff = vec3(0.299,0.587,0.114);",
				"float lum = dot(col.rgb, lumcoeff);",
				"float thresh = max((lum-threshold)*gain, 0.0);",
				"return col+mix(vec3(0.0),col,thresh*blur);",
			"}",

			"vec3 debugFocus(vec3 col, float blur, float depth) {",
				"float edge = 0.002*depth; //distance based edge smoothing",
				"float m = clamp(smoothstep(0.0,edge,blur),0.0,1.0);",
				"float e = clamp(smoothstep(1.0-edge,1.0,blur),0.0,1.0);",

				"col = mix(col,vec3(1.0,0.5,0.0),(1.0-m)*0.6);",
				"col = mix(col,vec3(0.0,0.5,1.0),((1.0-e)-(1.0-m))*0.2);",

				"return col;",
			"}",

			"float linearize(float depth) {",
				"return -zfar * znear / (depth * (zfar - znear) - zfar);",
			"}",

			"float vignette() {",
				"float dist = distance(vUv.xy, vec2(0.5,0.5));",
				"dist = smoothstep(vignout+(fstop/vignfade), vignin+(fstop/vignfade), dist);",
				"return clamp(dist,0.0,1.0);",
			"}",

			"float gather(float i, float j, int ringsamples, inout vec3 col, float w, float h, float blur) {",
				"float rings2 = float(rings);",
				"float step = PI*2.0 / float(ringsamples);",
				"float pw = cos(j*step)*i;",
				"float ph = sin(j*step)*i;",
				"float p = 1.0;",
				"if (pentagon) {",
					"p = penta(vec2(pw,ph));",
				"}",
				"col += color(vUv.xy + vec2(pw*w,ph*h), blur) * mix(1.0, i/rings2, bias) * p;",
				"return 1.0 * mix(1.0, i /rings2, bias) * p;",
			"}",

			"void main() {",
				"//scene depth calculation",

				"float depth = linearize(texture2D(tDepth,vUv.xy).x);",

				"// Blur depth?",
				"if ( depthblur ) {",
					"depth = linearize(bdepth(vUv.xy));",
				"}",

				"//focal plane calculation",

				"float fDepth = focalDepth;",

				"if (shaderFocus) {",

					"fDepth = linearize(texture2D(tDepth,focusCoords).x);",

				"}",

				"// dof blur factor calculation",

				"float blur = 0.0;",

				"if (manualdof) {",
					"float a = depth-fDepth; // Focal plane",
					"float b = (a-fdofstart)/fdofdist; // Far DoF",
					"float c = (-a-ndofstart)/ndofdist; // Near Dof",
					"blur = (a>0.0) ? b : c;",
				"} else {",
					"float f = focalLength; // focal length in mm",
					"float d = fDepth*1000.0; // focal plane in mm",
					"float o = depth*1000.0; // depth in mm",

					"float a = (o*f)/(o-f);",
					"float b = (d*f)/(d-f);",
					"float c = (d-f)/(d*fstop*CoC);",

					"blur = abs(a-b)*c;",
				"}",

				"blur = clamp(blur,0.0,1.0);",

				"// calculation of pattern for dithering",

				"vec2 noise = vec2(rand(vUv.xy), rand( vUv.xy + vec2( 0.4, 0.6 ) ) )*dithering*blur;",

				"// getting blur x and y step factor",

				"float w = (1.0/textureWidth)*blur*maxblur+noise.x;",
				"float h = (1.0/textureHeight)*blur*maxblur+noise.y;",

				"// calculation of final color",

				"vec3 col = vec3(0.0);",

				"if(blur < 0.05) {",
					"//some optimization thingy",
					"col = texture2D(tColor, vUv.xy).rgb;",
				"} else {",
					"col = texture2D(tColor, vUv.xy).rgb;",
					"float s = 1.0;",
					"int ringsamples;",

					"for (int i = 1; i <= rings; i++) {",
						"",
						"ringsamples = i * samples;",

						"for (int j = 0 ; j < maxringsamples ; j++) {",
							"if (j >= ringsamples) break;",
							"s += gather(float(i), float(j), ringsamples, col, w, h, blur);",
						"}",
						"",
					"}",

					"col /= s; //divide by sample count",
				"}",

				"if (showFocus) {",
					"col = debugFocus(col, blur, depth);",
				"}",

				"if (vignetting) {",
					"col *= vignette();",
				"}",

				"gl_FragColor.rgb = col;",
				"gl_FragColor.a = 1.0;",
			"} "

		].join( "\n" )

	};

	var BokehDepthShader = {

		uniforms: {

			"mNear": { value: 1.0 },
			"mFar": { value: 1000.0 },

		},

		vertexShader: [

			"varying float vViewZDepth;",

			"void main() {",

			"	#include <begin_vertex>",
			"	#include <project_vertex>",

			"	vViewZDepth = - mvPosition.z;",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform float mNear;",
			"uniform float mFar;",

			"varying float vViewZDepth;",

			"void main() {",

			"	float color = 1.0 - smoothstep( mNear, mFar, vViewZDepth );",
			"	gl_FragColor = vec4( vec3( color ), 1.0 );",

			"} "

		].join( "\n" )

	};

	exports.BokehShader2 = BokehShader2;
	exports.BokehDepthShader = BokehDepthShader;

	return exports;

}({}));
