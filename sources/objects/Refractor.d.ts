//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Mesh,
	BufferGeometry,
	Color,
	WebGLRenderTarget
} from '../../../src/Three';

export interface RefractorOptions {
	color?: Color;
	textureWidth?: number;
	textureHeight?: number;
	clipBias?: number;
	shader?: object;
}

export class Refractor extends Mesh {

	constructor( geometry?: BufferGeometry, options?: RefractorOptions );

	getRenderTarget(): WebGLRenderTarget;

}
