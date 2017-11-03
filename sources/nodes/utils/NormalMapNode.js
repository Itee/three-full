import { TempNode } from '../../nodes/TempNode.js'
import { FloatNode } from '../../nodes/inputs/FloatNode.js'
import { NormalNode } from '../../nodes/accessors/NormalNode.js'
import { PositionNode } from '../../nodes/accessors/PositionNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var NormalMapNode = function( value, uv, scale, normal, position ) {

	TempNode.call( this, 'v3' );

	this.value = value;
	this.scale = scale || new FloatNode( 1 );

	this.normal = normal || new NormalNode( NormalNode.LOCAL );
	this.position = position || new PositionNode( NormalNode.VIEW );

};

NormalMapNode.prototype = Object.create( TempNode.prototype );
NormalMapNode.prototype.constructor = NormalMapNode;

NormalMapNode.prototype.generate = function( builder, output ) {

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

export { NormalMapNode }
