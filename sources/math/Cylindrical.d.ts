//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './Vector3';

export class Cylindrical {

	constructor( radius?: number, theta?: number, y?: number );

	radius: number;
	theta: number;
	y: number;

	clone(): this;
	copy( other: Cylindrical ): this;
	set( radius: number, theta: number, y: number ): this;
	setFromVector3( vec3: Vector3 ): this;
	setFromCartesianCoords( x: number, y: number, z: number ): this;

}
