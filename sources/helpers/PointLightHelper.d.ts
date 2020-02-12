//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { PointLight } from './../lights/PointLight';
import { Color } from './../math/Color';
import { Matrix4 } from './../math/Matrix4';
import { Object3D } from './../core/Object3D';

export class PointLightHelper extends Object3D {

	constructor(
		light: PointLight,
		sphereSize?: number,
		color?: Color | string | number
	);

	light: PointLight;
	color: Color | string | number | undefined;
	matrix: Matrix4;
	matrixAutoUpdate: boolean;

	dispose(): void;
	update(): void;

}
