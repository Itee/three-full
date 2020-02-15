//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Plane } from './Plane';
import { Matrix4 } from './Matrix4';
import { Object3D } from './../core/Object3D';
import { Sprite } from './../objects/Sprite';
import { Sphere } from './Sphere';
import { Box3 } from './Box3';
import { Vector3 } from './Vector3';
export class Frustum {

	constructor(
		p0?: Plane,
		p1?: Plane,
		p2?: Plane,
		p3?: Plane,
		p4?: Plane,
		p5?: Plane
	);
	planes: Plane[];

	set(
		p0: Plane,
		p1: Plane,
		p2: Plane,
		p3: Plane,
		p4: Plane,
		p5: Plane
	): Frustum;
	clone(): this;
	copy( frustum: Frustum ): this;
	setFromProjectionMatrix( m: Matrix4 ): this;
	intersectsObject( object: Object3D ): boolean;
	intersectsSprite( sprite: Sprite ): boolean;
	intersectsSphere( sphere: Sphere ): boolean;
	intersectsBox( box: Box3 ): boolean;
	containsPoint( point: Vector3 ): boolean;

}
