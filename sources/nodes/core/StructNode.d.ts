//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from './TempNode';
import { NodeBuilder } from './NodeBuilder';

export interface StructNodeInput {
	type: string;
	name: string;
}

export class StructNode extends TempNode {

	constructor( src?: string );

	inputs: StructNodeInput[];
	src: string;
	nodeType: string;

	getType( builder: NodeBuilder ): string;
	getInputByName( name: string ): StructNodeInput;
	parse( src: string ): void;

}
