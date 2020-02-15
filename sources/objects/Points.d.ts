//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from './../core/Geometry';
import { Material } from './../materials/Material';
import { Raycaster } from './../core/Raycaster';
import { Object3D } from './../core/Object3D';
import { BufferGeometry } from '../core/BufferGeometry';
import { Intersection } from '../core/Raycaster';
export class Points extends Object3D {
	constructor(
		geometry?: Geometry | BufferGeometry,
		material?: Material | Material[]
	);

	type: 'Points';
	morphTargetInfluences?: number[];
	morphTargetDictionary?: { [key: string]: number };
	readonly isPoints: true;
	geometry: Geometry | BufferGeometry;
	material: Material | Material[];

	raycast( raycaster: Raycaster, intersects: Intersection[] ): void;
	updateMorphTargets(): void;

}
