//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AudioContext } from '../audio/AudioContext.js'
import { FileLoader } from './FileLoader.js'
import { DefaultLoadingManager } from './LoadingManager.js'
function AudioLoader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

}

Object.assign( AudioLoader.prototype, {

	load: function ( url, onLoad, onProgress, onError ) {

		var loader = new FileLoader( this.manager );
		loader.setResponseType( 'arraybuffer' );
		loader.setPath( this.path );
		loader.load( url, function ( buffer ) {

			// Create a copy of the buffer. The `decodeAudioData` method
			// detaches the buffer when complete, preventing reuse.
			var bufferCopy = buffer.slice( 0 );

			var context = AudioContext.getContext();
			context.decodeAudioData( bufferCopy, function ( audioBuffer ) {

				onLoad( audioBuffer );

			} );

		}, onProgress, onError );

	},

	setPath: function ( value ) {

		this.path = value;
		return this;

	}

} );

export { AudioLoader }
