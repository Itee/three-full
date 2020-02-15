//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	LoadingManager
} from '../../../src/Three';

import {
	Volume
} from '../misc/Volume';

export class NRRDLoader {

	constructor( manager?: LoadingManager );
	manager: LoadingManager;
	path: string;

	fieldFunctions: object;

	load( url: string, onLoad: ( group: Volume ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ): void;
	parse( data: string ) : Volume;
	parseChars( array: number[], start?: number, end?: number ) : string;
	setPath( value: string ) : this;

}
