//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	LoadingManager,
	CompressedTextureLoader,
	CompressedPixelFormat
} from '../../../src/Three';

export interface PVR {
	mipmaps: object[];
	width: number;
	height: number;
	format: CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export class PVRLoader extends CompressedTextureLoader {

	constructor( manager?: LoadingManager );

	parse( buffer: ArrayBuffer, loadMipmaps: boolean ): PVR;

}
