//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Geometry } from './../core/Geometry';
import { PolyhedronBufferGeometry } from './PolyhedronGeometry';

export class DodecahedronBufferGeometry extends PolyhedronBufferGeometry {

	constructor( radius?: number, detail?: number );

}

export class DodecahedronGeometry extends Geometry {

	constructor( radius?: number, detail?: number );

	parameters: {
		radius: number;
		detail: number;
	};

}
