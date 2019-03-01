//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LineSegments } from '../objects/LineSegments.js'
import { VertexColors } from '../constants.js'
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js'
import { Float32BufferAttribute } from '../core/BufferAttribute.js'
import { BufferGeometry } from '../core/BufferGeometry.js'
import { Color } from '../math/Color.js'
function PolarGridHelper( radius, radials, circles, divisions, color1, color2 ) {

	radius = radius || 10;
	radials = radials || 16;
	circles = circles || 8;
	divisions = divisions || 64;
	color1 = new Color( color1 !== undefined ? color1 : 0x444444 );
	color2 = new Color( color2 !== undefined ? color2 : 0x888888 );

	var vertices = [];
	var colors = [];

	var x, z;
	var v, i, j, r, color;

	// create the radials

	for ( i = 0; i <= radials; i ++ ) {

		v = ( i / radials ) * ( Math.PI * 2 );

		x = Math.sin( v ) * radius;
		z = Math.cos( v ) * radius;

		vertices.push( 0, 0, 0 );
		vertices.push( x, 0, z );

		color = ( i & 1 ) ? color1 : color2;

		colors.push( color.r, color.g, color.b );
		colors.push( color.r, color.g, color.b );

	}

	// create the circles

	for ( i = 0; i <= circles; i ++ ) {

		color = ( i & 1 ) ? color1 : color2;

		r = radius - ( radius / circles * i );

		for ( j = 0; j < divisions; j ++ ) {

			// first vertex

			v = ( j / divisions ) * ( Math.PI * 2 );

			x = Math.sin( v ) * r;
			z = Math.cos( v ) * r;

			vertices.push( x, 0, z );
			colors.push( color.r, color.g, color.b );

			// second vertex

			v = ( ( j + 1 ) / divisions ) * ( Math.PI * 2 );

			x = Math.sin( v ) * r;
			z = Math.cos( v ) * r;

			vertices.push( x, 0, z );
			colors.push( color.r, color.g, color.b );

		}

	}

	var geometry = new BufferGeometry();
	geometry.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

	var material = new LineBasicMaterial( { vertexColors: VertexColors } );

	LineSegments.call( this, geometry, material );

}

PolarGridHelper.prototype = Object.create( LineSegments.prototype );
PolarGridHelper.prototype.constructor = PolarGridHelper;

export { PolarGridHelper }
