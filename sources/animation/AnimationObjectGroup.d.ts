//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class AnimationObjectGroup {

	constructor( ...args: any[] );

	uuid: string;
	stats: {
		bindingsPerObject: number;
		objects: {
			total: number;
			inUse: number;
		};
	};
	readonly isAnimationObjectGroup: true;

	add( ...args: any[] ): void;
	remove( ...args: any[] ): void;
	uncache( ...args: any[] ): void;

}
