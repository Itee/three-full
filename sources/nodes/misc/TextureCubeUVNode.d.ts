//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode';
import { FloatNode } from '../inputs/FloatNode';
import { StructNode } from '../core/StructNode';
import { FunctionNode } from '../core/FunctionNode';
import { Node } from '../core/Node';

export class TextureCubeUVNode extends TempNode {

	constructor( uv: Node, textureSize: FloatNode );

	uv: Node;
	textureSize: FloatNode;
	nodeType: string;

	static Nodes: {
		TextureCubeUVData: StructNode;
		textureCubeUV: FunctionNode;
	}

}
