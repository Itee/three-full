import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var NormalNode = function( scope ) {

	TempNode.call( this, 'v3' );

	this.scope = scope || NormalNode.LOCAL;

};

NormalNode.LOCAL = 'local';
NormalNode.WORLD = 'world';
NormalNode.VIEW = 'view';

NormalNode.prototype = Object.create( TempNode.prototype );
NormalNode.prototype.constructor = NormalNode;

NormalNode.prototype.isShared = function( builder ) {

	switch ( this.scope ) {
		case NormalNode.WORLD:
			return true;
	}

	return false;

};

NormalNode.prototype.generate = function( builder, output ) {

	var material = builder.material;
	var result;

	switch ( this.scope ) {

		case NormalNode.LOCAL:

			material.requestAttribs.normal = true;

			if ( builder.isShader( 'vertex' ) ) result = 'normal';
			else result = 'vObjectNormal';

			break;

		case NormalNode.WORLD:

			material.requestAttribs.worldNormal = true;

			if ( builder.isShader( 'vertex' ) ) result = '( modelMatrix * vec4( objectNormal, 0.0 ) ).xyz';
			else result = 'vWNormal';

			break;

		case NormalNode.VIEW:

			result = 'vNormal';

			break;

	}

	return builder.format( result, this.getType( builder ), output );

};

export { NormalNode }
