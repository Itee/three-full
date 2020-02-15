//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Camera,
	EventDispatcher,
	Object3D
} from '../../../src/Three';

export class DragControls extends EventDispatcher {

	constructor( objects: Object3D[], camera: Camera, domElement?: HTMLElement );

	object: Camera;
	enabled: boolean;

	activate(): void;
	deactivate(): void;
	dispose(): void;

}
