//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Node } from './Node';
import { FunctionNode } from './FunctionNode';
import { TempNode } from './TempNode';

export class FunctionCallNode extends TempNode {

	constructor( func: FunctionNode, inputs?: Node[] );

	nodeType: string;

	value: FunctionNode;
	inputs: Node[];

	setFunction( func: FunctionNode, inputs?: Node[] ): void;
	getFunction(): FunctionNode;
	getType(): string;
	copy( source: FunctionCallNode ): this;

}
