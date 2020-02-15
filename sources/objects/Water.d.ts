//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	BufferGeometry,
	Color,
	Geometry,
	Mesh,
	Side,
	Texture,
	Vector3
} from '../../../src/Three';

export interface WaterOptions {
	textureWidth?: number;
	textureHeight?: number;
	clipBias?: number;
	alpha?: number;
	time?: number;
	waterNormals?: Texture;
	sunDirection?: Vector3;
	sunColor?: Color | string | number;
	waterColor?: Color | string | number;
	eye?: Vector3;
	distortionScale?: number;
	side?: Side;
	fog?: boolean;
}

export class Water extends Mesh {

	constructor( geometry: Geometry | BufferGeometry, options: WaterOptions );

}
