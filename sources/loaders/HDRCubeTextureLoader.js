//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { RGBELoader } from './RGBELoader.js'
import { CubeTexture } from '../textures/CubeTexture.js'
import { FileLoader } from './FileLoader.js'
import { DataTexture } from '../textures/DataTexture.js'
import {
	NearestFilter,
	LinearFilter,
	UnsignedByteType,
	FloatType,
	HalfFloatType,
	RGBFormat,
	RGBAFormat,
	LinearEncoding,
	RGBEEncoding
} from '../constants.js'
import { DefaultLoadingManager } from './LoadingManager.js'
var HDRCubeTextureLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
	// override in sub classes
	this.hdrLoader = new RGBELoader();

};

HDRCubeTextureLoader.prototype.load = function ( type, urls, onLoad, onProgress, onError ) {

	var RGBEByteToRGBFloat = function ( sourceArray, sourceOffset, destArray, destOffset ) {

		var e = sourceArray[ sourceOffset + 3 ];
		var scale = Math.pow( 2.0, e - 128.0 ) / 255.0;

		destArray[ destOffset + 0 ] = sourceArray[ sourceOffset + 0 ] * scale;
		destArray[ destOffset + 1 ] = sourceArray[ sourceOffset + 1 ] * scale;
		destArray[ destOffset + 2 ] = sourceArray[ sourceOffset + 2 ] * scale;

	};

	var RGBEByteToRGBHalf = ( function () {

		// Source: http://gamedev.stackexchange.com/questions/17326/conversion-of-a-number-from-single-precision-floating-point-representation-to-a/17410#17410

		var floatView = new Float32Array( 1 );
		var int32View = new Int32Array( floatView.buffer );
		function toHalf( val ) {

			floatView[ 0 ] = val;
			var x = int32View[ 0 ];

			var bits = ( x >> 16 ) & 0x8000; 
			var m = ( x >> 12 ) & 0x07ff; 
			var e = ( x >> 23 ) & 0xff; 
			if ( e < 103 ) return bits;
			if ( e > 142 ) {

				bits |= 0x7c00;
				
				bits |= ( ( e == 255 ) ? 0 : 1 ) && ( x & 0x007fffff );
				return bits;

			}
			if ( e < 113 ) {

				m |= 0x0800;
				
				bits |= ( m >> ( 114 - e ) ) + ( ( m >> ( 113 - e ) ) & 1 );
				return bits;

			}

			bits |= ( ( e - 112 ) << 10 ) | ( m >> 1 );
			
			bits += m & 1;
			return bits;

		}

		return function ( sourceArray, sourceOffset, destArray, destOffset ) {

			var e = sourceArray[ sourceOffset + 3 ];
			var scale = Math.pow( 2.0, e - 128.0 ) / 255.0;

			destArray[ destOffset + 0 ] = toHalf( sourceArray[ sourceOffset + 0 ] * scale );
			destArray[ destOffset + 1 ] = toHalf( sourceArray[ sourceOffset + 1 ] * scale );
			destArray[ destOffset + 2 ] = toHalf( sourceArray[ sourceOffset + 2 ] * scale );

		};

	} )();

	//

	var texture = new CubeTexture();

	texture.type = type;
	texture.encoding = ( type === UnsignedByteType ) ? RGBEEncoding : LinearEncoding;
	texture.format = ( type === UnsignedByteType ) ? RGBAFormat : RGBFormat;
	texture.minFilter = ( texture.encoding === RGBEEncoding ) ? NearestFilter : LinearFilter;
	texture.magFilter = ( texture.encoding === RGBEEncoding ) ? NearestFilter : LinearFilter;
	texture.generateMipmaps = ( texture.encoding !== RGBEEncoding );
	texture.anisotropy = 0;

	var scope = this;

	var loaded = 0;

	function loadHDRData( i, onLoad, onProgress, onError ) {

		var loader = new FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setResponseType( 'arraybuffer' );
		loader.load( urls[ i ], function ( buffer ) {

			loaded ++;

			var texData = scope.hdrLoader._parser( buffer );

			if ( ! texData ) return;

			if ( type === FloatType ) {

				var numElements = ( texData.data.length / 4 ) * 3;
				var floatdata = new Float32Array( numElements );

				for ( var j = 0; j < numElements; j ++ ) {

					RGBEByteToRGBFloat( texData.data, j * 4, floatdata, j * 3 );

				}

				texData.data = floatdata;

			} else if ( type === HalfFloatType ) {

				var numElements = ( texData.data.length / 4 ) * 3;
				var halfdata = new Uint16Array( numElements );

				for ( var j = 0; j < numElements; j ++ ) {

					RGBEByteToRGBHalf( texData.data, j * 4, halfdata, j * 3 );

				}

				texData.data = halfdata;

			}

			if ( texData.image !== undefined ) {

				texture[ i ].images = texData.image;

			} else if ( texData.data !== undefined ) {

				var dataTexture = new DataTexture( texData.data, texData.width, texData.height );
				dataTexture.format = texture.format;
				dataTexture.type = texture.type;
				dataTexture.encoding = texture.encoding;
				dataTexture.minFilter = texture.minFilter;
				dataTexture.magFilter = texture.magFilter;
				dataTexture.generateMipmaps = texture.generateMipmaps;

				texture.images[ i ] = dataTexture;

			}

			if ( loaded === 6 ) {

				texture.needsUpdate = true;
				if ( onLoad ) onLoad( texture );

			}

		}, onProgress, onError );

	}

	for ( var i = 0; i < urls.length; i ++ ) {

		loadHDRData( i, onLoad, onProgress, onError );

	}

	return texture;

};

HDRCubeTextureLoader.prototype.setPath = function ( value ) {

	this.path = value;
	return this;

};

export { HDRCubeTextureLoader }
