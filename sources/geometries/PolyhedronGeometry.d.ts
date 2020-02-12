//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Sphere } from './../math/Sphere';
import { Geometry } from './../core/Geometry';
import { BufferGeometry } from './../core/BufferGeometry';

export class PolyhedronBufferGeometry extends BufferGeometry {

	constructor(
		vertices: number[],
		indices: number[],
		radius?: number,
		detail?: number
	);

	parameters: {
		vertices: number[];
		indices: number[];
		radius: number;
		detail: number;
	};

}

export class PolyhedronGeometry extends Geometry {

	constructor(
		vertices: number[],
		indices: number[],
		radius?: number,
		detail?: number
	);

	parameters: {
		vertices: number[];
		indices: number[];
		radius: number;
		detail: number;
	};
	boundingSphere: Sphere;

}
