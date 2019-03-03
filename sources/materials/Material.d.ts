//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Plane } from './../math/Plane';
import { EventDispatcher } from './../core/EventDispatcher';
import {
  BlendingDstFactor,
  BlendingEquation,
  Blending,
  BlendingSrcFactor,
  DepthModes,
  Side,
  Colors,
} from '../constants';

// Materials //////////////////////////////////////////////////////////////////////////////////
export let MaterialIdCount: number;

export interface MaterialParameters {
  alphaTest?: number;
  blendDst?: BlendingDstFactor;
  blendDstAlpha?: number;
  blendEquation?: BlendingEquation;
  blendEquationAlpha?: number;
  blending?: Blending;
  blendSrc?: BlendingSrcFactor | BlendingDstFactor;
  blendSrcAlpha?: number;
  clipIntersection?: boolean;
  clippingPlanes?: Plane[];
  clipShadows?: boolean;
  colorWrite?: boolean;
  depthFunc?: DepthModes;
  depthTest?: boolean;
  depthWrite?: boolean;
  fog?: boolean;
  lights?: boolean;
  name?: string;
  opacity?: number;
  overdraw?: number;
  polygonOffset?: boolean;
  polygonOffsetFactor?: number;
  polygonOffsetUnits?: number;
  precision?: 'highp' | 'mediump' | 'lowp' | null;
  premultipliedAlpha?: boolean;
  dithering?: boolean;
  flatShading?: boolean;
  side?: Side;
  transparent?: boolean;
  vertexColors?: Colors;
  vertexTangents?: boolean;
  visible?: boolean;
}
export class Material extends EventDispatcher {
  constructor();
  alphaTest: number;
  blendDst: BlendingDstFactor;
  blendDstAlpha: number | null;
  blendEquation: BlendingEquation;
  blendEquationAlpha: number | null;
  blending: Blending;
  blendSrc: BlendingSrcFactor | BlendingDstFactor;
  blendSrcAlpha: number | null;
  clipIntersection: boolean;
  clippingPlanes: any;
  clipShadows: boolean;
  colorWrite: boolean;
  depthFunc: DepthModes;
  depthTest: boolean;
  depthWrite: boolean;
  fog: boolean;
  id: number;
  isMaterial: boolean;
  lights: boolean;
  name: string;
  needsUpdate: boolean;
  opacity: number;
  overdraw: number;
  polygonOffset: boolean;
  polygonOffsetFactor: number;
  polygonOffsetUnits: number;
  precision: 'highp' | 'mediump' | 'lowp' | null;
  premultipliedAlpha: boolean;
  dithering: boolean;
  flatShading: boolean;
  side: Side;
  transparent: boolean;
  type: string;
  uuid: string;
  vertexColors: Colors;
  vertexTangents: boolean;
  visible: boolean;
  userData: any;
  clone(): this;
  copy(material: Material): this;
  dispose(): void;
  setValues(values: MaterialParameters): void;
  toJSON(meta?: any): any;
  update(): void;
}
