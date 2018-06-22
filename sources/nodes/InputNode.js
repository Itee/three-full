import { TempNode } from './TempNode.js'



var InputNode = function ( type, params ) {

	params = params || {};
	params.shared = params.shared !== undefined ? params.shared : false;

	TempNode.call( this, type, params );

	this.readonly = false;

};

InputNode.prototype = Object.create( TempNode.prototype );
InputNode.prototype.constructor = InputNode;

InputNode.prototype.isReadonly = function ( builder ) {

	return this.readonly;

};

InputNode.prototype.generate = function ( builder, output, uuid, type, ns, needsUpdate ) {

	var material = builder.material;

	uuid = builder.getUuid( uuid || this.getUuid() );
	type = type || this.getType( builder );

	var data = material.getDataNode( uuid ),
		readonly = this.isReadonly( builder ) && this.generateReadonly !== undefined;

	if ( readonly ) {

		return this.generateReadonly( builder, output, uuid, type, ns, needsUpdate );

	} else {

		if ( builder.isShader( 'vertex' ) ) {

			if ( ! data.vertex ) {

				data.vertex = material.createVertexUniform( type, this, ns, needsUpdate );

			}

			return builder.format( data.vertex.name, type, output );

		} else {

			if ( ! data.fragment ) {

				data.fragment = material.createFragmentUniform( type, this, ns, needsUpdate );

			}

			return builder.format( data.fragment.name, type, output );

		}

	}

};

export { InputNode }
