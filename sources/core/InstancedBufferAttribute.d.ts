//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { BufferGeometry } from './BufferGeometry';
import { BufferAttribute } from './BufferAttribute';
export namespace BufferGeometryUtils {
  export function mergeBufferGeometries(
    geometries: BufferGeometry[]
  ): BufferGeometry;
  export function computeTangents(geometry: BufferGeometry): null;
  export function mergeBufferAttributes(
    attributes: BufferAttribute[]
  ): BufferAttribute;
}
export namespace GeometryUtils {
  
  export function merge(
    geometry1: any,
    geometry2: any,
    materialIndexOffset?: any
  ): any;
  
  export function center(geometry: any): any;
}
export class InstancedBufferAttribute extends BufferAttribute {
  constructor(
    data: ArrayLike<number>,
    itemSize: number,
    meshPerAttribute?: number
  );

  meshPerAttribute: number;
}
