//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	BackSide,
	NoBlending
} from '../constants.js'
import { Scene } from '../scenes/Scene.js'
import { Mesh } from '../objects/Mesh.js'
import { BoxBufferGeometry } from '../geometries/BoxGeometry.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { cloneUniforms } from './shaders/UniformsUtils.js'
import { WebGLRenderTarget } from './WebGLRenderTarget.js'
import { CubeCamera } from '../cameras/CubeCamera.js'
/**
 * @author alteredq / http://alteredqualia.com
 * @author WestLangley / http://github.com/WestLangley
 */

function WebGLCubeRenderTarget( size, options, dummy ) {

	if ( Number.isInteger( options ) ) {

		console.warn( 'WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )' );

		options = dummy;

	}

	WebGLRenderTarget.call( this, size, size, options );

}

WebGLCubeRenderTarget.prototype = Object.create( WebGLRenderTarget.prototype );
WebGLCubeRenderTarget.prototype.constructor = WebGLCubeRenderTarget;

WebGLCubeRenderTarget.prototype.isWebGLCubeRenderTarget = true;

WebGLCubeRenderTarget.prototype.fromEquirectangularTexture = function ( renderer, texture ) {

	this.texture.type = texture.type;
	this.texture.format = texture.format;
	this.texture.encoding = texture.encoding;

	var scene = new Scene();

	var shader = {

		uniforms: {
			tEquirect: { value: null },
		},

		vertexShader: [

			"varying vec3 vWorldDirection;",

			"vec3 transformDirection( in vec3 dir, in mat4 matrix ) {",

			"	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );",

			"}",

			"void main() {",

			"	vWorldDirection = transformDirection( position, modelMatrix );",

			"	#include <begin_vertex>",
			"	#include <project_vertex>",

			"}"

		].join( '\n' ),

		fragmentShader: [

			"uniform sampler2D tEquirect;",

			"varying vec3 vWorldDirection;",

			"#define RECIPROCAL_PI 0.31830988618",
			"#define RECIPROCAL_PI2 0.15915494",

			"void main() {",

			"	vec3 direction = normalize( vWorldDirection );",

			"	vec2 sampleUV;",

			"	sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;",

			"	sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;",

			"	gl_FragColor = texture2D( tEquirect, sampleUV );",

			"}"

		].join( '\n' ),
	};

	var material = new ShaderMaterial( {

		type: 'CubemapFromEquirect',

		uniforms: cloneUniforms( shader.uniforms ),
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader,
		side: BackSide,
		blending: NoBlending

	} );

	material.uniforms.tEquirect.value = texture;

	var mesh = new Mesh( new BoxBufferGeometry( 5, 5, 5 ), material );

	scene.add( mesh );

	var camera = new CubeCamera( 1, 10, 1 );

	camera.renderTarget = this;
	camera.renderTarget.texture.name = 'CubeCameraTexture';

	camera.update( renderer, scene );

	mesh.geometry.dispose();
	mesh.material.dispose();

	return this;

};

export { WebGLCubeRenderTarget }
