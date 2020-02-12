//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from './../core/Geometry';
import { BufferGeometry } from './../core/BufferGeometry';

export class TorusBufferGeometry extends BufferGeometry {

	constructor(
		radius?: number,
		tube?: number,
		radialSegments?: number,
		tubularSegments?: number,
		arc?: number
	);

	parameters: {
		radius: number;
		tube: number;
		radialSegments: number;
		tubularSegments: number;
		arc: number;
	};

}

export class TorusGeometry extends Geometry {

	constructor(
		radius?: number,
		tube?: number,
		radialSegments?: number,
		tubularSegments?: number,
		arc?: number
	);

	parameters: {
		radius: number;
		tube: number;
		radialSegments: number;
		tubularSegments: number;
		arc: number;
	};

}
