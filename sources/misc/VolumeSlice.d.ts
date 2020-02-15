//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Matrix3,
	Mesh,
} from '../../../src/Three';

import { Volume } from './Volume';

export class VolumeSlice {

	constructor( volume: Volume, index?: number, axis?: string );

	index: number;
	axis: string;

	canvas: HTMLCanvasElement;
	canvasBuffer: HTMLCanvasElement;

	ctx: CanvasRenderingContext2D;
	ctxBuffer: CanvasRenderingContext2D;

	mesh: Mesh;

	geometryNeedsUpdate: boolean;

	sliceAccess: number;
	jLength: number;
	iLength: number;
	matrix: Matrix3;

	repaint(): void;
	updateGeometry(): void;

}
