//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './Vector3';

export class Spherical {
  constructor(radius?: number, phi?: number, theta?: number);

  radius: number;
  phi: number;
  theta: number;

  set(radius: number, phi: number, theta: number): Spherical;
  clone(): this;
  copy(other: Spherical): this;
  makeSafe(): void;
  setFromVector3(vec3: Vector3): Spherical;
}
