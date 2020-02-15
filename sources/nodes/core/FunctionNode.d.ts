//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from './TempNode';
import { NodeBuilder } from './NodeBuilder';

export interface FunctionNodeInput {
	name: string;
	type: string;
	qualifier: string;
}

export class FunctionNode extends TempNode {

	constructor( src: string, includes?: object[], extensions?: object, keywords?: object, type?: string );

	isMethod: boolean;
	nodeType: string;
	useKeywords: boolean;

	inputs: FunctionNodeInput[] | undefined;
	includes: object[] | undefined;
	extensions: object | undefined;
	keywords: object | undefined;

	getShared( builder: NodeBuilder, output: string ): boolean;
	getType( builder: NodeBuilder ): string;
	getInputByName( name: string ): FunctionNodeInput | undefined;
	getIncludeByName( name: string ): object | undefined;
	parse( src: string, includes?: object[], extensions?: object, keywords?: object ): void;
	copy( source: FunctionNode ): this;

}
