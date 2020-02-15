//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Plane } from './../math/Plane';
import { Shader } from './../renderers/shaders/ShaderLib';
import { EventDispatcher } from './../core/EventDispatcher';
import { WebGLRenderer } from './../renderers/WebGLRenderer';
import {
	BlendingDstFactor,
	BlendingEquation,
	Blending,
	BlendingSrcFactor,
	DepthModes,
	Side,
	Colors,
	StencilFunc,
	StencilOp
} from '../constants';
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
	defines?: any;
	depthFunc?: DepthModes;
	depthTest?: boolean;
	depthWrite?: boolean;
	fog?: boolean;
	name?: string;
	opacity?: number;
	polygonOffset?: boolean;
	polygonOffsetFactor?: number;
	polygonOffsetUnits?: number;
	precision?: 'highp' | 'mediump' | 'lowp' | null;
	premultipliedAlpha?: boolean;
	dithering?: boolean;
	flatShading?: boolean;
	side?: Side;
	shadowSide?: Side;
	toneMapped?: boolean;
	transparent?: boolean;
	vertexColors?: Colors;
	vertexTangents?: boolean;
	visible?: boolean;
	stencilWrite?: boolean;
	stencilFunc?: StencilFunc;
	stencilRef?: number;
	stencilMask?: number;
	stencilFail?: StencilOp;
	stencilZFail?: StencilOp;
	stencilZPass?: StencilOp;
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
	defines: any;
	depthFunc: DepthModes;
	depthTest: boolean;
	depthWrite: boolean;
	fog: boolean;
	id: number;
	stencilWrite: boolean;
	stencilFunc: StencilFunc;
	stencilRef: number;
	stencilMask: number;
	stencilFail: StencilOp;
	stencilZFail: StencilOp;
	stencilZPass: StencilOp;
	readonly isMaterial: true;
	name: string;
	needsUpdate: boolean;
	opacity: number;
	polygonOffset: boolean;
	polygonOffsetFactor: number;
	polygonOffsetUnits: number;
	precision: 'highp' | 'mediump' | 'lowp' | null;
	premultipliedAlpha: boolean;
	dithering: boolean;
	flatShading: boolean;
	side: Side;
	shadowSide: Side;
	toneMapped: boolean;
	transparent: boolean;
	type: string;
	uuid: string;
	vertexColors: Colors;
	vertexTangents: boolean;
	visible: boolean;
	userData: any;
	version: number;
	clone(): this;
	copy( material: Material ): this;
	dispose(): void;
	onBeforeCompile ( shader : Shader, renderer : WebGLRenderer ) : void;
	setValues( values: MaterialParameters ): void;
	toJSON( meta?: any ): any;

}
