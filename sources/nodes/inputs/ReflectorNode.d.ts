//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from '../core/TempNode';
import { Matrix4Node } from './Matrix4Node';
import { OperatorNode } from '../math/OperatorNode';
import { ReflectorRTT } from '../../objects/ReflectorRTT';
import { TextureNode } from './TextureNode';
import { PositionNode } from '../accessors/PositionNode';

export class ReflectorNode extends TempNode {

	constructor( mirror?: ReflectorRTT );

	mirror: ReflectorRTT;
	textureMatrix: Matrix4Node;
	localPosition: PositionNode;
	uv: OperatorNode;
	uvResult: OperatorNode;
	texture: TextureNode;

	nodeType: string;

	copy( source: ReflectorNode ): this;

}
