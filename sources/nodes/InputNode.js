import { TempNode } from '../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var InputNode = function( type, params ) {

	params = params || {};
	params.shared = params.shared !== undefined ? params.shared : false;

	TempNode.call( this, type, params );

};

InputNode.prototype = Object.create( TempNode.prototype );
InputNode.prototype.constructor = InputNode;

InputNode.prototype.generate = function( builder, output, uuid, type, ns, needsUpdate ) {

	var material = builder.material;

	uuid = builder.getUuid( uuid || this.getUuid() );
	type = type || this.getType( builder );

	var data = material.getDataNode( uuid );

	if ( builder.isShader( 'vertex' ) ) {

		if ( ! data.vertex ) {

			data.vertex = material.createVertexUniform( type, this.value, ns, needsUpdate );

		}

		return builder.format( data.vertex.name, type, output );

	} else {

		if ( ! data.fragment ) {

			data.fragment = material.createFragmentUniform( type, this.value, ns, needsUpdate );

		}

		return builder.format( data.fragment.name, type, output );

	}

};

export { InputNode }
