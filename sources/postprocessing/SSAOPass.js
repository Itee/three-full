//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ShaderPass } from './ShaderPass.js'
import { MeshDepthMaterial } from '../materials/MeshDepthMaterial.js'
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js'
import {
	NoBlending,
	LinearFilter,
	RGBADepthPacking
} from '../constants.js'
import { SSAOShader } from '../shaders/SSAOShader.js'

'use strict';

var SSAOPass = function ( scene, camera, width, height ) {

	if ( SSAOShader === undefined ) {

		console.warn( 'SSAOPass depends on SSAOShader' );
		return new ShaderPass();

	}

	ShaderPass.call( this, SSAOShader );

	this.width = ( width !== undefined ) ? width : 512;
	this.height = ( height !== undefined ) ? height : 256;

	this.renderToScreen = false;

	this.camera2 = camera;
	this.scene2 = scene;

	//Depth material
	this.depthMaterial = new MeshDepthMaterial();
	this.depthMaterial.depthPacking = RGBADepthPacking;
	this.depthMaterial.blending = NoBlending;

	//Depth render target
	this.depthRenderTarget = new WebGLRenderTarget( this.width, this.height, { minFilter: LinearFilter, magFilter: LinearFilter } );
	//this.depthRenderTarget.texture.name = 'SSAOShader.rt';

	//Shader uniforms
	this.uniforms[ 'tDepth' ].value = this.depthRenderTarget.texture;
	this.uniforms[ 'size' ].value.set( this.width, this.height );
	this.uniforms[ 'cameraNear' ].value = this.camera2.near;
	this.uniforms[ 'cameraFar' ].value = this.camera2.far;

	this.uniforms[ 'radius' ].value = 4;
	this.uniforms[ 'onlyAO' ].value = false;
	this.uniforms[ 'aoClamp' ].value = 0.25;
	this.uniforms[ 'lumInfluence' ].value = 0.7;

	//Setters and getters for uniforms

	Object.defineProperties( this, {

		radius: {
			get: function () {

				return this.uniforms[ 'radius' ].value;

			},
			set: function ( value ) {

				this.uniforms[ 'radius' ].value = value;

			}
		},

		onlyAO: {
			get: function () {

				return this.uniforms[ 'onlyAO' ].value;

			},
			set: function ( value ) {

				this.uniforms[ 'onlyAO' ].value = value;

			}
		},

		aoClamp: {
			get: function () {

				return this.uniforms[ 'aoClamp' ].value;

			},
			set: function ( value ) {

				this.uniforms[ 'aoClamp' ].value = value;

			}
		},

		lumInfluence: {
			get: function () {

				return this.uniforms[ 'lumInfluence' ].value;

			},
			set: function ( value ) {

				this.uniforms[ 'lumInfluence' ].value = value;

			}
		},

	} );

};

SSAOPass.prototype = Object.create( ShaderPass.prototype );

SSAOPass.prototype.render = function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

	//Render depth into depthRenderTarget
	this.scene2.overrideMaterial = this.depthMaterial;

	renderer.render( this.scene2, this.camera2, this.depthRenderTarget, true );

	this.scene2.overrideMaterial = null;

	//SSAO shaderPass
	ShaderPass.prototype.render.call( this, renderer, writeBuffer, readBuffer, delta, maskActive );

};

SSAOPass.prototype.setScene = function ( scene ) {

	this.scene2 = scene;

};

SSAOPass.prototype.setCamera = function ( camera ) {

	this.camera2 = camera;

	this.uniforms[ 'cameraNear' ].value = this.camera2.near;
	this.uniforms[ 'cameraFar' ].value = this.camera2.far;

};

SSAOPass.prototype.setSize = function ( width, height ) {

	this.width = width;
	this.height = height;

	this.uniforms[ 'size' ].value.set( this.width, this.height );
	this.depthRenderTarget.setSize( this.width, this.height );

};

export { SSAOPass }
