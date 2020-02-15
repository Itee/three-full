//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { IFog } from './Fog';
import { Material } from './../materials/Material';
import { Object3D } from './../core/Object3D';
import { Color } from '../math/Color';
import { Texture } from '../textures/Texture';
export class Scene extends Object3D {

	constructor();

	type: 'Scene';
	fog: IFog | null;
	overrideMaterial: Material | null;
	autoUpdate: boolean;
	background: null | Color | Texture;
	environment: null | Texture;

	readonly isScene: true;

	toJSON( meta?: any ): any;
	dispose(): void;

}
