//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AnimationClip } from './AnimationClip';

export namespace AnimationUtils {
	export function arraySlice( array: any, from: number, to: number ): any;
	export function convertArray( array: any, type: any, forceClone: boolean ): any;
	export function isTypedArray( object: any ): boolean;
	export function getKeyFrameOrder( times: number[] ): number[];
	export function sortedArray(
		values: any[],
		stride: number,
		order: number[]
	): any[];
	export function flattenJSON(
		jsonKeys: string[],
		times: any[],
		values: any[],
		valuePropertyName: string
	): void;
	export function subclip(
		sourceClip: AnimationClip,
		name: string,
		startFrame: number,
		endFrame: number,
		fps?: number
	): AnimationClip;
}
