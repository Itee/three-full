import { FileLoader } from '../loaders/FileLoader.js'

/**
 * @author mrdoob / http://mrdoob.com/
 * @author zz85 / http://joshuakoo.com/
 */

var SVGLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

};

SVGLoader.prototype = {

	constructor: SVGLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var parser = new DOMParser();

		var loader = new FileLoader( scope.manager );
		loader.load( url, function ( svgString ) {

			var doc = parser.parseFromString( svgString, 'image/svg+xml' ); // application/xml

			onLoad( doc.documentElement );

		}, onProgress, onError );

	}

};

export { SVGLoader }
