//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Pass } from './Pass.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { Scene } from '../scenes/Scene.js'
import { Mesh } from '../objects/Mesh.js'
import { PlaneBufferGeometry } from '../geometries/PlaneGeometry.js'
import { UniformsUtils } from '../renderers/shaders/UniformsUtils.js'
import { HalftoneShader } from '../shaders/HalftoneShader.js'
var HalftonePass = function ( width, height, params ) {

	Pass.call( this );

 	if ( HalftoneShader === undefined ) {

 		console.error( 'HalftonePass requires HalftoneShader' );

 	}

 	this.uniforms = UniformsUtils.clone( HalftoneShader.uniforms );
 	this.material = new ShaderMaterial( {
 		uniforms: this.uniforms,
 		fragmentShader: HalftoneShader.fragmentShader,
 		vertexShader: HalftoneShader.vertexShader
 	} );

	// set params
	this.uniforms.width.value = width;
	this.uniforms.height.value = height;

	for ( var key in params ) {

		if ( params.hasOwnProperty( key ) && this.uniforms.hasOwnProperty( key ) ) {

			this.uniforms[ key ].value = params[ key ];

		}

	}

 	this.camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
 	this.scene = new Scene();
 	this.quad = new Mesh( new PlaneBufferGeometry( 2, 2 ), null );
 	this.quad.frustumCulled = false;
 	this.scene.add( this.quad );

};

HalftonePass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: HalftonePass,

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

 		this.material.uniforms[ "tDiffuse" ].value = readBuffer.texture;
 		this.quad.material = this.material;

 		if ( this.renderToScreen ) {

 			renderer.setRenderTarget( null );
 			renderer.render( this.scene, this.camera );

		} else {

 			renderer.setRenderTarget( writeBuffer );
 			if ( this.clear ) renderer.clear();
			renderer.render( this.scene, this.camera );

		}

 	},

 	setSize: function ( width, height ) {

 		this.uniforms.width.value = width;
 		this.uniforms.height.value = height;

 	}
} );

export { HalftonePass }
