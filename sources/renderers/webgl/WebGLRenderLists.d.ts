//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../../core/Object3D';
import { Material } from './../../materials/Material';
import { WebGLProgram } from './WebGLProgram';
import { Group } from './../../objects/Group';
import { Scene } from './../../scenes/Scene';
import { Camera } from './../../cameras/Camera';
import { BufferGeometry } from '../../core/BufferGeometry';

export interface RenderTarget {} 

export interface RenderItem {
	id: number;
	object: Object3D;
	geometry: BufferGeometry | null;
	material: Material;
	program: WebGLProgram;
	groupOrder: number;
	renderOrder: number;
	z: number;
	group: Group | null;
}

export class WebGLRenderList {

	opaque: Array<RenderItem>;
	transparent: Array<RenderItem>;
	init(): void;
	push(
		object: Object3D,
		geometry: BufferGeometry | null,
		material: Material,
		groupOrder: number,
		z: number,
		group: Group | null
	): void;
	unshift(
		object: Object3D,
		geometry: BufferGeometry | null,
		material: Material,
		groupOrder: number,
		z: number,
		group: Group | null
	): void;
	sort(): void;

}

export class WebGLRenderLists {

	dispose(): void;
	get( scene: Scene, camera: Camera ): WebGLRenderList;

}
