//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Texture,
	WebGLRenderer
} from '../../../../src/Three';

import { Node } from './Node';

export class NodeFrame {

	constructor( time: number );
	time: number;
	id: number;
	delta: number | undefined;
	renderer: WebGLRenderer | undefined;
	renderTexture: Texture | undefined;

	update( delta: number ): this;
	setRenderer( renderer: WebGLRenderer ): this;
	setRenderTexture( renderTexture: Texture ): this;
	updateNode( node: Node ): this;

}
