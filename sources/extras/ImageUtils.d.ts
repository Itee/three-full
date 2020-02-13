//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Mapping } from '../constants';
import { Texture } from '../textures/Texture';

export namespace ImageUtils {

	export function getDataURL(
		image: any,
	): string;
	export let crossOrigin: string;
	export function loadTexture(
		url: string,
		mapping?: Mapping,
		onLoad?: ( texture: Texture ) => void,
		onError?: ( message: string ) => void
	): Texture;
	export function loadTextureCube(
		array: string[],
		mapping?: Mapping,
		onLoad?: ( texture: Texture ) => void,
		onError?: ( message: string ) => void
	): Texture;
}
