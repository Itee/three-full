import { TempNode } from '../TempNode.js'
import { FloatNode } from '../inputs/FloatNode.js'
import { NormalNode } from '../accessors/NormalNode.js'
import { PositionNode } from '../accessors/PositionNode.js'



var NormalMapNode = function ( value, uv, scale, normal, position ) {

	TempNode.call( this, 'v3' );

	this.value = value;
	this.scale = scale || new FloatNode( 1 );

	this.normal = normal || new NormalNode( NormalNode.LOCAL );
	this.position = position || new PositionNode( NormalNode.VIEW );

};

NormalMapNode.prototype = Object.create( TempNode.prototype );
NormalMapNode.prototype.constructor = NormalMapNode;
NormalMapNode.prototype.nodeType = "NormalMap";

NormalMapNode.prototype.generate = function ( builder, output ) {

	var material = builder.material;

	builder.include( 'perturbNormal2Arb' );

	if ( builder.isShader( 'fragment' ) ) {

		return builder.format( 'perturbNormal2Arb(-' + this.position.build( builder, 'v3' ) + ',' +
			this.normal.build( builder, 'v3' ) + ',' +
			this.value.build( builder, 'v3' ) + ',' +
			this.value.coord.build( builder, 'v2' ) + ',' +
			this.scale.build( builder, 'v2' ) + ')', this.getType( builder ), output );

	} else {

		console.warn( "NormalMapNode is not compatible with " + builder.shader + " shader." );

		return builder.format( 'vec3( 0.0 )', this.getType( builder ), output );

	}

};

NormalMapNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.value = this.value.uuid;
		data.scale = this.scale.toJSON( meta ).uuid;

		data.normal = this.normal.toJSON( meta ).uuid;
		data.position = this.position.toJSON( meta ).uuid;

	}

	return data;

};

export { NormalMapNode }
