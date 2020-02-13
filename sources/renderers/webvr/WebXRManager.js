//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { EventDispatcher } from '../../core/EventDispatcher.js'
import { Group } from '../../objects/Group.js'
import { Matrix4 } from '../../math/Matrix4.js'
import { Vector4 } from '../../math/Vector4.js'
import { ArrayCamera } from '../../cameras/ArrayCamera.js'
import { PerspectiveCamera } from '../../cameras/PerspectiveCamera.js'
import { WebGLAnimation } from '../webgl/WebGLAnimation.js'
import { setProjectionFromUnion } from './WebVRUtils.js'

/**
 * @author mrdoob / http://mrdoob.com/
 */
function WebXRManager( renderer, gl ) {

	var scope = this;

	var session = null;

	// var framebufferScaleFactor = 1.0;

	var referenceSpace = null;
	var referenceSpaceType = 'local-floor';

	var pose = null;

	var controllers = [];
	var sortedInputSources = [];

	function isPresenting() {

		return session !== null && referenceSpace !== null;

	}

	//

	var cameraL = new PerspectiveCamera();
	cameraL.layers.enable( 1 );
	cameraL.viewport = new Vector4();

	var cameraR = new PerspectiveCamera();
	cameraR.layers.enable( 2 );
	cameraR.viewport = new Vector4();

	var cameraVR = new ArrayCamera( [ cameraL, cameraR ] );
	cameraVR.layers.enable( 1 );
	cameraVR.layers.enable( 2 );

	//

	this.enabled = false;

	this.getController = function ( id ) {

		var controller = controllers[ id ];

		if ( controller === undefined ) {

			controller = new Group();
			controller.matrixAutoUpdate = false;
			controller.visible = false;

			controllers[ id ] = controller;

		}

		return controller;

	};

	//

	function onSessionEvent( event ) {

		for ( var i = 0; i < controllers.length; i ++ ) {

			if ( sortedInputSources[ i ] === event.inputSource ) {

				controllers[ i ].dispatchEvent( { type: event.type } );

			}

		}

	}

	function onSessionEnd() {

		renderer.setFramebuffer( null );
		renderer.setRenderTarget( renderer.getRenderTarget() ); // Hack #15830
		animation.stop();

		scope.dispatchEvent( { type: 'sessionend' } );

	}

	function onRequestReferenceSpace( value ) {

		referenceSpace = value;

		animation.setContext( session );
		animation.start();

		scope.dispatchEvent( { type: 'sessionstart' } );

	}

	this.setFramebufferScaleFactor = function ( /* value */ ) {

		// framebufferScaleFactor = value;

	};

	this.setReferenceSpaceType = function ( value ) {

		referenceSpaceType = value;

	};

	this.getSession = function () {

		return session;

	};

	this.setSession = function ( value ) {

		session = value;

		if ( session !== null ) {

			session.addEventListener( 'select', onSessionEvent );
			session.addEventListener( 'selectstart', onSessionEvent );
			session.addEventListener( 'selectend', onSessionEvent );
			session.addEventListener( 'squeeze', onSessionEvent );
			session.addEventListener( 'squeezestart', onSessionEvent );
			session.addEventListener( 'squeezeend', onSessionEvent );
			session.addEventListener( 'end', onSessionEnd );

			// eslint-disable-next-line no-undef
			session.updateRenderState( { baseLayer: new XRWebGLLayer( session, gl ) } );

			session.requestReferenceSpace( referenceSpaceType ).then( onRequestReferenceSpace );

			//

			session.addEventListener( 'inputsourceschange', updateInputSources );

			updateInputSources();

		}

	};

	function updateInputSources() {

		for ( var i = 0; i < controllers.length; i ++ ) {

			sortedInputSources[ i ] = findInputSource( i );

		}

	}

	function findInputSource( id ) {

		var inputSources = session.inputSources;

		for ( var i = 0; i < inputSources.length; i ++ ) {

			var inputSource = inputSources[ i ];
			var handedness = inputSource.handedness;

			if ( id === 0 && ( handedness === 'none' || handedness === 'right' ) ) return inputSource;
			if ( id === 1 && ( handedness === 'left' ) ) return inputSource;

		}

	}

	//

	function updateCamera( camera, parent ) {

		if ( parent === null ) {

			camera.matrixWorld.copy( camera.matrix );

		} else {

			camera.matrixWorld.multiplyMatrices( parent.matrixWorld, camera.matrix );

		}

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

	}

	this.getCamera = function ( camera ) {

		var parent = camera.parent;
		var cameras = cameraVR.cameras;

		updateCamera( cameraVR, parent );

		for ( var i = 0; i < cameras.length; i ++ ) {

			updateCamera( cameras[ i ], parent );

		}

		// update camera and its children

		camera.matrixWorld.copy( cameraVR.matrixWorld );

		var children = camera.children;

		for ( var i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].updateMatrixWorld( true );

		}

		setProjectionFromUnion( cameraVR, cameraL, cameraR );

		return cameraVR;

	};

	this.isPresenting = isPresenting;

	// Animation Loop

	var onAnimationFrameCallback = null;

	function onAnimationFrame( time, frame ) {

		pose = frame.getViewerPose( referenceSpace );

		if ( pose !== null ) {

			var views = pose.views;
			var baseLayer = session.renderState.baseLayer;

			renderer.setFramebuffer( baseLayer.framebuffer );

			for ( var i = 0; i < views.length; i ++ ) {

				var view = views[ i ];
				var viewport = baseLayer.getViewport( view );
				var viewMatrix = view.transform.inverse.matrix;

				var camera = cameraVR.cameras[ i ];
				camera.matrix.fromArray( viewMatrix ).getInverse( camera.matrix );
				camera.projectionMatrix.fromArray( view.projectionMatrix );
				camera.viewport.set( viewport.x, viewport.y, viewport.width, viewport.height );

				if ( i === 0 ) {

					cameraVR.matrix.copy( camera.matrix );

				}

			}

		}

		//

		for ( var i = 0; i < controllers.length; i ++ ) {

			var controller = controllers[ i ];

			var inputSource = sortedInputSources[ i ];

			if ( inputSource ) {

				var inputPose = frame.getPose( inputSource.targetRaySpace, referenceSpace );

				if ( inputPose !== null ) {

					controller.matrix.fromArray( inputPose.transform.matrix );
					controller.matrix.decompose( controller.position, controller.rotation, controller.scale );
					controller.visible = true;

					continue;

				}

			}

			controller.visible = false;

		}

		if ( onAnimationFrameCallback ) onAnimationFrameCallback( time );

	}

	var animation = new WebGLAnimation();
	animation.setAnimationLoop( onAnimationFrame );

	this.setAnimationLoop = function ( callback ) {

		onAnimationFrameCallback = callback;

	};

	this.dispose = function () {};

	// DEPRECATED

	this.getStandingMatrix = function () {

		console.warn( 'WebXRManager: getStandingMatrix() is no longer needed.' );
		return new Matrix4();

	};

	this.getDevice = function () {

		console.warn( 'WebXRManager: getDevice() has been deprecated.' );

	};

	this.setDevice = function () {

		console.warn( 'WebXRManager: setDevice() has been deprecated.' );

	};

	this.setFrameOfReferenceType = function () {

		console.warn( 'WebXRManager: setFrameOfReferenceType() has been deprecated.' );

	};

	this.submitFrame = function () {};

}

Object.assign( WebXRManager.prototype, EventDispatcher.prototype );

export { WebXRManager }
