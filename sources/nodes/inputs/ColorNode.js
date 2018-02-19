import { InputNode } from '../InputNode.js'
import { Color } from '../../math/Color.js'
import { NodeMaterial } from '../NodeMaterial.js'



var ColorNode = function ( color ) {

	InputNode.call( this, 'c' );

	this.value = new Color( color || 0 );

};

ColorNode.prototype = Object.create( InputNode.prototype );
ColorNode.prototype.constructor = ColorNode;
ColorNode.prototype.nodeType = "Color";

NodeMaterial.addShortcuts( ColorNode.prototype, 'value', [ 'r', 'g', 'b' ] );

ColorNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

	return builder.format( "vec3( " + this.r + ", " + this.g + ", " + this.b + " )", type, output );

};

ColorNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.r = this.r;
		data.g = this.g;
		data.b = this.b;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};

export { ColorNode }
