//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Group } from '../../objects/Group';
import { Camera } from '../../cameras/Camera';

export class WebXRManager {

	constructor( renderer: any, gl: WebGLRenderingContext );

	enabled: boolean;
	isPresenting: boolean;
	getController( id: number ): Group;
	getControllerGrip( id: number ): Group;
	setFramebufferScaleFactor( value: number ): void;
	setReferenceSpaceType( value: string ): void;
	getReferenceSpace(): any;
	getSession(): any;
	setSession( value: any ): void;
	getCamera( camera: Camera ): Camera;
	setAnimationLoop( callback: Function ): void;
	dispose(): void;

}
