//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Layers() {

	this.mask = 1 | 0;

}

Object.assign( Layers.prototype, {

	set: function ( channel ) {

		this.mask = 1 << channel | 0;

	},

	enable: function ( channel ) {

		this.mask |= 1 << channel | 0;

	},

	toggle: function ( channel ) {

		this.mask ^= 1 << channel | 0;

	},

	disable: function ( channel ) {

		this.mask &= ~ ( 1 << channel | 0 );

	},

	test: function ( layers ) {

		return ( this.mask & layers.mask ) !== 0;

	}

} );

export { Layers }
