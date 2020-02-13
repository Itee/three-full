//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from './../core/Geometry';
import { BufferGeometry } from '../core/BufferGeometry';
import { Material } from './../materials/Material';
import { BufferAttribute } from './../core/BufferAttribute.js';
import { Mesh } from './Mesh';
import { Matrix4 } from './../math/Matrix4';

export class InstancedMesh extends Mesh {

	constructor(
		geometry: Geometry | BufferGeometry,
		material: Material | Material[],
		count: number
	);

	count: number;
	instanceMatrix: BufferAttribute;
	isInstancedMesh: true;

	setMatrixAt( index: number, matrix: Matrix4 ): void;

}
