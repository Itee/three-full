//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ShaderPass } from '../../postprocessing/ShaderPass';
import { ScreenNode } from '../inputs/ScreenNode';

export class NodePass extends ShaderPass {

	constructor();

	name: string;
	uuid: string;
	userData: object;
	input: ScreenNode;
	needsUpdate: boolean;

	copy( source: NodePass ): this;
	toJSON( meta?: object | string ): object;

}
