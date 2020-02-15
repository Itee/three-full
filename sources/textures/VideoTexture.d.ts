//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Texture } from './Texture';
import {
	Mapping,
	Wrapping,
	TextureFilter,
	PixelFormat,
	TextureDataType,
} from '../constants';

export class VideoTexture extends Texture {

	constructor(
		video: HTMLVideoElement,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		format?: PixelFormat,
		type?: TextureDataType,
		anisotropy?: number
	);

	readonly isVideoTexture: true;

}
