//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { BackSide } from '../constants.js'
import { BoxBufferGeometry } from '../geometries/BoxGeometry.js'
import { Mesh } from '../objects/Mesh.js'
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js'
import { Scene } from '../scenes/Scene.js'
import { ShaderLib } from '../renderers/shaders/ShaderLib.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { Pass } from './Pass.js'

/**
 * @author bhouston / http://clara.io/
 */
var CubeTexturePass = function ( camera, envMap, opacity ) {

	Pass.call( this );

	this.camera = camera;

	this.needsSwap = false;

	this.cubeShader = ShaderLib[ 'cube' ];
	this.cubeMesh = new Mesh(
		new BoxBufferGeometry( 10, 10, 10 ),
		new ShaderMaterial( {
			uniforms: this.cubeShader.uniforms,
			vertexShader: this.cubeShader.vertexShader,
			fragmentShader: this.cubeShader.fragmentShader,
			depthTest: false,
			depthWrite: false,
			side: BackSide
		} )
	);

	Object.defineProperty( this.cubeMesh.material, 'envMap', {

		get: function () {

			return this.uniforms.envMap.value;

		}

	} );

	this.envMap = envMap;
	this.opacity = ( opacity !== undefined ) ? opacity : 1.0;

	this.cubeScene = new Scene();
	this.cubeCamera = new PerspectiveCamera();
	this.cubeScene.add( this.cubeMesh );

};

CubeTexturePass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: CubeTexturePass,

	render: function ( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/ ) {

		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		this.cubeCamera.projectionMatrix.copy( this.camera.projectionMatrix );
		this.cubeCamera.quaternion.setFromRotationMatrix( this.camera.matrixWorld );

		this.cubeMesh.material.uniforms.envMap.value = this.envMap;
		this.cubeMesh.material.uniforms.opacity.value = this.opacity;
		this.cubeMesh.material.transparent = ( this.opacity < 1.0 );

		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );
		if ( this.clear ) renderer.clear();
		renderer.render( this.cubeScene, this.cubeCamera );

		renderer.autoClear = oldAutoClear;

	}

} );

export { CubeTexturePass }
