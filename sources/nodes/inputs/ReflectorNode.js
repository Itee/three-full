import { TempNode } from '../../nodes/TempNode.js'
import { Matrix4Node } from '../../nodes/inputs/Matrix4Node.js'
import { PositionNode } from '../../nodes/accessors/PositionNode.js'
import { OperatorNode } from '../../nodes/math/OperatorNode.js'
import { TextureNode } from '../../nodes/inputs/TextureNode.js'

var ReflectorNode = function( mirror, camera, options ) {

	TempNode.call( this, 'v4' );

	this.mirror = mirror;

	this.textureMatrix = new Matrix4Node( this.mirror.material.uniforms.textureMatrix.value );

	this.localPosition = new PositionNode( PositionNode.LOCAL );

	this.coord = new OperatorNode( this.textureMatrix, this.localPosition, OperatorNode.MUL );
	this.coordResult = new OperatorNode( null, this.coord, OperatorNode.ADD );

	this.texture = new TextureNode( this.mirror.material.uniforms.tDiffuse.value, this.coord, null, true );

};

ReflectorNode.prototype = Object.create( TempNode.prototype );
ReflectorNode.prototype.constructor = ReflectorNode;

ReflectorNode.prototype.generate = function( builder, output ) {

	var material = builder.material;

	if ( builder.isShader( 'fragment' ) ) {

		this.coordResult.a = this.offset;
		this.texture.coord = this.offset ? this.coordResult : this.coord;

		if ( output === 'sampler2D' ) {

			return this.texture.build( builder, output );

		}

		return builder.format( this.texture.build( builder, this.type ), this.type, output );

	} else {

		console.warn( "ReflectorNode is not compatible with " + builder.shader + " shader." );

		return builder.format( 'vec4(0.0)', this.type, output );

	}

};

export { ReflectorNode }
