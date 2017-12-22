var Three = (function (exports) {
	'use strict';

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var context;

	var AudioContext = {

		getContext: function () {

			if ( context === undefined ) {

				context = new ( window.AudioContext || window.webkitAudioContext )();

			}

			return context;

		},

		setContext: function ( value ) {

			context = value;

		}

	};

	exports.AudioContext = AudioContext;

	return exports;

}({}));
