/* global describe, it */

describe( 'WebGLIndexedBufferRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLIndexedBufferRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLIndexedBufferRenderer']() )

    } )

} )
