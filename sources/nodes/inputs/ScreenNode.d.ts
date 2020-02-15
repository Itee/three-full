//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { NodeBuilder } from '../core/NodeBuilder';
import { TextureNode } from './TextureNode';
import { UVNode } from '../accessors/UVNode';

export class ScreenNode extends TextureNode {

	constructor( uv?: UVNode );

	nodeType: string;

	getTexture( builder: NodeBuilder, output: string ): string;

}
