//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Color } from './Color.js'
import { Texture } from '../textures/Texture.js'
import { PlaneBufferGeometry } from '../geometries/PlaneGeometry.js'
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js'
import { Mesh } from '../objects/Mesh.js'
import { Vector3 } from './Vector3.js'
import { CanvasTexture } from '../textures/CanvasTexture.js'
import { SpriteMaterial } from '../materials/SpriteMaterial.js'
import { Sprite } from '../objects/Sprite.js'
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js'
import { BufferGeometry } from '../core/BufferGeometry.js'
import { Line } from '../objects/Line.js'
import {
	DoubleSide,
	LinearFilter
} from '../constants.js'
var Lut = function ( colormap, numberofcolors ) {

	this.lut = [];
	this.map = ColorMapKeywords[ colormap ];
	this.n = numberofcolors;
	this.mapname = colormap;

	var step = 1.0 / this.n;

	for ( var i = 0; i <= 1; i += step ) {

		for ( var j = 0; j < this.map.length - 1; j ++ ) {

			if ( i >= this.map[ j ][ 0 ] && i < this.map[ j + 1 ][ 0 ] ) {

				var min = this.map[ j ][ 0 ];
				var max = this.map[ j + 1 ][ 0 ];

				var minColor = new Color( 0xffffff ).setHex( this.map[ j ][ 1 ] );
				var maxColor = new Color( 0xffffff ).setHex( this.map[ j + 1 ][ 1 ] );

				var color = minColor.lerp( maxColor, ( i - min ) / ( max - min ) );

				this.lut.push( color );

			}

		}

	}

	return this.set( this );

};

