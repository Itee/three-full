//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	WebGLRenderer,
	Vector2
} from '../../../src/Three';

import { SelectionBox } from './SelectionBox';

export class SelectionHelper {

	constructor( selectionBox: SelectionBox, renderer: WebGLRenderer, cssClassName: string );
	element: HTMLElement;
	isDown: boolean;
	pointBottomRight: Vector2;
	pointTopLeft: Vector2;
	renderer: WebGLRenderer;
	startPoint: Vector2;

	onSelectStart( event: Event ): void;
	onSelectMove( event: Event ): void;
	onSelectOver( event: Event ): void;

}
