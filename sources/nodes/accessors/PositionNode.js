import { TempNode } from '../TempNode.js'



var PositionNode = function ( scope ) {

	TempNode.call( this, 'v3' );

	this.scope = scope || PositionNode.LOCAL;

};

PositionNode.LOCAL = 'local';
PositionNode.WORLD = 'world';
PositionNode.VIEW = 'view';
PositionNode.PROJECTION = 'projection';

PositionNode.prototype = Object.create( TempNode.prototype );
PositionNode.prototype.constructor = PositionNode;
PositionNode.prototype.nodeType = "Position";

PositionNode.prototype.getType = function ( builder ) {

	switch ( this.scope ) {

		case PositionNode.PROJECTION:
			return 'v4';

	}

	return this.type;

};

PositionNode.prototype.isShared = function ( builder ) {

	switch ( this.scope ) {

		case PositionNode.LOCAL:
		case PositionNode.WORLD:
			return false;

	}

	return true;

};

PositionNode.prototype.generate = function ( builder, output ) {

	var material = builder.material;
	var result;

	switch ( this.scope ) {

		case PositionNode.LOCAL:

			material.requires.position = true;

			if ( builder.isShader( 'vertex' ) ) result = 'transformed';
			else result = 'vPosition';

			break;

		case PositionNode.WORLD:

			material.requires.worldPosition = true;

			if ( builder.isShader( 'vertex' ) ) result = 'vWPosition';
			else result = 'vWPosition';

			break;

		case PositionNode.VIEW:

			if ( builder.isShader( 'vertex' ) ) result = '-mvPosition.xyz';
			else result = 'vViewPosition';

			break;

		case PositionNode.PROJECTION:

			if ( builder.isShader( 'vertex' ) ) result = '(projectionMatrix * modelViewMatrix * vec4( position, 1.0 ))';
			else result = 'vec4( 0.0 )';

			break;

	}

	return builder.format( result, this.getType( builder ), output );

};

PositionNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.scope = this.scope;

	}

	return data;

};

export { PositionNode }
