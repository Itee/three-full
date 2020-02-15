//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './../math/Vector3';
import { Color } from './../math/Color';
export class Face3 {
	constructor(
		a: number,
		b: number,
		c: number,
		normal?: Vector3,
		color?: Color,
		materialIndex?: number
	);
	constructor(
		a: number,
		b: number,
		c: number,
		normal?: Vector3,
		vertexColors?: Color[],
		materialIndex?: number
	);
	constructor(
		a: number,
		b: number,
		c: number,
		vertexNormals?: Vector3[],
		color?: Color,
		materialIndex?: number
	);
	constructor(
		a: number,
		b: number,
		c: number,
		vertexNormals?: Vector3[],
		vertexColors?: Color[],
		materialIndex?: number
	);
	a: number;
	b: number;
	c: number;
	normal: Vector3;
	vertexNormals: Vector3[];
	color: Color;
	vertexColors: Color[];
	materialIndex: number;

	clone(): this;
	copy( source: Face3 ): this;

}
