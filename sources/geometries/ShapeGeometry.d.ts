//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Shape } from './../extras/core/Shape';
import { Geometry } from './../core/Geometry';
import { BufferGeometry } from './../core/BufferGeometry';

export class ShapeBufferGeometry extends BufferGeometry {

	constructor( shapes: Shape | Shape[], curveSegments?: number );

}

export class ShapeGeometry extends Geometry {

	constructor( shapes: Shape | Shape[], curveSegments?: number );

	addShapeList( shapes: Shape[], options: any ): ShapeGeometry;
	addShape( shape: Shape, options?: any ): void;

}
