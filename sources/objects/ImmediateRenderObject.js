//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from '../core/Object3D.js'
/**
 * @author alteredq / http://alteredqualia.com/
 */

function ImmediateRenderObject( material ) {

	Object3D.call( this );

	this.material = material;
	this.render = function ( /* renderCallback */ ) {};

}

ImmediateRenderObject.prototype = Object.create( Object3D.prototype );
ImmediateRenderObject.prototype.constructor = ImmediateRenderObject;

ImmediateRenderObject.prototype.isImmediateRenderObject = true;

export { ImmediateRenderObject }
