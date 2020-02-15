//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface HSL {
	h: number;
	s: number;
	l: number;
}
export class Color {

	constructor( color?: Color | string | number );
	constructor( r: number, g: number, b: number );

	readonly isColor: true;
	r: number;
	g: number;
	b: number;

	set( color: Color ): Color;
	set( color: number ): Color;
	set( color: string ): Color;
	setScalar( scalar: number ): Color;
	setHex( hex: number ): Color;
	setRGB( r: number, g: number, b: number ): Color;
	setHSL( h: number, s: number, l: number ): Color;
	setStyle( style: string ): Color;
	setColorName( style: string ): Color;
	clone(): this;
	copy( color: Color ): this;
	copyGammaToLinear( color: Color, gammaFactor?: number ): Color;
	copyLinearToGamma( color: Color, gammaFactor?: number ): Color;
	convertGammaToLinear( gammaFactor?: number ): Color;
	convertLinearToGamma( gammaFactor?: number ): Color;
	copySRGBToLinear( color: Color ): Color;
	copyLinearToSRGB( color: Color ): Color;
	convertSRGBToLinear(): Color;
	convertLinearToSRGB(): Color;
	getHex(): number;
	getHexString(): string;

	getHSL( target: HSL ): HSL;
	getStyle(): string;

	offsetHSL( h: number, s: number, l: number ): this;

	add( color: Color ): this;
	addColors( color1: Color, color2: Color ): this;
	addScalar( s: number ): this;
	sub( color: Color ): this;
	multiply( color: Color ): this;
	multiplyScalar( s: number ): this;
	lerp( color: Color, alpha: number ): this;
	lerpHSL( color: Color, alpha: number ): this;
	equals( color: Color ): boolean;
	fromArray( array: number[], offset?: number ): this;
	fromArray( array: ArrayLike<number>, offset?: number ): this;
	toArray( array?: number[], offset?: number ): number[];
	toArray( xyz: ArrayLike<number>, offset?: number ): ArrayLike<number>;
	static NAMES: Record<string, number>;

}
