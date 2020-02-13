//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Loader } from './Loader';
import { LoadingManager } from './LoadingManager';
import { BufferGeometry } from './../core/BufferGeometry';
import { InstancedBufferGeometry } from '../core/InstancedBufferGeometry';

export class BufferGeometryLoader extends Loader {

	constructor( manager?: LoadingManager );

	load(
		url: string,
		onLoad: ( bufferGeometry: InstancedBufferGeometry | BufferGeometry ) => void,
		onProgress?: ( request: ProgressEvent ) => void,
		onError?: ( event: ErrorEvent ) => void
	): void;
	parse( json: any ): InstancedBufferGeometry | BufferGeometry;

}
