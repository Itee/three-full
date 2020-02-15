//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode';
import { Node } from '../core/Node';

export class OperatorNode extends TempNode {

	constructor( a: Node, b: Node, op: string );

	a: Node;
	b: Node;
	op: string;

	copy( source: OperatorNode ): this;

	static ADD: string;
	static SUB: string;
	static MUL: string;
	static DIV: string;

}
