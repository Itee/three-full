//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Node } from './Node';
import { NodeBuilder } from './NodeBuilder';

export class VarNode extends Node {

	constructor( type: string, value?: any );

	value: any;
	nodeType: string;

	getType( builder: NodeBuilder ): string;
	copy( source: VarNode ): this;

}