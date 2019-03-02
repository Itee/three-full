//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../core/Object3D';
import { Raycaster } from './../core/Raycaster';
import { Camera } from './../cameras/Camera';
import { Intersection } from '../core/Raycaster';

export class LOD extends Object3D {
  constructor();

  type: 'LOD';

  levels: { distance: number; object: Object3D }[];

  addLevel(object: Object3D, distance?: number): void;
  getObjectForDistance(distance: number): Object3D;
  raycast(raycaster: Raycaster, intersects: Intersection[]): void;
  update(camera: Camera): void;
  toJSON(meta: any): any;
  objects: any[];
}
