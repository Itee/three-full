//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { CullFace, Blending, BlendingEquation, BlendingSrcFactor, BlendingDstFactor, DepthModes } from '../../constants';
import { WebGLCapabilities } from './WebGLCapabilities';
import { WebGLExtensions } from './WebGLExtensions';
import { Material } from '../../materials/Material';
import { Vector4 } from '../../math/Vector4';

export class WebGLColorBuffer {

	constructor();

	setMask( colorMask: boolean ): void;
	setLocked( lock: boolean ): void;
	setClear( r: number, g: number, b: number, a: number, premultipliedAlpha: boolean ): void;
	reset(): void;

}

export class WebGLDepthBuffer {

	constructor();

	setTest( depthTest: boolean ): void;
	setMask( depthMask: boolean ): void;
	setFunc( depthFunc: DepthModes ): void;
	setLocked( lock: boolean ): void;
	setClear( depth: number ): void;
	reset(): void;

}

export class WebGLStencilBuffer {

	constructor();

	setTest( stencilTest: boolean ): void;
	setMask( stencilMask: number ): void;
	setFunc( stencilFunc: number, stencilRef: number, stencilMask: number ): void;
	setOp( stencilFail: number, stencilZFail: number, stencilZPass: number ): void;
	setLocked( lock: boolean ): void;
	setClear( stencil: number ): void;
	reset(): void;

}

export class WebGLState {

	constructor( gl: WebGLRenderingContext, extensions: WebGLExtensions, capabilities: WebGLCapabilities );

	buffers: {
		color: WebGLColorBuffer;
		depth: WebGLDepthBuffer;
		stencil: WebGLStencilBuffer;
	};

	initAttributes(): void;
	enableAttribute( attribute: number ): void;
	enableAttributeAndDivisor( attribute: number, meshPerAttribute: number ): void;
	disableUnusedAttributes(): void;
	enable( id: number ): void;
	disable( id: number ): void;
	useProgram( program: any ): boolean;
	setBlending(
		blending: Blending,
		blendEquation?: BlendingEquation,
		blendSrc?: BlendingSrcFactor,
		blendDst?: BlendingDstFactor,
		blendEquationAlpha?: BlendingEquation,
		blendSrcAlpha?: BlendingSrcFactor,
		blendDstAlpha?: BlendingDstFactor,
		premultiplyAlpha?: boolean
	): void;
	setMaterial( material: Material, frontFaceCW: boolean ): void;
	setFlipSided( flipSided: boolean ): void;
	setCullFace( cullFace: CullFace ): void;
	setLineWidth( width: number ): void;
	setPolygonOffset( polygonoffset: boolean, factor: number, units: number ): void;
	setScissorTest( scissorTest: boolean ): void;
	activeTexture( webglSlot: number ): void;
	bindTexture( webglType: number, webglTexture: any ): void;
	unbindTexture(): void;
	
	compressedTexImage2D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		border: number,
		data: ArrayBufferView
	): void;
	
	texImage2D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		border: number,
		format: number,
		type: number,
		pixels: ArrayBufferView | null
	): void;
	texImage2D(
		target: number,
		level: number,
		internalformat: number,
		format: number,
		type: number,
		source: any
	): void;
	texImage3D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		depth: number,
		border: number,
		format: number,
		type: number,
		pixels: any
	): void;
	scissor( scissor: Vector4 ): void;
	viewport( viewport: Vector4 ): void;
	reset(): void;

}
