//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Vec2 {
  x: number;
  y: number;
}

export namespace ShapeUtils {
  export function area(contour: Vec2[]): number;
  export function triangulate(contour: Vec2[], indices: boolean): number[];
  export function triangulateShape(contour: Vec2[], holes: Vec2[]): number[][];
  export function isClockWise(pts: Vec2[]): boolean;
}
