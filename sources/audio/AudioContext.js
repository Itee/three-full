//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @author mrdoob / http://mrdoob.com/
 */

var _context;

var AudioContext = {

	getContext: function () {

		if ( _context === undefined ) {

			_context = new ( window.AudioContext || window.webkitAudioContext )();

		}

		return _context;

	},

	setContext: function ( value ) {

		_context = value;

	}

};

export { AudioContext }
