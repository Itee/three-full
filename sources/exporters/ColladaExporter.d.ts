//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from '../../../src/Three';

export interface ColladaExporterOptions {
	author?: string;
	textureDirectory?: string;
	version?: string;
}

export interface ColladaExporterResult {
	data: string;
	textures: object[];
}

export class ColladaExporter {

	constructor();

	parse( object: Object3D, onDone: ( res: ColladaExporterResult ) => void, options: ColladaExporterOptions ): ColladaExporterResult | null;

}
