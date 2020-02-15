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
import { WebGLProgram } from './webgl/WebGLProgram';
import { WebGLRenderLists } from './webgl/WebGLRenderLists';
import { WebGLState } from './webgl/WebGLState';
import { Vector2 } from './../math/Vector2';
import { Vector4 } from './../math/Vector4';
import { Color } from './../math/Color';
import { WebGLRenderTarget } from './WebGLRenderTarget';
import { Object3D } from './../core/Object3D';
import { Material } from './../materials/Material';
import { ToneMapping, ShadowMapType, CullFace, TextureEncoding } from '../constants';
import { WebXRManager } from '../renderers/webxr/WebXRManager';
import { RenderTarget } from './webgl/WebGLRenderLists';
import { Geometry } from './../core/Geometry';
import { BufferGeometry } from './../core/BufferGeometry';
import { Texture } from '../textures/Texture';

export interface Renderer {
	domElement: HTMLCanvasElement;

	render( scene: Scene, camera: Camera ): void;
	setSize( width: number, height: number, updateStyle?: boolean ): void;
}

export interface WebGLRendererParameters {
	
	canvas?: HTMLCanvasElement | OffscreenCanvas;
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

export interface WebGLDebug {
	checkShaderErrors: boolean;

}
export class WebGLRenderer implements Renderer {
	constructor( parameters?: WebGLRendererParameters );
	domElement: HTMLCanvasElement;
	context: WebGLRenderingContext;
	autoClear: boolean;
	autoClearColor: boolean;
	autoClearDepth: boolean;
	autoClearStencil: boolean;
	debug: WebGLDebug;
	sortObjects: boolean;

	clippingPlanes: any[];
	localClippingEnabled: boolean;

	extensions: WebGLExtensions;
	outputEncoding: TextureEncoding;

	physicallyCorrectLights: boolean;
	toneMapping: ToneMapping;
	toneMappingExposure: number;
	toneMappingWhitePoint: number;
	shadowMapDebug: boolean;
	maxMorphTargets: number;
	maxMorphNormals: number;

	info: WebGLInfo;

	shadowMap: WebGLShadowMap;

	pixelRatio: number;

	capabilities: WebGLCapabilities;
	properties: WebGLProperties;
	renderLists: WebGLRenderLists;
	state: WebGLState;

	xr: WebXRManager;
	getContext(): WebGLRenderingContext;
	getContextAttributes(): any;
	forceContextLoss(): void;
	getMaxAnisotropy(): number;
	getPrecision(): string;

	getPixelRatio(): number;
	setPixelRatio( value: number ): void;

	getDrawingBufferSize( target: Vector2 ): Vector2;
	setDrawingBufferSize( width: number, height: number, pixelRatio: number ): void;

	getSize( target: Vector2 ): Vector2;
	setSize( width: number, height: number, updateStyle?: boolean ): void;

	getCurrentViewport( target: Vector4 ): Vector4;
	getViewport( target: Vector4 ): Vector4;
	setViewport( x: Vector4 | number, y?: number, width?: number, height?: number ): void;
	getScissor( target: Vector4 ): Vector4;
	setScissor( x: Vector4 | number, y?: number, width?: number, height?: number ): void;
	getScissorTest(): boolean;
	setScissorTest( enable: boolean ): void;
	setOpaqueSort( method: Function ): void;
	setTransparentSort( method: Function ): void;
	getClearColor(): Color;
	setClearColor( color: Color, alpha?: number ): void;
	setClearColor( color: string, alpha?: number ): void;
	setClearColor( color: number, alpha?: number ): void;
	getClearAlpha(): number;

	setClearAlpha( alpha: number ): void;
	clear( color?: boolean, depth?: boolean, stencil?: boolean ): void;

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
		program: WebGLProgram,
	): void;

	renderBufferDirect(
		camera: Camera,
		scene: Scene,
		geometry: Geometry | BufferGeometry,
		material: Material,
		object: Object3D,
		geometryGroup: any
	): void;
	setAnimationLoop( callback: Function | null ): void;
	animate( callback: Function ): void;
	compile(
		scene: Scene,
		camera: Camera
	): void;
	render(
		scene: Scene,
		camera: Camera
	): void;
	getActiveCubeFace(): number;
	getActiveMipmapLevel(): number;
	getRenderTarget(): RenderTarget | null;
	getCurrentRenderTarget(): RenderTarget | null;
	setRenderTarget( renderTarget: RenderTarget | null, activeCubeFace?: number, activeMipmapLevel?: number ): void;

	readRenderTargetPixels(
		renderTarget: RenderTarget,
		x: number,
		y: number,
		width: number,
		height: number,
		buffer: any,
		activeCubeFaceIndex?: number
	): void;
	copyFramebufferToTexture( position: Vector2, texture: Texture, level?: number ): void;
	copyTextureToTexture( position: Vector2, srcTexture: Texture, dstTexture: Texture, level?: number ): void;
	initTexture( texture: Texture ): void;
	gammaFactor: number;
	vr: boolean;
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
	enableScissorTest( boolean: any ): any;

}
