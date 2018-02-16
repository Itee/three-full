import { TempNode } from '../TempNode.js'



var NormalNode = function ( scope ) {

	TempNode.call( this, 'v3' );

	this.scope = scope || NormalNode.LOCAL;

};

NormalNode.LOCAL = 'local';
NormalNode.WORLD = 'world';
NormalNode.VIEW = 'view';

NormalNode.prototype = Object.create( TempNode.prototype );
NormalNode.prototype.constructor = NormalNode;
NormalNode.prototype.nodeType = "Normal";

NormalNode.prototype.isShared = function ( builder ) {

	switch ( this.scope ) {

		case NormalNode.WORLD:
			return true;

	}

	return false;

};

NormalNode.prototype.generate = function ( builder, output ) {

	var material = builder.material;
	var result;

	switch ( this.scope ) {

		case NormalNode.LOCAL:

			material.requires.normal = true;

			if ( builder.isShader( 'vertex' ) ) result = 'normal';
			else result = 'vObjectNormal';

			break;

		case NormalNode.WORLD:

			material.requires.worldNormal = true;

			if ( builder.isShader( 'vertex' ) ) result = '( modelMatrix * vec4( objectNormal, 0.0 ) ).xyz';
			else result = 'vWNormal';

			break;

		case NormalNode.VIEW:

			result = 'vNormal';

			break;

	}

	return builder.format( result, this.getType( builder ), output );

};

NormalNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.scope = this.scope;

	}

	return data;

};

export { NormalNode }
