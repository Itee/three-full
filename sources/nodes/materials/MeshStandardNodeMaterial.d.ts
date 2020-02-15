//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from '../../../../src/math/Color';
import { Texture } from '../../../../src/textures/Texture';
import { CubeTexture } from '../../../../src/textures/CubeTexture';
import { Vector2 } from '../../../../src/math/Vector2';

import { Node } from '../core/Node';
import { NodeMaterial } from './NodeMaterial';

export class MeshStandardNodeMaterial extends NodeMaterial {

	constructor();

	color: Color | Node;
	roughness: number | Node;
	metalness: number | Node;
	map: Texture | Node;
	normalMap: Texture | Node;
	normalScale: Vector2 | Node;
	metalnessMap: Texture | Node;
	roughnessMap: Texture | Node;
	envMap: CubeTexture | Node;

}
