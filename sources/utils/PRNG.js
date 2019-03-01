//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Park-Miller-Carta Pseudo-Random Number Generator
// https://github.com/pnitsch/BitmapData.js/blob/master/js/BitmapData.js

var PRNG = function () {

	this.seed = 1;
	this.next = function() {

		return ( this.gen() / 2147483647 );

	};
	this.nextRange = function( min, max )	{

		return min + ( ( max - min ) * this.next() )

	};
	this.gen = function() {

		return this.seed = ( this.seed * 16807 ) % 2147483647;

	};

};

export { PRNG }
