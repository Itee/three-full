//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Box3 } from '../math/Box3.js'
import { LineSegments } from '../objects/LineSegments.js'
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js'
import { BufferAttribute } from '../core/BufferAttribute.js'
import { BufferGeometry } from '../core/BufferGeometry.js'
function BoxHelper( object, color ) {

	this.object = object;

	if ( color === undefined ) color = 0xffff00;

	var indices = new Uint16Array( [ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ] );
	var positions = new Float32Array( 8 * 3 );

	var geometry = new BufferGeometry();
	geometry.setIndex( new BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new BufferAttribute( positions, 3 ) );

	LineSegments.call( this, geometry, new LineBasicMaterial( { color: color } ) );

	this.matrixAutoUpdate = false;

	this.update();

}

BoxHelper.prototype = Object.create( LineSegments.prototype );
BoxHelper.prototype.constructor = BoxHelper;

BoxHelper.prototype.update = ( function () {

	var box = new Box3();

	return function update( object ) {

		if ( object !== undefined ) {

			console.warn( 'BoxHelper: .update() has no longer arguments.' );

		}

		if ( this.object !== undefined ) {

			box.setFromObject( this.object );

		}

		if ( box.isEmpty() ) return;

		var min = box.min;
		var max = box.max;
		var position = this.geometry.attributes.position;
		var array = position.array;

		array[ 0 ] = max.x; array[ 1 ] = max.y; array[ 2 ] = max.z;
		array[ 3 ] = min.x; array[ 4 ] = max.y; array[ 5 ] = max.z;
		array[ 6 ] = min.x; array[ 7 ] = min.y; array[ 8 ] = max.z;
		array[ 9 ] = max.x; array[ 10 ] = min.y; array[ 11 ] = max.z;
		array[ 12 ] = max.x; array[ 13 ] = max.y; array[ 14 ] = min.z;
		array[ 15 ] = min.x; array[ 16 ] = max.y; array[ 17 ] = min.z;
		array[ 18 ] = min.x; array[ 19 ] = min.y; array[ 20 ] = min.z;
		array[ 21 ] = max.x; array[ 22 ] = min.y; array[ 23 ] = min.z;

		position.needsUpdate = true;

		this.geometry.computeBoundingSphere();

	};

} )();

BoxHelper.prototype.setFromObject = function ( object ) {

	this.object = object;
	this.update();

	return this;

};

BoxHelper.prototype.copy = function ( source ) {

	LineSegments.prototype.copy.call( this, source );

	this.object = source.object;

	return this;

};

BoxHelper.prototype.clone = function () {

	return new this.constructor().copy( this );

};

export { BoxHelper }
