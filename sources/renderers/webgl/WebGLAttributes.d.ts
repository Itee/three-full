//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLCapabilities } from "./WebGLCapabilities";
import { BufferAttribute } from "../../core/BufferAttribute";
import { InterleavedBufferAttribute } from "../../core/InterleavedBufferAttribute";

export class WebGLAttributes {

	constructor( gl: WebGLRenderingContext | WebGL2RenderingContext, capabilities: WebGLCapabilities );

	get( attribute: BufferAttribute | InterleavedBufferAttribute ): {
		buffer: WebGLBuffer,
		type: GLenum,
		bytesPerElement: number,
		version: number
	};

	remove( attribute: BufferAttribute | InterleavedBufferAttribute ): void;

	update( attribute: BufferAttribute | InterleavedBufferAttribute, bufferType: GLenum ): void;

}
