//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Mesh,
} from '../../../src/Three';

import { LineMaterial } from './LineMaterial';
import { LineSegmentsGeometry } from './LineSegmentsGeometry';

export class LineSegments2 extends Mesh {

	constructor( geometry?: LineSegmentsGeometry, material?: LineMaterial );
	readonly isLineSegments2: true;

	computeLineDistances(): this;

}
