//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { KeyframeTrack } from './KeyframeTrack';
import { Bone } from './../objects/Bone';
import { MorphTarget } from '../core/Geometry';

export class AnimationClip {

	constructor( name?: string, duration?: number, tracks?: KeyframeTrack[] );

	name: string;
	tracks: KeyframeTrack[];
	duration: number;
	uuid: string;
	results: any[];

	resetDuration(): AnimationClip;
	trim(): AnimationClip;
	validate(): boolean;
	optimize(): AnimationClip;
	clone(): AnimationClip;

	static CreateFromMorphTargetSequence(
		name: string,
		morphTargetSequence: MorphTarget[],
		fps: number,
		noLoop: boolean
	): AnimationClip;
	static findByName( clipArray: AnimationClip[], name: string ): AnimationClip;
	static CreateClipsFromMorphTargetSequences(
		morphTargets: MorphTarget[],
		fps: number,
		noLoop: boolean
	): AnimationClip[];
	static parse( json: any ): AnimationClip;
	static parseAnimation(
		animation: any,
		bones: Bone[],
		nodeName: string
	): AnimationClip;
	static toJSON(): any;

}
