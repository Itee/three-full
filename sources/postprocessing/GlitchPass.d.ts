//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	ShaderMaterial,
	DataTexture
} from '../../../src/Three';

import { Pass } from './Pass';

export class GlitchPass extends Pass {

	constructor( dt_size?: number );
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
	goWild: boolean;
	curF: number;
	randX: number;

	generateTrigger(): void;
	generateHeightmap( dt_size: number ): DataTexture;

}
