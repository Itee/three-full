//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector2 } from './../../math/Vector2';
import { CurvePath } from './CurvePath';

export enum PathActions {
  MOVE_TO,
  LINE_TO,
  QUADRATIC_CURVE_TO, // Bezier quadratic curve
  BEZIER_CURVE_TO, // Bezier cubic curve
  CSPLINE_THRU, // Catmull-rom spline
  ARC, // Circle
  ELLIPSE,
}

export interface PathAction {
  action: PathActions;
  args: any;
}
export class Path extends CurvePath<Vector2> {
  constructor(points?: Vector2[]);

  currentPoint: Vector2;
  fromPoints(vectors: Vector2[]): void;
  setFromPoints(vectors: Vector2[]): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): void;
  bezierCurveTo(
    aCP1x: number,
    aCP1y: number,
    aCP2x: number,
    aCP2y: number,
    aX: number,
    aY: number
  ): void;
  splineThru(pts: Vector2[]): void;
  arc(
    aX: number,
    aY: number,
    aRadius: number,
    aStartAngle: number,
    aEndAngle: number,
    aClockwise: boolean
  ): void;
  absarc(
    aX: number,
    aY: number,
    aRadius: number,
    aStartAngle: number,
    aEndAngle: number,
    aClockwise: boolean
  ): void;
  ellipse(
    aX: number,
    aY: number,
    xRadius: number,
    yRadius: number,
    aStartAngle: number,
    aEndAngle: number,
    aClockwise: boolean,
    aRotation: number
  ): void;
  absellipse(
    aX: number,
    aY: number,
    xRadius: number,
    yRadius: number,
    aStartAngle: number,
    aEndAngle: number,
    aClockwise: boolean,
    aRotation: number
  ): void;
}
