//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { InputNode } from '../core/InputNode';
import { NodeBuilder } from '../core/NodeBuilder';

export class FloatNode extends InputNode {

	constructor( value?: number );

	value: number;
	nodeType: string;

	generateReadonly( builder: NodeBuilder, output: string, uuid?: string, type?: string, ns?: string, needsUpdate?: boolean ): string;
	copy( source: FloatNode ): this;

}
