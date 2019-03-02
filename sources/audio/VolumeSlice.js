//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Texture } from '../textures/Texture.js'
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js'
import { Mesh } from '../objects/Mesh.js'
import { PlaneBufferGeometry } from '../geometries/PlaneGeometry.js'
import {
	DoubleSide,
	ClampToEdgeWrapping,
	LinearFilter
} from '../constants.js'
var VolumeSlice = function ( volume, index, axis ) {

	var slice = this;
	
	this.volume = volume;
	
	index = index || 0;
	Object.defineProperty( this, 'index', {
		get: function () {

			return index;

		},
		set: function ( value ) {

			index = value;
			slice.geometryNeedsUpdate = true;
			return index;

		}
	} );
	
	this.axis = axis || 'z';
	this.canvas = document.createElement( 'canvas' );
	this.canvasBuffer = document.createElement( 'canvas' );
	this.updateGeometry();
	var canvasMap = new Texture( this.canvas );
	canvasMap.minFilter = LinearFilter;
	canvasMap.wrapS = canvasMap.wrapT = ClampToEdgeWrapping;
	var material = new MeshBasicMaterial( { map: canvasMap, side: DoubleSide, transparent: true } );
	
	this.mesh = new Mesh( this.geometry, material );
	
	this.geometryNeedsUpdate = true;
	this.repaint();
};

VolumeSlice.prototype = {

	constructor: VolumeSlice,
	repaint: function () {

		if ( this.geometryNeedsUpdate ) {

			this.updateGeometry();

		}

		var iLength = this.iLength,
			jLength = this.jLength,
			sliceAccess = this.sliceAccess,
			volume = this.volume,
			canvas = this.canvasBuffer,
			ctx = this.ctxBuffer;
		// get the imageData and pixel array from the canvas
		var imgData = ctx.getImageData( 0, 0, iLength, jLength );
		var data = imgData.data;
		var volumeData = volume.data;
		var upperThreshold = volume.upperThreshold;
		var lowerThreshold = volume.lowerThreshold;
		var windowLow = volume.windowLow;
		var windowHigh = volume.windowHigh;

		// manipulate some pixel elements
		var pixelCount = 0;

		if ( volume.dataType === 'label' ) {

			//this part is currently useless but will be used when colortables will be handled
			for ( var j = 0; j < jLength; j ++ ) {

				for ( var i = 0; i < iLength; i ++ ) {

					var label = volumeData[ sliceAccess( i, j ) ];
					label = label >= this.colorMap.length ? ( label % this.colorMap.length ) + 1 : label;
					var color = this.colorMap[ label ];
					data[ 4 * pixelCount ] = ( color >> 24 ) & 0xff;
					data[ 4 * pixelCount + 1 ] = ( color >> 16 ) & 0xff;
					data[ 4 * pixelCount + 2 ] = ( color >> 8 ) & 0xff;
					data[ 4 * pixelCount + 3 ] = color & 0xff;
					pixelCount ++;

				}

			}

		} else {

			for ( var j = 0; j < jLength; j ++ ) {

				for ( var i = 0; i < iLength; i ++ ) {

					var value = volumeData[ sliceAccess( i, j ) ];
					var alpha = 0xff;
					//apply threshold
					alpha = upperThreshold >= value ? ( lowerThreshold <= value ? alpha : 0 ) : 0;
					//apply window level
					value = Math.floor( 255 * ( value - windowLow ) / ( windowHigh - windowLow ) );
					value = value > 255 ? 255 : ( value < 0 ? 0 : value | 0 );

					data[ 4 * pixelCount ] = value;
					data[ 4 * pixelCount + 1 ] = value;
					data[ 4 * pixelCount + 2 ] = value;
					data[ 4 * pixelCount + 3 ] = alpha;
					pixelCount ++;

				}

			}

		}
		ctx.putImageData( imgData, 0, 0 );
		this.ctx.drawImage( canvas, 0, 0, iLength, jLength, 0, 0, this.canvas.width, this.canvas.height );
		this.mesh.material.map.needsUpdate = true;

	},
	updateGeometry: function () {

		var extracted = this.volume.extractPerpendicularPlane( this.axis, this.index );
		this.sliceAccess = extracted.sliceAccess;
		this.jLength = extracted.jLength;
		this.iLength = extracted.iLength;
		this.matrix = extracted.matrix;

		this.canvas.width = extracted.planeWidth;
		this.canvas.height = extracted.planeHeight;
		this.canvasBuffer.width = this.iLength;
		this.canvasBuffer.height = this.jLength;
		this.ctx = this.canvas.getContext( '2d' );
		this.ctxBuffer = this.canvasBuffer.getContext( '2d' );

		if ( this.geometry ) this.geometry.dispose(); // dispose existing geometry

		this.geometry = new PlaneBufferGeometry( extracted.planeWidth, extracted.planeHeight );

		if ( this.mesh ) {

			this.mesh.geometry = this.geometry;
			//reset mesh matrix
			this.mesh.matrix.identity();
			this.mesh.applyMatrix( this.matrix );

		}

		this.geometryNeedsUpdate = false;

	}

};

export { VolumeSlice }
