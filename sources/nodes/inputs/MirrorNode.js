import { TempNode } from '../../nodes/TempNode.js'
import { Matrix4Node } from '../../nodes/inputs/Matrix4Node.js'
import { PositionNode } from '../../nodes/accessors/PositionNode.js'
import { OperatorNode } from '../../nodes/math/OperatorNode.js'
import { TextureNode } from '../../nodes/inputs/TextureNode.js'
var MirrorNode = function( mirror, camera, options ) {

	TempNode.call( this, 'v4' );

	this.mirror = mirror;

	this.textureMatrix = new Matrix4Node( this.mirror.material.uniforms.textureMatrix.value );

	this.worldPosition = new PositionNode( PositionNode.WORLD );

	this.coord = new OperatorNode( this.textureMatrix, this.worldPosition, OperatorNode.MUL );
	this.coordResult = new OperatorNode( null, this.coord, OperatorNode.ADD );

	this.texture = new TextureNode( this.mirror.material.uniforms.mirrorSampler.value, this.coord, null, true );

};

MirrorNode.prototype = Object.create( TempNode.prototype );
MirrorNode.prototype.constructor = MirrorNode;

MirrorNode.prototype.generate = function( builder, output ) {

	var material = builder.material;

	if ( builder.isShader( 'fragment' ) ) {

		this.coordResult.a = this.offset;
		this.texture.coord = this.offset ? this.coordResult : this.coord;

		if ( output === 'sampler2D' ) {

			return this.texture.build( builder, output );

		}

		return builder.format( this.texture.build( builder, this.type ), this.type, output );

	} else {

		console.warn( "MirrorNode is not compatible with " + builder.shader + " shader." );

		return builder.format( 'vec4(0.0)', this.type, output );

	}

};

export { MirrorNode }
