//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from './../core/Geometry';
import { Material } from './../materials/Material';
import { Line } from './Line';
import { BufferGeometry } from '../core/BufferGeometry';
export const LineStrip: number;

export const LinePieces: number;

export class LineSegments extends Line {

	constructor(
		geometry?: Geometry | BufferGeometry,
		material?: Material | Material[],
		mode?: number
	);

	type: 'LineSegments';
	readonly isLineSegments: true;

}
