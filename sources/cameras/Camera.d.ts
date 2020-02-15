//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Matrix4 } from './../math/Matrix4';
import { Vector3 } from './../math/Vector3';
import { Object3D } from './../core/Object3D';
export class Camera extends Object3D {
	constructor();
	matrixWorldInverse: Matrix4;
	projectionMatrix: Matrix4;
	projectionMatrixInverse: Matrix4;

	readonly isCamera: true;

	getWorldDirection( target: Vector3 ): Vector3;

	updateMatrixWorld( force?: boolean ): void;

}
