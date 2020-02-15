//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Color,
	Vector2
} from '../../../../../src/Three';

import { NodeBuilder } from '../../core/NodeBuilder';
import { StandardNode } from './StandardNode';
import { PropertyNode } from '../../inputs/PropertyNode';

export class MeshStandardNode extends StandardNode {

	constructor();

	properties: {
		color: Color;
		roughness: number;
		metalness: number;
		normalScale: Vector2;
	}

	inputs: {
		color: PropertyNode
		roughness: PropertyNode
		metalness: PropertyNode
		normalScale: PropertyNode
	}

	build( builder: NodeBuilder ): string;

}
