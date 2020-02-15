//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Object3D,
	Scene,
	Camera
} from '../../../src/Three';

export class CSS2DObject extends Object3D {

	constructor( element: HTMLElement );
	element: HTMLElement;

	onBeforeRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
 	onAfterRender: (renderer: unknown, scene: Scene, camera: Camera) => void;

}

export class CSS2DRenderer {

	constructor();
	domElement: HTMLElement;

	getSize(): {width: number, height: number};
	setSize( width: number, height: number ): void;
	render( scene: Scene, camera: Camera ): void;

}
