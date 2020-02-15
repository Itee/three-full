//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Scene,
	Camera,
	Color,
	ShaderMaterial
} from '../../../src/Three';

import { Pass } from './Pass';

export class SSAARenderPass extends Pass {

	constructor( scene: Scene, camera: Camera, clearColor: Color | string | number, clearAlpha: number );
	scene: Scene;
	camera: Camera;
	sampleLevel: number;
	unbiased: boolean;
	clearColor: Color | string | number;
	clearAlpha: number;
	copyUniforms: object;
	copyMaterial: ShaderMaterial;
	fsQuad: object;

}
