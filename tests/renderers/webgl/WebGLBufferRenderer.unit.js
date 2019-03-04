/* global describe, it */

describe( 'WebGLBufferRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLBufferRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLBufferRenderer']() )

    } )

} )
