//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { BufferAttribute } from './BufferAttribute';
import { Box3 } from './../math/Box3';
import { Sphere } from './../math/Sphere';
import { Matrix4 } from './../math/Matrix4';
import { Vector2 } from './../math/Vector2';
import { Vector3 } from './../math/Vector3';
import { Object3D } from './Object3D';
import { Geometry } from './Geometry';
import { DirectGeometry } from './DirectGeometry';
import { EventDispatcher } from './EventDispatcher';
import { InterleavedBufferAttribute } from './InterleavedBufferAttribute';
export class BufferGeometry extends EventDispatcher {
	constructor();

	static MaxIndex: number;
	id: number;
	uuid: string;
	name: string;
	type: string;
	index: BufferAttribute | null;
	attributes: {
		[name: string]: BufferAttribute | InterleavedBufferAttribute;
	};
	morphAttributes: {
		[name: string]: ( BufferAttribute | InterleavedBufferAttribute )[];
	};
	morphTargetsRelative: boolean;
	groups: { start: number; count: number; materialIndex?: number }[];
	boundingBox: Box3;
	boundingSphere: Sphere;
	drawRange: { start: number; count: number };
	userData: {[key: string]: any};
	readonly isBufferGeometry: true;

	getIndex(): BufferAttribute | null;
	setIndex( index: BufferAttribute | number[] | null ): void;

	setAttribute( name: string, attribute: BufferAttribute | InterleavedBufferAttribute ): BufferGeometry;
	getAttribute( name: string ): BufferAttribute | InterleavedBufferAttribute;
	deleteAttribute( name: string ): BufferGeometry;

	addGroup( start: number, count: number, materialIndex?: number ): void;
	clearGroups(): void;

	setDrawRange( start: number, count: number ): void;
	applyMatrix4( matrix: Matrix4 ): BufferGeometry;

	rotateX( angle: number ): BufferGeometry;
	rotateY( angle: number ): BufferGeometry;
	rotateZ( angle: number ): BufferGeometry;
	translate( x: number, y: number, z: number ): BufferGeometry;
	scale( x: number, y: number, z: number ): BufferGeometry;
	lookAt( v: Vector3 ): void;

	center(): BufferGeometry;

	setFromObject( object: Object3D ): BufferGeometry;
	setFromPoints( points: Vector3[] | Vector2[] ): BufferGeometry;
	updateFromObject( object: Object3D ): void;

	fromGeometry( geometry: Geometry, settings?: any ): BufferGeometry;

	fromDirectGeometry( geometry: DirectGeometry ): BufferGeometry;
	computeBoundingBox(): void;
	computeBoundingSphere(): void;
	computeVertexNormals(): void;

	merge( geometry: BufferGeometry, offset: number ): BufferGeometry;
	normalizeNormals(): void;

	toNonIndexed(): BufferGeometry;

	toJSON(): any;
	clone(): this;
	copy( source: BufferGeometry ): this;
	dispose(): void;
	drawcalls: any;
	offsets: any;
	addIndex( index: any ): void;
	addDrawCall( start: any, count: any, indexOffset?: any ): void;
	clearDrawCalls(): void;
	addAttribute(
		name: string,
		attribute: BufferAttribute | InterleavedBufferAttribute
	): BufferGeometry;
	removeAttribute( name: string ): BufferGeometry;

	addAttribute( name: any, array: any, itemSize: any ): any;

}
