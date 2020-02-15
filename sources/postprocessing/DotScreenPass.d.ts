//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Vector2,
	ShaderMaterial
} from '../../../src/Three';

import { Pass } from './Pass';

export class DotScreenPass extends Pass {

	constructor( center?: Vector2, angle?: number, scale?: number );
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;

}
