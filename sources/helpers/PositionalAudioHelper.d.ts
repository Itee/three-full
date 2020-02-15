//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Line,
	PositionalAudio
} from '../../../src/Three';

export class PositionalAudioHelper extends Line {

	constructor( audio: PositionalAudio, range?: number, divisionsInnerAngle?: number, divisionsOuterAngle?: number );

	audio: PositionalAudio;
	range: number;
	divisionsInnerAngle: number;
	divisionsOuterAngle: number;

	dispose(): void;
	update(): void;

}
