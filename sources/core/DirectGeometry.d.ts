//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './../math/Vector3';
import { Color } from './../math/Color';
import { Vector2 } from './../math/Vector2';
import { Vector4 } from './../math/Vector4';
import { Box3 } from './../math/Box3';
import { Sphere } from './../math/Sphere';
import { Geometry } from './Geometry';
import { MorphTarget } from './Geometry';

export class DirectGeometry {

	constructor();

	id: number;
	uuid: string;
	name: string;
	type: string;
	indices: number[];
	vertices: Vector3[];
	normals: Vector3[];
	colors: Color[];
	uvs: Vector2[];
	uvs2: Vector2[];
	groups: { start: number; materialIndex: number }[];
	morphTargets: MorphTarget[];
	skinWeights: Vector4[];
	skinIndices: Vector4[];
	boundingBox: Box3;
	boundingSphere: Sphere;
	verticesNeedUpdate: boolean;
	normalsNeedUpdate: boolean;
	colorsNeedUpdate: boolean;
	uvsNeedUpdate: boolean;
	groupsNeedUpdate: boolean;

	computeBoundingBox(): void;
	computeBoundingSphere(): void;
	computeGroups( geometry: Geometry ): void;
	fromGeometry( geometry: Geometry ): DirectGeometry;
	dispose(): void;

}
