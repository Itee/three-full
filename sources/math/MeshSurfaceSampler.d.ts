//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	BufferGeometry,
	Mesh,
	Vector3
} from '../../../src/Three';

export class MeshSurfaceSampler {

	distribution: Float32Array | null;
	geometry: BufferGeometry;
	positionAttribute: Float32Array;
	weightAttribute: string | null;

	constructor( mesh: Mesh );
	binarySearch( x: number ): number;
	build(): this;
	sample( targetPosition: Vector3, targetNormal: Vector3 ): this;
	sampleFace( faceIndex: number, targetPosition: Vector3, targetNormal: Vector3 ): this;
	setWeightAttribute( name: string | null ): this;

}
