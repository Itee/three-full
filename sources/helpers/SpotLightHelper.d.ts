//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Light } from './../lights/Light';
import { Color } from './../math/Color';
import { Matrix4 } from './../math/Matrix4';
import { Object3D } from './../core/Object3D';
import { LineSegments } from '../objects/LineSegments';

export class SpotLightHelper extends Object3D {

	constructor( light: Light, color?: Color | string | number );

	light: Light;
	matrix: Matrix4;
	matrixAutoUpdate: boolean;
	color: Color | string | number | undefined;
	cone: LineSegments;

	dispose(): void;
	update(): void;

}
