//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './../math/Vector3';
import { Geometry } from './../core/Geometry';
import { BufferGeometry } from './../core/BufferGeometry';

export class ParametricBufferGeometry extends BufferGeometry {

	constructor(
		func: ( u: number, v: number, dest: Vector3 ) => void,
		slices: number,
		stacks: number
	);

	parameters: {
		func: ( u: number, v: number, dest: Vector3 ) => void;
		slices: number;
		stacks: number;
	};

}

export class ParametricGeometry extends Geometry {

	constructor(
		func: ( u: number, v: number, dest: Vector3 ) => void,
		slices: number,
		stacks: number
	);

	parameters: {
		func: ( u: number, v: number, dest: Vector3 ) => void;
		slices: number;
		stacks: number;
	};

}
