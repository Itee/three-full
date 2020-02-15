//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	CubeTexture,
	Loader,
	LoadingManager,
	TextureDataType
} from '../../../src/Three';

import { RGBELoader } from './RGBELoader';

export class HDRCubeTextureLoader extends Loader {

	constructor( manager?: LoadingManager );
	hdrLoader: RGBELoader;
	type: TextureDataType;

	load( urls: string[], onLoad: ( texture: CubeTexture ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ): void;
	setDataType( type: TextureDataType ): this;

}
