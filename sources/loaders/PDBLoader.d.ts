//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	BufferGeometry,
	Loader,
	LoadingManager
} from '../../../src/Three';

export interface PDB {
	geometryAtoms: BufferGeometry;
	geometryBonds: BufferGeometry;
	json: {
		atoms: any[][],
		bonds: number[][]
	}
}
export class PDBLoader extends Loader {

	constructor( manager?: LoadingManager );

	load( url: string, onLoad: ( pdb: PDB ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	parse( text: string ) : PDB;

}
