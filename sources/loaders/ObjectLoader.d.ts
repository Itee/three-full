//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Loader } from './Loader';
import { LoadingManager } from './LoadingManager';
import { Object3D } from './../core/Object3D';
import { Texture } from './../textures/Texture';
import { Material } from './../materials/Material';
import { AnimationClip } from './../animation/AnimationClip';

export class ObjectLoader extends Loader {

	constructor( manager?: LoadingManager );

	load(
		url: string,
		onLoad?: <ObjectType extends Object3D>( object: ObjectType ) => void,
		onProgress?: ( event: ProgressEvent ) => void,
		onError?: ( event: Error | ErrorEvent ) => void
	): void;
	parse<T extends Object3D>( json: any, onLoad?: ( object: Object3D ) => void ): T;
	parseGeometries( json: any ): any[]; 
	parseMaterials( json: any, textures: Texture[] ): Material[]; 
	parseAnimations( json: any ): AnimationClip[];
	parseImages(
		json: any,
		onLoad: () => void
	): { [key: string]: HTMLImageElement };
	parseTextures( json: any, images: any ): Texture[];
	parseObject<T extends Object3D>(
		data: any,
		geometries: any[],
		materials: Material[]
	): T;

}
