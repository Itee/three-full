//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Loader,
	LoadingManager,
	ShapePath,
	BufferGeometry,
	Vector3
} from '../../../src/Three';

export interface SVGResult {
	paths: ShapePath[];
	xml: XMLDocument;
}

export interface StrokeStyle {
	strokeColor: string;
	strokeWidth: number;
	strokeLineJoin: string;
	strokeLineCap: string;
	strokeMiterLimit: number;
}

export class SVGLoader extends Loader {

	constructor( manager?: LoadingManager );

	load( url: string, onLoad: ( data: SVGResult ) => void, onProgress?: ( event: ProgressEvent ) => void, onError?: ( event: ErrorEvent ) => void ) : void;
	parse( text: string ) : SVGResult;

	static getStrokeStyle( width: number, color: string, lineJoin: string, lineCap: string, miterLimit: number ): StrokeStyle;
	static pointsToStroke( points: Vector3[], style: StrokeStyle, arcDivisions: number, minDistance: number ): BufferGeometry;
	static pointsToStrokeWithBuffers( points: Vector3[], style: StrokeStyle, arcDivisions: number, minDistance: number, vertices: number[], normals: number[], uvs: number[], vertexOffset: number ): number;

}