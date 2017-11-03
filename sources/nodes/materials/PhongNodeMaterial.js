import { NodeMaterial } from '../../nodes/NodeMaterial.js'
import { PhongNode } from '../../nodes/materials/PhongNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var PhongNodeMaterial = function() {

	this.node = new PhongNode();

	NodeMaterial.call( this, this.node, this.node );

};

PhongNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
PhongNodeMaterial.prototype.constructor = PhongNodeMaterial;

NodeMaterial.addShortcuts( PhongNodeMaterial.prototype, 'node',
[ 'color', 'alpha', 'specular', 'shininess', 'normal', 'normalScale', 'emissive', 'ambient', 'light', 'shadow', 'ao', 'environment', 'environmentAlpha', 'transform' ] );

export { PhongNodeMaterial }
