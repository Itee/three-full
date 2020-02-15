//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Node } from './Node';
import { NodeBuilder } from './NodeBuilder';

export interface TempNodeParams {
	shared?: boolean;
	unique?: boolean;
}

export class TempNode extends Node {

	constructor( type: string, params?: TempNodeParams );

	shared: boolean;
	unique: boolean;
	label: string | undefined;

	build( builder: NodeBuilder, output: string, uuid?: string, ns?: string ): string;
	getShared( builder: NodeBuilder, output: string ): boolean;
	getUnique( builder: NodeBuilder, output: string ): boolean;
	setLabel( name: string ): this;
	getLabel( builder: NodeBuilder ): string;
	getUuid( unique: boolean ): string;
	getTemp( builder: NodeBuilder, uuid: string ): string | undefined;

}
