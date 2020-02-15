//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../core/Object3D';
import { Bone } from './../objects/Bone';
import { LineSegments } from './../objects/LineSegments';

export class SkeletonHelper extends LineSegments {

	constructor( object: Object3D );

	bones: Bone[];
	root: Object3D;

	getBoneList( object: Object3D ): Bone[];
	update(): void;

}
