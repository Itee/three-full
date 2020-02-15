//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Object3D,
	Color,
	Scene,
	Camera
} from '../../../src/Three';

export class SVGObject extends Object3D {

	constructor( node: SVGElement );
	node: SVGElement;

}

export class SVGRenderer {

	constructor();
	domElement: SVGElement;
	autoClear: boolean;
	sortObjects: boolean;
	sortElements: boolean;
	overdraw: number;
	info: {render: {vertices: number, faces: number}};

	setQuality( quality: string ): void;
	setClearColor( color: Color, alpha: number ): void;
	setPixelRatio(): void;
	setSize( width: number, height: number ): void;
	setPrecision( precision: number ): void;
	clear(): void;
	render( scene: Scene, camera: Camera ): void;

}
