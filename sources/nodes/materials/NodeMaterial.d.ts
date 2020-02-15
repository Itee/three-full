//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	ShaderMaterial,
	WebGLRenderer
} from '../../../../src/Three';

import { NodeBuilder } from '../core/NodeBuilder';
import { NodeFrame } from '../core/NodeFrame';
import { MeshStandardNode } from './nodes/MeshStandardNode';
import { RawNode } from './nodes/RawNode';

export interface NodeMaterialBuildParams {
	builder?: NodeBuilder;
	renderer?: WebGLRenderer;
}

export class NodeMaterial extends ShaderMaterial {

	constructor( vertex: MeshStandardNode, fragment: MeshStandardNode );

	vertex: MeshStandardNode | RawNode;
	fragment: MeshStandardNode | RawNode;

	updaters: object[];

	isNodeMaterial: boolean;
	properties: object;

	updateFrame( frame: NodeFrame ): void;
	build( params?: NodeMaterialBuildParams ): this;
	copy( source: NodeMaterial ): this;

}