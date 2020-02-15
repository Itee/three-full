//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Camera,
	Mesh,
	OrthographicCamera,
	Scene,
	WebGLRenderer,
	WebGLRenderTarget,
} from '../../../../src/Three';

import { ScreenNode } from '../inputs/ScreenNode';
import { NodeMaterial } from '../materials/NodeMaterial';
import { NodeFrame } from '../core/NodeFrame';

export class NodePostProcessing {

	constructor( renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget );

	renderer: WebGLRenderer;
	renderTarget: WebGLRenderTarget;

	output: ScreenNode;
	material: NodeMaterial

	camera: OrthographicCamera;
	scene: Scene;

	quad: Mesh;
	needsUpdate: boolean;

	render( scene: Scene, camera: Camera, frame: NodeFrame ): void;
	setSize( width: number, height: number ): void;
	copy( source: NodePostProcessing ): this;
	toJSON( meta?: object | string ): object;

}
