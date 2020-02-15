//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode';
import { FunctionNode } from '../core/FunctionNode';
import { UVNode } from '../accessors/UVNode';
import { UVTransformNode } from '../utils/UVTransformNode';

export class NoiseNode extends TempNode {

	constructor( uv?: UVNode | UVTransformNode );

	uv: UVNode | UVTransformNode;
	nodeType: string;

	copy( source: NoiseNode ): this;

	static Nodes: {
		snoise: FunctionNode;
	};

}
