//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './../math/Vector3';
import { Euler } from './../math/Euler';
import { Quaternion } from './../math/Quaternion';
import { Matrix4 } from './../math/Matrix4';
import { Matrix3 } from './../math/Matrix3';
import { Layers } from './Layers';
import { WebGLRenderer } from './../renderers/WebGLRenderer';
import { Scene } from './../scenes/Scene';
import { Camera } from './../cameras/Camera';
import { Geometry } from './Geometry';
import { Material } from './../materials/Material';
import { Group } from './../objects/Group';
import { Raycaster } from './Raycaster';
import { EventDispatcher } from './EventDispatcher';
import { BufferGeometry } from './BufferGeometry';
import { Intersection } from './Raycaster';

export let Object3DIdCount: number;
export class Object3D extends EventDispatcher {

	constructor();
	id: number;
	uuid: string;
	name: string;

	type: string;
	parent: Object3D | null;
	children: Object3D[];
	up: Vector3;
	readonly position: Vector3;
	readonly rotation: Euler;
	readonly quaternion: Quaternion;
	readonly scale: Vector3;

	readonly modelViewMatrix: Matrix4;

	readonly normalMatrix: Matrix3;
	matrix: Matrix4;
	matrixWorld: Matrix4;
	matrixAutoUpdate: boolean;
	matrixWorldNeedsUpdate: boolean;

	layers: Layers;
	
	visible: boolean;
	castShadow: boolean;
	receiveShadow: boolean;
	frustumCulled: boolean;
	renderOrder: number;
	userData: { [key: string]: any };
	customDepthMaterial: Material;
	customDistanceMaterial: Material;
	readonly isObject3D: true;
	onBeforeRender: (
		renderer: WebGLRenderer,
		scene: Scene,
		camera: Camera,
		geometry: Geometry | BufferGeometry,
		material: Material,
		group: Group
	) => void;
	onAfterRender: (
		renderer: WebGLRenderer,
		scene: Scene,
		camera: Camera,
		geometry: Geometry | BufferGeometry,
		material: Material,
		group: Group
	) => void;

	static DefaultUp: Vector3;
	static DefaultMatrixAutoUpdate: boolean;
	applyMatrix4( matrix: Matrix4 ): void;

	applyQuaternion( quaternion: Quaternion ): this;
	setRotationFromAxisAngle( axis: Vector3, angle: number ): void;
	setRotationFromEuler( euler: Euler ): void;
	setRotationFromMatrix( m: Matrix4 ): void;
	setRotationFromQuaternion( q: Quaternion ): void;
	rotateOnAxis( axis: Vector3, angle: number ): this;
	rotateOnWorldAxis( axis: Vector3, angle: number ): this;
	rotateX( angle: number ): this;
	rotateY( angle: number ): this;
	rotateZ( angle: number ): this;
	translateOnAxis( axis: Vector3, distance: number ): this;
	translateX( distance: number ): this;
	translateY( distance: number ): this;
	translateZ( distance: number ): this;
	localToWorld( vector: Vector3 ): Vector3;
	worldToLocal( vector: Vector3 ): Vector3;
	lookAt( vector: Vector3 | number, y?: number, z?: number ): void;
	add( ...object: Object3D[] ): this;
	remove( ...object: Object3D[] ): this;
	attach( object: Object3D ): this;
	getObjectById( id: number ): Object3D | undefined;
	getObjectByName( name: string ): Object3D | undefined;

	getObjectByProperty( name: string, value: string ): Object3D | undefined;

	getWorldPosition( target: Vector3 ): Vector3;
	getWorldQuaternion( target: Quaternion ): Quaternion;
	getWorldScale( target: Vector3 ): Vector3;
	getWorldDirection( target: Vector3 ): Vector3;

	raycast( raycaster: Raycaster, intersects: Intersection[] ): void;

	traverse( callback: ( object: Object3D ) => any ): void;

	traverseVisible( callback: ( object: Object3D ) => any ): void;

	traverseAncestors( callback: ( object: Object3D ) => any ): void;
	updateMatrix(): void;
	updateMatrixWorld( force?: boolean ): void;

	updateWorldMatrix( updateParents: boolean, updateChildren: boolean ): void;

	toJSON( meta?: {
		geometries: any;
		materials: any;
		textures: any;
		images: any;
	} ): any;

	clone( recursive?: boolean ): this;
	copy( source: this, recursive?: boolean ): this;

}
