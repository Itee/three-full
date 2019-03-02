//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Euler } from './Euler';
import { Vector3 } from './Vector3';
import { Matrix4 } from './Matrix4';
export class Quaternion {
  
  constructor(x?: number, y?: number, z?: number, w?: number);

  x: number;
  y: number;
  z: number;
  w: number;
  set(x: number, y: number, z: number, w: number): Quaternion;
  clone(): this;
  copy(q: Quaternion): this;
  setFromEuler(euler: Euler, update?: boolean): Quaternion;
  setFromAxisAngle(axis: Vector3, angle: number): Quaternion;
  setFromRotationMatrix(m: Matrix4): Quaternion;
  setFromUnitVectors(vFrom: Vector3, vTo: Vector3): Quaternion;
  
  inverse(): Quaternion;

  conjugate(): Quaternion;
  dot(v: Quaternion): number;
  lengthSq(): number;
  length(): number;
  normalize(): Quaternion;
  multiply(q: Quaternion): Quaternion;
  premultiply(q: Quaternion): Quaternion;
  multiplyQuaternions(a: Quaternion, b: Quaternion): Quaternion;

  slerp(qb: Quaternion, t: number): Quaternion;
  equals(v: Quaternion): boolean;
  fromArray(n: number[]): Quaternion;
  toArray(): number[];

  fromArray(xyzw: number[], offset?: number): Quaternion;
  toArray(xyzw?: number[], offset?: number): number[];

  onChange(callback: Function): Quaternion;
  onChangeCallback: Function;
  static slerp(
    qa: Quaternion,
    qb: Quaternion,
    qm: Quaternion,
    t: number
  ): Quaternion;

  static slerpFlat(
    dst: number[],
    dstOffset: number,
    src0: number[],
    srcOffset: number,
    src1: number[],
    stcOffset1: number,
    t: number
  ): Quaternion;
  multiplyVector3(v: any): any;
}
