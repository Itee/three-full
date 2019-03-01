//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from '../core/Geometry.js'
import { ExtrudeBufferGeometry } from './ExtrudeGeometry.js'
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
