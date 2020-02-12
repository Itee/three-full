//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

export { AudioContext }
