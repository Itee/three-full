//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { UniformsUtils } from '../renderers/shaders/UniformsUtils.js'
import { Pass } from './Pass.js'
import { DotScreenShader } from '../shaders/DotScreenShader.js'

/**
 * @author alteredq / http://alteredqualia.com/
 */
var DotScreenPass = function ( center, angle, scale ) {

	Pass.call( this );

	if ( DotScreenShader === undefined )
		console.error( "DotScreenPass relies on DotScreenShader" );

	var shader = DotScreenShader;

	this.uniforms = UniformsUtils.clone( shader.uniforms );

	if ( center !== undefined ) this.uniforms[ "center" ].value.copy( center );
	if ( angle !== undefined ) this.uniforms[ "angle" ].value = angle;
	if ( scale !== undefined ) this.uniforms[ "scale" ].value = scale;

	this.material = new ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.fsQuad = new Pass.FullScreenQuad( this.material );

};

DotScreenPass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: DotScreenPass,

	render: function ( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		this.uniforms[ "tDiffuse" ].value = readBuffer.texture;
		this.uniforms[ "tSize" ].value.set( readBuffer.width, readBuffer.height );

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );

		}

	}

} );

export { DotScreenPass }
