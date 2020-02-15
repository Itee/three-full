//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode';
import { MaxMIPLevelNode } from '../utils/MaxMIPLevelNode';
import { FunctionNode } from '../core/FunctionNode';

export class SpecularMIPLevelNode extends TempNode {

	constructor( texture: Node );

	texture: Node;
	maxMIPLevel: MaxMIPLevelNode;
	nodeType: string;

	copy( source: SpecularMIPLevelNode ): this;

	static Nodes: {
		getSpecularMIPLevel: FunctionNode;
	};

}
