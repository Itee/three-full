//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Node } from './Node';

export interface NodeUniformParams {
	name?: string;
	type?: string;
	node?: Node;
	needsUpdate?: boolean;
}

export class NodeUniform {

	constructor( params?: NodeUniformParams );
	name: string | undefined;
	type: string | undefined;
	node: Node | undefined;
	needsUpdate: boolean | undefined;
	value: any;

}
