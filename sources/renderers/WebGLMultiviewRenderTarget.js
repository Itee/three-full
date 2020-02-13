//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { WebGLRenderTarget } from './WebGLRenderTarget.js'

/**
 * @author fernandojsg / http://fernandojsg.com
 * @author Takahiro https://github.com/takahirox
 */
function WebGLMultiviewRenderTarget( width, height, numViews, options ) {

	WebGLRenderTarget.call( this, width, height, options );

	this.depthBuffer = false;
	this.stencilBuffer = false;

	this.numViews = numViews;

}

WebGLMultiviewRenderTarget.prototype = Object.assign( Object.create( WebGLRenderTarget.prototype ), {

	constructor: WebGLMultiviewRenderTarget,

	isWebGLMultiviewRenderTarget: true,

	copy: function ( source ) {

		WebGLRenderTarget.prototype.copy.call( this, source );

		this.numViews = source.numViews;

		return this;

	},

	setNumViews: function ( numViews ) {

		if ( this.numViews !== numViews ) {

			this.numViews = numViews;
			this.dispose();

		}

		return this;

	}

} );

export { WebGLMultiviewRenderTarget }
