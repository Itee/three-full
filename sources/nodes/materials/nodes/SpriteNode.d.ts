//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { NodeBuilder } from '../../core/NodeBuilder';
import { Node } from '../../core/Node';

export class SpriteNode extends Node {

	constructor();

	color: Node;
	spherical: true;
	nodeType: string;

	build( builder: NodeBuilder ): string;
	copy( source: SpriteNode ): this;

}