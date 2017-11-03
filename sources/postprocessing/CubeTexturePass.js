import { Pass } from '../postprocessing/Pass.js'
import { Mesh } from '../objects/Mesh.js'
import { BoxBufferGeometry } from '../geometries/BoxGeometry.js'
import { ShaderMaterial } from '../materials/Materials.js'
import { Scene } from '../scenes/Scene.js'
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js'
import { BackSide } from '../constants.js'

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

	this.envMap = envMap;
	this.opacity = ( opacity !== undefined ) ? opacity : 1.0;

	this.cubeScene = new Scene();
	this.cubeCamera = new PerspectiveCamera();
	this.cubeScene.add( this.cubeMesh );

};

CubeTexturePass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: CubeTexturePass,

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		this.cubeCamera.projectionMatrix.copy( this.camera.projectionMatrix );
		this.cubeCamera.quaternion.setFromRotationMatrix( this.camera.matrixWorld );

		this.cubeMesh.material.uniforms[ "tCube" ].value = this.envMap;
		this.cubeMesh.material.uniforms[ "opacity" ].value = this.opacity;
		this.cubeMesh.material.transparent = ( this.opacity < 1.0 );

		renderer.render( this.cubeScene, this.cubeCamera, this.renderToScreen ? null : readBuffer, this.clear );

		renderer.autoClear = oldAutoClear;

	}

} );

export { CubeTexturePass }
