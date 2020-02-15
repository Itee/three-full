//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { Matrix3 } from './Matrix3';
import { BufferAttribute } from './../core/BufferAttribute';
import { Vector } from './Vector2';
export class Vector4 implements Vector {

	constructor( x?: number, y?: number, z?: number, w?: number );

	x: number;
	y: number;
	z: number;
	w: number;
	width: number;
	height: number;
	readonly isVector4: true;
	set( x: number, y: number, z: number, w: number ): this;
	setScalar( scalar: number ): this;
	setX( x: number ): this;
	setY( y: number ): this;
	setZ( z: number ): this;
	setW( w: number ): this;

	setComponent( index: number, value: number ): this;

	getComponent( index: number ): number;
	clone(): this;
	copy( v: Vector4 ): this;
	add( v: Vector4, w?: Vector4 ): this;

	addScalar( scalar: number ): this;
	addVectors( a: Vector4, b: Vector4 ): this;

	addScaledVector( v: Vector4, s: number ): this;
	
	sub( v: Vector4 ): this;

	subScalar( s: number ): this;
	subVectors( a: Vector4, b: Vector4 ): this;
	multiplyScalar( s: number ): this;

	applyMatrix4( m: Matrix4 ): this;
	divideScalar( s: number ): this;
	setAxisAngleFromQuaternion( q: Quaternion ): this;
	setAxisAngleFromRotationMatrix( m: Matrix3 ): this;

	min( v: Vector4 ): this;
	max( v: Vector4 ): this;
	clamp( min: Vector4, max: Vector4 ): this;
	clampScalar( min: number, max: number ): this;
	floor(): this;
	ceil(): this;
	round(): this;
	roundToZero(): this;
	negate(): this;
	dot( v: Vector4 ): number;
	lengthSq(): number;
	length(): number;
	manhattanLength(): number;
	normalize(): this;
	
	setLength( length: number ): this;
	lerp( v: Vector4, alpha: number ): this;

	lerpVectors( v1: Vector4, v2: Vector4, alpha: number ): this;
	equals( v: Vector4 ): boolean;
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
