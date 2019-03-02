//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Font } from './../extras/core/Font';
import { ExtrudeGeometry, ExtrudeBufferGeometry } from './ExtrudeGeometry';
import { BufferGeometry } from './../core/BufferGeometry';

export interface TextGeometryParameters {
  font?: Font;
  size?: number;
  height?: number;
  curveSegments?: number;
  bevelEnabled?: boolean;
  bevelThickness?: number;
  bevelSize?: number;
  bevelSegments?: number;
}

export class TextBufferGeometry extends ExtrudeBufferGeometry {
  constructor(text: string, parameters?: TextGeometryParameters);

  parameters: {
    font: Font;
    size: number;
    height: number;
    curveSegments: number;
    bevelEnabled: boolean;
    bevelThickness: number;
    bevelSize: number;
    bevelSegments: number;
  };
}

export class TextGeometry extends ExtrudeGeometry {
  constructor(text: string, parameters?: TextGeometryParameters);

  parameters: {
    font: Font;
    size: number;
    height: number;
    curveSegments: number;
    bevelEnabled: boolean;
    bevelThickness: number;
    bevelSize: number;
    bevelSegments: number;
  };
}
