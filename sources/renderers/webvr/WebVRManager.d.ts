//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from '../../core/Object3D';
import { Group } from '../../objects/Group';
import { PerspectiveCamera } from '../../cameras/PerspectiveCamera';
import { ArrayCamera } from '../../cameras/ArrayCamera';
import { Matrix4 } from '../../math/Matrix4';

export class WebVRManager {

	constructor( renderer: any );

	enabled: boolean;
	getController( id: number ): Group;
	getDevice(): VRDisplay | null;
	setDevice( device: VRDisplay | null ): void;
	setFramebufferScaleFactor( value: number ): void;
	setReferenceSpaceType( value: string ): void;
	setPoseTarget( object: Object3D | null ): void;
	getCamera( camera: PerspectiveCamera ): PerspectiveCamera | ArrayCamera;
	getStandingMatrix(): Matrix4;
	isPresenting: () => boolean;
	setAnimationLoop( callback: Function ): void;
	submitFrame(): void;
	dispose(): void;

}
