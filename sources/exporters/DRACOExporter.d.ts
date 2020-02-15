//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	BufferGeometry,
	Geometry
} from '../../../src/Three';

export interface DRACOExporterOptions {
	decodeSpeed?: number;
	encodeSpeed?: number;
	encoderMethod?: number;
	quantization?: number[];
	exportUvs?: boolean;
	exportNormals?: boolean;
	exportColor?: boolean;
}

export class DRACOExporter {

	constructor();

	parse( geometry: BufferGeometry | Geometry, options: DRACOExporterOptions ): Int8Array;

}
