//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Camera,
	Vector3
} from '../../../src/Three';

export class FirstPersonControls {

	constructor( object: Camera, domElement?: HTMLElement );

	object: Camera;
	domElement: HTMLElement | HTMLDocument;

	enabled: boolean;
	movementSpeed: number;
	lookSpeed: number;
	lookVertical: boolean;
	autoForward: boolean;
	activeLook: boolean;
	heightSpeed: boolean;
	heightCoef: number;
	heightMin: number;
	heightMax: number;
	constrainVertical: boolean;
	verticalMin: number;
	verticalMax: number;
	mouseDragOn: boolean;

	handleResize(): void;
	lookAt( x: number | Vector3, y: number, z: number ): this;
	update( delta: number ): this;
	dispose(): void;

}
