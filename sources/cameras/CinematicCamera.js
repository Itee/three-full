import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js'
import {
	MeshDepthMaterial,
	ShaderMaterial
} from '../materials/Materials.js'
import { Scene } from '../scenes/Scene.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js'
import { Mesh } from '../objects/Mesh.js'
import { PlaneBufferGeometry } from '../geometries/Geometries.js'
import {
	LinearFilter,
	RGBFormat
} from '../constants.js'

/**
 * @author mrdoob / http://mrdoob.com/
 * @author greggman / http://games.greggman.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author kaypiKun
 */

var CinematicCamera = function( fov, aspect, near, far ) {

	PerspectiveCamera.call( this, fov, aspect, near, far );

	this.type = "CinematicCamera";

	this.postprocessing = { enabled	: true };
	this.shaderSettings = {
		rings: 3,
		samples: 4
	};

	this.material_depth = new MeshDepthMaterial();

	// In case of cinematicCamera, having a default lens set is important
	this.setLens();

	this.initPostProcessing();

};

CinematicCamera.prototype = Object.create( PerspectiveCamera.prototype );
CinematicCamera.prototype.constructor = CinematicCamera;


// providing fnumber and coc(Circle of Confusion) as extra arguments
CinematicCamera.prototype.setLens = function ( focalLength, filmGauge, fNumber, coc ) {

	// In case of cinematicCamera, having a default lens set is important
	if ( focalLength === undefined ) focalLength = 35;
	if ( filmGauge !== undefined ) this.filmGauge = filmGauge;

	this.setFocalLength( focalLength );

	// if fnumber and coc are not provided, cinematicCamera tries to act as a basic PerspectiveCamera
	if ( fNumber === undefined ) fNumber = 8;
	if ( coc === undefined ) coc = 0.019;

	this.fNumber = fNumber;
	this.coc = coc;

	// fNumber is focalLength by aperture
	this.aperture = focalLength / this.fNumber;

	// hyperFocal is required to calculate depthOfField when a lens tries to focus at a distance with given fNumber and focalLength
	this.hyperFocal = ( focalLength * focalLength ) / ( this.aperture * this.coc );

};

CinematicCamera.prototype.linearize = function ( depth ) {

	var zfar = this.far;
	var znear = this.near;
	return - zfar * znear / ( depth * ( zfar - znear ) - zfar );

};

CinematicCamera.prototype.smoothstep = function ( near, far, depth ) {

	var x = this.saturate( ( depth - near ) / ( far - near ) );
	return x * x * ( 3 - 2 * x );

};

CinematicCamera.prototype.saturate = function ( x ) {

	return Math.max( 0, Math.min( 1, x ) );

};

// function for focusing at a distance from the camera
CinematicCamera.prototype.focusAt = function ( focusDistance ) {

	if ( focusDistance === undefined ) focusDistance = 20;

	var focalLength = this.getFocalLength();

	// distance from the camera (normal to frustrum) to focus on
	this.focus = focusDistance;

	// the nearest point from the camera which is in focus (unused)
	this.nearPoint = ( this.hyperFocal * this.focus ) / ( this.hyperFocal + ( this.focus - focalLength ) );

	// the farthest point from the camera which is in focus (unused)
	this.farPoint = ( this.hyperFocal * this.focus ) / ( this.hyperFocal - ( this.focus - focalLength ) );

	// the gap or width of the space in which is everything is in focus (unused)
	this.depthOfField = this.farPoint - this.nearPoint;

	// Considering minimum distance of focus for a standard lens (unused)
	if ( this.depthOfField < 0 ) this.depthOfField = 0;

	this.sdistance = this.smoothstep( this.near, this.far, this.focus );

	this.ldistance = this.linearize( 1 -	this.sdistance );

	this.postprocessing.bokeh_uniforms[ 'focalDepth' ].value = this.ldistance;

};

CinematicCamera.prototype.initPostProcessing = function () {

	if ( this.postprocessing.enabled ) {

		this.postprocessing.scene = new Scene();

		this.postprocessing.camera = new OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2,	window.innerHeight / 2, window.innerHeight / - 2, - 10000, 10000 );

		this.postprocessing.scene.add( this.postprocessing.camera );

		var pars = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBFormat };
		this.postprocessing.rtTextureDepth = new WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );
		this.postprocessing.rtTextureColor = new WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );

		var bokeh_shader = BokehShader;

		this.postprocessing.bokeh_uniforms = UniformsUtils.clone( bokeh_shader.uniforms );

		this.postprocessing.bokeh_uniforms[ "tColor" ].value = this.postprocessing.rtTextureColor.texture;
		this.postprocessing.bokeh_uniforms[ "tDepth" ].value = this.postprocessing.rtTextureDepth.texture;

		this.postprocessing.bokeh_uniforms[ "manualdof" ].value = 0;
		this.postprocessing.bokeh_uniforms[ "shaderFocus" ].value = 0;

		this.postprocessing.bokeh_uniforms[ "fstop" ].value = 2.8;

		this.postprocessing.bokeh_uniforms[ "showFocus" ].value = 1;

		this.postprocessing.bokeh_uniforms[ "focalDepth" ].value = 0.1;

		//console.log( this.postprocessing.bokeh_uniforms[ "focalDepth" ].value );

		this.postprocessing.bokeh_uniforms[ "znear" ].value = this.near;
		this.postprocessing.bokeh_uniforms[ "zfar" ].value = this.near;


		this.postprocessing.bokeh_uniforms[ "textureWidth" ].value = window.innerWidth;

		this.postprocessing.bokeh_uniforms[ "textureHeight" ].value = window.innerHeight;

		this.postprocessing.materialBokeh = new ShaderMaterial( {
			uniforms: this.postprocessing.bokeh_uniforms,
			vertexShader: bokeh_shader.vertexShader,
			fragmentShader: bokeh_shader.fragmentShader,
			defines: {
				RINGS: this.shaderSettings.rings,
				SAMPLES: this.shaderSettings.samples
			}
		} );

		this.postprocessing.quad = new Mesh( new PlaneBufferGeometry( window.innerWidth, window.innerHeight ), this.postprocessing.materialBokeh );
		this.postprocessing.quad.position.z = - 500;
		this.postprocessing.scene.add( this.postprocessing.quad );

	}

};

CinematicCamera.prototype.renderCinematic = function ( scene, renderer ) {

	if ( this.postprocessing.enabled ) {

		renderer.clear();

		// Render scene into texture

		scene.overrideMaterial = null;
		renderer.render( scene, camera, this.postprocessing.rtTextureColor, true );

		// Render depth into texture

		scene.overrideMaterial = this.material_depth;
		renderer.render( scene, camera, this.postprocessing.rtTextureDepth, true );

		// Render bokeh composite

		renderer.render( this.postprocessing.scene, this.postprocessing.camera );

	}

};

export { CinematicCamera }
