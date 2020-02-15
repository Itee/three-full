//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Vector3 } from './Vector3';

export class SphericalHarmonics3 {

	constructor();

	coefficients: Vector3[];
	readonly isSphericalHarmonics3: true;

	set ( coefficients: Vector3[] ): SphericalHarmonics3;
	zero(): SphericalHarmonics3;
	add( sh: SphericalHarmonics3 ): SphericalHarmonics3;
	scale( s: number ): SphericalHarmonics3;
	lerp( sh: SphericalHarmonics3, alpha: number ): SphericalHarmonics3;
	equals( sh: SphericalHarmonics3 ): boolean;
	copy( sh: SphericalHarmonics3 ): SphericalHarmonics3;
	clone(): SphericalHarmonics3;
	fromArray( array: number[], offset?: number ): this;
	fromArray( array: ArrayLike<number>, offset?: number ): this;
	toArray( array?: number[], offset?: number ): number[];
	toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	getAt( normal: Vector3, target: Vector3 ) : Vector3;
	getIrradianceAt( normal: Vector3, target: Vector3 ) : Vector3;

	static getBasisAt( normal: Vector3, shBasis: number[] ): void;

}
