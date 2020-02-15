//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	SkinnedMesh,
} from '../../../src/Three';

export interface IKS {
	effector: number;
	iteration: number;
	links: {
		enabled: boolean;
		index: number;
	}
	maxAngle: number;
	target: number;
}

export class CCDIKSolver {

	constructor( mesh: SkinnedMesh, iks: IKS[] );

	update(): this;
	createHelper(): CCDIKHelper;

}

export class CCDIKHelper {

	constructor( mesh: SkinnedMesh, iks: IKS[] );

}
