//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Scene } from './../../scenes/Scene';
import { Camera } from './../../cameras/Camera';
import { WebGLRenderer } from '../WebGLRenderer';
import { ShadowMapType } from '../../constants';

export class WebGLShadowMap {

	constructor(
		_renderer: WebGLRenderer,
		_objects: any[],
		maxTextureSize: number
	);

	enabled: boolean;
	autoUpdate: boolean;
	needsUpdate: boolean;
	type: ShadowMapType;

	render( scene: Scene, camera: Camera ): void;
	cullFace: any;

}
