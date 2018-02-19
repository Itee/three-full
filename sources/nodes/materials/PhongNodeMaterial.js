import { NodeMaterial } from '../NodeMaterial.js'
import { PhongNode } from './PhongNode.js'



var PhongNodeMaterial = function () {

	this.node = new PhongNode();

	NodeMaterial.call( this, this.node, this.node );

	this.type = "PhongNodeMaterial";

};

PhongNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
PhongNodeMaterial.prototype.constructor = PhongNodeMaterial;

NodeMaterial.addShortcuts( PhongNodeMaterial.prototype, 'node',
	[ 'color', 'alpha', 'specular', 'shininess', 'normal', 'normalScale', 'emissive', 'ambient', 'light', 'shadow', 'ao', 'environment', 'environmentAlpha', 'transform' ] );

export { PhongNodeMaterial }
