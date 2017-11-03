import { Object3D } from '../core/Object3D.js'
import { Vector3 } from '../math/Vector3.js'
import { Matrix4 } from '../math/Matrix4.js'
import { REVISION } from '../constants.js'

/**
 * @author mrdoob / http://mrdoob.com/
 */

var CSS2DObject = function ( element ) {

	Object3D.call( this );

	this.element = element;
	this.element.style.position = 'absolute';

	this.addEventListener( 'removed', function ( event ) {

		if ( this.element.parentNode !== null ) {

			this.element.parentNode.removeChild( this.element );

		}

	} );

};

CSS2DObject.prototype = Object.create( Object3D.prototype );
CSS2DObject.prototype.constructor = CSS2DObject;

//

var CSS2DRenderer = function () {

	console.log( 'CSS2DRenderer', REVISION );

	var _width, _height;
	var _widthHalf, _heightHalf;

	var vector = new Vector3();
	var viewMatrix = new Matrix4();
	var viewProjectionMatrix = new Matrix4();

	var domElement = document.createElement( 'div' );
	domElement.style.overflow = 'hidden';

	this.domElement = domElement;

	this.setSize = function ( width, height ) {

		_width = width;
		_height = height;

		_widthHalf = _width / 2;
		_heightHalf = _height / 2;

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

	};

	var renderObject = function ( object, camera ) {

		if ( object instanceof CSS2DObject ) {

			vector.setFromMatrixPosition( object.matrixWorld );
			vector.applyMatrix4( viewProjectionMatrix );

			var element = object.element;
			var style = 'translate(-50%,-50%) translate(' + ( vector.x * _widthHalf + _widthHalf ) + 'px,' + ( - vector.y * _heightHalf + _heightHalf ) + 'px)';

			element.style.WebkitTransform = style;
			element.style.MozTransform = style;
			element.style.oTransform = style;
			element.style.transform = style;

			if ( element.parentNode !== domElement ) {

				domElement.appendChild( element );

			}

		}

		for ( var i = 0, l = object.children.length; i < l; i ++ ) {

			renderObject( object.children[ i ], camera );

		}

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		viewMatrix.copy( camera.matrixWorldInverse );
		viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, viewMatrix );

		renderObject( scene, camera );

	};

};

export {
	CSS2DObject,
	CSS2DRenderer
}
