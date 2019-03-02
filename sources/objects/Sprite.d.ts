//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Material } from './../materials/Material';
import { Vector2 } from './../math/Vector2';
import { Raycaster } from './../core/Raycaster';
import { Object3D } from './../core/Object3D';
import { Intersection } from '../core/Raycaster';

export class Sprite extends Object3D {
  constructor(material?: Material);

  type: 'Sprite';
  isSprite: true;

  material: Material;
  center: Vector2;

  raycast(raycaster: Raycaster, intersects: Intersection[]): void;
  copy(source: this, recursive?: boolean): this;
}
