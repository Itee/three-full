//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Group } from '../../objects/Group.js'
import { Matrix4 } from '../../math/Matrix4.js'
import { Vector2 } from '../../math/Vector2.js'
import { Vector3 } from '../../math/Vector3.js'
import { Vector4 } from '../../math/Vector4.js'
import { Quaternion } from '../../math/Quaternion.js'
import { ArrayCamera } from '../../cameras/ArrayCamera.js'
import { PerspectiveCamera } from '../../cameras/PerspectiveCamera.js'
import { WebGLAnimation } from '../webgl/WebGLAnimation.js'
import { setProjectionFromUnion } from './WebVRUtils.js'
function WebVRManager( renderer ) {

	var scope = this;

	var device = null;
	var frameData = null;

	var poseTarget = null;

	var controllers = [];
	var standingMatrix = new Matrix4();
	var standingMatrixInverse = new Matrix4();

	var framebufferScaleFactor = 1.0;

	var frameOfReferenceType = 'stage';

	if ( typeof window !== 'undefined' && 'VRFrameData' in window ) {

		frameData = new window.VRFrameData();
		window.addEventListener( 'vrdisplaypresentchange', onVRDisplayPresentChange, false );

	}

	var matrixWorldInverse = new Matrix4();
	var tempQuaternion = new Quaternion();
	var tempPosition = new Vector3();

	var cameraL = new PerspectiveCamera();
	cameraL.bounds = new Vector4( 0.0, 0.0, 0.5, 1.0 );
	cameraL.layers.enable( 1 );

	var cameraR = new PerspectiveCamera();
	cameraR.bounds = new Vector4( 0.5, 0.0, 0.5, 1.0 );
	cameraR.layers.enable( 2 );

	var cameraVR = new ArrayCamera( [ cameraL, cameraR ] );
	cameraVR.layers.enable( 1 );
	cameraVR.layers.enable( 2 );

	//

	function isPresenting() {

		return device !== null && device.isPresenting === true;

	}

	var currentSize = new Vector2(), currentPixelRatio;

	function onVRDisplayPresentChange() {

		if ( isPresenting() ) {

			var eyeParameters = device.getEyeParameters( 'left' );
			var renderWidth = eyeParameters.renderWidth * framebufferScaleFactor;
			var renderHeight = eyeParameters.renderHeight * framebufferScaleFactor;

			currentPixelRatio = renderer.getPixelRatio();
			renderer.getSize( currentSize );

			renderer.setDrawingBufferSize( renderWidth * 2, renderHeight, 1 );

			animation.start();

		} else {

			if ( scope.enabled ) {

				renderer.setDrawingBufferSize( currentSize.width, currentSize.height, currentPixelRatio );

			}

			animation.stop();

		}

	}

	//

	var triggers = [];

	function findGamepad( id ) {

		var gamepads = navigator.getGamepads && navigator.getGamepads();

		for ( var i = 0, j = 0, l = gamepads.length; i < l; i ++ ) {

			var gamepad = gamepads[ i ];

			if ( gamepad && ( gamepad.id === 'Daydream Controller' ||
				gamepad.id === 'Gear VR Controller' || gamepad.id === 'Oculus Go Controller' ||
				gamepad.id === 'OpenVR Gamepad' || gamepad.id.startsWith( 'Oculus Touch' ) ||
				gamepad.id.startsWith( 'Spatial Controller' ) ) ) {

				if ( j === id ) return gamepad;

				j ++;

			}

		}

	}

	function updateControllers() {

		for ( var i = 0; i < controllers.length; i ++ ) {

			var controller = controllers[ i ];

			var gamepad = findGamepad( i );

			if ( gamepad !== undefined && gamepad.pose !== undefined ) {

				if ( gamepad.pose === null ) return;

				//  Pose

				var pose = gamepad.pose;

				if ( pose.hasPosition === false ) controller.position.set( 0.2, - 0.6, - 0.05 );

				if ( pose.position !== null ) controller.position.fromArray( pose.position );
				if ( pose.orientation !== null ) controller.quaternion.fromArray( pose.orientation );
				controller.matrix.compose( controller.position, controller.quaternion, controller.scale );
				controller.matrix.premultiply( standingMatrix );
				controller.matrix.decompose( controller.position, controller.quaternion, controller.scale );
				controller.matrixWorldNeedsUpdate = true;
				controller.visible = true;

				//  Trigger

				var buttonId = gamepad.id === 'Daydream Controller' ? 0 : 1;

				if ( triggers[ i ] !== gamepad.buttons[ buttonId ].pressed ) {

					triggers[ i ] = gamepad.buttons[ buttonId ].pressed;

					if ( triggers[ i ] === true ) {

						controller.dispatchEvent( { type: 'selectstart' } );

					} else {

						controller.dispatchEvent( { type: 'selectend' } );
						controller.dispatchEvent( { type: 'select' } );

					}

				}

			} else {

				controller.visible = false;

			}

		}

	}

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

	this.getDevice = function () {

		return device;

	};

	this.setDevice = function ( value ) {

		if ( value !== undefined ) device = value;

		animation.setContext( value );

	};

	this.setFramebufferScaleFactor = function ( value ) {

		framebufferScaleFactor = value;

	};

	this.setFrameOfReferenceType = function ( value ) {

		frameOfReferenceType = value;

	};

	this.setPoseTarget = function ( object ) {

		if ( object !== undefined ) poseTarget = object;

	};

	this.getCamera = function ( camera ) {

		var userHeight = frameOfReferenceType === 'stage' ? 1.6 : 0;

		if ( isPresenting() === false ) {

			camera.position.set( 0, userHeight, 0 );
			camera.rotation.set( 0, 0, 0 );

			return camera;

		}

		device.depthNear = camera.near;
		device.depthFar = camera.far;

		device.getFrameData( frameData );

		//

		if ( frameOfReferenceType === 'stage' ) {

			var stageParameters = device.stageParameters;

			if ( stageParameters ) {

				standingMatrix.fromArray( stageParameters.sittingToStandingTransform );

			} else {

				standingMatrix.makeTranslation( 0, userHeight, 0 );

			}

		}
		var pose = frameData.pose;
		var poseObject = poseTarget !== null ? poseTarget : camera;

		// We want to manipulate poseObject by its position and quaternion components since users may rely on them.
		poseObject.matrix.copy( standingMatrix );
		poseObject.matrix.decompose( poseObject.position, poseObject.quaternion, poseObject.scale );

		if ( pose.orientation !== null ) {

			tempQuaternion.fromArray( pose.orientation );
			poseObject.quaternion.multiply( tempQuaternion );

		}

		if ( pose.position !== null ) {

			tempQuaternion.setFromRotationMatrix( standingMatrix );
			tempPosition.fromArray( pose.position );
			tempPosition.applyQuaternion( tempQuaternion );
			poseObject.position.add( tempPosition );

		}

		poseObject.updateMatrixWorld();

		//

		cameraL.near = camera.near;
		cameraR.near = camera.near;

		cameraL.far = camera.far;
		cameraR.far = camera.far;

		cameraL.matrixWorldInverse.fromArray( frameData.leftViewMatrix );
		cameraR.matrixWorldInverse.fromArray( frameData.rightViewMatrix );

		// TODO (mrdoob) Double check this code

		standingMatrixInverse.getInverse( standingMatrix );

		if ( frameOfReferenceType === 'stage' ) {

			cameraL.matrixWorldInverse.multiply( standingMatrixInverse );
			cameraR.matrixWorldInverse.multiply( standingMatrixInverse );

		}

		var parent = poseObject.parent;

		if ( parent !== null ) {

			matrixWorldInverse.getInverse( parent.matrixWorld );

			cameraL.matrixWorldInverse.multiply( matrixWorldInverse );
			cameraR.matrixWorldInverse.multiply( matrixWorldInverse );

		}

		// envMap and Mirror needs camera.matrixWorld

		cameraL.matrixWorld.getInverse( cameraL.matrixWorldInverse );
		cameraR.matrixWorld.getInverse( cameraR.matrixWorldInverse );

		cameraL.projectionMatrix.fromArray( frameData.leftProjectionMatrix );
		cameraR.projectionMatrix.fromArray( frameData.rightProjectionMatrix );

		setProjectionFromUnion( cameraVR, cameraL, cameraR );

		//

		var layers = device.getLayers();

		if ( layers.length ) {

			var layer = layers[ 0 ];

			if ( layer.leftBounds !== null && layer.leftBounds.length === 4 ) {

				cameraL.bounds.fromArray( layer.leftBounds );

			}

			if ( layer.rightBounds !== null && layer.rightBounds.length === 4 ) {

				cameraR.bounds.fromArray( layer.rightBounds );

			}

		}

		updateControllers();

		return cameraVR;

	};

	this.getStandingMatrix = function () {

		return standingMatrix;

	};

	this.isPresenting = isPresenting;

	// Animation Loop

	var animation = new WebGLAnimation();

	this.setAnimationLoop = function ( callback ) {

		animation.setAnimationLoop( callback );

	};

	this.submitFrame = function () {

		if ( isPresenting() ) device.submitFrame();

	};

	this.dispose = function () {

		if ( typeof window !== 'undefined' ) {

			window.removeEventListener( 'vrdisplaypresentchange', onVRDisplayPresentChange );

		}

	};

}

;

export { WebVRManager }
