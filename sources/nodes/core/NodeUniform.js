//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @author sunag / http://www.sunag.com.br/
 */

function NodeUniform( params ) {

	params = params || {};

	this.name = params.name;
	this.type = params.type;
	this.node = params.node;
	this.needsUpdate = params.needsUpdate;

}

Object.defineProperties( NodeUniform.prototype, {

	value: {

		get: function () {

			return this.node.value;

		},

		set: function ( val ) {

			this.node.value = val;

		}

	}

} );

export { NodeUniform }
