//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Plane } from './../math/Plane';
import { LineSegments } from './../objects/LineSegments';

export class PlaneHelper extends LineSegments {

	constructor( plane: Plane, size?: number, hex?: number );

	plane: Plane;
	size: number;

	updateMatrixWorld( force?: boolean ): void;

}
