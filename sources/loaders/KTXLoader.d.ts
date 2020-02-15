//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	LoadingManager,
	CompressedTextureLoader,
	PixelFormat,
	CompressedPixelFormat
} from '../../../src/Three';

export interface KTX {
	mipmaps: object[];
	width: number;
	height: number;
	format: PixelFormat | CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export class KTXLoader extends CompressedTextureLoader {

	constructor( manager?: LoadingManager );

	parse( buffer: ArrayBuffer, loadMipmaps: boolean ) : KTX;

}
