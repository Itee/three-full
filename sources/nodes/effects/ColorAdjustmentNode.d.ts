//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode';
import { FloatNode } from '../inputs/FloatNode';
import { FunctionNode } from '../core/FunctionNode';
import { Node } from '../core/Node';

export class ColorAdjustmentNode extends TempNode {

	constructor( rgb: Node, adjustment?: FloatNode, method?: string );

	rgb: Node;
	adjustment: FloatNode | undefined;
	method: string;
	nodeType: string;

	copy( source: ColorAdjustmentNode ): this;

	static Nodes: {
		hue: FunctionNode;
		saturation: FunctionNode;
		vibrance: FunctionNode;
	}

	static SATURATION: string;
	static HUE: string;
	static VIBRANCE: string;
	static BRIGHTNESS: string;
	static CONTRAST: string;

}
