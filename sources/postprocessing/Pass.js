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
export { Pass }
