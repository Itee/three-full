//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './../math/Vector3';
import { Color } from './../math/Color';
import { Face3 } from './Face3';
import { Vector2 } from './../math/Vector2';
import { Vector4 } from './../math/Vector4';
import { Box3 } from './../math/Box3';
import { Sphere } from './../math/Sphere';
import { Matrix4 } from './../math/Matrix4';
import { BufferGeometry } from './BufferGeometry';
import { Matrix } from './../math/Matrix3';
import { Mesh } from './../objects/Mesh';
import { Bone } from './../objects/Bone';
import { AnimationClip } from './../animation/AnimationClip';
import { EventDispatcher } from './EventDispatcher';
export interface MorphTarget {
	name: string;
	vertices: Vector3[];
}

export interface MorphColor {
	name: string;
	colors: Color[];
}

export interface MorphNormals {
	name: string;
	normals: Vector3[];
}

export let GeometryIdCount: number;
export class Geometry extends EventDispatcher {

	constructor();
	id: number;

	uuid: string;

	readonly isGeometry: true;
	name: string;

	type: string;
	vertices: Vector3[];
	colors: Color[];
	faces: Face3[];
	faceVertexUvs: Vector2[][][];
	morphTargets: MorphTarget[];
	morphNormals: MorphNormals[];
	skinWeights: Vector4[];
	skinIndices: Vector4[];
	lineDistances: number[];
	boundingBox: Box3;
	boundingSphere: Sphere;
	verticesNeedUpdate: boolean;
	elementsNeedUpdate: boolean;
	uvsNeedUpdate: boolean;
	normalsNeedUpdate: boolean;
	colorsNeedUpdate: boolean;
	lineDistancesNeedUpdate: boolean;
	groupsNeedUpdate: boolean;
	applyMatrix4( matrix: Matrix4 ): Geometry;

	rotateX( angle: number ): Geometry;
	rotateY( angle: number ): Geometry;
	rotateZ( angle: number ): Geometry;

	translate( x: number, y: number, z: number ): Geometry;
	scale( x: number, y: number, z: number ): Geometry;
	lookAt( vector: Vector3 ): void;

	fromBufferGeometry( geometry: BufferGeometry ): Geometry;

	center(): Geometry;

	normalize(): Geometry;
	computeFaceNormals(): void;
	computeVertexNormals( areaWeighted?: boolean ): void;
	computeFlatVertexNormals(): void;
	computeMorphNormals(): void;
	computeBoundingBox(): void;
	computeBoundingSphere(): void;

	merge(
		geometry: Geometry,
		matrix?: Matrix,
		materialIndexOffset?: number
	): void;

	mergeMesh( mesh: Mesh ): void;
	mergeVertices(): number;

	setFromPoints( points: Array<Vector2> | Array<Vector3> ): this;

	sortFacesByMaterialIndex(): void;

	toJSON(): any;
	clone(): this;

	copy( source: Geometry ): this;
	dispose(): void;
	bones: Bone[];
	animation: AnimationClip;
	animations: AnimationClip[];

}
