import { _Math } from '../math/Math.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var GLNode = function( type ) {

	this.uuid = _Math.generateUUID();

	this.allows = {};
	this.requestUpdate = false;

	this.type = type;

};

GLNode.prototype.parse = function( builder, context ) {

	context = context || {};

	builder.parsing = true;

	var material = builder.material;

	this.build( builder.addCache( context.cache, context.requires ).addSlot( context.slot ), 'v4' );

	material.clearVertexNode();
	material.clearFragmentNode();

	builder.removeCache().removeSlot();

	builder.parsing = false;

};

GLNode.prototype.parseAndBuildCode = function( builder, output, context ) {

	context = context || {};

	this.parse( builder, context );

	return this.buildCode( builder, output, context );

};

GLNode.prototype.buildCode = function( builder, output, context ) {

	context = context || {};

	var material = builder.material;

	var data = { result : this.build( builder.addCache( context.cache, context.requires ).addSlot( context.slot ), output ) };

	if ( builder.isShader( 'vertex' ) ) data.code = material.clearVertexNode();
	else data.code = material.clearFragmentNode();

	builder.removeCache().removeSlot();

	return data;

};

GLNode.prototype.build = function( builder, output, uuid ) {

	output = output || this.getType( builder, output );

	var material = builder.material, data = material.getDataNode( uuid || this.uuid );

	if ( builder.parsing ) this.appendDepsNode( builder, data, output );

	if ( this.allows[ builder.shader ] === false ) {

		throw new Error( 'Shader ' + shader + ' is not compatible with this node.' );

	}

	if ( this.requestUpdate && material.requestUpdate.indexOf( this ) === - 1 ) {

		material.requestUpdate.push( this );

	}

	return this.generate( builder, output, uuid );

};

GLNode.prototype.appendDepsNode = function( builder, data, output ) {

	data.deps = ( data.deps || 0 ) + 1;

	var outputLen = builder.getFormatLength( output );

	if ( outputLen > ( data.outputMax || 0 ) || this.getType( builder, output ) ) {

		data.outputMax = outputLen;
		data.output = output;

	}

};

GLNode.prototype.getType = function( builder, output ) {

	return output === 'sampler2D' || output === 'samplerCube' ? output : this.type;

};

export { GLNode }
