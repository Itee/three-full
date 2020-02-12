//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from './../core/Geometry';
import { BufferGeometry } from './../core/BufferGeometry';

export class PlaneBufferGeometry extends BufferGeometry {

	constructor(
		width?: number,
		height?: number,
		widthSegments?: number,
		heightSegments?: number
	);

	parameters: {
		width: number;
		height: number;
		widthSegments: number;
		heightSegments: number;
	};

}

export class PlaneGeometry extends Geometry {

	constructor(
		width?: number,
		height?: number,
		widthSegments?: number,
		heightSegments?: number
	);

	parameters: {
		width: number;
		height: number;
		widthSegments: number;
		heightSegments: number;
	};

}
