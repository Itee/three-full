//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Pass } from './Pass.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { Scene } from '../scenes/Scene.js'
import { Mesh } from '../objects/Mesh.js'
import { PlaneBufferGeometry } from '../geometries/PlaneGeometry.js'
import {
	LinearFilter,
	RGBFormat
} from '../constants.js'
import { CopyShader } from '../shaders/CopyShader.js'
import { UniformsUtils } from '../renderers/shaders/UniformsUtils.js'
var SavePass = function ( renderTarget ) {

	Pass.call( this );

	if ( CopyShader === undefined )
		console.error( "SavePass relies on CopyShader" );

	var shader = CopyShader;

	this.textureID = "tDiffuse";

	this.uniforms = UniformsUtils.clone( shader.uniforms );

	this.material = new ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.renderTarget = renderTarget;

	if ( this.renderTarget === undefined ) {

		this.renderTarget = new WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBFormat, stencilBuffer: false } );
		this.renderTarget.texture.name = "SavePass.rt";

	}

	this.needsSwap = false;

	this.camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene = new Scene();

	this.quad = new Mesh( new PlaneBufferGeometry( 2, 2 ), null );
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add( this.quad );

};

SavePass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: SavePass,

	render: function ( renderer, writeBuffer, readBuffer ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		this.quad.material = this.material;

		renderer.setRenderTarget( this.renderTarget );
		if ( this.clear ) renderer.clear();
		renderer.render( this.scene, this.camera );

	}

} );

export { SavePass }
