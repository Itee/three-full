//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Material,
	LoadingManager,
	Mapping,
	Loader,
	BufferGeometry,
	Side,
	Texture,
	Vector2,
	Wrapping
} from '../../../src/Three';

export interface MaterialCreatorOptions {
	
	side?: Side;
	
	wrap?: Wrapping;
	
	normalizeRGB?: boolean;
	
	ignoreZeroRGBs?: boolean;
	
	invertTrProperty?: boolean;
}

export class MTLLoader extends Loader {

	constructor( manager?: LoadingManager );
	materialOptions: MaterialCreatorOptions;

	load( url: string, onLoad: ( materialCreator: MTLLoader.MaterialCreator ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ): void;
	parse( text: string, path: string ) : MTLLoader.MaterialCreator;
	setMaterialOptions( value: MaterialCreatorOptions ) : void;

}

export interface MaterialInfo {
	ks?: number[];
	kd?: number[];
	ke?: number[];
	map_kd?: string;
	map_ks?: string;
	map_ke?: string;
	norm?: string;
	map_bump?: string;
	bump?: string;
	map_d?: string;
	ns?: number;
	d?: number;
	tr?: number;
}

export interface TexParams {
	scale: Vector2;
	offset: Vector2;
	url: string;
}

export namespace MTLLoader {
	export class MaterialCreator {

		constructor( baseUrl?: string, options?: MaterialCreatorOptions );

		baseUrl : string;
		options : MaterialCreatorOptions;
		materialsInfo : {[key: string]: MaterialInfo};
		materials : {[key: string]: Material};
		private materialsArray : Material[];
		nameLookup : {[key: string]: number};
		side : Side;
		wrap : Wrapping;
		crossOrigin : string;

		setCrossOrigin( value: string ) : this;
		setManager( value: LoadingManager ) : void;
		setMaterials( materialsInfo: {[key: string]: MaterialInfo} ) : void;
		convert( materialsInfo: {[key: string]: MaterialInfo} ) : {[key: string]: MaterialInfo};
		preload() : void;
		getIndex( materialName: string ) : Material;
		getAsArray() : Material[];
		create( materialName: string ) : Material;
		createMaterial_( materialName: string ) : Material;
		getTextureParams( value: string, matParams: any ) : TexParams;
		loadTexture( url: string, mapping?: Mapping, onLoad?: ( bufferGeometry: BufferGeometry ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ): Texture;

	}
}
