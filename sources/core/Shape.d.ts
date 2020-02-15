//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector2 } from './../../math/Vector2';
import { Path } from './Path';
import { ExtrudeGeometry } from './../../geometries/ExtrudeGeometry';
import { ShapeGeometry } from './../../geometries/ShapeGeometry';
export class Shape extends Path {

	constructor( points?: Vector2[] );

	holes: Path[];
	extrude( options?: any ): ExtrudeGeometry;
	makeGeometry( options?: any ): ShapeGeometry;
	getPointsHoles( divisions: number ): Vector2[][];
	extractAllPoints(
		divisions: number
	): {
		shape: Vector2[];
		holes: Vector2[][];
	};
	extractPoints( divisions: number ): {
		shape: Vector2[];
		holes: Vector2[][];
	};

}
