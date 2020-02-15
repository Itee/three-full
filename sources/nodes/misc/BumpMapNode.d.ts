//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode';
import { FloatNode } from '../inputs/FloatNode';
import { FunctionNode } from '../core/FunctionNode';
import { TextureNode } from '../inputs/TextureNode';

export class BumpMapNode extends TempNode {

	constructor( value: TextureNode, scale?: FloatNode );

	value: TextureNode;
	scale: FloatNode;
	toNormalMap: boolean;
	nodeType: string;

	copy( source: BumpMapNode ): this;

	static Nodes: {
		dHdxy_fwd: FunctionNode;
		perturbNormalArb: FunctionNode;
		bumpToNormal: FunctionNode;
	}

}
