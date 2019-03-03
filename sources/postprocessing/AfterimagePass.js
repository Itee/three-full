//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Pass } from './Pass.js'
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { Scene } from '../scenes/Scene.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { PlaneBufferGeometry } from '../geometries/PlaneGeometry.js'
import { Mesh } from '../objects/Mesh.js'
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js'
import {
	NearestFilter,
	LinearFilter,
	RGBAFormat
} from '../constants.js'
import { AfterimageShader } from '../shaders/AfterimageShader.js'
import { UniformsUtils } from '../renderers/shaders/UniformsUtils.js'
var AfterimagePass = function ( damp ) {

	Pass.call( this );

	if ( AfterimageShader === undefined )
		console.error( "AfterimagePass relies on AfterimageShader" );

	this.shader = AfterimageShader;

	this.uniforms = UniformsUtils.clone( this.shader.uniforms );

	this.uniforms[ "damp" ].value = damp !== undefined ? damp : 0.96;

	this.textureComp = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {

		minFilter: LinearFilter,
		magFilter: NearestFilter,
		format: RGBAFormat

	} );

	this.textureOld = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {

		minFilter: LinearFilter,
		magFilter: NearestFilter,
		format: RGBAFormat

	} );

	this.shaderMaterial = new ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: this.shader.vertexShader,
		fragmentShader: this.shader.fragmentShader

	} );

	this.sceneComp = new Scene();
	this.scene = new Scene();

	this.camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.camera.position.z = 1;

	var geometry = new PlaneBufferGeometry( 2, 2 );

	this.quadComp = new Mesh( geometry, this.shaderMaterial );
	this.sceneComp.add( this.quadComp );

	var material = new MeshBasicMaterial( {
		map: this.textureComp.texture
	} );

	var quadScreen = new Mesh( geometry, material );
	this.scene.add( quadScreen );

};

AfterimagePass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: AfterimagePass,

	render: function ( renderer, writeBuffer, readBuffer ) {

		this.uniforms[ "tOld" ].value = this.textureOld.texture;
		this.uniforms[ "tNew" ].value = readBuffer.texture;

		this.quadComp.material = this.shaderMaterial;

		renderer.setRenderTarget( this.textureComp );
		renderer.render( this.sceneComp, this.camera );

		renderer.setRenderTarget( this.textureOld );
		renderer.render( this.scene, this.camera );

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			renderer.render( this.scene, this.camera );

		} else {

			renderer.setRenderTarget( writeBuffer );

			if ( this.clear ) renderer.clear();

			renderer.render( this.scene, this.camera );

		}

	}

} );

export { AfterimagePass }
