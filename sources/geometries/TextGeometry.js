//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from '../core/Geometry.js'
import { ExtrudeBufferGeometry } from './ExtrudeGeometry.js'

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author alteredq / http://alteredqualia.com/
 *
 * Text = 3D Text
 *
 * parameters = {
 *  font: <Font>, // font
 *
 *  size: <float>, // size of the text
 *  height: <float>, // thickness to extrude text
 *  curveSegments: <int>, // number of points on the curves
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into text bevel goes
 *  bevelSize: <float>, // how far from text outline (including bevelOffset) is bevel
 *  bevelOffset: <float> // how far from text outline does bevel start
 * }
 */
// TextGeometry

function TextGeometry( text, parameters ) {

	Geometry.call( this );

	this.type = 'TextGeometry';

	this.parameters = {
		text: text,
		parameters: parameters
	};

	this.fromBufferGeometry( new TextBufferGeometry( text, parameters ) );
	this.mergeVertices();

}

TextGeometry.prototype = Object.create( Geometry.prototype );
TextGeometry.prototype.constructor = TextGeometry;

// TextBufferGeometry

function TextBufferGeometry( text, parameters ) {

	parameters = parameters || {};

	var font = parameters.font;

	if ( ! ( font && font.isFont ) ) {

		console.error( 'TextGeometry: font parameter is not an instance of Font.' );
		return new Geometry();

	}

	var shapes = font.generateShapes( text, parameters.size );

	// translate parameters to ExtrudeGeometry API

	parameters.depth = parameters.height !== undefined ? parameters.height : 50;

	// defaults

	if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
	if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
	if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

	ExtrudeBufferGeometry.call( this, shapes, parameters );

	this.type = 'TextBufferGeometry';

}

TextBufferGeometry.prototype = Object.create( ExtrudeBufferGeometry.prototype );
TextBufferGeometry.prototype.constructor = TextBufferGeometry;

export {
	TextGeometry,
	TextBufferGeometry
}
