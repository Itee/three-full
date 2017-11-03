import { FloatNode } from '../../nodes/inputs/FloatNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var TimerNode = function( value, scale ) {

	FloatNode.call( this, value );

	this.requestUpdate = true;

	this.scale = scale !== undefined ? scale : 1;

};

TimerNode.prototype = Object.create( FloatNode.prototype );
TimerNode.prototype.constructor = TimerNode;

TimerNode.prototype.updateFrame = function( delta ) {

	this.number += delta * this.scale;

};

export { TimerNode }