Lut.prototype = {

	constructor: Lut,

	lut: [], map: [], mapname: 'rainbow', n: 256, minV: 0, maxV: 1, legend: null,

	set: function ( value ) {

		if ( value instanceof Lut ) {

			this.copy( value );

		}

		return this;

	},

	setMin: function ( min ) {

		this.minV = min;

		return this;

	},

	setMax: function ( max ) {

		this.maxV = max;

		return this;

	},

	changeNumberOfColors: function ( numberofcolors ) {

		this.n = numberofcolors;

		return new Lut( this.mapname, this.n );

	},

	changeColorMap: function ( colormap ) {

		this.mapname = colormap;

		return new Lut( this.mapname, this.n );

	},

	copy: function ( lut ) {

		this.lut = lut.lut;
		this.mapname = lut.mapname;
		this.map = lut.map;
		this.n = lut.n;
		this.minV = lut.minV;
		this.maxV = lut.maxV;

		return this;

	},

	getColor: function ( alpha ) {

		if ( alpha <= this.minV ) {

			alpha = this.minV;

		} else if ( alpha >= this.maxV ) {

			alpha = this.maxV;

		}

		alpha = ( alpha - this.minV ) / ( this.maxV - this.minV );

		var colorPosition = Math.round( alpha * this.n );
		colorPosition == this.n ? colorPosition -= 1 : colorPosition;

		return this.lut[ colorPosition ];

	},

	addColorMap: function ( colormapName, arrayOfColors ) {

		ColorMapKeywords[ colormapName ] = arrayOfColors;

	},

	setLegendOn: function ( parameters ) {

		if ( parameters === undefined ) {

			parameters = {};

		}

		this.legend = {};

		this.legend.layout = parameters.hasOwnProperty( 'layout' ) ? parameters[ 'layout' ] : 'vertical';

		this.legend.position = parameters.hasOwnProperty( 'position' ) ? parameters[ 'position' ] : { 'x': 4, 'y': 0, 'z': 0 };

		this.legend.dimensions = parameters.hasOwnProperty( 'dimensions' ) ? parameters[ 'dimensions' ] : { 'width': 0.5, 'height': 3 };

		this.legend.canvas = document.createElement( 'canvas' );

		this.legend.canvas.setAttribute( 'id', 'legend' );
		this.legend.canvas.setAttribute( 'hidden', true );

		document.body.appendChild( this.legend.canvas );

		this.legend.ctx = this.legend.canvas.getContext( '2d' );

		this.legend.canvas.setAttribute( 'width', 1 );
		this.legend.canvas.setAttribute( 'height', this.n );

		this.legend.texture = new Texture( this.legend.canvas );

		var imageData = this.legend.ctx.getImageData( 0, 0, 1, this.n );

		var data = imageData.data;

		this.map = ColorMapKeywords[ this.mapname ];

		var k = 0;

		var step = 1.0 / this.n;

		for ( var i = 1; i >= 0; i -= step ) {

			for ( var j = this.map.length - 1; j >= 0; j -- ) {

				if ( i < this.map[ j ][ 0 ] && i >= this.map[ j - 1 ][ 0 ] ) {

					var min = this.map[ j - 1 ][ 0 ];
					var max = this.map[ j ][ 0 ];

					var minColor = new Color( 0xffffff ).setHex( this.map[ j - 1 ][ 1 ] );
					var maxColor = new Color( 0xffffff ).setHex( this.map[ j ][ 1 ] );

					var color = minColor.lerp( maxColor, ( i - min ) / ( max - min ) );

					data[ k * 4 ] = Math.round( color.r * 255 );
					data[ k * 4 + 1 ] = Math.round( color.g * 255 );
					data[ k * 4 + 2 ] = Math.round( color.b * 255 );
					data[ k * 4 + 3 ] = 255;

					k += 1;

				}

			}

		}

		this.legend.ctx.putImageData( imageData, 0, 0 );
		this.legend.texture.needsUpdate = true;

		this.legend.legendGeometry = new PlaneBufferGeometry( this.legend.dimensions.width, this.legend.dimensions.height );
		this.legend.legendMaterial = new MeshBasicMaterial( { map: this.legend.texture, side: DoubleSide } );

		this.legend.mesh = new Mesh( this.legend.legendGeometry, this.legend.legendMaterial );

		if ( this.legend.layout == 'horizontal' ) {

			this.legend.mesh.rotation.z = - 90 * ( Math.PI / 180 );

		}

		this.legend.mesh.position.copy( this.legend.position );

		return this.legend.mesh;

	},

	setLegendOff: function () {

		this.legend = null;

		return this.legend;

	},

	setLegendLayout: function ( layout ) {

		if ( ! this.legend ) {

			return false;

		}

		if ( this.legend.layout == layout ) {

			return false;

		}

		if ( layout != 'horizontal' && layout != 'vertical' ) {

			return false;

		}

		this.layout = layout;

		if ( layout == 'horizontal' ) {

			this.legend.mesh.rotation.z = 90 * ( Math.PI / 180 );

		}

		if ( layout == 'vertical' ) {

			this.legend.mesh.rotation.z = - 90 * ( Math.PI / 180 );

		}

		return this.legend.mesh;

	},

	setLegendPosition: function ( position ) {

		this.legend.position = new Vector3( position.x, position.y, position.z );

		return this.legend;

	},

	setLegendLabels: function ( parameters, callback ) {

		if ( ! this.legend ) {

			return false;

		}

		if ( typeof parameters === 'function' ) {

			callback = parameters;

		}

		if ( parameters === undefined ) {

			parameters = {};

		}

		this.legend.labels = {};

		this.legend.labels.fontsize = parameters.hasOwnProperty( 'fontsize' ) ? parameters[ 'fontsize' ] : 24;

		this.legend.labels.fontface = parameters.hasOwnProperty( 'fontface' ) ? parameters[ 'fontface' ] : 'Arial';

		this.legend.labels.title = parameters.hasOwnProperty( 'title' ) ? parameters[ 'title' ] : '';

		this.legend.labels.um = parameters.hasOwnProperty( 'um' ) ? ' [ ' + parameters[ 'um' ] + ' ]' : '';

		this.legend.labels.ticks = parameters.hasOwnProperty( 'ticks' ) ? parameters[ 'ticks' ] : 0;

		this.legend.labels.decimal = parameters.hasOwnProperty( 'decimal' ) ? parameters[ 'decimal' ] : 2;

		this.legend.labels.notation = parameters.hasOwnProperty( 'notation' ) ? parameters[ 'notation' ] : 'standard';

		var backgroundColor = { r: 255, g: 100, b: 100, a: 0.8 };
		var borderColor = { r: 255, g: 0, b: 0, a: 1.0 };
		var borderThickness = 4;

		var canvasTitle = document.createElement( 'canvas' );
		var contextTitle = canvasTitle.getContext( '2d' );

		contextTitle.font = 'Normal ' + this.legend.labels.fontsize * 1.2 + 'px ' + this.legend.labels.fontface;

		contextTitle.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + backgroundColor.a + ')';

		contextTitle.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + borderColor.a + ')';

		contextTitle.lineWidth = borderThickness;

		contextTitle.fillStyle = 'rgba( 0, 0, 0, 1.0 )';

		contextTitle.fillText( this.legend.labels.title.toString() + this.legend.labels.um.toString(), borderThickness, this.legend.labels.fontsize + borderThickness );

		var txtTitle = new CanvasTexture( canvasTitle );
		txtTitle.minFilter = LinearFilter;

		var spriteMaterialTitle = new SpriteMaterial( { map: txtTitle } );

		var spriteTitle = new Sprite( spriteMaterialTitle );

		spriteTitle.scale.set( 2, 1, 1.0 );

		if ( this.legend.layout == 'vertical' ) {

			spriteTitle.position.set( this.legend.position.x + this.legend.dimensions.width, this.legend.position.y + ( this.legend.dimensions.height * 0.45 ), this.legend.position.z );

		}

		if ( this.legend.layout == 'horizontal' ) {

			spriteTitle.position.set( this.legend.position.x * 1.015, this.legend.position.y + ( this.legend.dimensions.height * 0.03 ), this.legend.position.z );

		}

		if ( this.legend.labels.ticks > 0 ) {

			var ticks = {};
			var lines = {};

			if ( this.legend.layout == 'vertical' ) {

				var topPositionY = this.legend.position.y + ( this.legend.dimensions.height * 0.36 );
				var bottomPositionY = this.legend.position.y - ( this.legend.dimensions.height * 0.61 );

			}

			if ( this.legend.layout == 'horizontal' ) {

				var topPositionX = this.legend.position.x + ( this.legend.dimensions.height * 0.75 );
				var bottomPositionX = this.legend.position.x - ( this.legend.dimensions.width * 1.2 );

			}

			for ( var i = 0; i < this.legend.labels.ticks; i ++ ) {

				var value = ( this.maxV - this.minV ) / ( this.legend.labels.ticks - 1 ) * i + this.minV;

				if ( callback ) {

					value = callback( value );

				} else {

					if ( this.legend.labels.notation == 'scientific' ) {

						value = value.toExponential( this.legend.labels.decimal );

					} else {

						value = value.toFixed( this.legend.labels.decimal );

					}

				}

				var canvasTick = document.createElement( 'canvas' );
				var contextTick = canvasTick.getContext( '2d' );

				contextTick.font = 'Normal ' + this.legend.labels.fontsize + 'px ' + this.legend.labels.fontface;

				contextTick.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + backgroundColor.a + ')';

				contextTick.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + borderColor.a + ')';

				contextTick.lineWidth = borderThickness;

				contextTick.fillStyle = 'rgba( 0, 0, 0, 1.0 )';

				contextTick.fillText( value.toString(), borderThickness, this.legend.labels.fontsize + borderThickness );

				var txtTick = new CanvasTexture( canvasTick );
				txtTick.minFilter = LinearFilter;

				var spriteMaterialTick = new SpriteMaterial( { map: txtTick } );

				var spriteTick = new Sprite( spriteMaterialTick );

				spriteTick.scale.set( 2, 1, 1.0 );

				if ( this.legend.layout == 'vertical' ) {

					var position = bottomPositionY + ( topPositionY - bottomPositionY ) * ( ( value - this.minV ) / ( this.maxV - this.minV ) );

					spriteTick.position.set( this.legend.position.x + ( this.legend.dimensions.width * 2.7 ), position, this.legend.position.z );

				}

				if ( this.legend.layout == 'horizontal' ) {

					var position = bottomPositionX + ( topPositionX - bottomPositionX ) * ( ( value - this.minV ) / ( this.maxV - this.minV ) );

					if ( this.legend.labels.ticks > 5 ) {

						if ( i % 2 === 0 ) {

							var offset = 1.7;

						} else {

							var offset = 2.1;

						}

					} else {

						var offset = 1.7;

					}

					spriteTick.position.set( position, this.legend.position.y - this.legend.dimensions.width * offset, this.legend.position.z );

				}

				var material = new LineBasicMaterial( { color: 0x000000, linewidth: 2 } );

				var points = [];
				if ( this.legend.layout == 'vertical' ) {

					var linePosition = ( this.legend.position.y - ( this.legend.dimensions.height * 0.5 ) + 0.01 ) + ( this.legend.dimensions.height ) * ( ( value - this.minV ) / ( this.maxV - this.minV ) * 0.99 );

					points.push( new Vector3( this.legend.position.x + this.legend.dimensions.width * 0.55, linePosition, this.legend.position.z ) );

					points.push( new Vector3( this.legend.position.x + this.legend.dimensions.width * 0.7, linePosition, this.legend.position.z ) );

				}

				if ( this.legend.layout == 'horizontal' ) {

					var linePosition = ( this.legend.position.x - ( this.legend.dimensions.height * 0.5 ) + 0.01 ) + ( this.legend.dimensions.height ) * ( ( value - this.minV ) / ( this.maxV - this.minV ) * 0.99 );

					points.push( new Vector3( linePosition, this.legend.position.y - this.legend.dimensions.width * 0.55, this.legend.position.z ) );

					points.push( new Vector3( linePosition, this.legend.position.y - this.legend.dimensions.width * 0.7, this.legend.position.z ) );

				}

				var geometry = new BufferGeometry().setFromPoints( points );

				var line = new Line( geometry, material );

				lines[ i ] = line;
				ticks[ i ] = spriteTick;

			}

		}

		return { 'title': spriteTitle, 'ticks': ticks, 'lines': lines };

	}

};
var ColorMapKeywords = {

	"rainbow": [[ 0.0, '0x0000FF' ], [ 0.2, '0x00FFFF' ], [ 0.5, '0x00FF00' ], [ 0.8, '0xFFFF00' ], [ 1.0, '0xFF0000' ]],
	"cooltowarm": [[ 0.0, '0x3C4EC2' ], [ 0.2, '0x9BBCFF' ], [ 0.5, '0xDCDCDC' ], [ 0.8, '0xF6A385' ], [ 1.0, '0xB40426' ]],
	"blackbody": [[ 0.0, '0x000000' ], [ 0.2, '0x780000' ], [ 0.5, '0xE63200' ], [ 0.8, '0xFFFF00' ], [ 1.0, '0xFFFFFF' ]],
	"grayscale": [[ 0.0, '0x000000' ], [ 0.2, '0x404040' ], [ 0.5, '0x7F7F80' ], [ 0.8, '0xBFBFBF' ], [ 1.0, '0xFFFFFF' ]]

};

export { Lut }
