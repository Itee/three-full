//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../core/Object3D';
import { Box3 } from './../math/Box3';
import { Color } from './../math/Color';
import { LineSegments } from './../objects/LineSegments';
// export class BoundingBoxHelper extends Mesh {
//   constructor(object?: Object3D, hex?: number);

//   object: Object3D;
//   box: Box3;

//   update(): void;
// }

export class BoxHelper extends LineSegments {
  constructor(object?: Object3D, color?: Color);

  update(object?: Object3D): void;
}
