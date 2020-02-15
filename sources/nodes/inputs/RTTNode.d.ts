//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Mesh,
	OrthographicCamera,
	Scene,
	WebGLRenderTarget,
	WebGLRenderTargetOptions
} from '../../../../src/Three';

import { NodeBuilder } from '../core/NodeBuilder';
import { NodeFrame } from '../core/NodeFrame';
import { TextureNode } from './TextureNode';

export interface RTTNodeOptions extends WebGLRenderTargetOptions {
	clear?: boolean;
}

export class RTTNode extends TextureNode {

	constructor( width: number, height: number, input: TextureNode, options?: RTTNodeOptions );

	input: TextureNode;
	clear: boolean;
	renderTarget: WebGLRenderTarget;
	material: object; 
	camera: OrthographicCamera;
	scene: Scene;
	quad: Mesh;
	render: boolean;

	build( builder: NodeBuilder, output: string, uuid?: string ): string;
	updateFramesaveTo( frame: NodeFrame ): void;
	updateFrame( frame: NodeFrame ): void;
	copy( source: RTTNode ): this;

}
