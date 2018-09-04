var Three = (function (exports) {
	'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var Pass = function () {
		this.enabled = true;
		this.needsSwap = true;
		this.clear = false;
		this.renderToScreen = false;
	};

	Object.assign( Pass.prototype, {
		setSize: function( width, height ) {},
		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {
			console.error( 'Pass: .render() must be implemented in derived pass.' );
		}
	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var ClearPass = function ( clearColor, clearAlpha ) {

		Pass.call( this );

		this.needsSwap = false;

		this.clearColor = ( clearColor !== undefined ) ? clearColor : 0x000000;
		this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

	};

	ClearPass.prototype = Object.assign( Object.create( Pass.prototype ), {

		constructor: ClearPass,

		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			var oldClearColor, oldClearAlpha;

			if ( this.clearColor ) {

				oldClearColor = renderer.getClearColor().getHex();
				oldClearAlpha = renderer.getClearAlpha();

				renderer.setClearColor( this.clearColor, this.clearAlpha );

			}

			renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );
			renderer.clear();

			if ( this.clearColor ) {

				renderer.setClearColor( oldClearColor, oldClearAlpha );

			}

		}

	} );

	exports.ClearPass = ClearPass;

	return exports;

}({}));
