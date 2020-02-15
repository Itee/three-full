//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './Vector3';
import { Euler } from './Euler';
import { Quaternion } from './Quaternion';
import { Matrix } from './Matrix3';

export class Matrix4 implements Matrix {

	constructor();
	elements: number[];
	set(
		n11: number,
		n12: number,
		n13: number,
		n14: number,
		n21: number,
		n22: number,
		n23: number,
		n24: number,
		n31: number,
		n32: number,
		n33: number,
		n34: number,
		n41: number,
		n42: number,
		n43: number,
		n44: number
	): Matrix4;
	identity(): Matrix4;
	clone(): this;
	copy( m: Matrix4 ): this;
	copyPosition( m: Matrix4 ): Matrix4;
	extractBasis( xAxis: Vector3, yAxis: Vector3, zAxis: Vector3 ): Matrix4;
	makeBasis( xAxis: Vector3, yAxis: Vector3, zAxis: Vector3 ): Matrix4;
	extractRotation( m: Matrix4 ): Matrix4;
	makeRotationFromEuler( euler: Euler ): Matrix4;
	makeRotationFromQuaternion( q: Quaternion ): Matrix4;
	
	lookAt( eye: Vector3, target: Vector3, up: Vector3 ): Matrix4;
	multiply( m: Matrix4 ): Matrix4;

	premultiply( m: Matrix4 ): Matrix4;
	multiplyMatrices( a: Matrix4, b: Matrix4 ): Matrix4;
	multiplyToArray( a: Matrix4, b: Matrix4, r: number[] ): Matrix4;
	multiplyScalar( s: number ): Matrix4;
	determinant(): number;
	transpose(): Matrix4;
	setPosition( v: Vector3 | number, y?: number, z?: number ): Matrix4;
	getInverse( m: Matrix4, throwOnDegeneratee?: boolean ): Matrix4;
	scale( v: Vector3 ): Matrix4;

	getMaxScaleOnAxis(): number;
	
	makeTranslation( x: number, y: number, z: number ): Matrix4;
	makeRotationX( theta: number ): Matrix4;
	makeRotationY( theta: number ): Matrix4;
	makeRotationZ( theta: number ): Matrix4;
	makeRotationAxis( axis: Vector3, angle: number ): Matrix4;
	makeScale( x: number, y: number, z: number ): Matrix4;
	compose( translation: Vector3, rotation: Quaternion, scale: Vector3 ): Matrix4;
	decompose(
		translation?: Vector3,
		rotation?: Quaternion,
		scale?: Vector3
	): Matrix4;
	makePerspective(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number
	): Matrix4;
	makePerspective(
		fov: number,
		aspect: number,
		near: number,
		far: number
	): Matrix4;
	makeOrthographic(
		left: number,
		right: number,
		top: number,
		bottom: number,
		near: number,
		far: number
	): Matrix4;
	equals( matrix: Matrix4 ): boolean;
	fromArray( array: number[], offset?: number ): Matrix4;
	fromArray( array: ArrayLike<number>, offset?: number ): Matrix4;
	toArray( array?: number[], offset?: number ): number[];
	toArray( array?: ArrayLike<number>, offset?: number ): ArrayLike<number>;
	extractPosition( m: Matrix4 ): Matrix4;
	setRotationFromQuaternion( q: Quaternion ): Matrix4;
	multiplyVector3( v: any ): any;
	multiplyVector4( v: any ): any;
	multiplyVector3Array( array: number[] ): number[];
	rotateAxis( v: any ): void;
	crossVector( v: any ): void;
	flattenToArrayOffset( array: number[], offset: number ): number[];

}
