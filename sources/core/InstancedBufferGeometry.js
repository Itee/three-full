//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { BufferGeometry } from './BufferGeometry.js'
/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

function InstancedBufferGeometry() {

	BufferGeometry.call( this );

	this.type = 'InstancedBufferGeometry';
	this.maxInstancedCount = undefined;

}

InstancedBufferGeometry.prototype = Object.assign( Object.create( BufferGeometry.prototype ), {

	constructor: InstancedBufferGeometry,

	isInstancedBufferGeometry: true,

	copy: function ( source ) {

		BufferGeometry.prototype.copy.call( this, source );

		this.maxInstancedCount = source.maxInstancedCount;

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	toJSON: function () {

		var data = BufferGeometry.prototype.toJSON.call( this );

		data.maxInstancedCount = this.maxInstancedCount;

		data.isInstancedBufferGeometry = true;

		return data;

	}

} );

export { InstancedBufferGeometry }
