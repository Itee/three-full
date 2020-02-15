//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Loader,
	LoadingManager,
	Group,
	Material
} from '../../../src/Three';

export class LDrawLoader extends Loader {

	constructor( manager?: LoadingManager );

	load( url: string, onLoad: ( data: Group ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	setFileMap( fileMap: Record<string, string> ): void;
	setMaterials( materials: Material[] ): void;

	parse( text: string, path: string, onLoad: ( data: Group ) => void ): void;

	addMaterial( material: Material ): void;
	getMaterial( colourCode: string ): Material | null;

}
