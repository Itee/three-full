//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Scene } from './../scenes/Scene';
import { Camera } from './../cameras/Camera';
import { WebGLExtensions } from './webgl/WebGLExtensions';
import { WebGLInfo } from './webgl/WebGLInfo';
import { WebGLShadowMap } from './webgl/WebGLShadowMap';
import { WebGLCapabilities } from './webgl/WebGLCapabilities';
import { WebGLProperties } from './webgl/WebGLProperties';
import { WebGLRenderLists } from './webgl/WebGLRenderLists';
import { WebGLState } from './webgl/WebGLState';
import { Vector2 } from './../math/Vector2';
import { Vector4 } from './../math/Vector4';
import { Color } from './../math/Color';
import { WebGLRenderTarget } from './WebGLRenderTarget';
import { Object3D } from './../core/Object3D';
import { Material } from './../materials/Material';
import { Fog } from './../scenes/Fog';
import { Texture } from './../textures/Texture';
import { ToneMapping, ShadowMapType, CullFace } from '../constants';
import { WebVRManager } from '../renderers/webvr/WebVRManager';
import { RenderTarget } from './webgl/WebGLRenderLists';

export interface Renderer {
  domElement: HTMLCanvasElement;

  render(scene: Scene, camera: Camera): void;
  setSize(width: number, height: number, updateStyle?: boolean): void;
}

export interface WebGLRendererParameters {
  
  canvas?: HTMLCanvasElement;
  context?: WebGLRenderingContext;
  precision?: string;
  alpha?: boolean;
  premultipliedAlpha?: boolean;
  antialias?: boolean;
  stencil?: boolean;
  preserveDrawingBuffer?: boolean;
  powerPreference?: string;
  depth?: boolean;
  logarithmicDepthBuffer?: boolean;
}
export class WebGLRenderer implements Renderer {
  
  constructor(parameters?: WebGLRendererParameters);
  domElement: HTMLCanvasElement;
  context: WebGLRenderingContext;
  autoClear: boolean;
  autoClearColor: boolean;
  autoClearDepth: boolean;
  autoClearStencil: boolean;
  sortObjects: boolean;

  clippingPlanes: any[];
  localClippingEnabled: boolean;

  extensions: WebGLExtensions;
  gammaInput: boolean;
  gammaOutput: boolean;

  physicallyCorrectLights: boolean;
  toneMapping: ToneMapping;
  toneMappingExposure: number;
  toneMappingWhitePoint: number;
  shadowMapDebug: boolean;
  maxMorphTargets: number;
  maxMorphNormals: number;

  info: WebGLInfo;

  shadowMap: WebGLShadowMap;

  pixelRation: number;

  capabilities: WebGLCapabilities;
  properties: WebGLProperties;
  renderLists: WebGLRenderLists;
  state: WebGLState;
  allocTextureUnit: any;

  vr: WebVRManager;
  getContext(): WebGLRenderingContext;
  getContextAttributes(): any;
  forceContextLoss(): void;
  getMaxAnisotropy(): number;
  getPrecision(): string;

  getPixelRatio(): number;
  setPixelRatio(value: number): void;

  getDrawingBufferSize(): { width: number; height: number };
  setDrawingBufferSize(width: number, height: number, pixelRatio: number): void;

  getSize(target: Vector2): Vector2;
  setSize(width: number, height: number, updateStyle?: boolean): void;

  getCurrentViewport(target: Vector4): Vector4;
  getViewport(target: Vector4): Vector4;
  setViewport(x: Vector4 | number, y?: number, width?: number, height?: number): void;
  getScissor(target: Vector4): Vector4;
  setScissor(x: Vector4 | number, y?: number, width?: number, height?: number): void;
  getScissorTest(): boolean;
  setScissorTest(enable: boolean): void;
  getClearColor(): Color;
  setClearColor(color: Color, alpha?: number): void;
  setClearColor(color: string, alpha?: number): void;
  setClearColor(color: number, alpha?: number): void;
  getClearAlpha(): number;

  setClearAlpha(alpha: number): void;
  clear(color?: boolean, depth?: boolean, stencil?: boolean): void;

  clearColor(): void;
  clearDepth(): void;
  clearStencil(): void;
  clearTarget(
    renderTarget: WebGLRenderTarget,
    color: boolean,
    depth: boolean,
    stencil: boolean
  ): void;
  resetGLState(): void;
  dispose(): void;
  renderBufferImmediate(
    object: Object3D,
    program: Object,
    material: Material
  ): void;

  renderBufferDirect(
    camera: Camera,
    fog: Fog,
    material: Material,
    geometryGroup: any,
    object: Object3D
  ): void;
  setAnimationLoop(callback: Function): void;
  animate(callback: Function): void;
  render(
    scene: Scene,
    camera: Camera
  ): void;
  setTexture(texture: Texture, slot: number): void;
  setTexture2D(texture: Texture, slot: number): void;
  setTextureCube(texture: Texture, slot: number): void;
  getRenderTarget(): RenderTarget;
  
  getCurrentRenderTarget(): RenderTarget;
  setRenderTarget(renderTarget?: RenderTarget, activeCubeFace?: number, activeMipMapLevel?: number): void;
  readRenderTargetPixels(
    renderTarget: RenderTarget,
    x: number,
    y: number,
    width: number,
    height: number,
    buffer: any
  ): void;
  gammaFactor: number;
  shadowMapEnabled: boolean;
  shadowMapType: ShadowMapType;
  shadowMapCullFace: CullFace;
  supportsFloatTextures(): any;
  supportsHalfFloatTextures(): any;
  supportsStandardDerivatives(): any;
  supportsCompressedTextureS3TC(): any;
  supportsCompressedTexturePVRTC(): any;
  supportsBlendMinMax(): any;
  supportsVertexTextures(): any;
  supportsInstancedArrays(): any;
  enableScissorTest(boolean: any): any;
}
