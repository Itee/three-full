//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Camera } from './Camera';
export class PerspectiveCamera extends Camera {
	constructor( fov?: number, aspect?: number, near?: number, far?: number );

	type: 'PerspectiveCamera';

	readonly isPerspectiveCamera: true;

	zoom: number;
	fov: number;
	aspect: number;
	near: number;
	far: number;

	focus: number;
	view: null | {
		enabled: boolean;
		fullWidth: number;
		fullHeight: number;
		offsetX: number;
		offsetY: number;
		width: number;
		height: number;
	};
	filmGauge: number;
	filmOffset: number;

	setFocalLength( focalLength: number ): void;
	getFocalLength(): number;
	getEffectiveFOV(): number;
	getFilmWidth(): number;
	getFilmHeight(): number;
	setViewOffset(
		fullWidth: number,
		fullHeight: number,
		x: number,
		y: number,
		width: number,
		height: number
	): void;
	clearViewOffset(): void;
	updateProjectionMatrix(): void;
	toJSON( meta?: any ): any;
	setLens( focalLength: number, frameHeight?: number ): void;

}
