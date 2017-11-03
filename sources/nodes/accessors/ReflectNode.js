import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var ReflectNode = function( scope ) {

	TempNode.call( this, 'v3', { unique: true } );

	this.scope = scope || ReflectNode.CUBE;

};

ReflectNode.CUBE = 'cube';
ReflectNode.SPHERE = 'sphere';
ReflectNode.VECTOR = 'vector';

ReflectNode.prototype = Object.create( TempNode.prototype );
ReflectNode.prototype.constructor = ReflectNode;

ReflectNode.prototype.getType = function( builder ) {

	switch ( this.scope ) {
		case ReflectNode.SPHERE:
			return 'v2';
	}

	return this.type;

};

ReflectNode.prototype.generate = function( builder, output ) {

	var result;

	switch ( this.scope ) {

		case ReflectNode.VECTOR:

			builder.material.addFragmentNode( 'vec3 reflectVec = inverseTransformDirection( reflect( -normalize( vViewPosition ), normal ), viewMatrix );' );

			result = 'reflectVec';

			break;

		case ReflectNode.CUBE:

			var reflectVec = new ReflectNode( ReflectNode.VECTOR ).build( builder, 'v3' );

			builder.material.addFragmentNode( 'vec3 reflectCubeVec = vec3( -1.0 * ' + reflectVec + '.x, ' + reflectVec + '.yz );' );

			result = 'reflectCubeVec';

			break;

		case ReflectNode.SPHERE:

			var reflectVec = new ReflectNode( ReflectNode.VECTOR ).build( builder, 'v3' );

			builder.material.addFragmentNode( 'vec2 reflectSphereVec = normalize((viewMatrix * vec4(' + reflectVec + ', 0.0 )).xyz + vec3(0.0,0.0,1.0)).xy * 0.5 + 0.5;' );

			result = 'reflectSphereVec';

			break;
	}

	return builder.format( result, this.getType( this.type ), output );

};

export { ReflectNode }
