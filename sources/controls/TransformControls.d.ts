//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Object3D,
	Camera,
	MOUSE
} from '../../../src/Three';

export class TransformControls extends Object3D {

	constructor( object: Camera, domElement?: HTMLElement );

	domElement: HTMLElement;
	camera: Camera;
	object: Object3D | undefined;
	enabled: boolean;
	axis: string | null;
	mode: string;
	translationSnap: number | null;
	rotationSnap: number | null;
	space: string;
	size: number;
	dragging: boolean;
	showX: boolean;
	showY: boolean;
	showZ: boolean;
	readonly isTransformControls: true;
	mouseButtons: {
		LEFT: MOUSE;
		MIDDLE: MOUSE;
		RIGHT: MOUSE;
	};

	attach( object: Object3D ): this;
	detach(): this;
	getMode(): string;
	setMode( mode: string ): void;
	setTranslationSnap( translationSnap: Number | null ): void;
	setRotationSnap( rotationSnap: Number | null ): void;
	setSize( size: number ): void;
	setSpace( space: string ): void;
	dispose(): void;

}
