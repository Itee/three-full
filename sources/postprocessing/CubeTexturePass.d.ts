//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	PerspectiveCamera,
	CubeTexture,
	Mesh,
	Scene
} from '../../../src/Three';

import { Pass } from './Pass';

export class CubeTexturePass extends Pass {

	constructor( camera: PerspectiveCamera, envMap?: CubeTexture, opacity?: number );
	camera: PerspectiveCamera;
	cubeShader: object;
	cubeMesh: Mesh;
	envMap: CubeTexture;
	opacity: number;
	cubeScene: Scene;
	cubeCamera: PerspectiveCamera;

}
