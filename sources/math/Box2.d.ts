//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector2 } from './Vector2';

// Math //////////////////////////////////////////////////////////////////////////////////

export class Box2 {
  constructor(min?: Vector2, max?: Vector2);

  max: Vector2;
  min: Vector2;

  set(min: Vector2, max: Vector2): Box2;
  setFromPoints(points: Vector2[]): Box2;
  setFromCenterAndSize(center: Vector2, size: Vector2): Box2;
  clone(): this;
  copy(box: Box2): this;
  makeEmpty(): Box2;
  isEmpty(): boolean;
  getCenter(target: Vector2): Vector2;
  getSize(target: Vector2): Vector2;
  expandByPoint(point: Vector2): Box2;
  expandByVector(vector: Vector2): Box2;
  expandByScalar(scalar: number): Box2;
  containsPoint(point: Vector2): boolean;
  containsBox(box: Box2): boolean;
  getParameter(point: Vector2): Vector2;
  intersectsBox(box: Box2): boolean;
  clampPoint(point: Vector2, target: Vector2): Vector2;
  distanceToPoint(point: Vector2): number;
  intersect(box: Box2): Box2;
  union(box: Box2): Box2;
  translate(offset: Vector2): Box2;
  equals(box: Box2): boolean;
  
  empty(): any;
  
  isIntersectionBox(b: any): any;
}