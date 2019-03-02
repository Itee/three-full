//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../core/Object3D';
import { LineSegments } from './../objects/LineSegments';
// export class EdgesHelper extends LineSegments {
//   constructor(object: Object3D, hex?: number, thresholdAngle?: number);
// }

export class FaceNormalsHelper extends LineSegments {
  constructor(
    object: Object3D,
    size?: number,
    hex?: number,
    linewidth?: number
  );

  object: Object3D;
  size: number;

  update(object?: Object3D): void;
}
