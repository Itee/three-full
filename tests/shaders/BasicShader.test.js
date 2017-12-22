var Three = (function (exports) {
	'use strict';

	/**
	 * @author mrdoob / http://www.mrdoob.com
	 *
	 * Simple test shader
	 */

	var BasicShader = {

		uniforms: {},

		vertexShader: [

			"void main() {",

				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"void main() {",

				"gl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );",

			"}"

		].join( "\n" )

	};

	exports.BasicShader = BasicShader;

	return exports;

}({}));
