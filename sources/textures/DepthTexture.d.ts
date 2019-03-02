//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Texture } from './Texture';
import {
  Mapping,
  Wrapping,
  TextureFilter,
  PixelFormat,
  TextureDataType,
  TextureEncoding,
} from '../constants';

export class DepthTexture extends Texture {
  constructor(
    width: number,
    heighht: number,
    type?: TextureDataType,
    mapping?: Mapping,
    wrapS?: Wrapping,
    wrapT?: Wrapping,
    magFilter?: TextureFilter,
    minFilter?: TextureFilter,
    anisotropy?: number
  );

  image: { width: number; height: number };
}
