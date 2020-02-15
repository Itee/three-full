//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Matrix4 } from './Matrix4';
import { Vector3 } from './Vector3';
export interface Matrix {
	
	elements: number[];
	identity(): Matrix;
	copy( m: this ): this;
	multiplyScalar( s: number ): Matrix;

	determinant(): number;
	getInverse( matrix: Matrix, throwOnInvertible?: boolean ): Matrix;
	transpose(): Matrix;
	clone(): this;
}
export class Matrix3 implements Matrix {
	constructor();
	elements: number[];

	set(
		n11: number,
		n12: number,
		n13: number,
		n21: number,
		n22: number,
		n23: number,
		n31: number,
		n32: number,
		n33: number
	): Matrix3;
	identity(): Matrix3;
	clone(): this;
	copy( m: Matrix3 ): this;
	setFromMatrix4( m: Matrix4 ): Matrix3;
	multiplyScalar( s: number ): Matrix3;
	determinant(): number;
	getInverse( matrix: Matrix3, throwOnDegenerate?: boolean ): Matrix3;
	transpose(): Matrix3;
	getNormalMatrix( matrix4: Matrix4 ): Matrix3;
	transposeIntoArray( r: number[] ): Matrix3;

	setUvTransform( tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number ): Matrix3;

	scale( sx: number, sy: number ): Matrix3;

	rotate( theta: number ): Matrix3;

	translate( tx: number, ty: number ): Matrix3;

	equals( matrix: Matrix3 ): boolean;
	fromArray( array: number[], offset?: number ): Matrix3;
	fromArray( array: ArrayLike<number>, offset?: number ): Matrix3;
	toArray( array?: number[], offset?: number ): number[];
	toArray( array?: ArrayLike<number>, offset?: number ): ArrayLike<number>;
	multiply( m: Matrix3 ): Matrix3;

	premultiply( m: Matrix3 ): Matrix3;
	multiplyMatrices( a: Matrix3, b: Matrix3 ): Matrix3;
	multiplyVector3( vector: Vector3 ): any;
	multiplyVector3Array( a: any ): any;
	getInverse( matrix: Matrix4, throwOnDegenerate?: boolean ): Matrix3;
	flattenToArrayOffset( array: number[], offset: number ): number[];

}
