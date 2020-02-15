//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Mesh,
	Texture,
	Color
} from '../../../src/Three';

export class LensflareElement {

	constructor( texture: Texture, size?: number, distance?: number, color?: Color );
	texture: Texture;
	size: number;
	distance: number;
	color: Color;

}

export class Lensflare extends Mesh {

	constructor();
	readonly isLensflare: true;

	addElement( element: LensflareElement ): void;
	dispose(): void;

}
