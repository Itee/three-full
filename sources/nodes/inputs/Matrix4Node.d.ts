//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Matrix4 } from '../../../../src/Three';

import { InputNode } from '../core/InputNode';
import { NodeBuilder } from '../core/NodeBuilder';

export class Matrix4Node extends InputNode {

	constructor( matrix?: Matrix4 );

	value: Matrix4;
	nodeType: string;
	elements: number[];

	generateReadonly( builder: NodeBuilder, output: string, uuid?: string, type?: string, ns?: string, needsUpdate?: boolean ): string;
	copy( source: Matrix4Node ): this;

}
