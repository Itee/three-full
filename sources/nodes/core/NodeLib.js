//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @author sunag / http://www.sunag.com.br/
 */

var NodeLib = {

	nodes: {},
	keywords: {},

	add: function ( node ) {

		this.nodes[ node.name ] = node;

	},

	addKeyword: function ( name, callback, cache ) {

		cache = cache !== undefined ? cache : true;

		this.keywords[ name ] = { callback: callback, cache: cache };

	},

	remove: function ( node ) {

		delete this.nodes[ node.name ];

	},

	removeKeyword: function ( name ) {

		delete this.keywords[ name ];

	},

	get: function ( name ) {

		return this.nodes[ name ];

	},

	getKeyword: function ( name, builder ) {

		return this.keywords[ name ].callback.call( this, builder );

	},

	getKeywordData: function ( name ) {

		return this.keywords[ name ];

	},

	contains: function ( name ) {

		return this.nodes[ name ] !== undefined;

	},

	containsKeyword: function ( name ) {

		return this.keywords[ name ] !== undefined;

	}

};

export { NodeLib }
