//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Camera,
	EventDispatcher,
	Vector3
} from '../../../src/Three';

export class PointerLockControls extends EventDispatcher {

	constructor( camera: Camera, domElement?: HTMLElement );

	domElement: HTMLElement;
	isLocked: boolean;

	connect(): void;
	disconnect(): void;
	dispose(): void;
	getObject(): Camera;
	getDirection( v: Vector3 ): Vector3;
	moveForward( distance: number ): void;
	moveRight( distance: number ): void;
	lock(): void;
	unlock(): void;

}
