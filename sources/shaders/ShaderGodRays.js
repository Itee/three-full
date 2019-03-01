//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector2 } from '../math/Vector2.js'
import { Color } from '../math/Color.js'
var ShaderGodRays = {

	'godrays_depthMask': {

		uniforms: {

			tInput: {
				value: null
			}

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

			" vUv = uv;",
			" gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"varying vec2 vUv;",

			"uniform sampler2D tInput;",

			"void main() {",

			"	gl_FragColor = vec4( 1.0 ) - texture2D( tInput, vUv );",
			"}"

		].join( "\n" )

	},
	'godrays_generate': {

		uniforms: {

			tInput: {
				value: null
			},
			fStepSize: {
				value: 1.0
			},
			vSunPositionScreenSpace: {
				value: new Vector2( 0.5, 0.5 )
			}

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"#define TAPS_PER_PASS 6.0",

			"varying vec2 vUv;",

			"uniform sampler2D tInput;",

			"uniform vec2 vSunPositionScreenSpace;",
			"uniform float fStepSize;", // filter step size

			"void main() {",

				// delta from current pixel to "sun" position

				"vec2 delta = vSunPositionScreenSpace - vUv;",
				"float dist = length( delta );",

				// Step vector (uv space)

				"vec2 stepv = fStepSize * delta / dist;",

				// Number of iterations between pixel and sun

				"float iters = dist/fStepSize;",

				"vec2 uv = vUv.xy;",
				"float col = 0.0;",

				// This breaks ANGLE in Chrome 22
				//	- see http://code.google.com/p/chromium/issues/detail?id=153105
				// Unrolling loop manually makes it work in ANGLE

				"if ( 0.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
				"uv += stepv;",

				"if ( 1.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
				"uv += stepv;",

				"if ( 2.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
				"uv += stepv;",

				"if ( 3.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
				"uv += stepv;",

				"if ( 4.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
				"uv += stepv;",

				"if ( 5.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
				"uv += stepv;",

				// Should technically be dividing by 'iters', but 'TAPS_PER_PASS' smooths out
				// objectionable artifacts, in particular near the sun position. The side
				// effect is that the result is darker than it should be around the sun, as
				// TAPS_PER_PASS is greater than the number of samples actually accumulated.
				// When the result is inverted (in the shader 'godrays_combine', this produces
				// a slight bright spot at the position of the sun, even when it is occluded.

				"gl_FragColor = vec4( col/TAPS_PER_PASS );",
				"gl_FragColor.a = 1.0;",

			"}"

		].join( "\n" )

	},
	'godrays_combine': {

		uniforms: {

			tColors: {
				value: null
			},

			tGodRays: {
				value: null
			},

			fGodRayIntensity: {
				value: 0.69
			},

			vSunPositionScreenSpace: {
				value: new Vector2( 0.5, 0.5 )
			}

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

			].join( "\n" ),

		fragmentShader: [

			"varying vec2 vUv;",

			"uniform sampler2D tColors;",
			"uniform sampler2D tGodRays;",

			"uniform vec2 vSunPositionScreenSpace;",
			"uniform float fGodRayIntensity;",

			"void main() {",

				// Since MeshDepthMaterial renders foreground objects white and background
				// objects black, the god-rays will be white streaks. Therefore value is inverted
				// before being combined with tColors

				"gl_FragColor = texture2D( tColors, vUv ) + fGodRayIntensity * vec4( 1.0 - texture2D( tGodRays, vUv ).r );",
				"gl_FragColor.a = 1.0;",

			"}"

		].join( "\n" )

	},
	'godrays_fake_sun': {

		uniforms: {

			vSunPositionScreenSpace: {
				value: new Vector2( 0.5, 0.5 )
			},

			fAspect: {
				value: 1.0
			},

			sunColor: {
				value: new Color( 0xffee00 )
			},

			bgColor: {
				value: new Color( 0x000000 )
			}

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"varying vec2 vUv;",

			"uniform vec2 vSunPositionScreenSpace;",
			"uniform float fAspect;",

			"uniform vec3 sunColor;",
			"uniform vec3 bgColor;",

			"void main() {",

				"vec2 diff = vUv - vSunPositionScreenSpace;",

				// Correct for aspect ratio

				"diff.x *= fAspect;",

				"float prop = clamp( length( diff ) / 0.5, 0.0, 1.0 );",
				"prop = 0.35 * pow( 1.0 - prop, 3.0 );",

				"gl_FragColor.xyz = mix( sunColor, bgColor, 1.0 - prop );",
				"gl_FragColor.w = 1.0;",

			"}"

		].join( "\n" )

	}

};

export { ShaderGodRays }
