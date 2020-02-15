//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Scene
} from '../../../src/Three';

export class TimelinerController {

	constructor( scene: Scene, trackInfo: object[], onUpdate: () => void );

	delKeyframe( channelName: string, time: number ): void;
	deserialize( structs: object ): void;
	getChannelKeyTimes(): number[];
	getChannelNames(): string[];
	init(): void;
	moveKeyframe( channelName: string, time: number, delta: number, moveRemaining: boolean ): void;
	serialize(): object;
	setDisplayTime( time: number ): void;
	setDuration( duration: number ): void;
	setKeyframe( channelName: string, time: number ): void;

}
