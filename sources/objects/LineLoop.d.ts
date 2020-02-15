//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Line } from './Line';
import { Geometry } from './../core/Geometry';
import { Material } from './../materials/Material';
import { BufferGeometry } from '../core/BufferGeometry';

export class LineLoop extends Line {

	constructor(
		geometry?: Geometry | BufferGeometry,
		material?: Material | Material[]
	);

	type: 'LineLoop';
	readonly isLineLoop: true;

}
