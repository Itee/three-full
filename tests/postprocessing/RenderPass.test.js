var Three = (function (exports) {
	'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var Pass = function () {

		// if set to true, the pass is processed by the composer
		this.enabled = true;

		// if set to true, the pass indicates to swap read and write buffer after rendering
		this.needsSwap = true;

		// if set to true, the pass clears its buffer before rendering
		this.clear = false;

		// if set to true, the result of the pass is rendered to screen
		this.renderToScreen = false;

	};

	Object.assign( Pass.prototype, {

		setSize: function ( width, height ) {},

		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			console.error( 'Pass: .render() must be implemented in derived pass.' );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

		Pass.call( this );

		this.scene = scene;
		this.camera = camera;

		this.overrideMaterial = overrideMaterial;

		this.clearColor = clearColor;
		this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

		this.clear = true;
		this.clearDepth = false;
		this.needsSwap = false;

	};

	RenderPass.prototype = Object.assign( Object.create( Pass.prototype ), {

		constructor: RenderPass,

		render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

			var oldAutoClear = renderer.autoClear;
			renderer.autoClear = false;

			this.scene.overrideMaterial = this.overrideMaterial;

			var oldClearColor, oldClearAlpha;

			if ( this.clearColor ) {

				oldClearColor = renderer.getClearColor().getHex();
				oldClearAlpha = renderer.getClearAlpha();

				renderer.setClearColor( this.clearColor, this.clearAlpha );

			}

			if ( this.clearDepth ) {

				renderer.clearDepth();

			}

			renderer.render( this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear );

			if ( this.clearColor ) {

				renderer.setClearColor( oldClearColor, oldClearAlpha );

			}

			this.scene.overrideMaterial = null;
			renderer.autoClear = oldAutoClear;
		}

	} );

	exports.RenderPass = RenderPass;

	return exports;

}({}));
