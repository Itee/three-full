//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from '../core/Geometry.js'
import { PolyhedronBufferGeometry } from './PolyhedronGeometry.js'
// TetrahedronGeometry

function TetrahedronGeometry( radius, detail ) {

	Geometry.call( this );

	this.type = 'TetrahedronGeometry';

	this.parameters = {
		radius: radius,
		detail: detail
	};

	this.fromBufferGeometry( new TetrahedronBufferGeometry( radius, detail ) );
	this.mergeVertices();

}

TetrahedronGeometry.prototype = Object.create( Geometry.prototype );
TetrahedronGeometry.prototype.constructor = TetrahedronGeometry;

// TetrahedronBufferGeometry

function TetrahedronBufferGeometry( radius, detail ) {

	var vertices = [
		1, 1, 1, 	- 1, - 1, 1, 	- 1, 1, - 1, 	1, - 1, - 1
	];

	var indices = [
		2, 1, 0, 	0, 3, 2,	1, 3, 0,	2, 3, 1
	];

	PolyhedronBufferGeometry.call( this, vertices, indices, radius, detail );

	this.type = 'TetrahedronBufferGeometry';

	this.parameters = {
		radius: radius,
		detail: detail
	};

}

TetrahedronBufferGeometry.prototype = Object.create( PolyhedronBufferGeometry.prototype );
TetrahedronBufferGeometry.prototype.constructor = TetrahedronBufferGeometry;

export {
	TetrahedronGeometry,
	TetrahedronBufferGeometry
}
