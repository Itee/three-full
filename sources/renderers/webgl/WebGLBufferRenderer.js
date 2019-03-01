//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function WebGLBufferRenderer( gl, extensions, info, capabilities ) {

	var mode;

	function setMode( value ) {

		mode = value;

	}

	function render( start, count ) {

		gl.drawArrays( mode, start, count );

		info.update( count, mode );

	}

	function renderInstances( geometry, start, count ) {

		var extension;

		if ( capabilities.isWebGL2 ) {

			extension = gl;

		} else {

			extension = extensions.get( 'ANGLE_instanced_arrays' );

			if ( extension === null ) {

				console.error( 'WebGLBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
				return;

			}

		}

		extension[ capabilities.isWebGL2 ? 'drawArraysInstanced' : 'drawArraysInstancedANGLE' ]( mode, start, count, geometry.maxInstancedCount );

		info.update( count, mode, geometry.maxInstancedCount );

	}

	//

	this.setMode = setMode;
	this.render = render;
	this.renderInstances = renderInstances;

}
;

export { WebGLBufferRenderer }
