//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Curve } from './Curve';
import { Geometry } from './../../core/Geometry';
import { Vector } from './../../math/Vector2';

export class CurvePath<T extends Vector> extends Curve<T> {

	constructor();

	curves: Curve<T>[];
	autoClose: boolean;

	add( curve: Curve<T> ): void;
	checkConnection(): boolean;
	closePath(): void;
	getPoint( t: number ): T;
	getLength(): number;
	updateArcLengths(): void;
	getCurveLengths(): number[];
	getSpacedPoints( divisions?: number ): T[];
	getPoints( divisions?: number ): T[];
	createPointsGeometry( divisions: number ): Geometry;
	
	createSpacedPointsGeometry( divisions: number ): Geometry;
	
	createGeometry( points: T[] ): Geometry;

}
