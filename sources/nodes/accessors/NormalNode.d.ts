//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode';

export class NormalNode extends TempNode {

	constructor( scope?: string );

	scope: string;
	nodeType: string;

	copy( source: NormalNode ): this;

	static LOCAL: string;
	static WORLD: string;

}
