import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { Scene } from '../scenes/Scene.js'
import { StereoCamera } from '../cameras/StereoCamera.js'
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js'
import { ShaderMaterial } from '../materials/Materials.js'
import { Mesh } from '../objects/Mesh.js'
import { PlaneBufferGeometry } from '../geometries/Geometries.js'
import {
	NearestFilter,
	LinearFilter,
	RGBAFormat
} from '../constants.js'

/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 */

var ParallaxBarrierEffect = function ( renderer ) {

	var _camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

	var _scene = new Scene();

	var _stereo = new StereoCamera();

	var _params = { minFilter: LinearFilter, magFilter: NearestFilter, format: RGBAFormat };

	var _renderTargetL = new WebGLRenderTarget( 512, 512, _params );
	var _renderTargetR = new WebGLRenderTarget( 512, 512, _params );

	var _material = new ShaderMaterial( {

		uniforms: {

			"mapLeft": { value: _renderTargetL.texture },
			"mapRight": { value: _renderTargetR.texture }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

			"	vUv = vec2( uv.x, uv.y );",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;",
			"varying vec2 vUv;",

			"void main() {",

			"	vec2 uv = vUv;",

			"	if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {",

			"		gl_FragColor = texture2D( mapLeft, uv );",

			"	} else {",

			"		gl_FragColor = texture2D( mapRight, uv );",

			"	}",

			"}"

		].join( "\n" )

	} );

	var mesh = new Mesh( new PlaneBufferGeometry( 2, 2 ), _material );
	_scene.add( mesh );

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

		var pixelRatio = renderer.getPixelRatio();

		_renderTargetL.setSize( width * pixelRatio, height * pixelRatio );
		_renderTargetR.setSize( width * pixelRatio, height * pixelRatio );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		_stereo.update( camera );

		renderer.render( scene, _stereo.cameraL, _renderTargetL, true );
		renderer.render( scene, _stereo.cameraR, _renderTargetR, true );
		renderer.render( _scene, _camera );

	};

};

export { ParallaxBarrierEffect }
