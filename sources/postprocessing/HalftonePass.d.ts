//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	ShaderMaterial,
} from '../../../src/Three';

import { Pass } from './Pass';

export interface HalftonePassParameters {
	shape?: number;
	radius?: number;
	rotateR?: number;
	rotateB?: number;
	rotateG?: number;
	scatter?: number;
	blending?: number;
	blendingMode?: number;
	greyscale?: boolean;
	disable?: boolean;
}

export class HalftonePass extends Pass {

	constructor( width: number, height: number, params: HalftonePassParameters );
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;

}
