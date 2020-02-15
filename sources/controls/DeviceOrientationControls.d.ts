//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Camera
} from '../../../src/Three';

export class DeviceOrientationControls {

	constructor( object: Camera );

	object: Camera;
	alphaOffset: number;
	deviceOrientation: any;
	enabled: boolean;
	screenOrientation: number;

	connect(): void;
	disconnect(): void;
	dispose(): void;
	update(): void;

}
