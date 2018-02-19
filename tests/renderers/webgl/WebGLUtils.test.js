var Three = (function (exports) {
	'use strict';

	var AddEquation = 100;
	var SubtractEquation = 101;
	var ReverseSubtractEquation = 102;
	var MinEquation = 103;
	var MaxEquation = 104;
	var ZeroFactor = 200;
	var OneFactor = 201;
	var SrcColorFactor = 202;
	var OneMinusSrcColorFactor = 203;
	var SrcAlphaFactor = 204;
	var OneMinusSrcAlphaFactor = 205;
	var DstAlphaFactor = 206;
	var OneMinusDstAlphaFactor = 207;
	var DstColorFactor = 208;
	var OneMinusDstColorFactor = 209;
	var SrcAlphaSaturateFactor = 210;
	var RepeatWrapping = 1000;
	var ClampToEdgeWrapping = 1001;
	var MirroredRepeatWrapping = 1002;
	var NearestFilter = 1003;
	var NearestMipMapNearestFilter = 1004;
	var NearestMipMapLinearFilter = 1005;
	var LinearFilter = 1006;
	var LinearMipMapNearestFilter = 1007;
	var LinearMipMapLinearFilter = 1008;
	var UnsignedByteType = 1009;
	var ByteType = 1010;
	var ShortType = 1011;
	var UnsignedShortType = 1012;
	var IntType = 1013;
	var UnsignedIntType = 1014;
	var FloatType = 1015;
	var HalfFloatType = 1016;
	var UnsignedShort4444Type = 1017;
	var UnsignedShort5551Type = 1018;
	var UnsignedShort565Type = 1019;
	var UnsignedInt248Type = 1020;
	var AlphaFormat = 1021;
	var RGBFormat = 1022;
	var RGBAFormat = 1023;
	var LuminanceFormat = 1024;
	var LuminanceAlphaFormat = 1025;
	var DepthFormat = 1026;
	var DepthStencilFormat = 1027;
	var RGB_S3TC_DXT1_Format = 33776;
	var RGBA_S3TC_DXT1_Format = 33777;
	var RGBA_S3TC_DXT3_Format = 33778;
	var RGBA_S3TC_DXT5_Format = 33779;
	var RGB_PVRTC_4BPPV1_Format = 35840;
	var RGB_PVRTC_2BPPV1_Format = 35841;
	var RGBA_PVRTC_4BPPV1_Format = 35842;
	var RGBA_PVRTC_2BPPV1_Format = 35843;
	var RGB_ETC1_Format = 36196;
	var RGBA_ASTC_4x4_Format = 37808;
	var RGBA_ASTC_5x4_Format = 37809;
	var RGBA_ASTC_5x5_Format = 37810;
	var RGBA_ASTC_6x5_Format = 37811;
	var RGBA_ASTC_6x6_Format = 37812;
	var RGBA_ASTC_8x5_Format = 37813;
	var RGBA_ASTC_8x6_Format = 37814;
	var RGBA_ASTC_8x8_Format = 37815;
	var RGBA_ASTC_10x5_Format = 37816;
	var RGBA_ASTC_10x6_Format = 37817;
	var RGBA_ASTC_10x8_Format = 37818;
	var RGBA_ASTC_10x10_Format = 37819;
	var RGBA_ASTC_12x10_Format = 37820;
	var RGBA_ASTC_12x12_Format = 37821;

	function WebGLUtils( gl, extensions ) {

		function convert( p ) {

			var extension;

			if ( p === RepeatWrapping ) return gl.REPEAT;
			if ( p === ClampToEdgeWrapping ) return gl.CLAMP_TO_EDGE;
			if ( p === MirroredRepeatWrapping ) return gl.MIRRORED_REPEAT;

			if ( p === NearestFilter ) return gl.NEAREST;
			if ( p === NearestMipMapNearestFilter ) return gl.NEAREST_MIPMAP_NEAREST;
			if ( p === NearestMipMapLinearFilter ) return gl.NEAREST_MIPMAP_LINEAR;

			if ( p === LinearFilter ) return gl.LINEAR;
			if ( p === LinearMipMapNearestFilter ) return gl.LINEAR_MIPMAP_NEAREST;
			if ( p === LinearMipMapLinearFilter ) return gl.LINEAR_MIPMAP_LINEAR;

			if ( p === UnsignedByteType ) return gl.UNSIGNED_BYTE;
			if ( p === UnsignedShort4444Type ) return gl.UNSIGNED_SHORT_4_4_4_4;
			if ( p === UnsignedShort5551Type ) return gl.UNSIGNED_SHORT_5_5_5_1;
			if ( p === UnsignedShort565Type ) return gl.UNSIGNED_SHORT_5_6_5;

			if ( p === ByteType ) return gl.BYTE;
			if ( p === ShortType ) return gl.SHORT;
			if ( p === UnsignedShortType ) return gl.UNSIGNED_SHORT;
			if ( p === IntType ) return gl.INT;
			if ( p === UnsignedIntType ) return gl.UNSIGNED_INT;
			if ( p === FloatType ) return gl.FLOAT;

			if ( p === HalfFloatType ) {

				extension = extensions.get( 'OES_texture_half_float' );

				if ( extension !== null ) return extension.HALF_FLOAT_OES;

			}

			if ( p === AlphaFormat ) return gl.ALPHA;
			if ( p === RGBFormat ) return gl.RGB;
			if ( p === RGBAFormat ) return gl.RGBA;
			if ( p === LuminanceFormat ) return gl.LUMINANCE;
			if ( p === LuminanceAlphaFormat ) return gl.LUMINANCE_ALPHA;
			if ( p === DepthFormat ) return gl.DEPTH_COMPONENT;
			if ( p === DepthStencilFormat ) return gl.DEPTH_STENCIL;

			if ( p === AddEquation ) return gl.FUNC_ADD;
			if ( p === SubtractEquation ) return gl.FUNC_SUBTRACT;
			if ( p === ReverseSubtractEquation ) return gl.FUNC_REVERSE_SUBTRACT;

			if ( p === ZeroFactor ) return gl.ZERO;
			if ( p === OneFactor ) return gl.ONE;
			if ( p === SrcColorFactor ) return gl.SRC_COLOR;
			if ( p === OneMinusSrcColorFactor ) return gl.ONE_MINUS_SRC_COLOR;
			if ( p === SrcAlphaFactor ) return gl.SRC_ALPHA;
			if ( p === OneMinusSrcAlphaFactor ) return gl.ONE_MINUS_SRC_ALPHA;
			if ( p === DstAlphaFactor ) return gl.DST_ALPHA;
			if ( p === OneMinusDstAlphaFactor ) return gl.ONE_MINUS_DST_ALPHA;

			if ( p === DstColorFactor ) return gl.DST_COLOR;
			if ( p === OneMinusDstColorFactor ) return gl.ONE_MINUS_DST_COLOR;
			if ( p === SrcAlphaSaturateFactor ) return gl.SRC_ALPHA_SATURATE;

			if ( p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format ||
				p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_s3tc' );

				if ( extension !== null ) {

					if ( p === RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
					if ( p === RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
					if ( p === RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
					if ( p === RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

				}

			}

			if ( p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format ||
				p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_pvrtc' );

				if ( extension !== null ) {

					if ( p === RGB_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
					if ( p === RGB_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
					if ( p === RGBA_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
					if ( p === RGBA_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

				}

			}

			if ( p === RGB_ETC1_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_etc1' );

				if ( extension !== null ) return extension.COMPRESSED_RGB_ETC1_WEBGL;

			}

			if ( p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format ||
				p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format ||
				p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format ||
				p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format ||
				p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_astc' );

				if ( extension !== null ) {

					return p;

				}

			}

			if ( p === MinEquation || p === MaxEquation ) {

				extension = extensions.get( 'EXT_blend_minmax' );

				if ( extension !== null ) {

					if ( p === MinEquation ) return extension.MIN_EXT;
					if ( p === MaxEquation ) return extension.MAX_EXT;

				}

			}

			if ( p === UnsignedInt248Type ) {

				extension = extensions.get( 'WEBGL_depth_texture' );

				if ( extension !== null ) return extension.UNSIGNED_INT_24_8_WEBGL;

			}

			return 0;

		}

		return { convert: convert };

	}

	exports.WebGLUtils = WebGLUtils;

	return exports;

}({}));
