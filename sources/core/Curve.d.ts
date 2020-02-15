//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector } from './../../math/Vector2';
export class Curve<T extends Vector> {
	arcLengthDivisions: number;
	getPoint( t: number, optionalTarget?: T ): T;
	getPointAt( u: number, optionalTarget?: T ): T;
	getPoints( divisions?: number ): T[];
	getSpacedPoints( divisions?: number ): T[];
	getLength(): number;
	getLengths( divisions?: number ): number[];
	updateArcLengths(): void;
	getUtoTmapping( u: number, distance: number ): number;
	getTangent( t: number ): T;
	getTangentAt( u: number ): T;
	static create( constructorFunc: Function, getPointFunc: Function ): Function;

}
