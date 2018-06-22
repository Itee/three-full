import { Scene } from '../scenes/Scene.js'
import { Raycaster } from '../core/Raycaster.js'
import { Vector2 } from '../math/Vector2.js'



var InteractiveScene = function () {

	Scene.call( this );

	var raycaster = new Raycaster();

	// Camera

	var camera = null;

	this.setCamera = function ( value ) {

		camera = value;

	};

	// Pointer Events

	var element = null;
	var pointer = new Vector2();

	function transformPointer( event ) {

		var rect = element.getBoundingClientRect();

		pointer.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		pointer.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		raycaster.setFromCamera( pointer, camera );

	}

	function onPointerMove( event ) {

		event.preventDefault();
		transformPointer( event );

	}

	function onPointerDown( event ) {

		transformPointer( event );

	}

	function onPointerUp( event ) {

		transformPointer( event );

	}

	this.listenPointerEvents = function ( dom ) {

		element = dom;

		element.addEventListener( 'pointermove', onPointerMove, false );
		element.addEventListener( 'pointerdown', onPointerDown, false );
		element.addEventListener( 'pointerup', onPointerUp, false );
		// element.addEventListener( 'pointercancel', onPointerUp, false );
		// element.addEventListener( 'pointerout', onPointerUp, false );

	};

	

};

InteractiveScene.prototype = Object.create( Scene.prototype );
InteractiveScene.prototype.constructor = InteractiveScene;
InteractiveScene.prototype.isInteractiveScene = true;

export { InteractiveScene }
