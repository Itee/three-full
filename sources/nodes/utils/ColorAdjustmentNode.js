import { TempNode } from '../../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */

var ColorAdjustmentNode = function( rgb, adjustment, method ) {

	TempNode.call( this, 'v3' );

	this.rgb = rgb;
	this.adjustment = adjustment;

	this.method = method || ColorAdjustmentNode.SATURATION;

};

ColorAdjustmentNode.SATURATION = 'saturation';
ColorAdjustmentNode.HUE = 'hue';
ColorAdjustmentNode.VIBRANCE = 'vibrance';
ColorAdjustmentNode.BRIGHTNESS = 'brightness';
ColorAdjustmentNode.CONTRAST = 'contrast';

ColorAdjustmentNode.prototype = Object.create( TempNode.prototype );
ColorAdjustmentNode.prototype.constructor = ColorAdjustmentNode;

ColorAdjustmentNode.prototype.generate = function( builder, output ) {

	var rgb = this.rgb.build( builder, 'v3' );
	var adjustment = this.adjustment.build( builder, 'fv1' );

	var name;

	switch ( this.method ) {

		case ColorAdjustmentNode.SATURATION:

			name = 'saturation_rgb';

			break;

		case ColorAdjustmentNode.HUE:

			name = 'hue_rgb';

			break;

		case ColorAdjustmentNode.VIBRANCE:

			name = 'vibrance_rgb';

			break;

		case ColorAdjustmentNode.BRIGHTNESS:

			return builder.format( '(' + rgb + '+' + adjustment + ')', this.getType( builder ), output );

			break;

		case ColorAdjustmentNode.CONTRAST:

			return builder.format( '(' + rgb + '*' + adjustment + ')', this.getType( builder ), output );

			break;

	}

	builder.include( name );

	return builder.format( name + '(' + rgb + ',' + adjustment + ')', this.getType( builder ), output );

};

export { ColorAdjustmentNode }
