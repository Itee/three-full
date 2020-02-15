//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Bone } from './Bone';
import { Matrix4 } from './../math/Matrix4';
import { DataTexture } from './../textures/DataTexture';

export class Skeleton {

	constructor( bones: Bone[], boneInverses?: Matrix4[] );
	useVertexTexture: boolean;
	bones: Bone[];
	boneMatrices: Float32Array;
	boneTexture: undefined | DataTexture;
	boneInverses: Matrix4[];

	calculateInverses( bone: Bone ): void;
	pose(): void;
	update(): void;
	clone(): Skeleton;
	getBoneByName( name: string ): undefined | Bone;

}
