//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './Vector3';

export class Spherical {

	constructor( radius?: number, phi?: number, theta?: number );

	radius: number;
	phi: number;
	theta: number;

	set( radius: number, phi: number, theta: number ): this;
	clone(): this;
	copy( other: Spherical ): this;
	makeSafe(): this;
	setFromVector3( v: Vector3 ): this;
	setFromCartesianCoords( x: number, y: number, z: number ): this;

}
