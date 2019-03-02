//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { InterleavedBuffer } from './InterleavedBuffer';

export class InterleavedBufferAttribute {
  constructor(
    interleavedBuffer: InterleavedBuffer,
    itemSize: number,
    offset: number,
    normalized?: boolean
  );

  uuid: string;
  data: InterleavedBuffer;
  itemSize: number;
  offset: number;
  count: number;
  normalized: boolean;
  array: any[];

  getX(index: number): number;
  setX(index: number, x: number): InterleavedBufferAttribute;
  getY(index: number): number;
  setY(index: number, y: number): InterleavedBufferAttribute;
  getZ(index: number): number;
  setZ(index: number, z: number): InterleavedBufferAttribute;
  getW(index: number): number;
  setW(index: number, z: number): InterleavedBufferAttribute;
  setXY(index: number, x: number, y: number): InterleavedBufferAttribute;
  setXYZ(
    index: number,
    x: number,
    y: number,
    z: number
  ): InterleavedBufferAttribute;
  setXYZW(
    index: number,
    x: number,
    y: number,
    z: number,
    w: number
  ): InterleavedBufferAttribute;
  
  length: number;
}
