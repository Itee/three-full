//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './../math/Vector3';
import { Face3 } from './Face3';
import { Object3D } from './Object3D';
import { Vector2 } from './../math/Vector2';
import { Ray } from './../math/Ray';
import { Camera } from './../cameras/Camera';

export interface Intersection {
	distance: number;
	distanceToRay?: number;
	point: Vector3;
	index?: number;
	face?: Face3 | null;
	faceIndex?: number;
	object: Object3D;
	uv?: Vector2;
}

export interface RaycasterParameters {
	Mesh?: any;
	Line?: any;
	LOD?: any;
	Points?: { threshold: number };
	Sprite?: any;
}

export class Raycaster {
	constructor(
		origin?: Vector3,
		direction?: Vector3,
		near?: number,
		far?: number
	);
	ray: Ray;
	near: number;
	far: number;
	camera: Camera;

	params: RaycasterParameters;
	linePrecision: number;
	set( origin: Vector3, direction: Vector3 ): void;
	setFromCamera( coords: { x: number; y: number }, camera: Camera ): void;
	intersectObject(
		object: Object3D,
		recursive?: boolean,
		optionalTarget?: Intersection[]
	): Intersection[];
	intersectObjects(
		objects: Object3D[],
		recursive?: boolean,
		optionalTarget?: Intersection[]
	): Intersection[];

}
