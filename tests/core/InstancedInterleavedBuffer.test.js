var Three = (function (exports) {
	'use strict';

	function InterleavedBuffer( array, stride ) {

		this.array = array;
		this.stride = stride;
		this.count = array !== undefined ? array.length / stride : 0;

		this.dynamic = false;
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	Object.defineProperty( InterleavedBuffer.prototype, 'needsUpdate', {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	Object.assign( InterleavedBuffer.prototype, {

		isInterleavedBuffer: true,

		onUploadCallback: function () {},

		setArray: function ( array ) {

			if ( Array.isArray( array ) ) {

				throw new TypeError( 'BufferAttribute: array should be a Typed Array.' );

			}

			this.count = array !== undefined ? array.length / this.stride : 0;
			this.array = array;

			return this;

		},

		setDynamic: function ( value ) {

			this.dynamic = value;

			return this;

		},

		copy: function ( source ) {

			this.array = new source.array.constructor( source.array );
			this.count = source.count;
			this.stride = source.stride;
			this.dynamic = source.dynamic;

			return this;

		},

		copyAt: function ( index1, attribute, index2 ) {

			index1 *= this.stride;
			index2 *= attribute.stride;

			for ( var i = 0, l = this.stride; i < l; i ++ ) {

				this.array[ index1 + i ] = attribute.array[ index2 + i ];

			}

			return this;

		},

		set: function ( value, offset ) {

			if ( offset === undefined ) offset = 0;

			this.array.set( value, offset );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		onUpload: function ( callback ) {

			this.onUploadCallback = callback;

			return this;

		}

	} );

	function InstancedInterleavedBuffer( array, stride, meshPerAttribute ) {

		InterleavedBuffer.call( this, array, stride );

		this.meshPerAttribute = meshPerAttribute || 1;

	}

	InstancedInterleavedBuffer.prototype = Object.assign( Object.create( InterleavedBuffer.prototype ), {

		constructor: InstancedInterleavedBuffer,

		isInstancedInterleavedBuffer: true,

		copy: function ( source ) {

			InterleavedBuffer.prototype.copy.call( this, source );

			this.meshPerAttribute = source.meshPerAttribute;

			return this;

		}

	} );

	exports.InstancedInterleavedBuffer = InstancedInterleavedBuffer;

	return exports;

}({}));
