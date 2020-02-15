//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode, TempNodeParams } from './TempNode';
import { NodeBuilder } from './NodeBuilder';

export class InputNode extends TempNode {

	constructor( type: string, params?: TempNodeParams );

	readonly: boolean;

	setReadonly( value: boolean ): this;
	getReadonly( builder: NodeBuilder ): boolean;
	copy( source: InputNode ): this;

}
