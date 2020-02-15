//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	BufferGeometry,
	Material,
	ImmediateRenderObject
} from '../../../src/Three';

export class MarchingCubes extends ImmediateRenderObject {

	constructor( resolution: number, material: Material, enableUvs?: boolean, enableColors?: boolean );

	enableUvs: boolean;
	enableColors: boolean;

	resolution: number;
	isolation: number;
	size: number;
	size2: number;
	size3: number;
	halfsize: number;
	delta: number;
	yd: number;
	zd: number;

	field: Float32Array;
	normal_cache: Float32Array;
	palette: Float32Array;

	maxCount: number;
	count: number;

	hasPositions: boolean;
	hasNormals: boolean;
	hasColors: boolean;
	hasUvs: boolean;

	positionArray: Float32Array;
	normalArray: Float32Array;

	uvArray: Float32Array;
	colorArray: Float32Array;

	begin(): void;
	end(): void;

	addBall( ballx: number, bally: number, ballz: number, strength: number, subtract: number, colors: any ): void;

	addPlaneX( strength: number, subtract: number ): void;
	addPlaneY( strength: number, subtract: number ): void;
	addPlaneZ( strength: number, subtract: number ): void;

	setCell ( x: number, y: number, z: number, value: number ): void;
	getCell ( x: number, y: number, z: number ): number;

	blur( intensity: number ): void;

	reset(): void;
	render( renderCallback: any ): void;
	generateGeometry(): BufferGeometry;
	generateBufferGeometry(): BufferGeometry;

}

export const edgeTable: Int32Array[];
export const triTable: Int32Array[];

