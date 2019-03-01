//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AudioAnalyser( audio, fftSize ) {

	this.analyser = audio.context.createAnalyser();
	this.analyser.fftSize = fftSize !== undefined ? fftSize : 2048;

	this.data = new Uint8Array( this.analyser.frequencyBinCount );

	audio.getOutput().connect( this.analyser );

}

Object.assign( AudioAnalyser.prototype, {

	getFrequencyData: function () {

		this.analyser.getByteFrequencyData( this.data );

		return this.data;

	},

	getAverageFrequency: function () {

		var value = 0, data = this.getFrequencyData();

		for ( var i = 0; i < data.length; i ++ ) {

			value += data[ i ];

		}

		return value / data.length;

	}

} );

export { AudioAnalyser }
