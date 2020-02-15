//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { NodeBuilder } from '../../core/NodeBuilder';
import { Node } from '../../core/Node';

export class PhongNode extends Node {

	constructor();

	color: Node;
	specular: Node;
	shininess: Node;
	nodeType: string;

	build( builder: NodeBuilder ): string;
	copy( source: PhongNode ): this;

}
