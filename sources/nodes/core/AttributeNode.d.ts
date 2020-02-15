//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from './TempNode';
import { NodeBuilder } from './NodeBuilder';

export class AttributeNode extends TempNode {

	constructor( name: string, type?: string );

	name: string;
	nodeType: string;

	getAttributeType( builder: NodeBuilder ): string;
	getType( builder: NodeBuilder ): string;
	copy( source: AttributeNode ): this;

}
