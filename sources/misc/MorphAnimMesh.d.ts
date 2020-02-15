//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	AnimationAction,
	AnimationMixer,
	BufferGeometry,
	Geometry,
	Material,
	Mesh
} from '../../../src/Three';

export class MorphAnimMesh extends Mesh {

	constructor( geometry: BufferGeometry | Geometry, material: Material );
	mixer: AnimationMixer;
	activeAction: AnimationAction | null;

	setDirectionForward(): void;
	setDirectionBackward(): void;
	playAnimation( label: string, fps: number ): void;
	updateAnimation( delta: number ): void;
	copy( source: MorphAnimMesh ): this;

}
