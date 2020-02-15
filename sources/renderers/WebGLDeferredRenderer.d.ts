//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Camera,
	Scene,
	WebGLRenderer
} from '../../../src/Three';

export interface WebGLDeferredRendererParameters {
	antialias?: boolean;
	cacheKeepAlive?: boolean;
	height?: number;
	renderer?: WebGLRenderer;
	width?: number;
}

export class WebGLDeferredRenderer {

	constructor( parameters: WebGLDeferredRendererParameters );
	domElement: HTMLElement;
	forwardRendering: boolean;
	renderer: WebGLRenderer;

	enableLightPrePass( enabled: boolean ): void;
	render( scene: Scene, camera: Camera ): void;
	setAntialias( enabled: boolean ): void;
	setSize( width: number, height: number ): void;

}
