//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	LinearFilter,
	RGBFormat
} from '../constants.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { UniformsUtils } from '../renderers/shaders/UniformsUtils.js'
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js'
import { Pass } from './Pass.js'
import { CopyShader } from '../shaders/CopyShader.js'

/**
 * @author alteredq / http://alteredqualia.com/
 */
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

	this.fsQuad = new Pass.FullScreenQuad( this.material );

};

SavePass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: SavePass,

	render: function ( renderer, writeBuffer, readBuffer ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		renderer.setRenderTarget( this.renderTarget );
		if ( this.clear ) renderer.clear();
		this.fsQuad.render( renderer );

	}

} );

export { SavePass }
