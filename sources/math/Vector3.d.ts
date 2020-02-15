//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Euler } from './Euler';
import { Matrix3 } from './Matrix3';
import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { Camera } from './../cameras/Camera';
import { Spherical } from './Spherical';
import { Cylindrical } from './Cylindrical';
import { BufferAttribute } from './../core/BufferAttribute';
import { Vector } from './Vector2';

export class Vector3 implements Vector {

	constructor( x?: number, y?: number, z?: number );

	x: number;
	y: number;
	z: number;
	readonly isVector3: true;
	set( x: number, y: number, z: number ): this;
	setScalar( scalar: number ): this;
	setX( x: number ): Vector3;
	setY( y: number ): Vector3;
	setZ( z: number ): Vector3;

	setComponent( index: number, value: number ): this;

	getComponent( index: number ): number;
	clone(): this;
	copy( v: Vector3 ): this;
	add( v: Vector3, w?: Vector3 ): this;

	addScalar( s: number ): this;

	addScaledVector( v: Vector3, s: number ): this;
	addVectors( a: Vector3, b: Vector3 ): this;
	sub( a: Vector3 ): this;

	subScalar( s: number ): this;
	subVectors( a: Vector3, b: Vector3 ): this;

	multiply( v: Vector3 ): this;
	multiplyScalar( s: number ): this;

	multiplyVectors( a: Vector3, b: Vector3 ): this;

	applyEuler( euler: Euler ): this;

	applyAxisAngle( axis: Vector3, angle: number ): this;

	applyMatrix3( m: Matrix3 ): this;

	applyNormalMatrix( m: Matrix3 ): this;

	applyMatrix4( m: Matrix4 ): this;

	applyQuaternion( q: Quaternion ): this;

	project( camera: Camera ): this;

	unproject( camera: Camera ): this;

	transformDirection( m: Matrix4 ): this;

	divide( v: Vector3 ): this;
	divideScalar( s: number ): this;

	min( v: Vector3 ): this;

	max( v: Vector3 ): this;

	clamp( min: Vector3, max: Vector3 ): this;

	clampScalar( min: number, max: number ): this;

	clampLength( min: number, max: number ): this;

	floor(): this;

	ceil(): this;

	round(): this;

	roundToZero(): this;
	negate(): this;
	dot( v: Vector3 ): number;
	lengthSq(): number;
	length(): number;
	lengthManhattan(): number;
	manhattanLength(): number;
	manhattanDistanceTo( v: Vector3 ): number;
	normalize(): this;
	setLength( l: number ): this;
	lerp( v: Vector3, alpha: number ): this;

	lerpVectors( v1: Vector3, v2: Vector3, alpha: number ): this;
	cross( a: Vector3, w?: Vector3 ): this;
	crossVectors( a: Vector3, b: Vector3 ): this;
	projectOnVector( v: Vector3 ): this;
	projectOnPlane( planeNormal: Vector3 ): this;
	reflect( vector: Vector3 ): this;
	angleTo( v: Vector3 ): number;
	distanceTo( v: Vector3 ): number;
	distanceToSquared( v: Vector3 ): number;
	distanceToManhattan( v: Vector3 ): number;

	setFromSpherical( s: Spherical ): this;
	setFromSphericalCoords( r: number, phi: number, theta:number ): this;
	setFromCylindrical( s: Cylindrical ): this;
	setFromCylindricalCoords( radius: number, theta: number, y: number ): this;
	setFromMatrixPosition( m: Matrix4 ): this;
	setFromMatrixScale( m: Matrix4 ): this;
	setFromMatrixColumn( matrix: Matrix4, index: number ): this;
	setFromMatrix3Column( matrix: Matrix3, index: number ): this;
	equals( v: Vector3 ): boolean;
	fromArray( array: number[], offset?: number ): this;
	fromArray( array: ArrayLike<number>, offset?: number ): this;
	toArray( array?: number[], offset?: number ): number[];
	toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	fromBufferAttribute(
		attribute: BufferAttribute,
		index: number,
		offset?: number
	): this;

}
