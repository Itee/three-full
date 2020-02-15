//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LineSegments2 } from './LineSegments2.js'
import { LineGeometry } from './LineGeometry.js'
import { LineMaterial } from './LineMaterial.js'

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */
var Line2 = function ( geometry, material ) {

	LineSegments2.call( this );

	this.type = 'Line2';

	this.geometry = geometry !== undefined ? geometry : new LineGeometry();
	this.material = material !== undefined ? material : new LineMaterial( { color: Math.random() * 0xffffff } );

};

Line2.prototype = Object.assign( Object.create( LineSegments2.prototype ), {

	constructor: Line2,

	isLine2: true

} );

export { Line2 }
