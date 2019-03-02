//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Matrix4 } from './Matrix4';
import { BufferAttribute } from './../core/BufferAttribute';
import { Vector3 } from './Vector3';
export interface Matrix {
  
  elements: Float32Array;
  identity(): Matrix;
  copy(m: this): this;
  multiplyScalar(s: number): Matrix;

  determinant(): number;
  getInverse(matrix: Matrix, throwOnInvertible?: boolean): Matrix;
  transpose(): Matrix;
  clone(): this;
}
export class Matrix3 implements Matrix {
  
  constructor();
  elements: Float32Array;

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
  copy(m: Matrix3): this;
  setFromMatrix4(m: Matrix4): Matrix3;
  applyToBuffer(
    buffer: BufferAttribute,
    offset?: number,
    length?: number
  ): BufferAttribute;

  applyToBufferAttribute(attribute: BufferAttribute): BufferAttribute;

  multiplyScalar(s: number): Matrix3;
  determinant(): number;
  getInverse(matrix: Matrix3, throwOnDegenerate?: boolean): Matrix3;
  transpose(): Matrix3;
  getNormalMatrix(matrix4: Matrix4): Matrix3;
  transposeIntoArray(r: number[]): number[];
  fromArray(array: number[], offset?: number): Matrix3;
  toArray(): number[];
  multiply(m: Matrix3): Matrix3;

  premultiply(m: Matrix3): Matrix3;
  multiplyMatrices(a: Matrix3, b: Matrix3): Matrix3;
  multiplyVector3(vector: Vector3): any;
  multiplyVector3Array(a: any): any;
  getInverse(matrix: Matrix4, throwOnDegenerate?: boolean): Matrix3;
  flattenToArrayOffset(array: number[], offset: number): number[];
}
