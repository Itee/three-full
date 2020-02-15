//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { NodeFrame } from '../core/NodeFrame';
import { FloatNode } from '../inputs/FloatNode';

export class TimerNode extends FloatNode {

	constructor( scale?: number, scope?: string, timeScale?: boolean );

	scale: number;
	scope: string;
	timeScale: boolean;
	nodeType: string;

	getUnique(): boolean;
	updateFrame( frame: NodeFrame ): void;
	copy( source: TimerNode ): this;

	static GLOBAL: string;
	static LOCAL: string;
	static DELTA: string;

}
