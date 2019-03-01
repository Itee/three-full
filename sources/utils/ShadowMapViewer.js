//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { Scene } from '../scenes/Scene.js'
import { UniformsUtils } from '../renderers/shaders/UniformsUtils.js'
import { ShaderMaterial } from '../materials/ShaderMaterial.js'
import { PlaneBufferGeometry } from '../geometries/PlaneGeometry.js'
import { Mesh } from '../objects/Mesh.js'
import { Texture } from '../textures/Texture.js'
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js'
import {
	DoubleSide,
	LinearFilter
} from '../constants.js'
import { UnpackDepthRGBAShader } from '../shaders/UnpackDepthRGBAShader.js'
var ShadowMapViewer = function ( light ) {

	//- Internals
	var scope = this;
	var doRenderLabel = ( light.name !== undefined && light.name !== '' );
	var userAutoClearSetting;

	//Holds the initial position and dimension of the HUD
	var frame = {
		x: 10,
		y: 10,
		width: 256,
		height: 256
	};

	var camera = new OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10 );
	camera.position.set( 0, 0, 2 );
	var scene = new Scene();

	//HUD for shadow map
	var shader = UnpackDepthRGBAShader;

	var uniforms = new UniformsUtils.clone( shader.uniforms );
	var material = new ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader
	} );
	var plane = new PlaneBufferGeometry( frame.width, frame.height );
	var mesh = new Mesh( plane, material );

	scene.add( mesh );
	//Label for light's name
	var labelCanvas, labelMesh;

	if ( doRenderLabel ) {

		labelCanvas = document.createElement( 'canvas' );

		var context = labelCanvas.getContext( '2d' );
		context.font = 'Bold 20px Arial';

		var labelWidth = context.measureText( light.name ).width;
		labelCanvas.width = labelWidth;
		labelCanvas.height = 25;	//25 to account for g, p, etc.

		context.font = 'Bold 20px Arial';
		context.fillStyle = 'rgba( 255, 0, 0, 1 )';
		context.fillText( light.name, 0, 20 );

		var labelTexture = new Texture( labelCanvas );
		labelTexture.magFilter = LinearFilter;
		labelTexture.minFilter = LinearFilter;
		labelTexture.needsUpdate = true;

		var labelMaterial = new MeshBasicMaterial( { map: labelTexture, side: DoubleSide } );
		labelMaterial.transparent = true;

		var labelPlane = new PlaneBufferGeometry( labelCanvas.width, labelCanvas.height );
		labelMesh = new Mesh( labelPlane, labelMaterial );

		scene.add( labelMesh );

	}
	function resetPosition () {

		scope.position.set( scope.position.x, scope.position.y );

	}

	//- API
	// Set to false to disable displaying this shadow map
	this.enabled = true;

	// Set the size of the displayed shadow map on the HUD
	this.size = {
		width: frame.width,
		height: frame.height,
		set: function ( width, height ) {

			this.width = width;
			this.height = height;

			mesh.scale.set( this.width / frame.width, this.height / frame.height, 1 );

			//Reset the position as it is off when we scale stuff
			resetPosition();

		}
	};

	// Set the position of the displayed shadow map on the HUD
	this.position = {
		x: frame.x,
		y: frame.y,
		set: function ( x, y ) {

			this.x = x;
			this.y = y;

			var width = scope.size.width;
			var height = scope.size.height;

			mesh.position.set( - window.innerWidth / 2 + width / 2 + this.x, window.innerHeight / 2 - height / 2 - this.y, 0 );

			if ( doRenderLabel ) labelMesh.position.set( mesh.position.x, mesh.position.y - scope.size.height / 2 + labelCanvas.height / 2, 0 );

		}
	};

	this.render = function ( renderer ) {

		if ( this.enabled ) {

			//Because a light's .shadowMap is only initialised after the first render pass
			//we have to make sure the correct map is sent into the shader, otherwise we
			//always end up with the scene's first added shadow casting light's shadowMap
			//in the shader
			//See: https://github.com/mrdoob/three.js/issues/5932
			uniforms.tDiffuse.value = light.shadow.map.texture;

			userAutoClearSetting = renderer.autoClear;
			renderer.autoClear = false; // To allow render overlay
			renderer.clearDepth();
			renderer.render( scene, camera );
			renderer.autoClear = userAutoClearSetting;	//Restore user's setting

		}

	};

	this.updateForWindowResize = function () {

		if ( this.enabled ) {

			 camera.left = window.innerWidth / - 2;
			 camera.right = window.innerWidth / 2;
			 camera.top = window.innerHeight / 2;
			 camera.bottom = window.innerHeight / - 2;
			 camera.updateProjectionMatrix();

			 this.update();
		}

	};

	this.update = function () {

		this.position.set( this.position.x, this.position.y );
		this.size.set( this.size.width, this.size.height );

	};

	//Force an update to set position/size
	this.update();

};

ShadowMapViewer.prototype.constructor = ShadowMapViewer;

export { ShadowMapViewer }
